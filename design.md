# TIXIMAX — Design Guide (`design.md`)

> Bản hướng dẫn thiết kế đầy đủ cho thương hiệu **TIXIMAX** — dịch vụ mua hộ & vận chuyển quốc tế.
> Dùng làm tài liệu tham chiếu khi dựng giao diện, slide, hoặc tài sản thương hiệu.
>
> **Brand:** vàng `#F4B931` · navy `#264F91` · cam-đỏ `#EB5635` · blue `#006FBB` · green `#008148` — **Font:** headings Source Sans 3, body Inter · JP Noto Sans JP · VI Be Vietnam Pro · Giản thể (zh) Noto Sans SC · Phồn thể (zh-tw) Noto Sans TC
> Tất cả token nằm trong `colors_and_type.css` (import vào mọi artifact).

---

## 0. Brand & Voice

**TIXIMAX** là công ty logistics Việt Nam chuyên **mua hộ & vận chuyển quốc tế** (Nhật, Hàn, Indonesia, Trung Quốc, Mỹ → Việt Nam). Định vị: **uy tín, nhanh, minh bạch**.

- **Tone:** tự tin, trấn an, thực tế — bán "sự an tâm" cho việc mua hàng xuyên biên giới.
- **Xưng hô:** gọi khách là **"bạn"**, gọi công ty là **"TIXIMAX / chúng tôi"**. Ấm áp nhưng chuyên nghiệp.
- **Casing:** Sentence case cho body & button. Wordmark **TIXIMAX luôn viết hoa**. Overline UPPERCASE giãn chữ rộng.
- **Số liệu cụ thể** tạo niềm tin: số ngày giao, giá/kg, tỷ giá, số đơn đã giao.
- **CTA động từ trước:** "Tạo đơn mua hộ", "Tra cứu đơn hàng", "Nhận báo giá".
- **Không dùng emoji** trong UI sản phẩm. Dùng icon thay thế.

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

> Neutral có ám navy nhẹ (cool gray) để hòa với màu thương hiệu.

---

## 3. Color — Semantic

| Vai trò | Màu | Nền | Viền |
|---|---|---|---|
| Success | `#008148` (= brand green) | `#E8F5EE` | `#85CDAC` |
| Warning | `#F4B931` (= brand gold) | `#FEF9EA` | `#FBE19B` |
| Error | `#EB5635` (= brand red) | `#FDF0EC` | `#F3B099` |
| Info | `#006FBB` (= brand blue) | `#E8F4FC` | `#87C7EF` |

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
**Class tiện dụng:** `.ds-display`, `.ds-h1`…`.ds-h4`, `.ds-title`, `.ds-body-lg`, `.ds-body`, `.ds-body-sm`, `.ds-caption`, `.ds-overline`.

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
- **Variants:** Primary (gold + gold glow), Secondary (navy), Outline, Ghost, Danger, Disabled.
- **Họ màu #EB5635:** Solid (shadow đỏ), Soft (`--red-100`), Outline, Ghost, Icon-only.
- **Kích cỡ:** Small (8×14, 13px) · Medium (11×18, 15px) · Large (14×24, 17px).
- **Icon:** leading / trailing / icon-only (sm 15px · md 18px · lg 20px, gap 8px).
- Bo góc `--radius-md`. **Hover:** đậm 1 cấp. **Press:** `scale(0.98)`.

### Input Field
- **Cấu trúc:** label · ô input · hint/lỗi. Bo góc `--radius-md`, viền `--border-default` 1.5px.
- **Loại:** Mặc định (text only), Icon trái, Icon phải (clearable), Date, Time, Select.
- **Trạng thái:** Default · Focus (viền vàng + ring) · Hợp lệ (xanh) · Lỗi (đỏ) · Disabled.

### Card
Nền trắng + viền `--border-default` 1px + shadow nhẹ (`sm`/`md`), bo góc `--radius-lg`. Không dùng card viền-trái màu.

### Badges & Chips
- **Badge:** pill nhỏ 12px Bold. Tone: gold, navy, green, red, solid. Có thể kèm icon.
- **Chip:** filter pill 13px, active (navy) / default, có thể removable (icon ×).

### Alerts
4 loại: Success · Warning · Error · Info. Icon trái + tiêu đề + mô tả, nền nhạt + viền cùng tông.

### Controls
Checkbox (tick vàng), Radio (chấm vàng), Toggle (bật = gold). Hit target ≥ 20px.

### List
Hàng có icon-box (40px) + tiêu đề + phụ đề + trạng thái + chevron, nằm trong card có shadow.

### Popup & Menu
- **Dropdown menu:** item 14px, hover nền `--gold-50`, separator, item danger màu đỏ.
- **Dialog:** bo góc `--radius-xl`, shadow `xl`, icon tròn + tiêu đề + mô tả + 2 nút.

### Progress (máy bay)
Thư viện theo dõi hành trình đơn hàng — máy bay (`assets/airplane.svg`, gold `#D9A300`) làm indicator, dừng tại từng mốc.
- **Biến thể:** Basic · Steps (số) · Timeline · Dashed (+ disabled) · Curved/Wave (máy bay xoay theo tiếp tuyến) · Vertical.
- **Trạng thái mốc:** Default · Active (glow đập) · Completed (tick) · Disabled (dashed).

---

## 10. Iconography

- Bộ icon: **Lucide** (outline, stroke ~1.75–2px, 24×24), dùng `currentColor`.
- Kích thước: 16px (dày đặc) · 20px (button/input) · 24px (nav/feature).
- Không dùng emoji. CDN: `https://unpkg.com/lucide@latest`.
- ⚠️ Lucide là bộ thay thế — nếu TIXIMAX có bộ icon riêng, hãy gửi để swap.

---

## 11. Logo & Favicon

**Logo** (`assets/`):
- `tiximax-logo-light.svg` — chữ tối, nền sáng.
- `tiximax-logo-white.svg` — nền navy/tối.
- `tiximax-logo-navy.svg` — biến thể navy.

**Favicon / app icon** (`assets/`):
- `favicon.svg` — tia sáng vàng trên nền navy bo góc (chính, dùng cho tab / PWA).
- `favicon-light.svg` — nền trắng, cho UI chrome tối.
- `favicon-mark.svg` — chỉ tia sáng vàng, nền trong suốt.

```html
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
```

> Tia sáng vàng là dấu hiệu nhận diện — không vẽ lại bằng icon khác.

---

## 12. Visual Foundations (tóm tắt)

- **Vibe:** gold-on-navy, sạch sẽ, doanh nghiệp ấm — cảm giác logistics cao cấp, không phô trương.
- **Nền:** chủ yếu phẳng. Navy hero có thể thêm **gold radial glow** nhẹ. Tránh gradient tím/xanh, tránh emoji card.
- **Card:** trắng + viền 1px + shadow nhẹ (cả hai, nhẹ).
- **Animation:** nhanh, chức năng — `150–220ms ease-out`. Fade + translate/scale nhỏ. Không bounce, không loop trang trí.
- **Hover:** button đậm 1 cấp; link gạch chân; card nâng shadow + dịch lên ~2px.
- **Press:** `scale(0.98)`, giảm shadow. Không đảo màu.
- **Layout:** nhiều khoảng trắng, max-width ~1200px, sticky nav, xen kẽ band trắng / off-white / navy.
- **Ảnh:** ấm, sáng, đời thực (kiện hàng, kho, khách vui). Không lạnh/stocky.

---

## 13. Index / Manifest

| Đường dẫn | Nội dung |
|---|---|
| `colors_and_type.css` | Toàn bộ token (màu, type, radius, spacing, shadow) + class type. **Import vào mọi file.** |
| `fonts/` | Source Sans 3 (variable + static). |
| `assets/` | Logo (light/white/navy) + favicon (navy/light/mark) + `airplane.svg`. |
| `preview/` | Các card tham chiếu hiển thị trong tab Design System. |
| `ui_kits/website/` | UI kit website marketing (React/JSX + `index.html`). |
| `ui_kits/portal/` | UI kit cổng khách hàng (login → dashboard → drawer + form). |
| `README.md` | Bối cảnh thương hiệu, voice, visual foundations, iconography. |
| `DESIGN_SYSTEM.md` | Bản spec gọn (tương tự file này). |
| `SKILL.md` | Điểm vào dạng Agent Skill. |

### Quick start
```html
<link rel="stylesheet" href="colors_and_type.css">
<!-- dùng var(--brand-gold), class="ds-h1", v.v. -->
```

---

*Xuất từ TIXIMAX Design System · cập nhật 18/06/2026*
