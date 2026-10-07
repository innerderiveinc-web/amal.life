# AMAL OS — API Specification (/api/v1/*)

## 1. Overview & Conventions
- Base URL: `http://localhost:4000/api/v1`
- Content Type: `application/json`
- Authentication: `Bearer <token>` in the `Authorization` header

---

## 2. Endpoint Matrix

### Authentication & Identity
- `POST /api/v1/auth/register` — Register a new account with email, name, life stage, and madhhab.
- `GET /api/v1/profile` — Retrieve user profile and timezone.
- `PUT /api/v1/profile` — Update display name, life stage, or country.
- `GET /api/v1/preferences` — Get madhhab, calculation method, and reminder preferences.
- `PUT /api/v1/preferences` — Update notification and calculation preferences.

### Worship & Prayers
- `GET /api/v1/prayers` — Fetch today's prayer schedule, countdown, and next prayer.
- `POST /api/v1/prayers/complete` — Log prayer completion, congregation status, and sunnah.

### Quran & Knowledge
- `GET /api/v1/quran/surahs` — List chapters of the Quran.
- `GET /api/v1/quran/ayah?surah=17&ayah=78` — Retrieve verse text, vetted translation, and classical tafsir.
- `GET /api/v1/evidence/sources` — List approved Islamic sources with authority tiers.
- `POST /api/v1/search` — Execute hybrid search across passages and topics.

### Intelligence & Ask AMAL
- `POST /api/v1/ai/ask` — Submit inquiry to AI Orchestrator. Returns evidence sources, interpretation, action, and citation validation state.

### Amal & Journeys
- `GET /api/v1/amal/today` — Retrieve today's primary action.
- `GET /api/v1/journeys/templates` — List the 8 canonical V1 journey templates.
- `POST /api/v1/journeys/start` — Instantiate a journey for the user.
- `GET /api/v1/journeys` — List active and historical journeys.

### Reflection & Muhasabah
- `POST /api/v1/reflections` — Submit daily Muhasabah reflection.
- `GET /api/v1/reflections/insights` — Retrieve non-judgmental behavioral observations.

### Scholar Portal & Cases
- `GET /api/v1/scholars` — List verified resident scholars.
- `GET /api/v1/cases` — List triage cases for user or scholar.

### Privacy & Admin
- `GET /api/v1/privacy/export` — Download complete user data in GDPR-compliant JSON format.
- `POST /api/v1/privacy/delete-account` — Immediately erase all user data.
- `GET /api/v1/admin/dashboard` — View system health, citation accuracy rate, and active cases.
