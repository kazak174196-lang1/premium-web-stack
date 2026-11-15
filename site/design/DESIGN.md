# OpenPets.ru — V6 design decision ledger

**Mode:** redesign, initial independent vertical slice. **Status:** visual QA pending.

## World of product
- Confirmed product name: OpenPets.ru.
- Service requested: AI chat on homepage; discovery of in-person veterinary consultations by specialty.
- Unknown: providers, addresses, availability, prices, API credentials, legal publisher information, brand assets.
- This public version is a clearly marked non-official **demonstration**. No personal data collection, no confirmed bookings, no live AI claims.

## Concept and signature
**Idea:** «Сигнал о питомце становится понятным маршрутом к очному врачу».
**Signature:** continuous three-station care route — question / specialty / appointment. One SVG mark appears in header, journey and footer; in content it is a navigational line, never a decorative gradient.
**Primary direction:** editorial atlas/information design (inspired by authorial publishing like Monocle, not copied).
**Secondary detail:** calm search input hierarchy (Perplexity). Product reference: veterinary triage navigation.

## Reference lock
- Monocle editorial / https://monocle.com — static webpage content + screenshot reference, not interaction-tested; borrowed strong editorial grid, section hierarchy and rule lines.
- Perplexity / https://www.perplexity.ai/hub — text-only and screenshot reference, not interaction-tested; borrowed discoverable question-first interface, not its logo.
- Linear / https://linear.app — secondary, screenshot reference from public commentary, not interaction-tested; borrow precise surface separation.
- Reference platforms: **text-only/static-viewed** only; no claims of browser interaction testing.

## design-tokens
```css
:root {
  --paper: #F6F5EF;
  --paper-2: #EDEFE8;
  --ink: #172C29;
  --muted: #526360;
  --line: #CED5CD;
  --accent: #E3ED9E;
  --warn: #F1D2C8;
  --deep: #17352E;
  --radius: 4px;
  --font-display: "PT Serif", Georgia, serif;
  --font-text: "Manrope", "PT Sans", "Arial", sans-serif;
  --step-0: clamp(1rem,.96rem + .2vw,1.125rem);
  --step-4: clamp(2.75rem, 1.2rem + 5vw, 6.75rem);
  --ease: cubic-bezier(.16,1,.3,1);
}
```
Typography: display serif + calm Cyrillic-aware sans fallback. Font sources must be licensed and self-hosted before release. Browser coverage not yet verified.

Grid: 12 cols desktop / 4 mobile; max width 1440, shell 4.3vw; mobile 20px. Only one repeated speciality index structure. Accent used for interaction, not generic gradient. One radius 4px; borders replace shadows.

## Page types
- home: hero and assistant; care route; specialty finder; emergency; preparing for visit; FAQ; editorial footer.
- privacy: draft, required before collecting contacts.
- 404: route back to homepage and specialist directory (to be added for release).

## Changes vs previous concept
1. AI chat is the hero object and primary workflow, not a widget.
2. Subject-specific route-line graphic replaces generic paw icons, cards, stock imagery and decorative blobs.
3. Indexed specialty selection replaces card grids; action pane is real-state demo with no fake bookings.
4. Mobile reorders chat before ancillary material, not a scaled-down desktop.

## Release constraints
No production: provider directory, schedule, legal pages, actual AI moderation and backend are not connected. A READY Vercel deploy is a draft, not accepted production.
