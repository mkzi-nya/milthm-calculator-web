import json
import re
from pathlib import Path

PACKED_DOC = Path("packed_document.json")
CHARTINFO = Path("chartinfo.json")
OUT_JS = Path("../map.js")   # ⬅️ 上一级目录

DIFF_ORDER = ["Drizzle", "Sprinkle", "Cloudburst", "Clear", "Special"]

# ---------- utils ----------

def latin_title_to_key(latin):
    if not latin:
        return None
    if isinstance(latin, list):
        s = " ".join(map(str, latin))
    else:
        s = str(latin)
    s = s.strip()
    s = re.sub(r"\s+", " ", s)
    s = s.replace(" ", "_")
    s = re.sub(r"[^A-Za-z0-9_\-]", "", s)
    return s or None


def is_pure_latin_words(title):
    return bool(re.fullmatch(r"[A-Za-z ]+", title))


def make_latin_abbr(title):
    words = title.strip().split()
    if len(words) <= 1:
        return None
    return "".join(w[0].upper() for w in words if w)


def extract_han_only(title):
    han = re.findall(r"[\u4e00-\u9fff]", title)
    if len(han) >= 2:
        return "".join(han)
    return None


def load_existing_map(js_path: Path):
    if not js_path.exists():
        return {}, set()

    text = js_path.read_text(encoding="utf-8")
    song_map = {}
    used_keys = set()

    pattern = re.compile(r'"([^"]+)"\s*:\s*\[(.*?)\]', re.S)

    for key, arr in pattern.findall(text):
        values = re.findall(r'"([^"]+)"', arr)
        if not values:
            continue

        song_map[key] = {
            "original": values[0],
            "aliases": values[1:],
        }
        used_keys.add(key)
        used_keys.update(values[1:])

    return song_map, used_keys


# ---------- load data ----------

packed_docs = json.loads(PACKED_DOC.read_text(encoding="utf-8"))
chartinfo = json.loads(CHARTINFO.read_text(encoding="utf-8"))
doc_by_id = {d["id"]: d for d in packed_docs if "id" in d}

# ---------- load existing map.js ----------

song_map, used_keys = load_existing_map(OUT_JS)

added_count = 0

# ---------- build / merge map ----------

for key, info in chartinfo.items():
    if "_" not in key:
        continue

    base, diff = key.rsplit("_", 1)
    if diff not in DIFF_ORDER:
        continue

    chart_id = info.get("id")
    if not isinstance(chart_id, str):
        continue

    doc = doc_by_id.get(chart_id)
    if not doc:
        continue

    latin_key = latin_title_to_key(doc.get("latinTitle")) or base
    if not latin_key:
        continue

    title = str(doc.get("title") or "")

    # ---------- 新主 key ----------
    if latin_key not in song_map:
        song_map[latin_key] = {
            "original": title,
            "aliases": [],
        }
        used_keys.add(latin_key)
        added_count += 1

    # ---------- alias A：拉丁缩写 ----------
    if is_pure_latin_words(title):
        abbr = make_latin_abbr(title)
        if abbr and abbr not in used_keys:
            song_map[latin_key]["aliases"].append(abbr)
            used_keys.add(abbr)

    # ---------- alias B：纯汉字 ----------
    han_alias = extract_han_only(title)
    if han_alias and han_alias not in used_keys:
        song_map[latin_key]["aliases"].append(han_alias)
        used_keys.add(han_alias)

# ---------- write map.js ----------

lines = []
lines.append("export const songMap = {")

for key in sorted(song_map.keys()):
    data = song_map[key]
    arr = [data["original"], *data["aliases"]]

    js_key = json.dumps(key, ensure_ascii=False)
    js_arr = "[" + ", ".join(json.dumps(x, ensure_ascii=False) for x in arr) + "]"

    lines.append(f"  {js_key}: {js_arr},")

lines.append("};")
lines.append("")

OUT_JS.write_text("\n".join(lines), encoding="utf-8")

print(f"✓ map.js 更新完成，新增主曲目 {added_count} 首（未覆盖旧数据）")
