# Runbook: Privacy Boundary Leakage Incident
**Severity:** SEV-0  
**Service:** Context Firewall & Family Isolation Engine  

## 1. Initial Triage
1. A privacy breach occurs if User A's reflection or private context is visible to User B, or leaked into an LLM response envelope.
2. Invariant: Absolute zero tolerance for cross-user private data leakage.

## 2. Immediate Containment
1. Revoke the affected active user and device sessions immediately.
2. Trip AI General Circuit Breaker to `OFF`:
   `POST /api/v1/governance/circuit-breakers/trip { "id": "AI_GENERAL", "state": "OFF" }`
3. Check `tamper_evident_audit_log` to identify scope of affected requests.
4. Notify Data Protection Officer (DPO) and Security Council within 1 hour.
