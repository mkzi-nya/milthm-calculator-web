
## 目录

- [网站](#网站)
- [使用说明](#使用说明)
  - [上传存档文件](#上传存档文件)
  - [输入已解析的数据](#输入已解析的数据)
  - [旧版本存档](#旧版本存档)
  - [其他存档路径](#其他存档路径)
  - [雷达图](#雷达图)
- [关于 Milthm](#关于-milthm)
  - [Reality 计算公式](#reality-计算公式)
  - [关于存档文件](#关于存档文件)
  - [音符判定](#音符判定)
  - [结算评级](#结算评级)
  - [完成状态](#完成状态)
  - [愚人节](#愚人节)
  - [隐藏曲解锁方式](#隐藏曲解锁方式)
  - [定数表](#定数表)
- [联系我们](#联系我们)
- [常见问题](#常见问题)
- [其他内容](#其他内容)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流群](#milthm交流群)
  - [什么是文件路径](#什么是文件路径)
  - [Reality 对照表](#reality-对照表)

---

_Last updated on 2025.04.09 00:30 (UTC)_

> 如果界面渲染出现问题，请[在 GitHub 上访问](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## 网站

- [k9.lv/c/](http://k9.lv/c/)
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

---

## 使用说明

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

---

### 输入已解析的数据

在主页的输入框中输入数据，格式如下：

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

其中：
- `acc` 为小数表示准确度；
- `level` 代表评级，其定义如下：

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 旧版本存档

`Milthm 3.2` 之前的存档在移动端无法直接提取，可尝试以下方法：

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

### 其他存档路径

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

## 雷达图

相关计算方式由 `PanyiAme` 提供，详见 [Milthm 查分表说明](https://wwp.lanzoup.com/iZ59A2j8nbpe)。

---

## 关于 Milthm

[返回目录](#目录)

### Reality 计算公式

Reality 的计算基于游玩分数和谱面定数：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

单曲 Reality 计算公式如下（其中 s 为分数，c 为定数）：

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

[Reality 对照表](#reality-对照表)

#### 代码实现：

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

## 关于存档文件

在以下部分中，路径将被简写为 `MilthmDataDirectory`。

### 游戏存档  
该文件位于 `MilthmDataDirectory/saves.db`。

其中包含与玩家游戏进度及相关游戏记录相关的数据。 

数据在kv表中以json格式存储（json格式与旧版本的存档数据格式一致）

### 数据存档  
该文件位于 `MilthmDataDirectory/data.db`。

它用于存储每一次成功提交的分数数据。

该文件中的数据是本地排行榜的数据来源。


---

## 音符判定

游戏中单个音符的判定共分为五种，分别为：

- **Perfect**：获得 101% 分数及 100% ACC。
- **perfect**：依据精准度获得 75%-101% 分数及 100% ACC。
- **Good**：依据精准度获得 30%-75% 分数及 50% ACC。
- **Bad**：Combo 中断，获得 0%-30% 分数及 10% ACC。
- **Miss**：Combo 中断，不获得分数与 ACC。

各区间内的分数与精准度成正比例关系，详细判定范围如下表所示：

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## 结算评级

结算评级分为八种：

- **R**：即 Rain，达成理论值 1010000 分（RHYTHM of RAIN，所有音符均为大 Perfect）。
- **紫S**：达成 All Perfect（所有音符均为 Perfect 且未达成 R 评，分数在 1000000-1009999 之间）。
- **青S**：达成 Full Combo（所有音符均无 Bad/Miss 判定且未达成紫S评，此时不考虑下列分数要求）。
- **S**：950000-1009999 分。
- **A**：900000-949999 分。
- **B**：850000-899999 分。
- **C**：800000-849999 分。
- **F**：0-799999 分。

---

## 完成状态

游玩结束后在谱面中展示的评价包括：

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80%，且至少存在一个 Bad/Miss 判定。
- **Full Combo:**  
  - 所有音符均在 ±140ms 内击中，且至少存在一个 Good 判定。
- **All Perfect:**  
  - 所有音符均在 ±70ms 内击中，且至少存在一个 small perfect 判定。
- **Rhythm of Rain:**  
  - 所有音符均在 ±35ms 内击中，即理论值。
- **AutoPlay is Awesome:**  
  - 使用 AutoPlay 通关。
- **Overloaded:**  
  - 分数大于 1010000（使用倾盆大雨）。

---

## 愚人节

### 攻略（仅供参考）
- 进入游戏后开启噩梦游玩任意一首`CB`难度的曲目，游玩时难度显示会发生变化，且所有按键全部转换为雨丝，分数上升极慢
- 游玩后会弹出一个提示，确认后返回，所有曲目的等级都会发生变化，升高大约20倍（[查看](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)），且UserReality会乘以20（与愚人节定数并无联系）
- 然后再次游玩任意谱面后弹出弹窗，然后会去除30级以上的谱面
- 游玩一个大于16级的谱面进入剧情，会解锁`Rainbow Flavor!`的愚人节谱面，然后游戏闪退
- 然后会出现卤味鸭小游戏，打到一定回合后解锁第2张愚人节谱

---

## 隐藏曲解锁方式

- **Regnaissance**

  解锁并游玩 HYPER MEMORIES；  
  游玩过程中背景会出现黑白色的苏珊，此时请勿击打任何音符；  
  之后分数变为负数，同时苏珊变为彩色，继续游玩并使分数 > 0，结算后即可解锁本曲。

- **Contrasty Angeles**

  解锁 Regnaissance 后，阅读主线章节一剧情第 6 话；  
  游玩 HYPER MEMORIES；  
  游玩过程中背景会出现黑白色的苏珊，此时需保持全连；  
  之后分数骤减，同时苏珊变为彩色，继续游玩并使分数 > 0，结算后即可解锁本曲。

- **Dogbite**
- 游玩Dogbite CB难度并获得A以上等级
- 满足第一点后，游玩Oiiaioooooiai，并在音符变成猫时保持全连（此前的音符可打可不打），此时每击中一个音符就会发出狗的叫声
- 满足第二点后，会触发异象，之后进入Dogbite SP谱面，即成功解锁（无需通关）
  
- 注: 可通过开启`倾盆大雨`异象来降低解锁难度

---

## 定数表

[返回目录](#目录)

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

## 说明

> - 所有 `SP` 和非常规谱面均不参与 Reality 计算。  
> - 因精度原因，当前版本所有定数为 11.9 的曲目定数均低于 11.9。例如，若某版本的理论 Reality 为 `13.005`，在游戏内将显示为 `13.00` 而非 `13.01`，实际计算为 `13.004999…`。

当前版本的理论 Reality 为 `12.695`（显示为 12.69）  
当前版本定数最高的 20 首曲目如下：

| 排行 | 标题  | 难度 | 定数 |
|---|---------------------|------|----|
| 1 | Contrasty Angeles | CL | 12.3 |
| 2 | 命日 | CL | 12.2 |
| 3 | 大月墜落狂想 | CB | 12.2 |
| 4 | Regnaissance | CL | 12.1 |
| 5 | Innocent white | CB | 12.1 |
| 6 | Broken Conviction | CL | 11.9 |
| 7 | Meltovt Necrosys | CB | 11.9 |
| 8 | Moonflutter | CL | 11.7 |
| 9 | Fly To Meteor （Milthm Edit） feat.兔柒 | CL | 11.7 |
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

> 点击链接可以查看 曲目/谱面 的详情信息

## 介绍 - 天气预报

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| [Welcome to Milthm](javascript:info("Welcome to Milthm"))  | [1.0](javascript:chart("Welcome to Milthm", "Drizzle"))  | -    | -    | [SP](javascript:chart("Welcome to Milthm", "Special")) |
| [时落之雨](javascript:info("时落之雨"))           | [1.0](javascript:chart("时落之雨", "Drizzle"))  | [4.5](javascript:chart("时落之雨", "Sprinkle"))  | [8.5](javascript:chart("时落之雨", "Cloudburst"))  | -    |
| [夜風](javascript:info("夜風"))               | [3.0](javascript:chart("夜風","Drizzle"))  | [7.3](javascript:chart("夜風", "Sprinkle"))  | [10.1](javascript:chart("夜風", "Cloudburst")) | -    |
| [花月](javascript:info("花月"))               | [2.0](javascript:chart("花月", "Drizzle"))  | [8.2](javascript:chart("花月", "Sprinkle"))  | [9.3](javascript:chart("花月", "Cloudburst"))  | -    |
| [暮予星光](javascript:info("暮予星光"))           | [2.0](javascript:chart("暮予星光", "Drizzle"))  | [7.5](javascript:chart("暮予星光", "Sprinkle"))  | [9.1](javascript:chart("暮予星光", "Cloudburst")) | -    |

## 序章 - 雨的声音

| 标题           | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| [雨之城](javascript:info("雨之城"))        | [1.0](javascript:chart("雨之城", "Drizzle"))  | [4.0](javascript:chart("雨之城", "Sprinkle"))  | [7.5](javascript:chart("雨之城", "Cloudburst"))  | -    |
| [Jump out?](javascript:info("Jump out?"))     | [2.0](javascript:chart("Jump out?", "Drizzle"))  | [7.9](javascript:chart("Jump out?", "Sprinkle"))  | [9.7](javascript:chart("Jump out?", "Cloudburst"))  | -    |
| [Moving On](javascript:info("Moving On"))     | [2.0](javascript:chart("Moving On", "Drizzle"))  | [6.3](javascript:chart("Moving On", "Sprinkle"))  | [10.8](javascript:chart("Moving On", "Cloudburst")) | -    |
| [☹](javascript:info("☹"))      | [4.0](javascript:chart("☹", "Drizzle"))  | [8.0](javascript:chart("☹", "Sprinkle"))  | [10.1](javascript:chart("☹", "Cloudburst")) | -    |
| [イコラト](javascript:info("イコラト"))      | [3.0](javascript:chart("イコラト", "Drizzle"))  | [8.7](javascript:chart("イコラト", "Sprinkle"))  | [11.2](javascript:chart("イコラト", "Cloudburst")) | -    |
| [雨女](javascript:info("雨女"))          | [3.0](javascript:chart("雨女", "Drizzle")) | [6.5](javascript:chart("雨女", "Sprinkle")) | [9.5](javascript:chart("雨女", "Cloudburst")) | [10.5](javascript:chart("雨女", "Clear")) |
| [命日](javascript:info("命日"))          | [3.0](javascript:chart("命日", "Drizzle"))  | [8.7](javascript:chart("命日", "Sprinkle"))  | [11.1](javascript:chart("命日", "Cloudburst")) | [12.2](javascript:chart("命日", "Clear")) |

## 主线章节一 - 甜与苦的一体两面

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| [粗线条的雨](javascript:info("粗线条的雨"))         | [1.0](javascript:chart("粗线条的雨", "Drizzle"))  | [4.0](javascript:chart("粗线条的雨", "Sprinkle"))  | [8.3](javascript:chart("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](javascript:info("Aconsma"))            | [1.0](javascript:chart("Aconsma", "Drizzle"))  | [6.0](javascript:chart("Aconsma", "Sprinkle"))  | [9.3](javascript:chart("Aconsma", "Cloudburst"))  | -    |
| [OverRain](javascript:info("OverRain"))           | [2.0](javascript:chart("OverRain", "Drizzle"))  | [7.6](javascript:chart("OverRain", "Sprinkle"))  | [10.0](javascript:chart("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](javascript:info("Fragment of Memories")) | [2.0](javascript:chart("Fragment of Memories", "Drizzle"))  | [8.4](javascript:chart("Fragment of Memories", "Sprinkle"))  | [11.3](javascript:chart("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](javascript:info("HYPER MEMORIES"))     | [1.0](javascript:chart("HYPER MEMORIES", "Drizzle"))  | [8.9](javascript:chart("HYPER MEMORIES", "Sprinkle"))  | [11.7](javascript:chart("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](javascript:info("Regnaissance"))       | [4.5](javascript:chart("Regnaissance", "Drizzle"))  | [8.5](javascript:chart("Regnaissance", "Sprinkle"))  | [11.1](javascript:chart("Regnaissance", "Cloudburst")) | [12.1](javascript:chart("Regnaissance", "Clear")) |
| [Contrasty Angeles](javascript:info("Contrasty Angeles"))  | [4.0](javascript:chart("Contrasty Angeles", "Drizzle"))  | [9.0](javascript:chart("Contrasty Angeles", "Sprinkle"))  | [11.5](javascript:chart("Contrasty Angeles", "Cloudburst")) | [12.3](javascript:chart("Contrasty Angeles", "Clear")) |

## 联动 - 雨世界

| 标题                    | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| [Sundown](javascript:info("Sundown"))                | [1.0](javascript:chart("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](javascript:info("Bio-Engineering"))        | [2.0](javascript:chart("Bio-Engineering", "Drizzle"))  | [8.3](javascript:chart("Bio-Engineering", "Sprinkle"))  | [9.6](javascript:chart("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](javascript:info("Threat - Sky Islands"))   | [2.0](javascript:chart("Threat - Sky Islands", "Drizzle"))  | [6.9](javascript:chart("Threat - Sky Islands", "Sprinkle"))  | [10.6](javascript:chart("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](javascript:info("Threat - Superstructure")) | [2.0](javascript:chart("Threat - Superstructure", "Drizzle"))  | [5.5](javascript:chart("Threat - Superstructure", "Sprinkle"))  | [10.3](javascript:chart("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](javascript:info("White Lizard"))           | -    | [4.0](javascript:chart("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](javascript:info("Threat - Waterfront Complex")) | [2.0](javascript:chart("Threat - Waterfront Complex", "Drizzle"))  | [7.6](javascript:chart("Threat - Waterfront Complex", "Sprinkle"))  | [10.6](javascript:chart("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](javascript:info("Kayava"))                 | [3.0](javascript:chart("Kayava", "Drizzle"))  | [5.5](javascript:chart("Kayava", "Sprinkle"))  | [10.4](javascript:chart("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](javascript:info("Threat - Metropolis"))    | [2.0](javascript:chart("Threat - Metropolis", "Drizzle"))  | [6.6](javascript:chart("Threat - Metropolis", "Sprinkle"))  | [11.5](javascript:chart("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](javascript:info("Sheer Ice Torrent"))      | [2.0](javascript:chart("Sheer Ice Torrent", "Drizzle"))  | [7.8](javascript:chart("Sheer Ice Torrent", "Sprinkle"))  | [11.1](javascript:chart("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](javascript:info("大月墜落狂想")) | [2.0](javascript:chart("大月墜落狂想", "Drizzle"))  | [8.0](javascript:chart("大月墜落狂想", "Sprinkle"))  | [12.2](javascript:chart("大月墜落狂想", "Cloudburst")) | -    |

## 联动 - Notanote

| 标题              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [烁雨](javascript:info("烁雨"))             | [2.0](javascript:chart("烁雨", "Drizzle"))  | [7.0](javascript:chart("烁雨", "Sprinkle"))  | [9.4](javascript:chart("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](javascript:info("cybernetic blazar")) | [4.0](javascript:chart("cybernetic blazar", "Drizzle"))  | [7.8](javascript:chart("cybernetic blazar", "Sprinkle"))  | [10.2](javascript:chart("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](javascript:info("Innocent white"))    | [2.0](javascript:chart("Innocent white", "Drizzle"))  | [8.2](javascript:chart("Innocent white", "Sprinkle"))  | [12.1](javascript:chart("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](javascript:info("Elsorhg"))           | [2.0](javascript:chart("Elsorhg", "Drizzle"))  | [7.5](javascript:chart("Elsorhg", "Sprinkle"))  | [9.8](javascript:chart("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](javascript:info("Meltovt Necrosys"))  | [2.0](javascript:chart("Meltovt Necrosys", "Drizzle"))  | [7.8](javascript:chart("Meltovt Necrosys", "Sprinkle"))  | [11.9](javascript:chart("Meltovt Necrosys", "Cloudburst"))  | -    |

## 单曲 - 梦境磁带

| 标题                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| [ネオン色のまち feat. Mai](javascript:info("ネオン色のまち feat. Mai"))    | [3.5](javascript:chart("ネオン色のまち feat. Mai", "Drizzle"))  | [8.0](javascript:chart("ネオン色のまち feat. Mai", "Sprinkle"))  | [9.7](javascript:chart("ネオン色のまち feat. Mai", "Cloudburst"))  | -    |
| [INFP.mp3](javascript:info("INFP.mp3"))                    | [2.0](javascript:chart("INFP.mp3", "Drizzle"))  | [5.5](javascript:chart("INFP.mp3", "Sprinkle"))  | [9.2](javascript:chart("INFP.mp3", "Cloudburst"))  | -    |
| [Oniichan](javascript:info("Oniichan"))                    | [3.0](javascript:chart("Oniichan", "Drizzle"))  | [8.0](javascript:chart("Oniichan", "Sprinkle"))  | [9.8](javascript:chart("Oniichan", "Cloudburst"))  | -    |
| [Oiiaioooooiai](javascript:info("Oiiaioooooiai"))               | -    | -    | -    | [SP](javascript:chart("Oiiaioooooiai", "Special")) |
| [WATER](javascript:info("WATER"))                       | [3.0](javascript:chart("WATER", "Drizzle"))  | [7.3](javascript:chart("WATER", "Sprinkle"))  | [10.6](javascript:chart("WATER", "Cloudburst")) | -    |
| [Dogbite](javascript:info("Dogbite"))                     | [3.0](javascript:chart("Dogbite", "Drizzle"))  | [7.6](javascript:chart("Dogbite", "Sprinkle"))  | [10.3](javascript:chart("Dogbite", "Cloudburst")) | [SP](javascript:chart("Dogbite", "Special")) |
| [Hikari](javascript:info("Hikari"))                      | [3.0](javascript:chart("Hikari", "Drizzle"))  | [8.4](javascript:chart("Hikari", "Sprinkle"))  | [10.7](javascript:chart("Hikari", "Cloudburst")) | -    |
| [Moonflutter](javascript:info("Moonflutter"))                 | [3.0](javascript:chart("Moonflutter", "Drizzle"))  | [7.9](javascript:chart("Moonflutter", "Sprinkle"))  | [11.4](javascript:chart("Moonflutter", "Cloudburst")) | [11.7](javascript:chart("Moonflutter", "Clear")) |
| [Fly To Meteor （Milthm Edit）](javascript:info("Fly To Meteor （Milthm Edit）"))              | [3.0](javascript:chart("Fly To Meteor （Milthm Edit）", "Drizzle"))  | [6.5](javascript:chart("Fly To Meteor （Milthm Edit）", "Sprinkle"))  | [10.5](javascript:chart("Fly To Meteor （Milthm Edit）", "Cloudburst")) | - |
| [Fly To Meteor feat.兔柒 （Milthm Edit）](javascript:info("Fly To Meteor feat.兔柒 （Milthm Edit）"))              | - | - | - | [11.7](javascript:chart("Fly To Meteor feat.兔柒 （Milthm Edit）", "Clear")) |
| [樱落繁花](javascript:info("樱落繁花"))                    | [3.0](javascript:chart("樱落繁花", "Drizzle"))  | [8.8](javascript:chart("樱落繁花", "Sprinkle"))  | [10.9](javascript:chart("樱落繁花", "Cloudburst")) | -    |
| [Agnostic](javascript:info("Agnostic"))                    | [3.0](javascript:chart("Agnostic", "Drizzle"))  | [7.4](javascript:chart("Agnostic", "Sprinkle"))  | [10.0](javascript:chart("Agnostic", "Cloudburst")) | -    |
| [Psyched Fevereiro](javascript:info("Psyched Fevereiro"))           | [3.5](javascript:chart("Psyched Fevereiro", "Drizzle"))  | [7.3](javascript:chart("Psyched Fevereiro", "Sprinkle"))  | [10.0](javascript:chart("Psyched Fevereiro", "Cloudburst")) | -    |
| [Future Unbound （Game Edit）](javascript:info("Future Unbound （Game Edit）"))  | [3.0](javascript:chart("Future Unbound （Game Edit）","Drizzle"))  | [7.5](javascript:chart("Future Unbound （Game Edit）","Sprinkle"))  | [10.5](javascript:chart("Future Unbound （Game Edit）","Cloudburst")) | -    |
| [Algebra](javascript:info("Algebra"))                     | [2.0](javascript:chart("Algebra", "Drizzle"))  | [8.1](javascript:chart("Algebra", "Sprinkle"))  | [11.4](javascript:chart("Algebra", "Cloudburst")) | [SP](javascript:chart("Algebra", "Special")) |
| [Words](javascript:info("Words"))                       | [2.0](javascript:chart("Words", "Drizzle"))  | [6.5](javascript:chart("Words", "Sprinkle"))  | [9.3](javascript:chart("Words", "Cloudburst"))  | -    |
| [仮想明日](javascript:info("仮想明日"))                    | [3.5](javascript:chart("仮想明日", "Drizzle"))  | [6.6](javascript:chart("仮想明日", "Sprinkle"))  | [10.0](javascript:chart("仮想明日", "Cloudburst"))  | -    |
| [白虎蓮華](javascript:info("白虎蓮華"))                    | [3.0](javascript:chart("白虎蓮華", "Drizzle"))  | [6.5](javascript:chart("白虎蓮華", "Sprinkle"))  | [9.6](javascript:chart("白虎蓮華", "Cloudburst"))  | -    |
| [サイクルの欠片](javascript:info("サイクルの欠片"))              | [1.0](javascript:chart("サイクルの欠片", "Drizzle"))  | [7.8](javascript:chart("サイクルの欠片", "Sprinkle"))  | [8.6](javascript:chart("サイクルの欠片", "Cloudburst"))  | -    |
| [参宿四\~Betelgeuse\~](javascript:info("参宿四~Betelgeuse~"))          | [2.0](javascript:chart("参宿四~Betelgeuse~", "Drizzle"))  | [6.4](javascript:chart("参宿四~Betelgeuse~", "Sprinkle"))  | [11.2](javascript:chart("参宿四~Betelgeuse~", "Cloudburst"))  | -    |
| [slic.hertz #GdbG](javascript:info("slic.hertz #GdbG"))            | [3.0](javascript:chart("slic.hertz #GdbG", "Drizzle"))  | [7.6](javascript:chart("slic.hertz #GdbG", "Sprinkle"))  | [11.4](javascript:chart("slic.hertz #GdbG", "Cloudburst"))  | -    |
| [Rainbow Flavor!](javascript:info("Rainbow Flavor!"))             | [2.0](javascript:chart("Rainbow Flavor!", "Drizzle"))  | [7.5](javascript:chart("Rainbow Flavor!", "Sprinkle"))  | [9.8](javascript:chart("Rainbow Flavor!", "Cloudburst")) | [SP](javascript:chart("Rainbow Flavor!", "Special")) |
| [IN](javascript:info("IN"))                           | [1.0](javascript:chart("IN", "Drizzle"))  | [7.9](javascript:chart("IN", "Sprinkle"))  | [11.2](javascript:chart("IN", "Cloudburst")) | -    |
| [驟雨の狭間](javascript:info("驟雨の狭間"))                  | -    | -    | [Ø](javascript:chart("驟雨の狭間", "Cloudburst"))    | - |
| [Broken Conviction](javascript:info("Broken Conviction"))           | [4.5](javascript:chart("Broken Conviction", "Drizzle"))  | [4.5](javascript:chart("Broken Conviction", "Sprinkle"))  | [11.5](javascript:chart("Broken Conviction", "Cloudburst")) | [11.9](javascript:chart("Broken Conviction", "Clear")) |
| [选择你的宽带](javascript:info("选择你的宽带")) | - | - | - | [SP](javascript:chart("选择你的宽带", "Special")) |

## 单曲 - 露晓卉庭

| 标题                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| [FULi AUTO SHOOTER](javascript:info("FULi AUTO SHOOTER")) | [3.0](javascript:chart("FULi AUTO SHOOTER", "Drizzle"))  | [7.2](javascript:chart("FULi AUTO SHOOTER", "Sprinkle"))  | [10.6](javascript:chart("FULi AUTO SHOOTER", "Cloudburst"))  | -    |
| [cafe in 6412I731V](javascript:info("cafe in 6412I731V"))                    | [2.0](javascript:chart("cafe in 6412I731V", "Drizzle"))  | [7.0](javascript:chart("cafe in 6412I731V", "Sprinkle"))  | [11.3](javascript:chart("cafe in 6412I731V", "Cloudburst"))  | -    |
| [KASANE](javascript:info("KASANE")) | [3.0](javascript:chart("KASANE", "Drizzle"))  | [7.8](javascript:chart("KASANE", "Sprinkle"))  | [11.6](javascript:chart("KASANE", "Cloudburst"))  | -    |
| [KAEDE](javascript:info("KAEDE")) | -  | -  | -  | [SP](javascript:chart("KAEDE", "Special")) |

---

## 联系我们

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

### 常见问题

[返回目录](#目录)

- [点击生成图片（或其他元素）没反应](#点击生成图片（或其他元素）没反应)
- [找不到文件在哪或不存在文件夹](#找不到文件在哪或不存在文件夹)
- [怎么备份存档](#怎么备份存档)
- [找不到某些曲目](#找不到某些曲目)
- [Reality 计算公式](#reality-计算公式)
- [音符判定](#音符判定)

> 请确保您懂得最基本的操作。如果不懂且不愿意自行学习，我们不建议您使用此网站。

---

#### 点击生成图片（或其他元素）没反应

- 检查网络状态。如果无法访问 GitHub，您可以前往 [k9.lv/c/](http://k9.lv/c)。
- 尝试更换到系统自带浏览器，或使用类似 Chrome、[Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ) 等浏览器。  
  (不建议使用百度、360等浏览器)
- 如果问题依旧，可能是因为系统版本过低。

---

#### 找不到文件在哪或不存在文件夹

可以在 [上传存档文件](#上传存档文件) 中查看存档路径。

##### 如果在该路径下未找到文件/未找到该路径

首先确认您的 Milthm 版本。更新到 3.2 以上版本后，需启动一次游戏才能在该路径内生成存档。

- **安卓**

  如果当前使用的是系统文件管理器或第三方文件管理器，您可以尝试使用其他文件管理器访问。  
  推荐使用 [MT 管理器](https://mt2.cn/)，并在应用顶部的地址栏中输入以下路径直接跳转（如果有多个用户，请将 `0` 改为用户 ID 或将 `/storage/emulated/0/` 改为 `/sdcard/`）：
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  也可以通过右上角添加书签，在底部上滑+号进行快速访问。

  如果系统阻止访问该文件夹且无法授予权限，您只能通过连接电脑或使用 ADB 权限访问。  
  在较高版本的安卓系统中，可能会出现此问题。若开发者选项中启用了 USB 调试，并且开启了“无线调试”，可以在没有电脑的情况下，使用 [Shizuku](https://shizuku.rikka.app/zh-hans/download/) 进行无线 ADB 调试。更多说明请参见 Shizuku 的相关文档。

- **IOS**

  如果在 `文件` 应用中找不到此 iPhone/iPad 的文件夹，请前往应用主页，在右上角的设置中查看是否隐藏了本地文件。  
  如果仍未找到 Milthm 的文件夹，检查您是否使用了正确的 Milthm 版本。

## 其他内容

[返回目录](#目录)

### Milthm Wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Milthm交流群

记录于25.4.6 11:00  
  
  Milthm#1 交流群	372255828	人数1431  
  Milthm#2 交流群	750984298	人数38  
  Milthm#3 交流群	910085472	人数1917  
  Milthm#5 官方交流群	480062123	人数86  
  Milthm#6 公开测试	915230984	人数6  
  Milthm#7 交流群	774927051	人数264  
  Milthm#8 交流群	887231011	人数1319  
  Milthm#9 开发交流群	1047814125	人数23  
  Milthm#10 交流群	454822146	人数351  
  Milthm#11 交流群	343648174	人数57  
  Milthm#12 交流群	744370232	人数61  
  Milthm#13 交流群	1042806409	人数14  
  
  梦见霖音高级中学 高一一部9班	850833385	人数58  
  梦见霖音高级中学 高一一部114514班	574275806	人数11  

  Mhtlim#√-1 洨巟羣	375882310	人数173  
  Milthm#Φ 交流群	678471942	人数38  
  milthm#神金 交流群	877854042	人数60  
  Milthm及各种🐉🖊交流群	981366419	人数54

### 什么是文件路径

文件路径是指向文件系统中某个唯一位置的字符串表示形式，通常采用目录树结构。不同操作系统使用不同的分隔符，如 `/`、`\` 或 `:`。路径可以为绝对路径或相对路径，用以表示文件夹与文件间的关系，在构建 URL 时也十分重要。

#### 安卓文件路径

- **外部存储：**  
  位于 `/storage/emulated/用户标识（默认主用户为 0）/` 或 `/sdcard/` 下，此部分文件为用户可见。
- **应用数据目录：**  
  通常位于 `/storage/emulated/0/Android/data/包名/`，例如：  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Milthm 的存档目录在：  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  若系统阻止访问，请尝试连接电脑或授予文件管理器 ADB 权限。

---

### Reality 对照表

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

