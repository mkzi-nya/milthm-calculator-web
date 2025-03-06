
---

# **Table of Contents**
- [User Guide](#user-guide)
  - [Uploading Save Files](#uploading-save-files)
  - [Entering Parsed Data](#entering-parsed-data)
  - [Old Version Saves](#old-version-saves)
  - [Other Save File Paths](#other-save-file-paths)
- [Working Principles](#working-principles)
  - [Reality Calculation Formula](#reality-calculation-formula)
  - [Radar Chart](#radar-chart)
- [Contact Us](#contact-us)

---

## **User Guide**

### **Score Input Methods**
There are two ways to input scores:
1. [Uploading Save Files](#uploading-save-files)
2. [Entering Parsed Data](#entering-parsed-data)
3. [Old Version Saves](#old-version-saves)

### **Uploading Save Files**
Click **"Upload File"** on the homepage, then select and upload a save file (`saves.db`) or a score record file (`data.db`).

> **Note:** `data.db` only contains play records after the **3.2 update** (if not lost).

#### **Android Users**
- Use [MT Manager](https://mt2.cn/) to access `/sdcard/Android/data/`
- If restricted (Android 13+), use **ADB** via PC or **[Shizuku](https://shizuku.rikka.app/zh-hans/)** (Android 14+) for wireless ADB access.

#### **iOS Users**
- Open **Files App** and locate the **Milthm** folder.

#### **Windows Users**
- In **File Explorer**, enter:
  ```text
  %AppData%\..\LocalLow\Morizero\Milthm\data\
  ```

#### **Mac/Linux Users**
- Mac OS:
  ```text
  /Library/Application Support/Morizero/Milthm/data/
  ```
- Linux:
  ```text
  ~/.config/unity3d/Morizero/Milthm/data/
  ```

After uploading:
- `saves.db`: Click **"Generate Image"** to download the score chart.
- `data.db`: The system generates a **Reality history trend chart** and extracts **best scores** (excluding pre-3.2 records).

---

### **Entering Parsed Data**
Enter data in the homepage input box:

```text
[name],{
    [Contrasty Angeles, CL, 12.3, 1010000, 1.0000, 0],
    [name, Difficulty, constant, score, accuracy, level]
}
```

- `accuracy`: Decimal value.
- `level`: Represents the score rating.

```text
Level: 0 = R, 1 = AP, 2 = FC, 3 = S, 4 = A, 5 = B, 6 = C, 7 = F
```

---

### **Old Version Saves**
> **Milthm 3.2 and earlier:** Save files **cannot** be extracted through normal means.

#### **Android Extraction Methods**
If root access is unavailable, modify `.userdata`:
1. Edit `sessionToken` or `objectId` to **prevent cloud uploads**.
2. Start an in-game upload to generate `save.json` in:
   ```text
   /sdcard/Android/data/game.taptap.morizero.milthm/files/.userdata
   ```

#### **Automatic Save File Extraction (Script)**
Run this script to capture `save.json`:

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

---

### **Other Save File Paths**
> **Note:** If parsing fails, manually extract and upload the JSON data.

#### **Android**
- TapTap:
  ```text
  /data/user/0/game.taptap.morizero.milthm/shared_prefs/
  ```
- Google Play:
  ```text
  /data/user/0/com.morizero.milthm/shared_prefs/
  ```

#### **iOS**
  ```text
  milthm application data/Data/Library/Preferences
  ```

#### **Windows (Registry)**
  ```text
  HKEY_CURRENT_USER\Software\Morizero\Milthm\
  ```

#### **Mac/Linux**
- Mac OS:
  ```text
  ~/Library/Preferences
  ```
- Linux:
  ```text
  $HOME/.config/unity3d/Morizero/Milthm/
  ```

---

## **Working Principles**

### **Reality Calculation Formula**
Reality is calculated based on **score** and **chart difficulty**.  
User Reality (`rlt`) is computed as the **average of the top 20 scores**:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

#### **Single-Track Reality Calculation**
Where `s` = score, `c` = difficulty constant:

$$
\text{Reality}(s, c) =
\begin{cases} 
1 + c, & s \in [1005000, +\infty) \\
\displaystyle \frac{1.4}{e^{-3.65 \cdot \left(\frac{s}{10000} - 99.5\right)} + 1} - 0.4 + c, 
& s \in [995000, 1005000) \\
\displaystyle \frac{e^{3.1 \cdot \frac{s - 980000}{15000}} - 1}{e^{3.1} - 1} \cdot 0.8 - 0.5 + c, 
& s \in [980000, 995000) \\
\displaystyle \frac{s}{280000} - 4 + c, & s \in [700000, 980000) \\
0, & s \in (-\infty, 700000)
\end{cases}
$$

#### **Code Implementation**
```js
function reality(score, constant) {
    if (score >= 1005000)
        return Math.max(1 + constant, 0);
    if (score >= 995000) 
        return Math.max(1.4 / (Math.exp(-3.65 * (score / 10000 - 99.5)) + 1) - 0.4 + constant, 0);
    if (score >= 980000) 
        return Math.max(((Math.exp(3.1 * (score - 980000) / 15000) - 1) / (Math.exp(3.1) - 1)) * 0.8 - 0.5 + constant, 0);
    if (score >= 700000) 
        return Math.max(score / 280000 - 4 + constant, 0);
    return 0;
}
```

---

### **Radar Chart**
**Radar chart calculations** are provided by **PanyiAme**.  
See the [Milthm Score Chart Guide](https://wwp.lanzoup.com/iZ59A2j8nbpe) for details.

---

## **Contact Us**
- **[Milthm#-1 Community](https://qm.qq.com/q/Utb6sNDvki):** **375882310**
- **[Milthm#Φ Community](https://qm.qq.com/q/fIErsKKz3a):** **678471942**

