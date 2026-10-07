# Runbook: AI Provider Failure & Degraded Fallback
**Severity:** SEV-1  
**Service:** `amal-ai` & Model Router  

## 1. Initial Triage
1. Check external AI provider status dashboard (OpenAI, Anthropic, Bedrock, Vertex AI).
2. Inspect AI Gateway error log and timeout counts.

## 2. Automated & Manual Containment
1. If primary provider fails or latency exceeds 10,000ms:
   - ModelRouter automatically reroutes traffic to secondary model provider.
2. If all external providers fail:
   - Trip the AI Circuit Breaker to `DEGRADED`:
     `POST /api/v1/governance/circuit-breakers/trip { "id": "AI_GENERAL", "state": "DEGRADED" }`
   - In `DEGRADED` mode:
     - Open-ended AI chat returns peaceful fallback: *"AMAL AI is currently in degraded mode. You can still search verified evidence, browse the Quran, and complete your daily Amal."*
     - Today OS, Quran, and Journey tracking remain 100% operational.
