
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

_Last updated on 2025.3.24 17:35 (UTC)_

> Nếu giao diện không hiển thị đúng, vui lòng [truy cập trên GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## Trang Web

{{网站}}

---

## Hướng Dẫn Sử Dụng

### Tải Lên Tệp Lưu Trữ

Nhấn vào tùy chọn **"Upload File"** trên trang chủ để chọn và tải lên tệp lưu trữ `saves.db` hoặc tệp ghi điểm `data.db`.

> **Lưu Ý:**
> - `data.db` chỉ chứa các bản ghi chơi game được cập nhật sau phiên bản `3.2` (nếu không bị mất).
> - Người dùng Android được khuyến nghị sử dụng [MT Manager](https://mt2.cn/) để truy cập thư mục `sdcard/Android/data`.

#### Đường Dẫn Tệp (xem [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[Đường Dẫn Tệp Là Gì?](#đường-dẫn-tệp-là-gì)

{{11}}

Mở thư mục Milthm bằng ứng dụng [Files](https://support.apple.com/zh-cn/102570):

```text
/data/
```

> Nếu không tìm thấy tệp cục bộ: vào menu ba chấm ở góc trên bên phải của trang Files và bật hiển thị tệp cục bộ (xem [chi tiết](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Đối với người dùng Windows:**  
  Nhập vào thanh địa chỉ của File Explorer:  
  {{12}}

---

### Nhập Dữ Liệu Đã Phân Tích

Nhập dữ liệu vào ô nhập trên trang chủ theo định dạng sau:

{{13}}

Trong đó:
- `acc` là số thập phân biểu thị độ chính xác;
- `level` biểu thị xếp hạng, được định nghĩa như sau:

{{14}}

---

### Lưu Trữ Phiên Bản Cũ

Các bản lưu từ trước phiên bản `Milthm 3.2` không thể trích xuất trực tiếp trên thiết bị di động. Bạn có thể thử các phương pháp sau:

{{15}}

---

### Đường Dẫn Lưu Trữ Khác

Nếu việc tải lên không phân tích được, bạn có thể thử trích xuất thủ công dữ liệu JSON và tải lên:

{{16}}

---

## Biểu Đồ Radar

Phương pháp tính được cung cấp bởi `PanyiAme`. Chi tiết, vui lòng xem [Giải Thích Biểu Đồ Điểm Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Về Milthm

[Quay lại Mục Lục](#mục-lục)

### Công Thức Tính Reality

Reality được tính dựa trên điểm số chơi game và hằng số của bài hát:

{{17}}

Công thức tính Reality cho một bài hát (trong đó s là điểm số và c là hằng số) như sau:

{{reality公式}}

[Bảng So Sánh Reality](#bảng-so-sánh-reality)

#### Cài Đặt Mã Lệnh:

{{公式js}}

---

## Phán Đoán Nốt Nhạc

Trong trò chơi, có năm loại phán đoán cho từng nốt nhạc:

- **Perfect:** Đạt được 101% điểm và 100% ACC.
- **perfect:** Đạt được từ 75% đến 101% điểm và 100% ACC tùy theo độ chính xác.
- **Good:** Đạt được từ 30% đến 15% điểm và 50% ACC tùy theo độ chính xác.
- **Bad:** Combo bị gián đoạn, nhận được từ 0% đến 30% điểm và 10% ACC.
- **Miss:** Combo bị gián đoạn, không nhận điểm cũng như ACC.

Trong mỗi khoảng, điểm số và độ chính xác tỷ lệ thuận. Các khoảng chi tiết được trình bày trong bảng dưới đây:

{{判定范围}}

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

{{章节en}}

---

## Giải Thích

> - Tất cả các bảng SP và các bản nhạc không tiêu chuẩn không được tính vào công thức Reality.  
> - Do vấn đề về độ chính xác, trong phiên bản hiện tại, tất cả các hằng số của bài hát được cho là 11.9 thực tế đều thấp hơn 11.9. Ví dụ, nếu Reality lý thuyết là `13.005`, trong trò chơi sẽ hiển thị là `13.00` thay vì `13.01`, và tính toán thực tế là `13.004999…`.

Reality lý thuyết hiện tại là `12.675` (hiển thị là 12.67).  
20 bài hát có hằng số cao nhất trong phiên bản hiện tại như sau:

{{章节en1}}

---

## Liên Hệ

{{联系我们}}

---

## Nội Dung Khác

[Quay lại Mục Lục](#mục-lục)

### Milthm Wiki

{{wiki}}

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

{{reality表}}
