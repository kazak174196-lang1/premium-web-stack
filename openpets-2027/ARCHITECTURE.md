# OpenPets platform — architecture decision record (initial)

**Status:** design proposal; not yet implemented. **Updated:** 2026-11-23.

## Principles
1. One API for web (Next.js), OpenPets Flutter app, and OpenPets Pro Flutter app; no separate user databases.
2. Account may be owner, veterinarian, breeder, or clinic staff using server-side RBAC and scoped permissions; organization membership is distinct from account identity.
3. Veterinary provider identity and education checks before publicly listing practitioners.
4. AI supports intake and safety routing with clinician escalation, not definitive diagnoses, prescriptions, or emergency services.
5. Explicit distinction between requests, provisional availability, confirmed bookings, completed consults, and refunds.
6. Russia-first data governance: 152-FZ operator obligations, consent ledger, audited access, retention/deletion, location of personal-data databases; legally review third-party AI, conferencing, and payment providers before transmitting case files.

## Proposed components
| Layer | Choice | Responsibility |
|---|---|---|
| Public web | Next.js App Router + TypeScript | SEO landing, search, intake, accounts |
| Mobile | Flutter + Riverpod + Clean Architecture | consumer / professional clients |
| Public API | Node.js (NestJS or Fastify) | versioned REST/OpenAPI, auth, service boundaries |
| Database | PostgreSQL | accounts, pets, visits, clinical notes, payouts, ledger |
| Realtime | Redis + WebSocket | presence, session signaling, transient queues |
| Video | WebRTC + STUN + mandatory coturn TURN | 1:1 video / audio; switch media tracks without ending consultation |
| Messaging | authenticated persistent server-side chat | tenant-scoped messages, files via signed URLs |
| AI | server-side provider abstraction and model routing | guided anamnesis, structured extraction, grounded advice safeguards |
| Storage | S3-compatible object storage in compliant location | encrypted veterinary documents with audit |
| Payments | licensed RF payment provider and KKT flow | upfront payment, refunds, split ledger and settlements |
| Operations | RBAC administrative console, audit, monitoring | booking disputes, vet onboarding, reliability |

## Core entities
User; RoleGrant; Organization; Clinic; ClinicBranch; Practitioner; PractitionerCredential; Pet; PetRecord; Intake; IntakeVersion; Consultation; ConsultationParticipant; Appointment; AvailabilitySlot; BookingHold; Message; Attachment; AdviceNote; Payment; Refund; Settlement; AuditEvent; ConsentRecord.

Use UUID primary keys, tenant scope where applicable, UTC database timestamps, idempotency keys for booking/payment mutations, soft-delete only where retention laws permit, and explicit state transitions. Unique constraints prevent double-booked slots.

## State machines
Consultation: created -> intake_complete -> awaiting_payment -> paid -> assigned -> ready -> in_progress -> completed | canceled | disputed.
Booking: requested -> accepted -> confirmed -> checked_in -> completed; rejected, canceled, expired are distinct terminal outcomes.
Payments: created -> authorized -> captured -> refunded/partially_refunded; settlement is not the same as capture.

## APIs (versioned draft)
- POST /v1/intakes, PATCH /v1/intakes/{id}, POST /v1/intakes/{id}/summarize
- GET /v1/practitioners?specialty=&petType=&channel=&availability=
- GET /v1/clinics?city=&specialty=&date=
- GET /v1/availability?providerId=&date=
- POST /v1/booking-holds with idempotency key and TTL
- POST /v1/appointments, GET /v1/appointments/{id}
- POST /v1/consultations/{id}/join-token (only authorized paid participants)
- WS /v1/realtime (authorized signaling, presence, message events)
- GET/POST /v1/pets and clinical timeline
- POST /v1/payments/intents, POST /v1/payments/webhooks (signature verification)
- GET/POST /v1/clinic/schedules, /v1/vet/notes, /v1/admin/audit

No sensitive clinical data in public URLs, telemetry, or client logs.

## Critical QA gates before launch
- RBAC/IDOR + tenant isolation penetration tests
- consent and data-residency review, files malware scanning, signed URLs with short TTL
- call/session consent, rejoin tests, TURN-only fallback, network transition, mic/cam denied, packet loss
- booking concurrency, slot locking, payment webhooks idempotency, partial refunds
- clinician identity and accreditation process
- urgent symptom clinical safety review and AI evaluation with adversarial cases
- Yandex/Google technical SEO for public pages; noindex authenticated and demo surfaces
- desktop/mobile accessibility, 200% zoom, reduced motion, stress tests, performance monitoring

## Go-to-market dependencies
Do not mark individual online practitioners as available or publish pricing until contractual and schedule data are verified. Announce 24/7 only when operational staffed coverage exists. The existing commission proposal 60% platform / 40% clinician must be assessed against provider incentives and unit economics.
