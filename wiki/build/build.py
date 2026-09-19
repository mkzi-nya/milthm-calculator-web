# -*- coding: utf-8 -*-
"""Milthm Wiki 构建脚本。

职责：
  1. 读取 resources.json 生成曲目侧栏导航；
  2. 将 wiki/build/style.css + shell.html 组装为 wiki/index.html（单页应用）；
  3. 复制 app.js 到 wiki/app.js；
  4. 把旧页面的 html 替换为指向合成页相应路由的跳转页；
  5. 向独立工具页（garden / chartdev / song 搜索）注入返回按钮。

用法：
  python3 build/build.py
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent          # wiki/
BUILD = Path(__file__).resolve().parent                 # wiki/build/
REPO = ROOT.parent                                     # 仓库根

sys.path.insert(0, str(ROOT / "code"))
from routes import song_base

from collate import song_sort_key

RESOURCES = REPO / "resources" / "resources.json"

# 静态页面路由：route -> (title, md文件)
PAGES: list[dict[str, Any]] = [
    {"route": "",        "label": "主页",            "file": "index.md"},
    {"route": "songs",    "label": "曲目列表",         "file": None},
]

GROUPS: list[dict[str, Any]] = [
    {
        "title": "数据表",
        "items": [
            {"route": "table",   "label": "定数表",       "file": "table.md"},
            {"route": "table-c", "label": "按定数排序",    "file": "table_c.md"},
            {"route": "reality", "label": "Reality 对照表", "file": "reality-table.md"},
            {"route": "original","label": "Milthm 独占曲",  "file": "original-songs.md"},
        ],
    },
    {
        "title": "统计",
        "items": [
            {"route": "artist",    "label": "曲师统计", "file": "artist-statistics.md"},
            {"route": "charter",   "label": "谱师统计", "file": "charter-statistics.md"},
            {"route": "illustrator","label": "画师统计", "file": "illustrator-statistics.md"},
        ],
    },
    {
        "title": "工具",
        "external": [
            {"label": "花园规划器", "href": "garden.html"},
        ],
    },
]

# 「其他页面」：Milthm 相关网站中未进入目录的页面，固定显示在左侧栏底部。
# 官方 Wiki 只保留中文地址。
OTHER_PAGES: list[dict[str, str]] = [
    {"label": "Milthm查分器（本站）", "href": "https://mkzi-nya.github.io/milthm-calculator-web/"},
    {"label": "Milthm存档解析（本站）", "href": "https://mkzi-nya.github.io/milthm-calculator-web/prefedit.html"},
    {"label": "Milthm剧情及二创文章（本站）", "href": "https://mkzi-nya.github.io/story/"},
    {"label": "score v3网页计算器（本站）", "href": "https://mkzi-nya.github.io/mil/"},
    {"label": "Milkloud（官方）", "href": "https://milkloud.milthm.cn/"},
    {"label": "官方 Wiki", "href": "https://milthm.com/wiki/hans/manual/features"},
    {"label": "Fandom", "href": "https://milthm.fandom.com/wiki/Game_Mechanics"},
    {"label": "WikiWiki", "href": "https://wikiwiki.jp/milthm/"},
]

# 章节显示顺序（未列出的章节排在最后，按名称）
CHAPTER_ORDER: list[str] = [
    "天气预报", "雨的声音", "甜与苦的一体两面", "因你而存在的理想国",
    "花裳随雨得春迟", "Notanote", "雨世界", "Electrode Core",
    "解空明镜", "梦境磁带", "露晓卉庭",
]

# 旧页面 -> 合成页路由
REDIRECTS: list[tuple[str, str]] = [
    ("song/index.html", "../index.html#/songs"),
    ("table.html", "./index.html#/table"),
    ("table_c.html", "./index.html#/table-c"),
    ("reality-table.html", "./index.html#/reality"),
    ("original-songs.html", "./index.html#/original"),
    ("artist-statistics.html", "./index.html#/artist"),
    ("charter-statistics.html", "./index.html#/charter"),
    ("illustrator-statistics.html", "./index.html#/illustrator"),
]

# tools 返回链接：相对该页面 -> 返回 wiki 的 URL
BACK_BUTTONS: list[tuple[str, str]] = [
    ("garden.html", "./index.html#/"),
]

MARK_START = "<!-- WIKI-NAV-INJECT:start -->"
MARK_END = "<!-- WIKI-NAV-INJECT:end -->"

BACK_BTN_CSS = MARK_START + """
<style>
#wiki-back{
  position:fixed;top:.7rem;left:.7rem;z-index:2147483000;
  display:inline-flex;align-items:center;gap:.35rem;
  padding:.45rem .8rem;border-radius:999px;
  background:rgba(35,35,35,.9);border:1px solid #3a3a3a;color:#42b883;
  font:600 .85rem/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,.45);backdrop-filter:blur(4px);
}
#wiki-back:hover{color:#fff;border-color:#42b883;text-decoration:none;}
</style>
<a id="wiki-back" href="{target}">&#8592; 返回 Milthm Wiki</a>
""" + MARK_END


def sanitize_latin_title(value: str) -> str:
    """与 code/chater.py 一致的 mdFileBase：非 [0-9A-Za-z] -> '_'"""
    return re.sub(r"[^0-9A-Za-z]", "_", str(value or ""))


def song_file_candidates(latin: str, key: str) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for v in [latin, key]:
        if not v:
            continue
        s = sanitize_latin_title(v)
        if s and s not in seen:
            seen.add(s)
            out.append(s)
    return out


def build_song_list() -> list[dict[str, Any]]:
    if not RESOURCES.exists():
        print("!! 未找到", RESOURCES, "，跳过曲目侧栏生成（仅保留静态页面）", file=sys.stderr)
        return []

    with RESOURCES.open("r", encoding="utf-8") as f:
        data = json.load(f)

    song_dir = ROOT / "song"
    bases = {p.stem for p in song_dir.glob("*.md")} if song_dir.exists() else set()

    songs: list[dict[str, Any]] = []
    for key, song in data.items():
        if not isinstance(song, dict):
            continue
        latin = str(song.get("latinTitle") or "")
        base = song_base(key, latin)
        chapter = str(song.get("chapter_zh_hans") or song.get("chapter") or "未分组").strip() or "未分组"
        label = key
        if latin and latin != key:
            label = f"{key}（{latin}）"
        if base is None:
            print("!! 未找到曲目 md 文件:", key, latin, file=sys.stderr)
            continue
        songs.append({"label": label, "name": key, "route": f"/song/{base}",
                      "file": f"song/{base}.md", "chapter": chapter,
                      "artist": song.get("artist", ""),
                      "latinTitle": latin,
                      "aliases": [key, latin, base, sanitize_latin_title(latin), song.get("songid", ""), song.get("Title_zh_Hans", "")] })

    # 全局排序键（英文字母 -> 日文罗马音 -> 中文拼音 -> 符号），构建期算一次
    for s in songs:
        s["sortKey"] = list(song_sort_key(s["name"], s.get("latinTitle", "")))

    # 全局排序序号：用于「全部歌曲」视图（与章节排列无关）
    for i, s in enumerate(sorted(songs, key=lambda s: s["sortKey"])):
        s["sortIndex"] = i

    # 章节按指定顺序排列，未列出的排最后；章内按统一排序键
    order = {c: i for i, c in enumerate(CHAPTER_ORDER)}
    songs.sort(key=lambda s: (order.get(s["chapter"], len(CHAPTER_ORDER)), s["chapter"], s["sortKey"]))
    return songs


def build_nav() -> dict[str, Any]:
    songs = build_song_list()
    nav: dict[str, Any] = {
        "homeFile": "index.md",
        "songSearchUrl": "index.html#/songs",
        "groups": [],
    }
    # 静态组
    static_items = [
        {"route": "/" + p["route"], "label": p["label"], "file": p["file"]}
        for p in PAGES
    ]
    nav["groups"].append({"title": "总览", "items": static_items})
    for g in GROUPS:
        group: dict[str, Any] = {"title": g["title"]}
        if g.get("items"):
            group["items"] = [
                {"route": "/" + it["route"], "label": it["label"], "file": it["file"]}
                for it in g["items"]
            ]
        if g.get("external"):
            group["external"] = [
                {"label": it["label"], "href": it["href"], "target": "_self"}
                for it in g["external"]
            ]
        nav["groups"].append(group)
    nav["otherPages"] = [
        {"label": it["label"], "href": it["href"], "target": "_self"}
        for it in OTHER_PAGES
    ]
    nav["songs"] = songs
    known_files = {song["file"] for song in songs}
    nav["archived"] = []
    for path in sorted((ROOT / "song").glob("*.md")):
        file = f"song/{path.name}"
        if file in known_files:
            continue
        match = re.search(r"^# (.+)$", path.read_text(encoding="utf-8"), re.M)
        title = match.group(1).strip() if match else path.stem
        nav["archived"].append({"name": title, "file": file, "route": f"/song/{path.stem}"})
    nav["documents"] = {p.stem: f"song/{p.name}" for p in sorted((ROOT / "song").glob("*.md"))}
    return nav


def write_index_html(nav: dict[str, Any]) -> None:
    css = (BUILD / "style.css").read_text(encoding="utf-8")
    shell = (BUILD / "shell.html").read_text(encoding="utf-8")
    nav_json = json.dumps(nav, ensure_ascii=False, separators=(",", ":"))
    html = shell.replace("{{CSS}}", css).replace("{{NAV}}", nav_json)
    out = ROOT / "index.html"
    out.write_text(html, encoding="utf-8")
    print("written:", out, out.stat().st_size, "bytes")

    shutil.copyfile(BUILD / "app.js", ROOT / "app.js")
    print("written:", ROOT / "app.js")


def write_redirects() -> None:
    tpl = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<noscript><meta http-equiv="refresh" content="0; url={url}"></noscript>
<title>跳转到 Milthm Wiki</title>
<style>body{{background:#1a1a1a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-size:15px}}</style>
</head>
<body>正在跳转到 Milthm Wiki…</body>
<script>
var target = new URL("{url}", location.href);
target.search = location.search;
if (location.hash) target.hash += '#' + location.hash.slice(1);
location.replace(target.href);
</script>
</html>
"""
    for rel, url in REDIRECTS:
        p = ROOT / rel
        p.write_text(tpl.format(url=url.replace('"', "%22")), encoding="utf-8")
        print("redirect:", p)

    # code/ 目录下的本地副本也改为跳转
    code_redirects = [
        ("code/index.html", "../index.html#/"),
        ("code/artist-statistics.html", "../index.html#/artist"),
        ("code/charter-statistics.html", "../index.html#/charter"),
        ("code/illustrator-statistics.html", "../index.html#/illustrator"),
        ("code/original-songs.html", "../index.html#/original"),
    ]
    for rel, url in code_redirects:
        p = ROOT / rel
        p.write_text(tpl.format(url=url.replace('"', "%22")), encoding="utf-8")
        print("redirect:", p)


def inject_back_buttons() -> None:
    for rel, target in BACK_BUTTONS:
        p = ROOT / rel
        if not p.exists():
            print("!! 跳过（不存在）:", p, file=sys.stderr)
            continue
        html = p.read_text(encoding="utf-8")
        if MARK_START in html:
            continue
        btn = BACK_BTN_CSS.replace("{target}", target)
        if "</body>" in html:
            html = html.replace("</body>", btn + "\n</body>", 1)
        else:
            html += btn
        p.write_text(html, encoding="utf-8")
        print("injected back button:", p)


def sync_generated_md() -> None:
    """由 code/ 生成脚本产出的 md 同步到 wiki 根目录。

    code/ 保存源文件，wiki/ 根目录保存直接供页面读取的副本；
    index.md 源文件带一个前导空行，同步时去掉。
    """
    syncs = [
        ("code/artist-statistics.md", "artist-statistics.md", False),
        ("code/charter-statistics.md", "charter-statistics.md", False),
        ("code/illustrator-statistics.md", "illustrator-statistics.md", False),
        ("code/index.md", "index.md", True),
        ("code/original-songs.md", "original-songs.md", False),
    ]
    for src, dst, strip_leading_newline in syncs:
        s = ROOT / src
        d = ROOT / dst
        if not s.exists():
            print("!! 缺失生成源:", s, file=sys.stderr)
            continue
        data = s.read_bytes()
        if strip_leading_newline:
            data = data.lstrip(b"\n")
        if not d.exists() or d.read_bytes() != data:
            d.write_bytes(data)
            print("synced:", d)


def main() -> None:
    sync_generated_md()
    nav = build_nav()
    write_index_html(nav)
    write_redirects()
    inject_back_buttons()
    print("done.")


if __name__ == "__main__":
    main()