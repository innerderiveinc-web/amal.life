-- =============================================================================
-- AMAL OS V1 — COMPLETE PRODUCTION DATABASE MIGRATION & RLS POLICIES
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- -----------------------------------------------------------------------------
-- 1. IDENTITY & PROFILE CLUSTER
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'USER'
        CHECK (role IN ('USER', 'FAMILY_ADMIN', 'SCHOLAR', 'SCHOLAR_REVIEWER', 'CONTENT_EDITOR', 'CONTENT_REVIEWER', 'ADMIN', 'SUPER_ADMIN')),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION', 'DELETED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(255) NOT NULL,
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    country VARCHAR(10) NOT NULL DEFAULT 'IN',
    timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    life_stage VARCHAR(50)
        CHECK (life_stage IS NULL OR life_stage IN ('STUDENT', 'YOUNG_PROFESSIONAL', 'PARENT', 'MARRIED', 'ENTREPRENEUR', 'NEW_MUSLIM', 'OTHER')),
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user ON user_profiles(user_id);

CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    madhhab VARCHAR(50) NOT NULL DEFAULT 'GENERAL'
        CHECK (madhhab IN ('HANAFI', 'SHAFI_I', 'MALIKI', 'HANBALI', 'GENERAL')),
    prayer_calculation_method VARCHAR(100) NOT NULL DEFAULT 'MUSLIM_WORLD_LEAGUE',
    reminder_style VARCHAR(50) NOT NULL DEFAULT 'CALM'
        CHECK (reminder_style IN ('CALM', 'PRAYER_ONLY', 'GENTLE_NUDGE', 'SILENT')),
    notification_preferences JSONB NOT NULL DEFAULT '{"salah":true,"amal":true,"reflection":true,"journey":true,"scholar":true,"family":true}',
    content_preferences JSONB NOT NULL DEFAULT '{"preferredLanguage":"en","showScholarlyDifferences":true,"primaryGoals":[]}',
    privacy_preferences JSONB NOT NULL DEFAULT '{"allowAiMemory":true,"allowBehavioralContext":true,"allowFamilyProgressShare":false,"allowAnalytics":false}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL,
    granted BOOLEAN NOT NULL DEFAULT TRUE,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_user_consents_lookup ON user_consents(user_id, consent_type);

-- -----------------------------------------------------------------------------
-- 2. CONTEXT ENGINE & USER MEMORY
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS user_context (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    context_type VARCHAR(50) NOT NULL CHECK (context_type IN ('EXPLICIT', 'BEHAVIORAL', 'DERIVED')),
    category VARCHAR(100) NOT NULL CHECK (category IN ('SLEEP', 'WORK_SCHEDULE', 'STRESS_LEVEL', 'KNOWLEDGE_LEVEL', 'COMMUTE', 'ROUTINE')),
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    source VARCHAR(100) NOT NULL,
    confidence NUMERIC(3,2) NOT NULL DEFAULT 1.00 CHECK (confidence BETWEEN 0.00 AND 1.00),
    visibility VARCHAR(50) NOT NULL DEFAULT 'USER_ONLY' CHECK (visibility IN ('USER_ONLY', 'SCHOLAR_ALLOWED', 'SYSTEM_ONLY')),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_context_user_cat ON user_context(user_id, category);

CREATE TABLE IF NOT EXISTS user_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level VARCHAR(50) NOT NULL CHECK (level IN ('SESSION', 'JOURNEY', 'LONG_TERM')),
    content TEXT NOT NULL,
    summary VARCHAR(255) NOT NULL,
    relevance_tags TEXT[] NOT NULL DEFAULT '{}',
    user_approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_user_memory_user_lvl ON user_memory(user_id, level);

-- -----------------------------------------------------------------------------
-- 3. ISLAMIC EVIDENCE GRAPH & KNOWLEDGE BASE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS islamic_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('QURAN', 'HADITH', 'TAFSIR', 'FIQH', 'SEERAH', 'SCHOLARLY_WORK', 'EDITORIAL')),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    collection VARCHAR(255),
    volume INT,
    book_number INT,
    chapter_number INT,
    hadith_number INT,
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    publisher VARCHAR(255),
    license VARCHAR(100) NOT NULL DEFAULT 'OPEN_VERIFIED',
    authority_level VARCHAR(50) NOT NULL CHECK (authority_level IN ('TIER_1_QURAN', 'TIER_2_AUTHENTIC_HADITH', 'TIER_3_CLASSICAL_TAFSIR', 'TIER_4_CONTEMPORARY', 'TIER_5_EDITORIAL', 'TIER_6_AI_SYNTHESIS')),
    verification_status VARCHAR(50) NOT NULL DEFAULT 'APPROVED' CHECK (verification_status IN ('INGESTED', 'PARSED', 'NORMALIZED', 'SOURCE_VERIFIED', 'EDITORIAL_REVIEW', 'SCHOLAR_REVIEW', 'APPROVED', 'REJECTED')),
    version VARCHAR(20) NOT NULL DEFAULT '1.0',
    provenance JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_islamic_sources_auth ON islamic_sources(source_type, authority_level);
CREATE INDEX IF NOT EXISTS idx_islamic_sources_verif ON islamic_sources(verification_status);

CREATE TABLE IF NOT EXISTS source_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES islamic_sources(id) ON DELETE CASCADE,
    reference VARCHAR(100) NOT NULL UNIQUE,
    arabic_text TEXT,
    translated_text TEXT NOT NULL,
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    grading VARCHAR(50) CHECK (grading IS NULL OR grading IN ('SAHIH', 'HASAN', 'DAIF', 'MUTAWATIR', 'NOT_APPLICABLE')),
    narrator_chain TEXT[],
    context_summary TEXT,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    embedding VECTOR(768),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_source_passages_src ON source_passages(source_id);
CREATE INDEX IF NOT EXISTS idx_source_passages_ref ON source_passages(reference);
CREATE INDEX IF NOT EXISTS idx_source_passages_keywords ON source_passages USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_source_passages_embedding ON source_passages USING hnsw (embedding vector_cosine_ops);

CREATE TABLE IF NOT EXISTS evidence_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_entity_type VARCHAR(50) NOT NULL,
    from_entity_id VARCHAR(100) NOT NULL,
    edge_type VARCHAR(50) NOT NULL CHECK (edge_type IN ('PART_OF', 'EXPLAINS', 'REFERENCES', 'SUPPORTS', 'CONTRADICTS', 'QUALIFIES', 'RELATED_TO', 'NARRATED_BY', 'AUTHORED_BY', 'BELONGS_TO', 'DIFFERS_FROM', 'APPLIES_TO', 'LEADS_TO', 'RECOMMENDS')),
    to_entity_type VARCHAR(50) NOT NULL,
    to_entity_id VARCHAR(100) NOT NULL,
    confidence NUMERIC(3,2) NOT NULL DEFAULT 1.00,
    scholarly_note TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_evidence_edges_from ON evidence_edges(from_entity_type, from_entity_id);
CREATE INDEX IF NOT EXISTS idx_evidence_edges_to ON evidence_edges(to_entity_type, to_entity_id);
CREATE INDEX IF NOT EXISTS idx_evidence_edges_type ON evidence_edges(edge_type);

CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    parent_slug VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS islamic_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term_arabic VARCHAR(100) NOT NULL,
    term_latin VARCHAR(100) NOT NULL UNIQUE,
    definition TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('AQEEDAH', 'IBADAH', 'MUAMALAT', 'AKHLAQ')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 4. WORSHIP, PROGRESS & REFLECTIONS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS prayer_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prayer_name VARCHAR(50) NOT NULL CHECK (prayer_name IN ('FAJR', 'SUNRISE', 'DHUHR', 'ASR', 'MAGHRIB', 'ISHA')),
    date VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('ON_TIME', 'LATE', 'MISSED', 'EXCUSED')),
    completed_at TIMESTAMPTZ,
    prayed_in_congregation BOOLEAN NOT NULL DEFAULT FALSE,
    prayed_sunnah BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_prayer_events_user_date ON prayer_events(user_id, date);

CREATE TABLE IF NOT EXISTS reading_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    surah_start INT NOT NULL,
    ayah_start INT NOT NULL,
    surah_end INT NOT NULL,
    ayah_end INT NOT NULL,
    duration_minutes INT NOT NULL,
    pages_read INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    goal TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_days INT NOT NULL,
    current_day INT NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ADAPTED')),
    approved_by_user BOOLEAN NOT NULL DEFAULT TRUE,
    baseline_difficulty VARCHAR(50) NOT NULL DEFAULT 'MODERATE',
    start_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_journeys_user_status ON journeys(user_id, status);

CREATE TABLE IF NOT EXISTS journey_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID NOT NULL REFERENCES journeys(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    learning_prompt TEXT NOT NULL,
    reflection_prompt TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_journey_days_jrn_day ON journey_days(journey_id, day_number);

CREATE TABLE IF NOT EXISTS journey_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_day_id UUID NOT NULL REFERENCES journey_days(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    estimated_minutes INT NOT NULL DEFAULT 10,
    category VARCHAR(50) NOT NULL,
    primary_evidence_reference VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL DEFAULT 'EASY',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'SKIPPED', 'ADAPTED')),
    user_approved BOOLEAN NOT NULL DEFAULT TRUE,
    completed_at TIMESTAMPTZ,
    reflection_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    day_number INT,
    reflection_type VARCHAR(50) NOT NULL CHECK (reflection_type IN ('DAILY_MUHASABAH', 'WEEKLY_INSIGHT', 'JOURNEY_CHECKPOINT', 'FREE_FORM')),
    went_well TEXT NOT NULL,
    felt_difficult TEXT,
    tomorrow_intention TEXT,
    gratitude TEXT,
    private_to_user BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reflections_user ON reflections(user_id, created_at);

CREATE TABLE IF NOT EXISTS amal_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    evidence_ref VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    completed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 5. FAMILY DOMAIN & HOUSEHOLD PERMISSIONS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS families (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    invite_code VARCHAR(50) NOT NULL UNIQUE,
    created_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'ADULT_MEMBER' CHECK (role IN ('OWNER', 'ADULT_MEMBER', 'TEEN', 'CHILD')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    goal TEXT NOT NULL,
    total_days INT NOT NULL,
    current_day INT NOT NULL DEFAULT 1,
    aggregate_completed_actions INT NOT NULL DEFAULT 0,
    total_target_actions INT NOT NULL,
    shared_activity_description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    family_journey_id UUID NOT NULL REFERENCES family_journeys(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    family_prompt TEXT NOT NULL,
    discussion_question TEXT NOT NULL,
    completed_member_user_ids TEXT[] NOT NULL DEFAULT '{}'
);

-- -----------------------------------------------------------------------------
-- 6. SCHOLAR SYSTEM & PASTORAL TRIAGE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS scholar_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    madhhab VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
    specializations TEXT[] NOT NULL DEFAULT '{}',
    verification_status VARCHAR(50) NOT NULL DEFAULT 'APPROVED',
    bio TEXT NOT NULL,
    available_for_cases BOOLEAN NOT NULL DEFAULT TRUE,
    active_case_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scholar_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_scholar_id UUID REFERENCES scholar_profiles(id) ON DELETE SET NULL,
    user_question TEXT NOT NULL,
    sanitized_context TEXT NOT NULL,
    detected_fiqh_issue TEXT NOT NULL,
    relevant_sources JSONB NOT NULL DEFAULT '[]',
    user_consent_granted BOOLEAN NOT NULL DEFAULT TRUE,
    urgency VARCHAR(20) NOT NULL DEFAULT 'NORMAL' CHECK (urgency IN ('NORMAL', 'HIGH')),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_TRIAGE' CHECK (status IN ('PENDING_TRIAGE', 'ASSIGNED', 'UNDER_SCHOLAR_REVIEW', 'ANSWERED', 'CLOSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_scholar_cases_user ON scholar_cases(user_id);
CREATE INDEX IF NOT EXISTS idx_scholar_cases_scholar ON scholar_cases(assigned_scholar_id);
CREATE INDEX IF NOT EXISTS idx_scholar_cases_status ON scholar_cases(status);

CREATE TABLE IF NOT EXISTS scholar_case_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES scholar_cases(id) ON DELETE CASCADE,
    author_id UUID NOT NULL,
    is_scholar BOOLEAN NOT NULL,
    message_text TEXT NOT NULL,
    cited_passage_references TEXT[] NOT NULL DEFAULT '{}',
    sent_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 7. AI SESSIONS, CITATION EVENTS & AUDIT LOGS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES ai_sessions(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    answer_type VARCHAR(50),
    sources_used JSONB,
    scholar_required BOOLEAN NOT NULL DEFAULT FALSE,
    citations_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS citation_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trace_id VARCHAR(100) NOT NULL,
    claim_text TEXT NOT NULL,
    reference VARCHAR(100) NOT NULL,
    supported_by_passage BOOLEAN NOT NULL,
    audit_passed BOOLEAN NOT NULL,
    attempt_number INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_citation_events_trace ON citation_events(trace_id);

CREATE TABLE IF NOT EXISTS safety_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trace_id VARCHAR(100) NOT NULL,
    safety_class VARCHAR(50) NOT NULL,
    triggers TEXT[] NOT NULL DEFAULT '{}',
    action_taken VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id VARCHAR(100) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100) NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_res ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- -----------------------------------------------------------------------------
-- 8. ROW-LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholar_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- User Profile: only owner
CREATE POLICY user_profile_owner_policy ON user_profiles
    FOR ALL USING (auth.uid() = user_id);

-- User Preferences: only owner
CREATE POLICY user_pref_owner_policy ON user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- User Reflections: STRICT ISOLATION. Never exposed to family or scholars without separate consent
CREATE POLICY user_reflections_isolation_policy ON reflections
    FOR ALL USING (auth.uid() = user_id);

-- User Context & Memory: strictly user owner
CREATE POLICY user_context_owner_policy ON user_context
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY user_memory_owner_policy ON user_memory
    FOR ALL USING (auth.uid() = user_id);

-- Journeys: owner policy
CREATE POLICY user_journeys_policy ON journeys
    FOR ALL USING (auth.uid() = user_id);

-- Scholar Cases: user who filed, OR assigned scholar
CREATE POLICY scholar_case_access_policy ON scholar_cases
    FOR SELECT USING (
        auth.uid() = user_id 
        OR auth.uid() IN (SELECT user_id FROM scholar_profiles WHERE id = assigned_scholar_id)
        OR auth.jwt()->>'role' IN ('SCHOLAR_REVIEWER', 'ADMIN', 'SUPER_ADMIN')
    );
