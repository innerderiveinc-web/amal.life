# AMAL OS — MASTER DATABASE SPECIFICATION
**Specification ID:** AMAL-DB-001  
**Version:** 1.0.0  
**Authority:** Master Executable Build Specification (Sections 8-15, 46)

---

# 1. Database Standards (Section 9)

Every table requires:
- `id UUID PRIMARY KEY`
- `created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`

Sensitive tables additionally require:
- `data_class VARCHAR(32)` (`PUBLIC`, `INTERNAL`, `PRIVATE`, `SENSITIVE`, `HIGHLY_SENSITIVE`)
- `data_purpose VARCHAR(32)`

---

# 2. Chronological Migration Sequence

| Migration File | Domain & Relational Scope |
|---|---|
| `001_initial_schema.sql` | Users, profiles, base preferences, journeys |
| `001_production_schema_and_rls.sql` | PostgreSQL Row Level Security (RLS), pgvector 768-dim HNSW |
| `002_ai_runtime_governance_and_eval.sql` | AI sessions, L0-L3 memory tiers, tool registry |
| `003_production_relational_schema.sql` | Consolidate 27 relational tables across domains |
| `004_layer6_backend_foundation.sql` | Transactional outbox, worker jobs, idempotency store |
| `005_layer8_islamic_knowledge_infrastructure.sql` | Medina Mushaf immutable hash, Hadith collections & gradings |
| `006_layer9_personal_context_and_adaptation.sql` | Context signals, 15 friction categories, daily plans |
| `007_layer11_communication_and_prayer_intelligence.sql` | Communication consents, fatigue score throttle, prayer twilights |
| `008_layer12_trust_control_plane_and_governance.sql` | PDP policy decisions, tamper-evident SHA-256 audit log, GDPR |
| `009_layer13_production_platform_and_reliability.sql` | Service catalog, Tier 0-3 SLOs, canaries, feature flags |
| `010_layer14_real_corpus_scholar_network_and_knowledge_ops.sql` | Canonical corpus, scholar skills matrix, content disputes |
| `011_layer15_business_monetization_and_institution_platform.sql` | Billing plans, scholar economy, institution SaaS |
| `012_layer16_execution_blueprint_and_launch_operations.sql` | Roadmap phases 0-7, launch gates 1-4, 5 kill switches |
| `013_layer17_master_system_registry_and_certification.sql` | Master topology registry, certifications 1-17, 7 invariants |
