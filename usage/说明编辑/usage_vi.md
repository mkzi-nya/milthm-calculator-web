> LƯU Ý: Phiên bản ngôn ngữ hiện tại không còn được duy trì, một số thông tin có thể đã lỗi thời. Bạn nên truy cập phiên bản [tiếng Anh](?lang=en) hoặc [tiếng Trung giản thể](?lang=zh).
Hoặc bạn có thể gửi PR cho bản dịch ngôn ngữ hiện tại tại [kho lưu trữ này](https://github.com/mkzi-nya/milthm-calculator-web/tree/main/usage/%E8%AF%B4%E6%98%8E%E7%BC%96%E8%BE%91).
  Lần bảo trì cuối cùng vào 2025.7.5  
  
## Mục lục

- [Trang web](#trang-web)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
  - [Tải lên tệp lưu](#tải-lên-tệp-lưu)
  - [Nhập dữ liệu đã phân tích](#nhập-dữ-liệu-đã-phân-tích)
  - [Lưu trữ phiên bản cũ](#lưu-trữ-phiên-bản-cũ)
  - [Đường dẫn lưu trữ khác](#đường-dẫn-lưu-trữ-khác)
  - [Biểu đồ radar](#biểu-đồ-radar)
- [Về Milthm](#về-milthm)
  - [Công thức tính Reality](#công-thức-tính-reality)
  - [Về tệp lưu](#về-tệp-lưu)
  - [Phán đoán nốt nhạc](#phán-đoán-nốt-nhạc)
  - [Xếp hạng kết thúc](#xếp-hạng-kết-thúc)
  - [Trạng thái hoàn thành](#trạng-thái-hoàn-thành)
  - [Cá tháng tư](#cá-tháng-tư)
  - [Cách mở khóa bài hát ẩn](#cách-mở-khóa-bài-hát-ẩn)
  - [Bảng độ khó](#bảng-độ-khó)
  - [Thống kê người làm chart](#thống-kê-người-làm-chart)
  - [Nhấp để tăng tốc quá trình phát triển Milthm](#nhấp-để-tăng-tốc-quá-trình-phát-triển-milthm)
- [Liên hệ chúng tôi](#liên-hệ-chúng-tôi)
- [Câu hỏi thường gặp](#câu-hỏi-thường-gặp)
- [Nội dung khác](#nội-dung-khác)
  - [Milthm Wiki](#milthm-wiki)
  - [Nhóm giao lưu Milthm](#nhóm-giao-lưu-milthm)
  - [Đường dẫn tệp là gì](#đường-dẫn-tệp-là-gì)
  - [Bảng đối chiếu Reality](#bảng-đối-chiếu-reality)

---

{{updata}}

> Nếu giao diện hiển thị có vấn đề, vui lòng [truy cập trên GitHub](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/usage/usage_zh.md)

---

## Trang web

{{网站}}

---

## Hướng dẫn sử dụng

> Công cụ tính điểm hoàn toàn do người chơi tự làm, không liên quan đến nhà phát triển chính thức.

### Tải lên tệp lưu

Nhấp vào tùy chọn **"Tải lên tệp"** trên trang chủ, chọn tệp lưu `saves.db` hoặc tệp ghi điểm `data.db` để tải lên.

> **Lưu ý:**
> - `data.db` chỉ chứa các bản ghi chơi game sau bản cập nhật `3.2` (nếu không bị mất).
> - Trên Android, bạn nên sử dụng [MT Manager](https://mt2.cn/) để truy cập thư mục `sdcard/Android/data`.

#### Đường dẫn tệp (chi tiết xem tại [Milthm Wiki](https://milthm.fandom.com/wiki/Data_File))

[Đường dẫn tệp là gì](#đường-dẫn-tệp-là-gì)

{{11}}

Sử dụng ứng dụng [Tệp](https://support.apple.com//102570) để mở thư mục Milthm:

```text
/data/
```

> Nếu không tìm thấy tệp cục bộ: Vào trang chủ "Tệp", nhấp vào menu ba chấm ở góc trên bên phải và bỏ ẩn tệp cục bộ ([chi tiết](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Người dùng Windows:**
Nhập vào thanh địa chỉ của File Explorer:
{{12}}

[Video hướng dẫn Android](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)
[Video hướng dẫn iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)
Người dùng Android [không có quyền truy cập](#không-có-quyền-truy-cập)

---

### Nhập dữ liệu đã phân tích

Nhập dữ liệu vào ô nhập liệu trên trang chủ, định dạng như sau:

{{13}}

Trong đó:
- `acc` là số thập phân biểu thị độ chính xác;
- `level` biểu thị xếp hạng, được định nghĩa như sau:

{{14}}

---

### Lưu trữ phiên bản cũ

Các bản lưu trước `Milthm 3.2` không thể trích xuất trực tiếp trên thiết bị di động, có thể thử các phương pháp sau:

{{15}}

---

### Đường dẫn lưu trữ khác

Nếu không thể phân tích sau khi tải lên, bạn có thể thử trích xuất dữ liệu JSON thủ công và tải lên:

{{16}}

---

## Biểu đồ radar

Phương pháp tính toán liên quan được cung cấp bởi `PanyiAme`, chi tiết xem tại [Giải thích bảng điểm Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Về Milthm

[Quay lại mục lục](#mục-lục)

### Công thức tính Reality

Reality được tính toán dựa trên điểm chơi và độ khó của bản nhạc:

{{17}}

Công thức tính Reality cho một bài hát như sau (trong đó s là điểm, c là độ khó):

{{reality公式}}

[Bảng đối chiếu Reality](#bảng-đối-chiếu-reality)

#### Triển khai mã:

{{公式js}}

---

## Về Ytilaer trong biểu đồ điểm

Giá trị này không có ý nghĩa thực tế, cụ thể như sau:
- Khi điểm trung bình của b20 lớn hơn 1005k, giá trị này bằng với Reality thực tế.
- Giá trị này là giá trị lớn nhất của reality (điểm trung bình, reality đơn bài trung bình) của 20 bài hát.

## Về tệp lưu

Trong các phần sau, đường dẫn sẽ được viết tắt là `MilthmDataDirectory`.

### Lưu game
Tệp này nằm ở `MilthmDataDirectory/saves.db`.

Nó chứa dữ liệu liên quan đến tiến trình chơi game của người chơi và các bản ghi game liên quan.

Dữ liệu được lưu trữ dưới dạng json trong bảng kv (định dạng json giống với định dạng dữ liệu lưu của phiên bản cũ).

### Lưu dữ liệu
Tệp này nằm ở `MilthmDataDirectory/data.db`.

Nó được sử dụng để lưu trữ dữ liệu điểm số đã gửi thành công mỗi lần.

Dữ liệu trong tệp này là nguồn dữ liệu cho bảng xếp hạng cục bộ.

---

## Phán đoán nốt nhạc

Trong game, một nốt nhạc có 5 loại phán đoán:

- **Perfect**: Đạt 101% điểm và 100% ACC.
- **perfect**: Đạt 75%-101% điểm và 100% ACC tùy theo độ chính xác.
- **Good**: Đạt 30%-75% điểm và 50% ACC tùy theo độ chính xác.
- **Bad**: Combo bị ngắt, đạt 0%-30% điểm và 10% ACC.
- **Miss**: Combo bị ngắt, không đạt điểm và ACC.

Điểm và độ chính xác trong mỗi khoảng tỷ lệ thuận với nhau, phạm vi phán đoán chi tiết như bảng sau:

{{判定范围}}

---

## Xếp hạng kết thúc

Có tám loại xếp hạng kết thúc:
Màu trắng khi chưa đạt FC (Full Combo), màu xanh lam khi đạt FC, màu tím khi đạt AP.
- <img src="../jpgs/0.png" style="height:1.5em;vertical-align:middle;">: Phiên bản cũ hiển thị là <img src="../jpgs/0-1.png" style="height:1.5em;vertical-align:middle;">, đạt điểm lý thuyết 1010000 (RHYTHM of RAIN, tất cả các nốt đều đạt điểm tối đa).
- <img src="../jpgs/1.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/11.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/10.png" style="height:1.5em;vertical-align:middle;">: M, tức Milthm, đạt được khi điểm đạt 1005000;
- <img src="../jpgs/2.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/21.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/20.png" style="height:1.5em;vertical-align:middle;">: Đạt được khi điểm đạt 950000;
- <img src="../jpgs/3.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/31.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/30.png" style="height:1.5em;vertical-align:middle;">: Đạt được khi điểm đạt 900000;
- <img src="../jpgs/4.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/41.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/40.png" style="height:1.5em;vertical-align:middle;">: Đạt được khi điểm đạt 850000;
- <img src="../jpgs/5.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/51.png" style="height:1.5em;vertical-align:middle;"><img src="../jpgs/50.png" style="height:1.5em;vertical-align:middle;">: Đạt được khi điểm đạt 800000;
- <img src="../jpgs/6.png" style="height:1.5em;vertical-align:middle;">: Đạt được khi điểm dưới 800000, chưa hoàn thành, không có biểu tượng FC/AP.

---

## Trạng thái hoàn thành

Đánh giá hiển thị trên bản đồ sau khi chơi xong bao gồm:

- <img src="../jpgs/crash.png" style="height:1.5em;vertical-align:middle;">:
  - ACC < 80%
- <img src="../jpgs/complete.png" style="height:1.5em;vertical-align:middle;">:
  - ACC > 80%, và ít nhất có một phán đoán Bad/Miss.
- <img src="../jpgs/fullcombo.png" style="height:1.5em;vertical-align:middle;">:
  - Tất cả các nốt đều được đánh trong khoảng ±140ms, và ít nhất có một phán đoán Good.
- <img src="../jpgs/allprefect.png" style="height:1.5em;vertical-align:middle;">:
  - Tất cả các nốt đều được đánh trong khoảng ±70ms, và ít nhất có một phán đoán small perfect.
- <img src="../jpgs/rhythmofrain.png" style="height:1.5em;vertical-align:middle;">:
  - Tất cả các nốt đều được đánh trong khoảng ±35ms, tức là giá trị lý thuyết.
- <img src="../jpgs/aotoplay.png" style="height:1.5em;vertical-align:middle;">:
  - Hoàn thành bằng AutoPlay.
- <img src="../jpgs/overloaded.png" style="height:1.5em;vertical-align:middle;">:
  - Điểm lớn hơn 1010000 (sử dụng mưa lớn).

---

## Cá tháng tư

### Hướng dẫn (chỉ để tham khảo)
- Sau khi vào game, bật chế độ Nightmare và chơi bất kỳ bài hát nào có độ khó `CB`. Độ khó hiển thị sẽ thay đổi trong quá trình chơi, và tất cả các phím sẽ biến thành những sợi mưa, điểm số tăng rất chậm.
- Sau khi chơi xong, một thông báo sẽ hiện ra. Xác nhận và quay lại, cấp độ của tất cả các bài hát sẽ thay đổi, tăng khoảng 20 lần ([xem](https://github.com/mkzi-nya/milthm-calculator-web/blob/main/js/cha_newui.js#L20-L212)), và UserReality sẽ nhân với 20 (không liên quan đến độ khó của Cá tháng tư).
- Sau đó, chơi lại bất kỳ bản nhạc nào và một cửa sổ bật lên sẽ xuất hiện, sau đó các bản nhạc trên cấp 30 sẽ bị loại bỏ.
- Chơi một bản nhạc có cấp độ lớn hơn 16 để vào cốt truyện, sẽ mở khóa bản nhạc Cá tháng tư của `Rainbow Flavor!`, sau đó game sẽ bị crash.
- Sau đó, trò chơi nhỏ vịt kho tàu sẽ xuất hiện. Sau khi chơi đến một số vòng nhất định, bản nhạc Cá tháng tư thứ 2 sẽ được mở khóa.

---

## Cách mở khóa bài hát ẩn

- **Regnaissance**

  Mở khóa và chơi HYPER MEMORIES;
  Trong quá trình chơi, Susan đen trắng sẽ xuất hiện ở nền, lúc này đừng đánh bất kỳ nốt nhạc nào;
  Sau đó điểm số sẽ trở thành số âm, đồng thời Susan sẽ chuyển sang màu, tiếp tục chơi và làm cho điểm số > 0, sau khi kết thúc sẽ mở khóa bài hát này.

- **Contrasty Angeles**

  Sau khi mở khóa Regnaissance, đọc chương 6 của cốt truyện chính;
  Chơi HYPER MEMORIES;
  Trong quá trình chơi, Susan đen trắng sẽ xuất hiện ở nền, lúc này cần giữ Full Combo;
  Sau đó điểm số giảm mạnh, đồng thời Susan sẽ chuyển sang màu, tiếp tục chơi và làm cho điểm số > 0, sau khi kết thúc sẽ mở khóa bài hát này.

- **Dogbite**
- Chơi Dogbite độ khó CB và đạt hạng A trở lên.
- Sau khi thỏa mãn điểm đầu tiên, chơi Oiiaioooooiai và giữ Full Combo khi các nốt nhạc biến thành mèo (các nốt trước đó có thể đánh hoặc không), lúc này mỗi khi đánh trúng một nốt sẽ phát ra tiếng chó sủa.
- Sau khi thỏa mãn điểm thứ hai, một dị tượng sẽ được kích hoạt, sau đó vào bản nhạc Dogbite SP, tức là đã mở khóa thành công (không cần hoàn thành).

- Lưu ý: Có thể giảm độ khó mở khóa bằng cách bật dị tượng `Mưa lớn`.

---

## Bảng độ khó

[Quay lại mục lục](#mục-lục)

{{章节en}}

---

## Giải thích

> - Tất cả các bản nhạc `SP` và các bản nhạc không theo quy tắc đều không tham gia tính toán Reality.
> - Do vấn đề về độ chính xác, tất cả các bản nhạc có độ khó 11.9 trong phiên bản hiện tại đều có độ khó thực tế thấp hơn 11.9. Ví dụ, nếu Reality lý thuyết của một phiên bản là `13.005`, trong game sẽ hiển thị là `13.00` chứ không phải `13.01`, thực tế tính toán là `13.004999…`.

Reality lý thuyết của phiên bản hiện tại là `12.725` (hiển thị là 12.72)
20 bài hát có độ khó cao nhất trong phiên bản hiện tại như sau:

{{章节en1}}

---

## Thống kê người làm chart

<div style="font-size:10px;">

{{charter}}

</div>

---

## Nhấp để tăng tốc quá trình phát triển Milthm

Nhấp vào liên kết để tăng tốc quá trình phát triển Milthm
1, https://github.com/sponsors/morizerodev/
2, https://afdian.com/a/morizero

---

## Liên hệ chúng tôi

{{联系我们}}

---

### Câu hỏi thường gặp

[Quay lại mục lục](#mục-lục)

- [Nhấp để tạo hình ảnh (hoặc các yếu tố khác) không phản hồi](#nhấp-để-tạo-hình-ảnh-hoặc-các-yếu-tố-khác-không-phản-hồi)
- [Không tìm thấy tệp hoặc thư mục không tồn tại](#không-tìm-thấy-tệp-hoặc-thư-mục-không-tồn-tại)
- [Cách sao lưu tệp lưu](#cách-sao-lưu-tệp-lưu)
- [Khôi phục tệp lưu](#khôi-phục-tệp-lưu)
- [Công thức tính Reality](#công-thức-tính-reality)
- [Phán đoán nốt nhạc](#phán-đoán-nốt-nhạc)

> Vui lòng đảm bảo bạn hiểu các thao tác cơ bản nhất. Nếu không hiểu và không muốn tự học, chúng tôi không khuyến khích bạn sử dụng trang web này.

---

#### Nhấp để tạo hình ảnh (hoặc các yếu tố khác) không phản hồi

- Kiểm tra trạng thái mạng. Nếu không thể truy cập GitHub, bạn có thể truy cập [k9.lv/c/](http://k9.lv/c).
- Thử chuyển sang trình duyệt hệ thống hoặc sử dụng các trình duyệt như Chrome, [Edge](https://www.microsoft.com/en-us/edge/?cs=4218728316&form=MA13FJ).
  (Không nên sử dụng Baidu, 360 và các trình duyệt khác)
- Nếu vấn đề vẫn tiếp diễn, có thể do phiên bản hệ thống quá cũ.

---

#### Không tìm thấy tệp hoặc thư mục không tồn tại

Bạn có thể xem đường dẫn lưu trữ trong [Tải lên tệp lưu](#tải-lên-tệp-lưu).

#### Không có quyền truy cập

Trước tiên, hãy xác nhận phiên bản Milthm của bạn. Sau khi cập nhật lên phiên bản 3.2 trở lên, bạn cần khởi động trò chơi một lần để tạo tệp lưu trong đường dẫn đó.

- **Android**

  Nếu bạn đang sử dụng trình quản lý tệp hệ thống hoặc trình quản lý tệp của bên thứ ba, bạn có thể thử sử dụng trình quản lý tệp khác để truy cập.
  Nên sử dụng [MT Manager](https://mt2.cn/), và nhập đường dẫn sau vào thanh địa chỉ ở đầu ứng dụng để chuyển trực tiếp (nếu có nhiều người dùng, vui lòng thay đổi `0` thành ID người dùng hoặc thay đổi `/storage/emulated/0/` thành `/sdcard/`):
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  Bạn cũng có thể thêm dấu trang ở góc trên bên phải, vuốt lên dấu cộng ở phía dưới để truy cập nhanh.

Bạn cũng có thể thử không sử dụng trình duyệt tệp hệ thống, mà sử dụng ứng dụng `Tệp` của Android gốc.
Cách vào `Tệp` tham khảo:
Mở MT Manager
Nhấp vào `Trích xuất gói cài đặt` -- chọn `Ứng dụng hệ thống` -- tìm kiếm `Tệp` -- nhấp vào `Tệp`, chọn `Thêm` ở góc dưới bên trái -- khởi chạy ứng dụng.
Sau khi vào thư mục lưu Milthm, bạn có thể chọn `Sao chép vào` bộ nhớ trong (/storage/emulated/0/, thường là thư mục gốc của `Tệp`) rồi truy cập trong trình duyệt.
Nếu tệp lưu có vấn đề, bạn cũng có thể sửa chữa theo cách tương tự, chi tiết xem tại [Khôi phục tệp lưu](#khôi-phục-tệp-lưu).

Nếu vẫn không thể truy cập, bạn chỉ có thể kết nối với máy tính hoặc sử dụng quyền ADB để truy cập.
Trên các phiên bản Android cao hơn, vấn đề này có thể xảy ra. Nếu đã bật gỡ lỗi USB trong tùy chọn nhà phát triển và bật "Gỡ lỗi không dây", bạn có thể sử dụng [Shizuku](https://shizuku.rikka.app/zh-hans/download/) để gỡ lỗi ADB không dây mà không cần máy tính. Để biết thêm chi tiết, vui lòng tham khảo tài liệu liên quan của Shizuku.

- **IOS**

  Nếu bạn không tìm thấy thư mục của iPhone/iPad này trong ứng dụng `Tệp`, vui lòng vào trang chủ ứng dụng, kiểm tra trong cài đặt ở góc trên bên phải xem có ẩn tệp cục bộ hay không.
  Nếu vẫn không tìm thấy thư mục Milthm, hãy kiểm tra xem bạn có đang sử dụng đúng phiên bản Milthm hay không.
  [Video hướng dẫn iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)

#### Cách sao lưu tệp lưu

Vào thư mục lưu, sao chép toàn bộ thư mục data sang đường dẫn khác.

#### Khôi phục tệp lưu

Bạn có thể trực tiếp ghi đè tệp lưu đã sao lưu thủ công lên tệp lưu gốc.
Để tránh sự cố, chúng tôi sẽ nhúng tệp lưu dưới dạng văn bản vào hình ảnh khi tạo biểu đồ điểm (~~có thể mở hình ảnh bằng văn bản để xem trực tiếp~~).
~~Bạn có thể trực tiếp tải lên biểu đồ điểm để kiểm tra điểm.~~
Bạn có thể tải biểu đồ điểm lên [http://k9.lv/c/prefedit.html](http://k9.lv/c/prefedit.html), sau đó nhấp vào tải xuống để tạo tệp lưu (không bao gồm tiến trình cốt truyện, chỉ sao chép của tôi (mkzi-nya/归梦)), thay thế tệp lưu gốc.

## Nội dung khác

[Quay lại mục lục](#mục-lục)

### Milthm Wiki

{{wiki}}

### Nhóm giao lưu Milthm

{{群}}

### Đường dẫn tệp là gì

Đường dẫn tệp là một chuỗi biểu thị vị trí duy nhất của một tệp trong hệ thống tệp, thường được tổ chức theo cấu trúc cây thư mục. Các hệ điều hành khác nhau sử dụng các ký tự phân cách khác nhau, chẳng hạn như `/`, `\` hoặc `:`. Đường dẫn có thể là đường dẫn tuyệt đối hoặc tương đối, được sử dụng để biểu thị mối quan hệ giữa các thư mục và tệp, và cũng rất quan trọng khi xây dựng URL.

#### Đường dẫn tệp Android

- **Bộ nhớ ngoài:**
  Nằm trong `/storage/emulated/ID người dùng (người dùng chính mặc định là 0)/` hoặc `/sdcard/`, phần này của tệp có thể nhìn thấy được bởi người dùng.
- **Thư mục dữ liệu ứng dụng:**
  Thường nằm trong `/storage/emulated/0/Android/data/tên gói/`, ví dụ:
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/
  ```
  Thư mục lưu của Milthm nằm ở:
  ```
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
  Nếu hệ thống chặn truy cập, vui lòng thử kết nối với máy tính hoặc cấp quyền ADB cho trình quản lý tệp.

---

### Bảng đối chiếu Reality

{{reality表}}
