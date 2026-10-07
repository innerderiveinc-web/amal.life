# AMAL OS — OPERATIONAL IMPLEMENTATION PLAN & BUILD EXECUTION PACK
## Engineering, AI Coding Agent, QA, Knowledge Ops & Scholar Ops Build Contract
**Specification ID:** AMAL-IMPL-001  
**Layer Reference:** Layer 18 (Actual Build Execution Pack)  
**Version:** 1.0.0  
**Status:** APPROVED  
**Standard:** Single Source of Truth for File-Level Deliverables & Sprint Execution  

---

# 1. PURPOSE & BUILD EXECUTION CONTRACT

This implementation plan translates the high-level specifications of AMAL OS into an exact, file-by-file, sprint-by-sprint execution blueprint. Every engineering deliverable, AI agent module, database migration, and test suite is mapped to concrete file manifests, priority tiers, and verification criteria.

### Implementation Hierarchy & Master Order

```text
01 Workspace Tooling
02 Shared Types & Domain Models
03 Runtime Configuration & Feature Flags
04 Database Repositories & Migrations
05 Auth & Session Guards
06 Policy Decision Point (PDP)
07 Consent & Proof Hashes
08 Privacy Vault & Context Firewall
09 Goals & Baseline Service
10 Personal Context Intelligence
11 Life Situation Classification
12 Journey State Machine & Engine
13 Amal Feasibility Engine
14 Today OS Daily Planner
15 Non-Moral Muhasabah Reflection
16 Islamic Evidence Graph
17 Medina Quran Canonical Service
18 Hadith Ingestion & Gradings
19 Tafsir Works & Passages
20 Fiqh Issues & Plurality
21 Hybrid Search & Retrieval
22 Content Ingestion Pipeline
23 Governed AI Runtime Orchestrator
24 Model Gateway & Cost Controls
25 Fatwa Safety Firewall (Classes A-E)
26 Zero-Fabrication Citation Auditor
27 Pastoral Scholar Desk & Human Triage
28 Family Hub & Isolation Vault
29 Adaptive Notification Engine
30 Ethical Billing & Entitlement Engine
31 Four-Eyes Admin Console
32 Web Client (Next.js)
33 Mobile Client (Expo / React Native)
34 Calm Forest Emerald UI Design System
35 Transactional Outbox & Event Bus
36 Tamper-Evident SHA-256 Audit Log
37 Privacy-Preserving Analytics
38 Deterministic Personalization
39 Astronomical Prayer Times Engine
40 Synthetic Seed Fixtures
41 Gold Evaluation Benchmarks
42 End-to-End Test Automation
43 Security & MASVS Hardening
44 Privacy & GDPR Compliance Suites
45 AI Adversarial Red-Teaming
46 Notification Fatigue Verification
47 Financial Double-Entry Ledger Tests
48 Infrastructure as Code (Terraform / K8s)
49 CI/CD GitHub Actions Pipeline
50 Canary Deployment & Disaster Recovery
```

---

# 2. PRIORITY TIERS & SPRINT CAPACITY ALLOCATION

### Master Priority Rule (Section 245)
Any incoming feature request or refactor must tangibly advance at least one of five core pillars:
1. **Theological & Ethical Trust**
2. **Core Amal Habit Loop**
3. **Evidence Authenticity & Zero Hallucination**
4. **User Retention & Habit Sustainability**
5. **System Reliability, Privacy & Security**

Features failing this test are automatically deferred to P3/P4.

### Priority Classifications:
* **P0 (Critical Path / Must-Have):** Platform foundation, database integrity, PDP policy engine, core Amal engine, Medina Quran text, citation auditor, safety firewall, and basic daily loop. Release-blocking.
* **P1 (Core Experience / Should-Have):** Family hub with adult privacy isolation, notification engine with fatigue throttling, Next.js web app, Expo mobile app, and ethical Stripe billing.
* **P2 (Differentiators / Nice-to-Have):** Localized prayer audio, advanced scholar collaborative review tools, and cross-device habit synchronization.
* **P3 (Post-V1 Scale):** Community masjid boards, audio translation generation, and enterprise multi-tenancy.
* **P4 (Experimental):** Wearable companion sync, on-device local quantized models.

### Engineering Quality Budget Rule
Every sprint strictly reserves **20% to 35%** of engineering velocity exclusively for:
* Technical debt remediation
* Bug fixing and static analysis warnings
* Security hardening and secret rotation
* Observability and tracing instrumentation
* Living citation benchmark verification

---

# 3. SQUAD ALLOCATION & RESPONSIBILITY MATRIX

| Squad | Domain Scope | Primary Ownership | Target Sprint Focus |
|---|---|---|---|
| **Squad A: Core Product & Habits** | Personalization, Goals, Journeys, Amal Engine, Today OS, Muhasabah | `packages/amal-engine`, `packages/journey-engine`, `packages/reflection-engine`, `services/api/src/modules/{goals,today,context}` | Sprints 2, 3, 4, 8 |
| **Squad B: AI, Knowledge & Scholar** | Evidence Graph, Corpus Services, AI Orchestration, Safety Firewall, Citations, Scholar Desk | `packages/evidence`, `packages/safety`, `packages/scholar`, `services/ai`, `services/retrieval`, `services/content-ingestion` | Sprints 5, 6, 7, 10 |
| **Squad C: Platform, Trust & Infra** | Monorepo Tooling, DB Migrations, Auth, PDP Policy, Privacy Vault, Admin, CI/CD, K8s, Observability | `packages/{types,database,auth,policy,consent,privacy,audit,events}`, `infrastructure/`, `apps/admin` | Sprints 1, 2, 9, 10 |
| **Squad D: Experience & Comms** | Design Tokens, Mobile App, Web App, Notifications, Prayer Engine | `packages/ui`, `apps/mobile`, `apps/web`, `services/notifications`, `services/api/src/modules/prayers` | Sprints 3, 7, 8, 10 |

---

# 4. 10-SPRINT MASTER EXECUTION ROADMAP

### Sprint 1: Foundation, Workspace & Database (Milestone: V0.1-Alpha)
* **Goal:** Monorepo architecture, TypeScript contracts, PostgreSQL migration foundation, authentication sessions, and feature flag provider.
* **Target Modules:** `MOD_01_WORKSPACE`, `MOD_02_TYPES`, `MOD_03_CONFIG`, `MOD_04_DATABASE`, `MOD_05_AUTH`, `MOD_35_EVENTS`, `MOD_55_FEATURE_FLAGS`.
* **Quality Budget:** 25%.

### Sprint 2: Policy PDP, Privacy & Goals (Milestone: V0.1-Alpha)
* **Goal:** Policy Decision Point (PDP), cryptographic consent tokens, privacy context firewall, and user goal baselines.
* **Target Modules:** `MOD_06_POLICY`, `MOD_07_CONSENT`, `MOD_08_PRIVACY`, `MOD_09_GOALS`, `MOD_10_CONTEXT`, `MOD_11_LIFE_SITUATIONS`, `MOD_36_AUDIT`.
* **Quality Budget:** 25%.

### Sprint 3: Core Amal Loop & Today OS (Milestone: V0.1-Beta)
* **Goal:** Journey state machines, feasibility scoring formula, Today API planner, mobile/web skeletons, and Forest Emerald UI tokens.
* **Target Modules:** `MOD_12_JOURNEYS`, `MOD_13_AMAL_ENGINE`, `MOD_14_TODAY`, `MOD_32_WEB`, `MOD_33_MOBILE`, `MOD_34_UI_TOKENS`.
* **Quality Budget:** 20%.

### Sprint 4: Reflection, Muhasabah & Adaptation (Milestone: V0.1-RC)
* **Goal:** Non-moral Muhasabah journal, structured friction detection, non-shaming journey adaptation algorithms.
* **Target Modules:** `MOD_15_REFLECTION`, `MOD_38_PERSONALIZATION`.
* **Quality Budget:** 25%.

### Sprint 5: Islamic Evidence Graph & Retrieval (Milestone: V0.5-Alpha)
* **Goal:** Canonical Medina Mushaf text hash verification, verified Hadith grading repository, Tafsir passages, and hybrid semantic retrieval.
* **Target Modules:** `MOD_16_EVIDENCE`, `MOD_17_QURAN`, `MOD_18_HADITH`, `MOD_19_TAFSIR`, `MOD_20_FIQH`, `MOD_21_RETRIEVAL`, `MOD_22_INGESTION`.
* **Quality Budget:** 20%.

### Sprint 6: Governed AI Runtime & Safety Firewall (Milestone: V0.5-Beta)
* **Goal:** 13-stage orchestrator, 5-class fatwa safety firewall (Classes A–E), zero-fabrication citation auditor, and model gateway with cost ceilings.
* **Target Modules:** `MOD_23_AI_RUNTIME`, `MOD_24_MODEL_GATEWAY`, `MOD_25_SAFETY`, `MOD_26_CITATION`.
* **Quality Budget:** 25%.

### Sprint 7: Pastoral Scholar Desk & Family Hub (Milestone: V0.8-Alpha)
* **Goal:** Two-jurist human escalation desk, family challenge hub, cryptographic isolation vault for adult reflections.
* **Target Modules:** `MOD_27_SCHOLAR`, `MOD_28_FAMILY`.
* **Quality Budget:** 25%.

### Sprint 8: Adaptive Communications & Ethical Billing (Milestone: V0.8-Beta)
* **Goal:** Multi-method astronomical twilight prayer engine, notification fatigue throttling, Plus subscriptions with unconditional core faith retention.
* **Target Modules:** `MOD_29_COMMUNICATION`, `MOD_30_BILLING`, `MOD_37_ANALYTICS`, `MOD_39_PRAYER`.
* **Quality Budget:** 20%.

### Sprint 9: Production Platform, SRE & Runbooks (Milestone: V1.0-RC)
* **Goal:** Four-Eyes admin console, Kubernetes multi-AZ deployments, automated canary rollouts, OpenTelemetry dashboards, disaster recovery automation.
* **Target Modules:** `MOD_31_ADMIN`, `MOD_48_INFRASTRUCTURE`, `MOD_49_CI_CD`, `MOD_50_DEPLOYMENT`, `MOD_53_OBSERVABILITY`, `MOD_54_INCIDENTS`.
* **Quality Budget:** 30%.

### Sprint 10: Master Verification, Benchmarks & Launch (Milestone: V1.0-GA)
* **Goal:** Verification of all 10 Critical User Journeys (CUJ 1–10), 100 gold citation benchmarks, OWASP red-team attacks, and release-blocking quality gates.
* **Target Modules:** `MOD_41_BENCHMARKS`, `MOD_42_E2E_TESTS`, `MOD_43_SECURITY_TESTS`, `MOD_44_PRIVACY_TESTS`, `MOD_45_AI_TESTS`, `MOD_46_COMMS_TESTS`, `MOD_47_BILLING_TESTS`.
* **Quality Budget:** 35%.

---

# 5. 10 CRITICAL USER JOURNEYS (CUJ MATRIX)

| CUJ ID | Name & Description | Category | Acceptance Criteria | Test Assertion |
|---|---|---|---|---|
| **CUJ_01** | **Onboarding Core Loop**<br>Signup $\to$ Onboarding $\to$ Goal $\to$ Journey $\to$ Today $\to$ 5-min Amal $\to$ Complete $\to$ Reflection | `CORE_PRODUCT` | User can state intent, select 1 primary amal, complete minimum, and reflect privately with zero spiritual shame. | Full loop completed with clean state and verified reflection. |
| **CUJ_02** | **Grounded Question Answering (Patience)**<br>Revelation vs Interpretation vs Action | `AI_KNOWLEDGE` | Grounded strictly in authentic Medina Quran/Bukhari with epistemic separation and zero hallucinations ($>99\%$ accuracy). | 100% cited verses trace to canonical Medina corpus. |
| **CUJ_03** | **Personalized Fiqh Safety Escalation**<br>Class D Inquiries $\to$ Scholar Desk | `SAFETY_SCHOLAR` | AI strictly refuses autonomous fatwa and prepares structured case for two verified human jurists. | Safety Class D triggers with zero autonomous ruling. |
| **CUJ_04** | **Repeated Friction & Paced Adaptation**<br>3 Misses $\to$ Gentle Adaptation | `AMAL_JOURNEY` | System reduces burden without guilt scoring, broken streak penalties, or shame notifications. | Amal duration adapted from 15m to 5m sustainably. |
| **CUJ_05** | **Family Challenge with Reflection Vault**<br>Household Activity $\to$ Private Reflection | `PRIVACY_FAMILY` | Household leader sees aggregate progress; adult member private reflections return `DENY`. | Parent cannot decrypt or access adult child reflections. |
| **CUJ_06** | **Plus Checkout & Core Faith Retention**<br>Subscription Checkout $\to$ Cancellation | `BILLING_COMMERCE` | Core faith essentials remain unconditionally free; cancellation preserves Quran, prayer, evidence. | User retains unrestricted Quran/prayer access on cancel. |
| **CUJ_07** | **Prayer Context & Fatigue Throttling**<br>Adaptive Notification Delivery | `COMMUNICATIONS` | Silence treated as first-class feature; repeated dismissals reduce frequency and never escalate. | Notifications throttle at dismissal rate $\ge 0.5$. |
| **CUJ_08** | **Rejected Insight Forgetting**<br>Reflection Saved $\to$ Insight Rejection | `PRIVACY_AI` | Unconfirmed or rejected AI inferences never pollute the durable personalization graph. | Rejected candidate insight is completely discarded. |
| **CUJ_09** | **Consent Revocation & Job Cascade**<br>Permission Withdrawal $\to$ Queue Flush | `DATA_RIGHTS` | Instant cancellation of all outbound queues upon permission withdrawal with cryptographic proof hash. | BullMQ pending notifications purged synchronously. |
| **CUJ_10** | **Full Right-to-be-Forgotten Erasure**<br>GDPR Account Deletion Request | `DATA_RIGHTS` | Complete cryptographic and physical wipe of personal data within statutory compliance. | User, profile, and reflection tables wiped with audit proof. |

---

# 6. QUALITY GATES & RELEASE VERIFICATION

A build is strictly blocked from advancing between milestones (`V0.1` $\to$ `V0.5` $\to$ `V0.8` $\to$ `V1.0`) if any of the following occur:
1. **Citation Failure:** Any hallucinated or unverified Quranic/Hadith citation in the benchmark suite.
2. **Safety Bypass:** Any autonomous ruling issued by AI on a Class D or Class E theological inquiry.
3. **Privacy Leak:** Any cross-user or parent-to-adult reflection access breach in family mode.
4. **Shame Pattern:** Any UI element showing a broken-streak penalty or guilt-inducing notification copy.
5. **Paywall Infringement:** Any lock placed on the Medina Quran text, prayer calculations, or basic evidence graph.
