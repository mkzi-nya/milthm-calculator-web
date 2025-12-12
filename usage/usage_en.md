> Note: The current version is AI-translated and may not be fully accurate. Please visit the [Simplified Chinese](?lang=zh) version  
> Alternatively, you can submit a PR for this language's translation at [this repository](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91)  
  Last maintained on July 5, 2025  

## Table of Contents

- [Website](#website)
- [Usage Guide](#usage-guide)
  - [Upload Save File](#upload-save-file)
  - [Input Parsed Data](#input-parsed-data)
  - [Legacy Version Saves](#legacy-version-saves)
  - [Alternative Save Paths](#alternative-save-paths)
  - [Radar Chart](#radar-chart)
- [About Milthm](#about-milthm)
  - [Reality Calculation Formula](#reality-calculation-formula)
  - [About Save Files](#about-save-files)
  - [Note Judgments](#note-judgments)
  - [Result Ratings](#result-ratings)
  - [Completion Status](#completion-status)
  - [April Fools' Event](#april-fools-event)
  - [Hidden Song Unlock Methods](#hidden-song-unlock-methods)
  - [Difficulty Table](#difficulty-table)
  - [Chart Creator Statistics](#chart-creator-stats)
  - [Click to Accelerate Milthm Development](#click-to-accelerate-milthm-development)
- [Contact Us](#contact-us)
- [FAQ](#faq)
- [Additional Content](#additional-content)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm Community Group](#milthm-community-group)
  - [What is a File Path](#what-is-a-file-path)
  - [Reality Reference Table](#reality-reference-table)

---

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

> If rendering issues occur, please [visit on GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## Website

- [k9.lv/c/](htt://k9.lv/c/)
- [mhtlim.top](https://mhtlim.top/)
- [mhtl.im](https://mhtl.im)
> 以上网站由_4everDimensions托管
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/)
> 以上网站由mkzi_nya托管

---

## Usage Guide

> This score calculator is fan-made and not officially affiliated.

### Upload Save File

Click **"Upload File"** on the homepage and select either the save file `saves.db` or score record file `data.db`.

> **Note:**  
> - `data.db` only contains records after the `3.2` update (if not lost).  
> - Android users are recommended to use [MT Manager](https://mt2.cn/) to access the `sdcard/Android/data` directory.  

#### File Paths (see [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[What is a file path](#what-is-a-file-path)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

  Use the [Files](https://support.apple.com//102570) app to open the Milthm folder:

  ```text
  /data/
  ```

  > If local files are missing: Enable "On My iPhone" visibility via the three-dot menu in Files app ([details](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Windows Users:**  
  Enter in File Explorer address bar:  
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

[Android Demo Video](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[iOS Demo Video](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Android users [without access permissions](#no-access-permissions)

---

### Input Parsed Data

Enter data in the homepage input box with this format:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5,v3],
    [name,Difficulty, constant, score, acc, level,achievedStatus,isv3?]
}
```

Where:  
- `acc` is accuracy as a decimal;  
- `level` represents the rating, defined as:  

{{14}}

---

### Legacy Version Saves

Pre-`Milthm 3.2` saves cannot be directly extracted on mobile. Try:  

{{15}}

---

### Alternative Save Paths

If parsing fails after upload, manually extract JSON data and upload:  

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

## Radar Chart

Calculation method provided by `PanyiAme`. See [Milthm Score Calculator Notes](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## About Milthm

[Back to Top](#table-of-contents)

### Reality Calculation Formula

Reality is calculated based on score and chart difficulty:  

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Single-song Reality formula (where s = score, c = difficulty):  

{{reality}}
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

[Reality Reference Table](#reality-reference-table)

#### Code Implementation:  

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

## About Ytilaer in Score Graphs

This value has no practical meaning:  
- Matches actual Reality if b20 average score > 1005k.  
- Represents the maximum Reality value among 20 songs (average score, average single-song rlt).  

## About Save Files

Paths are abbreviated as `MilthmDataDirectory` below.

### Game Saves  
Located at `MilthmDataDirectory/saves.db`.  

Contains player progress and game records stored in JSON format within a key-value table.  

### Data Saves  
Located at `MilthmDataDirectory/data.db`.  

Stores all successfully submitted scores and serves as the source for local leaderboards.  

---

## Note Judgments

Five judgment types per note:  
- **Perfect**: 101% score, 100% ACC.  
- **perfect**: 75%-101% score (scaled), 100% ACC.  
- **Good**: 30%-75% score, 50% ACC.  
- **Bad**: Breaks combo, 0%-30% score, 10% ACC.  
- **Miss**: Breaks combo, 0 score/ACC.  

Score/ACC scales linearly within ranges. Full details:  

{{判定范围}}

---

## Result Ratings

Eight rating tiers (white without FC, blue for FC, purple for AP):  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">: Legacy display <img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">. Achieved at theoretical 1,010,000 ("RHYTHM of RAIN" full-perfect).  
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: "M" (Milthm) at 1,005,000.  
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">: Awarded at 950,000.  
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">: Awarded at 900,000.  
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">: Awarded at 850,000.  
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">: Awarded at 800,000.  
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">: Below 800,000 (fail).  

---

## Completion Status

Post-game evaluations:  
- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">: ACC < 80%.  
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">: ACC > 80% with Bad/Miss.  
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">: All notes hit within ±140ms (with Good).  
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">: All notes within ±70ms (with small perfect).  
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">: All notes within ±35ms (theoretical max).  
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">: AutoPlay clear.  
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">: Score > 1,010,000 (via "Downpour").  

---

## April Fools' Event

### Guide (unofficial)  
- Enable Nightmare mode and play any CB-difficulty chart. Notes turn into raindrops with slow scoring.  
- Post-game prompt alters all chart levels (~20x multiplier) and UserReality.  
- Play any chart >16 difficulty to unlock April Fools' chart "Rainbow Flavor!", then game crashes.  
- Duck-themed minigame unlocks after rounds, granting a second April Fools' chart.  

---

## Hidden Song Unlock Methods

- **Regnaissance**  
  Play HYPER MEMORIES; ignore black/white Susan visuals until score turns negative, then recover to >0.  
- **Contrasty Angeles**  
  After unlocking Regnaissance, play HYPER MEMORIES while maintaining FC during Susan visuals.  
- **Dogbite**  
  Achieve A+ on CB difficulty, then play Oiiaioooooiai while hitting all cat-shaped notes (triggers SP chart).  
  *Tip: Use "Downpour" to reduce difficulty.*  

---

## Difficulty Table

[Back to Top](#table-of-contents)

- [Description](#description)
- [Main Chapter](#introduction---weather-report)
  - [Weather Report](#introduction---weather-report)
  - [Rainfall Sounds](#prologue---rainfall-sounds)
  - [The Sides of Bitter and Sweet](#chapter1---the-sides-of-bitter-and-sweet)
- [Collaboration](#collaboration---rain-world)
  - [Rain World](#collaboration---rain-world)
  - [Notanote](#collaboration---notanote)
  - [Electrode Core](#collaboration---electrode-core)
- [Single](#single---dream-tape)
  - [Dream Tape](#single---dream-tape)
  - [Gathering Blossoms Under Rain](#single---gathering-blossoms-under-rain)

> - SP/challenge charts excluded from Reality calculations.  
> - Due to rounding, displayed Reality may differ (e.g., 13.005 → 13.00).  

Current theoretical max Reality: `12.725` (displayed as 12.72)  
Top 20 hardest charts:  

> Click the link to view the detailed information of the track/chart.
> The track/chart details are sourced from Milthm Lang's repository [RainSeek.Dataset.Milthm](https://github.com/MilthmLang/RainSeek.Dataset.Milthm/), with permission granted for use.

| Rank | Title                   | Difficulty | Constant |
|------|-------------------------|------------|----------|
| 1 | [靈](info:info("靈", "Cloudburst")) | CB | 12.8 |
| 2 | [命日](info:info("命日", "Clear")) | CL | 12.7 |
| 3 | [Contrasty Angeles](info:info("Contrasty Angeles", "Clear")) | CL | 12.5 |
| 4 | [大月墜落狂想](info:info("大月墜落狂想", "Cloudburst")) | CB | 12.4 |
| 5 | [Regnaissance](info:info("Regnaissance", "Clear")) | CL | 12.1 |
| 5 | [Innocent white](info:info("Innocent white", "Cloudburst")) | CB | 12.1 |
| 5 | [Splash the Beat!!](info:info("Splash the Beat!!", "Cloudburst")) | CB | 12.1 |
| 8 | [灯ノ桜蝶](info:info("灯ノ桜蝶", "Cloudburst")) | CB | 12.0 |
| 8 | [Meltovt Necrosys](info:info("Meltovt Necrosys", "Cloudburst")) | CB | 12.0 |
| 10 | [Broken Conviction](info:info("Broken Conviction", "Clear")) | CL | 11.9 |
| 10 | [Sakuyahime](info:info("Sakuyahime", "Cloudburst")) | CB | 11.9 |
| 12 | [百九十](info:info("百九十", "Cloudburst")) | CB | 11.8 |
| 12 | [HYPER MEMORIES](info:info("HYPER MEMORIES", "Cloudburst")) | CB | 11.8 |
| 14 | [Moonflutter](info:info("Moonflutter", "Clear")) | CL | 11.7 |
| 14 | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit")) | CL | 11.7 |
| 14 | [Brightened Demonios](info:info("Brightened Demonios", "Cloudburst")) | CB | 11.7 |
| 17 | [KASANE](info:info("KASANE", "Cloudburst")) | CB | 11.6 |
| 17 | [Threat - Metropolis](info:info("Threat - Metropolis", "Cloudburst")) | CB | 11.6 |
| 17 | [Contrasty Angeles](info:info("Contrasty Angeles", "Cloudburst")) | CB | 11.6 |
| 20 | [Broken Conviction](info:info("Broken Conviction", "Cloudburst")) | CB | 11.5 |
| 20 | [Vestige of Dreams](info:info("Vestige of Dreams", "Cloudburst")) | CB | 11.5 |

---

## Introduction - Weather Report

| Title                | DZ   | SK   | CB   | CL   | SP |
|---------------------|------|------|------|------|---|
| [Welcome to Milthm](info:info("Welcome to Milthm"))  | [1.0](info:info("Welcome to Milthm", "Drizzle")) | -  | - | - | [SP](info:info("Welcome to Milthm", "Special")) |
| [时落之雨](info:info("时落之雨"))           | [1.0](info:info("时落之雨", "Drizzle"))  | [4.5](info:info("时落之雨", "Sprinkle"))  | [8.5](info:info("时落之雨", "Cloudburst"))  | -    | - |
| [夜風](info:info("夜風"))               | [3.0](info:info("夜風","Drizzle"))  | [7.3](info:info("夜風", "Sprinkle"))  | [10.1](info:info("夜風", "Cloudburst")) | -    | - |
| [花月](info:info("花月"))               | [2.0](info:info("花月", "Drizzle"))  | [8.2](info:info("花月", "Sprinkle"))  | [9.3](info:info("花月", "Cloudburst"))  | -    | - |
| [暮予星光](info:info("暮予星光"))           | [2.0](info:info("暮予星光", "Drizzle"))  | [7.5](info:info("暮予星光", "Sprinkle"))  | [9.1](info:info("暮予星光", "Cloudburst")) | -    | - |
| [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome"))           | [2.5](info:info("Fantasia Sonata Sky Syndrome", "Drizzle"))  | [7.1](info:info("Fantasia Sonata Sky Syndrome", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Sky Syndrome", "Cloudburst")) | -    | - |

---

## Prologue - Rainfall Sounds

| Title        | DZ   | SK   | CB   | CL   |
|--------------|------|------|------|------|
| [LOUDER!](info:info("LOUDER!"))  | [2.0](info:info("LOUDER!", "Drizzle"))  | [5.5](info:info("LOUDER!", "Sprinkle"))  | [9.5](info:info("LOUDER!", "Cloudburst")) | - |
| [雨女](info:info("雨女"))          | [3.0](info:info("雨女", "Drizzle")) | [6.5](info:info("雨女", "Sprinkle")) | [9.5](info:info("雨女", "Cloudburst")) | [10.5](info:info("雨女", "Clear")) |
| [雨之城](info:info("雨之城"))        | [1.0](info:info("雨之城", "Drizzle"))  | [4.0](info:info("雨之城", "Sprinkle"))  | [7.5](info:info("雨之城", "Cloudburst"))  | -    |
| [Jump out?](info:info("Jump out?"))     | [2.0](info:info("Jump out?", "Drizzle"))  | [7.9](info:info("Jump out?", "Sprinkle"))  | [9.7](info:info("Jump out?", "Cloudburst"))  | -    |
| [☹](info:info("☹"))      | [4.0](info:info("☹", "Drizzle"))  | [8.0](info:info("☹", "Sprinkle"))  | [10.1](info:info("☹", "Cloudburst")) | -    |
| [イコラト](info:info("イコラト"))      | [3.0](info:info("イコラト", "Drizzle"))  | [8.7](info:info("イコラト", "Sprinkle"))  | [11.2](info:info("イコラト", "Cloudburst")) | -    |
| [命日](info:info("命日"))          | [3.0](info:info("命日", "Drizzle"))  | [8.6](info:info("命日", "Sprinkle"))  | [11.1](info:info("命日", "Cloudburst")) | [12.7(12.2)](info:info("命日", "Clear")) |

---

## Chapter1 - The Sides of Bitter and Sweet

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [粗线条的雨](info:info("粗线条的雨"))         | [1.0](info:info("粗线条的雨", "Drizzle"))  | [4.0](info:info("粗线条的雨", "Sprinkle"))  | [8.3](info:info("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](info:info("Aconsma"))            | [1.0](info:info("Aconsma", "Drizzle"))  | [6.0](info:info("Aconsma", "Sprinkle"))  | [9.3](info:info("Aconsma", "Cloudburst"))  | -    |
| [OverRain](info:info("OverRain"))           | [2.0](info:info("OverRain", "Drizzle"))  | [7.6](info:info("OverRain", "Sprinkle"))  | [10.0](info:info("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](info:info("Fragment of Memories")) | [2.0](info:info("Fragment of Memories", "Drizzle"))  | [8.4](info:info("Fragment of Memories", "Sprinkle"))  | [11.3](info:info("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](info:info("HYPER MEMORIES"))     | [3.0](info:info("HYPER MEMORIES", "Drizzle"))  | [8.9](info:info("HYPER MEMORIES", "Sprinkle"))  | [11.8(11.7)](info:info("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](info:info("Regnaissance"))       | [4.5](info:info("Regnaissance", "Drizzle"))  | [8.5](info:info("Regnaissance", "Sprinkle"))  | [11.1](info:info("Regnaissance", "Cloudburst")) | [12.1](info:info("Regnaissance", "Clear")) |
| [Contrasty Angeles](info:info("Contrasty Angeles"))  | [4.0](info:info("Contrasty Angeles", "Drizzle"))  | [9.0](info:info("Contrasty Angeles", "Sprinkle"))  | [11.6(11.5)](info:info("Contrasty Angeles", "Cloudburst")) | [12.5(12.3)](info:info("Contrasty Angeles", "Clear")) |
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

## Collaboration - Rain World

| Title                       | DZ   | SK   | CB   | CL   |
|-----------------------------|------|------|------|------|
| [Sundown](info:info("Sundown"))                | [1.0](info:info("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](info:info("Bio-Engineering"))        | [2.0](info:info("Bio-Engineering", "Drizzle"))  | [8.3](info:info("Bio-Engineering", "Sprinkle"))  | [9.6](info:info("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](info:info("Threat - Sky Islands"))   | [2.0](info:info("Threat - Sky Islands", "Drizzle"))  | [6.9](info:info("Threat - Sky Islands", "Sprinkle"))  | [10.6](info:info("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](info:info("Threat - Superstructure")) | [2.0](info:info("Threat - Superstructure", "Drizzle"))  | [5.5](info:info("Threat - Superstructure", "Sprinkle"))  | [10.3](info:info("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](info:info("White Lizard"))           | -    | [4.0](info:info("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex")) | [2.0](info:info("Threat - Waterfront Complex", "Drizzle"))  | [7.6](info:info("Threat - Waterfront Complex", "Sprinkle"))  | [10.7](info:info("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](info:info("Kayava"))                 | [3.0](info:info("Kayava", "Drizzle"))  | [5.5](info:info("Kayava", "Sprinkle"))  | [10.4](info:info("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](info:info("Threat - Metropolis"))    | [2.0](info:info("Threat - Metropolis", "Drizzle"))  | [6.6](info:info("Threat - Metropolis", "Sprinkle"))  | [11.6(11.5)](info:info("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](info:info("Sheer Ice Torrent"))      | [2.0](info:info("Sheer Ice Torrent", "Drizzle"))  | [7.8](info:info("Sheer Ice Torrent", "Sprinkle"))  | [11.1](info:info("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](info:info("大月墜落狂想")) | [2.0](info:info("大月墜落狂想", "Drizzle"))  | [8.0](info:info("大月墜落狂想", "Sprinkle"))  | [12.4(12.2)](info:info("大月墜落狂想", "Cloudburst")) | -    |

---

## Collaboration - Notanote

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [烁雨](info:info("烁雨"))             | [2.0](info:info("烁雨", "Drizzle"))  | [7.0](info:info("烁雨", "Sprinkle"))  | [9.4](info:info("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](info:info("cybernetic blazar")) | [4.0](info:info("cybernetic blazar", "Drizzle"))  | [7.8](info:info("cybernetic blazar", "Sprinkle"))  | [10.2](info:info("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](info:info("Innocent white"))    | [2.0](info:info("Innocent white", "Drizzle"))  | [8.2](info:info("Innocent white", "Sprinkle"))  | [12.1](info:info("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](info:info("Elsorhg"))           | [2.0](info:info("Elsorhg", "Drizzle"))  | [7.5](info:info("Elsorhg", "Sprinkle"))  | [10.9](info:info("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](info:info("Meltovt Necrosys"))  | [2.0](info:info("Meltovt Necrosys", "Drizzle"))  | [7.8](info:info("Meltovt Necrosys", "Sprinkle"))  | [12.0(11.9)](info:info("Meltovt Necrosys", "Cloudburst"))  | -    |

---

## Collaboration= - Electrode Core

| Title              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [はんてん](info:info("はんてん"))             | [2.0](info:info("はんてん", "Drizzle"))  | [6.1](info:info("はんてん", "Sprinkle"))  | [10.1](info:info("はんてん", "Cloudburst"))  | -    |
| [Curse of 14](info:info("Curse of 14"))           | [3.0](info:info("Curse of 14", "Drizzle"))  | [7.5](info:info("Curse of 14", "Sprinkle"))  | [10.4](info:info("Curse of 14", "Cloudburst"))  | -    |
| [Virtual S0da](info:info("Virtual S0da"))           | [3.0](info:info("Virtual S0da", "Drizzle"))  | [6.7](info:info("Virtual S0da", "Sprinkle"))  | [10.6](info:info("Virtual S0da", "Cloudburst"))  | -    |
| [apOapSis(Edit)](info:info("apOapSisEdit"))           | [3.5](info:info("apOapSisEdit", "Drizzle"))  | [6.4](info:info("apOapSisEdit", "Sprinkle"))  | [10.7](info:info("apOapSisEdit", "Cloudburst"))  | -    |

---

## Collaboration - 解空明镜

| Title              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [Deluge](info:info("Deluge"))             | [2.0](info:info("Deluge", "Drizzle"))  | [5.0](info:info("Deluge", "Sprinkle"))  | [9.0](info:info("Deluge", "Cloudburst"))  | -    |
| [Fluorescent Light](info:info("Fluorescent Light"))           | [2.0](info:info("Fluorescent Light", "Drizzle"))  | [6.2](info:info("Fluorescent Light", "Sprinkle"))  | [9.6](info:info("Fluorescent Light", "Cloudburst"))  | -    |
| [Autumn Rain](info:info("Virtual S0da"))           | [3.0](info:info("Autumn Rain", "Drizzle"))  | [6.4](info:info("Autumn Rain", "Sprinkle"))  | [10.1](info:info("Autumn Rain", "Cloudburst"))  | -    |
| [Pthahnil](info:info("Pthahnil"))           | [2.0](info:info("Pthahnil", "Drizzle"))  | [7.0](info:info("Pthahnil", "Sprinkle"))  | [10.7](info:info("Pthahnil", "Cloudburst"))  | -    |

---

## Single - Dream Tape

| Title                          | DZ   | SK   | CB   | CL   | SP |
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
| [Agnostic](info:info("Agnostic"))                    | [3.0](info:info("Agnostic", "Drizzle"))  | [7.4](info:info("Agnostic", "Sprinkle"))  | [10.2](info:info("Agnostic", "Cloudburst")) | -    | - |
| [Dogbite](info:info("Dogbite"))                     | [3.0](info:info("Dogbite", "Drizzle"))  | [6.5](info:info("Dogbite", "Sprinkle"))  | [10.3](info:info("Dogbite", "Cloudburst")) | - | [🐕](info:info("Dogbite", "Special")) |
| [Psyched Fevereiro](info:info("Psyched Fevereiro"))           | [3.5](info:info("Psyched Fevereiro", "Drizzle"))  | [7.3](info:info("Psyched Fevereiro", "Sprinkle"))  | [10.0](info:info("Psyched Fevereiro", "Cloudburst")) | -    | - |
| [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit"))  | [3.0](info:info("Future Unbound Game Edit","Drizzle"))  | [7.5](info:info("Future Unbound Game Edit","Sprinkle"))  | [10.5](info:info("Future Unbound Game Edit","Cloudburst")) | -    | - |
| [Algebra](info:info("Algebra"))                     | [2.0](info:info("Algebra", "Drizzle"))  | [8.1](info:info("Algebra", "Sprinkle"))  | [11.4](info:info("Algebra", "Cloudburst")) | - | [🔢](info:info("Algebra", "Special")) |
| [Words](info:info("Words"))                       | [2.0](info:info("Words", "Drizzle"))  | [6.5](info:info("Words", "Sprinkle"))  | [8.3](info:info("Words", "Cloudburst"))  | -    | - |
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

## Single - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   | SP |
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
| [Garden](info:info("Garden"))          | [2.0](info:info("Garden", "Drizzle"))  | [7.3](info:info("Garden", "Sprinkle"))  | [9.8](info:info("Garden", "Cloudburst")) | - | - |
| [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden"))          | [2.0](info:info("Fantasia Sonata Botanical Garden", "Drizzle"))  | [6.1](info:info("Fantasia Sonata Botanical Garden", "Sprinkle"))  | [10.0](info:info("Fantasia Sonata Botanical Garden", "Cloudburst")) | - | - |
| [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!"))          | [2.0](info:info("Dum! Dum!! Dum!!!", "Drizzle"))  | [7.0](info:info("Dum! Dum!! Dum!!!", "Sprinkle"))  | [10.5](info:info("Dum! Dum!! Dum!!!", "Cloudburst")) | - | - |
| [Splash the Beat!!](info:info("Splash the Beat!!"))          | [1.0](info:info("Splash the Beat!!", "Drizzle"))  | [7.2](info:info("Splash the Beat!!", "Sprinkle"))  | [12.1](info:info("Splash the Beat!!", "Cloudburst")) | - | - |
| [いつか忘れるんだろう](info:info("いつか忘れるんだろう"))          | [ 2.0 ](info:info("いつか忘れるんだろう", "Drizzle"))  | [ 7.4 ](info:info("いつか忘れるんだろう", "Sprinkle"))  | [ 8.9 ](info:info("いつか忘れるんだろう", "Cloudburst")) | - | - |
| [運命](info:info("運命"))          | [ 2.0 ](info:info("運命", "Drizzle"))  | [ 7.6 ](info:info("運命", "Sprinkle"))  | [ 9.9 ](info:info("運命", "Cloudburst")) | - | - |
| [Fantasia Sonata Hope](info:info("Fantasia Sonata Hope"))          | [ 3.5 ](info:info("Fantasia Sonata Hope", "Drizzle"))  | [ 8.9 ](info:info("Fantasia Sonata Hope", "Sprinkle"))  | [ 10.7 ](info:info("Fantasia Sonata Hope", "Cloudburst")) | - | - |
| [Before it Ends](info:info("Before it Ends"))          | [ 3.0 ](info:info("Before it Ends", "Drizzle"))  | [ 7.4 ](info:info("Before it Ends", "Sprinkle"))  | [ 10.6 ](info:info("Before it Ends", "Cloudburst")) | - | - |
| [conflict](info:info("conflict"))          | [2.0](info:info("conflict", "Drizzle"))  | [9.3](info:info("conflict", "Sprinkle"))  | [11.4](info:info("conflict", "Cloudburst")) | - | - |
| [Sound of Nature](info:info("Sound of Nature"))          | [2.0](info:info("Sound of Nature", "Drizzle"))  | [6.9](info:info("Sound of Nature", "Sprinkle"))  | [10.7](info:info("Sound of Nature", "Cloudburst")) | - | - |

---

## Chart Creator Stats

<div style="font-size:10px;">

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")),<br>[Brightened Demonios](info:info("Brightened Demonios","Drizzle")),<br>[Broken Conviction](info:info("Broken Conviction","Drizzle")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")),<br>[Curse of 14](info:info("Curse of 14","Drizzle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")),<br>[Fantasia Sonata Hope](info:info("Fantasia Sonata Hope","Drizzle")),<br>[Fluorescent Light](info:info("Fluorescent Light","Drizzle")),<br>[Fragment of Memories](info:info("Fragment of Memories","Drizzle")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")),<br>[IN](info:info("IN","Drizzle")),<br>[Kayava](info:info("Kayava","Drizzle")),<br>[Oniichan](info:info("Oniichan","Drizzle")),<br>[OverRain](info:info("OverRain","Drizzle")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")),<br>[仮想明日](info:info("仮想明日","Drizzle")),<br>[烁雨](info:info("烁雨","Drizzle")),<br>[運命](info:info("運命","Drizzle")),<br>[はんてん](info:info("はんてん","Drizzle")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")),<br>[Aleph-0](info:info("Aleph-0","Sprinkle")),<br>[apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")),<br>[Broken Conviction](info:info("Broken Conviction","Sprinkle")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")),<br>[conflict](info:info("conflict","Sprinkle")),<br>[Curse of 14](info:info("Curse of 14","Sprinkle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")),<br>[Fantasia Sonata Hope](info:info("Fantasia Sonata Hope","Sprinkle")),<br>[Fluorescent Light](info:info("Fluorescent Light","Sprinkle")),<br>[Fragment of Memories](info:info("Fragment of Memories","Sprinkle")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")),<br>[Oniichan](info:info("Oniichan","Sprinkle")),<br>[OverRain](info:info("OverRain","Sprinkle")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")),<br>[仮想明日](info:info("仮想明日","Sprinkle")),<br>[烁雨](info:info("烁雨","Sprinkle")),<br>[運命](info:info("運命","Sprinkle")),<br>[☹](info:info("☹","Sprinkle")),<br>[はんてん](info:info("はんてん","Sprinkle")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")),<br>[Algebra](info:info("Algebra","Cloudburst")),<br>[apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")),<br>[Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[Broken Conviction](info:info("Broken Conviction","Cloudburst")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")),<br>[conflict](info:info("conflict","Cloudburst")),<br>[cybernetic blazar](info:info("cybernetic blazar","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")),<br>[Fantasia Sonata Hope](info:info("Fantasia Sonata Hope","Cloudburst")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")),<br>[Fluorescent Light](info:info("Fluorescent Light","Cloudburst")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")),<br>[Kayava](info:info("Kayava","Cloudburst")),<br>[LOUDER!](info:info("LOUDER!","Cloudburst")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")),<br>[OverRain](info:info("OverRain","Cloudburst")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")),<br>[Regnaissance](info:info("Regnaissance","Cloudburst")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[Words](info:info("Words","Cloudburst")),<br>[百九十](info:info("百九十","Cloudburst")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")),<br>[仮想明日](info:info("仮想明日","Cloudburst")),<br>[靈](info:info("靈","Cloudburst")),<br>[暮予星光](info:info("暮予星光","Cloudburst")),<br>[運命](info:info("運命","Cloudburst")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")),<br>[Myth compiler](info:info("Myth compiler","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")),<br>[樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")),<br>[Innocent white](info:info("Innocent white","Cloudburst")),<br>[Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")),<br>[大月墜落狂想](info:info("大月墜落狂想","Cloudburst")),<br>[烁雨](info:info("烁雨","Cloudburst")),<br>[樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")),<br>[烁雨](info:info("烁雨","Drizzle")) | [conflict](info:info("conflict","Sprinkle")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")),<br>[Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Icier | [Autumn Rain](info:info("Autumn Rain","Drizzle")),<br>[conflict](info:info("conflict","Drizzle")),<br>[運命](info:info("運命","Drizzle")) | [Autumn Rain](info:info("Autumn Rain","Sprinkle")),<br>[運命](info:info("運命","Sprinkle")) |  |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")),<br>[Elsorhg](info:info("Elsorhg","Drizzle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")),<br>[Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")),<br>[LOUDER!](info:info("LOUDER!","Drizzle")),<br>[Moonflutter](info:info("Moonflutter","Drizzle")),<br>[Sakuyahime](info:info("Sakuyahime","Drizzle")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")),<br>[WATER](info:info("WATER","Drizzle")),<br>[白虎蓮華](info:info("白虎蓮華","Drizzle")),<br>[大月墜落狂想](info:info("大月墜落狂想","Drizzle")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")),<br>[イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")),<br>[Brightened Demonios](info:info("Brightened Demonios","Sprinkle")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")),<br>[Elsorhg](info:info("Elsorhg","Sprinkle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")),<br>[Jump out?](info:info("Jump out?","Sprinkle")),<br>[LOUDER!](info:info("LOUDER!","Sprinkle")),<br>[Sakuyahime](info:info("Sakuyahime","Sprinkle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")),<br>[White Lizard](info:info("White Lizard","Sprinkle")),<br>[白虎蓮華](info:info("白虎蓮華","Sprinkle")),<br>[大月墜落狂想](info:info("大月墜落狂想","Sprinkle")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")),<br>[花月](info:info("花月","Sprinkle")),<br>[暮予星光](info:info("暮予星光","Sprinkle")),<br>[时落之雨](info:info("时落之雨","Sprinkle")),<br>[夜風](info:info("夜風","Sprinkle")),<br>[樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")),<br>[Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")),<br>[Elsorhg](info:info("Elsorhg","Cloudburst")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")),<br>[Oniichan](info:info("Oniichan","Cloudburst")),<br>[Sakuyahime](info:info("Sakuyahime","Cloudburst")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")),<br>[白虎蓮華](info:info("白虎蓮華","Cloudburst")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")),<br>[花月](info:info("花月","Cloudburst")),<br>[命日](info:info("命日","Cloudburst")),<br>[时落之雨](info:info("时落之雨","Cloudburst")),<br>[夜風](info:info("夜風","Cloudburst")),<br>[イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")),<br>[Algebra](info:info("Algebra","Drizzle")),<br>[Before it Ends](info:info("Before it Ends","Drizzle")),<br>[Deluge](info:info("Deluge","Drizzle")),<br>[Dogbite](info:info("Dogbite","Drizzle")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")),<br>[Garden](info:info("Garden","Drizzle")),<br>[Hikari](info:info("Hikari","Drizzle")),<br>[INFP.mp3](info:info("INFP.mp3","Drizzle")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")),<br>[Pthahnil](info:info("Pthahnil","Drizzle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")),<br>[Virtual S0da](info:info("Virtual S0da","Drizzle")),<br>[粗线条的雨](info:info("粗线条的雨","Drizzle")),<br>[いつか忘れるんだろう](info:info("いつか忘れるんだろう","Drizzle")),<br>[サイクルの欠片](info:info("サイクルの欠片","Drizzle")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")),<br>[Before it Ends](info:info("Before it Ends","Sprinkle")),<br>[Deluge](info:info("Deluge","Sprinkle")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")),<br>[Elsorhg](info:info("Elsorhg","Sprinkle")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")),<br>[Garden](info:info("Garden","Sprinkle")),<br>[Hikari](info:info("Hikari","Sprinkle")),<br>[INFP.mp3](info:info("INFP.mp3","Sprinkle")),<br>[Innocent white](info:info("Innocent white","Sprinkle")),<br>[Moonflutter](info:info("Moonflutter","Sprinkle")),<br>[Pthahnil](info:info("Pthahnil","Sprinkle")),<br>[Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")),<br>[Virtual S0da](info:info("Virtual S0da","Sprinkle")),<br>[粗线条的雨](info:info("粗线条的雨","Sprinkle")),<br>[命日](info:info("命日","Sprinkle")),<br>[いつか忘れるんだろう](info:info("いつか忘れるんだろう","Sprinkle")),<br>[サイクルの欠片](info:info("サイクルの欠片","Sprinkle")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")),<br>[Aleph-0](info:info("Aleph-0","Cloudburst")),<br>[Before it Ends](info:info("Before it Ends","Cloudburst")),<br>[Deluge](info:info("Deluge","Cloudburst")),<br>[Elsorhg](info:info("Elsorhg","Cloudburst")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")),<br>[Garden](info:info("Garden","Cloudburst")),<br>[INFP.mp3](info:info("INFP.mp3","Cloudburst")),<br>[Pthahnil](info:info("Pthahnil","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[粗线条的雨](info:info("粗线条的雨","Cloudburst")),<br>[仮想明日](info:info("仮想明日","Cloudburst")),<br>[雨女](info:info("雨女","Cloudburst")),<br>[いつか忘れるんだろう](info:info("いつか忘れるんだろう","Cloudburst")),<br>[サイクルの欠片](info:info("サイクルの欠片","Cloudburst")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
| Milthm Team | [cybernetic blazar](info:info("cybernetic blazar","Drizzle")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Drizzle")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Drizzle")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Drizzle")),<br>[花月](info:info("花月","Drizzle")),<br>[暮予星光](info:info("暮予星光","Drizzle")),<br>[时落之雨](info:info("时落之雨","Drizzle")),<br>[夜風](info:info("夜風","Drizzle")) | [Algebra](info:info("Algebra","Sprinkle")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Sprinkle")) | [驟雨の狭間](info:info("驟雨の狭間","Cloudburst")) |  | [Algebra](info:info("Algebra","Special")),<br>[KAEDE](info:info("KAEDE","Special")) |
| Murty | [Regnaissance](info:info("Regnaissance","Drizzle")) |  |  |  |  |
| SakiA | [☹](info:info("☹","Drizzle")) |  |  |  |  |
| TCSTWTBHY | [Dogbite](info:info("Dogbite","Drizzle")),<br>[GlassyHeart.](info:info("GlassyHeart.","Drizzle")),<br>[Innocent white](info:info("Innocent white","Drizzle")),<br>[Jump out?](info:info("Jump out?","Drizzle")),<br>[Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")),<br>[Words](info:info("Words","Drizzle")),<br>[☹](info:info("☹","Drizzle")) | [Dogbite](info:info("Dogbite","Sprinkle")),<br>[GlassyHeart.](info:info("GlassyHeart.","Sprinkle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")),<br>[Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Sprinkle")),<br>[Words](info:info("Words","Sprinkle")),<br>[☹](info:info("☹","Sprinkle")),<br>[イコラト](info:info("イコラト","Sprinkle")) | [conflict](info:info("conflict","Cloudburst")),<br>[Jump out?](info:info("Jump out?","Cloudburst")),<br>[Moving On](info:info("Moving On","Cloudburst")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Cloudburst")) | [命日](info:info("命日","Clear")) |  |
| Ursulina | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Drizzle")) |  | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Cloudburst")),<br>[Virtual S0da](info:info("Virtual S0da","Cloudburst")) |  |  |
| vitamin b |  |  | [IN](info:info("IN","Cloudburst")),<br>[KASANE](info:info("KASANE","Cloudburst")) |  |  |
| WH_C |  |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| xzadudu179 | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")) | [WATER](info:info("WATER","Sprinkle")) | [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Cloudburst")),<br>[Hikari](info:info("Hikari","Cloudburst")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")),<br>[Moonflutter](info:info("Moonflutter","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[運命](info:info("運命","Cloudburst")) |  |  |
| 阿鱼 | [Moving On](info:info("Moving On","Drizzle")),<br>[雨之城](info:info("雨之城","Drizzle")) | [雨之城](info:info("雨之城","Sprinkle")) | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| 点缀星空 |  |  | [Curse of 14](info:info("Curse of 14","Cloudburst")),<br>[Myth compiler](info:info("Myth compiler","Cloudburst")) |  |  |
| 姜片 | [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Drizzle")) |  |  |  |  |
| 泪莫提 |  | [Moving On](info:info("Moving On","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[Broken Conviction](info:info("Broken Conviction","Cloudburst")),<br>[cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) |  |  |
| 喵卡 |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| 母鸡 | [KASANE](info:info("KASANE","Drizzle")) | [KASANE](info:info("KASANE","Sprinkle")) | [Autumn Rain](info:info("Autumn Rain","Cloudburst")),<br>[Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) |  |  |
| 你申某 | [雨女](info:info("雨女","Drizzle")) |  |  |  |  |
| 爬爬 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")),<br>[Regnaissance](info:info("Regnaissance","Drizzle")),<br>[仮想明日](info:info("仮想明日","Drizzle")),<br>[靈](info:info("靈","Drizzle")) | [Chartreuse Green](info:info("Chartreuse Green","Sprinkle")),<br>[Curse of 14](info:info("Curse of 14","Sprinkle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")),<br>[靈](info:info("靈","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[靈](info:info("靈","Cloudburst")),<br>[雨之城](info:info("雨之城","Cloudburst")),<br>[☹](info:info("☹","Cloudburst")),<br>[はんてん](info:info("はんてん","Cloudburst")) | [Contrasty Angeles](info:info("Contrasty Angeles","Clear")),<br>[Moonflutter](info:info("Moonflutter","Clear")),<br>[雨女](info:info("雨女","Clear")) | [Dogbite](info:info("Dogbite","Special")),<br>[Oiiaioooooiai](info:info("Oiiaioooooiai","Special")),<br>[Welcome to Milthm](info:info("Welcome to Milthm","Special")) |
| 树穴猪 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")),<br>[Sound of Nature](info:info("Sound of Nature","Drizzle")) | [IN](info:info("IN","Sprinkle")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Sprinkle")),<br>[Sound of Nature](info:info("Sound of Nature","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[Sound of Nature](info:info("Sound of Nature","Cloudburst")) |  |  |
| 王子 |  | [IN](info:info("IN","Sprinkle")) |  |  |  |
| 舞仙翼 |  |  | [Innocent white](info:info("Innocent white","Cloudburst")) |  |  |
| 嘤箱 | [命日](info:info("命日","Drizzle")) |  |  |  |  |
| 余火 | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Drizzle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Sprinkle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Cloudburst")) | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit","Clear")) |  |
| 雨眠 | [百九十](info:info("百九十","Drizzle")) | [百九十](info:info("百九十","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[OverRain](info:info("OverRain","Cloudburst")) |  |  |
| 云梦 |  | [cybernetic blazar](info:info("cybernetic blazar","Sprinkle")),<br>[Kayava](info:info("Kayava","Sprinkle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")),<br>[雨女](info:info("雨女","Sprinkle")) | [Chartreuse Green](info:info("Chartreuse Green","Cloudburst")),<br>[Fragment of Memories](info:info("Fragment of Memories","Cloudburst")),<br>[Moonflutter](info:info("Moonflutter","Cloudburst")),<br>[☹](info:info("☹","Cloudburst")),<br>[イコラト](info:info("イコラト","Cloudburst")) |  |  |

</div>

---

## Click to Accelerate Milthm Development

Support development via:  
1. https://github.com/sponsors/morizerodev/  
2. https://afdian.com/a/morizero  

---

## Contact Us

{{联系我们}}

---

### FAQ

[Back to Top](#table-of-contents)

- [No response when generating images](#no-response-when-generating-images)
- [Can't locate files or folder missing](#cant-locate-files-or-folder-missing)
- [How to backup saves](#how-to-backup-saves)
- [Restore saves](#restore-saves)
- [Reality calculation](#reality-calculation-formula)
- [Note judgments](#note-judgments)

> Basic technical literacy required. Unwilling learners should avoid this site.  

---

#### No response when generating images

- Check network. If GitHub is blocked, try [k9.lv/c/](http://k9.lv/c).  
- Switch to default/system browsers like Chrome or [Edge](https://www.microsoft.com/en-us/edge/).  
- Older OS versions may cause issues.  

---

#### Can't locate files or folder missing

See paths in [Upload Save File](#upload-save-file).  

#### No access permissions

Confirm Milthm version (3.2+ requires one game launch to generate saves).  

- **Android**  
  Use [MT Manager](https://mt2.cn/) to navigate to:  
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  Alternatively, enable ADB debugging via [Shizuku](https://shizuku.rikka.app/).  

- **iOS**  
  Check "Files" app settings for hidden local files.  
  [iOS Demo Video](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  

#### How to backup saves

Copy the entire `data` folder elsewhere.  

#### Restore saves

Overwrite original files with backups.  
Score images embed save data as text—upload to [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html) to regenerate files.  

---

## Additional Content

[Back to Top](#table-of-contents)

### Milthm Wiki

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**

- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Milthm Community Group

{{群}}

### What is a File Path

A string specifying a file's location in a directory tree, using separators like `/`, `\`, or `:`. Used in URLs and system navigation.  

#### Android Paths

- **External Storage:** `/storage/emulated/0/` or `/sdcard/` (user-accessible).  
- **App Data:** `/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/`.  
  ADB access may be required on restricted systems.  

---

### Reality Reference Table

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
