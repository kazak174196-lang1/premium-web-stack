# Quality gates

## Before delivery
- Lint, typecheck, production build run (or blockers recorded).
- Browser and responsive checks cover mobile and desktop, including 320px.
- Navigation and critical user journeys work with keyboard and touch.
- Accessibility: headings, landmarks, labels, contrast, focus and reduced motion.
- Performance checks: avoid layout shifts, oversized video and blocking scripts.
- Security: no credentials or user data in repository; no sensitive client env vars.

## Deployment contract
1. Publish the changed revision to **Vercel Preview** for each completed site update.
2. Confirm deployment state is **READY**.
3. Open the actual deployed URL and verify it renders.
4. Report preview URL, status, changed behavior, and remaining limitations.
5. Promote to **Production** only when specifically approved or authorized by a documented release policy.
6. Never assert that deployment, tests, or monitoring succeeded unless they were actually checked.
