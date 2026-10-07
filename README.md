# AMAL OS V1
## Muslim Life Intelligence Platform

> **From Niyyah to Amal.**  
> An intelligent Muslim life companion that helps a person understand their situation through trusted Islamic sources and turn intention into meaningful action.

---

## 1. What is AMAL OS?

AMAL is **not another Islamic utility app**. It does not treat the user's faith as a static checklist of Quran/Hadith tools and notification badges. It is a **Muslim Life Intelligence Platform** that connects:

```text
Niyyah (Intention)
  ↓
Understand (Situation & Friction)
  ↓
Evidence (Grounded Quran & Authentic Hadith)
  ↓
Personal Context (Schedule, Energy, Routine)
  ↓
Plan (Realistic Next Best Action)
  ↓
Amal (Righteous Action)
  ↓
Reflection (Calm Muhasabah without Guilt)
  ↓
Adapt (Gentle Friction Reduction)
  ↓
Growth (Long-term Barakah)
```

---

## 2. Core Architectural Pillars

- **Evidence Before Generation**: AI never invents Islamic evidence. Only approved sources (Tier 1 Quran, Tier 2 Authentic Hadith, Tier 3 Classical Tafsir) can be cited.
- **AI is Not a Mufti (Fatwa Safety Firewall)**: The system explains sources and organizes actionable routines, but strictly escalates personalized legal rulings (divorce, oaths, contract disputes) to human scholars.
- **No Shame Mechanics**: Missed worship or interrupted routines never trigger manipulative guilt or streak shaming. When struggling, the system proposes gentler plans (`Bukhari 39: "Indeed, this religion is easy"`).
- **Privacy by Design**: Sensitive spiritual behavior, private journals, and queries are protected under OWASP MASVS baseline security. Zero advertising, zero sale of religious data.

---

## 3. Monorepo Structure

```text
amal/
├── apps/
│   ├── mobile/             # React Native + Expo (36-screen mobile experience)
│   ├── web/                # Next.js consumer platform
│   ├── admin/              # Next.js content & AI safety control plane
│   └── scholar/            # Next.js pastoral jurisprudence portal
│
├── services/
│   ├── api/                # Core HTTP API service (/api/v1/*)
│   ├── ai/                 # Multi-agent AI Gateway & Orchestrator
│   ├── retrieval/          # Hybrid vector, keyword & tier reranker
│   ├── notifications/      # Gentle contextual notification scheduler
│   └── content-ingestion/  # Islamic source verification pipeline
│
├── packages/
│   ├── types/              # Domain models, safety contracts & DTOs
│   ├── database/           # Prisma schema, SQL DDL migrations & canonical seeds
│   ├── safety/             # Fatwa Firewall, Family Privacy & Red-Team suite
│   ├── evidence/           # Islamic Knowledge Graph, Quran provider & Citation validator
│   ├── auth/               # RBAC permissions & Privacy Center engine
│   ├── ui/                 # Design system tokens (Apple Health + Modern Islamic Editorial)
│   └── config/             # Environment validation & feature flags
│
├── infrastructure/         # Docker Compose, Dockerfiles & Prometheus monitoring
└── test/                   # Automated unit, integration, benchmark & red-team suites
```

---

## 4. Quick Start

### Prerequisites
- Node.js >= 20.0.0 & pnpm (or Python 3.9+ for self-contained test runner)
- PostgreSQL 16 with pgvector & Redis (or run via Docker Compose)

### Verification & Testing
Run the master benchmark & safety evaluation suite:

```bash
python3 test/run-all-tests.py
```

### Starting Services via Docker
```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

---

## 5. Documentation Directory

- [ARCHITECTURE.md](file:///Users/irfanashraf/Downloads/Amal/ARCHITECTURE.md) — Master system design, agent orchestration, and component topologies.
- [SECURITY.md](file:///Users/irfanashraf/Downloads/Amal/SECURITY.md) — OWASP MASVS alignment, cryptographic boundaries, and threat models.
- [PRIVACY.md](file:///Users/irfanashraf/Downloads/Amal/PRIVACY.md) — Data minimization, zero-ads policy, and GDPR-compliant rights.
- [AI_SAFETY.md](file:///Users/irfanashraf/Downloads/Amal/AI_SAFETY.md) — Fatwa Firewall (Classes A–E), prompt injection defense, and red-team tests.
- [EVIDENCE_GOVERNANCE.md](file:///Users/irfanashraf/Downloads/Amal/EVIDENCE_GOVERNANCE.md) — Source hierarchy (Tiers 1–6), provenance, and citation verification.
- [SCHOLAR_WORKFLOW.md](file:///Users/irfanashraf/Downloads/Amal/SCHOLAR_WORKFLOW.md) — Pastoral case escalation, triage, and human verification.
- [DATABASE.md](file:///Users/irfanashraf/Downloads/Amal/DATABASE.md) — ERD, table definitions, relational graphs, and migrations.
- [API.md](file:///Users/irfanashraf/Downloads/Amal/API.md) — Complete OpenAPI-aligned RESTful specifications for `/api/v1/*`.
- [DEPLOYMENT.md](file:///Users/irfanashraf/Downloads/Amal/DEPLOYMENT.md) — Production infrastructure, CI/CD, and rollback policies.
- [TESTING.md](file:///Users/irfanashraf/Downloads/Amal/TESTING.md) — Unit tests, integration suites, and benchmark matrices.
- [OPERATIONS.md](file:///Users/irfanashraf/Downloads/Amal/OPERATIONS.md) — Observability, telemetry, tracing, and runbooks.
