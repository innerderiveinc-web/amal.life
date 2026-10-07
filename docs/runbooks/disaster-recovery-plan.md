# AMAL OS — Disaster Recovery & Business Continuity Plan
**Status:** Canonical Production Operating Procedure  
**Version:** 1.0.0  

---

## 1. Disaster Recovery Tiers & Objectives

| Tier | Subsystems Included | RPO (Recovery Point) | RTO (Recovery Time) |
|---|---|---|---|
| **Tier 0** | Core PostgreSQL, Users, Auth, Policy PDP, RLS | **< 1 minute** | **< 15 minutes** |
| **Tier 1** | Today OS, Amal Engine, Journey State, Islamic Evidence | **< 5 minutes** | **< 30 minutes** |
| **Tier 2** | AI Runtime, Notification Queues, Scholar Desk | **< 1 hour** | **< 2 hours** |
| **Tier 3** | Analytics, Reporting, Batch Content Ingestion | **< 24 hours** | **< 24 hours** |

---

## 2. Recovery Procedures

### 2.1 Complete Region / Primary Loss
1. **Declare Incident:** Incident Commander convenes Crisis Team and sets system status to `SAFE_MODE`.
2. **Database PITR Restore:** Restore latest automated PostgreSQL snapshot in secondary AWS region.
3. **Route53 DNS Failover:** Update DNS records (`api.amal.com`) to secondary region Ingress.
4. **Validation Smoke Tests:** Execute automated synthetic monitoring suite (`python3 test/run-all-tests.py`).
5. **Gradual Traffic Ingestion:** Open traffic in 10% canary cohorts and observe error rates.

### 2.2 Backup Restore Drill Validation
In quarterly drills, operators must restore backups to an isolated environment and verify:
- Complete user identities and goals exist without corruption.
- Adult reflections remain cryptographically isolated.
- Islamic Evidence Graph integrity is 100% intact.
- Tamper-evident audit chain remains uncompromised.
