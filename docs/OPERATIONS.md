# AMAL OS — Operations & Runbooks

## 1. Observability & Tracing Contract

Every AI and API interaction emits an operational trace record without logging sensitive private reflections or internal chain-of-thought:

```json
{
  "request_id": "req-1718000000",
  "trace_id": "trace-91823",
  "pseudonym_user_id": "anon-8a71b2",
  "intent": "FAJR_STRUGGLE",
  "model": "gemini-1.5-pro",
  "retrieval_sources": ["pass-quran-17-78", "pass-muslim-657"],
  "retrieval_scores": [0.98, 0.96],
  "safety_class": "CLASS_B_GENERAL_GUIDANCE",
  "citations_verified": true,
  "citation_count": 2,
  "latency_ms": 340,
  "tokens": { "input": 45, "output": 120 },
  "cost_usd": 0.0002,
  "final_status": "SUCCESS"
}
```

---

## 2. Operational Runbooks

### Runbook 1: Citation Verification Anomaly Spike
- **Symptom**: `citation_status === false` exceeds 1% of queries over a 15-minute window.
- **Action**: Check ingestion pipeline for newly modified sources; verify vector index health; temporarily engage fallback to high-confidence Tier 1 & Tier 2 cached embeddings.

### Runbook 2: Scholar Escalation Queue Backlog
- **Symptom**: `PENDING_TRIAGE` cases exceed 20 unassigned cases.
- **Action**: Auto-notify on-duty resident scholars via secure alert channel; verify scholar availability status in Admin Console (`/apps/admin`).

### Runbook 3: Emergency Crisis Intercept
- **Symptom**: Class E crisis trigger activated.
- **Action**: Verify user received immediate crisis helpline numbers; audit logs to ensure no shaming or religious obligation was inappropriately enforced during crisis state.
