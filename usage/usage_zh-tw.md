
## 目錄

- [網站](#網站)
- [使用說明](#使用說明)
  - [上傳存檔文件](#上傳存檔文件)
  - [輸入已解析的數據](#輸入已解析的數據)
  - [舊版本存檔](#舊版本存檔)
  - [其他存檔路徑](#其他存檔路徑)
  - [雷達圖](#雷達圖)
- [關於 Milthm](#關於-milthm)
  - [Reality 計算公式](#reality-計算公式)
  - [音符判定](#音符判定)
  - [結算評級](#結算評級)
  - [完成狀態](#完成狀態)
  - [定數表](#定數表)
- [聯繫我們](#聯繫我們)
- [其他內容](#其他內容)
  - [Milthm Wiki](#milthm-wiki)
  - [隱藏曲解鎖方式](#隱藏曲解鎖方式)
  - [什麼是文件路徑](#什麼是文件路徑)
  - [Reality 對照表](#reality-對照表)

---

_Last updated on 2025.04.01 02:00 (UTC)_

> 如果介面渲染出現問題，請[在 GitHub 上訪問](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/)

---

## 網站

- [k9.lv/c/](http://k9.lv/c/)
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

---

## 使用說明

### 上傳存檔文件

點擊主頁中的 **「上傳文件」** 選項，選擇存檔文件 `saves.db` 或推分記錄文件 `data.db` 上傳即可。

> **注意：**
> - `data.db` 僅包含 `3.2` 更新後的遊玩記錄（若未遺失）。
> - 安卓端推薦使用 [MT 管理器](https://mt2.cn/) 訪問 `sdcard/Android/data` 目錄。

#### 文件路徑（詳見 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）

[什麼是文件路徑](#什麼是文件路徑)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

使用 [文件](https://support.apple.com//102570) 應用打開 Milthm 文件夾：

```text
/data/
```

> 若找不到本地文件：進入「文件」主頁右上角的三點選單，將本地文件取消隱藏（[詳見](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）。

- **Windows 用戶：**  
  在資源管理器地址欄輸入：  
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

其中：
- `acc` 為小數表示準確度；
- `level` 代表評級，其定義如下：

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
            echo "文件 $FILE_NAME 已成功复制到 /sdcard/"
            break
        else
            echo "复制文件失败，请检查权限！"
        fi
    fi
done
```

---

### 其他存檔路徑

若上傳後無法解析，可嘗試手動提取 JSON 數據並上傳：

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

## 雷達圖

相關計算方式由 `PanyiAme` 提供，詳見 [Milthm 查分表說明](https://wwp.lanzoup.com/iZ59A2j8nbpe)。

---

## 關於 Milthm

[返回目錄](#目錄)

### Reality 計算公式

Reality 的計算基於遊玩分數和譜面定數：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

單曲 Reality 計算公式如下（其中 s 為分數，c 為定數）：

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

[Reality 對照表](#reality-對照表)

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

## 音符判定

遊戲中單個音符的判定共分為五種，分別為：

- **Perfect**：獲得 101% 分數及 100% ACC。
- **perfect**：依據準確度獲得 75%-101% 分數及 100% ACC。
- **Good**：依據準確度獲得 30%-75% 分數及 50% ACC。
- **Bad**：Combo 中斷，獲得 0%-30% 分數及 10% ACC。
- **Miss**：Combo 中斷，不獲得分數與 ACC。

各區間內的分數與準確度成正比例關係，詳細判定範圍如下表所示：

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## 結算評級

結算評級分為八種：

- **R**：即 Rain，達成理論值 1010000 分（RHYTHM of RAIN，所有音符均為大 Perfect）。
- **紫S**：達成 All Perfect（所有音符均為 Perfect 且未達成 R 評，分數在 1000000-1009999 之間）。
- **青S**：達成 Full Combo（所有音符均無 Bad/Miss 判定且未達成紫S評，此時不考慮下列分數要求）。
- **S**：950000-1009999 分。
- **A**：900000-949999 分。
- **B**：850000-899999 分。
- **C**：800000-849999 分。
- **F**：0-799999 分。

---

## 完成狀態

遊玩結束後在譜面中展示的評價包括：

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80%，且至少存在一個 Bad/Miss 判定。
- **Full Combo:**  
  - 所有音符均在 ±140ms 內擊中，且至少存在一個 Good 判定。
- **All Perfect:**  
  - 所有音符均在 ±70ms 內擊中，且至少存在一個 small perfect 判定。
- **Rhythm of Rain:**  
  - 所有音符均在 ±35ms 內擊中，即理論值。
- **AutoPlay is Awesome:**  
  - 使用 AutoPlay 通關。
- **Overloaded:**  
  - 分數大於 1010000（使用傾盆大雨）。

---

## 定數表

[返回目錄](#目錄)

- [说明](#说明)
- [主线章节](#介绍---天气预报)
  - [天气预报](#介绍---天气预报)
  - [雨的声音](#序章---雨的声音)
  - [甜与苦的一体两面](#主线章节一---甜与苦的一体两面)
- [联动章节](#联动---雨世界)
  - [雨世界](#联动---雨世界)
  - [Notanote](#联动---notanote)
- [单曲](#单曲---梦境磁带)
  - [梦境磁带](#单曲---梦境磁带)
  - [露晓卉庭](#单曲---露晓卉庭)

---

## 說明

> - 所有 `SP` 和非常規譜面均不參與 Reality 計算。  
> - 因精度原因，當前版本所有定數為 11.9 的曲目定數均低於 11.9。例如，若某版本的理論 Reality 為 `13.005`，在遊戲內將顯示為 `13.00` 而非 `13.01`，實際計算為 `13.004999…`。

當前版本的理論 Reality 為 `12.695`（顯示為 12.69）  
當前版本定數最高的 20 首曲目如下：

| 排行 | 标题  | 难度 | 定数 |
|---|---------------------|------|----|
| 1 | Contrasty Angeles | CL | 12.3 |
| 2 | 命日 | CL | 12.2 |
| 3 | Moonfall／大月墜落狂想 | CB | 12.2 |
| 4 | Regnaissance | CL | 12.1 |
| 5 | Innocent white | CB | 12.1 |
| 6 | Broken Conviction | CL | 11.9 |
| 7 | Meltovt Necrosys | CB | 11.9 |
| 8 | Moonflutter | CL | 11.7 |
| 9 | Fly To Meteor feat.兔柒 | CL | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | KASANE | CB | 11.6 |
| 12 | Broken Conviction | CB | 11.5 |
| 13 | Threat - Metropolis | CB | 11.5 |
| 14 | Contrasty Angeles | CB | 11.5 |
| 15 | slic.hertz #GdbG | CB | 11.4 |
| 16 | Moonflutter | CB | 11.4 |
| 17 | Algebra | CB | 11.4 |
| 18 | Fragment of Memories | CB | 11.3 |
| 19 | cafe in 6412I731V | CB | 11.3 |
| 20 | IN | CB | 11.2 |
| 20 | イコラト | CB | 11.2 |
| 20 | 参宿四\~Betelgeuse\~ | CB | 11.2 |


## 介绍 - 天气预报

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| Welcome to Milthm  | 1.0  | -    | -    | SP |
| 时落之雨           | 1.0  | 4.5  | 8.5  | -    |
| 夜风               | 3.0  | 7.3  | 10.1 | -    |
| 花月               | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光           | 2.0  | 7.5  | 9.1  | -    |

## 序章 - 雨的声音

| 标题           | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| 雨之城        | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0 | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

## 主线章节一 - 甜与苦的一体两面

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| 粗线条的雨         | 1.0  | 4.0  | 8.3  | -    |
| Aconsma            | 1.0  | 6.0  | 9.3  | -    |
| OverRain           | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES     | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance       | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles  | 4.0  | 9.0  | 11.5 | 12.3 |

## 联动 - 雨世界

| 标题                    | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| Sundown                | 1.0  | -    | -    | -    |
| Bio-Engineering        | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands   | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure | 2.0  | 5.5  | 10.3 | -    |
| White Lizard           | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex | 2.0  | 7.6  | 10.6 | -    |
| Kayava                 | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis    | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent      | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想 | 2.0  | 8.0  | 12.2 | -    |

## 联动 - Notanote

| 标题              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| 烁雨             | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar | 4.0  | 7.8  | 10.2 | -    |
| Innocent white    | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg           | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys  | 2.0  | 7.8  | 11.9 | -    |

## 单曲 - 梦境磁带

| 标题                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| ネオン色のまち feat. Mai    | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                    | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                    | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai               | -    | -    | -    | SP   |
| WATER                       | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                     | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                      | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                 | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor              | 3.0  | 6.5  | 10.5 | 11.7 |
| 樱落繁花                    | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                    | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro           | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)  | 3.0  | 7.5  | 10.5 | -    |
| Algebra                     | 2.0  | 8.1  | 11.4 | SP  |
| Words                       | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                    | 3.5  | 6.6  | 10.0  | -    |
| 白虎蓮華                    | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片              | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~          | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG            | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!             | 2.0  | 7.5  | 9.8 | SP |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                  | -    | -    | -    | Ø    |
| Broken Conviction           | 4.5  | 4.5  | 11.5 | 11.9 |
| 选择你的宽带 | - | - | - | SP |

## 单曲 - 露晓卉庭

| 标题                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| FULi AUTO SHOOTER | 3.0  | 7.2  | 10.6  | -    |
| cafe in 6412I731V                    | 2.0  | 7.0  | 11.3  | -    |
| KASANE | 3.0  | 7.8  | 11.6  | -    |
| KAEDE | -  | -  | -  | SP  |

---

## 聯繫我們

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## 其他內容

[返回目錄](#目錄)

### Milthm Wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### 隱藏曲解鎖方式

- **Regnaissance**

  解鎖並遊玩 HYPER MEMORIES；  
  遊玩過程中背景會出現黑白色的蘇姍，此時請勿擊打任何音符；  
  之後分數變為負數，同時蘇姍變為彩色，繼續遊玩並使分數 > 0，結算後即可解鎖本曲。

- **Contrasty Angeles**

  解鎖 Regnaissance 後，閱讀主線章節一劇情第 6 話；  
  遊玩 HYPER MEMORIES；  
  遊玩過程中背景會出現黑白色的蘇姍，此時需保持全連；  
  之後分數急降，同時蘇姍變為彩色，繼續遊玩並使分數 > 0，結算後即可解鎖本曲。

### 什麼是文件路徑

文件路徑是指向文件系統中某個唯一位置的字符串表示形式，通常採用目錄樹結構。不同作業系統使用不同的分隔符，如 `/`、`\` 或 `:`。路徑可以為絕對路徑或相對路徑，用以表示文件夾與文件之間的關係，在構建 URL 時也十分重要。

#### 安卓文件路徑

- **外部存儲：**  
  位於 `/storage/emulated/用戶標識（默認主用戶為 0）/` 或 `/sdcard/` 下，此部分文件為用戶可見。
- **應用數據目錄：**  
  通常位於 `/storage/emulated/0/Android/data/包名/`，例如：  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Milthm 的存檔目錄在：  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  若系統阻止訪問，請嘗試連接電腦或授予文件管理器 ADB 權限。

---

### Reality 對照表

```text
y	x (score)
-0.5	980000.0
-0.49	981137.3
-0.48	982057.6
-0.47	982830.5
-0.46	983496.7
-0.45	984082.2
-0.44	984604.5
-0.43	985075.9
-0.42	985505.3
-0.41	985899.8
-0.4	986264.5
-0.39	986603.6
-0.38	986920.5
-0.37	987217.9
-0.36	987498.1
-0.35	987763.0
-0.34	988014.1
-0.33	988252.8
-0.32	988480.3
-0.31	988697.6
-0.3	988905.5
-0.29	989104.9
-0.28	989296.3
-0.27	989480.5
-0.26	989658.0
-0.25	989829.1
-0.24	989994.4
-0.23	990154.3
-0.22	990309.0
-0.21	990458.9
-0.2	990604.4
-0.19	990745.5
-0.18	990882.7
-0.17	991016.1
-0.16	991146.0
-0.15	991272.4
-0.14	991395.6
-0.13	991515.7
-0.12	991633.0
-0.11	991747.5
-0.1	991859.3
-0.09	991968.6
-0.08	992075.5
-0.07	992180.0
-0.06	992282.4
-0.05	992382.6
-0.04	992480.8
-0.03	992577.1
-0.02	992671.4
-0.01	992764.0
0.0	992854.8
0.01	992944.0
0.02	993031.5
0.03	993117.5
0.04	993202.0
0.05	993285.0
0.06	993366.7
0.07	993447.0
0.08	993525.9
0.09	993603.6
0.1	993680.1
0.11	993755.4
0.12	993829.5
0.13	993902.5
0.14	993974.5
0.15	994045.3
0.16	994115.2
0.17	994184.0
0.18	994251.9
0.19	994318.9
0.2	994384.9
0.21	994450.1
0.22	994514.4
0.23	994577.8
0.24	994640.4
0.25	994702.2
0.26	994763.3
0.27	994823.5
0.28	994883.1
0.29	994941.9
0.3	995000.0
0.31	995078.3
0.32	995156.6
0.33	995235.0
0.34	995313.5
0.35	995392.1
0.36	995470.8
0.37	995549.8
0.38	995629.0
0.39	995708.4
0.4	995788.2
0.41	995868.3
0.42	995948.7
0.43	996029.6
0.44	996110.9
0.45	996192.7
0.46	996275.0
0.47	996357.9
0.48	996441.4
0.49	996525.5
0.5	996610.4
0.51	996696.0
0.52	996782.4
0.53	996869.7
0.54	996958.0
0.55	997047.2
0.56	997137.4
0.57	997228.8
0.58	997321.4
0.59	997415.2
0.6	997510.4
0.61	997607.0
0.62	997705.2
0.63	997805.0
0.64	997906.5
0.65	998009.9
0.66	998115.3
0.67	998222.8
0.68	998332.6
0.69	998444.8
0.7	998559.7
0.71	998677.4
0.72	998798.1
0.73	998922.1
0.74	999049.6
0.75	999181.0
0.76	999316.5
0.77	999456.7
0.78	999601.8
0.79	999752.3
0.8	999908.9
0.81	1000072.2
0.82	1000242.9
0.83	1000421.8
0.84	1000610.1
0.85	1000808.9
0.86	1001019.8
0.87	1001244.5
0.88	1001485.3
0.89	1001745.0
0.9	1002027.3
0.91	1002336.9
0.92	1002680.4
0.93	1003067.0
0.94	1003509.8
0.95	1004029.7
0.96	1004661.3
0.965	1004999.0
1.0	1005000.0
```
