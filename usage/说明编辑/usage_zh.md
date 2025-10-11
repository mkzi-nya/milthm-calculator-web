
## 目录

- [网站](#网站)
- [查分器使用说明](#使用说明)
  - [上传存档文件](#上传存档文件)
  - [旧版存档路径](#其他存档路径)
  - [在线客服](#在线客服)
- [关于 Milthm](#关于-milthm)
  - [游戏基础功能介绍\(官方wiki\)](https://milthm.com/wiki/hans/manual/features)
  - [Reality 计算公式](#reality-计算公式)
  - [Score V3算法](#score-v3算法)
  - [关于存档文件](#关于存档文件)
  - [音符判定](#音符判定)
  - [结算评级](#结算评级)
  - [完成状态](#完成状态)
  - [露晓卉庭](#露晓卉庭)
  - [绮梦](#sweetdream)
  - [隐藏曲解锁方式](#隐藏曲解锁方式)
  - [定数表](#定数表)
  - [谱师统计](#谱师统计)
  - [Milthm 独占曲列表](#milthm-独占曲列表)
  - [点击加速Milthm开发进程](#点击加速milthm开发进程)
- [联系我们](#联系我们)
- [常见问题](#常见问题)
- [其他内容](#其他内容)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流群](#milthm交流群)
  - [什么是文件路径](#什么是文件路径)
  - [Reality对照表](#reality对照表)

---

{{updata}}

> 如果界面渲染出现问题，请[在 GitHub 上访问](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## 网站

{{web}}

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

{{11}}

  使用 [文件](https://support.apple.com//102570) 应用打开 Milthm 文件夹：

  ```text
  /data/
  ```

  > 如果找不到本地文件：进入“文件”主页右上角的三点菜单，将本地文件取消隐藏（[详见](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）。

- **Windows 用户：**  
  在资源管理器地址栏输入：  
  {{12}}

[安卓演示视频](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[IOS演示视频](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
安卓用户[没有访问权限](#没有访问权限)

---

### 旧版存档路径

若上传后无法解析，可尝试手动提取 JSON 数据并上传：

{{16}}

---

### 在线客服

- [客服A\(中国大陆找TA\)](https://www.deepseek.com/)
- [客服B](https://chatgpt.com/)
问题描述：将你看不懂的地方复制后发给TA即可  

---

## 关于 Milthm

[返回目录](#目录)

### Reality 计算公式

Reality 的计算基于游玩分数和谱面定数：

{{17}}

单曲 Reality 计算公式如下（其中 s 为分数，c 为定数）：

{{realityv3}}

在当前版本下，如果旧版(4.0以前)的分数不高于1005000，且未达到AllPerfect以上的评级，则将同时使用reality v2与v3公式取最高值，如下：  

{{realityv2}}


#### 代码实现：

{{realityjs}}

---

### Score V3算法

[官方文档](https://www.milthm.cn/wiki/hans/blog/2025-08-17)  
代码实现  
{{sv3}}

[score v3网页计算器](https://mkzi-nya.github.io/mil/)  

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
  - 当只存在Exact与Great判定时, 容错最低(Great间间隔超过32Exact)时: 
    当物量达到1480时可存在2Great容错，且每增加740物量容错增加1Great

- 自1610物量起，可以在存在Good判定的情况下达到1000000分
  > 且每增加**约**199物量容错增加1Good
  - 当只存在Exact与Good判定时, 容错最低(Good间间隔超过48Exact)时: 
    每增加1610物量容错增加1Good

- 自2771物量起，可以在存在Bad判定的情况下达到1000000分
  > 且每增加**约**250物量容错增加1Bad

- 自2801物量起，可以在存在Miss判定的情况下达到1000000分
  > 且每增加**约**280物量容错增加1Miss


- 在游玩过程中右上角的实时分数代表的是计算的过程值，如果在某一分数之后的note全部放置(为miss)，分数将急剧下降; 如果最后一个note为miss判定，也会因为补差与ap奖励分的关系使分数大量扣除


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

关于判定系统，可查看官方wiki介绍：[判定系统](https://milthm.com/wiki/hans/manual/judgment/)  
游戏中单个音符的判定共分为五种，分别为：

- **Perfect**：获得 100% 分数及 100% ACC。
- **perfect**：获得 99% 分数及 100% ACC。
- **Great**：获得 60% 分数及 60% ACC。
- **Good**: 获得 30% 分数及 30% ACC。
- **Bad**：Combo 中断，获得 15% 分数及 15% ACC。
- **Miss**：Combo 中断，不获得分数与 ACC。

各区间内的分数与精准度成正比例关系，详细判定范围如下表所示：

{{pdfw}}

---

## 结算评级

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

## 完成状态

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

## 露晓卉庭
关于露晓卉庭，可查看官方wiki：[“露晓卉庭”介绍](https://milthm.com/wiki/hans/blog/2025-09-12)

> 下方文档具有时效性 以实际情况为准  

在这里，可以点击花盆种植作物。  
开启`绮梦`游玩曲目可以收集`露凝`，使用`露凝`浇水可以加速作物成熟。  
每次浇水可以减少20%总时长，冷却25%总时长  
> 故最低只需要等待一半的时长及可收割  

每次收割时有小概率使产量增加100%-300%，浇水可以提高概率  
当前版本拥有如下作物：  

<div style="font-size:10px;">

| 作物 | 类型 | 解锁条件 | 基础收成 | 时间 | 耗材 |
|-|-|-|-|-|-|
| 双孢蘑菇 | 蘑菇/食物 | 无 | 8 | 1h | 无 |
| 水蕨菜 | 食物 | 3级 | 45 | 6h | 蘑菇*5 |
| 勿忘草 | 装饰 | 4级 | 7 | 12h | 无 |
| 水晶兰 | 装饰 | 6级 | 20 | 1d8h | 装饰\*5 |
| 蓝莓 | 食物 | 8级 | 300 | 4d | 装饰\*5 |
| 草菇 | 蘑菇/食物 | 10级 | 18 | 1h | 蘑菇\*5 |

</div>

### 净收益

净收益计算方式为`基础收成/(时间+耗材成本)`  
当以`双孢蘑菇`与`勿忘草`为`蘑菇`类和`装饰`类的耗材成本时，净收益如下  
<div style="font-size:10px;">

| 作物 |净收益 |
|-|-|
| 双孢蘑菇 | 8/h |
| 水蕨菜 | 6.8/h |
| 勿忘草 | 0.58/h |
| 水晶兰 | 0.57/h |
| 蓝莓 | 3.03/h |
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
| 10 | 装饰\*35 | 食物\*725,装饰\*55 |

</div>

可以使用作物兑换部分单曲  
当前版本单曲所需耗材：

| 花盆 | 耗材 |
|-|-|
| 2号 | 蘑菇\*5 |
| 3号 | 食物\*80, 装饰\*20 |


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
在不考虑产量概率增加的情况下最低(及时浇水)需要`28`小时  
当前版本将等级升至10级，需`47.5`小时  
当前版本全解锁至少需 `蘑菇`\*15,`装饰`\*95,`食物`\*1165  
至少需`118`小时



---

## 绮梦 <a id="sweetdream"></a>
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
  
  
- **靈**
- 在`绮梦`玩法下，使用**浅仪洸花**游玩`Sakuyahime`及可解锁

---

## 定数表

[返回目录](#目录)

{{vhjp-zh}}

---

## 说明

> - 所有 `SP` 和非常规谱面均不参与 Reality 计算。  

当前版本的理论 Reality 为 `13.475`（显示为 13.48）  
当前版本定数最高的 20 首曲目如下：

{{vhjp-zh1}}

---

## 谱师统计

<div style="font-size:10px;">

{{charter}}

</div>

---

## Milthm 独占曲列表

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

{{lx-wm}}

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

{{wiki}}

### Milthm交流群

{{qy}}

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

## Reality对照表
<div>
  <label for="constantInput">输入定数:</label>
  <input id="constantInput" type="number" step="0.01" placeholder="请输入数字" oninput="updateOutput()" />
  
  <pre><code id="output"></code></pre>
</div>
