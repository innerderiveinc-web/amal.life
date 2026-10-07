-- AMAL OS — Migration 009: Layer 13 Production Platform, Cloud Infrastructure,
-- Reliability, SLO Metrics, Outbox Reconciliation & Disaster Recovery

-- 1. Service Catalog & Reliability Tiers
CREATE TABLE IF NOT EXISTS service_catalog (
    id VARCHAR(64) PRIMARY KEY, -- 'amal-api', 'amal-ai', 'amal-notifications', etc.
    name VARCHAR(128) NOT NULL,
    criticality VARCHAR(16) NOT NULL, -- 'TIER_0', 'TIER_1', 'TIER_2', 'TIER_3'
    owner_team VARCHAR(64) NOT NULL,
    runbook_url TEXT NOT NULL,
    health_endpoint VARCHAR(128) NOT NULL DEFAULT '/health',
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Service Level Objectives (SLOs) & Error Budgets
CREATE TABLE IF NOT EXISTS platform_slo_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id VARCHAR(64) NOT NULL REFERENCES service_catalog(id) ON DELETE CASCADE,
    slo_name VARCHAR(128) NOT NULL, -- 'API Availability', 'Today Latency p95', 'Citation Accuracy'
    target_percentage NUMERIC(5,3) NOT NULL, -- e.g., 99.900%
    window_days INT NOT NULL DEFAULT 30,
    current_burn_rate NUMERIC(6,3) NOT NULL DEFAULT 0.000,
    error_budget_remaining NUMERIC(5,3) NOT NULL DEFAULT 100.000,
    status VARCHAR(32) NOT NULL DEFAULT 'HEALTHY', -- 'HEALTHY', 'AT_RISK', 'EXHAUSTED'
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_service_slo UNIQUE (service_id, slo_name)
);

-- 3. Outbox Reconciliation & Dead-Letter Queue (DLQ) Recovery
CREATE TABLE IF NOT EXISTS outbox_reconciliations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    scanned_events INT NOT NULL DEFAULT 0,
    stuck_events INT NOT NULL DEFAULT 0,
    recovered_events INT NOT NULL DEFAULT 0,
    dlq_routed_events INT NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'SUCCESS',
    details JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 4. Global Idempotency Store (Multi-Service Exactly-Once Guarantee)
CREATE TABLE IF NOT EXISTS platform_idempotency_store (
    idempotency_key VARCHAR(128) PRIMARY KEY,
    service_id VARCHAR(64) NOT NULL,
    request_hash VARCHAR(64) NOT NULL,
    response_payload JSONB,
    status VARCHAR(32) NOT NULL DEFAULT 'PROCESSING', -- 'PROCESSING', 'COMPLETED', 'FAILED'
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_idempotency_expires ON platform_idempotency_store(expires_at);

-- 5. Synthetic User Monitoring Runs
CREATE TABLE IF NOT EXISTS synthetic_monitoring_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    suite_name VARCHAR(64) NOT NULL, -- 'SYNTHETIC_TODAY_LOOP', 'SYNTHETIC_CITATION_QUERY', 'SYNTHETIC_PRAYER_SYNC'
    duration_ms INT NOT NULL,
    status VARCHAR(16) NOT NULL, -- 'PASS', 'FAIL'
    error_message TEXT,
    probes_executed JSONB NOT NULL DEFAULT '[]'::jsonb,
    executed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Canary Rollout States & Progressive Delivery
CREATE TABLE IF NOT EXISTS canary_rollout_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id VARCHAR(64) NOT NULL REFERENCES service_catalog(id) ON DELETE CASCADE,
    version_tag VARCHAR(64) NOT NULL,
    traffic_percentage INT NOT NULL DEFAULT 5, -- 5, 15, 30, 60, 100
    status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS', 'PROMOTED', 'ROLLED_BACK'
    error_rate NUMERIC(5,4) NOT NULL DEFAULT 0.0000,
    latency_p95_ms INT NOT NULL DEFAULT 0,
    rollback_reason TEXT,
    promoted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Platform Feature Flags (Central Audit & Kill Switches)
CREATE TABLE IF NOT EXISTS platform_feature_flags (
    flag_key VARCHAR(64) PRIMARY KEY,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    rollout_percentage INT NOT NULL DEFAULT 100,
    environment VARCHAR(32) NOT NULL DEFAULT 'PRODUCTION',
    authorized_by VARCHAR(64) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
