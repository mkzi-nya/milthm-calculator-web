Aquí está la traducción del documento al español:

---

## Tabla de contenido
- [Sitios web](#sitios-web)
- [Instrucciones de uso](#instrucciones-de-uso)
  - [Subir archivo de guardado](#subir-archivo-de-guardado)
  - [Ingresar datos analizados](#ingresar-datos-analizados)
  - [Archivos de guardado antiguos](#archivos-de-guardado-antiguos)
  - [Otras rutas de guardado](#otras-rutas-de-guardado)
  - [Gráfico radar](#gráfico-radar)
- [Sobre Milthm](#sobre-milthm)
  - [Fórmula de cálculo de Reality](#fórmula-de-cálculo-de-reality)
  - [Determinación de notas](#determinación-de-notas)
  - [Clasificación final](#clasificación-final)
  - [Estado de finalización](#estado-de-finalización)
  - [Tabla de constantes](#tabla-de-constantes)
- [Contáctanos](#contáctanos)
- [Otros](#otros)
  - [Wiki de Milthm](#wiki-de-milthm)
  - [Tabla de equivalencias de Reality](#tabla-de-equivalencias-de-reality)
---

> Estas instrucciones han sido traducidas por ChatGPT, si hay algún problema, por favor consulta la versión en chino simplificado.

## Sitios web
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## Instrucciones de uso

### Subir archivo de guardado

Haz clic en la opción **「Subir archivo」** en la página principal y selecciona el archivo de guardado `saves.db` o el archivo de registro de puntuaciones `data.db` para subirlo.

> **Nota**:
> - `data.db` solo contiene registros de juego después de la actualización `3.2` (si no se han perdido).
> - Se recomienda usar [MT Manager](https://mt2.cn/) en Android para acceder al directorio `sdcard/Android/data`.

#### **Rutas de archivos (Consulta más detalles en [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Abre la carpeta de Milthm usando la aplicación [Archivos](https://support.apple.com/es-es/102570):
  ```text
  /data/
  ```
- **Windows**
  En la barra de direcciones del Explorador de archivos ingresa:
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

### Ingresar datos analizados

Ingresa los datos en el campo de entrada en la página principal, con el siguiente formato:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` toma un valor decimal, `level` representa el nivel, y se define de la siguiente manera:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Archivos de guardado antiguos

Los archivos de guardado de `Milthm 3.2` o versiones anteriores no pueden ser extraídos directamente en dispositivos móviles, puedes intentar con el siguiente método:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "El archivo $FILE_NAME se ha copiado correctamente a /sdcard/"
            break
        else
            echo "¡Error al copiar el archivo, revisa los permisos!"
        fi
    fi
done
```

---

### Otras rutas de guardado

Si los datos no pueden ser analizados después de la carga, intenta extraer manualmente los datos en formato JSON y subirlos:

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
  Datos de la aplicación Milthm/Data/Library/Preferences
  ```
- **Windows**
  En el registro de Windows:
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

## Gráfico radar

El método de cálculo está proporcionado por `PanyiAme`, consulta los detalles en [Guía de la tabla de puntuaciones de Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Sobre Milthm

- [Volver al índice](#índice)

### Fórmula de cálculo de Reality

El cálculo de Reality se basa en la puntuación de juego y la constante de la pista:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

La fórmula de Reality para cada pista es la siguiente (s es la puntuación, c es la constante):

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

[Tabla de equivalencias de Reality](#tabla-de-equivalencias-de-reality)

#### Implementación en código:
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

## Determinación de notas

En el juego, hay cinco tipos de determinación de notas:

- `Perfect`: Obtiene 101% de la puntuación y 100% de ACC.
- `perfect`: Obtiene entre 75%-101% de la puntuación y 100% de ACC según la precisión.
- `Good`: Obtiene entre 30%-15% de la puntuación y 50% de ACC según la precisión.
- `Bad`: Interrupción de combo, obtiene entre 0%-30% de la puntuación, sin ACC.
- `Miss`: Interrupción de combo, no obtiene puntuación ni ACC.

Dentro de cada intervalo, la puntuación y la precisión están relacionadas de manera proporcional.

Las correspondencias de los cinco tipos de determinación se muestran en la siguiente tabla:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## Clasificación final

Las clasificaciones finales se dividen en ocho tipos:

- R: Puntuación teórica de 1010000 (RHYTHM of RAIN, todas las notas son Perfect)
- S morado: All Perfect (todas las notas son Perfect y no se alcanza la calificación R, 1000000-1009999)
- S verde: Full Combo (todas las notas no tienen determinación Bad/Miss y no se alcanza la calificación S morado, sin importar los siguientes requisitos de puntuación)
- S: 950000-1009999
- A: 900000-949999
- B: 850000-899999
- C: 800000-849999
- F: 0-799999

---

## Estado de finalización

Las evaluaciones mostradas al finalizar la canción:

- Crash:
  - ACC < 80%
- Complete:
  - ACC > 80% y al menos un Bad/Miss
- Full Combo:
  - Todas las notas se tocan dentro de ±140ms, y al menos una Good
- All Perfect:
  - Todas las notas se tocan dentro de ±70ms, y al menos un Perfect pequeño
- Rhythm of Rain:
  - Todas las notas se tocan dentro de ±35ms, es decir, el valor teórico
- AutoPlay is Awesome:
  - Pasar usando AutoPlay
- Overloaded:
  - Puntuación superior a 1010000 (usando lluvia torrencial).

---

## Tabla de constantes

- [Volver al índice](#índice)
- [Introducción](#introducción---pronóstico-del-tiempo)
  - [Pronóstico del tiempo](#introducción---pronóstico-del-tiempo)
- [Capítulo principal](#capítulo-de-apertura---el-sonido-de-la-lluvia)
  - [El sonido de la lluvia](#capítulo-de-apertura---el-sonido-de-la-lluvia)
  - [Los dos lados de lo dulce y lo amargo](#capítulo-principal-1---los-dos-lados-de-lo-dulce-y-lo-amargo)
- [Capítulo de colaboración](#colaboración---el-mundo-de-la-lluvia)
  - [El mundo de la lluvia](#colaboración---el-mundo-de-la-lluvia)
  - [Notanote](#colaboración---notanote)
- [Pistas individuales](#pistas-individuales---cinta-de-sueños)
  - [Cinta de sueños](#pistas-individuales---cinta-de-sueños)


---

## Introducción - Pronóstico del tiempo

| Título                | DZ   | SK   | CB   | CL   |
|-----------------------|------|------|------|------|
| Welcome to Milthm     | 1.0  | -    | -    | -    |
| Lluvia caída          | 1.0  | 4.5  | 8.5  | -    |
| Viento nocturno       | 3.0  | 7.3  | 10.1 | -    |
| Flores de luna        | 2.0  | 8.2  | 9.3  | -    |
| Luz estelar nocturna  | 2.0  | 7.5  | 9.1  | -    |

## Capítulo de apertura - El sonido de la lluvia

| Título               | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Ciudad de la lluvia  | 1.0  | 4.0  | 7.5  | -    |
| Jump out?            | 2.0  | 7.9  | 9.7  | -    |
| Moving On            | 2.0  | 6.3  | 10.8 | -    |
| Blueface             | 4.0  | 8.0  | 10.1 | -    |
| Ikorato              | 3.0  | 8.7  | 11.2 | -    |
| Mujer lluvia         | 3.0  | 6.5  | 9.5  | 10.5 |
| Día de la muerte     | 3.0  | 8.7  | 11.1 | 12.2 |

## Capítulo 1 - Los dos lados de lo dulce y lo amargo

| Título               | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Lluvia con trazos gruesos | 1.0  | 4.0  | 8.3  | -    |
| Aconsma               | 1.0  | 6.0  | 9.3  | -    |
| OverRain              | 2.0  | 7.6  | 10.0 | -    |
| Fragmentos de recuerdos| 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES       | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance         | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles    | 4.0  | 9.0  | 11.5 | 12.3 |

## Colaboración - El mundo de la lluvia

| Título                    | DZ   | SK   | CB   | CL   |
|---------------------------|------|------|------|------|
| Sundown                   | 1.0  | -    | -    | -    |
| Bio-Engineering           | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands      | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure   | 2.0  | 5.5  | 10.3 | -    |
| White Lizard              | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex | 2.0  | 7.6  | 10.6 | -    |
| Kayava                    | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis       | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent         | 2.0  | 7.8  | 11.1 | -    |
| Moonfall / Gran caída lunar | 2.0  | 8.0  | 12.2 | -    |

## Colaboración - Notanote

| Título                  | DZ   | SK   | CB   | CL   |
|-------------------------|------|------|------|------|
| Lluvia Brillante        | 2.0  | 7.0  | 9.4  | -    |
| Cybernetic Blazar       | 4.0  | 7.8  | 10.2 | -    |
| Innocent White          | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg                 | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys        | 2.0  | 7.8  | 11.9 | -    |

## Pistas individuales - Cinta de sueños

| Título                         | DZ   | SK   | CB   | CL   |
|--------------------------------|------|------|------|------|
| Ciudad neón con Mai feat.      | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                       | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                       | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                  | -    | -    | -    | SP   |
| WATER                          | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                        | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                         | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                    | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor                  | 3.0  | 6.5  | 10.5 | 11.7 |
| Flores de cerezo caídas        | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                       | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro              | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)     | 3.0  | 7.5  | 10.5 | -    |
| Algebra                        | 2.0  | 8.1  | 11.4 | -    |
| Words                          | 2.0  | 6.5  | 9.3  | -    |
| Mañana virtual                 | 3.5  | 6.6  | 3.5  | -    |
| Loto Tigre Blanco              | 3.0  | 6.5  | 9.6  | -    |
| Fragmentos del ciclo           | 1.0  | 7.8  | 8.6  | -    |
| Betelgeuse~ 参宿四              | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG               | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!                | 2.0  | 7.5  | 9.8  | -    |
| IN                             | 1.0  | 7.9  | 11.2 | -    |
| Agujeros en la lluvia          | -    | -    | -    | Ø    |
| Broken Conviction              | 4.5  | 4.5  | 11.5 | 11.9 |

---

## Contáctanos

- **[QQ Milthm#-1 Grupo de chat](https://qm.qq.com/q/Utb6sNDvki)**: 375882310
- **[QQ Milthm#Φ Grupo de comunidad](https://qm.qq.com/q/fIErsKKz3a)**: 678471942
- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## Otros
- [Volver al índice](#índice)

### Wiki de Milthm

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**
- **[Moegirl Wiki](https://mzh.moegirl.org.cn/Milthm)**
- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Tabla de equivalencias de Reality

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
...
0.5	996610.4
0.51	996696.0
0.52	996782.4
...
1.0	1105000.0
``` 

