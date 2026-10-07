-- ======================================================================
-- AMAL OS V1: Migration 002
-- Islamic AI Intelligence Runtime, Governance, Memory & Evaluation Schema
-- ======================================================================

-- 1. AI REQUESTS
CREATE TABLE IF NOT EXISTS ai_requests (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) UNIQUE NOT NULL,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(64) NOT NULL,
    surface VARCHAR(32) NOT NULL,
    message_text TEXT NOT NULL,
    locale VARCHAR(16) DEFAULT 'en',
    timezone VARCHAR(64) DEFAULT 'UTC',
    journey_id VARCHAR(64) REFERENCES journeys(id) ON DELETE SET NULL,
    goal_id VARCHAR(64),
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX IF NOT EXISTS idx_ai_requests_req_id ON ai_requests(request_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_user ON ai_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_status ON ai_requests(status);

-- 2. AI EXECUTIONS
CREATE TABLE IF NOT EXISTS ai_executions (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    trace_id VARCHAR(64) UNIQUE NOT NULL,
    workflow_state VARCHAR(32) NOT NULL,
    latency_ms INTEGER DEFAULT 0,
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    cost_usd NUMERIC(10, 6) DEFAULT 0,
    final_status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_executions_req ON ai_executions(request_id);
CREATE INDEX IF NOT EXISTS idx_ai_executions_trace ON ai_executions(trace_id);

-- 3. AI AGENT RUNS
CREATE TABLE IF NOT EXISTS ai_agent_runs (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    agent_name VARCHAR(64) NOT NULL,
    input_payload JSONB NOT NULL,
    output_payload JSONB NOT NULL,
    confidence NUMERIC(4, 3) DEFAULT 1.0,
    policy_version VARCHAR(32) NOT NULL,
    model_version VARCHAR(64),
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_agent_runs_req ON ai_agent_runs(request_id);
CREATE INDEX IF NOT EXISTS idx_ai_agent_runs_agent ON ai_agent_runs(agent_name);

-- 4. AI TOOL CALLS
CREATE TABLE IF NOT EXISTS ai_tool_calls (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    tool_name VARCHAR(64) NOT NULL,
    side_effect BOOLEAN DEFAULT FALSE,
    authorized BOOLEAN DEFAULT TRUE,
    user_consent_granted BOOLEAN DEFAULT TRUE,
    input_arguments JSONB NOT NULL,
    output_result JSONB NOT NULL,
    audit_level VARCHAR(16) DEFAULT 'MEDIUM',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_tool_calls_req ON ai_tool_calls(request_id);
CREATE INDEX IF NOT EXISTS idx_ai_tool_calls_name ON ai_tool_calls(tool_name);

-- 5. AI CONTEXT SELECTIONS (Privacy Firewall Minimum Context Audits)
CREATE TABLE IF NOT EXISTS ai_context_selections (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    candidate_keys JSONB NOT NULL,
    selected_keys JSONB NOT NULL,
    stripped_sensitive_keys JSONB NOT NULL,
    privacy_policy_passed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_context_selections_req ON ai_context_selections(request_id);

-- 6. AI RETRIEVAL EVENTS
CREATE TABLE IF NOT EXISTS ai_retrieval_events (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    query_text TEXT NOT NULL,
    lexical_matches_count INTEGER DEFAULT 0,
    vector_matches_count INTEGER DEFAULT 0,
    graph_lineage_depth INTEGER DEFAULT 0,
    retrieved_source_ids JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_retrieval_events_req ON ai_retrieval_events(request_id);

-- 7. AI EVIDENCE SNAPSHOTS
CREATE TABLE IF NOT EXISTS ai_evidence_snapshots (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    snapshot_hash VARCHAR(64) NOT NULL,
    evidence_pack JSONB NOT NULL,
    scholarly_positions JSONB NOT NULL,
    limitations JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_evidence_snapshots_req ON ai_evidence_snapshots(request_id);

-- 8. AI CLAIMS (Claim-by-claim generation ledger)
CREATE TABLE IF NOT EXISTS ai_claims (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    claim_id VARCHAR(64) NOT NULL,
    claim_text TEXT NOT NULL,
    claim_type VARCHAR(32) NOT NULL,
    evidence_ids JSONB NOT NULL,
    support_level VARCHAR(32) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_claims_req ON ai_claims(request_id);

-- 9. AI CITATION AUDITS
CREATE TABLE IF NOT EXISTS ai_citation_audits (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    claimed_reference VARCHAR(128) NOT NULL,
    source_exists BOOLEAN NOT NULL DEFAULT TRUE,
    reference_matches BOOLEAN NOT NULL DEFAULT TRUE,
    passage_supports BOOLEAN NOT NULL DEFAULT TRUE,
    license_valid BOOLEAN NOT NULL DEFAULT TRUE,
    scholar_approved BOOLEAN NOT NULL DEFAULT TRUE,
    audit_passed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_citation_audits_req ON ai_citation_audits(request_id);

-- 10. AI SAFETY EVENTS
CREATE TABLE IF NOT EXISTS ai_safety_events (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    safety_class VARCHAR(16) NOT NULL,
    risk_level VARCHAR(16) NOT NULL,
    scholar_required BOOLEAN DEFAULT FALSE,
    crisis_intercept BOOLEAN DEFAULT FALSE,
    policy_action VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_safety_events_req ON ai_safety_events(request_id);

-- 11. AI POLICY VERSIONS
CREATE TABLE IF NOT EXISTS ai_policy_versions (
    id VARCHAR(64) PRIMARY KEY,
    domain VARCHAR(64) NOT NULL,
    version_tag VARCHAR(32) NOT NULL,
    rules_json JSONB NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    approved_by VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AI PROMPT VERSIONS
CREATE TABLE IF NOT EXISTS ai_prompt_versions (
    id VARCHAR(64) PRIMARY KEY,
    agent_name VARCHAR(64) NOT NULL,
    version_tag VARCHAR(32) NOT NULL,
    prompt_template TEXT NOT NULL,
    hash VARCHAR(64) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. AI MODEL VERSIONS
CREATE TABLE IF NOT EXISTS ai_model_versions (
    id VARCHAR(64) PRIMARY KEY,
    tier VARCHAR(32) NOT NULL,
    provider VARCHAR(32) NOT NULL,
    model_name VARCHAR(64) NOT NULL,
    context_window INTEGER NOT NULL,
    input_cost_per_m NUMERIC(8, 4) NOT NULL,
    output_cost_per_m NUMERIC(8, 4) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. AI COST EVENTS
CREATE TABLE IF NOT EXISTS ai_cost_events (
    id VARCHAR(64) PRIMARY KEY,
    request_id VARCHAR(64) NOT NULL REFERENCES ai_requests(request_id) ON DELETE CASCADE,
    model_name VARCHAR(64) NOT NULL,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    cost_usd NUMERIC(10, 6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. AI INCIDENTS (P0-P3 Response Management)
CREATE TABLE IF NOT EXISTS ai_incidents (
    id VARCHAR(64) PRIMARY KEY,
    severity VARCHAR(16) NOT NULL,
    status VARCHAR(32) NOT NULL,
    summary TEXT NOT NULL,
    root_cause TEXT,
    affected_requests_count INTEGER DEFAULT 0,
    mitigation_applied TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_incidents_sev_stat ON ai_incidents(severity, status);

-- 16. AI EVALUATION RUNS
CREATE TABLE IF NOT EXISTS ai_evaluation_runs (
    id VARCHAR(64) PRIMARY KEY,
    suite_name VARCHAR(64) NOT NULL,
    total_test_cases INTEGER NOT NULL,
    passed_test_cases INTEGER NOT NULL,
    failed_test_cases INTEGER NOT NULL,
    accuracy_rate NUMERIC(5, 4) NOT NULL,
    fabricated_citation_rate NUMERIC(5, 4) NOT NULL,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. AI EVALUATION RESULTS
CREATE TABLE IF NOT EXISTS ai_evaluation_results (
    id VARCHAR(64) PRIMARY KEY,
    run_id VARCHAR(64) NOT NULL REFERENCES ai_evaluation_runs(id) ON DELETE CASCADE,
    benchmark_question_id VARCHAR(64) NOT NULL,
    passed BOOLEAN NOT NULL,
    metrics JSONB NOT NULL,
    discrepancy_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. MEMORY CANDIDATES & CONFIRMATIONS (Controlled Memory Write Policy)
CREATE TABLE IF NOT EXISTS memory_candidates (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    candidate_type VARCHAR(32) NOT NULL,
    statement TEXT NOT NULL,
    confidence NUMERIC(4, 3) NOT NULL,
    source_events JSONB NOT NULL,
    requires_confirmation BOOLEAN DEFAULT TRUE,
    status VARCHAR(32) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_memory_candidates_user ON memory_candidates(user_id);

CREATE TABLE IF NOT EXISTS memory_confirmations (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES memory_candidates(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    decision VARCHAR(16) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_memory_confirmations_user ON memory_confirmations(user_id);

-- ENABLE ROW LEVEL SECURITY ACROSS SENSITIVE RUNTIME DATA
ALTER TABLE ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_context_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_confirmations ENABLE ROW LEVEL SECURITY;

CREATE POLICY ai_requests_user_isolation ON ai_requests
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY memory_candidates_user_isolation ON memory_candidates
    FOR ALL
    USING (user_id = current_setting('app.current_user_id', true));
