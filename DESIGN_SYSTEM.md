# TIXIMAX Design System

> Tài liệu design system đầy đủ — màu sắc, typography, spacing, shadow, bo góc và các component.
> Thương hiệu: vàng `#F4B931` · navy `#264F91` · cam-đỏ `#EB5635` · blue `#006FBB` · green `#008148` · Font: headings **Source Sans 3**, body **Inter**.

---

## 1. Color — Brand

| Token | Hex | Mô tả |
|---|---|---|
| `--brand-black` | `#000000` | Đen logo |
| `--brand-white` | `#FFFCF8` | Trắng ấm (off-white) |
| `--brand-yellow` | `#F7B82D` | Tia sáng vàng trong logo / highlight |
| `--brand-gold` | `#F4B931` | Màu thương hiệu chính / action |
| `--brand-gold-bright` | `#F9CB5A` | Gold sáng / highlight |
| `--brand-red` | `#EB5635` | Cam-đỏ nhấn / năng lượng |
| `--brand-navy` | `#264F91` | Xanh navy thương hiệu (nền tối / band) |
| `--brand-blue` | `#006FBB` | Xanh dương vừa / info |
| `--brand-green` | `#008148` | Xanh lá / success |

### Yellow ramp (`#F7B82D`)
`50 #FEF8E9` · `100 #FDEEC4` · `200 #FBDD8C` · `300 #F9CB54` · `400 #F8C03D` · **`500 #F7B82D`** · `600 #E0A114` · `700 #AE7D10` · `800 #7C590B` · `900 #4A3507`

### Gold ramp (`#F4B931`)
`50 #FEF9EA` · `100 #FDF1CE` · `200 #FBE19B` · `300 #F9D168` · `400 #F6C54C` · **`500 #F4B931`** · `600 #D8A01B` · `700 #A87B15` · `800 #78580F` · `900 #4B370A`

### Navy ramp (`#264F91`)
`50 #ECF1F8` · `100 #D2DDEE` · `200 #A3B9DA` · `300 #7596C5` · `400 #4D72AB` · **`500 #264F91`** · `600 #1F427A` · `700 #183360` · `800 #112547` · `900 #0B172E`

### Red ramp (`#EB5635`)
`50 #FDF0EC` · `100 #F9D8CD` · `200 #F3B099` · `300 #ED8866` · `400 #EC6F4D` · **`500 #EB5635`** · `600 #CA4325` · `700 #9D341C` · `800 #712514` · `900 #46170C`

### Blue ramp (`#006FBB`)
`50 #E8F4FC` · `100 #C4E3F7` · `200 #87C7EF` · `300 #4AABE6` · `400 #1F8DD1` · **`500 #006FBB`** · `600 #005E9E` · `700 #004A7C` · `800 #00365A` · `900 #00223A`

### Green ramp (`#008148`)
`50 #E8F5EE` · `100 #C2E6D6` · `200 #85CDAC` · `300 #47B483` · `400 #219A65` · **`500 #008148`** · `600 #006D3D` · `700 #005530` · `800 #003E23` · `900 #002716`

---

## 2. Color — Neutral

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `--neutral-0` | `#FFFFFF` | | `--neutral-400` | `#9AA5B5` |
| `--neutral-25` | `#FBFCFD` | | `--neutral-500` | `#707C8E` |
| `--neutral-50` | `#F5F7FA` | | `--neutral-600` | `#515C6D` |
| `--neutral-100` | `#EDF0F4` | | `--neutral-700` | `#3A4452` |
| `--neutral-200` | `#DDE2EA` | | `--neutral-800` | `#252D38` |
| `--neutral-300` | `#C3CBD7` | | `--neutral-900` | `#141A22` |
| | | | `--neutral-950` | `#0B0F15` |

---

## 3. Color — Semantic

| Vai trò | Màu | Nền | Viền |
|---|---|---|---|
| Success | `#008148` | `#E8F5EE` | `#85CDAC` |
| Warning | `#F4B931` | `#FEF9EA` | `#FBE19B` |
| Error | `#EB5635` | `#FDF0EC` | `#F3B099` |
| Info | `#006FBB` | `#E8F4FC` | `#87C7EF` |

---

## 4. Color — Text

| Token | Hex | Dùng cho |
|---|---|---|
| `--text-primary` | `#0C1A31` | Tiêu đề, nội dung chính |
| `--text-secondary` | `#515C6D` | Nội dung phụ |
| `--text-tertiary` | `#8B95A5` | Caption, ghi chú |
| `--text-disabled` | `#B6BECB` | Trạng thái vô hiệu |
| `--text-brand` | `#C28E1F` | Chữ màu thương hiệu (đọc tốt trên nền sáng) |
| `--text-link` | `#2563C9` | Liên kết |
| `--text-error` | `#AE2F0F` | Thông báo lỗi |
| `--text-success` | `#197A43` | Thông báo thành công |
| `--text-inverse` | `#FFFFFF` | Chữ trên nền tối |

---

## 5. Typography — Source Sans 3 (headings) · Inter (body)

> Tiêu đề/display dùng **Source Sans 3** (đậm, tracking chặt); thân bài (Body Large → Caption) dùng **Inter** (regular, line-height thoáng).
>
> **Per-language CJK/VI (dùng biến font theo `[lang]`):** JP → **Noto Sans JP** (`--font-jp`) · VI → **Be Vietnam Pro** (`--font-vi`) · Giản thể `zh` → **Noto Sans SC** (`--font-zh`) · Phồn thể `zh-tw` → **Noto Sans TC** (`--font-zh-tw`).
>
> **Thứ tự ưu tiên:** **mỗi ngôn ngữ non-Latin đặt font của chính nó ĐỨNG ĐẦU** (JP → Noto Sans JP, zh → Noto Sans SC, zh-tw → Noto Sans TC, VI → Be Vietnam Pro) để cả trang — kể cả chữ Latin/số — hiển thị đồng nhất một face; **Source Sans 3 / Inter là fallback cuối** cho glyph mà font ngôn ngữ thiếu. Ngôn ngữ **Latin thuần (en / id) dùng thẳng Source Sans 3 / Inter**, không override. **Giản thể và Phồn thể tách biệt**, và **không** trộn Noto Sans JP vào stack tiếng Trung (chữ Hán không được lấy tự dạng Nhật).

| Style | Font | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Source Sans 3 | 56px | Black 900 | 1.1 | -0.02em |
| H1 | Source Sans 3 | 40px | Bold 700 | 1.1 | -0.02em |
| H2 | Source Sans 3 | 32px | Bold 700 | 1.25 | -0.02em |
| H3 | Source Sans 3 | 26px | SemiBold 600 | 1.25 | — |
| H4 | Source Sans 3 | 21px | SemiBold 600 | 1.25 | — |
| Title | Source Sans 3 | 18px | SemiBold 600 | 1.25 | — |
| Body Large | Inter | 18px | Regular 400 | 1.65 | — |
| Body | Inter | 16px | Regular 400 | 1.5 | — |
| Body Small | Inter | 14px | Regular 400 | 1.5 | — |
| Caption | Inter | 13px | Regular 400 | 1.5 | — |
| Overline | Source Sans 3 | 12px | Bold 700 | 1.5 | +0.12em, UPPERCASE |

**Weights:** ExtraLight 200 · Light 300 · Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · Black 900 (kèm italic).

---

## 6. Corner Radius

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--radius-xs` | 4px | Checkbox, tag nhỏ |
| `--radius-sm` | 6px | Item menu |
| `--radius-md` | 10px | Button, input |
| `--radius-lg` | 14px | Card |
| `--radius-xl` | 20px | Modal, panel lớn |
| `--radius-2xl` | 28px | Hero, khối lớn |
| `--radius-pill` | 999px | Chip, badge, toggle |

---

## 7. Spacing Scale (base 4px)

`1 = 4px` · `2 = 8px` · `3 = 12px` · `4 = 16px` · `5 = 20px` · `6 = 24px` · `8 = 32px` · `10 = 40px` · `12 = 48px` · `16 = 64px` · `20 = 80px` · `24 = 96px`

---

## 8. Shadow / Elevation

| Token | Giá trị |
|---|---|
| `--shadow-xs` | `0 1px 2px rgba(38,79,145,.06)` |
| `--shadow-sm` | `0 1px 3px rgba(38,79,145,.08), 0 1px 2px rgba(38,79,145,.06)` |
| `--shadow-md` | `0 4px 10px rgba(38,79,145,.08), 0 2px 4px rgba(38,79,145,.06)` |
| `--shadow-lg` | `0 12px 24px rgba(38,79,145,.10), 0 4px 8px rgba(38,79,145,.06)` |
| `--shadow-xl` | `0 24px 48px rgba(38,79,145,.14), 0 8px 16px rgba(38,79,145,.08)` |
| `--shadow-gold` | `0 8px 20px rgba(244,185,49,.32)` — riêng cho CTA chính |
| `--shadow-focus` | `0 0 0 3px rgba(244,185,49,.35)` — vòng focus |

> Tất cả shadow đều ám navy (không dùng đen xám thuần).

---

## 9. Components

### Button
- **Variants:** Primary (gold, có gold glow), Secondary (navy), Outline, Ghost, Danger, Disabled.
- **Họ màu #EB5635:** Solid (shadow đỏ), Soft (nền `--red-100`), Outline, Ghost, Icon-only.
- **Kích cỡ:** Small (8×14, 13px) · Medium (11×18, 15px) · Large (14×24, 17px).
- **Icon:** hỗ trợ icon trái (leading), icon phải (trailing) và icon-only.
- **Bo góc:** `--radius-md`. **Hover:** đậm 1 cấp. **Press:** `scale(0.98)`.

### Button có icon
Icon Lucide outline, kích thước theo button: sm 15px · md 18px · lg 20px. Gap 8px.

### Input Field
- **Cấu trúc:** label · ô input · hint/lỗi.
- **Loại:** Mặc định (text only), Icon trái, Icon phải (clearable), Date, Time, Select (dropdown).
- **Trạng thái:** Default · Focus (viền vàng + ring) · Hợp lệ (xanh) · Lỗi (đỏ) · Disabled.
- Bo góc `--radius-md`, viền `--border-default` 1.5px.

### Card
Nền trắng + viền `--border-default` 1px + shadow nhẹ (`sm`/`md`), bo góc `--radius-lg`. Không dùng card viền-trái màu.

### Badges & Chips
- **Badge:** pill nhỏ, 12px Bold. Tone: gold, navy, green, red, solid. Có thể kèm icon.
- **Chip:** filter pill 13px, trạng thái active (navy) / mặc định, có thể removable (icon ×).

### Alerts
4 loại: Success · Warning · Error · Info. Icon trái + tiêu đề + mô tả, nền nhạt + viền cùng tông.

### Controls
Checkbox (tick vàng), Radio (chấm vàng), Toggle (bật = gold). Hit target ≥ 20px.

### List
Hàng có icon-box (40px) + tiêu đề + phụ đề + trạng thái + chevron. Nằm trong card có shadow.

### Popup & Menu
- **Dropdown menu:** item 14px, hover nền `--gold-50`, separator, item danger màu đỏ.
- **Dialog:** bo góc `--radius-xl`, shadow `xl`, icon tròn + tiêu đề + mô tả + 2 nút.

### Chat
Dùng cho 3 bối cảnh: **widget góc phải (web)** · **full screen (web)** · **mobile**.
- **Bubble:** tin đến nền `--surface-card` + viền `--border-subtle`, bo `16/16/16/4`; tin đi nền `--brand-gold`, chữ `--navy-900`, bo `16/16/4/16`. Tin liền chuỗi bo đều 16px.
- **Meta & trạng thái:** 11px `--text-tertiary`; đã gửi (`check`) → đã đọc (`check-check` màu `--brand-blue`).
- **Thành phần khác:** divider ngày, tin hệ thống (pill `--surface-sunken`), typing 3 chấm, attachment ảnh/tệp, **order card** (mã đơn + badge trạng thái + tuyến/ngày giao), quick replies (pill viền `--gold-300`).
- **Composer:** pill viền 1.5px, nút gửi tròn gold 36px; trạng thái Default · Focus (viền gold + `--shadow-focus`) · Disabled.
- **Launcher:** FAB gold 56px + `--shadow-gold`, badge đỏ số tin chưa đọc, teaser bo `16/16/4/16`.
- **Header widget** dùng band `--surface-navy` — chữ ghim `--neutral-0` (KHÔNG dùng `--text-inverse` vì token này đảo theo theme).
- **Hàng hội thoại:** avatar 42–46px (chấm online xanh), tên + snippet 1 dòng cắt `…`, badge chưa đọc; hàng active nền `--gold-50` + `inset 3px` gold.
- React: `preview/comp-chat.html` · `src/components/Chat.tsx`.

---

## 10. Iconography

- Bộ icon: **Lucide** (outline, stroke ~1.75–2px, 24×24), `currentColor`.
- Kích thước: 16px (dày đặc) · 20px (button/input) · 24px (nav/feature).
- Không dùng emoji. CDN: `https://unpkg.com/lucide@latest`.

---

## 11. Logo

- `assets/tiximax-logo-navy.svg` — nền sáng.
- `assets/tiximax-logo-white.svg` — nền navy/tối.
- Tia sáng vàng trong wordmark là dấu hiệu nhận diện — không thay bằng icon khác.

---

## 12. Tài liệu A4 — HAI hệ, chọn đúng hệ

| Hệ | File CSS | Mô hình | Dùng khi |
|---|---|---|---|
| **Canvas cố định** | `tiximax-docs.css` | Mỗi `.doc-page` = khung cứng 794×1123 (`overflow:hidden`) | 1 trang, pixel-perfect: 名刺, certificate, cover, invoice 1 trang |
| **Paged (dòng chảy)** | `tiximax-doc-paged.css` | Author 1 luồng → Chromium tự phân trang A4 | Nội dung DÀI / nhiều trang: 提案書, hợp đồng, 議事録, báo giá dài |

> **Vỡ trang / header-footer đè nhau** hầu như luôn do dùng **canvas cố định** cho nội dung dòng chảy. Nội dung có thể dài → **luôn** chọn hệ **paged**.

### Hệ Paged — cách dùng
1. Import: `tokens.css` → `tiximax-docs.css` (tái dùng component) → `tiximax-doc-paged.css`.
2. Khai báo letterhead qua `<meta>`: `doc-brand`, `doc-brand-sub`, `doc-type`, `doc-seal`, `doc-note`.
3. Bọc nội dung: `.doc-flow > (.doc-running-head + .doc-flow-body + .doc-running-foot)`.
   Header/footer trong luồng chỉ để **xem trên màn hình**; khi xuất PDF, tool vẽ header/footer lặp mọi trang.
4. Xuất: `html-to-pdf --paged` (xem CLAUDE.md §15). Số trang X/Y + letterhead lặp tự động; `<thead>` tự lặp; hàng không cắt đôi.
5. **Landscape:** `class="landscape"` trên `<html>`/`<body>` + `<style>@page{size:A4 landscape}</style>`.

**Luật chống vỡ (đã có sẵn trong CSS):** `break-inside:avoid` cho panel/card/signature/hàng bảng; `break-after:avoid` cho heading; `.page-break` (gắn lên phần tử, **không** dùng div rỗng) để ngắt trang thủ công.

**Cạm bẫy đã kiểm chứng:** KHÔNG dùng `position:fixed` cho header/footer trong paged — Chromium sẽ **tắt lặp `<thead>`** của bảng dài. Header/footer lặp qua template của tool, không qua fixed.

Template khởi tạo: **`doc-paged-starter.html`** (提案書 4 trang mẫu: letterhead, meta-grid, bảng dài, panel, chữ ký, ngắt trang).

---

*Xuất từ TIXIMAX Design System · 2026*
