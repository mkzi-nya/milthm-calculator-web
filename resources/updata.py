import subprocess
import sys
import os

current_dir = os.path.dirname(os.path.dirname(__file__))

for script in ["resources/qsj.py", "wiki/song/code/song.py", "wiki/code/1.py", "js/constant.py"]:
    script_path = os.path.join(current_dir, script)
    subprocess.run([sys.executable, script_path], cwd=os.path.dirname(script_path))