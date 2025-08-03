import sys
import re

# 假名字体映射表（可根据需要扩展或调整）
katakana_font = {
    'A': 'ㄙ', 'B': 'ㄯ', 'C': 'ㄈ', 'D': 'ワ', 'E': '⋿', 'F': 'チ', 'G': 'Ᏽ', 'H': 'サ',
    'I': 'エ', 'J': ' 𝙅', 'K': 'ケ', 'L': '㆑', 'M': '巾', 'N': 'ウ', 'O': 'ロ', 'P': 'ア',
    'Q': '∅', 'R': 'Ʀ', 'S': 'ㄎ', 'T': 'ナ', 'U': 'ㄩ', 'V': '√', 'W': '山', 'X': 'メ',
    'Y': 'ン', 'Z': 'て', '1':'イ', '2':'ㄹ', '3':'ヨ', '4':'ㄣ', '5': 'ㄎ', '6':'〥', '7':'フ', '8':'ㄖ', '9':'ヌ', '0':'ㇿ'
}

# 小写字母映射
katakana_font_lower = {
    k.lower(): v for k, v in katakana_font.items()
}

# 合并映射
katakana_font.update(katakana_font_lower)

def convert_text(text):
    """直接转换文本，不跳过任何内容"""
    return ''.join([katakana_font.get(ch, ch) for ch in text])

def convert_square_brackets(text):
    """转换所有方括号[]内的内容"""
    def replace_brackets(match):
        # 分组：左括号、内容、右括号
        return f'{match.group(1)}{convert_text(match.group(2))}{match.group(3)}'
    
    # 匹配格式：[内容] 或 [内容](#anchor)
    return re.sub(r'(\[)(.*?)(\])', replace_brackets, text)

def convert_anchors(text):
    """转换锚点链接中的#部分"""
    def replace_anchor(match):
        # 分组：整个匹配、链接文本、链接URL、链接后缀
        return f'[{match.group(1)}]({convert_text(match.group(2))}{match.group(3)})'
    
    # 匹配格式：[text](#anchor) 或 [text](#anchor "title")
    return re.sub(r'\[(.*?)\]\((#.*?)([ )].*?)?\)', replace_anchor, text)

def convert_to_katakana_font(text):
    # 处理代码块（```包围的内容）
    def process_code_blocks(match):
        code_content = match.group(1)
        # 直接转换整个代码块内容
        return f'```{convert_text(code_content)}```'
    
    # 处理三引号代码块（'''包围的内容）
    def process_triple_quotes(match):
        code_content = match.group(1)
        # 直接转换整个三引号内容
        return f"'''{convert_text(code_content)}'''"
    
    # 先转换代码块
    text = re.sub(r'```(.*?)```', process_code_blocks, text, flags=re.DOTALL)
    # 再转换三引号块
    text = re.sub(r"'''(.*?)'''", process_triple_quotes, text, flags=re.DOTALL)
    
    # 转换所有方括号内的内容
    text = convert_square_brackets(text)
    
    # 转换锚点链接
    text = convert_anchors(text)
    
    # 处理剩余文本（跳过HTML标签和普通URL链接）
    parts = []
    last_end = 0
    
    # 查找所有不需要处理的部分（HTML标签、普通URL链接）
    for match in re.finditer(r'(<[^>]+>)|(\[.*?\]\([^#][^)]*\))', text):
        start, end = match.span()
        # 添加前面的需要处理的部分
        if start > last_end:
            parts.append((text[last_end:start], True))
        # 添加不需要处理的部分
        parts.append((match.group(), False))
        last_end = end
    
    # 添加最后的需要处理的部分
    if last_end < len(text):
        parts.append((text[last_end:], True))
    
    # 处理需要转换的部分
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
        
        converted_content = convert_to_katakana_font(content)
        
        # 写入输出文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(converted_content)
        
        print(f"转换完成！文件已保存为: {output_file}")
    except FileNotFoundError:
        print("找不到文件:", input_file)
    except Exception as e:
        print("出错:", e)

if __name__ == "__main__":
    main()