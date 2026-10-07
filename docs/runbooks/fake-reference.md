# Runbook: Fake Reference & Hallucination Incident

## Severity: CRITICAL
**Incident Trigger:** An AI output or candidate ingestion claims a Surah, Ayah number, or Hadith collection index that does not exist in reality.

### Zero-Tolerance Policy
AMAL OS strictly mandates **Zero Fabricated Citations**. Any hallucination event triggers immediate investigation.

### Detection
- `CitationValidator` in `@amal/evidence` detects non-existent Ayah (e.g., Surah 115 or Surah 2 Ayah 300).
- Gold Benchmark test suite detects hallucinated hadith reference.
- Automated claim auditor blocks unsupported theological claim.

### Resolution Protocol
1. **Kill Switch Activation:**
   - If AI gateway generated the hallucination, immediately route related queries to safe refusal / Scholar Escalation.
2. **Purge Candidate Claims:**
   - Delete candidate claim and penalize generation model temperature.
3. **Add to Regression Suite:**
   - Add the offending query as a permanent test case in `gold_benchmark_cases` to prevent regressions.
