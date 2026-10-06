# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Homeowners in Norfolk and Suffolk who want a deck built once and built properly: heritage homes, holiday lets, and waterside gardens on the Norfolk Broads and the coast. They are picturing a finished outdoor space (somewhere to entertain, relax, extend the home outward), not comparing decking materials on price. Many arrive already brand-qualified, having searched for Trex specifically.

The site deliberately filters out the price-comparison enquirer that generic "composite decking" traffic brought in before.

## Product Purpose

beamsandbraces.co.uk sells Darren Gooch and his work, not Trex as a commodity. It turns a qualified visitor into a conversation with Darren ("Let's Chat" / "Message me on WhatsApp"). Success is fewer, better enquiries from people who want premium outdoor living and trust Darren to build it.

Decking, lighting, and railing/trellis are presented as one outdoor living package, not three bolted-on services. Fencing and garden rooms are real, deprioritized services: keep them, don't over-invest.

## Positioning

- TrexPRO Platinum installer since 2017, Trex's highest certification, held by fewer than 5% of UK Trex contractors.
- Trex Pro Advisory Council member since 2024, one of the few UK installers Trex consults directly.
- The UK's leading curved-deck builder, including some of the largest curved Trex decks installed anywhere in the UK.
- 500+ composite decks since 2016, on top of a family timber and joinery lineage going back to 1987.
- Build standards other installers skip: UC4-rated joists, joist protection tape, and plastic subframes on every job.

Never use an unverifiable superlative such as "best in the UK". Let the credentials imply it.

## Operating Context

- Search leads with "Trex composite decking" plus the Platinum and Advisory Council credentials. Generic "composite decking" appears only where search requires it (approved by Darren).
- Geography lives in body copy (Norfolk, Suffolk, the Broads, Norwich). There are no location landing pages and no "areas we cover" page.
- Samples are arranged personally by Darren: "Request Free Samples" routes to `/contact`, never to Trex's paid checkout.
- Lead capture: **WhatsApp first** (`https://wa.me/447983531860`), with a short multi-step form second. The form POSTs to a LeadConnector/GoHighLevel webhook and redirects to `/thank-you`. Whether the webhook is monitored end to end is still being confirmed.
- Trex UK is a secondary reader. The site represents the TrexPRO Platinum partnership and must stay accurate against Trex's published UK spec.

## Capabilities and Constraints

- Static site: flat `.html` files at the project root, shared `style.css`, `services.css`, and `script.js`. Apache `.htaccess` serves clean URLs (`/about` → `about.html`).
- Pages: Home, Trex hub (`/trex`), three range pages (`/trex-signature`, `/trex-transcend`, `/trex-enhance-naturals`), Our Work, Railing & Lighting, About, Contact, plus Privacy, Terms, and Thank You. Railing & Lighting stays and is being expanded.
- Our Work is organised by curved decking, Trex decking, garden rooms and gyms, and garden bars. Real project photography only.
- Trex ranges and colours are locked exactly as follows:
  - Signature (50-year fade & stain warranty): Ocracoke, Whidbey
  - Transcend (50-year): Jasper, Biscayne, Rainier, Carmel, Island Mist
  - Enhance Naturals (25-year): Foggy Wharf, Rocky Harbor, Toasted Sand, Calm Water
  - Enhance Basics (25-year): Clam Shell, Tide Pool
  - Enhance is one range with two collections, Naturals and Basics. Never show Saddle, Tiki Torch, Spiced Rum, Beach Dune, or Slate Haven. This lineup overrides any document listing "11 colours".
- Boards are single-face embossed woodgrain with a grooved edge for hidden fasteners. Never call them dual-sided, reversible, or flippable. Board size referenced: 25 × 140mm.
- Never invent a Trex material or technology term. Use plain language.
- Open: the Railing & Lighting depth, the final photography library, and weaving credentials across more pages (as natural mentions, not a repeated badge).

## Brand Commitments

- Name: Beams & Braces, a trading name of D Gooch Limited (Company No. 04835734). Footer legal line, verbatim: "Beams & Braces is a trading name of D Gooch Limited (Company No. 04835734)."
- Contact: Darren Gooch · 191a Plumstead Road East, Norwich, NR7 9LW · 07983 531860 (`+447983531860`) · darren@beamsandbraces.co.uk. Price positioning is premium (`£££`).
- Voice (approved by Darren): first person as Darren, talking to one homeowner. "I'm Darren Gooch", not "Beams & Braces is". Selective, not pleading ("Not everyone needs a premium deck."). Specifics, not adjectives ("50 year warranty. 500+ decks."). Internally this is the "Ferrari of deck builds"; the site never uses that phrase.
- CTA language is "Let's Chat" or "Message me on WhatsApp". Never "Get a Free Quote", "We'd love to hear from you!", or any quote framing.
- No hype standing in for fact ("passionate about excellence"). Spec-sheet language belongs on product pages, not the homepage.
- Darren's belief, in his words: "I don't think people buy Trex. I think people buy the outdoor space they've been picturing, and Trex happens to be the best material I've found to build it properly."
- Assets: logo `images/shared/logo-dark.png` (the only variant; a proper light/dark pair is a known gap), favicon `images/shared/favicon.png`, and the Trex partner logo `images/shared/trex-logo.png` (official, never recolour or crop).
- The work must not read as AI-generated or template-built. Every decision traces back to something true about the business: its materials, its craft, Darren's history.

## Evidence on Hand

- Approved story timeline: 1987 his parents open the wood yard, Darren is three → 2002 Darren joins the family business the day he finishes school → 2016 Beams & Braces and the Trex partnership begin → 2017 TrexPRO Platinum → 2024 Trex Pro Advisory Council. (`SITE-REBUILD-BRIEF-DRAFT.md` puts the age-three memory in 2002; that is wrong, and 1987 is correct.)
- Credentials verified against Trex's "Find a Builder" profile, Companies House, and Arbordeck: 2017 Platinum, 2024 Advisory Council, 500+ decks since 2016, 95% recycled content in every Trex range.
- Google rating: 5.0 across 10 reviews (the count will climb; verify before quoting).
- Reviews: exactly 8 curated real Google reviews: Jeannette Astley-Jones, Dr S J Miller-Smith, Nana, Jason A, Julie, Mark Burgess, Kim Frost, Cherry Brooks. Never add a 9th, reword one, or attach an invented quote to a real name.
- Board photography: `images/boards/<Range>/…` (Enhance splits into Naturals and Basics). Always use a real photo for a swatch, never a flat hex block.
- Project photography: `images/gallery/`, `images/heroes/`, `images/pages/`, `images/trex/`. The homepage hero is a real aerial shot of a curved deck.
- Client references: `reference/Beams & Braces Brief.pdf` (approved story, voice, facts, search approach) and `reference/Beams and Braces website updates (Trex UK).pdf` (partner update).
- Absent, never fabricate: extra reviews, customer names or towns, project counts beyond 500+, pricing, awards, press, and case-study details not supplied by Darren.

## Product Principles

1. **Sell Darren, not the material.** Trex is the best material he has found. The product is his judgement and his build.
2. **Every claim is checkable.** If it can't be traced to Trex, Companies House, Arbordeck, Google, or Darren, it doesn't ship.
3. **Filter, don't plead.** Speak to the homeowner who wants it built properly once. Losing the price shopper is intended.
4. **The outcome over the spec.** Lead with the outdoor space people picture. Specs support it on the product pages.
5. **One package, one system.** Decking, lighting, and railing read as one offer, and every page reads as one build.

## Accessibility & Inclusion

WCAG 2.2 AA. Text contrast at least 4.5:1: gold accent text on light surfaces uses the darker accent. Respect `prefers-reduced-motion` on all motion.
