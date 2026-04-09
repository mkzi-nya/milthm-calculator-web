import json
import re
import textwrap
from pathlib import Path
from urllib.parse import quote

RESOURCES_JSON = Path("../../../resources/resources.json")
AVIF_DIR = Path("mhtlim-static-files/public/resources/avif")
OUTPUT_DIR = Path("../")

DIFF_ORDER = ["Drizzle", "Sprinkle", "Cloudburst", "Clear", "Special"]

PAGE_TEMPLATE = textwrap.dedent(
    """\
    [返回目录](./)

    > 此页面正在建设中，当前为模板自动生成，部分信息可能不完整  
    > 如果您愿意参与填写，可以[点此](https://github.dev/mkzi-nya/milthm-calculator-web)进行修改并提交，或联系@mkzi_nya(qq: 2450382239)  
    > 或[点击此处](../wiki_download.html)下载对应文档并编辑后发送至[此群](https://qm.qq.com/q/3lwpuT3l8A)（qq：699731287）


    # {song_key}

    {main_artwork_block}
    {square_artwork_block}## 曲目信息
    | 曲名 | {song_link} |
    | - | - |
    | 拉丁文曲名 | {latin_title} |
    | 曲师 | {artist} |
    | 曲绘 | {illustrator} |
    | 所属曲包 | (待补充) |
    | 更新版本 | (待补充) |
    | 时长 | (待补充) |
    | BPM | {bpm} |

    ## 谱面信息
    {chart_info_table}

    ## 解锁方法

    (待补充)

    ## 曲目试听

    (待补充)

    ## 曲目相关

    (待补充)

    ## 游戏相关

    (待补充)

    {chart_preview_section}"""
)

IMAGE_BLOCK_TEMPLATE = textwrap.dedent(
    """\
    <div class="wiki-img" file="avif/{song_key}.avif"></div>
    """
)

CHART_PREVIEW_TEMPLATE = textwrap.dedent(
    """\
    ## 谱面预览

    {preview_items}
    """
)

CHART_PREVIEW_ITEM_TEMPLATE = textwrap.dedent(
    """\
    - {difficulty}
    <div class="wiki-img" file="chart/{difficulty}_{filename}.avif"></div>

    """
)


def load_resources(path: Path):
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise RuntimeError("resources.json 顶层必须为 object")
    return data


def md_escape_table_cell(value):
    if value is None:
        return "-"
    return str(value).replace("|", r"\|")


def md_escape_link_text(value):
    s = str(value)
    for ch in r"\\[]":
        s = s.replace(ch, "\\" + ch)
    return s


def list_or_scalar_to_str(value):
    if not value:
        return "-"
    if isinstance(value, list):
        return md_escape_table_cell(", ".join(map(str, value)))
    return md_escape_table_cell(value)


def bpm_to_str(song: dict):
    diff_map = song.get("difficulty") or {}
    for diff_name in DIFF_ORDER:
        diff_info = diff_map.get(diff_name)
        bpm_info = diff_info.get("bpmInfo") if isinstance(diff_info, dict) else None
        if not bpm_info:
            continue

        def fmt(x):
            if isinstance(x, (int, float)) and x == int(x):
                return str(int(x))
            return str(x)

        if len(bpm_info) == 1 and isinstance(bpm_info[0], dict) and "bpm" in bpm_info[0]:
            return fmt(bpm_info[0]["bpm"])

        parts = []
        for item in bpm_info:
            if not isinstance(item, dict):
                continue
            bpm = item.get("bpm")
            if bpm is None:
                continue
            start = item.get("start")
            if start is None:
                parts.append(fmt(bpm))
            else:
                parts.append(f"[{fmt(start)},{fmt(bpm)}]")
        return md_escape_table_cell(",".join(parts)) if parts else "-"
    return "-"


def format_ct(value):
    if value is None:
        return "-"
    try:
        ct = float(value)
    except Exception:
        return md_escape_table_cell(value)

    base = int(ct)
    frac = ct - base
    return f"{base}+ ({ct})" if frac >= 0.5 else f"{base} ({ct})"


def latin_title_to_filename(latin_title):
    if not latin_title:
        return None
    name = str(latin_title).strip()
    name = re.sub(r"[^A-Za-z0-9]", "_", name)
    return name or None


def info_href(*parts):
    encoded = ", ".join(json.dumps(str(part), ensure_ascii=False) for part in parts)
    return f"info:info({encoded})"


def make_song_link(song_key: str):
    return f'[{md_escape_link_text(song_key)}]({info_href(song_key)})'


def make_diff_link(song_key: str, diff_name: str):
    return f'[{diff_name}]({info_href(song_key, diff_name)})'


def make_image_src(filename: str):
    return f"../../resources/avif/{quote(filename)}"


def build_chart_info_table(song_key: str, diff_map: dict):
    diffs = [d for d in DIFF_ORDER if isinstance(diff_map.get(d), dict)]
    if not diffs:
        return "(待补充)"

    header = ["难度"] + [make_diff_link(song_key, d) for d in diffs]
    separator = ["-"] * len(header)
    level_row = ["等级"]
    charter_row = ["谱师"]
    combo_row = ["Note数量"]

    for diff_name in diffs:
        info = diff_map[diff_name]
        level = info.get("difficultyValue")
        if level is None:
            level = info.get("difficultyValuev2")
        charter = info.get("charter")
        combo = info.get("combo")
        if combo is None:
            combo = info.get("noteCount")

        level_row.append(format_ct(level))
        charter_row.append(md_escape_table_cell(charter) if charter else "-")
        combo_row.append(str(combo) if combo is not None else "-")

    rows = [header, separator, level_row, charter_row, combo_row]
    return "\n".join("| " + " | ".join(row) + " |" for row in rows)


def build_main_artwork_block(song_key: str):
    return IMAGE_BLOCK_TEMPLATE.format(song_key=song_key).strip() + "\n"


def build_square_artwork_block(song_key: str, avif_dir: Path):
    square_path = avif_dir / f"SquareArtwork_{song_key}.avif"
    if not square_path.exists():
        return ""
    return IMAGE_BLOCK_TEMPLATE.format(src=make_image_src(f"SquareArtwork_{song_key}.avif")).strip() + "\n\n"


def build_chart_preview_section(filename_base: str, diff_map: dict):
    """构建谱面预览部分"""
    # 获取所有存在的难度
    diffs = [d for d in DIFF_ORDER if isinstance(diff_map.get(d), dict)]
    if not diffs:
        return ""
    
    # 构建预览项
    preview_items = []
    for diff in diffs:
        preview_items.append(
            CHART_PREVIEW_ITEM_TEMPLATE.format(
                difficulty=diff,
                filename=filename_base
            )
        )
    
    # 返回完整的预览部分
    return CHART_PREVIEW_TEMPLATE.format(
        preview_items="".join(preview_items)
    )


def build_markdown(song_key: str, song: dict, avif_dir: Path, filename_base: str):
    diff_map = song.get("difficulty") or {}
    
    return PAGE_TEMPLATE.format(
        song_key=song_key,
        main_artwork_block=build_main_artwork_block(song_key),
        square_artwork_block=build_square_artwork_block(song_key, avif_dir),
        song_link=make_song_link(song_key),
        latin_title=md_escape_table_cell(song.get("latinTitle") or "-"),
        artist=list_or_scalar_to_str(song.get("artist") or song.get("artistsList")),
        illustrator=list_or_scalar_to_str(song.get("illustrator") or song.get("illustratorsList")),
        bpm=bpm_to_str(song),
        chart_info_table=build_chart_info_table(song_key, diff_map),
        chart_preview_section=build_chart_preview_section(filename_base, diff_map),
    ).rstrip() + "\n"


def main():
    OUTPUT_DIR.mkdir(exist_ok=True)
    resources = load_resources(RESOURCES_JSON)
    existing_files = {path.name for path in OUTPUT_DIR.glob("*.md")}
    seen_output_names = set(existing_files)
    created_files = []
    skipped_existing = []
    skipped_duplicate = []

    if existing_files:
        print("已存在的 md 文件（将跳过，不做任何修改）：")
        for name in sorted(existing_files):
            print(" -", name)
    else:
        print("未检测到已存在的 md 文件，将按 resources.json 生成")

    for song_key, song in sorted(resources.items(), key=lambda item: item[0]):
        if not isinstance(song, dict):
            continue

        filename_base = latin_title_to_filename(song.get("latinTitle"))
        if not filename_base:
            filename_base = latin_title_to_filename(song_key)
        if not filename_base:
            filename_base = latin_title_to_filename(song.get("songid"))
        if not filename_base:
            print(f"跳过：{song_key}，无法生成合法文件名")
            continue

        output_path = OUTPUT_DIR / f"{filename_base}.md"

        if output_path.name in existing_files:
            skipped_existing.append(output_path.name)
            continue

        if output_path.name in seen_output_names:
            skipped_duplicate.append((song_key, output_path.name))
            print(f"跳过：{song_key} -> {output_path.name}，目标文件名冲突")
            continue
        seen_output_names.add(output_path.name)

        markdown = build_markdown(song_key, song, AVIF_DIR, filename_base)
        output_path.write_text(markdown, encoding="utf-8")
        created_files.append(output_path.name)

    print(
        f"✓ 处理完成：新生成 {len(created_files)} 个，"
        f"跳过已存在 {len(skipped_existing)} 个，"
        f"跳过冲突 {len(skipped_duplicate)} 个"
    )


if __name__ == "__main__":
    main()