
## Mục Lục

- [Trang Web](#trang-web)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
  - [Tải Lên Tệp Lưu Trữ](#tải-lên-tệp-lưu-trữ)
  - [Nhập Dữ Liệu Đã Phân Tích](#nhập-dữ-liệu-đã-phân-tích)
  - [Lưu Trữ Phiên Bản Cũ](#lưu-trữ-phiên-bản-cũ)
  - [Đường Dẫn Lưu Trữ Khác](#đường-dẫn-lưu-trữ-khác)
  - [Biểu Đồ Radar](#biểu-đồ-radar)
- [Về Milthm](#về-milthm)
  - [Công Thức Tính Reality](#công-thức-tính-reality)
  - [Phán Đoán Nốt Nhạc](#phán-đoán-nốt-nhạc)
  - [Xếp Hạng Kết Quả](#xếp-hạng-kết-quả)
  - [Trạng Thái Hoàn Thành](#trạng-thái-hoàn-thành)
  - [Bảng Hằng Số](#bảng-hằng-số)
- [Liên Hệ](#liên-hệ)
- [Nội Dung Khác](#nội-dung-khác)
  - [Milthm Wiki](#milthm-wiki)
  - [Phương Pháp Mở Khóa Bài Hát Ẩn](#phương-pháp-mở-khóa-bài-hát-ẩn)
  - [Đường Dẫn Tệp Là Gì?](#đường-dẫn-tệp-là-gì)
  - [Bảng So Sánh Reality](#bảng-so-sánh-reality)

---

_Last updated on 2025.04.01 02:00 (UTC)_

> Nếu giao diện không hiển thị đúng, vui lòng [truy cập trên GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/)

---

## Trang Web

- [k9.lv/c/](http://k9.lv/c/)
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

---

## Hướng Dẫn Sử Dụng

### Tải Lên Tệp Lưu Trữ

Nhấn vào tùy chọn **"Upload File"** trên trang chủ để chọn và tải lên tệp lưu trữ `saves.db` hoặc tệp ghi điểm `data.db`.

> **Lưu Ý:**
> - `data.db` chỉ chứa các bản ghi chơi game được cập nhật sau phiên bản `3.2` (nếu không bị mất).
> - Người dùng Android được khuyến nghị sử dụng [MT Manager](https://mt2.cn/) để truy cập thư mục `sdcard/Android/data`.

#### Đường Dẫn Tệp (xem [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[Đường Dẫn Tệp Là Gì?](#đường-dẫn-tệp-là-gì)

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

Mở thư mục Milthm bằng ứng dụng [Files](https://support.apple.com//102570):

```text
/data/
```

> Nếu không tìm thấy tệp cục bộ: vào menu ba chấm ở góc trên bên phải của trang Files và bật hiển thị tệp cục bộ (xem [chi tiết](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Đối với người dùng Windows:**  
  Nhập vào thanh địa chỉ của File Explorer:  
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

### Nhập Dữ Liệu Đã Phân Tích

Nhập dữ liệu vào ô nhập trên trang chủ theo định dạng sau:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

Trong đó:
- `acc` là số thập phân biểu thị độ chính xác;
- `level` biểu thị xếp hạng, được định nghĩa như sau:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Lưu Trữ Phiên Bản Cũ

Các bản lưu từ trước phiên bản `Milthm 3.2` không thể trích xuất trực tiếp trên thiết bị di động. Bạn có thể thử các phương pháp sau:

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

### Đường Dẫn Lưu Trữ Khác

Nếu việc tải lên không phân tích được, bạn có thể thử trích xuất thủ công dữ liệu JSON và tải lên:

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

## Biểu Đồ Radar

Phương pháp tính được cung cấp bởi `PanyiAme`. Chi tiết, vui lòng xem [Giải Thích Biểu Đồ Điểm Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Về Milthm

[Quay lại Mục Lục](#mục-lục)

### Công Thức Tính Reality

Reality được tính dựa trên điểm số chơi game và hằng số của bài hát:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Công thức tính Reality cho một bài hát (trong đó s là điểm số và c là hằng số) như sau:

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

[Bảng So Sánh Reality](#bảng-so-sánh-reality)

#### Cài Đặt Mã Lệnh:

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

## Phán Đoán Nốt Nhạc

Trong trò chơi, có năm loại phán đoán cho từng nốt nhạc:

- **Perfect:** Đạt được 101% điểm và 100% ACC.
- **perfect:** Đạt được từ 75% đến 101% điểm và 100% ACC tùy theo độ chính xác.
- **Good:** Đạt được từ 30% đến 75% điểm và 50% ACC tùy theo độ chính xác.
- **Bad:** Combo bị gián đoạn, nhận được từ 0% đến 30% điểm và 10% ACC.
- **Miss:** Combo bị gián đoạn, không nhận điểm cũng như ACC.

Trong mỗi khoảng, điểm số và độ chính xác tỷ lệ thuận. Các khoảng chi tiết được trình bày trong bảng dưới đây:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## Xếp Hạng Kết Quả

Có tám xếp hạng kết quả:

- **R:** Rain – đạt được điểm lý thuyết 1010000 (RHYTHM of RAIN, khi tất cả các nốt đều là Perfect).
- **Purple S:** Đạt được All Perfect (tất cả các nốt đều là Perfect nhưng không đạt xếp hạng R, với điểm từ 1000000 đến 1009999).
- **Blue S:** Đạt được Full Combo (tất cả các nốt được đánh mà không có Bad/Miss, không xét các yêu cầu về điểm bên dưới).
- **S:** 950000-1009999.
- **A:** 900000-949999.
- **B:** 850000-899999.
- **C:** 800000-849999.
- **F:** 0-799999.

---

## Trạng Thái Hoàn Thành

Sau khi bài hát kết thúc, đánh giá hiệu suất hiển thị trên biểu đồ bao gồm:

- **Crash:**  
  - ACC < 80%
- **Complete:**  
  - ACC > 80%, với ít nhất một Bad/Miss.
- **Full Combo:**  
  - Tất cả các nốt được đánh trong vòng ±140ms, với ít nhất một Good.
- **All Perfect:**  
  - Tất cả các nốt được đánh trong vòng ±70ms, với ít nhất một small perfect.
- **Rhythm of Rain:**  
  - Tất cả các nốt được đánh trong vòng ±35ms, tức là giá trị lý thuyết.
- **AutoPlay is Awesome:**  
  - Hoàn thành bằng cách sử dụng AutoPlay.
- **Overloaded:**  
  - Điểm số vượt quá 1010000 (sử dụng mưa lớn).

---

## Bảng Hằng Số

[Quay lại Mục Lục](#mục-lục)

- [Description](#description)
- [Main Chapter](#introduction---weather-report)
  - [Weather Report](#introduction---weather-report)
  - [Rainfall Sounds](#prologue---rainfall-sounds)
  - [The Sides of Bitter and Sweet](#chapter1---the-sides-of-bitter-and-sweet)
- [Collaboration](#collaboration---rain-world)
  - [Rain World](#collaboration---rain-world)
  - [Notanote](#collaboration---notanote)
- [Single](#single---dream-tape)
  - [Dream Tape](#single---dream-tape)
  - [Gathering Blossoms Under Rain](#single---gathering-blossoms-under-rain)

---

## Giải Thích

> - Tất cả các bảng SP và các bản nhạc không tiêu chuẩn không được tính vào công thức Reality.  
> - Do vấn đề về độ chính xác, trong phiên bản hiện tại, tất cả các hằng số của bài hát được cho là 11.9 thực tế đều thấp hơn 11.9. Ví dụ, nếu Reality lý thuyết là `13.005`, trong trò chơi sẽ hiển thị là `13.00` thay vì `13.01`, và tính toán thực tế là `13.004999…`.

Reality lý thuyết hiện tại là `12.695` (hiển thị là 12.69).  
20 bài hát có hằng số cao nhất trong phiên bản hiện tại như sau:

| Rank | Title                   | Difficulty | Constant |
|------|-------------------------|------------|----------|
| 1 | Contrasty Angeles | CL | 12.3 |
| 2 | 命日 | CL | 12.2 |
| 3 | Moonfall／大月墜落狂想 | CB | 12.2 |
| 4 | Regnaissance | CL | 12.1 |
| 5 | Innocent white | CB | 12.1 |
| 6 | Broken Conviction | CL | 11.9 |
| 7 | Meltovt Necrosys | CB | 11.9 |
| 8 | Moonflutter | CL | 11.7 |
| 9 | Fly To Meteor feat.兔柒 | CL | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | KASANE | CB | 11.6 |
| 12 | Broken Conviction | CB | 11.5 |
| 13 | Threat - Metropolis | CB | 11.5 |
| 14 | Contrasty Angeles | CB | 11.5 |
| 15 | slic.hertz #GdbG | CB | 11.4 |
| 16 | Moonflutter | CB | 11.4 |
| 17 | Algebra | CB | 11.4 |
| 18 | Fragment of Memories | CB | 11.3 |
| 19 | cafe in 6412I731V | CB | 11.3 |
| 20 | IN | CB | 11.2 |
| 20 | イコラト | CB | 11.2 |
| 20 | 参宿四\~Betelgeuse\~ | CB | 11.2 |

---

## Introduction - Weather Report

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Welcome to Milthm  | 1.0  | -    | -    | SP |
| 時落之雨             | 1.0  | 4.5  | 8.5  | -    |
| 夜風                 | 3.0  | 7.3  | 10.1 | -    |
| 花月                 | 2.0  | 8.2  | 9.3  | -    |
| 暮予星光             | 2.0  | 7.5  | 9.1  | -    |

---

## Prologue - Rainfall Sounds

| Title        | DZ   | SK   | CB   | CL   |
|--------------|------|------|------|------|
| 雨之城        | 1.0  | 4.0  | 7.5  | -    |
| Jump out?     | 2.0  | 7.9  | 9.7  | -    |
| Moving On     | 2.0  | 6.3  | 10.8 | -    |
| Blueface      | 4.0  | 8.0  | 10.1 | -    |
| イコラト      | 3.0  | 8.7  | 11.2 | -    |
| 雨女          | 3.0  | 6.5  | 9.5  | 10.5 |
| 命日          | 3.0  | 8.7  | 11.1 | 12.2 |

---

## Chapter1 - The Sides of Bitter and Sweet

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| 粗线条的雨           | 1.0  | 4.0  | 8.3  | -    |
| Aconsma              | 1.0  | 6.0  | 9.3  | -    |
| OverRain             | 2.0  | 7.6  | 10.0 | -    |
| Fragment of Memories | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES       | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance         | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles    | 4.0  | 9.0  | 11.5 | 12.3 |

---

## Collaboration - Rain World

| Title                       | DZ   | SK   | CB   | CL   |
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

---

## Collaboration - Notanote

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| 烁雨                 | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar    | 4.0  | 7.8  | 10.2 | -    |
| Innocent white       | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg              | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys     | 2.0  | 7.8  | 11.9 | -    |

---

## Single - Dream Tape

| Title                          | DZ   | SK   | CB   | CL   |
|-|-|-|-|-|
| ネオン色のまち feat. Mai    | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                    | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                    | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai               | -    | -    | -    | SP   |
| WATER                       | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                     | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                      | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                 | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor              | 3.0  | 6.5  | 10.5 | 11.7 |
| 樱落繁花                    | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                    | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro           | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)  | 3.0  | 7.5  | 10.5 | -    |
| Algebra                     | 2.0  | 8.1  | 11.4 | SP  |
| Words                       | 2.0  | 6.5  | 9.3  | -    |
| 仮想明日                    | 3.5  | 6.6  | 10.0  | -    |
| 白虎蓮華                    | 3.0  | 6.5  | 9.6  | -    |
| サイクルの欠片              | 1.0  | 7.8  | 8.6  | -    |
| 参宿四\~Betelgeuse\~          | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG            | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!             | 2.0  | 7.5  | 9.8 | SP |
| IN                           | 1.0  | 7.9  | 11.2 | -    |
| 驟雨の狭間                  | -    | -    | -    | Ø    |
| Broken Conviction           | 4.5  | 4.5  | 11.5 | 11.9 |
| 选择你的宽带 | - | - | - | SP |

---

## Single - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   |
|------------------------------|------|------|------|------|
| FULi AUTO SHOOTER | 3.0  | 7.2  | 10.6  | -    |
| cafe in 6412I731V                    | 2.0  | 7.0  | 11.3  | -    |
| KASANE | 3.0  | 7.8  | 11.6  | -    |
| KAEDE | -  | -  | -  | SP  |

---

## Liên Hệ

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## Nội Dung Khác

[Quay lại Mục Lục](#mục-lục)

### Milthm Wiki

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Phương Pháp Mở Khóa Bài Hát Ẩn

- **Regnaissance**

  Mở khóa và chơi HYPER MEMORIES;  
  Trong khi chơi, nền sẽ chuyển sang đen trắng và Susan xuất hiện. Lúc đó, không được đánh nốt nào;  
  Sau đó, điểm số sẽ âm, đồng thời Susan chuyển sang màu sắc. Tiếp tục chơi cho đến khi điểm số > 0, bài hát sẽ được mở khóa sau khi đánh giá.

- **Contrasty Angeles**

  Sau khi mở khóa Regnaissance, đọc Tập 6 của chương 1 trong cốt truyện chính;  
  Chơi HYPER MEMORIES;  
  Trong khi chơi, nền sẽ chuyển sang đen trắng và Susan xuất hiện, bạn phải duy trì full combo;  
  Sau đó, điểm số giảm mạnh, đồng thời Susan chuyển sang màu sắc. Tiếp tục chơi cho đến khi điểm số > 0, bài hát sẽ được mở khóa sau khi đánh giá.

### Đường Dẫn Tệp Là Gì?

Đường dẫn tệp là biểu diễn dạng chuỗi chỉ định vị trí duy nhất trong hệ thống tệp, thường sử dụng cấu trúc cây thư mục. Các hệ điều hành khác nhau sử dụng các ký tự phân tách khác nhau như `/`, `\` hoặc `:`, và đường dẫn có thể là tuyệt đối hoặc tương đối, rất quan trọng trong việc xây dựng URL.

#### Đường Dẫn Tệp trên Android

- **Bộ Nhớ Ngoại Bộ:**  
  Nằm trong `/storage/emulated/[ID người dùng]` (người dùng chính mặc định là 0) hoặc `/sdcard/`, các tệp này hiển thị cho người dùng.
- **Thư Mục Dữ Liệu Ứng Dụng:**  
  Thông thường nằm ở `/storage/emulated/0/Android/data/[tên gói]/`, ví dụ:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```  
  Thư mục lưu trữ của Milthm nằm tại:  
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```  
  Nếu không thể truy cập, hãy thử kết nối với máy tính hoặc cấp quyền ADB cho trình quản lý tệp.

---

### Bảng So Sánh Reality

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
-0.4	986264.5
-0.39	986603.6
-0.38	986920.5
-0.37	987217.9
-0.36	987498.1
-0.35	987763.0
-0.34	988014.1
-0.33	988252.8
-0.32	988480.3
-0.31	988697.6
-0.3	988905.5
-0.29	989104.9
-0.28	989296.3
-0.27	989480.5
-0.26	989658.0
-0.25	989829.1
-0.24	989994.4
-0.23	990154.3
-0.22	990309.0
-0.21	990458.9
-0.2	990604.4
-0.19	990745.5
-0.18	990882.7
-0.17	991016.1
-0.16	991146.0
-0.15	991272.4
-0.14	991395.6
-0.13	991515.7
-0.12	991633.0
-0.11	991747.5
-0.1	991859.3
-0.09	991968.6
-0.08	992075.5
-0.07	992180.0
-0.06	992282.4
-0.05	992382.6
-0.04	992480.8
-0.03	992577.1
-0.02	992671.4
-0.01	992764.0
0.0	992854.8
0.01	992944.0
0.02	993031.5
0.03	993117.5
0.04	993202.0
0.05	993285.0
0.06	993366.7
0.07	993447.0
0.08	993525.9
0.09	993603.6
0.1	993680.1
0.11	993755.4
0.12	993829.5
0.13	993902.5
0.14	993974.5
0.15	994045.3
0.16	994115.2
0.17	994184.0
0.18	994251.9
0.19	994318.9
0.2	994384.9
0.21	994450.1
0.22	994514.4
0.23	994577.8
0.24	994640.4
0.25	994702.2
0.26	994763.3
0.27	994823.5
0.28	994883.1
0.29	994941.9
0.3	995000.0
0.31	995078.3
0.32	995156.6
0.33	995235.0
0.34	995313.5
0.35	995392.1
0.36	995470.8
0.37	995549.8
0.38	995629.0
0.39	995708.4
0.4	995788.2
0.41	995868.3
0.42	995948.7
0.43	996029.6
0.44	996110.9
0.45	996192.7
0.46	996275.0
0.47	996357.9
0.48	996441.4
0.49	996525.5
0.5	996610.4
0.51	996696.0
0.52	996782.4
0.53	996869.7
0.54	996958.0
0.55	997047.2
0.56	997137.4
0.57	997228.8
0.58	997321.4
0.59	997415.2
0.6	997510.4
0.61	997607.0
0.62	997705.2
0.63	997805.0
0.64	997906.5
0.65	998009.9
0.66	998115.3
0.67	998222.8
0.68	998332.6
0.69	998444.8
0.7	998559.7
0.71	998677.4
0.72	998798.1
0.73	998922.1
0.74	999049.6
0.75	999181.0
0.76	999316.5
0.77	999456.7
0.78	999601.8
0.79	999752.3
0.8	999908.9
0.81	1000072.2
0.82	1000242.9
0.83	1000421.8
0.84	1000610.1
0.85	1000808.9
0.86	1001019.8
0.87	1001244.5
0.88	1001485.3
0.89	1001745.0
0.9	1002027.3
0.91	1002336.9
0.92	1002680.4
0.93	1003067.0
0.94	1003509.8
0.95	1004029.7
0.96	1004661.3
0.965	1004999.0
1.0	1005000.0
```
