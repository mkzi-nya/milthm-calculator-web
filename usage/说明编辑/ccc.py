import json

# 假设你的 JSON 数据存放在 data.json 文件
with open("packed_document.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 难度映射表
difficulty_map = {
    "Cloudburst": "CB",
    "Sprinkle": "SK",
    "Drizzle": "DZ"
}

lines = []
for item in data:
    song_id = item["id"]
    difficulty = item.get("difficulty", "")
    diff_code = difficulty_map.get(difficulty, difficulty[:2].upper())  # 找不到就取前两个字母
    title = item.get("title", item.get("title", ""))  # 优先用 latinTitle，否则用 title
    
    line = f'  "{song_id}": [, "{diff_code}", "{title}", , , , , ],'
    lines.append(line)

# 写入文件 ./112.txt
with open("./112.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("已生成 ./112.txt")
