# AMAL OS — QSURA COMMUNICATION GATEWAY & NOTIFICATION INTEGRATION

## 1. Overview
**QSURA** is the unified multi-channel communication engine powering AMAL OS. It orchestrates user touchpoints across Mobile Push (FCM / APNs), In-App Banners, Email (Resend / SendGrid), and WhatsApp Business API.

## 2. Core Pillars of Responsible Communication

### 1. Explicit Opt-in Gating
No communication channel is dispatched without explicit, granular user consent recorded in `user_consents` table. Users can toggle channels independently per message category (`DAILY_REMINDER`, `JOURNEY_PROMPT`, `SCHOLAR_UPDATE`, `FAMILY_ALERT`).

### 2. Adhan & Sacred Silence Windows
During prayer times and the third part of the night (*Tahajjud*), non-essential notifications are automatically held in the queue to preserve spiritual focus.

### 3. Fatigue Throttling
- Maximum 3 outbound push notifications per 24-hour rolling window.
- If a user dismisses 2 consecutive notifications without interaction, the system throttles frequency by 50% for 7 days.
- Zero guilt-tripping language (e.g., *"You haven't read Quran in 3 days!"* is forbidden). Notifications use supportive, gentle framing (*"Whenever you are ready, Surah Al-Mulk awaits"*).

## 3. Architecture & Reliability

```text
Event Trigger (e.g., Fajr Amal Ready)
    │
    ▼
Policy PDP (Check Consent & Account Mode)
    │
    ▼
Fatigue Engine (Check 24h Quota & Silence Window)
    │
    ▼
Transactional Outbox (Postgres outbox_events)
    │
    ▼
QSURA Dispatch Worker (BullMQ / Async Processor)
    │
    ├─────────────┬─────────────┬─────────────┐
    ▼             ▼             ▼             ▼
Push (FCM)     In-App       Email (SMTP)   WhatsApp API
```

## 4. Webhook Ingestion & Delivery Receipts
QSURA tracks delivery, read receipts, and bounce statuses. Replay protection uses HMAC signatures and idempotency tracking on message IDs.
