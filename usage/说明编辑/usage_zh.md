
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
  - [关于查分图中的Ytilaer](关于查分图中的ytilaer)
  - [关于存档文件](#关于存档文件)
  - [音符判定](#音符判定)
  - [结算评级](#结算评级)
  - [完成状态](#完成状态)
  - [愚人节](#愚人节)
  - [隐藏曲解锁方式](#隐藏曲解锁方式)
  - [定数表](#定数表)
  - [谱师统计](#谱师统计)
  - [点击加速Milthm开发进程](#点击加速milthm开发进程)
- [联系我们](#联系我们)
- [常见问题](#常见问题)
- [其他内容](#其他内容)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流群](#milthm交流群)
  - [什么是文件路径](#什么是文件路径)
  - [Reality 对照表](#reality-对照表)

---

{{updata}}

> 如果界面渲染出现问题，请[在 GitHub 上访问](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## 网站

{{网站}}

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

### 输入已解析的数据

在主页的输入框中输入数据，格式如下：

{{13}}

其中：
- `acc` 为小数表示准确度；
- `level` 代表评级，其定义如下：

{{14}}

---

### 旧版本存档

`Milthm 3.2` 之前的存档在移动端无法直接提取，可尝试以下方法：

{{15}}

---

### 其他存档路径

若上传后无法解析，可尝试手动提取 JSON 数据并上传：

{{16}}

---

## 雷达图

相关计算方式由 `PanyiAme` 提供，详见 [Milthm 查分表说明](https://wwp.lanzoup.com/iZ59A2j8nbpe)。

---

## 关于 Milthm

[返回目录](#目录)

### Reality 计算公式

Reality 的计算基于游玩分数和谱面定数：

{{17}}

单曲 Reality 计算公式如下（其中 s 为分数，c 为定数）：

{{reality公式}}

[Reality 对照表](#reality-对照表)

#### 代码实现：

{{公式js}}

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

{{判定范围}}

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

{{章节zh}}

---

## 说明

> - 所有 `SP` 和非常规谱面均不参与 Reality 计算。  
> - 因精度原因，当前版本所有定数为 11.9 的曲目定数均低于 11.9。例如，若某版本的理论 Reality 为 `13.005`，在游戏内将显示为 `13.00` 而非 `13.01`，实际计算为 `13.004999…`。

当前版本的理论 Reality 为 `12.725`（显示为 12.72）  
当前版本定数最高的 20 首曲目如下：

{{章节zh1}}

---

## 谱师统计

<div style="font-size:10px;">

{{charter}}

</div>

---

## 点击加速Milthm开发进程

点击链接加速 Milthm 开发进程  
1，https://github.com/sponsors/morizerodev/  
2，https://afdian.com/a/morizero

---

## 联系我们

{{联系我们}}

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

{{群}}

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

{{reality表}}

