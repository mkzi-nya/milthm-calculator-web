import os
import base64
from PIL import Image
from io import BytesIO

def song_name_to_css_class(name: str) -> str:
    """
    与前端 JS 的 songNameToCssClass 完全一致：
      - 空格 / 连字符 -> _
      - 删除 ( ) ?
      - 删除 !
      - 删除 .
      - 删除 #
      - 删除 ~
      - 转小写
      - 结果为空时返回 'nya'
    """
    cleaned = str(name)
    cleaned = cleaned.replace(' ', '_').replace('-', '_')
    cleaned = cleaned.replace('(', '').replace(')', '').replace('?', '')
    cleaned = cleaned.replace('!', '')
    cleaned = cleaned.replace('.', '')
    cleaned = cleaned.replace('#', '')
    cleaned = cleaned.replace('~', '')
    cleaned = cleaned.replace('&', '')
    cleaned = cleaned.lower()
    return cleaned or 'nya'


def process_images_to_css(output_css='../images.css'):
    css_content = "/* Auto-generated CSS with embedded images */\n"

    # 处理不压缩的特殊背景图片
    special_images = [
        ('./背景.jpg', 'background-image', False),
        ('./background/2.jpg', 'bg-image-2', False),
        ('./background/3.jpg', 'bg-image-3', False)
    ]

    for filepath, class_name, should_resize in special_images:
        if os.path.exists(filepath):
            try:
                with Image.open(filepath) as img:
                    buffered = BytesIO()
                    img_format = 'JPEG' if filepath.lower().endswith('.jpg') else 'PNG'
                    img.save(buffered, format=img_format, quality=100)
                    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

                    css_content += f".{class_name} {{\n"
                    css_content += f"  background-image: url('data:image/{img_format.lower()};base64,{img_base64}');\n"
                    css_content += "  background-size: cover;\n"
                    css_content += "}\n\n"

                    print(f"Processed (no resize): {filepath} -> .{class_name}")
            except Exception as e:
                print(f"Error processing {filepath}: {str(e)}")

    # 处理数字图片 (0.png 到 60.png)
    for num in range(0, 61):
        filename = f"{num}.png"
        if os.path.exists(filename):
            try:
                with Image.open(filename) as img:
                    img = img.resize((91, 91), Image.Resampling.LANCZOS)

                    buffered = BytesIO()
                    img.save(buffered, format="PNG", optimize=True)
                    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

                    css_content += f".icon-{num} {{\n"
                    css_content += f"  width: 91px;\n"
                    css_content += f"  height: 91px;\n"
                    css_content += f"  background-image: url('data:image/png;base64,{img_base64}');\n"
                    css_content += "  background-size: contain;\n"
                    css_content += "}\n\n"

                    print(f"Processed: {filename} -> .icon-{num}")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

    # 处理普通 JPG 图片
    for filename in os.listdir('.'):
        if filename.lower().endswith('.jpg') and filename not in ['背景.jpg']:
            try:
                with Image.open(filename) as img:
                    img = img.resize((110, 70), Image.Resampling.LANCZOS)

                    buffered = BytesIO()
                    img.save(buffered, format="JPEG", quality=85, optimize=True)
                    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

                    base_name = os.path.splitext(filename)[0]
                    class_name = song_name_to_css_class(base_name)

                    css_content += f".{class_name} {{\n"
                    css_content += f"  width: 110px;\n"
                    css_content += f"  height: 70px;\n"
                    css_content += f"  background-image: url('data:image/jpeg;base64,{img_base64}');\n"
                    css_content += "  background-size: cover;\n"
                    css_content += "}\n\n"

                    print(f"Processed: {filename} -> .{class_name}")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

    # 写入 CSS 文件
    with open(output_css, 'w', encoding='utf-8') as f:
        f.write(css_content)

    print(f"\nCSS file generated: {output_css}")
    print("Usage example: <div class='background-image'></div> for full-size backgrounds")
    print("              <div class='icon-5'></div> for number icons")


if __name__ == "__main__":
    process_images_to_css()