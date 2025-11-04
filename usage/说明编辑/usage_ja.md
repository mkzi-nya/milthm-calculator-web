> 注意：現在のバージョンはAI翻訳のため、正確でない可能性があります。[簡体字中国語](?lang=zh)版へのアクセスを推奨します  
> または[このリポジトリ](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91)で現在の言語の翻訳版にPRを提出できます  
  最終メンテナンスは2025年7月5日  

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
  - [セーブファイルについて](#セーブファイルについて)
  - [ノーツ判定](#ノーツ判定)
  - [結果評価](#結果評価)
  - [クリア状態](#クリア状態)
  - [エイプリルフール](#エイプリルフール)
  - [隠し曲の解放方法](#隠し曲の解放方法)
  - [難易度表](#難易度表)
  - [譜面作者統計](#譜面作者統計)
  - [Milthm開発を加速](#milthm開発を加速)
- [お問い合わせ](#お問い合わせ)
- [よくある質問](#よくある質問)
- [その他](#その他)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流グループ](#milthm交流グループ)
  - [ファイルパスとは](#ファイルパスとは)
  - [Reality対照表](#reality対照表)

---

{{updata}}

> 表示に問題がある場合は[GitHubで閲覧](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## ウェブサイト

{{网站}}

---

## 使用方法

> スコアチェッカーはプレイヤーが独自に作成したもので、公式とは無関係です

### セーブファイルのアップロード

ホームページの「ファイルをアップロード」を選択し、セーブファイル`saves.db`またはスコア記録ファイル`data.db`をアップロードします。

> **注意：**
> - `data.db`には`3.2`アップデート後のプレイ記録のみが含まれます（失われていない場合）
> - Android端末では[MTマネージャー](https://mt2.cn/)を使用して`sdcard/Android/data`ディレクトリにアクセスすることを推奨します

#### ファイルパス（詳細は[Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)参照）

[ファイルパスとは](#ファイルパスとは)

{{11}}

  [ファイル](https://support.apple.com//102570)アプリでMilthmフォルダを開く：

  ```text
  /data/
  ```

  > ローカルファイルが見つからない場合：「ファイル」ホームページの右上の三点メニューから、ローカルファイルの非表示を解除（[詳細](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）

- **Windowsユーザー：**  
  エクスプローラーのアドレスバーに以下を入力：  
  {{12}}

[Androidデモ動画](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[iOSデモ動画](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Androidユーザー[アクセス権限がない場合](#アクセス権限がない場合)

---

### 解析済みデータの入力

ホームページの入力欄に以下の形式でデータを入力：

{{13}}

ここで：
- `acc`は精度を小数で表記；
- `level`は評価を表し、定義は以下：

{{14}}

---

### 旧バージョンのセーブ

`Milthm 3.2`以前のセーブはモバイル端末で直接抽出できません。以下の方法を試してください：

{{15}}

---

### その他のセーブパス

アップロード後に解析できない場合、手動でJSONデータを抽出してアップロード：

{{16}}

---

## レーダーチャート

計算方法は`PanyiAme`提供、詳細は[Milthmスコアチェック表説明](https://wwp.lanzoup.com/iZ59A2j8nbpe)参照

---

## Milthmについて

[目次に戻る](#目次)

### Reality計算式

Realityはプレイスコアと譜面定数に基づいて計算：

{{17}}

単曲Reality計算式（sはスコア、cは定数）：

{{reality公式}}

[Reality対照表](#reality対照表)

#### コード実装：

{{公式js}}

---

## スコア差分図のYtilaerについて

この値に実質的な意味はありません。詳細は以下の通り：
- b20の平均スコアが1005kを超える場合、この値は実際のRealityと等しい
- この値は20曲のreality(平均スコア,平均単曲rlt)の最大値

## セーブファイルについて

以下の部分では、パスは`MilthmDataDirectory`と略記されます。

### ゲームセーブ  
このファイルは`MilthmDataDirectory/saves.db`にあります。

プレイヤーのゲーム進行状況と関連するゲーム記録データを含みます。

データはkvテーブルにjson形式で保存（json形式は旧バージョンのセーブデータ形式と一致）

### データセーブ  
このファイルは`MilthmDataDirectory/data.db`にあります。

成功したスコアデータの各提出を保存するために使用されます。

このファイルのデータはローカルランキングのデータソースです。

---

## ノーツ判定

ゲーム内の単一ノーツの判定は5種類：

- **Perfect**：101%スコアと100% ACCを獲得
- **perfect**：精度に基づき75%-101%スコアと100% ACCを獲得
- **Good**：精度に基づき30%-75%スコアと50% ACCを獲得
- **Bad**：コンボ中断、0%-30%スコアと10% ACCを獲得
- **Miss**：コンボ中断、スコアとACCを獲得しない

各範囲内のスコアと精度は正比例関係、詳細な判定範囲は下表：

{{判定范围}}

---

## 結果評価

結果評価は8種類：  
FC(フルコンボ)未達成時は白色、FCは青色、APは紫色  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">：旧版では<img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">と表示、理論値1010000点達成（RHYTHM of RAIN、全ノーツ満点）
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M、即ちMilthm、スコア1005000点達成で獲得
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">：スコア950000点達成で獲得
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">：スコア900000点達成で獲得
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">：スコア850000点達成で獲得
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">：スコア800000点達成で獲得
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">：スコア800000点未満で獲得、未クリア、FC/APアイコンなし

---

## クリア状態

プレイ終了後に譜面に表示される評価：

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC > 80%、かつBad/Miss判定が1つ以上存在
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:  
  - 全ノーツが±140ms以内にヒット、かつGood判定が1つ以上存在
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:  
  - 全ノーツが±70ms以内にヒット、かつsmall perfect判定が1つ以上存在
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:  
  - 全ノーツが±35ms以内にヒット、即ち理論値
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:  
  - AutoPlay使用でクリア
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:  
  - スコア1010000点超（傾盆大雨使用）

---

## エイプリルフール

### 攻略（参考）
- ゲーム開始後、悪夢モードで`CB`難易度の任意の曲をプレイ、プレイ中に難易度表示が変化し、全ボタンが雨に変換、スコア上昇が極端に遅い
- プレイ後、ポップアップが表示、確認後戻ると全曲のレベルが約20倍に変化（[参照](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)）、UserRealityが20倍（エイプリルフール定数とは無関係）
- 再度任意の譜面をプレイ後ポップアップ表示、30レベル以上の譜面が除去
- 16レベル以上の譜面をプレイしてストーリー進入、`Rainbow Flavor!`のエイプリルフール譜面が解放、ゲームクラッシュ
- その後ルーミヤクミニゲームが出現、一定ラウンドクリアで2枚目のエイプリルフール譜面解放

---

## 隠し曲の解放方法

- **Regnaissance**

  HYPER MEMORIESを解放してプレイ；  
  プレイ中に背景に白黒のスーザンが出現、この時ノーツを打たない；  
  その後スコアが負数に、スーザンがカラーに、継続プレイでスコア>0に、結果画面後解放

- **Contrasty Angeles**

  Regnaissance解放後、メインストーリー第1章第6話を閲覧；  
  HYPER MEMORIESをプレイ；  
  プレイ中に背景に白黒のスーザンが出現、フルコンボ維持；  
  その後スコア急減、スーザンがカラーに、継続プレイでスコア>0に、結果画面後解放

- **Dogbite**
- Dogbite CB難易度でA以上評価獲得
- 上記達成後、Oiiaioooooiaiをプレイ、ノーツが猫に変化時フルコンボ維持（以前のノーツは打っても打たなくても良い）、各ノーツヒットで犬の鳴き声
- 上記達成後、異変発生、Dogbite SP譜面進入、解放成功（クリア不要）
  
- 注: `傾盆大雨`異変を有効にして解放難易度を低下可能

---

## 難易度表

[目次に戻る](#目次)

{{章节ja}}

---

## 説明

> - 全ての`SP`と非通常譜面はReality計算に含まれません  
> - 精度理由により、現在のバージョンでは11.9定数の曲は全て11.9未満。例：あるバージョンの理論Realityが`13.005`の場合、ゲーム内では`13.00`と表示（`13.01`ではない）、実際の計算は`13.004999…`

現在のバージョンの理論Realityは`12.725`（表示12.72）  
現在のバージョンで定数最高の20曲：

{{章节ja1}}

---

## 譜面作者統計

<div style="font-size:10px;">

{{charter}}

</div>

---

## Milthm開発を加速

リンクをクリックしてMilthm開発を加速  
1，https://github.com/sponsors/morizerodev/  
2，https://afdian.com/a/morizero

---

## お問い合わせ

{{联系我们}}

---

### よくある質問

[目次に戻る](#目次)

- [画像生成（他の要素）が反応しない](#画像生成（他の要素）が反応しない)
- [ファイルが見つからない/フォルダが存在しない](#ファイルが見つからない/フォルダが存在しない)
- [セーブのバックアップ方法](#セーブのバックアップ方法)
- [セーブの復元](#セーブの復元)
- [Reality計算式](#reality計算式)
- [ノーツ判定](#ノーツ判定)

> 基本的な操作を理解していることを確認してください。理解せず自ら学ぶ意思がない場合、このサイトの使用は推奨しません

---

#### 画像生成（他の要素）が反応しない

- ネットワーク状態を確認。GitHubにアクセスできない場合、[k9.lv/c/](http://k9.lv/c)へ
- システム標準ブラウザやChrome、[Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ)などに変更  
  (百度、360などのブラウザは非推奨)
- 問題が続く場合、システムバージョンが古い可能性

---

#### ファイルが見つからない/フォルダが存在しない

[セーブファイルのアップロード](#セーブファイルのアップロード)でセーブパスを確認  

#### アクセス権限がない

まずMilthmのバージョンを確認。3.2以上に更新後、ゲームを1回起動してこのパスにセーブを生成する必要あり
- **Android**

  現在システムのファイルマネージャーまたはサードパーティ製のファイルマネージャーを使用している場合、別のファイルマネージャーでアクセスを試みてください。  
  おすすめは[MTマネージャー](https://mt2.cn/)を使用し、アプリ上部のアドレスバーに以下のパスを直接入力して移動することです（複数ユーザーがいる場合は`0`をユーザーIDに変更するか、`/storage/emulated/0/`を`/sdcard/`に変更してください）：
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  右上隅からブックマークを追加し、下部で上にスワイプして+ボタンでクイックアクセスも可能です。  

システム組み込みのファイルブラウザを使用せず、Android純正の「ファイル」アプリを使用することも試してください。  
「ファイル」の起動方法：  
MTマネージャーを開く  
「パッケージ抽出」をタップ→「システムアプリ」を選択→「ファイル」を検索→「ファイル」をタップし、左下の「その他」→「アプリを起動」を選択  
milthmのセーブデータフォルダに入った後、「コピー先」を選択して内部ストレージ（/storage/emulated/0/、通常は「ファイル」アプリのルートディレクトリ）にコピーし、ブラウザからアクセス可能  
セーブデータに問題がある場合も同様の方法で修復可能です。詳細は[セーブデータの復元](#セーブデータの復元)を参照  

それでもアクセスできない場合は、PCに接続するかADB権限を使用する必要があります。  
Androidのバージョンが高い場合、この問題が発生する可能性があります。開発者オプションでUSBデバッグを有効にし、「ワイヤレスデバッグ」をオンにしている場合、PCなしで[Shizuku](https://shizuku.rikka.app/zh-hans/download/)を使用してワイヤレスADBデバッグが可能です。詳細はShizukuの関連ドキュメントを参照してください。

- **iOS**

  「ファイル」アプリでiPhone/iPadのフォルダが見つからない場合、アプリホームに移動し、右上の設定でローカルファイルが非表示になっていないか確認してください。  
  それでもMilthmのフォルダが見つからない場合は、正しいMilthmバージョンを使用しているか確認してください。  
  [iOSデモ動画](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### セーブデータのバックアップ方法

セーブディレクトリに入り、dataフォルダ全体を別のパスにコピーします

#### セーブデータの復元

手動でバックアップしたセーブデータを元のパスのファイルに上書きできます  
万が一に備え、スコア画像生成時にはセーブデータをテキスト形式で画像に埋め込んでいます(~~画像をテキストで開いて直接確認可能~~)  
~~スコア画像をアップロードしてスコアを確認できます~~  
スコア画像を[http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html)にアップロード後、ダウンロードをクリックしてセーブファイルを生成できます（ストーリー進捗は含まれず、直接私(mkzi-nya/帰夢)のものをコピーしたものです）、元のパスのセーブデータと置き換えてください  

## その他の内容

[目次に戻る](#目次)

### Milthm Wiki

{{wiki}}

### Milthm交流グループ

{{群}}

### ファイルパスとは

ファイルパスとは、ファイルシステム内の特定の場所を一意に指し示す文字列表現で、通常はディレクトリツリー構造を採用しています。異なるOSは異なる区切り文字を使用します。パスは絶対パスまたは相対パスで、フォルダとファイル間の関係を表し、URL構築時にも重要です。

#### Androidファイルパス

- **外部ストレージ：**  
  `/storage/emulated/ユーザーID（デフォルトのメインユーザーは0）/`または`/sdcard/`にあり、この部分のファイルはユーザーが閲覧可能です。
- **アプリデータディレクトリ：**  
  通常は`/storage/emulated/0/Android/data/パッケージ名/`にあります。例：  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Milthmのセーブディレクトリは：  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  システムがアクセスをブロックしている場合は、PCに接続するかファイルマネージャーにADB権限を付与してください。

---

### Reality対照表

{{reality表}}
