# OpenPets 2027 — QA record

Date: 2026-11-23. Revision: `28515c06f7b1ccae20660937f151c7b4184712ed`.

## Verified via source and platform tools
- GitHub branch contains `index.html`, `README.md`, `ARCHITECTURE.md`, isolated from original `site/`.
- Embedded JavaScript passes V8 syntax compilation (without executing the DOM code).
- Six screen routes exist; three role dashboard panels exist.
- CSS `[hidden]{display:none!important}` added after review to prevent hidden role panels showing.
- Responsive media breakpoints for 1120 / 880 / 560 px and reduced-motion mode included.
- Demo intake handles basic HTML validation; information is only rendered with `textContent`.
- No application `fetch`, XMLHttpRequest, sendBeacon, localStorage, or sessionStorage calls.
- Demo providers, slots, and booking state are visibly identified as examples.
- Camera/media starts after a user gesture; stream tracks are stopped on exit/pagehide.
- AI is not connected; demo uses keyword rules only; no false model responses.
- Vercel deployment `dpl_7rghgaVag4mPAnvLmP2ag5PL8JgC` reported `READY` (target Preview) and contains the deployed `src/index.html`.

## Not verified / blocking launch
- External browser visit to Vercel deployment failed from inspection tool; no live 200/browser-render assertion.
- Vercel project has `ssoProtection.enabled=true` for `all_except_custom_domains`; preview may require authenticated Vercel access.
- No Playwright desktop/mobile visual smoke, cross-browser tests, Lighthouse, color contrast audit, or assistive-tech QA.
- No production auth, DB, payments, actual scheduling, LLM, realtime messaging, or peer WebRTC connection.
- No clinical safety review or RF privacy/legal readiness assessment.
- Prototype must remain `noindex` and cannot be presented as a launched consultation service.

## Follow-up quality gate
1. Open preview as an authorized Vercel collaborator, run Playwright at 360/390/768/1440 and 200% zoom, verify all route/card/form/modal/media interactions.
2. Audit access roles and provider registry acceptance criteria.
3. Replace demo assets with verified brand-owned assets; review visual and interaction design.
4. Implement API integration and repeat E2E tests before user-facing launch.
