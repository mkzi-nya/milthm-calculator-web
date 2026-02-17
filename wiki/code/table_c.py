import json
import re

# 读取packed_document.json
with open('./packed_document.json', 'r', encoding='utf-8') as f:
    packed_data = json.load(f)

# 读取constant.js文件
with open('../../js/constant.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# 解析constant.js中的constantsData
# 使用正则表达式提取所有UUID和对应的数组
pattern = r'"([a-f0-9-]+)":\s*\[(.*?)\]'
matches = re.findall(pattern, js_content, re.DOTALL)

# 创建id到定数的映射
id_to_constant = {}

for uuid, array_str in matches:
    # 分割数组元素
    elements = [e.strip() for e in array_str.split(',')]
    
    # 处理可能的空元素
    elements = [e if e != '' else None for e in elements]
    
    # 判断第二项是否为数字
    if len(elements) > 1 and elements[1] and re.match(r'^-?\d+\.?\d*$', elements[1]):
        # 第二项是数字，将其作为定数
        constant = float(elements[1])
    else:
        # 否则将第一个数字作为定数
        try:
            constant = float(elements[0])
        except (ValueError, TypeError):
            # 如果第一个元素不是数字，则跳过
            continue
    
    id_to_constant[uuid] = constant

# 创建谱面列表
charts = []

for item in packed_data:
    item_id = item['id']
    title = item['title']
    difficulty = item['difficulty']
    
    # 获取定数
    constant = id_to_constant.get(item_id)
    
    if constant is not None:
        charts.append({
            'title': title,
            'difficulty': difficulty,
            'constant': constant
        })

# 按定数从大到小排序
charts.sort(key=lambda x: x['constant'], reverse=True)

# 生成表格
table_lines = []
table_lines.append("| 定数 | 曲目 | 难度 |")
table_lines.append("|-|-|-|")

difficulty_map = {
    "Drizzle": "DZ",
    "Sprinkle": "SK",
    "Cloudburst": "CB",
    "Clear": "CL",
    "Special": "SP"
}

for chart in charts:
    title = chart['title']
    difficulty = chart['difficulty']
    constant = chart['constant']
    
    # 处理标题中的特殊字符
    title2 = title.replace('(', '').replace(')', '')
    title1 = title.replace('~', r'\~')
    
    # 创建链接
    link = f"[{title1}](info:info(\"{title2}\",\"{difficulty}\"))"
    
    # 获取难度缩写
    difficulty_short = difficulty_map.get(difficulty, difficulty)
    
    # 定数列：如果为-1则留空，否则显示定数
    constant_str = "" if constant == -1 else str(constant)
    
    table_lines.append(f"| {constant_str} | {link} | {difficulty_short} |")

# 读取table_c.md
with open('./table_c.md', 'r', encoding='utf-8') as f:
    table_c_content = f.read().splitlines()

# 保存原文件的最后一行
last_line = table_c_content[-1] if table_c_content else ""

# 在第7行之后插入表格，并保留最后一行
insert_position = 7  # 第7行之后，即索引7的位置

# 如果最后一行不是空行，先移除它
if last_line and last_line.strip():
    content_without_last = table_c_content[:-1]
else:
    content_without_last = table_c_content
    last_line = ""

# 插入新表格
new_content = content_without_last[:insert_position] + table_lines + content_without_last[insert_position:]

# 如果最后一行不为空，添加回去
if last_line:
    new_content.append(last_line)

# 写回table_c.md
with open('./table_c.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_content))

print(f"成功处理了 {len(charts)} 个谱面，并写入到 table_c.md 的第7行之后，保留了原文件的最后一行")