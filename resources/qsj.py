import json

with open('resources.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('resources.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, separators=(',', ':'))