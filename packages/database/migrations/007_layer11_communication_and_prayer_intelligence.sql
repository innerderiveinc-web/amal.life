-- AMAL OS — Migration 007: Layer 11 Adaptive Communication, Notification Fatigue & Prayer Intelligence
-- Schema covers: Communication preferences, Channel consents, Notification jobs, Deliveries,
-- Interactions, Suppressions, Campaigns, Templates, Frequency state, Device registrations, Prayer context.

-- 1. Communication Preferences
CREATE TABLE IF NOT EXISTS communication_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    pressure_preference VARCHAR(32) NOT NULL DEFAULT 'GENTLE', -- 'GENTLE', 'BALANCED', 'MINIMAL'
    quiet_hours_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    quiet_hours_start TIME NOT NULL DEFAULT '22:00:00',
    quiet_hours_end TIME NOT NULL DEFAULT '07:00:00',
    timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
    max_daily_reminders INT NOT NULL DEFAULT 3,
    digest_frequency VARCHAR(32) NOT NULL DEFAULT 'NONE', -- 'NONE', 'DAILY', 'WEEKLY'
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Channel Consents (Explicit per-channel, per-purpose gating)
CREATE TABLE IF NOT EXISTS communication_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel VARCHAR(32) NOT NULL, -- 'PUSH', 'WHATSAPP', 'EMAIL', 'SMS', 'VOICE'
    transactional BOOLEAN NOT NULL DEFAULT TRUE,
    reminders BOOLEAN NOT NULL DEFAULT FALSE,
    journey_updates BOOLEAN NOT NULL DEFAULT FALSE,
    scholar_updates BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(32) NOT NULL DEFAULT 'NOT_ASKED', -- 'OPTED_IN', 'OPTED_OUT', 'NOT_ASKED'
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_channel_consent UNIQUE (user_id, channel)
);

-- 3. Frequency State (Fatigue tracking)
CREATE TABLE IF NOT EXISTS communication_frequency_state (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    push_count_24h INT NOT NULL DEFAULT 0,
    whatsapp_count_24h INT NOT NULL DEFAULT 0,
    sms_count_24h INT NOT NULL DEFAULT 0,
    email_count_7d INT NOT NULL DEFAULT 0,
    dismissal_rate NUMERIC(5,4) NOT NULL DEFAULT 0.0000,
    ignore_rate NUMERIC(5,4) NOT NULL DEFAULT 0.0000,
    fatigue_score NUMERIC(5,4) NOT NULL DEFAULT 0.0000,
    last_push_at TIMESTAMPTZ,
    last_whatsapp_at TIMESTAMPTZ,
    last_email_at TIMESTAMPTZ,
    last_notification_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Governed Communication Templates
CREATE TABLE IF NOT EXISTS communication_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(128) NOT NULL UNIQUE,
    purpose VARCHAR(64) NOT NULL, -- 'TRANSACTIONAL', 'SECURITY', 'SCHOLAR', 'JOURNEY', 'AMAL_REMINDER', 'REFLECTION'
    content_class VARCHAR(16) NOT NULL, -- 'CLASS_A_NEUTRAL', 'CLASS_B_EVIDENCE_LINKED', 'CLASS_C_QUOTATION', 'CLASS_D_SCHOLARLY'
    evidence_id UUID REFERENCES evidence_nodes(id) ON DELETE SET NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'APPROVED', 'DEPRECATED'
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS communication_template_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES communication_templates(id) ON DELETE CASCADE,
    version INT NOT NULL,
    locale VARCHAR(16) NOT NULL DEFAULT 'en',
    title_template TEXT NOT NULL,
    body_template TEXT NOT NULL,
    allowed_variables JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    reviewed_by UUID REFERENCES scholars(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_template_version UNIQUE (template_id, version, locale)
);

-- 5. Notification Jobs (Exact-once send intent with dedupe key)
CREATE TABLE IF NOT EXISTS notification_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID,
    purpose VARCHAR(64) NOT NULL,
    channel VARCHAR(32) NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    priority VARCHAR(16) NOT NULL DEFAULT 'P3', -- 'P0', 'P1', 'P2', 'P3', 'P4', 'P5'
    dedupe_key TEXT NOT NULL,
    idempotency_key TEXT NOT NULL,
    content_ref UUID,
    status VARCHAR(32) NOT NULL DEFAULT 'SCHEDULED', -- 'PENDING', 'SCHEDULED', 'SENT', 'DELIVERED', 'FAILED', 'SUPPRESSED', 'CANCELLED'
    suppression_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_notification_dedupe ON notification_jobs(dedupe_key);
CREATE INDEX IF NOT EXISTS idx_notification_jobs_status_scheduled ON notification_jobs(status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_notification_jobs_user ON notification_jobs(user_id);

-- 6. Notification Deliveries & Interactions
CREATE TABLE IF NOT EXISTS notification_deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES notification_jobs(id) ON DELETE CASCADE,
    provider VARCHAR(64) NOT NULL, -- 'QSURA', 'APNS', 'FCM', 'INTERNAL'
    provider_message_id TEXT,
    channel VARCHAR(32) NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMPTZ,
    status VARCHAR(32) NOT NULL DEFAULT 'SENT', -- 'SENT', 'DELIVERED', 'FAILED', 'EXPIRED'
    failure_code VARCHAR(64),
    error_message TEXT
);

CREATE TABLE IF NOT EXISTS notification_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES notification_jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(32) NOT NULL, -- 'OPENED', 'DISMISSED', 'SNOOZED', 'ACTION_COMPLETED'
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Communication Suppressions (Auditing why messages were withheld)
CREATE TABLE IF NOT EXISTS communication_suppressions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID,
    candidate_purpose VARCHAR(64) NOT NULL,
    reason_code VARCHAR(64) NOT NULL, -- 'USER_ALREADY_ACTIVE', 'NOTIFICATION_FATIGUE', 'QUIET_HOURS', 'NO_CONSENT', 'DEDUPLICATED', 'KILL_SWITCH_ACTIVE'
    suppressed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Device Registrations
CREATE TABLE IF NOT EXISTS device_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(32) NOT NULL, -- 'IOS', 'ANDROID', 'WEB'
    device_token TEXT NOT NULL,
    push_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_device_token UNIQUE (user_id, device_token)
);

-- 9. Prayer Calculation Profiles & Location Settings
CREATE TABLE IF NOT EXISTS prayer_calculation_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(128) NOT NULL DEFAULT 'London',
    country VARCHAR(128) NOT NULL DEFAULT 'United Kingdom',
    timezone VARCHAR(64) NOT NULL DEFAULT 'Europe/London',
    calculation_method VARCHAR(64) NOT NULL DEFAULT 'MUSLIM_WORLD_LEAGUE', -- 'MWL', 'ISNA', 'KARACHI', 'UMM_AL_QURA', 'EGYPTIAN'
    juristic_method VARCHAR(32) NOT NULL DEFAULT 'STANDARD', -- 'STANDARD', 'HANAFI'
    fajr_offset_minutes INT NOT NULL DEFAULT 0,
    dhuhr_offset_minutes INT NOT NULL DEFAULT 0,
    asr_offset_minutes INT NOT NULL DEFAULT 0,
    maghrib_offset_minutes INT NOT NULL DEFAULT 0,
    isha_offset_minutes INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_prayer_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    schedule_date DATE NOT NULL,
    fajr_time TIMESTAMPTZ NOT NULL,
    sunrise_time TIMESTAMPTZ NOT NULL,
    dhuhr_time TIMESTAMPTZ NOT NULL,
    asr_time TIMESTAMPTZ NOT NULL,
    maghrib_time TIMESTAMPTZ NOT NULL,
    isha_time TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_schedule_date UNIQUE (user_id, schedule_date)
);

-- 10. Indexes for Fast Outbox & Communication Processing
CREATE INDEX IF NOT EXISTS idx_comm_frequency_user ON communication_frequency_state(user_id);
CREATE INDEX IF NOT EXISTS idx_comm_suppressions_user ON communication_suppressions(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_schedules_user_date ON user_prayer_schedules(user_id, schedule_date);
