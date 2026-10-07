# AMAL OS — DATABASE ARCHITECTURE & MIGRATIONS (001–017)

## 1. Relational Engine & Storage Choices
- **Primary Store:** PostgreSQL 16 (Relational System of Record)
- **Vector Retrieval:** pgvector (768/1536-dimensional embeddings for hybrid retrieval)
- **Caching & High-Throughput Buffering:** Redis 7 + BullMQ
- **Object Storage Isolation:** 4 strictly isolated S3 buckets (`public-assets`, `private-user-data`, `evidence-artifacts`, `audit-archives`)

---

## 2. Chronological Migrations Index (001–017)

| Migration | Layer & Scope | Key Tables Created |
|---|---|---|
| `001_initial_schema.sql` | Base Relational Architecture | `users`, `user_profiles`, `user_preferences`, `user_consents`, `audit_logs` |
| `001_production_schema_and_rls.sql` | Production Hardening & RLS | Row-level security policies, strict tenant isolation |
| `002_ai_runtime_governance_and_eval.sql` | AI Telemetry & Evaluation | `ai_requests`, `ai_agent_runs`, `ai_tool_calls`, `ai_safety_events`, `ai_citation_audits` |
| `003_production_relational_schema.sql` | Production Domain Relationships | Relational constraints, foreign keys, cascade safety |
| `004_layer6_backend_foundation.sql` | Backend Services Foundation | Repositories, session records, cache indexes |
| `005_layer8_islamic_knowledge_infrastructure.sql` | Islamic Corpus Infrastructure | `canonical_sources`, `quran_ayahs`, `quran_translations`, `tafsir_passages`, `hadith_entries`, `hadith_gradings` |
| `006_layer9_personal_context_and_adaptation.sql` | Personal Context & Adaptation | `context_signals`, `life_situations`, `friction_signals`, `journey_adaptations`, `daily_plans` |
| `007_layer11_communication_and_prayer_intelligence.sql` | Communication OS & Prayer | `communication_preferences`, `communication_consents`, `notification_jobs`, `prayer_calculation_profiles` |
| `008_layer12_trust_control_plane_and_governance.sql` | Trust Control Plane & PDP | `policies`, `policy_decisions`, `data_classifications`, `tamper_evident_audit_log`, `ai_incidents`, `system_circuit_breakers` |
| `009_layer13_production_platform_and_reliability.sql` | Platform Reliability & SRE | `service_catalog`, `platform_slo_definitions`, `outbox_reconciliations`, `platform_idempotency_store`, `canary_rollout_states` |
| `010_layer14_real_corpus_scholar_network_and_knowledge_ops.sql` | Real Islamic Corpus & Scholars | `verified_scholars`, `scholar_cases_v2`, `knowledge_claims`, `content_disputes`, `knowledge_releases`, `gold_benchmark_cases` |
| `011_layer15_business_monetization_and_institution_platform.sql` | Monetization & Institution SaaS | `billing_plans`, `billing_entitlements`, `user_subscriptions`, `scholar_consultations`, `institutions`, `revenue_ledger_entries` |
| `012_layer16_execution_blueprint_and_launch_operations.sql` | Execution & Launch Gates | `execution_milestones`, `execution_sprints`, `launch_gates`, `launch_kill_switches`, `beta_cohorts`, `product_decision_log` |
| `013_layer17_master_system_registry_and_certification.sql` | Master System Registry | `system_components`, `system_certifications`, `master_api_catalog`, `master_agent_catalog`, `system_invariants` |
| `014_layer18_actual_build_execution_pack.sql` | Execution Pack & CUJs | `execution_modules`, `critical_user_journeys`, `sprint_execution_plans`, `file_implementation_manifest` |
| `015_layer19_bootstrap_codebase_starter.sql` | Bootstrap Starter Schema | Starter fixtures, synthetic demo seeker (`demo@amal.local`), `quran-restart` journey |
| `016_layer20_auth_sessions_and_idempotency.sql` | Layer 20 Session & Idempotency | `auth_sessions` (SHA-256 hashed refresh tokens) & `idempotency_keys` |
| `017_layer20_privacy_requests.sql` | Layer 20 GDPR Data Rights | `privacy_requests` (export and account deletion workflows) |

---

## 3. Core Database Invariants
1. **Append-Only Audit Sequences:** Tamper-evident logging via SHA-256 hash chains (`previous_hash` + `payload_hash` $\to$ `event_hash`).
2. **Exactly-Once Mutations:** `idempotency_keys` table caches completed response bodies for identical client keys for 24 hours.
3. **No Destructive Drops:** All structural updates are executed via additive forward-only migrations.
