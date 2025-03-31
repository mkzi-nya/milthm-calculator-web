from PIL import Image
import os

# 获取当前目录
current_directory = os.getcwd()

# 遍历当前目录下所有的文件
for filename in os.listdir(current_directory):
    # 只处理以 .png 结尾的文件
    if filename.endswith(".png"):
        # 构造完整的文件路径
        file_path = os.path.join(current_directory, filename)
        
        # 打开图片
        with Image.open(file_path) as img:
            # 调整图片大小
            # img = img.resize((512, 512))
            
            # 构造新的文件名，修改扩展名为 .jpg
            new_filename = os.path.splitext(filename)[0] + ".jpg"
            new_file_path = os.path.join(current_directory, new_filename)
            
            # 保存为 .jpg 格式
            img.convert("RGB").save(new_file_path, "JPEG")
            print(f"Converted {filename} to {new_filename}")
