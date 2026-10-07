# Runbook: Islamic Citation & Evidence Integrity Incident
**Severity:** SEV-1 (Religious Integrity)  
**Service:** Islamic Evidence Graph & Citation Validator  

## 1. Initial Triage
1. A citation failure occurs if an AI response quotes an invalid Ayah number or unverified Hadith grading.
2. Invariant: 0 fabricated citations are accepted in AMAL.

## 2. Immediate Containment
1. Trip Religious Integrity Circuit Breaker:
   `POST /api/v1/governance/circuit-breakers/trip { "id": "AI_RELIGIOUS_ANSWERING", "state": "DEGRADED" }`
2. Quarantine the affected response template or knowledge node in PostgreSQL:
   `UPDATE evidence_nodes SET status = 'QUARANTINED' WHERE id = '<evidence_id>';`
3. Assign case to Content Review & Resident Scholars immediately.
