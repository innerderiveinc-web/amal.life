-- ==============================================================================
-- AMAL OS — MIGRATION 011: LAYER 15 BUSINESS, MONETIZATION & INSTITUTION PLATFORM
-- ==============================================================================

-- 1. BILLING PLANS & VERSIONS
CREATE TABLE IF NOT EXISTS billing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    tier VARCHAR(32) NOT NULL CHECK (tier IN ('FREE', 'PLUS', 'FAMILY', 'INSTITUTION', 'ENTERPRISE')),
    currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    price_cents INT NOT NULL DEFAULT 0,
    interval VARCHAR(16) NOT NULL CHECK (interval IN ('MONTH', 'YEAR', 'LIFETIME', 'CUSTOM')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    version INT NOT NULL DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BILLING ENTITLEMENTS (CANONICAL FEATURE GATING)
CREATE TABLE IF NOT EXISTS billing_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES billing_plans(id) ON DELETE CASCADE,
    feature_key VARCHAR(128) NOT NULL,
    max_limit INT DEFAULT NULL, -- NULL means unlimited
    period VARCHAR(16) CHECK (period IN ('DAY', 'MONTH', 'YEAR')),
    is_unlimited BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DISABLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (plan_id, feature_key)
);

-- 3. USER SUBSCRIPTIONS & LIFECYCLE
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    plan_id UUID NOT NULL REFERENCES billing_plans(id),
    status VARCHAR(32) NOT NULL DEFAULT 'TRIAL' CHECK (status IN (
        'TRIAL', 'ACTIVE', 'PAST_DUE', 'PAUSED', 'CANCELLED', 'EXPIRED', 'REFUNDED'
    )),
    trial_ends_at TIMESTAMPTZ,
    current_period_starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_ends_at TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    paused_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    provider_customer_id VARCHAR(128),
    provider_subscription_id VARCHAR(128),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SUBSCRIPTION INVOICES & TAX
CREATE TABLE IF NOT EXISTS subscription_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    amount_cents INT NOT NULL,
    tax_amount_cents INT NOT NULL DEFAULT 0,
    currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    status VARCHAR(32) NOT NULL DEFAULT 'PAID' CHECK (status IN ('PAID', 'PENDING', 'FAILED', 'REFUNDED')),
    invoice_pdf_url TEXT,
    billing_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SCHOLAR CONSULTATIONS & ESCROW ECONOMICS
CREATE TABLE IF NOT EXISTS scholar_consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    scholar_id UUID NOT NULL,
    case_id UUID,
    consultation_type VARCHAR(64) NOT NULL CHECK (consultation_type IN (
        'QUICK', 'DETAILED', 'WRITTEN', 'FAMILY_GUIDANCE', 'SPECIALIZED_SUBJECT'
    )),
    fee_cents INT NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    platform_fee_cents INT NOT NULL,
    scholar_payout_cents INT NOT NULL,
    payment_status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN (
        'PENDING', 'PAID', 'REFUNDED'
    )),
    payout_status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (payout_status IN (
        'PENDING', 'READY', 'PAID', 'OUT_OF_ESCROW'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INSTITUTIONS & SAAS TENANCY (AMAL FOR ORGANIZATIONS)
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    institution_type VARCHAR(64) NOT NULL CHECK (institution_type IN (
        'MOSQUE', 'ISLAMIC_SCHOOL', 'UNIVERSITY', 'COMMUNITY_ORG', 'HAJJ_UMRAH', 'EMPLOYEE_PROGRAM'
    )),
    status VARCHAR(32) NOT NULL DEFAULT 'PILOT' CHECK (status IN ('PILOT', 'ACTIVE', 'SUSPENDED', 'CANCELLED')),
    max_seats INT NOT NULL DEFAULT 50,
    current_seats INT NOT NULL DEFAULT 0,
    domain_whitelist JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS institution_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'MEMBER' CHECK (role IN (
        'OWNER', 'ADMIN', 'SCHOLAR', 'INSTRUCTOR', 'MEMBER'
    )),
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INVITED', 'REMOVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (institution_id, user_id)
);

CREATE TABLE IF NOT EXISTS institution_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    journey_id UUID,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    member_count INT NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'ARCHIVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. GROWTH ENGINE: ETHICAL REFERRALS & EXPERIMENTS
CREATE TABLE IF NOT EXISTS growth_referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_user_id UUID NOT NULL,
    invite_token VARCHAR(64) UNIQUE NOT NULL,
    referred_user_id UUID,
    reward_type VARCHAR(32) NOT NULL DEFAULT 'PLUS_DAYS' CHECK (reward_type IN ('PLUS_DAYS', 'SCHOLAR_CREDIT', 'FAMILY_TRIAL')),
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONVERTED', 'EXPIRED', 'REVOKED')),
    reward_granted BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS growth_experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_key VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    hypothesis TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'RUNNING' CHECK (status IN ('DRAFT', 'RUNNING', 'CONCLUDED', 'CANCELLED')),
    ethical_review_passed BOOLEAN NOT NULL DEFAULT TRUE, -- Hard constraint: no guilt/shame/fear testing permitted
    target_sample_size INT NOT NULL DEFAULT 1000,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS growth_experiment_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID NOT NULL REFERENCES growth_experiments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    variant_key VARCHAR(64) NOT NULL,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (experiment_id, user_id)
);

-- 8. INTERNAL FINANCIAL REVENUE LEDGER
CREATE TABLE IF NOT EXISTS revenue_ledger_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_type VARCHAR(32) NOT NULL CHECK (transaction_type IN (
        'SUBSCRIPTION', 'SCHOLAR_FEE', 'PLATFORM_FEE', 'REFUND', 'SCHOLAR_PAYOUT', 'CREDIT'
    )),
    amount_cents INT NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    debit_account VARCHAR(64) NOT NULL,
    credit_account VARCHAR(64) NOT NULL,
    reference_id VARCHAR(128) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. API PLATFORM & TENANCY
CREATE TABLE IF NOT EXISTS api_tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    tenant_name VARCHAR(128) NOT NULL,
    api_key_hash VARCHAR(128) UNIQUE NOT NULL,
    scopes JSONB NOT NULL DEFAULT '["evidence.read", "journey.read"]'::jsonb,
    rate_limit_per_minute INT NOT NULL DEFAULT 60,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_entitlements_plan ON billing_entitlements(plan_id);
CREATE INDEX IF NOT EXISTS idx_scholar_consultations_scholar ON scholar_consultations(scholar_id);
CREATE INDEX IF NOT EXISTS idx_institutions_slug ON institutions(slug);
CREATE INDEX IF NOT EXISTS idx_revenue_ledger_ref ON revenue_ledger_entries(reference_id);
