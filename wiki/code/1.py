#!/usr/bin/env python3
import os
import subprocess
import re

CUR_DIR = os.getcwd()
OUT_DIR = os.path.abspath(os.path.join(CUR_DIR, ".."))

def minify_html(html: str) -> str:
    # 去掉 HTML 注释
    html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)
    # 去掉标签间空白
    html = re.sub(r'>\s+<', '><', html)
    # 压缩多余空白
    html = re.sub(r'\s+', ' ', html)
    return html.strip()

def main():
    for name in os.listdir(CUR_DIR):
        if not name.lower().endswith(".md"):
            continue

        base = name[:-3]
        html_name = base + ".html"

        md_path = os.path.join(CUR_DIR, name)
        html_path = os.path.join(CUR_DIR, html_name)

        if not os.path.isfile(html_path):
            continue

        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()

        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        if "{{markdown}}" not in html_content:
            continue

        # ⭐ 分离模板
        parts = html_content.split("{{markdown}}", 1)
        html_before = minify_html(parts[0])
        html_after = minify_html(parts[1])

        # ⭐ 只拼接，不动 md
        result = html_before + md_content + html_after

        out_path = os.path.join(OUT_DIR, html_name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(result)

        print(f"[OK] {name} -> ../{html_name}")

    chartdev = os.path.join(CUR_DIR, "chartdev.py")
    if os.path.isfile(chartdev):
        subprocess.run(["python3", chartdev], check=False)

    charter = os.path.join(CUR_DIR, "charter.py")
    if os.path.isfile(charter):
        subprocess.run(["python3", charter], check=False)

if __name__ == "__main__":
    main()