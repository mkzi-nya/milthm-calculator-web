
# Table of Contents
- [website](#website)
- [User Guide](#user-guide)
  - [Upload Save Files](#upload-save-files)
  - [Input Parsed Data](#input-parsed-data)
  - [Old Version Saves](#old-version-saves)
  - [Other Save Paths](#other-save-paths)
- [How It Works](#how-it-works)
  - [Reality Calculation Formula](#reality-calculation-formula)
  - [Radar Chart](#radar-chart)
- [Contact Us](#contact-us)

---

## website
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index_en.html)

## User Guide

### Upload Save Files

Click on the **"Upload File"** option on the homepage, select the save file (`saves.db`) or score record file (`data.db`) and upload it.

> **Note**:
> - `data.db` only contains gameplay records after the `3.2` update (if not lost).
> - For Android, it is recommended to use [MT Manager](https://mt2.cn/) to access the `sdcard/Android/data` directory.

#### **File Paths (See details in [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Use the [Files](https://support.apple.com/en-us/102570) app to open the Milthm folder:
  ```text
  /data/
  ```
- **Windows**
  Enter in the file explorer address bar:
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

---

### Input Parsed Data

Enter data in the input field on the homepage in the following format:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` is a decimal, and `level` represents ratings, defined as follows:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Old Version Saves

Saves before `Milthm 3.2` cannot be directly extracted on mobile devices. You may try the following method:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "File $FILE_NAME has been successfully copied to /sdcard/"
            break
        else
            echo "Failed to copy file, please check permissions!"
        fi
    fi
done
```

---

### Other Save Paths

If the upload cannot be parsed, try manually extracting the JSON data and uploading it:

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
  Milthm app data/Data/Library/Preferences
  ```
- **Windows**
  Located in the registry:
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

## How It Works

### Reality Calculation Formula

Reality calculation is based on the play score and chart constant:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

The single-song Reality calculation formula is as follows (s is the score, c is the constant):


$$
\text{Reality}(s, c) =
\begin{cases} 
\mathbf{1 + c}, & s \in [1005000, 1010000) \\
\displaystyle \frac{1.4}{e^{-3.65 \cdot \left(\frac{s}{10000} - 99.5\right)} + 1} - 0.4 + c, 
& s \in [995000, 1005000) \\
\displaystyle \frac{e^{3.1 \cdot \frac{s - 980000}{15000}} - 1}{e^{3.1} - 1} \cdot 0.8 - 0.5 + c, 
& s \in [980000, 995000) \\
\displaystyle \frac{s}{280000} - 4 + c, & s \in [700000, 980000) \\
0, & s \in (-\infty, 700000)
\end{cases}
$$


#### Code Implementation:
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

### Radar Chart

The related calculation method is provided by `PanyiAme`. See [Milthm Score Table Guide](https://wwp.lanzoup.com/iZ59A2j8nbpe) for details.

---

## Contact Us

- **[Milthm#-1 Xiaokong Group](https://qm.qq.com/q/Utb6sNDvki)**: 375882310

- **[Milthm#Φ Discussion Group](https://qm.qq.com/q/fIErsKKz3a)**: 678471942

