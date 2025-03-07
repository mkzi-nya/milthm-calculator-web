
# Mục lục
- [trang web](#trang-web)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
  - [Tải lên tệp lưu trữ](#tải-lên-tệp-lưu-trữ)
  - [Nhập dữ liệu đã phân tích](#nhập-dữ-liệu-đã-phân-tích)
  - [Phiên bản lưu trữ cũ](#phiên-bản-lưu-trữ-cũ)
  - [Đường dẫn lưu trữ khác](#đường-dẫn-lưu-trữ-khác)
- [Nguyên lý hoạt động](#nguyên-lý-hoạt-động)
  - [Công thức tính Reality](#công-thức-tính-reality)
  - [Biểu đồ radar](#biểu-đồ-radar)
- [Liên hệ chúng tôi](#liên-hệ-chúng-tôi)

---

## trang web
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index_en.html)

## Hướng dẫn sử dụng

### Tải lên tệp lưu trữ

Nhấn vào **「Tải lên tệp」** trên trang chủ, chọn tệp lưu trữ (`saves.db`) hoặc tệp ghi điểm (`data.db`) để tải lên.

> **Lưu ý**：
> - `data.db` chỉ chứa dữ liệu trò chơi sau bản cập nhật `3.2` (nếu không bị mất).
> - Phiên bản Android nên sử dụng [MT Manager](https://mt2.cn/) để truy cập thư mục `sdcard/Android/data`.

#### **Đường dẫn tệp (xem thêm tại [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File)）**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Sử dụng ứng dụng [Tệp](https://support.apple.com/vi-vn/102570) để mở thư mục Milthm：
  ```text
  /data/
  ```
- **Windows**
  Nhập đường dẫn trong thanh địa chỉ Explorer:
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

### Nhập dữ liệu đã phân tích

Nhập dữ liệu vào ô nhập trên trang chủ theo định dạng sau:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` lấy giá trị số thập phân, `level` đại diện cho xếp hạng, được định nghĩa như sau:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Phiên bản lưu trữ cũ

Lưu trữ trước `Milthm 3.2` không thể trích xuất trực tiếp trên di động, có thể thử phương pháp sau:

```sh
SOURCE_DIR="/storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/"
DEST_DIR="/sdcard/"
FILE_NAME="save.json"

while true; do
    if [ -f "$SOURCE_DIR$FILE_NAME" ]; then
        cp "$SOURCE_DIR$FILE_NAME" "$DEST_DIR"
        if [ $? -eq 0 ]; then
            echo "Tệp $FILE_NAME đã được sao chép thành công vào /sdcard/"
            break
        else
            echo "Sao chép tệp thất bại, vui lòng kiểm tra quyền truy cập!"
        fi
    fi
done
```

---

### Đường dẫn lưu trữ khác

Nếu không thể phân tích sau khi tải lên, có thể thử trích xuất dữ liệu JSON và tải lên thủ công:

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
  Dữ liệu ứng dụng milthm/Data/Library/Preferences
  ```
- **Windows**
  Lưu trong Registry:
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

## Nguyên lý hoạt động

### Công thức tính Reality

Reality được tính dựa trên điểm số chơi và hằng số bản nhạc:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Công thức tính Reality đơn lẻ như sau (s là điểm số, c là hằng số):


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


#### Triển khai mã：
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

### Biểu đồ radar

Phương pháp tính toán liên quan do `PanyiAme` cung cấp, xem thêm tại [Hướng dẫn bảng điểm Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Liên hệ chúng tôi

- **[Milthm#-1 Nhóm chính thức](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[Milthm#Φ Nhóm cộng đồng](https://qm.qq.com/q/fIErsKKz3a)**：678471942
