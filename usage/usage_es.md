
# Índice
- [Sitio Web](#sitio-web)
- [Instrucciones de Uso](#instrucciones-de-uso)
  - [Subir Archivo de Guardado](#subir-archivo-de-guardado)
  - [Introducir Datos Analizados](#introducir-datos-analizados)
  - [Guardado de Versiones Anteriores](#guardado-de-versiones-anteriores)
  - [Otras Rutas de Guardado](#otras-rutas-de-guardado)
- [Principio de Funcionamiento](#principio-de-funcionamiento)
  - [Fórmula de Cálculo de Reality](#f%C3%B3rmula-de-c%C3%A1lculo-de-reality)
  - [Gráfico Radar](#gr%C3%A1fico-radar)
- [Tabla de Constantes](#tabla-de-constantes)
- [Contáctanos](#cont%C3%A1ctanos)

---

## Sitio Web
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## Instrucciones de Uso

### Subir Archivo de Guardado

Haga clic en la opción **"Subir Archivo"** en la página principal, seleccione el archivo de guardado `saves.db` o el archivo de registro de puntuaciones `data.db` y cárguelo.

> **Nota**:
> - `data.db` solo contiene el registro de juego actualizado a la versión `3.2` (si no se ha perdido).
> - En Android se recomienda usar [MT Manager](https://mt2.cn/) para acceder al directorio `sdcard/Android/data`.

#### **Ruta del Archivo (ver [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Utilice la aplicación [Archivos](https://support.apple.com/es-es/102570) para abrir la carpeta de Milthm:
  ```text
  /data/
  ```
- **Windows**
  Ingrese en la barra de direcciones del Explorador de Archivos:
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

### Introducir Datos Analizados

En el campo de entrada de la página principal, introduzca los datos en el siguiente formato:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` es un decimal, `level` representa la calificación, definida de la siguiente manera:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Guardado de Versiones Anteriores

Los archivos de guardado anteriores a Milthm 3.2 no se pueden extraer directamente en dispositivos móviles. Intente el siguiente método:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "El archivo $FILE_NAME se ha copiado exitosamente en /sdcard/"
            break
        else
            echo "Error al copiar el archivo, ¡verifique los permisos!"
        fi
    fi
done
```

---

### Otras Rutas de Guardado

Si la carga no se procesa correctamente, intente extraer manualmente los datos JSON y cargarlos:

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
  datos de la aplicación Milthm/Data/Library/Preferences
  ```
- **Windows**
  Se encuentra en el registro:
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

## Principio de Funcionamiento

### Fórmula de Cálculo de Reality

El cálculo de Reality se basa en la puntuación del juego y la constante de la partitura:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

La fórmula de cálculo de Reality para una sola canción es la siguiente (donde s es la puntuación y c es la constante):

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

#### Implementación del Código:
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

### Gráfico Radar

El método de cálculo relacionado es proporcionado por `PanyiAme`, ver [Instrucciones de la Tabla de Puntuaciones Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Tabla de Constantes

> - Todas las partituras SP y las partituras no convencionales no participan en el cálculo de Reality.
> - Debido a razones de precisión, en la versión actual, todas las constantes de las canciones con valor 11.9 no alcanzan realmente 11.9. Por ejemplo, si la Reality teórica de una versión es `13.005`, en el juego se mostrará como `13.00` en lugar de `13.01`

La Reality teórica de la versión actual es `12.670`  
Las 20 canciones con las constantes más altas en la versión actual son las siguientes

| Ranking | Título                    | Dificultad | Constante |
|---------|---------------------------|------------|-----------|
| 1       | Contrasty Angeles         | CL         | 12.3      |
| 2       | 命日                      | CL         | 12.2      |
| 3       | Moonfall／大月墜落狂想      | CB         | 12.2      |
| 4       | Regnaissance              | CL         | 12.1      |
| 5       | Innocent white            | CB         | 12.1      |
| 6       | Broken Conviction         | CL         | 11.9      |
| 7       | Meltovt Necrosys          | CB         | 11.9      |
| 8       | Moonflutter               | CL         | 11.7      |
| 9       | Fly To Meteor feat.兔柒   | CL         | 11.7      |
| 10      | HYPER MEMORIES            | CB         | 11.7      |
| 11      | Broken Conviction         | CB         | 11.5      |
| 12      | Threat - Metropolis       | CB         | 11.5      |
| 13      | Contrasty Angeles         | CB         | 11.5      |
| 14      | slic.hertz #GdbG          | CB         | 11.4      |
| 15      | Moonflutter               | CB         | 11.4      |
| 16      | Algebra                   | CB         | 11.4      |
| 17      | Fragment of Memories      | CB         | 11.3      |
| 18      | IN                        | CB         | 11.2      |
| 19      | イコラト                  | CB         | 11.2      |
| 20      | 参宿四\~Betelgeuse\~       | CB         | 11.2      |

---

## Introducción - Pronóstico del Tiempo

| Título               | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Welcome to Milthm    | 1.0  | -    | -    | -    |
| 时落之雨             | 1.0  | 4.5  | 8.5  | -    |
| 夜风                 | 3.0  | 7.3  | 10.1 | -    |
| 花月                 | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光             | 2.0  | 7.5  | 9.1  | -    |

## Prólogo - El Sonido de la Lluvia

| Título        | DZ   | SK   | CB   | CL   |
|---------------|------|------|------|------|
| 雨之城         | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

## Capítulo Principal Uno - La Dualidad de lo Dulce y lo Amargo

| Título                   | DZ   | SK   | CB   | CL   |
|--------------------------|------|------|------|------|
| 粗線條的雨               | 1.0  | 4.0  | 8.3  | -    |
| Aconsma                  | 1.0  | 6.0  | 9.3  | -    |
| OverRain                 | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories     | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES           | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance             | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles        | 4.0  | 9.0  | 11.5 | 12.3 |

## Colaboración - Mundo de la Lluvia

| Título                      | DZ   | SK   | CB   | CL   |
|-----------------------------|------|------|------|------|
| Sundown                     | 1.0  | -    | -    | -    |
| Bio-Engineering             | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands        | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure     | 2.0  | 5.5  | 10.3 | -    |
| White Lizard                | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex | 2.0  | 7.6  | 10.6 | -    |
| Kayava                      | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis         | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent           | 2.0  | 7.8  | 11.1 | -    |
| Moonfall／大月墜落狂想       | 2.0  | 8.0  | 12.2 | -    |

## Colaboración - Notanote

| Título                | DZ   | SK   | CB   | CL   |
|-----------------------|------|------|------|------|
| 烁雨                  | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar     | 4.0  | 7.8  | 10.2 | -    |
| Innocent white        | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg               | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys      | 2.0  | 7.8  | 11.9 | -    |

## Sencillo - Cinta de Ensueño

| Título                          | DZ   | SK   | CB   | CL   |
|---------------------------------|------|------|------|------|
| ネオン色のまち feat. Mai         | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                        | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                        | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                   | -    | -    | -    | SP   |
| WATER                           | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                         | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                          | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                     | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor                   | 3.0  | 6.5  | 10.5 | 11.7 |
| 樱落繁花                        | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                        | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro               | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)      | 3.0  | 7.5  | 10.5 | -    |
| Algebra                         | 2.0  | 8.1  | 11.4 | -    |
| Words                           | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                        | 3.5  | 6.6  | 3.5  | -    |
| 白虎蓮華                        | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片                  | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~            | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG                | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!                 | 2.0  | 7.5  | 9.8  | -    |
| IN                              | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                      | -    | -    | -    | Ø    |
| Broken Conviction               | 4.5  | 4.5  | 11.5 | 11.9 |

---

## Contáctanos

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)
