import csv
import os
import yaml
from pathlib import Path

def load_csv_data(csv_path):
    """加载CSV文件数据，返回字典 {latinTitle: {原名: str, 已有翻译: str, 所有翻译: list}}"""
    data = {}
    try:
        with open(csv_path, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for row in reader:
                latin_title = row.get('拉丁名', '').strip()
                if not latin_title:
                    continue
                
                # 收集所有非空的翻译
                translations = []
                original_title = row.get('原名', '').strip()
                if original_title:
                    translations.append(original_title)
                
                # 收集其他语言的翻译（跳过前三列和空值）
                for key, value in row.items():
                    if key not in ['原名', '已有翻译', '拉丁名'] and value and value.strip():
                        translations.append(value.strip())
                
                # 去重
                translations = list(dict.fromkeys(translations))
                
                data[latin_title] = {
                    'original_title': original_title,
                    'culture': row.get('已有翻译', '').strip(),
                    'translations': translations
                }
    except Exception as e:
        print(f"读取CSV文件失败: {e}")
        return {}
    
    return data

def find_yaml_files(songs_dir):
    """查找songs目录下的所有yaml文件"""
    yaml_files = []
    try:
        for file in Path(songs_dir).glob('*.yaml'):
            yaml_files.append(file)
        for file in Path(songs_dir).glob('*.yml'):
            yaml_files.append(file)
    except Exception as e:
        print(f"查找YAML文件失败: {e}")
    
    return yaml_files

def load_yaml_file(file_path):
    """加载YAML文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            # 跳过YAML开头的 "---"
            content = f.read()
            if content.startswith('---'):
                content = content[3:].lstrip()
            data = yaml.safe_load(content)
        return data
    except Exception as e:
        print(f"读取YAML文件 {file_path} 失败: {e}")
        return None

def save_yaml_file(file_path, data):
    """保存YAML文件"""
    try:
        # 确保tags字段存在且为列表
        if 'tags' not in data:
            data['tags'] = []
        elif not isinstance(data['tags'], list):
            data['tags'] = [data['tags']] if data['tags'] else []
        
        # 写入YAML文件，保留原有格式
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('---\n')
            yaml.dump(data, f, allow_unicode=True, sort_keys=False, default_flow_style=False, width=1000)
    except Exception as e:
        print(f"保存YAML文件 {file_path} 失败: {e}")
        return False
    return True

def main():
    csv_path = 'song2.csv'
    songs_dir = './songs/'
    
    # 检查目录是否存在
    if not os.path.exists(songs_dir):
        print(f"错误：目录 {songs_dir} 不存在")
        return
    
    # 加载CSV数据
    csv_data = load_csv_data(csv_path)
    if not csv_data:
        print("CSV数据为空，程序退出")
        return
    
    print(f"从CSV加载了 {len(csv_data)} 个曲目数据")
    
    # 查找所有YAML文件
    yaml_files = find_yaml_files(songs_dir)
    print(f"在 {songs_dir} 目录下找到 {len(yaml_files)} 个YAML文件")
    
    matched_count = 0
    modified_count = 0
    
    # 遍历每个YAML文件
    for yaml_file in yaml_files:
        # 加载YAML数据
        yaml_data = load_yaml_file(yaml_file)
        if not yaml_data:
            continue
        
        # 获取latinTitle
        latin_title = yaml_data.get('latinTitle', '').strip()
        if not latin_title:
            print(f"警告：文件 {yaml_file.name} 缺少 latinTitle 字段")
            continue
        
        # 在CSV数据中查找匹配
        if latin_title not in csv_data:
            continue
        
        matched_count += 1
        csv_info = csv_data[latin_title]
        
        # 获取已有的title和tags
        existing_title = yaml_data.get('title', '').strip()
        existing_tags = yaml_data.get('tags', [])
        if not isinstance(existing_tags, list):
            existing_tags = [existing_tags] if existing_tags else []
        
        # 准备要添加的翻译
        new_tags = []
        for translation in csv_info['translations']:
            # 检查是否与现有title相同
            if translation == existing_title:
                continue
            
            # 检查是否与latinTitle相同
            if translation == latin_title:
                continue
            
            # 检查是否已存在于tags中
            if translation in existing_tags:
                continue
            
            # 添加到新标签列表
            new_tags.append(translation)
        
        # 如果有新标签需要添加
        if new_tags:
            # 去重并添加到tags
            all_tags = existing_tags + new_tags
            # 去重但保持顺序
            seen = set()
            unique_tags = []
            for tag in all_tags:
                if tag not in seen:
                    seen.add(tag)
                    unique_tags.append(tag)
            
            yaml_data['tags'] = unique_tags
            
            # 保存YAML文件
            if save_yaml_file(yaml_file, yaml_data):
                modified_count += 1
                print(f"已更新文件 {yaml_file.name}，添加了 {len(new_tags)} 个新标签: {new_tags}")
            else:
                print(f"保存文件 {yaml_file.name} 失败")
    
    print(f"\n处理完成！")
    print(f"匹配到的文件数: {matched_count}")
    print(f"实际修改的文件数: {modified_count}")

if __name__ == "__main__":
    main()