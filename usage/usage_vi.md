继续翻译内容到越南语，并且略微缩减Reality对照表的部分：

---

## Mục lục
- [Trang web](#trang-web)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
  - [Tải lên tệp lưu trữ](#tải-lên-tệp-lưu-trữ)
  - [Nhập dữ liệu đã phân tích](#nhập-dữ-liệu-đã-phân-tích)
  - [Lưu trữ phiên bản cũ](#lưu-trữ-phiên-bản-cũ)
  - [Các đường dẫn lưu trữ khác](#các-đường-dẫn-lưu-trữ-khác)
  - [Biểu đồ radar](#biểu-đồ-radar)
- [Về Milthm](#về-milthm)
  - [Công thức tính Reality](#công-thức-tính-reality)
  - [Phán đoán nốt nhạc](#phán-đoán-nốt-nhạc)
  - [Xếp hạng cuối cùng](#xếp-hạng-cuối-cùng)
  - [Trạng thái hoàn thành](#trạng-thái-hoàn-thành)
  - [Bảng hằng số](#bảng-hằng-số)
- [Liên hệ](#liên-hệ)
- [Khác](#khác)
  - [Wiki Milthm](#wiki-milthm)
  - [Bảng đối chiếu Reality](#bảng-đối-chiếu-reality)
---

> Hướng dẫn này được dịch bởi ChatGPT, nếu có vấn đề, vui lòng tham khảo phiên bản Trung Quốc giản thể.

## Trang web
  - [k9.lv/c/](http://k9.lv/c/)
  - [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/index.html)

## Hướng dẫn sử dụng

### Tải lên tệp lưu trữ

Nhấp vào **「Tải lên tệp」** trên trang chủ và chọn tệp lưu trữ `saves.db` hoặc tệp ghi điểm `data.db` để tải lên.

> **Lưu ý**:
> - `data.db` chỉ chứa dữ liệu chơi từ bản cập nhật `3.2` trở đi (nếu không bị mất).
> - Đối với Android, khuyến nghị sử dụng [MT Manager](https://mt2.cn/) để truy cập thư mục `sdcard/Android/data`.

#### **Đường dẫn tệp (Xem chi tiết [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))**

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**
  Sử dụng ứng dụng [Tệp](https://support.apple.com/vi-vn/102570) để mở thư mục Milthm:
  ```text
  /data/
  ```
- **Windows**
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

### Nhập dữ liệu đã phân tích

Nhập dữ liệu vào ô nhập trên trang chủ, định dạng như sau:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0],
    [name,Difficulty, constant, score, acc, level]
}
```

`acc` là giá trị thập phân, `level` là cấp độ, định nghĩa như sau:

```text
level: 0=R, 1=AP, 2=FC, 3=S, 4=A, 5=B, 6=C, 7=F
```

---

### Lưu trữ phiên bản cũ

Lưu trữ từ `Milthm 3.2` trở về trước không thể trích xuất trực tiếp trên thiết bị di động, bạn có thể thử cách sau:

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

### Các đường dẫn lưu trữ khác

Nếu không thể phân tích sau khi tải lên, bạn có thể thử trích xuất dữ liệu JSON thủ công và tải lên:

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
  Dữ liệu ứng dụng Milthm/Data/Library/Preferences
  ```
- **Windows**
  Trong registry:
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

## Biểu đồ radar

Phương pháp tính toán liên quan được cung cấp bởi `PanyiAme`, xem chi tiết trong [Hướng dẫn Bảng tra cứu Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Về Milthm

- [Quay lại Mục lục](#mục-lục)

### Công thức tính Reality

Reality được tính dựa trên điểm chơi và hằng số của bài hát:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

Công thức tính Reality của từng bài hát như sau (s là điểm, c là hằng số):

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

[Reality bảng đối chiếu](#reality-đối-chiếu)

#### Triển khai mã:
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

## Phán đoán nốt nhạc

Trong trò chơi, có 5 loại phán đoán cho mỗi nốt nhạc:

- `Perfect`: Nhận 101% điểm và 100% ACC.
- `perfect`: Nhận điểm và ACC từ 75%-101% dựa trên độ chính xác.
- `Good`: Nhận điểm và ACC từ 30%-15% dựa trên độ chính xác.
- `Bad`: Gián đoạn combo, nhận điểm từ 0%-30%, không có ACC.
- `Miss`: Gián đoạn combo, không nhận điểm và ACC.

Điểm và độ chính xác trong mỗi khoảng đều có tỷ lệ với nhau.

Các phạm vi tương ứng của 5 loại phán đoán như bảng sau:

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

---

## Xếp hạng cuối cùng

Có 8 loại xếp hạng cuối cùng:

- R: Đạt điểm lý thuyết 1010000 (RHYTHM of RAIN, tất cả các nốt nhạc đều là Perfect)
- S tím: Đạt All Perfect (Tất cả các nốt nhạc đều là Perfect và chưa đạt xếp hạng R, 1000000-1009999)
- S xanh: Đạt Full Combo (Tất cả các nốt nhạc đều không có Bad/Miss và chưa đạt S tím, không quan tâm đến điểm dưới đây)
- S: 950000-1009999
- A: 900000-949999
- B: 850000-899999
- C: 800000-849999
- F: 0-799999

---

## Trạng thái hoàn thành

Đánh giá hiển thị sau khi kết thúc trò chơi:

- Crash:
  - ACC < 80%
- Complete:
  - ACC > 80% và có ít nhất một Bad/Miss
- Full Combo:
  - Tất cả các nốt nhạc đều được đánh trong khoảng ±140ms, và có ít nhất một Good
- All Perfect:
  - Tất cả các nốt nhạc đều được đánh trong khoảng ±70ms và có ít nhất một Perfect nhỏ
- Rhythm of Rain:
  - Tất cả các nốt nhạc đều được đánh trong khoảng ±35ms, tức là điểm lý thuyết
- AutoPlay is Awesome:
  - Được chơi qua AutoPlay
- Overloaded:
  - Điểm trên 1010000 (Sử dụng mưa lớn).

---

## Bảng hằng số

- [Quay lại Mục lục](#mục-lục)
- [Giới thiệu](#giới-thiệu---dự-báo-thời-tiết)
  - [Dự báo thời tiết](#giới-thiệu---dự-báo-thời-tiết)
- [Chương chính](#chương-mở---tiếng-mưa)
  - [Tiếng mưa](#chương-mở---tiếng-mưa)
  - [Hai mặt ngọt ngào và đắng](#chương-1---hai-mặt-ngọt-ngào-và-đắng)
- [Chương liên kết](#liên-kết---thế-giới-mưa)
  - [Thế giới mưa](#liên-kết---thế-giới-mưa)
  - [Notanote](#liên-kết---notanote)
- [Đơn bài](#đơn-bài---băng-tape-mộng)
  - [Băng tape mộng](#đơn-bài---băng-tape-mộng) 


---

## Giới thiệu - Dự báo thời tiết

| Tiêu đề              | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| Welcome to Milthm     | 1.0  | -    | -    | -    |
| Mưa rơi              | 1.0  | 4.5  | 8.5  | -    |
| Gió đêm               | 3.0  | 7.3  | 10.1 | -    |
| Hoa nguyệt            | 2.0  | 8.2  | 9.3  | -    |
| Ánh sáng chiều tối    | 2.0  | 7.5  | 9.1  | -    |

## Chương mở - Tiếng mưa

| Tiêu đề           | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| Thành phố mưa     | 1.0  | 4.0  | 7.5  | -    |
| Jump out?         | 2.0  | 7.9  | 9.7  | -    |
| Moving On         | 2.0  | 6.3  | 10.8 | -    |
| Blueface          | 4.0  | 8.0  | 10.1 | -    |
| Ikorato           | 3.0  | 8.7  | 11.2 | -    |
| Mưa nữ            | 3.0  | 6.5  | 9.5  | 10.5 |
| Ngày chết         | 3.0  | 8.7  | 11.1 | 12.2 |

## Chương 1 - Hai mặt ngọt ngào và đắng

| Tiêu đề                | DZ   | SK   | CB   | CL   |
|------------------------|------|------|------|------|
| Mưa với nét thô         | 1.0  | 4.0  | 8.3  | -    |
| Aconsma                | 1.0  | 6.0  | 9.3  | -    |
| OverRain               | 2.0  | 7.6  | 10.0 | -    |
| Những mảnh ký ức       | 2.0  | 8.4  | 11.3 | -    |
| HYPER MEMORIES         | 1.0  | 8.9  | 11.7 | -    |
| Regnaissance           | 4.5  | 8.5  | 11.1 | 12.1 |
| Contrasty Angeles      | 4.0  | 9.0  | 11.5 | 12.3 |

## Liên kết - Thế giới mưa

| Tiêu đề                    | DZ   | SK   | CB   | CL   |
|----------------------------|------|------|------|------|
| Sundown                    | 1.0  | -    | -    | -    |
| Bio-Engineering            | 2.0  | 8.3  | 9.6  | -    |
| Threat - Sky Islands       | 2.0  | 6.9  | 10.6 | -    |
| Threat - Superstructure    | 2.0  | 5.5  | 10.3 | -    |
| White Lizard               | -    | 4.0  | -    | -    |
| Threat - Waterfront Complex| 2.0  | 7.6  | 10.6 | -    |
| Kayava                     | 3.0  | 5.5  | 10.4 | -    |
| Threat - Metropolis        | 2.0  | 6.6  | 11.5 | -    |
| Sheer Ice Torrent          | 2.0  | 7.8  | 11.1 | -    |
| Moonfall / Đại tháng rơi   | 2.0  | 8.0  | 12.2 | -    |

## Liên kết - Notanote

| Tiêu đề              | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| Shining Rain        | 2.0  | 7.0  | 9.4  | -    |
| cybernetic blazar   | 4.0  | 7.8  | 10.2 | -    |
| Innocent white      | 2.0  | 8.2  | 12.1 | -    |
| Elsorhg             | 2.0  | 7.5  | 9.8  | -    |
| Meltovt Necrosys    | 2.0  | 7.8  | 11.9 | -    |

## Đơn bài - Băng tape mộng

| Tiêu đề                         | DZ   | SK   | CB   | CL   |
|----------------------------------|------|------|------|------|
| Thành phố neons với Mai feat.    | 3.5  | 8.0  | 9.7  | -    |
| INFP.mp3                         | 2.0  | 5.5  | 9.2  | -    |
| Oniichan                         | 3.0  | 8.0  | 9.8  | -    |
| Oiiaioooooiai                    | -    | -    | -    | SP   |
| WATER                            | 3.0  | 7.3  | 10.6 | -    |
| Dogbite                          | 3.0  | 7.6  | 10.3 | SP   |
| Hikari                           | 3.0  | 8.4  | 10.7 | -    |
| Moonflutter                      | 3.0  | 7.9  | 11.4 | 11.7 |
| Fly To Meteor                    | 3.0  | 6.5  | 10.5 | 11.7 |
| Hoa anh đào rơi                  | 3.0  | 8.8  | 10.9 | -    |
| Agnostic                         | 3.0  | 7.4  | 10.0 | -    |
| Psyched Fevereiro                | 3.5  | 7.3  | 10.0 | -    |
| Future Unbound (Game Edit)       | 3.0  | 7.5  | 10.5 | -    |
| Algebra                          | 2.0  | 8.1  | 11.4 | -    |
| Words                            | 2.0  | 6.5  | 9.3  | -    |
| Ngày mai giả lập                  | 3.5  | 6.6  | 3.5  | -    |
| Hoa sen hổ trắng                  | 3.0  | 6.5  | 9.6  | -    |
| Mảnh vỡ của chu kỳ               | 1.0  | 7.8  | 8.6  | -    |
| Betelgeuse~ 参宿四                | 2.0  | 6.4  | 11.2 | -    |
| slic.hertz #GdbG                 | 3.0  | 7.6  | 11.4 | -    |
| Rainbow Flavor!                  | 2.0  | 7.5  | 9.8  | -    |
| IN                               | 1.0  | 7.9  | 11.2 | -    |
| Cơn mưa đột ngột                 | -    | -    | -    | Ø    |
| Broken Conviction                | 4.5  | 4.5  | 11.5 | 11.9 |

---

## Liên hệ

- **[QQ Milthm#-1 Nhóm chat](https://qm.qq.com/q/Utb6sNDvki)**: 375882310
- **[QQ Milthm#Φ Nhóm cộng đồng](https://qm.qq.com/q/fIErsKKz3a)**: 678471942
- **[Discord](https://discord.gg/66qthKHw)**: [mkzi_nya](https://discord.gg/66qthKHw)

---

## Khác
- [Quay lại Mục lục](#mục-lục)

### Wiki Milthm

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**
- **[Moegirl Wiki](https://mzh.moegirl.org.cn/Milthm)**
- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Bảng đối chiếu Reality

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
1.0	1105000.0
```



