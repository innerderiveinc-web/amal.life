# AMAL OS V1 — COMPLETE REST API SPECIFICATION (/api/v1/*)

## 1. Overview & Conventions
- **Base URL:** `http://localhost:4000/api/v1`
- **Content Type:** `application/json`
- **Authentication:** `Bearer <session_token>` in `Authorization` header
- **Request Tracing:** `x-request-id` returned on every response
- **Idempotency:** `idempotency-key` supported on all mutating endpoints (`POST`, `PATCH`)

---

## 2. API Domain Catalog

### 1. Auth & Sessions
- `POST /api/v1/auth/register` — Create account with initial profile.
- `POST /api/v1/auth/login` — Authenticate and receive session tokens.
- `POST /api/v1/auth/refresh` — Rotate session with SHA-256 hashed refresh token.
- `POST /api/v1/auth/logout` — Revoke active session.
- `GET /api/v1/auth/me` — Retrieve current authenticated session identity.

### 2. User & Preferences
- `GET /api/v1/users/me` — Retrieve seeker profile.
- `PATCH /api/v1/users/me` — Update display name, locale, timezone, life stage.
- `GET /api/v1/users/me/preferences` — Get prayer calculation, daily time budget, notification mode.
- `PATCH /api/v1/users/me/preferences` — Update preferences.

### 3. Goals & Baselines
- `POST /api/v1/goals` — Create a faith goal (15 categories, 8 intents).
- `GET /api/v1/goals` — List user's active goals.
- `GET /api/v1/goals/:id` — Retrieve goal detail and baselines.
- `PATCH /api/v1/goals/:id` — Update goal parameters.
- `DELETE /api/v1/goals/:id` — Archive goal.

### 4. Journeys
- `GET /api/v1/journeys` — List active journeys.
- `POST /api/v1/journeys` — Instantiate journey from pinned template version.
- `GET /api/v1/journeys/:id` — Get journey details, current phase, and progress.
- `POST /api/v1/journeys/:id/start` — Transition journey to `STARTED` / `ACTIVE`.
- `POST /api/v1/journeys/:id/pause` — Pause journey.
- `POST /api/v1/journeys/:id/resume` — Resume journey.
- `POST /api/v1/journeys/:id/complete` — Complete journey.
- `GET /api/v1/journeys/:id/adaptations` — View proposed pace adaptations.
- `POST /api/v1/journeys/:id/adaptation-preview` — Preview suggested adjustment.
- `POST /api/v1/journeys/:id/adaptation-approve` — Apply adaptation with user consent.
- `POST /api/v1/journeys/:id/adaptation-reject` — Keep current plan.

### 5. Daily Amal & Today OS
- `GET /api/v1/today` — Unified daily view (prayer schedule, primary Amal, optional Amal, active journey, reflection prompt).
- `POST /api/v1/today/regenerate` — Recalculate daily plan upon context change.
- `GET /api/v1/amal/today` — List candidate Amals for today.
- `POST /api/v1/amal/recommend` — Recommend actions for specific time windows.
- `POST /api/v1/amal/:id/start` — Start tracking action session.
- `POST /api/v1/amal/:id/complete` — Mark Amal complete (`FULL`, `PARTIAL`, `MINIMUM`).
- `POST /api/v1/amal/:id/skip` — Record skip without moral guilt or streak penalty.
- `POST /api/v1/amal/:id/snooze` — Snooze Amal for later window.
- `POST /api/v1/amal/:id/feedback` — Submit friction feedback.

### 6. Reflections & Muhasabah
- `GET /api/v1/reflections` — List personal reflections (strictly private).
- `POST /api/v1/reflections` — Record evening Muhasabah (went well, friction, tomorrow intention).
- `GET /api/v1/reflections/:id` — Retrieve specific reflection.
- `POST /api/v1/reflections/:id/analyze` — Extract behavioral observations.
- `POST /api/v1/reflections/:id/confirm-insight` — Confirm or dismiss AI observation.

### 7. Prayers & Adhkar
- `GET /api/v1/prayers/today` — High-precision solar prayer timeline.
- `PATCH /api/v1/prayers/settings` — Update calculation method and Asr juristic rule.
- `POST /api/v1/prayers/complete` — Log prayer completion.

### 8. Quran & Hadith
- `GET /api/v1/quran/surahs` — List 114 Surahs.
- `GET /api/v1/quran/ayahs/:surah/:ayah` — Get verified verse with Medina Mushaf hash.
- `GET /api/v1/hadith/collections` — List canonical collections.
- `GET /api/v1/hadith/:collection/:number` — Get Hadith with scholarly grading.

### 9. Islamic Evidence & Knowledge
- `POST /api/v1/evidence/search` — Hybrid search across verified corpus.
- `GET /api/v1/evidence/sources` — List approved sources with licensing metadata.
- `GET /api/v1/evidence/nodes/:id` — Get evidence graph node.
- `GET /api/v1/evidence/nodes/:id/neighbors` — Get linked ayahs, hadiths, tafsirs.
- `GET /api/v1/evidence/claims/:id/provenance` — Audit cryptographic lineage.

### 10. Ask AMAL & AI Intelligence
- `POST /api/v1/ai/ask` — Submit inquiry. Returns 4 epistemic quadrants, verified citations, and safety classification.

### 11. Scholar Desk & Escalation
- `GET /api/v1/scholars` — Directory of verified scholars.
- `GET /api/v1/scholars/:id` — Scholar profile and credentials.
- `POST /api/v1/scholar/cases` — Submit pastoral Class D case.
- `GET /api/v1/scholar/cases` — List active cases (for user or assigned scholar).
- `GET /api/v1/scholar/cases/:id` — Case status and attachments.
- `POST /api/v1/scholar/cases/:id/answer` — Scholar response submission.
- `POST /api/v1/scholar/cases/:id/peer-review` — Independent second scholar sign-off.

### 12. Family Hub
- `GET /api/v1/family` — Household workspace (adult reflections isolated).
- `POST /api/v1/family/invite` — Invite family member.
- `GET /api/v1/family/journeys` — Shared household journeys.

### 13. Notifications & Communications
- `GET /api/v1/communications/preferences` — Get notification settings.
- `PATCH /api/v1/communications/preferences` — Update channel and quiet hours.
- `GET /api/v1/communications/consent` — Get granular channel consents.
- `POST /api/v1/communications/consent` — Grant or revoke consent with cryptographic proof.
- `POST /api/v1/notifications/interact` — Record interaction/dismissal.
- `POST /internal/communications/send` — Governed notification orchestrator.
- `POST /internal/communications/webhook` — CPaaS delivery receipt webhook.

### 14. Billing & Entitlements
- `GET /api/v1/billing/plans` — List Free, Plus, Family, and Institution plans.
- `GET /api/v1/billing/subscription` — View active subscription.
- `GET /api/v1/billing/entitlements/:key` — Check feature entitlement.
- `POST /api/v1/billing/checkout` — Generate checkout session.
- `POST /api/v1/billing/activate` — Confirm activation.
- `POST /api/v1/billing/cancel` — Transparent cancellation (preserves core faith access).

### 15. Governance, Trust & Privacy
- `GET /api/v1/governance/trust-dashboard` — System-wide trust metrics.
- `GET /api/v1/governance/user-trust-center` — User privacy control dashboard.
- `POST /api/v1/governance/policy/evaluate` — Internal PDP evaluation.
- `GET /api/v1/privacy/export` — GDPR full data export.
- `POST /api/v1/privacy/delete-account` — Right-to-be-forgotten erasure.
- `GET /api/v1/governance/circuit-breakers` — View safety breakers status.

### 16. Platform Reliability (Internal)
- `GET /internal/platform/health` — Aggregated health of all components.
- `GET /internal/platform/slos` — Real-time SLO adherence.
- `POST /internal/platform/canary/advance` — Advance canary traffic.
- `POST /internal/platform/canary/rollback` — Emergency canary rollback.
- `POST /internal/platform/reconcile/outbox` — Outbox dead-letter reconciliation.
- `POST /internal/platform/synthetic/run` — Run automated synthetic health checks.
