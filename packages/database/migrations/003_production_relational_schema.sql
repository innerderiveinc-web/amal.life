-- ======================================================================
-- AMAL OS V1: Migration 003
-- Production Relational Schema with pgvector, strict foreign keys,
-- idempotency constraints, and governance tables (Sections 4-30)
-- ======================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 4. USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. USER PROFILES
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name TEXT,
    preferred_language TEXT,
    timezone TEXT NOT NULL,
    onboarding_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. USER PREFERENCES
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    value JSONB NOT NULL,
    source TEXT NOT NULL,
    confidence NUMERIC(5,4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, key)
);

-- 7. CONTEXT
CREATE TABLE IF NOT EXISTS user_context (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    context_type TEXT NOT NULL,
    value JSONB NOT NULL,
    source TEXT NOT NULL,
    confidence NUMERIC(5,4),
    user_confirmed BOOLEAN NOT NULL DEFAULT false,
    user_visible BOOLEAN NOT NULL DEFAULT true,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. GOALS
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    intent TEXT NOT NULL,
    desired_outcome TEXT,
    priority INTEGER NOT NULL DEFAULT 3,
    status TEXT NOT NULL,
    start_date DATE,
    target_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. JOURNEYS
CREATE TABLE IF NOT EXISTS journeys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    template_id UUID,
    template_version_id UUID,
    title TEXT NOT NULL,
    state TEXT NOT NULL,
    started_at TIMESTAMPTZ,
    paused_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. JOURNEY PHASES
CREATE TABLE IF NOT EXISTS journey_phases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journey_id UUID NOT NULL REFERENCES journeys(id) ON DELETE CASCADE,
    sequence INTEGER NOT NULL,
    title TEXT NOT NULL,
    objective TEXT,
    duration_days INTEGER,
    minimum_action JSONB,
    target_action JSONB,
    exit_criteria JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. AMAL TEMPLATES
CREATE TABLE IF NOT EXISTS amal_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    evidence_ids UUID[],
    minimum_action JSONB,
    target_action JSONB,
    duration_minutes INTEGER,
    frequency TEXT,
    governance_status TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. USER AMALS
CREATE TABLE IF NOT EXISTS user_amals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    template_id UUID REFERENCES amal_templates(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    scheduled_for TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. AMAL COMPLETIONS
CREATE TABLE IF NOT EXISTS amal_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amal_id UUID NOT NULL REFERENCES user_amals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    completion_type TEXT NOT NULL,
    duration_seconds INTEGER,
    idempotency_key TEXT NOT NULL UNIQUE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. REFLECTIONS
CREATE TABLE IF NOT EXISTS reflections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    type TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. FRICTION SIGNALS
CREATE TABLE IF NOT EXISTS friction_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    type TEXT NOT NULL,
    confidence NUMERIC(5,4),
    source TEXT NOT NULL,
    evidence_event_id UUID,
    user_confirmed BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. PERSONAL INSIGHTS
CREATE TABLE IF NOT EXISTS personal_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    statement TEXT NOT NULL,
    confidence NUMERIC(5,4),
    source_events JSONB NOT NULL,
    user_visible BOOLEAN NOT NULL DEFAULT true,
    user_confirmed BOOLEAN NOT NULL DEFAULT false,
    dismissed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- 17. ISLAMIC SOURCE REGISTRY
CREATE TABLE IF NOT EXISTS islamic_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_type TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    publisher TEXT,
    original_source TEXT,
    source_url TEXT,
    language TEXT,
    license_status TEXT NOT NULL,
    verification_status TEXT NOT NULL,
    editorial_status TEXT NOT NULL,
    scholar_review_status TEXT NOT NULL,
    publication_status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. SOURCE VERSIONS
CREATE TABLE IF NOT EXISTS source_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES islamic_sources(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content_hash TEXT NOT NULL,
    metadata JSONB,
    effective_from TIMESTAMPTZ NOT NULL,
    effective_to TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(source_id, version_number)
);

-- 19. SOURCE PASSAGES
CREATE TABLE IF NOT EXISTS source_passages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_version_id UUID NOT NULL REFERENCES source_versions(id) ON DELETE CASCADE,
    parent_passage_id UUID REFERENCES source_passages(id) ON DELETE SET NULL,
    reference TEXT,
    text TEXT NOT NULL,
    normalized_text TEXT,
    embedding vector(1536),
    content_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 20. EVIDENCE NODES
CREATE TABLE IF NOT EXISTS evidence_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_type TEXT NOT NULL,
    source_passage_id UUID REFERENCES source_passages(id) ON DELETE CASCADE,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 21. EVIDENCE EDGES
CREATE TABLE IF NOT EXISTS evidence_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_node UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    to_node UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    edge_type TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(from_node, to_node, edge_type)
);

-- 22. CLAIMS
CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_text TEXT NOT NULL,
    claim_type TEXT NOT NULL,
    support_level TEXT NOT NULL,
    status TEXT NOT NULL,
    verification_metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 23. CLAIM SOURCES
CREATE TABLE IF NOT EXISTS claim_sources (
    claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
    source_passage_id UUID REFERENCES source_passages(id) ON DELETE CASCADE,
    support_type TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY(claim_id, source_passage_id)
);

-- 24. AI REQUESTS
CREATE TABLE IF NOT EXISTS ai_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID,
    intent TEXT,
    safety_class TEXT,
    status TEXT NOT NULL,
    model_provider TEXT,
    model_name TEXT,
    model_version TEXT,
    policy_version TEXT,
    input_tokens INTEGER,
    output_tokens INTEGER,
    latency_ms INTEGER,
    estimated_cost NUMERIC(12,6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 25. AI AGENT RUNS
CREATE TABLE IF NOT EXISTS ai_agent_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES ai_requests(id) ON DELETE CASCADE,
    agent_name TEXT NOT NULL,
    status TEXT NOT NULL,
    input_hash TEXT,
    output_hash TEXT,
    confidence NUMERIC(5,4),
    evidence_ids UUID[],
    model_version TEXT,
    policy_version TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- 26. EVIDENCE SNAPSHOTS
CREATE TABLE IF NOT EXISTS ai_evidence_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES ai_requests(id) ON DELETE CASCADE,
    evidence JSONB NOT NULL,
    retrieval_configuration JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 27. CITATION AUDITS
CREATE TABLE IF NOT EXISTS ai_citation_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES ai_requests(id) ON DELETE CASCADE,
    claim_id UUID REFERENCES claims(id) ON DELETE SET NULL,
    citation JSONB NOT NULL,
    verified BOOLEAN NOT NULL,
    failure_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 28. SAFETY EVENTS
CREATE TABLE IF NOT EXISTS ai_safety_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES ai_requests(id) ON DELETE CASCADE,
    classification TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    policy_action TEXT NOT NULL,
    escalation_required BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 29. MEMORY CANDIDATES
CREATE TABLE IF NOT EXISTS memory_candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    memory_type TEXT NOT NULL,
    statement TEXT NOT NULL,
    confidence NUMERIC(5,4),
    source_events JSONB NOT NULL,
    requires_confirmation BOOLEAN NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 30. SCHOLAR CASES
CREATE TABLE IF NOT EXISTS scholar_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    question TEXT NOT NULL,
    structured_context JSONB,
    evidence_snapshot JSONB,
    user_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
