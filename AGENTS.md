# AGENTS.md — Premium Web Stack

## Mandatory Vercel deployment

**Every completed website change MUST be published to Vercel Preview and accompanied by a verified URL.** A local build, mockup, screenshot, commit, or pull request alone does not count as a delivered website change.

1. Implement the change, then run all available lint, type-check, build, unit, accessibility, and end-to-end checks. Document checks that could not run.
2. Deploy the exact changed revision to **Vercel Preview**. Prefer a linked GitHub repository with automatic preview deployments, otherwise use an authenticated Vercel deployment workflow.
3. Inspect the deployment: wait until its state is **READY**, open the real deployment URL, verify that the page renders, and validate essential mobile and desktop interactions. Investigate build or runtime errors.
4. In the final report provide: deployment URL, environment (Preview/Production), deployment state, changed features, tests run, and limitations.
5. Publishing to **Production** or changing a live domain requires explicit authorization or a previously approved release policy. Never silently replace a live site.
6. If blocked (permissions, quota, failed build, network, credentials), state the exact blocker and provide the ready-to-deploy changes; **never claim a deployment succeeded without verification**.

### Release quality gate

- [ ] Lint, types, build are clean or limitations disclosed.
- [ ] Responsive desktop and mobile layout verified.
- [ ] Loading, empty, error, offline, and reduced-motion states reviewed as applicable.
- [ ] Secrets and personal data are not committed or leaked into client-side bundles.
- [ ] Vercel Preview deployment is READY and the URL was opened.
- [ ] User receives the verified URL plus a concise change report.

## Scope

This repo is the reusable website engineering stack, not the existing OpenPets legacy codebase. Apply this instruction to websites built from this stack. For OpenPets.ru, prioritize AI-chat home and in-person veterinary consultation discovery by specialty. Do not misrepresent simulated AI or unconfirmed bookings as live services.
