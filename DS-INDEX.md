# ⚙️ Design system này build bằng tool `ds-index`

**`index.html` là FILE SINH RA — ĐỪNG sửa trực tiếp** (mọi thay đổi sẽ bị ghi đè khi rebuild).

## Rebuild preview index
```bash
node .claude/tools/ds-index/index.mjs list                 # xem key các brand (registry.json)
node .claude/tools/ds-index/index.mjs build <brand-key>    # build 1 brand
node .claude/tools/ds-index/index.mjs build --all          # build tất cả
```

## Sửa ở đâu (nguồn chân lý)
- `ds.manifest.json` — meta brand + danh sách section. Section có `"template":"<key>"` → tool tự sinh (config trong `brand.brandKit`); không thì đọc `sections/<id>.html`.
- `sections/*.html` — nội dung section CHƯA template hoá.
- `tokens.css` — token brand + block **CONTRACT** map sang tên chuẩn (`--brand-primary/--surface-*/--text-*/--border-*`…). Xem `design-thinking/design-system/TOKENS_CONTRACT.md`.
- `ds-index.css` — CSS component demo RIÊNG brand.

## Dùng chung — symlink, KHÔNG sửa ở brand
`showcase.css` (chrome/sidebar) · `showcase.js` (toggle theme + ngôn ngữ).

## Đa ngôn ngữ (i18n)
Toggle ngôn ngữ đổi text qua từ điển `.claude/tools/ds-index/i18n.json` + `data-i18n`. Mở rộng dịch = thêm key vào i18n.json.

📖 Chi tiết: `.claude/tools/ds-index/README.md` · Memory: `shared-design-system`.
