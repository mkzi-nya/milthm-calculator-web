import json
from collections import defaultdict
from pypinyin import lazy_pinyin
import re
import subprocess

# 读取JSON文件
with open('./packed_document.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 创建字典用于存储谱师与其曲目及难度
charters_data = defaultdict(list)

# 用于排序的函数
def get_sort_key(name):
    if name.isascii():
        return (0, name.lower())
    return (1, ''.join(lazy_pinyin(name)))

# 遍历所有项并整理数据
for item in data:
    title = item['title']
    difficulty = item['difficulty']
    charters_list = item['chartersList']
    
    for charter in charters_list:
        markdown_link = f"[{title}](info:info(\"{title}\",\"{difficulty}\"))"
        charters_data[charter].append((title, difficulty))  # 改为存储元组以便后续排序

# 对谱师进行排序
sorted_charters = sorted(charters_data.keys(), key=get_sort_key)

# 创建MD格式的表格
md_table = "| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |\n"
md_table += "|-|-|-|-|-|-|\n"

difficulty_map = {
    "Drizzle": "DZ",
    "Sprinkle": "SK",
    "Cloudburst": "CB",
    "Clear": "CL",
    "Special": "SP"
}

for charter in sorted_charters:
    # 筛选该谱师的曲目并排序
    all_songs = [
        (title, difficulty) for item in data
        if charter in item['chartersList']
        for title, difficulty in [(item['title'], item['difficulty'])]
    ]
    all_songs.sort(key=lambda x: get_sort_key(x[0]))  # 对曲名排序

    # 初始化每个难度的列表
    difficulty_links = {key: [] for key in difficulty_map.values()}

    for title, difficulty in all_songs:
        title2 = title.replace('(', '').replace(')', '')
        title1 = title.replace('~', r'\~')
        link = f"[{title1}](info:info(\"{title2}\",\"{difficulty}\"))"
        column = difficulty_map.get(difficulty)
        if column:
            difficulty_links[column].append(link)

    # 拼接每个难度列的内容
    row = f"| {charter} |"
    for col in ["DZ", "SK", "CB", "CL", "SP"]:
        links = " , ".join(difficulty_links[col])
        row += f" {links} |"
    md_table += row + "\n"

# 读取1.txt并更新charter字段
with open('./1.txt', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'"charter":\{\n.*?\n\}', f'"charter":{{\n{md_table}\n}}', content, flags=re.DOTALL)

# 写回1.txt
with open('./1.txt', 'w', encoding='utf-8') as f:
    f.write(new_content)

# 调用1.py
subprocess.run(['python', './1.py'], check=True)
