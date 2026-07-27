# 7. Khởi tạo project (scaffold)

> Ghi lại việc **dựng khung code** từ tài liệu §1–§6. Giai đoạn này **chưa có business logic** — chỉ cấu trúc thư mục, toolchain và các stub để đội phát triển bắt đầu. Ngày dựng: 2026-07-27.

## 7.1. Quyết định

| Chủ đề | Quyết định | Lý do |
|---|---|---|
| Vị trí code | Toàn bộ Express gom trong `tiximax-express/` (docs + prototype + apps + services); web app ở `tiximax-express/apps/express-web/` | Tách hẳn khỏi package `@tiximax/design-system` ở root; sẵn sàng thêm `apps/express-mobile`, `apps/ops-portal` sau |
| Frontend | Vite + React 18 + TypeScript + Zustand + react-router-dom | Theo đề xuất §3.4; React 18 khớp design-system hiện có |
| Backend | npm-workspaces, chia service theo domain (§3.5); gateway là health-server thuần Node | Framework (NestJS…) chốt khi bắt đầu logic (§3.9) — skeleton giữ framework-agnostic |
| Design tokens | Import `colors_and_type.css` (alias `@tiximax/tokens`) | Nguồn chân lý UI (ADR-5); chưa trích component React (việc §3.9 bước 1) |
| Package manager | npm | Khớp `package-lock.json` sẵn có ở root |

## 7.2. Cấu trúc thư mục

```
tiximax-design-system/            (root = package @tiximax/design-system — giữ nguyên)
├─ colors_and_type.css            design tokens dùng chung (Express import qua đây)
├─ src/ · preview/ · ui_kits/ …   design-system (không thuộc Express)
└─ tiximax-express/               ⟵ TOÀN BỘ ứng dụng Express gom ở đây
   ├─ docs/                        tài liệu (file này)
   ├─ UI-TXM-Express/              prototype HTML tham chiếu
   ├─ apps/
   │  └─ express-web/              Web app khách hàng (Vite React TS)
   │     ├─ src/
   │     │  ├─ main.tsx · router.tsx
   │     │  ├─ components/         AppLayout (top-nav + theme), PagePlaceholder
   │     │  ├─ features/           booking · shipments · tracking · chat (placeholder)
   │     │  ├─ store/              zustand (useThemeStore)
   │     │  ├─ lib/api · lib/i18n  client stub · i18n reserved
   │     │  ├─ types/              interface theo §4 (chỉ kiểu, không logic)
   │     │  └─ styles/             CSS shell trên nền tokens
   │     └─ vite.config.ts · tsconfig*.json · .env.example
   └─ services/                    Backend skeleton (npm workspaces)
      ├─ gateway/                  health-server chạy được (GET /health)
      └─ auth · booking · pricing · tracking · chat · media · notification · ops
                                   (mỗi service: package.json · tsconfig · src/index.ts stub · README)
```

> Express import tokens từ `../../colors_and_type.css` (design-system ở root) — `repoRoot`
> trong `vite.config.ts` trỏ lên 3 cấp. Nếu tách `tiximax-express/` thành repo riêng, cần
> mang theo `colors_and_type.css` (hoặc publish design-system thành package npm).

Ánh xạ service ⟶ FR: xem [§3.5](03-kien-truc-he-thong.md) và [services/README.md](../services/README.md).

## 7.3. Chạy dự án

```bash
# Frontend
cd tiximax-express/apps/express-web
npm install
cp .env.example .env
npm run dev            # http://localhost:5174
npm run build          # đã verify build OK
npm run typecheck      # đã verify pass

# Backend
cd tiximax-express/services
npm install
npm run dev:gateway    # http://localhost:4000/health -> {"status":"ok"}
npm run typecheck      # tsc -b, đã verify pass
```

## 7.4. Trạng thái verify (2026-07-27)

| Kiểm tra | Kết quả |
|---|---|
| `apps/express-web` — `npm install` | OK (71 packages) |
| `apps/express-web` — `typecheck` | ✅ pass |
| `apps/express-web` — `build` | ✅ pass (tokens + font bundle OK ⇒ tích hợp design-system chạy) |
| `services` — `npm install` | OK (workspaces) |
| `services` — `typecheck` (`tsc -b`) | ✅ pass |
| `services/gateway` — health | ✅ `GET /health` → `{"status":"ok","service":"gateway"}` |

## 7.5. Việc chưa làm (theo đúng phạm vi "chưa business logic")

- Toàn bộ domain logic: booking wizard, pricing, tracking state-machine, chat — hiện là **placeholder/stub**.
- Chưa trích component React từ design-system (mới import tokens CSS).
- Chưa chọn framework backend & chưa có DB/queue/object-storage (§3.2).
- Chưa có i18n, auth, thanh toán (đúng lộ trình §6.5).

## 7.6. Nợ kỹ thuật / lưu ý đã biết

- **npm audit (frontend):** cảnh báo esbuild/vite ([GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)) — **chỉ ảnh hưởng dev server**, không ảnh hưởng bản build production. Vá triệt để cần nâng Vite 8 (breaking). → **để chủ dự án quyết** trước khi nâng.
- **Máy trạng thái đơn** vẫn là câu hỏi mở §6.3(1) (mobile 6 vs web 7). `types/index.ts` hiện dùng nhãn rút gọn; cần chốt trước khi làm tracking/booking logic.
