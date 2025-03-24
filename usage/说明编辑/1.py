import os
import re

def load_insert_blocks(filename='1.txt'):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    
    inserts = {}
    key = None
    brace_stack = 0
    buffer = ""
    i = 0
    while i < len(text):
        if text[i] == '"' and key is None:  # 寻找新的键开始
            start_key = i + 1
            end_key = text.find('"', start_key)
            key = text[start_key:end_key]
            i = end_key + 1
        elif text[i] == '{':
            if brace_stack == 0:
                start_content = i + 1
            brace_stack += 1
        elif text[i] == '}':
            brace_stack -= 1
            if brace_stack == 0 and key is not None:
                inserts[key] = text[start_content:i].strip()
                key = None
        i += 1
    
    return inserts

def process_md_file(md_path, inserts):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace(match):
        key = match.group(1).strip()
        return inserts.get(key, f'{{{{{key}}}}}')  # 保留原样如果找不到

    result = re.sub(r'{{([^{}]+)}}', replace, content)

    output_path = f"output_{os.path.basename(md_path)}"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(result)

    print(f"生成：{output_path}")

def main():
    inserts = load_insert_blocks()
    for filename in os.listdir('.'):
        if filename.endswith('.md'):
            process_md_file(filename, inserts)

if __name__ == '__main__':
    main()
