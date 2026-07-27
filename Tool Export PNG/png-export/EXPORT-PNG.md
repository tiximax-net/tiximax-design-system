# Xuất PNG giao diện prototype

Chụp từng màn hình của prototype mobile thành ảnh PNG kiểu **screen capture điện thoại** (iPhone). Chạy bằng **Node thuần + Chrome đã cài sẵn** — 0 dependency, không cần npm install. Có 2 cách dùng:

| Tool | Dùng khi |
|------|----------|
| **`export-studio.mjs`** (web UI) | Muốn **tick chọn nhiều màn** trên trình duyệt, xem trước thumbnail, rồi tải về. Chọn 1 → PNG; chọn nhiều → **1 file ZIP**. |
| **`export-png.mjs`** (CLI) | Xuất hàng loạt bằng dòng lệnh / script (CI, batch). |

Cả hai dùng chung engine ở `capture-engine.mjs`.

---

## A · Export Studio (chọn màn trên trình duyệt) — khuyên dùng

```bash
cd "Tool Export PNG/png-export"
node export-studio.mjs            # tự mở http://127.0.0.1:4270
```

Trong trang: chọn **Ngôn ngữ** (JP/VI), **Nền** (Sáng/Tối), **Khung** (Có khung device / Không khung) → tick các màn muốn xuất → bấm **Export**.
- Chọn **1 màn** → tải về 1 file `.png`.
- Chọn **nhiều màn** → tải về 1 file `.zip` gộp các PNG.

Dừng: `Ctrl+C`. Đổi cổng/độ nét: `node export-studio.mjs --port 4270 --scale 3`.

---

## B · CLI (`export-png.mjs`)

```bash
cd "Tool Export PNG/png-export"

node export-png.mjs                       # 8 màn bản JP, có khung điện thoại (bezel)
node export-png.mjs --mode screen         # chỉ khung màn hình (ảnh full-bleed, bo góc)
node export-png.mjs --mode both           # xuất cả 2 kiểu
node export-png.mjs --theme dark          # nền tối
node export-png.mjs --theme both          # cả sáng + tối
node export-png.mjs --file express-booking-prototype.html   # bản tiếng Việt
node export-png.mjs --only 0,4,6          # chỉ vài màn (index 0–7)
node export-png.mjs --scale 2             # giảm độ nét cho file nhẹ hơn
```

Ảnh xuất ra `exports/`, tên dạng `<file>__<slug>[__mode-theme].png`.

## 8 màn hình (index)

| # | slug | Màn |
|---|------|-----|
| 0 | `01-route` | Route & địa chỉ |
| 1 | `02-package` | Chi tiết kiện hàng |
| 2 | `03-review` | Xác nhận đặt |
| 3 | `04-confirm` | Đặt thành công |
| 4 | `05-tracking` | Theo dõi đơn |
| 5 | `06-chat` | Chat hỗ trợ |
| 6 | `07-shipments` | Danh sách đơn |
| 7 | `08-picker` | Bộ chọn quốc gia |

## Tùy chọn

| Cờ | Mặc định | Ý nghĩa |
|----|----------|---------|
| `--file` | `express-booking-prototype-jp.html` | File prototype trong thư mục này |
| `--mode` | `device` | `device` (có bezel) · `screen` (không bezel) · `both` |
| `--theme` | `light` | `light` · `dark` · `both` |
| `--scale` | `3` | Device pixel ratio → độ nét (3 = retina) |
| `--only` | (tất cả) | Danh sách index, vd `0,2,4` |
| `--margin` | `64` | Lề trong suốt quanh bezel (chỉ mode `device`) |
| `--out` | `exports` | Thư mục xuất |
| `--port` | `4271` | Cổng static server tạm |

## Cách hoạt động

1. `capture-engine.mjs` bật một static server tạm phục vụ từ **repo root** (để `../../assets`, fonts, CSS resolve đúng).
2. Khi phục vụ file HTML prototype, chèn on-the-fly `window.__go = go` + CSS ẩn dev-toolbar và tắt transition — **không sửa file nguồn**.
3. Lái **Google Chrome** đã cài qua DevTools Protocol (WebSocket), giả lập khung điện thoại, gọi `window.__go(i)` để chuyển 8 màn (kể cả các màn cần `RENDER[i]` điền dữ liệu động), rồi `Page.captureScreenshot` cắt đúng vùng `.device` / `.device__screen`. Các lần chụp được tuần tự hoá qua 1 hàng đợi (CDP dùng 1 tab).
4. ZIP được tạo bằng `zlib` chuẩn của Node (deflate + CRC32 tự viết) — **không cần thư viện ngoài**.

## Files

- `export-studio.mjs` — web UI chọn màn → PNG/ZIP.
- `export-png.mjs` — CLI xuất hàng loạt.
- `capture-engine.mjs` — engine dùng chung (Chrome/CDP + static server + `makeZip`).

Nếu Chrome không ở đường dẫn mặc định macOS, đặt biến môi trường:
```bash
CHROME="/path/to/chrome" node export-png.mjs
```
