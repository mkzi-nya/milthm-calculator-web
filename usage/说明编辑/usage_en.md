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
  - [About Ytilaer in Score Graphs](#about-ytilaer-in-score-graphs)
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

{{updata}}

> If rendering issues occur, please [visit on GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## Website

{{网站}}

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

{{11}}

  Use the [Files](https://support.apple.com//102570) app to open the Milthm folder:

  ```text
  /data/
  ```

  > If local files are missing: Enable "On My iPhone" visibility via the three-dot menu in Files app ([details](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Windows Users:**  
  Enter in File Explorer address bar:  
  {{12}}

[Android Demo Video](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[iOS Demo Video](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Android users [without access permissions](#no-access-permissions)

---

### Input Parsed Data

Enter data in the homepage input box with this format:

{{13}}

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

{{16}}

---

## Radar Chart

Calculation method provided by `PanyiAme`. See [Milthm Score Calculator Notes](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## About Milthm

[Back to Top](#table-of-contents)

### Reality Calculation Formula

Reality is calculated based on score and chart difficulty:  

{{17}}

Single-song Reality formula (where s = score, c = difficulty):  

{{reality_formula}}

[Reality Reference Table](#reality-reference-table)

#### Code Implementation:  

{{公式js}}

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

{{章节en}}

> - SP/challenge charts excluded from Reality calculations.  
> - Due to rounding, displayed Reality may differ (e.g., 13.005 → 13.00).  

Current theoretical max Reality: `12.725` (displayed as 12.72)  
Top 20 hardest charts:  

{{章节en1}}

---

## Chart Creator Stats

<div style="font-size:10px;">

{{charter}}

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

{{wiki}}

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

{{reality表}}
