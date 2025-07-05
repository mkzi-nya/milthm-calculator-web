import os
import sys
import hashlib
def x(ouo):
    if not ouo in ['y','Y','yes','Yes','YES']:
        print("abort.")
        exit(0)
def short(c):
    return c if len(c)<=16 else c[:15]
# 自动切换目录
orig_dir = os.getcwd()
script_dir = os.path.abspath(os.path.dirname(__file__))
os.chdir(script_dir)

# 判断是否带y参数
auto_yes = len(sys.argv) > 1 and sys.argv[1].lower() == 'y'

if not auto_yes:
    ui = input("真的要继续吗？确保你的修改已应用于index.model.html，所有index.html的修改将丢失！(y/[n])：")
    x(ui)

with open("index.model.html", "rb") as f:
    c = f.read()

with open("index.html", "wb+") as f:
    r = c.replace(b'!##oiiaiooiiiai##!', short(hashlib.md5(c).hexdigest()).encode())
    f.write(r)

cmd = "git add . && git commit -m \"meow\" && git push origin main"

if not auto_yes:
    ui = input(f"要执行 {cmd} 吗？(y/[n])：")
    x(ui)

os.system(cmd)

# 切回原目录
os.chdir(orig_dir)
