-- ==============================================================================
-- AMAL OS V1 — LAYER 17: MASTER SYSTEM REGISTRY & CERTIFICATION SCHEMA
-- Migration: 013_layer17_master_system_registry_and_certification.sql
-- Description: Master topology registry, compliance audit, route catalog,
--              agent specifications, and immutable architectural invariants.
-- ==============================================================================

-- 1. System Component Registry (Monorepo Packages, Services & Apps)
CREATE TABLE IF NOT EXISTS system_components (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    component_type VARCHAR(32) NOT NULL CHECK (component_type IN ('PACKAGE', 'SERVICE', 'APPLICATION', 'INFRASTRUCTURE')),
    repo_path VARCHAR(256) NOT NULL,
    criticality_tier VARCHAR(16) NOT NULL CHECK (criticality_tier IN ('TIER_0', 'TIER_1', 'TIER_2', 'TIER_3')),
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'MAINTENANCE', 'DEPRECATED')),
    version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
    lead_squad VARCHAR(32) NOT NULL,
    dependencies JSONB NOT NULL DEFAULT '[]'::jsonb,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_system_components_type ON system_components(component_type);
CREATE INDEX IF NOT EXISTS idx_system_components_tier ON system_components(criticality_tier);

-- 2. System Certification & Verification Log (Layers 1 to 17)
CREATE TABLE IF NOT EXISTS system_certifications (
    id VARCHAR(64) PRIMARY KEY,
    layer_number INT NOT NULL UNIQUE CHECK (layer_number BETWEEN 1 AND 17),
    layer_name VARCHAR(128) NOT NULL,
    test_suite_key VARCHAR(128) NOT NULL,
    total_checks INT NOT NULL CHECK (total_checks > 0),
    passed_checks INT NOT NULL CHECK (passed_checks >= 0),
    pass_rate NUMERIC(5,2) NOT NULL CHECK (pass_rate >= 0.0 AND pass_rate <= 100.0),
    is_certified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verifier VARCHAR(128) NOT NULL,
    certification_hash VARCHAR(64) NOT NULL,
    audit_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_system_certifications_layer ON system_certifications(layer_number);

-- 3. Master API Route Catalog
CREATE TABLE IF NOT EXISTS master_api_catalog (
    id VARCHAR(64) PRIMARY KEY,
    http_method VARCHAR(16) NOT NULL CHECK (http_method IN ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')),
    route_path VARCHAR(256) NOT NULL UNIQUE,
    module_name VARCHAR(64) NOT NULL,
    auth_required BOOLEAN NOT NULL DEFAULT TRUE,
    required_role VARCHAR(32) NOT NULL DEFAULT 'USER',
    data_class VARCHAR(32) NOT NULL CHECK (data_class IN ('PUBLIC', 'INTERNAL', 'PRIVATE', 'SENSITIVE', 'HIGHLY_SENSITIVE')),
    trust_zone VARCHAR(32) NOT NULL CHECK (trust_zone IN ('ZONE_A_EVIDENCE', 'ZONE_B_PUBLIC_GUIDANCE', 'ZONE_C_PERSONAL_CONTEXT', 'ZONE_D_PASTORAL_CARE', 'ZONE_E_CRISIS')),
    rate_limit_per_minute INT NOT NULL DEFAULT 60,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_master_api_module ON master_api_catalog(module_name);
CREATE INDEX IF NOT EXISTS idx_master_api_trust_zone ON master_api_catalog(trust_zone);

-- 4. Master Agent Registry (14 Governed AI Agents)
CREATE TABLE IF NOT EXISTS master_agent_catalog (
    agent_id VARCHAR(64) PRIMARY KEY,
    agent_name VARCHAR(128) NOT NULL UNIQUE,
    agent_role VARCHAR(64) NOT NULL,
    trust_zone VARCHAR(32) NOT NULL CHECK (trust_zone IN ('ZONE_A_EVIDENCE', 'ZONE_B_PUBLIC_GUIDANCE', 'ZONE_C_PERSONAL_CONTEXT', 'ZONE_D_PASTORAL_CARE', 'ZONE_E_CRISIS')),
    input_contract VARCHAR(128) NOT NULL,
    output_contract VARCHAR(128) NOT NULL,
    is_autonomous_answering_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    max_token_ceiling INT NOT NULL DEFAULT 2048,
    status VARCHAR(32) NOT NULL DEFAULT 'OPERATIONAL' CHECK (status IN ('OPERATIONAL', 'DEGRADED', 'DISABLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_master_agent_trust_zone ON master_agent_catalog(trust_zone);

-- 5. System Architectural Invariants (Core Non-Negotiables)
CREATE TABLE IF NOT EXISTS system_invariants (
    invariant_id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(128) NOT NULL UNIQUE,
    category VARCHAR(64) NOT NULL CHECK (category IN ('THEOLOGICAL_SAFETY', 'DATA_PRIVACY', 'ETHICAL_GROWTH', 'PSYCHOLOGICAL_SAFETY', 'SYSTEM_RELIABILITY')),
    enforcement_layer VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    zero_tolerance BOOLEAN NOT NULL DEFAULT TRUE,
    verification_check VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Core System Architectural Invariants
INSERT INTO system_invariants (invariant_id, title, category, enforcement_layer, description, zero_tolerance, verification_check)
VALUES
('INV_01_UNCONDITIONAL_FAITH_ACCESS', 'Unconditional Core Faith Access', 'THEOLOGICAL_SAFETY', 'Layer 15 Billing', 'Core faith essentials (Quran, authentic Hadith, prayer timings, basic evidence graph, daily reflections) can NEVER be paywalled.', true, 'check_unconditional_faith_access'),
('INV_02_ZERO_FABRICATED_CITATIONS', 'Zero Tolerated Fabricated Citations', 'THEOLOGICAL_SAFETY', 'Layer 8 & 14 Knowledge Ops', 'Zero synthetic, inaccurate, or unverified Quranic/Hadith citations are tolerated. Every claim must trace to canonical Medina Mushaf or verified Hadith collections.', true, 'check_zero_hallucinations'),
('INV_03_ADULT_REFLECTION_ISOLATION', 'Adult Private Reflection Isolation', 'DATA_PRIVACY', 'Layer 10 & 12 Trust PDP', 'Personal Muhasabah journals, private reflections, and voice notes are cryptographically and policy isolated. Never shared with family heads or org admins.', true, 'check_reflection_isolation'),
('INV_04_TWO_SCHOLAR_RULE', 'Two-Scholar Juristic Dual Sign-Off', 'THEOLOGICAL_SAFETY', 'Layer 12 & 14 Governance', 'Complex personalized Fiqh inquiries (Class D) and sensitive rulings require dual review by two independent verified human jurists before delivery.', true, 'check_two_scholar_rule'),
('INV_05_FATIGUE_SILENCE_FIRST', 'Silence as a First-Class Communication Feature', 'PSYCHOLOGICAL_SAFETY', 'Layer 11 Notifications', 'Repeated notification dismissals MUST reduce sending frequency. Never escalate notification pressure. Respect Quiet Hours and active app presence.', true, 'check_fatigue_throttling'),
('INV_06_NO_BROKEN_STREAKS', 'Zero-Guilt Shame-Free Habit Model', 'PSYCHOLOGICAL_SAFETY', 'Layer 9 & 10 Experience', 'Spiritual worship must never be reduced to guilt-inducing numeric streak scorecards or shame triggers. Every day is a clean renewal of Niyyah.', true, 'check_zero_shame_metrics'),
('INV_07_EPISTEMIC_TRANSPARENCY', 'Four-Tier Epistemic Knowledge Labeling', 'THEOLOGICAL_SAFETY', 'Layer 7 & 10 UI/AI', 'All responses strictly segregate [ISLAM SAYS] (Revelation), [SCHOLARS DISCUSS] (Ikhtilaf), [AMAL RECOMMENDS] (Synthesis), and [YOU MAY FIND PRACTICAL] (Behavioral Habit).', true, 'check_epistemic_quadrant')
ON CONFLICT (invariant_id) DO NOTHING;
