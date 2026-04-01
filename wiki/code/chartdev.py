#!/usr/bin/env python3
import json
import re
from pathlib import Path

DEFAULT_RESOURCE_FILE = Path(__file__).resolve().parent / "../../resources/resources.json"
FALLBACK_RESOURCE_FILE = Path(__file__).resolve().parent / "resources.json"
DEFAULT_OUTPUT_FILE = Path(__file__).resolve().parent / "../chartdev.html"


def sanitize_latin_title(value):
    """将 latinTitle 中所有非 0-9 / a-z / A-Z 的字符替换为下划线。"""
    return re.sub(r'[^0-9A-Za-z]', '_', str(value or ''))




def merge_tags(*tag_groups):
    """合并多个 tags 列表，保持顺序并去重。"""
    merged = []
    seen = set()

    for group in tag_groups:
        if not isinstance(group, list):
            continue
        for tag in group:
            key = str(tag)
            if key not in seen:
                seen.add(key)
                merged.append(key)

    return merged


def load_resources(resource_file=None):
    """加载 resources.json。默认优先使用 ../../resources/resources.json。"""
    candidates = []

    if resource_file:
        candidates.append(Path(resource_file))

    candidates.append(DEFAULT_RESOURCE_FILE)
    candidates.append(FALLBACK_RESOURCE_FILE)

    checked = []
    for path in candidates:
        resolved = path.resolve()
        checked.append(str(resolved))
        if resolved.exists():
            with open(resolved, 'r', encoding='utf-8') as f:
                return json.load(f), resolved

    raise FileNotFoundError(
        "未找到 resources.json，已尝试以下路径:\n" + "\n".join(checked)
    )


def flatten_resources(resources):
    """将 resources.json 展平为原脚本可直接使用的单谱面条目列表。"""
    flattened = []

    for song_title, song_data in resources.items():
        difficulties = song_data.get('difficulty', {})
        song_tags = song_data.get('tags', [])

        for difficulty_name, chart_data in difficulties.items():
            item = {
                'title': song_title,
                'latinTitle': song_data.get('latinTitle', song_title),
                'difficulty': difficulty_name,
                'id': chart_data.get('chartid', ''),
                'chartid': chart_data.get('chartid', ''),
                'charter': chart_data.get('charter', ''),
                'chartersList': chart_data.get('chartersList', []),
                'tags': merge_tags(chart_data.get('tags', []), song_tags),
                'chartTags': chart_data.get('tags', []),
                'songTags': song_tags,
                'artist': song_data.get('artist', ''),
                'artistsList': song_data.get('artistsList', []),
                'illustrator': song_data.get('illustrator', song_data.get('illustratorsList', [])),
                'illustratorsList': song_data.get('illustratorsList', song_data.get('illustrator', [])),
                'songid': song_data.get('songid', ''),
                'bpmInfo': chart_data.get('bpmInfo', []),
            }

            # 将谱面统计字段一并合入，供 generate_chart_info_html_from_data 直接读取
            item.update(chart_data)
            flattened.append(item)

    return flattened


def generate_dev_file(data, output_file=DEFAULT_OUTPUT_FILE):
    dev_content = []

    for item in data:
        dev_content.append(generate_chart_dev(item))
        dev_content.append(generate_info_dev(item))

    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(dev_content))

    return output_path.resolve()


def generate_chart_dev(data):
    chart_id = data.get('id', data.get('chartid', ''))
    charter = data.get('charter', '')
    charters_list = data.get('chartersList', [])
    tags = data.get('tags', [])
    title = data.get('title', '')
    difficulty = data.get('difficulty', '')
    clean_title = re.sub(r'[()]', '', title)
    sanitized_latin_title = sanitize_latin_title(data.get('latinTitle', ''))

    url = f"https://milt.hm/songlist/All/?q=chartid%3D{chart_id}"
    chart_info = data

    modal_html = f'''
<div style="position: absolute; background-color: rgba(0, 0, 0, 0.8); padding: 2px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000; font-family: Arial, sans-serif; color: #fff; font-size: 11px; line-height: 1.4; width: 250px;" aaa="{clean_title},{difficulty}">
    <p>ID: {chart_id}</p>
    <p><a href="{url}" target="_blank" style="color: #4da6ff; text-decoration: none;">点此进入游戏</a></p>
    <p><a href="#" target="_blank" style="color: #4da6ff; text-decoration: none;" onmouseover="this.href = (window.location.pathname.includes('/song/') || window.location.pathname.endsWith('/song')) ? './?song={sanitized_latin_title}' : './song/?song={sanitized_latin_title}'">点此查看曲目详情信息</a></p>
    <p>charter: {charter}</p>
    <p>chartersList: {', '.join(charters_list)}</p>
    {generate_chart_info_html_from_data(chart_info)}
    <p>Tags: [{"],   [".join(tags)}]</p>
</div>'''

    return modal_html


def generate_chart_info_html_from_data(chart_info):
    """根据谱面统计数据生成 HTML。"""
    if chart_info:
        info_html = f'''
    <p style="margin-top: 4px;">
        Combo: {chart_info.get('combo', 'N/A')}  Tap: {chart_info.get('tap', 'N/A')}  Drag: {chart_info.get('drag', 'N/A')}  Hold: {chart_info.get('hold', 'N/A')}  EX: {chart_info.get('ex', 'N/A')}
        有判占比: {chart_info.get('有判占比', 'N/A')}%  有判数: {chart_info.get('有判数', 'N/A')}  单note得分: {chart_info.get('单note', 'N/A')}
    </p>'''
        if chart_info.get('error'):
            info_html += '<p style="color: red;">Error: 此谱面统计可能有误</p>'
        return info_html
    return '<p style="margin-top: 4px;">此谱面详情信息缺失</p>'


def generate_info_dev(data):
    title = re.sub(r'[()]', '', data.get('title', ''))
    item = data
    sanitized_latin_title = sanitize_latin_title(item.get('latinTitle', ''))
    url_value = item.get('songid') or item.get('title', '')
    url = f"https://milt.hm/songlist/All/?q={url_value}"

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
    <p><a href="#" target="_blank" style="color: #4da6ff; text-decoration: none;" onmouseover="this.href = (window.location.pathname.includes('/song/') || window.location.pathname.endsWith('/song')) ? './?song={sanitized_latin_title}' : './song/?song={sanitized_latin_title}'">点此查看曲目详情信息</a></p>
    <p>artist: {item.get('artist', '')}<br><br>illustrator: {', '.join(item.get('illustrator', []))}</p>
    <p>BPM:<br><br>{bpm_text.rstrip(', ')}</p>
    <p>Tags: [{"],   [".join(item.get('songTags', []))}]</p>
</div>'''

    return info_html


if __name__ == "__main__":
    resources, resource_path = load_resources()
    data = flatten_resources(resources)
    output_path = generate_dev_file(data)
    print(f"已从 {resource_path} 生成 {output_path}")
