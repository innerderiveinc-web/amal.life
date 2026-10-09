# AMAL OS V3.0 — API PLATFORM & WEBHOOK INFRASTRUCTURE REPORT

> **Comprehensive Technical Architecture, OAuth 2.x & Security Report for AMAL API Platform**  
> Formatted according to V3.0 Master Execution Specification (Sections 41–49, 85, 88).

---

## 1. Overview & Data Minimization Architecture

The AMAL API Platform allows accredited educational, community, and service partners to integrate with AMAL OS through modern, secure, and privacy-preserving interfaces.

### Core Safeguards
1. **Zero Wildcard Scopes (Section 44)**: Scopes like `everything:read` or `*` are forbidden by design.
2. **Data Minimization by Default (Section 43)**: API endpoints return only the minimal fields required for the stated purpose. Private context, reflections, and inner AI chats are never returned over public APIs.
3. **Synthetic Developer Sandbox (Section 49)**: Developer environments run strictly on synthetic test fixtures. Real user religious data is never exposed to third-party developers.

---

## 2. Scoped OAuth 2.x Architecture

All external integrations authenticate via OAuth 2.x with PKCE and granular scopes:

```typescript
export type ApiScope =
  | 'profile:read'
  | 'goals:read'
  | 'goals:write'
  | 'journeys:read'
  | 'journeys:write'
  | 'amal:read'
  | 'amal:write'
  | 'evidence:read'
  | 'scholar:case:create'
  | 'family:shared:read'
  | 'institution:programs:read';
```

### Access Token Verification
Tokens are short-lived, digitally signed, and tied strictly to approved client IDs and consented scopes. Any request attempting an unauthorized scope is rejected with `SCOPE_FORBIDDEN`.

---

## 3. Cryptographic Webhook Platform

Partners can subscribe to safe, authorized lifecycle events:
- `journey.started`
- `journey.completed`
- `amal.completed`

### Security Controls (Section 47)
1. **HMAC SHA-256 Signatures**: Every outbound payload includes an `X-Amal-Signature` header calculated using the client's shared secret.
2. **Replay Protection**: Every event contains an immutable `eventId` and timestamp. The consuming gateway tracks consumed event IDs; repeated submissions throw `WEBHOOK_REPLAY_ATTACK`.
3. **Idempotency**: Subscriptions handle network retries cleanly without duplicating state.

---

## 4. Developer Sandbox Environment

The sandbox endpoint (`/api/v1/ecosystem/api/sandbox`) generates synthetic profiles:
- Users: `usr_sandbox_synthetic_01`, `usr_sandbox_synthetic_02`
- Journeys: `jny_sandbox_demo`
- No PII, real email addresses, or actual spiritual journals are present in sandbox clusters.

---

## 5. Verification Results

Tested and verified under Gate 11 and Gate 12 of `test:v30` and Vectors 8 and 9 of `test:v30:redteam` with 100% compliance.
