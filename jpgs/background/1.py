from PIL import Image, ImageEnhance

# 要处理的图片文件名
filenames = ["1.jpg", "2.jpg"]

for filename in filenames:
    try:
        # 打开图片
        image = Image.open(filename)

        # 创建亮度调节器（0.7表示降低30%）
        enhancer = ImageEnhance.Brightness(image)
        image_enhanced = enhancer.enhance(0.7)

        # 保存新图像（添加后缀以示区别）
        new_filename = f"dimmed_{filename}"
        image_enhanced.save(new_filename)

        print(f"处理完成：{new_filename}")

    except Exception as e:
        print(f"无法处理 {filename}：{e}")