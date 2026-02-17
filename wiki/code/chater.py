import json
from collections import defaultdict
from pypinyin import lazy_pinyin

# 读取JSON文件
with open('./packed_document.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 创建字典用于存储曲师和谱师与其曲目
artists_data = defaultdict(set)  # 改为set来自动去重
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
    artists_list = item.get('artistsList', [])
    charters_list = item['chartersList']
    
    # 处理曲师数据 - 只存储曲名，不关心难度
    for artist in artists_list:
        artists_data[artist].add(title)  # 使用set自动去重
    
    # 处理谱师数据 - 谱师统计仍然需要难度信息
    for charter in charters_list:
        markdown_link = f"[{title}](info:info(\"{title}\",\"{difficulty}\"))"
        charters_data[charter].append((title, difficulty))

# 对曲师和谱师进行排序
sorted_artists = sorted(artists_data.keys(), key=get_sort_key)
sorted_charters = sorted(charters_data.keys(), key=get_sort_key)

# 创建曲师统计的MD内容
artist_md = "- [返回主页](./)\n\n"
artist_md += "## 曲师统计\n\n"
artist_md += '<div style="font-size:10px; white-space:nowrap;">\n\n'

artist_table = "| artist | song |\n"
artist_table += "|-|-|\n"

for artist in sorted_artists:
    # 获取该曲师的所有曲目（已去重）并排序
    all_songs = sorted(artists_data[artist], key=get_sort_key)
    
    # 创建曲目链接
    song_links = []
    for title in all_songs:
        title2 = title.replace('(', '').replace(')', '')
        title1 = title.replace('~', r'\~')
        link = f"[{title1}](info:info(\"{title2}\"))"
        song_links.append(link)
    
    # 用<br>连接所有曲目
    songs_str = ",<br>".join(song_links)
    artist_table += f"| {artist} | {songs_str} |\n"

artist_md += artist_table
artist_md += "\n</div>\n"

# 写入曲师统计文件
with open('./artist-statistics.md', 'w', encoding='utf-8') as f:
    f.write(artist_md)

# 创建谱师统计的MD内容
charter_md = "- [返回主页](./)\n\n"
charter_md += "## 谱师统计\n\n"
charter_md += '<div style="font-size:10px; white-space:nowrap;">\n\n'

charter_table = "| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |\n"
charter_table += "|-|-|-|-|-|-|\n"

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
        links = ",<br>".join(difficulty_links[col])
        row += f" {links} |"
    charter_table += row + "\n"

charter_md += charter_table
charter_md += "\n</div>\n"

# 写入谱师统计文件
with open('./charter-statistics.md', 'w', encoding='utf-8') as f:
    f.write(charter_md)