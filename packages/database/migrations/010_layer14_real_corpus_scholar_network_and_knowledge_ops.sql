-- ==============================================================================
-- AMAL OS — MIGRATION 010: LAYER 14 REAL CORPUS, SCHOLAR NETWORK & KNOWLEDGE OPS
-- ==============================================================================

-- 1. CANONICAL SOURCES REGISTRY
CREATE TABLE IF NOT EXISTS canonical_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    source_type VARCHAR(64) NOT NULL CHECK (source_type IN (
        'QURAN', 'HADITH', 'TAFSIR', 'FIQH', 'AQEEDAH', 'SEERAH', 'SCHOLARLY_WORK', 'EDUCATIONAL', 'REFERENCE'
    )),
    original_language VARCHAR(32) DEFAULT 'ar',
    publisher VARCHAR(255),
    edition VARCHAR(128),
    publication_year INT,
    license_status VARCHAR(32) NOT NULL DEFAULT 'UNKNOWN' CHECK (license_status IN (
        'VERIFIED', 'RESTRICTED', 'UNKNOWN', 'EXPIRED'
    )),
    provenance_status VARCHAR(32) NOT NULL DEFAULT 'UNVERIFIED' CHECK (provenance_status IN (
        'VERIFIED', 'PARTIAL', 'UNVERIFIED'
    )),
    review_status VARCHAR(32) NOT NULL DEFAULT 'DRAFT' CHECK (review_status IN (
        'DRAFT', 'TECHNICAL_VALIDATION', 'EDITORIAL_REVIEW', 'SCHOLAR_REVIEW', 'APPROVED', 'REJECTED'
    )),
    publication_status VARCHAR(32) NOT NULL DEFAULT 'DRAFT' CHECK (publication_status IN (
        'DRAFT', 'CANDIDATE', 'PUBLISHED', 'RETIRED', 'QUARANTINED'
    )),
    digital_artifact_hash VARCHAR(128) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. QURAN CANONICAL KNOWLEDGE LAYER (IMMUTABLE ARABIC)
CREATE TABLE IF NOT EXISTS quran_ayahs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    surah_number INT NOT NULL CHECK (surah_number BETWEEN 1 AND 114),
    ayah_number INT NOT NULL CHECK (ayah_number >= 1),
    arabic_text TEXT NOT NULL,
    normalized_search_text TEXT NOT NULL,
    canonical_version VARCHAR(64) NOT NULL DEFAULT 'uthmani_hafs_v1',
    content_hash VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (status IN ('APPROVED', 'REVIEW', 'RETIRED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (surah_number, ayah_number, canonical_version)
);

-- 3. QURAN TRANSLATION REGISTRY
CREATE TABLE IF NOT EXISTS quran_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ayah_id UUID NOT NULL REFERENCES quran_ayahs(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    translator VARCHAR(255) NOT NULL,
    language VARCHAR(16) NOT NULL,
    translation_text TEXT NOT NULL,
    publisher VARCHAR(255),
    edition VARCHAR(128),
    license_status VARCHAR(32) NOT NULL DEFAULT 'VERIFIED' CHECK (license_status IN ('VERIFIED', 'RESTRICTED', 'UNKNOWN')),
    review_status VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (review_status IN ('DRAFT', 'APPROVED', 'RETIRED')),
    content_hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TAFSIR KNOWLEDGE SYSTEM
CREATE TABLE IF NOT EXISTS tafsir_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ayah_id UUID NOT NULL REFERENCES quran_ayahs(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    tafsir_work VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    methodology VARCHAR(255),
    passage_text TEXT NOT NULL,
    volume INT,
    page INT,
    section VARCHAR(255),
    license_status VARCHAR(32) NOT NULL DEFAULT 'VERIFIED',
    review_status VARCHAR(32) NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. HADITH KNOWLEDGE SYSTEM & MULTI-GRADING MODEL
CREATE TABLE IF NOT EXISTS hadith_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection VARCHAR(64) NOT NULL,
    book_number INT NOT NULL,
    chapter_number INT NOT NULL,
    hadith_number INT NOT NULL,
    arabic_text TEXT NOT NULL,
    english_text TEXT,
    chain_narration TEXT,
    reference_str VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (collection, book_number, hadith_number)
);

CREATE TABLE IF NOT EXISTS hadith_gradings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hadith_id UUID NOT NULL REFERENCES hadith_entries(id) ON DELETE CASCADE,
    grader VARCHAR(255) NOT NULL,
    methodology VARCHAR(255),
    grade VARCHAR(64) NOT NULL, -- Sahih, Hasan, Da'if, etc.
    reference VARCHAR(255) NOT NULL,
    source_id UUID REFERENCES canonical_sources(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. FIQH KNOWLEDGE SYSTEM (PLURALITY & IKHTILĀF PRESERVATION)
CREATE TABLE IF NOT EXISTS scholarly_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_code VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(64) NOT NULL, -- Taharah, Salah, Zakah, Family, Finance, Contemporary
    question TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scholarly_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_id UUID NOT NULL REFERENCES scholarly_issues(id) ON DELETE CASCADE,
    position_summary TEXT NOT NULL,
    scholar_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    madhhab_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    conditions JSONB NOT NULL DEFAULT '[]'::jsonb,
    exceptions JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_consensus BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (status IN ('APPROVED', 'DISPUTED', 'RETIRED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ISLAMIC CONCEPTS & LIFE SITUATIONS
CREATE TABLE IF NOT EXISTS islamic_concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_key VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    arabic_name VARCHAR(128) NOT NULL,
    definition TEXT NOT NULL,
    quran_references JSONB NOT NULL DEFAULT '[]'::jsonb,
    hadith_references JSONB NOT NULL DEFAULT '[]'::jsonb,
    scholarly_explanation TEXT,
    common_misunderstandings JSONB NOT NULL DEFAULT '[]'::jsonb,
    life_applications JSONB NOT NULL DEFAULT '[]'::jsonb,
    related_concepts JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS life_situations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    situation_key VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT NOT NULL,
    relevant_concepts JSONB NOT NULL DEFAULT '[]'::jsonb,
    relevant_evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    potential_amal_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    behavioral_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SCHOLAR NETWORK & SKILL MATRIX
CREATE TABLE IF NOT EXISTS verified_scholars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    languages JSONB NOT NULL DEFAULT '["en", "ar"]'::jsonb,
    fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    credentials JSONB NOT NULL DEFAULT '[]'::jsonb,
    jurisdiction VARCHAR(128),
    madhhab_affiliation VARCHAR(64),
    skill_matrix JSONB NOT NULL DEFAULT '{"fiqh": "HIGH", "hadith": "HIGH", "family": "MEDIUM", "finance": "LOW", "arabic": "HIGH"}'::jsonb,
    verification_status VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (verification_status IN (
        'APPLICATION', 'IDENTITY_VERIFIED', 'CREDENTIALS_VERIFIED', 'SAMPLE_REVIEWED', 'APPROVED', 'SUSPENDED'
    )),
    active_cases_count INT NOT NULL DEFAULT 0,
    max_capacity INT NOT NULL DEFAULT 10,
    available_for_routing BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scholar_cases_v2 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    assigned_scholar_id UUID REFERENCES verified_scholars(id),
    second_reviewer_scholar_id UUID REFERENCES verified_scholars(id),
    category VARCHAR(64) NOT NULL,
    question TEXT NOT NULL,
    sanitized_context TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'UNASSIGNED' CHECK (status IN (
        'UNASSIGNED', 'ASSIGNED', 'IN_REVIEW', 'NEED_CLARIFICATION', 'ANSWERED', 'ESCALATED', 'CLOSED'
    )),
    answer TEXT,
    answer_provenance JSONB DEFAULT '{}'::jsonb,
    version INT NOT NULL DEFAULT 1,
    two_person_rule_satisfied BOOLEAN NOT NULL DEFAULT FALSE,
    urgency VARCHAR(16) NOT NULL DEFAULT 'NORMAL',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. KNOWLEDGE CLAIMS & CONFLICT ENGINE
CREATE TABLE IF NOT EXISTS knowledge_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_text TEXT NOT NULL,
    claim_type VARCHAR(32) NOT NULL CHECK (claim_type IN ('DIRECT', 'INFERENTIAL', 'INTERPRETIVE', 'CONTESTED')),
    source_passage_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    support_level VARCHAR(32) NOT NULL CHECK (support_level IN (
        'DIRECT', 'STRONG_INFERENCE', 'INTERPRETIVE', 'CONTESTED', 'UNSUPPORTED'
    )),
    review_status VARCHAR(32) NOT NULL DEFAULT 'APPROVED' CHECK (review_status IN ('DRAFT', 'REVIEW', 'APPROVED', 'REJECTED')),
    conflict_detected BOOLEAN NOT NULL DEFAULT FALSE,
    conflicting_claim_id UUID REFERENCES knowledge_claims(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. CONTENT DISPUTES & SEVERITY FREEZE
CREATE TABLE IF NOT EXISTS content_disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL,
    content_type VARCHAR(64) NOT NULL,
    reason VARCHAR(64) NOT NULL CHECK (reason IN (
        'INCORRECT_CITATION', 'TRANSLATION_ISSUE', 'MISSING_CONTEXT', 'WRONG_ATTRIBUTION',
        'SCHOLARLY_DISAGREEMENT', 'LICENSE_ISSUE', 'DUPLICATE', 'FABRICATED_SOURCE'
    )),
    severity VARCHAR(16) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    reporter_id UUID NOT NULL,
    assigned_reviewer_id UUID,
    status VARCHAR(32) NOT NULL DEFAULT 'OPEN' CHECK (status IN (
        'OPEN', 'FROZEN', 'UNDER_REVIEW', 'CORRECTED', 'RETRACTED', 'PRESERVED_PLURALITY', 'DISMISSED'
    )),
    freeze_applied BOOLEAN NOT NULL DEFAULT FALSE,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. KNOWLEDGE RELEASES & BLUE-GREEN INDEX
CREATE TABLE IF NOT EXISTS knowledge_releases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    release_tag VARCHAR(64) UNIQUE NOT NULL,
    source_versions JSONB NOT NULL DEFAULT '[]'::jsonb,
    evidence_changes JSONB NOT NULL DEFAULT '[]'::jsonb,
    graph_changes JSONB NOT NULL DEFAULT '[]'::jsonb,
    benchmark_run_id UUID,
    reviewer_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    approver_id UUID,
    status VARCHAR(32) NOT NULL DEFAULT 'CANDIDATE' CHECK (status IN (
        'CANDIDATE', 'APPROVED', 'CANARY', 'PUBLISHED', 'ROLLED_BACK'
    )),
    active_search_alias VARCHAR(16) NOT NULL DEFAULT 'index_A',
    rollback_snapshot_tag VARCHAR(64),
    release_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. GOLD RETRIEVAL & CITATION BENCHMARK
CREATE TABLE IF NOT EXISTS gold_benchmark_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(64) NOT NULL,
    question TEXT NOT NULL,
    expected_evidence_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    acceptable_source_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    scholar_required BOOLEAN NOT NULL DEFAULT FALSE,
    known_disagreement JSONB DEFAULT '[]'::jsonb,
    forbidden_claims JSONB DEFAULT '[]'::jsonb,
    language VARCHAR(16) NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR RETRIEVAL & OBSERVABILITY
CREATE INDEX IF NOT EXISTS idx_canonical_sources_type_status ON canonical_sources(source_type, publication_status);
CREATE INDEX IF NOT EXISTS idx_quran_ayahs_lookup ON quran_ayahs(surah_number, ayah_number);
CREATE INDEX IF NOT EXISTS idx_hadith_lookup ON hadith_entries(collection, book_number, hadith_number);
CREATE INDEX IF NOT EXISTS idx_scholarly_positions_issue ON scholarly_positions(issue_id);
CREATE INDEX IF NOT EXISTS idx_content_disputes_status_severity ON content_disputes(status, severity);
