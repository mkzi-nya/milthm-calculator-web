## 目录
- [网站](#网站)
- [使用说明](#使用说明)
  - [上传存档文件](#上传存档文件)
  - [输入已解析的数据](#输入已解析的数据)
  - [旧版本存档](#旧版本存档)
  - [其他存档路径](#其他存档路径)
  - [雷达图](#雷达图)
- [关于Milthm](#关于milthm)
  - [Reality 计算公式](#reality-计算公式)
  - [音符判定](#音符判定)
  - [结算评级](#结算评级)
  - [完成状态](#完成状态)
  - [定数表](#定数表)
- [联系我们](#联系我们)

---
## 网站
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## 使用说明

### 上传存档文件

点击主页中的 **「上传文件」** 选项，选中存档文件`saves.db`或推分记录文件`data.db`上传即可。

> **注意**：
> - `data.db` 只包含 `3.2` 更新后的游玩记录（如果没有丢失）。
> - 安卓端推荐使用 [MT 管理器](https://mt2.cn/) 访问 `sdcard/Android/data` 目录。

#### **文件路径（详见 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  使用 [文件](https://support.apple.com/zh-cn/102570) 应用打开 Milthm 文件夹：
  ```text
  /data/
  ```
- **Windows**
  资源管理器地址栏输入：
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

`acc` 取小数，`level` 代表评级，定义如下：

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

如果上传后无法解析，可尝试手动提取 JSON 数据并上传：

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
  milthm应用数据/Data/Library/Preferences
  ```
- **Windows**
  位于注册表：
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
## 关于Milthm

- [返回主目录](#目录)

### Reality 计算公式

Reality 的计算基于游玩分数和谱面定数：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

单曲 Reality 计算公式如下（s 为分数，c 为定数）：


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

## 音符判定


游戏中单个音符的判定共有五种，分别为：

- `Perfect`：获得101%的分数和100%的ACC。
- `perfect`：视精准度获得75%-101%的分数和100%的ACC。
- `Good`：视精准度获得30%-15%的分数和50%的ACC。
- `Bad`：Combo中断,获得0%-30%的分数，无ACC。
- `Miss`：Combo中断，不获得分数与ACC。

在每个区间内获得的分数与精准度成正比例关系

五种判定的对应范围如下表所示：

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## 结算评级

结算评级可分为八种：

- R：即Rain，达成理论值1010000分（RHYTHM of RAIN，所有音符均为大Perfect）
- 紫S：达成All Perfect（所有音符均为Perfect且未达成R评，1000000-1009999）
- 青S：达成Full Combo（所有音符均无Bad/Miss判定且未达成紫S评，此时无视下列分数要求）
- S：950000-1009999
- A：900000-949999
- B：850000-899999
- C：800000-849999
- F：0-799999

---

## 完成状态

游玩结束后在谱面中展示的评价

- Crash:
  - ACC < 80%
- Complete:
  - ACC > 80%且至少存在一个Bad/Miss
- Full Combo:
  - 所有音符均在±140ms内击中，且存在至少一个Good
- All Perfect:
  - 所有音符均在±70ms内击中，且存在至少一个小perfect
- Rhythm of Rain:
  - 所有音符均在±35ms内击中，即理论值
- AutoPlay is Awesome:
  - 使用AutoPlay通关
- Overloaded:
  - 分数大于1010000 (使用倾盆大雨).


## 定数表

- [说明](#说明)
- [介绍](#介绍---天气预报)
  - [天气预报](#介绍---天气预报)
- [主线章节](#序章---雨的声音)
  - [雨的声音](#序章---雨的声音)
  - [甜与苦的一体两面](#主线章节一---甜与苦的一体两面)
- [联动章节](#联动---雨世界)
  - [雨世界](#联动---雨世界)
  - [Notanote](#联动---notanote)
- [单曲](#单曲---梦境磁带)
  - [梦境磁带](#单曲---梦境磁带)
  
## 说明

> - 所有`SP`和非常规谱面均不参与Reality计算
> - 因精度原因当前版本的所有定数为11.9的曲目定数都不满11.9。比如若某版本的理论Reality为`13.005`，在游戏内将显示为`13.00`而非`13.01`



当前版本的理论Reality为`12.670`
当前版本定数最高的20首曲目如下


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
| 11 | Broken Conviction | CB | 11.5 |
| 12 | Threat - Metropolis | CB | 11.5 |
| 13 | Contrasty Angeles | CB | 11.5 |
| 14 | slic.hertz #GdbG | CB | 11.4 |
| 15 | Moonflutter | CB | 11.4 |
| 16 | Algebra | CB | 11.4 |
| 17 | Fragment of Memories | CB | 11.3 |
| 18 | IN | CB | 11.2 |
| 19 | イコラト | CB | 11.2 |
| 20 | 参宿四\~Betelgeuse\~ | CB | 11.2 |


## 介绍 - 天气预报

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| Welcome to Milthm  | 1.0  | -    | -    | -    |
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
| Algebra                     | 2.0  | 8.1  | 11.4 | -    |
| Words                       | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                    | 3.5  | 6.6  | 3.5  | -    |
| 白虎蓮華                    | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片              | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~          | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG            | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!             | 2.0  | 7.5  | 9.8 | -    |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                  | -    | -    | -    | Ø    |
| Broken Conviction           | 4.5  | 4.5  | 11.5 | 11.9 |


---


## 联系我们

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)


##


