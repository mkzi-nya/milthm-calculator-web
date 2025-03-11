
# 目錄
- [網站](#網站)
- [使用說明](#使用說明)
  - [上傳存檔檔案](#上傳存檔檔案)
  - [輸入已解析的數據](#輸入已解析的數據)
  - [舊版本存檔](#舊版本存檔)
  - [其他存檔路徑](#其他存檔路徑)
- [工作原理](#工作原理)
  - [Reality 計算公式](#reality-計算公式)
  - [雷達圖](#雷達圖)
- [定數表](#定數表)
- [聯繫我們](#聯繫我們)

---

## 網站
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## 使用說明

### 上傳存檔檔案

點擊主頁中的 **「上傳文件」** 選項，選中存檔檔案`saves.db`或推分記錄文件`data.db`上傳即可。

> **注意**：
> - `data.db` 只包含 `3.2` 更新後的遊玩記錄（如果沒有丟失）。
> - 安卓端推薦使用 [MT 管理器](https://mt2.cn/) 訪問 `sdcard/Android/data` 目錄。

#### **檔案路徑（詳見 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  使用 [文件](https://support.apple.com/zh-tw/102570) 應用程式打開 Milthm 資料夾：
  ```text
  /data/
  ```
- **Windows**
  資源管理器位址欄輸入：
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

Milthm 3.2 之前的存檔在行動裝置上無法直接提取，可嘗試以下方法：

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "檔案 $FILE_NAME 已成功複製到 /sdcard/"
            break
        else
            echo "複製檔案失敗，請檢查權限！"
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
  milthm應用資料/Data/Library/Preferences
  ```
- **Windows**
  位於登錄檔：
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


#### 程式碼實現：
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

## 雷達圖

相關計算方式由 `PanyiAme` 提供，詳見 [Milthm 查分表說明](https://wwp.lanzoup.com/iZ59A2j8nbpe)。

---

## 定數表

> - 所有 `SP` 和非常規譜面均不參與 Reality 計算
> - 因精度原因當前版本的所有定數為 11.9 的曲目定數都不滿 11.9。例如若某版本的理論 Reality 為 `13.005`，在遊戲內將顯示為 `13.00` 而非 `13.01`

當前版本的理論 Reality 為 `12.670`  
當前版本定數最高的 20 首曲目如下


| 排行 | 標題                    | 難度 | 定數  |
|---|-------------------------|------|-----|
| 1 | Contrasty Angeles       | CL   | 12.3 |
| 2 | 命日                    | CL   | 12.2 |
| 3 | Moonfall／大月墜落狂想   | CB   | 12.2 |
| 4 | Regnaissance            | CL   | 12.1 |
| 5 | Innocent white          | CB   | 12.1 |
| 6 | Broken Conviction       | CL   | 11.9 |
| 7 | Meltovt Necrosys        | CB   | 11.9 |
| 8 | Moonflutter             | CL   | 11.7 |
| 9 | Fly To Meteor feat.兔柒  | CL   | 11.7 |
| 10 | HYPER MEMORIES         | CB   | 11.7 |
| 11 | Broken Conviction      | CB   | 11.5 |
| 12 | Threat - Metropolis    | CB   | 11.5 |
| 13 | Contrasty Angeles      | CB   | 11.5 |
| 14 | slic.hertz #GdbG       | CB   | 11.4 |
| 15 | Moonflutter            | CB   | 11.4 |
| 16 | Algebra                | CB   | 11.4 |
| 17 | Fragment of Memories   | CB   | 11.3 |
| 18 | IN                     | CB   | 11.2 |
| 19 | イコラト               | CB   | 11.2 |
| 20 | 参宿四\~Betelgeuse\~    | CB   | 11.2 |

---

## 介紹 - 天氣預報

| 標題                   | DZ   | SK   | CB   | CL   |
|------------------------|------|------|------|------|
| Welcome to Milthm      | 1.0  | -    | -    | -    |
| 時落之雨               | 1.0  | 4.5  | 8.5  | -    |
| 夜風                   | 3.0  | 7.3  | 10.1 | -    |
| 花月                   | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光               | 2.0  | 7.5  | 9.1  | -    |

## 序章 - 雨的聲音

| 標題          | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| 雨之城        | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

## 主線章節一 - 甜與苦的一體兩面

| 標題                    | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| 粗線條的雨              | 1.0  | 4.0  | 8.3  | -    |
| Aconsma                 | 1.0  | 6.0  | 9.3  | -    |
| OverRain                | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories    | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES          | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance            | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles       | 4.0  | 9.0  | 11.5 | 12.3 |

## 聯動 - 雨世界

| 標題                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| Sundown                      | 1.0  | -    | -    | -    |
| Bio-Engineering              | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands         | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure      | 2.0  | 5.5  | 10.3 | -    |
| White Lizard                 | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex  | 2.0  | 7.6  | 10.6 | -    |
| Kayava                       | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis          | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent            | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想        | 2.0  | 8.0  | 12.2 | -    |

## 聯動 - Notanote

| 標題                 | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| 烁雨                 | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar    | 4.0  | 7.8  | 10.2 | -    |
| Innocent white       | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg              | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys     | 2.0  | 7.8  | 11.9 | -    |

## 單曲 - 夢境磁帶

| 標題                          | DZ   | SK   | CB   | CL   |
|-------------------------------|------|------|------|------|
| ネオン色のまち feat. Mai       | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                     | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                     | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                | -    | -    | -    | SP   |
| WATER                        | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                      | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                       | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                  | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor               | 3.0  | 6.5  | 10.5 | 11.7 |
| 樱落繁花                     | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                     | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro            | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)   | 3.0  | 7.5  | 10.5 | -    |
| Algebra                      | 2.0  | 8.1  | 11.4 | -    |
| Words                        | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                     | 3.5  | 6.6  | 3.5  | -    |
| 白虎蓮華                     | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片               | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~         | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG             | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!              | 2.0  | 7.5  | 9.8  | -    |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                   | -    | -    | -    | Ø    |
| Broken Conviction            | 4.5  | 4.5  | 11.5 | 11.9 |

---

## 聯繫我們

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)
