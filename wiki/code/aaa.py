import json
import csv
import os

# 输入输出文件定义
input_file = 'packed_document.json'
output_file = './song.csv'

# 定义CSV的列名
fieldnames = ['原名', '拉丁名', '别名1', '别名2', '别名3', '别名4', '别名5', '别名6', '别名7', '别名8', '别名9']

def process_json_to_csv():
    # 检查输入文件是否存在
    if not os.path.exists(input_file):
        print(f"错误：找不到文件 '{input_file}'")
        return

    try:
        # 读取JSON文件
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 确保数据是列表格式（如果不是，尝试包装成列表）
        if not isinstance(data, list):
            data = [data]
        
        # 用于去重的字典，以title为键
        unique_songs = {}
        
        for item in data:
            title = item.get('title', '').strip()
            if not title:  # 跳过没有标题的记录
                continue
            
            # 如果已经存在相同的title，跳过（去重）
            if title in unique_songs:
                continue
            
            # 获取拉丁名，如果不存在则使用title
            latin_title = item.get('latinTitle', '').strip()
            if not latin_title:
                latin_title = title
            
            # 构建一行数据，别名列全部留空
            row = {
                '原名': title,
                '拉丁名': latin_title
            }
            
            # 所有别名列都设为空字符串
            for i in range(1, 10):  # 别名1到别名9
                row[f'别名{i}'] = ''
            
            unique_songs[title] = row
        
        # 如果没有有效数据
        if not unique_songs:
            print("警告：没有找到有效的数据行。")
            return
        
        # 写入CSV文件
        with open(output_file, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(unique_songs.values())
        
        print(f"成功处理 {len(unique_songs)} 条唯一记录，已保存到 {output_file}")
        
    except json.JSONDecodeError as e:
        print(f"JSON解析错误：{e}")
    except Exception as e:
        print(f"处理过程中发生错误：{e}")

if __name__ == "__main__":
    process_json_to_csv()