from pathlib import Path
import re

TARGET_DIR = Path("..")
SUFFIXES = {".md"}

# 目标占位块（原样写清楚）
PLACEHOLDER_BLOCK = """
> 此页面正在建设中，当前为模板自动生成，部分信息可能不完整  
> 如果您愿意参与填写，可以[点此](https://github.dev/mkzi-nya/milthm-calculator-web)进行修改并提交，或联系@mkzi_nya(qq: 2450382239)
> 或[点击此处](../wiki_download.html)下载对应文档并编辑后发送至[此群](https://qm.qq.com/q/3lwpuT3l8A)（qq：699731287）
""".strip()
def normalize(text: str) -> str:
    """
    归一化文本：
    - 统一换行
    - 去掉行尾空格
    """
    lines = text.replace("\r\n", "\n").split("\n")
    return "\n".join(line.rstrip() for line in lines)

target = normalize(PLACEHOLDER_BLOCK)

deleted = []

for path in TARGET_DIR.iterdir():
    if not path.is_file():
        continue
    if path.suffix not in SUFFIXES:
        continue

    try:
        text = normalize(path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"跳过无法读取的文件: {path.name} ({e})")
        continue

    if target in text:
        path.unlink()
        deleted.append(path.name)

# 输出结果
if deleted:
    print("✓ 已删除以下文件（完整占位块匹配）：")
    for name in deleted:
        print("  -", name)
else:
    print("✓ 未找到包含完整占位块的文件")
