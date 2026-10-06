# Beams & Braces V2 — Project Rules

These are hard rules. Follow them in every session that touches this folder.

## Scope

- This folder (`C:\Users\cassc\Documents\Claude\BB V2`) is the ONLY place B&B V2 work happens.
- A chat working on B&B V2 works on B&B V2 exclusively. Never touch, read from, or copy into any other project (including the original `Downloads\puure-digital\bandb website`) unless the user explicitly asks.

## Source of truth

- `BRAND-GUIDELINES.md` holds the verified facts and visual system. Read it before any copy or visual edit.
- `SITE-REBUILD-BRIEF-DRAFT.md` is the rebuild direction (draft).
- `reference/` holds the client PDFs (Darren's brief, Trex UK update). They are newer than the markdown docs and win on conflicts, except the locked colour lineup below.
- Never invent a number, colour, credential, review, or quote. If a fact isn't in `BRAND-GUIDELINES.md`, ask.

## Copy

- CTA language is "Let's Chat". Never "Get a Free Quote" or other quote framing.
- "Request Free Samples" links go to `/contact`, never Trex's shop.
- Trex boards are single-face embossed with a grooved edge. Never call them dual-sided or reversible.
- Only the 8 curated real reviews. Never fabricate or reword one onto a real name.
- **Colour lineup is locked as it currently is on the site.** Do not add, remove, rename, or reassign any colour, including Enhance Basics (Clam Shell, Tide Pool). This overrides any PDF or brief that lists a different count (e.g. "11 colours"). Current lineup:
  - Signature: Ocracoke, Whidbey
  - Transcend: Jasper, Biscayne, Rainier, Carmel, Island Mist
  - Enhance Naturals: Foggy Wharf, Rocky Harbor, Toasted Sand, Calm Water
  - Enhance Basics: Clam Shell, Tide Pool
- Never Saddle, Tiki Torch, Spiced Rum, Beach Dune, Slate Haven.
- No location-specific landing pages and no "areas we cover" page.
- Footer legal line verbatim: "Beams & Braces is a trading name of D Gooch Limited (Company No. 04835734)."

## Visual

- Colours only via `--color-*` tokens. Gold text on light backgrounds uses `--color-accent-dark`; `--color-accent` for text only on dark backgrounds.
- Fonts: Fraunces (headings, `<em>` accents) + Cormorant Garamond (everything else, self-hosted in `fonts/`). Never a third typeface.
- Spacing only from the `--sp-*` scale. Radius from `--radius-*`. Fluid type tokens, no hardcoded heading px.
- Named easing curves only, respect `prefers-reduced-motion`, no cursor-driven hover jitter, no font-weight change on hover for fitted text.
- Real board photos for swatches, never flat hex blocks. Square previews stay square.
- One visual system across every page.

## Structure

- Flat `.html` files at the project root. Keep it that way.
