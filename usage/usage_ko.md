Here is the translated version of the file you provided into Korean, with no other modifications:

---

## 목차
- [웹사이트](#웹사이트)
- [사용 설명](#사용-설명)
  - [저장 파일 업로드](#저장-파일-업로드)
  - [파싱된 데이터 입력](#파싱된-데이터-입력)
  - [구버전 저장](#구버전-저장)
  - [기타 저장 경로](#기타-저장-경로)
  - [레이더 차트](#레이더-차트)
- [Milthm에 대해](#milthm에-대해)
  - [Reality 계산 공식](#reality-계산-공식)
  - [음표 판정](#음표-판정)
  - [결산 등급](#결산-등급)
  - [완료 상태](#완료-상태)
  - [정수표](#정수표)
- [연락처](#연락처)
- [기타](#기타)
  - [Milthm 위키](#milthm-위키)
  - [Reality 대조표](#reality-대조표)
---

> 이 설명은 ChatGPT로 번역되었으며, 문제가 있을 경우 간체中文版을 기준으로 참조하십시오.

## 웹사이트
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## 사용 설명

### 저장 파일 업로드

홈페이지에서 **「파일 업로드」** 옵션을 클릭하고 저장 파일 `saves.db` 또는 점수 기록 파일 `data.db`를 선택하여 업로드하면 됩니다.

> **주의**:
> - `data.db`는 `3.2` 업데이트 이후의 게임 기록만 포함되어 있습니다(분실된 경우 제외).
> - 안드로이드에서는 [MT 관리 도구](https://mt2.cn/)를 사용하여 `sdcard/Android/data` 디렉토리를 확인하는 것이 좋습니다.

#### **파일 경로 (자세한 내용은 [Milthm 위키](https://milthm.fandom.com/wiki/Data_File) 참조)**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  [파일](https://support.apple.com/ko-kr/102570) 앱을 사용하여 Milthm 폴더를 열어주세요:
  ```text
  /data/
  ```
- **Windows**
  파일 탐색기의 주소창에 다음을 입력:
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

### 파싱된 데이터 입력

홈페이지 입력란에 데이터를 입력합니다. 형식은 아래와 같습니다:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc`는 소수값으로, `level`은 등급을 나타냅니다. 정의는 다음과 같습니다:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 구버전 저장

`Milthm 3.2` 이전의 저장 파일은 모바일에서 직접 추출할 수 없으며, 다음 방법을 시도해 보세요:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "파일 $FILE_NAME이 /sdcard/에 성공적으로 복사되었습니다."
            break
        else
            echo "파일 복사 실패, 권한을 확인하세요!"
        fi
    fi
done
```

---

### 기타 저장 경로

업로드 후 데이터가 파싱되지 않으면, JSON 데이터를 수동으로 추출하여 업로드를 시도해보세요:

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
  milthm 응용 데이터/Data/Library/Preferences
  ```
- **Windows**
  레지스트리에서:
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

## 레이더 차트

관련 계산 방식은 `PanyiAme`에 의해 제공되며, 자세한 내용은 [Milthm 점수 확인 표](https://wwp.lanzoup.com/iZ59A2j8nbpe)를 참조하십시오.

---

## Milthm에 대해

- [목차로 돌아가기](#목차)

### Reality 계산 공식

Reality의 계산은 게임 점수와 곡의 상수를 기반으로 합니다:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

개별 곡의 Reality 계산 공식은 다음과 같습니다(s는 점수, c는 상수):

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

[Reality 대조표](#reality-대조표)
#### 코드 구현:
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

## 음표 판정

게임에서 음표는 다섯 가지 판정 방식으로 나뉩니다:

- `Perfect`: 101% 점수와 100% ACC 획득.
- `perfect`: 정확도에 따라 75%-101% 점수와 100% ACC 획득.
- `Good`: 정확도에 따라 30%-15% 점수와 50% ACC 획득.
- `Bad`: 콤보 중단, 0%-30% 점수, ACC 없음.
- `Miss`: 콤보 중단, 점수와 ACC 없음.

각 구간 내에서 획득한 점수와 정확도는 비례 관계에 있습니다.

다섯 가지 판정의 범위는 다음 표와 같습니다:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## 결산 등급

결산 등급은 총 8가지로 나뉩니다:

- R: 이론적 1010000점 달성 (RHYTHM of RAIN, 모든 음표는 Perfect)
- 보라색 S: All Perfect 달성 (모든 음표가 Perfect이고 R 평가에 도달하지 않음, 1000000-1009999)
- 청색 S: Full Combo 달성 (모든 음표가 Bad/Miss 판정을 받지 않고 보라색 S에 도달하지 않음, 이때 아래의 점수 요구를 무시함)
- S: 950000-1009999
- A: 900000-949999
- B: 850000-899999
- C: 800000-849999
- F: 0-799999

---

## 완료 상태

게임 종료 후 곡에 표시된 평가 상태:

- Crash:
  - ACC < 80%
- Complete:
  - ACC > 80%이면서 적어도 하나의 Bad/Miss 있음
- Full Combo:
  - 모든 음표가 ±140ms 이내에 맞고 적어도 하나의 Good 있음
- All Perfect:
  - 모든 음표가 ±70ms 이내에 맞고 적어도 하나의 작은 perfect 있음
- Rhythm of Rain:
  - 모든 음표가 ±35ms 이내에 맞음, 즉 이론적 값
- AutoPlay is Awesome:
  - AutoPlay를 사용하여 클리어
- Overloaded:
  - 점수가 1010000 이상 (기상 현상)

---

## 정수표

- [목차로 돌아가기](#목차)
- [설명](#설명)
- [소개](#소개---기상 예보)
  - [기상 예보](#소개---기상 예보)
- [주요 챕터](#序章---비의 소리)
  - [비의 소리](#序章---비의 소리)
  - [달콤함과 쓴맛의 두 얼굴](#주요 챕터 1---달콤함과 쓴맛의 두 얼굴)
- [연동 챕터](#연동---비의 세계)
  - [비의 세계](#연동---비의 세계)
  - [Notanote](#연동---notanote)
- [단곡](#단곡---꿈의 테이프)
  - [꿈의 테이프](#단곡---꿈의 테이프)
  
## 설명

> - 모든 `SP`와 비정상 곡은 Reality 계산에 포함되지 않습니다
> - 현재 버전에서의 모든 정수는 11.9 곡에 대한 정수들이 미세하게 모자랄 수 있습니다. 예를 들어, 어떤 버전에서의 이론 Reality 값이 `13.005`라면, 게임 내에서는 `13.00`으로 표시됩니다.

현재 버전의 이론 Reality 값은 `12.670`
현재 버전에서 정수 값이 가장 높은 20곡은 다음과 같습니다:


| 순위 | 제목  | 난이도 | 정수 |
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

---

## 소개 - 기상 예보

| 제목                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| Welcome to Milthm  | 1.0  | -    | -    | -    |
| 時落之雨           | 1.0  | 4.5  | 8.5  | -    |
| 夜风               | 3.0  | 7.3  | 10.1 | -    |
| 花月               | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光           | 2.0  | 7.5  | 9.1  | -    |

## 서막 - 비의 소리

| 제목           | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| 비의 도시      | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0 | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

---

## 주요 챕터 1 - 달콤함과 쓴맛의 두 얼굴

| 제목                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| 거친 선의 비         | 1.0  | 4.0  | 8.3  | -    |
| Aconsma             | 1.0  | 6.0  | 9.3  | -    |
| OverRain            | 2.0  | 7.6  | 10.0 | -    |
| Memories의 조각    | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES     | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance       | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles  | 4.0  | 9.0  | 11.5 | 12.3 |

## 연동 - 비의 세계

| 제목                    | DZ   | SK   | CB   | CL   |
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
| Moonfall／대월추락광상 | 2.0  | 8.0  | 12.2 | -    |

## 연동 - Notanote

| 제목              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| Shining Rain      | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar | 4.0  | 7.8  | 10.2 | -    |
| Innocent white    | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg           | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys  | 2.0  | 7.8  | 11.9 | -    |

## 단곡 - 꿈의 테이프

| 제목                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| 네온색의 마을 feat. Mai    | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                     | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                     | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                | -    | -    | -    | SP   |
| WATER                        | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                      | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                       | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                  | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor                | 3.0  | 6.5  | 10.5 | 11.7 |
| Sakura Falling Flowers       | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                     | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro            | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)   | 3.0  | 7.5  | 10.5 | -    |
| Algebra                      | 2.0  | 8.1  | 11.4 | -    |
| Words                        | 2.0  | 6.5  | 9.3  | -    |
| 가상 내일                    | 3.5  | 6.6  | 3.5  | -    |
| White Tiger Lotus            | 3.0  | 6.5  | 9.6  | -    |
| 조각의 사이클                | 1.0  | 7.8  | 8.6  | -    |
| 참숙사사~Betelgeuse~          | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG             | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!              | 2.0  | 7.5  | 9.8  | -    |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 갑작스러운 비의 틈새        | -    | -    | -    | Ø    |
| Broken Conviction            | 4.5  | 4.5  | 11.5 | 11.9 |

---

## 연락처

- **[QQ Milthm#-1 씼쎩 그룹](https://qm.qq.com/q/Utb6sNDvki)**：375882310
- **[QQ Milthm#Φ 대화 그룹](https://qm.qq.com/q/fIErsKKz3a)**：678471942
- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## 기타
- [목차로 돌아가기](#목차)

### Milthm 위키

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**
- **[모에걸백과](https://mzh.moegirl.org.cn/Milthm)**
- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Reality 대조표

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
1.0	1105000.0
```