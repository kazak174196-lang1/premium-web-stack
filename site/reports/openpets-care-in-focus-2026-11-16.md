# OpenPets Care in Focus — second redesign and publication

**Date:** 2026-11-16
**Live public preview:** https://openpets-care-preview.vercel.app/
**Vercel deployment:** dpl_4Akdn2dk54ULpn8z5cbfvJQTdRif (READY, HTTP 200)
**Higgsfield authoring website:** openpets-care-next / website_id 6fc9f75e-72c6-4f66-820d-dce7bb54c9c9
**Higgsfield authoring URL:** https://openpets-care-next.higgsfield.app/ (requires Higgsfield authentication externally, returns 401/302 anonymously)
**Source commit on Higgsfield managed repository:** 91f0cab (React/TanStack Start)
**Vercel implementation:** separate static mirror using the same content, styling and media, with vanilla JS interactions (not identical to the authoring React runtime).

## Art direction

Replaced the previous monochrome editorial care-route treatment with an AI-first, clean premium teal/white product website. The chat occupies the first screen. The cinematic pet story appears lower as scroll-controlled media. Other sections: eight veterinary specialties, pet city and type selector, vet/commerce/pet-profile concept cards, emergency warning, FAQ.

## Research and media provenance

- Refero integration attempted, rejected with `NO_SUBSCRIPTION`; no authenticated Refero styles/screens were retrieved. No claim of active Refero API research.
- Higgsfield attempted a four-asset image generation batch; all four rejected with `Requires basic plan or higher`, no generated image jobs submitted.
- Reused previously existing assets in the user's own OpenPets Higgsfield website: dog, cat, vet photos, 6-second film, matching mobile/desktop film/posters, branded favicon and OG asset.
- Public static preview loads images and videos from Higgsfield's CloudFront media storage. That dependency should be replaced by controlled same-origin media hosting for production and any persistence guarantees.

## Verified live browser checks (Playwright Chromium 159)

- HTTPS 200; `X-Robots-Tag: noindex, nofollow, noarchive`.
- Widths 360 / 390 / 768 / 1440: **zero horizontal overflow**, **zero JavaScript page errors**.
- 390px: mobile navigation opens/closes, Escape closes nav, suggestions populate chat, chat responds transparently in demo mode, dermatologist selection updates panel, city search shows no-connected-clinic state.
- Mobile film loaded 6 seconds successfully, `readyState=4`, visual poster/video painted.
- Reduced-motion testing: zero MP4 requests; video hidden, poster available.
- Images: dog, clinic vet, cat2, film poster loaded; last lazy image was not yet in viewport during that check, not asserted as broken.
- Mobile and desktop first-screen screenshots were inspected. Screenshot artifacts are not in the repository.
- Open Graph `og:image` URL initially contained a duplicated origin; fixed and verified from HTML on the final READY deployment.
- JavaScript syntax validated against the final live URL.

## Intentionally not functional

The website is a **prototype**, not a live veterinary medical service:
- no AI API / actual health advice;
- no real vet/clinic database or live appointment slots;
- no order/payment flows;
- no collection or transmission of chat messages to a backend.

All are openly disclosed to the visitor. Preview is intentionally **noindexed**. Official `openpets.ru` remains untouched.

## Remaining launch gates

Design polish beyond first-screen screenshot inspection; actual Android/iPhone visual QA; independent critic; typography and readability at 200% zoom; real AI backend with moderation, clinical escalation, privacy documentation and 152-FZ data mapping; verified provider directory and scheduler, accessible forms, load/performance tests; self-hosted media; and production SEO/legal launch reviews.

**Next action:** choose the new direction after preview; then implement real connected service flows without misrepresenting features.
