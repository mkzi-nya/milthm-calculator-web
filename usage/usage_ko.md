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

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

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

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

[파일](https://support.apple.com//102570) 앱을 사용하여 Milthm 폴더를 엽니다.

```text
/data/
```

> 로컬 파일을 찾을 수 없는 경우: "파일" 홈 페이지 오른쪽 상단의 점 세 개 메뉴로 이동하여 로컬 파일 숨기기를 해제합니다 ([자세한 내용은](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html) 참조).

- **Windows 사용자:**
  탐색기 주소 표시줄에 다음을 입력합니다.
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

[안드로이드 시연 영상](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)
[IOS 시연 영상](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)
안드로이드 사용자 [접근 권한 없음](#접근-권한-없음)

---

### 분석된 데이터 입력

홈페이지의 입력 상자에 다음 형식으로 데이터를 입력합니다.

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5,v3],
    [name,Difficulty, constant, score, acc, level,achievedStatus,isv3?]
}
```

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

## 레이더 차트

관련 계산 방식은 `PanyiAme`가 제공했으며, 자세한 내용은 [Milthm 점수표 설명](https://wwp.lanzoup.com/iZ59A2j8nbpe)을 참조하십시오.

---

## Milthm에 대하여

[목차로 돌아가기](#목차)

### Reality 계산 공식

Reality는 플레이 점수와 채보 정수를 기반으로 계산됩니다.

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

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

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")),<br>[Brightened Demonios](info:info("Brightened Demonios","Drizzle")),<br>[Broken Conviction](info:info("Broken Conviction","Drizzle")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")),<br>[Curse of 14](info:info("Curse of 14","Drizzle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")),<br>[Fantasia Sonata Hope](info:info("Fantasia Sonata Hope","Drizzle")),<br>[Fluorescent Light](info:info("Fluorescent Light","Drizzle")),<br>[Fragment of Memories](info:info("Fragment of Memories","Drizzle")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")),<br>[IN](info:info("IN","Drizzle")),<br>[Kayava](info:info("Kayava","Drizzle")),<br>[Oniichan](info:info("Oniichan","Drizzle")),<br>[OverRain](info:info("OverRain","Drizzle")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")),<br>[仮想明日](info:info("仮想明日","Drizzle")),<br>[烁雨](info:info("烁雨","Drizzle")),<br>[運命](info:info("運命","Drizzle")),<br>[はんてん](info:info("はんてん","Drizzle")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")),<br>[Aleph-0](info:info("Aleph-0","Sprinkle")),<br>[apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")),<br>[Broken Conviction](info:info("Broken Conviction","Sprinkle")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")),<br>[Curse of 14](info:info("Curse of 14","Sprinkle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")),<br>[Fantasia Sonata Hope](info:info("Fantasia Sonata Hope","Sprinkle")),<br>[Fluorescent Light](info:info("Fluorescent Light","Sprinkle")),<br>[Fragment of Memories](info:info("Fragment of Memories","Sprinkle")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")),<br>[Oniichan](info:info("Oniichan","Sprinkle")),<br>[OverRain](info:info("OverRain","Sprinkle")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")),<br>[仮想明日](info:info("仮想明日","Sprinkle")),<br>[烁雨](info:info("烁雨","Sprinkle")),<br>[運命](info:info("運命","Sprinkle")),<br>[☹](info:info("☹","Sprinkle")),<br>[はんてん](info:info("はんてん","Sprinkle")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")),<br>[Algebra](info:info("Algebra","Cloudburst")),<br>[apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")),<br>[Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[Broken Conviction](info:info("Broken Conviction","Cloudburst")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")),<br>[cybernetic blazar](info:info("cybernetic blazar","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")),<br>[Fantasia Sonata Hope](info:info("Fantasia Sonata Hope","Cloudburst")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")),<br>[Fluorescent Light](info:info("Fluorescent Light","Cloudburst")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")),<br>[Kayava](info:info("Kayava","Cloudburst")),<br>[LOUDER!](info:info("LOUDER!","Cloudburst")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")),<br>[OverRain](info:info("OverRain","Cloudburst")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")),<br>[Regnaissance](info:info("Regnaissance","Cloudburst")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[Words](info:info("Words","Cloudburst")),<br>[百九十](info:info("百九十","Cloudburst")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")),<br>[仮想明日](info:info("仮想明日","Cloudburst")),<br>[靈](info:info("靈","Cloudburst")),<br>[暮予星光](info:info("暮予星光","Cloudburst")),<br>[運命](info:info("運命","Cloudburst")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")),<br>[Myth compiler](info:info("Myth compiler","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")),<br>[樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")),<br>[Innocent white](info:info("Innocent white","Cloudburst")),<br>[Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")),<br>[大月墜落狂想](info:info("大月墜落狂想","Cloudburst")),<br>[烁雨](info:info("烁雨","Cloudburst")),<br>[樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")),<br>[烁雨](info:info("烁雨","Drizzle")) | [HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")),<br>[Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Icier | [Autumn Rain](info:info("Autumn Rain","Drizzle")),<br>[運命](info:info("運命","Drizzle")) | [Autumn Rain](info:info("Autumn Rain","Sprinkle")),<br>[運命](info:info("運命","Sprinkle")) |  |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")),<br>[Elsorhg](info:info("Elsorhg","Drizzle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")),<br>[Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")),<br>[LOUDER!](info:info("LOUDER!","Drizzle")),<br>[Moonflutter](info:info("Moonflutter","Drizzle")),<br>[Sakuyahime](info:info("Sakuyahime","Drizzle")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")),<br>[WATER](info:info("WATER","Drizzle")),<br>[白虎蓮華](info:info("白虎蓮華","Drizzle")),<br>[大月墜落狂想](info:info("大月墜落狂想","Drizzle")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")),<br>[イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")),<br>[Brightened Demonios](info:info("Brightened Demonios","Sprinkle")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")),<br>[Elsorhg](info:info("Elsorhg","Sprinkle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")),<br>[Jump out?](info:info("Jump out?","Sprinkle")),<br>[LOUDER!](info:info("LOUDER!","Sprinkle")),<br>[Sakuyahime](info:info("Sakuyahime","Sprinkle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")),<br>[White Lizard](info:info("White Lizard","Sprinkle")),<br>[白虎蓮華](info:info("白虎蓮華","Sprinkle")),<br>[大月墜落狂想](info:info("大月墜落狂想","Sprinkle")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")),<br>[花月](info:info("花月","Sprinkle")),<br>[暮予星光](info:info("暮予星光","Sprinkle")),<br>[时落之雨](info:info("时落之雨","Sprinkle")),<br>[夜風](info:info("夜風","Sprinkle")),<br>[樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")),<br>[Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")),<br>[Elsorhg](info:info("Elsorhg","Cloudburst")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")),<br>[Oniichan](info:info("Oniichan","Cloudburst")),<br>[Sakuyahime](info:info("Sakuyahime","Cloudburst")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")),<br>[白虎蓮華](info:info("白虎蓮華","Cloudburst")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")),<br>[花月](info:info("花月","Cloudburst")),<br>[命日](info:info("命日","Cloudburst")),<br>[时落之雨](info:info("时落之雨","Cloudburst")),<br>[夜風](info:info("夜風","Cloudburst")),<br>[イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")),<br>[Algebra](info:info("Algebra","Drizzle")),<br>[Before it Ends](info:info("Before it Ends","Drizzle")),<br>[Deluge](info:info("Deluge","Drizzle")),<br>[Dogbite](info:info("Dogbite","Drizzle")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")),<br>[Garden](info:info("Garden","Drizzle")),<br>[Hikari](info:info("Hikari","Drizzle")),<br>[INFP.mp3](info:info("INFP.mp3","Drizzle")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")),<br>[Pthahnil](info:info("Pthahnil","Drizzle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")),<br>[Virtual S0da](info:info("Virtual S0da","Drizzle")),<br>[粗线条的雨](info:info("粗线条的雨","Drizzle")),<br>[いつか忘れるんだろう](info:info("いつか忘れるんだろう","Drizzle")),<br>[サイクルの欠片](info:info("サイクルの欠片","Drizzle")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")),<br>[Before it Ends](info:info("Before it Ends","Sprinkle")),<br>[Deluge](info:info("Deluge","Sprinkle")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")),<br>[Elsorhg](info:info("Elsorhg","Sprinkle")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")),<br>[Garden](info:info("Garden","Sprinkle")),<br>[Hikari](info:info("Hikari","Sprinkle")),<br>[INFP.mp3](info:info("INFP.mp3","Sprinkle")),<br>[Innocent white](info:info("Innocent white","Sprinkle")),<br>[Moonflutter](info:info("Moonflutter","Sprinkle")),<br>[Pthahnil](info:info("Pthahnil","Sprinkle")),<br>[Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")),<br>[Virtual S0da](info:info("Virtual S0da","Sprinkle")),<br>[粗线条的雨](info:info("粗线条的雨","Sprinkle")),<br>[命日](info:info("命日","Sprinkle")),<br>[いつか忘れるんだろう](info:info("いつか忘れるんだろう","Sprinkle")),<br>[サイクルの欠片](info:info("サイクルの欠片","Sprinkle")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")),<br>[Aleph-0](info:info("Aleph-0","Cloudburst")),<br>[Before it Ends](info:info("Before it Ends","Cloudburst")),<br>[Deluge](info:info("Deluge","Cloudburst")),<br>[Elsorhg](info:info("Elsorhg","Cloudburst")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")),<br>[Garden](info:info("Garden","Cloudburst")),<br>[INFP.mp3](info:info("INFP.mp3","Cloudburst")),<br>[Pthahnil](info:info("Pthahnil","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[粗线条的雨](info:info("粗线条的雨","Cloudburst")),<br>[仮想明日](info:info("仮想明日","Cloudburst")),<br>[雨女](info:info("雨女","Cloudburst")),<br>[いつか忘れるんだろう](info:info("いつか忘れるんだろう","Cloudburst")),<br>[サイクルの欠片](info:info("サイクルの欠片","Cloudburst")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
| Milthm Team | [cybernetic blazar](info:info("cybernetic blazar","Drizzle")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Drizzle")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Drizzle")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Drizzle")),<br>[花月](info:info("花月","Drizzle")),<br>[暮予星光](info:info("暮予星光","Drizzle")),<br>[时落之雨](info:info("时落之雨","Drizzle")),<br>[夜風](info:info("夜風","Drizzle")) | [Algebra](info:info("Algebra","Sprinkle")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Sprinkle")) | [驟雨の狭間](info:info("驟雨の狭間","Cloudburst")) |  | [Algebra](info:info("Algebra","Special")),<br>[KAEDE](info:info("KAEDE","Special")) |
| Murty | [Regnaissance](info:info("Regnaissance","Drizzle")) |  |  |  |  |
| SakiA | [☹](info:info("☹","Drizzle")) |  |  |  |  |
| TCSTWTBHY | [Dogbite](info:info("Dogbite","Drizzle")),<br>[GlassyHeart.](info:info("GlassyHeart.","Drizzle")),<br>[Innocent white](info:info("Innocent white","Drizzle")),<br>[Jump out?](info:info("Jump out?","Drizzle")),<br>[Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")),<br>[Words](info:info("Words","Drizzle")),<br>[☹](info:info("☹","Drizzle")) | [Dogbite](info:info("Dogbite","Sprinkle")),<br>[GlassyHeart.](info:info("GlassyHeart.","Sprinkle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")),<br>[Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Sprinkle")),<br>[Words](info:info("Words","Sprinkle")),<br>[☹](info:info("☹","Sprinkle")),<br>[イコラト](info:info("イコラト","Sprinkle")) | [Jump out?](info:info("Jump out?","Cloudburst")),<br>[Moving On](info:info("Moving On","Cloudburst")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Cloudburst")) | [命日](info:info("命日","Clear")) |  |
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
| 树穴猪 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) | [IN](info:info("IN","Sprinkle")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) |  |  |
| 王子 |  | [IN](info:info("IN","Sprinkle")) |  |  |  |
| 舞仙翼 |  |  | [Innocent white](info:info("Innocent white","Cloudburst")) |  |  |
| 嘤箱 | [命日](info:info("命日","Drizzle")) |  |  |  |  |
| 余火 | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Drizzle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Sprinkle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Cloudburst")) | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit","Clear")) |  |
| 雨眠 | [百九十](info:info("百九十","Drizzle")) | [百九十](info:info("百九十","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[OverRain](info:info("OverRain","Cloudburst")) |  |  |
| 云梦 |  | [cybernetic blazar](info:info("cybernetic blazar","Sprinkle")),<br>[Kayava](info:info("Kayava","Sprinkle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")),<br>[雨女](info:info("雨女","Sprinkle")) | [Chartreuse Green](info:info("Chartreuse Green","Cloudburst")),<br>[Fragment of Memories](info:info("Fragment of Memories","Cloudburst")),<br>[Moonflutter](info:info("Moonflutter","Cloudburst")),<br>[☹](info:info("☹","Cloudburst")),<br>[イコラト](info:info("イコラト","Cloudburst")) |  |  |

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

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**

- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

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
