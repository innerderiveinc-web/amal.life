# Runbook: Notification Loop & Fatigue Runaway
**Severity:** SEV-1  
**Service:** `amal-notifications` & BullMQ  

## 1. Initial Triage
1. Symptom: User reports repeated push alerts within a short window, or queue backlog spikes rapidly.
2. Invariant: Silence is a first-class product feature; no user should ever receive notification pressure.

## 2. Immediate Containment
1. Trigger Emergency Notification Kill Switch:
   `POST /api/v1/governance/circuit-breakers/trip { "id": "NOTIFICATIONS", "state": "OFF" }`
2. Stop the BullMQ notification workers:
   `kubectl scale deployment/amal-notify-worker --replicas=0 -n amal-prod`
3. Purge repeating duplicate jobs by dedupe key:
   `DELETE FROM notification_jobs WHERE status = 'SCHEDULED' AND created_at > NOW() - INTERVAL '1 hour';`
4. Reset and re-verify deduplication constraints (`uq_notification_dedupe`).
