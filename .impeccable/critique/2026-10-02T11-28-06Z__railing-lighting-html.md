---
target: railing and lighting section
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\cassc\\Documents\\Claude\\BB V2\\railing-lighting.html"
target_fingerprint: "sha256:37a3835554af400b5a2b42d67f067ba308c681e14250e13ce76eeb5d2ce508bc"
target_path: "C:\\Users\\cassc\\Documents\\Claude\\BB V2\\railing-lighting.html"
timestamp: 2026-10-02T11-28-06Z
slug: railing-lighting-html
---
# Critique: railing-lighting.html

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Breadcrumb, nav state and anchor links all work. Only screen readers get "Photo coming soon"; sighted visitors see unexplained empty boxes. |
| 2 | Match with the real world | 3 | Plain language, but IP67, 48in and 240V/12V appear with no explanation. |
| 3 | User control and freedom | 3 | Clear exits, a skip link, and the new tab is announced. |
| 4 | Consistency and standards | 2 | Missing the proof, review and FAQ blocks every other product page has. Uses 48in where the rest of the site is metric. |
| 5 | Error prevention | 2 | "Fitted as standard" (line 124) contradicts "I'll price it in" (line 182). |
| 6 | Recognition rather than recall | 3 | Products are described in words only; there is nothing to look at. |
| 7 | Flexibility and efficiency | n/a | Single-goal marketing page. |
| 8 | Aesthetic and minimalist design | 2 | Empty boxes make up about 40% of the page below the hero. |
| 9 | Error recovery | 3 | No forms; phone, WhatsApp and contact are all offered. |
| 10 | Help and documentation | n/a | Marketing page. The missing FAQ is counted under issue 4 instead. |
| **Total** | | **21/32** | **Acceptable (66%)** |

Verdict: the voice is authored for Darren, but the page has no visual proof. Five of the six image slots are empty boxes (lines 130, 145, 162, 167, 172). The only photo is the hero, which is reused from the homepage and the Gallery and shows no lighting.

Detector: 11 warnings, all false positives or minor. They include cramped-padding x8 on layout wrappers, an uppercase-text warning on the WhatsApp button, and a warning about Fraunces that conflicts with the locked brand fonts. The overlay's contrast flags were checked and are also false positives (nav text over the dark hero photo).

## Priority issues
- **[P0] Five empty photo slots on a page that sells how things look.** Fix: use real railing and lighting photos. Until then, drop the empty boxes: make the split sections text-only and use real photos on the "related" cards.
- **[P1] Contradictory, unverified pricing claim.** Hero says "fit as standard, not optional extras"; close says "I'll price it in". Fix: say both are planned from the start, and confirm with Darren.
- **[P1] Product specs that no source document confirms.** Charcoal Black, "rods are the option I fit most", glass kits, a gate "up to 48in", Birkdale, 240V to 12V, "no electrician needed", 18 lights per transformer, IP67, 2-year warranty, warm white. Fix: verify each one, or soften or remove it. Record what's confirmed in BRAND-GUIDELINES.md.
- **[P2] No proof before the ask.** No credentials, review or FAQ, unlike the range pages. Fix: add a credentials band and an FAQ, and a review only if a real one mentions railing or lighting.
- **[P2] The hero doesn't show the page's subject.** Reused photo with a vertical-baluster rail and no lights. Fix: a dusk photo showing lights and the railing.

## Persona red flags
- Jordan (first-time visitor): doesn't know the terms "baluster", "infill", "IP67"; can't tell if lighting can be added to an existing deck; can't tell if it costs extra.
- Casey (on a phone): about 2,000px of empty boxes on a 6,957px page. Breadcrumb "Home" is 18px tall; footer links are 21px; the hero text link is 31px.
- Sam (screen reader user): "Photo coming soon" is read out five times. Focus outline is only 1px wide.
- Norfolk waterside homeowner: no glass-versus-rods advice for keeping a view, no waterside project, no mention of the Broads.

## Minor
- Meta and schema say "Norwich's TrexPRO Platinum team", which is not first person.
- h3 headings are the same size as body text.
- Feature titles use Title Case while section headings use sentence case.
- The capacity spec is used as a headline.
- The related card subtitles say very little.
- Trellis isn't mentioned.

## Questions
- Should railing and lighting be woven into each range page instead of having a standalone page?
- Could one real dusk photo do most of the selling?
- Could Darren point to a source for every spec if Trex UK asked?
