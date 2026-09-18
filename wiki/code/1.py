#!/usr/bin/env python3
"""Compatibility entry point for resources/updata.py and older update jobs."""
from pathlib import Path
import subprocess
import sys

WIKI = Path(__file__).resolve().parent.parent


def main():
    for script in ['code/table.py', 'code/chater.py', 'code/chartdev.py', 'build/build.py']:
        subprocess.run([sys.executable, str(WIKI / script)], cwd=WIKI, check=True)


if __name__ == '__main__':
    main()
