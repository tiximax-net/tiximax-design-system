# Cách chạy tool Export PNG

Tool xuất **ảnh màn hình prototype** (khung điện thoại pixel-perfect) ra **PNG / ZIP**.
Lệnh toàn cục: **`ui-shots`**. Không cần cài thư viện — chỉ cần **Node ≥20** + **Google Chrome**.

---

## TL;DR — chạy nhanh

```bash
# đứng ngay thư mục chứa file prototype (KHÔNG cần cd lên repo root)
cd "tiximax-express/UI-TXM-Express"

ui-shots express-booking-prototype-jp.html   # mở thẳng file này + tự mở trình duyệt
# hoặc không truyền file → mở trang chọn file:
ui-shots
```

Trình duyệt tự bật → góc **phải dưới** có nút **Export screen** → tick màn muốn xuất → bấm **Export**:
- **1 màn** → tải về `.png`
- **≥2 màn** → tải về `.zip`

Dừng tool: `Ctrl + C`.

---

## Cài lệnh (chỉ 1 lần, hoặc khi mất lệnh)

```bash
cd "Tool Export PNG/ui-shots"
npm link          # tạo lệnh toàn cục `ui-shots`
```

Kiểm tra: `ui-shots --help`.

---

## Các kiểu dùng

| Lệnh | Kết quả |
|------|---------|
| `ui-shots <file.html>` | Mở thẳng đúng file đó trong trình duyệt |
| `ui-shots` | Mở **trang chọn file** — liệt kê các `.html` trong thư mục hiện tại |
| `ui-shots --port 5000` | Đổi cổng (mặc định 4270) |
| `ui-shots <file> --margin 12` | Nền quanh khung điện thoại hẹp hơn (mặc định 28, `0` = sát khung) |
| `ui-shots <file> --scale 2` | Giảm độ nét/kích thước ảnh (mặc định 3× ~ Retina) |
| `ui-shots --help` | Xem toàn bộ tuỳ chọn |

> **Tự nâng thư mục phục vụ:** prototype nhúng CSS/ảnh bằng `../../…` (nằm ở repo root) vẫn hiển thị đúng — cứ đứng ngay folder prototype mà chạy, tool tự lo. Không phải cd lên repo root.

---

## Chế độ trong bảng Export

- **Có khung** — ảnh gồm cả bezel iPhone + nền mỏng xung quanh.
- **Không khung** — chỉ vùng màn hình, cắt sát, không nền.
- **Chọn tất cả / Bỏ chọn** — thao tác nhanh nhiều màn.

---

## Xử lý sự cố nhanh

| Hiện tượng | Cách xử lý |
|-----------|-----------|
| Gõ `ui-shots` báo *command not found* | Chạy lại phần **Cài lệnh** (`npm link`) |
| Ảnh export bị **trần, mất CSS / logo vỡ** | Đã fix — cập nhật tool bản mới nhất; nếu tự set `--root` thì bỏ đi để tool tự nâng root |
| Nút **Export** bị mờ, không bấm được | Chưa tick màn nào — tick ít nhất 1 màn |
| **Không thấy nút** Export screen | Trang đó không có màn để xuất (vd trang docs Design System); ép hiện bằng cách mở kèm `?export=1` |
| Báo *Không tìm thấy Chrome* | Đặt biến môi trường: `CHROME=/đường/dẫn/chrome ui-shots` |

Chi tiết kỹ thuật xem [ui-shots/README.md](ui-shots/README.md).
