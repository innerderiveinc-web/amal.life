-- ============================================================================
-- AMAL OS V1 — LAYER 6: PRODUCTION BACKEND FOUNDATION SCHEMA (MIGRATION 004)
-- ============================================================================
-- Full database architecture covering:
-- identity, privacy, user_context, goals, journeys, amal, reflections, evidence,
-- quran, hadith, scholarly, ai, scholar, family, notifications, audit, system, outbox.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ----------------------------------------------------------------------------
-- 1. CORE IDENTITY & USER PREFERENCES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT UNIQUE,
    phone VARCHAR(32) UNIQUE,
    display_name VARCHAR(120),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    locale VARCHAR(16) NOT NULL DEFAULT 'en',
    timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    preferred_language VARCHAR(16),
    country_code CHAR(2),
    onboarding_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    notification_enabled BOOLEAN NOT NULL DEFAULT true,
    reminder_style VARCHAR(30) DEFAULT 'GENTLE',
    personalization_enabled BOOLEAN NOT NULL DEFAULT true,
    memory_enabled BOOLEAN NOT NULL DEFAULT true,
    analytics_enabled BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 2. CONSENT ARCHITECTURE (Explicit Opt-in, Never Inferred)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type VARCHAR(60) NOT NULL,
    version VARCHAR(30) NOT NULL,
    granted BOOLEAN NOT NULL,
    granted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    UNIQUE(user_id, consent_type, version)
);

-- ----------------------------------------------------------------------------
-- 3. USER CONTEXT (EXPLICIT > CONFIRMED > OBSERVED > DERIVED)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_context (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    context_type VARCHAR(30) NOT NULL,
    context_key VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    confidence NUMERIC(5,4),
    user_confirmed BOOLEAN NOT NULL DEFAULT false,
    sensitivity VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    source VARCHAR(40) NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_context_user
ON user_context(user_id);

-- ----------------------------------------------------------------------------
-- 4. GOALS & BASELINES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    intent VARCHAR(50) NOT NULL,
    desired_outcome TEXT,
    priority INTEGER NOT NULL DEFAULT 3,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    start_date DATE,
    target_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_goals_user_status
ON goals(user_id, status);

CREATE TABLE IF NOT EXISTS goal_baselines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    current_frequency JSONB,
    current_duration INTEGER,
    confidence NUMERIC(5,4),
    available_time INTEGER,
    previous_attempts JSONB,
    known_barriers JSONB,
    preferred_time VARCHAR(50),
    preferred_format VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 5. JOURNEY ARCHITECTURE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS journey_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    governance_status VARCHAR(30) NOT NULL,
    current_version_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journey_template_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES journey_templates(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    objective TEXT NOT NULL,
    duration_days INTEGER,
    configuration JSONB NOT NULL,
    evidence_ids UUID[],
    review_status VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(template_id, version)
);

CREATE TABLE IF NOT EXISTS journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES journey_templates(id),
    template_version_id UUID NOT NULL REFERENCES journey_template_versions(id),
    title VARCHAR(200) NOT NULL,
    state VARCHAR(30) NOT NULL,
    current_phase INTEGER NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journey_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID NOT NULL REFERENCES journeys(id) ON DELETE CASCADE,
    sequence INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    objective TEXT,
    duration_days INTEGER,
    minimum_action JSONB NOT NULL,
    target_action JSONB,
    exit_criteria JSONB,
    UNIQUE(journey_id, sequence)
);

-- ----------------------------------------------------------------------------
-- 6. AMAL TEMPLATES & USER AMAL
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS amal_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    minimum_action JSONB NOT NULL,
    target_action JSONB,
    duration_minutes INTEGER,
    frequency VARCHAR(100),
    evidence_ids UUID[],
    governance_status VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_amals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES amal_templates(id),
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    custom_configuration JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amal_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amal_id UUID NOT NULL REFERENCES user_amals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    completion_type VARCHAR(20) NOT NULL,
    duration_minutes INTEGER,
    notes TEXT,
    completed_at TIMESTAMPTZ NOT NULL,
    idempotency_key VARCHAR(120) UNIQUE NOT NULL
);

-- ----------------------------------------------------------------------------
-- 7. FRICTION & JOURNEY ADAPTATION
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS friction_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    confidence NUMERIC(5,4) NOT NULL,
    source VARCHAR(40) NOT NULL,
    evidence_event_id UUID,
    user_confirmed BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journey_adaptations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID NOT NULL REFERENCES journeys(id) ON DELETE CASCADE,
    trigger VARCHAR(100) NOT NULL,
    trigger_data JSONB,
    old_configuration JSONB NOT NULL,
    new_configuration JSONB NOT NULL,
    reason TEXT,
    confidence NUMERIC(5,4),
    user_approved BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 8. REFLECTIONS & PERSONAL INSIGHTS (Non-Moral, Private)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    reflection_type VARCHAR(40) NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS personal_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(60) NOT NULL,
    statement TEXT NOT NULL,
    confidence NUMERIC(5,4),
    source_events UUID[],
    status VARCHAR(30) NOT NULL DEFAULT 'PROPOSED',
    user_visible BOOLEAN NOT NULL DEFAULT false,
    user_confirmed BOOLEAN NOT NULL DEFAULT false,
    dismissed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- 9. ISLAMIC EVIDENCE & KNOWLEDGE GRAPH
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS islamic_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(60) NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    publisher TEXT,
    language VARCHAR(20),
    source_url TEXT,
    license_status VARCHAR(30) NOT NULL,
    scholarly_recognition VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES islamic_sources(id) ON DELETE CASCADE,
    version_label VARCHAR(100),
    content_hash CHAR(64) NOT NULL,
    file_hash CHAR(64),
    acquisition_method VARCHAR(60),
    imported_by UUID,
    import_version VARCHAR(50),
    review_status VARCHAR(30) NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_version_id UUID NOT NULL REFERENCES source_versions(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES source_passages(id),
    reference TEXT,
    text TEXT NOT NULL,
    language VARCHAR(20),
    metadata JSONB,
    embedding vector(1536),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS source_passages_embedding_idx
ON source_passages
USING hnsw (embedding vector_cosine_ops);

CREATE TABLE IF NOT EXISTS evidence_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_type VARCHAR(60) NOT NULL,
    entity_id UUID,
    label TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evidence_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node_id UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    target_node_id UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    edge_type VARCHAR(60) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_text TEXT NOT NULL,
    claim_type VARCHAR(50) NOT NULL,
    support_level VARCHAR(40) NOT NULL,
    status VARCHAR(30) NOT NULL,
    verification JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claim_sources (
    claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
    passage_id UUID NOT NULL REFERENCES source_passages(id) ON DELETE CASCADE,
    support_type VARCHAR(50) NOT NULL,
    PRIMARY KEY(claim_id, passage_id)
);

-- ----------------------------------------------------------------------------
-- 10. QURAN (Immutability after approval)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quran_surahs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    surah_number INTEGER UNIQUE NOT NULL,
    name_ar TEXT NOT NULL,
    name_transliteration TEXT,
    revelation_type VARCHAR(30),
    ayah_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS quran_ayahs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    surah_id UUID NOT NULL REFERENCES quran_surahs(id) ON DELETE CASCADE,
    ayah_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    UNIQUE(surah_id, ayah_number)
);

CREATE TABLE IF NOT EXISTS quran_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ayah_id UUID NOT NULL REFERENCES quran_ayahs(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL,
    translator TEXT NOT NULL,
    publisher TEXT,
    license_status VARCHAR(30) NOT NULL,
    translated_text TEXT NOT NULL,
    version VARCHAR(50)
);

-- ----------------------------------------------------------------------------
-- 11. HADITH & GRADINGS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hadith_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    author TEXT,
    language VARCHAR(20),
    license_status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS hadith_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID NOT NULL REFERENCES hadith_collections(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sequence INTEGER
);

CREATE TABLE IF NOT EXISTS hadith_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES hadith_books(id) ON DELETE CASCADE,
    reference TEXT NOT NULL,
    text TEXT NOT NULL,
    metadata JSONB
);

CREATE TABLE IF NOT EXISTS hadith_gradings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hadith_id UUID NOT NULL REFERENCES hadith_entries(id) ON DELETE CASCADE,
    grader TEXT,
    methodology TEXT,
    grading VARCHAR(100),
    source_reference TEXT
);

-- ----------------------------------------------------------------------------
-- 12. SCHOLARS & SCHOLARLY POSITIONS (Plurality & Ikhtilaf)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scholars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL,
    biography TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    orientation TEXT,
    country_code CHAR(2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scholar_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scholar_id UUID NOT NULL REFERENCES scholars(id) ON DELETE CASCADE,
    institution TEXT,
    credential TEXT,
    specialization TEXT,
    verification_status VARCHAR(30),
    verified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS scholarly_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS scholarly_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_id UUID NOT NULL REFERENCES scholarly_issues(id) ON DELETE CASCADE,
    scholar_id UUID REFERENCES scholars(id),
    madhhab_id UUID,
    position TEXT NOT NULL,
    conditions TEXT,
    evidence_ids UUID[],
    review_status VARCHAR(30) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 13. AI SESSIONS, MESSAGES & AUDIT EVENTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    surface VARCHAR(40),
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES ai_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_retrieval_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES ai_sessions(id) ON DELETE SET NULL,
    query TEXT,
    evidence_ids UUID[],
    retrieval_config JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_citation_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES ai_sessions(id) ON DELETE SET NULL,
    claim_id UUID REFERENCES claims(id) ON DELETE SET NULL,
    evidence_id UUID,
    verified BOOLEAN NOT NULL,
    failure_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 14. SCHOLAR CASES & HUMAN TRIAGE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scholar_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    structured_context JSONB,
    status VARCHAR(40) NOT NULL DEFAULT 'DRAFT',
    consent_at TIMESTAMPTZ,
    assigned_scholar_id UUID REFERENCES scholars(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scholar_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES scholar_cases(id) ON DELETE CASCADE,
    scholar_id UUID NOT NULL REFERENCES scholars(id),
    response TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 15. FAMILY ARCHITECTURE (Cryptographic Isolation of Adult Reflections)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS families (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(30) NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(family_id, user_id)
);

-- ----------------------------------------------------------------------------
-- 16. TRANSACTIONAL OUTBOX PATTERN (Zero Lost Events)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS event_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    aggregate_id UUID NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    attempts INTEGER NOT NULL DEFAULT 0,
    available_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_event_outbox_pending
ON event_outbox(status, available_at)
WHERE status = 'PENDING';
