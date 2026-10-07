# Runbook: API Outage (5xx Spikes or Total Downtime)
**Severity:** SEV-1 or SEV-0  
**Service:** `amal-api`  

## 1. Initial Triage
1. Check Kubernetes pods: `kubectl get pods -n amal-prod -l app=amal-api`
2. Inspect health endpoint: `curl -I https://api.amal.com/health/ready`
3. Check CloudWatch/Prometheus metrics for error rate and ingress saturation.

## 2. Immediate Containment
1. If pods are crash-looping after a recent deployment:
   ```bash
   kubectl rollout undo deployment/amal-api -n amal-prod
   ```
2. If database connection pool is saturated:
   - Check PgBouncer active connections: `SHOW POOLS;`
   - Scale down background workers temporarily to relieve primary DB.
3. If traffic spike / DDoS:
   - Verify AWS WAF rate limiting rules and enable aggressive challenge mode.

## 3. Post-Recovery
- Re-run synthetic monitoring suite: `python3 test/run-all-tests.py`
- Open postmortem ticket within 24 hours.
