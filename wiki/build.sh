#!/data/data/com.termux/files/usr/bin/bash
# Milthm Wiki 一键构建
# 流程：生成定数表 md -> 生成统计 md -> 组装单页 wiki + 跳转页 + 工具返回按钮
set -e
WIKI="$(cd "$(dirname "$0")" && pwd)"
REPO="$(dirname "$WIKI")"

echo "[1/4] 生成定数表 table.md / table_c.md ..."
python3 "$WIKI/code/table.py"

echo "[2/4] 生成统计 markdown (code/) ..."
python3 "$WIKI/code/chater.py"

echo "[3/4] 组装 wiki/index.html、跳转页、返回按钮 ..."
python3 "$WIKI/build/build.py"

echo "[4/4] 完成"
echo "  入口: $WIKI/index.html"
echo "  编辑内容: $WIKI/*.md 与 $WIKI/song/*.md"
echo "  界面/脚本: $WIKI/build/style.css 与 $WIKI/build/app.js"