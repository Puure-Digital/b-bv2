# Beams & Braces — Brand & Facts Reference

The single source of truth for building this site: who the company actually is, the real numbers/credentials/colours to use, and the visual system to build with. Pulled directly from the live site (`style.css`, `services.css`, and the pages themselves) plus facts confirmed by Darren during the rebuild. If anything here conflicts with a live page, treat the live page as possibly wrong and flag it — this doc should describe what's *true*, not just what's currently written somewhere.

**Client-approved references** (newer than this doc, win on any conflict): `reference/Beams & Braces Brief.pdf` (story, voice, facts brief for Darren's sign-off) and `reference/Beams and Braces website updates (Trex UK).pdf` (partner update to Trex UK). Exception: the colour lineup is locked as it currently is on the site (see Trex product facts), whatever either PDF says.

**Golden rule**: never invent a number, colour, credential, or quote for this site. Every fact below traces back to something real (Companies House, Trex's own UK site/installer profile, Darren directly, or the real Google review page). If you need a fact that isn't here, ask rather than approximate.

---

## Company facts

| Fact | Value |
|---|---|
| Trading name | Beams & Braces |
| Legal entity | D Gooch Limited |
| Company number | 04835734 |
| Owner / face of the business | Darren Gooch |
| Address | 191a Plumstead Road East, Norwich, NR7 9LW |
| Phone | 07983 531860 (`+447983531860` in schema/tel/wa.me links) |
| Email | darren@beamsandbraces.co.uk |
| Domain | beamsandbraces.co.uk |
| Areas served | Norfolk and Suffolk, with recurring emphasis on the Norfolk Broads, heritage properties, holiday homes, and waterside gardens — this is the positioning, not generic "local decking installer" |
| Price positioning | `£££` (premium) — schema `priceRange`, not `££` |

Standard footer/legal line (use verbatim, don't reword): *"Beams & Braces is a trading name of D Gooch Limited (Company No. 04835734)."*

## Credentials & real numbers (never round up, never invent a new stat)

- **TrexPRO Platinum installer since 2017** (verified against Trex's own official "Find a Builder" profile) — Trex's highest certification, held by **fewer than 5% of UK Trex contractors** (per the client brief)
- **Trex Pro Advisory Council member since 2024** — one of the few UK installers Trex consults directly on what's working on the ground
- **500+ composite decks installed since 2016** (the year Darren started doing decking specifically, distinct from the family's timber/joinery business, which goes back to 1987 when Darren was three years old)
- **95% recycled content, every Trex range** (per the client brief)
- **UK's leading curved-deck builder** — some of the largest curved Trex decks installed anywhere in the UK
- **5.0 rating, 10 Google reviews** (current live count on the homepage — verify this number before quoting it elsewhere, it will climb over time)
- Darren personally uses **UC4-rated joists, joist protection tape, and plastic subframes on every job** — a real build-quality detail worth repeating, not marketing fluff

Real timeline (from `about.html` and the client brief, Darren's own story): 1987 parents open the wood yard, Darren is three → 2002 Darren joins the family business the day he finishes school → 2016 Beams & Braces / Trex decking begins → 2017 TrexPRO Platinum → 2024 Trex Pro Advisory Council.

## Real reviews — use only these, never fabricate one

Curated from the real Beams & Braces Google Business profile (D Gooch Sheds & Fencing reviews are a different business/service line and are excluded):

Jeannette Astley-Jones · Dr S J Miller-Smith · Nana · Jason A · Julie · Mark Burgess · Kim Frost · Cherry Brooks

These 8 are reused across pages (homepage, product pages, testimonials page) since only 8 are curated — that's normal practice, not padding. Do not invent a 9th, and do not attach a real name to an invented quote.

## Trex product facts

Darren sells Trex Signature, Trex Transcend, and Trex Enhance (which has two collections within it — Naturals and Basics, not two separate product lines).

| Range | Colours Darren sells | Warranty |
|---|---|---|
| **Signature** | Ocracoke, Whidbey | 50 years |
| **Transcend** | Transcend Lineage: Jasper, Biscayne, Rainier, Carmel. Standard Transcend: Island Mist (Tropicals collection) | 50 years |
| **Enhance Naturals** | Foggy Wharf, Rocky Harbor, Toasted Sand, Calm Water | 25 years |
| **Enhance Basics** | Clam Shell, Tide Pool | 25 years |

Notes:
- **This lineup (13 colours, Basics included) is locked as it currently is on the site.** Don't add, remove, rename, or reassign a colour, even where a PDF says "11 colours" or "three ranges".
- Trex's full UK Enhance Basics range also includes **Saddle** — Darren does not offer it, so it should never appear on this site.
- **Naming (confirmed 2 Oct 2026):** call the Transcend colours "Transcend Lineage". Island Mist is the exception: it is standard Transcend, and the colour pickers tag its swatch "Standard" and explain this in the (i) note.
- Transcend's full Tropicals collection also includes Tiki Torch, and there was once a colour called Spiced Rum on an older version of the site — neither is real/current. Island Mist is the only Tropicals colour Darren sells.
- **Boards are single-face embossed with a grooved edge for hidden fasteners.** They are not "dual-sided" or flippable — this exact wrong claim has been found and removed from the site multiple times, so double-check before writing anything implying two usable faces.
- Board size referenced on product pages: 25 × 140mm.
- Real board photos live in `images/boards/<Range>/<colour>.png|jpg` (Enhance further splits into `Naturals/` and `basics/` subfolders) — always use the real photo as the swatch/preview image, never an approximated hex colour (see Visual identity → Known-good patterns below for why).

## Railing & lighting facts

Sources supplied by Cassian on 5 Oct 2026: Trex UK's Signature railing page (uk.trex.com/products/railing/signature) and Birkdale's Ellumière collection (birkdalesales.com/collections/all-ellumiere). Use only what is below; anything else needs checking first.

**Trex Signature railing**
- Powder-coated aluminium rails that resist fading and corrosion; described by Trex as low-maintenance.
- Three matte finishes: Charcoal Black, Bronze, Classic White. Glass railing is Charcoal Black only.
- Infill: square or round aluminium balusters, or glass panels. (A "rail and rod kit" is listed as a component, but horizontal rod infill isn't described, so don't claim it.)
- Available as curvable hand railing, in the same three finishes.
- Aluminium gates are listed by Trex as a matching product.
- Backed by Trex's 50-year Limited Warranty.
- Trex lists imperial post and rail sizes; don't quote them on this metric UK site.

**Ellumière lighting (supplied through Birkdale)**
- Small and large spotlights, deck lights (set into the boards) and bollard lights, in black or stainless steel.
- One 100W outdoor transformer, 240V AC to 12V DC; starter kits pair four lights with it.
- Replacement bulbs are 12V warm white.
- Not stated by the source, so never claim: IP rating, warranty length, lights per transformer, or that no electrician is needed.

## Content & voice rules

- **No location-specific landing pages** (e.g. "composite decking Norwich") and no dedicated "areas we cover" page. This mirrors Darren's own preference and how his own site is structured — geography lives as natural mentions in body copy instead.
- **CTA language is "Let's Chat," never "Get a Free Quote."** Darren has explicitly objected to quote-framing language.
- **"Request Free Samples" links go to `/contact`**, never to Trex's own paid sample checkout (`uk.trex.com/shop`) — Darren arranges samples personally.
- **Never fabricate a testimonial, review, or statistic**, and never attach an invented quote to a real named reviewer, even loosely worded. This site previously had real, serious fabrication problems (invented names, invented UK towns, non-existent product colours in testimonials, and fabricated review schema) that were all removed — don't reintroduce anything in that direction.
- Fencing and garden rooms are real services but deprioritized (low enquiry volume through this site) — don't remove them, but don't over-invest in them either without being asked.

## Lead capture (current real setup — verify before calling this "unsolved")

`contact.html` currently has **two live paths**, not zero:

1. **WhatsApp**: a direct link to `https://wa.me/447983531860`, styled as the primary CTA ("Message Me on WhatsApp").
2. **A multi-step form** (`.quote-form-embed`) that collects service type, name, phone, email, and postcode, then POSTs as JSON to a LeadConnector/GoHighLevel webhook (`https://services.leadconnectorhq.com/hooks/Axt4G21iCMs3IB0wkLjD/webhook-trigger/...`) before redirecting to `/thank-you`.

Both exist in the live code today. What's still unconfirmed: whether that webhook is actively monitored/connected to a working CRM pipeline on Darren's end, and which of the two paths he actually wants to lead with. Don't assume this is a from-scratch backend decision — it's a "verify and possibly simplify" task, not a "build" task.

## Current site map

Flat structure at the project root (no subfolders per section):

`index.html` · `about.html` · `contact.html` · `work.html` · `railing-lighting.html` · `trex.html` (hub) · `trex-signature.html` · `trex-transcend.html` · `trex-enhance-naturals.html` · `privacy-policy.html` · `terms.html` · `thank-you.html`

Nav labels: **Trex Decking** (dropdown to the hub + 3 range pages) · **Our Work** · **Railing & Lighting** · **About** · **Let's Chat** (primary CTA, always visible).

## Brand assets

- Logo: `images/shared/logo-dark.png` — **this is currently the only logo file**, even though the nav markup has separate `nav-logo-img--white` and `nav-logo-img--dark` classes implying two variants should exist. Worth producing a true light/white-mark variant if the nav is ever placed over a light, non-overlaid background.
- Favicon: `images/shared/favicon.png`
- Trex partner logo: `images/shared/trex-logo.png` — an official Trex asset, keep unmodified, don't recolour or crop it.

---

## Visual identity

### Colour

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

#### The contrast rule (read this before using accent as text colour)

`--color-accent` (#B8956A) has a contrast ratio of only **~2.8:1** against `--color-surface`/`--color-surface-2` — well under the WCAG AA minimum of 4.5:1 for text. That's why headings, tags, and labels using it directly on a white/cream background go faint and hard to read.

- **On a light background** (surface, surface-2, or any white/cream card): use `--color-accent-dark` for any text, including small caps labels, tags, link text, and hover states. It carries the same warm gold identity at ~4.7:1 contrast, which passes.
- **On a dark background** (ink, dark, or a photo with a dark overlay): `--color-accent` is fine and preferred — it reads more vibrant against dark surfaces and is what gives the brand its "warm gold on near-black" moments (hero italics, footer icons, CTA banners).
- **Borders, icons, and decorative elements** are held to a lower bar and can still use `--color-accent` on light backgrounds if the surrounding design calls for it (e.g. button borders) — this rule is specifically about **text you're expected to read**.

If you're ever unsure which to reach for, check the background it's sitting on first, then pick the colour from the row above.

### Typography

- **Display face**: `Fraunces` (serif) — headings only, plus the odd emphasized inline word (`<em>`).
- **UI face**: `Cormorant Garamond` (self-hosted in `fonts/`) — everything else: body copy, labels, nav, buttons, captions.
- Never introduce a third typeface. Never set body copy in Fraunces or a heading in Cormorant Garamond.

Type scale (all fluid via `clamp()`, don't hardcode pixel sizes for headings):
`--text-display` → `--text-h1` → `--text-h2` → `--text-h3` → `--text-body-lg` → `--text-body` → `--text-sm` → `--text-label`

### Spacing & Layout

Use the `--sp-*` scale (4px base unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128) for all margin/padding/gap — never a raw pixel value that isn't on this scale. `--container` (1240px) and `--container-pad` govern page width; `--section-pad` governs vertical rhythm between sections.

### Radius

`--radius-sm` (6px) small chips/buttons · `--radius-md` (10px) cards, swatches · `--radius-lg` (14px) larger panels, preview images · `--radius-xl` (20px) hero-scale elements.

### Motion

- Easing curves are named and specific — never plain `ease` or `linear`: `--ease-out-expo` (cinematic deceleration), `--ease-spring` (slight overshoot, buttons), `--ease-std` (default transitions).
- Respect `prefers-reduced-motion` on every animated component — check the existing pattern in `script.js`'s scroll-reveal system before adding new motion.
- **No hover-triggered position jitter.** A past cursor-parallax effect on hero images (moving the background image a few px on every mouse move) was removed because it read as unintentional shakiness rather than a deliberate effect — if a hero should feel alive, prefer a slow ambient animation (like the existing `svcHeroDrift` keyframe) over anything driven by cursor position.
- **Don't change font-weight on hover/active state for anything sized to fit its container** (swatch labels, tags, pills). A weight change shifts text width and can force a wrap that wasn't there a moment ago. Vary colour or background instead, and keep weight constant.

### Known-good patterns

- **Product colour swatches** (`trex-signature.html`, `trex-transcend.html`, `trex-enhance-naturals.html`): real photo thumbnails via `.colour-swatch`, not flat hex colour blocks — a flat colour never matches the real board. Preview panel is a true 1:1 square to match the source photos' native aspect ratio; never stretch a square photo into a wide rectangle.
- **Dark vs light sections**: the site alternates `--color-surface`/`--color-surface-2` light sections with `--color-dark`/`--color-ink` dark sections (hero, featured stats, CTA banners, footer). When adding a new section, decide light-or-dark first, then pick every colour token from the matching column above — don't mix a dark-section token into a light section or vice versa.

## Open items

This doc fixes a concrete visual bug (accent-coloured headings unreadable on white) and consolidates the real company/product facts scattered across past conversations into one place. Still outstanding, not covered by this doc:

1. A full page-by-page design-continuity audit (see the project memory / punch list from 2026-09-09).
2. Deeper railing & lighting content. Note: the client brief's seven-page map doesn't list `railing-lighting.html`, but the Trex UK update commits to expanding it "this week", so the page stays.
3. Weaving the credentials/numbers above into more pages, not just the homepage/about.
4. Deciding whether WhatsApp or the webhook form (or both) should lead, and confirming the webhook is actually being monitored.
5. Sourcing and organizing better real project photography into folders in this working directory.
