# 4. Mô hình dữ liệu

> Trích & chuẩn hóa từ state trong prototype (`state`/`S` mobile & web), gộp thành mô hình thống nhất cho sản phẩm thật. Tên field giữ tiếng Anh cho khớp code.

## 4.1. Sơ đồ quan hệ (khái niệm)

```
Customer 1───* Order 1───* Item 1───* Photo
                 │
                 ├── Party (pickup)      (address + contact)
                 ├── Party (delivery)    (address + contact)
                 ├── Quote (breakdown giá)
                 ├── 1───* TrackingEvent  (milestone/stage)
                 └── 1───* Message        (chat, có Attachment)
Country (tham chiếu: name, city, airportCode, dialCode, currency)
```

## 4.2. Entity: Order (Shipment)

Đơn vận chuyển — thực thể trung tâm.

| Field | Kiểu | Mô tả | Nguồn prototype |
|---|---|---|---|
| `id` | string | Mã tracking 12 số (hiển thị 4-4-4, tiền tố `TXM-`) | `id`, `genTracking`, `fmtTracking` |
| `customerId` | string | Chủ đơn *(khi có auth — Đề xuất)* | — |
| `originCountry` | ISO code | Quốc gia gửi (`ID/JP/VN/PH/KR/SG…`) | `from` / `originCountry` |
| `destCountry` | ISO code | Quốc gia nhận | `to` / `destCountry` |
| `pickup` | Party | Địa chỉ + liên hệ người gửi | `pickup*`, `name`, `phone`, `phoneCC` |
| `delivery` | Party | Địa chỉ + liên hệ người nhận | `deliver*`, `rcvName`, `rcvPhone`, `rcvPhoneCC` |
| `items` | Item[] | Danh sách kiện hàng | `items[]` / trường đơn lẻ mobile |
| `quote` | Quote | Giá ước tính & breakdown | `rvBreak`, pricing fns |
| `finalPrice` | Money? | Giá cuối sau khi cân tại pickup | (nghiệp vụ) |
| `stage` | int | Trạng thái số (xem §4.7) | `stage` |
| `status` | enum | Nhãn trạng thái suy ra từ `stage` | `statusOf()` |
| `currency` | enum | USD / JPY / IDR / VND… | `currency`, `RATES` |
| `bookedAt` / `date` | datetime | Thời điểm tạo đơn | `bookedAt`, `date` |
| `createdAt`/`updatedAt` | datetime | Audit | — |

## 4.3. Entity: Party (pickup / delivery)

| Field | Kiểu | Mô tả |
|---|---|---|
| `address` | string | Địa chỉ đầy đủ (đã chọn hoặc tự gõ) |
| `addressSub` | string? | Dòng phụ / gợi ý (mobile `pickupSub`/`deliverSub`) |
| `postal` | string? | Mã bưu chính / ZIP (tùy chọn) |
| `name` | string | Tên người gửi/nhận |
| `phone` | string | Số điện thoại |
| `dialCode` | string | Mã vùng (`+62/+81/+84/+63/+82/+65/+44/+1`) |
| `note` | string? | Ghi chú lấy hàng (mã cổng, tầng, giờ) — pickup |
| `selected` | bool | Đã chọn địa chỉ hợp lệ chưa (dùng cho gating) |

`partyComplete(party)` = có `address` + `name` + `phone`.

## 4.4. Entity: Item (kiện hàng)

| Field | Kiểu | Mô tả |
|---|---|---|
| `name` / `contents` | string | Nội dung ("e.g. Batik fabric, 2 pieces") |
| `estWeight` | number? | Cân ước tính (kg), tùy chọn |
| `actualWeight` | number? | Cân thực tế (nhập tại pickup) |
| `fragile` | bool | Cờ dễ vỡ → phụ phí |
| `battery` | bool | Cờ chứa pin → phụ phí |
| `photos` | Photo[] | Ảnh kiện hàng (nhiều) |

**Chargeable weight** = `actualWeight ?? estWeight ?? 1` (mobile mặc định 1kg khi trống).

## 4.5. Entity: Quote (báo giá)

| Field | Kiểu | Mô tả |
|---|---|---|
| `baseFee` | Money | Phí quốc tế cơ bản ("Base international pickup") |
| `ratePerKg` | Money | Đơn giá theo kg |
| `chargeableWeight` | number | Cân tính phí |
| `fragileFee` | Money | Phụ phí dễ vỡ × số item fragile |
| `batteryFee` | Money | Phụ phí pin × số item battery |
| `lines` | Line[] | Các dòng breakdown hiển thị |
| `total` | Money | Tổng ước tính |
| `isEstimate` | bool | true trước khi cân tại pickup |

**Công thức (prototype):**
`total = baseFee + round(ratePerKg × weight) + fragileFee×nFragile + batteryFee×nBattery`

| Hằng số | Mobile (JPY) | Web (USD) |
|---|---|---|
| Base fee | 2000 | 15 |
| Rate/kg | 1200 | 6 |
| Fragile | 500 | 4 |
| Battery | 800 | 2 |

> Trong sản phẩm thật, các hằng số này chuyển sang **cấu hình theo tuyến/tiền tệ** ở Pricing service (§3.7), không hardcode theo app.

## 4.6. Entity: Message (chat) & Attachment

**Message:**

| Field | Kiểu | Mô tả |
|---|---|---|
| `who` | enum | `agent` \| `me` \| `system` |
| `text` | string | Nội dung |
| `time` | datetime | Thời điểm |
| `attachments` | Attachment[] | Đính kèm |
| `orderCard` | Order ref? | Thẻ đơn nhúng trong chat |

**Attachment:**

| Field | Kiểu | Mô tả |
|---|---|---|
| `name` | string | Tên file |
| `size` | number | Kích thước |
| `isImage` | bool | Ảnh hay không |
| `url` | string | Đường dẫn |
| `ext` | string | Đuôi (`pdf/doc/xls/zip/img…`) |

Ngoài ra: `unread` (số/tin chưa đọc → badge), persona agent "Rina from TIXIMAX Express".

## 4.7. Trạng thái đơn (Stage → Status)

Nghiệp vụ dùng **số stage** ánh xạ sang nhãn trạng thái có màu.

### Mobile (`LEGS = 6`, `statusOf(stage)`)

| Stage | Status | Màu |
|---|---|---|
| ≥ 6 | Delivered | green |
| ≥ 4 | In transit | blue |
| ≥ 3 | Picked up | blue |
| ≥ 2 | Pickup scheduled | — |
| < 2 | Confirmed | — |

**6 milestone (`legsOf`):** Booking received → Confirmed via chat → Pickup scheduled → Picked up & weighed → Shipping to {country} → Delivered. Đơn mới ghim ở stage 2.

### Web (`statusOf(stage)`)

| Stage | Status | Màu |
|---|---|---|
| ≥ 6 | Delivered | green |
| ≥ 3 | In transit | blue |
| ≥ 2 | Picked up | blue |
| ≥ 1 | Confirmed | gold |
| 0 | Awaiting confirmation | grey |

**7 stage tracking web (`STAGES`):** Booking submitted → Confirmed via chat → Picked up → In transit → Customs clearance → Out for delivery → Delivered (mỗi stage có `STAGE_TIMES`).

> **Cần thống nhất** máy trạng thái giữa mobile & web khi lên sản phẩm — hiện hai bên có số milestone khác nhau (6 vs 7). Xem [câu hỏi mở §6](06-thao-luan-quyet-dinh.md).

## 4.8. Entity tham chiếu: Country

Từ `COUNTRIES` (mobile) / `ISO`/`DIAL`/`ADDR` (web):

| Field | Ví dụ |
|---|---|
| `iso` | ID, JP, VN, PH, KR, SG |
| `name` | Indonesia, Japan, Vietnam, Philippines, Korea, Singapore |
| `city` | Jakarta, Tokyo, Hanoi, Manila |
| `airportCode` | CGK, NRT, HAN, MNL |
| `dialCode` | +62, +81, +84, +63, +82, +65 (+44, +1 cho danh sách SĐT) |
| `currency` | (đề xuất bổ sung: IDR, JPY, VND, PHP…) |

Mỗi quốc gia có **sổ địa chỉ mẫu** phục vụ gợi ý (`BOOK`/`ADDR`) — thay bằng Address/Geocoding API thật.

Tuyến mặc định cả hai app: **Indonesia → Japan**.

## 4.9. Entity: Customer *(Đề xuất — chưa có trong prototype)*

| Field | Kiểu | Mô tả |
|---|---|---|
| `id` | string | ID khách |
| `name`, `phone`, `email` | string | Thông tin cơ bản |
| `savedAddresses` | Party[] | Sổ địa chỉ (tab "Saved" hiện chỉ là UI) |
| `defaultCurrency` | enum | Tiền tệ ưu tiên |
| `locale` | enum | VI / ja / en |
