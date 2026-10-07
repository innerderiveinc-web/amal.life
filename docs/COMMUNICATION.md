# AMAL OS — ADAPTIVE NOTIFICATION & COMMUNICATION INTELLIGENCE

## 1. Operating Philosophy

> **"The best notification is sometimes no notification."**

AMAL OS rejects coercive, dopamine-driven engagement loops. The spiritual journey requires presence, tranquility (Sakīnah), and deliberate intention. Silence is treated as a first-class feature of the operating system.

---

## 2. Channel Hierarchy & Consent

Channels are prioritized strictly by invasiveness and explicit user consent:

1. **In-App Gentle Banner** (Default surface when user is already active)
2. **Mobile Push Notification** (Configurable by time and category)
3. **WhatsApp / Chat Message** (Requires separate explicit opt-in with verified consent hash)
4. **Email Digest** (Reserved for weekly summaries or security events)
5. **SMS** (Critical auth/security fallback only)
6. **Voice Call** (Emergency/urgent time-sensitive reminders only)

---

## 3. Communication Engines

### 1. Consent Engine (`consent-engine.ts`)
- Explicit per-channel and per-purpose permissions.
- Revocation of consent cascades immediately, purging scheduled outbound message queues in BullMQ.

### 2. Fatigue Engine (`fatigue-engine.ts`)
- Calculates dynamic fatigue score:
  $$\text{FatigueScore} = \text{volumeFactor} \times \text{dismissalFactor} \times \text{ignoreFactor} \times \text{pressureMultiplier}$$
- Repeated dismissals automatically throttle notification frequency.
- The system never escalates notification pressure when a user ignores a prompt.

### 3. Collision Engine (`collision-engine.ts`)
- Detects simultaneous notification triggers across prayer times, daily Amals, and reflections.
- Consolidates competing messages into a single calm, unified digest.

### 4. Suppression Engine (`suppression-engine.ts`)
Evaluates 6 sequential suppression barriers before sending any outbound communication:
1. User active in app within the last 5 minutes.
2. Scheduled Amal was already completed.
3. Current local time falls within configured Quiet Hours (e.g., 10:00 PM – 5:00 AM).
4. Fatigue score exceeds safety threshold (> 0.5 dismissal rate).
5. Duplicate message payload sent within last 24 hours.
6. System-wide or category kill switch activated.

---

## 4. CPaaS & QSURA Gateway Integration

```text
AMAL OS Domain
  ├── Purpose limitation
  ├── Content generation
  ├── Prayer time calculation
  └── Fatigue & suppression
          ↓
  AmalCommunicationProvider Interface
          ↓
  QSURA Gateway Adapter (HTTP client with retry & idempotency)
          ↓
  External Providers (WhatsApp Business API, APNs, FCM, SES, Twilio)
```

- High-risk journal content is strictly prohibited from being passed as notification parameters.
- External webhook delivery receipts are authenticated via HMAC-SHA256 signatures.
