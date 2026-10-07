-- AMAL OS V1: Core Database Schema Migration
-- Standard PostgreSQL DDL with strict integrity constraints, foreign keys, and indexes.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Identity & Profiles
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
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
    life_stage VARCHAR(50),
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    madhhab VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
    prayer_calculation_method VARCHAR(100) NOT NULL DEFAULT 'MUSLIM_WORLD_LEAGUE',
    reminder_style VARCHAR(50) NOT NULL DEFAULT 'CALM',
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
CREATE INDEX IF NOT EXISTS idx_user_consents_user ON user_consents(user_id, consent_type);

CREATE TABLE IF NOT EXISTS user_context (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    context_type VARCHAR(50) NOT NULL, -- EXPLICIT, BEHAVIORAL, DERIVED
    category VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    source VARCHAR(100) NOT NULL,
    confidence NUMERIC(3,2) NOT NULL DEFAULT 1.00,
    visibility VARCHAR(50) NOT NULL DEFAULT 'USER_ONLY',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_context_user_cat ON user_context(user_id, category);

CREATE TABLE IF NOT EXISTS user_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level VARCHAR(50) NOT NULL, -- SESSION, JOURNEY, LONG_TERM
    content TEXT NOT NULL,
    summary VARCHAR(255) NOT NULL,
    relevance_tags TEXT[] NOT NULL DEFAULT '{}',
    user_approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_user_memory_user_lvl ON user_memory(user_id, level);

-- 2. Islamic Evidence Graph
CREATE TABLE IF NOT EXISTS islamic_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(50) NOT NULL, -- QURAN, HADITH, TAFSIR, FIQH
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
    authority_level VARCHAR(50) NOT NULL, -- TIER_1_QURAN, TIER_2_AUTHENTIC_HADITH, etc.
    verification_status VARCHAR(50) NOT NULL DEFAULT 'APPROVED',
    version VARCHAR(20) NOT NULL DEFAULT '1.0',
    provenance JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_islamic_sources_auth ON islamic_sources(source_type, authority_level);

CREATE TABLE IF NOT EXISTS source_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES islamic_sources(id) ON DELETE CASCADE,
    reference VARCHAR(100) NOT NULL,
    arabic_text TEXT,
    translated_text TEXT NOT NULL,
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    grading VARCHAR(50),
    narrator_chain TEXT[],
    context_summary TEXT,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_source_passages_src ON source_passages(source_id);
CREATE INDEX IF NOT EXISTS idx_source_passages_ref ON source_passages(reference);

CREATE TABLE IF NOT EXISTS evidence_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_entity_type VARCHAR(50) NOT NULL,
    from_entity_id VARCHAR(100) NOT NULL,
    edge_type VARCHAR(50) NOT NULL,
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
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Worship, Reading, Reflections
CREATE TABLE IF NOT EXISTS prayer_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prayer_name VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
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

CREATE TABLE IF NOT EXISTS reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID,
    day_number INT,
    reflection_type VARCHAR(50) NOT NULL,
    went_well TEXT NOT NULL,
    felt_difficult TEXT,
    tomorrow_intention TEXT,
    gratitude TEXT,
    private_to_user BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_reflections_user ON reflections(user_id, created_at);

-- 4. Journeys & Amal Actions
CREATE TABLE IF NOT EXISTS journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    goal TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_days INT NOT NULL,
    current_day INT NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
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
CREATE INDEX IF NOT EXISTS idx_journey_days_journey ON journey_days(journey_id, day_number);

CREATE TABLE IF NOT EXISTS journey_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_day_id UUID NOT NULL REFERENCES journey_days(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    estimated_minutes INT NOT NULL DEFAULT 10,
    category VARCHAR(50) NOT NULL,
    primary_evidence_reference VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL DEFAULT 'EASY',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    user_approved BOOLEAN NOT NULL DEFAULT TRUE,
    completed_at TIMESTAMPTZ,
    reflection_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS amal_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    evidence_ref VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    completed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Family & Scholar Networks
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
    role VARCHAR(50) NOT NULL DEFAULT 'ADULT_MEMBER',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    urgency VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_TRIAGE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scholar_case_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES scholar_cases(id) ON DELETE CASCADE,
    author_id UUID NOT NULL,
    is_scholar BOOLEAN NOT NULL,
    message_text TEXT NOT NULL,
    cited_passage_references TEXT[] NOT NULL DEFAULT '{}',
    sent_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Observability, AI Traces & Immutable Audit Logs
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
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    answer_type VARCHAR(50),
    sources_used JSONB,
    scholar_required BOOLEAN NOT NULL DEFAULT FALSE,
    citations_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
