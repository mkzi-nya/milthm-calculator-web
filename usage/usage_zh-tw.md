
# 目錄
- [網站](#網站)
- [使用說明](#使用說明)
  - [上傳存檔文件](#上傳存檔文件)
  - [輸入已解析的數據](#輸入已解析的數據)
  - [舊版本存檔](#舊版本存檔)
  - [其他存檔路徑](#其他存檔路徑)
- [工作原理](#工作原理)
  - [Reality 計算公式](#reality-計算公式)
  - [雷達圖](#雷達圖)
- [聯繫我們](#聯繫我們)

---
## 網站
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## 使用說明

### 上傳存檔文件

點擊主頁中的 **「上傳文件」** 選項，選中存檔文件 (`saves.db`) 或推分記錄文件 (`data.db`) 上傳即可。

> **注意**：
> - `data.db` 只包含 `3.2` 更新後的遊玩記錄（如果沒有丟失）。
> - 安卓端推薦使用 [MT 管理器](https://mt2.cn/) 訪問 `sdcard/Android/data` 目錄。

#### **文件路徑（詳見 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  使用 [文件](https://support.apple.com/zh-tw/102570) 應用打開 Milthm 文件夾：
  ```text
  /data/
  ```
- **Windows**
  資源管理器地址欄輸入：
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

### 輸入已解析的數據

在主頁的輸入框中輸入數據，格式如下：

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` 取小數，`level` 代表評級，定義如下：

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 舊版本存檔

`Milthm 3.2` 之前的存檔在移動端無法直接提取，可嘗試以下方法：

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "文件 $FILE_NAME 已成功複製到 /sdcard/"
            break
        else
            echo "複製文件失敗，請檢查權限！"
        fi
    fi
done
```

---

### 其他存檔路徑

如果上傳後無法解析，可嘗試手動提取 JSON 數據並上傳：

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
  milthm應用數據/Data/Library/Preferences
  ```
- **Windows**
  位於註冊表：
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

## 工作原理

### Reality 計算公式

Reality 的計算基於遊玩分數和譜面定數：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

單曲 Reality 計算公式如下（s 為分數，c 為定數）：


$$
\text{Reality}(s, c) =
\begin{cases} 
\mathbf{1 + c}, & s \in [1005000, 1010000] \\
\displaystyle \frac{1.4}{e^{-3.65 \cdot \left(\frac{s}{10000} - 99.5\right)} + 1} - 0.4 + c, 
& s \in [995000, 1005000) \\
\displaystyle \frac{e^{3.1 \cdot \frac{s - 980000}{15000}} - 1}{e^{3.1} - 1} \cdot 0.8 - 0.5 + c, 
& s \in [980000, 995000) \\
\displaystyle \frac{s}{280000} - 4 + c, & s \in [700000, 980000) \\
0, & s \in (-\infty, 700000)
\end{cases}
$$


#### 代碼實現：
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

### 雷達圖

相關計算方式由 `PanyiAme` 提供，詳見 [Milthm 查分表說明](https://wwp.lanzoup.com/iZ59A2j8nbpe)。

---

## 聯繫我們

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)