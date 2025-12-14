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

def md_escape_table_cell(s):
    if s is None:
        return "-"
    return str(s).replace("|", r"\|")

def bpm_to_str(bpm):
    if not bpm:
        return "-"

    def fmt(x):
        return str(int(x)) if isinstance(x, (int, float)) and x == int(x) else str(x)

    if len(bpm) == 1:
        return fmt(bpm[0]["bpm"])

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

def format_ct(ct):
    if ct is None:
        return "-"

    try:
        ct = float(ct)
    except Exception:
        return str(ct)

    base = int(ct)
    frac = ct - base

    return f"{base}+ ({ct})" if frac >= 0.5 else f"{base} ({ct})"

# ---------- 表格裁剪（已修复） ----------
def split_md_table_row(row: str):
    """
    安全地拆分 Markdown 表格行
    - 不会把 \\| 当成分隔符
    - 返回 cell 列表（不含首尾空列）
    """
    cells = []
    buf = []
    escape = False

    for ch in row.strip():
        if escape:
            buf.append(ch)
            escape = False
        elif ch == "\\":
            buf.append(ch)
            escape = True
        elif ch == "|":
            cells.append("".join(buf).strip())
            buf = []
        else:
            buf.append(ch)

    cells.append("".join(buf).strip())

    # 去掉首尾空列（Markdown 表格语法）
    if cells and cells[0] == "":
        cells = cells[1:]
    if cells and cells[-1] == "":
        cells = cells[:-1]

    return cells

def trim_chart_table_lines(lines, exist_diffs):
    out = []
    i = 0

    valid_diffs = [d for d in DIFF_ORDER if d in exist_diffs]

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

            header = split_md_table_row(table[0])

            # 第 0 列是「难度 / 等级 / Note数量 / 谱师」
            keep_idx = [0]

            for idx, cell in enumerate(header[1:], start=1):
                if any(d in cell for d in valid_diffs):
                    keep_idx.append(idx)

            for row in table:
                cells = split_md_table_row(row)

                # 补齐列数
                while len(cells) <= max(keep_idx):
                    cells.append("-")

                new_cells = [cells[j] for j in keep_idx]
                out.append("| " + " | ".join(new_cells) + " |")

            continue

        i += 1

    return out

# ---------- 数据加载 ----------

constants = load_constant_js(CONST_JS)
packed_docs = json.loads(PACKED_DOC.read_text(encoding="utf-8"))
chartinfo = json.loads(CHARTINFO.read_text(encoding="utf-8"))
base_tpl = BASE_MD.read_text(encoding="utf-8")

doc_by_chart_id = {d["id"]: d for d in packed_docs if "id" in d}

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

    chart_by_diff = {
        k.split("_", 1)[1]: v
        for k, v in chartinfo.items()
        if k.startswith(info_title + "_")
    }

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

        if base_doc.get("title") == list_to_str(base_doc.get("latinTitle")):
            md = re.sub(r"\|\s*拉丁文曲名\s*\|.*?\n", "", md)

    md = md.replace(f"{{ct,{DIFF_SHORT[diff]}}}", format_ct(ct_value))

    for dname, info in chart_by_diff.items():
        combo = info.get("combo") or info.get("noteCount")
        if combo is not None:
            md = md.replace(f"{{info:combo,{dname}}}", str(combo))

    for dname, info in chart_by_diff.items():
        chart_id = info.get("id")
        charter_doc = doc_by_chart_id.get(chart_id)
        if charter_doc and charter_doc.get("charter"):
            md = md.replace(
                f"{{doc:charter,{dname}}}",
                md_escape_table_cell(charter_doc["charter"])
            )

    lines = md.splitlines()
    lines = trim_chart_table_lines(lines, list(chart_by_diff.keys()))
    md = "\n".join(lines)

    md_path.write_text(md, encoding="utf-8")

print("✓ 所有曲目处理完成（裁剪 / 等级 / charter / 拉丁名去重）")
