
# Содержание
- [веб-сайт](#веб-сайт)
- [Инструкция по использованию](#инструкция-по-использованию)
  - [Загрузка файла сохранения](#загрузка-файла-сохранения)
  - [Ввод уже разобранных данных](#ввод-уже-разобранных-данных)
  - [Старые версии сохранений](#старые-версии-сохранений)
  - [Другие пути к сохранениям](#другие-пути-к-сохранениям)
- [Принцип работы](#принцип-работы)
  - [Формула расчета Reality](#формула-расчета-reality)
  - [Радарная диаграмма](#радарная-диаграмма)
- [Свяжитесь с нами](#свяжитесь-с-нами)

---

## веб-сайт
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index_en.html)

## Инструкция по использованию

### Загрузка файла сохранения

Нажмите на **"Загрузить файл"** на главной странице, выберите файл сохранения (`saves.db`) или файл записи (`data.db`) и загрузите его.

> **Примечание**:
> - `data.db` содержит только записи игр после обновления `3.2` (если они не были утеряны).
> - Для устройств Android рекомендуется использовать [MT Manager](https://mt2.cn/) для доступа к каталогу `sdcard/Android/data`.

#### **Пути к файлам (подробности в [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Используйте приложение [Файлы](https://support.apple.com/ru-ru/102570), чтобы открыть папку Milthm:
  ```text
  /data/
  ```
- **Windows**
  Введите в адресной строке проводника:
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

### Ввод уже разобранных данных

Введите данные в поле ввода на главной странице в следующем формате:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` — это дробное число, `level` обозначает рейтинг, который определяется следующим образом:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Старые версии сохранений

Сохранения до `Milthm 3.2` нельзя извлечь напрямую на мобильных устройствах. Можно попробовать следующий метод:

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

### Другие пути к сохранениям

Если после загрузки данные не распознаются, попробуйте вручную извлечь JSON и загрузить его:

- **Android (TapTap)**
  ```text
  /data/user/0/game.taptap.morizero.milthm/shared_prefs/
  ```
- **Android (Google Play)**
  ```text
  /data/user/0/com.morizero.milthm/shared_prefs/
  ```
- **iOS**
  Данные приложения milthm/Data/Library/Preferences
  ```text
  milthm应用数据/Data/Library/Preferences
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

### Формула расчета Reality

Reality рассчитывается на основе игрового счета и постоянной карты:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Формула расчета Reality для одной карты (где s — счет, c — постоянная):

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

Методы расчета предоставлены `PanyiAme`, подробнее смотрите в [Milthm Руководство по оценке](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Свяжитесь с нами

- **[Milthm#-1 Группа общения](https://qm.qq.com/q/Utb6sNDvki)**: 375882310

- **[Milthm#Φ Группа общения](https://qm.qq.com/q/fIErsKKz3a)**: 678471942
