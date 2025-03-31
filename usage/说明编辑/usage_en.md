
## Table of Contents

- [Website](#website)
- [Instructions](#instructions)
  - [Uploading Save Files](#uploading-save-files)
  - [Inputting Parsed Data](#inputting-parsed-data)
  - [Old Version Saves](#old-version-saves)
  - [Other Save Paths](#other-save-paths)
  - [Radar Chart](#radar-chart)
- [About Milthm](#about-milthm)
  - [Reality Calculation Formula](#reality-calculation-formula)
  - [Note Judgment](#note-judgment)
  - [Result Ratings](#result-ratings)
  - [Completion Status](#completion-status)
  - [Constant Table](#constant-table)
- [Contact Us](#contact-us)
- [Other Content](#other-content)
  - [Milthm Wiki](#milthm-wiki)
  - [Hidden Song Unlock Methods](#hidden-song-unlock-methods)
  - [What is a File Path?](#what-is-a-file-path)
  - [Reality Comparison Table](#reality-comparison-table)

---

{{updata}}

> If the interface does not render correctly, please [visit on GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/)

---

## Website

{{网站}}

---

## Instructions

### Uploading Save Files

Click the **"Upload File"** option on the homepage to select and upload the save file `saves.db` or the score record file `data.db`.

> **Note:**
> - `data.db` only contains gameplay records updated after version `3.2` (if not lost).
> - Android users are recommended to use [MT Manager](https://mt2.cn/) to access the `sdcard/Android/data` directory.

#### File Path (see [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[What is a File Path?](#what-is-a-file-path)

{{11}}

Open the Milthm folder using the [Files](https://support.apple.com//102570) app:

```text
/data/
```

> If local files cannot be found: go to the three-dot menu at the top right of the Files homepage and unhide local files (see [details](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **For Windows Users:**  
  Enter the following in the File Explorer address bar:  
  {{12}}

---

### Inputting Parsed Data

Enter the data in the input box on the homepage, in the following format:

{{13}}

Where:
- `acc` is a decimal representing accuracy;
- `level` indicates the rating, defined as follows:

{{14}}

---

### Old Version Saves

Saves from before `Milthm 3.2` cannot be directly extracted on mobile devices. You may try the following methods:

{{15}}

---

### Other Save Paths

If the upload fails to parse, you can try manually extracting JSON data and uploading it:

{{16}}

---

## Radar Chart

The calculation method is provided by `PanyiAme`. For details, please see [Milthm Score Chart Explanation](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## About Milthm

[Back to Contents](#table-of-contents)

### Reality Calculation Formula

Reality is calculated based on the gameplay score and the song constant:

{{17}}

The formula for calculating the Reality of a single song (where s is the score and c is the constant) is as follows:

{{reality公式}}

[Reality Comparison Table](#reality-comparison-table)

#### Code Implementation:

{{公式js}}

---

## Note Judgment

There are five types of judgments for individual notes in the game:

- **Perfect:** Achieves 101% score and 100% ACC.
- **perfect:** Achieves a score between 75%-101% and 100% ACC based on precision.
- **Good:** Achieves a score between 30%-75% and 50% ACC based on precision.
- **Bad:** Combo breaks, resulting in a score between 0%-30% and 10% ACC.
- **Miss:** Combo breaks, and no score or ACC is awarded.

Within each range, the score and accuracy are proportional. The detailed ranges are shown in the table below:

{{判定范围}}

---

## Result Ratings

There are eight result ratings:

- **R:** Rain, achieving the theoretical score of 1010000 (RHYTHM of RAIN, where all notes are Perfect).
- **Purple S:** Achieving All Perfect (all notes are Perfect but not reaching an R rating, score between 1000000-1009999).
- **Blue S:** Achieving Full Combo (all notes hit without any Bad/Miss, regardless of the score requirements below).
- **S:** 950000-1009999.
- **A:** 900000-949999.
- **B:** 850000-899999.
- **C:** 800000-849999.
- **F:** 0-799999.

---

## Completion Status

After the song ends, the performance evaluation displayed on the chart includes:

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80%, with at least one Bad/Miss.
- **Full Combo:**  
  - All notes are hit within ±140ms, with at least one Good.
- **All Perfect:**  
  - All notes are hit within ±70ms, with at least one small perfect.
- **Rhythm of Rain:**  
  - All notes are hit within ±35ms, i.e., the theoretical value.
- **AutoPlay is Awesome:**  
  - Completed using AutoPlay.
- **Overloaded:**  
  - Score exceeds 1010000 (using a heavy downpour).

---

## Constant Table

[Back to Contents](#table-of-contents)

{{章节en}}

---

## Explanation

> - All `SP` and non-standard charts are not included in the Reality calculation.  
> - Due to precision issues, in the current version, all song constants that are supposed to be 11.9 are actually below 11.9. For example, if the theoretical Reality is `13.005`, it will display as `13.00` in the game instead of `13.01`, and the actual calculation is `13.004999…`.

The current theoretical Reality is `12.675` (displayed as 12.67).  
The top 20 songs with the highest constants in the current version are as follows:

{{章节en1}}

---

## Contact Us

{{联系我们}}

---

## Other Content

[Back to Contents](#table-of-contents)

### Milthm Wiki

{{wiki}}

### Hidden Song Unlock Methods

- **Regnaissance**

  Unlock and play HYPER MEMORIES;  
  During gameplay, the background will turn black and white with Susan appearing. At that moment, do not hit any notes;  
  Afterwards, the score becomes negative while Susan turns colorful. Continue playing until the score is > 0, then the song unlocks after evaluation.

- **Contrasty Angeles**

  After unlocking Regnaissance, read Episode 6 of the main storyline chapter 1;  
  Play HYPER MEMORIES;  
  During gameplay, the background will turn black and white with Susan appearing, and you must maintain a full combo;  
  Afterwards, the score drops sharply while Susan turns colorful. Continue playing until the score is > 0, then the song unlocks after evaluation.

### What is a File Path?

A file path is a string representation that points to a unique location in a file system, typically using a directory tree structure. Different operating systems use different separators such as `/`, `\`, or `:`. Paths can be absolute or relative, representing the relationship between folders and files, and are essential in constructing URLs.

#### Android File Paths

- **External Storage:**  
  Located under `/storage/emulated/[user ID]` (default primary user is 0) or `/sdcard/`, these files are visible to the user.
- **Application Data Directory:**  
  Typically located under `/storage/emulated/0/Android/data/[package name]/`, for example:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  The Milthm save directory is at:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  If access is blocked, try connecting to a computer or granting the file manager ADB permissions.

---

### Reality Comparison Table

{{reality表}}
