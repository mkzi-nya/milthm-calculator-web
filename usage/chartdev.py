#!/usr/bin/env python3
import json
import re
import urllib.parse

def load_data(data_file):
    with open(data_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_chart_info(chart_info_file):
    try:
        with open(chart_info_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {}

def generate_dev_file(data, chart_info_data, output_file="chartdev.html"):
    dev_content = []
    
    for item in data:
        # 生成chart函数的dev内容
        chart_dev = generate_chart_dev(item, chart_info_data)
        dev_content.append(chart_dev)
        
        # 生成info函数的dev内容
        info_dev = generate_info_dev(item)
        dev_content.append(info_dev)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(dev_content))

def generate_chart_dev(data, chart_info_data):
    id = data.get('id', '')
    charter = data.get('charter', '')
    chartersList = data.get('chartersList', [])
    tags = data.get('tags', [])
    title = data.get('title', '')
    difficulty = data.get('difficulty', '')
    titles = re.sub(r'[()]', '', title)
    title1 = title.replace('(', '（').replace(')', '）')
    
    # 生成游戏链接
    url = f"https://milt.hm/songlist/All/?q={urllib.parse.quote(title)}%20{'%20'.join(urllib.parse.quote(tag) for tag in tags)}"
    
    # 构建modal的HTML
    modal_html = f'''
<div style="position: absolute; background-color: rgba(0, 0, 0, 0.8); padding: 2px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000; font-family: Arial, sans-serif; color: #fff; font-size: 11px; line-height: 1.4; width: 250px;" aaa="{titles},{difficulty}">
    <p>ID: {id}</p>
    <p><a href="{url}" target="_blank" style="color: #4da6ff; text-decoration: none;">点此进入游戏</a></p>
    <p>charter: {charter}</p>
    <p>chartersList: {', '.join(chartersList)}</p>
    {generate_chart_info_html(title, difficulty, id, chart_info_data)}
    <p>Tags: [{"],   [".join(tags)}]</p>
</div>'''
    
    return modal_html

def generate_chart_info_html(title, difficulty, chart_id, chart_info_data):
    clean_title = re.sub(r'[()\s]', '', title)
    difficulty_key = clean_title + difficulty
    chartInfo = chart_info_data.get(difficulty_key) or chart_info_data.get(str(chart_id))
    
    if chartInfo:
        info_html = f'''
    <p style="margin-top: 4px;">
        Combo: {chartInfo.get('combo', 'N/A')}  Tap: {chartInfo.get('tap', 'N/A')}  Drag: {chartInfo.get('drag', 'N/A')}  Hold: {chartInfo.get('hold', 'N/A')}  EX: {chartInfo.get('ex', 'N/A')}
        有判占比: {chartInfo.get('有判占比', 'N/A')}  有判数: {chartInfo.get('有判数', 'N/A')}  单note得分: {chartInfo.get('单note', 'N/A')}
    </p>'''
        if chartInfo.get('error'):
            info_html += '<p style="color: red;">Error: 此谱面统计可能有误</p>'
        return info_html
    else:
        return '<p style="margin-top: 4px;">此谱面详情信息缺失</p>'

def generate_info_dev(data):
    title = re.sub(r'[()]', '', data.get('title', ''))
    item = data
    chartersList = data.get('chartersList', [])  # 添加这行获取chartersList
    url = f"https://milt.hm/songlist/All/?q={urllib.parse.quote(item.get('title', ''))}%20{'%20'.join(urllib.parse.quote(charter) for charter in chartersList)}"
    
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
    <p>artist: {item.get('artist', '')}<br><br>illustrator: {', '.join(item.get('illustrator', []))}</p>
    <p>BPM:<br><br>{bpm_text.rstrip(', ')}</p>
</div>'''
    
    return info_html

if __name__ == "__main__":
    data = load_data("packed_document.json")
    chart_info = load_chart_info("chartinfo.json")
    generate_dev_file(data, chart_info)