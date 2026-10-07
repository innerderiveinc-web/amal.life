# Runbook: License Expiration & Rights Management Incident

## Severity: MEDIUM to HIGH
**Incident Trigger:** A licensed commentary, contemporary translation, or scholarly work reaches expiration or restricted commercial status.

### Automated Warnings
- 30 days prior: Warning logged to Knowledge Ops Slack/Dashboard.
- 14 days prior: Escalated to Licensing Legal Lead.
- 7 days prior: Final renewal alert.
- Expiration: Source status automatically set to `EXPIRED`.

### Actions on Expiry
1. Source publication status moves to `QUARANTINED` / `RESTRICTED`.
2. Existing knowledge claims derived exclusively from this work are quarantined from public AI retrieval.
3. Replace with public-domain classical scholarly source where available.
