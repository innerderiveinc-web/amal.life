-- AMAL OS — Migration 008: Layer 12 Trust Architecture, AI Safety Firewall,
-- Privacy Control Plane, Scholarly Governance & Production Governance
-- Schema covers: Policies, Decisions, Consents, Data Classifications,
-- Tamper-Evident Audit Log, Evidence Snapshots, AI Decisions, Scholar Governance,
-- Privacy Requests, Data Retention, Incidents, Circuit Breakers, Break-Glass Access.

-- 1. Policies & Policy Versions (Policy-As-Code)
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_code VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    category VARCHAR(64) NOT NULL, -- 'PRIVACY', 'AUTHORIZATION', 'AI_SAFETY', 'SCHOLAR_GOVERNANCE', 'DATA_RETENTION'
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE', -- 'DRAFT', 'ACTIVE', 'DEPRECATED'
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policy_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
    version INT NOT NULL,
    rules_definition JSONB NOT NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Four-eyes approval
    effective_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_policy_version UNIQUE (policy_id, version)
);

CREATE TABLE IF NOT EXISTS policy_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(64) NOT NULL,
    actor_id VARCHAR(64) NOT NULL,
    actor_type VARCHAR(32) NOT NULL, -- 'USER', 'SCHOLAR', 'FAMILY_OWNER', 'ADMIN', 'SYSTEM'
    action VARCHAR(64) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(64),
    purpose VARCHAR(64) NOT NULL,
    decision VARCHAR(16) NOT NULL, -- 'ALLOW', 'DENY', 'REDACT', 'ESCALATE'
    reason_codes JSONB NOT NULL DEFAULT '[]'::jsonb,
    obligations JSONB NOT NULL DEFAULT '[]'::jsonb,
    audit_required BOOLEAN NOT NULL DEFAULT TRUE,
    evaluated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_policy_decisions_req ON policy_decisions(request_id);
CREATE INDEX IF NOT EXISTS idx_policy_decisions_actor ON policy_decisions(actor_id);

-- 2. Data Classification & Purpose Bindings
CREATE TABLE IF NOT EXISTS data_classifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_name VARCHAR(64) NOT NULL,
    field_name VARCHAR(64) NOT NULL,
    data_class VARCHAR(32) NOT NULL, -- 'PUBLIC', 'INTERNAL', 'PRIVATE', 'SENSITIVE', 'HIGHLY_SENSITIVE'
    approved_purposes JSONB NOT NULL DEFAULT '["CORE_SERVICE"]'::jsonb,
    is_redactable BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_entity_field_classification UNIQUE (entity_name, field_name)
);

-- 3. Granular Consent Records & Proof Vault
CREATE TABLE IF NOT EXISTS consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    purpose VARCHAR(64) NOT NULL,
    scope VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL, -- 'GRANTED', 'DENIED', 'REVOKED'
    policy_version VARCHAR(32) NOT NULL,
    interface_version VARCHAR(32) NOT NULL,
    proof_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    granted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_consent_user_purpose ON consent_records(user_id, purpose);

-- 4. Tamper-Evident Hash-Chained Audit Log
CREATE TABLE IF NOT EXISTS tamper_evident_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequence_number BIGSERIAL NOT NULL UNIQUE,
    previous_event_hash VARCHAR(64) NOT NULL,
    event_hash VARCHAR(64) NOT NULL UNIQUE,
    actor_id VARCHAR(64),
    actor_type VARCHAR(32) NOT NULL,
    action VARCHAR(64) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(64),
    purpose VARCHAR(64) NOT NULL,
    outcome VARCHAR(16) NOT NULL, -- 'SUCCESS', 'DENIED', 'ERROR'
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_log_seq ON tamper_evident_audit_log(sequence_number);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON tamper_evident_audit_log(action);

-- 5. Evidence Snapshots & AI Decision Records
CREATE TABLE IF NOT EXISTS evidence_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_hash VARCHAR(64) NOT NULL UNIQUE,
    source_versions JSONB NOT NULL DEFAULT '[]'::jsonb,
    passage_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    claim_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    review_states JSONB NOT NULL DEFAULT '{}'::jsonb,
    retrieval_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_decision_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(64) NOT NULL UNIQUE,
    user_id_hash VARCHAR(64) NOT NULL,
    intent VARCHAR(64) NOT NULL,
    safety_class VARCHAR(16) NOT NULL, -- 'CLASS_A', 'CLASS_B', 'CLASS_C', 'CLASS_D', 'CLASS_E'
    model_route VARCHAR(64) NOT NULL,
    agent_path JSONB NOT NULL DEFAULT '[]'::jsonb,
    context_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
    evidence_snapshot_id UUID REFERENCES evidence_snapshots(id) ON DELETE SET NULL,
    citation_audit_id VARCHAR(64),
    decision VARCHAR(64) NOT NULL,
    latency_ms INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Scholar Accreditation, Dual-Review & Dispute Governance
CREATE TABLE IF NOT EXISTS scholar_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    credentials JSONB NOT NULL DEFAULT '[]'::jsonb,
    institutions JSONB NOT NULL DEFAULT '[]'::jsonb,
    fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    madhhab_affiliation VARCHAR(64),
    verification_status VARCHAR(32) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'VERIFIED', 'SUSPENDED', 'REVOKED'
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scholar_dual_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_resource_type VARCHAR(64) NOT NULL, -- 'RULING', 'EVIDENCE_NODE', 'DISPUTED_CLAIM'
    target_resource_id UUID NOT NULL,
    primary_scholar_id UUID NOT NULL REFERENCES scholar_profiles(id) ON DELETE CASCADE,
    secondary_scholar_id UUID NOT NULL REFERENCES scholar_profiles(id) ON DELETE CASCADE,
    status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS', 'APPROVED', 'DISAGREED'
    primary_verdict VARCHAR(32) NOT NULL,
    secondary_verdict VARCHAR(32) NOT NULL,
    plurality_notes TEXT,
    completed_at TIMESTAMPTZ,
    CONSTRAINT chk_different_scholars CHECK (primary_scholar_id != secondary_scholar_id)
);

CREATE TABLE IF NOT EXISTS content_disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evidence_id UUID REFERENCES evidence_nodes(id) ON DELETE SET NULL,
    reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
    dispute_reason TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'OPEN', -- 'OPEN', 'TRIAGED', 'UNDER_REVIEW', 'DECISION_RENDERED', 'CLOSED'
    decision_outcome VARCHAR(32), -- 'CONFIRMED', 'CORRECTED', 'RETRACTED', 'DISPUTE_PRESERVED'
    assigned_scholar_id UUID REFERENCES scholar_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Privacy Requests (GDPR / Data Subject Rights)
CREATE TABLE IF NOT EXISTS privacy_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    request_type VARCHAR(32) NOT NULL, -- 'VIEW', 'EXPORT', 'CORRECT', 'RESTRICT', 'DELETE', 'WITHDRAW_CONSENT'
    status VARCHAR(32) NOT NULL DEFAULT 'REQUESTED', -- 'REQUESTED', 'IDENTITY_VERIFIED', 'SCOPED', 'APPROVED', 'EXECUTING', 'VERIFIED', 'COMPLETED', 'FAILED'
    scope JSONB NOT NULL DEFAULT '[]'::jsonb,
    dependency_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Data Retention Policies & Expiration
CREATE TABLE IF NOT EXISTS data_retention_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_name VARCHAR(64) NOT NULL UNIQUE,
    retention_period_days INT NOT NULL,
    deletion_strategy VARCHAR(32) NOT NULL DEFAULT 'CASCADE', -- 'CASCADE', 'ANONYMIZE', 'RETAIN'
    legal_hold_exempt BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. AI Incidents & Circuit Breakers
CREATE TABLE IF NOT EXISTS ai_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_number VARCHAR(32) NOT NULL UNIQUE,
    severity VARCHAR(16) NOT NULL, -- 'SEV_0', 'SEV_1', 'SEV_2', 'SEV_3', 'SEV_4'
    category VARCHAR(64) NOT NULL, -- 'AI_HALLUCINATION', 'CITATION_FAILURE', 'PRIVACY_LEAK', 'PROMPT_INJECTION', 'UNSAFE_RESPONSE', 'SCHOLAR_IMPERSONATION'
    status VARCHAR(32) NOT NULL DEFAULT 'DETECTED', -- 'DETECTED', 'TRIAGED', 'CONTAINED', 'INVESTIGATING', 'REMEDIATED', 'VALIDATED', 'CLOSED'
    summary TEXT NOT NULL,
    affected_routes JSONB NOT NULL DEFAULT '[]'::jsonb,
    contained_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS system_circuit_breakers (
    id VARCHAR(64) PRIMARY KEY, -- 'AI_GENERAL', 'AI_RELIGIOUS_ANSWERING', 'NOTIFICATIONS', 'WHATSAPP'
    state VARCHAR(32) NOT NULL DEFAULT 'NORMAL', -- 'NORMAL', 'DEGRADED', 'LIMITED', 'OFF'
    tripped_reason TEXT,
    tripped_at TIMESTAMPTZ,
    last_evaluated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10. Break-Glass Emergency Administrative Access
CREATE TABLE IF NOT EXISTS break_glass_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    approver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    justification TEXT NOT NULL,
    requested_scope JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_different_approver CHECK (admin_id != approver_id)
);
