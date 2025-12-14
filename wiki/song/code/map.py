import json
import re
from pathlib import Path

PACKED_DOC = Path("packed_document.json")
CHARTINFO = Path("chartinfo.json")
OUT_JS = Path("map.js")

DIFF_ORDER = ["Drizzle", "Sprinkle", "Cloudburst", "Clear", "Special"]

# ---------- utils ----------

def latin_title_to_key(latin):
    if not latin:
        return None
    if isinstance(latin, list):
        s = " ".join(map(str, latin))
    else:
        s = str(latin)
    s = s.strip().replace(" ", "_")
    s = re.sub(r"[^A-Za-z0-9_\-]", "", s)
    return s or None

# ---------- load data ----------

packed_docs = json.loads(PACKED_DOC.read_text(encoding="utf-8"))
chartinfo = json.loads(CHARTINFO.read_text(encoding="utf-8"))

doc_by_id = {d["id"]: d for d in packed_docs}

# ---------- build map ----------

song_map = {}

for key, info in chartinfo.items():
    chart_id = info.get("id")
    if not isinstance(chart_id, str):
        continue

    if "_" not in key:
        continue

    base, diff = key.rsplit("_", 1)
    if diff not in DIFF_ORDER:
        continue

    song_id = info.get("id")
    doc = doc_by_id.get(song_id)
    if not doc:
        continue

    latin_key = latin_title_to_key(doc.get("latinTitle")) or base

    if latin_key not in song_map:
        song_map[latin_key] = {
            "original": doc.get("title"),
            "diffs": {},
        }

    song_map[latin_key]["diffs"][diff] = chart_id

# ---------- write map.js ----------

lines = []
lines.append("export const songMap = {")

for latin, data in sorted(song_map.items()):
    # ⚠️ 关键：key 用 json.dumps 强制加引号
    key_js = json.dumps(latin, ensure_ascii=False)

    row = [json.dumps(data["original"], ensure_ascii=False)]
    for diff in DIFF_ORDER:
        if diff in data["diffs"]:
            row.append(json.dumps(data["diffs"][diff], ensure_ascii=False))

    js_array = "[" + ", ".join(row) + "]"
    lines.append(f"  {key_js}: {js_array},")

lines.append("};")
lines.append("")

OUT_JS.write_text("\n".join(lines), encoding="utf-8")

print("✓ 已生成 map.js（所有 key 均为字符串，语法安全）")
