> Внимание: текущая языковая версия больше не поддерживается, часть информации может быть устаревшей. Рекомендуется перейти на [английскую](?lang=en) или [упрощенную китайскую](?lang=zh) версию.  
> Или вы можете отправить PR для перевода текущего языка в [этом репозитории](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91).  
  Последнее обслуживание 05.07.2025  
  
## Содержание

- [Сайт](#сайт)
- [Инструкция по использованию](#инструкция-по-использованию)
  - [Загрузка файла сохранения](#загрузка-файла-сохранения)
  - [Ввод разобранных данных](#ввод-разобранных-данных)
  - [Сохранения старых версий](#сохранения-старых-версий)
  - [Другие пути к сохранениям](#другие-пути-к-сохранениям)
  - [Радар](#радар)
- [О Milthm](#о-milthm)
  - [Формула расчета Reality](#формула-расчета-reality)
  - [О Ytilaer в графике проверки](#о-ytilaer-в-графике-проверки)
  - [О файлах сохранений](#о-файлах-сохранений)
  - [Оценка нот](#оценка-нот)
  - [Итоговый рейтинг](#итоговый-рейтинг)
  - [Статус завершения](#статус-завершения)
  - [Первое апреля](#первое-апреля)
  - [Способы разблокировки скрытых треков](#способы-разблокировки-скрытых-треков)
  - [Таблица констант](#таблица-констант)
  - [Статистика авторов карт](#статистика-авторов-карт)
  - [Ускорение разработки Milthm](#ускорение-разработки-milthm)
- [Свяжитесь с нами](#свяжитесь-с-нами)
- [Часто задаваемые вопросы](#часто-задаваемые-вопросы)
- [Другое](#другое)
  - [Milthm Wiki](#milthm-wiki)
  - [Группа обсуждения Milthm](#группа-обсуждения-milthm)
  - [Что такое путь к файлу](#что-такое-путь-к-файлу)
  - [Таблица соответствия Reality](#таблица-соответствия-reality)

---

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

> Если интерфейс отображается некорректно, посетите [GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md).

---

## Сайт

{{网站}}

---

## Инструкция по использованию

> Проверка рекордов создана игроками и не связана с официальными разработчиками.

### Загрузка файла сохранения

Нажмите **«Загрузить файл»** на главной странице и выберите файл сохранения `saves.db` или файл рекордов `data.db`.

> **Примечание:**  
> - `data.db` содержит только записи после обновления `3.2` (если не потеряны).  
> - На Android рекомендуется использовать [MT Manager](https://mt2.cn/) для доступа к папке `sdcard/Android/data`.  

#### Пути к файлам (подробнее в [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[Что такое путь к файлу](#что-такое-путь-к-файлу)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

   Используйте приложение [Файлы](https://support.apple.com//102570) для открытия папки Milthm:

  ```text
  /data/
  ```

  > Если локальные файлы не найдены: в меню с тремя точками в правом верхнем углу главной страницы «Файлов» отмените скрытие локальных файлов ([подробнее](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Пользователи Windows:**  
  Введите в адресную строку проводника:  
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

[Видео для Android](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[Видео для IOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Пользователи Android [без доступа](#нет-доступа)

---

### Ввод разобранных данных

Введите данные в поле на главной странице в следующем формате:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5,v3],
    [name,Difficulty, constant, score, acc, level,achievedStatus,isv3?]
}
```

Где:
- `acc` — точность в десятичном виде;
- `level` — рейтинг, определяемый так:

{{14}}

---

### Сохранения старых версий

Сохранения до `Milthm 3.2` на мобильных устройствах нельзя извлечь напрямую. Попробуйте:

{{15}}

---

### Другие пути к сохранениям

Если загрузка не работает, попробуйте извлечь JSON-данные вручную:

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

## Радар

Метод расчета предоставлен `PanyiAme`, подробнее в [описании таблицы проверки Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## О Milthm

[К содержанию](#содержание)

### Формула расчета Reality

Reality рассчитывается на основе очков и константы карты:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Формула Reality для одного трека (где s — очки, c — константа):

{{reality公式}}

[Таблица соответствия Reality](#таблица-соответствия-reality)

#### Реализация кода:

{{公式js}}

---

## О Ytilaer в графике проверки

Это значение не имеет практического смысла:
- Если средний b20 > 1005k, оно равно Reality.
- Это максимум из 20 значений Reality (средний rlt).

## О файлах сохранений

Пути сокращены до `MilthmDataDirectory`.

### Игровые сохранения  
Файл: `MilthmDataDirectory/saves.db`.

Содержит прогресс и записи игрока.  

Данные хранятся в kv-таблицах в формате JSON.

### Данные рекордов  
Файл: `MilthmDataDirectory/data.db`.

Хранит отправленные очки.  

Источник локального рейтинга.

---

## Оценка нот

Пять типов оценки нот:
- **Perfect**: 101% очков, 100% ACC.
- **perfect**: 75%-101% очков, 100% ACC.
- **Good**: 30%-75% очков, 50% ACC.
- **Bad**: комбо прервано, 0%-30% очков, 10% ACC.
- **Miss**: комбо прервано, 0 очков, 0% ACC.

Диапазоны:

{{判定范围}}

---

## Итоговый рейтинг

Восемь типов:  
Без FC — белый, FC — синий, AP — фиолетовый.  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">: старое отображение <img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">, 1010000 очков (RHYTHM of RAIN).
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M (Milthm), от 1005000 очков;
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">: от 950000 очков;
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">: от 900000 очков;
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">: от 850000 очков;
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">: от 800000 очков;
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">: <800000 очков, без прохождения.

---

## Статус завершения

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC < 80%.
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC > 80%, есть Bad/Miss.
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:  
  - Все ноты в ±140ms, есть Good.
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:  
  - Все ноты в ±70ms, есть small perfect.
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:  
  - Все ноты в ±35ms (теория).
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:  
  - AutoPlay.
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:  
  - >1010000 очков (ливень).

---

## Первое апреля

### Гайд (примерный)
- Включите кошмар в игре и сыграйте любую карту сложности `CB`. Кнопки станут дождем, очки растут медленно.
- После игры уровни всех карт увеличатся в ~20 раз ([смотреть](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)), UserReality ×20.
- Затем снова сыграйте любую карту, появится окно, уберутся карты >30 уровня.
- Сыграйте карту >16 уровня для разблокировки `Rainbow Flavor!`, игра вылетит.
- Появится мини-игра, после раундов разблокируется вторая карта.

---

## Способы разблокировки скрытых треков

- **Regnaissance**

  Разблокируйте и сыграйте HYPER MEMORIES;  
  На фоне появится черно-белая Сьюзен — не нажимайте ноты;  
  Очки станут отрицательными, Сьюзен цветной — продолжайте до >0 очков.

- **Contrasty Angeles**

  После Regnaissance прочтите главу 1.6;  
  Сыграйте HYPER MEMORIES с полным комбо;  
  Очки упадут, Сьюзен цветной — продолжайте до >0 очков.

- **Dogbite**
- Сыграйте Dogbite CB с рейтингом A+.
- Затем сыграйте Oiiaioooooiai, не прерывая комбо при кошках (ноты издают лай).
- Произойдет аномалия, откроется SP-карта Dogbite.

- Примечание: можно включить `ливень` для упрощения.

---

## Таблица констант

[К содержанию](#содержание)

{{章节en}}

---

## Пояснение

> - `SP` и нестандартные карты не учитываются в Reality.  
> - Из-за точности константы 11.9 на самом деле ниже. Например, Reality `13.005` отображается как `13.00`, но рассчитывается как `13.004999…`.

Теоретический Reality: `12.725` (отображается 12.72)  
Топ-20 карт:

{{章节en1}}

---

## Статистика авторов карт

<div style="font-size:10px;">

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")) , [Brightened Demonios](info:info("Brightened Demonios","Drizzle")) , [Broken Conviction](info:info("Broken Conviction","Drizzle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")) , [Curse of 14](info:info("Curse of 14","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fragment of Memories](info:info("Fragment of Memories","Drizzle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")) , [IN](info:info("IN","Drizzle")) , [Kayava](info:info("Kayava","Drizzle")) , [Oniichan](info:info("Oniichan","Drizzle")) , [OverRain](info:info("OverRain","Drizzle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) , [はんてん](info:info("はんてん","Drizzle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")) , [Aleph-0](info:info("Aleph-0","Sprinkle")) , [apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")) , [Broken Conviction](info:info("Broken Conviction","Sprinkle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fragment of Memories](info:info("Fragment of Memories","Sprinkle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")) , [Oniichan](info:info("Oniichan","Sprinkle")) , [OverRain](info:info("OverRain","Sprinkle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")) , [仮想明日](info:info("仮想明日","Sprinkle")) , [烁雨](info:info("烁雨","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [はんてん](info:info("はんてん","Sprinkle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Algebra](info:info("Algebra","Cloudburst")) , [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Kayava](info:info("Kayava","Cloudburst")) , [LOUDER!](info:info("LOUDER!","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")) , [Regnaissance](info:info("Regnaissance","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [Words](info:info("Words","Cloudburst")) , [百九十](info:info("百九十","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [暮予星光](info:info("暮予星光","Cloudburst")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")) , [Myth compiler](info:info("Myth compiler","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")) , [Innocent white](info:info("Innocent white","Cloudburst")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [大月墜落狂想](info:info("大月墜落狂想","Cloudburst")) , [烁雨](info:info("烁雨","Cloudburst")) , [樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) | [HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")) , [Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")) , [Elsorhg](info:info("Elsorhg","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")) , [Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")) , [LOUDER!](info:info("LOUDER!","Drizzle")) , [Moonflutter](info:info("Moonflutter","Drizzle")) , [Sakuyahime](info:info("Sakuyahime","Drizzle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [WATER](info:info("WATER","Drizzle")) , [白虎蓮華](info:info("白虎蓮華","Drizzle")) , [大月墜落狂想](info:info("大月墜落狂想","Drizzle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")) , [イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")) , [Brightened Demonios](info:info("Brightened Demonios","Sprinkle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")) , [Jump out?](info:info("Jump out?","Sprinkle")) , [LOUDER!](info:info("LOUDER!","Sprinkle")) , [Sakuyahime](info:info("Sakuyahime","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [White Lizard](info:info("White Lizard","Sprinkle")) , [白虎蓮華](info:info("白虎蓮華","Sprinkle")) , [大月墜落狂想](info:info("大月墜落狂想","Sprinkle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")) , [花月](info:info("花月","Sprinkle")) , [暮予星光](info:info("暮予星光","Sprinkle")) , [时落之雨](info:info("时落之雨","Sprinkle")) , [夜風](info:info("夜風","Sprinkle")) , [樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")) , [Oniichan](info:info("Oniichan","Cloudburst")) , [Sakuyahime](info:info("Sakuyahime","Cloudburst")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")) , [Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")) , [Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")) , [白虎蓮華](info:info("白虎蓮華","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [花月](info:info("花月","Cloudburst")) , [命日](info:info("命日","Cloudburst")) , [时落之雨](info:info("时落之雨","Cloudburst")) , [夜風](info:info("夜風","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")) , [Algebra](info:info("Algebra","Drizzle")) , [Dogbite](info:info("Dogbite","Drizzle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")) , [Garden](info:info("Garden","Drizzle")) , [Hikari](info:info("Hikari","Drizzle")) , [INFP.mp3](info:info("INFP.mp3","Drizzle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [Virtual S0da](info:info("Virtual S0da","Drizzle")) , [粗线条的雨](info:info("粗线条的雨","Drizzle")) , [サイクルの欠片](info:info("サイクルの欠片","Drizzle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")) , [Garden](info:info("Garden","Sprinkle")) , [Hikari](info:info("Hikari","Sprinkle")) , [INFP.mp3](info:info("INFP.mp3","Sprinkle")) , [Innocent white](info:info("Innocent white","Sprinkle")) , [Moonflutter](info:info("Moonflutter","Sprinkle")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")) , [Virtual S0da](info:info("Virtual S0da","Sprinkle")) , [粗线条的雨](info:info("粗线条的雨","Sprinkle")) , [命日](info:info("命日","Sprinkle")) , [サイクルの欠片](info:info("サイクルの欠片","Sprinkle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")) , [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [Garden](info:info("Garden","Cloudburst")) , [INFP.mp3](info:info("INFP.mp3","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [粗线条的雨](info:info("粗线条的雨","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [雨女](info:info("雨女","Cloudburst")) , [サイクルの欠片](info:info("サイクルの欠片","Cloudburst")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
| Milthm Team | [cybernetic blazar](info:info("cybernetic blazar","Drizzle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Drizzle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Drizzle")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Drizzle")) , [花月](info:info("花月","Drizzle")) , [暮予星光](info:info("暮予星光","Drizzle")) , [时落之雨](info:info("时落之雨","Drizzle")) , [夜風](info:info("夜風","Drizzle")) | [Algebra](info:info("Algebra","Sprinkle")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Sprinkle")) | [驟雨の狭間](info:info("驟雨の狭間","Cloudburst")) |  | [Algebra](info:info("Algebra","Special")) , [KAEDE](info:info("KAEDE","Special")) |
| Murty | [Regnaissance](info:info("Regnaissance","Drizzle")) |  |  |  |  |
| SakiA | [☹](info:info("☹","Drizzle")) |  |  |  |  |
| TCSTWTBHY | [Dogbite](info:info("Dogbite","Drizzle")) , [GlassyHeart.](info:info("GlassyHeart.","Drizzle")) , [Innocent white](info:info("Innocent white","Drizzle")) , [Jump out?](info:info("Jump out?","Drizzle")) , [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) , [Words](info:info("Words","Drizzle")) , [☹](info:info("☹","Drizzle")) | [Dogbite](info:info("Dogbite","Sprinkle")) , [GlassyHeart.](info:info("GlassyHeart.","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")) , [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Sprinkle")) , [Words](info:info("Words","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [イコラト](info:info("イコラト","Sprinkle")) | [Jump out?](info:info("Jump out?","Cloudburst")) , [Moving On](info:info("Moving On","Cloudburst")) , [Splash the Beat!!](info:info("Splash the Beat!!","Cloudburst")) | [命日](info:info("命日","Clear")) |  |
| Ursulina | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Drizzle")) |  | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Cloudburst")) , [Virtual S0da](info:info("Virtual S0da","Cloudburst")) |  |  |
| vitamin b |  |  | [IN](info:info("IN","Cloudburst")) , [KASANE](info:info("KASANE","Cloudburst")) |  |  |
| WH_C |  |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| xzadudu179 | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) | [WATER](info:info("WATER","Sprinkle")) | [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Cloudburst")) , [Hikari](info:info("Hikari","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [Moonflutter](info:info("Moonflutter","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) |  |  |
| 阿鱼 | [Moving On](info:info("Moving On","Drizzle")) , [雨之城](info:info("雨之城","Drizzle")) | [雨之城](info:info("雨之城","Sprinkle")) | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| 点缀星空 |  |  | [Curse of 14](info:info("Curse of 14","Cloudburst")) , [Myth compiler](info:info("Myth compiler","Cloudburst")) |  |  |
| 姜片 | [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Drizzle")) |  |  |  |  |
| 泪莫提 |  | [Moving On](info:info("Moving On","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) |  |  |
| 喵卡 |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| 母鸡 | [KASANE](info:info("KASANE","Drizzle")) | [KASANE](info:info("KASANE","Sprinkle")) | [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) |  |  |
| 你申某 | [雨女](info:info("雨女","Drizzle")) |  |  |  |  |
| 爬爬 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) , [Regnaissance](info:info("Regnaissance","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [靈](info:info("靈","Drizzle")) | [Chartreuse Green](info:info("Chartreuse Green","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [靈](info:info("靈","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [雨之城](info:info("雨之城","Cloudburst")) , [☹](info:info("☹","Cloudburst")) , [はんてん](info:info("はんてん","Cloudburst")) | [Contrasty Angeles](info:info("Contrasty Angeles","Clear")) , [Moonflutter](info:info("Moonflutter","Clear")) , [雨女](info:info("雨女","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Oiiaioooooiai](info:info("Oiiaioooooiai","Special")) , [Welcome to Milthm](info:info("Welcome to Milthm","Special")) |
| 树穴猪 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) | [IN](info:info("IN","Sprinkle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) |  |  |
| 王子 |  | [IN](info:info("IN","Sprinkle")) |  |  |  |
| 舞仙翼 |  |  | [Innocent white](info:info("Innocent white","Cloudburst")) |  |  |
| 嘤箱 | [命日](info:info("命日","Drizzle")) |  |  |  |  |
| 余火 | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Drizzle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Sprinkle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Cloudburst")) | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit","Clear")) |  |
| 雨眠 | [百九十](info:info("百九十","Drizzle")) | [百九十](info:info("百九十","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) |  |  |
| 云梦 |  | [cybernetic blazar](info:info("cybernetic blazar","Sprinkle")) , [Kayava](info:info("Kayava","Sprinkle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")) , [雨女](info:info("雨女","Sprinkle")) | [Chartreuse Green](info:info("Chartreuse Green","Cloudburst")) , [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) , [Moonflutter](info:info("Moonflutter","Cloudburst")) , [☹](info:info("☹","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) |  |  |

</div>

---

## Ускорение разработки Milthm

Нажмите для ускорения разработки:  
1. https://github.com/sponsors/morizerodev/  
2. https://afdian.com/a/morizero

---

## Свяжитесь с нами

{{联系我们}}

---

### Часто задаваемые вопросы

[Вернуться к оглавлению](#Оглавление)

- [Нет реакции при нажатии на генерацию изображения (или другого элемента)](#Нет-реакции-при-нажатии-на-генерацию-изображения-или-другого-элемента)
- [Не удается найти файл или папка отсутствует](#Не-удается-найти-файл-или-папка-отсутствует)
- [Как создать резервную копию сохранения](#Как-создать-резервную-копию-сохранения)
- [Восстановление сохранения](#Восстановление-сохранения)
- [Формула расчета Reality](#Формула-расчета-Reality)
- [Определение нот](#Определение-нот)

> Убедитесь, что вы знакомы с базовыми операциями. Если вы не понимаете и не хотите учиться самостоятельно, мы не рекомендуем использовать этот сайт.

---

#### Нет реакции при нажатии на генерацию изображения (или другого элемента)

- Проверьте состояние сети. Если GitHub недоступен, перейдите по ссылке [k9.lv/c/](http://k9.lv/c).
- Попробуйте использовать встроенный браузер системы или такие браузеры, как Chrome, [Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ).  
  (Не рекомендуется использовать браузеры Baidu, 360 и т.д.)
- Если проблема сохраняется, возможно, ваша версия системы устарела.

---

#### Не удается найти файл или папка отсутствует

Путь к сохранению можно посмотреть в разделе [Загрузка файла сохранения](#Загрузка-файла-сохранения).  

#### Нет доступа

Сначала убедитесь в версии Milthm. После обновления до версии 3.2 и выше необходимо запустить игру один раз, чтобы в этом пути был создан файл сохранения.

- **Android**

  Если вы используете встроенный файловый менеджер системы или сторонний файловый менеджер, попробуйте получить доступ через другой файловый менеджер.  
  Рекомендуется использовать [MT Manager](https://mt2.cn/) и ввести следующий путь в адресной строке в верхней части приложения (если есть несколько пользователей, замените `0` на ID пользователя или `/storage/emulated/0/` на `/sdcard/`):
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  Также можно добавить закладку через右上ний угол для быстрого доступа.  

Можно также попробовать использовать нативный файловый менеджер Android `Файлы`.  
Способ входа:  
Откройте MT Manager  
Нажмите `Извлечь APK` → выберите `Системные приложения` → найдите `Файлы` → нажмите `Файлы`, выберите `Еще` в нижнем левом углу → запустите приложение.  
После входа в папку сохранения Milthm можно выбрать `Копировать в` внутреннюю память (/storage/emulated/0/, обычно это корневая папка `Файлов`) и открыть в браузере.  
Если возникли проблемы с сохранением, их можно исправить аналогичным способом, см. [Восстановление сохранения](#Восстановление-сохранения).  

Если доступ все еще невозможен, попробуйте подключиться к компьютеру или использовать права ADB.  
В более новых версиях Android может возникнуть эта проблема. Если в настройках разработчика включена отладка по USB и активирована "Беспроводная отладка", можно использовать [Shizuku](https://shizuku.rikka.app/zh-hans/download/) для беспроводной отладки ADB без компьютера. Подробнее см. документацию Shizuku.

- **iOS**

  Если в приложении `Файлы` не видна папка этого iPhone/iPad, перейдите на главный экран приложения и проверьте в настройках (в правом верхнем углу), не скрыты ли локальные файлы.  
  Если папка Milthm все еще не найдена, проверьте, используете ли вы правильную версию Milthm.  
  [Видео для iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### Как создать резервную копию сохранения

Перейдите в папку сохранения и скопируйте всю папку data в другое место.

#### Восстановление сохранения

Вы можете вручную заменить файлы сохранения в исходном пути резервной копией.  
Для предотвращения ошибок при генерации изображения с результатами сохранение в текстовом формате добавляется в изображение (~~можно открыть изображение как текст и просмотреть~~).  
~~Вы можете загрузить изображение с результатами для проверки~~  
Вы можете загрузить изображение с результатами на [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html), затем нажать "Скачать" для создания файла сохранения (без прогресса сюжета, это прямая копия моего (mkzi-nya/归梦) сохранения) и заменить исходный файл сохранения.  

## Другое

[Вернуться к оглавлению](#Оглавление)

### Wiki Milthm

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**

- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Группа обсуждения Milthm

{{群}}

### Что такое путь к файлу

Путь к файлу — это строка, указывающая на уникальное расположение в файловой системе, обычно представленная в виде дерева каталогов. Разные ОС используют разные разделители, такие как `/`, `\` или `:`. Путь может быть абсолютным или относительным и используется для обозначения отношений между папками и файлами, а также при построении URL.

#### Пути к файлам в Android

- **Внешнее хранилище:**  
  Расположено в `/storage/emulated/ID_пользователя (по умолчанию 0)/` или `/sdcard/`, эти файлы видны пользователю.
- **Каталог данных приложения:**  
  Обычно находится в `/storage/emulated/0/Android/data/название_пакета/`, например:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Папка сохранений Milthm находится по адресу:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  Если система блокирует доступ, попробуйте подключиться к компьютеру или предоставить файловому менеджеру права ADB.

---

### Таблица соответствия Reality

{{reality表}}
