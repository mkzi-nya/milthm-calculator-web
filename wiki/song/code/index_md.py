import re
import json
from pathlib import Path

MAP_JS = Path("../map.js")
OUT_MD = Path("./index.md")

# ---------------- utils ----------------

def parse_map_js(text: str):
    """
    解析：
    export const songMap = {
      "Key": ["Original", ...],
    };
    """
    obj = {}

    # 提取 "key": [ ... ]
    pattern = re.compile(
        r'"([^"]+)"\s*:\s*\[(.*?)\]',
        re.S
    )

    for key, arr in pattern.findall(text):
        # 只解析数组第一个字符串（original）
        m = re.search(r'"([^"]+)"', arr)
        if not m:
            continue
        original = m.group(1)
        obj[key] = original

    return obj


def char_group(s: str):
    """
    返回排序优先级 + 辅助排序 key
    """
    if not s:
        return (99, "")

    c = s[0]

    # 1. 大写字母
    if "A" <= c <= "Z":
        return (0, s)

    # 2. 小写字母
    if "a" <= c <= "z":
        return (1, s)

    code = ord(c)

    # 3. 日文（假名 + 常用汉字范围）
    if (
        0x3040 <= code <= 0x309F or  # Hiragana
        0x30A0 <= code <= 0x30FF or  # Katakana
        0x31F0 <= code <= 0x31FF or
        0xFF66 <= code <= 0xFF9D
    ):
        return (2, s)

    # 4. 中文（CJK Unified Ideographs）
    if 0x4E00 <= code <= 0x9FFF:
        return (3, s)

    # 5. 其他符号
    return (4, s)


# ---------------- main ----------------

text = MAP_JS.read_text(encoding="utf-8")
song_map = parse_map_js(text)

items = list(song_map.items())  # (key, original)

items.sort(key=lambda kv: char_group(kv[1]))

lines = ["# 所有曲目", ""]

for key, original in items:
    lines.append(f"- [{original}](./?q={key})")

OUT_MD.write_text("\n".join(lines), encoding="utf-8")

print(f"✓ 已生成 {OUT_MD}")
