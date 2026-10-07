# Runbook: Database Outage & Read-Replica Failover
**Severity:** SEV-0  
**Service:** PostgreSQL 16+ Primary (Multi-AZ)  

## 1. Initial Triage
1. Check RDS status in AWS Console / CLI:
   `aws rds describe-db-instances --db-instance-identifier amal-os-db-production`
2. Test network connectivity from a jump host: `pg_isready -h postgres-primary.prod.internal`

## 2. Immediate Containment
1. If primary node hardware fails:
   - AWS RDS Multi-AZ will automatically trigger synchronous failover to the standby replica within 60–120s.
2. If write transactions are blocked by deadlocks:
   - Identify blocking PIDs:
     `SELECT pid, query, state, age(clock_timestamp(), query_start) FROM pg_stat_activity WHERE state != 'idle';`
   - Terminate blocking idle connections: `SELECT pg_terminate_backend(<pid>);`

## 3. Disaster Recovery Failover (PITR)
- If data corruption occurred, initiate Point-In-Time Recovery:
  `aws rds restore-db-instance-to-point-in-time --target-db-instance-identifier amal-db-recovery --restore-time <ISO_TIMESTAMP>`
