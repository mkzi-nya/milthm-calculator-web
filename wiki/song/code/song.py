import re
import json
from pathlib import Path

BASE_MD = Path("base.md")
CONST_JS = Path("constant.js")
PACKED_DOC = Path("packed_document.json")
CHARTINFO = Path("chartinfo.json")
SONG_DIR = Path("../")

SONG_DIR.mkdir(exist_ok=True)

DIFF_ORDER = ["Drizzle", "Sprinkle", "Cloudburst", "Clear", "Special"]

DIFF_ALIAS = {
    "DZ": "Drizzle", "Drizzle": "Drizzle",
    "SK": "Sprinkle", "Sprinkle": "Sprinkle",
    "CB": "Cloudburst", "Cloudburst": "Cloudburst",
    "CL": "Clear", "Clear": "Clear",
    "SP": "Special", "Special": "Special",
    "Ø": "Cloudburst",
}

DIFF_SHORT = {
    "Drizzle": "DZ",
    "Sprinkle": "SK",
    "Cloudburst": "CB",
    "Clear": "CL",
    "Special": "SP",
}

# ---------- constant.js ----------

def load_constant_js(path: Path):
    text = path.read_text(encoding="utf-8")
    m = re.search(r"const\s+constantsData\s*=\s*({[\s\S]*?})\s*;", text)
    if not m:
        raise RuntimeError("constantsData not found")

    body = m.group(1)
    result = {}
    pair_re = re.compile(r'"([^"]+)"\s*:\s*\[(.*?)\]', re.S)

    for key, arr_body in pair_re.findall(body):
        items, buf = [], ""
        in_str = escape = False

        def flush():
            nonlocal buf
            s = buf.strip()
            if s == "":
                items.append(None)
            elif s.startswith('"') and s.endswith('"'):
                items.append(s[1:-1])
            else:
                try:
                    items.append(float(s))
                except Exception:
                    items.append(None)
            buf = ""

        for ch in arr_body:
            if escape:
                buf += ch
                escape = False
            elif ch == "\\":
                escape = True
                buf += ch
            elif ch == '"':
                in_str = not in_str
                buf += ch
            elif ch == "," and not in_str:
                flush()
            else:
                buf += ch
        flush()

        result[key] = items

    return result

# ---------- utils ----------

def list_to_str(v):
    return ", ".join(map(str, v)) if isinstance(v, list) else "-" if not v else str(v)

def bpm_to_str(bpm):
    if not bpm:
        return "-"

    # 工具：整数就去 .0
    def fmt(x):
        if isinstance(x, (int, float)) and x == int(x):
            return str(int(x))
        return str(x)

    # 只有一项：直接返回 bpm
    if len(bpm) == 1:
        return fmt(bpm[0]["bpm"])

    # 多项：输出 [start,bpm],[start,bpm]
    return ",".join(
        f"[{fmt(x['start'])},{fmt(x['bpm'])}]"
        for x in bpm
    )

def latin_title_to_filename(latin):
    if not latin:
        return None
    if isinstance(latin, list):
        s = " ".join(map(str, latin))
    else:
        s = str(latin)
    s = s.strip().replace(" ", "_")
    s = re.sub(r"[^A-Za-z0-9_\-]", "", s)
    return s or None

# ---------- 表格裁剪 ----------
def trim_chart_table_lines(lines, exist_diffs):
    out = []
    i = 0

    while i < len(lines):
        line = lines[i]
        out.append(line)

        if line.strip() == "## 谱面信息":
            i += 1
            table = []

            while i < len(lines) and lines[i].lstrip().startswith("|"):
                table.append(lines[i])
                i += 1

            if not table:
                continue

            # 以表头为基准
            header_cells = table[0].split("|")

            keep = [0, 1]
            for idx, cell in enumerate(header_cells[2:], start=2):
                if any(d in cell for d in exist_diffs):
                    keep.append(idx)

            keep.append(len(header_cells) - 1)
            max_idx = max(keep)

            def cut(row):
                cells = row.split("|")

                # ★ 关键修复：补齐列数
                if len(cells) <= max_idx:
                    cells.extend([""] * (max_idx + 1 - len(cells)))

                return "|".join(cells[j] for j in keep)

            out.extend(cut(r) for r in table)
            continue

        i += 1

    return out

# ---------- 数据加载 ----------

constants = load_constant_js(CONST_JS)
packed_docs = json.loads(PACKED_DOC.read_text(encoding="utf-8"))
chartinfo = json.loads(CHARTINFO.read_text(encoding="utf-8"))
base_tpl = BASE_MD.read_text(encoding="utf-8")

# ★ 建立：chart_id -> doc 映射
doc_by_chart_id = {}
for d in packed_docs:
    if "id" in d:
        doc_by_chart_id[d["id"]] = d

# ---------- 主流程 ----------

for song_id, arr in constants.items():
    raw_diff = arr[1] if isinstance(arr[1], str) else arr[2]
    diff = DIFF_ALIAS.get(raw_diff)
    if not diff:
        continue

    ct_value = arr[0] if isinstance(arr[1], str) else arr[1]

    info_title = None
    for k, v in chartinfo.items():
        if v.get("id") == song_id:
            info_title = k.rsplit("_", 1)[0]
            break
    if not info_title:
        continue

    latin_filename = None

    # 所有谱面（按难度）
    chart_by_diff = {
        k.split("_", 1)[1]: v
        for k, v in chartinfo.items()
        if k.startswith(info_title + "_")
    }

    # 任意一个 doc 用来填歌曲级信息
    first_chart = next(iter(chart_by_diff.values()), None)
    if not first_chart:
        continue

    base_doc = doc_by_chart_id.get(first_chart.get("id"))
    if not base_doc:
        continue

    latin_filename = latin_title_to_filename(base_doc.get("latinTitle"))
    filename = latin_filename or info_title
    md_path = SONG_DIR / f"{filename}.md"

    if md_path.exists():
        md = md_path.read_text(encoding="utf-8")
    else:
        md = base_tpl
        md = md.replace("{doc:title}", base_doc["title"])
        md = md.replace("{info:title}", info_title)
        md = md.replace("{doc:latinTitle}", list_to_str(base_doc.get("latinTitle")))
        md = md.replace("{doc:artistsList}", list_to_str(base_doc.get("artistsList")))
        md = md.replace("{doc:illustratorsList}", list_to_str(base_doc.get("illustratorsList")))
        md = md.replace("{doc:bpmInfo}", bpm_to_str(base_doc.get("bpmInfo")))

        dur = "-"
        for v in chart_by_diff.values():
            if "谱面时长" in v:
                dur = v["谱面时长"]
                break
        md = md.replace("{info:谱面时长}", dur)

    # ---------- ct ----------
    md = md.replace(f"{{ct,{DIFF_SHORT[diff]}}}", str(ct_value))

    # ---------- combo ----------
    for dname, info in chart_by_diff.items():
        combo = info.get("combo") or info.get("noteCount")
        if combo is not None:
            md = md.replace(f"{{info:combo,{dname}}}", str(combo))

    # ---------- ★ 新增：谱师（按难度 id 精确匹配） ----------
    for dname, info in chart_by_diff.items():
        chart_id = info.get("id")
        charter_doc = doc_by_chart_id.get(chart_id)
        if not charter_doc:
            continue

        charters = charter_doc.get("chartersList")
        if charters:
            md = md.replace(
                f"{{doc:chartersList,{dname}}}",
                list_to_str(charters)
            )

    lines = md.splitlines()
    lines = trim_chart_table_lines(lines, list(chart_by_diff.keys()))
    md = "\n".join(lines)

    md_path.write_text(md, encoding="utf-8")

print("✓ 所有曲目处理完成（combo / ct / charters 已替换）")
