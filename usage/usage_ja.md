
# 目次

- [使用説明](#使用説明)
  - [保存ファイルのアップロード](#保存ファイルのアップロード)
  - [解析済みデータの入力](#解析済みデータの入力)
  - [旧バージョンの保存データ](#旧バージョンの保存データ)
  - [その他の保存パス](#その他の保存パス)
- [動作原理](#動作原理)
  - [Reality 計算式](#reality-計算式)
  - [レーダーチャート](#レーダーチャート)
- [お問い合わせ](#お問い合わせ)

---

## 使用説明

### 保存ファイルのアップロード

ホームページの **「ファイルをアップロード」** オプションをクリックし、保存ファイル (`saves.db`) またはスコア記録ファイル (`data.db`) を選択してアップロードしてください。

> **注意**：
> - `data.db` には `3.2` 更新後のプレイ記録のみが含まれています（データが失われていない場合）。
> - Android版では、[MTマネージャー](https://mt2.cn/) を使用して `sdcard/Android/data` ディレクトリにアクセスすることを推奨します。

#### **ファイルパス（詳細は [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File) を参照）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  [ファイル](https://support.apple.com/ja-jp/102570) アプリを使用して Milthm フォルダを開く：
  ```text
  /data/
  ```
- **Windows**
  エクスプローラーのアドレスバーに入力：
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

### 解析済みデータの入力

ホームページの入力欄にデータを入力し、以下の形式で記述します：

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` は小数、`level` は評価ランクを表し、定義は以下の通りです：

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### 旧バージョンの保存データ

`Milthm 3.2` より前の保存データは、モバイル版では直接抽出できません。以下の方法を試してください：

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "ファイル $FILE_NAME が /sdcard/ に正常にコピーされました"
            break
        else
            echo "ファイルのコピーに失敗しました。権限を確認してください！"
        fi
    fi
done
```

---

### その他の保存パス

アップロード後に解析できない場合は、JSON データを手動で抽出してアップロードしてください：

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
  milthmアプリデータ/Data/Library/Preferences
  ```
- **Windows**
  レジストリに保存：
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

## 動作原理

### Reality 計算式

Reality はプレイスコアと譜面定数に基づいて計算されます：

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

単曲 Reality 計算式は以下の通り（s はスコア、c は定数）：

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

#### コード実装：
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

### レーダーチャート

関連する計算方式は `PanyiAme` によって提供されました。詳細は [Milthm スコア表の説明](https://wwp.lanzoup.com/iZ59A2j8nbpe) を参照してください。

---

## お問い合わせ

- **[Milthm#-1 コミュニティ](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[Milthm#Φ コミュニティ](https://qm.qq.com/q/fIErsKKz3a)**：678471942

