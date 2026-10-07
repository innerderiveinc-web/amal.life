# AMAL OS — MASTER SYSTEM ARCHITECTURE SPECIFICATION

## 1. Executive Architectural Topology

AMAL OS is built around three concentric rings that strictly decouple deterministic faith functions from AI, and personal user context from canonical Islamic knowledge:

```text
                      AMAL OS V1
                          │
  ┌───────────────────────┼───────────────────────┐
  ↓                       ↓                       ↓
RING 1                  RING 2                  RING 3
Deterministic Core      Governed Intelligence   Platform & Trust
  │                       │                       │
  ├── Users & Auth        ├── Knowledge Corpus    ├── Policy PDP
  ├── Goals & Baselines   ├── Evidence Graph      ├── Family Hub
  ├── Journey State       ├── Hybrid Retrieval    ├── Communication OS
  ├── Today OS Planner    ├── 14 AI Agents        ├── Billing Engine
  ├── Amal Completions    ├── Fatwa Firewall      ├── Incident Runbooks
  ├── Muhasabah Vault     ├── Citation Auditor    ├── Multi-Cloud IaC
  └── Transactional DB    └── Scholar Triage      └── Tamper-Evident Audit
```

---

## 2. Master System Invariant: Transactional Integrity

Every mutation in the system must follow this invariant:

```text
HTTP Request
   ↓
DTO Validation
   ↓
Authentication
   ↓
Policy / Authorization (PDP)
   ↓
Application Service
   ↓
Domain Rules
   ↓
Repository
   ↓
DB Transaction (withTransaction)
   ├── Domain write
   ├── Outbox event (appendOutboxEvent)
   └── Audit event (AuditService.record)
   ↓
Commit
   ↓
Response
```

---

## 3. Epistemic Separation of Knowledge & Context

To preserve absolute theological integrity:
1. **Canonical Islamic Knowledge:** Immutable, versioned, cryptographic provenance (Medina Quran text hash), public, and multi-scholar reviewed.
2. **Personal Context:** Ephemeral, client-scoped, confidence-weighted, and subject to immediate user erasure. Derived observations are never treated as facts.
3. **Behavioral Science Boundary:** Habit engineering and behavioral techniques are strictly labeled as practical human advice (`[YOU MAY FIND THIS PRACTICAL]`) and never conflated with divine Sunnah without authentic textual proof.

---

## 4. Governed AI Agent System (14 Agents)

1. **Master Orchestrator:** 13-stage deterministic state pipeline coordinating safety, retrieval, generation, and auditing.
2. **Intent Router:** Classifies seeker queries into 4 confidence tiers.
3. **Safety Agent:** Prompt injection defense, data exfiltration prevention, and crisis intervention (Dial 988).
4. **Context Agent:** Ephemeral `AIDataEnvelope` assembly respecting context boundaries.
5. **Memory Agent:** Governed memory lifecycle enforcing: `User Choice` > `Confirmed Preference` > `Observed Pattern` > `AI Inference`.
6. **Islamic Retrieval Agent:** Hybrid BM25 lexical, dense pgvector, and relational graph traversal of approved sources only.
7. **Evidence Verification Agent:** Medina Mushaf SHA-256 provenance and Hadith chain checks.
8. **Deen Explanation Agent:** Calm, accessible articulation of universal virtues and foundational concepts.
9. **Fiqh Plurality Agent:** Explains documented differences across classical madhhabs without sectarian bias or false consensus.
10. **Amal Planner Agent:** Generates daily action candidates constrained to 1 primary and 0–2 optional actions.
11. **Journey Agent:** Evaluates phase progression and suggests gentle adaptations without guilt.
12. **Muhasabah Reflection Agent:** Pattern analysis of friction and intentions without assigning spiritual worth or sin scores.
13. **Scholar Escalation Agent:** Assembles structured Class D pastoral dossiers for human jurist review.
14. **Islamic Citation Auditor:** Strict verification gate verifying every reference before response delivery.
