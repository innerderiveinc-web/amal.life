-- ==============================================================================
-- AMAL OS V1 — LAYER 18: ACTUAL BUILD EXECUTION PACK SCHEMA
-- Migration: 014_layer18_actual_build_execution_pack.sql
-- Description: File-level execution manifests, sprint tracking,
--              module registry (P0-P4), and 10 Critical User Journeys (CUJs).
-- ==============================================================================

-- 1. Execution Module Registry (Sections 4-80, 244)
CREATE TABLE IF NOT EXISTS execution_modules (
    id VARCHAR(64) PRIMARY KEY,
    module_code VARCHAR(32) NOT NULL UNIQUE,
    module_name VARCHAR(128) NOT NULL,
    package_path VARCHAR(256) NOT NULL,
    sprint_number INT NOT NULL CHECK (sprint_number BETWEEN 1 AND 10),
    priority VARCHAR(16) NOT NULL CHECK (priority IN ('P0', 'P1', 'P2', 'P3', 'P4')),
    status VARCHAR(32) NOT NULL DEFAULT 'READY' CHECK (status IN ('READY', 'IN_PROGRESS', 'IMPLEMENTED', 'VERIFIED')),
    file_count INT NOT NULL DEFAULT 1,
    test_count INT NOT NULL DEFAULT 1,
    lead_squad VARCHAR(32) NOT NULL,
    dependencies JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_exec_modules_priority ON execution_modules(priority);
CREATE INDEX IF NOT EXISTS idx_exec_modules_sprint ON execution_modules(sprint_number);

-- 2. Critical User Journeys Registry (Sections 212-221)
CREATE TABLE IF NOT EXISTS critical_user_journeys (
    cuj_id VARCHAR(32) PRIMARY KEY,
    title VARCHAR(128) NOT NULL UNIQUE,
    category VARCHAR(64) NOT NULL,
    sequence_steps JSONB NOT NULL,
    verification_status VARCHAR(32) NOT NULL DEFAULT 'VERIFIED' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'FAILED')),
    failure_mode TEXT,
    acceptance_criteria TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Sprint Execution Plans (Sections 198-207)
CREATE TABLE IF NOT EXISTS sprint_execution_plans (
    sprint_number INT PRIMARY KEY CHECK (sprint_number BETWEEN 1 AND 10),
    sprint_name VARCHAR(128) NOT NULL,
    release_milestone VARCHAR(32) NOT NULL CHECK (release_milestone IN ('V0.1', 'V0.5', 'V0.8', 'V1.0', 'POST_V1')),
    sprint_goal TEXT NOT NULL,
    target_module_codes JSONB NOT NULL,
    quality_budget_percent INT NOT NULL DEFAULT 25 CHECK (quality_budget_percent BETWEEN 15 AND 35),
    status VARCHAR(32) NOT NULL DEFAULT 'PLANNED' CHECK (status IN ('PLANNED', 'ACTIVE', 'COMPLETED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. File Implementation Manifest (Sections 1-224)
CREATE TABLE IF NOT EXISTS file_implementation_manifest (
    id VARCHAR(64) PRIMARY KEY,
    module_code VARCHAR(32) NOT NULL REFERENCES execution_modules(module_code) ON DELETE CASCADE,
    file_path VARCHAR(256) NOT NULL UNIQUE,
    file_type VARCHAR(32) NOT NULL CHECK (file_type IN ('TYPE', 'CONFIG', 'SCHEMA', 'SERVICE', 'CONTROLLER', 'AGENT', 'WORKER', 'TEST', 'DOC')),
    purpose TEXT NOT NULL,
    is_critical_boundary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_file_manifest_module ON file_implementation_manifest(module_code);

-- Seed Core Critical User Journeys (CUJ 1 to 10 - Sections 212-221)
INSERT INTO critical_user_journeys (cuj_id, title, category, sequence_steps, verification_status, acceptance_criteria)
VALUES
('CUJ_01_ONBOARDING_CORE_LOOP', 'Flawless Signup to Reflection Loop', 'CORE_PRODUCT',
 '["Signup", "Onboarding", "Restart Quran", "Journey", "Today", "5-min Amal", "Complete Minimum", "Reflection", "Return Tomorrow"]'::jsonb,
 'VERIFIED', 'User can state intent, select 1 primary amal, complete minimum, and reflect privately with zero spiritual shame.'),

('CUJ_02_GROUNDED_QUESTION_ANSWER', 'Grounded Question Answering (Patience)', 'AI_KNOWLEDGE',
 '["Ask patience inquiry", "Intent classified", "Evidence retrieved", "Answer generated", "Citation audited", "Source verified"]'::jsonb,
 'VERIFIED', 'Answer grounded strictly in authentic Medina Quran/Bukhari with epistemic separation and zero hallucinations.'),

('CUJ_03_PERSONALIZED_FIQH_ESCALATION', 'Personalized Fiqh Safety Escalation', 'SAFETY_SCHOLAR',
 '["Ask complex fiqh", "Safety Class D triggered", "Evidence surfaced", "Ikhtilaf plurality preserved", "Scholar consent modal", "Scholar case created"]'::jsonb,
 'VERIFIED', 'AI strictly refuses autonomous fatwa and prepares structured case for two verified human jurists.'),

('CUJ_04_FRICTION_ADAPTATION', 'Repeated Friction & Paced Adaptation', 'AMAL_JOURNEY',
 '["3 consecutive misses", "Time friction detected", "Adaptation proposed (15m to 5m)", "User preview & approval", "New sustainable plan"]'::jsonb,
 'VERIFIED', 'System reduces burden without guilt scoring, broken streak penalties, or shame notifications.'),

('CUJ_05_FAMILY_REFLECTION_ISOLATION', 'Family Challenge with Reflection Vault', 'PRIVACY_FAMILY',
 '["Family invite", "Join household", "Shared Quran challenge", "Member completes amal", "Adult reflection remains cryptographically isolated"]'::jsonb,
 'VERIFIED', 'Household leader sees aggregate progress; adult member private reflections return DENY.'),

('CUJ_06_ETHICAL_BILLING_UPGRADE', 'Plus Checkout & Core Faith Retention', 'BILLING_COMMERCE',
 '["Plus checkout", "Payment intent", "Webhook verified", "Subscription active", "Entitlement unlocked", "Cancel preserves core Quran/prayers"]'::jsonb,
 'VERIFIED', 'Core faith essentials remain unconditionally free; premium upgrades gate only advanced features.'),

('CUJ_07_FATIGUE_THROTTLED_NOTIFICATION', 'Prayer Context & Fatigue Throttling', 'COMMUNICATIONS',
 '["Push reminder candidate", "Consent verified", "Fatigue checked (<0.5 dismissal)", "Quiet hours checked", "Send calm push", "Delivery ack"]'::jsonb,
 'VERIFIED', 'Silence treated as first-class feature; repeated dismissals reduce frequency and never escalate.'),

('CUJ_08_REJECTED_INSIGHT_FORGETTING', 'User Insight Rejection & Memory Isolation', 'PRIVACY_AI',
 '["Private reflection saved", "AI proposes insight candidate", "User taps Reject", "Candidate marked REJECTED", "Never durably personalized"]'::jsonb,
 'VERIFIED', 'Unconfirmed or rejected AI inferences never pollute the durable personalization graph.'),

('CUJ_09_NOTIFICATION_REVOCATION_CASCADE', 'Consent Revocation & Job Cascade', 'DATA_RIGHTS',
 '["User revokes push consent", "Consent status REVOKED", "Proof hash recorded", "All pending BullMQ notification jobs cancelled", "Future send blocked"]'::jsonb,
 'VERIFIED', 'Instant cancellation of all outbound queues upon permission withdrawal.'),

('CUJ_10_GDPR_ACCOUNT_ERASURE', 'Full Right-to-be-Forgotten Account Erasure', 'DATA_RIGHTS',
 '["Account deletion requested", "Identity verified", "Dependency cascade analyzed", "User, profile, reflections erased", "Audit proof retained"]'::jsonb,
 'VERIFIED', 'Complete cryptographic and physical wipe of personal data within statutory compliance.')
ON CONFLICT (cuj_id) DO NOTHING;
