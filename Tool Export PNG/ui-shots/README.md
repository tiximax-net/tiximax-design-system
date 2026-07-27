# ui-shots — nút "Export screen" cho mọi prototype UI

Một lệnh toàn cục để **bất kỳ dự án UI nào** cũng có nút **Export screen**: bấm → chọn màn → tải về **PNG** (1 màn) hoặc **ZIP** (≥2 màn). Ảnh **pixel-perfect** (chụp bằng Google Chrome nền), khung device (bezel iPhone) hoặc không khung. **0 dependency** — chỉ Node ≥20 + Chrome/Chromium/Edge có sẵn.

## Cài (1 lần)

```bash
cd "Tool Export PNG/ui-shots"
npm link          # tạo lệnh toàn cục `ui-shots`
```

## Dùng ở bất kỳ dự án nào

```bash
cd <thư-mục-dự-án-UI>
ui-shots <file.html>     # mở thẳng file đang làm việc + mở trình duyệt
ui-shots                 # không có file → mở trang chọn file (KHÔNG mở index Design System)
```

> **Mở đúng file đang đứng (mặc định):** truyền file làm đối số — `ui-shots <file.html>` (hoặc `--file <path>`) — tool sẽ **mở thẳng URL của chính file đó**; `root` tự nâng lên thư mục cha để assets `../../` vẫn resolve. **Không** truyền file → mở **trang chọn file** `/__uishots/`, **không bao giờ** rơi về `index.html` giao diện Design System.

> **Tự mở trình duyệt (mặc định, luôn bật):** ngay sau khi server khởi động, tool **tự động mở trang** trên trình duyệt để bấm Export screen — không cần mở tay. Xem [cli.mjs](cli.mjs) (`spawn(opener, [url])`: `open` trên macOS, `start` trên Windows, `xdg-open` trên Linux).

Mở một prototype → góc phải dưới có nút **Export screen** → tick các màn → **Export**:
- chọn **1 màn** → tải `.png`
- chọn **≥2 màn** → tải `.zip`

Tuỳ chọn: `--file <path>` · `--port 4270` · `--scale 3` (độ nét) · `--margin 28` (lề nền quanh bezel, `0` = sát khung) · `--root .` · `--help`.

## Nút chỉ hiện ở trang cần xuất

Widget **chỉ gắn vào trang thực sự có màn để xuất** — trang có khung `.device`, có các `.screen`, hoặc khai báo `EXPORT_CONFIG`. Các trang tài liệu/preview của Design System (index, preview, documents-preview, slides…) **không** có nút. Muốn ép bật nút cho một trang cấu trúc khác: mở kèm `?export=1`, ví dụ `http://127.0.0.1:4270/trang.html?export=1`.

## Nó tự nhận diện màn thế nào

Mặc định coi mỗi phần tử khớp `.screen` là một màn, nhãn lấy từ `[data-export-label]` → `.scr-title/h1/h2` → `Màn N`. Chuyển màn: ưu tiên `window.__go(i)` (tự lộ ra nếu trang có state machine kiểu `var RENDER = {…}`), nếu không thì bật/tắt class `is-current`.

**Tuỳ biến cho dự án khác cấu trúc** — đặt trong prototype trước khi tải trang:

```html
<script>
  window.EXPORT_CONFIG = {
    screenSelector: '.view',            // phần tử mỗi màn
    frameSelector:  '.phone',           // khung thiết bị (để chụp "có khung")
    screenFrameSelector: '.phone__screen',
    goTo: (i) => myApp.navigate(i),     // cách chuyển tới màn i
    screens: [ { label:'Trang chủ', slug:'home' }, … ],  // hoặc để tự dò
  };
</script>
```

## Cơ chế

`ui-shots` chạy static server tại `localhost`, **chèn on-the-fly** một widget (`window.__EXPORT` + nút + bảng chọn) vào mọi trang HTML — **không sửa file nguồn**. Khi bấm Export, server lái **Chrome headless** (DevTools Protocol) tải chính trang đó, gọi `window.__EXPORT.goto(i)` để chuyển màn (kể cả màn cần JS điền dữ liệu động), rồi `captureScreenshot` cắt đúng vùng khung/màn. Nhiều màn được gộp ZIP bằng `zlib` chuẩn của Node (deflate + CRC32 tự viết) — không cần thư viện ngoài.

## Files

| File | Vai trò |
|------|---------|
| `cli.mjs` | Lệnh `ui-shots` (bin) |
| `engine.mjs` | Server + Chrome/CDP capture + `makeZip` |
| `widget.js` | Widget chèn vào trang: `window.__EXPORT` + nút + bảng chọn |

> Yêu cầu Chrome ở đường dẫn mặc định; nếu khác, đặt `CHROME=/path/to/chrome ui-shots`.
