# Runbook: Queue Backlog & Dead-Letter Queue (DLQ) Recovery
**Severity:** SEV-2  
**Service:** BullMQ Redis Workers  

## 1. Initial Triage
1. Check queue depths across priority tiers:
   - P0 (Security)
   - P1 (Scholar Cases)
   - P2 (Core User Operations)
   - P3 (Amal Reminders)
   - P4 (Content Ingestion)
2. Identify whether DLQ count is rising: `GET /internal/platform/health`

## 2. Immediate Containment & Recovery
1. Autoscale background worker pods via HPA:
   `kubectl scale deployment/amal-notify-worker --replicas=10 -n amal-prod`
2. Trigger Outbox Reconciliation API:
   `POST /internal/platform/reconcile/outbox`
3. Inspect and safely replay poisoned messages routed to DLQ after fixing downstream dependencies.
