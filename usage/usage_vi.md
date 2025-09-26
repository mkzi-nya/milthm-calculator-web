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

- [k9.lv/c/](htt://k9.lv/c/)
- [mhtlim.top](https://mhtlim.top/)
- [mhtl.im](https://mhtl.im)
> 以上网站由_4everDimensions托管
- [mkzi-nya.github.io](https://mkzi-nya.github.io/milthm-calculator-web/)
- [milcalc.netlify.app](https://milcalc.netlify.app/)
> 以上网站由mkzi_nya托管

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
    [name,Difficulty, constant, score, acc, level,achievedStatus]
}
```

Trong đó:
- `acc` là số thập phân biểu thị độ chính xác;
- `level` biểu thị xếp hạng, được định nghĩa như sau:

```text
level: 0=R, 1=M, 2=S, 3=A, 4=B, 5=C, 6=F
achievedStatus: 0=clear, 3=?, 4=fc, 5=ap, 6=false
```

> 沿用了milthm3.8版本中的评级格式，但实际从3.9版本开始存档中就不是这种格式了

---

### Lưu trữ phiên bản cũ

Các bản lưu trước `Milthm 3.2` không thể trích xuất trực tiếp trên thiết bị di động, có thể thử các phương pháp sau:

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

| Perfect | perfect | Good | Bad | Miss |
|-|-|-|-|-|
| ±35ms | ±35-70ms | ±70-140ms | ±140-155ms | >155ms |

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

- [Description](#description)
- [Main Chapter](#introduction---weather-report)
  - [Weather Report](#introduction---weather-report)
  - [Rainfall Sounds](#prologue---rainfall-sounds)
  - [The Sides of Bitter and Sweet](#chapter1---the-sides-of-bitter-and-sweet)
- [Collaboration](#collaboration---rain-world)
  - [Rain World](#collaboration---rain-world)
  - [Notanote](#collaboration---notanote)
  - [Electrode Core](#collaboration---electrode-core)
- [Single](#single---dream-tape)
  - [Dream Tape](#single---dream-tape)
  - [Gathering Blossoms Under Rain](#single---gathering-blossoms-under-rain)

---

## Giải thích

> - Tất cả các bản nhạc `SP` và các bản nhạc không theo quy tắc đều không tham gia tính toán Reality.
> - Do vấn đề về độ chính xác, tất cả các bản nhạc có độ khó 11.9 trong phiên bản hiện tại đều có độ khó thực tế thấp hơn 11.9. Ví dụ, nếu Reality lý thuyết của một phiên bản là `13.005`, trong game sẽ hiển thị là `13.00` chứ không phải `13.01`, thực tế tính toán là `13.004999…`.

Reality lý thuyết của phiên bản hiện tại là `12.725` (hiển thị là 12.72)
20 bài hát có độ khó cao nhất trong phiên bản hiện tại như sau:

> Click the link to view the detailed information of the track/chart.
> The track/chart details are sourced from Milthm Lang's repository [RainSeek.Dataset.Milthm](https://github.com/MilthmLang/RainSeek.Dataset.Milthm/), with permission granted for use.

| Rank | Title                   | Difficulty | Constant |
|------|-------------------------|------------|----------|
| 1 | Contrasty Angeles | CL | 12.3 |
| 2 | 命日 | CL | 12.2 |
| 3 | 大月墜落狂想 | CB | 12.2 |
| 4 | Regnaissance | CL | 12.1 |
| 5 | Innocent white | CB | 12.1 |
| 6 | Broken Conviction | CL | 11.9 |
| 7 | Meltovt Necrosys | CB | 11.9 |
| 8 | Moonflutter | CL | 11.7 |
| 9 | Fly To Meteor (Milthm Edit) feat.兔柒 | CL | 11.7 |
| 10 | HYPER MEMORIES | CB | 11.7 |
| 11 | Brightened Demonios | CB | 11.7 |
| 12 | KASANE | CB | 11.6 |
| 13 | Broken Conviction | CB | 11.5 |
| 14 | Threat - Metropolis | CB | 11.5 |
| 15 | Contrasty Angeles | CB | 11.5 |
| 16 | slic.hertz #GdbG | CB | 11.4 |
| 17 | Moonflutter | CB | 11.4 |
| 18 | Algebra | CB | 11.4 |
| 19 | Myth compiler | CB | 11.4 |
| 20 | Fragment of Memories | CB | 11.3 |
| 20 | cafe in 6412I731V | CB | 11.3 |

---

## Introduction - Weather Report

| Title                | DZ   | SK   | CB   | CL   | SP |
|---------------------|------|------|------|------|---|
| [Welcome to Milthm](info:info("Welcome to Milthm"))  | [1.0](info:info("Welcome to Milthm", "Drizzle")) | -  | - | - | [SP](info:info("Welcome to Milthm", "Special")) |
| [时落之雨](info:info("时落之雨"))           | [1.0](info:info("时落之雨", "Drizzle"))  | [4.5](info:info("时落之雨", "Sprinkle"))  | [8.5](info:info("时落之雨", "Cloudburst"))  | -    | - |
| [夜風](info:info("夜風"))               | [3.0](info:info("夜風","Drizzle"))  | [7.3](info:info("夜風", "Sprinkle"))  | [10.1](info:info("夜風", "Cloudburst")) | -    | - |
| [花月](info:info("花月"))               | [2.0](info:info("花月", "Drizzle"))  | [8.2](info:info("花月", "Sprinkle"))  | [9.3](info:info("花月", "Cloudburst"))  | -    | - |
| [暮予星光](info:info("暮予星光"))           | [2.0](info:info("暮予星光", "Drizzle"))  | [7.5](info:info("暮予星光", "Sprinkle"))  | [9.1](info:info("暮予星光", "Cloudburst")) | -    | - |
| [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome"))           | [2.5](info:info("Fantasia Sonata Sky Syndrome", "Drizzle"))  | [7.1](info:info("Fantasia Sonata Sky Syndrome", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Sky Syndrome", "Cloudburst")) | -    | - |

---

## Prologue - Rainfall Sounds

| Title        | DZ   | SK   | CB   | CL   |
|--------------|------|------|------|------|
| [LOUDER!](info:info("LOUDER!"))  | [2.0](info:info("LOUDER!", "Drizzle"))  | [5.5](info:info("LOUDER!", "Sprinkle"))  | [9.5](info:info("LOUDER!", "Cloudburst")) | - |
| [雨女](info:info("雨女"))          | [3.0](info:info("雨女", "Drizzle")) | [6.5](info:info("雨女", "Sprinkle")) | [9.5](info:info("雨女", "Cloudburst")) | [10.5](info:info("雨女", "Clear")) |
| [雨之城](info:info("雨之城"))        | [1.0](info:info("雨之城", "Drizzle"))  | [4.0](info:info("雨之城", "Sprinkle"))  | [7.5](info:info("雨之城", "Cloudburst"))  | -    |
| [Jump out?](info:info("Jump out?"))     | [2.0](info:info("Jump out?", "Drizzle"))  | [7.9](info:info("Jump out?", "Sprinkle"))  | [9.7](info:info("Jump out?", "Cloudburst"))  | -    |
| [☹](info:info("☹"))      | [4.0](info:info("☹", "Drizzle"))  | [8.0](info:info("☹", "Sprinkle"))  | [10.1](info:info("☹", "Cloudburst")) | -    |
| [イコラト](info:info("イコラト"))      | [3.0](info:info("イコラト", "Drizzle"))  | [8.7](info:info("イコラト", "Sprinkle"))  | [11.2](info:info("イコラト", "Cloudburst")) | -    |
| [命日](info:info("命日"))          | [3.0](info:info("命日", "Drizzle"))  | [8.6](info:info("命日", "Sprinkle"))  | [11.1](info:info("命日", "Cloudburst")) | [12.2](info:info("命日", "Clear")) |

---

## Chapter1 - The Sides of Bitter and Sweet

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [粗线条的雨](info:info("粗线条的雨"))         | [1.0](info:info("粗线条的雨", "Drizzle"))  | [4.0](info:info("粗线条的雨", "Sprinkle"))  | [8.3](info:info("粗线条的雨", "Cloudburst"))  | -    |
| [Aconsma](info:info("Aconsma"))            | [1.0](info:info("Aconsma", "Drizzle"))  | [6.0](info:info("Aconsma", "Sprinkle"))  | [9.3](info:info("Aconsma", "Cloudburst"))  | -    |
| [OverRain](info:info("OverRain"))           | [2.0](info:info("OverRain", "Drizzle"))  | [7.6](info:info("OverRain", "Sprinkle"))  | [10.0](info:info("OverRain", "Cloudburst")) | -    |
| [Fragment of Memories](info:info("Fragment of Memories")) | [2.0](info:info("Fragment of Memories", "Drizzle"))  | [8.4](info:info("Fragment of Memories", "Sprinkle"))  | [11.3](info:info("Fragment of Memories", "Cloudburst")) | -    |
| [HYPER MEMORIES](info:info("HYPER MEMORIES"))     | [3.0](info:info("HYPER MEMORIES", "Drizzle"))  | [8.9](info:info("HYPER MEMORIES", "Sprinkle"))  | [11.7](info:info("HYPER MEMORIES", "Cloudburst")) | -    |
| [Regnaissance](info:info("Regnaissance"))       | [4.5](info:info("Regnaissance", "Drizzle"))  | [8.5](info:info("Regnaissance", "Sprinkle"))  | [11.1](info:info("Regnaissance", "Cloudburst")) | [12.1](info:info("Regnaissance", "Clear")) |
| [Contrasty Angeles](info:info("Contrasty Angeles"))  | [4.0](info:info("Contrasty Angeles", "Drizzle"))  | [9.0](info:info("Contrasty Angeles", "Sprinkle"))  | [11.5](info:info("Contrasty Angeles", "Cloudburst")) | [12.3](info:info("Contrasty Angeles", "Clear")) |
| [Brightened Demonios](info:info("Brightened Demonios"))  | [4.5](info:info("Brightened Demonios", "Drizzle"))  | [9.3](info:info("Brightened Demonios", "Sprinkle"))  | [11.7](info:info("Brightened Demonios", "Cloudburst")) | - |
| [Myth compiler](info:info("Myth compiler"))  | [3.0](info:info("Myth compiler", "Drizzle"))  | [7.0](info:info("Myth compiler", "Sprinkle"))  | [11.4](info:info("Myth compiler", "Cloudburst")) | - |
| [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia"))  | [2.0](info:info("Fantasia Sonata Arcadia", "Drizzle"))  | [6.0](info:info("Fantasia Sonata Arcadia", "Sprinkle"))  | [10.5](info:info("Fantasia Sonata Arcadia", "Cloudburst")) | - |

---

## 支线章节一 - 花裳随雨得春迟

| 标题                | DZ   | SK   | CB   | CL   |
|---------------------|------|------|------|------|
| [Vestige of Dreams](info:info("Vestige of Dreams"))          | [?](info:info("Vestige of Dreams", "Drizzle"))  | [?](info:info("Vestige of Dreams", "Sprinkle"))  | [?](info:info("Vestige of Dreams", "Cloudburst")) | - |
| [百九十](info:info("百九十"))          | [?](info:info("百九十", "Drizzle"))  | [?](info:info("百九十", "Sprinkle"))  | [?](info:info("百九十", "Cloudburst")) | - |
| [灯ノ桜蝶](info:info("灯ノ桜蝶"))          | [?](info:info("灯ノ桜蝶", "Drizzle"))  | [?](info:info("灯ノ桜蝶", "Sprinkle"))  | [?](info:info("灯ノ桜蝶", "Cloudburst")) | - |
| [Sakuyahime](info:info("Sakuyahime"))          | [?](info:info("Sakuyahime", "Drizzle"))  | [?](info:info("Sakuyahime", "Sprinkle"))  | [?](info:info("Sakuyahime", "Cloudburst")) | - |
| [靈](info:info("靈"))          | [?](info:info("靈", "Drizzle"))  | [?](info:info("靈", "Sprinkle"))  | [?](info:info("靈", "Cloudburst")) | - |
| [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks"))          | [?](info:info("BUCHiAGE Fireworks", "Drizzle"))  | [?](info:info("BUCHiAGE Fireworks", "Sprinkle"))  | [?](info:info("BUCHiAGE Fireworks", "Cloudburst")) | - |
| [ニニ feat. Qayo & mii](info:info("ニニ feat. Qayo & mii"))          | [?](info:info("ニニ feat. Qayo & mii", "Drizzle"))  | [?](info:info("ニニ feat. Qayo & mii", "Sprinkle"))  | [?](info:info("ニニ feat. Qayo & mii", "Cloudburst")) | - |


---

## Collaboration - Rain World

| Title                       | DZ   | SK   | CB   | CL   |
|-----------------------------|------|------|------|------|
| [Sundown](info:info("Sundown"))                | [1.0](info:info("Sundown", "Drizzle"))  | -    | -    | -    |
| [Bio-Engineering](info:info("Bio-Engineering"))        | [2.0](info:info("Bio-Engineering", "Drizzle"))  | [8.3](info:info("Bio-Engineering", "Sprinkle"))  | [9.6](info:info("Bio-Engineering", "Cloudburst"))  | -    |
| [Threat - Sky Islands](info:info("Threat - Sky Islands"))   | [2.0](info:info("Threat - Sky Islands", "Drizzle"))  | [6.9](info:info("Threat - Sky Islands", "Sprinkle"))  | [10.7](info:info("Threat - Sky Islands", "Cloudburst"))  | -    |
| [Threat - Superstructure](info:info("Threat - Superstructure")) | [2.0](info:info("Threat - Superstructure", "Drizzle"))  | [5.5](info:info("Threat - Superstructure", "Sprinkle"))  | [10.3](info:info("Threat - Superstructure", "Cloudburst")) | -    |
| [White Lizard](info:info("White Lizard"))           | -    | [4.0](info:info("White Lizard", "Sprinkle"))  | -    | -    |
| [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex")) | [2.0](info:info("Threat - Waterfront Complex", "Drizzle"))  | [7.6](info:info("Threat - Waterfront Complex", "Sprinkle"))  | [10.7](info:info("Threat - Waterfront Complex", "Cloudburst"))  | -    |
| [Kayava](info:info("Kayava"))                 | [3.0](info:info("Kayava", "Drizzle"))  | [5.5](info:info("Kayava", "Sprinkle"))  | [10.4](info:info("Kayava", "Cloudburst"))  | -    |
| [Threat - Metropolis](info:info("Threat - Metropolis"))    | [2.0](info:info("Threat - Metropolis", "Drizzle"))  | [6.6](info:info("Threat - Metropolis", "Sprinkle"))  | [11.5](info:info("Threat - Metropolis", "Cloudburst"))  | -    |
| [Sheer Ice Torrent](info:info("Sheer Ice Torrent"))      | [2.0](info:info("Sheer Ice Torrent", "Drizzle"))  | [7.8](info:info("Sheer Ice Torrent", "Sprinkle"))  | [11.1](info:info("Sheer Ice Torrent", "Cloudburst"))  | -    |
| [大月墜落狂想](info:info("大月墜落狂想")) | [2.0](info:info("大月墜落狂想", "Drizzle"))  | [8.0](info:info("大月墜落狂想", "Sprinkle"))  | [12.2](info:info("大月墜落狂想", "Cloudburst")) | -    |

---

## Collaboration - Notanote

| Title                | DZ   | SK   | CB   | CL   |
|----------------------|------|------|------|------|
| [烁雨](info:info("烁雨"))             | [2.0](info:info("烁雨", "Drizzle"))  | [7.0](info:info("烁雨", "Sprinkle"))  | [9.4](info:info("烁雨", "Cloudburst"))  | -    |
| [cybernetic blazar](info:info("cybernetic blazar")) | [4.0](info:info("cybernetic blazar", "Drizzle"))  | [7.8](info:info("cybernetic blazar", "Sprinkle"))  | [10.2](info:info("cybernetic blazar", "Cloudburst"))  | -    |
| [Innocent white](info:info("Innocent white"))    | [2.0](info:info("Innocent white", "Drizzle"))  | [8.2](info:info("Innocent white", "Sprinkle"))  | [12.1](info:info("Innocent white", "Cloudburst")) | -    |
| [Elsorhg](info:info("Elsorhg"))           | [2.0](info:info("Elsorhg", "Drizzle"))  | [7.5](info:info("Elsorhg", "Sprinkle"))  | [10.9](info:info("Elsorhg", "Cloudburst"))  | -    |
| [Meltovt Necrosys](info:info("Meltovt Necrosys"))  | [2.0](info:info("Meltovt Necrosys", "Drizzle"))  | [7.8](info:info("Meltovt Necrosys", "Sprinkle"))  | [11.9](info:info("Meltovt Necrosys", "Cloudburst"))  | -    |

---

## Collaboration= - Electrode Core

| 标题              | DZ   | SK   | CB   | CL   |
|-------------------|------|------|------|------|
| [はんてん](info:info("はんてん"))             | [2.0](info:info("はんてん", "Drizzle"))  | [6.1](info:info("はんてん", "Sprinkle"))  | [10.1](info:info("はんてん", "Cloudburst"))  | -    |
| [Curse of 14](info:info("Curse of 14"))           | [3.0](info:info("Curse of 14", "Drizzle"))  | [7.5](info:info("Curse of 14", "Sprinkle"))  | [10.4](info:info("Curse of 14", "Cloudburst"))  | -    |
| [Virtual S0da](info:info("Virtual S0da"))           | [3.0](info:info("Virtual S0da", "Drizzle"))  | [6.7](info:info("Virtual S0da", "Sprinkle"))  | [10.6](info:info("Virtual S0da", "Cloudburst"))  | -    |
| [apOapSis(Edit)](info:info("apOapSisEdit"))           | [3.5](info:info("apOapSisEdit", "Drizzle"))  | [6.4](info:info("apOapSisEdit", "Sprinkle"))  | [10.6](info:info("apOapSisEdit", "Cloudburst"))  | -    |

---

## Single - Dream Tape

| Title                          | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai"))    | [3.5](info:info("ネオン色のまち feat. Mai", "Drizzle"))  | [8.0](info:info("ネオン色のまち feat. Mai", "Sprinkle"))  | [9.7](info:info("ネオン色のまち feat. Mai", "Cloudburst"))  | -    | - |
| [INFP.mp3](info:info("INFP.mp3"))                    | [2.0](info:info("INFP.mp3", "Drizzle"))  | [5.5](info:info("INFP.mp3", "Sprinkle"))  | [9.2](info:info("INFP.mp3", "Cloudburst"))  | -    | - |
| [Oniichan](info:info("Oniichan"))                    | [3.0](info:info("Oniichan", "Drizzle"))  | [8.0](info:info("Oniichan", "Sprinkle"))  | [9.8](info:info("Oniichan", "Cloudburst"))  | -    | - |
| [Moving On](info:info("Moving On"))     | [2.0](info:info("Moving On", "Drizzle"))  | [6.3](info:info("Moving On", "Sprinkle"))  | [10.8](info:info("Moving On", "Cloudburst")) | -    |
| [Oiiaioooooiai](info:info("Oiiaioooooiai"))               | -    | -    | -    | - | [🐈](info:info("Oiiaioooooiai", "Special")) |
| [WATER](info:info("WATER"))                       | [3.0](info:info("WATER", "Drizzle"))  | [7.3](info:info("WATER", "Sprinkle"))  | [10.6](info:info("WATER", "Cloudburst")) | -    | - |
| [Hikari](info:info("Hikari"))                      | [3.0](info:info("Hikari", "Drizzle"))  | [7.4](info:info("Hikari", "Sprinkle"))  | [10.7](info:info("Hikari", "Cloudburst")) | -    | - |
| [Moonflutter](info:info("Moonflutter"))                 | [3.0](info:info("Moonflutter", "Drizzle"))  | [7.9](info:info("Moonflutter", "Sprinkle"))  | [11.4](info:info("Moonflutter", "Cloudburst")) | [11.7](info:info("Moonflutter", "Clear")) | - |
| [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit"))              | [3.0](info:info("Fly To Meteor Milthm Edit", "Drizzle"))  | [6.5](info:info("Fly To Meteor Milthm Edit", "Sprinkle"))  | [10.5](info:info("Fly To Meteor Milthm Edit", "Cloudburst")) | - | - |
| [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit"))              | - | - | - | [11.7](info:info("Fly To Meteor feat.兔柒 Milthm Edit", "Clear")) | - |
| [樱落繁花](info:info("樱落繁花"))                    | [3.0](info:info("樱落繁花", "Drizzle"))  | [8.8](info:info("樱落繁花", "Sprinkle"))  | [10.9](info:info("樱落繁花", "Cloudburst")) | -    | - |
| [Agnostic](info:info("Agnostic"))                    | [3.0](info:info("Agnostic", "Drizzle"))  | [7.4](info:info("Agnostic", "Sprinkle"))  | [10.0](info:info("Agnostic", "Cloudburst")) | -    | - |
| [Dogbite](info:info("Dogbite"))                     | [3.0](info:info("Dogbite", "Drizzle"))  | [7.6](info:info("Dogbite", "Sprinkle"))  | [10.3](info:info("Dogbite", "Cloudburst")) | - | [🐕](info:info("Dogbite", "Special")) |
| [Psyched Fevereiro](info:info("Psyched Fevereiro"))           | [3.5](info:info("Psyched Fevereiro", "Drizzle"))  | [7.3](info:info("Psyched Fevereiro", "Sprinkle"))  | [10.0](info:info("Psyched Fevereiro", "Cloudburst")) | -    | - |
| [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit"))  | [3.0](info:info("Future Unbound Game Edit","Drizzle"))  | [7.5](info:info("Future Unbound Game Edit","Sprinkle"))  | [10.5](info:info("Future Unbound Game Edit","Cloudburst")) | -    | - |
| [Algebra](info:info("Algebra"))                     | [2.0](info:info("Algebra", "Drizzle"))  | [8.1](info:info("Algebra", "Sprinkle"))  | [11.4](info:info("Algebra", "Cloudburst")) | - | [🔢](info:info("Algebra", "Special")) |
| [Words](info:info("Words"))                       | [2.0](info:info("Words", "Drizzle"))  | [6.5](info:info("Words", "Sprinkle"))  | [9.3](info:info("Words", "Cloudburst"))  | -    | - |
| [仮想明日](info:info("仮想明日"))                    | [3.5](info:info("仮想明日", "Drizzle"))  | [6.7](info:info("仮想明日", "Sprinkle"))  | [10.0](info:info("仮想明日", "Cloudburst"))  | -    | - |
| [白虎蓮華](info:info("白虎蓮華"))                    | [3.0](info:info("白虎蓮華", "Drizzle"))  | [6.5](info:info("白虎蓮華", "Sprinkle"))  | [9.6](info:info("白虎蓮華", "Cloudburst"))  | -    | - |
| [サイクルの欠片](info:info("サイクルの欠片"))              | [1.0](info:info("サイクルの欠片", "Drizzle"))  | [7.8](info:info("サイクルの欠片", "Sprinkle"))  | [8.6](info:info("サイクルの欠片", "Cloudburst"))  | -    | - |
| [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~"))          | [2.0](info:info("参宿四~Betelgeuse~", "Drizzle"))  | [6.4](info:info("参宿四~Betelgeuse~", "Sprinkle"))  | [11.2](info:info("参宿四~Betelgeuse~", "Cloudburst"))  | -    | - |
| [slic.hertz #GdbG](info:info("slic.hertz #GdbG"))            | [3.0](info:info("slic.hertz #GdbG", "Drizzle"))  | [7.6](info:info("slic.hertz #GdbG", "Sprinkle"))  | [11.4](info:info("slic.hertz #GdbG", "Cloudburst"))  | -    | - |
| [Rainbow Flavor!](info:info("Rainbow Flavor!"))             | [1.0](info:info("Rainbow Flavor!", "Drizzle"))  | [7.5](info:info("Rainbow Flavor!", "Sprinkle"))  | [9.9](info:info("Rainbow Flavor!", "Cloudburst")) | - | [🍬](info:info("Rainbow Flavor!", "Special")) |
| [IN](info:info("IN"))                           | [2.0](info:info("IN", "Drizzle"))  | [7.9](info:info("IN", "Sprinkle"))  | [11.2](info:info("IN", "Cloudburst")) | -    | - |
| [驟雨の狭間](info:info("驟雨の狭間"))                  | -    | -    | [Ø](info:info("驟雨の狭間", "Cloudburst"))    | - | - |
| [Broken Conviction](info:info("Broken Conviction"))           | [4.5](info:info("Broken Conviction", "Drizzle"))  | [4.5](info:info("Broken Conviction", "Sprinkle"))  | [11.5](info:info("Broken Conviction", "Cloudburst")) | [11.9](info:info("Broken Conviction", "Clear")) | - |
| [选择你的宽带](info:info("选择你的宽带")) | - | - | - | - | [🛜](info:info("选择你的宽带", "Special")) |

---

## Single - Gathering Blossoms Under Rain

| Title                        | DZ   | SK   | CB   | CL   | SP |
|---------------|------|------|------|------|--|
| [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER")) | [3.0](info:info("FULi AUTO SHOOTER", "Drizzle"))  | [7.2](info:info("FULi AUTO SHOOTER", "Sprinkle"))  | [10.7](info:info("FULi AUTO SHOOTER", "Cloudburst"))  | -    | - |
| [cafe in 6412I731V](info:info("cafe in 6412I731V"))                    | [2.0](info:info("cafe in 6412I731V", "Drizzle"))  | [7.1](info:info("cafe in 6412I731V", "Sprinkle"))  | [11.3](info:info("cafe in 6412I731V", "Cloudburst"))  | -    | - |
| [KASANE](info:info("KASANE")) | [3.0](info:info("KASANE", "Drizzle"))  | [7.8](info:info("KASANE", "Sprinkle"))  | [11.6](info:info("KASANE", "Cloudburst"))  | -    | - |
| [KAEDE](info:info("KAEDE")) | -  | -  | -  | - | [🍁](info:info("KAEDE", "Special")) |
| [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars"))           | [2.0](info:info("Fantasia Sonata Stars", "Drizzle"))  | [6.8](info:info("Fantasia Sonata Stars", "Sprinkle"))  | [10.4](info:info("Fantasia Sonata Stars", "Cloudburst")) | -    | - |
| [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance"))           | [3.0](info:info("Fantasia Sonata God Dance", "Drizzle"))  | [6.9](info:info("Fantasia Sonata God Dance", "Sprinkle"))  | [11.3](info:info("Fantasia Sonata God Dance", "Cloudburst")) | -    | - |
| [ホシフルヨルニ](info:info("ホシフルヨルニ"))           | [2.0](info:info("ホシフルヨルニ", "Drizzle"))  | [4.0](info:info("ホシフルヨルニ", "Sprinkle"))  | [9.4](info:info("ホシフルヨルニ", "Cloudburst")) | -    | - |
| [GlassyHeart.](info:info("GlassyHeart."))           | [3.0](info:info("GlassyHeart.", "Drizzle"))  | [7.7](info:info("GlassyHeart.", "Sprinkle"))  | [11.1](info:info("GlassyHeart.", "Cloudburst")) | -    | - |
| [Chartreuse Green](info:info("Chartreuse Green"))           | [2.0](info:info("Chartreuse Green", "Drizzle"))  | [7.7](info:info("Chartreuse Green", "Sprinkle"))  | [10.3](info:info("Chartreuse Green", "Cloudburst")) | -    | - |
| [Aleph-0](info:info("Aleph-0"))           | [2.0](info:info("Aleph-0", "Drizzle"))  | [5.5](info:info("Aleph-0", "Sprinkle"))  | [11.1](info:info("Aleph-0", "Cloudburst")) | -    | - |
| [Garden](info:info("Garden"))          | [-](info:info("Garden", "Drizzle"))  | [-](info:info("Garden", "Sprinkle"))  | [-](info:info("Garden", "Cloudburst")) | - |
| [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden"))          | [-](info:info("Fantasia Sonata Botanical Garden", "Drizzle"))  | [-](info:info("Fantasia Sonata Botanical Garden", "Sprinkle"))  | [-](info:info("Fantasia Sonata Botanical Garden", "Cloudburst")) | - |
| [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!"))          | [-](info:info("Dum! Dum!! Dum!!!", "Drizzle"))  | [-](info:info("Dum! Dum!! Dum!!!", "Sprinkle"))  | [-](info:info("Dum! Dum!! Dum!!!", "Cloudburst")) | - |
| [Splash the Beat!!](info:info("Splash the Beat!!"))          | [-](info:info("Splash the Beat!!", "Drizzle"))  | [-](info:info("Splash the Beat!!", "Sprinkle"))  | [-](info:info("Splash the Beat!!", "Cloudburst")) | - |

---

## Thống kê người làm chart

<div style="font-size:10px;">

| Charter | Drizzle | Sprinkle | Cloudburst | Clear | Special |
|-|-|-|-|-|-|
| Akko | [Aleph-0](info:info("Aleph-0","Drizzle")) , [Brightened Demonios](info:info("Brightened Demonios","Drizzle")) , [Broken Conviction](info:info("Broken Conviction","Drizzle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Drizzle")) , [Curse of 14](info:info("Curse of 14","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fragment of Memories](info:info("Fragment of Memories","Drizzle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Drizzle")) , [IN](info:info("IN","Drizzle")) , [Kayava](info:info("Kayava","Drizzle")) , [Oniichan](info:info("Oniichan","Drizzle")) , [OverRain](info:info("OverRain","Drizzle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Drizzle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Drizzle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Drizzle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Drizzle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) , [はんてん](info:info("はんてん","Drizzle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Drizzle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Drizzle")) | [Aconsma](info:info("Aconsma","Sprinkle")) , [Aleph-0](info:info("Aleph-0","Sprinkle")) , [apOapSis(Edit)](info:info("apOapSisEdit","Sprinkle")) , [Broken Conviction](info:info("Broken Conviction","Sprinkle")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fragment of Memories](info:info("Fragment of Memories","Sprinkle")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Sprinkle")) , [Oniichan](info:info("Oniichan","Sprinkle")) , [OverRain](info:info("OverRain","Sprinkle")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Sprinkle")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [Vestige of Dreams](info:info("Vestige of Dreams","Sprinkle")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Sprinkle")) , [仮想明日](info:info("仮想明日","Sprinkle")) , [烁雨](info:info("烁雨","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [はんてん](info:info("はんてん","Sprinkle")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Sprinkle")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Sprinkle")) | [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Algebra](info:info("Algebra","Cloudburst")) , [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [BUCHiAGE Fireworks](info:info("BUCHiAGE Fireworks","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [FULi AUTO SHOOTER](info:info("FULi AUTO SHOOTER","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Kayava](info:info("Kayava","Cloudburst")) , [LOUDER!](info:info("LOUDER!","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) , [Psyched Fevereiro](info:info("Psyched Fevereiro","Cloudburst")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Cloudburst")) , [Regnaissance](info:info("Regnaissance","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [Words](info:info("Words","Cloudburst")) , [百九十](info:info("百九十","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [暮予星光](info:info("暮予星光","Cloudburst")) , [ニニ (feat. Qayo & mii)](info:info("ニニ feat. Qayo & mii","Cloudburst")) , [ホシフルヨルニ](info:info("ホシフルヨルニ","Cloudburst")) | [Regnaissance](info:info("Regnaissance","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Rainbow Flavor!](info:info("Rainbow Flavor!","Special")) |
| Ariayaka | [apOapSis(Edit)](info:info("apOapSisEdit","Drizzle")) , [Myth compiler](info:info("Myth compiler","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [樱落繁花](info:info("樱落繁花","Drizzle")) | [Myth compiler](info:info("Myth compiler","Sprinkle")) | [GlassyHeart.](info:info("GlassyHeart.","Cloudburst")) , [Innocent white](info:info("Innocent white","Cloudburst")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Cloudburst")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Cloudburst")) , [Vestige of Dreams](info:info("Vestige of Dreams","Cloudburst")) , [大月墜落狂想](info:info("大月墜落狂想","Cloudburst")) , [烁雨](info:info("烁雨","Cloudburst")) , [樱落繁花](info:info("樱落繁花","Cloudburst")) |  |  |
| Buger404 | [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| Eric_Lian | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [烁雨](info:info("烁雨","Drizzle")) | [HYPER MEMORIES](info:info("HYPER MEMORIES","Sprinkle")) , [Regnaissance](info:info("Regnaissance","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Cloudburst")) |  |  |
| GUGU |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| Kiyotsuki | [Aconsma](info:info("Aconsma","Drizzle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Drizzle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Drizzle")) , [Elsorhg](info:info("Elsorhg","Drizzle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Drizzle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Drizzle")) , [Fantasia Sonata Reflection](info:info("Fantasia Sonata Reflection","Drizzle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Drizzle")) , [LOUDER!](info:info("LOUDER!","Drizzle")) , [Moonflutter](info:info("Moonflutter","Drizzle")) , [Sakuyahime](info:info("Sakuyahime","Drizzle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) , [WATER](info:info("WATER","Drizzle")) , [白虎蓮華](info:info("白虎蓮華","Drizzle")) , [大月墜落狂想](info:info("大月墜落狂想","Drizzle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Drizzle")) , [イコラト](info:info("イコラト","Drizzle")) | [Bio-Engineering](info:info("Bio-Engineering","Sprinkle")) , [Brightened Demonios](info:info("Brightened Demonios","Sprinkle")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Sprinkle")) , [Contrasty Angeles](info:info("Contrasty Angeles","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Sprinkle")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Sprinkle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Sprinkle")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Sprinkle")) , [Jump out?](info:info("Jump out?","Sprinkle")) , [LOUDER!](info:info("LOUDER!","Sprinkle")) , [Sakuyahime](info:info("Sakuyahime","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [White Lizard](info:info("White Lizard","Sprinkle")) , [白虎蓮華](info:info("白虎蓮華","Sprinkle")) , [大月墜落狂想](info:info("大月墜落狂想","Sprinkle")) , [灯ノ桜蝶](info:info("灯ノ桜蝶","Sprinkle")) , [花月](info:info("花月","Sprinkle")) , [暮予星光](info:info("暮予星光","Sprinkle")) , [时落之雨](info:info("时落之雨","Sprinkle")) , [夜風](info:info("夜風","Sprinkle")) , [樱落繁花](info:info("樱落繁花","Sprinkle")) | [Aconsma](info:info("Aconsma","Cloudburst")) , [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) , [cafe in 6412I731V](info:info("cafe in 6412I731V","Cloudburst")) , [Contrasty Angeles](info:info("Contrasty Angeles","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata Arcadia](info:info("Fantasia Sonata Arcadia","Cloudburst")) , [Fantasia Sonata Botanical Garden](info:info("Fantasia Sonata Botanical Garden","Cloudburst")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Cloudburst")) , [Oniichan](info:info("Oniichan","Cloudburst")) , [Sakuyahime](info:info("Sakuyahime","Cloudburst")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Cloudburst")) , [Threat - Metropolis](info:info("Threat - Metropolis","Cloudburst")) , [Threat - Superstructure](info:info("Threat - Superstructure","Cloudburst")) , [白虎蓮華](info:info("白虎蓮華","Cloudburst")) , [参宿四\~Betelgeuse\~](info:info("参宿四~Betelgeuse~","Cloudburst")) , [花月](info:info("花月","Cloudburst")) , [命日](info:info("命日","Cloudburst")) , [时落之雨](info:info("时落之雨","Cloudburst")) , [夜風](info:info("夜風","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) | [Broken Conviction](info:info("Broken Conviction","Clear")) |  |
| Magazet | [Agnostic](info:info("Agnostic","Drizzle")) , [Algebra](info:info("Algebra","Drizzle")) , [Dogbite](info:info("Dogbite","Drizzle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Drizzle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Drizzle")) , [Garden](info:info("Garden","Drizzle")) , [Hikari](info:info("Hikari","Drizzle")) , [INFP.mp3](info:info("INFP.mp3","Drizzle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Drizzle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Drizzle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Drizzle")) , [Virtual S0da](info:info("Virtual S0da","Drizzle")) , [粗线条的雨](info:info("粗线条的雨","Drizzle")) , [サイクルの欠片](info:info("サイクルの欠片","Drizzle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Drizzle")) | [Agnostic](info:info("Agnostic","Sprinkle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Sprinkle")) , [Elsorhg](info:info("Elsorhg","Sprinkle")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Sprinkle")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Sprinkle")) , [Garden](info:info("Garden","Sprinkle")) , [Hikari](info:info("Hikari","Sprinkle")) , [INFP.mp3](info:info("INFP.mp3","Sprinkle")) , [Innocent white](info:info("Innocent white","Sprinkle")) , [Moonflutter](info:info("Moonflutter","Sprinkle")) , [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Sprinkle")) , [Splash the Beat!!](info:info("Splash the Beat!!","Sprinkle")) , [Virtual S0da](info:info("Virtual S0da","Sprinkle")) , [粗线条的雨](info:info("粗线条的雨","Sprinkle")) , [命日](info:info("命日","Sprinkle")) , [サイクルの欠片](info:info("サイクルの欠片","Sprinkle")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Sprinkle")) | [Agnostic](info:info("Agnostic","Cloudburst")) , [Aleph-0](info:info("Aleph-0","Cloudburst")) , [Elsorhg](info:info("Elsorhg","Cloudburst")) , [Fantasia Sonata God Dance](info:info("Fantasia Sonata God Dance","Cloudburst")) , [Fantasia Sonata Stars](info:info("Fantasia Sonata Stars","Cloudburst")) , [Garden](info:info("Garden","Cloudburst")) , [INFP.mp3](info:info("INFP.mp3","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) , [粗线条的雨](info:info("粗线条的雨","Cloudburst")) , [仮想明日](info:info("仮想明日","Cloudburst")) , [雨女](info:info("雨女","Cloudburst")) , [サイクルの欠片](info:info("サイクルの欠片","Cloudburst")) , [ネオン色のまち feat. Mai](info:info("ネオン色のまち feat. Mai","Cloudburst")) |  | [选择你的宽带](info:info("选择你的宽带","Special")) |
| Milthm Team | [cybernetic blazar](info:info("cybernetic blazar","Drizzle")) , [Dum! Dum!! Dum!!!](info:info("Dum! Dum!! Dum!!!","Drizzle")) , [Fantasia Sonata Sky Syndrome](info:info("Fantasia Sonata Sky Syndrome","Drizzle")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Drizzle")) , [花月](info:info("花月","Drizzle")) , [暮予星光](info:info("暮予星光","Drizzle")) , [时落之雨](info:info("时落之雨","Drizzle")) , [夜風](info:info("夜風","Drizzle")) | [Algebra](info:info("Algebra","Sprinkle")) , [slic.hertz #GdbG](info:info("slic.hertz #GdbG","Sprinkle")) | [驟雨の狭間](info:info("驟雨の狭間","Cloudburst")) |  | [Algebra](info:info("Algebra","Special")) , [KAEDE](info:info("KAEDE","Special")) |
| Murty | [Regnaissance](info:info("Regnaissance","Drizzle")) |  |  |  |  |
| SakiA | [☹](info:info("☹","Drizzle")) |  |  |  |  |
| TCSTWTBHY | [Dogbite](info:info("Dogbite","Drizzle")) , [GlassyHeart.](info:info("GlassyHeart.","Drizzle")) , [Innocent white](info:info("Innocent white","Drizzle")) , [Jump out?](info:info("Jump out?","Drizzle")) , [Welcome to Milthm](info:info("Welcome to Milthm","Drizzle")) , [Words](info:info("Words","Drizzle")) , [☹](info:info("☹","Drizzle")) | [Dogbite](info:info("Dogbite","Sprinkle")) , [GlassyHeart.](info:info("GlassyHeart.","Sprinkle")) , [Threat - Sky Islands](info:info("Threat - Sky Islands","Sprinkle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")) , [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Sprinkle")) , [Words](info:info("Words","Sprinkle")) , [☹](info:info("☹","Sprinkle")) , [イコラト](info:info("イコラト","Sprinkle")) | [Jump out?](info:info("Jump out?","Cloudburst")) , [Moving On](info:info("Moving On","Cloudburst")) , [Splash the Beat!!](info:info("Splash the Beat!!","Cloudburst")) | [命日](info:info("命日","Clear")) |  |
| Ursulina | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Drizzle")) |  | [Threat - Waterfront Complex](info:info("Threat - Waterfront Complex","Cloudburst")) , [Virtual S0da](info:info("Virtual S0da","Cloudburst")) |  |  |
| vitamin b |  |  | [IN](info:info("IN","Cloudburst")) , [KASANE](info:info("KASANE","Cloudburst")) |  |  |
| WH_C |  |  | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| xzadudu179 | [Bio-Engineering](info:info("Bio-Engineering","Drizzle")) , [Sundown](info:info("Sundown","Drizzle")) | [WATER](info:info("WATER","Sprinkle")) | [apOapSis(Edit)](info:info("apOapSisEdit","Cloudburst")) , [Future Unbound (Game Edit)](info:info("Future Unbound Game Edit","Cloudburst")) , [Hikari](info:info("Hikari","Cloudburst")) , [HYPER MEMORIES](info:info("HYPER MEMORIES","Cloudburst")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Cloudburst")) , [Moonflutter](info:info("Moonflutter","Cloudburst")) , [WATER](info:info("WATER","Cloudburst")) |  |  |
| 阿鱼 | [Moving On](info:info("Moving On","Drizzle")) , [雨之城](info:info("雨之城","Drizzle")) | [雨之城](info:info("雨之城","Sprinkle")) | [雨之城](info:info("雨之城","Cloudburst")) |  |  |
| 点缀星空 |  |  | [Curse of 14](info:info("Curse of 14","Cloudburst")) , [Myth compiler](info:info("Myth compiler","Cloudburst")) |  |  |
| 姜片 | [Sheer Ice Torrent](info:info("Sheer Ice Torrent","Drizzle")) |  |  |  |  |
| 泪莫提 |  | [Moving On](info:info("Moving On","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [Broken Conviction](info:info("Broken Conviction","Cloudburst")) , [cybernetic blazar](info:info("cybernetic blazar","Cloudburst")) |  |  |
| 喵卡 |  |  | [イコラト](info:info("イコラト","Cloudburst")) |  |  |
| 母鸡 | [KASANE](info:info("KASANE","Drizzle")) | [KASANE](info:info("KASANE","Sprinkle")) | [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) |  |  |
| 你申某 | [雨女](info:info("雨女","Drizzle")) |  |  |  |  |
| 爬爬 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) , [Regnaissance](info:info("Regnaissance","Drizzle")) , [仮想明日](info:info("仮想明日","Drizzle")) , [靈](info:info("靈","Drizzle")) | [Chartreuse Green](info:info("Chartreuse Green","Sprinkle")) , [Curse of 14](info:info("Curse of 14","Sprinkle")) , [Threat - Metropolis](info:info("Threat - Metropolis","Sprinkle")) , [靈](info:info("靈","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [Dogbite](info:info("Dogbite","Cloudburst")) , [靈](info:info("靈","Cloudburst")) , [雨之城](info:info("雨之城","Cloudburst")) , [☹](info:info("☹","Cloudburst")) , [はんてん](info:info("はんてん","Cloudburst")) | [Contrasty Angeles](info:info("Contrasty Angeles","Clear")) , [Moonflutter](info:info("Moonflutter","Clear")) , [雨女](info:info("雨女","Clear")) | [Dogbite](info:info("Dogbite","Special")) , [Oiiaioooooiai](info:info("Oiiaioooooiai","Special")) , [Welcome to Milthm](info:info("Welcome to Milthm","Special")) |
| 树穴猪 | [Chartreuse Green](info:info("Chartreuse Green","Drizzle")) | [IN](info:info("IN","Sprinkle")) , [Meltovt Necrosys](info:info("Meltovt Necrosys","Sprinkle")) | [Brightened Demonios](info:info("Brightened Demonios","Cloudburst")) |  |  |
| 王子 |  | [IN](info:info("IN","Sprinkle")) |  |  |  |
| 舞仙翼 |  |  | [Innocent white](info:info("Innocent white","Cloudburst")) |  |  |
| 嘤箱 | [命日](info:info("命日","Drizzle")) |  |  |  |  |
| 余火 | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Drizzle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Sprinkle")) | [Fly To Meteor (Milthm Edit)](info:info("Fly To Meteor Milthm Edit","Cloudburst")) | [Fly To Meteor feat.兔柒 (Milthm Edit)](info:info("Fly To Meteor feat.兔柒 Milthm Edit","Clear")) |  |
| 雨眠 | [百九十](info:info("百九十","Drizzle")) | [百九十](info:info("百九十","Sprinkle")) | [Bio-Engineering](info:info("Bio-Engineering","Cloudburst")) , [OverRain](info:info("OverRain","Cloudburst")) |  |  |
| 云梦 |  | [cybernetic blazar](info:info("cybernetic blazar","Sprinkle")) , [Kayava](info:info("Kayava","Sprinkle")) , [Threat - Superstructure](info:info("Threat - Superstructure","Sprinkle")) , [雨女](info:info("雨女","Sprinkle")) | [Chartreuse Green](info:info("Chartreuse Green","Cloudburst")) , [Fragment of Memories](info:info("Fragment of Memories","Cloudburst")) , [Moonflutter](info:info("Moonflutter","Cloudburst")) , [☹](info:info("☹","Cloudburst")) , [イコラト](info:info("イコラト","Cloudburst")) |  |  |

</div>

---

## Nhấp để tăng tốc quá trình phát triển Milthm

Nhấp vào liên kết để tăng tốc quá trình phát triển Milthm
1, https://github.com/sponsors/morizerodev/
2, https://afdian.com/a/morizero

---

## Liên hệ chúng tôi

- **[QQ Milthm#-1 洨巟羣](https://qm.qq.com/q/Utb6sNDvki)**：375882310

- **[QQ Milthm#Φ 交流群](https://qm.qq.com/q/fIErsKKz3a)**：678471942

- **Discord**: [mkzi_nya](https://discordapp.com/users/1135097559891853435)

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

- **[Fandom](https://milthm.fandom.com/wiki/Game_Mechanics)**

- **[萌娘百科](https://mzh.moegirl.org.cn/Milthm)**

- **[Wikiwiki](https://wikiwiki.jp/milthm/)**

### Nhóm giao lưu Milthm

记录于25.8.20 10:30  
  
| 群 | 群号 | 人数 |
|-|-|-|
| Milthm#1 交流群 | 372255828 | 1498 |
| Milthm#3 交流群 | 910085472 | 1994 |
| Milthm#5 官方交流群 | 480062123 | 88 |
| Milthm#6 公开测试 | 915230984 | 283 |
| Milthm#7 交流群 | 774927051 | 259 |
| Milthm#8 交流群 | 887231011 | 1957 |
| Milthm#9 开发交流群 | 1047814125 | 23 |
| Milthm#10 交流群 | 454822146 | 356 |
| Milthm#11 交流群 | 1042806409 | 81 |
| Milthm#12 交流群 | 1048470253 | 31 |
| Milthm#14 开发测试 | 1050419460 | 9 |
| Mhtlim#√-1 洨巟羣 | 375882310 | 157 |
| milthm#二创群——暮雨回廊 | 771250001 | 147 |
| 梦见霖音高级中学 高一一部114514班 | 574275806 | 13 |
| Milthm#Φ 交流群 | 678471942 | 40 |
| milthm#神金 交流群 | 877854042 | 67 |
| Milthm及各种🐉🖊交流群 | 981366419 | 54 |

`1`,`3`,`8`群已不对外开放  
`5`,`6`,`9`,`14`群为开发专用  
存在`Milthm#2 交流群da☆ze（梦见霖音高级中学 高一一部2班）`为解散后重建  
`√-1群`,`二创群`为交流群性质  
另有`Rain Editor 公测群`,`MCEMの小群`为玩家制作的制谱器发布群

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
