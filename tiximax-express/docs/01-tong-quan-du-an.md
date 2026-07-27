# 1. Tổng quan dự án

## 1.1. Định nghĩa dự án

**TIXIMAX Express** là ứng dụng đặt dịch vụ **vận chuyển quốc tế door-to-door** cho khách hàng cá nhân và doanh nghiệp nhỏ. Khách tự tạo đơn online bằng cách nhập:

- **Địa chỉ lấy hàng (pickup)** ở một quốc gia — kèm người gửi, số điện thoại.
- **Địa chỉ giao hàng (delivery)** ở một quốc gia khác — kèm người nhận, số điện thoại.
- **Thông tin kiện hàng** — ảnh, mô tả, cân nặng ước tính, xử lý đặc biệt (dễ vỡ, chứa pin).

Hệ thống báo **giá ước tính theo cân nặng**, tạo đơn, cấp **mã tracking**, và cho khách **theo dõi hành trình** cùng **chat trực tiếp với hỗ trợ** đến khi giao xong. Giá cuối được TIXIMAX xác nhận qua chat sau khi cân thực tế tại điểm lấy hàng.

Dự án thuộc hệ sinh thái **TIXIMAX Logistics** (công ty logistics xuyên biên giới & mua hộ của Việt Nam). "Express" là nhánh đặt vận chuyển nhanh, tách biệt với nghiệp vụ mua hộ ("mua hộ") của công ty mẹ.

## 1.2. Bài toán & giá trị

Khách gửi hàng quốc tế hiện phải: gọi điện/nhắn tin hỏi giá, không biết quy trình, lo lắng về tiền và thời gian, khó theo dõi đơn. TIXIMAX Express giải quyết bằng:

| Nỗi đau của khách | Cách sản phẩm giải quyết |
|---|---|
| Không biết giá trước | Báo giá ước tính ngay theo cân nặng + phụ phí, minh bạch từng dòng |
| Nhập địa chỉ nước ngoài khó, dễ sai | Gợi ý địa chỉ theo quốc gia, quét địa chỉ, chọn trên bản đồ, lưu địa chỉ |
| Không rõ đơn đang ở đâu | Timeline milestone + tracking realtime từ lấy hàng → giao |
| Lo lắng, cần hỏi gấp | Chat hỗ trợ trong app, quick-reply, gửi ảnh/tài liệu |
| Sợ trả sai tiền | "Cân chính xác sau khi lấy hàng", giá cuối chốt qua chat trước khi ship |

**Tuyên bố giá trị:** *"Mua sắm / gửi hàng toàn cầu — TIXIMAX lo phần còn lại."*

## 1.3. Tầm nhìn sản phẩm

Đưa việc đặt vận chuyển quốc tế trở nên **đơn giản như đặt xe công nghệ**: 3 bước, báo giá tức thì, theo dõi realtime, hỗ trợ trong tầm tay — với sự an tâm về giá và thời gian.

## 1.4. Đối tượng người dùng

| Nhóm | Mô tả | Nhu cầu chính |
|---|---|---|
| **Khách cá nhân** | Người mua/gửi hàng xuyên biên giới (VN ↔ JP/ID/KR/PH/SG…) | Đặt nhanh, biết giá, theo dõi, hỏi hỗ trợ |
| **Chủ shop / SME** | Nhập/gửi hàng thường xuyên | Tạo nhiều đơn, quản lý danh sách đơn, lưu địa chỉ |
| **Nhân viên hỗ trợ TIXIMAX** *(hệ thống nội bộ — ngoài phạm vi prototype)* | Xác nhận đơn, cập nhật trạng thái, chat | Ops portal (đề xuất, xem §3) |

Persona hỗ trợ trong prototype: **"Rina from TIXIMAX Express"** — trả lời trong vài phút.

## 1.5. Phạm vi (Scope)

### Trong phạm vi (theo prototype)
- Đặt đơn 3 bước: tuyến & địa chỉ → kiện hàng → xem lại & xác nhận.
- Chọn quốc gia gửi/nhận + hoán đổi chiều (swap).
- Nhập địa chỉ có gợi ý theo quốc gia, mã bưu chính (tùy chọn), người gửi/nhận + SĐT (mã vùng).
- Nhiều kiện hàng (web) / một kiện (mobile): ảnh, mô tả, cân ước tính, cờ Fragile / Battery.
- Báo giá ước tính theo cân nặng + phụ phí.
- Xác nhận đơn + cấp mã tracking 12 số.
- Danh sách đơn ("My shipments") + trạng thái.
- Tracking: timeline milestone + tiến trình vận chuyển + cân thực tế vs ước tính.
- Chat hỗ trợ: quick-reply, đính kèm ảnh/tài liệu (web), thẻ đơn trong chat, badge chưa đọc.
- Light/Dark theme.

### Ngoài phạm vi giai đoạn này (đề xuất bổ sung — xem §6)
- **Đăng nhập / tài khoản / hồ sơ** — prototype chưa có auth.
- **Thanh toán online** — chưa có; giá là ước tính, chốt qua chat.
- **Đa ngôn ngữ (i18n)** — UI hiện hardcode tiếng Anh, chưa có bộ chuyển ngữ.
- **Chọn phương thức vận chuyển / hạng dịch vụ** (air/sea/express) — hiện mặc định "air", "5–7 ngày".
- **Ops portal nội bộ** cho nhân viên xử lý đơn.
- **Push notification thật** (hiện chỉ có dot chưa đọc in-app).

## 1.6. Chỉ số thành công (đề xuất)

- Tỷ lệ hoàn tất đặt đơn (booking completion rate) từ bước 1 → xác nhận.
- Thời gian trung bình tạo một đơn.
- Tỷ lệ đơn được xác nhận qua chat / tổng đơn.
- CSAT chat hỗ trợ; thời gian phản hồi đầu tiên.
- Tỷ lệ khách quay lại tạo đơn thứ 2+.

## 1.7. Thuật ngữ (Glossary)

| Thuật ngữ | Ý nghĩa |
|---|---|
| **Shipment / Order** | Đơn vận chuyển do khách tạo |
| **Tracking code** | Mã theo dõi 12 số, hiển thị nhóm 4-4-4 (vd `TXM-306482124815`) |
| **Pickup (sender)** | Điểm & người lấy hàng |
| **Delivery (recipient)** | Điểm & người nhận |
| **Leg / Milestone** | Chặng/cột mốc trong hành trình đơn |
| **Stage** | Số thứ tự trạng thái đơn (0–6/7), ánh xạ sang nhãn trạng thái |
| **Chargeable weight** | Cân tính phí = cân thực tế nếu có, không thì cân ước tính |
| **Fragile / Battery** | Cờ xử lý đặc biệt, phát sinh phụ phí |
| **Estimate** | Giá ước tính; giá cuối chốt sau khi cân tại pickup |
