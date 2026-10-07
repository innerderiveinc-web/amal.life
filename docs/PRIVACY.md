# AMAL OS — PRIVACY CONTROL PLANE & DATA SOVEREIGNTY

## 1. Core Principle: Zero Advertising & Absolute Sovereignty

Religious practice and private spiritual struggle represent the most sensitive categories of human personal data. AMAL OS adheres to an inviolable charter:

- **No Targeted Advertising:** Worship habits, prayer timestamps, missed prayers, and spiritual queries will **never** be monetized, shared with data brokers, or used for behavioral ad targeting.
- **No Moral Scoring:** The system never calculates an "Iman score", piety rating, or moral judgment.
- **Adult Reflection Isolation (`INV_03`):** Personal Muhasabah reflections are cryptographically isolated to the individual seeker. Family members, household heads, and organizational administrators receive strict `DENY` responses when requesting access to adult reflections.

---

## 2. Context Firewall 2.0 & Minimum Necessary Context

Every AI interaction is gated by an ephemeral `AIDataEnvelope`. Rather than transmitting the seeker's complete profile, the context engine selectively packages only the minimum data required for the task:

- **L0 (None):** Universal theological questions (Class A). Zero personal data shared.
- **L1 (Preferences):** Preferred madhhab, language, and calculation method.
- **L2 (Current Goal):** Active goal category (e.g., Quran Restart).
- **L3 (Active Journey):** Journey phase and current day number.
- **L4 (Recent Activity):** Completion timestamps within the last 48 hours.
- **L5 (Derived Patterns):** Confirmed friction points (e.g., morning time friction).
- **L6 (Sensitive Context):** Muhasabah journals, marital matters, bereavement. Excluded by default unless the seeker explicitly asks for pastoral reflection.

---

## 3. GDPR & The 8-State Deletion Dependency Graph

When an account erasure request is initiated (`POST /api/v1/privacy/delete-account`):

```text
REQUESTED
   ↓
PENDING_VERIFICATION
   ↓
AUTHORIZED
   ↓
PROCESSING
   ├── CASCADE: Permanent wipe of users, profiles, auth_sessions, reflections, memory
   ├── ANONYMIZE: Scrub user_id from aggregate knowledge disputes and platform SLO metrics
   └── RETAIN: Immutable cryptographic audit hashes (tamper_evident_audit_log) retaining only sequence and hash proof
   ↓
COMPLETED
```

---

## 4. Child Mode & Young User Protections

- Account modes: `ADULT`, `YOUNG_USER`, `CHILD`.
- In `CHILD` mode:
  - Commercial billing features and external community features are disabled.
  - Parents can configure guided journeys, but emotional reflection prompts are gentle and educational.
  - Data collection is restricted strictly to local device storage where possible.
