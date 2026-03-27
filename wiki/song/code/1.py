import os
import re

ROOT = "../"
AVIF_DIR = os.path.abspath(os.path.join(ROOT, "../../../resources/avif"))

IMG_MARK = '<div class="wiki-img">'

# 找标题
TITLE_PATTERN = re.compile(r"# (.+)")
# 找“曲目信息”
INFO_PATTERN = re.compile(r"## 曲目信息")


def make_img_block(title: str) -> str:
    blocks = []

    blocks.append(
        f'<div class="wiki-img">\n'
        f'  <img src="../../resources/avif/{title}.avif">\n'
        f'</div>'
    )

    square_path = os.path.join(AVIF_DIR, f"SquareArtwork_{title}.avif")
    if os.path.exists(square_path):
        blocks.append(
            f'<div class="wiki-img">\n'
            f'  <img src="../../resources/avif/SquareArtwork_{title}.avif">\n'
            f'</div>'
        )

    return "\n\n".join(blocks) + "\n\n"


def process_file(path: str):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if IMG_MARK in content:
        print(f"[SKIP IMG] {path}")
        return

    # 找标题（第一个）
    title_match = TITLE_PATTERN.search(content)
    if not title_match:
        print(f"[NO TITLE] {path}")
        return

    title = title_match.group(1).strip()

    # 找“曲目信息”位置
    info_match = INFO_PATTERN.search(content)
    if not info_match:
        print(f"[NO INFO] {path}")
        return

    insert_pos = info_match.start()

    img_block = make_img_block(title)

    # 在“## 曲目信息”前插入
    new_content = (
        content[:insert_pos]
        + img_block
        + content[insert_pos:]
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"[OK] {path} -> {title}")


def main():
    for root, _, files in os.walk(ROOT):
        for name in files:
            if name.endswith(".md"):
                process_file(os.path.join(root, name))


if __name__ == "__main__":
    main()