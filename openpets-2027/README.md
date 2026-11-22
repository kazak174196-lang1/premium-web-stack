# OpenPets 2027 — Platform Prototype

Interactive concept for a multi-role veterinary telehealth platform. **Demo only; not a live clinical service.**

## Preview
Deployment: https://openpets-vet-2027-concept-msw5jt77e-kazakh1.vercel.app/

## Current coverage
- Accessible responsive homepage, navigation, and service routes
- Rule-based anamnesis form; summaries are composed locally and never submitted
- Red-flag keyword notice (not clinical triage and not a substitute for emergency care)
- Demo specialist catalog with filters (not real clinicians)
- Demo clinics and appointment selection with no real booking
- Owner, veterinarian, and clinic dashboard previews with no login
- Local media-device preview and private in-browser chat; **no peer-to-peer video, signaling, server messaging, or persistence**
- All demo states are explicitly identified; no personal/medical data are sent to the platform

## Run
```bash
python3 -m http.server 8080 --directory openpets-2027
```
Open `http://localhost:8080`. Camera access requires HTTPS or localhost and browser permission. If the browser cannot grant camera access, the status message explains the error.

## Verification
See [QA.md](./QA.md). The deployment is READY, but the preview is protected by Vercel Authentication and independent browser verification is still pending.

## Status and security
The static prototype has no authentication, database, payment collection, AI model, or WebRTC backend. It is intentionally `noindex,nofollow`. Do not publicly enable bookings, sensitive uploads, consultations, or payments until server-side enforcement and acceptance tests are complete.

## Architecture target
See [ARCHITECTURE.md](./ARCHITECTURE.md). This is a UX prototype; production implementation will use Next.js + TypeScript for the website, shared Node.js services, PostgreSQL, Redis, coturn WebRTC, and Flutter mobile clients against versioned APIs.

## Repository isolation
Prototype lives in `openpets-2027/` on `feature/openpets-platform-2027`; the existing `site/` V6 is untouched.
