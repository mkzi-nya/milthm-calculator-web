Here is the English translation of your document:

---

# Table of Contents

0. [User Guide](#0-user-guide)
   - 01. [Uploading Save Files](#01-uploading-save-files)
   - 02. [Entering Parsed Data](#02-entering-parsed-data)
   - 03. [Old Version Saves](#03-old-version-saves)
   - 04. [Other Save File Paths](#04-other-save-file-paths)

1. [Working Principles](#1-working-principles)
   - 11. [Reality Calculation Formula](#11-reality-calculation-formula)
   - 12. [Radar Chart](#12-radar-chart)

2. [Contact Us](#2-contact-us)

---

## 0. User Guide

### There are currently two ways to input scores:

1. [Uploading Save Files](#01-uploading-save-files)
2. [Entering Parsed Data](#02-entering-parsed-data)
3. [Old Version Saves](#03-old-version-saves)

### 0.1. Uploading Save Files

Click on the "Upload File" option on the homepage, then select and upload a save file (saves.db) or score record file (data.db).  
Note: `data.db` only contains play records after the 3.2 update (if not lost).

For Android, it is recommended to use [MT Manager](https://mt2.cn/). If your browser cannot access the `/sdcard/Android/data/` folder, you can copy the save file to a readable directory (such as the root of the SD card: `/sdcard/`).  
On Android 13 and later, system restrictions may prevent access to `/sdcard/Android/data/`. You can use ADB by connecting to a PC.  
On Android 14 and later, you can use [Shizuku](https://shizuku.rikka.app/zh-hans/) for wireless ADB debugging directly on your phone.

After uploading `saves.db`, click "Generate Image" to automatically download the score chart.  
After uploading `data.db`, the system will automatically download the Reality history trend chart and extract the best scores from `data.db` (excluding play records before Milthm version 3.2).  
If you started playing after version 3.2, you can try uploading `data.db` directly (since it contains all content from `saves.db`).

#### File Paths (See [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) for details)

**Android (TapTap)**  
```
/storage/emulated//Android/data/game.taptap.morizero.milthm/files/data/
```

**Android (Google Play)**  
```
/storage/emulated//Android/data/com.morizero.milthm/files/data/
```

**iOS**  
Use the [Files app](https://support.apple.com/zh-cn/102570) to open the Milthm folder.
```
/data/
```

**Windows**  
Enter the following in File Explorer's address bar:
```
%AppData%\..\LocalLow\Morizero\Milthm\data\
```

**Mac OS**  
```
/Library/Application Support/Morizero/Milthm/data/
```

**Linux**  
```
~/.config/unity3d/Morizero/Milthm/data/
```

---

### 0.2. Entering Parsed Data

Enter the data in the input box on the homepage in the following format:

```
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, accuracy, level]
}
```

Accuracy is represented as a decimal, and level represents the rating obtained from playing:

```
level: 0 = R, 1 = AP, 2 = FC, 3 = S, 4 = A, 5 = B, 6 = C, 7 = F
```

---

### 0.3. Old Version Saves

Before Milthm version 3.2, save files on mobile devices (Android/iOS) could not be extracted through normal means.  

For Android (TapTap), if you don’t have root access, you can modify the `sessionToken` or `objectId` field in `.userdata` to prevent the save file from uploading to the cloud.  
After attempting to upload in-game, a `save.json` file will be generated in the same directory:

```
/sdcard/Android/data/game.taptap.morizero.milthm/files/.userdata
```

Alternatively, you can use a script to capture `save.json` while the game uploads the save:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"
while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "File $FILE_NAME successfully copied to /sdcard/"
            break
        else
            echo "Failed to copy file. Please check permissions!"
        fi
    fi
done
```

For Android, it is recommended to use [MT Manager](https://mt2.cn/). If your browser cannot access `/sdcard/Android/data/`, you can copy the save file to a readable directory.  
On Android 13 and later, system restrictions may apply, requiring ADB access.  
On Android 14 and later, [Shizuku](https://shizuku.rikka.app/zh-hans/) can be used for wireless ADB debugging.

---

### 0.4. Other Save File Paths

Note: If the uploaded file cannot be parsed, try extracting the JSON data manually and uploading it.

**Android (TapTap)**  
```
/data/user/0/game.taptap.morizero.milthm/shared_prefs/
```

**Android (Google Play)**  
```
/data/user/0/com.morizero.milthm/shared_prefs/
```

**iOS**  
```
milthm application data/Data/Library/Preferences
```

**Windows** (Stored in the Registry)  
```
HKEY_CURRENT_USER\Software\Morizero\Milthm\
```

**Mac OS**  
```
~/Library/Preferences
```

**Linux**  
```
$HOME/.config/unity3d/Morizero/Milthm/
```

---

## 1. Working Principles

### 1.1. Reality Calculation Formula

Reality is calculated based on score and chart difficulty.  
User Reality is determined by averaging the top 20 highest-ranked Reality scores:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

The single-track Reality formula is as follows (where `s` is score and `c` is difficulty constant):

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

**Code Implementation:**
```JavaScript
function reality(score, constant) {
    if (score >= 1005000)
        return Math.max(1 + constant, 0);
    if (score >= 995000) 
        return Math.max(1.4 / (Math.exp(-3.65 * (score / 10000 - 99.5)) + 1) - 0.4 + c, 0);
    if (score >= 980000) 
        return Math.max(((Math.exp(3.1 * (score - 980000) / 15000) - 1) / (Math.exp(3.1) - 1)) * 0.8 - 0.5 + c, 0);
    if (score >= 700000) 
        return Math.max(score / 280000 - 4 + c, 0);
    return 0;
}
```

---

### 1.2. Radar Chart

Calculation methods are provided by **PanyiAme**. For details, see the [Milthm Score Chart Guide](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## 2. Contact Us

- [Milthm#-1 Community](https://qm.qq.com/q/Utb6sNDvki): **375882310**
- [Milthm#Φ Community](https://qm.qq.com/q/fIErsKKz3a): **678471942**