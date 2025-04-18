
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
  - [Chater info](#Charter-info)
- [お問い合わせ](#お問い合わせ)
- [その他の内容](#その他の内容)
  - [Milthm Wiki](#milthm-wiki)
  - [隠し曲のアンロック方法](#隠し曲のアンロック方法)
  - [ファイルパスとは？](#ファイルパスとは)
  - [Reality比較表](#reality比較表)

---

_Last updated on 2025.04.18 17:20 (UTC)_

> インターフェースが正しく表示されない場合は、[GitHubでご確認ください](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/)

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

[Files](https://support.apple.com//102570) アプリを使って Milthm フォルダを開きます:

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
- **Good:** 精度に応じて 30%-75% のスコアと 50% の ACC を達成。
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

現行の理論上の Reality は `12.695`（表示は 12.69）です。  
現行バージョンで定数が最も高い上位 20 曲は以下の通りです:

| ランク | タイトル                  | 難易度 | 定数 |
|------|-------------------------|--------|------|
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

---

## イントロダクション - 天気予報

| タイトル              | DZ   | SK   | CB   | CL   | SP |
|---------------------|------|------|------|------|---|
| [Welcome to Milthm](info:info("Welcome to Milthm"))  | [1.0](info:info("Welcome to Milthm", "Drizzle")) | -  | - | - | [SP](info:info("Welcome to Milthm", "Special")) |
| [时落之雨](info:info("时落之雨"))           | [1.0](info:info("时落之雨", "Drizzle"))  | [4.5](info:info("时落之雨", "Sprinkle"))  | [8.5](info:info("时落之雨", "Cloudburst"))  | -    | - |
| [夜風](info:info("夜風"))               | [3.0](info:info("夜風","Drizzle"))  | [7.3](info:info("夜風", "Sprinkle"))  | [10.1](info:info("夜風", "Cloudburst")) | -    | - |
| [花月](info:info("花月"))               | [2.0](info:info("花月", "Drizzle"))  | [8.2](info:info("花月", "Sprinkle"))  | [9.3](info:info("花月", "Cloudburst"))  | -    | - |
| [暮予星光](info:info("暮予星光"))           | [2.0](info:info("暮予星光", "Drizzle"))  | [7.5](info:info("暮予星光", "Sprinkle"))  | [9.1](info:info("暮予星光", "Cloudburst")) | -    | - |
| [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome"))           | [2.5](info:info("Fantasia Sonata Sky Syndrome", "Drizzle"))  | [7.0](info:info("Fantasia Sonata Sky Syndrome", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Sky Syndrome", "Cloudburst")) | -    | - |

---

## 序章 - 雨の音

| タイトル          | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [雨之城](info:info("雨之城"))        | [1.0](info:info("雨之城", "Drizzle"))  | [4.0](info:info("雨之城", "Sprinkle"))  | [7.5](info:info("雨之城", "Cloudburst"))  | -    |
| [Jump out?](info:info("Jump out?"))     | [2.0](info:info("Jump out?", "Drizzle"))  | [7.9](info:info("Jump out?", "Sprinkle"))  | [9.7](info:info("Jump out?", "Cloudburst"))  | -    |
| [Moving On](info:info("Moving On"))     | [2.0](info:info("Moving On", "Drizzle"))  | [6.3](info:info("Moving On", "Sprinkle"))  | [10.8](info:info("Moving On", "Cloudburst")) | -    |
| [☹](info:info("☹"))      | [4.0](info:info("☹", "Drizzle"))  | [8.0](info:info("☹", "Sprinkle"))  | [10.1](info:info("☹", "Cloudburst")) | -    |
| [イコラト](info:info("イコラト"))      | [3.0](info:info("イコラト", "Drizzle"))  | [8.7](info:info("イコラト", "Sprinkle"))  | [11.2](info:info("イコラト", "Cloudburst")) | -    |
| [雨女](info:info("雨女"))          | [3.0](info:info("雨女", "Drizzle")) | [6.5](info:info("雨女", "Sprinkle")) | [9.5](info:info("雨女", "Cloudburst")) | [10.5](info:info("雨女", "Clear")) |
| [命日](info:info("命日"))          | [3.0](info:info("命日", "Drizzle"))  | [8.7](info:info("命日", "Sprinkle"))  | [11.1](info:info("命日", "Cloudburst")) | [12.2](info:info("命日", "Clear")) |

---

## 主な章一 - 甘さと苦さの両面

| タイトル                | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| [粗线条的雨](info:info("粗线条的雨"))         | [1.0](info:info("粗线条的雨", "Drizzle"))  | [4.0](info:info("粗线条的雨", "Sprinkle"))  | [8.3](info:info("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](info:info("Aconsma"))            | [1.0](info:info("Aconsma", "Drizzle"))  | [6.0](info:info("Aconsma", "Sprinkle"))  | [9.3](info:info("Aconsma", "Cloudburst"))  | -    |
| [OverRain](info:info("OverRain"))           | [2.0](info:info("OverRain", "Drizzle"))  | [7.6](info:info("OverRain", "Sprinkle"))  | [10.0](info:info("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](info:info("Fragment of Memories")) | [2.0](info:info("Fragment of Memories", "Drizzle"))  | [8.4](info:info("Fragment of Memories", "Sprinkle"))  | [11.3](info:info("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](info:info("HYPER MEMORIES"))     | [1.0](info:info("HYPER MEMORIES", "Drizzle"))  | [8.9](info:info("HYPER MEMORIES", "Sprinkle"))  | [11.7](info:info("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](info:info("Regnaissance"))       | [4.5](info:info("Regnaissance", "Drizzle"))  | [8.5](info:info("Regnaissance", "Sprinkle"))  | [11.1](info:info("Regnaissance", "Cloudburst")) | [12.1](info:info("Regnaissance", "Clear")) |
| [Contrasty Angeles](info:info("Contrasty Angeles"))  | [4.0](info:info("Contrasty Angeles", "Drizzle"))  | [9.0](info:info("Contrasty Angeles", "Sprinkle"))  | [11.5](info:info("Contrasty Angeles", "Cloudburst")) | [12.3](info:info("Contrasty Angeles", "Clear")) |

---

## コラボレーション - Rain World

| タイトル                 | DZ   | SK   | CB   | CL   |
|--------------------------|------|------|------|------|
| [Sundown](info:info("Sundown"))                | [1.0](info:info("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](info:info("Bio-Engineering"))        | [2.0](info:info("Bio-Engineering", "Drizzle"))  | [8.3](info:info("Bio-Engineering", "Sprinkle"))  | [9.6](info:info("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](info:info("Threat - Sky Islands"))   | [2.0](info:info("Threat - Sky Islands", "Drizzle"))  | [6.9](info:info("Threat - Sky Islands", "Sprinkle"))  | [10.6](info:info("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](info:info("Threat - Superstructure")) | [2.0](info:info("Threat - Superstructure", "Drizzle"))  | [5.5](info:info("Threat - Superstructure", "Sprinkle"))  | [10.3](info:info("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](info:info("White Lizard"))           | -    | [4.0](info:info("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex")) | [2.0](info:info("Threat - Waterfront Complex", "Drizzle"))  | [7.6](info:info("Threat - Waterfront Complex", "Sprinkle"))  | [10.6](info:info("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](info:info("Kayava"))                 | [3.0](info:info("Kayava", "Drizzle"))  | [5.5](info:info("Kayava", "Sprinkle"))  | [10.4](info:info("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](info:info("Threat - Metropolis"))    | [2.0](info:info("Threat - Metropolis", "Drizzle"))  | [6.6](info:info("Threat - Metropolis", "Sprinkle"))  | [11.5](info:info("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](info:info("Sheer Ice Torrent"))      | [2.0](info:info("Sheer Ice Torrent", "Drizzle"))  | [7.8](info:info("Sheer Ice Torrent", "Sprinkle"))  | [11.1](info:info("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](info:info("大月墜落狂想")) | [2.0](info:info("大月墜落狂想", "Drizzle"))  | [8.0](info:info("大月墜落狂想", "Sprinkle"))  | [12.2](info:info("大月墜落狂想", "Cloudburst")) | -    |

---

## コラボレーション - Notanote

| タイトル              | DZ   | SK   | CB   | CL   |
|-----------------------|------|------|------|------|
| [烁雨](info:info("烁雨"))             | [2.0](info:info("烁雨", "Drizzle"))  | [7.0](info:info("烁雨", "Sprinkle"))  | [9.4](info:info("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](info:info("cybernetic blazar")) | [4.0](info:info("cybernetic blazar", "Drizzle"))  | [7.8](info:info("cybernetic blazar", "Sprinkle"))  | [10.2](info:info("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](info:info("Innocent white"))    | [2.0](info:info("Innocent white", "Drizzle"))  | [8.2](info:info("Innocent white", "Sprinkle"))  | [12.1](info:info("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](info:info("Elsorhg"))           | [2.0](info:info("Elsorhg", "Drizzle"))  | [7.5](info:info("Elsorhg", "Sprinkle"))  | [9.8](info:info("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](info:info("Meltovt Necrosys"))  | [2.0](info:info("Meltovt Necrosys", "Drizzle"))  | [7.8](info:info("Meltovt Necrosys", "Sprinkle"))  | [11.9](info:info("Meltovt Necrosys", "Cloudburst"))  | -    |

---

## シングル - 夢のテープ

| タイトル                   | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai"))    | [3.5](info:info("ネオン色のまち feat. Mai", "Drizzle"))  | [8.0](info:info("ネオン色のまち feat. Mai", "Sprinkle"))  | [9.7](info:info("ネオン色のまち feat. Mai", "Cloudburst"))  | -    | - |
| [INFP.mp3](info:info("INFP.mp3"))                    | [2.0](info:info("INFP.mp3", "Drizzle"))  | [5.5](info:info("INFP.mp3", "Sprinkle"))  | [9.2](info:info("INFP.mp3", "Cloudburst"))  | -    | - |
| [Oniichan](info:info("Oniichan"))                    | [3.0](info:info("Oniichan", "Drizzle"))  | [8.0](info:info("Oniichan", "Sprinkle"))  | [9.8](info:info("Oniichan", "Cloudburst"))  | -    | - |
| [Oiiaioooooiai](info:info("Oiiaioooooiai"))               | -    | -    | -    | - | [SP](info:info("Oiiaioooooiai", "Special")) |
| [WATER](info:info("WATER"))                       | [3.0](info:info("WATER", "Drizzle"))  | [7.3](info:info("WATER", "Sprinkle"))  | [10.6](info:info("WATER", "Cloudburst")) | -    | - |
| [Dogbite](info:info("Dogbite"))                     | [3.0](info:info("Dogbite", "Drizzle"))  | [7.6](info:info("Dogbite", "Sprinkle"))  | [10.3](info:info("Dogbite", "Cloudburst")) | - | [SP](info:info("Dogbite", "Special")) |
| [Hikari](info:info("Hikari"))                      | [3.0](info:info("Hikari", "Drizzle"))  | [8.4](info:info("Hikari", "Sprinkle"))  | [10.7](info:info("Hikari", "Cloudburst")) | -    | - |
| [Moonflutter](info:info("Moonflutter"))                 | [3.0](info:info("Moonflutter", "Drizzle"))  | [7.9](info:info("Moonflutter", "Sprinkle"))  | [11.4](info:info("Moonflutter", "Cloudburst")) | [11.7](info:info("Moonflutter", "Clear")) | - |
| [Fly To Meteor （Milthm Edit）](info:info("Fly To Meteor （Milthm Edit）"))              | [3.0](info:info("Fly To Meteor （Milthm Edit）", "Drizzle"))  | [6.5](info:info("Fly To Meteor （Milthm Edit）", "Sprinkle"))  | [10.5](info:info("Fly To Meteor （Milthm Edit）", "Cloudburst")) | - | - |
| [Fly To Meteor feat.兔柒 （Milthm Edit）](info:info("Fly To Meteor feat.兔柒 （Milthm Edit）"))              | - | - | - | [11.7](info:info("Fly To Meteor feat.兔柒 （Milthm Edit）", "Clear")) | - |
| [樱落繁花](info:info("樱落繁花"))                    | [3.0](info:info("樱落繁花", "Drizzle"))  | [8.8](info:info("樱落繁花", "Sprinkle"))  | [10.9](info:info("樱落繁花", "Cloudburst")) | -    | - |
| [Agnostic](info:info("Agnostic"))                    | [3.0](info:info("Agnostic", "Drizzle"))  | [7.4](info:info("Agnostic", "Sprinkle"))  | [10.0](info:info("Agnostic", "Cloudburst")) | -    | - |
| [Psyched Fevereiro](info:info("Psyched Fevereiro"))           | [3.5](info:info("Psyched Fevereiro", "Drizzle"))  | [7.3](info:info("Psyched Fevereiro", "Sprinkle"))  | [10.0](info:info("Psyched Fevereiro", "Cloudburst")) | -    | - |
| [Future Unbound （Game Edit）](info:info("Future Unbound （Game Edit）"))  | [3.0](info:info("Future Unbound （Game Edit）","Drizzle"))  | [7.5](info:info("Future Unbound （Game Edit）","Sprinkle"))  | [10.5](info:info("Future Unbound （Game Edit）","Cloudburst")) | -    | - |
| [Algebra](info:info("Algebra"))                     | [2.0](info:info("Algebra", "Drizzle"))  | [8.1](info:info("Algebra", "Sprinkle"))  | [11.4](info:info("Algebra", "Cloudburst")) | - | [SP](info:info("Algebra", "Special")) |
| [Words](info:info("Words"))                       | [2.0](info:info("Words", "Drizzle"))  | [6.5](info:info("Words", "Sprinkle"))  | [9.3](info:info("Words", "Cloudburst"))  | -    | - |
| [仮想明日](info:info("仮想明日"))                    | [3.5](info:info("仮想明日", "Drizzle"))  | [6.6](info:info("仮想明日", "Sprinkle"))  | [10.0](info:info("仮想明日", "Cloudburst"))  | -    | - |
| [白虎蓮華](info:info("白虎蓮華"))                    | [3.0](info:info("白虎蓮華", "Drizzle"))  | [6.5](info:info("白虎蓮華", "Sprinkle"))  | [9.6](info:info("白虎蓮華", "Cloudburst"))  | -    | - |
| [サイクルの欠片](info:info("サイクルの欠片"))              | [1.0](info:info("サイクルの欠片", "Drizzle"))  | [7.8](info:info("サイクルの欠片", "Sprinkle"))  | [8.6](info:info("サイクルの欠片", "Cloudburst"))  | -    | - |
| [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~"))          | [2.0](info:info("参宿四~Betelgeuse~", "Drizzle"))  | [6.4](info:info("参宿四~Betelgeuse~", "Sprinkle"))  | [11.2](info:info("参宿四~Betelgeuse~", "Cloudburst"))  | -    | - |
| [slic.hertz #GdbG](info:info("slic.hertz #GdbG"))            | [3.0](info:info("slic.hertz #GdbG", "Drizzle"))  | [7.6](info:info("slic.hertz #GdbG", "Sprinkle"))  | [11.4](info:info("slic.hertz #GdbG", "Cloudburst"))  | -    | - |
| [Rainbow Flavor!](info:info("Rainbow Flavor!"))             | [2.0](info:info("Rainbow Flavor!", "Drizzle"))  | [7.5](info:info("Rainbow Flavor!", "Sprinkle"))  | [9.8](info:info("Rainbow Flavor!", "Cloudburst")) | - | [SP](info:info("Rainbow Flavor!", "Special")) |
| [IN](info:info("IN"))                           | [1.0](info:info("IN", "Drizzle"))  | [7.9](info:info("IN", "Sprinkle"))  | [11.2](info:info("IN", "Cloudburst")) | -    | - |
| [驟雨の狭間](info:info("驟雨の狭間"))                  | -    | -    | [Ø](info:info("驟雨の狭間", "Cloudburst"))    | - | - |
| [Broken Conviction](info:info("Broken Conviction"))           | [4.5](info:info("Broken Conviction", "Drizzle"))  | [4.5](info:info("Broken Conviction", "Sprinkle"))  | [11.5](info:info("Broken Conviction", "Cloudburst")) | [11.9](info:info("Broken Conviction", "Clear")) | - |
| [选择你的宽带](info:info("选择你的宽带")) | - | - | - | - | [SP](info:info("选择你的宽带", "Special")) |

---

## シングル - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER")) | [3.0](info:info("FULi AUTO SHOOTER", "Drizzle"))  | [7.2](info:info("FULi AUTO SHOOTER", "Sprinkle"))  | [10.6](info:info("FULi AUTO SHOOTER", "Cloudburst"))  | -    | - |
| [cafe in 6412I731V](info:info("cafe in 6412I731V"))                    | [2.0](info:info("cafe in 6412I731V", "Drizzle"))  | [7.0](info:info("cafe in 6412I731V", "Sprinkle"))  | [11.3](info:info("cafe in 6412I731V", "Cloudburst"))  | -    | - |
| [KASANE](info:info("KASANE")) | [3.0](info:info("KASANE", "Drizzle"))  | [7.8](info:info("KASANE", "Sprinkle"))  | [11.6](info:info("KASANE", "Cloudburst"))  | -    | - |
| [KAEDE](info:info("KAEDE")) | -  | -  | -  | - | [SP](info:info("KAEDE", "Special")) |
| [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars"))           | [2.0](info:info("Fantasia Sonata Stars", "Drizzle"))  | [6.8](info:info("Fantasia Sonata Stars", "Sprinkle"))  | [10.4](info:info("Fantasia Sonata Stars", "Cloudburst")) | -    | - |

---

## Charter info

| Charter | Charts |
| ------- | ------------------- |
| Akko | [Aconsma_Sprinkle](info:info("Aconsma","Sprinkle")) , [Algebra_Cloudburst](info:info("Algebra","Cloudburst")) , [参宿四\~Betelgeuse\~_Drizzle](info:info("参宿四~Betelgeuse~","Drizzle")) , [参宿四\~Betelgeuse\~_Sprinkle](info:info("参宿四~Betelgeuse~","Sprinkle")) , [参宿四\~Betelgeuse\~_Cloudburst](info:info("参宿四~Betelgeuse~","Cloudburst")) , [☹_Sprinkle](info:info("☹","Sprinkle")) , [Broken Conviction_Cloudburst](info:info("Broken Conviction","Cloudburst")) , [Broken Conviction_Sprinkle](info:info("Broken Conviction","Sprinkle")) , [Broken Conviction_Drizzle](info:info("Broken Conviction","Drizzle")) , [Dogbite_Cloudburst](info:info("Dogbite","Cloudburst")) , [Dogbite_Special](info:info("Dogbite","Special")) , [FULi AUTO SHOOTER_Sprinkle](info:info("FULi AUTO SHOOTER","Sprinkle")) , [FULi AUTO SHOOTER_Drizzle](info:info("FULi AUTO SHOOTER","Drizzle")) , [FULi AUTO SHOOTER_Cloudburst](info:info("FULi AUTO SHOOTER","Cloudburst")) , [Fantasia Sonata Stars_Cloudburst](info:info("Fantasia Sonata Stars","Cloudburst")) , [Fragment of Memories_Drizzle](info:info("Fragment of Memories","Drizzle")) , [Fragment of Memories_Sprinkle](info:info("Fragment of Memories","Sprinkle")) , [HYPER MEMORIES_Cloudburst](info:info("HYPER MEMORIES","Cloudburst")) , [IN_Drizzle](info:info("IN","Drizzle")) , [仮想明日_Cloudburst](info:info("仮想明日","Cloudburst")) , [仮想明日_Sprinkle](info:info("仮想明日","Sprinkle")) , [仮想明日_Drizzle](info:info("仮想明日","Drizzle")) , [Kayava_Cloudburst](info:info("Kayava","Cloudburst")) , [Kayava_Drizzle](info:info("Kayava","Drizzle")) , [Meltovt Necrosys_Cloudburst](info:info("Meltovt Necrosys","Cloudburst")) , [Oniichan_Sprinkle](info:info("Oniichan","Sprinkle")) , [Oniichan_Drizzle](info:info("Oniichan","Drizzle")) , [OverRain_Drizzle](info:info("OverRain","Drizzle")) , [OverRain_Sprinkle](info:info("OverRain","Sprinkle")) , [OverRain_Cloudburst](info:info("OverRain","Cloudburst")) , [Psyched Fevereiro_Cloudburst](info:info("Psyched Fevereiro","Cloudburst")) , [Psyched Fevereiro_Sprinkle](info:info("Psyched Fevereiro","Sprinkle")) , [Psyched Fevereiro_Drizzle](info:info("Psyched Fevereiro","Drizzle")) , [Rainbow Flavor!_Special](info:info("Rainbow Flavor!","Special")) , [Rainbow Flavor!_Cloudburst](info:info("Rainbow Flavor!","Cloudburst")) , [Rainbow Flavor!_Drizzle](info:info("Rainbow Flavor!","Drizzle")) , [Rainbow Flavor!_Sprinkle](info:info("Rainbow Flavor!","Sprinkle")) , [Regnaissance_Clear](info:info("Regnaissance","Clear")) , [Regnaissance_Cloudburst](info:info("Regnaissance","Cloudburst")) , [暮予星光_Cloudburst](info:info("暮予星光","Cloudburst")) , [烁雨_Drizzle](info:info("烁雨","Drizzle")) , [烁雨_Sprinkle](info:info("烁雨","Sprinkle")) , [Threat - Metropolis_Drizzle](info:info("Threat - Metropolis","Drizzle")) , [Threat - Metropolis_Sprinkle](info:info("Threat - Metropolis","Sprinkle")) , [WATER_Cloudburst](info:info("WATER","Cloudburst")) , [Words_Cloudburst](info:info("Words","Cloudburst")) , [cybernetic blazar_Cloudburst](info:info("cybernetic blazar","Cloudburst")) |
| Ariayaka | [樱落繁花_Cloudburst](info:info("樱落繁花","Cloudburst")) , [樱落繁花_Drizzle](info:info("樱落繁花","Drizzle")) , [Innocent white_Cloudburst](info:info("Innocent white","Cloudburst")) , [大月墜落狂想_Cloudburst](info:info("大月墜落狂想","Cloudburst")) , [Sheer Ice Torrent_Cloudburst](info:info("Sheer Ice Torrent","Cloudburst")) , [烁雨_Cloudburst](info:info("烁雨","Cloudburst")) , [Sundown_Drizzle](info:info("Sundown","Drizzle")) , [Threat - Sky Islands_Cloudburst](info:info("Threat - Sky Islands","Cloudburst")) |
| Buger404 | [雨之城_Cloudburst](info:info("雨之城","Cloudburst")) , [Welcome to Milthm_Drizzle](info:info("Welcome to Milthm","Drizzle")) |
| Eric_Lian | [Bio-Engineering_Drizzle](info:info("Bio-Engineering","Drizzle")) , [Dogbite_Cloudburst](info:info("Dogbite","Cloudburst")) , [HYPER MEMORIES_Drizzle](info:info("HYPER MEMORIES","Drizzle")) , [HYPER MEMORIES_Sprinkle](info:info("HYPER MEMORIES","Sprinkle")) , [Regnaissance_Sprinkle](info:info("Regnaissance","Sprinkle")) , [烁雨_Drizzle](info:info("烁雨","Drizzle")) , [Threat - Sky Islands_Drizzle](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure_Drizzle](info:info("Threat - Superstructure","Drizzle")) , [cafe in 6412I731V_Cloudburst](info:info("cafe in 6412I731V","Cloudburst")) |
| GUGU | [イコラト_Cloudburst](info:info("イコラト","Cloudburst")) |
| Kiyotsuki | [Aconsma_Cloudburst](info:info("Aconsma","Cloudburst")) , [Aconsma_Drizzle](info:info("Aconsma","Drizzle")) , [参宿四\~Betelgeuse\~_Cloudburst](info:info("参宿四~Betelgeuse~","Cloudburst")) , [Bio-Engineering_Sprinkle](info:info("Bio-Engineering","Sprinkle")) , [Broken Conviction_Clear](info:info("Broken Conviction","Clear")) , [Contrasty Angeles_Drizzle](info:info("Contrasty Angeles","Drizzle")) , [Contrasty Angeles_Cloudburst](info:info("Contrasty Angeles","Cloudburst")) , [Contrasty Angeles_Sprinkle](info:info("Contrasty Angeles","Sprinkle")) , [Elsorhg_Cloudburst](info:info("Elsorhg","Cloudburst")) , [Elsorhg_Drizzle](info:info("Elsorhg","Drizzle")) , [Elsorhg_Sprinkle](info:info("Elsorhg","Sprinkle")) , [时落之雨_Cloudburst](info:info("时落之雨","Cloudburst")) , [时落之雨_Sprinkle](info:info("时落之雨","Sprinkle")) , [Fantasia Sonata Sky Syndrome_Sprinkle](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")) , [Fantasia Sonata Sky Syndrome_Cloudburst](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")) , [Future Unbound （Game Edit）_Sprinkle](info:info("Future Unbound （Game Edit）","Sprinkle")) , [Future Unbound （Game Edit）_Drizzle](info:info("Future Unbound （Game Edit）","Drizzle")) , [Jump out?_Sprinkle](info:info("Jump out?","Sprinkle")) , [花月_Cloudburst](info:info("花月","Cloudburst")) , [花月_Sprinkle](info:info("花月","Sprinkle")) , [命日_Cloudburst](info:info("命日","Cloudburst")) , [Moonflutter_Drizzle](info:info("Moonflutter","Drizzle")) , [Oniichan_Cloudburst](info:info("Oniichan","Cloudburst")) , [暮予星光_Sprinkle](info:info("暮予星光","Sprinkle")) , [Sundown_Drizzle](info:info("Sundown","Drizzle")) , [Threat - Metropolis_Cloudburst](info:info("Threat - Metropolis","Cloudburst")) , [Threat - Sky Islands_Sprinkle](info:info("Threat - Sky Islands","Sprinkle")) , [Threat - Superstructure_Cloudburst](info:info("Threat - Superstructure","Cloudburst")) , [白虎蓮華_Drizzle](info:info("白虎蓮華","Drizzle")) , [WATER_Drizzle](info:info("WATER","Drizzle")) , [White Lizard_Sprinkle](info:info("White Lizard","Sprinkle")) , [夜風_Cloudburst](info:info("夜風","Cloudburst")) , [夜風_Sprinkle](info:info("夜風","Sprinkle")) , [cafe in 6412I731V_Sprinkle](info:info("cafe in 6412I731V","Sprinkle")) , [cafe in 6412I731V_Cloudburst](info:info("cafe in 6412I731V","Cloudburst")) , [cafe in 6412I731V_Drizzle](info:info("cafe in 6412I731V","Drizzle")) , [イコラト_Cloudburst](info:info("イコラト","Cloudburst")) , [イコラト_Drizzle](info:info("イコラト","Drizzle")) , [slic.hertz #GdbG_Cloudburst](info:info("slic.hertz #GdbG","Cloudburst")) |
| Magazet | [Agnostic_Drizzle](info:info("Agnostic","Drizzle")) , [Agnostic_Sprinkle](info:info("Agnostic","Sprinkle")) , [Agnostic_Cloudburst](info:info("Agnostic","Cloudburst")) , [Algebra_Drizzle](info:info("Algebra","Drizzle")) , [雨女_Cloudburst](info:info("雨女","Cloudburst")) , [Dogbite_Drizzle](info:info("Dogbite","Drizzle")) , [Elsorhg_Cloudburst](info:info("Elsorhg","Cloudburst")) , [Elsorhg_Sprinkle](info:info("Elsorhg","Sprinkle")) , [选择你的宽带_Special](info:info("选择你的宽带","Special")) , [Fantasia Sonata Stars_Sprinkle](info:info("Fantasia Sonata Stars","Sprinkle")) , [Fantasia Sonata Stars_Drizzle](info:info("Fantasia Sonata Stars","Drizzle")) , [Fantasia Sonata Stars_Cloudburst](info:info("Fantasia Sonata Stars","Cloudburst")) , [Hikari_Drizzle](info:info("Hikari","Drizzle")) , [Hikari_Sprinkle](info:info("Hikari","Sprinkle")) , [INFP.mp3_Sprinkle](info:info("INFP.mp3","Sprinkle")) , [INFP.mp3_Cloudburst](info:info("INFP.mp3","Cloudburst")) , [INFP.mp3_Drizzle](info:info("INFP.mp3","Drizzle")) , [仮想明日_Cloudburst](info:info("仮想明日","Cloudburst")) , [Innocent white_Sprinkle](info:info("Innocent white","Sprinkle")) , [命日_Sprinkle](info:info("命日","Sprinkle")) , [Meltovt Necrosys_Drizzle](info:info("Meltovt Necrosys","Drizzle")) , [Moonflutter_Sprinkle](info:info("Moonflutter","Sprinkle")) , [ネオン色のまち feat. Mai_Cloudburst](info:info("ネオン色のまち feat. Mai","Cloudburst")) , [ネオン色のまち feat. Mai_Drizzle](info:info("ネオン色のまち feat. Mai","Drizzle")) , [ネオン色のまち feat. Mai_Sprinkle](info:info("ネオン色のまち feat. Mai","Sprinkle")) , [サイクルの欠片_Drizzle](info:info("サイクルの欠片","Drizzle")) , [サイクルの欠片_Sprinkle](info:info("サイクルの欠片","Sprinkle")) , [サイクルの欠片_Cloudburst](info:info("サイクルの欠片","Cloudburst")) , [Sheer Ice Torrent_Sprinkle](info:info("Sheer Ice Torrent","Sprinkle")) , [粗线条的雨_Sprinkle](info:info("粗线条的雨","Sprinkle")) , [粗线条的雨_Drizzle](info:info("粗线条的雨","Drizzle")) , [粗线条的雨_Cloudburst](info:info("粗线条的雨","Cloudburst")) , [Threat - Sky Islands_Drizzle](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure_Drizzle](info:info("Threat - Superstructure","Drizzle")) , [Threat - Waterfront Complex_Drizzle](info:info("Threat - Waterfront Complex","Drizzle")) , [Threat - Waterfront Complex_Cloudburst](info:info("Threat - Waterfront Complex","Cloudburst")) , [WATER_Cloudburst](info:info("WATER","Cloudburst")) |
| Milthm Team | [Algebra_Sprinkle](info:info("Algebra","Sprinkle")) , [Algebra_Special](info:info("Algebra","Special")) , [时落之雨_Drizzle](info:info("时落之雨","Drizzle")) , [Fantasia Sonata Sky Syndrome_Drizzle](info:info("Fantasia Sonata Sky Syndrome","Drizzle")) , [KAEDE_Special](info:info("KAEDE","Special")) , [花月_Drizzle](info:info("花月","Drizzle")) , [驟雨の狭間_Cloudburst](info:info("驟雨の狭間","Cloudburst")) , [暮予星光_Drizzle](info:info("暮予星光","Drizzle")) , [Sheer Ice Torrent_Cloudburst_Story](info:info("Sheer Ice Torrent","Cloudburst_Story")) , [Sheer Ice Torrent_Sprinkle_Story](info:info("Sheer Ice Torrent","Sprinkle_Story")) , [Sheer Ice Torrent_Drizzle_Story](info:info("Sheer Ice Torrent","Drizzle_Story")) , [夜風_Drizzle](info:info("夜風","Drizzle")) , [cybernetic blazar_Drizzle](info:info("cybernetic blazar","Drizzle")) , [slic.hertz #GdbG_Drizzle](info:info("slic.hertz #GdbG","Drizzle")) , [slic.hertz #GdbG_Sprinkle](info:info("slic.hertz #GdbG","Sprinkle")) |
| Murty | [Regnaissance_Drizzle](info:info("Regnaissance","Drizzle")) |
| SakiA | [☹_Drizzle](info:info("☹","Drizzle")) |
| TCSTWTBHY | [☹_Sprinkle](info:info("☹","Sprinkle")) , [☹_Drizzle](info:info("☹","Drizzle")) , [Dogbite_Sprinkle](info:info("Dogbite","Sprinkle")) , [Dogbite_Drizzle](info:info("Dogbite","Drizzle")) , [Innocent white_Drizzle](info:info("Innocent white","Drizzle")) , [Jump out?_Drizzle](info:info("Jump out?","Drizzle")) , [Jump out?_Cloudburst](info:info("Jump out?","Cloudburst")) , [命日_Clear](info:info("命日","Clear")) , [Moving On_Cloudburst](info:info("Moving On","Cloudburst")) , [Threat - Sky Islands_Sprinkle](info:info("Threat - Sky Islands","Sprinkle")) , [Threat - Superstructure_Sprinkle](info:info("Threat - Superstructure","Sprinkle")) , [Threat - Waterfront Complex_Sprinkle](info:info("Threat - Waterfront Complex","Sprinkle")) , [Welcome to Milthm_Drizzle](info:info("Welcome to Milthm","Drizzle")) , [Words_Sprinkle](info:info("Words","Sprinkle")) , [Words_Drizzle](info:info("Words","Drizzle")) , [イコラト_Sprinkle](info:info("イコラト","Sprinkle")) |
| vitamin b | [IN_Cloudburst](info:info("IN","Cloudburst")) , [KASANE_Cloudburst](info:info("KASANE","Cloudburst")) |
| WH_C | [雨之城_Cloudburst](info:info("雨之城","Cloudburst")) |
| xzadudu179 | [Bio-Engineering_Drizzle](info:info("Bio-Engineering","Drizzle")) , [Future Unbound （Game Edit）_Cloudburst](info:info("Future Unbound （Game Edit）","Cloudburst")) , [HYPER MEMORIES_Cloudburst](info:info("HYPER MEMORIES","Cloudburst")) , [Hikari_Cloudburst](info:info("Hikari","Cloudburst")) , [Meltovt Necrosys_Cloudburst](info:info("Meltovt Necrosys","Cloudburst")) , [Moonflutter_Cloudburst](info:info("Moonflutter","Cloudburst")) , [Sundown_Drizzle](info:info("Sundown","Drizzle")) , [WATER_Sprinkle](info:info("WATER","Sprinkle")) , [WATER_Cloudburst](info:info("WATER","Cloudburst")) |
| 阿鱼 | [雨之城_Sprinkle](info:info("雨之城","Sprinkle")) , [雨之城_Cloudburst](info:info("雨之城","Cloudburst")) , [雨之城_Drizzle](info:info("雨之城","Drizzle")) , [Moving On_Drizzle](info:info("Moving On","Drizzle")) |
| 姜片 | [Sheer Ice Torrent_Drizzle](info:info("Sheer Ice Torrent","Drizzle")) |
| 泪莫提 | [Bio-Engineering_Cloudburst](info:info("Bio-Engineering","Cloudburst")) , [Broken Conviction_Cloudburst](info:info("Broken Conviction","Cloudburst")) , [Moving On_Sprinkle](info:info("Moving On","Sprinkle")) , [cybernetic blazar_Cloudburst](info:info("cybernetic blazar","Cloudburst")) |
| 喵卡 | [イコラト_Cloudburst](info:info("イコラト","Cloudburst")) |
| 母鸡 | [Fragment of Memories_Cloudburst](info:info("Fragment of Memories","Cloudburst")) , [KASANE_Sprinkle](info:info("KASANE","Sprinkle")) , [KASANE_Drizzle](info:info("KASANE","Drizzle")) |
| 你申某 | [雨女_Drizzle](info:info("雨女","Drizzle")) |
| 爬爬 | [雨女_Clear](info:info("雨女","Clear")) , [Bio-Engineering_Cloudburst](info:info("Bio-Engineering","Cloudburst")) , [☹_Cloudburst](info:info("☹","Cloudburst")) , [雨之城_Cloudburst](info:info("雨之城","Cloudburst")) , [Contrasty Angeles_Clear](info:info("Contrasty Angeles","Clear")) , [Dogbite_Cloudburst](info:info("Dogbite","Cloudburst")) , [Dogbite_Special](info:info("Dogbite","Special")) , [仮想明日_Drizzle](info:info("仮想明日","Drizzle")) , [Moonflutter_Clear](info:info("Moonflutter","Clear")) , [Oiiaioooooiai_Special](info:info("Oiiaioooooiai","Special")) , [Regnaissance_Drizzle](info:info("Regnaissance","Drizzle")) , [Threat - Metropolis_Sprinkle](info:info("Threat - Metropolis","Sprinkle")) , [Welcome to Milthm_Special](info:info("Welcome to Milthm","Special")) |
| 十返清月 | [樱落繁花_Sprinkle](info:info("樱落繁花","Sprinkle")) , [大月墜落狂想_Drizzle](info:info("大月墜落狂想","Drizzle")) , [大月墜落狂想_Sprinkle](info:info("大月墜落狂想","Sprinkle")) , [白虎蓮華_Sprinkle](info:info("白虎蓮華","Sprinkle")) , [白虎蓮華_Cloudburst](info:info("白虎蓮華","Cloudburst")) |
| 树穴猪 | [IN_Sprinkle](info:info("IN","Sprinkle")) , [Meltovt Necrosys_Sprinkle](info:info("Meltovt Necrosys","Sprinkle")) |
| 王子 | [IN_Sprinkle](info:info("IN","Sprinkle")) |
| 舞仙翼 | [Innocent white_Cloudburst](info:info("Innocent white","Cloudburst")) |
| 嘤箱 | [命日_Drizzle](info:info("命日","Drizzle")) |
| 余火 | [Fly To Meteor （Milthm Edit）_Sprinkle](info:info("Fly To Meteor （Milthm Edit）","Sprinkle")) , [Fly To Meteor （Milthm Edit）_Cloudburst](info:info("Fly To Meteor （Milthm Edit）","Cloudburst")) , [Fly To Meteor （Milthm Edit）_Drizzle](info:info("Fly To Meteor （Milthm Edit）","Drizzle")) , [Fly To Meteor feat.兔柒 （Milthm Edit）_Clear](info:info("Fly To Meteor feat.兔柒 （Milthm Edit）","Clear")) |
| 雨眠 | [Bio-Engineering_Cloudburst](info:info("Bio-Engineering","Cloudburst")) , [OverRain_Cloudburst](info:info("OverRain","Cloudburst")) |
| 云梦 | [雨女_Sprinkle](info:info("雨女","Sprinkle")) , [☹_Cloudburst](info:info("☹","Cloudburst")) , [Fragment of Memories_Cloudburst](info:info("Fragment of Memories","Cloudburst")) , [Kayava_Sprinkle](info:info("Kayava","Sprinkle")) , [Moonflutter_Cloudburst](info:info("Moonflutter","Cloudburst")) , [Threat - Superstructure_Sprinkle](info:info("Threat - Superstructure","Sprinkle")) , [cybernetic blazar_Sprinkle](info:info("cybernetic blazar","Sprinkle")) , [イコラト_Cloudburst](info:info("イコラト","Cloudburst")) |

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
