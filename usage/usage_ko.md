
# 목차

- [사용 설명](#사용-설명)
  - [저장 파일 업로드](#저장-파일-업로드)
  - [파싱된 데이터 입력](#파싱된-데이터-입력)
  - [구버전 저장 파일](#구버전-저장-파일)
  - [기타 저장 경로](#기타-저장-경로)
- [작동 원리](#작동-원리)
  - [Reality 계산 공식](#reality-계산-공식)
  - [레이더 차트](#레이더-차트)
- [문의하기](#문의하기)

---

## 사용 설명

### 저장 파일 업로드

홈페이지에서 **「파일 업로드」** 옵션을 클릭하여 저장 파일 (`saves.db`) 또는 기록 파일 (`data.db`)을 선택하여 업로드하세요.

> **주의**：
> - `data.db`에는 `3.2` 업데이트 이후의 플레이 기록만 포함됩니다（손실되지 않은 경우）。
> - 안드로이드에서는 [MT 관리자](https://mt2.cn/)를 사용하여 `sdcard/Android/data` 디렉터리에 접근하는 것이 좋습니다.

#### **파일 경로（자세한 내용은 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) 참조）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  [파일](https://support.apple.com/ko-kr/102570) 앱을 사용하여 Milthm 폴더 열기：
  ```text
  /data/
  ```
- **Windows**
  파일 탐색기 주소 표시줄에 입력：
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

홈페이지의 입력 필드에 데이터를 입력하세요. 형식은 다음과 같습니다：

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc`는 소수 값이며, `level`은 등급을 나타내며 정의는 다음과 같습니다：

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 구버전 저장 파일

`Milthm 3.2` 이전의 저장 파일은 모바일에서 직접 추출할 수 없으며, 다음 방법을 시도해볼 수 있습니다：

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "파일 $FILE_NAME 이(가) /sdcard/ 로 성공적으로 복사되었습니다."
            break
        else
            echo "파일 복사 실패, 권한을 확인하세요!"
        fi
    fi
done
```

---

### 기타 저장 경로

업로드 후 파싱할 수 없는 경우, JSON 데이터를 수동으로 추출하여 업로드할 수 있습니다：

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
  milthm 애플리케이션 데이터/Data/Library/Preferences
  ```
- **Windows**
  레지스트리 위치：
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

Reality 값은 플레이 점수와 패턴의 난이도를 기반으로 계산됩니다：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

단일 곡 Reality 계산 공식은 다음과 같습니다（s는 점수, c는 난이도 상수）：

$$
\text{Reality}(s, c) =
\begin{cases} 
\mathbf{1 + c}, & s \in [1005000, 1010000) \\
\displaystyle \frac{1.4}{e^{-3.65 \cdot \left(\frac{s}{10000} - 99.5\right)} + 1} - 0.4 + c, 
& s \in [995000, 1005000) \\
\displaystyle \frac{e^{3.1 \cdot \frac{s - 980000}{15000}} - 1}{e^{3.1} - 1} \cdot 0.8 - 0.5 + c, 
& s \in [980000, 995000) \\
\displaystyle \frac{s}{280000} - 4 + c, & s \in [700000, 980000) \\
0, & s \in (-\infty, 700000)
\end{cases}
$$

#### 코드 구현：
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

### 레이더 차트

관련 계산 방식은 `PanyiAme`가 제공하였으며, 자세한 내용은 [Milthm 점수표 설명](https://wwp.lanzoup.com/iZ59A2j8nbpe)에서 확인할 수 있습니다.

---

## 문의하기

- **[Milthm#-1 공식 그룹](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[Milthm#Φ 커뮤니티 그룹](https://qm.qq.com/q/fIErsKKz3a)**：678471942
