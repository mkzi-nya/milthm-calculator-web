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
  - [Về Ytilaer trong biểu đồ điểm](#về-ytilaer-trong-biểu-đồ-điểm)
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

_by [mkzi-nya](https://mkzi-nya.github.io)_  
_Last updated on 2025.09.20 23:00 (UTC)_  
_简体中文以外的语言可能无法及时更新_

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

- **Android (TapTap)**
  ```text
  /storage/emulated/0/Android/data/game.taptap.morizero.milthm/files/data/
  ```
- **Android (Google Play)**
  ```text
  /storage/emulated/0/Android/data/com.morizero.milthm/files/data/
  ```
- **iOS**

Sử dụng ứng dụng [Tệp](https://support.apple.com//102570) để mở thư mục Milthm:

```text
/data/
```

> Nếu không tìm thấy tệp cục bộ: Vào trang chủ "Tệp", nhấp vào menu ba chấm ở góc trên bên phải và bỏ ẩn tệp cục bộ ([chi tiết](https://www.tenorshare.com/iphone-fix/on-my-iphone-missing-in-files-app.html)).

- **Người dùng Windows:**
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

[Video hướng dẫn Android](https://mkzi-nya.github.io/milthm-calculator-web/files/android.mp4)
[Video hướng dẫn iOS](https://mkzi-nya.github.io/milthm-calculator-web/files/ios.mp4)
Người dùng Android [không có quyền truy cập](#không-có-quyền-truy-cập)

---

### Nhập dữ liệu đã phân tích

Nhập dữ liệu vào ô nhập liệu trên trang chủ, định dạng như sau:

```text
[name],{
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5],
    [Contrasty Angeles,CL,12.3,1010000,1.0000,0,[0,3,4,5,v3],
    [name,Difficulty, constant, score, acc, level,achievedStatus,isv3?]
}
```

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

## Biểu đồ radar

Phương pháp tính toán liên quan được cung cấp bởi `PanyiAme`, chi tiết xem tại [Giải thích bảng điểm Milthm](https://wwp.lanzoup.com/iZ59A2j8nbpe).

---

## Về Milthm

[Quay lại mục lục](#mục-lục)

### Công thức tính Reality

Reality được tính toán dựa trên điểm chơi và độ khó của bản nhạc:

$$
rlt = \sum_{i=1}^{20} \frac{single.rlt(i)}{20}
$$

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

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")),<br>[Brightened Demonios](info:info("Brightened Demonios","Drizzle")),<br>[Broken Conviction](info:info("Broken Conviction","Drizzle")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")),<br>[Curse of 14](info:info("Curse of 14","Drizzle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")),<br>[Fluorescent Light](info:info("Fluorescent Light","Drizzle")),<br>[Fragment of Memories](info:info("Fragment of Memories","Drizzle")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")),<br>[IN](info:info("IN","Drizzle")),<br>[Kayava](info:info("Kayava","Drizzle")),<br>[Oniichan](info:info("Oniichan","Drizzle")),<br>[OverRain](info:info("OverRain","Drizzle")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")),<br>[仮想明日](info:info("仮想明日","Drizzle")),<br>[烁雨](info:info("烁雨","Drizzle")),<br>[はんてん](info:info("はんてん","Drizzle")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")),<br>[Aleph-0](info:info("Aleph-0","Sprinkle")),<br>[apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")),<br>[Broken Conviction](info:info("Broken Conviction","Sprinkle")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")),<br>[Curse of 14](info:info("Curse of 14","Sprinkle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")),<br>[Fluorescent Light](info:info("Fluorescent Light","Sprinkle")),<br>[Fragment of Memories](info:info("Fragment of Memories","Sprinkle")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")),<br>[Oniichan](info:info("Oniichan","Sprinkle")),<br>[OverRain](info:info("OverRain","Sprinkle")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")),<br>[仮想明日](info:info("仮想明日","Sprinkle")),<br>[烁雨](info:info("烁雨","Sprinkle")),<br>[☹](info:info("☹","Sprinkle")),<br>[はんてん](info:info("はんてん","Sprinkle")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")),<br>[Algebra](info:info("Algebra","Cloudburst")),<br>[apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")),<br>[Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[Broken Conviction](info:info("Broken Conviction","Cloudburst")),<br>[BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")),<br>[cybernetic blazar](info:info("cybernetic blazar","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")),<br>[Fluorescent Light](info:info("Fluorescent Light","Cloudburst")),<br>[FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")),<br>[Kayava](info:info("Kayava","Cloudburst")),<br>[LOUDER!](info:info("LOUDER!","Cloudburst")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")),<br>[OverRain](info:info("OverRain","Cloudburst")),<br>[Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")),<br>[Regnaissance](info:info("Regnaissance","Cloudburst")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[Words](info:info("Words","Cloudburst")),<br>[百九十](info:info("百九十","Cloudburst")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")),<br>[仮想明日](info:info("仮想明日","Cloudburst")),<br>[靈](info:info("靈","Cloudburst")),<br>[暮予星光](info:info("暮予星光","Cloudburst")),<br>[ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")),<br>[ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")),<br>[Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")),<br>[Myth compiler](info:info("Myth compiler","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")),<br>[樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")),<br>[Innocent white](info:info("Innocent white","Cloudburst")),<br>[Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")),<br>[Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")),<br>[大月墜落狂想](info:info("大月墜落狂想","Cloudburst")),<br>[烁雨](info:info("烁雨","Cloudburst")),<br>[樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")),<br>[烁雨](info:info("烁雨","Drizzle")) | [HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")),<br>[Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Icier | [Autumn Rain](info:info("Autumn Rain","Drizzle")) | [Autumn Rain](info:info("Autumn Rain","Sprinkle")) |  |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")),<br>[Elsorhg](info:info("Elsorhg","Drizzle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")),<br>[Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")),<br>[LOUDER!](info:info("LOUDER!","Drizzle")),<br>[Moonflutter](info:info("Moonflutter","Drizzle")),<br>[Sakuyahime](info:info("Sakuyahime","Drizzle")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")),<br>[WATER](info:info("WATER","Drizzle")),<br>[白虎蓮華](info:info("白虎蓮華","Drizzle")),<br>[大月墜落狂想](info:info("大月墜落狂想","Drizzle")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")),<br>[イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")),<br>[Brightened Demonios](info:info("Brightened Demonios","Sprinkle")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")),<br>[Elsorhg](info:info("Elsorhg","Sprinkle")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")),<br>[Jump out?](info:info("Jump out?","Sprinkle")),<br>[LOUDER!](info:info("LOUDER!","Sprinkle")),<br>[Sakuyahime](info:info("Sakuyahime","Sprinkle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")),<br>[White Lizard](info:info("White Lizard","Sprinkle")),<br>[白虎蓮華](info:info("白虎蓮華","Sprinkle")),<br>[大月墜落狂想](info:info("大月墜落狂想","Sprinkle")),<br>[灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")),<br>[花月](info:info("花月","Sprinkle")),<br>[暮予星光](info:info("暮予星光","Sprinkle")),<br>[时落之雨](info:info("时落之雨","Sprinkle")),<br>[夜風](info:info("夜風","Sprinkle")),<br>[樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")),<br>[Brightened Demonios](info:info("Brightened Demonios","Cloudburst")),<br>[cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")),<br>[Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")),<br>[Elsorhg](info:info("Elsorhg","Cloudburst")),<br>[Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")),<br>[Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")),<br>[Oniichan](info:info("Oniichan","Cloudburst")),<br>[Sakuyahime](info:info("Sakuyahime","Cloudburst")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")),<br>[白虎蓮華](info:info("白虎蓮華","Cloudburst")),<br>[参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")),<br>[花月](info:info("花月","Cloudburst")),<br>[命日](info:info("命日","Cloudburst")),<br>[时落之雨](info:info("时落之雨","Cloudburst")),<br>[夜風](info:info("夜風","Cloudburst")),<br>[イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")),<br>[Algebra](info:info("Algebra","Drizzle")),<br>[Deluge](info:info("Deluge","Drizzle")),<br>[Dogbite](info:info("Dogbite","Drizzle")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")),<br>[Garden](info:info("Garden","Drizzle")),<br>[Hikari](info:info("Hikari","Drizzle")),<br>[INFP.mp3](info:info("INFP.mp3","Drizzle")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")),<br>[Pthahnil](info:info("Pthahnil","Drizzle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")),<br>[Virtual S0da](info:info("Virtual S0da","Drizzle")),<br>[粗线条的雨](info:info("粗线条的雨","Drizzle")),<br>[サイクルの欠片](info:info("サイクルの欠片","Drizzle")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")),<br>[Deluge](info:info("Deluge","Sprinkle")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")),<br>[Elsorhg](info:info("Elsorhg","Sprinkle")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")),<br>[Garden](info:info("Garden","Sprinkle")),<br>[Hikari](info:info("Hikari","Sprinkle")),<br>[INFP.mp3](info:info("INFP.mp3","Sprinkle")),<br>[Innocent white](info:info("Innocent white","Sprinkle")),<br>[Moonflutter](info:info("Moonflutter","Sprinkle")),<br>[Pthahnil](info:info("Pthahnil","Sprinkle")),<br>[Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")),<br>[Virtual S0da](info:info("Virtual S0da","Sprinkle")),<br>[粗线条的雨](info:info("粗线条的雨","Sprinkle")),<br>[命日](info:info("命日","Sprinkle")),<br>[サイクルの欠片](info:info("サイクルの欠片","Sprinkle")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")),<br>[Aleph-0](info:info("Aleph-0","Cloudburst")),<br>[Deluge](info:info("Deluge","Cloudburst")),<br>[Elsorhg](info:info("Elsorhg","Cloudburst")),<br>[Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")),<br>[Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")),<br>[Garden](info:info("Garden","Cloudburst")),<br>[INFP.mp3](info:info("INFP.mp3","Cloudburst")),<br>[Pthahnil](info:info("Pthahnil","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")),<br>[粗线条的雨](info:info("粗线条的雨","Cloudburst")),<br>[仮想明日](info:info("仮想明日","Cloudburst")),<br>[雨女](info:info("雨女","Cloudburst")),<br>[サイクルの欠片](info:info("サイクルの欠片","Cloudburst")),<br>[ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
| Milthm Team | [cybernetic blazar](info:info("cybernetic blazar","Drizzle")),<br>[Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Drizzle")),<br>[Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Drizzle")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Drizzle")),<br>[花月](info:info("花月","Drizzle")),<br>[暮予星光](info:info("暮予星光","Drizzle")),<br>[时落之雨](info:info("时落之雨","Drizzle")),<br>[夜風](info:info("夜風","Drizzle")) | [Algebra](info:info("Algebra","Sprinkle")),<br>[slic.hertz #GdbG](info:info("slic.hertz #GdbG","Sprinkle")) | [驟雨の狭間](info:info("驟雨の狭間","Cloudburst")) |  | [Algebra](info:info("Algebra","Special")),<br>[KAEDE](info:info("KAEDE","Special")) |
| Murty | [Regnaissance](info:info("Regnaissance","Drizzle")) |  |  |  |  |
| SakiA | [☹](info:info("☹","Drizzle")) |  |  |  |  |
| TCSTWTBHY | [Dogbite](info:info("Dogbite","Drizzle")),<br>[GlassyHeart.](info:info("GlassyHeart.","Drizzle")),<br>[Innocent white](info:info("Innocent white","Drizzle")),<br>[Jump out?](info:info("Jump out?","Drizzle")),<br>[Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")),<br>[Words](info:info("Words","Drizzle")),<br>[☹](info:info("☹","Drizzle")) | [Dogbite](info:info("Dogbite","Sprinkle")),<br>[GlassyHeart.](info:info("GlassyHeart.","Sprinkle")),<br>[Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")),<br>[Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Sprinkle")),<br>[Words](info:info("Words","Sprinkle")),<br>[☹](info:info("☹","Sprinkle")),<br>[イコラト](info:info("イコラト","Sprinkle")) | [Jump out?](info:info("Jump out?","Cloudburst")),<br>[Moving On](info:info("Moving On","Cloudburst")),<br>[Splash the Beat!!](info:info("Splash the Beat!!","Cloudburst")) | [命日](info:info("命日","Clear")) |  |
| Ursulina | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Drizzle")) |  | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Cloudburst")),<br>[Virtual S0da](info:info("Virtual S0da","Cloudburst")) |  |  |
| vitamin b |  |  | [IN](info:info("IN","Cloudburst")),<br>[KASANE](info:info("KASANE","Cloudburst")) |  |  |
| WH_C |  |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| xzadudu179 | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")),<br>[Sundown](info:info("Sundown","Drizzle")) | [WATER](info:info("WATER","Sprinkle")) | [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")),<br>[Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Cloudburst")),<br>[Hikari](info:info("Hikari","Cloudburst")),<br>[HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")),<br>[Moonflutter](info:info("Moonflutter","Cloudburst")),<br>[WATER](info:info("WATER","Cloudburst")) |  |  |
| 阿鱼 | [Moving On](info:info("Moving On","Drizzle")),<br>[雨之城](info:info("雨之城","Drizzle")) | [雨之城](info:info("雨之城","Sprinkle")) | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| 点缀星空 |  |  | [Curse of 14](info:info("Curse of 14","Cloudburst")),<br>[Myth compiler](info:info("Myth compiler","Cloudburst")) |  |  |
| 姜片 | [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Drizzle")) |  |  |  |  |
| 泪莫提 |  | [Moving On](info:info("Moving On","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[Broken Conviction](info:info("Broken Conviction","Cloudburst")),<br>[cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) |  |  |
| 喵卡 |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| 母鸡 | [KASANE](info:info("KASANE","Drizzle")) | [KASANE](info:info("KASANE","Sprinkle")) | [Autumn Rain](info:info("Autumn Rain","Cloudburst")),<br>[Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) |  |  |
| 你申某 | [雨女](info:info("雨女","Drizzle")) |  |  |  |  |
| 爬爬 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")),<br>[Regnaissance](info:info("Regnaissance","Drizzle")),<br>[仮想明日](info:info("仮想明日","Drizzle")),<br>[靈](info:info("靈","Drizzle")) | [Chartreuse Green](info:info("Chartreuse Green","Sprinkle")),<br>[Curse of 14](info:info("Curse of 14","Sprinkle")),<br>[Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")),<br>[靈](info:info("靈","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[Dogbite](info:info("Dogbite","Cloudburst")),<br>[靈](info:info("靈","Cloudburst")),<br>[雨之城](info:info("雨之城","Cloudburst")),<br>[☹](info:info("☹","Cloudburst")),<br>[はんてん](info:info("はんてん","Cloudburst")) | [Contrasty Angeles](info:info("Contrasty Angeles","Clear")),<br>[Moonflutter](info:info("Moonflutter","Clear")),<br>[雨女](info:info("雨女","Clear")) | [Dogbite](info:info("Dogbite","Special")),<br>[Oiiaioooooiai](info:info("Oiiaioooooiai","Special")),<br>[Welcome to Milthm](info:info("Welcome to Milthm","Special")) |
| 树穴猪 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) | [IN](info:info("IN","Sprinkle")),<br>[Meltovt Necrosys](info:info("Meltovt Necrosys","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) |  |  |
| 王子 |  | [IN](info:info("IN","Sprinkle")) |  |  |  |
| 舞仙翼 |  |  | [Innocent white](info:info("Innocent white","Cloudburst")) |  |  |
| 嘤箱 | [命日](info:info("命日","Drizzle")) |  |  |  |  |
| 余火 | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Drizzle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Sprinkle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Cloudburst")) | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit","Clear")) |  |
| 雨眠 | [百九十](info:info("百九十","Drizzle")) | [百九十](info:info("百九十","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")),<br>[OverRain](info:info("OverRain","Cloudburst")) |  |  |
| 云梦 |  | [cybernetic blazar](info:info("cybernetic blazar","Sprinkle")),<br>[Kayava](info:info("Kayava","Sprinkle")),<br>[Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")),<br>[雨女](info:info("雨女","Sprinkle")) | [Chartreuse Green](info:info("Chartreuse Green","Cloudburst")),<br>[Fragment of Memories](info:info("Fragment of Memories","Cloudburst")),<br>[Moonflutter](info:info("Moonflutter","Cloudburst")),<br>[☹](info:info("☹","Cloudburst")),<br>[イコラト](info:info("イコラト","Cloudburst")) |  |  |

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

- **[官方wiki](https://milthm.com/wiki/hans/manual/features)**

- **[官方wiki\(English\)](https://milthm.com/wiki/en/manual/features)**

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

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
