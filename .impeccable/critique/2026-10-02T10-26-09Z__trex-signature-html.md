---
target: Trex pages
total_score: 21
max_score: 32
na_heuristics: 7,9
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\cassc\\Documents\\Claude\\BB V2\\trex-signature.html"
target_fingerprint: "sha256:da5272369bec8f1528dd5af4d02256215f674b0efbc14049fb245bc8fd04495c"
target_path: "C:\\Users\\cassc\\Documents\\Claude\\BB V2\\trex-signature.html"
timestamp: 2026-10-02T10-26-09Z
slug: trex-signature-html
---
# Critique: Trex pages (hub, Signature, Transcend, Enhance)

Score 21/32 (heuristics 7 and 9 n/a), about 66%, Acceptable/Good boundary.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Mobile breadcrumb unreadable over hero; swatch changes off-screen preview on mobile |
| 2 | Match system / real world | 3 | Spec jargon (cap layer, EN 13501, UC4); Enhance vs Enhance Naturals vs Basics naming muddled |
| 3 | User control and freedom | 3 | Signature/Transcend hero has no jump to colours |
| 4 | Consistency and standards | 2 | Process section, headings, TrexPro/TrexPRO, range order, review heading differ per page |
| 5 | Error prevention | 2 | Contradictions: install time; timber-subframe FAQ; duplicate Calm Water/Rocky Harbor photo |
| 6 | Recognition rather than recall | 2 | No comparison view; "Compare the ranges" links to hub without one |
| 7 | Flexibility and efficiency | n/a | Persuade surface |
| 8 | Aesthetic and minimalist design | 3 | Hub range row has 6 CTAs; Enhance repeats itself; empty right half of close band |
| 9 | Error recovery | n/a | No inputs |
| 10 | Help and documentation | 3 | FAQs good, some contradict other pages |

## Design specificity
Visual system authored and consistent with homepage. Content on range pages generic: retailer feature lists, no Darren, no curved decks, no Broads/waterside. Principle "sell Darren, not the material" lost on the most qualified pages.

## Priority issues
- [P0] Truthfulness: calm-water.png and rocky-harbor.png identical; unsourced claims (EN 13501 fire rating, 3.6/4.8m lengths, charcoal railing, "not subcontracted", "most eco-conscious on the market"); Signature "smooth surface option" edges toward dual-face; Transcend "square-edge profile" conflicts with grooved-edge rule; "Zero maintenance" overclaim; install time contradiction; existing timber subframe FAQ undercuts build standard. Fix: verify or remove; get real Calm Water photo. Command: clarify then harden.
- [P1] Imagery thin and reused (Signature hero = overview photo; Transcend hero = hub hero; Enhance hero = hub card); no curved deck anywhere; no range-labelled photos. Fix: one range-true captioned photo per range, curved Transcend deck; drop duplicates meanwhile. Command: distill + photo request.
- [P1] Enhance argues on price ("without the premium price tag", "Priced sensibly", "ditch the timber"), against "filter, don't plead". Fix: reframe as right board for the garden, same build standard. Command: clarify.
- [P2] Three range pages are three variants, not one template. Fix: single range template, process stated once on hub, unify wording/order. Command: polish then distill.
- [P2] Hub doesn't help decide: no comparison, no thumbnails, no reviews, 6 CTAs, hero echoes homepage line. Fix: quiet 3-column comparison with board thumbnails, one link per card, one review, new hero line. Command: layout.
- [P3] Mobile: preview changes off-screen; breadcrumb unreadable. Command: adapt.

## Detector
106 findings, mostly accepted false positives (cramped-padding on full-bleed sections, tight-leading on display headings, overused-font pinned). Real: accent-dark on linen hover 4.2:1; footer links Home/About/Terms under 44px wide on mobile; docs (CLAUDE.md, DESIGN.md) still name Plus Jakarta Sans though site uses Cormorant Garamond. Browser: 0 errors, 0 404s, no overflow, no broken images, 1 h1 per page, swatches/FAQ/reviews/nav all work.
