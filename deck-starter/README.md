# Deck Starter — sidebar preview

Bộ khởi tạo cho slide deck HTML có **sidebar preview bên trái** (thumbnail rail).
Cùng cơ chế với deck About của Tiximax Japan.

## Cách dùng
1. Copy folder `deck-starter/` này sang nơi anh muốn (vd `MyDeck/`).
2. Mỗi slide là một `<section data-label="…">` con trực tiếp của `<deck-stage>`.
   `data-label` là nhãn hiện trên rail. Thêm/bớt/sắp xếp section tuỳ ý.
3. Sửa `deck.css` để đổi màu/font (đã trỏ sẵn vào `../tokens.css` của brand).

## Xem preview
Luôn mở bằng **local HTTP server**, không dùng `file://`:
```bash
python3 -m http.server 8765 --bind 127.0.0.1   # chạy từ gốc design-system (hoặc cao hơn)
# rồi mở http://127.0.0.1:8765/<path>/deck-starter/index.html
```

## Engine
`deck-stage.js` (web component) lo toàn bộ: rail thumbnail, điều hướng ←/→,
scale theo cửa sổ, ẩn rail khi in/present. Rail là chrome tối trung tính;
chỉ màu accent (viền slide đang chọn) theo brand qua biến:
```css
deck-stage { --deck-rail-accent: <màu brand>; --deck-rail-bg: #141414; }
```

## Export PDF
Dùng tool chung `.claude/tools/html-to-pdf/` với `--format=slide` (1920×1080).
