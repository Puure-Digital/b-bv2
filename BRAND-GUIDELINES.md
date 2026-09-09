# Beams & Braces — Website Brand Guidelines

Internal reference for keeping every page visually consistent. All tokens below are defined once in `style.css` (`:root`) and reused by `services.css`. When building a new page or component, pull from this list rather than inventing a new value — that's exactly the inconsistency this doc exists to prevent.

## Colour

| Token | Hex | Use for |
|---|---|---|
| `--color-ink` | `#141210` | Primary body/heading text on light backgrounds |
| `--color-surface` | `#FAFAF7` | Default page/section background (warm white) |
| `--color-surface-2` | `#F3F0EB` | Secondary/alternating section background, card fills |
| `--color-accent` | `#B8956A` | **Backgrounds, borders, icons, and text on dark surfaces only** — see contrast rule below |
| `--color-accent-dark` | `#8C6E48` | **Accent-coloured text on light surfaces** (eyebrows, tags, links, hover states) |
| `--color-muted` | `#776A5E` | Secondary/supporting text (captions, body copy that isn't the primary message) |
| `--color-border` | `#E3DDD6` | Hairline borders, dividers on light backgrounds |
| `--color-dark` | `#1E1B17` | Dark section backgrounds (footer, featured banners, CTA sections) |
| `--color-dark-text` | `#F0EDE8` | Primary text on dark backgrounds |
| `--color-dark-muted` | `#7A7168` | Secondary text on dark backgrounds |

### The contrast rule (read this before using accent as text colour)

`--color-accent` (#B8956A) has a contrast ratio of only **~2.8:1** against `--color-surface`/`--color-surface-2` — well under the WCAG AA minimum of 4.5:1 for text. That's why headings, tags, and labels using it directly on a white/cream background go faint and hard to read.

- **On a light background** (surface, surface-2, or any white/cream card): use `--color-accent-dark` for any text, including small caps labels, tags, link text, and hover states. It carries the same warm gold identity at ~4.7:1 contrast, which passes.
- **On a dark background** (ink, dark, or a photo with a dark overlay): `--color-accent` is fine and preferred — it reads more vibrant against dark surfaces and is what gives the brand its "warm gold on near-black" moments (hero italics, footer icons, CTA banners).
- **Borders, icons, and decorative elements** are held to a lower bar and can still use `--color-accent` on light backgrounds if the surrounding design calls for it (e.g. button borders) — this rule is specifically about **text you're expected to read**.

If you're ever unsure which to reach for, check the background it's sitting on first, then pick the colour from the row above.

## Typography

- **Display face**: `Fraunces` (serif) — headings only, plus the odd emphasized inline word (`<em>`).
- **UI face**: `Plus Jakarta Sans` — everything else: body copy, labels, nav, buttons, captions.
- Never introduce a third typeface. Never set body copy in Fraunces or a heading in Plus Jakarta Sans.

Type scale (all fluid via `clamp()`, don't hardcode pixel sizes for headings):
`--text-display` → `--text-h1` → `--text-h2` → `--text-h3` → `--text-body-lg` → `--text-body` → `--text-sm` → `--text-label`

## Spacing & Layout

Use the `--sp-*` scale (4px base unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128) for all margin/padding/gap — never a raw pixel value that isn't on this scale. `--container` (1240px) and `--container-pad` govern page width; `--section-pad` governs vertical rhythm between sections.

## Radius

`--radius-sm` (6px) small chips/buttons · `--radius-md` (10px) cards, swatches · `--radius-lg` (14px) larger panels, preview images · `--radius-xl` (20px) hero-scale elements.

## Motion

- Easing curves are named and specific — never plain `ease` or `linear`: `--ease-out-expo` (cinematic deceleration), `--ease-spring` (slight overshoot, buttons), `--ease-std` (default transitions).
- Respect `prefers-reduced-motion` on every animated component — check the existing pattern in `script.js`'s scroll-reveal system before adding new motion.
- **No hover-triggered position jitter.** A past cursor-parallax effect on hero images (moving the background image a few px on every mouse move) was removed because it read as unintentional shakiness rather than a deliberate effect — if a hero should feel alive, prefer a slow ambient animation (like the existing `svcHeroDrift` keyframe) over anything driven by cursor position.
- **Don't change font-weight on hover/active state for anything sized to fit its container** (swatch labels, tags, pills). A weight change shifts text width and can force a wrap that wasn't there a moment ago. Vary colour or background instead, and keep weight constant.

## Known-good patterns

- **Product colour swatches** (`trex-signature.html`, `trex-transcend.html`, `trex-enhance-naturals.html`): real photo thumbnails via `.colour-swatch`, not flat hex colour blocks — a flat colour never matches the real board. Preview panel is a true 1:1 square to match the source photos' native aspect ratio; never stretch a square photo into a wide rectangle.
- **Dark vs light sections**: the site alternates `--color-surface`/`--color-surface-2` light sections with `--color-dark`/`--color-ink` dark sections (hero, featured stats, CTA banners, footer). When adding a new section, decide light-or-dark first, then pick every colour token from the matching column above — don't mix a dark-section token into a light section or vice versa.

## Open item

This doc was written to fix a concrete bug (accent-coloured headings unreadable on white) and capture the fix as a rule going forward. It is **not** yet a full page-by-page audit for overall design continuity — that's a separate, larger pass still to be done (see the project memory / punch list from 2026-09-09).
