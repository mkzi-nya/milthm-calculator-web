
# Содержание
- [Сайт](#%D1%81%D0%B0%D0%B9%D1%82)
- [Руководство по использованию](#%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-%D0%BF%D0%BE-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8E)
  - [Загрузить файл сохранения](#%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D1%84%D0%B0%D0%B9%D0%BB-%D1%81%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F)
  - [Ввести обработанные данные](#%D0%B2%D0%B2%D0%B5%D1%81%D1%82%D0%B8-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5)
  - [Сохранения старых версий](#%D1%81%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F-%D1%81%D1%82%D0%B0%D1%80%D1%8B%D1%85-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9)
  - [Другие пути сохранения](#%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%B5-%D0%BF%D1%83%D1%82%D0%B8-%D1%81%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F)
- [Принцип работы](#%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
  - [Формула расчёта Reality](#%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D0%B0-%D1%80%D0%B0%D1%81%D1%87%D1%91%D1%82%D0%B0-reality)
  - [Радарная диаграмма](#%D1%80%D0%B0%D0%B4%D0%B0%D1%80%D0%BD%D0%B0%D1%8F-%D0%B4%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0)
- [Таблица констант](#%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82)
- [Контакты](#%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D1%8B)

---

## Сайт
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## Руководство по использованию

### Загрузить файл сохранения

Нажмите на опцию **«Загрузить файл»** на главной странице, выберите файл сохранения `saves.db` или файл с записями результатов `data.db` и загрузите его.

> **Примечание**:
> - `data.db` содержит только записи игр, обновленные до версии `3.2` (если они не были утрачены).
> - На Android рекомендуется использовать [MT Manager](https://mt2.cn/) для доступа к директории `sdcard/Android/data`.

#### **Пути к файлам (подробнее см. [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Откройте папку Milthm с помощью приложения [Файлы](https://support.apple.com/ru-ru/102570):
  ```text
  /data/
  ```
- **Windows**
  Введите в адресной строке Проводника:
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

### Ввести обработанные данные

Введите данные в текстовое поле на главной странице в следующем формате:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` указывается с десятичной дробью, `level` обозначает рейтинг, определённый следующим образом:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Сохранения старых версий

Сохранения версий до Milthm 3.2 не могут быть извлечены напрямую на мобильных устройствах, попробуйте следующий способ:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "Файл $FILE_NAME успешно скопирован в /sdcard/"
            break
        else
            echo "Ошибка копирования файла, проверьте права доступа!"
        fi
    fi
done
```

---

### Другие пути сохранения

Если загрузка не проходит, попробуйте вручную извлечь JSON данные и загрузить их:

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
  данные приложения Milthm/Data/Library/Preferences
  ```
- **Windows**
  Находится в реестре:
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

## Принцип работы

### Формула расчёта Reality

Расчёт Reality основан на игровых очках и константе партитуры:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Формула расчёта Reality для одной композиции выглядит следующим образом (где s — очки, а c — константа):

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

#### Реализация кода:
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

### Радарная диаграмма

Методика расчёта предоставлена `PanyiAme`, подробнее см. [Инструкцию по таблице результатов Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Таблица констант

> - Все SP и нестандартные партитуры не участвуют в расчёте Reality.
> - Из-за ограничений точности, в текущей версии константы для треков с значением 11.9 на самом деле не достигают 11.9. Например, если теоретическое значение Reality для определённой версии составляет `13.005`, в игре оно будет отображаться как `13.00`, а не `13.01`.

Теоретическое значение Reality в текущей версии составляет `12.670`  
Ниже приведены 20 композиций с наивысшими константами в текущей версии

| Рейтинг | Название                | Сложность | Константа |
|---------|-------------------------|-----------|-----------|
| 1       | Contrasty Angeles       | CL        | 12.3      |
| 2       | 命日                    | CL        | 12.2      |
| 3       | Moonfall／大月墜落狂想     | CB        | 12.2      |
| 4       | Regnaissance            | CL        | 12.1      |
| 5       | Innocent white          | CB        | 12.1      |
| 6       | Broken Conviction       | CL        | 11.9      |
| 7       | Meltovt Necrosys        | CB        | 11.9      |
| 8       | Moonflutter             | CL        | 11.7      |
| 9       | Fly To Meteor feat.兔柒  | CL        | 11.7      |
| 10      | HYPER MEMORIES          | CB        | 11.7      |
| 11      | Broken Conviction       | CB        | 11.5      |
| 12      | Threat - Metropolis     | CB        | 11.5      |
| 13      | Contrasty Angeles       | CB        | 11.5      |
| 14      | slic.hertz #GdbG        | CB        | 11.4      |
| 15      | Moonflutter             | CB        | 11.4      |
| 16      | Algebra                 | CB        | 11.4      |
| 17      | Fragment of Memories    | CB        | 11.3      |
| 18      | IN                      | CB        | 11.2      |
| 19      | イコラト                | CB        | 11.2      |
| 20      | 参宿四\~Betelgeuse\~     | CB        | 11.2      |

---

## Введение - Прогноз погоды

| Название              | DZ   | SK   | CB   | CL   |
|-----------------------|------|------|------|------|
| Welcome to Milthm     | 1.0  | -    | -    | -    |
| 时落之雨              | 1.0  | 4.5  | 8.5  | -    |
| 夜风                  | 3.0  | 7.3  | 10.1 | -    |
| 花月                  | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光              | 2.0  | 7.5  | 9.1  | -    |

## Пролог - Звук дождя

| Название       | DZ   | SK   | CB   | CL   |
|----------------|------|------|------|------|
| 雨之城         | 1.0  | 4.0  | 7.5  | -    |
| Jump out?      | 2.0  | 7.9  | 9.7  | -    |
| Moving On      | 2.0  | 6.3  | 10.8 | -    |
| Blueface       | 4.0  | 8.0  | 10.1 | -    |
| イコラト       | 3.0  | 8.7  | 11.2 | -    |
| 雨女           | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日           | 3.0  | 8.7  | 11.1 | 12.2 |

## Основная Глава 1 - Двойственность сладкого и горького

| Название                | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| 粗線條的雨              | 1.0  | 4.0  | 8.3  | -    |
| Aconsma                 | 1.0  | 6.0  | 9.3  | -    |
| OverRain                | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories    | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES          | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance            | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles       | 4.0  | 9.0  | 11.5 | 12.3 |

## Коллаборация - Мир дождя

| Название                      | DZ   | SK   | CB   | CL   |
|-------------------------------|------|------|------|------|
| Sundown                       | 1.0  | -    | -    | -    |
| Bio-Engineering               | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands          | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure       | 2.0  | 5.5  | 10.3 | -    |
| White Lizard                  | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex   | 2.0  | 7.6  | 10.6 | -    |
| Kayava                        | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis           | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent             | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想         | 2.0  | 8.0  | 12.2 | -    |

## Коллаборация - Notanote

| Название               | DZ   | SK   | CB   | CL   |
|------------------------|------|------|------|------|
| 烁雨                   | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar      | 4.0  | 7.8  | 10.2 | -    |
| Innocent white         | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg                | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys       | 2.0  | 7.8  | 11.9 | -    |

## Сингл - Кассета снов

| Название                          | DZ   | SK   | CB   | CL   |
|-----------------------------------|------|------|------|------|
| ネオン色のまち feat. Mai            | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                          | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                          | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                     | -    | -    | -    | SP   |
| WATER                             | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                           | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                            | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                       | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor                     | 3.0  | 6.5  | 10.5 | 11.7 |
| 樱落繁花                          | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                          | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro                 | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)        | 3.0  | 7.5  | 10.5 | -    |
| Algebra                           | 2.0  | 8.1  | 11.4 | -    |
| Words                             | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                          | 3.5  | 6.6  | 3.5  | -    |
| 白虎蓮華                          | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片                    | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~              | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG                  | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!                   | 2.0  | 7.5  | 9.8  | -    |
| IN                                | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                        | -    | -    | -    | Ø    |
| Broken Conviction                 | 4.5  | 4.5  | 11.5 | 11.9 |

---

## Контакты

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)
