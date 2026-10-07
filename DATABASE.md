# AMAL OS — Database Schema & Data Models

## 1. Relational Engine & Storage Choices

- **Primary Store**: PostgreSQL 16
- **Vector Retrieval**: pgvector (768/1536-dimensional embeddings)
- **Caching & Queues**: Redis 7 + BullMQ
- **Object Storage**: S3-compatible storage (for audio, document certificates)

---

## 2. Core Tables Summary

| Table | Purpose | Integrity & Constraints |
| :--- | :--- | :--- |
| `users` | Primary identity record | UUID PK, Unique Email, Role enum |
| `user_profiles` | Cultural & life-stage context | One-to-one with users, FK cascade |
| `user_preferences` | Madhhab, calculation method, notifications | One-to-one with users, JSON defaults |
| `user_consents` | Audit-trailed consents | Indexed on `(user_id, consent_type)` |
| `user_context` | Explicit, behavioral & derived context | Confidence scores (0.00–1.00), expiry |
| `user_memory` | Three-tier memory (Session, Journey, Long-term) | Explicit consent flags |
| `prayer_events` | Completed & on-time prayer logs | Indexed on `(user_id, date)` |
| `islamic_sources` | Canonical published Islamic works | Authority level enum, provenance JSON |
| `source_passages` | Individual ayahs and hadith passages | Arabic, translation, grading metadata |
| `evidence_edges` | Relational Knowledge Graph links | Edges: `EXPLAINS`, `SUPPORTS`, `RECOMMENDS` |
| `journeys` | Multi-day habit journeys | Status: `ACTIVE`, `PAUSED`, `ADAPTED` |
| `journey_days` | Daily learning and actions | Sequenced by `day_number` |
| `journey_actions` | Action items grounded in sources | Estimated minutes, difficulty rating |
| `reflections` | Daily Muhasabah journals | Private to user; no moral score |
| `families` | Family household clusters | Invite codes, membership roles |
| `scholar_cases` | Escalated jurisprudence cases | Status: `PENDING_TRIAGE`, `ANSWERED` |
| `audit_logs` | Immutable security and access events | Actor, action, resource, timestamp |

---

## 3. Migration Files
- `packages/database/migrations/001_initial_schema.sql` — Pure PostgreSQL DDL migration with UUID extensions, foreign keys, and indexes.
- `packages/database/prisma/schema.prisma` — Prisma ORM schema definitions.
