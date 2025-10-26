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
  - [スコア差分図のYtilaerについて](#スコア差分図のytilaerについて)
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

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

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

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

  [ファイル](https://support.apple.com//102570)アプリでMilthmフォルダを開く：

  ```text
  /data/
  ```

  > ローカルファイルが見つからない場合：「ファイル」ホームページの右上の三点メニューから、ローカルファイルの非表示を解除（[詳細](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)）

- **Windowsユーザー：**  
  エクスプローラーのアドレスバーに以下を入力：  
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

[Androidデモ動画](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[iOSデモ動画](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Androidユーザー[アクセス権限がない場合](#アクセス権限がない場合)

---

### 解析済みデータの入力

ホームページの入力欄に以下の形式でデータを入力：

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5,v3],
    [name,Difficulty, constant, score, acc, level,achievedStatus,isv3?]
}
```

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

計算方法は`PanyiAme`提供、詳細は[Milthmスコアチェック表説明](https://wwp.lanzoup.com/iZ59A2j8nbpe)参照

---

## Milthmについて

[目次に戻る](#目次)

### Reality計算式

Realityはプレイスコアと譜面定数に基づいて計算：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

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

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")) , [Brightened Demonios](info:info("Brightened Demonios","Drizzle")) , [Broken Conviction](info:info("Broken Conviction","Drizzle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")) , [Curse of 14](info:info("Curse of 14","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fluorescent Light](info:info("Fluorescent Light","Drizzle")) , [Fragment of Memories](info:info("Fragment of Memories","Drizzle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")) , [IN](info:info("IN","Drizzle")) , [Kayava](info:info("Kayava","Drizzle")) , [Oniichan](info:info("Oniichan","Drizzle")) , [OverRain](info:info("OverRain","Drizzle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) , [はんてん](info:info("はんてん","Drizzle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")) , [Aleph-0](info:info("Aleph-0","Sprinkle")) , [apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")) , [Broken Conviction](info:info("Broken Conviction","Sprinkle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fluorescent Light](info:info("Fluorescent Light","Sprinkle")) , [Fragment of Memories](info:info("Fragment of Memories","Sprinkle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")) , [Oniichan](info:info("Oniichan","Sprinkle")) , [OverRain](info:info("OverRain","Sprinkle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")) , [仮想明日](info:info("仮想明日","Sprinkle")) , [烁雨](info:info("烁雨","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [はんてん](info:info("はんてん","Sprinkle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Algebra](info:info("Algebra","Cloudburst")) , [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [Fluorescent Light](info:info("Fluorescent Light","Cloudburst")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Kayava](info:info("Kayava","Cloudburst")) , [LOUDER!](info:info("LOUDER!","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")) , [Regnaissance](info:info("Regnaissance","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [Words](info:info("Words","Cloudburst")) , [百九十](info:info("百九十","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [暮予星光](info:info("暮予星光","Cloudburst")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")) , [Myth compiler](info:info("Myth compiler","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")) , [Innocent white](info:info("Innocent white","Cloudburst")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [大月墜落狂想](info:info("大月墜落狂想","Cloudburst")) , [烁雨](info:info("烁雨","Cloudburst")) , [樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) | [HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")) , [Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Icier | [Autumn Rain](info:info("Autumn Rain","Drizzle")) | [Autumn Rain](info:info("Autumn Rain","Sprinkle")) |  |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")) , [Elsorhg](info:info("Elsorhg","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")) , [Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")) , [LOUDER!](info:info("LOUDER!","Drizzle")) , [Moonflutter](info:info("Moonflutter","Drizzle")) , [Sakuyahime](info:info("Sakuyahime","Drizzle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [WATER](info:info("WATER","Drizzle")) , [白虎蓮華](info:info("白虎蓮華","Drizzle")) , [大月墜落狂想](info:info("大月墜落狂想","Drizzle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")) , [イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")) , [Brightened Demonios](info:info("Brightened Demonios","Sprinkle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")) , [Jump out?](info:info("Jump out?","Sprinkle")) , [LOUDER!](info:info("LOUDER!","Sprinkle")) , [Sakuyahime](info:info("Sakuyahime","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [White Lizard](info:info("White Lizard","Sprinkle")) , [白虎蓮華](info:info("白虎蓮華","Sprinkle")) , [大月墜落狂想](info:info("大月墜落狂想","Sprinkle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")) , [花月](info:info("花月","Sprinkle")) , [暮予星光](info:info("暮予星光","Sprinkle")) , [时落之雨](info:info("时落之雨","Sprinkle")) , [夜風](info:info("夜風","Sprinkle")) , [樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")) , [Oniichan](info:info("Oniichan","Cloudburst")) , [Sakuyahime](info:info("Sakuyahime","Cloudburst")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")) , [Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")) , [Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")) , [白虎蓮華](info:info("白虎蓮華","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [花月](info:info("花月","Cloudburst")) , [命日](info:info("命日","Cloudburst")) , [时落之雨](info:info("时落之雨","Cloudburst")) , [夜風](info:info("夜風","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")) , [Algebra](info:info("Algebra","Drizzle")) , [Deluge](info:info("Deluge","Drizzle")) , [Dogbite](info:info("Dogbite","Drizzle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")) , [Garden](info:info("Garden","Drizzle")) , [Hikari](info:info("Hikari","Drizzle")) , [INFP.mp3](info:info("INFP.mp3","Drizzle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")) , [Pthahnil](info:info("Pthahnil","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [Virtual S0da](info:info("Virtual S0da","Drizzle")) , [粗线条的雨](info:info("粗线条的雨","Drizzle")) , [サイクルの欠片](info:info("サイクルの欠片","Drizzle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")) , [Deluge](info:info("Deluge","Sprinkle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")) , [Garden](info:info("Garden","Sprinkle")) , [Hikari](info:info("Hikari","Sprinkle")) , [INFP.mp3](info:info("INFP.mp3","Sprinkle")) , [Innocent white](info:info("Innocent white","Sprinkle")) , [Moonflutter](info:info("Moonflutter","Sprinkle")) , [Pthahnil](info:info("Pthahnil","Sprinkle")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")) , [Virtual S0da](info:info("Virtual S0da","Sprinkle")) , [粗线条的雨](info:info("粗线条的雨","Sprinkle")) , [命日](info:info("命日","Sprinkle")) , [サイクルの欠片](info:info("サイクルの欠片","Sprinkle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")) , [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Deluge](info:info("Deluge","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [Garden](info:info("Garden","Cloudburst")) , [INFP.mp3](info:info("INFP.mp3","Cloudburst")) , [Pthahnil](info:info("Pthahnil","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [粗线条的雨](info:info("粗线条的雨","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [雨女](info:info("雨女","Cloudburst")) , [サイクルの欠片](info:info("サイクルの欠片","Cloudburst")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
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
| 母鸡 | [KASANE](info:info("KASANE","Drizzle")) | [KASANE](info:info("KASANE","Sprinkle")) | [Autumn Rain](info:info("Autumn Rain","Cloudburst")) , [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) |  |  |
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

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**

- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

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
