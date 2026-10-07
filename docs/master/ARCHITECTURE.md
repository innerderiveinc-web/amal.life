# AMAL OS — MASTER ARCHITECTURE SPECIFICATION
**Specification ID:** AMAL-ARCH-001  
**Version:** 1.0.0  
**Authority:** Master Executable Build Specification (Sections 4-7, 176)

---

# 1. Monorepo Structure

```text
Amal/
├── apps/               # web, mobile, admin, scholar
├── services/           # api, ai, notifications, retrieval, content-ingestion, billing, analytics
├── packages/           # types, config, database, auth, policy, consent, privacy, safety,
│                       # evidence, ai-runtime, amal-engine, journey-engine, ui, events, tools
├── infrastructure/     # terraform, kubernetes, docker, ci
├── docs/               # master specs, architecture, runbooks
└── tests/ & benchmarks/# automated verification & gold benchmarks
```

---

# 2. Dependency Direction (Section 7)

```text
UI (Web/Mobile)
      ↓
API Gateway (services/api)
      ↓
Domain Services (Today, Amal, Journeys, Reflections, Knowledge)
      ↓
Domain Packages (@amal/policy, @amal/evidence, @amal/amal-engine)
      ↓
Database (@amal/database PostgreSQL 16 + pgvector)
```

**Forbidden:**
- Database $\rightarrow$ UI
- Database $\rightarrow$ AI
- AI $\rightarrow$ Database directly
- UI $\rightarrow$ Database directly

---

# 3. Master AI Pipeline (Section 56)

Every request proceeds deterministically:
$$\text{Input} \rightarrow \text{Injection Guard} \rightarrow \text{Intent} \rightarrow \text{Safety} \rightarrow \text{Context Firewall} \rightarrow \text{Retrieval} \rightarrow \text{Provenance Verification} \rightarrow \text{Generation} \rightarrow \text{Citation Auditor} \rightarrow \text{Privacy Audit} \rightarrow \text{Final Safety Gate} \rightarrow \text{User Delivery}$$
