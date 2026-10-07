-- ==============================================================================
-- AMAL OS — MIGRATION 012: LAYER 16 EXECUTION BLUEPRINT & LAUNCH OPERATIONS
-- ==============================================================================

-- 1. 12-18 MONTH EXECUTION MILESTONES (PHASES 0 TO 7)
CREATE TABLE IF NOT EXISTS execution_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_number INT NOT NULL,
    phase_code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    target_duration_weeks INT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PLANNED' CHECK (status IN (
        'PLANNED', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED'
    )),
    exit_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SPRINT EXECUTION & QUALITY BUDGETING
CREATE TABLE IF NOT EXISTS execution_sprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sprint_number INT UNIQUE NOT NULL,
    sprint_name VARCHAR(128) NOT NULL,
    squad_name VARCHAR(64) NOT NULL CHECK (squad_name IN (
        'SQUAD_A_CORE_PRODUCT', 'SQUAD_B_AI_KNOWLEDGE', 'SQUAD_C_PLATFORM', 'SQUAD_D_EXPERIENCE'
    )),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    quality_budget_percent INT NOT NULL DEFAULT 20 CHECK (quality_budget_percent BETWEEN 15 AND 35),
    committed_stories JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN (
        'PLANNED', 'ACTIVE', 'COMPLETED', 'RETROSPECTIVE'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. 4-TIER LAUNCH GATES (INTERNAL -> ALPHA -> BETA -> PUBLIC)
CREATE TABLE IF NOT EXISTS launch_gates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gate_level VARCHAR(32) UNIQUE NOT NULL CHECK (gate_level IN (
        'GATE_1_INTERNAL', 'GATE_2_ALPHA', 'GATE_3_BETA', 'GATE_4_PUBLIC'
    )),
    gate_name VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (status IN (
        'PENDING', 'IN_REVIEW', 'PASSED', 'FAILED'
    )),
    evaluated_at TIMESTAMPTZ,
    required_checks JSONB NOT NULL DEFAULT '[]'::jsonb,
    signoff_by JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. LAUNCH DAY KILL SWITCHES (PARTIAL SYSTEM ISOLATION)
CREATE TABLE IF NOT EXISTS launch_kill_switches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    switch_key VARCHAR(64) UNIQUE NOT NULL,
    switch_name VARCHAR(128) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    activated_by UUID,
    reason TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. BETA COHORTS & SCALE CONTROL
CREATE TABLE IF NOT EXISTS beta_cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_name VARCHAR(64) UNIQUE NOT NULL,
    target_users_count INT NOT NULL,
    current_users_count INT NOT NULL DEFAULT 0,
    stage VARCHAR(32) NOT NULL CHECK (stage IN (
        'ALPHA_50', 'BETA_100', 'BETA_300', 'BETA_1000', 'PUBLIC_SCALE'
    )),
    activation_rate NUMERIC(5,2) DEFAULT 0.0,
    d30_retention_rate NUMERIC(5,2) DEFAULT 0.0,
    status VARCHAR(32) NOT NULL DEFAULT 'INVITING' CHECK (status IN (
        'INVITING', 'ACTIVE', 'CONCLUDED', 'PAUSED'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. BETA FEEDBACK & INTENTIONAL AMAL VALIDATION
CREATE TABLE IF NOT EXISTS beta_feedback_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    cohort_id UUID REFERENCES beta_cohorts(id) ON DELETE SET NULL,
    feedback_category VARCHAR(64) NOT NULL CHECK (feedback_category IN (
        'TODAY_FLOW', 'AMAL_FEASIBILITY', 'EVIDENCE_TRUST', 'ADAPTATION_HELPFULNESS',
        'FEELING_JUDGED_OR_SHAMED', 'AI_CITATION', 'APP_STABILITY'
    )),
    severity VARCHAR(32) NOT NULL DEFAULT 'MEDIUM' CHECK (severity IN (
        'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    )),
    summary TEXT NOT NULL,
    did_help_intentional_action BOOLEAN NOT NULL DEFAULT TRUE,
    triage_status VARCHAR(32) NOT NULL DEFAULT 'TRIAGED' CHECK (triage_status IN (
        'TRIAGED', 'IN_PROGRESS', 'RESOLVED', 'WONT_FIX'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PRODUCT DECISION LOG (IMMUTABLE RATIONALE)
CREATE TABLE IF NOT EXISTS product_decision_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    decision_code VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    context_reason TEXT NOT NULL,
    alternatives_considered JSONB NOT NULL DEFAULT '[]'::jsonb,
    evidence_used TEXT NOT NULL,
    decision_owner VARCHAR(128) NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_execution_milestones_phase ON execution_milestones(phase_number);
CREATE INDEX IF NOT EXISTS idx_execution_sprints_squad ON execution_sprints(squad_name, status);
CREATE INDEX IF NOT EXISTS idx_beta_feedback_category ON beta_feedback_records(feedback_category);
