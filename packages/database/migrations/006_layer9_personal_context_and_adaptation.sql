-- ============================================================================
-- AMAL OS V1 — LAYER 9: PERSONAL CONTEXT & JOURNEY ADAPTATION SCHEMA (MIGRATION 006)
-- ============================================================================
-- Tables covering:
-- Context Signals (L1-L4 hierarchy, confidence, freshness, sensitivity),
-- Goal Baselines (Frequency, Duration, Barriers), Life Situations,
-- Friction Signals (15-category taxonomy & evidence refs),
-- Governed Amal Candidates & 7-Factor Recommendations,
-- Daily Plans (1 Primary + 0-2 Optional with Burden Score),
-- Personal Insights & Confirmation Gates,
-- Journey Adaptations, Burdens & Collisions.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. CONTEXT SIGNALS (L1 Explicit > L2 Confirmed > L3 Behavioral > L4 Derived)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS context_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(60) NOT NULL,
    value JSONB NOT NULL,
    source VARCHAR(40) NOT NULL,
    confidence NUMERIC(4,3) NOT NULL,
    sensitivity VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    user_visible BOOLEAN DEFAULT TRUE,
    user_editable BOOLEAN DEFAULT TRUE,
    inference_reason TEXT,
    freshness_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_context_signals_user_type
ON context_signals(user_id, type);

-- ----------------------------------------------------------------------------
-- 2. LIFE SITUATIONS & PROBABILISTIC CLASSIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS life_situations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    situation_type VARCHAR(60) NOT NULL,
    confidence NUMERIC(4,3) NOT NULL,
    source VARCHAR(40) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- 3. FRICTION SIGNALS (15-Category Taxonomy with Provenance)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS friction_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    amal_id UUID REFERENCES user_amals(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL,
    source VARCHAR(40) NOT NULL,
    confidence NUMERIC(4,3) NOT NULL,
    evidence_refs JSONB,
    status VARCHAR(30) NOT NULL DEFAULT 'PROPOSED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- 4. AMAL RECOMMENDATIONS (7-Factor Scoring & Structured Reason Codes)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS amal_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    journey_id UUID REFERENCES journeys(id) ON DELETE SET NULL,
    amal_template_id UUID,
    evidence_fit NUMERIC(4,3),
    goal_fit NUMERIC(4,3),
    context_fit NUMERIC(4,3),
    feasibility NUMERIC(4,3),
    preference_fit NUMERIC(4,3),
    continuity NUMERIC(4,3),
    safety_score NUMERIC(4,3),
    final_score NUMERIC(5,4) NOT NULL,
    reason_codes JSONB NOT NULL,
    evidence_snapshot_id UUID,
    status VARCHAR(30) NOT NULL DEFAULT 'PROPOSED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 5. DAILY PLANS (1 Primary + 0-2 Optional, Burden Score Guard)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_date DATE NOT NULL,
    timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
    primary_amal_id UUID,
    optional_amal_ids JSONB,
    burden_score NUMERIC(5,4),
    generated_from_context_version TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, plan_date)
);

-- ----------------------------------------------------------------------------
-- 6. PERSONAL INSIGHTS (Observations, Not Judgments - Confirmation Gate)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS personal_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(60) NOT NULL,
    statement TEXT NOT NULL,
    evidence_refs JSONB,
    confidence NUMERIC(4,3) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PROPOSED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- 7. JOURNEY ADAPTATIONS & COLLISION RESOLUTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS journey_adaptations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID NOT NULL REFERENCES journeys(id) ON DELETE CASCADE,
    trigger VARCHAR(100) NOT NULL,
    friction_ids JSONB,
    previous_plan JSONB NOT NULL,
    proposed_plan JSONB NOT NULL,
    reason_codes JSONB NOT NULL,
    user_approval BOOLEAN,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journey_collisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    active_journey_ids JSONB NOT NULL,
    total_requested_minutes INTEGER NOT NULL,
    available_minutes INTEGER NOT NULL,
    resolution_status VARCHAR(30) NOT NULL DEFAULT 'DETECTED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
