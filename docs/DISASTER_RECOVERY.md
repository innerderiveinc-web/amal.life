# AMAL OS — DISASTER RECOVERY & RESILIENCY SPECIFICATION

## 1. Objectives & SLO Targets
AMAL OS is engineered for maximum fault tolerance and mission-critical resilience:
- **Recovery Point Objective (RPO)**: $\le 5\text{ minutes}$ (continuous WAL archiving to encrypted S3 / GCS).
- **Recovery Time Objective (RTO)**: $\le 15\text{ minutes}$ (automated multi-AZ database failover).
- **Data Loss Tolerance on Canonical Knowledge**: **Zero (0 bytes)**. Canonical Quran, Hadith, and Claims Ledger are cryptographically hashed and version-controlled.

## 2. Recovery Topology & Redundancy

```text
               Active Cloud Region (Primary)
           ┌─────────────────────────────────────┐
           │   App Cluster (Stateless Pods)     │
           │                 │                   │
           │                 ▼                   │
           │      PostgreSQL Primary             │
           │                 │                   │
           └─────────────────┼───────────────────┘
                             │
            Streaming WAL & Cross-Region Sync
                             │
                             ▼
               Passive Cloud Region (DR Standby)
           ┌─────────────────────────────────────┐
           │      PostgreSQL Hot Standby         │
           │                 ▲                   │
           │                 │                   │
           │   App Cluster (Cold/Standby Pods)   │
           └─────────────────────────────────────┘
```

## 3. Automated Drill Verification (`scripts/dr-drill-simulation.ts`)
Regular automated drills verify:
1. **Cold-Start Snapshot Recovery**: Validates restoration of schema, foreign keys, and vector indices.
2. **Cryptographic Ledger Integrity**: Verifies SHA-256 hashes of canonical claims against immutable reference hashes.
3. **Outbox Re-Queueing**: Deserializes queued outbox events and asserts zero poison pills or dead-letter queue bloat.
4. **Safe Mode Graceful Degradation**:
   - If external AI providers (OpenAI, Anthropic, Gemini) suffer an outage, `StopTheLineController` routes queries to deterministic templates.
   - Core faith workflows (Today schedule, Salah timings, Quran reading, Muhasabah reflections) continue functioning 100% uninterrupted.

## 4. Runbook for Primary Database Failover
1. Verify primary node partition via heartbeat watchdog.
2. Promote standby replica to read-write master (`pg_ctl promote`).
3. Update connection pooler DNS / Consul endpoint.
4. Run sanity smoke test (`pnpm run test:v01`).
5. Resume public ingress traffic.
