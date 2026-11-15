# OpenPets.ru — V6 concept site

**Preview/demo:** https://openpets-ru-v6.vercel.app/

A public unindexed, static demonstration of the AI-first veterinary homepage and specialty-selection journey, redesigned according to key requirements in the user-provided AI WEB STUDIO MASTER V6.

## Site contents
- Editorial homepage with an original three-station route signature;
- AI chat interface with suggested prompts and explicit unavailability handling (NO active AI);
- eight speciality selectors with species/city input and honest unavailability result (NO real appointments);
- emergency escalation note, visit preparation, FAQ, responsive header and footer.

## Source layout
`index.html`, `styles.css`, `app.js`, `favicon.svg`, `vercel.json`.

## Running locally
Serve the `site/` directory via any static web server, for example `python3 -m http.server 8080 --directory site`. Do not open via `file://` when checking routing/security headers.

## Verification
See `reports/browser-qa.json` for actual Playwright browser checks against the live URL. The user-provided independent critic protocol has **not** passed; see `reports/design-review.md`.

## Deployment
Vercel project: `openpets-ru-v6`. Source files were deployed using the authenticated Vercel API. Vercel could not link the GitHub repository automatically because the Vercel account needs a GitHub **Login Connection**. Future pushes do not auto-deploy until it is added. Every completed website update must produce a new verified Vercel URL under the repository's top-level AGENTS.md rule.

This is **not** the authoritative official openpets.ru domain and not a production launch. There is no connected AI, clinician database, booking service, payment integration or personal data collection. Noindex headers are enforced at the Vercel edge.
