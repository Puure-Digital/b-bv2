---
target: Our Work pages
total_score: 21
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\cassc\\Documents\\Claude\\BB V2\\see-us-in-action.html"
target_fingerprint: "sha256:b61929ce4273ddb56e50d4f0bee3902fb0887a62cc29fc9a8d3981a5423c9284"
target_path: "C:\\Users\\cassc\\Documents\\Claude\\BB V2\\see-us-in-action.html"
timestamp: 2026-10-02T11-02-21Z
slug: see-us-in-action-html
---
# Critique: Our Work (Gallery work.html, See us in action)

Score 21/36 (heuristic 9 n/a), 58%, Acceptable.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 2 | Empty slots say nothing visibly; "Photo coming soon" only in aria-label |
| 2 | Match real world | 3 | First-person voice; categories match how homeowners think |
| 3 | User control | 3 | Breadcrumbs, native video controls |
| 4 | Consistency | 2 | Work H1 copies homepage H2; same clip titled differently on two pages; light vs dark reel; desktop dropdown closes on hover+click |
| 5 | Error prevention | 3 | Little to get wrong |
| 6 | Recognition over recall | 2 | Nav says Gallery, page never does; no captions linking photo to range |
| 7 | Flexibility | 2 | No category index on long page |
| 8 | Aesthetic and minimalist | 1 | 13 empty outlines; hole in curved grid; one lonely clip |
| 9 | Error recovery | n/a | No inputs |
| 10 | Help | 3 | Contact routes in every close |

## Priority issues
- [P0] Gallery shows 13 empty slots under "Not renders. Not stock photos." while real photos sit unused in images/gallery (curved x4, gallery-deck-2/4/5, room, gym, bar). Fix: fill from repo with optimised variants; hide categories without photos. layout + optimize.
- [P1] Curved feature grid leaves a hole with 4 items; all-light sections, no rhythm. Fix: grid that fits the count, dark band for curved. layout.
- [P1] See us in action shows 1 clip while homepage reel shows 3; same clip has two titles. Fix: all 3 clips on a dark reel, one title per clip; give Gallery its own H1. distill + layout.
- [P1] Unsourced copy: meta "UK's largest curved composite decks", "built freehand, not templated", "I don't outsource a single job", "Insulated, year-round spaces", "Island Mist" colour ID, "Norfolk garden" excludes Suffolk. clarify.
- [P2] No captions, no enlarge. Fix: verified captions, lightbox with keyboard/Escape. harden + typeset.
- [P2] Desktop nav: hover opens dropdown then click toggles it shut (site.js toggle handler). harden.

## Detector
20 findings, all accepted/false positives. Browser: 0 errors, 0 404s, no overflow, 1 h1 each, video plays with sound and controls. Minor: breadcrumb Home link 36px wide on mobile.
