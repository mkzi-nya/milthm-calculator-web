> 注意：您目前所使用的語言版本已停止維護，部分資訊可能已過時，建議前往[英文](?lang=en)或[简体中文](?lang=zh)版本  
  或者您可以前往[此存儲庫](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AA%AA%E6%98%8E%E7%B7%A8%E8%BE%AF)為當前語言的翻譯版本提交pr  
  最後一次維護於2025.7.5  

## 目錄

- [網站](#網站)
- [使用說明](#使用說明)
  - [上傳存檔檔案](#上傳存檔檔案)
  - [輸入已解析的數據](#輸入已解析的數據)
  - [舊版本存檔](#舊版本存檔)
  - [其他存檔路徑](#其他存檔路徑)
  - [雷達圖](#雷達圖)
- [關於 Milthm](#關於-milthm)
  - [Reality 計算公式](#reality-計算公式)
  - [關於查分圖中的Ytilaer](關於查分圖中的ytilaer)
  - [關於存檔檔案](#關於存檔檔案)
  - [音符判定](#音符判定)
  - [結算評級](#結算評級)
  - [完成狀態](#完成狀態)
  - [愚人節](#愚人節)
  - [隱藏曲解鎖方式](#隱藏曲解鎖方式)
  - [定數表](#定數表)
  - [譜師統計](#譜師統計)
  - [點擊加速Milthm開發進程](#點擊加速milthm開發進程)
- [聯繫我們](#聯繫我們)
- [常見問題](#常見問題)
- [其他內容](#其他內容)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流群](#milthm交流群)
  - [什麼是檔案路徑](#什麼是檔案路徑)
  - [Reality 對照表](#reality-對照表)

---

{{updata}}

> 如果界面渲染出現問題，請[在 GitHub 上訪問](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## 網站

{{网站}}

---

## 使用說明

> 查分器純屬玩家自行製作，與官方並無關聯

### 上傳存檔檔案

點擊首頁中的 **「上傳檔案」** 選項，選擇存檔檔案 `saves.db` 或推分記錄檔案 `data.db` 上傳即可。

> **注意：**
> - `data.db` 僅包含 `3.2` 更新後的遊玩記錄（如果未遺失）。
> - 安卓端推薦使用 [MT 管理器](https://mt2.cn/) 訪問 `sdcard/Android/data` 目錄。

#### 檔案路徑（詳見 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）

[什麼是檔案路徑](#什麼是檔案路徑)

{{11}}

  使用 [檔案](https://support.apple.com//102570) 應用打開 Milthm 資料夾：

  ```text
  /data/
  ```

  > 如果找不到本機檔案：進入「檔案」首頁右上角的三點選單，將本機檔案取消隱藏（[詳見](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）。

- **Windows 用戶：**  
  在資源管理器地址欄輸入：  
  {{12}}

[安卓示範影片](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[iOS示範影片](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
安卓用戶[沒有訪問權限](#沒有訪問權限)

---

### 輸入已解析的數據

在首頁的輸入框中輸入數據，格式如下：

{{13}}

其中：
- `acc` 為小數表示準確度；
- `level` 代表評級，其定義如下：

{{14}}

---

### 舊版本存檔

`Milthm 3.2` 之前的存檔在移動端無法直接提取，可嘗試以下方法：

{{15}}

---

### 其他存檔路徑

若上傳後無法解析，可嘗試手動提取 JSON 數據並上傳：

{{16}}

---

## 雷達圖
 
相關計算方式由 `PanyiAme` 提供，詳見 [Milthm 查分表說明](https://wwp.lanzoup.com/iZ59A2j8nbpe)。

---

## 關於 Milthm

[返回目錄](#目錄)

### Reality 計算公式

Reality 的計算基於遊玩分數和譜面定數：

{{17}}

單曲 Reality 計算公式如下（其中 s 為分數，c 為定數）：

{{reality公式}}

[Reality 對照表](#reality-對照表)

#### 程式碼實現：

{{公式js}}

---

## 關於查分圖中的Ytilaer

該值無實際意義，具體如下
- 當b20的平均分大於1005k時，該值與實際Reality相等
- 該值為20首曲目的reality(平均分,平均單曲rlt)的最大值

## 關於存檔檔案

在以下部分中，路徑將被簡寫為 `MilthmDataDirectory`。

### 遊戲存檔  
該檔案位於 `MilthmDataDirectory/saves.db`。

其中包含與玩家遊戲進度及相關遊戲記錄的數據。 

數據在kv表中以json格式存儲（json格式與舊版本的存檔數據格式一致）

### 數據存檔  
該檔案位於 `MilthmDataDirectory/data.db`。

它用於存儲每一次成功提交的分數數據。

該檔案中的數據是本地排行榜的數據來源。


---

## 音符判定

遊戲中單個音符的判定共分為五種，分別為：

- **Perfect**：獲得 101% 分數及 100% ACC。
- **perfect**：依據精準度獲得 75%-101% 分數及 100% ACC。
- **Good**：依據精準度獲得 30%-75% 分數及 50% ACC。
- **Bad**：Combo 中斷，獲得 0%-30% 分數及 10% ACC。
- **Miss**：Combo 中斷，不獲得分數與 ACC。

各區間內的分數與精準度成正比例關係，詳細判定範圍如下表所示：

{{判定范围}}

---

## 結算評級

結算評級分為八種：  
未達成FC(全連)時為白色,FC為藍色,AP為紫色  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">：舊版顯示為<img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">，達成理論值 1010000 分（RHYTHM of RAIN，所有音符均為滿分）。
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M,即Milthm，分數達到1005000時獲得；
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">：分數達到950000時獲得；
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">：分數達到900000時獲得；
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">：分數達到850000時獲得；
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">：分數達到800000時獲得；
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">：分數小於800000時獲得，未通關，沒有FC/AP圖示。

---

## 完成狀態

遊玩結束後在譜面中展示的評價包括：

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC > 80%，且至少存在一個 Bad/Miss 判定。
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±140ms 內擊中，且至少存在一個 Good 判定。
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±70ms 內擊中，且至少存在一個 small perfect 判定。
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±35ms 內擊中，即理論值。
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:  
  - 使用 AutoPlay 通關。
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:  
  - 分數大於 1010000（使用傾盆大雨）。

---

## 愚人節

### 攻略（僅供參考）
- 進入遊戲後開啟噩夢遊玩任意一首`CB`難度的曲目，遊玩時難度顯示會發生變化，且所有按鍵全部轉換為雨絲，分數上升極慢
- 遊玩後會彈出一個提示，確認後返回，所有曲目的等級都會發生變化，升高大約20倍（[查看](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)），且UserReality會乘以20（與愚人節定數並無關聯）
- 然後再次遊玩任意譜面後彈出彈窗，然後會去除30級以上的譜面
- 遊玩一個大於16級的譜面進入劇情，會解鎖`Rainbow Flavor!`的愚人節譜面，然後遊戲閃退
- 然後會出現鹵味鴨小遊戲，打到一定回合後解鎖第2張愚人節譜

---

## 隱藏曲解鎖方式

- **Regnaissance**

  解鎖並遊玩 HYPER MEMORIES；  
  遊玩過程中背景會出現黑白色的蘇珊，此時請勿擊打任何音符；  
  之後分數變為負數，同時蘇珊變為彩色，繼續遊玩並使分數 > 0，結算後即可解鎖本曲。

- **Contrasty Angeles**

  解鎖 Regnaissance 後，閱讀主線章節一劇情第 6 話；  
  遊玩 HYPER MEMORIES；  
  遊玩過程中背景會出現黑白色的蘇珊，此時需保持全連；  
  之後分數驟減，同時蘇珊變為彩色，繼續遊玩並使分數 > 0，結算後即可解鎖本曲。  
  
- **Dogbite**
- 遊玩Dogbite CB難度並獲得A以上等級
- 滿足第一點後，遊玩Oiiaioooooiai，並在音符變成貓時保持全連（此前的音符可打可不打），此時每擊中一個音符就會發出狗的叫聲
- 滿足第二點後，會觸發異象，之後進入Dogbite SP譜面，即成功解鎖（無需通關）
  
- 注：可通過開啟`傾盆大雨`異象來降低解鎖難度

---

## 定數表

[返回目錄](#目錄)

{{章节zh}}

---

## 說明

> - 所有 `SP` 和非常規譜面均不參與 Reality 計算。  
> - 因精度原因，當前版本所有定數為 11.9 的曲目定數均低於 11.9。例如，若某版本的理論 Reality 為 `13.005`，在遊戲內將顯示為 `13.00` 而非 `13.01`，實際計算為 `13.004999…`。

當前版本的理論 Reality 為 `12.725`（顯示為 12.72）  
當前版本定數最高的 20 首曲目如下：

{{章节zh1}}

---

## 譜師統計

<div style="font-size:10px;">

{{charter}}

</div>

---

## 點擊加速Milthm開發進程

點擊連結加速 Milthm 開發進程  
1，https://github.com/sponsors/morizerodev/  
2，https://afdian.com/a/morizero

---

## 聯繫我們

{{联系我们}}

---

### 常見問題

[返回目錄](#目錄)

- [點擊生成圖片（或其他元素）沒反應](#點擊生成圖片（或其他元素）沒反應)
- [找不到文件在哪或不存在文件夾](#找不到文件在哪或不存在文件夾)
- [怎麼備份存檔](#怎麼備份存檔)
- [恢復存檔](#恢復存檔)
- [Reality 計算公式](#reality-計算公式)
- [音符判定](#音符判定)

> 請確保您懂得最基本的操作。如果不懂且不願意自行學習，我們不建議您使用此網站。

---

#### 點擊生成圖片（或其他元素）沒反應

- 檢查網絡狀態。如果無法訪問 GitHub，您可以前往 [k9.lv/c/](http://k9.lv/c)。
- 嘗試更換到系統自帶瀏覽器，或使用類似 Chrome、[Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ) 等瀏覽器。  
  (不建議使用百度、360等瀏覽器)
- 如果問題依舊，可能是因為系統版本過低。

---

#### 找不到文件在哪或不存在文件夾

可以在 [上傳存檔文件](#上傳存檔文件) 中查看存檔路徑。  

#### 沒有訪問權限

首先確認您的 Milthm 版本。更新到 3.2 以上版本後，需啟動一次遊戲才能在該路徑內生成存檔。

- **安卓**

  如果當前使用的是系統文件管理器或第三方文件管理器，您可以嘗試使用其他文件管理器訪問。  
  推薦使用 [MT 管理器](https://mt2.cn/)，並在應用頂部的地址欄中輸入以下路徑直接跳轉（如果有多個用戶，請將 `0` 改為用戶 ID 或將 `/storage/emulated/0/` 改為 `/sdcard/`）：
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  也可以通過右上角添加書籤，在底部上滑+號進行快速訪問。  
  
也可以嘗試不使用系統自帶文件瀏覽器，使用原生安卓的`文件`  
`文件`進入方式參考：  
打開MT管理器  
點擊`安裝包提取`--選擇`系統應用`--搜索`文件`--點擊`文件`，選擇左下角`更多`--啟動應用  
可以在進入milthm存檔資料夾後選擇`複製到`內置存儲（/storage/emulated/0/，一般就是`文件`的根目錄）後到瀏覽器中訪問  
如果存檔出現問題也可以通過類似的方式修復，詳見[恢復存檔](#恢復存檔)  
  
如果還是無法訪問，只能通過連接電腦或使用 ADB 權限訪問。  
  在較高版本的安卓系統中，可能會出現此問題。若開發者選項中啟用了 USB 調試，並且開啟了“無線調試”，可以在沒有電腦的情況下，使用 [Shizuku](https://shizuku.rikka.app/zh-hans/download/) 進行無線 ADB 調試。更多說明請參見 Shizuku 的相關文檔。

- **IOS**

  如果在 `文件` 應用中找不到此 iPhone/iPad 的資料夾，請前往應用主頁，在右上角的設置中查看是否隱藏了本地文件。  
  如果仍未找到 Milthm 的資料夾，檢查您是否使用了正確的 Milthm 版本。  
  [IOS演示視頻](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### 怎麼備份存檔

進入存檔目錄，將整個data資料夾複製到其他路徑

#### 恢復存檔

您可以直接將手動備份的存檔覆蓋掉原路徑的存檔文件  
為了防止意外，我們在生成查分圖時會將存檔以文本形式縫合到圖片內(~~可以以文本打開圖片直接查看~~)  
~~您可以直接上傳查分圖來查分~~  
您可以將查分圖上傳到 [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html) 後，點擊下載生成存檔文件（不包含劇情進度，是直接複製我自己(mkzi-nya/歸夢)的），替換掉原路徑的存檔  

## 其他內容

[返回目錄](#目錄)

### Milthm Wiki

{{wiki}}

### Milthm交流群

{{群}}

### 什麼是文件路徑

文件路徑是指向文件系統中某個唯一位置的字符串表示形式，通常採用目錄樹結構。不同操作系統使用不同的分隔符，如 `/`、`\` 或 `:`。路徑可以為絕對路徑或相對路徑，用以表示資料夾與文件間的關係，在構建 URL 時也十分重要。

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

{{reality表}}

