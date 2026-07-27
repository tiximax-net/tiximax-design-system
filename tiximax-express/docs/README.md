# TIXIMAX Express — Tài liệu dự án

> Bộ tài liệu định nghĩa, phân tích và thiết kế cho **TIXIMAX Express** — dịch vụ đặt vận chuyển quốc tế door-to-door: khách nhập địa chỉ lấy hàng ở một quốc gia và địa chỉ giao ở quốc gia khác, TIXIMAX lo phần còn lại (gom, cân, vận chuyển, thông quan, giao tận nhà).

## Trạng thái hiện tại

**Prototype UI** (HTML tĩnh, JS thuần) trong [`../UI-TXM-Express/`](../UI-TXM-Express/):

- `express-booking-prototype.html` — app mobile (8 màn hình iOS-style, state machine JS thuần).
- `express-web-prototype.html` — website desktop (4 view render bằng JS).
- `express-prototype.html` — shell gộp cả hai, có toggle Mobile ↔ Website + light/dark.

**Đã khởi tạo khung code** (2026-07-27) — chi tiết & lệnh chạy ở [§7](07-khoi-tao-project.md):

- [`../apps/express-web/`](../apps/express-web/) — web app khách hàng (Vite + React + TS + Zustand). Có app shell, routing, theme, kiểu dữ liệu §4, API client stub. **Chưa có business logic.**
- [`../services/`](../services/) — skeleton backend chia service theo domain (§3.5), gateway health-server chạy được.

Tài liệu này **mô tả sản phẩm cần xây**, lấy prototype làm nguồn tham chiếu chức năng, đồng thời đề xuất kiến trúc để đưa từ prototype → sản phẩm chạy thật.

## Mục lục

| # | Tài liệu | Nội dung |
|---|----------|----------|
| 1 | [Tổng quan dự án](01-tong-quan-du-an.md) | Định nghĩa, tầm nhìn, phạm vi, đối tượng, glossary |
| 2 | [Phân tích yêu cầu](02-phan-tich-yeu-cau.md) | Yêu cầu chức năng, phi chức năng, user stories, phạm vi MVP |
| 3 | [Kiến trúc hệ thống](03-kien-truc-he-thong.md) | Đề xuất kiến trúc, tech stack, module, tích hợp |
| 4 | [Mô hình dữ liệu](04-mo-hinh-du-lieu.md) | Entities, quan hệ, trạng thái đơn, enums |
| 5 | [Luồng nghiệp vụ](05-luong-nghiep-vu.md) | Booking, tracking, chat, pricing, vòng đời đơn |
| 6 | [Thảo luận & quyết định](06-thao-luan-quyet-dinh.md) | Quyết định kiến trúc, đánh đổi, câu hỏi mở, lộ trình |
| 7 | [Khởi tạo project](07-khoi-tao-project.md) | Cấu trúc code, toolchain, lệnh chạy, trạng thái verify, nợ kỹ thuật |

## Nguyên tắc đọc

- Tài liệu viết bằng **tiếng Việt**; nhãn kỹ thuật (tên field, enum, API) giữ tiếng Anh cho khớp code.
- Mọi mô tả chức năng bám theo prototype đã dựng — phần nào là **đề xuất mở rộng** (chưa có trong prototype) đều được đánh dấu rõ.
- Design system dùng chung: xem [`../../README.md`](../../README.md) và [`../../DESIGN_SYSTEM.md`](../../DESIGN_SYSTEM.md).
