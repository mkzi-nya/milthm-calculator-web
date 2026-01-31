import os
import re
import requests

# ---------- 短链解析 ----------

def resolve_short_link(url: str) -> str:
    if "b23.tv" in url or "163cn.tv" in url:
        try:
            r = requests.head(url, allow_redirects=False, timeout=5)
            return r.headers.get("Location", url)
        except Exception:
            return url
    return url

# ---------- ID 提取 ----------

def extract_bvid(url: str):
    m = re.search(r"(BV[0-9A-Za-z]+)", url)
    return m.group(1) if m else None

def extract_netease_id(url: str):
    m = re.search(r"id=(\d+)", url)
    return m.group(1) if m else None

# ---------- iframe 模板 ----------

def bilibili_iframe(bvid: str) -> str:
    return (
        '<div style="position: relative; width: 50%; aspect-ratio: 16 / 9;">\n'
        f'<iframe style="position:absolute;width:100%;height:100%;left:0;top:0;"src="//www.bilibili.com/blackboard/html5mobileplayer.html?danmaku=0&fjw=0&hideCoverInfo=0&isOutside=true&bvid={bvid}&p=1"rameborder="no"scrolling="no"></iframe>\n'
        '</div>\n'
    )

def netease_iframe(song_id: str) -> str:
    return (
        f'<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id={song_id}&auto=0&height=66"></iframe>\n'
    )

# ---------- Markdown 处理 ----------

def process_markdown(path: str):
    with open(path, "r", encoding="utf-8") as f:
        lines = f.read().splitlines()

    out = []
    changed = False
    i = 0

    while i < len(lines):
        line = lines[i]
        out.append(line)

        m = re.match(r"- \[【(Bilibili|网易云音乐)】\]\(([^)]+)\)", line)
        if not m:
            i += 1
            continue

        platform, url = m.groups()

        # ⭐ 核心规则：只看下一行是否以 < 开头
        next_line = lines[i + 1] if i + 1 < len(lines) else ""
        if next_line.lstrip().startswith("<"):
            i += 1
            continue

        url = resolve_short_link(url)
        iframe = None

        if platform == "Bilibili":
            bvid = extract_bvid(url)
            if bvid:
                iframe = bilibili_iframe(bvid)

        elif platform == "网易云音乐":
            song_id = extract_netease_id(url)
            if song_id:
                iframe = netease_iframe(song_id)

        if iframe:
            out.append(iframe)
            changed = True

        i += 1

    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write("\n".join(out))
        print(f"✔ updated: {path}")

# ---------- 入口 ----------

def main():
    for file in os.listdir("."):
        if file.endswith(".md"):
            process_markdown(file)

if __name__ == "__main__":
    main()
