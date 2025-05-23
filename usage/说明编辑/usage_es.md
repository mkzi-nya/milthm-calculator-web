
## Tabla de Contenidos

- [Sitio Web](#sitio-web)
- [Instrucciones](#instrucciones)
  - [Subir Archivos de Guardado](#subir-archivos-de-guardado)
  - [Ingresar Datos Analizados](#ingresar-datos-analizados)
  - [Guardados de Versiones Antiguas](#guardados-de-versiones-antiguas)
  - [Otras Rutas de Guardado](#otras-rutas-de-guardado)
  - [Gráfico de Radar](#gráfico-de-radar)
- [Acerca de Milthm](#acerca-de-milthm)
  - [Fórmula de Cálculo de Reality](#fórmula-de-cálculo-de-reality)
  - [Evaluación de Notas](#evaluación-de-notas)
  - [Calificaciones de Resultados](#calificaciones-de-resultados)
  - [Estado de Finalización](#estado-de-finalización)
  - [Tabla de Constantes](#tabla-de-constantes)
  - [Chater info](#charter-info)
- [Contáctanos](#contáctanos)
- [Otro Contenido](#otro-contenido)
  - [Milthm Wiki](#milthm-wiki)
  - [Métodos para Desbloquear Canciones Ocultas](#métodos-para-desbloquear-canciones-ocultas)
  - [¿Qué es una Ruta de Archivo?](#qué-es-una-ruta-de-archivo)
  - [Tabla Comparativa de Reality](#tabla-comparativa-de-reality)

---

{{updata}}

> Si la interfaz no se renderiza correctamente, por favor [visita en GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/)

---

## Sitio Web

{{网站}}

---

## Instrucciones

### Subir Archivos de Guardado

Haz clic en la opción **"Subir Archivo"** en la página principal para seleccionar y subir el archivo de guardado `saves.db` o el archivo de registro de puntuaciones `data.db`.

> **Nota:**
> - `data.db` solo contiene los registros de juego actualizados a partir de la versión `3.2` (si no se han perdido).
> - Se recomienda a los usuarios de Android utilizar [MT Manager](https://mt2.cn/) para acceder al directorio `sdcard/Android/data`.

#### Ruta de Archivo (ver [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[¿Qué es una Ruta de Archivo?](#qué-es-una-ruta-de-archivo)

{{11}}

Abre la carpeta de Milthm usando la aplicación [Files](https://support.apple.com//102570):

```text
/data/
```

> Si no se encuentran los archivos locales: ve al menú de tres puntos en la esquina superior derecha de la página de Files y muestra los archivos locales (ver [detalles](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Para Usuarios de Windows:**  
  Ingresa lo siguiente en la barra de direcciones del Explorador de Archivos:  
  {{12}}

---

### Ingresar Datos Analizados

Introduce los datos en el recuadro de entrada de la página principal, con el siguiente formato:

{{13}}

Donde:
- `acc` es un número decimal que representa la precisión;
- `level` indica la calificación, definida de la siguiente manera:

{{14}}

---

### Guardados de Versiones Antiguas

Los archivos guardados anteriores a `Milthm 3.2` no se pueden extraer directamente en dispositivos móviles. Puedes intentar los siguientes métodos:

{{15}}

---

### Otras Rutas de Guardado

Si la subida no se analiza correctamente, puedes intentar extraer manualmente los datos JSON y subirlos:

{{16}}

---

## Gráfico de Radar

El método de cálculo es proporcionado por `PanyiAme`. Para más detalles, consulta [Explicación del Gráfico de Puntuaciones de Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Acerca de Milthm

[Volver a la Tabla de Contenidos](#tabla-de-contenidos)

### Fórmula de Cálculo de Reality

Reality se calcula en base a la puntuación de juego y la constante de la canción:

{{17}}

La fórmula para calcular el Reality de una sola canción (donde s es la puntuación y c es la constante) es la siguiente:

{{reality公式}}

[Tabla Comparativa de Reality](#tabla-comparativa-de-reality)

#### Implementación de Código:

{{公式js}}

---

## Evaluación de Notas

El juego evalúa cada nota individual en cinco categorías:

- **Perfect:** Logra una puntuación del 101% y 100% de ACC.
- **perfect:** Logra una puntuación entre el 75% y el 101% y 100% de ACC según la precisión.
- **Good:** Logra una puntuación entre el 30% y el 75% y 50% de ACC según la precisión.
- **Bad:** Se rompe el combo, obteniendo una puntuación entre el 0% y el 30% y 10% de ACC.
- **Miss:** Se rompe el combo, sin obtener puntuación ni ACC.

Dentro de cada rango, la puntuación y la precisión son proporcionales. Los rangos detallados se muestran en la siguiente tabla:

{{判定范围}}

---

## Calificaciones de Resultados

Existen ocho calificaciones de resultado:

- **R:** Rain, alcanzando la puntuación teórica de 1010000 (RHYTHM of RAIN, donde todas las notas son Perfect).
- **Purple S:** Logra All Perfect (todas las notas son Perfect pero sin alcanzar la calificación R, con una puntuación entre 750000 y 1009999).
- **Blue S:** Logra Full Combo (todas las notas se aciertan sin ningún Bad/Miss, 300000-1009999).
- **S:** 950000-1009999.
- **A:** 900000-949999.
- **B:** 850000-899999.
- **C:** 800000-849999.
- **F:** 0-799999.

---

## Estado de Finalización

Al terminar la canción, la evaluación del rendimiento mostrada en el gráfico incluye:

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80% y al menos un Bad/Miss.
- **Full Combo:**  
  - Todas las notas se aciertan en ±140ms, con al menos un Good.
- **All Perfect:**  
  - Todas las notas se aciertan en ±70ms, con al menos un small perfect.
- **Rhythm of Rain:**  
  - Todas las notas se aciertan en ±35ms, es decir, el valor teórico.
- **AutoPlay is Awesome:**  
  - Completado usando AutoPlay.
- **Overloaded:**  
  - La puntuación supera 1010000 (utilizando una lluvia intensa).

---

## Tabla de Constantes

[Volver a la Tabla de Contenidos](#tabla-de-contenidos)

{{章节en}}

---

## Explicación

> - Todas las gráficas SP y las partituras no estándar no se incluyen en el cálculo de Reality.  
> - Debido a cuestiones de precisión, en la versión actual todas las constantes de canciones que deberían ser 11.9 son en realidad inferiores a 11.9. Por ejemplo, si la Reality teórica es `13.005`, en el juego se mostrará como `13.00` en lugar de `13.01`, y el cálculo real es `13.004999…`.

La Reality teórica actual es `12.710` (mostrada como 12.71).  
Las 20 canciones con las constantes más altas en la versión actual son las siguientes:

{{章节en1}}

---

## Charter info

<div style="font-size:10px;">

{{charter}}

</div>

---

## Contáctanos

{{联系我们}}

---

## Otro Contenido

[Volver a la Tabla de Contenidos](#tabla-de-contenidos)

### Milthm Wiki

{{wiki}}

### Métodos para Desbloquear Canciones Ocultas

- **Regnaissance**

  Desbloquea y juega HYPER MEMORIES;  
  Durante el juego, el fondo se pondrá en blanco y negro y aparecerá Susan. En ese momento, no golpees ninguna nota;  
  Luego, la puntuación se vuelve negativa mientras Susan se vuelve colorida. Continúa jugando hasta que la puntuación sea > 0, y la canción se desbloqueará tras la evaluación.

- **Contrasty Angeles**

  Tras desbloquear Regnaissance, lee el Episodio 6 del capítulo 1 de la historia principal;  
  Juega HYPER MEMORIES;  
  Durante el juego, el fondo se pondrá en blanco y negro y aparecerá Susan, y deberás mantener un full combo;  
  Luego, la puntuación caerá bruscamente mientras Susan se vuelve colorida. Continúa jugando hasta que la puntuación sea > 0, y la canción se desbloqueará tras la evaluación.

### ¿Qué es una Ruta de Archivo?

Una ruta de archivo es una representación en forma de cadena que señala una ubicación única en un sistema de archivos, generalmente utilizando una estructura de árbol de directorios. Los distintos sistemas operativos utilizan separadores diferentes como `/`, `\` o `:`. Las rutas pueden ser absolutas o relativas y son esenciales para construir URLs.

#### Rutas de Archivos en Android

- **Almacenamiento Externo:**  
  Ubicado en `/storage/emulated/[ID de usuario]` (el usuario principal por defecto es 0) o `/sdcard/`, estos archivos son visibles para el usuario.
- **Directorio de Datos de la Aplicación:**  
  Normalmente se encuentra en `/storage/emulated/0/Android/data/[nombre del paquete]/`, por ejemplo:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  El directorio de guardado de Milthm está en:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  Si se bloquea el acceso, intenta conectar a una computadora o concede permisos ADB al administrador de archivos.

---

### Tabla Comparativa de Reality

{{reality表}}
