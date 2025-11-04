> 참고: 현재 사용 중인 언어 버전은 더 이상 유지보수되지 않으며, 일부 정보는 오래되었을 수 있습니다. [영어](?lang=en) 또는 [간체 중국어](?lang=zh) 버전으로 이동하는 것을 권장합니다.
> 또는 [이 저장소](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91)에서 현재 언어 번역에 대한 PR을 제출할 수 있습니다.
  최종 유지보수일: 2025.7.5

## 목차

- [웹사이트](#웹사이트)
- [사용 설명](#사용-설명)
  - [저장 파일 업로드](#저장-파일-업로드)
  - [분석된 데이터 입력](#분석된-데이터-입력)
  - [이전 버전 저장](#이전-버전-저장)
  - [기타 저장 경로](#기타-저장-경로)
  - [레이더 차트](#레이더-차트)
- [Milthm에 대하여](#milthm에-대하여)
  - [Reality 계산 공식](#reality-계산-공식)
  - [저장 파일에 대하여](#저장-파일에-대하여)
  - [노트 판정](#노트-판정)
  - [정산 등급](#정산-등급)
  - [완료 상태](#완료-상태)
  - [만우절](#만우절)
  - [히든곡 해금 방법](#히든곡-해금-방법)
  - [정수표](#정수표)
  - [채보가 통계](#채보가-통계)
  - [Milthm 개발 가속화 클릭](#milthm-개발-가속화-클릭)
- [문의하기](#문의하기)
- [자주 묻는 질문](#자주-묻는-질문)
- [기타 내용](#기타-내용)
  - [Milthm Wiki](#milthm-wiki)
  - [Milthm 교류 그룹](#milthm-교류-그룹)
  - [파일 경로란 무엇인가](#파일-경로란-무엇인가)
  - [Reality 대조표](#reality-대조표)

---

{{updata}}

> 인터페이스 렌더링에 문제가 발생하면 [GitHub에서 방문](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)하세요.

---

## 웹사이트

{{网站}}

---

## 사용 설명

> 점수 계산기는 순전히 플레이어가 자체 제작한 것으로, 공식과는 관련이 없습니다.

### 저장 파일 업로드

홈페이지의 **"파일 업로드"** 옵션을 클릭하여 저장 파일 `saves.db` 또는 점수 기록 파일 `data.db`를 업로드합니다.

> **참고:**
> - `data.db`는 `3.2` 업데이트 이후의 플레이 기록만 포함합니다 (손실되지 않은 경우).
> - 안드로이드에서는 [MT 관리자](https://mt2.cn/)를 사용하여 `sdcard/Android/data` 디렉토리에 접근하는 것을 권장합니다.

#### 파일 경로 (자세한 내용은 [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) 참조)

[파일 경로란 무엇인가](#파일-경로란-무엇인가)

{{11}}

[파일](https://support.apple.com//102570) 앱을 사용하여 Milthm 폴더를 엽니다.

```text
/data/
```

> 로컬 파일을 찾을 수 없는 경우: "파일" 홈 페이지 오른쪽 상단의 점 세 개 메뉴로 이동하여 로컬 파일 숨기기를 해제합니다 ([자세한 내용은](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html) 참조).

- **Windows 사용자:**
  탐색기 주소 표시줄에 다음을 입력합니다.
  {{12}}

[안드로이드 시연 영상](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)
[IOS 시연 영상](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)
안드로이드 사용자 [접근 권한 없음](#접근-권한-없음)

---

### 분석된 데이터 입력

홈페이지의 입력 상자에 다음 형식으로 데이터를 입력합니다.

{{13}}

여기서:
- `acc`는 소수점으로 표시된 정확도입니다.
- `level`은 등급을 나타내며, 그 정의는 다음과 같습니다.

{{14}}

---

### 이전 버전 저장

`Milthm 3.2` 이전의 저장 파일은 모바일에서 직접 추출할 수 없으며, 다음 방법을 시도해 볼 수 있습니다.

{{15}}

---

### 기타 저장 경로

업로드 후 분석할 수 없는 경우, JSON 데이터를 수동으로 추출하여 업로드해 볼 수 있습니다.

{{16}}

---

## 레이더 차트

관련 계산 방식은 `PanyiAme`가 제공했으며, 자세한 내용은 [Milthm 점수표 설명](https://wwp.lanzoup.com/iZ59A2j8nbpe)을 참조하십시오.

---

## Milthm에 대하여

[목차로 돌아가기](#목차)

### Reality 계산 공식

Reality는 플레이 점수와 채보 정수를 기반으로 계산됩니다.

{{17}}

단일 곡 Reality 계산 공식은 다음과 같습니다 (여기서 s는 점수, c는 정수).

{{reality公式}}

[Reality 대조표](#reality-대조표)

#### 코드 구현:

{{公式js}}

---

## 점수 차트의 Ytilaer에 대하여

이 값은 실제 의미가 없으며, 구체적인 내용은 다음과 같습니다.
- b20의 평균 점수가 1005k를 초과할 때, 이 값은 실제 Reality와 같습니다.
- 이 값은 20곡의 Reality(평균 점수, 평균 단일 곡 rlt)의 최댓값입니다.

## 저장 파일에 대하여

다음 섹션에서 경로는 `MilthmDataDirectory`로 약칭됩니다.

### 게임 저장
이 파일은 `MilthmDataDirectory/saves.db`에 있습니다.

여기에는 플레이어의 게임 진행 상황 및 관련 게임 기록 데이터가 포함됩니다.

데이터는 kv 테이블에 json 형식으로 저장됩니다 (json 형식은 이전 버전의 저장 데이터 형식과 동일합니다).

### 데이터 저장
이 파일은 `MilthmDataDirectory/data.db`에 있습니다.

매번 성공적으로 제출된 점수 데이터를 저장하는 데 사용됩니다.

이 파일의 데이터는 로컬 순위표의 데이터 소스입니다.

---

## 노트 판정

게임 내 단일 노트 판정은 총 다섯 가지로 나뉩니다.

- **Perfect**: 101% 점수 및 100% ACC 획득.
- **perfect**: 정확도에 따라 75%-101% 점수 및 100% ACC 획득.
- **Good**: 정확도에 따라 30%-75% 점수 및 50% ACC 획득.
- **Bad**: 콤보 중단, 0%-30% 점수 및 10% ACC 획득.
- **Miss**: 콤보 중단, 점수 및 ACC 미획득.

각 구간 내의 점수는 정확도에 비례하며, 자세한 판정 범위는 다음 표에 나와 있습니다.

{{判定范围}}

---

## 정산 등급

정산 등급은 여덟 가지로 나뉩니다.
FC(풀 콤보)를 달성하지 못하면 흰색, FC는 파란색, AP는 보라색입니다.
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">: 구 버전에서는 <img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">로 표시되었으며, 이론값 1010000점(RHYTHM of RAIN, 모든 노트 만점) 달성.
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M, 즉 Milthm, 점수 1005000점 달성 시 획득.
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">: 점수 950000점 달성 시 획득.
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">: 점수 900000점 달성 시 획득.
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">: 점수 850000점 달성 시 획득.
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">: 점수 800000점 달성 시 획득.
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">: 점수 800000점 미만 시 획득, 클리어 실패, FC/AP 아이콘 없음.

---

## 완료 상태

플레이 종료 후 채보에 표시되는 평가는 다음과 같습니다.

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:
  - ACC > 80%, 그리고 최소 하나 이상의 Bad/Miss 판정 존재.
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:
  - 모든 노트가 ±140ms 이내에 히트되었으며, 최소 하나 이상의 Good 판정 존재.
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:
  - 모든 노트가 ±70ms 이내에 히트되었으며, 최소 하나 이상의 small perfect 판정 존재.
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:
  - 모든 노트가 ±35ms 이내에 히트되었으며, 즉 이론값.
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:
  - AutoPlay로 클리어.
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:
  - 점수가 1010000점 초과 (폭우 사용).

---

## 만우절

### 공략 (참고용)
- 게임 진입 후 악몽 모드에서 임의의 `CB` 난이도 곡을 플레이하면, 플레이 중 난이도 표시가 변경되고 모든 버튼이 빗줄기로 변하며 점수가 매우 느리게 상승합니다.
- 플레이 후 팝업 메시지가 뜨고, 확인 후 돌아오면 모든 곡의 레벨이 약 20배 상승하며 ([보기](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)), UserReality는 20배 곱해집니다 (만우절 정수와는 관련 없음).
- 그 다음 임의의 채보를 다시 플레이하면 팝업이 뜨고, 30레벨 이상의 채보가 제거됩니다.
- 16레벨 이상의 채보를 플레이하여 스토리에 진입하면 `Rainbow Flavor!`의 만우절 채보가 해금되고 게임이 강제 종료됩니다.
- 그 다음 루웨이덕 미니게임이 나타나고, 일정 라운드까지 플레이하면 두 번째 만우절 채보가 해금됩니다.

---

## 히든곡 해금 방법

- **Regnaissance**

  HYPER MEMORIES를 해금하고 플레이합니다.
  플레이 중 배경에 흑백 수잔이 나타나면, 이때 어떤 노트도 치지 마십시오.
  그 후 점수가 마이너스가 되고, 동시에 수잔이 컬러로 변합니다. 계속 플레이하여 점수를 0보다 크게 만들면, 정산 후 이 곡이 해금됩니다.

- **Contrasty Angeles**

  Regnaissance를 해금한 후, 메인 스토리 챕터 1의 6화를 읽습니다.
  HYPER MEMORIES를 플레이합니다.
  플레이 중 배경에 흑백 수잔이 나타나면, 이때 풀 콤보를 유지해야 합니다.
  그 후 점수가 급감하고, 동시에 수잔이 컬러로 변합니다. 계속 플레이하여 점수를 0보다 크게 만들면, 정산 후 이 곡이 해금됩니다.

- **Dogbite**
- Dogbite CB 난이도를 플레이하고 A등급 이상을 획득합니다.
- 첫 번째 조건을 만족한 후, Oiiaioooooiai를 플레이하고 노트가 고양이로 변할 때 풀 콤보를 유지합니다 (이전 노트는 쳐도 되고 안 쳐도 됩니다). 이때 노트를 칠 때마다 개 짖는 소리가 납니다.
- 두 번째 조건을 만족한 후, 이변이 발생하고 Dogbite SP 채보로 진입하면 해금 성공입니다 (클리어할 필요 없음).

- 참고: `폭우` 이변을 활성화하여 해금 난이도를 낮출 수 있습니다.

---

## 정수표

[목차로 돌아가기](#목차)

{{章节en}}

---

## 설명

> - 모든 `SP` 및 비정규 채보는 Reality 계산에 참여하지 않습니다.
> - 정밀도 문제로 인해 현재 버전의 모든 정수 11.9 곡은 11.9보다 낮은 정수를 가집니다. 예를 들어, 어떤 버전의 이론 Reality가 `13.005`라면, 게임 내에서는 `13.01`이 아닌 `13.00`으로 표시되며, 실제 계산은 `13.004999…`입니다.

현재 버전의 이론 Reality는 `12.725` (12.72로 표시)
현재 버전에서 정수가 가장 높은 20곡은 다음과 같습니다.

{{章节en1}}

---

## 채보가 통계

<div style="font-size:10px;">

{{charter}}

</div>

---

## Milthm 개발 가속화 클릭

Milthm 개발 가속화 링크 클릭
1, https://github.com/sponsors/morizerodev/
2, https://afdian.com/a/morizero

---

## 문의하기

{{联系我们}}

---

### 자주 묻는 질문

[목차로 돌아가기](#목차)

- [이미지 (또는 기타 요소) 생성 클릭 시 반응 없음](#이미지-또는-기타-요소-생성-클릭-시-반응-없음)
- [파일을 찾을 수 없거나 폴더가 존재하지 않음](#파일을-찾을-수-없거나-폴더가-존재하지-않음)
- [저장 파일 백업 방법](#저장-파일-백업-방법)
- [저장 파일 복구](#저장-파일-복구)
- [Reality 계산 공식](#reality-계산-공식)
- [노트 판정](#노트-판정)

> 가장 기본적인 조작법을 알고 있는지 확인하십시오. 모른다면 스스로 배우려 하지 않는 한 이 웹사이트를 사용하지 않는 것이 좋습니다.

---

#### 이미지 (또는 기타 요소) 생성 클릭 시 반응 없음

- 네트워크 상태를 확인하십시오. GitHub에 접속할 수 없다면 [k9.lv/c/](http://k9.lv/c)로 이동할 수 있습니다.
- 시스템 기본 브라우저로 변경하거나 Chrome, [Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ)와 같은 브라우저를 사용해 보십시오.
  (Baidu, 360 등 브라우저는 권장하지 않습니다.)
- 문제가 계속된다면 시스템 버전이 너무 낮을 수 있습니다.

---

#### 파일을 찾을 수 없거나 폴더가 존재하지 않음

[저장 파일 업로드](#저장-파일-업로드)에서 저장 경로를 확인할 수 있습니다.

#### 접근 권한 없음

먼저 Milthm 버전을 확인하십시오. 3.2 이상 버전으로 업데이트한 후에는 게임을 한 번 실행해야 해당 경로에 저장 파일이 생성됩니다.

- **안드로이드**

  현재 시스템 파일 관리자 또는 타사 파일 관리자를 사용 중이라면 다른 파일 관리자를 사용하여 접근해 볼 수 있습니다.
  [MT 관리자](https://mt2.cn/)를 사용하는 것을 권장하며, 앱 상단의 주소 표시줄에 다음 경로를 직접 입력하여 이동합니다 (여러 사용자가 있는 경우 `0`을 사용자 ID로 변경하거나 `/storage/emulated/0/`을 `/sdcard/`로 변경하십시오).
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  오른쪽 상단의 북마크 추가를 통해 하단에서 위로 스와이프하여 + 버튼을 눌러 빠르게 접근할 수도 있습니다.

시스템 기본 파일 브라우저를 사용하지 않고 순정 안드로이드의 `파일` 앱을 사용해 볼 수도 있습니다.
`파일` 앱 진입 방법:
MT 관리자를 엽니다.
`설치된 앱 추출` 클릭 -- `시스템 앱` 선택 -- `파일` 검색 -- `파일` 클릭, 왼쪽 하단 `더보기` 선택 -- 앱 실행
Milthm 저장 폴더에 진입한 후 `내부 저장소로 복사` ( `/storage/emulated/0/`, 일반적으로 `파일` 앱의 루트 디렉토리)를 선택한 후 브라우저에서 접근할 수 있습니다.
저장 파일에 문제가 발생한 경우에도 유사한 방식으로 복구할 수 있습니다. 자세한 내용은 [저장 파일 복구](#저장-파일-복구)를 참조하십시오.

그래도 접근할 수 없다면 컴퓨터에 연결하거나 ADB 권한을 사용하여 접근해야 합니다.
높은 버전의 안드로이드 시스템에서는 이러한 문제가 발생할 수 있습니다. 개발자 옵션에서 USB 디버깅이 활성화되어 있고 "무선 디버깅"이 켜져 있다면, 컴퓨터 없이 [Shizuku](https://shizuku.rikka.app/zh-hans/download/)를 사용하여 무선 ADB 디버깅을 할 수 있습니다. 자세한 내용은 Shizuku 관련 문서를 참조하십시오.

- **IOS**

  `파일` 앱에서 이 iPhone/iPad 폴더를 찾을 수 없다면, 앱 홈 페이지로 이동하여 오른쪽 상단의 설정에서 로컬 파일이 숨겨져 있는지 확인하십시오.
  그래도 Milthm 폴더를 찾을 수 없다면, 올바른 Milthm 버전을 사용하고 있는지 확인하십시오.
  [IOS 시연 영상](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### 저장 파일 백업 방법

저장 디렉토리로 이동하여 전체 data 폴더를 다른 경로로 복사합니다.

#### 저장 파일 복구

수동으로 백업한 저장 파일을 원래 경로의 저장 파일에 직접 덮어쓸 수 있습니다.
예기치 않은 상황을 방지하기 위해 점수 차트를 생성할 때 저장 파일을 텍스트 형식으로 이미지 내에 통합합니다 (~~텍스트로 이미지를 열어 직접 확인할 수 있습니다~~).
~~점수 차트를 직접 업로드하여 점수를 확인할 수 있습니다.~~
점수 차트를 [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html)에 업로드한 후, 다운로드를 클릭하여 저장 파일을 생성하고 (스토리 진행 상황은 포함되지 않으며, 제 것(mkzi-nya/귀몽)을 직접 복사한 것입니다), 원래 경로의 저장 파일을 대체할 수 있습니다.

## 기타 내용

[목차로 돌아가기](#목차)

### Milthm Wiki

{{wiki}}

### Milthm 교류 그룹

{{群}}

### 파일 경로란 무엇인가

파일 경로는 파일 시스템 내의 고유한 위치를 가리키는 문자열 표현으로, 일반적으로 디렉토리 트리 구조를 따릅니다. 운영 체제마다 `/`, `\`, `:`와 같은 다른 구분 기호를 사용합니다. 경로는 절대 경로 또는 상대 경로일 수 있으며, 폴더와 파일 간의 관계를 나타내는 데 사용되며 URL을 구성할 때도 매우 중요합니다.

#### 안드로이드 파일 경로

- **외부 저장소:**
  `/storage/emulated/사용자 ID (기본 주 사용자는 0)/` 또는 `/sdcard/` 아래에 있으며, 이 부분의 파일은 사용자에게 보입니다.
- **앱 데이터 디렉토리:**
  일반적으로 `/storage/emulated/0/Android/data/패키지명/`에 있으며, 예를 들어:
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```
  Milthm의 저장 디렉토리는 다음과 같습니다.
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  시스템이 접근을 차단하는 경우, 컴퓨터에 연결하거나 파일 관리자에게 ADB 권한을 부여해 보십시오.

---

### Reality 대조표

{{reality表}}
