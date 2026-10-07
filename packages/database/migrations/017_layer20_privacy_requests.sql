-- =====================================================================
-- AMAL OS — DATABASE MIGRATION 017: PRIVACY REQUESTS
-- Section 20.28
-- =====================================================================

CREATE TABLE IF NOT EXISTS privacy_requests (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    request_type TEXT NOT NULL CHECK (request_type IN ('DATA_EXPORT', 'ACCOUNT_DELETION', 'CONSENT_REVOCATION')),
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),

    requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    error_code TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_privacy_requests_user
    ON privacy_requests(user_id, status);
