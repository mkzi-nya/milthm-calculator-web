from __future__ import annotations

import json
from pathlib import Path
from typing import Any


SCRIPT_DIR = Path(__file__).resolve().parent
INPUT_JSON = (SCRIPT_DIR / '../../resources/resources.json').resolve()
OUTPUT_HTML = (SCRIPT_DIR / '../table_c.html').resolve()

DIFFICULTY_SHORT = {
    'Drizzle': 'DZ',
    'Sprinkle': 'SK',
    'Cloudburst': 'CB',
    'Clear': 'CL',
    'Special': 'SP',
}

HTML_TEMPLATE = r"""
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>定数表</title>

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
{{markdown}}
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

    const hoverState = new Map();    const HIDE_DELAY_MS = 120;

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
            const k = node.getAttribute('aaa');            const st = ensureState(k);
            st.el = node;
            st.hoverDev = true;
            node.classList.add('visible');
            if (st.timer) { clearTimeout(st.timer); st.timer = null; }
          });

          node.addEventListener('mouseleave', () => {
            const k = node.getAttribute('aaa');            const st = ensureState(k);
            st.hoverDev = false;
            scheduleHide(k);
          });
        }
      });
    })
    .catch(err => console.error(err));
}

    let currentKey = null;    let currentEl = null;    let isMorphing = false;    const MORPH_SWAP_DELAY = 40;
    function morphToTarget(targetEl, linkRect, targetKey) {
      if (!currentEl || !targetEl || currentEl === targetEl) return;

      if (currentKey) {
        const oldState = ensureState(currentKey);
        if (oldState.timer) { clearTimeout(oldState.timer); oldState.timer = null; }
        oldState.hoverLink = false;        oldState.hoverDev = false;
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
      const params = match[2].split(',').map(param => param.trim().replace(/['"]/g, ''));
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
        .replace('*', '\\*')
        .replace('_', '\\_')
        .replace('`', '\\`')
        .replace('~', r'\\~')
    )


def normalize_info_title(title: str) -> str:
    return str(title).replace('(', '').replace(')', '')


def build_rows(resources: dict[str, Any]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []

    for title, song in resources.items():
        difficulties = song.get('difficulty', {})
        if not isinstance(difficulties, dict):
            continue

        for difficulty_name, chart in difficulties.items():
            if not isinstance(chart, dict):
                continue

            constant = chart.get('difficultyValuev2')
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


def build_markdown(rows: list[dict[str, Any]]) -> str:
    lines = [
        '- [返回主页](./)',
        '',
        '## 定数表',
        '',
        '',
        '<div style="font-size:10px; white-space:nowrap;">',
        '',
        '| 定数 | 曲目 | 难度 |',
        '|-|-|-|',
    ]

    for row in rows:
        title_display = escape_markdown_text(row['title'])
        info_title = normalize_info_title(row['title']).replace('"', '\\"')
        difficulty = row['difficulty'].replace('"', '\\"')
        link = f'[{title_display}](info:info("{info_title}","{difficulty}"))'
        constant_str = format_constant(row['constant'])
        lines.append(f'| {constant_str} | {link} | {row["difficulty_short"]} |')

    lines.extend(['', '', '</div>', ''])
    return '\n'.join(lines)


def main() -> None:
    with INPUT_JSON.open('r', encoding='utf-8') as file:
        resources = json.load(file)

    if not isinstance(resources, dict):
        raise TypeError('resources.json 顶层必须是对象。')

    markdown = build_markdown(build_rows(resources))
    html = HTML_TEMPLATE.replace('{{markdown}}', markdown.replace('</script>', '<\\/script>'))

    OUTPUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_HTML.write_text(html, encoding='utf-8')

    print(f'Generated: {OUTPUT_HTML}')


if __name__ == '__main__':
    main()
