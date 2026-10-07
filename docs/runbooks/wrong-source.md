# Runbook: Wrong Source Ingestion Incident

## Severity: HIGH to CRITICAL
**Incident Trigger:** A source passage has been misattributed to the wrong collection, author, or book in the canonical registry.

### Detection
1. Automated reference QA validation failure.
2. Reviewer or scholar dispute logged with reason `WRONG_ATTRIBUTION`.
3. Ingestion pipeline hash mismatch against digital artifact.

### Immediate Containment Steps
1. **Quarantine Source:**
   ```bash
   curl -X POST https://api.amal-os.internal/internal/knowledge/quarantine \
     -H "Authorization: Bearer $INTERNAL_OPS_TOKEN" \
     -d '{"sourceId": "SRC_ID", "reason": "WRONG_ATTRIBUTION"}'
   ```
2. **Freeze Retrieval:** Ensure AI retrieval filter ignores quarantined sources:
   ```sql
   UPDATE canonical_sources 
   SET publication_status = 'QUARANTINED', review_status = 'REJECTED' 
   WHERE source_id = 'SRC_ID';
   ```
3. **Audit Dependent Responses:** Scan historical responses citing this source passage:
   ```bash
   curl https://api.amal-os.internal/internal/knowledge/affected-answers?sourceId=SRC_ID
   ```

### Resolution & Recovery
1. Re-ingest the authentic source artifact with validated SHA-256 digital hash.
2. Submit for Two-Person Scholar Review.
3. Re-run Gold Retrieval benchmarks before unfreezing publication.
