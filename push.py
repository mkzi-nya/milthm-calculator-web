import os
import sys
import hashlib

def x(ouo):
    if not ouo in ['y','Y','yes','Yes','YES']:
        print("abort.")
        exit(0)

def short(c):
    return c if len(c) <= 16 else c[:15]

# 自动切换目录
orig_dir = os.getcwd()
script_dir = os.path.abspath(os.path.dirname(__file__))
os.chdir(script_dir)

# 判断是否带y参数
auto_yes = len(sys.argv) > 1 and sys.argv[1].lower() == 'y'

if not auto_yes:
    ui = input("真的要继续吗？确保你的修改已应用于index.model.html，所有index.html的修改将丢失！(y/[n])：")
    x(ui)

# 读取两个 JS 文件并生成哈希
with open("./js/cha_newui.js", "rb") as f:
    js1_hash = short(hashlib.md5(f.read()).hexdigest()).encode()

with open("./js/constant.js", "rb") as f:
    js2_hash = short(hashlib.md5(f.read()).hexdigest()).encode()

# 读取模板
with open("index.model.html", "rb") as f:
    c = f.read()

# 按行替换哈希占位符
lines = c.splitlines()
new_lines = []
for line in lines:
    if b"cha_newui.js" in line and b"oiiaiooiiiai" in line:
        new_lines.append(line.replace(b"oiiaiooiiiai", js1_hash))
    elif b"constant.js" in line and b"oiiaiooiiiai" in line:
        new_lines.append(line.replace(b"oiiaiooiiiai", js2_hash))
    else:
        new_lines.append(line)

# 写入新文件
with open("index.html", "wb+") as f:
    f.write(b"\n".join(new_lines))

# git 自动提交
cmd = "git add . && git commit -m \"meow\" && git push origin main"

if not auto_yes:
    ui = input(f"要执行 {cmd} 吗？(y/[n])：")
    x(ui)

os.system(cmd)

# 切回原目录
os.chdir(orig_dir)
