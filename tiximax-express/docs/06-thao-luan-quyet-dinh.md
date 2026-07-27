# 6. Thảo luận, quyết định & câu hỏi mở

Ghi lại các quyết định kiến trúc (ADR rút gọn), đánh đổi, câu hỏi mở và lộ trình. Đây là nơi để cả nhóm trao đổi trước khi code.

## 6.1. Quyết định kiến trúc (ADR rút gọn)

### ADR-1. Tách UI / logic / dữ liệu, chuyển sang kiến trúc service theo domain
- **Bối cảnh:** prototype là single-file HTML/JS, state toàn cục, sample cứng.
- **Quyết định:** đưa sang client React + backend chia service (Booking/Pricing/Tracking/Chat…), API-first.
- **Đánh đổi:** tốn công dựng hạ tầng ban đầu; đổi lại có dữ liệu bền vững, đồng bộ đa thiết bị, dễ bảo trì/mở rộng.

### ADR-2. Pricing do server làm chủ
- **Bối cảnh:** prototype tính giá client, hằng số khác nhau mobile (JPY) vs web (USD).
- **Quyết định:** đưa công thức + cấu hình phí lên **Pricing service**, cấu hình theo tuyến/tiền tệ; client chỉ hiển thị.
- **Đánh đổi:** thêm một round-trip; đổi lại nhất quán, chống gian lận, dễ đổi bảng giá.

### ADR-3. Realtime bằng WebSocket cho chat & tracking
- **Quyết định:** WebSocket/SSE cho tin chat, typing, badge, đổi stage; fallback polling.
- **Đánh đổi:** phức tạp hạ tầng hơn REST thuần; đổi lại trải nghiệm realtime đúng kỳ vọng.

### ADR-4. Mobile bằng PWA trước, React Native sau
- **Bối cảnh:** prototype mobile vốn là web trong khung iPhone.
- **Quyết định:** ưu tiên PWA (tái dùng web, ra mắt nhanh), cân nhắc RN khi cần native (camera, push mạnh).
- **Đánh đổi:** PWA hạn chế một số native API; đủ cho MVP.

### ADR-5. Design system dùng chung làm nguồn chân lý UI
- **Quyết định:** mọi app import `colors_and_type.css`, tái dùng component; giữ gold-on-navy, icon Lucide, không emoji.
- **Đánh đổi:** ràng buộc thiết kế; đổi lại nhất quán thương hiệu qua mobile/web/ops.

## 6.2. Đánh đổi đang cân nhắc

| Chủ đề | Phương án A | Phương án B | Nghiêng về |
|---|---|---|---|
| API | REST + OpenAPI | GraphQL | REST cho MVP (đơn giản), xét GraphQL nếu client cần linh hoạt |
| Mobile | PWA | React Native ngay | PWA trước (ADR-4) |
| Auth | OTP số điện thoại | Email + social | OTP SĐT hợp thị trường VN/logistics; bổ sung sau |
| Thanh toán | Tích hợp sớm | Sau MVP, chốt giá qua chat như hiện tại | Sau MVP — đúng nghiệp vụ hiện có |

## 6.3. Câu hỏi mở (cần chủ dự án quyết)

1. **Máy trạng thái đơn:** mobile có 6 milestone, web có 7 stage (thêm *Customs clearance*, *Out for delivery*). → **Cần thống nhất một máy trạng thái chuẩn** cho cả hệ thống. Chọn theo bản 7 stage của web?
2. **Đa ngôn ngữ:** UI hiện hardcode tiếng Anh, dữ liệu mẫu có JP/ID/VI. Sản phẩm thật hỗ trợ những ngôn ngữ nào và ngôn ngữ mặc định? (Design system đã có VI / 日本語 / EN.)
3. **Đa tiền tệ:** hiển thị giá theo tiền tệ nào — theo quốc gia gửi, quốc gia nhận, hay lựa chọn của khách? Nguồn tỷ giá?
4. **Phạm vi tuyến/quốc gia** chính thức khi ra mắt (prototype có ID/JP/VN/PH/KR/SG). Tuyến trọng tâm?
5. **Hạng dịch vụ / phương thức vận chuyển:** hiện chỉ "air, 5–7 ngày". Có mở air/sea/express với giá & ETA khác nhau không (FR-8.5)?
6. **Thanh toán:** mô hình thu tiền — trả trước, trả sau khi cân, COD? Cổng thanh toán nào?
7. **Auth:** bắt buộc đăng nhập trước khi đặt, hay cho đặt "guest" rồi liên kết tài khoản sau?
8. **Ops portal:** đội vận hành cần công cụ tối thiểu gì để đơn có vòng đời thật (xác nhận, nhập cân, đổi stage, chat)?
9. **Sổ địa chỉ:** tab "Saved" hiện chỉ là UI — mức ưu tiên biến nó thành tính năng thật?
10. **Dữ liệu địa chỉ:** dùng nhà cung cấp Geocoding/Places nào cho gợi ý & "pick on map" đa quốc gia?

## 6.4. Rủi ro & giả định

| Rủi ro / Giả định | Ảnh hưởng | Giảm thiểu |
|---|---|---|
| Tracking/chat trong prototype là **mô phỏng** | Khách kỳ vọng realtime thật | Cần backend + ops tối thiểu ngay trong MVP |
| Giá chỉ ước tính, chốt qua chat | Có thể gây tranh cãi giá cuối | Minh bạch quy tắc cân; lưu bằng chứng cân; khách xác nhận trước ship |
| PII xuyên biên giới (địa chỉ, SĐT, ảnh) | Rủi ro pháp lý/bảo mật | HTTPS, mã hóa lưu trữ, kiểm soát truy cập, tuân thủ quy định |
| Hằng số giá khác nhau giữa 2 app | Sai lệch báo giá | Gom về Pricing service (ADR-2) |
| Chưa có auth | Không gắn đơn với khách, không đồng bộ | Bổ sung auth trong MVP |
| Phụ thuộc Geocoding/FX bên thứ ba | Chi phí & giới hạn API | Cache, chọn nhà cung cấp có vùng phủ VN/JP/ID |

## 6.5. Lộ trình đề xuất (theo giai đoạn)

- **GĐ 0 — Chuẩn bị:** trích component + tokens từ prototype thành thư viện UI; chốt máy trạng thái & mô hình dữ liệu (§4); định nghĩa API (OpenAPI).
- **GĐ 1 — Lõi giá trị (MVP):** Booking/Order + Pricing service + web app; Auth tối thiểu; Ops portal tối thiểu (xác nhận, nhập cân, đổi stage).
- **GĐ 2 — Realtime:** Tracking + Chat qua WebSocket; Media/Upload; Notification.
- **GĐ 3 — Mở rộng:** PWA mobile hoàn chỉnh; i18n (VI/JP/EN); đa tiền tệ; sổ địa chỉ.
- **GĐ 4 — Thương mại hóa:** thanh toán online + hóa đơn; hạng dịch vụ (air/sea/express); tối ưu funnel theo chỉ số §1.6.

## 6.6. Việc cần làm tiếp cho tài liệu

- Bổ sung sơ đồ ERD chi tiết & đặc tả API (OpenAPI) sau khi chốt câu hỏi mở §6.3.
- Thêm wireframe/annotation liên kết từng màn hình prototype ↔ yêu cầu FR.
- Thống nhất và tài liệu hóa **một** máy trạng thái đơn dùng chung.
