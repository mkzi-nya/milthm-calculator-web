#!/usr/bin/env python3
import json
import re
from difflib import SequenceMatcher

def load_data(data_file):
    with open(data_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_chart_info(chart_info_file):
    try:
        with open(chart_info_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {}

def similarity(a, b):
    """计算两个字符串的相似度"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def find_best_match(title, difficulty, unmatched_chart_info):
    """在未匹配的数据中查找相似度最高的条目"""
    best_match = None
    best_score = 0
    best_key = None
    
    # 构建目标键（用于比较）
    target_key = f"{title}_{difficulty}"
    
    for key, info_list in unmatched_chart_info.items():
        if not info_list:
            continue
            
        info = info_list[0] if isinstance(info_list, list) else info_list
        
        # 计算相似度
        score = similarity(target_key, key)
        
        # 如果相似度超过阈值且比当前最佳匹配更好
        if score > 0.7 and score > best_score:
            best_score = score
            best_match = info
            best_key = key
    
    return best_match, best_key, best_score

def generate_dev_file(data, chart_info_data, output_file="../chartdev.html"):
    dev_content = []
    
    # 复制chart_info_data用于后续的相似度匹配
    unmatched_chart_info = chart_info_data.copy()
    unmatched_items = []
    
    # 第一轮：精确匹配
    for item in data:
        chart_dev, matched_key = generate_chart_dev(item, unmatched_chart_info, True)
        dev_content.append(chart_dev)
        
        # 如果匹配成功，从未匹配数据中移除
        if matched_key and matched_key in unmatched_chart_info:
            del unmatched_chart_info[matched_key]
        elif matched_key is None:
            # 记录未匹配的项
            unmatched_items.append((item, chart_dev))
        
        # 生成info函数的dev内容
        info_dev = generate_info_dev(item)
        dev_content.append(info_dev)
    
    # 第二轮：相似度匹配
    if unmatched_items and unmatched_chart_info:
        print(f"开始相似度匹配: {len(unmatched_items)} 个未匹配项, {len(unmatched_chart_info)} 个未使用数据")
        
        updated_dev_content = []
        for original_dev in dev_content:
            # 检查是否是chart_dev（包含特定标识）
            if 'aaa="' in original_dev and '点此进入游戏' in original_dev:
                # 提取标题和难度信息
                match = re.search(r'aaa="([^"]+),([^"]+)"', original_dev)
                if match:
                    title = match.group(1)
                    difficulty = match.group(2)
                    
                    # 查找此条目在unmatched_items中的位置
                    for i, (item, chart_dev) in enumerate(unmatched_items):
                        if item.get('title', '') == title and item.get('difficulty', '') == difficulty:
                            # 尝试相似度匹配
                            best_match, best_key, best_score = find_best_match(title, difficulty, unmatched_chart_info)
                            
                            if best_match:
                                print(f"相似度匹配成功: '{title}_{difficulty}' -> '{best_key}' (相似度: {best_score:.2f})")
                                
                                # 重新生成chart_dev
                                new_chart_dev = generate_chart_dev_with_info(item, best_match)
                                updated_dev_content.append(new_chart_dev)
                                
                                # 从未匹配数据中移除已使用的项
                                if best_key in unmatched_chart_info:
                                    del unmatched_chart_info[best_key]
                                
                                # 从未匹配项中移除
                                unmatched_items.pop(i)
                            else:
                                # 保持原样
                                updated_dev_content.append(original_dev)
                                unmatched_items.pop(i)
                            break
                    else:
                        # 不是未匹配项，保持原样
                        updated_dev_content.append(original_dev)
                else:
                    updated_dev_content.append(original_dev)
            else:
                updated_dev_content.append(original_dev)
        
        dev_content = updated_dev_content
    
    # 输出匹配统计
    if unmatched_items:
        print(f"仍有 {len(unmatched_items)} 个项未找到匹配数据")
    if unmatched_chart_info:
        print(f"仍有 {len(unmatched_chart_info)} 个chartinfo数据未使用")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(dev_content))

def generate_chart_dev(data, chart_info_data, return_key=False):
    id = data.get('id', '')
    charter = data.get('charter', '')
    chartersList = data.get('chartersList', [])
    tags = data.get('tags', [])
    title = data.get('title', '')
    difficulty = data.get('difficulty', '')
    titles = re.sub(r'[()]', '', title)
    
    # 生成游戏链接
    url = f"https://milt.hm/songlist/All/?q=chartid%3D{id}"

    # 查找chart信息
    chart_info, matched_key = find_chart_info(title, difficulty, id, chart_info_data)
    
    # 构建modal的HTML
    modal_html = f'''
<div style="position: absolute; background-color: rgba(0, 0, 0, 0.8); padding: 2px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000; font-family: Arial, sans-serif; color: #fff; font-size: 11px; line-height: 1.4; width: 250px;" aaa="{titles},{difficulty}">
    <p>ID: {id}</p>
    <p><a href="{url}" target="_blank" style="color: #4da6ff; text-decoration: none;">点此进入游戏</a></p>
    <p><a href="#" target="_blank" style="color: #4da6ff; text-decoration: none;" onmouseover="this.href = (window.location.pathname.includes('/song/') || window.location.pathname.endsWith('/song')) ? './{data.get("latinTitle", "")}' : './song/{data.get("latinTitle", "")}'">点此查看曲目详情信息</a></p>
    <p>charter: {charter}</p>
    <p>chartersList: {', '.join(chartersList)}</p>
    {generate_chart_info_html_from_data(chart_info)}
    <p>Tags: [{"],   [".join(tags)}]</p>
</div>'''
    
    if return_key:
        return modal_html, matched_key
    else:
        return modal_html

def generate_chart_dev_with_info(data, chart_info):
    """使用指定的chart_info生成chart_dev"""
    id = data.get('id', '')
    charter = data.get('charter', '')
    chartersList = data.get('chartersList', [])
    tags = data.get('tags', [])
    title = data.get('title', '')
    difficulty = data.get('difficulty', '')
    titles = re.sub(r'[()]', '', title)
    
    # 生成游戏链接
    url = f"https://milt.hm/songlist/All/?q=chartid%3D{id}"

    # 构建modal的HTML
    modal_html = f'''
<div style="position: absolute; background-color: rgba(0, 0, 0, 0.8); padding: 2px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000; font-family: Arial, sans-serif; color: #fff; font-size: 11px; line-height: 1.4; width: 250px;" aaa="{titles},{difficulty}">
    <p>ID: {id}</p>
    <p><a href="{url}" target="_blank" style="color: #4da6ff; text-decoration: none;">点此进入游戏</a></p>
    <p><a href="#" target="_blank" style="color: #4da6ff; text-decoration: none;" onmouseover="this.href = (window.location.pathname.includes('/song/') || window.location.pathname.endsWith('/song')) ? './{data.get("latinTitle", "")}' : './song/{data.get("latinTitle", "")}'">点此查看曲目详情信息</a></p>
    <p>charter: {charter}</p>
    <p>chartersList: {', '.join(chartersList)}</p>
    {generate_chart_info_html_from_data(chart_info)}
    <p>Tags: [{"],   [".join(tags)}]</p>
</div>'''
    
    return modal_html

def find_chart_info(title, difficulty, chart_id, chart_info_data):
    """查找chart信息并返回匹配的键"""
    chart_info = None
    matched_key = None
    
    # 首先尝试用 chart_id 查找
    if chart_id and chart_id in chart_info_data:
        chart_info = chart_info_data[chart_id]
        # 如果是列表，取第一个元素
        if isinstance(chart_info, list):
            chart_info = chart_info[0] if chart_info else None
        if chart_info:
            matched_key = chart_id
    
    # 如果没找到，尝试用 曲名_难度 格式查找
    if not chart_info:
        # 创建多个可能的键名格式进行查找
        possible_keys = []
        
        # 原始标题（保留空格）
        possible_keys.append(f"{title}_{difficulty}")
        
        # 移除括号但保留空格
        clean_title_no_parentheses = re.sub(r'[()]', '', title)
        possible_keys.append(f"{clean_title_no_parentheses}_{difficulty}")
        
        # 移除所有特殊字符包括空格
        clean_title_no_spaces = re.sub(r'[()\s]', '', title)
        possible_keys.append(f"{clean_title_no_spaces}_{difficulty}")
        
        # 尝试所有可能的键名
        for key in possible_keys:
            if key in chart_info_data:
                chart_info = chart_info_data[key]
                # 如果是列表，取第一个元素
                if isinstance(chart_info, list):
                    chart_info = chart_info[0] if chart_info else None
                if chart_info:
                    matched_key = key
                    break
    
    return chart_info, matched_key

def generate_chart_info_html_from_data(chart_info):
    """根据chart_info数据生成HTML"""
    if chart_info:
        info_html = f'''
    <p style="margin-top: 4px;">
        Combo: {chart_info.get('combo', 'N/A')}  Tap: {chart_info.get('tap', 'N/A')}  Drag: {chart_info.get('drag', 'N/A')}  Hold: {chart_info.get('hold', 'N/A')}  EX: {chart_info.get('ex', 'N/A')}
        有判占比: {chart_info.get('有判占比', 'N/A')}%  有判数: {chart_info.get('有判数', 'N/A')}  单note得分: {chart_info.get('单note', 'N/A')}
    </p>'''
        if chart_info.get('error'):
            info_html += '<p style="color: red;">Error: 此谱面统计可能有误</p>'
        return info_html
    else:
        return '<p style="margin-top: 4px;">此谱面详情信息缺失</p>'

def generate_info_dev(data):
    title = re.sub(r'[()]', '', data.get('title', ''))
    item = data
    url = f"https://milt.hm/songlist/All/?q={title}"

    
    bpm_text = ''
    bpm_info = item.get('bpmInfo', [])
    for i, info in enumerate(bpm_info):
        bpm_text += f"[{info.get('start', '')},{info.get('bpm', '')}]"
        if (i + 1) % 5 == 0:
            bpm_text += ',\n\n'
        else:
            bpm_text += ', '
    
    info_html = f'''
<div style="position: absolute; background-color: rgba(0, 0, 0, 0.8); padding: 5px; border-radius: 4px; box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); z-index: 1000; font-family: Arial, sans-serif; color: #fff; font-size: 11px; line-height: 0.8;" aaa="{title}">
    <h2>{item.get('title', '')}</h2>'''
    
    if item.get('latinTitle', '') != item.get('title', ''):
        info_html += f'<p>{item.get("latinTitle", "")}</p>'
    
    info_html += f'''
    <p><a href="{url}" target="_blank" style="color: #4da6ff; text-decoration: none;">点此进入游戏</a></p>
    <p><a href="#" target="_blank" style="color: #4da6ff; text-decoration: none;" onmouseover="this.href = (window.location.pathname.includes('/song/') || window.location.pathname.endsWith('/song')) ? './{item.get("latinTitle", "")}' : './song/{item.get("latinTitle", "")}'">点此查看曲目详情信息</a></p>
    <p>artist: {item.get('artist', '')}<br><br>illustrator: {', '.join(item.get('illustrator', []))}</p>
    <p>BPM:<br><br>{bpm_text.rstrip(', ')}</p>
</div>'''
    
    return info_html

if __name__ == "__main__":
    data = load_data("packed_document.json")
    chart_info = load_chart_info("chartinfo.json")
    generate_dev_file(data, chart_info)