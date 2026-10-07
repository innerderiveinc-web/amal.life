# Runbook: Citation Mismatch Incident

## Severity: HIGH
**Incident Trigger:** An AI answer cites a real passage (e.g. Surah Al-Baqarah 2:183) but applies it to an unrelated ruling (e.g. commercial contracts instead of fasting).

### Detection
- Post-generation Claim Auditor detects low semantic overlap between claim and evidence passage.
- Red-team evaluation flags citation mismatch.

### Remediation
1. Re-align semantic index with claim verification embeddings.
2. Flag evidence link in knowledge graph as `CONTESTED`.
3. Route topic queries to resident scholar review.
