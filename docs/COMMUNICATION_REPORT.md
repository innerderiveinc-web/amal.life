# AMAL OS — RESPONSIBLE COMMUNICATION OS & QSURA GATEWAY REPORT

**Module:** Communication Orchestrator & QSURA Provider Adapter  
**Status:** FULLY INTEGRATED & PRODUCTION VERIFIED  
**Governing Principles:** Explicit Consent, Fatigue Protection, Quiet Hours & Zero-Guilt Messaging  
**Verification Date:** October 8, 2026

---

## 1. System Objective

Traditional notification systems generate notifications aggressively to maximize screen engagement. In contrast, AMAL OS treats user attention and spiritual serenity as sacred trusts (*Amanah*).

The **Responsible Communication OS** serves as an intelligent gatekeeper ensuring:
1. **Zero Unconsented Contact:** Multi-channel communications (Push, WhatsApp, Email, SMS, Voice) strictly require explicit opt-in for routine notifications.
2. **Fatigue Throttling:** Rapid successive alerts or repeated dismissals automatically increase the user's fatigue score, suppressing further notifications.
3. **Quiet Hours Enforcement:** Respects user sleep windows, suppressing non-critical alerts between designated hours (e.g. 22:00 to 07:00).
4. **Zero-Guilt Copy Sanitization:** All notification text is audited before dispatch to ensure zero shame, panic, or religious guilt induction.

---

## 2. Six-Stage Orchestration Pipeline

Every notification request passes through a 6-stage evaluation pipeline inside `CommunicationOrchestrator`:

```mermaid
flowchart TD
    Req[Notification Request] --> KillSwitch{1. Global Kill Switch Active?}
    KillSwitch -->|Yes| SuppressKill[Action: SUPPRESS (KILL_SWITCH_ACTIVE)]
    KillSwitch -->|No| Consent{2. Explicit Consent Verified?}
    Consent -->|No| ConsentCheck{Channel Degrades?}
    ConsentCheck -->|Yes e.g. WA -> PUSH| Degrade[Action: DEGRADE_CHANNEL]
    ConsentCheck -->|No e.g. SMS| SuppressConsent[Action: SUPPRESS (NO_CONSENT)]
    Consent -->|Yes| Fatigue{3. Fatigue Breached?}
    Fatigue -->|Yes| SuppressFatigue[Action: SUPPRESS (NOTIFICATION_FATIGUE)]
    Fatigue -->|No| Suppression{4. Quiet Hours / Active Session?}
    Suppression -->|Quiet Hours| SuppressQuiet[Action: DEFER/SUPPRESS (QUIET_HOURS)]
    Suppression -->|Active Session| SuppressActive[Action: SUPPRESS (USER_ALREADY_ACTIVE)]
    Suppression -->|Clear| CopyAudit{5. Zero-Guilt Copy Audit}
    CopyAudit -->|Violation| BlockCopy[Error: Zero-Guilt Violation]
    CopyAudit -->|Clean| Gateway[6. Dispatch via QSURA Gateway]
```

---

## 3. Channel Consent & Graceful Degradation Hierarchy

AMAL OS defines clear consent boundaries across channels:
- **`IN_APP`:** Always permissible within active user sessions.
- **`PUSH`:** Opt-in by default; customizable per purpose (`AMAL_REMINDER`, `JOURNEY`, `SCHOLAR_UPDATES`).
- **`WHATSAPP`:** Requires explicit user opt-in (`OPTED_IN`). If unconsented, the engine automatically **degrades** to `PUSH` or `IN_APP` without dropping critical journey updates.
- **`SMS` & `VOICE`:** Strictly gated. Any reminder dispatch without prior explicit opt-in is **suppressed immediately** (`SUPPRESS` with `NO_CONSENT`).

---

## 4. Endpoints & API Contract

| Endpoint | Method | Role | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/notifications` | `GET` | Seeker | Returns user's in-app notification center inbox. |
| `/api/v1/notifications/preferences` | `GET` | Seeker | Fetches user quiet hours, timezone, and reminder budgets. |
| `/api/v1/notifications/preferences` | `PATCH` | Seeker | Updates communication limits and quiet-hour windows. |
| `/api/v1/communications/consent` | `GET` | Seeker | Lists channel consent statuses (Push, WhatsApp, Email, SMS). |
| `/api/v1/communications/consent` | `POST` | Seeker | Grants or revokes explicit consent per channel. |
| `/api/v1/notifications/:id/snooze` | `POST` | Seeker | Snoozes alert; gently updates fatigue metrics. |
| `/api/v1/notifications/:id/dismiss` | `POST` | Seeker | Dismisses notification; tracks dismissal rate for throttling. |
| `/internal/communications/send` | `POST` | Internal | Evaluates and orchestrates notification dispatch. |
| `/internal/communications/webhook` | `POST` | QSURA | Processes delivery and status webhooks. |

---

## 5. Verification Evidence

Responsible Communication OS was verified through automated test suites:
- `scripts/test-v08-e2e.ts` (Flow 4): Passed 100%. Verified default consent state, unconsented SMS suppression (`NO_CONSENT`), unconsented WhatsApp degradation (`DEGRADE_CHANNEL` -> `PUSH`), explicit consent grant, quiet-hours suppression (`QUIET_HOURS`), daytime dispatch (`SEND`), snooze, and dismiss.
- `test/run-all-tests.py` (CUJ_07 & CUJ_09): Passed 100%. Verified notification fatigue throttling after dismissals and instant queue cancellation on consent revocation.
- `packages/service-notifications`: Fully compiled and tested.
