# AMAL OS — Scripts & Automation Toolkit

This directory contains automated build, verification, disaster recovery, load testing, and epistemic auditing utilities for AMAL OS.

---

## 🛠️ Script Categories & Reference

### 1. 🚀 Build & Deployment Utilities
| Script | Language | Purpose | Execution Command |
| :--- | :--- | :--- | :--- |
| `serve-railway.mjs` | Node.js (ESM) | Single-command production entrypoint for Railway / Cloud deployment. Starts Web or API service based on `$SERVICE` environment variable. | `node scripts/serve-railway.mjs` |
| `build-android-apk.sh` | Bash | Generates standalone Android preview APK via EAS Build (`eas build -p android --profile preview`). | `bash scripts/build-android-apk.sh` |
| `build-mobile.sh` | Bash | Native diagnostic pre-build check, metro bundle verification, and bundle asset packing for iOS and Android. | `bash scripts/build-mobile.sh` |
| `deploy-production.sh` | Bash | Automated production release checklist, docker tag validation, and rollout trigger. | `bash scripts/deploy-production.sh` |

### 2. 🔍 Verification & Integrity Runners
| Script | Language | Purpose | Execution Command |
| :--- | :--- | :--- | :--- |
| `verify-full-production-loop.ts` | TypeScript | Simulates end-to-end user lifecycle: signup -> intention -> prayer auqat -> journey -> reflection -> offline sync. | `pnpm test` |
| `verify-live-companion-sync.ts` | TypeScript | Verifies data contract synchronization between Web (`apps/web`), Mobile (`apps/mobile`), and Scholar (`apps/scholar`). | `tsx scripts/verify-live-companion-sync.ts` |
| `spec-check.ts` | TypeScript | Validates repository structure, monorepo invariants, and required file manifests against Section 133 master spec. | `tsx scripts/spec-check.ts` |
| `export-openapi.ts` | TypeScript | Extracts NestJS OpenAPI / Swagger documentation from `services/api` to `docs/openapi.json`. | `tsx scripts/export-openapi.ts` |

### 3. 📚 Knowledge & Epistemic Audit Pipelines
| Script | Language | Purpose | Execution Command |
| :--- | :--- | :--- | :--- |
| `knowledge_audit_pipeline.py` | Python 3 | Audits Islamic claim ledger, Hadith sanad validation, and ensures Zero-Tolerance for unverified texts. | `python3 scripts/knowledge_audit_pipeline.py` |
| `knowledge-audit.ts` | TypeScript | TypeScript-native validator for Quran wisdom exegesis (Kanz-ul-Iman standards) and EveryAyah reciter streams. | `tsx scripts/knowledge-audit.ts` |
| `audit-amal.ts` | TypeScript | Scans monolithic task execution boards and checks operational completeness across all layers. | `tsx scripts/audit-amal.ts` |
| `run-sirah-benchmarks.ts` | TypeScript | Benchmarks the Prophetic Sirah audio streaming registry, timeline events, and Shama'il records. | `tsx scripts/run-sirah-benchmarks.ts` |
| `run-scholar-alpha.ts` | TypeScript | Validates scholar two-jurist quorum logic, quarantine desk actions, and fatwa firewall classification. | `tsx scripts/run-scholar-alpha.ts` |

### 4. ⚡ Scale, Stress & Disaster Recovery Simulations
| Script | Language | Purpose | Execution Command |
| :--- | :--- | :--- | :--- |
| `load-test-simulation.ts` | TypeScript | Simulates 10,000 concurrent user requests hitting prayer calculation, audio endpoints, and token generation. | `tsx scripts/load-test-simulation.ts` |
| `dr-drill-simulation.ts` | TypeScript | Simulates cold-start disaster recovery, snapshot rehydration, and failover circuit breakers. | `tsx scripts/dr-drill-simulation.ts` |
| `security-pen-test.ts` | TypeScript | Executes adversarial red-team prompt injections, SQL injection vectors, and privilege escalation attempts. | `tsx scripts/security-pen-test.ts` |
| `generate_scale_benchmarks.py` | Python 3 | Generates p95 and p99 latency benchmarks across hybrid vector + BM25 search queries. | `python3 scripts/generate_scale_benchmarks.py` |
| `generate-migration-018.ts` | TypeScript | Generates idempotent SQL migration templates for PostgreSQL and pgvector tables. | `tsx scripts/generate-migration-018.ts` |
