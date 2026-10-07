# Runbook: Parser Corruption & Normalization Failure

## Severity: HIGH
**Incident Trigger:** An automated parser drops Arabic diacritics, truncates volume pages, or creates duplicate passage records during ingestion.

### Detection
- Ingestion worker reports parsing exceptions or validation warnings.
- Unicode normalization anomalies detected in Arabic text.

### Protocol
1. **Quarantine Ingest Batch:**
   - Stop processing on the active pipeline queue.
   - Move raw artifacts to quarantine storage.
2. **Backoff and Isolate:**
   - Worker implements exponential backoff (max 3 retries) before marking batch `FAILED`.
   - Ensure corrupted passages do not reach the editorial review queue.
3. **Re-parse with Validated Grammar Rules:**
   - Fix parser regular expressions or XML/JSON schema mappings.
   - Run technical validation checks before releasing to Editorial.
