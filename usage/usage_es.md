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
  - [Sobre Ytilaer en el gráfico de puntuación](关于查分图中的ytilaer)
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

- [k9.lv/c/](htt://k9.lv/c/)
- [mhtlim.top](https://mhtlim.top/)
- [mhtl.im](https://mhtl.im)
> 以上网站由_4everDimensions托管
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/)
- [milcalc.netlify.app](https://milcalc.netlify.app/)
> 以上网站由mkzi_nya托管

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
    [name,Difficulty, constant, score, acc, level,achievedStatus]
}
```

Donde:
- `acc` representa la precisión en decimal;
- `level` representa la calificación, definida como:

```text
level: 0=R, 1=M, 2=S, 3=A, 4=B, 5=C, 6=F
achievedStatus: 0=clear, 3=?, 4=fc, 5=ap, 6=false
```

> 沿用了milthm3.8版本中的评级格式，但实际从3.9版本开始存档中就不是这种格式了

---

### Guardados de versiones anteriores

Los guardados anteriores a `Milthm 3.2` no pueden extraerse directamente en dispositivos móviles, puede intentar los siguientes métodos:

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

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

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

- [Description](#description)
- [Main Chapter](#introduction---weather-report)
  - [Weather Report](#introduction---weather-report)
  - [Rainfall Sounds](#prologue---rainfall-sounds)
  - [The Sides of Bitter and Sweet](#chapter1---the-sides-of-bitter-and-sweet)
- [Collaboration](#collaboration---rain-world)
  - [Rain World](#collaboration---rain-world)
  - [Notanote](#collaboration---notanote)
  - [Electrode Core](#collaboration---electrode-core)
- [Single](#single---dream-tape)
  - [Dream Tape](#single---dream-tape)
  - [Gathering Blossoms Under Rain](#single---gathering-blossoms-under-rain)

---

## Explicación

> - Todas las canciones `SP` y no convencionales no participan en el cálculo de Reality.  
> - Por precisión, en esta versión todas las constantes de canciones con valor 11.9 son menores a 11.9. Por ejemplo, si la Reality teórica es `13.005`, en el juego se mostrará como `13.00` y no `13.01`, el cálculo real es `13.004999…`.

La Reality teórica actual es `12.725` (se muestra como 12.72)  
Las 20 canciones con mayor constante en esta versión son:

> Click the link to view the detailed information of the track/chart.
> The track/chart details are sourced from Milthm Lang's repository [RainSeek.Dataset.Milthm](https://github.com/MilthmLang/RainSeek.Dataset.Milthm/), with permission granted for use.

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
| 9 | Fly To Meteor (Milthm Edit) feat.兔柒 | CL | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | Brightened Demonios | CB | 11.7 |
| 12 | KASANE | CB | 11.6 |
| 13 | Broken Conviction | CB | 11.5 |
| 14 | Threat - Metropolis | CB | 11.5 |
| 15 | Contrasty Angeles | CB | 11.5 |
| 16 | slic.hertz #GdbG | CB | 11.4 |
| 17 | Moonflutter | CB | 11.4 |
| 18 | Algebra | CB | 11.4 |
| 19 | Myth compiler | CB | 11.4 |
| 20 | Fragment of Memories | CB | 11.3 |
| 20 | cafe in 6412I731V | CB | 11.3 |

---

## Introduction - Weather Report

| Title                | DZ   | SK   | CB   | CL   | SP |
|---------------------|------|------|------|------|---|
| [Welcome to Milthm](info:info("Welcome to Milthm"))  | [1.0](info:info("Welcome to Milthm", "Drizzle")) | -  | - | - | [SP](info:info("Welcome to Milthm", "Special")) |
| [时落之雨](info:info("时落之雨"))           | [1.0](info:info("时落之雨", "Drizzle"))  | [4.5](info:info("时落之雨", "Sprinkle"))  | [8.5](info:info("时落之雨", "Cloudburst"))  | -    | - |
| [夜風](info:info("夜風"))               | [3.0](info:info("夜風","Drizzle"))  | [7.3](info:info("夜風", "Sprinkle"))  | [10.1](info:info("夜風", "Cloudburst")) | -    | - |
| [花月](info:info("花月"))               | [2.0](info:info("花月", "Drizzle"))  | [8.2](info:info("花月", "Sprinkle"))  | [9.3](info:info("花月", "Cloudburst"))  | -    | - |
| [暮予星光](info:info("暮予星光"))           | [2.0](info:info("暮予星光", "Drizzle"))  | [7.5](info:info("暮予星光", "Sprinkle"))  | [9.1](info:info("暮予星光", "Cloudburst")) | -    | - |
| [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome"))           | [2.5](info:info("Fantasia Sonata Sky Syndrome", "Drizzle"))  | [7.1](info:info("Fantasia Sonata Sky Syndrome", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Sky Syndrome", "Cloudburst")) | -    | - |

---

## Prologue - Rainfall Sounds

| Title        | DZ   | SK   | CB   | CL   |
|--------------|------|------|------|------|
| [LOUDER!](info:info("LOUDER!"))  | [2.0](info:info("LOUDER!", "Drizzle"))  | [5.5](info:info("LOUDER!", "Sprinkle"))  | [9.5](info:info("LOUDER!", "Cloudburst")) | - |
| [雨女](info:info("雨女"))          | [3.0](info:info("雨女", "Drizzle")) | [6.5](info:info("雨女", "Sprinkle")) | [9.5](info:info("雨女", "Cloudburst")) | [10.5](info:info("雨女", "Clear")) |
| [雨之城](info:info("雨之城"))        | [1.0](info:info("雨之城", "Drizzle"))  | [4.0](info:info("雨之城", "Sprinkle"))  | [7.5](info:info("雨之城", "Cloudburst"))  | -    |
| [Jump out?](info:info("Jump out?"))     | [2.0](info:info("Jump out?", "Drizzle"))  | [7.9](info:info("Jump out?", "Sprinkle"))  | [9.7](info:info("Jump out?", "Cloudburst"))  | -    |
| [☹](info:info("☹"))      | [4.0](info:info("☹", "Drizzle"))  | [8.0](info:info("☹", "Sprinkle"))  | [10.1](info:info("☹", "Cloudburst")) | -    |
| [イコラト](info:info("イコラト"))      | [3.0](info:info("イコラト", "Drizzle"))  | [8.7](info:info("イコラト", "Sprinkle"))  | [11.2](info:info("イコラト", "Cloudburst")) | -    |
| [命日](info:info("命日"))          | [3.0](info:info("命日", "Drizzle"))  | [8.6](info:info("命日", "Sprinkle"))  | [11.1](info:info("命日", "Cloudburst")) | [12.7(12.2)](info:info("命日", "Clear")) |

---

## Chapter1 - The Sides of Bitter and Sweet

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [粗线条的雨](info:info("粗线条的雨"))         | [1.0](info:info("粗线条的雨", "Drizzle"))  | [4.0](info:info("粗线条的雨", "Sprinkle"))  | [8.3](info:info("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](info:info("Aconsma"))            | [1.0](info:info("Aconsma", "Drizzle"))  | [6.0](info:info("Aconsma", "Sprinkle"))  | [9.3](info:info("Aconsma", "Cloudburst"))  | -    |
| [OverRain](info:info("OverRain"))           | [2.0](info:info("OverRain", "Drizzle"))  | [7.6](info:info("OverRain", "Sprinkle"))  | [10.0](info:info("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](info:info("Fragment of Memories")) | [2.0](info:info("Fragment of Memories", "Drizzle"))  | [8.4](info:info("Fragment of Memories", "Sprinkle"))  | [11.3](info:info("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](info:info("HYPER MEMORIES"))     | [3.0](info:info("HYPER MEMORIES", "Drizzle"))  | [8.9](info:info("HYPER MEMORIES", "Sprinkle"))  | [11.8(11.7)](info:info("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](info:info("Regnaissance"))       | [4.5](info:info("Regnaissance", "Drizzle"))  | [8.5](info:info("Regnaissance", "Sprinkle"))  | [11.1](info:info("Regnaissance", "Cloudburst")) | [12.1](info:info("Regnaissance", "Clear")) |
| [Contrasty Angeles](info:info("Contrasty Angeles"))  | [4.0](info:info("Contrasty Angeles", "Drizzle"))  | [9.0](info:info("Contrasty Angeles", "Sprinkle"))  | [11.5](info:info("Contrasty Angeles", "Cloudburst")) | [12.5(12.3)](info:info("Contrasty Angeles", "Clear")) |
| [Brightened Demonios](info:info("Brightened Demonios"))  | [4.5](info:info("Brightened Demonios", "Drizzle"))  | [9.3](info:info("Brightened Demonios", "Sprinkle"))  | [11.7](info:info("Brightened Demonios", "Cloudburst")) | - |
| [Myth compiler](info:info("Myth compiler"))  | [3.0](info:info("Myth compiler", "Drizzle"))  | [7.0](info:info("Myth compiler", "Sprinkle"))  | [11.4](info:info("Myth compiler", "Cloudburst")) | - |
| [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia"))  | [2.0](info:info("Fantasia Sonata Arcadia", "Drizzle"))  | [6.0](info:info("Fantasia Sonata Arcadia", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Arcadia", "Cloudburst")) | - |

---

## 支线章节一 - 花裳随雨得春迟

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| [Vestige of Dreams](info:info("Vestige of Dreams"))          | [2.5](info:info("Vestige of Dreams", "Drizzle"))  | [6.5](info:info("Vestige of Dreams", "Sprinkle"))  | [11.5](info:info("Vestige of Dreams", "Cloudburst")) | - |
| [百九十](info:info("百九十"))          | [3.0](info:info("百九十", "Drizzle"))  | [9.2](info:info("百九十", "Sprinkle"))  | [11.8](info:info("百九十", "Cloudburst")) | - |
| [灯ノ桜蝶](info:info("灯ノ桜蝶"))          | [2.0](info:info("灯ノ桜蝶", "Drizzle"))  | [9.7](info:info("灯ノ桜蝶", "Sprinkle"))  | [12.0](info:info("灯ノ桜蝶", "Cloudburst")) | - |
| [Sakuyahime](info:info("Sakuyahime"))          | [3.5](info:info("Sakuyahime", "Drizzle"))  | [5.8](info:info("Sakuyahime", "Sprinkle"))  | [11.9](info:info("Sakuyahime", "Cloudburst")) | - |
| [靈](info:info("靈"))          | [4.5](info:info("靈", "Drizzle"))  | [9.4](info:info("靈", "Sprinkle"))  | [12.8](info:info("靈", "Cloudburst")) | - |
| [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks"))          | [2.0](info:info("BUCHiAGE Fireworks", "Drizzle"))  | [7.7](info:info("BUCHiAGE Fireworks", "Sprinkle"))  | [11.7](info:info("BUCHiAGE Fireworks", "Cloudburst")) | - |
| [ニニ feat. Qayo & mii](info:info("ニニ feat. Qayo & mii"))          | [2.0](info:info("ニニ feat. Qayo & mii", "Drizzle"))  | [6.7](info:info("ニニ feat. Qayo & mii", "Sprinkle"))  | [11.3](info:info("ニニ feat. Qayo & mii", "Cloudburst")) | - |


---

## Collaboration - Rain World

| Title                       | DZ   | SK   | CB   | CL   |
|-----------------------------|------|------|------|------|
| [Sundown](info:info("Sundown"))                | [1.0](info:info("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](info:info("Bio-Engineering"))        | [2.0](info:info("Bio-Engineering", "Drizzle"))  | [8.3](info:info("Bio-Engineering", "Sprinkle"))  | [9.6](info:info("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](info:info("Threat - Sky Islands"))   | [2.0](info:info("Threat - Sky Islands", "Drizzle"))  | [6.9](info:info("Threat - Sky Islands", "Sprinkle"))  | [10.7](info:info("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](info:info("Threat - Superstructure")) | [2.0](info:info("Threat - Superstructure", "Drizzle"))  | [5.5](info:info("Threat - Superstructure", "Sprinkle"))  | [10.3](info:info("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](info:info("White Lizard"))           | -    | [4.0](info:info("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex")) | [2.0](info:info("Threat - Waterfront Complex", "Drizzle"))  | [7.6](info:info("Threat - Waterfront Complex", "Sprinkle"))  | [10.7](info:info("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](info:info("Kayava"))                 | [3.0](info:info("Kayava", "Drizzle"))  | [5.5](info:info("Kayava", "Sprinkle"))  | [10.4](info:info("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](info:info("Threat - Metropolis"))    | [2.0](info:info("Threat - Metropolis", "Drizzle"))  | [6.6](info:info("Threat - Metropolis", "Sprinkle"))  | [11.6(11.5)](info:info("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](info:info("Sheer Ice Torrent"))      | [2.0](info:info("Sheer Ice Torrent", "Drizzle"))  | [7.8](info:info("Sheer Ice Torrent", "Sprinkle"))  | [11.1](info:info("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](info:info("大月墜落狂想")) | [2.0](info:info("大月墜落狂想", "Drizzle"))  | [8.0](info:info("大月墜落狂想", "Sprinkle"))  | [12.4(12.2)](info:info("大月墜落狂想", "Cloudburst")) | -    |

---

## Collaboration - Notanote

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [烁雨](info:info("烁雨"))             | [2.0](info:info("烁雨", "Drizzle"))  | [7.0](info:info("烁雨", "Sprinkle"))  | [9.4](info:info("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](info:info("cybernetic blazar")) | [4.0](info:info("cybernetic blazar", "Drizzle"))  | [7.8](info:info("cybernetic blazar", "Sprinkle"))  | [10.2](info:info("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](info:info("Innocent white"))    | [2.0](info:info("Innocent white", "Drizzle"))  | [8.2](info:info("Innocent white", "Sprinkle"))  | [12.1](info:info("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](info:info("Elsorhg"))           | [2.0](info:info("Elsorhg", "Drizzle"))  | [7.5](info:info("Elsorhg", "Sprinkle"))  | [10.9](info:info("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](info:info("Meltovt Necrosys"))  | [2.0](info:info("Meltovt Necrosys", "Drizzle"))  | [7.8](info:info("Meltovt Necrosys", "Sprinkle"))  | [12.0(11.9)](info:info("Meltovt Necrosys", "Cloudburst"))  | -    |

---

## Collaboration= - Electrode Core

| 标题              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [はんてん](info:info("はんてん"))             | [2.0](info:info("はんてん", "Drizzle"))  | [6.1](info:info("はんてん", "Sprinkle"))  | [10.1](info:info("はんてん", "Cloudburst"))  | -    |
| [Curse of 14](info:info("Curse of 14"))           | [3.0](info:info("Curse of 14", "Drizzle"))  | [7.5](info:info("Curse of 14", "Sprinkle"))  | [10.4](info:info("Curse of 14", "Cloudburst"))  | -    |
| [Virtual S0da](info:info("Virtual S0da"))           | [3.0](info:info("Virtual S0da", "Drizzle"))  | [6.7](info:info("Virtual S0da", "Sprinkle"))  | [10.6](info:info("Virtual S0da", "Cloudburst"))  | -    |
| [apOapSis(Edit)](info:info("apOapSisEdit"))           | [3.5](info:info("apOapSisEdit", "Drizzle"))  | [6.4](info:info("apOapSisEdit", "Sprinkle"))  | [10.6](info:info("apOapSisEdit", "Cloudburst"))  | -    |

---

## Single - Dream Tape

| Title                          | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai"))    | [3.5](info:info("ネオン色のまち feat. Mai", "Drizzle"))  | [8.0](info:info("ネオン色のまち feat. Mai", "Sprinkle"))  | [9.7](info:info("ネオン色のまち feat. Mai", "Cloudburst"))  | -    | - |
| [INFP.mp3](info:info("INFP.mp3"))                    | [2.0](info:info("INFP.mp3", "Drizzle"))  | [5.5](info:info("INFP.mp3", "Sprinkle"))  | [9.2](info:info("INFP.mp3", "Cloudburst"))  | -    | - |
| [Oniichan](info:info("Oniichan"))                    | [3.0](info:info("Oniichan", "Drizzle"))  | [8.0](info:info("Oniichan", "Sprinkle"))  | [9.8](info:info("Oniichan", "Cloudburst"))  | -    | - |
| [Moving On](info:info("Moving On"))     | [2.0](info:info("Moving On", "Drizzle"))  | [6.3](info:info("Moving On", "Sprinkle"))  | [10.8](info:info("Moving On", "Cloudburst")) | -    |
| [Oiiaioooooiai](info:info("Oiiaioooooiai"))               | -    | -    | -    | - | [🐈](info:info("Oiiaioooooiai", "Special")) |
| [WATER](info:info("WATER"))                       | [3.0](info:info("WATER", "Drizzle"))  | [7.3](info:info("WATER", "Sprinkle"))  | [10.6](info:info("WATER", "Cloudburst")) | -    | - |
| [Hikari](info:info("Hikari"))                      | [3.0](info:info("Hikari", "Drizzle"))  | [7.4](info:info("Hikari", "Sprinkle"))  | [10.7](info:info("Hikari", "Cloudburst")) | -    | - |
| [Moonflutter](info:info("Moonflutter"))                 | [3.0](info:info("Moonflutter", "Drizzle"))  | [7.9](info:info("Moonflutter", "Sprinkle"))  | [11.4](info:info("Moonflutter", "Cloudburst")) | [11.7](info:info("Moonflutter", "Clear")) | - |
| [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit"))              | [3.0](info:info("Fly To Meteor Milthm Edit", "Drizzle"))  | [6.5](info:info("Fly To Meteor Milthm Edit", "Sprinkle"))  | [10.5](info:info("Fly To Meteor Milthm Edit", "Cloudburst")) | - | - |
| [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit"))              | - | - | - | [11.7](info:info("Fly To Meteor feat.兔柒 Milthm Edit", "Clear")) | - |
| [樱落繁花](info:info("樱落繁花"))                    | [3.0](info:info("樱落繁花", "Drizzle"))  | [8.8](info:info("樱落繁花", "Sprinkle"))  | [10.9](info:info("樱落繁花", "Cloudburst")) | -    | - |
| [Agnostic](info:info("Agnostic"))                    | [3.0](info:info("Agnostic", "Drizzle"))  | [7.4](info:info("Agnostic", "Sprinkle"))  | [10.0](info:info("Agnostic", "Cloudburst")) | -    | - |
| [Dogbite](info:info("Dogbite"))                     | [3.0](info:info("Dogbite", "Drizzle"))  | [7.6](info:info("Dogbite", "Sprinkle"))  | [10.3](info:info("Dogbite", "Cloudburst")) | - | [🐕](info:info("Dogbite", "Special")) |
| [Psyched Fevereiro](info:info("Psyched Fevereiro"))           | [3.5](info:info("Psyched Fevereiro", "Drizzle"))  | [7.3](info:info("Psyched Fevereiro", "Sprinkle"))  | [10.0](info:info("Psyched Fevereiro", "Cloudburst")) | -    | - |
| [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit"))  | [3.0](info:info("Future Unbound Game Edit","Drizzle"))  | [7.5](info:info("Future Unbound Game Edit","Sprinkle"))  | [10.5](info:info("Future Unbound Game Edit","Cloudburst")) | -    | - |
| [Algebra](info:info("Algebra"))                     | [2.0](info:info("Algebra", "Drizzle"))  | [8.1](info:info("Algebra", "Sprinkle"))  | [11.4](info:info("Algebra", "Cloudburst")) | - | [🔢](info:info("Algebra", "Special")) |
| [Words](info:info("Words"))                       | [2.0](info:info("Words", "Drizzle"))  | [6.5](info:info("Words", "Sprinkle"))  | [9.3](info:info("Words", "Cloudburst"))  | -    | - |
| [仮想明日](info:info("仮想明日"))                    | [3.5](info:info("仮想明日", "Drizzle"))  | [6.7](info:info("仮想明日", "Sprinkle"))  | [10.0](info:info("仮想明日", "Cloudburst"))  | -    | - |
| [白虎蓮華](info:info("白虎蓮華"))                    | [3.0](info:info("白虎蓮華", "Drizzle"))  | [6.5](info:info("白虎蓮華", "Sprinkle"))  | [9.6](info:info("白虎蓮華", "Cloudburst"))  | -    | - |
| [サイクルの欠片](info:info("サイクルの欠片"))              | [1.0](info:info("サイクルの欠片", "Drizzle"))  | [7.8](info:info("サイクルの欠片", "Sprinkle"))  | [8.6](info:info("サイクルの欠片", "Cloudburst"))  | -    | - |
| [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~"))          | [2.0](info:info("参宿四~Betelgeuse~", "Drizzle"))  | [6.4](info:info("参宿四~Betelgeuse~", "Sprinkle"))  | [11.2](info:info("参宿四~Betelgeuse~", "Cloudburst"))  | -    | - |
| [slic.hertz #GdbG](info:info("slic.hertz #GdbG"))            | [3.0](info:info("slic.hertz #GdbG", "Drizzle"))  | [7.6](info:info("slic.hertz #GdbG", "Sprinkle"))  | [11.4](info:info("slic.hertz #GdbG", "Cloudburst"))  | -    | - |
| [Rainbow Flavor!](info:info("Rainbow Flavor!"))             | [1.0](info:info("Rainbow Flavor!", "Drizzle"))  | [7.5](info:info("Rainbow Flavor!", "Sprinkle"))  | [9.9](info:info("Rainbow Flavor!", "Cloudburst")) | - | [🍬](info:info("Rainbow Flavor!", "Special")) |
| [IN](info:info("IN"))                           | [2.0](info:info("IN", "Drizzle"))  | [7.9](info:info("IN", "Sprinkle"))  | [11.2](info:info("IN", "Cloudburst")) | -    | - |
| [驟雨の狭間](info:info("驟雨の狭間"))                  | -    | -    | [Ø](info:info("驟雨の狭間", "Cloudburst"))    | - | - |
| [Broken Conviction](info:info("Broken Conviction"))           | [4.5](info:info("Broken Conviction", "Drizzle"))  | [4.5](info:info("Broken Conviction", "Sprinkle"))  | [11.5](info:info("Broken Conviction", "Cloudburst")) | [11.9](info:info("Broken Conviction", "Clear")) | - |
| [选择你的宽带](info:info("选择你的宽带")) | - | - | - | - | [🛜](info:info("选择你的宽带", "Special")) |

---

## Single - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER")) | [3.0](info:info("FULi AUTO SHOOTER", "Drizzle"))  | [7.2](info:info("FULi AUTO SHOOTER", "Sprinkle"))  | [10.7](info:info("FULi AUTO SHOOTER", "Cloudburst"))  | -    | - |
| [cafe in 6412I731V](info:info("cafe in 6412I731V"))                    | [2.0](info:info("cafe in 6412I731V", "Drizzle"))  | [7.1](info:info("cafe in 6412I731V", "Sprinkle"))  | [11.3](info:info("cafe in 6412I731V", "Cloudburst"))  | -    | - |
| [KASANE](info:info("KASANE")) | [3.0](info:info("KASANE", "Drizzle"))  | [7.8](info:info("KASANE", "Sprinkle"))  | [11.6](info:info("KASANE", "Cloudburst"))  | -    | - |
| [KAEDE](info:info("KAEDE")) | -  | -  | -  | - | [🍁](info:info("KAEDE", "Special")) |
| [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars"))           | [2.0](info:info("Fantasia Sonata Stars", "Drizzle"))  | [6.8](info:info("Fantasia Sonata Stars", "Sprinkle"))  | [10.4](info:info("Fantasia Sonata Stars", "Cloudburst")) | -    | - |
| [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance"))           | [3.0](info:info("Fantasia Sonata God Dance", "Drizzle"))  | [6.9](info:info("Fantasia Sonata God Dance", "Sprinkle"))  | [11.3](info:info("Fantasia Sonata God Dance", "Cloudburst")) | -    | - |
| [ホシフルヨルニ](info:info("ホシフルヨルニ"))           | [2.0](info:info("ホシフルヨルニ", "Drizzle"))  | [4.0](info:info("ホシフルヨルニ", "Sprinkle"))  | [9.4](info:info("ホシフルヨルニ", "Cloudburst")) | -    | - |
| [GlassyHeart.](info:info("GlassyHeart."))           | [3.0](info:info("GlassyHeart.", "Drizzle"))  | [7.7](info:info("GlassyHeart.", "Sprinkle"))  | [11.1](info:info("GlassyHeart.", "Cloudburst")) | -    | - |
| [Chartreuse Green](info:info("Chartreuse Green"))           | [2.0](info:info("Chartreuse Green", "Drizzle"))  | [7.7](info:info("Chartreuse Green", "Sprinkle"))  | [10.3](info:info("Chartreuse Green", "Cloudburst")) | -    | - |
| [Aleph-0](info:info("Aleph-0"))           | [2.0](info:info("Aleph-0", "Drizzle"))  | [5.5](info:info("Aleph-0", "Sprinkle"))  | [11.1](info:info("Aleph-0", "Cloudburst")) | -    | - |
| [Garden](info:info("Garden"))          | [2.0](info:info("Garden", "Drizzle"))  | [7.3](info:info("Garden", "Sprinkle"))  | [9.8](info:info("Garden", "Cloudburst")) | - |
| [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden"))          | [2.0](info:info("Fantasia Sonata Botanical Garden", "Drizzle"))  | [6.1](info:info("Fantasia Sonata Botanical Garden", "Sprinkle"))  | [10.0](info:info("Fantasia Sonata Botanical Garden", "Cloudburst")) | - |
| [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!"))          | [2.0](info:info("Dum! Dum!! Dum!!!", "Drizzle"))  | [7.1](info:info("Dum! Dum!! Dum!!!", "Sprinkle"))  | [10.5](info:info("Dum! Dum!! Dum!!!", "Cloudburst")) | - |
| [Splash the Beat!!](info:info("Splash the Beat!!"))          | [1.0](info:info("Splash the Beat!!", "Drizzle"))  | [7.2](info:info("Splash the Beat!!", "Sprinkle"))  | [12.1](info:info("Splash the Beat!!", "Cloudburst")) | - |

---

## Estadísticas de creadores de mapas

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

## Haz clic para acelerar el desarrollo de Milthm

Haz clic en los enlaces para apoyar el desarrollo de Milthm  
1, https://github.com/sponsors/morizerodev/  
2, https://afdian.com/a/morizero

---

## Contáctanos

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **Discord**: [mkzi_nya](https://discordapp.com/users/1135097559891853435)

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

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Grupo de Milthm

记录于25.8.20 10:30  
  
| 群 | 群号 | 人数 |
|-|-|-|
| Milthm#1 交流群 | 372255828 | 1498 |
| Milthm#3 交流群 | 910085472 | 1994 |
| Milthm#5 官方交流群 | 480062123 | 88 |
| Milthm#6 公开测试 | 915230984 | 283 |
| Milthm#7 交流群 | 774927051 | 259 |
| Milthm#8 交流群 | 887231011 | 1957 |
| Milthm#9 开发交流群 | 1047814125 | 23 |
| Milthm#10 交流群 | 454822146 | 356 |
| Milthm#11 交流群 | 1042806409 | 81 |
| Milthm#12 交流群 | 1048470253 | 31 |
| Milthm#14 开发测试 | 1050419460 | 9 |
| Mhtlim#√-1 洨巟羣 | 375882310 | 157 |
| milthm#二创群——暮雨回廊 | 771250001 | 147 |
| 梦见霖音高级中学 高一一部114514班 | 574275806 | 13 |
| Milthm#Φ 交流群 | 678471942 | 40 |
| milthm#神金 交流群 | 877854042 | 67 |
| Milthm及各种🐉🖊交流群 | 981366419 | 54 |

`1`,`3`,`8`群已不对外开放  
`5`,`6`,`9`,`14`群为开发专用  
存在`Milthm#2 交流群da☆ze（梦见霖音高级中学 高一一部2班）`为解散后重建  
`√-1群`,`二创群`为交流群性质  
另有`Rain Editor 公测群`,`MCEMの小群`为玩家制作的制谱器发布群

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
