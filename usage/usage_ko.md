
# 목차
- [웹사이트](#웹사이트)
- [사용 방법](#사용-방법)
  - [저장 파일 업로드](#저장-파일-업로드)
  - [분석된 데이터 입력](#분석된-데이터-입력)
  - [이전 버전 저장 파일](#이전-버전-저장-파일)
  - [다른 저장 파일 경로](#다른-저장-파일-경로)
- [작동 원리](#작동-원리)
  - [Reality 계산 공식](#reality-계산-공식)
  - [레이더 그래프](#레이더-그래프)
- [상수표](#상수표)
- [문의하기](#문의하기)

---

## 웹사이트
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## 사용 방법

### 저장 파일 업로드

메인 페이지에서 **‘파일 업로드’** 옵션을 클릭하여, 저장 파일인 `saves.db` 또는 점수 기록 파일 `data.db`를 업로드하십시오.

> **주의**:
> - `data.db`에는 `3.2` 업데이트 이후의 플레이 기록만 포함되어 있습니다 (손실되지 않은 경우).
> - 안드로이드에서는 [MT 매니저](https://mt2.cn/)를 이용하여 `sdcard/Android/data` 디렉터리에 접근하는 것을 권장합니다.

#### **파일 경로 (자세한 내용은 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) 참조)**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  [파일](https://support.apple.com/ko-kr/102570) 앱을 사용하여 Milthm 폴더 열기:
  ```text
  /data/
  ```
- **Windows**
  파일 탐색기 주소 표시줄에 다음을 입력:
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

### 분석된 데이터 입력

메인 페이지의 입력란에 데이터를 입력합니다. 형식은 다음과 같습니다:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc`는 소수로 입력되며, `level`은 등급을 나타냅니다. 정의는 다음과 같습니다:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 이전 버전 저장 파일

Milthm 3.2 이전의 저장 파일은 모바일에서 직접 추출할 수 없으므로, 다음 방법을 시도해보세요:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "파일 $FILE_NAME 가 /sdcard/ 에 성공적으로 복사되었습니다."
            break
        else
            echo "파일 복사 실패, 권한을 확인하십시오!"
        fi
    fi
done
```

---

### 다른 저장 파일 경로

업로드 후 분석이 불가능할 경우, JSON 데이터를 수동으로 추출하여 업로드해보세요:

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
  milthm앱 데이터/Data/Library/Preferences
  ```
- **Windows**
  레지스트리 위치:
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

## 작동 원리

### Reality 계산 공식

Reality의 계산은 플레이 점수와 곡 상수를 기반으로 합니다:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

단일 곡 Reality 계산 공식은 다음과 같습니다 (s는 점수, c는 상수):

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

### 레이더 그래프

관련 계산 방식은 `PanyiAme`가 제공하며, 자세한 내용은 [Milthm 점수표 설명](https://wwp.lanzoup.com/iZ59A2j8nbpe)를 참조하십시오.

---

## 상수표

> - 모든 `SP` 및 비정규 곡은 Reality 계산에 참여하지 않습니다.
> - 정밀도 문제로 인해 현재 버전의 모든 상수가 11.9인 곡의 상수는 11.9 미만입니다. 예를 들어, 어떤 버전의 이론적 Reality가 `13.005`인 경우 게임 내에서는 `13.00`으로 표시되며 `13.01`이 아닙니다.

현재 버전의 이론적 Reality는 `12.670`입니다.  
현재 버전에서 상수가 가장 높은 20곡은 다음과 같습니다.

| 순위 | 제목                    | 난이도 | 상수  |
|---|-------------------------|------|-----|
| 1 | Contrasty Angeles       | CL   | 12.3 |
| 2 | 命日                    | CL   | 12.2 |
| 3 | Moonfall／大月墜落狂想   | CB   | 12.2 |
| 4 | Regnaissance            | CL   | 12.1 |
| 5 | Innocent white          | CB   | 12.1 |
| 6 | Broken Conviction       | CL   | 11.9 |
| 7 | Meltovt Necrosys        | CB   | 11.9 |
| 8 | Moonflutter             | CL   | 11.7 |
| 9 | Fly To Meteor feat.兔柒  | CL   | 11.7 |
| 10 | HYPER MEMORIES         | CB   | 11.7 |
| 11 | Broken Conviction      | CB   | 11.5 |
| 12 | Threat - Metropolis    | CB   | 11.5 |
| 13 | Contrasty Angeles      | CB   | 11.5 |
| 14 | slic.hertz #GdbG       | CB   | 11.4 |
| 15 | Moonflutter            | CB   | 11.4 |
| 16 | Algebra                | CB   | 11.4 |
| 17 | Fragment of Memories   | CB   | 11.3 |
| 18 | IN                     | CB   | 11.2 |
| 19 | イコラト               | CB   | 11.2 |
| 20 | 参宿四\~Betelgeuse\~    | CB   | 11.2 |

---

## 소개 - 날씨 예보

| 제목                   | DZ   | SK   | CB   | CL   |
|------------------------|------|------|------|------|
| Welcome to Milthm      | 1.0  | -    | -    | -    |
| 時落之雨               | 1.0  | 4.5  | 8.5  | -    |
| 夜風                   | 3.0  | 7.3  | 10.1 | -    |
| 花月                   | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光               | 2.0  | 7.5  | 9.1  | -    |

## 서장 - 빗소리

| 제목          | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| 雨之城        | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

## 본선 1장 - 달콤함과 쓴맛의 양면성

| 제목                    | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| 粗線條的雨              | 1.0  | 4.0  | 8.3  | -    |
| Aconsma                 | 1.0  | 6.0  | 9.3  | -    |
| OverRain                | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories    | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES          | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance            | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles       | 4.0  | 9.0  | 11.5 | 12.3 |

## 연동 - 비의 세계

| 제목                         | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| Sundown                      | 1.0  | -    | -    | -    |
| Bio-Engineering              | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands         | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure      | 2.0  | 5.5  | 10.3 | -    |
| White Lizard                 | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex  | 2.0  | 7.6  | 10.6 | -    |
| Kayava                       | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis          | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent            | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想        | 2.0  | 8.0  | 12.2 | -    |

## 연동 - Notanote

| 제목                 | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| 烁雨                 | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar    | 4.0  | 7.8  | 10.2 | -    |
| Innocent white       | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg              | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys     | 2.0  | 7.8  | 11.9 | -    |

## 단곡 - 꿈의 테이프

| 제목                          | DZ   | SK   | CB   | CL   |
|-------------------------------|------|------|------|------|
| ネオン色のまち feat. Mai       | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                     | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                     | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                | -    | -    | -    | SP   |
| WATER                        | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                      | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                       | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                  | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor               | 3.0  | 6.5  | 10.5 | 11.7 |
| 樱落繁花                     | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                     | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro            | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)   | 3.0  | 7.5  | 10.5 | -    |
| Algebra                      | 2.0  | 8.1  | 11.4 | -    |
| Words                        | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                     | 3.5  | 6.6  | 3.5  | -    |
| 白虎蓮華                     | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片               | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~         | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG             | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!              | 2.0  | 7.5  | 9.8  | -    |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                   | -    | -    | -    | Ø    |
| Broken Conviction            | 4.5  | 4.5  | 11.5 | 11.9 |

---

## 문의하기

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**: 375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**: 678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)
