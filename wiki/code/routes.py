"""Shared, file-backed song routes used by Wiki generators."""
import re
from pathlib import Path

SONG_DIR = Path(__file__).resolve().parent.parent / 'song'


def song_base(title, latin_title=''):
    candidates = list(dict.fromkeys(re.sub(r'[^0-9A-Za-z]', '_', str(v))
                                    for v in (latin_title, title) if v))
    bases = {p.stem for p in SONG_DIR.glob('*.md')}
    for candidate in candidates:
        if candidate in bases:
            return candidate
    for candidate in candidates:
        matches = sorted(b for b in bases if b.lower().startswith(candidate.lower()))
        if len(matches) == 1:
            return matches[0]
    raise ValueError(f'曲目未找到唯一 Markdown 文件: {title} / {latin_title}')


def song_url(title, latin_title=''):
    return './index.html#/song/' + song_base(title, latin_title)
