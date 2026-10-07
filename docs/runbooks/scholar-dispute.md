# Runbook: Scholarly Dispute & Plurality Escalation Incident

## Severity: HIGH
**Incident Trigger:** Two verified scholars express mutually incompatible verdicts or challenge a published claim as presenting an isolated opinion as universal consensus.

### Operational Principle: Preserve Valid Ikhtilāf
AMAL OS does not pick winners between classical legal methodologies (Madhāhib). It preserves genuine scholarly plurality while ensuring clear conditions and evidence boundaries.

### Resolution Steps
1. **Freeze Exclusive Claim:**
   - Mark claim as `CONTESTED` in `knowledge_claims`.
   - Update `scholarly_positions` with both positions and their respective evidence bases.
2. **Convene Two-Scholar Governance Session:**
   - Assign Scholar A and Scholar B to review the question jointly.
   - Formulate balanced guidance: *"Scholars have differed on this issue. Position 1 (Hanafi/Maliki) holds X with conditions A, while Position 2 (Shafi'i/Hanbali) holds Y with conditions B."*
3. **Publish Updated Plurality Record:**
   - Both scholars sign off on the combined formulation.
   - Unfreeze retrieval and log resolution notes in the audit log.
