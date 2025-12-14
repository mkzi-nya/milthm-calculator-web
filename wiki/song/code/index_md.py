import re
from pathlib import Path

MAP_JS = Path("map.js")
OUT_MD = Path("index.md")

# ---------- 字符分类 ----------

def is_latin(c):
    return ('A' <= c <= 'Z') or ('a' <= c <= 'z')

def is_kana(c):
    o = ord(c)
    return (
        0x3040 <= o <= 0x309F or  # 平假名
        0x30A0 <= o <= 0x30FF     # 片假名
    )

def is_cjk(c):
    o = ord(c)
    return 0x4E00 <= o <= 0x9FFF

def sort_group(key):
    if not key:
        return 9
    c = key[0]
    if is_latin(c):
        return 0
    if is_kana(c):
        return 1
    if is_cjk(c):
        return 2
    return 3

# ---------- 解析 map.js ----------

def load_map_js(path: Path):
    text = path.read_text(encoding="utf-8")

    m = re.search(
        r"export\s+const\s+songMap\s*=\s*({[\s\S]*?})\s*;",
        text
    )
    if not m:
        raise RuntimeError("未在 map.js 中找到 songMap")

    body = m.group(1)

    entries = []

    # 匹配："键名": ["第一项", ...]
    item_re = re.compile(
        r'"([^"]+)"\s*:\s*\[\s*"([^"]+)"',
        re.S
    )

    for key, first in item_re.findall(body):
        entries.append({
            "key": key,
            "first": first,
        })

    return entries

# ---------- 主流程 ----------

def main():
    entries = load_map_js(MAP_JS)

    # 分组排序：组优先级 + 组内 Unicode 排序
    entries.sort(
        key=lambda e: (
            sort_group(e["key"]),
            e["first"]
        )
    )

    lines = []
    lines.append("# 所有曲目")
    lines.append("")

    for e in entries:
        lines.append(f'- [{e["first"]}](./?q={e["key"]})')

    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"✓ 已生成 {OUT_MD}")

if __name__ == "__main__":
    main()
