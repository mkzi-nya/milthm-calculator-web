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

{{updata}}

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

{{11}}

  Abra la carpeta Milthm con la aplicación [Archivos](https://support.apple.com//102570):

  ```text
  /data/
  ```

  > Si no encuentra archivos locales: en la página principal de "Archivos", abra el menú de tres puntos en la esquina superior derecha y desactive la ocultación de archivos locales ([más info](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Usuarios de Windows:**  
  En la barra de direcciones del explorador, ingrese:  
  {{12}}

[Video demostrativo para Android](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)  
[Video demostrativo para iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)  
Usuarios de Android [sin permiso de acceso](#没有访问权限)

---

### Ingresar datos ya analizados

Ingrese los datos en el cuadro de texto de la página principal con el siguiente formato:

{{13}}

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

{{16}}

---

## Gráfico de radar

Los cálculos relacionados son proporcionados por `PanyiAme`, para más detalles vea [Explicación de la tabla de puntuaciones de Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Acerca de Milthm

[Volver al índice](#目录)

### Fórmula de cálculo de Reality

El cálculo de Reality se basa en la puntuación de juego y la constante de la canción:

{{17}}

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

{{charter}}

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

{{wiki}}

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
