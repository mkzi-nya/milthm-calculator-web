import os
from PIL import Image

# 获取当前目录
current_directory = os.getcwd()

# 遍历当前目录下的所有文件
for filename in os.listdir(current_directory):
    if filename.lower().endswith('.png'):  # 检查文件扩展名是否为 PNG
        png_file_path = os.path.join(current_directory, filename)
        
        # 打开 PNG 文件
        with Image.open(png_file_path) as img:
            # 将图片转换为 RGB 模式，以便保存为 JPG 格式
            rgb_img = img.convert("RGB")
            
            # 生成 JPG 文件名
            jpg_filename = os.path.splitext(filename)[0] + '.jpg'
            jpg_file_path = os.path.join(current_directory, jpg_filename)
            
            # 保存为 JPG 格式
            rgb_img.save(jpg_file_path, 'JPEG')
        
        # 删除原 PNG 文件
        os.remove(png_file_path)

        print(f"Converted {filename} to {jpg_filename} and deleted original PNG.")
