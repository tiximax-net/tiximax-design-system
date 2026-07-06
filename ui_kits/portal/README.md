# TIXIMAX — Portal UI Kit

High-fidelity recreation of the TIXIMAX **customer order & tracking portal** (the logged-in app where customers create buy-on-behalf orders, pay, and track shipments).

> ⚠️ No real product/Figma was provided — this is a brand-consistent interpretation, not a pixel copy of a live TIXIMAX app.

## Run
Open `index.html`. Loads `../../colors_and_type.css` + Lucide from CDN. Starts on the login screen — click **Đăng nhập** to enter the app.

## Files
| File | Components |
|---|---|
| `ui.jsx` | Primitives: `PLogo`, `PButton`, `PIcon`, `PStatus` (status pills), `pUseLucide` |
| `screens.jsx` | `Sidebar`, `Topbar`, `StatCard`, `Dashboard`, `OrderTable` + `ORDERS` mock data |
| `screens2.jsx` | `OrderDrawer` (tracking timeline), `CreateOrder` (quote form), `Login` |
| `app.jsx` | Auth gate + sidebar routing + drawer state |

## Interactions
- **Login** → dashboard.
- **Sidebar** → switch between Tổng quan / Đơn hàng / Tạo đơn mua hộ (others are labelled placeholders).
- **Click an order row** → right-side drawer with the shipment journey timeline.
- **Tạo đơn mua hộ** → quote-request form.

## Notes
- `PStatus` covers: delivered, shipping, warehouse, processing, late.
- All copy is Vietnamese. Icons are Lucide outline (substitution).
