# 目录

0. [使用说明](#0-使用说明)
- 01. [上传存档文件](#01-上传存档文件)
- 02. [输入已解析的数据](#02-输入已解析的数据)
- 03. [旧版本存档](#03-旧版本存档)
- 04. [其他的存档路径](#04-其他的存档路径)

1. [工作原理](#1-工作原理)
- 11. [Reality计算公式](#11-Reality计算公式)
- 12. [雷达图](#12-雷达图)

2. [联系我们](#2-联系我们)

## 0. 使用说明

### 目前有两种成绩输入方式

1. [上传存档文件](#01-上传存档文件)
2. [输入已解析的数据](#02-输入已解析的数据)
3. [旧版本存档](#03-旧版本存档)
### 0.1. 上传存档文件

点击主页中的「上传文件」选项，选中存档文件(saves.db)或推分记录文件(data.db)上传即可

注：data.db只包含3.2更新后的游玩记录(如果没有丢失)

安卓端推荐使用[MT管理器](https://mt2.cn/)，如果浏览器无法访问/sdcard/Android/data/文件夹的内容可以将存档文件复制到可读取的目录(如sd卡根目录/sdcard/)
在安卓13以上系统可能限制用户访问/sdcard/Android/data/文件夹的内容，可以连接电脑使用adb访问
安卓14以上可使用[shizuku](https://shizuku.rikka.app/zh-hans/)在手机上通过无线adb调试自己

上传saves.db后点击「生成图片」将自动下载查分图
上传data.db后会自动下载Reality历史趋势图，且自动从data.db中获取最佳成绩(不包含Milthm 3.2版本前的游玩记录)
如果您是在3.2以后的版本入坑可以尝试直接上传data.db(因为他将包含saves.db的所有内容)
#### 文件路径(详见[Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

Android(TapTap)

```text
/storage/emulated//Android/data/game.taptap.morizero.milthm/files/data/
```

Android(Google Play)

```text
/storage/emulated//Android/data/com.morizero.milthm/files/data/
```

IOS

使用[文件](https://support.apple.com/zh-cn/102570)应用来打开Milthm文件夹

```text
/data/
```

Windows
在资源管理器的地址栏中输入

```text
%AppData%\..\LocalLow\Morizero\Milthm\data\
```

Mac OS

```text
/Library/Application Support/Morizero/Milthm/data/
```

LInux

```text
~/.config/unity3d/Morizero/Milthm/data/
```

### 0.2. 输入已解析的数据
在主页的输入框中输入数据

格式如下
```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score,acc,leavel]
}
```

acc取小数，level为游玩的评级
```text
leavel:0=R,1=AP,2=FC,3=S,4=A,5=B,6=C,7=F
```
### 0.3. 旧版本存档

Milthm 3.2版本之前的存档在移动端(Android/Ios)无法通过常规手段提取
Android(tap)端在无root权限的情况下可通过修改.userdata内的sessionToken或objectId项，使其无法照常将存档上传至云端
然后在游戏内尝试上传后在同目录下生成save.json文件
```text
/sdcard/Android/data/game.taptap.morizero.milthm/files/.userdata
```
或者可使用脚本在正常上传存档的过程中抓取save.json文件
```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"
while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "文件 $FILE_NAME 已成功复制到 /sdcard/"
            break
        else
            echo "复制文件失败，请检查权限！"
        fi
    fi
done
```

安卓端推荐使用[MT管理器](https://mt2.cn/)，如果浏览器无法访问/sdcard/Android/data/文件夹的内容可以将存档文件复制到可读取的目录(如sd卡根目录/sdcard/)
在安卓13以上系统可能限制用户访问/sdcard/Android/data/文件夹的内容，可以连接电脑使用adb访问
安卓14以上可使用[shizuku](https://shizuku.rikka.app/zh-hans/)在手机上通过无线adb调试自己

### 0.4. 其他的存档路径
注:如果上传后无法解析可尝试手动提取其中的json数据并上传

Android(TapTap)

```text
/data/user/0/game.taptap.morizero.milthm/shared_prefs/
```

Android(Google Play)

```text
/data/user/0/com.morizero.milthm/shared_prefs/
```

IOS

```text
milthm应用数据/Data/Library/Preferences
```

Windows
位于注册表中的

```text
HKEY_CURRENT_USER\Software\Morizero\Milthm\
```

Mac OS

```text
~/Library/Preferences
```

LInux

```text
$HOME/.config/unity3d/Morizero/Milthm/
```


## 1. 工作原理

### 1.1. Reality计算公式

Reality的计算通过游玩分数与谱面定数获得
userReality计算方式为单曲Reality排行最高的20首成绩除20

$$
rlt = \sum_{i=1}^{20} single.rlt(i)/20
$$

单曲Reality公式如下(s为分数，c为定数)

$$
\text{Reality}(s, c) =
\begin{cases} 
1 + c & (s \geq 1005000) \\
\frac{1.4}{e^{-3.65 \cdot (\frac{s}{10000} - 99.5)} + 1} - 0.4 + c &(s \geq 995000) \\
\frac{e^{3.1 \cdot \frac{s - 980000}{15000}} - 1}{e^{3.1} - 1} \cdot 0.8 - 0.5 + c &(s \geq 980000)\\
\frac{s}{280000} - 4 + c &(s \geq 700000) \\
0 & (s < 700000)
\end{cases}
$$

(代码)
```JavaScript
function reality(score,constant) {
    if (score >= 1005000)
        return Math.max(1+constant,0);
    if (score >= 995000) 
        return Math.max(1.4 / (Math.exp(-3.65 * (score / 10000 - 99.5)) + 1) - 0.4+c,0);
    if (score >= 980000) 
        return Math.max(((Math.exp(3.1 * (score - 980000) / 15000) - 1) / (Math.exp(3.1) - 1)) * 0.8 - 0.5+c,0);
    if (score >= 700000) 
        return Math.max(score / 280000 - 4+c,0);
    return 0;
}
```
### 1.2. 雷达图
相关计算方式由PanyiAme提供，详见[Milthm查分表说明](https://wwp.lanzoup.com/iZ59A2j8nbpe)


## 2. 联系我们
[Milthm#-1洨巟羣](https://qm.qq.com/q/Utb6sNDvki)：375882310
[Milthm#Φ交流群](https://qm.qq.com/q/fIErsKKz3a)：678471942

