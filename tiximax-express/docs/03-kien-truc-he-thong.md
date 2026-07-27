# 3. Đề xuất kiến trúc hệ thống

> Kiến trúc đề xuất để đưa **prototype HTML/JS** hiện tại thành **sản phẩm chạy thật**. Phần "hiện trạng" mô tả prototype; phần "mục tiêu" là đề xuất.

## 3.1. Hiện trạng (prototype)

- 3 file HTML single-file, **JS thuần**, state trong biến JS (`state` / `S`), render bằng chuỗi HTML/`innerHTML`.
- Dữ liệu là **sample cứng** (`SAMPLES`, `S.orders`, `BOOK`/`ADDR`).
- Không backend, không auth, không thanh toán. Pricing tính client-side.
- Dùng chung design tokens `../../colors_and_type.css`.

**Hạn chế cần khắc phục:** không có nguồn dữ liệu bền vững, không đồng bộ đa thiết bị, logic + UI + data trộn trong một file, chuỗi hardcode tiếng Anh, chat/tracking là mô phỏng.

## 3.2. Kiến trúc mục tiêu (tổng thể)

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT APPS                            │
│  ┌───────────────┐   ┌───────────────┐   ┌────────────────┐  │
│  │ Mobile (PWA / │   │  Web app      │   │ Ops portal     │  │
│  │ React Native) │   │  (React)      │   │ (nội bộ)       │  │
│  └───────┬───────┘   └───────┬───────┘   └────────┬───────┘  │
│          └────────────┬──────┴────────────────────┘          │
│              Design System (tokens dùng chung)                │
└───────────────────────┬───────────────────────────────────── ┘
                         │  HTTPS / REST hoặc GraphQL + WebSocket
┌────────────────────────▼──────────────────────────────────── ┐
│                        API GATEWAY / BFF                      │
└───┬─────────┬─────────┬──────────┬──────────┬────────────┬──── ┘
    │         │         │          │          │            │
┌───▼──┐ ┌────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼─────┐ ┌────▼────┐
│Auth  │ │Booking │ │Pricing │ │Tracking│ │ Chat    │ │ Media   │
│svc   │ │/Order  │ │/Quote  │ │svc     │ │ svc     │ │ /Upload │
│      │ │svc     │ │svc     │ │        │ │         │ │ svc     │
└──────┘ └───┬────┘ └────────┘ └───┬────┘ └────┬────┘ └─────────┘
             │                     │           │
        ┌────▼─────────────────────▼───────────▼────┐
        │   Datastore (PostgreSQL) + Cache (Redis)   │
        │   Object storage (ảnh/tài liệu) + Queue    │
        └────────────────────────────────────────────┘
                         │
        ┌────────────────┴───────────────────────────┐
        │ Tích hợp ngoài: Address/Geocoding, FX rate, │
        │ Payment gateway, Push (FCM/APNs), Email/SMS │
        └─────────────────────────────────────────────┘
```

## 3.3. Nguyên tắc kiến trúc

1. **Tách UI / logic / dữ liệu.** Rời bỏ mô hình single-file: component UI ← state store ← service API.
2. **API-first.** Client (mobile, web, ops) dùng chung một tập API; pricing/trạng thái do backend làm chủ (không tin client).
3. **Design system là nguồn chân lý về UI.** Mọi app import tokens `colors_and_type.css`; component tái sử dụng.
4. **Trạng thái đơn do server quản lý** qua máy trạng thái rõ ràng (xem §4, §5).
5. **Quốc tế hóa từ đầu**: tách chuỗi (i18n), format tiền/số theo locale, dữ liệu quốc gia/mã vùng/ZIP có cấu hình.
6. **Idempotency & retry** cho tạo đơn và upload để chịu mạng yếu.

## 3.4. Đề xuất tech stack

| Tầng | Đề xuất | Ghi chú |
|---|---|---|
| **Web** | React + TypeScript (Vite) | Repo đã có React/JSX & esbuild trong toolchain design system |
| **Mobile** | PWA trước (nhanh, tái dùng web), tiến tới React Native nếu cần native | Prototype mobile là web-based, PWA là bước tự nhiên |
| **State (client)** | Store nhẹ (Zustand/Redux Toolkit) + form lib | Thay cho biến `state`/`S` toàn cục |
| **Styling** | CSS tokens hiện có (`colors_and_type.css`) + CSS Modules/Tailwind map token | Giữ thương hiệu gold-on-navy |
| **API** | REST (OpenAPI) hoặc GraphQL; **WebSocket** cho chat & cập nhật tracking realtime | |
| **Backend** | Node.js (NestJS) hoặc tương đương team quen | Chia service theo domain §3.2 |
| **DB** | PostgreSQL (quan hệ đơn/địa chỉ/tin nhắn) + Redis (cache/session/hàng chờ) | |
| **Lưu media** | Object storage (S3-compatible) cho ảnh kiện hàng & đính kèm chat | |
| **Hạ tầng** | Container (Docker) + CI/CD; hosting cloud | |

> Stack là **đề xuất mặc định**, có thể điều chỉnh theo năng lực team. Điểm cốt lõi là **phân tách service theo domain** và **API-first**, không phải công nghệ cụ thể.

## 3.5. Các service theo domain

| Service | Trách nhiệm | Map tới FR |
|---|---|---|
| **Auth & Profile** | Đăng ký/đăng nhập (OTP/email), hồ sơ, sổ địa chỉ | FR-8.1, FR-8.2 |
| **Booking / Order** | Vòng đời đơn, wizard state, validation, trạng thái | FR-1, FR-3, FR-4 |
| **Pricing / Quote** | Tính giá ước tính & giá cuối; bảng phí, phụ phí, tỷ giá | FR-2 |
| **Tracking** | Milestone, cập nhật stage, cân thực tế, ETA | FR-5 |
| **Chat** | Tin nhắn realtime, quick-reply, đính kèm, thẻ đơn, badge | FR-6 |
| **Media / Upload** | Nhận & nén ảnh kiện hàng, đính kèm chat | FR-1.9, FR-6.4 |
| **Notification** | Push/email/SMS cho trạng thái & chat | FR-8.6 |
| **Ops** | Backend cho ops portal: xác nhận, cập nhật stage, nhập cân | FR-8.7 |

## 3.6. Tích hợp ngoài

| Tích hợp | Mục đích | Ghi chú |
|---|---|---|
| **Địa chỉ / Geocoding** | Gợi ý & chuẩn hóa địa chỉ theo quốc gia, "pick on map" | Prototype dùng sample book; cần Places/Geocoding API thật |
| **Tỷ giá (FX)** | Quy đổi USD/JPY/IDR/VND | Prototype hardcode `RATES`; cần nguồn tỷ giá cập nhật |
| **Payment gateway** | Thanh toán (sau MVP) | FR-8.3 |
| **Push (FCM/APNs)** | Thông báo đẩy | FR-8.6 |
| **Email/SMS** | OTP, xác nhận đơn | Auth & thông báo |

## 3.7. Pricing — đưa lên server

Prototype tính giá client-side với hằng số khác nhau giữa mobile (JPY) và web (USD). Đề xuất:

- **Pricing service** làm chủ công thức + cấu hình phí (base, rate/kg, phụ phí Fragile/Battery) **theo tuyến/tiền tệ**.
- Client chỉ hiển thị; mọi tính toán chính thức từ server để tránh sai lệch & gian lận.
- Tách **quote ước tính** (trước cân) và **giá cuối** (sau cân tại pickup) như đúng nghiệp vụ hiện tại.
- Chuẩn hóa **chargeable weight** (thực tế nếu có, không thì ước tính) ở một chỗ.

## 3.8. Realtime (chat & tracking)

- **WebSocket** (hoặc SSE) cho: tin nhắn chat mới, typing indicator, cập nhật badge chưa đọc, thay đổi stage đơn.
- Fallback polling khi mất kết nối.
- Tin nhắn có 3 loại `who`: `agent | me | system` (giữ như prototype), kèm đính kèm.

## 3.9. Lộ trình migrate từ prototype

1. **Trích component & tokens** từ prototype thành thư viện UI React dùng chung.
2. **Định nghĩa API** (OpenAPI) theo mô hình dữ liệu §4.
3. **Dựng Booking/Order + Pricing service** trước (lõi giá trị), nối web app.
4. **Auth tối thiểu** + **Ops portal tối thiểu** để đơn có vòng đời thật.
5. **Tracking + Chat realtime**.
6. **Media/Upload, Notification**.
7. **i18n, đa tiền tệ, hạng dịch vụ, thanh toán** (sau MVP).
