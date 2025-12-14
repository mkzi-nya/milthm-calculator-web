
## 目录

- [网站](#网站)
- [查分器使用说明](#使用说明)
  - [上传存档文件](#上传存档文件)
  - [旧版存档路径](#其他存档路径)
  - [在线客服](#在线客服)
- [(推荐查看)Milthm Wiki](../wiki/)

---

## 网站

- [k9.lv/c/](htt://k9.lv/c/)
- [mhtlim.top](https://mhtlim.top/)
- [mhtl.im](https://mhtl.im)
> 以上网站由_4everDimensions托管
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/)
> 以上网站由mkzi_nya托管

---

## 使用说明

>查分器纯属玩家自行制作，与官方并无关联

### 上传存档文件

点击主页中的 **「上传文件」** 选项，选择存档文件 `saves.db` 或推分记录文件 `data.db` 上传即可。

> **注意：**
> - `data.db` 只包含 `3.2` 更新后的游玩记录（如果未丢失）。
> - 安卓端推荐使用 [MT 管理器](https://mt2.cn/) 访问 `sdcard/Android/data` 目录。

#### 文件路径（详见 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）

[什么是文件路径](#什么是文件路径)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

  使用 [文件](https://support.apple.com//102570) 应用打开 Milthm 文件夹：

  ```text
  /data/
  ```

  > 如果找不到本地文件：进入“文件”主页右上角的三点菜单，将本地文件取消隐藏（[详见](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）。

- **Windows 用户：**  
  在资源管理器地址栏输入：  
  ```text
  %AppData%\..\LocalLow\Morizero\Milthm\data\
  ```
- **Mac OS**
  ```text
  /Library/Application Support/Morizero/Milthm/data/
  ```
- **Linux**
  ```text
  ~/.config/unity3d/Morizero/Milthm/data/
  ```

[安卓演示视频](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[IOS演示视频](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
安卓用户[没有访问权限](#没有访问权限)

---

### 旧版存档路径

若上传后无法解析，可尝试手动提取 JSON 数据并上传：

- **Android (TapTap)**
  ```text
  /data/user/0/game.taptap.morizero.milthm/shared_prefs/
  ```
- **Android (Google Play)**
  ```text
  /data/user/0/com.morizero.milthm/shared_prefs/
  ```
- **iOS**
  ```text
  milthm file/Data/Library/Preferences
  ```
- **Windows**
  regedit:
  ```text
  HKEY_CURRENT_USER\Software\Morizero\Milthm\
  ```
- **Mac OS**
  ```text
  ~/Library/Preferences
  ```
- **Linux**
  ```text
  $HOME/.config/unity3d/Morizero/Milthm/
  ```

---

### 在线客服

- [客服A\(中国大陆找TA\)](https://www.deepseek.com/)
- [客服B](https://chatgpt.com/)
问题描述：将你看不懂的地方复制后发给TA即可  
