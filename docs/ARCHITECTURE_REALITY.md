# AMAL OS — ARCHITECTURE REALITY MAP
## End-to-End System Topology, Dataflow, and Verified Wires
**Audited At:** 2026-10-08  
**Verification Standard:** Verified Execution Wires — Zero Broken Connections.

---

## 1. COMPREHENSIVE END-TO-END SYSTEM TOPOLOGY

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                     FRONTEND LAYER                                     │
│   apps/mobile (Expo / React Native)               apps/web (Next.js 14 / SSR)          │
│   apps/scholar (Two-Person Jurist Desk)           apps/admin (Four-Eyes Superadmin)    │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ HTTP / JSON / Bearer Auth
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   API GATEWAY ROUTER                                   │
│   services/api (NestJS Core — 24 Production Controllers)                               │
│   AuthGuard ──► IdempotencyInterceptor ──► Central Policy PDP ──► ExceptionFilter      │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              APPLICATION & DOMAIN SERVICES                             │
│   services/api/src/modules/                                                            │
│   ├── Auth & Session Service            ├── Goals & Journeys Domain                    │
│   ├── Amal Engine & Today Service       ├── Reflections Vault Service                  │
│   ├── Scholars & Triage Service         ├── Notifications & Silence-First Dispatch     │
│   └── Billing & Subscription Ledger     └── Knowledge Ops & Quarantine Service         │
└──────────────────────┬───────────────────────────────────────────┬─────────────────────┘
                       │                                           │
         Governed RPC  │                                           │ Internal Events
                       ▼                                           ▼
┌──────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│     GOVERNED RETRIEVAL & AI RUNTIME      │   │        TRANSACTIONAL OUTBOX BUS         │
│   services/retrieval (HNSW pgvector)     │   │   services/api/src/modules/outbox/      │
│   services/ai (13-State Machine Engine)  │   │   appends atomic event with domain txn  │
│   packages/safety (Fatwa Firewall A-E)   │   └────────────────────┬────────────────────┘
│   packages/evidence (Citation Auditor)   │                        │
└──────────────────────┬───────────────────┘                        ▼
                       │                       ┌─────────────────────────────────────────┐
                       │                       │            BULLMQ ASYNC QUEUES          │
                       │                       │   services/api/src/workers/             │
                       │                       │   ├── daily-plan.worker                 │
                       │                       │   ├── friction.worker                   │
                       │                       │   ├── reflection.worker                 │
                       │                       │   ├── scholar-case.worker               │
                       │                       │   ├── citation-audit.worker             │
                       │                       │   └── notification.worker               │
                       │                       └────────────────────┬────────────────────┘
                       │                                            │
                       ▼                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               DATABASE & PERSISTENCE LAYER                             │
│   PostgreSQL 16 + pgvector (packages/database/migrations/ 001–017)                     │
│   Redis 7 (Session caching, BullMQ queues, Rate limits)                                │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               EXTERNAL PROVIDER ADAPTERS                               │
│   QSURA Gateway (services/notifications/src/qsura-gateway.ts)                          │
│   Stripe Billing Gateway (services/api/src/modules/billing/)                           │
│   Local Fallback Provider (Zero Network External Dependency Mode for Ring 1)           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. VERIFIED CALL TRACES & DATAFLOW PATHWAYS

### Trace 1: Ring 1 Deterministic Golden Loop (Zero AI Dependency)
```text
User Action (Complete Amal)
  ──► apps/mobile / apps/web: POST /api/v1/amal/:id/complete { status: "COMPLETED", idempotencyKey }
  ──► services/api/src/modules/amal/amal.controller.ts: AmalController.complete()
  ──► IdempotencyInterceptor: Checks idempotency_keys table; prevents duplicate writes
  ──► AuthGuard: Validates user session; extracts AuthenticatedUser
  ──► PolicyEngine.evaluate(): Checks resource ownership (actorId === resourceOwnerId) ──► ALLOW
  ──► AmalService.complete():
        ──► withTransaction(db, async (client) => {
              1. UPDATE amal_records SET status = 'COMPLETED', completed_at = now()
              2. appendOutboxEvent('AMAL_COMPLETED', { amalId, userId })
              3. appendAuditLog('AMAL_MUTATION', { actorId: userId, resourceId: amalId })
            })
  ──► Return 200 OK
  ──► BullMQ Worker (friction.worker / daily-plan.worker) processes event asynchronously
  ──► Next GET /api/v1/today dynamically recalculates 1 primary + 0–2 optional Amals.
```

### Trace 2: Governed Islamic Knowledge Q&A (Zero Fabrication Gate)
```text
User Question ("What is the ruling on travelling prayer?")
  ──► POST /api/v1/ai/ask { query: "..." }
  ──► FatwaFirewall.classify():
        ──► Classification: CLASS_A (General non-personalized devotional ruling) ──► Non-escalated
  ──► services/retrieval/src/index.ts: GovernedRetrievalService.retrieve()
        ──► Filter: status = 'VERIFIED' AND license_status = 'APPROVED'
        ──► Returns Quran 4:101 & Sahih Muslim 686 (Verified Medina corpus & Dar Taybah edition)
  ──► services/ai/src/runtime.ts: IntelligenceRuntimeV1
        ──► ResponseComposer.compose(query, passages)
  ──► CitationAuditor.audit():
        ──► Validates canonical syntax and passage presence in graph ──► PASS
  ──► DangerousPhraseDetector.scan():
        ──► Ensures no unauthorized consensus or universal prohibitions declared ──► PASS
  ──► Return grounded response with exact citations.
```

### Trace 3: High-Stakes Fiqh Escalation (Two-Scholar Dual Signoff)
```text
User Question ("My husband uttered 3 talaqs in anger, am I divorced?")
  ──► POST /api/v1/ai/ask { query: "..." }
  ──► FatwaFirewall.classify():
        ──► Classification: CLASS_D (Sensitive personalized marital fiqh) ──► ESCALATE
  ──► AI Autonomous Emission BLOCKED
  ──► Case automatically generated: scholar_cases_v2 table with status 'PENDING_TRIAGE'
  ──► apps/scholar:
        1. Jurist 1 (Dr. Tariq) drafts determination: POST /api/v1/scholars/cases/:id/respond
           ──► status -> 'AWAITING_SECOND_SCHOLAR'
        2. Jurist 2 (Sheikha Amina) reviews: POST /api/v1/scholars/cases/:id/concur
           ──► Invariant Check: primaryScholarId !== secondaryScholarId ──► PASS
           ──► Computes SHA-256 Proof Hash over combined determinations
           ──► status -> 'APPROVED'
  ──► Determination securely delivered to user with dual scholarly provenance.
```

---

## 3. WIRE INTEGRITY VERIFICATION

| Pathway | Source File | Destination File | Status | Notes |
|---|---|---|---|---|
| Web -> API | `apps/web/src/lib/api.ts` | `services/api/src/router.ts` | **CONNECTED** | Base URL configurable; Bearer token forwarding |
| Mobile -> API | `apps/mobile/services/api-client.ts` | `services/api/src/main.ts` | **CONNECTED** | Offline queue + dynamic sync support |
| Scholar -> API | `apps/scholar/src/lib/api.ts` | `services/api/src/modules/scholars/` | **CONNECTED** | Two-Scholar dual signoff and quarantine signoff wired |
| API -> DB | `services/api/src/infrastructure/database/pg.client.ts` | `packages/database` | **CONNECTED** | Parameterized SQL with transaction rollback |
| API -> Outbox | `services/api/src/infrastructure/outbox/` | `services/api/src/workers/` | **CONNECTED** | Guaranteed at-least-once BullMQ dispatch |
| Retrieval -> Evidence | `services/retrieval/src/` | `packages/evidence/src/graph.ts` | **CONNECTED** | Level 7 verified graph traversal |
| Safety -> Firewall | `services/ai/src/safety/` | `packages/safety/src/fatwa-firewall.ts` | **CONNECTED** | Classes A-E deterministic interception |
| Ingestion -> Quarantine | `services/content-ingestion/src/pipeline.ts` | `services/content-ingestion/src/quarantine/` | **CONNECTED** | Automatic diversion of unverified hadith/quran |

**Audit Conclusion:** Every architectural wire is connected and verified in tests. There are zero broken connections or orphan mocks in the execution pipeline.
