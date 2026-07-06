---
name: tiximax-design
description: Use this skill to generate well-branded interfaces and assets for TIXIMAX (Vietnamese international buy-on-behalf & shipping logistics brand, with TIXIMAX Indonesia & Philippines storefronts), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here
- `README.md` — brand context, voice & tone, visual foundations, iconography, component inventory, manifest.
- `DESIGN_SYSTEM.md` / `design.md` — full token + component spec (Vietnamese).
- `colors_and_type.css` — all design tokens (color ramps, semantic + text colors, type scale + classes, radius, spacing, shadow) **plus dark-theme overrides**. Import in every artifact.

- `assets/` — logo lockups for TIXIMAX / Indonesia / Philippines (color/black/white), spark mark, favicons, `airplane.svg`.
- `preview/` — design system reference cards (Brand, Colors, Type, Spacing/Radius/Shadow, 19 components), each shown Light + Dark.
- `ui_kits/website/` and `ui_kits/portal/` — React/JSX component recreations + runnable `index.html`.

## Brand at a glance
- **Surfaces:** white-forward — pure white cards `#FFFFFF` on cool off-white `#F5F7FA`. Navy is an accent band, not the dominant surface.
- **Colors:** gold `#F4B931` (primary/CTA), yellow `#F7B82D` (highlight), navy `#264F91`, blue `#006FBB` (info/links), green `#008148` (success), red `#EB5635` (energy/error). Each has a full 50→900 ramp.
- **Light + dark:** fully dual-mode — add `class="dark"` / `[data-theme="dark"]` on any container to flip all tokens.
- **Type:** Montserrat (headings), Inter (body/UI/sans/display), Noto Sans JP (Japanese). Copy primarily Vietnamese; Japanese supported. **Responsive:** `--fs-*` tokens auto-scale at Tablet (≤1024px) and Mobile (≤767px) — no manual media queries needed.
- **Feel:** premium, trustworthy logistics. Soft navy-tinted shadows, gold CTA glow, medium radii, Lucide outline icons, airplane order-tracking motif. Reassuring, concrete copy (real numbers). No emoji.
- **19 components:** Alerts, Anchor, Avatar, Badges, Breadcrumb, Buttons, Card, Collapse, Controls, Datepicker, Drawer, Dropdown, Inputs, List, Menu, Modal, Popup, Progress, Table.
