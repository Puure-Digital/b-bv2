---
name: Beams & Braces
description: Luxury modern. Bog oak, oiled brass and Fraunces, executed with a luxury house's restraint.
colors:
  accent: "#B8956A"
  accent-dark: "#8C6E48"
  accent-deep: "#7A5E3B"
  accent-soft: "#D1B48C"
  ink: "#141210"
  dark: "#1E1B17"
  surface: "#FAFAF7"
  surface-2: "#F3F0EB"
  muted: "#6F6358"
  border: "#E3DDD6"
  border-dark: "#34302A"
  dark-text: "#F0EDE8"
  dark-muted: "#A69C91"
  error: "#A1402F"
  logo-backing: "#FFFFFF"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 1.5rem + 5.2vw, 6rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3vw, 4rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  hero:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.5rem + 3.8vw, 4.75rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  subhead:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.15rem, 1.05rem + 0.4vw, 1.4rem)"
    fontWeight: 300
    lineHeight: 1.35
  quote:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.6rem, 1rem + 2.3vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.4rem, 1.2rem + 0.8vw, 2rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title-figure:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.4rem, 1.2rem + 0.8vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.3
  body-lg:
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.02em"
  caption:
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.3
  label:
    fontFamily: "Cormorant Garamond, Garamond, Georgia, serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  none: "0"
spacing:
  sp-1: "4px"
  sp-2: "8px"
  sp-3: "12px"
  sp-4: "16px"
  sp-5: "20px"
  sp-6: "24px"
  sp-8: "32px"
  sp-10: "40px"
  sp-12: "48px"
  sp-16: "64px"
  sp-20: "80px"
  sp-24: "96px"
  sp-32: "128px"
components:
  button-brass:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "54px"
  button-brass-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.dark-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "54px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.dark-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "54px"
  button-ink-hover:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.accent}"
  nav-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.dark-text}"
    height: "84px"
  swatch:
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    size: "88px"
  colour-plate:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    width: "460px"
  review-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "56px"
---

# Design System: Beams & Braces

## Overview

**Creative North Star: "The Quiet Luxury Yard"**

The old Beams & Braces world, bog oak, oiled brass and Fraunces, rebuilt with the restraint of a luxury house. It remembers the timber yard Darren grew up in (dark stained wood, brass fittings, the ledger serif) but speaks the way a high-end maker speaks: one idea per screen, real photography at full scale, credentials stated once and quietly. Nothing shouts. The brass is jewellery, not paint.

Density is low and the rhythm is long. Sections breathe on a fluid section pad of up to 200px, headings sit in light Fraunces at large optical size, and body copy is small, airy Cormorant Garamond. Light and dark alternate deliberately: Limewash and Sawdust Linen grounds for reading, Charred Oak and Bog Oak for photography, the outcome statement and the close. Every surface is square-cut and flat. Depth comes from photographs and from the contrast between light and dark bands, never from shadows or cards.

This world rejects the busy tradesman template: badges, pills, marquees, star rows, floating buttons and card grids.

**Key Characteristics:**
- Balanced light and dark bands, no gradients except photo-protection scrims.
- Fraunces 300 display with one brass italic word; Cormorant Garamond for everything else.
- Brass used only as hairlines, one italic word, filled primary buttons and focus rings.
- Square corners everywhere (0 radius), 1px hairlines, no shadows, no cards.
- Real project photography at full bleed; real board photography for every colour swatch.
- Slow, expo-out motion: the hero settles, photographs unveil, the colour preview crossfades.

## Colors

A warm, near-monochrome timber palette with one metal: four brass tones tuned so brass stays legible on every ground.

### Primary
- **Oiled Brass** (#B8956A): the metal. Fills the primary "Let's Chat" and WhatsApp buttons, draws hairlines on dark grounds, colours the italic accent word in dark-ground headings, and is the focus ring on dark sections. Text use on dark grounds only (6.7:1 on Charred Oak, 2.7:1 on Limewash).
- **Polished Brass** (#D1B48C): the hover state of Oiled Brass fills. Never a resting colour.
- **Aged Brass** (#8C6E48): brass for light grounds. Italic accent words, attribution labels, range dividers, focus rings and link underlines on Limewash (4.5:1). Also the scrollbar thumb.
- **Burnished Brass** (#7A5E3B): brass text on Sawdust Linen, where Aged Brass falls short of AA (5.3:1). Used for the range warranty meta line.

### Neutral
- **Charred Oak** (#141210): primary text on light grounds, the hero and work section ground, the solid nav, the footer, and the text colour inside every brass button.
- **Bog Oak** (#1E1B17): the second dark ground, one step warmer. The outcome band and the closing band.
- **Limewash** (#FAFAF7): the default page ground.
- **Sawdust Linen** (#F3F0EB): the alternate light band, used behind the ranges and colour gallery.
- **Weathered Grain** (#6F6358): secondary text on both light grounds (5.6:1 Limewash, 5.1:1 Sawdust Linen): leads, fact descriptions, swatch names, review counter.
- **Planed Edge** (#E3DDD6): hairlines and dividers on light grounds, and the resting border of review controls.
- **Scorched Edge** (#34302A): hairlines on dark grounds: the solid nav's bottom edge, footer rules, dropdown border, mobile menu dividers.
- **Shaving White** (#F0EDE8): primary text on dark grounds.
- **Ash** (#A69C91): secondary text on dark grounds (6.9:1 on Charred Oak).

### Functional
- **Kiln Red** (#A1402F): form error text and invalid field borders only, never decoration.
- **Logo Plate** (#FFFFFF): the white backing behind the official Trex logo, which is never recoloured. Nowhere else.

### Named Rules
**The Jewellery Rule.** Brass is a hairline, one italic word, a filled primary button or a focus ring. It never fills a section, a panel or a large block of text.

**The Right Brass Rule.** Brass text on Limewash is Aged Brass; on Sawdust Linen it is Burnished Brass; Oiled Brass is text only on Charred Oak or Bog Oak. Picking the brass tone by ground is not optional.

**The Token-Only Rule.** Every colour is a `--color-*` token. Translucent variants of a token (scrims, ghost borders) are that token's RGB at an alpha, never a new hue.

## Typography

**Display Font:** Fraunces (with Georgia, serif), weights 300 and 400, roman and italic, optical size 9 to 144.
**Body Font:** Cormorant Garamond (self-hosted variable font, with Garamond, Georgia, serif), body set at weight 500 with lining numerals.

**Character:** A light, high-contrast old-style serif with a joiner's warmth, set large and quiet, against a clean geometric sans kept small and airy. The serif carries the voice; the sans carries the facts.

### Hierarchy
- **Display** (300, clamp 3rem to 6rem, 1.02, -0.025em): the hero headline only, capped at 12ch, balanced.
- **Headline Large** (300, clamp 2.25rem to 4rem, 1.05, -0.02em): the closing invitation, capped at 13ch.
- **Headline** (300, clamp 2rem to 3.5rem, 1.08, -0.02em): every section heading, balanced.
- **Quote** (300, clamp 1.6rem to 3rem, 1.3, -0.015em): Darren's belief and client reviews, 28 to 30ch.
- **Title** (300, clamp 1.4rem to 2rem, 1.2, -0.01em): range names, work titles, the colour preview name, mobile menu links.
- **Title Figure** (400, same size, 1.3): the bold opening figure of a proof fact ("500+", "Fewer than 5%").
- **Body Large** (400, clamp 1.0625rem to 1.1875rem, 1.7): leads under headings, 44 to 52ch.
- **Body** (400, 1rem, 1.7): running text, 46 to 52ch.
- **Body Small** (500 to 600, 0.875rem, 0.02 to 0.04em): buttons, nav links, text links, footer.
- **Caption** (400, 0.8125rem, 1.3): swatch names, footer base line.
- **Label** (500 to 600, 0.75rem, 0.08 to 0.14em, uppercase): attributions, the credentials line, range meta, colour group names, footer column heads. Labels follow or name content; they never sit above a heading.

### Named Rules
**The One Italic Word Rule.** A heading may carry one `<em>` word in Fraunces italic, coloured brass for its ground. One word, not a phrase, and not in every heading.

**The Two Faces Rule.** Fraunces and Cormorant Garamond only. Sizes come from the fluid `--text-*` tokens; no hardcoded heading sizes.

**The Steady Weight Rule.** Hover never changes font weight. Links answer with an underline or colour shift.

## Layout

A 1320px container with fluid side padding (clamp 20px to 80px). Sections are separated by a fluid section pad (clamp 96px to 200px), and gaps inside layouts use fluid tokens built from the spacing scale (clamp 24px to 128px). All fixed spacing comes from the 4px-based `--sp-*` scale.

Compositions are asymmetric two-column splits on a 12-part logic: 5/6 for the story (portrait photo beside text), 7/5 for the outcome (full-bleed photo beside a Bog Oak panel), 7/5 for section heads (heading left, lead or link right, bottom-aligned), 5/7 for the colour gallery (sticky square preview left, swatch groups right) and 7/5 for the work grid (one tall image spanning two rows). Ranges sit in three equal columns. Full-bleed bands (hero, outcome, work, close, footer) alternate with contained light sections.

Breakpoints: at 1080px the footer drops to three columns; at 960px the nav collapses to a full-screen Charred Oak menu, every split stacks to one column, the colour preview stops being sticky and the tall work image goes landscape; at 600px buttons in the hero and close go full width, the work grid goes single column with portrait crops, swatches shrink to 72px and the belief quote left-aligns.

## Elevation & Depth

Flat. There is no shadow vocabulary. Depth is carried by full-bleed photography, by the alternation of light and dark bands, and by photo-protection scrims (Charred Oak or Bog Oak at graded alpha) that let text sit on images. The only box-shadow declarations in the build are structural: a 1px Scorched Edge line under the solid nav, and a 100vmax spread that extends the Sawdust Linen band to full bleed. Neither reads as elevation.

### Named Rules
**The No-Lift Rule.** Nothing floats. No drop shadows, no raised cards, no hover lift. A surface changes state by border, underline, colour or image scale, never by elevation.

## Shapes

Square-cut throughout (`--radius-none`, 0). Buttons, photographs, swatches, the colour preview plate, review controls, the dropdown and the mobile menu all have hard corners. Form is drawn with 1px hairlines: brass on section tops (ranges, reviews stage), Planed Edge between fact rows, Scorched Edge on dark grounds. Photographs are cropped to fixed ratios (4:5 portrait, 4:3 and 3:2 landscape, 1:1 for board swatches and the colour plate). Arrows are a single thin-stroke SVG drawn as a CSS mask so they take `currentColor`.

## Components

### Buttons
Refined and restrained: a flat rectangle, a word, nothing else.
- **Shape:** square-cut (0 radius), 54px tall (46px in the desktop nav), 32px horizontal padding, 1px border.
- **Brass (primary):** Oiled Brass fill and border with Charred Oak text (6.7:1, AA). "Let's Chat" and "Message me on WhatsApp". Hover moves to Polished Brass.
- **Ghost Light:** transparent with a Shaving White border at 40% and Shaving White text, for secondary actions on dark photography. Hover brings the border to full Shaving White and a faint 8% wash.
- **Ink:** Charred Oak fill with Shaving White text, the primary action on light grounds ("Request Free Samples"). Hover shifts to Bog Oak with Oiled Brass text.
- **Motion:** background, border and colour ease over 300ms on the standard curve. No lift, no scale.

### Text Links
- **Style:** Body Small, 600, with a 1px `currentColor` underline and a trailing masked arrow.
- **Hover:** the underline draws back to 40% width over 500ms (expo out) while the arrow nudges 4px forward. On dark grounds the link is Shaving White.

### Navigation
- **Rest:** fixed, 84px tall (72px under 960px), Shaving White text over a Charred Oak scrim fading from 55% to 0 across the hero photograph.
- **Solid:** after 40px of scroll it becomes solid Charred Oak with a 1px Scorched Edge bottom line (400ms standard ease).
- **Links:** Body Small 500; hover or open draws a 1px Oiled Brass underline left to right (450ms expo out). The Trex dropdown is a Charred Oak panel with a Scorched Edge border, Ash links that brighten to Shaving White, opening on hover (pointer devices), click, and closing on Escape or focus leaving.
- **Mobile:** a "Menu" text button with a two-line SVG opens a full-screen Charred Oak sheet with Title-size Fraunces links on Scorched Edge dividers and a full-width brass button.

### Hero
Full-viewport real photograph with a two-way Charred Oak scrim (from the bottom and from the left). Content sits bottom-left: display headline with one Oiled Brass italic word, a lead at 82% Shaving White, a brass button and a ghost-light button. The foot carries one credentials line in Label style on an Oiled Brass hairline at 55%. On load the photo settles from 1.06 scale over 2600ms and the content rises 18px in a 120ms stagger.

### Proof Facts
A stacked list divided by Planed Edge hairlines: a Title Figure in Charred Oak ("500+") followed by a Weathered Grain sentence. Proof is stated as specifics in running type, never as badges or stat tiles.

### Colour Gallery (Signature Component)
- **Preview plate:** a square (1:1) real board photograph up to 460px (360px on small screens), sticky beside the swatches, with the colour name in Title and its range in Weathered Grain below.
- **Swatches:** 88px square real board photographs (72px under 600px), the name in Caption below. Hover draws a 1px Planed Edge outline 4px out; the selected swatch (`aria-pressed="true"`) takes a Charred Oak outline and Charred Oak name.
- **Crossfade:** choosing a swatch preloads the board, fades the plate to 0 with a 1.02 scale (350ms standard, 900ms expo out), swaps the image and fades back. The name updates via a polite live region.
- **Groups:** each range collection is named by a Label in Charred Oak over an Aged Brass hairline at 35%.

### Reviews Carousel
A single quote at a time in Quote type on an Aged Brass hairline, the reviewer in an Aged Brass Label. Square 56px controls with a 1px Planed Edge border (Charred Oak on hover) hold SVG arrows either side of a tabular "1 / 8" counter. Slides crossfade over 600ms. Without script every review is readable in sequence.

### Scroll Unveil
Section photographs (`reveal-media`) open with a clip-path wipe from top to bottom over 1400ms while the image settles from 1.08 scale over 1800ms, both expo out, triggered once at 20% visibility. Work images scale 1.035 over 1400ms on hover.

### Footer
Charred Oak ground, Ash text, Shaving White links that turn Oiled Brass on hover, Oiled Brass Label column heads, Scorched Edge hairlines inset to the container. The Trex partner logo sits on its own small white box. The legal line reads verbatim: "Beams & Braces is a trading name of D Gooch Limited (Company No. 04835734)."

### Focus
A 1px ring offset 4px: Aged Brass on light grounds, Oiled Brass inside the nav, work, close and footer.

## Do's and Don'ts

### Do:
- **Do** set brass text on Limewash in Aged Brass (#8C6E48) and on Sawdust Linen in Burnished Brass (#7A5E3B); use Oiled Brass (#B8956A) for text only on Charred Oak or Bog Oak.
- **Do** put Charred Oak (#141210) text on every brass button (6.7:1, AA).
- **Do** keep every corner square (`--radius-none`) and every divider a 1px hairline.
- **Do** use real board photographs for every colour swatch and keep the swatches and the preview plate square.
- **Do** take all spacing from the `--sp-*` scale and all type sizes from the fluid `--text-*` tokens.
- **Do** animate with the named curves only (`--ease-out-expo`, `--ease-std`) and gate entrance motion behind `prefers-reduced-motion: no-preference`.
- **Do** draw arrows and chevrons as thin-stroke SVG (the arrow is a CSS mask so it inherits `currentColor`).
- **Do** keep the white box behind the Trex logo; it is required.
- **Do** keep the CTA wording "Let's Chat" and "Message me on WhatsApp".

### Don't:
- **Don't** put a kicker or eyebrow above a heading. Uppercase labels only follow content (attributions, meta) or name a group.
- **Don't** use Unicode glyphs as icons (arrows, stars, checkmarks, chevrons).
- **Don't** recolour, crop or remove the white box from the Trex logo.
- **Don't** add shadows, cards, rounded corners, pills, badges, star rows, marquees or floating buttons.
- **Don't** use Oiled Brass as text on Limewash or Sawdust Linen (2.7:1).
- **Don't** introduce a third typeface or change font weight on hover.
- **Don't** show a colour as a flat hex block, or crop a square board preview to another ratio.
- **Don't** add cursor-driven hover motion (tilt, magnetic, parallax-on-pointer).
