> Nota: La versión del idioma en la que se encuentra actualmente ya no se mantiene, parte de la información puede estar desactualizada. Se recomienda visitar la versión en [inglés](?lang=en) o [chino simplificado](?lang=zh)  
  O puede enviar un PR para la versión traducida en este repositorio [aquí](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91)  
  Última actualización el 5 de julio de 2025  

## Índice

- [Sitio web](#网站)
- [Instrucciones de uso](#使用说明)
  - [Subir archivo de guardado](#上传存档文件)
  - [Ingresar datos ya analizados](#输入已解析的数据)
  - [Guardados de versiones anteriores](#旧版本存档)
  - [Otras rutas de guardado](#其他存档路径)
  - [Gráfico de radar](#雷达图)
- [Acerca de Milthm](#关于-milthm)
  - [Fórmula de cálculo de Reality](#reality-计算公式)
  - [Acerca de los archivos de guardado](#关于存档文件)
  - [Determinación de notas](#音符判定)
  - [Calificación final](#结算评级)
  - [Estado de finalización](#完成状态)
  - [Día de los inocentes](#愚人节)
  - [Método para desbloquear canciones ocultas](#隐藏曲解锁方式)
  - [Tabla de constantes](#定数表)
  - [Estadísticas de creadores de mapas](#谱师统计)
  - [Haz clic para acelerar el desarrollo de Milthm](#点击加速milthm开发进程)
- [Contáctanos](#联系我们)
- [Preguntas frecuentes](#常见问题)
- [Otros contenidos](#其他内容)
  - [Wiki de Milthm](#milthm-wiki)
  - [Grupo de Milthm](#milthm交流群)
  - [Qué es una ruta de archivo](#什么是文件路径)
  - [Tabla de referencia de Reality](#reality-对照表)

---

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

> Si hay problemas con la renderización de la interfaz, por favor visite [en GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## Sitio web

{{网站}}

---

## Instrucciones de uso

> El calculador de puntuaciones es creado por jugadores de forma independiente y no está afiliado oficialmente.

### Subir archivo de guardado

Haga clic en la opción **"Subir archivo"** en la página principal y seleccione el archivo de guardado `saves.db` o el archivo de registro de puntuaciones `data.db` para subirlo.

> **Nota:**
> - `data.db` solo contiene registros de juego posteriores a la actualización 3.2 (si no se han perdido).
> - En Android se recomienda usar [MT Manager](https://mt2.cn/) para acceder al directorio `sdcard/Android/data`.

#### Ruta de archivos (ver [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[Qué es una ruta de archivo](#什么是文件路径)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

  Abra la carpeta Milthm con la aplicación [Archivos](https://support.apple.com//102570):

  ```text
  /data/
  ```

  > Si no encuentra archivos locales: en la página principal de "Archivos", abra el menú de tres puntos en la esquina superior derecha y desactive la ocultación de archivos locales ([más info](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Usuarios de Windows:**  
  En la barra de direcciones del explorador, ingrese:  
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

[Video demostrativo para Android](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[Video demostrativo para iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Usuarios de Android [sin permiso de acceso](#没有访问权限)

---

### Ingresar datos ya analizados

Ingrese los datos en el cuadro de texto de la página principal con el siguiente formato:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5,v3],
    [name,Difficulty, constant, score, acc, level,achievedStatus,isv3?]
}
```

Donde:
- `acc` representa la precisión en decimal;
- `level` representa la calificación, definida como:

{{14}}

---

### Guardados de versiones anteriores

Los guardados anteriores a `Milthm 3.2` no pueden extraerse directamente en dispositivos móviles, puede intentar los siguientes métodos:

{{15}}

---

### Otras rutas de guardado

Si no se puede analizar tras subir, intente extraer manualmente los datos JSON y subirlos:

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

## Gráfico de radar

Los cálculos relacionados son proporcionados por `PanyiAme`, para más detalles vea [Explicación de la tabla de puntuaciones de Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Acerca de Milthm

[Volver al índice](#目录)

### Fórmula de cálculo de Reality

El cálculo de Reality se basa en la puntuación de juego y la constante de la canción:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

La fórmula para Reality en canciones individuales es (donde s es la puntuación y c la constante):

{{reality公式}}

[Tabla de referencia de Reality](#reality-对照表)

#### Implementación en código:

{{公式js}}

---

## Sobre Ytilaer en el gráfico de puntuación

Este valor no tiene significado real, detalles:

- Cuando la puntuación promedio de b20 es mayor a 1005k, este valor es igual al Reality real.
- Este valor es el máximo Reality (promedio, Reality individual promedio) de 20 canciones.

## Acerca de los archivos de guardado

En las siguientes secciones, la ruta se abrevia como `MilthmDataDirectory`.

### Guardado del juego  
Este archivo se encuentra en `MilthmDataDirectory/saves.db`.

Contiene datos relacionados con el progreso del jugador y registros de juego.

Los datos se almacenan en formato JSON en una tabla kv (formato JSON igual al de versiones anteriores).

### Guardado de datos  
Este archivo se encuentra en `MilthmDataDirectory/data.db`.

Se usa para almacenar cada puntuación enviada con éxito.

Los datos en este archivo son la fuente para la tabla de clasificación local.

---

## Determinación de notas

En el juego, la evaluación de cada nota se divide en cinco tipos:

- **Perfect**: obtiene 101% de la puntuación y 100% de precisión.
- **perfect**: obtiene entre 75%-101% de la puntuación y 100% de precisión según la exactitud.
- **Good**: obtiene entre 30%-75% de la puntuación y 50% de precisión según la exactitud.
- **Bad**: rompe el combo, obtiene entre 0%-30% de la puntuación y 10% de precisión.
- **Miss**: rompe el combo, no obtiene puntuación ni precisión.

La puntuación y precisión dentro de cada rango son proporcionales, el rango detallado es el siguiente:

{{判定范围}}

---

## Calificación final

La calificación final tiene ocho niveles:  
Sin FC (Full Combo) es blanco, FC es azul, AP es morado  
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">: En versiones antiguas se mostraba como <img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">, alcanzando la puntuación teórica de 1,010,000 (RHYTHM of RAIN, todas las notas perfectas).
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M, es decir Milthm, se obtiene al alcanzar 1,005,000 puntos;
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">: se obtiene al alcanzar 950,000 puntos;
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">: se obtiene al alcanzar 900,000 puntos;
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">: se obtiene al alcanzar 850,000 puntos;
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">: se obtiene al alcanzar 800,000 puntos;
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">: se obtiene al tener menos de 800,000 puntos, no se completó, sin iconos FC/AP.

---

## Estado de finalización

Las evaluaciones mostradas al terminar la partida en la canción incluyen:

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:  
  - ACC > 80% y al menos un Bad/Miss.
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:  
  - Todas las notas golpeadas dentro de ±140ms, con al menos un Good.
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:  
  - Todas las notas golpeadas dentro de ±70ms, con al menos un small perfect.
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:  
  - Todas las notas golpeadas dentro de ±35ms, valor teórico.
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:  
  - Completado con AutoPlay.
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:  
  - Puntuación mayor a 1,010,000 (usando lluvia intensa).

---

## Día de los inocentes

### Guía (solo para referencia)
- Al entrar al juego, juegue cualquier canción en dificultad `CB` en modo pesadilla, la dificultad mostrada cambiará y todas las teclas se convertirán en gotas de lluvia, la puntuación sube muy lentamente.
- Al terminar, aparecerá un aviso, al confirmar se regresa y el nivel de todas las canciones aumentará aproximadamente 20 veces ([ver](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)), y UserReality se multiplica por 20 (sin relación con la constante del día de los inocentes).
- Luego, al jugar cualquier canción nuevamente, aparecerá una ventana emergente y se eliminarán las canciones de nivel superior a 30.
- Al jugar una canción de nivel mayor a 16 y entrar en la historia, se desbloqueará la canción de día de los inocentes `Rainbow Flavor!`, luego el juego se cerrará.
- Aparecerá un minijuego de pato en salmuera, al avanzar cierto número de rondas se desbloqueará la segunda canción del día de los inocentes.

---

## Método para desbloquear canciones ocultas

- **Regnaissance**

  Desbloquee y juegue HYPER MEMORIES;  
  Durante el juego aparecerá Susan en blanco y negro, no toque ninguna nota en ese momento;  
  Luego la puntuación se volverá negativa y Susan se volverá a color, continúe jugando y haga que la puntuación sea > 0, al finalizar se desbloqueará la canción.

- **Contrasty Angeles**

  Después de desbloquear Regnaissance, lea el capítulo 6 de la historia principal;  
  Juegue HYPER MEMORIES;  
  Durante el juego aparecerá Susan en blanco y negro, debe mantener Full Combo;  
  Luego la puntuación caerá bruscamente y Susan se volverá a color, continúe jugando y haga que la puntuación sea > 0, al finalizar se desbloqueará la canción.

- **Dogbite**
- Juegue Dogbite en dificultad CB y obtenga al menos calificación A
- Después, juegue Oiiaioooooiai y mantenga Full Combo cuando las notas se conviertan en gatos (las notas anteriores pueden ser tocadas o no), cada nota tocada emitirá un ladrido.
- Al cumplir lo anterior, se activará un fenómeno extraño y luego se desbloqueará la canción Dogbite SP (no es necesario pasarla).

- Nota: Puede reducir la dificultad de desbloqueo activando el fenómeno "lluvia intensa".

---

## Tabla de constantes

[Volver al índice](#目录)

{{章节en}}

---

## Explicación

> - Todas las canciones `SP` y no convencionales no participan en el cálculo de Reality.  
> - Por precisión, en esta versión todas las constantes de canciones con valor 11.9 son menores a 11.9. Por ejemplo, si la Reality teórica es `13.005`, en el juego se mostrará como `13.00` y no `13.01`, el cálculo real es `13.004999…`.

La Reality teórica actual es `12.725` (se muestra como 12.72)  
Las 20 canciones con mayor constante en esta versión son:

{{章节en1}}

---

## Estadísticas de creadores de mapas

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

## Haz clic para acelerar el desarrollo de Milthm

Haz clic en los enlaces para apoyar el desarrollo de Milthm  
1, https://github.com/sponsors/morizerodev/  
2, https://afdian.com/a/morizero

---

## Contáctanos

{{联系我们}}

---

### Preguntas frecuentes

[Volver al índice](#目录)

- [No responde al hacer clic para generar imagen (u otro elemento)](#点击生成图片（或其他元素）没反应)
- [No se encuentra el archivo o la carpeta no existe](#找不到文件在哪或不存在文件夹)
- [Cómo respaldar guardados](#怎么备份存档)
- [Cómo restaurar guardados](#恢复存档)
- [Fórmula de cálculo de Reality](#reality-计算公式)
- [Determinación de notas](#音符判定)

> Asegúrese de conocer las operaciones básicas. Si no sabe y no desea aprender, no recomendamos usar este sitio.

---

#### No responde al hacer clic para generar imagen (u otro elemento)

- Verifique la conexión a internet. Si no puede acceder a GitHub, puede visitar [k9.lv/c/](http://k9.lv/c).
- Intente usar el navegador predeterminado del sistema o navegadores como Chrome, [Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ).  
  (No se recomienda usar navegadores como Baidu o 360)
- Si el problema persiste, puede ser por una versión antigua del sistema.

---

#### No se encuentra el archivo o la carpeta no existe

Puede consultar la ruta de guardado en [Subir archivo de guardado](#上传存档文件).  

#### Sin permiso de acceso

Primero confirme la versión de Milthm. Después de actualizar a la versión 3.2 o superior, debe iniciar el juego una vez para generar el guardado en esa ruta.

- **Android**

  Si usa el administrador de archivos del sistema o uno de terceros, intente usar otro administrador.  
  Se recomienda usar [MT Manager](https://mt2.cn/) y en la barra de direcciones ingresar la ruta directamente (si hay varios usuarios, cambie `0` por el ID de usuario o `/storage/emulated/0/` por `/sdcard/`):
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  También puede agregar un marcador en la esquina superior derecha para acceso rápido.  
  
También puede intentar no usar el explorador de archivos del sistema y usar la aplicación nativa de Android `Archivos`.  
Para abrir `Archivos`:  
Abra MT Manager  
Toque en `Extraer paquete de instalación` → seleccione `Aplicaciones del sistema` → busque `Archivos` → toque `Archivos`, seleccione `Más` en la esquina inferior izquierda → inicie la aplicación  
Después de entrar a la carpeta de guardados de Milthm, puede copiar a almacenamiento interno (`/storage/emulated/0/`, que suele ser la raíz de `Archivos`) y luego acceder desde el navegador.  
Si hay problemas con el guardado, también puede repararlo de forma similar, vea [Cómo restaurar guardados](#恢复存档).  
  
Si aún no puede acceder, debe conectar a una computadora o usar permisos ADB.  
En versiones recientes de Android, puede ocurrir este problema. Si tiene activada la depuración USB y la depuración inalámbrica en opciones de desarrollador, puede usar [Shizuku](https://shizuku.rikka.app/zh-hans/download/) para depuración ADB inalámbrica sin computadora. Consulte la documentación de Shizuku para más detalles.

- **iOS**

  Si no encuentra la carpeta de este iPhone/iPad en la aplicación `Archivos`, vaya a la página principal de la app y verifique en configuración (esquina superior derecha) si los archivos locales están ocultos.  
  Si aún no encuentra la carpeta de Milthm, verifique que esté usando la versión correcta de Milthm.  
  [Video demostrativo para iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### Cómo respaldar guardados

Entre a la carpeta de guardados y copie toda la carpeta data a otra ubicación.

#### Cómo restaurar guardados

Puede sobrescribir directamente los archivos de guardado originales con la copia manual.  
Para evitar accidentes, al generar el gráfico de puntuación se incrustan los guardados en formato texto dentro de la imagen (~~puede abrir la imagen como texto para ver~~).  
~~Puede subir el gráfico para consultar puntuaciones~~  
Puede subir el gráfico a [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html), luego descargar el archivo de guardado generado (sin progreso de historia, es una copia directa mía (mkzi-nya/归梦)) y reemplazar el guardado original.

## Otros contenidos

[Volver al índice](#目录)

### Wiki de Milthm

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**

- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Grupo de Milthm

{{群}}

### Qué es una ruta de archivo

Una ruta de archivo es una representación en cadena que apunta a una ubicación única en el sistema de archivos, generalmente en forma de árbol de directorios. Diferentes sistemas operativos usan distintos separadores como `/`, `\` o `:`. Las rutas pueden ser absolutas o relativas y describen la relación entre carpetas y archivos, siendo también importantes para construir URLs.

#### Ruta de archivos en Android

- **Almacenamiento externo:**  
  Ubicado en `/storage/emulated/ID_de_usuario (por defecto el usuario principal es 0)/` o `/sdcard/`, estos archivos son visibles para el usuario.
- **Directorio de datos de la aplicación:**  
  Normalmente en `/storage/emulated/0/Android/data/nombre.del.paquete/`, por ejemplo:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  La carpeta de guardados de Milthm está en:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  Si el sistema bloquea el acceso, intente conectar a una computadora o conceder permisos ADB al administrador de archivos.

---

### Tabla de referencia de Reality

{{reality表}}
