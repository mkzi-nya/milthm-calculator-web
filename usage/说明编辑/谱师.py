import json
from collections import defaultdict
from pypinyin import lazy_pinyin

# 读取JSON文件
with open('./packed-document.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 创建字典用于存储谱师与其曲目及难度
charters_data = defaultdict(list)

# 遍历所有项并整理数据
for item in data:
    title = item['title']
    difficulty = item['difficulty']
    charters_list = item['chartersList']
    
    for charter in charters_list:
        # 为每个谱师添加 [title_difficulty] 链接，info中的title和difficulty用冒号分隔
        markdown_link = f"[{title}](info:info(\"{title}\",\"{difficulty}\"))"
        charters_data[charter].append(markdown_link)

# 对谱师进行排序，中文按拼音首字母排序，日文按假名排序，其他字符按字母排序
def get_sort_key(name):
    if name.isascii():  # 英文字符（ASCII字符）直接按字母排序
        return (0, name.lower())
    # 对中文字符使用拼音首字母排序，对日文字符使用假名的顺序
    # 将中文字符转换为拼音，日文字符转换为假名
    pinyin = ''.join(lazy_pinyin(name))
    return (1, pinyin)

# 排序：英文字符排在前面，中文和日文排在后面
sorted_charters = sorted(charters_data.keys(), key=get_sort_key)

# 创建MD格式的表格
md_table = "| Charter | DZ | SK | CB | CL | SP |\n"
md_table += "|-|-|-|-|-|-|\n"

difficulty_map = {
    "Drizzle": "DZ",
    "Sprinkle": "SK",
    "Cloudburst": "CB",
    "Clear": "CL",
    "Special": "SP"
}

for charter in sorted_charters:
    # 初始化每个难度的列表
    difficulty_links = {key: [] for key in difficulty_map.values()}
    
    # 遍历谱师的所有曲目链接，根据 difficulty 分类
    for item in data:
        title = item['title']
        difficulty = item['difficulty']
        if charter in item['chartersList']:
            link = f"[{title}](info:info(\"{title}\",\"{difficulty}\"))"
            column = difficulty_map.get(difficulty)
            if column:
                difficulty_links[column].append(link)
    
    # 拼接每个难度列的内容
    row = f"| {charter} |"
    for col in ["DZ", "SK", "CB", "CL", "SP"]:
        links = " , ".join(difficulty_links[col])
        row += f" {links} |"
    md_table += row + "\n"

# 输出结果到文件
with open('./out.txt', 'w', encoding='utf-8') as out_file:
    out_file.write(md_table)

print("Markdown table has been written to './out.txt'.")
