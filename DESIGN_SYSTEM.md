# TIXIMAX Design System

> Tài liệu design system đầy đủ — màu sắc, typography, spacing, shadow, bo góc, dark mode và các component.
> **Nền trắng làm chủ đạo · Bảng màu đa sắc · Sáng + Tối.**
> Thương hiệu: vàng-gold `#F4B931` · vàng `#F7B82D` · navy `#264F91` · xanh dương `#006FBB` · xanh lá `#008148` · đỏ-cam `#EB5635`.
> Font: **Montserrat** (tiêu đề) · **Inter** (body) · **Noto Sans JP** (tiếng Nhật).

---

## 1. Color — Brand

| Token | Hex | Mô tả |
|---|---|---|
| `--brand-gold` | `#F4B931` | Màu action / CTA chính |
| `--brand-gold-bright` | `#F9CB5A` | Gold sáng / highlight |
| `--brand-yellow` | `#F7B82D` | Vàng signature (tia sáng logo) |
| `--brand-navy` | `#264F91` | Navy nền tối / nhấn mạnh |
| `--brand-blue` | `#006FBB` | Xanh dương / info / link |
| `--brand-green` | `#008148` | Xanh lá / success |
| `--brand-red` | `#EB5635` | Đỏ-cam nhấn / năng lượng / error |
| `--brand-black` | `#000000` | Đen chính |
| `--brand-white` | `#FFFCF8` | Trắng ấm |

### Gold ramp (`#F4B931`)
`50 #FEF9EA` · `100 #FDF1CE` · `200 #FBE19B` · `300 #F9D168` · `400 #F6C54C` · **`500 #F4B931`** · `600 #D8A01B` · `700 #A87B15` · `800 #78580F` · `900 #4B370A`

### Yellow ramp (`#F7B82D`)
`50 #FEF8E9` · `100 #FDEEC4` · `200 #FBDD8C` · `300 #F9CB54` · `400 #F8C03D` · **`500 #F7B82D`** · `600 #E0A114` · `700 #AE7D10` · `800 #7C590B` · `900 #4A3507`

### Navy ramp (`#264F91`)
`50 #ECF1F8` · `100 #D2DDEE` · `200 #A3B9DA` · `300 #7596C5` · `400 #4D72AB` · **`500 #264F91`** · `600 #1F427A` · `700 #183360` · `800 #112547` · `900 #0B172E`

### Blue ramp (`#006FBB`)
`50 #E8F4FC` · `100 #C4E3F7` · `200 #87C7EF` · `300 #4AABE6` · `400 #1F8DD1` · **`500 #006FBB`** · `600 #005E9E` · `700 #004A7C` · `800 #00365A` · `900 #00223A`

### Green ramp (`#008148`)
`50 #E8F5EE` · `100 #C2E6D6` · `200 #85CDAC` · `300 #47B483` · `400 #219A65` · **`500 #008148`** · `600 #006D3D` · `700 #005530` · `800 #003E23` · `900 #002716`

### Red ramp (`#EB5635`)
`50 #FDF0EC` · `100 #F9D8CD` · `200 #F3B099` · `300 #ED8866` · `400 #EC6F4D` · **`500 #EB5635`** · `600 #CA4325` · `700 #9D341C` · `800 #712514` · `900 #46170C`

---

## 2. Color — Neutral (cool gray, ám navy nhẹ)

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

## 3. Color — Semantic (đồng bộ màu thương hiệu)

| Vai trò | Màu | Nền | Viền |
|---|---|---|---|
| Success | `#008148` (brand green) | `#E8F5EE` | `#85CDAC` |
| Warning | `#F4B931` (brand gold) | `#FEF9EA` | `#FBE19B` |
| Error | `#EB5635` (brand red) | `#FDF0EC` | `#F3B099` |
| Info | `#006FBB` (brand blue) | `#E8F4FC` | `#87C7EF` |

---

## 4. Color — Text

| Token | Hex | Dùng cho |
|---|---|---|
| `--text-primary` | `#0C1A31` | Tiêu đề, nội dung chính |
| `--text-secondary` | `#6B7685` | Nội dung phụ |
| `--text-tertiary` | `#8B95A5` | Caption, ghi chú |
| `--text-disabled` | `#BFBFBF` | Trạng thái vô hiệu |
| `--text-subtitle` | `#B6BECB` | Phụ đề, chữ ít quan trọng |
| `--text-muted` | `#6B7685` | Thông tin phụ trợ |
| `--text-brand` | `#C28E1F` | Chữ màu thương hiệu (đọc tốt nền sáng) |
| `--text-link` | `#2563C9` | Liên kết |
| `--text-error` | `#AE2F0F` | Lỗi |
| `--text-warning` | `#FFBB00` | Cảnh báo |
| `--text-success` | `#197A43` | Thành công |
| `--text-info` | `#1A6FB5` | Thông báo |
| `--text-inverse` | `#FFFFFF` | Chữ trên nền tối |

---

## 5. Color — Surface / Border

| Token | Hex | Dùng cho |
|---|---|---|
| `--surface-page` | `#F5F7FA` | Nền trang (off-white mát) |
| `--surface-card` | `#FFFFFF` | Nền card (trắng thuần) |
| `--surface-sunken` | `#EDF0F4` | Vùng lõm |
| `--surface-navy` | `#264F91` | Band navy nhấn |
| `--surface-overlay` | `rgba(38,79,145,.55)` | Scrim sau modal |
| `--border-subtle` / `--border-default` / `--border-strong` | `#EDF0F4` / `#DDE2EA` / `#C3CBD7` | Viền theo cấp |
| `--border-focus` | `#F4B931` | Viền focus (gold) |

> Nền chủ đạo là **trắng / off-white**; navy chỉ dùng làm band nhấn, không phải nền chính.

---

## 6. Typography

**Ba font:** Montserrat (tiêu đề/display) · Inter (`--font-body`, body & UI, cũng là `--font-sans` / `--font-display`) · Noto Sans JP (nội dung tiếng Nhật).nt-display`.

| Style | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Display | 56px | Black 900 | 1.1 | -0.02em |
| H1 | 40px | Bold 700 | 1.1 | -0.02em |
| H2 | 32px | Bold 700 | 1.25 | -0.02em |
| H3 | 26px | SemiBold 600 | 1.25 | — |
| H4 | 21px | SemiBold 600 | 1.25 | — |
| Title | 18px | SemiBold 600 | 1.25 | — |
| Body Large | 18px | Regular 400 | 1.65 | — |
| Body | 16px | Regular 400 | 1.5 | — |
| Body Small | 14px | Regular 400 | 1.5 | — |
| Caption | 13px | Regular 400 | 1.5 | — |
| Overline | 12px | Bold 700 | 1.5 | +0.12em, UPPERCASE |

**Weights:** ExtraLight 200 · Light 300 · Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · Black 900 (kèm italic).
**Class:** `.ds-display`, `.ds-h1`…`.ds-h4`, `.ds-title`, `.ds-body-lg`, `.ds-body`, `.ds-body-sm`, `.ds-caption`, `.ds-overline`.

### Responsive Typography

Font-size token tự động giảm theo breakpoint — chỉ cần dùng `var(--fs-*)` hoặc class `.ds-*`, không cần viết media query riêng.

| Token | Desktop (≥1025px) | Tablet (768–1024px) | Mobile (≤767px) |
|---|---|---|---|
| `--fs-display` | 56px | 48px | 36px |
| `--fs-h1` | 40px | 36px | 28px |
| `--fs-h2` | 32px | 28px | 24px |
| `--fs-h3` | 26px | 22px | 20px |
| `--fs-h4` | 21px | 19px | 18px |
| `--fs-title` | 18px | 17px | 16px |
| `--fs-body-lg` | 18px | 17px | 16px |
| `--fs-body` | 16px | 16px | 15px |
| `--fs-body-sm` | 14px | 14px | 14px |
| `--fs-caption` | 13px | 13px | 12px |
| `--fs-overline` | 12px | 12px | 11px |

> Breakpoints: `@media (max-width: 1024px)` → Tablet · `@media (max-width: 767px)` → Mobile. Các giá trị được override trực tiếp trên `:root` trong `colors_and_type.css`.

---

## 7. Corner Radius

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

## 8. Spacing Scale (base 4px)

`1 = 4px` · `2 = 8px` · `3 = 12px` · `4 = 16px` · `5 = 20px` · `6 = 24px` · `8 = 32px` · `10 = 40px` · `12 = 48px` · `16 = 64px` · `20 = 80px` · `24 = 96px`

---

## 9. Shadow / Elevation

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

## 10. Dark Mode

Thêm `class="dark"` (hoặc `[data-theme="dark"]`) lên bất kỳ container nào để lật toàn bộ token: surface, text, border, semantic và shadow sang bản tối. Mọi card tham chiếu trong `preview/` đều hiển thị **cả Light lẫn Dark**.

- Surface tối: page `#0B0F15` · card `#161D27` · raised `#1E2632`.
- Text sáng: primary `#ECF0F5` · secondary `#AEB7C4`.
- Semantic dùng nền translucent + foreground sáng hơn; shadow chuyển sang gốc đen.

---

## 11. Components (19)

Mỗi component có card tham chiếu trong `preview/` (hiển thị Light + Dark).

### Buttons
- **3 kích cỡ × 6 variant × 3 kiểu.**
- Kích cỡ: **Small 36px · Medium 44px · Large 52px** (padding & font tăng dần).
- Variant: **Chính** (gold, nền `--brand-gold`, chữ navy) · **Phụ** (navy) · **Outline** (nền trắng, viền `--border-strong`) · **No line** (trong suốt) · **Disabled** (`--neutral-200`) · **Xem thêm** (text gold + chevron).
- Kiểu: text · text+icon · icon-only. Icon Lucide, gap 8px. Bo góc ~8px. **Hover:** đậm 1 cấp. **Press:** `scale(0.98)`.

### Inputs
Label · ô input · hint/lỗi. Loại: text, icon trái, icon phải (clearable), select. Trạng thái: Default · Focus (viền gold + ring) · Hợp lệ (xanh) · Lỗi (đỏ) · Disabled. Bo `--radius-md`, viền `--border-default` 1.5px.

### Datepicker
Chọn ngày với lịch tháng, ô input kèm icon calendar; ngày chọn nền gold, hôm nay có viền, ngày ngoài tháng mờ.

### Controls
Checkbox (tick gold), Radio (chấm gold), Toggle (bật = gold). Hit target ≥ 20px.

### Card
Nền trắng + viền `--border-default` 1px + shadow nhẹ (`sm`/`md`), bo `--radius-lg`. Không dùng card viền-trái màu.

### Badges & Chips
Badge: pill nhỏ 12px Bold, tone gold/navy/green/blue/red, có thể kèm icon. Chip: filter pill 13px, active (navy) / default, removable (icon ×).

### Avatar
Ảnh tròn (`object-fit: cover`) hoặc fallback initials (nền `--gold-100`, chữ `--gold-700`) / icon User. Cỡ Small 28 · Medium 32 · Large 40px. Ring gold tùy chọn; badge chấm đỏ góc phải dưới.

### Alerts
4 loại Success · Warning · Error · Info: icon trái + tiêu đề + mô tả, nền nhạt + viền cùng tông semantic.

### List
Hàng có icon-box (40px) + tiêu đề + phụ đề + trạng thái + chevron, nằm trong card có shadow.

### Table
Bảng dữ liệu đơn/tracking: header nền `--surface-sunken`, hàng viền `--border-subtle`, hover nhấn nhẹ, cột trạng thái dùng badge, số liệu canh phải.

### Anchor
Điều hướng nội trang: link dọc/ngang, mục active tô gold, hover gạch chân.

### Breadcrumb
Chuỗi điều hướng phân cấp, separator chevron, mục cuối là trang hiện tại (đậm, không link).

### Collapse
Accordion mở/gập: header có chevron xoay, nội dung ẩn/hiện mượt.

### Dropdown & Menu
Item 14px, hover nền `--gold-50`, separator, item danger màu đỏ, hỗ trợ icon + shortcut.

### Popup & Modal
- **Popup / Tooltip:** bong bóng nhỏ nền tối hoặc trắng, mũi tên chỉ hướng.
- **Modal / Dialog:** bo `--radius-xl`, shadow `xl`, scrim `--surface-overlay`, icon tròn + tiêu đề + mô tả + 2 nút.

### Drawer
Panel trượt từ cạnh (thường bên phải): header + nội dung + footer nút, scrim navy phía sau, đóng bằng × hoặc click scrim.

### Progress (máy bay)
Theo dõi hành trình đơn hàng — máy bay (`assets/airplane.svg`, tone gold) làm indicator dừng tại từng mốc. Biến thể: Basic · Steps (số) · Timeline · Dashed (+ disabled) · Curved/Wave (máy bay xoay theo tiếp tuyến) · Vertical. Trạng thái mốc: Default · Active (glow đập) · Completed (tick) · Disabled (dashed).

---

## 12. Iconography

- Bộ icon: **Lucide** (outline, stroke ~1.75–2px, 24×24), dùng `currentColor`.
- Kích thước: 16px (dày đặc) · 20px (button/input) · 24px (nav/feature).
- Không dùng emoji. CDN: `https://unpkg.com/lucide@latest`.

---

## 13. Logo & Favicon

**Logo lockup** (`assets/`) — 3 thương hiệu × 3 nền (color / black / white):
- `logo-txm*.png` — TIXIMAX.
- `logo-indo*.png` — TIXIMAX Indonesia.
- `logo-phil*.png` — TIXIMAX Philippines.
- Vector: `tiximax-logo-light/white/navy.svg`, spark `tiximax-mark.svg`.

**Favicon / app icon** (`assets/`):
- `favicon.svg` — tia sáng vàng nền navy bo góc (chính).
- `favicon-light.svg` — nền trắng, cho UI chrome tối.
- `favicon-mark.svg` — chỉ tia sáng, nền trong suốt.

> Tia sáng vàng là dấu hiệu nhận diện — không vẽ lại bằng icon khác.

---

*Xuất từ TIXIMAX Design System · 2026*
