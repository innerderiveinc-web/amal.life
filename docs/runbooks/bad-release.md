# Runbook: Bad Knowledge Release Rollback Incident

## Severity: CRITICAL
**Incident Trigger:** A published knowledge release causes retrieval quality regression, citation failures, or false consensus generation in production.

### Fast Rollback Procedure
1. **Trigger Alias Rollback:**
   ```bash
   curl -X POST https://api.amal-os.internal/internal/knowledge/rollback \
     -H "Authorization: Bearer $INTERNAL_OPS_TOKEN" \
     -d '{"targetSnapshot": "knowledge_snapshot_prev_stable"}'
   ```
2. **Switch Blue-Green Index:**
   - Flip active search alias from `index_B` back to `index_A`.
   - Production retrieval switches instantaneously with zero downtime.
3. **Audit Affected Responses:**
   - Identify all AI prompts evaluated between release activation and rollback.
   - Schedule asynchronous re-evaluation and flag anomalies.
