> 注意：現在のバージョンはAI翻訳のため、正確でない可能性があります。[簡体字中国語](?lang=zh)版へのアクセスを推奨します  
> または[このリポジトリ](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91)で現在の言語の翻訳版にPRを提出できます  
  最終メンテナンスは2025年12月13日  

## 目次

- [Webサイト](#webサイト)
- [スコア計算機の使用方法](#使用方法)
  - [セーブデータのアップロード](#セーブデータのアップロード)
  - [旧バージョンの保存パス](#その他の保存パス)
  - [オンラインサポート](#オンラインサポート)
- [Milthmについて](#milthmについて)
  - [ゲームの基本機能紹介(公式wiki)](https://milthm.com/wiki/hans/manual/features)
  - [Reality 計算式](#reality-計算式)
  - [Score V3アルゴリズム](#score-v3アルゴリズム)
  - [セーブデータファイルについて](#セーブデータファイルについて)
  - [ノーツ判定](#ノーツ判定)
  - [リザルト評価](#リザルト評価)
  - [クリア状況](#クリア状況)
  - [露暁卉庭（ろぎょうきてい）](#露暁卉庭)
  - [綺夢（きむ）](#sweetdream)
  - [隠し曲の解禁方法](#隠し曲の解禁方法)
  - [定数表](#定数表)
  - [コンポーザー統計](#コンポーザー統計)
  - [譜面製作者統計](#譜面製作者統計)
  - [Milthm 独占曲リスト](#milthm-独占曲リスト)
  - [Milthmの開発プロセスを加速させる](#milthmの開発プロセスを加速させる)
- [お問い合わせ](#お問い合わせ)
- [よくある質問](#よくある質問)
- [その他のコンテンツ](#その他のコンテンツ)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm交流グループ](#milthm交流グループ)
  - [ファイルパスとは](#ファイルパスとは)
  - [Reality対照表](#reality対照表)

---

{{updata}}

> 表示が崩れる場合は、[GitHub上で閲覧](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md) してください。

---

## Webサイト

{{web}}

---

## 使用方法

> このスコア計算機はプレイヤーが独自に制作したものであり、公式とは無関係です。

### セーブデータのアップロード

トップページの **「ファイルをアップロード (上传文件)」** オプションをクリックし、セーブデータファイル `saves.db` またはスコア記録ファイル `data.db` を選択してアップロードしてください。

> **注意：**
> - `data.db` には `3.2` アップデート以降のプレイ記録のみが含まれます（データが消失していない場合）。
> - Android版では [MT Manager](https://mt2.cn/) を使用して `sdcard/Android/data` ディレクトリにアクセスすることを推奨します。

#### ファイルパス（詳細は [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) を参照）

[ファイルパスとは](#ファイルパスとは)

{{11}}

  [ファイル](https://support.apple.com//102570) アプリを使用して Milthm フォルダを開きます：

  ```text
  /data/
````

> ローカルファイルが見つからない場合：「ファイル」アプリのトップページ右上にある3点メニューに入り、ローカルファイルの非表示を解除してください（[詳細](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）。

  - **Windows ユーザー：** エクスプローラーのアドレスバーに以下を入力してください：  
    {{12}}

[Android 実演動画](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[iOS 実演動画](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Androidユーザーで[アクセス権限がない場合](https://www.google.com/search?q=%23%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E6%A8%A9%E9%99%90%E3%81%8C%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)

-----

### 旧バージョンの保存パス

アップロード後に解析できない場合は、手動でJSONデータを抽出してアップロードを試みてください：

{{16}}

-----

### オンラインサポート

  - [サポートA(中国語対応)](https://www.deepseek.com/)
  - [サポートB](https://chatgpt.com/)
    問題の説明：理解できない部分をコピーしてTA（AI）に送信してください。

-----

## Milthmについて

[目次に戻る](https://www.google.com/search?q=%23%E7%9B%AE%E6%AC%A1)

### Reality 計算式

Reality の計算は、プレイ時のスコアと譜面定数に基づいています：

{{17}}

単曲 Reality 計算式は以下の通りです（s はスコア、c は定数）：

{{realityv3}}

現在のバージョンでは、旧バージョン(4.0以前)のスコアが1005000以下で、かつAllPerfect以上の評価に達していない場合、reality v2とv3の式を同時に使用し、高い方の値を採用します。以下の通りです：

{{realityv2}}

#### コード実装：

{{realityjs}}

-----

### Score V3アルゴリズム

[公式ドキュメント](https://www.milthm.cn/wiki/hans/blog/2025-08-17)  
コード実装  
{{sv3}}

[score v3 Web計算機](https://mkzi-nya.github.io/mil/)

#### 数学的性質

ドキュメントによると、このアルゴリズムには以下の数学的性質があることがわかります：

  - ExactおよびPerfect以下の判定が複数存在する場合、判定間の距離が最も近い時に減点が最小になります。

  - 全ての判定がPerfectの場合、スコアはちょうど1,000,000になります。

  - AllPerfect判定を達成していない場合、スコアは最高でも1,005,000には達しません。

  - AllPerfect判定を達成した場合、(Score mod 10^6)/10^4 がその判定シーケンスにおけるExact判定の割合、通称「大P率」となります。

  - 他のすべての判定がExact判定である場合：

      - Perfect判定をいくつ出しても、数が同じであれば、異なる位置で出してもスコアは常に同じになります。
      - 単一のGreat/Good判定が出現する場合、または複数のGreat/Good間の`間隔`（物量によって決定）が十分に大きい場合、数が同じであれば異なる位置で出してもスコアは常に同じになります。

    > 上記の特性は`補正`アルゴリズムによるものです。

  - Bad/Miss判定は、シーケンスの先頭と末尾で最も減点が少なくなります。

  - 物量490から、Great判定が存在しても1,000,000点に到達可能です。

    > 物量が860に達すると許容範囲は2Greatに増加し、860以降は物量が**約**120増加するごとに許容範囲が1Great増加します。

>   - ExactとGreat判定のみ存在する場合の最低許容範囲（Great間の間隔が32Exactを超える場合）：
>     物量が1480に達すると2Greatの許容範囲が存在し、以降740物量増加するごとに許容範囲が1Great増加します。

  - 物量1610から、Good判定が存在しても1,000,000点に到達可能です。
    > 以降、物量が**約**199増加するごとに許容範囲が1Good増加します。

>   - ExactとGood判定のみ存在する場合の最低許容範囲（Good間の間隔が48Exactを超える場合）：
>     1610物量増加するごとに許容範囲が1Good増加します。

  - 物量2771から、Bad判定が存在しても1,000,000点に到達可能です。

    > 以降、物量が**約**250増加するごとに許容範囲が1Bad増加します。

  - 物量2801から、Miss判定が存在しても1,000,000点に到達可能です。

    > 以降、物量が**約**280増加するごとに許容範囲が1Miss増加します。

  - プレイ中の右上のリアルタイムスコアは計算の途中経過値を表しており、ある点数以降のノーツを全て放置（Miss）した場合、スコアは急激に低下します。最後のノーツがMiss判定の場合も、補正とAPボーナスの関係でスコアが大幅に減点されます。

-----

## セーブデータファイルについて

以下の部分では、パスを `MilthmDataDirectory` と省略して表記します。

### ゲームセーブデータ

このファイルは `MilthmDataDirectory/saves.db` にあります。

ここにはプレイヤーのゲーム進行状況および関連するゲーム記録データが含まれています。

データはKV（キーバリュー）テーブル内のJSON形式で保存されています（JSON形式は旧バージョンのセーブデータ形式と一致しています）。

### データアーカイブ

このファイルは `MilthmDataDirectory/data.db` にあります。

これは、正常に送信されたスコアデータを保存するために使用されます。

このファイルのデータは、ローカルランキングのデータソースとなります。

-----

## ノーツ判定

判定システムについては、公式wikiの紹介をご覧ください：[判定システム](https://milthm.com/wiki/hans/manual/judgment/)  
ゲーム内の単一ノーツの判定は計5種類に分かれています：

  - **Perfect**：100% のスコアと 100% の ACC を獲得。
  - **perfect**：99% のスコアと 100% の ACC を獲得。
  - **Great**：60% のスコアと 60% の ACC を獲得。
  - **Good**：30% のスコアと 30% の ACC を獲得。
  - **Bad**：コンボ中断、15% のスコアと 15% の ACC を獲得。
  - **Miss**：コンボ中断、スコアと ACC は獲得できません。

各区間内のスコアと精度は正比例の関係にあります。詳細な判定範囲は以下の表の通りです：

{{pdfw}}

-----

## リザルト評価

リザルト評価は8種類に分かれています：
FC（フルコンボ）未達成時は白、FCは青、APは紫になります。
現在のバージョンでは、Milthm以下の評価でAPアイコンを獲得することはできません。

  - <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">：旧版では<img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">と表示、理論値 1,010,000点（RHYTHM of RAIN、全ノーツ満点）を達成。
  - <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M、即ちMilthm。スコアが1,000,000点に達した時に獲得；
  - <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">：スコアが925,000点に達した時に獲得；
  - <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">：スコアが850,000点に達した時に獲得；
  - <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">：スコアが750,000点に達した時に獲得；
  - <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">：スコアが700,000点に達した時に獲得；
  - <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">：スコアが700,000点未満の時に獲得。クリア失敗、FC/APアイコンなし。

-----

## クリア状況

プレイ終了後に譜面で表示される評価は以下の通りです：

  - <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:
      - ACC < 80%
  - <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:
      - ACC > 80%、かつ少なくとも1つの Bad/Miss 判定が存在する。
  - <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:
      - すべてのノーツを ±140ms 以内にヒットし、かつ少なくとも1つの Great/Good 判定が存在する。
  - <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:
      - すべてのノーツを ±70ms 以内にヒットし、かつ少なくとも1つの small perfect 判定が存在する。
  - <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:
      - すべてのノーツを ±35ms 以内にヒット、即ち理論値。
  - <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:
      - AutoPlay を使用してクリア。
  - <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:
      - スコアが 1,010,000点を超える（「土砂降り」を使用）。

-----

## 露暁卉庭（ろぎょうきてい）

露暁卉庭については、公式wikiをご覧ください：[「露暁卉庭」紹介](https://milthm.com/wiki/hans/blog/2025-09-12)

> 以下のドキュメントは時効性があり、実際の状況に準じます。

ここでは、植木鉢をクリックして作物を育てることができます。
「綺夢」モードの楽曲をプレイすることで「露凝（ろぎょう）」を集めることができ、「露凝」を使って水やりをすると作物の成熟を加速できます。
1回の水やりで総時間の20%を短縮でき、クールダウンは総時間の25%です。

> したがって、最短で半分の時間を待つだけで収穫可能です。

収穫時には低確率で収穫量が100%-300%増加することがあり、水やりによって確率を上げることができます。
現在のバージョンには以下の作物があります：

<div style="font-size:10px;">

| 作物 | タイプ | 解禁条件 | 基礎収穫量 | 時間 | 消費材 |
|-|-|-|-|-|-|
| ボタンマッシュルーム | キノコ/食物 | なし | 8 | 1h | なし |
| ジュンサイ | 食物 | Lv3 | 45 | 6h | キノコ*5 |
| ワスレナグサ | 装飾 | Lv4 | 7 | 12h | なし |
| ゴーストプラント | 装飾 | Lv6 | 20 | 1d8h | 装飾*5 |
| ブルーベリー | 食物 | Lv8 | 300 | 4d | 装飾*5 |
| フクロタケ | キノコ/食物 | Lv10 | 18 | 1h | キノコ*5 |

</div>

### 純利益

純利益の計算方法は `基礎収穫量/(時間+消費材コスト)` です。
「マッシュルーム」と「ワスレナグサ」をそれぞれ「キノコ」類と「装飾」類の消費材コストとした場合、純利益は以下の通りです。

<div style="font-size:10px;">

| 作物 | 純利益 |
|-|-|
| ボタンマッシュルーム | 8/h |
| ジュンサイ | 6.8/h |
| ワスレナグサ | 0.58/h |
| ゴーストプラント | 0.57/h |
| ブルーベリー | 3.03/h |
| フクロタケ | 11.08/h |

</div>

ページ左下をクリックして、作物を消費してアップグレードできます。初期はレベル1です。
現バージョンのアップグレードに必要な消費材：

<div style="font-size:10px;">

| レベル | 消費材 | 合計 |
|-|-|-|
| 2 | 食物*5 | 食物*5 |
| 3 | 食物*40 | 食物*45 |
| 4 | 食物*80 | 食物*125 |
| 5 | 食物*100 | 食物*225 |
| 6 | 食物*150 | 食物*375 |
| 7 | 装飾*5 | 食物*375,装飾*5 |
| 8 | 装飾*20 | 食物*375,装飾*20 |
| 9 | 食物*350 | 食物*725,装飾*20 |
| 10 | 装飾*35 | 食物*725,装飾*55 |

</div>

作物を使用して一部の楽曲を交換できます。
現バージョンの楽曲に必要な消費材：

| 植木鉢 | 消費材 |
|-|-|
| 2号 | キノコ*5 |
| 3号 | 食物*80, 装飾*20 |

<div style="font-size:10px;">

| 楽曲 | 消費材 |
|-|-|
| Garden | キノコ*10 |
| Fantasia Sonata Botanical Garden | 装飾*20 |
| Dum! Dum!! Dum!!! | 食物*60 |
| Splash the Beat!! | 食物*300 |
| Sound of Nature | キノコ*30,装飾*80 |
| conflict | キノコ*20,装飾*25 |

</div>

合計：`キノコ`*10, `装飾`*20, `食物`*360
現バージョンですべての楽曲を解禁するには、少なくとも `キノコ`*10, `装飾`*20, `食物`*485 が必要です。
収穫量の確率増加を考慮しない場合、最短（適時の水やり含む）で `28` 時間必要です。
現バージョンでレベル10まで上げるには、`47.5` 時間必要です。
現バージョンで全解禁するには、少なくとも `キノコ`*15, `装飾`*95, `食物`*1165 が必要です。
少なくとも `118` 時間かかります。

-----

## 綺夢（きむ） <a id="sweetdream"></a>

綺夢の遊び方紹介については、公式wikiをご覧ください：[夢の波紋「綺夢」紹介](https://milthm.com/wiki/hans/blog/2025-08-23)

「綺夢」モードをオンにすると、ゲーム内に「夢境純度」ゲージが出現します。
「夢境純度」ゲージの仕組みは以下の通りです（GreatはGoodに分類されます）：
| 難易度 | Good以下の判定ダメージ倍率 | 回復倍率 | Good保護閾値 |
|-|-|-|-|
| Drizzle | 30% | 500% | 90 |
| Sprinkle | 60% | 300% | 80 |
| Cloudburst | 100% | 100% | 60 |
| Clear | 110% | 80% | 50 |
| その他 | 100% | 100% | 60 |

> 洸花（こうか）はHPゲージの上限を上げるだけで、保護閾値は上げません。

| コンボ数 | コンボ回復ボーナス |
|-|-|
| 0~3 | 0 |
| 4~7 | 100% |
| 8~11 | 200% |
| 12~15 | 300% |
| >16 | 400% |

Ex ノーツと Drag ノーツの固定回復量は他のノーツの 30% にすぎず、「コンボ回復ボーナス」効果はこれらに無効です。
単一ノーツの基礎回復値は 0.1 です。
Good 判定の基礎ダメージ量は 12.0、Bad と Miss の基礎ダメージ量は 8.0 です。

現在のコンボ数が > 16 の時：

  * **Cloudburst で単一の Tap または Hold ノーツを Perfect 判定でヒット：**
    最終回復 = 0.1 × 400% × 100% × キャラクターバフ（ここではバフなしと仮定） = 0.4

  * **Cloudburst で単一の Ex または Drag ノーツをヒット：**
    最終回復 = 0.1 × 30% = 0.03

  * **Drizzle で単一の Tap または Hold ノーツを Perfect 判定でヒット：**
    最終回復 = 0.1 × 400% × 500% × キャラクターバフ（ここではバフなしと仮定） = 2.0

  * **Drizzle で単一の Ex または Drag ノーツをヒット：**
    最終回復 = 0.1 × 30% × 500% = 0.15

Drizzle でミスが発生した場合：

  * **単一ノーツで Good 判定が出現：**
    最終損失 = 12.0 × 30% × キャラクターバフ（ここではバフなしと仮定） = 3.6

  * **単一ノーツで Bad または Miss 判定が出現：**
    最終損失 = 8.0 × 30% × キャラクターバフ（ここではバフなしと仮定） = 2.4

さらに、Good 判定によるダメージでHPが保護閾値を下回る場合、保護閾値までしか減りません。
例えば、Drizzle 難易度で、現在HPが 91 の時に Good 判定が出た場合、最終的な損失は 3.6 ではなく 1.0 となります。

-----

## 隠し曲の解禁方法

  - **Regnaissance**

    HYPER MEMORIES を解禁してプレイする；
    プレイ中に背景に白黒のスーザンが現れるので、この時はどのノーツも叩かないでください；
    その後スコアがマイナスになり、同時にスーザンがカラーになります。プレイを続けスコアを > 0 にし、リザルト画面に進むとこの曲が解禁されます。

  - **Contrasty Angeles**

    メインストーリー第1章第6話を閲覧する；
    HYPER MEMORIES をプレイする；
    プレイ中に背景に白黒のスーザンが現れるので、この時はフルコンボを維持してください；
    その後スコアが激減し、同時にスーザンがカラーになります。プレイを続けスコアを > 0 にし、リザルト画面に進むとこの曲が解禁されます。

  - **Dogbite**
    Dogbite CB難易度をプレイし、A以上のランクを獲得する
    1点目を満たした後、Oiiaioooooiaiをプレイし、ノーツが猫に変わった時にフルコンボを維持する（それ以前のノーツは叩いても叩かなくても良い）、この時ノーツを叩くたびに犬の鳴き声がする
    2点目を満たした後、異変が発生し、その後Dogbite SP譜面に突入すれば解禁成功です（クリアの必要はありません）。

    > 注: 「土砂降り」の異変をオンにすることで解禁難易度を下げることができます。

  - **靈**
    「綺夢」モードで、**浅儀洸花**を使用して `Sakuyahime` をプレイすると解禁されます。

-----

## 定数表

[目次に戻る](https://www.google.com/search?q=%23%E7%9B%AE%E6%AC%A1)

{{vhjp-zh}}

-----

## 説明

>   - すべての `SP` および非通常譜面は Reality 計算に含まれません。

現在のバージョンの理論値 Reality は `13.475`（表示は 13.48）
現バージョンで定数が最も高い20曲は以下の通りです：

{{vhjp-zh1}}

-----

## コンポーザー統計

<div style="font-size:10px; white-space:nowrap;">

{{artist}}

</div>

-----

-----

## 譜面製作者統計

<div style="font-size:10px; white-space:nowrap;">

{{charter}}

</div>

-----

## Milthm 独占曲リスト

### 天気予報

| 番号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 1 | Welcome to Milthm | TsukiP |
| 2 | Fantasia Sonata Reflection | PYKAMIA |
| 3 | Fantasia Sonata Sky Syndrome | PYKAMIA |

### 雨の音

| 番号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 4 | 雨之城 (Castle in the Rain) | CsLrisEto |
| 5 | イコラト (eclat) | TsukiP |
| 6 | 雨女 (Ameonna) | TsukiP |

### 甘さと苦さの表裏

| 番号 | 曲名 | 作者 |
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

### 花裳随雨得春遅 (花衣は雨に従い春遅くを得る)

| 番号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 16 | Vestige of Dreams | DRIVE. |
| 17 | 靈 (Rei) | MYTK |

### 夢境カセットテープ

| 番号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 18 | INFP.mp3 | TsukiP |
| 19 | Oniichan | MoryueCi |
| 20 | Moving On | Nastram |
| 21 | サイクルの欠片 (Pieces of the Cycle) | TsukiP |
| 22 | Broken Conviction | Cansol |

### 露暁卉庭

| 番号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 23 | Garden | NceS & All_Life_X & AiSS |
| 24 | Fantasia Sonata Botanical Garden | PYKAMIA |

### Notanote

| 番号 | 曲名 | 作者 |
| ---- | ---- | ---- |
| 25 | 烁雨 (Sparkrain) | ILusMin (Milthm x Notanote Original) |
| 26 | cybernetic blazar | ああああ (Notanote x Milthm Original) |
| 27 | Innocent white | 影虎。 (Notanote x Milthm Original) |

-----

## Milthmの開発プロセスを加速させる

リンクをクリックして Milthm の開発プロセスを加速させる
1，https://github.com/sponsors/morizerodev/  
2，https://afdian.com/a/morizero

-----

## お問い合わせ

{{lx-wm}}

-----

### よくある質問

[目次に戻る](https://www.google.com/search?q=%23%E7%9B%AE%E6%AC%A1)

  - [画像（または他の要素）の生成をクリックしても反応がない](https://www.google.com/search?q=%23%E7%94%BB%E5%83%8F%E3%81%AE%E7%94%9F%E6%88%90%E3%82%92%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%81%97%E3%81%A6%E3%82%82%E5%8F%8D%E5%BF%9C%E3%81%8C%E3%81%AA%E3%81%84)
  - [ファイルが見つからない、またはフォルダが存在しない](https://www.google.com/search?q=%23%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%8C%E8%A6%8B%E3%81%A4%E3%81%8B%E3%82%89%E3%81%AA%E3%81%84%E3%81%BE%E3%81%9F%E3%81%AF%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E3%81%8C%E5%AD%98%E5%9C%A8%E3%81%97%E3%81%AA%E3%81%84)
  - [セーブデータのバックアップ方法](https://www.google.com/search?q=%23%E3%82%BB%E3%83%BC%E3%83%96%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E3%83%90%E3%83%83%E3%82%AF%E3%82%A2%E3%83%83%E3%83%97%E6%96%B9%E6%B3%95)
  - [セーブデータの復元](https://www.google.com/search?q=%23%E3%82%BB%E3%83%BC%E3%83%96%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%BE%A9%E5%85%83)
  - [Reality 計算式](https://www.google.com/search?q=%23reality-%E8%A8%88%E7%AE%97%E5%BC%8F)
  - [ノーツ判定](https://www.google.com/search?q=%23%E3%83%8E%E3%83%BC%E3%83%84%E5%88%A4%E5%AE%9A)

> 基本的な操作を理解していることを確認してください。理解しておらず、自分で学習する気がない場合は、このWebサイトの使用はお勧めしません。

-----

#### 画像（または他の要素）の生成をクリックしても反応がない

  - ネットワークの状態を確認してください。GitHubにアクセスできない場合は、[k9.lv/c/](http://k9.lv/c) にアクセスしてみてください。
  - システム標準のブラウザに変更するか、Chrome、[Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ) などのブラウザを使用してみてください。
    (Baiduや360などのブラウザの使用は推奨しません)
  - それでも問題が解決しない場合は、システムバージョンが低すぎることが原因の可能性があります。

-----

#### ファイルが見つからない、またはフォルダが存在しない

[セーブデータのアップロード](https://www.google.com/search?q=%23%E3%82%BB%E3%83%BC%E3%83%96%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89) で保存パスを確認できます。

#### アクセス権限がない

まず、Milthmのバージョンを確認してください。3.2以上のバージョンに更新後、一度ゲームを起動しないと該当パス内にセーブデータが生成されません。

  - **Android**

    現在システムファイルマネージャーまたはサードパーティ製ファイルマネージャーを使用している場合、他のファイルマネージャーを使用してみてください。
    [MT Manager](https://mt2.cn/) を使用し、アプリ上部のアドレスバーに以下のパスを入力して直接ジャンプすることをお勧めします（複数のユーザーがいる場合、`0` をユーザーIDに変更するか、`/storage/emulated/0/` を `/sdcard/` に変更してください）：

    ```text
    /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
    ```

    右上のブックマーク追加機能や、下部の＋ボタンをスワイプアップしてクイックアクセスすることも可能です。

システム標準のファイルブラウザを使用せず、Androidネイティブの`ファイル`アプリを使用することも試せます。
`ファイル`への入り方の参考：
MT Managerを開く
`インストールパッケージ抽出`をクリック -- `システムアプリ`を選択 -- `ファイル` (Files) を検索 -- `ファイル`をクリックし、左下の`その他`を選択 -- アプリを起動
Milthmのセーブデータフォルダに入った後、`コピー`を選択して内部ストレージ（/storage/emulated/0/、通常は`ファイル`のルートディレクトリ）にコピーし、その後ブラウザからアクセスします。
セーブデータに問題が発生した場合も、同様の方法で修復可能です。詳細は[セーブデータの復元](https://www.google.com/search?q=%23%E3%82%BB%E3%83%BC%E3%83%96%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%BE%A9%E5%85%83)を参照してください。

それでもアクセスできない場合は、PCに接続するか、ADB権限を使用してアクセスするしかありません。
比較的新しいバージョンのAndroidシステムでは、この問題が発生する可能性があります。開発者オプションでUSBデバッグが有効になっており、かつ「ワイヤレスデバッグ」がオンになっている場合、PCなしで [Shizuku](https://shizuku.rikka.app/zh-hans/download/) を使用してワイヤレスADBデバッグを行うことができます。詳細はShizukuの関連ドキュメントを参照してください。

  - **iOS**

    `ファイル` アプリでこの iPhone/iPad のフォルダが見つからない場合、アプリのトップページに行き、右上の設定でローカルファイルが非表示になっていないか確認してください。
    それでも Milthm のフォルダが見つからない場合は、正しい Milthm のバージョンを使用しているか確認してください。
    [iOS 実演動画](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### セーブデータのバックアップ方法

セーブデータディレクトリに入り、dataフォルダ全体を別のパスにコピーしてください。

#### セーブデータの復元

手動でバックアップしたセーブデータを、元のパスのセーブデータファイルに直接上書きすることができます。
予期せぬ事態を防ぐため、スコア確認画像を生成する際、セーブデータをテキスト形式で画像内に埋め込んでいます(~~画像をテキストとして開くことで直接確認できます~~)。
~~スコア確認画像を直接アップロードしてスコアを確認することもできます。~~
スコア確認画像を [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html) にアップロードした後、ダウンロードをクリックして生成されたセーブデータファイル（ストーリー進行度は含まれず、私(mkzi-nya/帰夢)のデータが直接コピーされたものになります）を使用し、元のパスのセーブデータを置き換えることができます。

## その他のコンテンツ

[目次に戻る](https://www.google.com/search?q=%23%E7%9B%AE%E6%AC%A1)

### Milthm Wiki

{{wiki}}

### Milthm交流グループ

{{qy}}

### ファイルパスとは

ファイルパスとは、ファイルシステム内のある一意の位置を指す文字列表現であり、通常はディレクトリツリー構造を採用しています。OSによって、`/`、``、`:` などの異なる区切り文字が使用されます。パスには絶対パスと相対パスがあり、フォルダとファイル間の関係を示し、URLを構築する際にも非常に重要です。

#### Androidのファイルパス

  - **外部ストレージ：**
    `/storage/emulated/ユーザーID（デフォルトのメインユーザーは 0）/` または `/sdcard/` 下にあり、この部分のファイルはユーザーが閲覧可能です。
  - **アプリデータディレクトリ：**
    通常 `/storage/emulated/0/Android/data/パッケージ名/` にあります。例：
    ```
    /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
    ```
    Milthm のセーブデータディレクトリは以下にあります：
    ```
    /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
    ```
    システムによってアクセスがブロックされる場合は、PCに接続するか、ファイルマネージャーにADB権限を付与してみてください。

-----

## Reality対照表

<div>
<label for="constantInput">定数を入力:<label>
<input id="constantInput" type="number" step="0.01" placeholder="数値を入力" oninput="updateOutput()">

<pre><code id="output"></code></pre>

</div>