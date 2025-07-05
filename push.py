import random
import os
def rdBytes(length):
    return "".join([random.choice("abcdef1234567890") for _ in range(length)]).encode()
rn=rdBytes(16)
def x(ouo):
    if not ouo in ['y','Y','yes','Yes','YES']:
        print("abort.")
        exit(0)
ui=input("真的要继续吗？确保你的修改已应用于index.model.html，所有index.html的修改将丢失！(y/[n])：")
x(ui)

with open("index.model.html","rb") as f:
    c = f.read()
    f.close()
with open("index.html","wb+") as f:
    r=c.replace(b'!##oiiaiooiiiai##!',rn)
    c = f.write(r)
    f.close()

cmd="git add . && git commit -m \"meow\" && git push origin main"
ui=input(f"要执行 {cmd} 吗？(y/[n])：")
x(ui)
os.system(cmd)