
## 目次

- [ウェブサイト](#ウェブサイト)
- [使用方法](#使用方法)
  - [セーブファイルのアップロード](#セーブファイルのアップロード)
  - [解析済みデータの入力](#解析済みデータの入力)
  - [旧バージョンのセーブ](#旧バージョンのセーブ)
  - [その他のセーブパス](#その他のセーブパス)
  - [レーダーチャート](#レーダーチャート)
- [Milthmについて](#milthmについて)
  - [Reality計算式](#reality計算式)
  - [ノート判定](#ノート判定)
  - [評価結果](#評価結果)
  - [完了状態](#完了状態)
  - [定数表](#定数表)
- [お問い合わせ](#お問い合わせ)
- [その他の内容](#その他の内容)
  - [Milthm Wiki](#milthm-wiki)
  - [隠し曲のアンロック方法](#隠し曲のアンロック方法)
  - [ファイルパスとは？](#ファイルパスとは)
  - [Reality比較表](#reality比較表)

---

_最終更新: 2025.3.24 17:35 (UTC)_

> インターフェースが正しく表示されない場合は、[GitHubでご確認ください](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## ウェブサイト

- [k9.lv/c/](http://k9.lv/c/)
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

---

## 使用方法

### セーブファイルのアップロード

ホームページ上の **"Upload File"** オプションをクリックし、セーブファイル `saves.db` またはスコア記録ファイル `data.db` を選択してアップロードしてください。

> **注意:**
> - `data.db` にはバージョン `3.2` 以降のプレイ記録のみが含まれます（紛失していない場合）。
> - Android ユーザーは、`sdcard/Android/data` ディレクトリにアクセスするために [MT Manager](https://mt2.cn/) の使用を推奨します。

#### ファイルパス (詳細は [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) を参照)

[ファイルパスとは？](#ファイルパスとは)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

[Files](https://support.apple.com/zh-cn/102570) アプリを使って Milthm フォルダを開きます:

```text
/data/
```

> ローカルファイルが見つからない場合は、Files ホーム画面右上の三点メニューからローカルファイルの表示を有効にしてください（[詳細はこちら](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）。

- **Windows ユーザー:**  
  エクスプローラーのアドレスバーに以下を入力してください:  
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

### 解析済みデータの入力

ホームページの入力ボックスに以下の形式でデータを入力してください:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

ここで：
- `acc` は精度を示す小数です；
- `level` は評価を示し、以下のように定義されます:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 旧バージョンのセーブ

`Milthm 3.2` より前のセーブはモバイル端末では直接抽出できません。以下の方法をお試しください:

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

### その他のセーブパス

アップロード後に解析できない場合は、JSON データを手動で抽出してアップロードしてください:

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

## レーダーチャート

計算方法は `PanyiAme` により提供されています。詳細は [Milthm スコアチャート説明](https://wwp.lanzoup.com/iZ59A2j8nbpe) をご参照ください。

---

## Milthmについて

[目次に戻る](#目次)

### Reality計算式

Reality はプレイスコアと譜面定数に基づいて計算されます:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

1 曲の Reality 計算式（ここで s はスコア、c は定数）は以下の通りです:

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

[Reality比較表](#reality比較表)

#### コード実装:

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

## ノート判定

ゲーム内の各ノートの判定は以下の 5 種類に分類されます:

- **Perfect:** 101% のスコアと 100% の ACC を達成。
- **perfect:** 精度に応じて 75%-101% のスコアと 100% の ACC を達成。
- **Good:** 精度に応じて 30%-15% のスコアと 50% の ACC を達成。
- **Bad:** コンボが途切れ、0%-30% のスコアと 10% の ACC を獲得。
- **Miss:** コンボが途切れ、スコアと ACC が得られません。

各範囲内でスコアと精度は比例関係にあります。詳細な範囲は下記の表をご覧ください:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## 評価結果

評価結果は全部で 8 種類あります:

- **R:** Rain – 理論値 1010000 点を達成（RHYTHM of RAIN、全てのノートが Perfect）。
- **Purple S:** All Perfect を達成（全てのノートが Perfect だが R 評価には届かず、スコアは 1000000-1009999 の間）。
- **Blue S:** Full Combo を達成（全てのノートをミスなくヒット、以下のスコア要件は無視）。
- **S:** 950000-1009999 点。
- **A:** 900000-949999 点。
- **B:** 850000-899999 点。
- **C:** 800000-849999 点。
- **F:** 0-799999 点。

---

## 完了状態

曲終了後、譜面に表示される評価は以下の通りです:

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80%、かつ最低 1 つの Bad/Miss がある。
- **Full Combo:**  
  - 全てのノートが ±140ms 内にヒットし、最低 1 つの Good がある。
- **All Perfect:**  
  - 全てのノートが ±70ms 内にヒットし、最低 1 つの small perfect がある。
- **Rhythm of Rain:**  
  - 全てのノートが ±35ms 内にヒット（理論値）。
- **AutoPlay is Awesome:**  
  - AutoPlay を使用してクリア。
- **Overloaded:**  
  - スコアが 1010000 を超える（激しい雨を使用）。

---

## 定数表

[目次に戻る](#目次)

- [説明](#説明)
- [主な章](#イントロダクション---天気予報)
  - [天気予報](#イントロダクション---天気予報)
  - [雨の音](#序章---雨の音)
  - [甘さと苦さの両面](#主な章一---甘さと苦さの両面)
- [コラボレーション](#コラボレーション---rain-world)
  - [Rain World](#コラボレーション---rain-world)
  - [Notanote](#コラボレーション---notanote)
- [シングル](#シングル---夢のテープ)
  - [夢のテープ](#シングル---夢のテープ)
  - [Gathering Blossoms Under Rain](#シングル---gathering-blossoms-under-rain)

---

## 説明

> - 全ての `SP` および非標準譜面は Reality 計算に含まれません。  
> - 精度の問題により、現行バージョンでは本来 11.9 であるべき曲の定数が実際には 11.9 未満となっています。例えば、理論上の Reality が `13.005` の場合、ゲーム内では `13.00` と表示され、実際の計算値は `13.004999…` となります。

現行の理論上の Reality は `12.675`（表示は 12.67）です。  
現行バージョンで定数が最も高い上位 20 曲は以下の通りです:

| ランク | タイトル                  | 難易度 | 定数 |
|------|-------------------------|--------|------|
| 1    | Contrasty Angeles        | CL     | 12.3 |
| 2    | 命日                      | CL     | 12.2 |
| 3    | Moonfall／大月墜落狂想      | CB     | 12.2 |
| 4    | Regnaissance             | CL     | 12.1 |
| 5    | Innocent white           | CB     | 12.1 |
| 6    | Broken Conviction        | CL     | 11.9 |
| 7    | Meltovt Necrosys         | CB     | 11.9 |
| 8    | Moonflutter              | CL     | 11.7 |
| 9    | Fly To Meteor feat.兔柒   | CL     | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | Broken Conviction | CB | 11.5 |
| 12 | Threat - Metropolis | CB | 11.5 |
| 13 | Contrasty Angeles | CB | 11.5 |
| 14 | slic.hertz #GdbG | CB | 11.4 |
| 15 | Moonflutter | CB | 11.4 |
| 16 | Algebra | CB | 11.4 |
| 17 | Fragment of Memories | CB | 11.3 |
| 18 | cafe in 6412I731V | CB | 11.3 |
| 19 | IN | CB | 11.2 |
| 20 | イコラト | CB | 11.2 |
| 20 | 参宿四\~Betelgeuse\~ | CB | 11.2 |

---

## イントロダクション - 天気予報

| タイトル              | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Welcome to Milthm    | 1.0  | -    | -    | -    |
| 時落之雨             | 1.0  | 4.5  | 8.5  | -    |
| 夜風                 | 3.0  | 7.3  | 10.1 | -    |
| 花月                 | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光             | 2.0  | 7.5  | 9.1  | -    |


---

## 序章 - 雨の音

| タイトル          | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| 雨の街            | 1.0  | 4.0  | 7.5  | -    |
| Jump out?         | 2.0  | 7.9  | 9.7  | -    |
| Moving On         | 2.0  | 6.3  | 10.8 | -    |
| Blueface          | 4.0  | 8.0  | 10.1 | -    |
| イコラト          | 3.0  | 8.7  | 11.2 | -    |
| 雨女              | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日              | 3.0  | 8.7  | 11.1 | 12.2 |

---

## 主な章一 - 甘さと苦さの両面

| タイトル                | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| 太い線の雨              | 1.0  | 4.0  | 8.3  | -    |
| Aconsma                 | 1.0  | 6.0  | 9.3  | -    |
| OverRain                | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories    | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES          | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance            | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles       | 4.0  | 9.0  | 11.5 | 12.3 |

---

## コラボレーション - Rain World

| タイトル                 | DZ   | SK   | CB   | CL   |
|--------------------------|------|------|------|------|
| Sundown                  | 1.0  | -    | -    | -    |
| Bio-Engineering          | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands     | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure  | 2.0  | 5.5  | 10.3 | -    |
| White Lizard             | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex | 2.0  | 7.6  | 10.6 | -    |
| Kayava                   | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis      | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent        | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想    | 2.0  | 8.0  | 12.2 | -    |

---

## コラボレーション - Notanote

| タイトル              | DZ   | SK   | CB   | CL   |
|-----------------------|------|------|------|------|
| 烁雨                   | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar     | 4.0  | 7.8  | 10.2 | -    |
| Innocent white        | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg                | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys       | 2.0  | 7.8  | 11.9 | -    |

---

## シングル - 夢のテープ

| タイトル                   | DZ   | SK   | CB   | CL   |
|----------------------------|------|------|------|------|
| ネオン色の街 feat. Mai      | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                   | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                   | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai              | -    | -    | -    | SP   |
| WATER                       | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                     | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                      | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                 | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor               | 3.0  | 6.5  | 10.5 | 11.7 |
| 桜落繁花                    | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                    | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro           | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)  | 3.0  | 7.5  | 10.5 | -    |
| Algebra                     | 2.0  | 8.1  | 11.4 | -    |
| Words                       | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                    | 3.5  | 6.6  | 10.0  | -    |
| 白虎蓮華                    | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片              | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~         | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG            | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!             | 2.0  | 7.5  | 9.8  | -    |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                  | -    | -    | -    | Ø    |
| Broken Conviction           | 4.5  | 4.5  | 11.5 | 11.9 |

---

## シングル - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| FULi AUTO SHOOTER | 3.0  | 7.2  | 10.6  | -    |
| cafe in 6412I731V                    | 2.0  | 7.0  | 11.3  | -    |

---

## お問い合わせ

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## その他の内容

[目次に戻る](#目次)

### Milthm Wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### 隠し曲のアンロック方法

- **Regnaissance**

  HYPER MEMORIES をアンロックしプレイします;  
  プレイ中、背景が白黒に変わり Susan が表示されます。その際、ノートを叩かないでください;  
  その後、スコアがマイナスになり、Susan がカラフルに変わります。スコアが > 0 になるまでプレイし、評価後に曲がアンロックされます。

- **Contrasty Angeles**

  Regnaissance をアンロック後、メインストーリー第1章のエピソード6を読んでください;  
  HYPER MEMORIES をプレイします;  
  プレイ中、背景が白黒に変わり Susan が表示され、フルコンボを維持する必要があります;  
  その後、スコアが急落し、Susan がカラフルに変わります。スコアが > 0 になるまでプレイし、評価後に曲がアンロックされます。

### ファイルパスとは？

ファイルパスとは、ファイルシステム内の一意の位置を示す文字列表現であり、通常はディレクトリツリー構造を用います。異なるOSでは、`/`、`\`、または `:` などの区切り文字が使用されます。パスは絶対パスまたは相対パスとなり、フォルダとファイルの関係を表し、URL作成に必須です。

#### Android ファイルパス

- **外部ストレージ:**  
  `/storage/emulated/[ユーザーID]`（デフォルトの主ユーザーは 0）または `/sdcard/` に位置し、これらのファイルはユーザーに表示されます。
- **アプリケーションデータディレクトリ:**  
  通常、`/storage/emulated/0/Android/data/[パッケージ名]/` にあり、例えば:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Milthm のセーブディレクトリは次の場所にあります:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  アクセスがブロックされた場合は、PCに接続するか、ファイルマネージャーにADB権限を付与してください。

---

### Reality比較表

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
