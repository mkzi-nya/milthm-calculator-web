
## Содержание

- [Веб-сайт](#веб-сайт)
- [Инструкции](#инструкции)
  - [Загрузка Файлов Сохранения](#загрузка-файлов-сохранения)
  - [Ввод Обработанных Данных](#ввод-обработанных-данных)
  - [Старые Версии Сохранений](#старые-версии-сохранений)
  - [Другие Пути Сохранений](#другие-пути-сохранений)
  - [Радарная Диаграмма](#радарная-диаграмма)
- [О Milthm](#о-milthm)
  - [Формула Расчёта Reality](#формула-расчёта-reality)
  - [Оценка Нот](#оценка-нот)
  - [Оценка Результатов](#оценка-результатов)
  - [Статус Завершения](#статус-завершения)
  - [Таблица Констант](#таблица-констант)
- [Свяжитесь с Нами](#свяжитесь-с-нами)
- [Другой Контент](#другой-контент)
  - [Milthm Wiki](#milthm-wiki)
  - [Методы Разблокировки Скрытых Песен](#методы-разблокировки-скрытых-песен)
  - [Что Такое Путь к Файлу?](#что-такое-путь-к-файлу)
  - [Сравнительная Таблица Reality](#сравнительная-таблица-reality)

---

_Last updated on 2025.04.08 11:00 (UTC)_

> Если интерфейс отображается некорректно, пожалуйста, [посетите GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/)

---

## Веб-сайт

- [k9.lv/c/](http://k9.lv/c/)
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

---

## Инструкции

### Загрузка Файлов Сохранения

Нажмите на опцию **"Upload File"** на главной странице, чтобы выбрать и загрузить файл сохранения `saves.db` или файл с результатами `data.db`.

> **Примечание:**
> - Файл `data.db` содержит записи об игре, обновлённые после версии `3.2` (если они не утрачены).
> - Пользователям Android рекомендуется использовать [MT Manager](https://mt2.cn/) для доступа к каталогу `sdcard/Android/data`.

#### Путь к Файлу (см. [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[Что Такое Путь к Файлу?](#что-такое-путь-к-файлу)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

Откройте папку Milthm с помощью приложения [Files](https://support.apple.com//102570):

```text
/data/
```

> Если локальные файлы не обнаружены: перейдите в меню с тремя точками в правом верхнем углу страницы Files и включите отображение локальных файлов (см. [подробности](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Для пользователей Windows:**  
  Введите в адресной строке Проводника следующее:  
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

### Ввод Обработанных Данных

Введите данные в поле ввода на главной странице в следующем формате:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

Где:
- `acc` — десятичное число, представляющее точность;
- `level` обозначает рейтинг, определяемый следующим образом:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Старые Версии Сохранений

Сохранения, сделанные до версии `Milthm 3.2`, нельзя напрямую извлечь на мобильных устройствах. Вы можете попробовать следующие методы:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "文件 $FILE_NAME 已成功复制到 /sdcard/"
            break
        else
            echo "复制文件失败，请检查权限！"
        fi
    fi
done
```

---

### Другие Пути Сохранений

Если загрузка не анализируется, можно попробовать вручную извлечь JSON-данные и загрузить их:

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

## Радарная Диаграмма

Метод расчёта предоставлен `PanyiAme`. Для подробностей смотрите [Объяснение Таблицы Результатов Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## О Milthm

[Вернуться к Содержанию](#содержание)

### Формула Расчёта Reality

Reality рассчитывается на основе игрового результата и константы песни:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Формула расчёта Reality для одной песни (где s — баллы, а c — константа) выглядит следующим образом:

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

[Сравнительная Таблица Reality](#сравнительная-таблица-reality)

#### Реализация Кода:

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

## Оценка Нот

В игре существует пять типов оценки для каждой ноты:

- **Perfect:** Достигается 101% баллов и 100% ACC.
- **perfect:** Достигается от 75% до 101% баллов и 100% ACC в зависимости от точности.
- **Good:** Достигается от 30% до 75% баллов и 50% ACC в зависимости от точности.
- **Bad:** Прерывание комбо, что приводит к баллам от 0% до 30% и 10% ACC.
- **Miss:** Прерывание комбо, баллы и ACC не начисляются.

В каждом диапазоне баллы и точность пропорциональны. Подробные диапазоны приведены в таблице ниже:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## Оценка Результатов

Существует восемь уровней оценки результата:

- **R:** Rain – достижение теоретического результата 1010000 (RHYTHM of RAIN, когда все ноты — Perfect).
- **Purple S:** Достижение All Perfect (все ноты Perfect, но не достигается рейтинг R, баллы от 1000000 до 1009999).
- **Blue S:** Достижение Full Combo (все ноты попадают без Bad/Miss, без учёта требований по баллам ниже).
- **S:** 950000-1009999.
- **A:** 900000-949999.
- **B:** 850000-899999.
- **C:** 800000-849999.
- **F:** 0-799999.

---

## Статус Завершения

После окончания песни оценка производительности, отображаемая на графике, включает:

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80% и хотя бы один Bad/Miss.
- **Full Combo:**  
  - Все ноты попадают в пределах ±140 мс, хотя бы один Good.
- **All Perfect:**  
  - Все ноты попадают в пределах ±70 мс, хотя бы один small perfect.
- **Rhythm of Rain:**  
  - Все ноты попадают в пределах ±35 мс, то есть теоретическое значение.
- **AutoPlay is Awesome:**  
  - Пройдено с использованием AutoPlay.
- **Overloaded:**  
  - Баллы превышают 1010000 (при сильном ливне).

---

## Таблица Констант

[Вернуться к Содержанию](#содержание)

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

---

## Объяснение

> - Все SP и нестандартные партитуры не включаются в расчёт Reality.  
> - Из-за вопросов точности, в текущей версии все константы песен, которые должны быть 11.9, на самом деле ниже 11.9. Например, если теоретический Reality равен `13.005`, в игре он отображается как `13.00`, а фактический расчёт — `13.004999…`.

Теоретический Reality на данный момент равен `12.695` (отображается как 12.69).  
Топ-20 песен с наивысшими константами в текущей версии следующие:

| Rank | Title                   | Difficulty | Constant |
|------|-------------------------|------------|----------|
| 1 | Contrasty Angeles | CL | 12.3 |
| 2 | 命日 | CL | 12.2 |
| 3 | 大月墜落狂想 | CB | 12.2 |
| 4 | Regnaissance | CL | 12.1 |
| 5 | Innocent white | CB | 12.1 |
| 6 | Broken Conviction | CL | 11.9 |
| 7 | Meltovt Necrosys | CB | 11.9 |
| 8 | Moonflutter | CL | 11.7 |
| 9 | Fly To Meteor feat.兔柒 | CL | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | KASANE | CB | 11.6 |
| 12 | Broken Conviction | CB | 11.5 |
| 13 | Threat - Metropolis | CB | 11.5 |
| 14 | Contrasty Angeles | CB | 11.5 |
| 15 | slic.hertz | CB | 11.4 |
| 16 | Moonflutter | CB | 11.4 |
| 17 | Algebra | CB | 11.4 |
| 18 | Fragment of Memories | CB | 11.3 |
| 19 | cafe in 6412I731V | CB | 11.3 |
| 20 | IN | CB | 11.2 |
| 20 | イコラト | CB | 11.2 |
| 20 | 参宿四\~Betelgeuse\~ | CB | 11.2 |

---

## Introduction - Weather Report

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [Welcome to Milthm](javascript:info("Welcome to Milthm"))  | [1.0](javascript:chart("Welcome to Milthm", "Drizzle"))  | -    | -    | [SP](javascript:chart("Welcome to Milthm", "Special")) |
| [时落之雨](javascript:info("时落之雨"))           | [1.0](javascript:chart("时落之雨", "Drizzle"))  | [4.5](javascript:chart("时落之雨", "Sprinkle"))  | [8.5](javascript:chart("时落之雨", "Cloudburst"))  | -    |
| [夜風](javascript:info("夜風"))               | [3.0](javascript:chart("夜風","Drizzle"))  | [7.3](javascript:chart("夜風", "Sprinkle"))  | [10.1](javascript:chart("夜風", "Cloudburst")) | -    |
| [花月](javascript:info("花月"))               | [2.0](javascript:chart("花月", "Drizzle"))  | [8.2](javascript:chart("花月", "Sprinkle"))  | [9.3](javascript:chart("花月", "Cloudburst"))  | -    |
| [暮予星光](javascript:info("暮予星光"))           | [2.0](javascript:chart("暮予星光", "Drizzle"))  | [7.5](javascript:chart("暮予星光", "Sprinkle"))  | [9.1](javascript:chart("暮予星光", "Cloudburst")) | -    |

---

## Prologue - Rainfall Sounds

| Title        | DZ   | SK   | CB   | CL   |
|--------------|------|------|------|------|
| [雨之城](javascript:info("雨之城"))        | [1.0](javascript:chart("雨之城", "Drizzle"))  | [4.0](javascript:chart("雨之城", "Sprinkle"))  | [7.5](javascript:chart("雨之城", "Cloudburst"))  | -    |
| [Jump out?](javascript:info("Jump out?"))     | [2.0](javascript:chart("Jump out?", "Drizzle"))  | [7.9](javascript:chart("Jump out?", "Sprinkle"))  | [9.7](javascript:chart("Jump out?", "Cloudburst"))  | -    |
| [Moving On](javascript:info("Moving On"))     | [2.0](javascript:chart("Moving On", "Drizzle"))  | [6.3](javascript:chart("Moving On", "Sprinkle"))  | [10.8](javascript:chart("Moving On", "Cloudburst")) | -    |
| [☹](javascript:info("☹"))      | [4.0](javascript:chart("☹", "Drizzle"))  | [8.0](javascript:chart("☹", "Sprinkle"))  | [10.1](javascript:chart("☹", "Cloudburst")) | -    |
| [イコラト](javascript:info("イコラト"))      | [3.0](javascript:chart("イコラト", "Drizzle"))  | [8.7](javascript:chart("イコラト", "Sprinkle"))  | [11.2](javascript:chart("イコラト", "Cloudburst")) | -    |
| [雨女](javascript:info("雨女"))          | [3.0](javascript:chart("雨女", "Drizzle")) | [6.5](javascript:chart("雨女", "Sprinkle")) | [9.5](javascript:chart("雨女", "Cloudburst")) | [10.5](javascript:chart("雨女", "Clear")) |
| [命日](javascript:info("命日"))          | [3.0](javascript:chart("命日", "Drizzle"))  | [8.7](javascript:chart("命日", "Sprinkle"))  | [11.1](javascript:chart("命日", "Cloudburst")) | [12.2](javascript:chart("命日", "Clear")) |

---

## Chapter1 - The Sides of Bitter and Sweet

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [粗线条的雨](javascript:info("粗线条的雨"))         | [1.0](javascript:chart("粗线条的雨", "Drizzle"))  | [4.0](javascript:chart("粗线条的雨", "Sprinkle"))  | [8.3](javascript:chart("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](javascript:info("Aconsma"))            | [1.0](javascript:chart("Aconsma", "Drizzle"))  | [6.0](javascript:chart("Aconsma", "Sprinkle"))  | [9.3](javascript:chart("Aconsma", "Cloudburst"))  | -    |
| [OverRain](javascript:info("OverRain"))           | [2.0](javascript:chart("OverRain", "Drizzle"))  | [7.6](javascript:chart("OverRain", "Sprinkle"))  | [10.0](javascript:chart("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](javascript:info("Fragment of Memories")) | [2.0](javascript:chart("Fragment of Memories", "Drizzle"))  | [8.4](javascript:chart("Fragment of Memories", "Sprinkle"))  | [11.3](javascript:chart("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](javascript:info("HYPER MEMORIES"))     | [1.0](javascript:chart("HYPER MEMORIES", "Drizzle"))  | [8.9](javascript:chart("HYPER MEMORIES", "Sprinkle"))  | [11.7](javascript:chart("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](javascript:info("Regnaissance"))       | [4.5](javascript:chart("Regnaissance", "Drizzle"))  | [8.5](javascript:chart("Regnaissance", "Sprinkle"))  | [11.1](javascript:chart("Regnaissance", "Cloudburst")) | [12.1](javascript:chart("Regnaissance", "Clear")) |
| [Contrasty Angeles](javascript:info("Contrasty Angeles"))  | [4.0](javascript:chart("Contrasty Angeles", "Drizzle"))  | [9.0](javascript:chart("Contrasty Angeles", "Sprinkle"))  | [11.5](javascript:chart("Contrasty Angeles", "Cloudburst")) | [12.3](javascript:chart("Contrasty Angeles", "Clear")) |

---

## Collaboration - Rain World

| Title                       | DZ   | SK   | CB   | CL   |
|-----------------------------|------|------|------|------|
| [Sundown](javascript:info("Sundown"))                | [1.0](javascript:chart("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](javascript:info("Bio-Engineering"))        | [2.0](javascript:chart("Bio-Engineering", "Drizzle"))  | [8.3](javascript:chart("Bio-Engineering", "Sprinkle"))  | [9.6](javascript:chart("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](javascript:info("Threat - Sky Islands"))   | [2.0](javascript:chart("Threat - Sky Islands", "Drizzle"))  | [6.9](javascript:chart("Threat - Sky Islands", "Sprinkle"))  | [10.6](javascript:chart("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](javascript:info("Threat - Superstructure")) | [2.0](javascript:chart("Threat - Superstructure", "Drizzle"))  | [5.5](javascript:chart("Threat - Superstructure", "Sprinkle"))  | [10.3](javascript:chart("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](javascript:info("White Lizard"))           | -    | [4.0](javascript:chart("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](javascript:info("Threat - Waterfront Complex")) | [2.0](javascript:chart("Threat - Waterfront Complex", "Drizzle"))  | [7.6](javascript:chart("Threat - Waterfront Complex", "Sprinkle"))  | [10.6](javascript:chart("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](javascript:info("Kayava"))                 | [3.0](javascript:chart("Kayava", "Drizzle"))  | [5.5](javascript:chart("Kayava", "Sprinkle"))  | [10.4](javascript:chart("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](javascript:info("Threat - Metropolis"))    | [2.0](javascript:chart("Threat - Metropolis", "Drizzle"))  | [6.6](javascript:chart("Threat - Metropolis", "Sprinkle"))  | [11.5](javascript:chart("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](javascript:info("Sheer Ice Torrent"))      | [2.0](javascript:chart("Sheer Ice Torrent", "Drizzle"))  | [7.8](javascript:chart("Sheer Ice Torrent", "Sprinkle"))  | [11.1](javascript:chart("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](javascript:info("大月墜落狂想")) | [2.0](javascript:chart("大月墜落狂想", "Drizzle"))  | [8.0](javascript:chart("大月墜落狂想", "Sprinkle"))  | [12.2](javascript:chart("大月墜落狂想", "Cloudburst")) | -    |

---

## Collaboration - Notanote

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [烁雨](javascript:info("烁雨"))             | [2.0](javascript:chart("烁雨", "Drizzle"))  | [7.0](javascript:chart("烁雨", "Sprinkle"))  | [9.4](javascript:chart("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](javascript:info("cybernetic blazar")) | [4.0](javascript:chart("cybernetic blazar", "Drizzle"))  | [7.8](javascript:chart("cybernetic blazar", "Sprinkle"))  | [10.2](javascript:chart("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](javascript:info("Innocent white"))    | [2.0](javascript:chart("Innocent white", "Drizzle"))  | [8.2](javascript:chart("Innocent white", "Sprinkle"))  | [12.1](javascript:chart("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](javascript:info("Elsorhg"))           | [2.0](javascript:chart("Elsorhg", "Drizzle"))  | [7.5](javascript:chart("Elsorhg", "Sprinkle"))  | [9.8](javascript:chart("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](javascript:info("Meltovt Necrosys"))  | [2.0](javascript:chart("Meltovt Necrosys", "Drizzle"))  | [7.8](javascript:chart("Meltovt Necrosys", "Sprinkle"))  | [11.9](javascript:chart("Meltovt Necrosys", "Cloudburst"))  | -    |

---

## Single - Dream Tape

| Title                          | DZ   | SK   | CB   | CL   |
|-|-|-|-|-|
| [ネオン色のまち feat. Mai](javascript:info("ネオン色のまち feat. Mai"))    | [3.5](javascript:chart("ネオン色のまち feat. Mai", "Drizzle"))  | [8.0](javascript:chart("ネオン色のまち feat. Mai", "Sprinkle"))  | [9.7](javascript:chart("ネオン色のまち feat. Mai", "Cloudburst"))  | -    |
| [INFP.mp3](javascript:info("INFP.mp3"))                    | [2.0](javascript:chart("INFP.mp3", "Drizzle"))  | [5.5](javascript:chart("INFP.mp3", "Sprinkle"))  | [9.2](javascript:chart("INFP.mp3", "Cloudburst"))  | -    |
| [Oniichan](javascript:info("Oniichan"))                    | [3.0](javascript:chart("Oniichan", "Drizzle"))  | [8.0](javascript:chart("Oniichan", "Sprinkle"))  | [9.8](javascript:chart("Oniichan", "Cloudburst"))  | -    |
| [Oiiaioooooiai](javascript:info("Oiiaioooooiai"))               | -    | -    | -    | [SP](javascript:chart("Oiiaioooooiai", "Special")) |
| [WATER](javascript:info("WATER"))                       | [3.0](javascript:chart("WATER", "Drizzle"))  | [7.3](javascript:chart("WATER", "Sprinkle"))  | [10.6](javascript:chart("WATER", "Cloudburst")) | -    |
| [Dogbite](javascript:info("Dogbite"))                     | [3.0](javascript:chart("Dogbite", "Drizzle"))  | [7.6](javascript:chart("Dogbite", "Sprinkle"))  | [10.3](javascript:chart("Dogbite", "Cloudburst")) | [SP](javascript:chart("Dogbite", "Special")) |
| [Hikari](javascript:info("Hikari"))                      | [3.0](javascript:chart("Hikari", "Drizzle"))  | [8.4](javascript:chart("Hikari", "Sprinkle"))  | [10.7](javascript:chart("Hikari", "Cloudburst")) | -    |
| [Moonflutter](javascript:info("Moonflutter"))                 | [3.0](javascript:chart("Moonflutter", "Drizzle"))  | [7.9](javascript:chart("Moonflutter", "Sprinkle"))  | [11.4](javascript:chart("Moonflutter", "Cloudburst")) | [11.7](javascript:chart("Moonflutter", "Clear")) |
| [Fly To Meteor](javascript:info("Fly To Meteor"))              | [3.0](javascript:chart("Fly To Meteor", "Drizzle"))  | [6.5](javascript:chart("Fly To Meteor", "Sprinkle"))  | [10.5](javascript:chart("Fly To Meteor", "Cloudburst")) | [11.7](javascript:chart("Fly To Meteor", "Clear")) |
| [樱落繁花](javascript:info("樱落繁花"))                    | [3.0](javascript:chart("樱落繁花", "Drizzle"))  | [8.8](javascript:chart("樱落繁花", "Sprinkle"))  | [10.9](javascript:chart("樱落繁花", "Cloudburst")) | -    |
| [Agnostic](javascript:info("Agnostic"))                    | [3.0](javascript:chart("Agnostic", "Drizzle"))  | [7.4](javascript:chart("Agnostic", "Sprinkle"))  | [10.0](javascript:chart("Agnostic", "Cloudburst")) | -    |
| [Psyched Fevereiro](javascript:info("Psyched Fevereiro"))           | [3.5](javascript:chart("Psyched Fevereiro", "Drizzle"))  | [7.3](javascript:chart("Psyched Fevereiro", "Sprinkle"))  | [10.0](javascript:chart("Psyched Fevereiro", "Cloudburst")) | -    |
| [Future Unbound (Game Edit)](javascript:info("Future Unbound (Game Edit)"))  | [3.0](javascript:chart("Future Unbound (Game Edit)","Drizzle"))  | [7.5](javascript:chart("Future Unbound (Game Edit)","Sprinkle"))  | [10.5](javascript:chart("Future Unbound (Game Edit)","Cloudburst")) | -    |
| [Algebra](javascript:info("Algebra"))                     | [2.0](javascript:chart("Algebra", "Drizzle"))  | [8.1](javascript:chart("Algebra", "Sprinkle"))  | [11.4](javascript:chart("Algebra", "Cloudburst")) | [SP](javascript:chart("Algebra", "Special")) |
| [Words](javascript:info("Words"))                       | [2.0](javascript:chart("Words", "Drizzle"))  | [6.5](javascript:chart("Words", "Sprinkle"))  | [9.3](javascript:chart("Words", "Cloudburst"))  | -    |
| [仮想明日](javascript:info("仮想明日"))                    | [3.5](javascript:chart("仮想明日", "Drizzle"))  | [6.6](javascript:chart("仮想明日", "Sprinkle"))  | [10.0](javascript:chart("仮想明日", "Cloudburst"))  | -    |
| [白虎蓮華](javascript:info("白虎蓮華"))                    | [3.0](javascript:chart("白虎蓮華", "Drizzle"))  | [6.5](javascript:chart("白虎蓮華", "Sprinkle"))  | [9.6](javascript:chart("白虎蓮華", "Cloudburst"))  | -    |
| [サイクルの欠片](javascript:info("サイクルの欠片"))              | [1.0](javascript:chart("サイクルの欠片", "Drizzle"))  | [7.8](javascript:chart("サイクルの欠片", "Sprinkle"))  | [8.6](javascript:chart("サイクルの欠片", "Cloudburst"))  | -    |
| [参宿四\~Betelgeuse\~](javascript:info("参宿四~Betelgeuse~"))          | [2.0](javascript:chart("参宿四~Betelgeuse~", "Drizzle"))  | [6.4](javascript:chart("参宿四~Betelgeuse~", "Sprinkle"))  | [11.2](javascript:chart("参宿四~Betelgeuse~", "Cloudburst"))  | -    |
| [slic.hertz](javascript:info("slic.hertz"))            | [3.0](javascript:chart("slic.hertz", "Drizzle"))  | [7.6](javascript:chart("slic.hertz", "Sprinkle"))  | [11.4](javascript:chart("slic.hertz", "Cloudburst"))  | -    |
| [Rainbow Flavor!](javascript:info("Rainbow Flavor!"))             | [2.0](javascript:chart("Rainbow Flavor!", "Drizzle"))  | [7.5](javascript:chart("Rainbow Flavor!", "Sprinkle"))  | [9.8](javascript:chart("Rainbow Flavor!", "Cloudburst")) | [SP](javascript:chart("Rainbow Flavor!", "Special")) |
| [IN](javascript:info("IN"))                           | [1.0](javascript:chart("IN", "Drizzle"))  | [7.9](javascript:chart("IN", "Sprinkle"))  | [11.2](javascript:chart("IN", "Cloudburst")) | -    |
| [驟雨の狭間](javascript:info("驟雨の狭間"))                  | -    | -    | -    | Ø    |
| [Broken Conviction](javascript:info("Broken Conviction"))           | [4.5](javascript:chart("Broken Conviction", "Drizzle"))  | [4.5](javascript:chart("Broken Conviction", "Sprinkle"))  | [11.5](javascript:chart("Broken Conviction", "Cloudburst")) | [11.9](javascript:chart("Broken Conviction", "Clear")) |
| [选择你的宽带](javascript:info("选择你的宽带")) | - | - | - | [SP](javascript:chart("选择你的宽带", "Special")) |

---

## Single - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| [FULi AUTO SHOOTER](javascript:info("FULi AUTO SHOOTER")) | [3.0](javascript:chart("FULi AUTO SHOOTER", "Drizzle"))  | [7.2](javascript:chart("FULi AUTO SHOOTER", "Sprinkle"))  | [10.6](javascript:chart("FULi AUTO SHOOTER", "Cloudburst"))  | -    |
| [cafe in 6412I731V](javascript:info("cafe in 6412I731V"))                    | [2.0](javascript:chart("cafe in 6412I731V", "Drizzle"))  | [7.0](javascript:chart("cafe in 6412I731V", "Sprinkle"))  | [11.3](javascript:chart("cafe in 6412I731V", "Cloudburst"))  | -    |
| [KASANE](javascript:info("KASANE")) | [3.0](javascript:chart("KASANE", "Drizzle"))  | [7.8](javascript:chart("KASANE", "Sprinkle"))  | [11.6](javascript:chart("KASANE", "Cloudburst"))  | -    |
| [KAEDE](javascript:info("KAEDE")) | -  | -  | -  | [SP](javascript:chart("KAEDE", "Special")) |

---

## Свяжитесь с Нами

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## Другой Контент

[Вернуться к Содержанию](#содержание)

### Milthm Wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Методы Разблокировки Скрытых Песен

- **Regnaissance**

  Разблокируйте и сыграйте HYPER MEMORIES;  
  Во время игры фон становится чёрно-белым, и появляется Susan. В этот момент не нажимайте на ноты;  
  Затем баллы становятся отрицательными, а Susan становится цветной. Играйте, пока баллы не станут > 0, после чего песня разблокируется.

- **Contrasty Angeles**

  После разблокировки Regnaissance прочтите Эпизод 6 первой главы основного сюжета;  
  Сыграйте HYPER MEMORIES;  
  Во время игры фон становится чёрно-белым с появлением Susan, и нужно сохранить полный комбо;  
  Затем баллы резко падают, а Susan становится цветной. Играйте, пока баллы не станут > 0, после чего песня разблокируется.

### Что Такое Путь к Файлу?

Путь к файлу — это строковое представление, указывающее на уникальное местоположение в файловой системе, обычно с использованием древовидной структуры каталогов. Разные операционные системы используют разные разделители, такие как `/`, `\` или `:`. Пути могут быть абсолютными или относительными и необходимы для построения URL.

#### Пути Файлов в Android

- **Внешнее Хранение:**  
  Расположено в `/storage/emulated/[ID пользователя]` (по умолчанию основной пользователь — 0) или `/sdcard/`, эти файлы видны пользователю.
- **Каталог Данных Приложения:**  
  Обычно находится в `/storage/emulated/0/Android/data/[имя пакета]/`, например:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Каталог сохранения Milthm находится по адресу:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  Если доступ заблокирован, попробуйте подключиться к компьютеру или предоставить файловому менеджеру права ADB.

---

### Сравнительная Таблица Reality

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
