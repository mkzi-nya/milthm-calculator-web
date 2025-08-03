import sys
import re

# 假名字体映射表
katakana_font = {
    'A': 'ㄙ', 'B': 'ㄯ', 'C': 'ㄈ', 'D': 'ワ', 'E': '⋿', 'F': 'チ', 'G': 'Ᏽ', 'H': 'サ',
    'I': 'エ', 'J': ' 𝙅', 'K': 'ケ', 'L': '㆑', 'M': '巾', 'N': 'ウ', 'O': 'ロ', 'P': 'ア',
    'Q': '∅', 'R': 'Ʀ', 'S': 'ㄎ', 'T': 'ナ', 'U': 'ㄩ', 'V': '√', 'W': '山', 'X': 'メ',
    'Y': 'ン', 'Z': 'て', '1':'イ', '2':'ㄹ', '3':'ヨ', '4':'ㄣ', '5': 'ㄎ', '6':'〥', '7':'フ', '8':'ㄖ', '9':'ヌ', '0':'ㇿ'
}

# 合并大小写映射
katakana_font.update({k.lower(): v for k, v in katakana_font.items()})

def convert_text(text):
    """转换文本但跳过数学公式块"""
    return ''.join([katakana_font.get(ch, ch) for ch in text])

def protect_math_blocks(text):
    """保护数学公式块不被转换"""
    parts = []
    last_end = 0
    
    # 查找所有数学公式块
    for match in re.finditer(r'\$\$(.*?)\$\$', text, flags=re.DOTALL):
        start, end = match.span()
        # 添加前面的需要处理的部分
        if start > last_end:
            parts.append((text[last_end:start], True))
        # 添加不需要处理的数学公式块
        parts.append((match.group(), False))
        last_end = end
    
    # 添加最后的需要处理的部分
    if last_end < len(text):
        parts.append((text[last_end:], True))
    
    # 处理各部分
    result = []
    for content, should_convert in parts:
        if should_convert:
            # 处理非数学公式部分
            result.append(convert_other_content(content))
        else:
            # 保留数学公式原样
            result.append(content)
    
    return ''.join(result)

def convert_other_content(text):
    """转换非数学公式的内容"""
    # 处理代码块
    text = re.sub(r'```(.*?)```', 
                 lambda m: f'```{convert_text(m.group(1))}```', 
                 text, flags=re.DOTALL)
    
    # 处理三引号块
    text = re.sub(r"'''(.*?)'''", 
                 lambda m: f"'''{convert_text(m.group(1))}'''", 
                 text, flags=re.DOTALL)
    
    # 转换方括号内容
    text = re.sub(r'\[(.*?)\]', 
                 lambda m: f'[{convert_text(m.group(1))}]', 
                 text)
    
    # 转换锚点链接
    text = re.sub(r'\[(.*?)\]\((#.*?)\)', 
                 lambda m: f'[{convert_text(m.group(1))}]({convert_text(m.group(2))})', 
                 text)
    
    # 转换剩余文本（跳过HTML标签和普通URL）
    parts = []
    last_end = 0
    
    for match in re.finditer(r'(<[^>]+>)|(\[.*?\]\([^#][^)]*\))', text):
        start, end = match.span()
        if start > last_end:
            parts.append((text[last_end:start], True))
        parts.append((match.group(), False))
        last_end = end
    
    if last_end < len(text):
        parts.append((text[last_end:], True))
    
    result = []
    for content, should_convert in parts:
        if should_convert:
            result.append(convert_text(content))
        else:
            result.append(content)
    
    return ''.join(result)

def main():
    input_file = "usage_en.md"
    output_file = "usage_ken.md"

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        converted_content = protect_math_blocks(content)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(converted_content)
        
        print(f"转换完成！文件已保存为: {output_file}")
    except FileNotFoundError:
        print("找不到文件:", input_file)
    except Exception as e:
        print("出错:", e)

if __name__ == "__main__":
    main()