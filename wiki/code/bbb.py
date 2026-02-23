import json
import csv

def main():
    # 读取JSON文件
    try:
        with open('packed_document.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("错误：当前目录下找不到 packed_document.json 文件")
        return
    except json.JSONDecodeError:
        print("错误：packed_document.json 文件格式不正确")
        return

    # CSV文件头
    headers = [
        '原名', '已有翻译', '拉丁名', '英语', '简体中文', '繁體中文', 
        '粤语(繁体)', '日语', '俄语', '法语', '葡萄牙语', '西班牙语', 
        '越南语', '朝鲜语'
    ]

    # 准备数据
    rows = []
    seen_titles = set()  # 用于去重，避免同一首歌重复出现

    for item in data:
        title = item.get('title', '')
        latin_title = item.get('latinTitle', '')
        title_culture = item.get('titleCulture', '')
        
        # 使用 (title, latin_title, title_culture) 作为唯一标识
        key = (title, latin_title, title_culture)
        
        if key not in seen_titles:
            seen_titles.add(key)
            # 只填充前三列，后面全部留空
            row = [title, title_culture, latin_title] + [''] * (len(headers) - 3)
            rows.append(row)

    # 写入CSV文件
    with open('song2.csv', 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)

    print(f"成功生成 song2.csv，共处理 {len(rows)} 首歌曲")

if __name__ == "__main__":
    main()