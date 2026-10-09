# AMAL OS — ETHICAL BILLING & MONETIZATION SPECIFICATION

---

## 1. Ethical Monetization Invariant (INV_04)

> **"Core faith resources in AMAL can NEVER be paywalled."**

The following capabilities are **permanently free** for all users regardless of plan, tier, or payment status:
1. **Quranic Text & Canonical Translations** (Full 114 Surahs, Uthmani script, public translations).
2. **Local Prayer Time Calculations & Notifications** (All juristic methods and astronomical calculations).
3. **Basic Daily Amal & Muhasabah Reflection Vault** (Core deterministic habit progression).
4. **Verified Islamic Primary Evidence Retrieval** (No paywall on accessing what Allah and His Messenger ﷺ have revealed).

---

## 2. Subscription Plans & Entitlements

| Plan | Price (Configurable) | Entitlements | Target Audience |
|---|---|---|---|
| **FREE** | ₹0 / Forever | Core Quran, Prayer times, Daily Primary Amal, Private Reflection Vault, Basic Evidence Search. | All seekers worldwide |
| **PLUS** | ~₹199/month ($4.99/mo) | Unlimited custom journeys, advanced friction adaptation, longitudinal personal insights, family sync (up to 2). | Dedicated practitioners |
| **FAMILY** | ~₹499/month ($12.99/mo) | Household dashboard, up to 6 members, shared community challenges, child account protection. | Muslim households |
| **INSTITUTION** | Custom per organization | Mosque/School program curation, anonymous cohort engagement metrics, institutional scholar desk. | Mosques, Islamic schools |

---

## 3. Non-Guilt Dunning & Transparent Cancellation

1. **Zero Religious Shame in Dunning:** If a subscription payment fails, AMAL will **never** send shame-based messages (e.g. *"Your payment failed, your spiritual journey is at risk"*).
2. **Grace Period & Graceful Downgrade:** 14-day grace period with neutral administrative reminders. After expiration, account reverts to FREE tier without deleting user goals, past journeys, or private reflections.
3. **One-Click Instant Cancellation:** Cancellation takes effect at the end of the billing cycle without retention dark patterns or forced questionnaires.

---

## 4. Double-Entry Revenue & Scholar Economy Ledger

AMAL implements a double-entry ledger (`billing_ledger_entries`) ensuring full financial auditability:

```text
User Payment (₹1,000)
  ├── Credit: Platform Revenue (₹150 - 15% Platform Fee)
  ├── Credit: Scholar Escrow (₹850 - 85% Scholar Honorarium)
  └── Debit: Cash / Payment Processor Receivable (₹1,000)
```

Scholar consultations are remunerated transparently, and escrow payouts are unlocked only upon completion and peer verification of the consultation.
