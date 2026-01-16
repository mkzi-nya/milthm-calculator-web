import re
from pathlib import Path

MAP_JS = Path("../map.js")
OUT_MD = Path("./index.md")

# ---------------- utils ----------------

def parse_map_js(text: str):
    obj = {}
    pattern = re.compile(r'"([^"]+)"\s*:\s*\[(.*?)\]', re.S)

    for key, arr in pattern.findall(text):
        m = re.search(r'"([^"]+)"', arr)
        if not m:
            continue
        obj[key] = m.group(1)

    return obj


def char_group(s: str):
    if not s:
        return (99, "")
    c = s[0]

    if "A" <= c <= "Z":
        return (0, s)
    if "a" <= c <= "z":
        return (1, s)

    code = ord(c)
    if (
        0x3040 <= code <= 0x309F or
        0x30A0 <= code <= 0x30FF or
        0x31F0 <= code <= 0x31FF or
        0xFF66 <= code <= 0xFF9D
    ):
        return (2, s)

    if 0x4E00 <= code <= 0x9FFF:
        return (3, s)

    return (4, s)


def extract_existing_keys(md_text: str):
    """
    从「所有曲目」章节中提取已有的 q=xxx
    """
    keys = set()

    in_song_section = False
    for line in md_text.splitlines():
        if line.startswith("# 所有曲目"):
            in_song_section = True
            continue
        if in_song_section and line.startswith("# "):
            break

        m = re.search(r"\(\./\?q=([^)]+)\)", line)
        if in_song_section and m:
            keys.add(m.group(1))

    return keys


# ---------------- main ----------------

md_text = OUT_MD.read_text(encoding="utf-8")
existing_keys = extract_existing_keys(md_text)

song_map = parse_map_js(MAP_JS.read_text(encoding="utf-8"))
items = [(k, v) for k, v in song_map.items() if k not in existing_keys]

# 没有新歌直接退出
if not items:
    print("✓ 没有需要新增的曲目")
    exit(0)

items.sort(key=lambda kv: char_group(kv[1]))
new_lines = [f"- [{v}](./?q={k})" for k, v in items]

# 插入到「所有曲目」章节末尾
out_lines = []
inserted = False
in_song_section = False

for line in md_text.splitlines():
    if line.startswith("# 所有曲目"):
        in_song_section = True
        out_lines.append(line)
        continue

    if in_song_section and line.startswith("# ") and not inserted:
        out_lines.append("")
        out_lines.extend(new_lines)
        inserted = True
        in_song_section = False

    out_lines.append(line)

# 文件结尾仍在「所有曲目」里
if in_song_section and not inserted:
    out_lines.append("")
    out_lines.extend(new_lines)

OUT_MD.write_text("\n".join(out_lines), encoding="utf-8")
print(f"✓ 已新增 {len(new_lines)} 条曲目")
