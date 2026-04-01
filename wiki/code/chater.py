#!/usr/bin/env python3
import json
import re
from collections import defaultdict
from pathlib import Path

try:
    from pypinyin import lazy_pinyin
except ImportError:
    def lazy_pinyin(value):
        return [str(value)]


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_RESOURCE_FILE = BASE_DIR / "../resources/resources.json"
FALLBACK_RESOURCE_FILE = BASE_DIR / "resources.json"
ARTIST_OUTPUT_FILE = BASE_DIR / "artist-statistics.md"
CHARTER_OUTPUT_FILE = BASE_DIR / "charter-statistics.md"


def sanitize_latin_title(value):
    """将 latinTitle 中所有非 0-9 / a-z / A-Z 的字符替换为下划线。"""
    return re.sub(r'[^0-9A-Za-z]', '_', str(value or ''))



def escape_markdown_title(title):
    """最小化转义，保持与原脚本一致。"""
    return str(title).replace('~', r'\~')



def make_song_link(title, latin_title):
    sanitized = sanitize_latin_title(latin_title)
    display_title = escape_markdown_title(title)
    return f"[{display_title}](./song/?song={sanitized})"



def load_resources(resource_file=None):
    """加载 resources.json。默认优先使用 ../resources/resources.json。"""
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
    """将 resources.json 展平为按谱面统计所需的列表。"""
    flattened = []

    for song_title, song_data in resources.items():
        difficulties = song_data.get('difficulty', {})
        latin_title = song_data.get('latinTitle', song_title)
        artists_list = song_data.get('artistsList', [])

        for difficulty_name, chart_data in difficulties.items():
            flattened.append({
                'title': song_title,
                'latinTitle': latin_title,
                'difficulty': difficulty_name,
                'artistsList': artists_list,
                'chartersList': chart_data.get('chartersList', []),
            })

    return flattened


# 用于排序的函数
def get_sort_key(name):
    if str(name).isascii():
        return (0, str(name).lower())
    return (1, ''.join(lazy_pinyin(str(name))))



def build_statistics(data):
    artists_data = defaultdict(dict)
    charters_data = defaultdict(list)

    for item in data:
        title = item['title']
        latin_title = item.get('latinTitle', title)
        difficulty = item['difficulty']
        artists_list = item.get('artistsList', [])
        charters_list = item.get('chartersList', [])

        for artist in artists_list:
            artists_data[artist][title] = latin_title

        for charter in charters_list:
            charters_data[charter].append({
                'title': title,
                'latinTitle': latin_title,
                'difficulty': difficulty,
            })

    return artists_data, charters_data



def generate_artist_md(artists_data):
    sorted_artists = sorted(artists_data.keys(), key=get_sort_key)

    artist_md = "- [返回主页](./)\n\n"
    artist_md += "## 曲师统计\n\n"
    artist_md += '<div style="font-size:10px; white-space:nowrap;">\n\n'

    artist_table = "| artist | song |\n"
    artist_table += "|-|-|\n"

    for artist in sorted_artists:
        songs = sorted(artists_data[artist].items(), key=lambda x: get_sort_key(x[0]))
        song_links = [make_song_link(title, latin_title) for title, latin_title in songs]
        songs_str = ",<br>".join(song_links)
        artist_table += f"| {artist} | {songs_str} |\n"

    artist_md += artist_table
    artist_md += "\n</div>\n"
    return artist_md



def generate_charter_md(charters_data):
    sorted_charters = sorted(charters_data.keys(), key=get_sort_key)

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
        all_songs = sorted(
            charters_data[charter],
            key=lambda x: (get_sort_key(x['title']), x['difficulty'])
        )

        difficulty_links = {key: [] for key in difficulty_map.values()}

        for entry in all_songs:
            title = entry['title']
            latin_title = entry.get('latinTitle', title)
            difficulty = entry['difficulty']
            link = make_song_link(title, latin_title)
            column = difficulty_map.get(difficulty)
            if column:
                difficulty_links[column].append(link)

        row = f"| {charter} |"
        for col in ["DZ", "SK", "CB", "CL", "SP"]:
            links = ",<br>".join(difficulty_links[col])
            row += f" {links} |"
        charter_table += row + "\n"

    charter_md += charter_table
    charter_md += "\n</div>\n"
    return charter_md



def main(resource_file=None):
    resources, resource_path = load_resources(resource_file)
    data = flatten_resources(resources)
    artists_data, charters_data = build_statistics(data)

    artist_md = generate_artist_md(artists_data)
    charter_md = generate_charter_md(charters_data)

    with open(ARTIST_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(artist_md)

    with open(CHARTER_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(charter_md)

    print(f"已从 {resource_path} 生成 {ARTIST_OUTPUT_FILE} 和 {CHARTER_OUTPUT_FILE}")


if __name__ == "__main__":
    main()
