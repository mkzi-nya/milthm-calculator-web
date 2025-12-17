import json
import re
from pathlib import Path

PACKED_DOC = Path("packed_document.json")
CHARTINFO = Path("chartinfo.json")
OUT_JS = Path("../map.js")

DIFF_ORDER = ["Drizzle", "Sprinkle", "Cloudburst", "Clear", "Special"]

def latin_title_to_key(v):
    if not v:
        return None
    s = " ".join(map(str, v)) if isinstance(v, list) else str(v)
    s = re.sub(r"\s+", " ", s.strip()).replace(" ", "_")
    s = re.sub(r"[^A-Za-z0-9_\-]", "", s)
    return s or None

def is_pure_latin_words(s):
    return bool(re.fullmatch(r"[A-Za-z ]+", s))

def make_latin_abbr(s):
    w = s.strip().split()
    return "".join(x[0].upper() for x in w) if len(w) > 1 else None

def extract_han_only(s):
    h = re.findall(r"[\u4e00-\u9fff]", s)
    return "".join(h) if len(h) >= 2 else None

packed_docs = json.loads(PACKED_DOC.read_text(encoding="utf-8"))
chartinfo = json.loads(CHARTINFO.read_text(encoding="utf-8"))

doc_by_id = {d["id"]: d for d in packed_docs if "id" in d}

song_map = {}

for key, info in chartinfo.items():
    if "_" not in key:
        continue
    base, diff = key.rsplit("_", 1)
    if diff not in DIFF_ORDER:
        continue

    cid = info.get("id")
    doc = doc_by_id.get(cid)
    if not isinstance(cid, str) or not doc:
        continue

    main = latin_title_to_key(doc.get("latinTitle")) or base
    if not main:
        continue

    item = song_map.setdefault(main, {
        "original": doc.get("title"),
        "aliases": set(),
        "ids": set()
    })

    item["ids"].add(cid)
    title = str(doc.get("title") or "")

    if is_pure_latin_words(title):
        abbr = make_latin_abbr(title)
        if abbr:
            item["aliases"].add(abbr)

    han = extract_han_only(title)
    if han:
        item["aliases"].add(han)

# ---------- 全局唯一去重 ----------

alias_owner = {}

# original 先占位
for main, item in song_map.items():
    orig = item["original"]
    if orig:
        alias_owner[orig] = main

for main, item in song_map.items():
    uniq = []
    for a in sorted(item["aliases"] | item["ids"]):
        if not a or a == main or a == item["original"]:
            continue
        if a not in alias_owner:
            alias_owner[a] = main
            uniq.append(a)
    item["aliases"] = uniq
    del item["ids"]

# ---------- 输出（关键修复点在这里） ----------

lines = ["export const songMap = {"]
for k in sorted(song_map):
    v = song_map[k]

    arr = []
    if v["original"] and v["original"] != k:
        arr.append(v["original"])
    arr.extend(v["aliases"])

    lines.append(
        f"  {json.dumps(k, ensure_ascii=False)}: "
        f"[{', '.join(json.dumps(x, ensure_ascii=False) for x in arr)}],"
    )
lines.append("};\n")

OUT_JS.write_text("\n".join(lines), encoding="utf-8")
