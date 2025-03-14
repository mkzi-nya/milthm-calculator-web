

## Table of Contents
- [Website](#website)
- [Usage Instructions](#usage-instructions)
  - [Upload Save File](#upload-save-file)
  - [Enter Parsed Data](#enter-parsed-data)
  - [Old Version Save Files](#old-version-save-files)
  - [Other Save Paths](#other-save-paths)
  - [Radar Chart](#radar-chart)
- [About Milthm](#about-milthm)
  - [Reality Calculation Formula](#reality-calculation-formula)
  - [Note Judgment](#note-judgment)
  - [Result Rating](#result-rating)
  - [Completion Status](#completion-status)
  - [Constant Table](#constant-table)
- [Contact Us](#contact-us)
- [Other Content](#other-content)
  - [Milthm Wiki](#milthm-wiki)
  - [Reality Table](#reality-table)

---

> This guide has been translated by ChatGPT, please refer to the Simplified Chinese version for reference if there are any issues.


Last updated on 2025.3.14


## Website
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## Usage Instructions

### Upload Save File

Click on the **"Upload File"** option on the homepage, select the save file `saves.db` or the score log file `data.db` to upload.

> **Note**:
> - `data.db` only contains the game records updated after version `3.2` (if not lost).
> - On Android, it is recommended to use [MT Manager](https://mt2.cn/) to access the `sdcard/Android/data` directory.

#### **File Paths (See [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Use the [Files](https://support.apple.com/en-us/102570) app to open the Milthm folder:
  ```text
  /data/
  ```
- **Windows**
  Enter in the address bar of File Explorer:
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

### Enter Parsed Data

Enter the data in the input box on the homepage in the following format:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` is a decimal, and `level` represents the rating, defined as follows:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Old Version Save Files

Save files prior to `Milthm 3.2` cannot be extracted directly on mobile devices, but you can try the following method:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "File $FILE_NAME has been successfully copied to /sdcard/"
            break
        else
            echo "Failed to copy the file, please check the permissions!"
        fi
    fi
done
```

---

### Other Save Paths

If uploading does not work, try extracting the JSON data manually and uploading it:

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
  milthm app data/Data/Library/Preferences
  ```
- **Windows**
  Located in the registry:
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

The calculation method related to this is provided by `PanyiAme`, see [Milthm Score Table Description](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## About Milthm

- [Back to Table of Contents](#table-of-contents)

### Reality Calculation Formula

The calculation of Reality is based on the game score and the constant of the song:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

The Reality formula for a single song is as follows (where s is the score and c is the constant):

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

[Reality Table](#reality-table)

#### Code Implementation:
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

## Note Judgment

There are five types of judgments for a single note in the game:

- `Perfect`: Achieve 101% score and 100% accuracy.
- `perfect`: Score between 75%-101% and 100% accuracy based on the accuracy.
- `Good`: Score between 30%-15% and 50% accuracy based on the accuracy.
- `Bad`: Combo interrupted, score 0%-30%, no accuracy.
- `Miss`: Combo interrupted, no score and accuracy.

The scores and accuracy within each range are proportional.

The ranges for the five judgments are shown in the table below:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## Result Rating

Result ratings can be divided into eight types:

- R: Rhythm of Rain, achieved theoretical value of 1010000 points (all notes are large Perfect).
- Purple S: Achieved All Perfect (all notes are Perfect, not achieving R rating, 1000000-1009999).
- Blue S: Achieved Full Combo (all notes are without Bad/Miss judgment and do not achieve Purple S, ignoring the following score requirements).
- S: 950000-1009999
- A: 900000-949999
- B: 850000-899999
- C: 800000-849999
- F: 0-799999

---

## Completion Status

After the gameplay, the displayed evaluation in the song:

- Crash:
  - ACC < 80%
- Complete:
  - ACC > 80% and at least one Bad/Miss
- Full Combo:
  - All notes hit within ±140ms, and at least one Good
- All Perfect:
  - All notes hit within ±70ms, and at least one small perfect
- Rhythm of Rain:
  - All notes hit within ±35ms, i.e., the theoretical value
- AutoPlay is Awesome:
  - Completed using AutoPlay
- Overloaded:
  - Score greater than 1010000 (using heavy rain).

---

## Constant Table

- [Back to Table of Contents](#table-of-contents)
- [Description](#description)
- [Main Chapter](#introduction---weather-report)
  - [Weather Report](#introduction---weather-report)
  - [Rainfall Sounds](#prologue---rainfall-sounds)
  - [The Sides of Bitter and Sweet](#chapter1---the-sides-of-bitter-and-sweet)
- [Collaboration](#collaboration---rain-world)
  - [Rain World](#collaboration---rain-world)
  - [Notanote](#collaboration---notanote)
- [Single](#single---dream-tape)
  - [Dream Tape](#single---dream-tape)
  - [Gathering Blossoms Under Rain](#single---gathering-blossoms-under-rain)
  
## Description

> - All `SP` and non-conventional songs are excluded from Reality calculation
> - Due to accuracy issues, in the current version, all songs with a constant of 11.9 do not actually reach 11.9. For example, if the theoretical Reality for a version is `13.005`, it will display as `13.00` in the game instead of `13.01`.

The theoretical Reality in the current version is `12.670`.  
Here are the top 20 songs with the highest constants in the current version:

| Rank | Title                   | Difficulty | Constant |
|------|-------------------------|------------|----------|
| 1    | Contrasty Angeles        | CL         | 12.3     |
| 2    | 命日                      | CL         | 12.2     |
| 3    | Moonfall／大月墜落狂想      | CB         | 12.2     |
| 4    | Regnaissance             | CL         | 12.1     |
| 5    | Innocent white           | CB         | 12.1     |
| 6    | Broken Conviction        | CL         | 11.9     |
| 7    | Meltovt Necrosys         | CB         | 11.9     |
| 8    | Moonflutter              | CL         | 11.7     |
| 9    | Fly To Meteor feat.兔柒   | CL         | 11.7     |
| 10   | HYPER MEMORIES           | CB         | 11.7     |
| 11   | Broken Conviction        | CB         | 11.5     |
| 12   | Threat - Metropolis      | CB         | 11.5     |
| 13   | Contrasty Angeles        | CB         | 11.5     |
| 14   | slic.hertz #GdbG         | CB         | 11.4     |
| 15   | Moonflutter              | CB         | 11.4     |
| 16   | Algebra                  | CB         | 11.4     |
| 17   | Fragment of Memories     | CB         | 11.3     |
| 18   | IN                       | CB         | 11.2     |
| 19   | イコラト                   | CB         | 11.2     |
| 20   | 参宿四\~Betelgeuse\~      | CB         | 11.2     |

---

## Introduction - Weather Report

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Welcome to Milthm    | 1.0  | -    | -    | -    |
| 時落之雨             | 1.0  | 4.5  | 8.5  | -    |
| 夜風                 | 3.0  | 7.3  | 10.1 | -    |
| 花月                 | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光             | 2.0  | 7.5  | 9.1  | -    |

---

## Prologue - Rainfall Sounds

| Title        | DZ   | SK   | CB   | CL   |
|--------------|------|------|------|------|
| 雨之城        | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

---

## Chapter1 - The Sides of Bitter and Sweet

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| 粗线条的雨           | 1.0  | 4.0  | 8.3  | -    |
| Aconsma              | 1.0  | 6.0  | 9.3  | -    |
| OverRain             | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES       | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance         | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles    | 4.0  | 9.0  | 11.5 | 12.3 |

---

## Collaboration - Rain World

| Title                       | DZ   | SK   | CB   | CL   |
|-----------------------------|------|------|------|------|
| Sundown                     | 1.0  | -    | -    | -    |
| Bio-Engineering             | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands        | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure     | 2.0  | 5.5  | 10.3 | -    |
| White Lizard                | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex | 2.0  | 7.6  | 10.6 | -    |
| Kayava                      | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis         | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent           | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想       | 2.0  | 8.0  | 12.2 | -    |

---

## Collaboration - Notanote

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| 烁雨                 | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar    | 4.0  | 7.8  | 10.2 | -    |
| Innocent white       | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg              | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys     | 2.0  | 7.8  | 11.9 | -    |

---

## Single - Dream Tape

| Title                          | DZ   | SK   | CB   | CL   |
|-|-|-|-|-|
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

## Single - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| FULi AUTO SHOOTER | 3.0  | 7.2  | 10.6  | -    |
| cafe in 6412l731V                    | 2.0  | 7.0  | 11.3  | -    |


---

## Contact Us

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**: 375882310
- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**: 678471942
- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## Other Content

- [Back to Table of Contents](#table-of-contents)

### Milthm wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**
- **[Moe Girl Encyclopedia](https://mzh.moegirl.org.cn/Milthm)**
- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Reality Table

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



