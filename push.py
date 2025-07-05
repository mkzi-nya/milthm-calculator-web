import random
import os
import sys

def rdBytes(length):
    return "".join([random.choice("abcdef1234567890") for _ in range(length)]).encode()

def x(ouo):
    if not ouo in ['y','Y','yes','Yes','YES']:
        print("abort.")
        exit(0)

# 自动切换目录
orig_dir = os.getcwd()
script_dir = os.path.abspath(os.path.dirname(__file__))
os.chdir(script_dir)

# 判断是否带y参数
auto_yes = len(sys.argv) > 1 and sys.argv[1].lower() == 'y'

rn = rdBytes(16)

if not auto_yes:
    ui = input("真的要继续吗？确保你的修改已应用于index.model.html，所有index.html的修改将丢失！(y/[n])：")
    x(ui)

with open("index.model.html", "rb") as f:
    c = f.read()

with open("index.html", "wb+") as f:
    r = c.replace(b'!##oiiaiooiiiai##!', rn)
    f.write(r)

cmd = "git add . && git commit -m \"meow\" && git push origin main"

if not auto_yes:
    ui = input(f"要执行 {cmd} 吗？(y/[n])：")
    x(ui)

os.system(cmd)

# 切回原目录
os.chdir(orig_dir)
