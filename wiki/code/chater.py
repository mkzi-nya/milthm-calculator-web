#!/usr/bin/env python3
import json
import re
from collections import defaultdict
from pathlib import Path
from routes import song_url

try:
    from pypinyin import lazy_pinyin
except ImportError:
    def lazy_pinyin(value):
        return [str(value)]


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_RESOURCE_FILE = BASE_DIR / "../../resources/resources.json"
FALLBACK_RESOURCE_FILE = BASE_DIR / "resources.json"
ARTIST_OUTPUT_FILE = BASE_DIR / "artist-statistics.md"
CHARTER_OUTPUT_FILE = BASE_DIR / "charter-statistics.md"
ILLUSTRATOR_OUTPUT_FILE = BASE_DIR / "illustrator-statistics.md"


def sanitize_latin_title(value):
    """将 latinTitle 中所有非 0-9 / a-z / A-Z 的字符替换为下划线。"""
    return re.sub(r'[^0-9A-Za-z]', '_', str(value or ''))



def escape_markdown_title(title):
    """最小化转义，保持与原脚本一致。"""
    return re.sub(r'([\\`*_{}\[\]()<>#|~])', r'\\\1', str(title))


def make_song_link(title, latin_title):
    return f"[{escape_markdown_title(title)}]({song_url(title, latin_title)})"




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
        illustrators_list = song_data.get('illustratorsList', song_data.get('illustrator', []))

        for difficulty_name, chart_data in difficulties.items():
            flattened.append({
                'title': song_title,
                'latinTitle': latin_title,
                'difficulty': difficulty_name,
                'artistsList': artists_list,
                'illustratorsList': illustrators_list,
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
    illustrators_data = defaultdict(dict)
    charters_data = defaultdict(list)

    for item in data:
        title = item['title']
        latin_title = item.get('latinTitle', title)
        difficulty = item['difficulty']
        artists_list = item.get('artistsList', [])
        illustrators_list = item.get('illustratorsList', [])
        charters_list = item.get('chartersList', [])

        for artist in artists_list:
            artists_data[artist][title] = latin_title

        for illustrator in illustrators_list:
            if not str(illustrator).strip():
                continue
            illustrators_data[illustrator][title] = latin_title

        for charter in charters_list:
            charters_data[charter].append({
                'title': title,
                'latinTitle': latin_title,
                'difficulty': difficulty,
            })

    return artists_data, illustrators_data, charters_data



def generate_people_md(people, label):
    lines = [f'# {label}统计', '', f'共 **{len(people)}** 位{label}。通过右侧「总览」查找姓名。', '']
    for person in sorted(people, key=get_sort_key):
        songs = sorted(people[person].items(), key=lambda x: get_sort_key(x[0]))
        lines += [f'## {escape_markdown_title(person)}', '', f'{len(songs)} 首曲目', '']
        lines += [f'- {make_song_link(title, latin)}' for title, latin in songs]
        lines.append('')
    return '\n'.join(lines)


def generate_artist_md(data):
    return generate_people_md(data, '曲师')


def generate_illustrator_md(data):
    return generate_people_md(data, '画师')


def generate_charter_md(data):
    lines = ['# 谱师统计', '', f'共 **{len(data)}** 位谱师。通过右侧「总览」查找姓名。', '']
    order = ['Drizzle', 'Sprinkle', 'Cloudburst', 'Clear', 'Special']
    for person in sorted(data, key=get_sort_key):
        entries = sorted(data[person], key=lambda x: (get_sort_key(x['title']), x['difficulty']))
        lines += [f'## {escape_markdown_title(person)}', '', f'{len(entries)} 张谱面 · {len({e["title"] for e in entries})} 首曲目', '']
        for difficulty in order + sorted({e['difficulty'] for e in entries} - set(order)):
            group = [e for e in entries if e['difficulty'] == difficulty]
            if not group:
                continue
            lines += [f'### {difficulty}', '']
            lines += [f'- {make_song_link(e["title"], e["latinTitle"])}' for e in group]
            lines.append('')
    return '\n'.join(lines)


def main(resource_file=None):
    resources, resource_path = load_resources(resource_file)
    data = flatten_resources(resources)
    artists_data, illustrators_data, charters_data = build_statistics(data)

    artist_md = generate_artist_md(artists_data)
    illustrator_md = generate_illustrator_md(illustrators_data)
    charter_md = generate_charter_md(charters_data)

    with open(ARTIST_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(artist_md)

    with open(ILLUSTRATOR_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(illustrator_md)

    with open(CHARTER_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(charter_md)

    print(f"已从 {resource_path} 生成 {ARTIST_OUTPUT_FILE}、{ILLUSTRATOR_OUTPUT_FILE} 和 {CHARTER_OUTPUT_FILE}")


if __name__ == "__main__":
    main()
