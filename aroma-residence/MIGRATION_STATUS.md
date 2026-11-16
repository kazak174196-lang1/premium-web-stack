# Aroma Residence · Timeweb Optimo — isolated migration workspace

**Branch:** `aroma-residence-timeweb-20261116` — working branch only. The default `main` branch and Vercel production have not been modified.

**Storefront:** https://aroma-residence-emerald.vercel.app/
**New domain:** https://aromaresidence.ru/
**Hosting:** Timeweb Optimo (shared PHP 8.2 / MySQL).

## Verified on 2026-11-16
- Public Vercel HTTP 200.
- A read-only snapshot was independently recovered in Vercel Sandbox: **98 HTML files, 94 WebP assets, 91 catalog products**. All sitemap URLs had matching HTML. The backup archive checksum was `3dbeeb457434571562198e3246050aa27d747073346a9e31e086b31ed44b2f0a` (2,142,550 bytes). This archive is **not committed here**; the recovery sandbox is ephemeral.
- DNS lookup for `aromaresidence.ru` failed at the time of check; this does not indicate a hosting fault if domain registration is pending.
- Local PHP adapter tests, compliance patch tests, and additive assembly checks passed; **no live MySQL E2E**.
- A compatible PHP/MySQL release kit is available as a ChatGPT conversation attachment. It contains the private configuration example, commerce logic, MySQL schema, compliance patch, and an offline packaging assembler.
  
## Safety constraints
- DO NOT deploy this README as a website.
- DO NOT expose `.aroma_private/config.php` or MySQL credentials in public_html or the repository.
- Keep checkout disabled while the owner postpones notification and other required legal confirmations.
- Recreate original storefront assets from the verified published build; preserve catalog/cart/sets behavior.
- Treat `robots.txt: Disallow: /` as prelaunch only; update after legal and operational go-live approval.

## Release workflow
1. Obtain a complete public snapshot from the original Vercel build.
2. Run `node tools/assemble-timeweb.mjs --static <snapshot/webroot> --data <snapshot/private> --out <new-output-folder>` from the release kit.
3. Run unit tests and inspect all generated HTML, UI states and internal links.
4. In Timeweb: configure MySQL, copy public_html to the domain root, put `.aroma_private` **outside** the webroot, apply migrations, configure secrets using hosting panel.
5. Activate SSL and test a simulated order end-to-end before changing DNS or enabling live personal-data intake.
6. Confirm business/operator compliance and release gates separately.

No site change has been published from this branch.