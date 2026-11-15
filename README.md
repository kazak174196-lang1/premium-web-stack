# Premium Web Stack

Public repository for modern, maintainable website projects and shared engineering practices.

## Mandatory publishing

**Every completed website change is deployed to Vercel Preview.** Check its actual READY status, open the deployed page, and provide the verified URL. Production publishing requires separate approval. See [AGENTS.md](./AGENTS.md) and [quality gates](./docs/QUALITY-GATES.md).

## Tooling plan

- Next.js, TypeScript, React, accessible responsive components
- Figma for design research and editable source layouts
- Playwright for desktop/mobile smoke and regression tests
- Emil Kowalski Skills for motion and interaction craft
- Impeccable for design critique
- Taste Skill for composition and art direction

External skills are not installed merely by referencing them. Review their upstream sources, versions and licenses when installing.

## First product

OpenPets.ru: AI chat on homepage and in-person veterinary consultation requests filtered by specialist. AI answers and appointment confirmations require real connected services; no simulated success states.

## Security

Do not store passwords, API tokens, personal or veterinary case data in a public repository. Use Vercel server-side environment settings for secrets and never expose them through public environment variables.
