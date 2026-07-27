# 2. Phân tích yêu cầu

Tài liệu này liệt kê yêu cầu chức năng (FR), phi chức năng (NFR) và user stories. Mỗi yêu cầu ghi rõ trạng thái: **[P]** = đã có trong prototype, **[Đề xuất]** = bổ sung khi lên sản phẩm thật.

## 2.1. Yêu cầu chức năng (Functional Requirements)

### FR-1. Đặt đơn — Wizard 3 bước

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-1.1 | Chọn **quốc gia gửi** và **quốc gia nhận** từ danh sách hỗ trợ | [P] |
| FR-1.2 | **Hoán đổi (swap)** chiều gửi ↔ nhận, đảo cả quốc gia và thông tin người gửi/nhận | [P] |
| FR-1.3 | Nhập **địa chỉ pickup** có gợi ý theo quốc gia; cho phép "dùng đúng chuỗi đã gõ" | [P] |
| FR-1.4 | Nhập **địa chỉ delivery** tương tự | [P] |
| FR-1.5 | Nhập **mã bưu chính / ZIP** (tùy chọn) cho mỗi bên | [P] |
| FR-1.6 | Nhập **tên + số điện thoại** người gửi và người nhận, có **mã vùng quốc gia** (+62, +81, +84, +63, +82, +65, +44, +1…) | [P] |
| FR-1.7 | Ghi chú lấy hàng (mã cổng, tầng, giờ tiện lấy) — web | [P] |
| FR-1.8 | **Màn hình chọn địa chỉ** riêng (mobile): tab Recent / Suggested / Saved, quét địa chỉ bằng camera, chọn trên bản đồ | [P] (UI) |
| FR-1.9 | Bước 2 — **thông tin kiện hàng**: ảnh (nhiều, image/*), mô tả nội dung, cân ước tính (kg), cờ **Fragile** / **Battery** | [P] |
| FR-1.10 | **Nhiều kiện hàng** trong một đơn (web: thêm/xóa item, ảnh & cân & cờ theo từng item) | [P] (web) |
| FR-1.11 | Bước 3 — **xem lại**: dải tuyến (from→to, ETA), tóm tắt địa chỉ/liên hệ, danh sách item, tổng cân, đơn giá/kg, tổng tiền | [P] |
| FR-1.12 | **Điều kiện chuyển bước** (gating): B1 cần đủ địa chỉ + tên + SĐT hai bên; B2 cần mọi item có tên | [P] |
| FR-1.13 | Thanh **tiến trình 3 bước** (stepper/meter) | [P] |

### FR-2. Báo giá (Quote / Pricing)

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-2.1 | Tính **giá ước tính theo cân nặng** realtime khi khách nhập cân | [P] |
| FR-2.2 | Công thức: `phí cơ bản + đơn giá/kg × cân + phụ phí Fragile + phụ phí Battery` | [P] |
| FR-2.3 | Hiển thị **breakdown từng dòng** ở bước Review | [P] |
| FR-2.4 | Dùng **chargeable weight** = cân thực tế nếu có, không thì cân ước tính | [P] |
| FR-2.5 | Ghi rõ "giá cuối chốt sau khi cân tại pickup" | [P] |
| FR-2.6 | Hỗ trợ **đa tiền tệ** (USD/JPY/IDR có bảng tỷ giá ở web) | [P một phần] — cần bộ chọn tiền tệ & nguồn tỷ giá thật ([Đề xuất]) |

### FR-3. Xác nhận đơn

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-3.1 | Tạo đơn, sinh **mã tracking 12 số** | [P] |
| FR-3.2 | Màn hình **"Booking received!"** + mã copy được + hướng dẫn "điều gì tiếp theo" | [P] |
| FR-3.3 | CTA **Open chat** / **Track shipment** | [P] |
| FR-3.4 | Đơn mới được ghim lên đầu danh sách, ở stage "Pickup scheduled" (mobile) / "Awaiting confirmation" (web) | [P] |

### FR-4. Danh sách đơn (My shipments)

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-4.1 | Liệt kê đơn với tuyến, ngày, trạng thái màu | [P] |
| FR-4.2 | Mở đơn → sang màn hình tracking | [P] |

### FR-5. Theo dõi đơn (Tracking)

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-5.1 | Dải tuyến với **tiến trình vận chuyển** (máy bay chạy theo chặng) | [P] |
| FR-5.2 | **Timeline milestone** với trạng thái đã/đang/chưa | [P] |
| FR-5.3 | Hiển thị **cân thực tế vs ước tính** theo từng item, tính lại giá | [P] |
| FR-5.4 | FAB chat từ màn tracking | [P] |

### FR-6. Chat hỗ trợ

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-6.1 | Khung chat với persona hỗ trợ, trạng thái "Online · replies in minutes" | [P] |
| FR-6.2 | **Quick-reply chips** gợi ý câu hỏi | [P] |
| FR-6.3 | Typing indicator + auto-reply (canned responses) | [P] |
| FR-6.4 | **Đính kèm** ảnh/tài liệu (image, pdf, doc, xls, zip) — web | [P] (web) |
| FR-6.5 | **Thẻ đơn** hiển thị trong chat | [P] |
| FR-6.6 | **Badge chưa đọc** ở tab/nav | [P] |
| FR-6.7 | Tin nhắn hệ thống (vd "Booking … submitted") | [P] |

### FR-7. Điều hướng & giao diện

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| FR-7.1 | Mobile: **bottom tab bar** 3 tab (New booking / My shipments / Chat) | [P] |
| FR-7.2 | Web: **top nav** (New booking / My shipments / Chat), logo về trang chủ | [P] |
| FR-7.3 | **Light/Dark theme** toggle, lưu localStorage | [P] |
| FR-7.4 | Chuyển đổi **Mobile ↔ Website** (shell demo) | [P] |

### FR-8. Nhóm chức năng đề xuất bổ sung ([Đề xuất])

| Mã | Yêu cầu |
|---|---|
| FR-8.1 | **Đăng ký / đăng nhập** (OTP SĐT / email / social) và hồ sơ khách |
| FR-8.2 | **Sổ địa chỉ** lưu & quản lý (tab "Saved" hiện chỉ là UI) |
| FR-8.3 | **Thanh toán online** (thẻ/ví/chuyển khoản) + hóa đơn |
| FR-8.4 | **Đa ngôn ngữ** VI / 日本語 / EN (khớp design system) |
| FR-8.5 | **Chọn phương thức vận chuyển / hạng dịch vụ** (air/sea/express) với ETA & giá khác nhau |
| FR-8.6 | **Push notification** thật cho cập nhật trạng thái đơn & tin chat |
| FR-8.7 | **Ops portal** nội bộ: xác nhận đơn, cập nhật stage, cân thực tế, chat |

## 2.2. Yêu cầu phi chức năng (Non-Functional Requirements)

| Mã | Nhóm | Yêu cầu |
|---|---|---|
| NFR-1 | **Hiệu năng** | Booking wizard mượt trên mobile 3G; thao tác chuyển bước < 200ms; ảnh upload nén phía client |
| NFR-2 | **Responsive** | Hoạt động tốt cả mobile & desktop (đã có 2 layout riêng); không tràn ngang |
| NFR-3 | **Khả dụng (a11y)** | Đủ tương phản, focus ring rõ (design system dùng gold halo), điều hướng bàn phím, label input |
| NFR-4 | **Đa ngôn ngữ** | Kiến trúc tách chuỗi để thêm VI/JP/EN (hiện chưa; là nợ kỹ thuật) |
| NFR-5 | **Đa tiền tệ / quốc tế hóa** | Định dạng số/tiền theo locale; nguồn tỷ giá tin cậy; mã vùng SĐT & ZIP theo quốc gia |
| NFR-6 | **Bảo mật & riêng tư** | Bảo vệ PII (địa chỉ, SĐT, ảnh hàng); HTTPS; kiểm soát truy cập khi có auth; tuân thủ quy định dữ liệu xuyên biên giới |
| NFR-7 | **Độ tin cậy** | Trạng thái đơn nhất quán; không mất đơn khi mạng chập chờn (retry/idempotency) |
| NFR-8 | **Khả năng bảo trì** | Dùng chung **design tokens** (`colors_and_type.css`), tách UI/logic/dữ liệu; hiện prototype là single-file cần tách module |
| NFR-9 | **Khả năng mở rộng** | Thêm quốc gia/tuyến/hạng dịch vụ mà không phá kiến trúc pricing |
| NFR-10 | **Thương hiệu** | Bám design system TIXIMAX (gold-on-navy), không emoji trong UI sản phẩm, icon Lucide |
| NFR-11 | **Khả năng theo dõi (observability)** | Log sự kiện đặt đơn, lỗi upload, funnel wizard để đo chỉ số §1.6 |

## 2.3. User Stories tiêu biểu

- **US-1** — *Là khách*, tôi muốn nhập địa chỉ lấy & giao ở hai quốc gia và nhận **giá ước tính ngay**, để biết trước chi phí trước khi cam kết.
- **US-2** — *Là khách*, tôi muốn **gợi ý địa chỉ** theo quốc gia và chọn nhanh, để không phải gõ chính xác địa chỉ nước ngoài.
- **US-3** — *Là khách*, tôi muốn **chụp/đính ảnh kiện hàng** và đánh dấu dễ vỡ/pin, để TIXIMAX xử lý đúng.
- **US-4** — *Là khách*, sau khi đặt tôi muốn **mã tracking** và **timeline** để biết đơn đang ở đâu.
- **US-5** — *Là khách*, tôi muốn **chat hỏi hỗ trợ** ngay trong app và gửi ảnh, để giải quyết thắc mắc nhanh.
- **US-6** — *Là chủ shop*, tôi muốn xem **danh sách tất cả đơn** và trạng thái từng đơn ở một chỗ.
- **US-7** *(Đề xuất)* — *Là khách*, tôi muốn **đăng nhập** và **lưu địa chỉ** để lần sau đặt nhanh hơn.
- **US-8** *(Đề xuất)* — *Là khách*, tôi muốn **thanh toán online** và nhận hóa đơn.
- **US-9** *(Đề xuất)* — *Là nhân viên ops*, tôi muốn **xác nhận đơn, nhập cân thực tế và cập nhật trạng thái** để khách thấy tiến trình.

## 2.4. Đề xuất phạm vi MVP

Ưu tiên cho bản chạy thật đầu tiên (dựa trên prototype + tối thiểu cần thiết để vận hành):

**MVP (bắt buộc):** FR-1, FR-2, FR-3, FR-4, FR-5, FR-6 (bản cơ bản), FR-7 + **FR-8.1 (auth)**, **FR-8.7 (ops portal tối thiểu để cập nhật trạng thái)**, NFR-1/2/3/6/7.

**Sau MVP:** FR-8.2 (sổ địa chỉ), FR-8.3 (thanh toán), FR-8.4 (đa ngôn ngữ), FR-8.5 (hạng dịch vụ), FR-8.6 (push).

Lý do: nếu không có auth + ops tối thiểu, đơn không thể được xác nhận/cập nhật trạng thái thật — tracking sẽ chỉ là mô phỏng như prototype.
