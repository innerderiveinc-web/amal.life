-- =====================================================================
-- AMAL OS — DATABASE MIGRATION 015: LAYER 19 BOOTSTRAP STARTER SCHEMA
-- Sections 99-113 & 150-156
-- Ring 1 Deterministic Core: User, Profile, Goals, Baselines, Journeys,
-- Amals, Completions, Reflections, Context Signals, Event Outbox, Audit
-- =====================================================================

-- Section 100: Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Section 101: Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    account_mode TEXT NOT NULL DEFAULT 'ADULT',
    locale TEXT NOT NULL DEFAULT 'en',
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 102: User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name TEXT,
    preferred_language TEXT DEFAULT 'en',
    preferred_content_format TEXT DEFAULT 'TEXT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 103: Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    intent TEXT NOT NULL,
    desired_outcome TEXT,
    time_horizon TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_goals_user_status
ON goals(user_id, status);

-- Section 104: Goal Baselines Table
CREATE TABLE IF NOT EXISTS goal_baselines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    current_frequency NUMERIC,
    current_duration_minutes INT,
    available_time_minutes INT,
    preferred_time TEXT,
    previous_attempts INT DEFAULT 0,
    known_barriers JSONB DEFAULT '[]',
    confidence NUMERIC(4,3) DEFAULT 1.0,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 105: Journey Templates & Versions Table
CREATE TABLE IF NOT EXISTS journey_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journey_template_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_template_id UUID NOT NULL REFERENCES journey_templates(id) ON DELETE CASCADE,
    version INT NOT NULL,
    duration_days INT DEFAULT 30,
    evidence_ids JSONB NOT NULL DEFAULT '[]',
    review_status TEXT NOT NULL DEFAULT 'APPROVED',
    UNIQUE(journey_template_id, version)
);

-- Section 106: Active Journeys Table
CREATE TABLE IF NOT EXISTS journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    template_version_id UUID REFERENCES journey_template_versions(id),
    state TEXT NOT NULL DEFAULT 'STARTED',
    current_phase INT NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ DEFAULT now(),
    paused_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 107: Amal Templates Table
CREATE TABLE IF NOT EXISTS amal_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    minimum_action TEXT,
    target_action TEXT,
    duration_minutes INT DEFAULT 5,
    evidence_ids JSONB NOT NULL DEFAULT '[]',
    safety_class TEXT NOT NULL DEFAULT 'A',
    review_status TEXT NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 108: User Amals Table
CREATE TABLE IF NOT EXISTS user_amals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    amal_template_id UUID REFERENCES amal_templates(id),
    scheduled_for DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'RECOMMENDED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 109: Amal Completions Table
CREATE TABLE IF NOT EXISTS amal_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_amal_id UUID NOT NULL REFERENCES user_amals(id) ON DELETE CASCADE,
    outcome TEXT NOT NULL,
    duration_minutes INT DEFAULT 5,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    idempotency_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 110: Reflections Table (Strict Private Isolation)
CREATE TABLE IF NOT EXISTS reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reflection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    feeling TEXT,
    helpful_factors JSONB DEFAULT '[]',
    friction_factors JSONB DEFAULT '[]',
    free_text TEXT,
    privacy_level TEXT NOT NULL DEFAULT 'PRIVATE',
    analysis_status TEXT NOT NULL DEFAULT 'NOT_ANALYZED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 111: Context Signals Table
CREATE TABLE IF NOT EXISTS context_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    value JSONB NOT NULL,
    source TEXT NOT NULL,
    confidence NUMERIC(4,3) NOT NULL,
    sensitivity TEXT NOT NULL,
    user_visible BOOLEAN NOT NULL DEFAULT TRUE,
    user_editable BOOLEAN NOT NULL DEFAULT TRUE,
    inference_reason TEXT,
    freshness_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Section 112: Event Outbox Table
CREATE TABLE IF NOT EXISTS event_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    aggregate_type TEXT NOT NULL,
    aggregate_id UUID NOT NULL,
    payload JSONB NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'PENDING',
    available_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_outbox_pending
ON event_outbox(status, available_at);

-- Section 113: Audit Events Table
CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    purpose TEXT NOT NULL,
    outcome TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_resource
ON audit_events(resource_type, resource_id);

-- =====================================================================
-- SEED DATA: SYNTHETIC DEMO INITIAL FIXTURES (Sections 150-156)
-- =====================================================================

-- 1. Demo User (Section 155)
INSERT INTO users (id, email, status, account_mode, locale, timezone)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'demo@amal.local',
    'ACTIVE',
    'ADULT',
    'en',
    'Asia/Kolkata'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO user_profiles (user_id, display_name, preferred_language)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Ahmad Seeker',
    'en'
) ON CONFLICT (user_id) DO NOTHING;

-- 2. Initial Journey Template: Quran Restart (Sections 151-152)
INSERT INTO journey_templates (id, slug, title, description, status)
VALUES (
    '00000000-0000-0000-0000-000000000010',
    'quran-restart',
    'Quran Restart',
    'A structured, calm, 30-day journey to build a consistent daily relationship with the Holy Quran.',
    'ACTIVE'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO journey_template_versions (id, journey_template_id, version, duration_days, review_status)
VALUES (
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000010',
    1,
    30,
    'APPROVED'
) ON CONFLICT (journey_template_id, version) DO NOTHING;

-- 3. Initial Amals (10 Governed Amals) (Section 153)
INSERT INTO amal_templates (id, type, title, description, minimum_action, target_action, duration_minutes, safety_class, review_status)
VALUES
    ('00000000-0000-0000-0000-000000000101', 'QURANIC_PRACTICE', 'Quran Recitation (1 Page)', 'Recite at least one page of the Medina Mushaf with presence of heart.', 'Read 1 page', 'Read 5 pages', 5, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000102', 'QURANIC_PRACTICE', 'Quran Meaning Reflection', 'Read the authentic meaning and translation of 3 verses.', 'Read 3 verses meaning', 'Read 1 ruku meaning', 5, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000103', 'PROPHETIC_PRACTICE', 'Morning Dhikr (SubhanAllah 33x)', 'Engage in post-Fajr remembrance of Allah.', '33x SubhanAllah', '100x complete tasbeeh', 3, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000104', 'PROPHETIC_PRACTICE', 'Evening Dhikr & Protection', 'Recite Ayat al-Kursi and the Muawwidhatayn before sleep.', 'Recite Ayat al-Kursi', 'Complete evening protective Adhkar', 4, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000105', 'BEHAVIORAL_EXERCISE', 'Mindful Pause Before Reacting (Sabr)', 'Pause for 3 breaths during moments of irritation or anger.', 'One mindful pause', 'Consistent calm restraint', 2, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000106', 'QURANIC_PRACTICE', 'Surah Al-Mulk Nightly Recitation', 'Protect yourself with the nightly recitation of Surah Al-Mulk.', 'Listen to Surah Al-Mulk', 'Recite complete Surah Al-Mulk', 7, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000107', 'PROPHETIC_PRACTICE', 'Tahajjud 2 Rakats', 'Night vigil prayer in the last third of the night.', '2 brief rakats', '4 rakats with reflection', 10, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000108', 'BEHAVIORAL_EXERCISE', 'Gratitude Journaling (Shukr)', 'Acknowledge 3 blessings received today and thank Allah.', 'Name 3 blessings silently', 'Write 3 blessings with Dua', 3, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000109', 'PROPHETIC_PRACTICE', 'Salawat on the Prophet (10x)', 'Send peace and blessings upon the Messenger of Allah.', '10x Salawat', '100x Salawat', 2, 'A', 'APPROVED'),
    ('00000000-0000-0000-0000-000000000110', 'QURANIC_PRACTICE', 'Listen to Selected Recitation', 'Listen attentively to a beautiful recitation of Surah Ar-Rahman.', 'Listen for 5 minutes', 'Listen and reflect on translation', 5, 'A', 'APPROVED')
ON CONFLICT (id) DO NOTHING;
