
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
  - [Score V3算法](#score-v3算法)
  - [关于查分图中的Ytilaer](关于查分图中的ytilaer)
  - [关于存档文件](#关于存档文件)
  - [音符判定](#音符判定)
  - [结算评级](#结算评级)
  - [完成状态](#完成状态)
  - [露晓卉庭](#露晓卉庭)
  - [愚人节](#愚人节)
  - [隐藏曲解锁方式](#隐藏曲解锁方式)
  - [定数表](#定数表)
  - [谱师统计](#谱师统计)
  - [独占曲](#独占曲)
  - [点击加速Milthm开发进程](#点击加速milthm开发进程)
- [联系我们](#联系我们)
- [常见问题](#常见问题)
- [其他内容](#其他内容)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流群](#milthm交流群)
  - [什么是文件路径](#什么是文件路径)

---

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

> 如果界面渲染出现问题，请[在 GitHub 上访问](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## 网站

- [k9.lv/c/](htt://k9.lv/c/)
- [mhtlim.top](https://mhtlim.top/)
- [mhtl.im](https://mhtl.im)
> 以上网站由_4everDimensions托管
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/)
- [milcalc.netlify.app](https://milcalc.netlify.app/)
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

### 输入已解析的数据

在主页的输入框中输入数据，格式如下：

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [name,Difficulty, constant, score, acc, level,achievedStatus]
}
```

其中：
- `acc` 为小数表示准确度；
- `level` 代表评级，其定义如下：

```text
level: 0=R, 1=M, 2=S, 3=A, 4=B, 5=C, 6=F
achievedStatus: 0=clear, 3=?, 4=fc, 5=ap, 6=false
```

> 沿用了milthm3.8版本中的评级格式，但实际从3.9版本开始存档中就不是这种格式了

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
\text{Realityv3}(s, c) =
\begin{cases}
c + 1.5, & s \in [1000000, \infty), \\[6pt]
c + \dfrac{s - 850000}{100000}, & s \in [850000, 1000000), \\[10pt]
\max\!\Biggl(0,\; c \Bigl(0.5 + \dfrac{s - 700000}{300000}\Bigr) + \dfrac{s - 850000}{100000}\Biggr), & s \in [700000, 850000), \\[12pt]
\max\!\Biggl(0,\; (c - 3)\dfrac{s - 600000}{200000}\Biggr), & s \in [600000, 700000), \\[10pt]
0, & s \in [0, 600000).
\end{cases}
$$

在当前版本下，如果旧版(4.0以前)的分数不高于1005000，且未达到AllPerfect以上的评级，则将同时使用reality v2与v3公式取最高值，如下：  

$$
\text{Realityv2}(s, c) =
\begin{cases} 
\mathbf{1 + c}, & s \in [1005000, 1010000] \\
\displaystyle \frac{1.4}{e^{3.65 \cdot \left(99.5 - \frac{s}{10000}\right)} + 1} - 0.4 + c, 
& s \in [995000, 1005000) \\
\displaystyle \frac{e^{3.1 \cdot \frac{s - 980000}{15000}} - 1}{e^{3.1} - 1} \cdot 0.8 - 0.5 + c, 
& s \in [980000, 995000) \\
\displaystyle \frac{s}{280000} - 4 + c, & s \in [700000, 980000) \\
0, & s \in (-\infty, 700000)
\end{cases}
$$


#### 代码实现：

```js
function realityv3(score, c) {
    if (c < 1e-3) return 0;
    if (score >= 1000000) return c + 1.5;
    if (score >= 850000) return c + (score - 850000) / 100000.0;
    if (score >= 700000) return Math.max(0, c * (0.5 + (score - 700000) / 300000.0) + (score - 850000) / 100000.0);
    if (score >= 600000) return Math.max(0, (c - 3) * (score - 600000) / 200000.0);
    return 0;
}

function realityv2(score, c) {
  if (c < 1e-3) return 0;
  if (score >= 1005000) return 1 + c;
  if (score >= 995000) return 1.4 / (Math.exp(363.175 - score * 0.000365) + 1) - 0.4 + c;
  if (score >= 980000) return ((Math.exp(3.1 * (score - 980000) / 15000) - 1) / (Math.exp(3.1) - 1)) * 0.8 - 0.5 + c;
  if (score >= 700000) return score / 280000 - 4 + c;
  return 0;
}

```

---

### Score V3算法

[官方文档](https://www.milthm.cn/wiki/hans/blog/2025-08-17)  
代码实现  
```js
// input为包含判定序列(epgnbm)的字符串
function calculateScore(input) {
  const noteAmount = input.length;
  const bMax = Math.min(192, Math.max(Math.floor(noteAmount * 0.24), 1));
  const params = {
    e: { a: 2, b: bMax},
    p: { a: 1, b: bMax},
    g: { a: 0, b: Math.min(128, Math.max(Math.floor(noteAmount * 0.16), 1))},
    n: { a: 0, b: Math.min(96, Math.max(Math.floor(noteAmount * 0.12), 1))},
    b: { a: 0, b: Math.min(64, Math.max(Math.floor(noteAmount * 0.1), 1))},
    m: { a: 0, b: Math.min(64, Math.max(Math.floor(noteAmount * 0.08), 1))}
  };
  const scoreMap = { e: 100, p: 99, g: 60, n: 30, b: 15, m: 0 };
  // 初始化变量
  let totalAccScore = totalComboScore = maxCombo = currentCombo = 0;
  let currentComboScore = bMax;
  // 处理每个判定
  for (let i = 0; i < noteAmount; i++) {
    const judge = input[i];
    const n = i + 1; // 当前判定序号
    // 更新准度分
    totalAccScore += scoreMap[judge];
    // 更新连击数
    currentCombo = (judge !== 'b' && judge !== 'm') ? currentCombo + 1 : 0;
    maxCombo = Math.max(maxCombo, currentCombo);
    // 更新连击分
    const { a, b} = params[judge];
    currentComboScore = Math.max(Math.min(currentComboScore + a, b), 0);
    // 计入连击分累积值
    totalComboScore += currentComboScore;
  }
  // 补差公式(化简)
  if ( currentComboScore < bMax ) totalComboScore = Math.max(totalComboScore + (1 - (bMax - currentComboScore - 1)**2) / 4, 0);
  const apBonus = /^[ep]+$/i.test(input) ? 5000 : 0;
  const accScore = totalAccScore * 10000 / noteAmount;
  const comboMult = totalComboScore / noteAmount / bMax;
  const comboBonus = 5000 * maxCombo / noteAmount;
  // 最终得分
  return Math.floor(accScore * (0.4 + 0.6 * comboMult)) + Math.floor(comboBonus) + apBonus;
}
```

[score v3网页计算器](https://mkzi-nya.github.io/mil/)  

---

## 关于查分图中的Ytilaer

该值无实际意义，具体如下
- 当b20的平均分大于1005k时，该值与实际Reality相等
- 该值为20首曲目的reality(平均分,平均单曲rlt)的最大值

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
未达成FC(全连)时为白色,FC为蓝色,AP为紫色  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">：旧版显示为<img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">，达成理论值 1010000 分（RHYTHM of RAIN，所有音符均为满分）。
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M,即Milthm，分数达到1005000时获得；
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">：分数达到950000时获得；
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">：分数达到900000时获得；
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">：分数达到850000时获得；
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">：分数达到800000时获得；
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">：分数小于800000时获得，未通关，没有FC/AP图标。

---

## 完成状态

游玩结束后在谱面中展示的评价包括：

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC > 80%，且至少存在一个 Bad/Miss 判定。
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±140ms 内击中，且至少存在一个 Good 判定。
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±70ms 内击中，且至少存在一个 small perfect 判定。
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±35ms 内击中，即理论值。
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:  
  - 使用 AutoPlay 通关。
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:  
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

## 露晓卉庭
在这里，可以点击花盆种植作物。  
开启`绮梦`游玩曲目可以收集`露凝`，使用`露凝`浇水可以加速作物成熟。  
每次浇水可以减少20%总时长，冷却25%总时长  
> 故最低只需要等待一半的时长及可收割  

每次收割时有小概率使产量增加100%-300%，浇水可以提高概率  
当前版本拥有如下作物：  

<div style="font-size:10px;">

| 作物 | 类型 | 解锁条件 | 基础收成 | 时间 | 耗材 |
|-|-|-|-|-|-|
| 蘑菇 | 蘑菇/食物 | 无 | 8 | 1h | 无 |
| 水蕨菜 | 食物 | 3级 | 45 | 6h | 蘑菇*5 |
| 勿忘草 | 装饰 | 4级 | 7 | 9h | 无 |
| 水晶兰 | 装饰 | 6级 | 20 | 1d8h | 装饰\*5 |
| 蓝莓 | 食物 | 8级 | 300 | 4d | 装饰\*5 |
| 草菇 | 蘑菇/食物 | 10级 | 18 | 1h | 蘑菇\*5 |

</div>

### 净收益

净收益计算方式为`基础收成/(时间+耗材成本)`  
当以`蘑菇`与`勿忘草`为`蘑菇`类和`装饰`类的耗材成本时，净收益如下  
<div style="font-size:10px;">

| 作物 |净收益 |
|-|-|
| 蘑菇 | 8/h |
| 水蕨菜 | 6.8/h |
| 勿忘草 | 0.78/h |
| 水晶兰 | 0.52/h |
| 蓝莓 | 2.93/h |
| 草菇 | 11.08/h |

</div>


可以点击页面左下角花费作物升级，初始为1级  
当前版本的升级所需耗材：  

<div style="font-size:10px;">

| 等级 | 耗材 | 总计 |
|-|-|-|
| 2 | 食物\*5 | 食物\*5 |
| 3 | 食物\*40 | 食物\*45 |
| 4 | 食物\*80 | 食物\*125 |
| 5 | 食物\*100 | 食物\*225 |
| 6 | 食物\*150 | 食物\*375 |
| 7 | 装饰\*5 | 食物\*375,装饰\*5 |
| 8 | 装饰\*20 | 食物\*375,装饰\*20 |
| 9 | 食物\*350 | 食物\*725,装饰\*20 |
| 10 | | |

</div>

可以使用作物兑换部分单曲  
当前版本单曲所需耗材：

<div style="font-size:10px;">

| 曲目 | 耗材 |
|-|-|
| Garden | 蘑菇\*10 |
| Fantasia Sonata Botanical Garden | 装饰\*20 |
| Dum! Dum!! Dum!!! | 食物\*60 |
| Splash the Beat!! | 食物\*300 |

</div>

共计：`蘑菇`\*10,`装饰`\*20,`食物`\*360  
当前版本解锁所有曲目至少需 `蘑菇`\*10,`装饰`\*20,`食物`\*485  
在不考虑产量概率增加的情况下最低(及时浇水)需要24小时  


---

## 隐藏曲解锁方式

- **Regnaissance**

  解锁并游玩 HYPER MEMORIES；  
  游玩过程中背景会出现黑白色的苏珊，此时请勿击打任何音符；  
  之后分数变为负数，同时苏珊变为彩色，继续游玩并使分数 > 0，结算后即可解锁本曲。

- **Contrasty Angeles**

  阅读主线章节一剧情第 6 话；  
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
- [支线章节](#支线章节一---花裳随雨得春迟)
  - [花裳随雨得春迟](#支线章节一---花裳随雨得春迟)
- [联动章节](#联动---雨世界)
  - [雨世界](#联动---雨世界)
  - [Notanote](#联动---notanote)
  - [Electrode Core](#联动---electrode-core)
- [单曲](#单曲---梦境磁带)
  - [梦境磁带](#单曲---梦境磁带)
  - [露晓卉庭](#单曲---露晓卉庭)

---

## 说明

> - 所有 `SP` 和非常规谱面均不参与 Reality 计算。  
> - 因精度原因，当前版本所有定数为 11.9 的曲目定数均低于 11.9。例如，若某版本的理论 Reality 为 `13.005`，在游戏内将显示为 `13.00` 而非 `13.01`，实际计算为 `13.004999…`。

当前版本的理论 Reality 为 `12.725`（显示为 12.72）  
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
| 9 | Fly To Meteor (Milthm Edit) feat.兔柒 | CL | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | Brightened Demonios | CB | 11.7 |
| 12 | KASANE | CB | 11.6 |
| 13 | Broken Conviction | CB | 11.5 |
| 14 | Threat - Metropolis | CB | 11.5 |
| 15 | Contrasty Angeles | CB | 11.5 |
| 16 | slic.hertz #GdbG | CB | 11.4 |
| 17 | Moonflutter | CB | 11.4 |
| 18 | Algebra | CB | 11.4 |
| 19 | Myth compiler | CB | 11.4 |
| 20 | Fragment of Memories | CB | 11.3 |
| 20 | cafe in 6412I731V | CB | 11.3 |

---

> 点击链接可以查看 曲目/谱面 的详情信息
> 曲目/谱面详情信息来源于Milthm Lang的仓库[RainSeek.Dataset.Milthm](https://github.com/MilthmLang/RainSeek.Dataset.Milthm/)，已获得使用许可

---

## 介绍 - 天气预报

| 标题                | DZ   | SK   | CB   | CL   | SP |
|---------------------|------|------|------|------|---|
| [Welcome to Milthm](info:info("Welcome to Milthm"))  | [1.0](info:info("Welcome to Milthm", "Drizzle")) | -  | - | - | [SP](info:info("Welcome to Milthm", "Special")) |
| [时落之雨](info:info("时落之雨"))           | [1.0](info:info("时落之雨", "Drizzle"))  | [4.5](info:info("时落之雨", "Sprinkle"))  | [8.5](info:info("时落之雨", "Cloudburst"))  | -    | - |
| [夜風](info:info("夜風"))               | [3.0](info:info("夜風","Drizzle"))  | [7.3](info:info("夜風", "Sprinkle"))  | [10.1](info:info("夜風", "Cloudburst")) | -    | - |
| [花月](info:info("花月"))               | [2.0](info:info("花月", "Drizzle"))  | [8.2](info:info("花月", "Sprinkle"))  | [9.3](info:info("花月", "Cloudburst"))  | -    | - |
| [暮予星光](info:info("暮予星光"))           | [2.0](info:info("暮予星光", "Drizzle"))  | [7.5](info:info("暮予星光", "Sprinkle"))  | [9.1](info:info("暮予星光", "Cloudburst")) | -    | - |
| [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome"))           | [2.5](info:info("Fantasia Sonata Sky Syndrome", "Drizzle"))  | [7.1](info:info("Fantasia Sonata Sky Syndrome", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Sky Syndrome", "Cloudburst")) | -    | - |

---

## 序章 - 雨的声音

---

| 标题           | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| [LOUDER!](info:info("LOUDER!"))  | [2.0](info:info("LOUDER!", "Drizzle"))  | [5.5](info:info("LOUDER!", "Sprinkle"))  | [9.5](info:info("LOUDER!", "Cloudburst")) | - |
| [雨女](info:info("雨女"))          | [3.0](info:info("雨女", "Drizzle")) | [6.5](info:info("雨女", "Sprinkle")) | [9.5](info:info("雨女", "Cloudburst")) | [10.5](info:info("雨女", "Clear")) |
| [雨之城](info:info("雨之城"))        | [1.0](info:info("雨之城", "Drizzle"))  | [4.0](info:info("雨之城", "Sprinkle"))  | [7.5](info:info("雨之城", "Cloudburst"))  | -    |
| [Jump out?](info:info("Jump out?"))     | [2.0](info:info("Jump out?", "Drizzle"))  | [7.9](info:info("Jump out?", "Sprinkle"))  | [9.7](info:info("Jump out?", "Cloudburst"))  | -    |
| [☹](info:info("☹"))      | [4.0](info:info("☹", "Drizzle"))  | [8.0](info:info("☹", "Sprinkle"))  | [10.1](info:info("☹", "Cloudburst")) | -    |
| [イコラト](info:info("イコラト"))      | [3.0](info:info("イコラト", "Drizzle"))  | [8.7](info:info("イコラト", "Sprinkle"))  | [11.2](info:info("イコラト", "Cloudburst")) | -    |
| [命日](info:info("命日"))          | [3.0](info:info("命日", "Drizzle"))  | [8.6](info:info("命日", "Sprinkle"))  | [11.1](info:info("命日", "Cloudburst")) | [12.7(12.2)](info:info("命日", "Clear")) |

---

## 主线章节一 - 甜与苦的一体两面

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| [粗线条的雨](info:info("粗线条的雨"))         | [1.0](info:info("粗线条的雨", "Drizzle"))  | [4.0](info:info("粗线条的雨", "Sprinkle"))  | [8.3](info:info("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](info:info("Aconsma"))            | [1.0](info:info("Aconsma", "Drizzle"))  | [6.0](info:info("Aconsma", "Sprinkle"))  | [9.3](info:info("Aconsma", "Cloudburst"))  | -    |
| [OverRain](info:info("OverRain"))           | [2.0](info:info("OverRain", "Drizzle"))  | [7.6](info:info("OverRain", "Sprinkle"))  | [10.0](info:info("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](info:info("Fragment of Memories")) | [2.0](info:info("Fragment of Memories", "Drizzle"))  | [8.4](info:info("Fragment of Memories", "Sprinkle"))  | [11.3](info:info("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](info:info("HYPER MEMORIES"))     | [3.0](info:info("HYPER MEMORIES", "Drizzle"))  | [8.9](info:info("HYPER MEMORIES", "Sprinkle"))  | [11.8(11.7)](info:info("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](info:info("Regnaissance"))       | [4.5](info:info("Regnaissance", "Drizzle"))  | [8.5](info:info("Regnaissance", "Sprinkle"))  | [11.1](info:info("Regnaissance", "Cloudburst")) | [12.1](info:info("Regnaissance", "Clear")) |
| [Contrasty Angeles](info:info("Contrasty Angeles"))  | [4.0](info:info("Contrasty Angeles", "Drizzle"))  | [9.0](info:info("Contrasty Angeles", "Sprinkle"))  | [11.5](info:info("Contrasty Angeles", "Cloudburst")) | [12.5(12.3)](info:info("Contrasty Angeles", "Clear")) |
| [Brightened Demonios](info:info("Brightened Demonios"))  | [4.5](info:info("Brightened Demonios", "Drizzle"))  | [9.3](info:info("Brightened Demonios", "Sprinkle"))  | [11.7](info:info("Brightened Demonios", "Cloudburst")) | - |
| [Myth compiler](info:info("Myth compiler"))  | [3.0](info:info("Myth compiler", "Drizzle"))  | [7.0](info:info("Myth compiler", "Sprinkle"))  | [11.4](info:info("Myth compiler", "Cloudburst")) | - |
| [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia"))  | [2.0](info:info("Fantasia Sonata Arcadia", "Drizzle"))  | [6.0](info:info("Fantasia Sonata Arcadia", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Arcadia", "Cloudburst")) | - |

---

## 支线章节一 - 花裳随雨得春迟

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| [Vestige of Dreams](info:info("Vestige of Dreams"))          | [2.5](info:info("Vestige of Dreams", "Drizzle"))  | [6.5](info:info("Vestige of Dreams", "Sprinkle"))  | [11.5](info:info("Vestige of Dreams", "Cloudburst")) | - |
| [百九十](info:info("百九十"))          | [3.0](info:info("百九十", "Drizzle"))  | [9.2](info:info("百九十", "Sprinkle"))  | [11.8](info:info("百九十", "Cloudburst")) | - |
| [灯ノ桜蝶](info:info("灯ノ桜蝶"))          | [2.0](info:info("灯ノ桜蝶", "Drizzle"))  | [9.7](info:info("灯ノ桜蝶", "Sprinkle"))  | [12.0](info:info("灯ノ桜蝶", "Cloudburst")) | - |
| [Sakuyahime](info:info("Sakuyahime"))          | [3.5](info:info("Sakuyahime", "Drizzle"))  | [5.8](info:info("Sakuyahime", "Sprinkle"))  | [11.9](info:info("Sakuyahime", "Cloudburst")) | - |
| [靈](info:info("靈"))          | [4.5](info:info("靈", "Drizzle"))  | [9.4](info:info("靈", "Sprinkle"))  | [12.8](info:info("靈", "Cloudburst")) | - |
| [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks"))          | [2.0](info:info("BUCHiAGE Fireworks", "Drizzle"))  | [7.7](info:info("BUCHiAGE Fireworks", "Sprinkle"))  | [10.7](info:info("BUCHiAGE Fireworks", "Cloudburst")) | - |
| [ニニ feat. Qayo & mii](info:info("ニニ feat. Qayo & mii"))          | [2.0](info:info("ニニ feat. Qayo & mii", "Drizzle"))  | [6.7](info:info("ニニ feat. Qayo & mii", "Sprinkle"))  | [11.3](info:info("ニニ feat. Qayo & mii", "Cloudburst")) | - |


---

## 联动 - 雨世界

| 标题                    | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| [Sundown](info:info("Sundown"))                | [1.0](info:info("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](info:info("Bio-Engineering"))        | [2.0](info:info("Bio-Engineering", "Drizzle"))  | [8.3](info:info("Bio-Engineering", "Sprinkle"))  | [9.6](info:info("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](info:info("Threat - Sky Islands"))   | [2.0](info:info("Threat - Sky Islands", "Drizzle"))  | [6.9](info:info("Threat - Sky Islands", "Sprinkle"))  | [10.7](info:info("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](info:info("Threat - Superstructure")) | [2.0](info:info("Threat - Superstructure", "Drizzle"))  | [5.5](info:info("Threat - Superstructure", "Sprinkle"))  | [10.3](info:info("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](info:info("White Lizard"))           | -    | [4.0](info:info("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex")) | [2.0](info:info("Threat - Waterfront Complex", "Drizzle"))  | [7.6](info:info("Threat - Waterfront Complex", "Sprinkle"))  | [10.7](info:info("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](info:info("Kayava"))                 | [3.0](info:info("Kayava", "Drizzle"))  | [5.5](info:info("Kayava", "Sprinkle"))  | [10.4](info:info("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](info:info("Threat - Metropolis"))    | [2.0](info:info("Threat - Metropolis", "Drizzle"))  | [6.6](info:info("Threat - Metropolis", "Sprinkle"))  | [11.6(11.5)](info:info("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](info:info("Sheer Ice Torrent"))      | [2.0](info:info("Sheer Ice Torrent", "Drizzle"))  | [7.8](info:info("Sheer Ice Torrent", "Sprinkle"))  | [11.1](info:info("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](info:info("大月墜落狂想")) | [2.0](info:info("大月墜落狂想", "Drizzle"))  | [8.0](info:info("大月墜落狂想", "Sprinkle"))  | [12.4(12.2)](info:info("大月墜落狂想", "Cloudburst")) | -    |

---

## 联动 - Notanote

| 标题              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [烁雨](info:info("烁雨"))             | [2.0](info:info("烁雨", "Drizzle"))  | [7.0](info:info("烁雨", "Sprinkle"))  | [9.4](info:info("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](info:info("cybernetic blazar")) | [4.0](info:info("cybernetic blazar", "Drizzle"))  | [7.8](info:info("cybernetic blazar", "Sprinkle"))  | [10.2](info:info("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](info:info("Innocent white"))    | [2.0](info:info("Innocent white", "Drizzle"))  | [8.2](info:info("Innocent white", "Sprinkle"))  | [12.1](info:info("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](info:info("Elsorhg"))           | [2.0](info:info("Elsorhg", "Drizzle"))  | [7.5](info:info("Elsorhg", "Sprinkle"))  | [10.9](info:info("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](info:info("Meltovt Necrosys"))  | [2.0](info:info("Meltovt Necrosys", "Drizzle"))  | [7.8](info:info("Meltovt Necrosys", "Sprinkle"))  | [12.0(11.9)](info:info("Meltovt Necrosys", "Cloudburst"))  | -    |

---

## 联动 - Electrode Core

| 标题              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [はんてん](info:info("はんてん"))             | [2.0](info:info("はんてん", "Drizzle"))  | [6.1](info:info("はんてん", "Sprinkle"))  | [10.1](info:info("はんてん", "Cloudburst"))  | -    |
| [Curse of 14](info:info("Curse of 14"))           | [3.0](info:info("Curse of 14", "Drizzle"))  | [7.5](info:info("Curse of 14", "Sprinkle"))  | [10.4](info:info("Curse of 14", "Cloudburst"))  | -    |
| [Virtual S0da](info:info("Virtual S0da"))           | [3.0](info:info("Virtual S0da", "Drizzle"))  | [6.7](info:info("Virtual S0da", "Sprinkle"))  | [10.6](info:info("Virtual S0da", "Cloudburst"))  | -    |
| [apOapSis(Edit)](info:info("apOapSisEdit"))           | [3.5](info:info("apOapSisEdit", "Drizzle"))  | [6.4](info:info("apOapSisEdit", "Sprinkle"))  | [10.6](info:info("apOapSisEdit", "Cloudburst"))  | -    |

---

## 单曲 - 梦境磁带

| 标题                         | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai"))    | [3.5](info:info("ネオン色のまち feat. Mai", "Drizzle"))  | [8.0](info:info("ネオン色のまち feat. Mai", "Sprinkle"))  | [9.7](info:info("ネオン色のまち feat. Mai", "Cloudburst"))  | -    | - |
| [INFP.mp3](info:info("INFP.mp3"))                    | [2.0](info:info("INFP.mp3", "Drizzle"))  | [5.5](info:info("INFP.mp3", "Sprinkle"))  | [9.2](info:info("INFP.mp3", "Cloudburst"))  | -    | - |
| [Oniichan](info:info("Oniichan"))                    | [3.0](info:info("Oniichan", "Drizzle"))  | [8.0](info:info("Oniichan", "Sprinkle"))  | [9.8](info:info("Oniichan", "Cloudburst"))  | -    | - |
| [Moving On](info:info("Moving On"))     | [2.0](info:info("Moving On", "Drizzle"))  | [6.3](info:info("Moving On", "Sprinkle"))  | [10.8](info:info("Moving On", "Cloudburst")) | -    |
| [Oiiaioooooiai](info:info("Oiiaioooooiai"))               | -    | -    | -    | - | [🐈](info:info("Oiiaioooooiai", "Special")) |
| [WATER](info:info("WATER"))                       | [3.0](info:info("WATER", "Drizzle"))  | [7.3](info:info("WATER", "Sprinkle"))  | [10.6](info:info("WATER", "Cloudburst")) | -    | - |
| [Hikari](info:info("Hikari"))                      | [3.0](info:info("Hikari", "Drizzle"))  | [7.4](info:info("Hikari", "Sprinkle"))  | [10.7](info:info("Hikari", "Cloudburst")) | -    | - |
| [Moonflutter](info:info("Moonflutter"))                 | [3.0](info:info("Moonflutter", "Drizzle"))  | [7.9](info:info("Moonflutter", "Sprinkle"))  | [11.4](info:info("Moonflutter", "Cloudburst")) | [11.7](info:info("Moonflutter", "Clear")) | - |
| [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit"))              | [3.0](info:info("Fly To Meteor Milthm Edit", "Drizzle"))  | [6.5](info:info("Fly To Meteor Milthm Edit", "Sprinkle"))  | [10.5](info:info("Fly To Meteor Milthm Edit", "Cloudburst")) | - | - |
| [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit"))              | - | - | - | [11.7](info:info("Fly To Meteor feat.兔柒 Milthm Edit", "Clear")) | - |
| [樱落繁花](info:info("樱落繁花"))                    | [3.0](info:info("樱落繁花", "Drizzle"))  | [8.8](info:info("樱落繁花", "Sprinkle"))  | [10.9](info:info("樱落繁花", "Cloudburst")) | -    | - |
| [Agnostic](info:info("Agnostic"))                    | [3.0](info:info("Agnostic", "Drizzle"))  | [7.4](info:info("Agnostic", "Sprinkle"))  | [10.0](info:info("Agnostic", "Cloudburst")) | -    | - |
| [Dogbite](info:info("Dogbite"))                     | [3.0](info:info("Dogbite", "Drizzle"))  | [7.6](info:info("Dogbite", "Sprinkle"))  | [10.3](info:info("Dogbite", "Cloudburst")) | - | [🐕](info:info("Dogbite", "Special")) |
| [Psyched Fevereiro](info:info("Psyched Fevereiro"))           | [3.5](info:info("Psyched Fevereiro", "Drizzle"))  | [7.3](info:info("Psyched Fevereiro", "Sprinkle"))  | [10.0](info:info("Psyched Fevereiro", "Cloudburst")) | -    | - |
| [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit"))  | [3.0](info:info("Future Unbound Game Edit","Drizzle"))  | [7.5](info:info("Future Unbound Game Edit","Sprinkle"))  | [10.5](info:info("Future Unbound Game Edit","Cloudburst")) | -    | - |
| [Algebra](info:info("Algebra"))                     | [2.0](info:info("Algebra", "Drizzle"))  | [8.1](info:info("Algebra", "Sprinkle"))  | [11.4](info:info("Algebra", "Cloudburst")) | - | [🔢](info:info("Algebra", "Special")) |
| [Words](info:info("Words"))                       | [2.0](info:info("Words", "Drizzle"))  | [6.5](info:info("Words", "Sprinkle"))  | [9.3](info:info("Words", "Cloudburst"))  | -    | - |
| [仮想明日](info:info("仮想明日"))                    | [3.5](info:info("仮想明日", "Drizzle"))  | [6.7](info:info("仮想明日", "Sprinkle"))  | [10.0](info:info("仮想明日", "Cloudburst"))  | -    | - |
| [白虎蓮華](info:info("白虎蓮華"))                    | [3.0](info:info("白虎蓮華", "Drizzle"))  | [6.5](info:info("白虎蓮華", "Sprinkle"))  | [9.6](info:info("白虎蓮華", "Cloudburst"))  | -    | - |
| [サイクルの欠片](info:info("サイクルの欠片"))              | [1.0](info:info("サイクルの欠片", "Drizzle"))  | [7.8](info:info("サイクルの欠片", "Sprinkle"))  | [8.6](info:info("サイクルの欠片", "Cloudburst"))  | -    | - |
| [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~"))          | [2.0](info:info("参宿四~Betelgeuse~", "Drizzle"))  | [6.4](info:info("参宿四~Betelgeuse~", "Sprinkle"))  | [11.2](info:info("参宿四~Betelgeuse~", "Cloudburst"))  | -    | - |
| [slic.hertz #GdbG](info:info("slic.hertz #GdbG"))            | [3.0](info:info("slic.hertz #GdbG", "Drizzle"))  | [7.6](info:info("slic.hertz #GdbG", "Sprinkle"))  | [11.4](info:info("slic.hertz #GdbG", "Cloudburst"))  | -    | - |
| [Rainbow Flavor!](info:info("Rainbow Flavor!"))             | [1.0](info:info("Rainbow Flavor!", "Drizzle"))  | [7.5](info:info("Rainbow Flavor!", "Sprinkle"))  | [9.9](info:info("Rainbow Flavor!", "Cloudburst")) | - | [🍬](info:info("Rainbow Flavor!", "Special")) |
| [IN](info:info("IN"))                           | [2.0](info:info("IN", "Drizzle"))  | [7.9](info:info("IN", "Sprinkle"))  | [11.2](info:info("IN", "Cloudburst")) | -    | - |
| [驟雨の狭間](info:info("驟雨の狭間"))                  | -    | -    | [Ø](info:info("驟雨の狭間", "Cloudburst"))    | - | - |
| [Broken Conviction](info:info("Broken Conviction"))           | [4.5](info:info("Broken Conviction", "Drizzle"))  | [4.5](info:info("Broken Conviction", "Sprinkle"))  | [11.5](info:info("Broken Conviction", "Cloudburst")) | [11.9](info:info("Broken Conviction", "Clear")) | - |
| [选择你的宽带](info:info("选择你的宽带")) | - | - | - | - | [🛜](info:info("选择你的宽带", "Special")) |

---

## 单曲 - 露晓卉庭

| 标题                         | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER")) | [3.0](info:info("FULi AUTO SHOOTER", "Drizzle"))  | [7.2](info:info("FULi AUTO SHOOTER", "Sprinkle"))  | [10.7](info:info("FULi AUTO SHOOTER", "Cloudburst"))  | -    | - |
| [cafe in 6412I731V](info:info("cafe in 6412I731V"))                    | [2.0](info:info("cafe in 6412I731V", "Drizzle"))  | [7.1](info:info("cafe in 6412I731V", "Sprinkle"))  | [11.3](info:info("cafe in 6412I731V", "Cloudburst"))  | -    | - |
| [KASANE](info:info("KASANE")) | [3.0](info:info("KASANE", "Drizzle"))  | [7.8](info:info("KASANE", "Sprinkle"))  | [11.6](info:info("KASANE", "Cloudburst"))  | -    | - |
| [KAEDE](info:info("KAEDE")) | -  | -  | -  | - | [🍁](info:info("KAEDE", "Special")) |
| [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars"))           | [2.0](info:info("Fantasia Sonata Stars", "Drizzle"))  | [6.8](info:info("Fantasia Sonata Stars", "Sprinkle"))  | [10.4](info:info("Fantasia Sonata Stars", "Cloudburst")) | -    | - |
| [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance"))           | [3.0](info:info("Fantasia Sonata God Dance", "Drizzle"))  | [6.9](info:info("Fantasia Sonata God Dance", "Sprinkle"))  | [11.3](info:info("Fantasia Sonata God Dance", "Cloudburst")) | -    | - |
| [ホシフルヨルニ](info:info("ホシフルヨルニ"))           | [2.0](info:info("ホシフルヨルニ", "Drizzle"))  | [4.0](info:info("ホシフルヨルニ", "Sprinkle"))  | [9.4](info:info("ホシフルヨルニ", "Cloudburst")) | -    | - |
| [GlassyHeart.](info:info("GlassyHeart."))           | [3.0](info:info("GlassyHeart.", "Drizzle"))  | [7.7](info:info("GlassyHeart.", "Sprinkle"))  | [11.1](info:info("GlassyHeart.", "Cloudburst")) | -    | - |
| [Chartreuse Green](info:info("Chartreuse Green"))           | [2.0](info:info("Chartreuse Green", "Drizzle"))  | [7.7](info:info("Chartreuse Green", "Sprinkle"))  | [10.3](info:info("Chartreuse Green", "Cloudburst")) | -    | - |
| [Aleph-0](info:info("Aleph-0"))           | [2.0](info:info("Aleph-0", "Drizzle"))  | [5.5](info:info("Aleph-0", "Sprinkle"))  | [11.1](info:info("Aleph-0", "Cloudburst")) | -    | - |
| [Garden](info:info("Garden"))          | [2.0](info:info("Garden", "Drizzle"))  | [7.3](info:info("Garden", "Sprinkle"))  | [9.8](info:info("Garden", "Cloudburst")) | - |
| [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden"))          | [2.0](info:info("Fantasia Sonata Botanical Garden", "Drizzle"))  | [6.1](info:info("Fantasia Sonata Botanical Garden", "Sprinkle"))  | [10.0](info:info("Fantasia Sonata Botanical Garden", "Cloudburst")) | - |
| [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!"))          | [2.0](info:info("Dum! Dum!! Dum!!!", "Drizzle"))  | [7.1](info:info("Dum! Dum!! Dum!!!", "Sprinkle"))  | [10.5](info:info("Dum! Dum!! Dum!!!", "Cloudburst")) | - |
| [Splash the Beat!!](info:info("Splash the Beat!!"))          | [1.0](info:info("Splash the Beat!!", "Drizzle"))  | [7.2](info:info("Splash the Beat!!", "Sprinkle"))  | [12.1](info:info("Splash the Beat!!", "Cloudburst")) | - |


---

---

## 谱师统计

<div style="font-size:10px;">

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")) , [Brightened Demonios](info:info("Brightened Demonios","Drizzle")) , [Broken Conviction](info:info("Broken Conviction","Drizzle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")) , [Curse of 14](info:info("Curse of 14","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fragment of Memories](info:info("Fragment of Memories","Drizzle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")) , [IN](info:info("IN","Drizzle")) , [Kayava](info:info("Kayava","Drizzle")) , [Oniichan](info:info("Oniichan","Drizzle")) , [OverRain](info:info("OverRain","Drizzle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) , [はんてん](info:info("はんてん","Drizzle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")) , [Aleph-0](info:info("Aleph-0","Sprinkle")) , [apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")) , [Broken Conviction](info:info("Broken Conviction","Sprinkle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fragment of Memories](info:info("Fragment of Memories","Sprinkle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")) , [Oniichan](info:info("Oniichan","Sprinkle")) , [OverRain](info:info("OverRain","Sprinkle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")) , [仮想明日](info:info("仮想明日","Sprinkle")) , [烁雨](info:info("烁雨","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [はんてん](info:info("はんてん","Sprinkle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Algebra](info:info("Algebra","Cloudburst")) , [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Kayava](info:info("Kayava","Cloudburst")) , [LOUDER!](info:info("LOUDER!","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")) , [Regnaissance](info:info("Regnaissance","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [Words](info:info("Words","Cloudburst")) , [百九十](info:info("百九十","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [暮予星光](info:info("暮予星光","Cloudburst")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")) , [Myth compiler](info:info("Myth compiler","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")) , [Innocent white](info:info("Innocent white","Cloudburst")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [大月墜落狂想](info:info("大月墜落狂想","Cloudburst")) , [烁雨](info:info("烁雨","Cloudburst")) , [樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) | [HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")) , [Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")) , [Elsorhg](info:info("Elsorhg","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")) , [Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")) , [LOUDER!](info:info("LOUDER!","Drizzle")) , [Moonflutter](info:info("Moonflutter","Drizzle")) , [Sakuyahime](info:info("Sakuyahime","Drizzle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [WATER](info:info("WATER","Drizzle")) , [白虎蓮華](info:info("白虎蓮華","Drizzle")) , [大月墜落狂想](info:info("大月墜落狂想","Drizzle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")) , [イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")) , [Brightened Demonios](info:info("Brightened Demonios","Sprinkle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")) , [Jump out?](info:info("Jump out?","Sprinkle")) , [LOUDER!](info:info("LOUDER!","Sprinkle")) , [Sakuyahime](info:info("Sakuyahime","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [White Lizard](info:info("White Lizard","Sprinkle")) , [白虎蓮華](info:info("白虎蓮華","Sprinkle")) , [大月墜落狂想](info:info("大月墜落狂想","Sprinkle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")) , [花月](info:info("花月","Sprinkle")) , [暮予星光](info:info("暮予星光","Sprinkle")) , [时落之雨](info:info("时落之雨","Sprinkle")) , [夜風](info:info("夜風","Sprinkle")) , [樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")) , [Oniichan](info:info("Oniichan","Cloudburst")) , [Sakuyahime](info:info("Sakuyahime","Cloudburst")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")) , [Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")) , [Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")) , [白虎蓮華](info:info("白虎蓮華","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [花月](info:info("花月","Cloudburst")) , [命日](info:info("命日","Cloudburst")) , [时落之雨](info:info("时落之雨","Cloudburst")) , [夜風](info:info("夜風","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")) , [Algebra](info:info("Algebra","Drizzle")) , [Dogbite](info:info("Dogbite","Drizzle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")) , [Garden](info:info("Garden","Drizzle")) , [Hikari](info:info("Hikari","Drizzle")) , [INFP.mp3](info:info("INFP.mp3","Drizzle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [Virtual S0da](info:info("Virtual S0da","Drizzle")) , [粗线条的雨](info:info("粗线条的雨","Drizzle")) , [サイクルの欠片](info:info("サイクルの欠片","Drizzle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")) , [Garden](info:info("Garden","Sprinkle")) , [Hikari](info:info("Hikari","Sprinkle")) , [INFP.mp3](info:info("INFP.mp3","Sprinkle")) , [Innocent white](info:info("Innocent white","Sprinkle")) , [Moonflutter](info:info("Moonflutter","Sprinkle")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")) , [Virtual S0da](info:info("Virtual S0da","Sprinkle")) , [粗线条的雨](info:info("粗线条的雨","Sprinkle")) , [命日](info:info("命日","Sprinkle")) , [サイクルの欠片](info:info("サイクルの欠片","Sprinkle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")) , [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [Garden](info:info("Garden","Cloudburst")) , [INFP.mp3](info:info("INFP.mp3","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [粗线条的雨](info:info("粗线条的雨","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [雨女](info:info("雨女","Cloudburst")) , [サイクルの欠片](info:info("サイクルの欠片","Cloudburst")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
| Milthm Team | [cybernetic blazar](info:info("cybernetic blazar","Drizzle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Drizzle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Drizzle")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Drizzle")) , [花月](info:info("花月","Drizzle")) , [暮予星光](info:info("暮予星光","Drizzle")) , [时落之雨](info:info("时落之雨","Drizzle")) , [夜風](info:info("夜風","Drizzle")) | [Algebra](info:info("Algebra","Sprinkle")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Sprinkle")) | [驟雨の狭間](info:info("驟雨の狭間","Cloudburst")) |  | [Algebra](info:info("Algebra","Special")) , [KAEDE](info:info("KAEDE","Special")) |
| Murty | [Regnaissance](info:info("Regnaissance","Drizzle")) |  |  |  |  |
| SakiA | [☹](info:info("☹","Drizzle")) |  |  |  |  |
| TCSTWTBHY | [Dogbite](info:info("Dogbite","Drizzle")) , [GlassyHeart.](info:info("GlassyHeart.","Drizzle")) , [Innocent white](info:info("Innocent white","Drizzle")) , [Jump out?](info:info("Jump out?","Drizzle")) , [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) , [Words](info:info("Words","Drizzle")) , [☹](info:info("☹","Drizzle")) | [Dogbite](info:info("Dogbite","Sprinkle")) , [GlassyHeart.](info:info("GlassyHeart.","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")) , [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Sprinkle")) , [Words](info:info("Words","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [イコラト](info:info("イコラト","Sprinkle")) | [Jump out?](info:info("Jump out?","Cloudburst")) , [Moving On](info:info("Moving On","Cloudburst")) , [Splash the Beat!!](info:info("Splash the Beat!!","Cloudburst")) | [命日](info:info("命日","Clear")) |  |
| Ursulina | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Drizzle")) |  | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Cloudburst")) , [Virtual S0da](info:info("Virtual S0da","Cloudburst")) |  |  |
| vitamin b |  |  | [IN](info:info("IN","Cloudburst")) , [KASANE](info:info("KASANE","Cloudburst")) |  |  |
| WH_C |  |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| xzadudu179 | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) | [WATER](info:info("WATER","Sprinkle")) | [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Cloudburst")) , [Hikari](info:info("Hikari","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [Moonflutter](info:info("Moonflutter","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) |  |  |
| 阿鱼 | [Moving On](info:info("Moving On","Drizzle")) , [雨之城](info:info("雨之城","Drizzle")) | [雨之城](info:info("雨之城","Sprinkle")) | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| 点缀星空 |  |  | [Curse of 14](info:info("Curse of 14","Cloudburst")) , [Myth compiler](info:info("Myth compiler","Cloudburst")) |  |  |
| 姜片 | [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Drizzle")) |  |  |  |  |
| 泪莫提 |  | [Moving On](info:info("Moving On","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) |  |  |
| 喵卡 |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| 母鸡 | [KASANE](info:info("KASANE","Drizzle")) | [KASANE](info:info("KASANE","Sprinkle")) | [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) |  |  |
| 你申某 | [雨女](info:info("雨女","Drizzle")) |  |  |  |  |
| 爬爬 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) , [Regnaissance](info:info("Regnaissance","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [靈](info:info("靈","Drizzle")) | [Chartreuse Green](info:info("Chartreuse Green","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [靈](info:info("靈","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [雨之城](info:info("雨之城","Cloudburst")) , [☹](info:info("☹","Cloudburst")) , [はんてん](info:info("はんてん","Cloudburst")) | [Contrasty Angeles](info:info("Contrasty Angeles","Clear")) , [Moonflutter](info:info("Moonflutter","Clear")) , [雨女](info:info("雨女","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Oiiaioooooiai](info:info("Oiiaioooooiai","Special")) , [Welcome to Milthm](info:info("Welcome to Milthm","Special")) |
| 树穴猪 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) | [IN](info:info("IN","Sprinkle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) |  |  |
| 王子 |  | [IN](info:info("IN","Sprinkle")) |  |  |  |
| 舞仙翼 |  |  | [Innocent white](info:info("Innocent white","Cloudburst")) |  |  |
| 嘤箱 | [命日](info:info("命日","Drizzle")) |  |  |  |  |
| 余火 | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Drizzle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Sprinkle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Cloudburst")) | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit","Clear")) |  |
| 雨眠 | [百九十](info:info("百九十","Drizzle")) | [百九十](info:info("百九十","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) |  |  |
| 云梦 |  | [cybernetic blazar](info:info("cybernetic blazar","Sprinkle")) , [Kayava](info:info("Kayava","Sprinkle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")) , [雨女](info:info("雨女","Sprinkle")) | [Chartreuse Green](info:info("Chartreuse Green","Cloudburst")) , [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) , [Moonflutter](info:info("Moonflutter","Cloudburst")) , [☹](info:info("☹","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) |  |  |

</div>

---

## Milthm 独占曲列表 v4.0

### 天气预报
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 1 | Welcome to Milthm | TsukiP |
| 2 | Fantasia Sonata Reflection | PYKAMIA |
| 3 | Fantasia Sonata Sky Syndrome | PYKAMIA |

### 雨的声音
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 4 | 雨之城 (Castle in the Rain) | CsLrisEto |
| 5 | イコラト (eclat) | TsukiP |
| 6 | 雨女 (Ameonna) | TsukiP |

### 甜与苦的一体两面
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 7 | Aconsma | ILusMin |
| 8 | OverRain | SharK |
| 9 | Fragment of Memories | U-Ruri |
| 10 | HYPER MEMORIES | Wooden, Salty Salt |
| 11 | Regnaissance | AiSS vs. Abit |
| 12 | Contrasty Angeles | HLxQ.v.M |
| 13 | Brightened Demonios | HLxQ.v.M |
| 14 | Myth compiler | 溝口ゆうま feat. 大瀬良あい |
| 15 | Fantasia Sonata Arcadia | PYKAMIA |

### 花裳随雨得春迟
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 16 | Vestige of Dreams | DRIVE. |
| 17 | 靈 (Rei) | MYTK |

### 梦境磁带
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 18 | INFP.mp3 | TsukiP |
| 19 | Oniichan | MoryueCi |
| 20 | Moving On | Nastram |
| 21 | サイクルの欠片 (Pieces of the Cycle) | TsukiP |
| 22 | Broken Conviction | Cansol |

### 露晓卉庭
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 23 | Garden | NceS & All_Life_X & AiSS |
| 24 | Fantasia Sonata Botanical Garden | PYKAMIA |

### Notanote
| 序号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 25 | 烁雨 (Sparkrain) | ILusMin (Milthm x Notanote Original) |
| 26 | cybernetic blazar | ああああ (Notanote x Milthm Original) |
| 27 | Innocent white | 影虎。 (Notanote x Milthm Original) |

---

## 点击加速Milthm开发进程

点击链接加速 Milthm 开发进程  
1，https://github.com/sponsors/morizerodev/  
2，https://afdian.com/a/morizero

---

## 联系我们

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **Discord**: [mkzi_nya](https://discordapp.com/users/1135097559891853435)

---

### 常见问题

[返回目录](#目录)

- [点击生成图片（或其他元素）没反应](#点击生成图片（或其他元素）没反应)
- [找不到文件在哪或不存在文件夹](#找不到文件在哪或不存在文件夹)
- [怎么备份存档](#怎么备份存档)
- [恢复存档](#恢复存档)
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

#### 没有访问权限

首先确认您的 Milthm 版本。更新到 3.2 以上版本后，需启动一次游戏才能在该路径内生成存档。

- **安卓**

  如果当前使用的是系统文件管理器或第三方文件管理器，您可以尝试使用其他文件管理器访问。  
  推荐使用 [MT 管理器](https://mt2.cn/)，并在应用顶部的地址栏中输入以下路径直接跳转（如果有多个用户，请将 `0` 改为用户 ID 或将 `/storage/emulated/0/` 改为 `/sdcard/`）：
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  也可以通过右上角添加书签，在底部上滑+号进行快速访问。  
  
也可以尝试不使用系统自带文件浏览器，使用原生安卓的`文件`  
`文件`进入方式参考：  
打开MT管理器  
点击`安装包提取`--选择`系统应用`--搜索`文件`--点击`文件`，选择左下角`更多`--启动应用  
可以在进入milthm存档文件夹后选择`复制到`内置存储（/storage/emulated/0/，一般就是`文件`的根目录）后到浏览器中访问  
如果存档出现问题也可以通过类似的方式修复，详见[恢复存档](#恢复存档)  
  
如果还是无法访问，只能通过连接电脑或使用 ADB 权限访问。  
  在较高版本的安卓系统中，可能会出现此问题。若开发者选项中启用了 USB 调试，并且开启了“无线调试”，可以在没有电脑的情况下，使用 [Shizuku](https://shizuku.rikka.app/zh-hans/download/) 进行无线 ADB 调试。更多说明请参见 Shizuku 的相关文档。

- **IOS**

  如果在 `文件` 应用中找不到此 iPhone/iPad 的文件夹，请前往应用主页，在右上角的设置中查看是否隐藏了本地文件。  
  如果仍未找到 Milthm 的文件夹，检查您是否使用了正确的 Milthm 版本。  
  [IOS演示视频](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### 怎么备份存档

进入存档目录，将整个data文件夹复制到其他路径

#### 恢复存档

您可以直接将手动备份的存档覆盖掉原路径的存档文件  
为了防止意外，我们在生成查分图时会将存档以文本形式缝合到图片内(~~可以以文本打开图片直接查看~~)  
~~您可以直接上传查分图来查分~~  
您可以将查分图上传到 [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html) 后，点击下载生成存档文件（不包含剧情进度，是直接复制我自己(mkzi-nya/归梦)的），替换掉原路径的存档  

## 其他内容

[返回目录](#目录)

### Milthm Wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Milthm交流群

记录于25.8.20 10:30  
  
| 群 | 群号 | 人数 |
|-|-|-|
| Milthm#1 交流群 | 372255828 | 1498 |
| Milthm#3 交流群 | 910085472 | 1994 |
| Milthm#5 官方交流群 | 480062123 | 88 |
| Milthm#6 公开测试 | 915230984 | 283 |
| Milthm#7 交流群 | 774927051 | 259 |
| Milthm#8 交流群 | 887231011 | 1957 |
| Milthm#9 开发交流群 | 1047814125 | 23 |
| Milthm#10 交流群 | 454822146 | 356 |
| Milthm#11 交流群 | 1042806409 | 81 |
| Milthm#12 交流群 | 1048470253 | 31 |
| Milthm#14 开发测试 | 1050419460 | 9 |
| Mhtlim#√-1 洨巟羣 | 375882310 | 157 |
| milthm#二创群——暮雨回廊 | 771250001 | 147 |
| 梦见霖音高级中学 高一一部114514班 | 574275806 | 13 |
| Milthm#Φ 交流群 | 678471942 | 40 |
| milthm#神金 交流群 | 877854042 | 67 |
| Milthm及各种🐉🖊交流群 | 981366419 | 54 |

`1`,`3`,`8`群已不对外开放  
`5`,`6`,`9`,`14`群为开发专用  
存在`Milthm#2 交流群da☆ze（梦见霖音高级中学 高一一部2班）`为解散后重建  
`√-1群`,`二创群`为交流群性质  
另有`Rain Editor 公测群`,`MCEMの小群`为玩家制作的制谱器发布群

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

