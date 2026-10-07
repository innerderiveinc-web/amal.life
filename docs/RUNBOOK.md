# AMAL OS — MASTER OPERATIONAL RUNBOOK & INCIDENT RESPONSE

## 1. Incident Severity Classification

| Severity | Definition | Target Response | Target Resolution | Escalation Path |
|---|---|---|---|---|
| **SEV-0** | Critical safety, fabricated Islamic claim, data breach, or Tier 0 total outage | Immediate (< 5 min) | < 1 hour | VP Eng, Lead Architect, Lead Scholar |
| **SEV-1** | Core service degraded (Today OS, Amal completions, auth sessions) | < 15 min | < 4 hours | On-Call Lead Engineer |
| **SEV-2** | Secondary feature failure (Notifications backlog, voice mode degraded) | < 1 hour | < 1 business day | Squad Lead |
| **SEV-3** | Minor defect, UI styling inconsistency, analytics event delay | < 1 business day | Next sprint | Development Squad |

---

## 2. Emergency Kill Switches

Operable via the Admin Console or direct API `/api/v1/execution/kill-switches/:key/toggle`:

1. `AI_OFF`: Shuts down all LLM inference; system falls back entirely to deterministic cache and static rules.
2. `AI_ISLAMIC_ANSWERING_OFF`: Blocks religious and fiqh synthesis while keeping general text search active.
3. `PUSH_NOTIFICATIONS_OFF`: Halts all mobile push notifications immediately.
4. `SCHOLAR_CASE_INTAKE_OFF`: Temporarily closes case submission if jurist queue is overloaded.
5. `NEW_SIGNUPS_OFF`: Freezes onboarding during database migrations or infrastructure recovery.

---

## 3. Disaster Recovery & RPO/RTO SLAs

| Reliability Tier | Target Services | Maximum Tolerable Data Loss (RPO) | Target Recovery Time (RTO) |
|---|---|---|---|
| **Tier 0** | Postgres Master, Auth Sessions, Policy Engine | < 1 minute | < 15 minutes |
| **Tier 1** | Today OS, Amal Engine, Journey State Machine, Quran Corpus | < 5 minutes | < 30 minutes |
| **Tier 2** | AI Runtime, Notification Queues, Scholar Desk | < 1 hour | < 2 hours |
| **Tier 3** | Analytics, Batch Corpus Ingestion, Growth Experiments | < 24 hours | < 24 hours |

---

## 4. Operational Runbook Index

Detailed step-by-step resolution procedures are located in [`docs/runbooks/`](file:///Users/irfanashraf/Downloads/Amal/docs/runbooks):
- `api-outage.md`: API Gateway / Kubernetes ingress recovery
- `database-outage.md`: PostgreSQL failover, point-in-time recovery, connection pool exhaustion
- `ai-provider-failure.md`: Upstream LLM provider degradation and deterministic fallback
- `citation-incident.md`: Unverified claim containment, search index quarantine, and cache purge
- `notification-loop.md`: Queue backlog resolution, worker draining, and webhook breaker tripping
- `privacy-incident.md`: Context leakage isolation and emergency GDPR purge verification
- `scholar-dispute.md`: Pluralistic Fiqh disagreement mediation and two-scholar review
- `disaster-recovery-plan.md`: Full multi-region failover and data restore drills
