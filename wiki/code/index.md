
# 目录

- 游戏机制
  - [游戏基础功能介绍(官方wiki)](https://milthm.com/wiki/hans/manual/features)
  - 算法
    - [Reality 计算公式](#reality-calculation)
    - [Score V3算法](#score-v3-algorithm)
    - [音符判定](#note-judgement)
    - [结算评级](#result-grading)
    - [完成状态](#completion-status)
  - 机制
    - [绮梦](#sweet-dream)
    - [露晓卉庭(花园)](#garden)
    - [隐藏曲解锁方式](#hidden-song-unlock)
- 列表条目
  - [曲目信息](./song/)
  - [定数表](./table.html)
  - [曲师统计](./artist-statistics.html)
  - [谱师统计](./charter-statistics.html)
  - [Milthm 独占曲列表](./original-songs.html)
  - [Reality对照表](./reality-table.html)
- 其他内容
  - [Milthm相关网站](#milthm-related-sites)
  - [Milthm玩家交流群](#milthm-community)
  - [关于存档文件](#save-file-info)
  - [点击加速Milthm开发进程](#support-milthm-development)
- [联系我们](#contact-us)

---

### 游戏机制

---

### Reality 计算公式 <a id="reality-calculation"></a>

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

在当前版本下，如果旧版(4.0以前)的分数不高于1005000，且未达到AllPerfect以上的评级，则将同时使用reality v2与v3公式(旧版用旧版分，新版用新版分)取最高值，如下：  

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

### Score V3算法 <a id="score-v3-algorithm"></a>

[官方文档](https://www.milthm.cn/wiki/hans/blog/2025-08-17)  
[score v3网页计算器](https://mkzi-nya.github.io/mil/)  
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


#### 数学性质
根据文档，不难发现该算法有以下几个数学性质： 
- 在存在多个Exact及Perfect以下的判定时，判定间距离最近时，扣分最小  
- 当判定全部为Perfect时，分数恰为1000000  
- 当未达成AllPerfect判定时，分数最高不达到1005000  
- 当达成AllPerfect判定时，(Score mod 10^6)/10^4就是这个判定序列的Exact判定占比，俗称"大P率"  
- 当其他所有判定都为Exact判定时：  
  - 无论打出多少Perfect判定，在数量相同的情况下不同位置打出的分数始终相同
  - 在出现单个Great/Good判定，或多个Great/Good间的`间隔`(通过物量决定)够大时，在数量相同的情况下不同位置打出的分数始终相同  
  > 上述特性为`补差`算法导致的  

- Bad/Miss判定在序列开头和结尾扣除的分数最少
- 自490物量起, 可以在存在Great判定的情况下达到1000000分
  > 当物量达到860时容错增至2Great, 自860起每增加**约**120物量容错增加1Great;  
> - 当只存在Exact与Great判定, 最低容错(Great间间隔超过32Exact):   
>   当物量达到1480时可存在2Great容错，且每增加740物量容错增加1Great

- 自1610物量起，可以在存在Good判定的情况下达到1000000分
  > 且每增加**约**199物量容错增加1Good
> - 当只存在Exact与Good判定, 最低容错(Good间间隔超过48Exact):   
>   每增加1610物量容错增加1Good

- 自2771物量起，可以在存在Bad判定的情况下达到1000000分
  > 且每增加**约**250物量容错增加1Bad

- 自2801物量起，可以在存在Miss判定的情况下达到1000000分
  > 且每增加**约**280物量容错增加1Miss


- 在游玩过程中右上角的实时分数代表的是计算的过程值，如果在某一分数之后的note全部放置(为miss)，分数将急剧下降; 如果最后一个note为miss判定，也会因为补差与ap奖励分的关系使分数大量扣除


---



### 音符判定 <a id="note-judgement"></a>

关于判定系统，可查看官方wiki介绍：[判定系统](https://milthm.com/wiki/hans/manual/judgment/)  
游戏中单个音符的判定共分为五种，分别为：

- **Perfect**：获得 100% 分数及 100% ACC。
- **perfect**：获得 99% 分数及 100% ACC。
- **Great**：获得 60% 分数及 60% ACC。
- **Good**: 获得 30% 分数及 30% ACC。
- **Bad**：Combo 中断，获得 15% 分数及 15% ACC。
- **Miss**：Combo 中断，不获得分数与 ACC。

各区间内的分数与精准度成正比例关系，详细判定范围如下表所示：

| Perfect | perfect | Great | Good | Bad | Miss |
|-|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-105ms | ±105-140 | ±140-155ms | >155ms |

---

### 结算评级 <a id="result-grading"></a>

结算评级分为八种：  
未达成FC(全连)时为白色,FC为蓝色,AP为紫色  
当前版本无法获得Milthm以下评级的AP图标  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">：旧版显示为<img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">，达成理论值 1010000 分（RHYTHM of RAIN，所有音符均为满分）。
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M,即Milthm，分数达到1000000时获得；
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">：分数达到925000时获得；
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">：分数达到850000时获得；
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">：分数达到750000时获得；
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">：分数达到700000时获得；
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">：分数小于700000时获得，未通关，没有FC/AP图标。

---

### 完成状态 <a id="completion-status"></a>

游玩结束后在谱面中展示的评价包括：

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC > 80%，且至少存在一个 Bad/Miss 判定。
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±140ms 内击中，且至少存在一个 Great/Good 判定。
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±70ms 内击中，且至少存在一个 small perfect 判定。
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:  
  - 所有音符均在 ±35ms 内击中，即理论值。
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:  
  - 使用 AutoPlay 通关。
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:  
  - 分数大于 1010000（使用倾盆大雨）。

---

### 绮梦 <a id="sweet-dream"></a>

关于绮梦玩法介绍，可查看官方wiki：[梦境涟漪“绮梦”介绍](https://milthm.com/wiki/hans/blog/2025-08-23)  
  
在开启「绮梦」玩法后在游戏中将出现「梦境纯净度」收集条。  
「梦境纯净度」收集条的机制如下(Great归为Good)：  
| 难度 | Good及以下判定掉血倍率 | 回血倍率 | Good保护阈值 |
|-|-|-|-|
| Drizzle | 30% | 500% | 90 |
| Sprinkle | 60% | 300% | 80 |
| Cloudburst | 100% | 100% | 60 |
| Clear | 110% | 80% | 50 |
| 其他 | 100% | 100% | 60 |

> 洸花只提升血条上限而不提升保护阈值

| 连击数 | 连击回血加成 |
|-|-|
| 0~3 | 0 |
| 4~7 | 100% |
| 8~11 | 200% |
| 12~15 | 300% |
| >16 | 400% |


Ex 音符与 Drag 音符的固定恢复量仅为其他音符的 30%，且“连击回血加成”效果对它们无效。
单个音符的基础回血值为 0.1。
Good 判定的基础扣血量为 12.0，Bad 与 Miss 的基础扣血量为 8.0。

当当前连击数 > 16 时：

* **Cloudburst 命中单个 Tap 或 Hold 音符并获得 Perfect 判定：**
  最终恢复 = 0.1 × 400% × 100% × 角色 Buff（此处假设无 Buff） = 0.4

* **Cloudburst 命中单个 Ex 或 Drag 音符：**
  最终恢复 = 0.1 × 30% = 0.03

* **Drizzle 命中单个 Tap 或 Hold 音符并获得 Perfect 判定：**
  最终恢复 = 0.1 × 400% × 500% × 角色 Buff（此处假设无 Buff） = 2.0

* **Drizzle 命中单个 Ex 或 Drag 音符：**
  最终恢复 = 0.1 × 30% × 500% = 0.15

当 Drizzle 出现失误时：

* **单个音符出现 Good 判定：**
  最终损失 = 12.0 × 30% × 角色 Buff（此处假设无 Buff） = 3.6

* **单个音符出现 Bad 或 Miss 判定：**
  最终损失 = 8.0 × 30% × 角色 Buff（此处假设无 Buff） = 2.4

此外，当因 Good 判定导致的扣血会使血量低于保护阈值时，只会扣至保护阈值为止。
例如，在 Drizzle 难度下，当前血量为 91 时出现 Good 判定，最终只会损失 1.0 血量，而非 3.6。

---

### 露晓卉庭 <a id="garden"></a>

关于露晓卉庭，可查看官方wiki：[“露晓卉庭”介绍](https://milthm.com/wiki/hans/blog/2025-09-12)

> 下方文档具有时效性 以实际情况为准  

在这里，可以点击花盆种植作物。  
开启`绮梦`游玩曲目可以收集`露凝`，使用`露凝`浇水可以加速作物成熟。  
每次浇水可以减少20%总时长，冷却25%总时长  
> 故最低只需要等待一半的时长即可收割  

每次收割时有小概率使产量增加100%-300%，浇水可以提高概率  
当前版本拥有如下作物：  

<div style="font-size:10px;">

| 作物 | 类型 | 解锁条件 | 基础收成 | 时间 | 耗材 |
|-|-|-|-|-|-|
| 双孢蘑菇 | 菌菇/食物 | 无 | 8 | 1h | 无 |
| 水蕨菜 | 食物 | 3级 | 45 | 6h | 菌菇*5 |
| 勿忘草 | 观赏 | 4级 | 7 | 12h | 无 |
| 水晶兰 | 观赏 | 6级 | 20 | 1d8h | 观赏\*5 |
| 蓝莓 | 食物 | 8级 | 300 | 4d | 观赏\*5 |
| 草菇 | 菌菇/食物 | 10级 | 18 | 1h | 菌菇\*5 |
| 卡宴辣椒 | 功能 | 11级 | 3 | 6h | 食物\*10 |
| 大柱霉草 | 观赏 | 13级 | 23 | 1d8h | 功能\*3 |
| 铃兰 | 观赏 | 15级 | 10 | 12h | 功能\*1 |
| 草莓 | 食物 | 17级 | 400 | 4d | 功能\*3 |
| 香菇 | 菌菇/食物 | 19级 | 45 | 1h | 食物\*30 |
| 毛头鬼伞 | 菌菇/食物 | - | - | - | - |

</div>

#### 净收益

净收益计算方式为`基础收成/(时间+耗材成本)`  
最高收益是结合所有现有作物作为耗材理论最高收益  
当以`双孢蘑菇`与`勿忘草`为`菌菇`类和`观赏`类的耗材成本时，净收益如下  
<div style="font-size:10px;">

| 作物 | 净收益 | 最高收益 |
|-|-|-|
| 双孢蘑菇 | 8/h | 8/h |
| 水蕨菜 | 6.8/h | 7.1/h |
| 勿忘草 | 0.58/h | 0.58/h |
| 水晶兰 | 0.49/h | 0.51/h |
| 蓝莓 | 3.03/h | 3.11/h |
| 草菇 | 11.08/h | 13.5/h |
| 卡宴辣椒 | 0.42/h | 0.45/h |
| 大柱霉草 | 0.59/h | 0.59/h |
| 铃兰 | 0.69/h | 0.69/h |
| 草莓 | 3.87/h | 3.87/h |
| 香菇 | 9.47/h | 15/h |

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
| 7 | 观赏\*5 | 食物\*375,观赏\*5 |
| 8 | 观赏\*20 | 食物\*375,观赏\*20 |
| 9 | 食物\*350 | 食物\*725,观赏\*20 |
| 10 | 观赏\*35 | 食物\*725,观赏\*55 |
| 11 | 食物\*300,观赏\*10 | 食物\*1025,观赏\*65 |
| 12 | 食物\*400,观赏\*10 | 食物\*1425,观赏\*75 |
| 13 | 食物\*500,观赏\*20 | 食物\*1925,观赏\*95 |
| 14 | 食物\*600,观赏\*20 | 食物\*2525,观赏\*115 |
| 15 | 观赏\*100 | 食物\*2525,观赏\*215 |
| 16 | 食物\*800 | 食物\*3325,观赏\*215 |
| 17 | 食物\*800 | 食物\*4125,观赏\*215 |
| 18 | 观赏\*80 | 食物\*4125,观赏\*295 |
| 19 | 食物\*800,观赏\*30 | 食物\*4925,观赏\*325 |
| 20 | 食物\*1200 | 食物\*6125,观赏\*325 |

</div>

可以使用作物兑换部分单曲  
当前版本单曲所需耗材：

| 花盆 | 耗材 |
|-|-|
| 2号 | 菌菇\*5 |
| 3号 | 食物\*80, 观赏\*20 |
| 4号 | 功能\*40 |

<div style="font-size:10px;">

| 曲目 | 耗材 |
|-|-|
| Garden | 菌菇\*10 |
| Fantasia Sonata Botanical Garden | 观赏\*20 |
| Dum! Dum!! Dum!!! | 食物\*60 |
| Splash the Beat!! | 食物\*300 |
| Sound of Nature | 菌菇\*30,观赏\*80 |
| conflict | 菌菇\*20,观赏\*25 |

</div>

> 注：以下统计未更新

共计：`菌菇`\*10,`观赏`\*20,`食物`\*360  
当前版本解锁所有曲目至少需 `菌菇`\*10,`观赏`\*20,`食物`\*485  
在不考虑产量概率增加的情况下最低(及时浇水)需要`28`小时  
当前版本将等级升至10级，需`47.5`小时  
当前版本全解锁至少需 `菌菇`\*15,`观赏`\*95,`食物`\*1165  
至少需`118`小时

---


### 隐藏曲解锁方式 <a id="hidden-song-unlock"></a>

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
  游玩Dogbite CB难度并获得A以上等级
  满足第一点后，游玩Oiiaioooooiai，并在音符变成猫时保持全连（此前的音符可打可不打），此时每击中一个音符就会发出狗的叫声
  满足第二点后，会触发异象，之后进入Dogbite SP谱面，即成功解锁（无需通关）
  
  > 注: 可通过开启`倾盆大雨`异象来降低解锁难度
  
  
- **靈**
  在`绮梦`玩法下，使用**浅仪洸花**游玩`Sakuyahime`及可解锁

---

### Milthm相关网站 <a id="milthm-related-sites"></a>

#### Milthm Wiki

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**
- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**
- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**
- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**
- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

---

#### Milthm查分器

- [k9.lv/c/](htt://k9.lv/c/)
- [mhtlim.top](https://mhtlim.top/)
- [mhtl.im](https://mhtl.im)
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/)
> 以上网站皆可使用

---

- [游戏剧情及二创文章](https://mkzi-nya.github.io/story/)
- [score v3网页计算器](https://mkzi-nya.github.io/mil/)  

  


### Milthm交流群 <a id="milthm-community"></a>

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
| Milthm#12 备用群 | 1048470253 | 31 |
| Milthm#14 开发测试 | 1050419460 | 9 |
| Milthm#15 交流群 | 569460611 | 15 |
| Mhtlim#√-1 洨巟羣 | 375882310 | 157 |
| milthm#二创群——雨月梦华 | 771250001 | 147 |
| 梦见霖音高级中学 高一一部114514班 | 574275806 | 13 |
| Milthm#Φ 交流群 | 678471942 | 40 |
| milthm#神金 交流群 | 877854042 | 67 |
| Milthm及各种🐉🖊交流群 | 981366419 | 54 |

`1`,`3`群已不对外开放  
`5`,`6`,`9`,`14`群为开发专用  
存在`Milthm#2 交流群da☆ze（梦见霖音高级中学 高一一部2班）`为解散后重建  
另有`Rain Editor 公测群`,`RCEの小群`为玩家制作的制谱器发布群

---

### 关于存档文件 <a id="save-file-info"></a>


在以下部分中，路径将被简写为 `MilthmDataDirectory`。

#### 游戏存档  
该文件位于 `MilthmDataDirectory/saves.db`。

其中包含与玩家游戏进度及相关游戏记录相关的数据。 

数据在kv表中以json格式存储（json格式与旧版本的存档数据格式一致）

#### 数据存档  
该文件位于 `MilthmDataDirectory/data.db`。

它用于存储每一次成功提交的分数数据。

该文件中的数据是本地排行榜的数据来源。


---

### 点击加速Milthm开发进程 <a id="support-milthm-development"></a>

点击链接加速 Milthm 开发进程  
1，https://github.com/sponsors/morizerodev/  
2，https://afdian.com/a/morizero

---

## 联系我们 <a id="contact-us"></a>

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **Discord**: [mkzi_nya](https://discordapp.com/users/1135097559891853435)
