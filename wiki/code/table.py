from __future__ import annotations

import json
from pathlib import Path
from typing import Any


SCRIPT_DIR = Path(__file__).resolve().parent
INPUT_CANDIDATES = [
    (SCRIPT_DIR / '../../resources/resources.json').resolve(),
    (SCRIPT_DIR / '../resources/resources.json').resolve(),
    (SCRIPT_DIR / 'resources.json').resolve(),
    Path('/mnt/data/work/resources.json'),
]
OUTPUT_TABLE_C_HTML = (SCRIPT_DIR / '../table_c.html').resolve()
OUTPUT_TABLE_HTML = (SCRIPT_DIR / '../table.html').resolve()
CURRENT_VERSION = '5.3'

DIFFICULTY_ORDER = ['Drizzle', 'Sprinkle', 'Cloudburst', 'Clear', 'Special']
DIFFICULTY_SHORT = {
    'Drizzle': 'DZ',
    'Sprinkle': 'SK',
    'Cloudburst': 'CB',
    'Clear': 'CL',
    'Special': 'SP',
}

# 目录顺序手动维护；未列出的章节会自动追加到目录末尾。
DIRECTORY_GROUPS = [
    {
        'group_title': '主线章节',
        'chapters': [
            ('Introduction', '介绍'),
            ('Chapter0', '序章'),
            ('Chapter1', '主线章节一'),
        ],
    },
    {
        'group_title': '支线章节',
        'chapters': [
            ('SideStory1', '支线章节一'),
        ],
    },
    {
        'group_title': '联动章节',
        'chapters': [
            ('RainWorld', '联动'),
            ('Notanote', '联动'),
            ('Electrode Core', '联动'),
            ('VoidReflection', '联动'),
            ('BerryMelody', '联动'),
        ],
    },
    {
        'group_title': '单曲',
        'chapters': [
            ('Single', '单曲'),
            ('Garden', '单曲'),
        ],
    },
]

HTML_TEMPLATE = r"""
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>{{title}}</title>

  <link rel="stylesheet" href="./github-markdown-dark.min.css">
  <script src="./marked.min.js"></script>
  <script src="./katex.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script src="./index.umd.js"></script>
  <link rel="stylesheet" href="./github-dark.min.css">
  <script src="./highlight.min.js"></script>

  <style>
    body {
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      background: #0d1117;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .container { width: 100%; max-width: 900px; }
    .markdown-body { width: 100%; overflow-wrap: break-word; }
    .katex-display {
      display: block !important;
      text-align: center;
      margin: 10px 0;
      font-size: 1em;
    }
    .toc { display: none; }
    pre, code { user-select: text; }

    div[aaa] {
      visibility: hidden;
      opacity: 0;
      transition:
        opacity 0.12s ease-in-out,
        visibility 0.12s ease-in-out,
        top 0.12s ease,
        left 0.12s ease;
    }
    div[aaa].visible {
      visibility: visible;
      opacity: 1;
    }
  </style>


<body>
  <div class="container">
    <article id="content" class="markdown-body"></article>
  </div>

  <script type="text/markdown" id="md">
{markdown}
  </script>

  <script>

    function loadMarkdown() {
      let md = document.getElementById('md').textContent.replace(/^\n/, '');

      md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (match, p1, p2) {
        if (p2.startsWith('info:')) {
          const [protocol, rest] = p2.split(':', 2);
          const encodedRest = encodeURIComponent(rest);
          return `[${p1}](${protocol}:${encodedRest})`;
        }
        return match;
      });

      content.innerHTML = marked.parse(md, { headerIds: true, mangle: false });
      content.querySelectorAll('h2,h3,h4').forEach(h => {
        h.id = h.innerText.toLowerCase().replace(/\s+/g, '-');
      });
      hljs.highlightAll();
      resizeKatex();
      runJavascriptLinks();
      loadDev();
    }

    function runJavascriptLinks() {
      const links = document.querySelectorAll('a[href^="info:info"], a[href^="info:info"]');
      links.forEach(link => {
        link.addEventListener('click', function (event) {
          event.preventDefault();
        });
      });
    }

    function resizeKatex() {
      const w = document.querySelector('.markdown-body').clientWidth;
      document.querySelectorAll('.katex-display').forEach(e => {
        e.style.fontSize = '';
        const actual = e.scrollWidth;
        if (actual > w) {
          const fs = parseFloat(getComputedStyle(e).fontSize);
          e.style.fontSize = (fs * w / actual) + 'px';
        }
      });
    }

    const hoverState = new Map();
    const HIDE_DELAY_MS = 120;

    function ensureState(key) {
      if (!hoverState.has(key)) {
        hoverState.set(key, { hoverLink: false, hoverDev: false, el: null, timer: null });
      }
      return hoverState.get(key);
    }

    function scheduleHide(key) {
      const state = ensureState(key);
      if (state.timer) clearTimeout(state.timer);
      state.timer = setTimeout(() => {
        if (!state.hoverLink && !state.hoverDev && state.el) {
          state.el.classList.remove('visible');
        }
        state.timer = null;
      }, HIDE_DELAY_MS);
    }

    function placeAndShowForLink(aaaElement, linkRect) {
      if (!aaaElement) return;
      aaaElement.classList.add('visible');
      const topPosition = linkRect.bottom + window.scrollY;
      let leftPosition = linkRect.left + linkRect.width / 2 + window.scrollX - aaaElement.offsetWidth / 2;

      const screenWidth = window.innerWidth;
      const elementWidth = aaaElement.offsetWidth;
      if (leftPosition + elementWidth > screenWidth) leftPosition = screenWidth - elementWidth;
      else if (leftPosition < 0) leftPosition = 0;

      aaaElement.style.position = 'absolute';
      aaaElement.style.top = `${topPosition}px`;
      aaaElement.style.left = `${leftPosition}px`;
    }

    function loadDev() {
      fetch(`./chartdev.html?${Date.now()}`)
        .then(res => {
          if (!res.ok) throw new Error(`加载 chartdev.html 失败：${res.status}`);
          return res.text();
        })
        .then(html => {
          const temp = document.createElement('div');
          temp.innerHTML = html;

          const nodes = temp.querySelectorAll('div[aaa]');
          nodes.forEach(node => {
            const key = node.getAttribute('aaa');
            if (!document.querySelector(`body > div[aaa="${CSS.escape(key)}"]`)) {
              node.style.position = node.style.position || 'absolute';
              document.body.appendChild(node);

              node.addEventListener('mouseenter', () => {
                const k = node.getAttribute('aaa');
                const st = ensureState(k);
                st.el = node;
                st.hoverDev = true;
                node.classList.add('visible');
                if (st.timer) { clearTimeout(st.timer); st.timer = null; }
              });

              node.addEventListener('mouseleave', () => {
                const k = node.getAttribute('aaa');
                const st = ensureState(k);
                st.hoverDev = false;
                scheduleHide(k);
              });
            }
          });
        })
        .catch(err => console.error(err));
    }

    let currentKey = null;
    let currentEl = null;
    let isMorphing = false;
    const MORPH_SWAP_DELAY = 40;

    function morphToTarget(targetEl, linkRect, targetKey) {
      if (!currentEl || !targetEl || currentEl === targetEl) return;

      if (currentKey) {
        const oldState = ensureState(currentKey);
        if (oldState.timer) { clearTimeout(oldState.timer); oldState.timer = null; }
        oldState.hoverLink = false;
        oldState.hoverDev = false;
        oldState.el = currentEl;
      }
      currentEl.classList.add('visible');

      placeAndShowForLink(currentEl, linkRect);

      setTimeout(() => {
        currentEl.innerHTML = targetEl.innerHTML;
        currentEl.setAttribute('aaa', targetKey);

        targetEl.classList.remove('visible');
        targetEl.style.top = '-99999px';
        targetEl.style.left = '-99999px';

        currentKey = targetKey;
        const newState = ensureState(currentKey);
        newState.el = currentEl;
        newState.hoverLink = false;
        newState.hoverDev = false;

        isMorphing = false;
      }, MORPH_SWAP_DELAY);
    }

    function showByMorphOrDirect(targetKey, linkRect) {
      const targetEl = document.querySelector(`div[aaa="${targetKey}"]`);
      if (!targetEl) return;

      if (!currentEl) {
        currentEl = targetEl;
        currentKey = targetKey;
        const st = ensureState(targetKey);
        st.el = currentEl;
        st.hoverLink = true;
        if (st.timer) { clearTimeout(st.timer); st.timer = null; }
        placeAndShowForLink(currentEl, linkRect);
        return;
      }

      if (currentEl && currentKey !== targetKey && !isMorphing) {
        isMorphing = true;
        morphToTarget(targetEl, linkRect, targetKey);
        return;
      }

      placeAndShowForLink(currentEl, linkRect);
    }

    function parseInfoKeyFromAnchor(anchor) {
      const url = decodeURIComponent(anchor.href || '');
      const match = url.match(/(info)\(([^)]*)\)/);
      if (!match) return null;
      const params = match[2].split(',').map(param => param.trim().replace(/[\'"]/g, ''));
      const key = (params.length === 2) ? params.join(',') : params[0];
      return key || null;
    }

    function bindLinkHoverAndClick(target) {
      if (target.dataset.aaaBound) return;
      target.dataset.aaaBound = '1';

      target.addEventListener('mouseenter', () => {
        const key = parseInfoKeyFromAnchor(target);
        if (!key) return;
        const state = ensureState(key);
        state.hoverLink = true;
        if (state.timer) { clearTimeout(state.timer); state.timer = null; }
        showByMorphOrDirect(key, target.getBoundingClientRect());
      });

      target.addEventListener('mouseleave', () => {
        const key = parseInfoKeyFromAnchor(target);
        if (!key) return;
        const state = ensureState(key);
        state.hoverLink = false;
        scheduleHide(key);
      });

      target.addEventListener('click', (e) => {
        e.preventDefault();
        const key = parseInfoKeyFromAnchor(target);
        if (!key) return;
        showByMorphOrDirect(key, target.getBoundingClientRect());
      });
    }

    function checkMouseOnLink(event) {
      const target = event.target;
      if (target.tagName !== 'A') return;
      const key = parseInfoKeyFromAnchor(target);
      if (!key) return;

      bindLinkHoverAndClick(target);

      const aaaElement = currentEl && currentKey === key
        ? currentEl
        : document.querySelector(`div[aaa="${key}"]`);
      if (!aaaElement) return;

      const state = ensureState(key);
      state.el = currentEl || aaaElement;
      state.hoverLink = true;

      placeAndShowForLink(state.el, target.getBoundingClientRect());
    }

    window.addEventListener('resize', resizeKatex);
    window.addEventListener('load', loadMarkdown);
    document.addEventListener('mousemove', checkMouseOnLink);

  </script>
</body>
</html>
"""


def find_input_json() -> Path:
    for candidate in INPUT_CANDIDATES:
        if candidate.exists():
            return candidate
    joined = '\n'.join(f'- {path}' for path in INPUT_CANDIDATES)
    raise FileNotFoundError(f'未找到 resources.json，已检查：\n{joined}')


def format_constant(value: Any) -> str:
    if value is None or value == '':
        return ''
    try:
        number = float(value)
    except (TypeError, ValueError):
        return ''
    if number.is_integer():
        return f'{number:.1f}'
    text = f'{number:.10f}'.rstrip('0').rstrip('.')
    if '.' not in text:
        text += '.0'
    return text


def escape_markdown_text(text: str) -> str:
    return (
        str(text)
        .replace('\\', '\\\\')
        .replace('[', '\\[')
        .replace(']', '\\]')
        .replace('(', '\\(')
        .replace(')', '\\)')
        .replace('*', '\\*')
        .replace('_', '\\_')
        .replace('`', '\\`')
        .replace('~', '\\~')
        .replace('|', '\\|')
    )


def normalize_info_title(title: str) -> str:
    return str(title).replace('(', '').replace(')', '')


def info_string(title: str, difficulty: str | None = None) -> str:
    normalized_title = normalize_info_title(title).replace('"', '\\"')
    if difficulty is None:
        return f'info:info("{normalized_title}")'
    return f'info:info("{normalized_title}","{difficulty.replace("\"", "\\\"")}")'


def heading_anchor(text: str) -> str:
    return str(text).lower().replace(' ', '-')


def song_title_link(title: str) -> str:
    return f'[{escape_markdown_text(title)}]({info_string(title)})'




def chart_title_link(title: str, difficulty: str) -> str:
    return f'[{escape_markdown_text(title)}]({info_string(title, difficulty)})'

def chart_constant_link(title: str, difficulty: str, constant: Any) -> str:
    constant_text = format_constant(constant) or '?'
    return f'[{constant_text}]({info_string(title, difficulty)})'


def get_chart_constant(chart: dict[str, Any]) -> Any:
    if not isinstance(chart, dict):
        return None,
    return chart.get('difficultyValue')


def build_rows(resources: dict[str, Any]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []

    for title, song in resources.items():
        difficulties = song.get('difficulty', {})
        if not isinstance(difficulties, dict):
            continue

        for difficulty_name, chart in difficulties.items():
            if not isinstance(chart, dict):
                continue

            constant = get_chart_constant(chart)
            try:
                numeric_constant = float(constant) if constant not in (None, '') else None
            except (TypeError, ValueError):
                numeric_constant = None

            rows.append({
                'title': title,
                'difficulty': difficulty_name,
                'difficulty_short': DIFFICULTY_SHORT.get(difficulty_name, difficulty_name),
                'constant': numeric_constant,
            })

    rows.sort(
        key=lambda item: (
            item['constant'] is None,
            -(item['constant'] if item['constant'] is not None else float('-inf')),
            item['title'],
            item['difficulty'],
        )
    )
    return rows


def build_constant_markdown(rows: list[dict[str, Any]]) -> str:
    lines = [
        '- [返回主页](./)',
        '',
        '## 定数表',
        '',
        '[按章节排列的定数表](./table.html)',
        '',
        '<div style="font-size:10px; white-space:nowrap;">',
        '',
        '| 定数 | 曲目 | 难度 |',
        '|-|-|-|',
    ]

    for row in rows:
        link = chart_title_link(row['title'], row['difficulty'])
        constant_str = format_constant(row['constant'])
        lines.append(f'| {constant_str} | {link} | {row["difficulty_short"]} |')

    lines.extend(['', '</div>', ''])
    return '\n'.join(lines)


def chapter_display_name(song: dict[str, Any], fallback_key: str) -> str:
    chapter_name = str(song.get('chapter_zh_hans') or '').strip()
    return chapter_name or fallback_key


def get_chapter_heading(prefix: str | None, chapter_name: str) -> str:
    if prefix:
        return f'{prefix} - {chapter_name}'
    return chapter_name


def build_chapter_order(resources: dict[str, Any]) -> tuple[list[dict[str, str]], list[str]]:
    chapter_names: dict[str, str] = {}
    chapter_keys_in_order: list[str] = []

    for _, song in resources.items():
        if not isinstance(song, dict):
            continue
        chapter_key = str(song.get('chapter') or '').strip()
        if not chapter_key:
            continue
        if chapter_key not in chapter_names:
            chapter_names[chapter_key] = chapter_display_name(song, chapter_key)
            chapter_keys_in_order.append(chapter_key)

    configured_keys = {
        chapter_key
        for group in DIRECTORY_GROUPS
        for chapter_key, _ in group['chapters']
    }

    extras = [key for key in chapter_keys_in_order if key not in configured_keys]

    ordered_sections: list[dict[str, str]] = []
    seen: set[str] = set()

    for group in DIRECTORY_GROUPS:
        for chapter_key, prefix in group['chapters']:
            if chapter_key not in chapter_names:
                continue
            ordered_sections.append({
                'chapter_key': chapter_key,
                'chapter_name': chapter_names[chapter_key],
                'prefix': prefix,
                'heading': get_chapter_heading(prefix, chapter_names[chapter_key]),
            })
            seen.add(chapter_key)

    for chapter_key in extras:
        if chapter_key in seen:
            continue
        ordered_sections.append({
            'chapter_key': chapter_key,
            'chapter_name': chapter_names[chapter_key],
            'prefix': '',
            'heading': chapter_names[chapter_key],
        })

    return ordered_sections, extras


def build_top20_song_rows(resources: dict[str, Any]) -> list[dict[str, Any]]:
    allowed_difficulties = {'Drizzle', 'Sprinkle', 'Cloudburst', 'Clear'}
    best_rows: list[dict[str, Any]] = []

    for title, song in resources.items():
        if not isinstance(song, dict):
            continue
        difficulties = song.get('difficulty', {})
        if not isinstance(difficulties, dict):
            continue

        best_row: dict[str, Any] | None = None
        best_order = -1

        for difficulty_name, chart in difficulties.items():
            if difficulty_name not in allowed_difficulties:
                continue
            if not isinstance(chart, dict):
                continue

            constant = get_chart_constant(chart)
            try:
                numeric_constant = float(constant) if constant not in (None, '') else None
            except (TypeError, ValueError):
                numeric_constant = None

            if numeric_constant is None or numeric_constant <= 0:
                continue

            order = DIFFICULTY_ORDER.index(difficulty_name) if difficulty_name in DIFFICULTY_ORDER else -1
            candidate = {
                'title': title,
                'difficulty': difficulty_name,
                'difficulty_short': DIFFICULTY_SHORT.get(difficulty_name, difficulty_name),
                'constant': numeric_constant,
            }

            if (
                best_row is None
                or numeric_constant > best_row['constant']
                or (numeric_constant == best_row['constant'] and order > best_order)
            ):
                best_row = candidate
                best_order = order

        if best_row is not None:
            best_rows.append(best_row)

    best_rows.sort(
        key=lambda item: (
            -(item['constant'] if item['constant'] is not None else float('-inf')),
            item['title'],
            item['difficulty'],
        )
    )
    return best_rows[:20]


def round_half_up(value: float, digits: int) -> str:
    from decimal import Decimal, ROUND_HALF_UP

    quant = Decimal('1').scaleb(-digits)
    decimal_value = Decimal(str(value)).quantize(quant, rounding=ROUND_HALF_UP)
    return f'{decimal_value:.{digits}f}'


def theoretical_reality_text(resources: dict[str, Any]) -> tuple[str, str, list[dict[str, Any]]]:
    top20 = build_top20_song_rows(resources)
    if not top20:
        return '0.000', '0.00', []
    average = sum(float(row['constant']) for row in top20) / len(top20) + 1.5
    return f'{average:.3f}', round_half_up(average, 2), top20


def build_chapter_markdown(resources: dict[str, Any], rows: list[dict[str, Any]]) -> str:
    ordered_sections, extras = build_chapter_order(resources)
    theory_raw, theory_display, top20 = theoretical_reality_text(resources)

    lines = [
        '- [返回主页](./)',
        '',
        '## 定数表',
        '',
        '[按定数排列的定数表](./table_c.html)',
        '',
        '- [说明](#说明)',
    ]

    for group in DIRECTORY_GROUPS:
        present = [section for section in ordered_sections if any(section['chapter_key'] == key for key, _ in group['chapters'])]
        if not present:
            continue
        lines.append(f'- [{group["group_title"]}](#{heading_anchor(present[0]["heading"])})')
        for section in present:
            lines.append(f'  - [{section["chapter_name"]}](#{heading_anchor(section["heading"])})')

    for section in ordered_sections:
        if section['chapter_key'] in extras:
            lines.append(f'- [{section["chapter_name"]}](#{heading_anchor(section["heading"])})')

    lines.extend([
        '',
        '---',
        '',
        '## 说明',
        '',
        '> - 所有 `SP` 和非常规谱面均不参与 Reality 计算。    ',
        '',
        f'当前版本(`{CURRENT_VERSION}`)的理论 Reality 为 `{theory_raw}`（显示为 {theory_display}）    ',
        '当前版本定数最高的 20 首曲目如下：  ',
        '',
        '| 排行 | 标题 | 难度 | 定数 |',
        '|---|---|---|---|',
    ])

    previous_constant: float | None = None
    current_rank = 0
    for index, row in enumerate(top20, start=1):
        if row['constant'] != previous_constant:
            current_rank = index
            previous_constant = row['constant']
        lines.append(
            f'| {current_rank} | {chart_title_link(row["title"], row["difficulty"])} | '
            f'{row["difficulty_short"]} | {format_constant(row["constant"])} |'
        )

    for section in ordered_sections:
        chapter_key = section['chapter_key']
        chapter_heading = section['heading']
        lines.extend([
            '',
            '---',
            '',
            f'## {chapter_heading}',
            '',
            '| 标题 | DZ | SK | CB | CL | SP |',
            '|---|---|---|---|---|---|',
        ])

        for title, song in resources.items():
            if not isinstance(song, dict):
                continue
            if str(song.get('chapter') or '').strip() != chapter_key:
                continue

            difficulties = song.get('difficulty', {})
            if not isinstance(difficulties, dict):
                difficulties = {}

            row_cells = [song_title_link(title)]
            for difficulty in DIFFICULTY_ORDER:
                chart = difficulties.get(difficulty)
                if isinstance(chart, dict):
                    row_cells.append(chart_constant_link(title, difficulty, get_chart_constant(chart)))
                else:
                    row_cells.append('-')

            lines.append('| ' + ' | '.join(row_cells) + ' |')

    lines.append('')
    return '\n'.join(lines)


def render_html(title: str, markdown: str) -> str:
    return (
        HTML_TEMPLATE
        .replace('{{title}}', title)
        .replace('{markdown}', markdown.replace('</script>', '<\\/script>'))
    )


def main() -> None:
    input_json = find_input_json()
    with input_json.open('r', encoding='utf-8') as file:
        resources = json.load(file)

    if not isinstance(resources, dict):
        raise TypeError('resources.json 顶层必须是对象。')

    rows = build_rows(resources)
    constant_markdown = build_constant_markdown(rows)
    chapter_markdown = build_chapter_markdown(resources, rows)

    constant_html = render_html('定数表（按定数）', constant_markdown)
    chapter_html = render_html('定数表', chapter_markdown)

    OUTPUT_TABLE_C_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_TABLE_HTML.parent.mkdir(parents=True, exist_ok=True)

    OUTPUT_TABLE_C_HTML.write_text(constant_html, encoding='utf-8')
    OUTPUT_TABLE_HTML.write_text(chapter_html, encoding='utf-8')

    print(f'Input: {input_json}')
    print(f'Generated: {OUTPUT_TABLE_C_HTML}')
    print(f'Generated: {OUTPUT_TABLE_HTML}')


if __name__ == '__main__':
    main()
