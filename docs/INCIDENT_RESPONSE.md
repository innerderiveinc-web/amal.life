# AMAL OS — OPERATIONAL INCIDENT RESPONSE & RUNBOOKS

---

## 1. Incident Severity Classification

| Severity | Definition | Response Target | Example Incident |
|---|---|---|---|
| **SEV-0 (Critical)** | Core Islamic theological corruption, unauthorized AI fatwa, or cross-user reflection exfiltration. | < 5 Minutes | Corrupted Ayah Arabic text, bypass of Fatwa Firewall Class E. |
| **SEV-1 (High)** | Fabricated Hadith citation reported, circuit breaker trip, or widespread notification flood. | < 15 Minutes | Ingestion of unapproved Hadith translation, notification runaway. |
| **SEV-2 (Medium)** | Broken journey state transition, erroneous friction adaptation, billing webhook delay. | < 1 Hour | User unable to advance journey phase, duplicate subscription charge. |
| **SEV-3 (Low)** | Minor UI layout defect, non-critical telemetry gap. | < 24 Hours | Misaligned card margin on mobile view. |

---

## 2. Stop-The-Line Circuit Breaker Runbook (SEV-0 / SEV-1)

When a theological corruption or unauthorized fatwa generation is detected:

### Step 1: Trigger Emergency Halt
```bash
# Emergency knowledge serving freeze via API
curl -X POST http://localhost:4000/api/v1/governance/circuit-breakers/trip \
  -H "Authorization: Bearer sec-ops-breakglass" \
  -H "Content-Type: application/json" \
  -d '{"subsystem": "ISLAMIC_AI_RUNTIME", "reason": "Potential citation anomaly detected"}'
```

### Step 2: Instant Rollback to Prior Blue/Green Index
```bash
# Rollback knowledge retrieval release to last verified snapshot
curl -X POST http://localhost:4000/internal/knowledge/releases/rel-uthmani-v1/rollback \
  -H "Authorization: Bearer sec-ops-breakglass"
```

### Step 3: Four-Eyes Governance Resumption
Knowledge serving cannot be re-enabled by a single engineer. It requires two distinct authorized keys:
1. Knowledge Governance Lead
2. Certified Islamic Scholar Reviewer

---

## 3. Data Exfiltration Defense & Containment Runbook

If unauthorized cross-user data access is attempted:
1. **Automated Interception:** The centralized Policy Decision Point (`@amal/policy`) and API firewall log a `SECURITY_VIOLATION_BLOCKED` event with tenant context.
2. **Session Termination:** Revoke all active sessions for the calling actor via `DELETE /api/v1/sessions/:id`.
3. **Audit Log Inspection:** Query `audit_events` table for scope of access attempts within the last 60 minutes.
4. **Tenant Isolation Verification:** Confirm PostgreSQL row-level security and repository ownership filters (`userId = ctx.userId`) remained intact.

---

## 4. Disaster Recovery & Database Restoration Runbook

### Point-in-Time Recovery (PITR) Execution
1. Isolate the compromised database container:
   ```bash
   docker compose stop db
   ```
2. Restore the latest verified physical backup:
   ```bash
   pg_restore -h localhost -U postgres -d amal_os /backups/amal_os_snapshot_latest.dump
   ```
3. Replay transactional outbox events from Redis/WAL to recover non-corrupt state.
4. Run `python3 test/run-all-tests.py` to confirm all 33 test suites pass before re-opening traffic.
