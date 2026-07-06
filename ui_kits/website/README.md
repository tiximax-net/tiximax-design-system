# TIXIMAX — Website UI Kit

High-fidelity recreation of the TIXIMAX **marketing website** house style (gold-on-navy logistics brand).

> ⚠️ No real site/Figma was provided — this is a brand-consistent interpretation built from the logo, fonts, and brand colors, not a pixel copy of a live TIXIMAX page.

## Run
Open `index.html`. It loads `../../colors_and_type.css` for tokens + fonts and Lucide from CDN.

## Files
| File | Components |
|---|---|
| `ui.jsx` | Primitives: `Logo`, `Button`, `Badge`, `Eyebrow`, `Icon`, `useLucide` |
| `sections.jsx` | `Navbar`, `Hero` (with quote-estimate card), `Services`, `Steps`, `Routes`, `CTA`, `Footer` |
| `app.jsx` | Page assembly + interactive `TrackModal` (order-tracking lookup) |

## Interactions
- **Tra cứu** (nav or hero) → opens an order-tracking modal; type any code → shows a shipment timeline.

## Notes
- All copy is Vietnamese (the brand's primary audience).
- Icons are Lucide outline (substitution — see root README ICONOGRAPHY).
