
# Índice
- [sitio web](#sitio-web)
- [Instrucciones de uso](#instrucciones-de-uso)
  - [Subir archivo de guardado](#subir-archivo-de-guardado)
  - [Introducir datos analizados](#introducir-datos-analizados)
  - [Archivos de guardado antiguos](#archivos-de-guardado-antiguos)
  - [Otras rutas de guardado](#otras-rutas-de-guardado)
- [Principio de funcionamiento](#principio-de-funcionamiento)
  - [Fórmula de cálculo de Reality](#fórmula-de-cálculo-de-reality)
  - [Gráfico de radar](#gráfico-de-radar)
- [Contáctanos](#contáctanos)

---

## sitio web
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index_en.html)

## Instrucciones de uso

### Subir archivo de guardado

Haz clic en la opción **「Subir archivo」** en la página principal y selecciona el archivo de guardado (`saves.db`) o el archivo de registro de puntuaciones (`data.db`) para subirlo.

> **Nota**：
> - `data.db` solo contiene los registros de juego después de la actualización `3.2` (si no se han perdido).
> - Para Android, se recomienda usar [MT Manager](https://mt2.cn/) para acceder al directorio `sdcard/Android/data`.

#### **Ruta de los archivos (ver más en [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Usa la aplicación [Archivos](https://support.apple.com/es-es/102570) para abrir la carpeta Milthm：
  ```text
  /data/
  ```
- **Windows**
  Ingresa la siguiente ruta en la barra de direcciones del Explorador de archivos:
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

### Introducir datos analizados

Ingresa los datos en el cuadro de entrada en la página principal con el siguiente formato:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` es un valor decimal y `level` representa la clasificación, definida de la siguiente manera:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Archivos de guardado antiguos

Los archivos de guardado anteriores a `Milthm 3.2` no se pueden extraer directamente en dispositivos móviles, pero se puede intentar el siguiente método:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "El archivo $FILE_NAME se ha copiado correctamente en /sdcard/"
            break
        else
            echo "Error al copiar el archivo. ¡Por favor, revisa los permisos!"
        fi
    fi
done
```

---

### Otras rutas de guardado

Si no se puede analizar el archivo después de subirlo, intenta extraer los datos en formato JSON y subirlos manualmente:

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
  Datos de la aplicación milthm/Data/Library/Preferences
  ```
- **Windows**
  Guardado en el Registro del sistema:
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

## Principio de funcionamiento

### Fórmula de cálculo de Reality

Reality se calcula en función de la puntuación obtenida y la constante de la canción:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

La fórmula para calcular Reality en una sola canción es la siguiente (donde `s` es la puntuación y `c` es la constante):


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


#### Implementación en código：
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

### Gráfico de radar

El método de cálculo ha sido proporcionado por `PanyiAme`. Para más detalles, consulta [Guía de tabla de puntuación de Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Contáctanos

- **[Grupo oficial de Milthm#-1](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[Grupo comunitario de Milthm#Φ](https://qm.qq.com/q/fIErsKKz3a)**：678471942
