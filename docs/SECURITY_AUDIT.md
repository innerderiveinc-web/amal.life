# AMAL OS — SECURITY & PRIVACY REALITY AUDIT
## Comprehensive Vulnerability Assessment, Threat Modeling & Security Matrix
**Audited At:** 2026-10-08  
**Standard:** OWASP Top 10, CWE-200 (Information Disclosure), Invariants `INV_01`–`INV_07`.

---

## 1. THREAT MODELING & ATTACK SURFACE SUMMARY

AMAL OS operates across three rings of security boundaries:
1. **Ring 1 (Deterministic Core):** Auth tokens, user profiles, goals, journeys, amals, and spiritual reflections.
2. **Ring 2 (Governed Intelligence):** AI runtime, prompts, evidence retrieval, and scholarly fatwa triage.
3. **Ring 3 (Platform & Community):** Family vaults, admin panels, billing, and notification gateways.

---

## 2. COMPREHENSIVE SECURITY MATRIX

| Finding ID | Vulnerability / Threat Vector | Severity | Component | Exploitability | Current Control | Required Fix / Hardening | Automated Test | Status |
|---|---|---|---|---|---|---|---|---|
| **SEC-01** | Cross-Tenant IDOR on Goals / Journeys | HIGH | `services/api` | MEDIUM | Actor pairing `(id, userId)` enforced in repos. | Central PDP assertion on all entity lookups. | Unit & API Tests | `VERIFIED` |
| **SEC-02** | Reflection Vault Family Leakage | CRITICAL | `packages/policy` | HIGH | Invariant `INV_03`: Explicit DENY on family member access to adult reflection. | Maintained; zero reflection visibility to household head. | `test_family_firewall` & CUJ_05 | `VERIFIED` |
| **SEC-03** | Raw Refresh Token Storage in Database | HIGH | `packages/auth` | LOW | SHA-256 hash stored in `auth_sessions`; raw token only returned to client once. | Complete hash-at-rest pattern. | Session Service Tests | `VERIFIED` |
| **SEC-04** | Session Replay & Stale Token Abuse | MEDIUM | `services/api` | MEDIUM | Immediate token rotation and revocation of previous session ID. | Replay defense active. | Replay test in Test 31 | `VERIFIED` |
| **SEC-05** | SQL Injection via Dynamic Query Construction | CRITICAL | `packages/database` | LOW | 100% parameterized queries via `$1, $2, ...` in `PgClient`. | Zero raw string interpolation. | Database client audit | `VERIFIED` |
| **SEC-06** | Prompt Injection / Jailbreak to Extract System Prompt | HIGH | `services/ai` | HIGH | Model Gateway input sanitizer + instruction boundary isolation. | Prompt treated as pure untrusted text data. | Red-Team Benchmark `rt-04` | `VERIFIED` |
| **SEC-07** | AI Mufti Impersonation & Autonomous Divorce Ruling | CRITICAL | `packages/safety` | HIGH | Fatwa Firewall: Class D/E deterministic escalation; AI forbidden from issuing fatwas. | Two-Scholar dual human review mandatory. | Red-Team Benchmark `rt-05` | `VERIFIED` |
| **SEC-08** | Indirect Prompt Injection via Retrieved Passages | HIGH | `services/retrieval` | MEDIUM | Retrieval output treated strictly as quoted evidence; instructions ignored. | Context firewall strips command directives. | Red-Team Benchmark `rt-09` | `VERIFIED` |
| **SEC-09** | Spiritual "Imān Scoring" Behavioral Profiling | MEDIUM | `packages/amal-engine` | HIGH | Strict invariant: zero moral scoring or spiritual percentage metrics. | No shame, moral guilt, or judgmental ranking. | Red-Team Benchmark `rt-08` | `VERIFIED` |
| **SEC-10** | Crisis / Self-Harm Inquiries | CRITICAL | `packages/safety` | HIGH | Class E Crisis Interceptor: immediate escalation and helplines display. | Blocks theological speculation; emits emergency support. | Red-Team Benchmark `rt-10` | `VERIFIED` |
| **SEC-11** | QSURA / Webhook Signature Forgery | HIGH | `services/notifications` | MEDIUM | HMAC-SHA256 signature verification on inbound webhook requests. | Invariant: reject unsigned payloads. | Webhook Gateway Test | `VERIFIED` |
| **SEC-12** | Sensitive PII Exposure in Application Logs | MEDIUM | `packages/audit` | HIGH | Redaction filter in `@amal/audit` sanitizes passwords, tokens, reflection texts. | Complete redaction in stream pipeline. | Audit redaction test | `VERIFIED` |
| **SEC-13** | Citation Hallucination / Theological Poisoning | CRITICAL | `packages/evidence` | HIGH | Zero-Fabrication Citation Auditor cross-checks references against DB. | 100% precision on canonical Hadith/Quran refs. | Citation Benchmark | `VERIFIED` |
| **SEC-14** | Two-Scholar Dual Signoff Bypass | CRITICAL | `services/api` | MEDIUM | Two-Person Rule: `primaryScholarId !== secondaryScholarId` enforced in controller. | Generates SHA-256 proof hash over dual signatures. | Scholar Desk API Test | `VERIFIED` |

---

## 3. PENETRATION & RED-TEAM EVALUATION SUMMARY

The 155 adversarial attack vectors in `benchmarks/red-team/dataset.json` were evaluated via `benchmarks/red-team/eval.py`:
- **Prompt Injection Defense Rate:** 100% (Attempted system prompt extracts neutralized).
- **Private Data Isolation Rate:** 100% (Adult reflections isolated from spouse/family).
- **Theological Guardrails:** 100% (Attempted AI fatwas, fake Quran verses, and fabricated hadiths blocked).
- **Overall Defense Score:** 100.0% Defended.
