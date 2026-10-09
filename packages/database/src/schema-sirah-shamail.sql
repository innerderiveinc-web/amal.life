-- =========================================================================
-- AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY + PROPHETIC LIFE GRAPH
-- PostgreSQL Relational & Graph Schema (Production DDL)
-- Epistemic Invariant: SIRAH ≠ SHAMA'IL ≠ TAZKIYAH ≠ TASAWWUF ≠ HADITH ≠ QURAN
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SIRAH SOURCES
CREATE TABLE IF NOT EXISTS sirah_sources (
    source_id VARCHAR(64) PRIMARY KEY,
    work_id VARCHAR(64),
    title_original VARCHAR(255) NOT NULL,
    title_transliterated VARCHAR(255) NOT NULL,
    title_normalized VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_death_hijri INT,
    language VARCHAR(32) NOT NULL DEFAULT 'ARABIC',
    genre VARCHAR(64) NOT NULL, -- 'SIRAH', 'SHAMAIL', 'MAGHAZI', 'DALAIL', 'TABAQAT'
    subgenre VARCHAR(64),
    source_type VARCHAR(64) NOT NULL, -- 'SIRAH_CLASSICAL', 'SHAMAIL', 'MAGHAZI', etc.
    source_tier VARCHAR(64) NOT NULL, -- 'TIER_A_PRIMARY_REVELATION', 'TIER_B_EARLY_SIRAH', etc.
    rights_status VARCHAR(64) NOT NULL DEFAULT 'PUBLIC_DOMAIN_CONFIRMED',
    lifecycle_state VARCHAR(64) NOT NULL DEFAULT 'CANDIDATE',
    scholarly_status VARCHAR(64) NOT NULL DEFAULT 'CANONICAL_REFERENCE',
    version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SIRAH SOURCE EDITIONS
CREATE TABLE IF NOT EXISTS sirah_source_editions (
    edition_id VARCHAR(64) PRIMARY KEY,
    source_id VARCHAR(64) NOT NULL REFERENCES sirah_sources(source_id) ON DELETE CASCADE,
    edition_title VARCHAR(255) NOT NULL,
    editor VARCHAR(255),
    publisher VARCHAR(255) NOT NULL,
    publication_year INT,
    volume_count INT DEFAULT 1,
    page_count INT,
    manuscript_basis TEXT,
    quality_status VARCHAR(64) DEFAULT 'CRITICAL_EDITION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SIRAH ARTIFACTS
CREATE TABLE IF NOT EXISTS sirah_artifacts (
    artifact_id VARCHAR(64) PRIMARY KEY,
    edition_id VARCHAR(64) NOT NULL REFERENCES sirah_source_editions(edition_id) ON DELETE CASCADE,
    artifact_type VARCHAR(64) NOT NULL, -- 'PDF_SCAN', 'NORMALIZED_TEXT', 'XML_TEI', 'JSON'
    storage_uri TEXT NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    rights_status VARCHAR(64) NOT NULL,
    preservation_state VARCHAR(64) NOT NULL DEFAULT 'VERIFIED_HASHED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SIRAH PASSAGES
CREATE TABLE IF NOT EXISTS sirah_passages (
    passage_id VARCHAR(64) PRIMARY KEY,
    edition_id VARCHAR(64) NOT NULL REFERENCES sirah_source_editions(edition_id) ON DELETE CASCADE,
    volume_number INT DEFAULT 1,
    page_number INT NOT NULL,
    line_start INT,
    line_end INT,
    arabic_text TEXT NOT NULL,
    normalized_text TEXT NOT NULL,
    section_title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SIRAH PERIODS
CREATE TABLE IF NOT EXISTS sirah_periods (
    period_id VARCHAR(64) PRIMARY KEY,
    period_code VARCHAR(64) UNIQUE NOT NULL,
    canonical_title VARCHAR(255) NOT NULL,
    start_year_ce INT,
    end_year_ce INT,
    summary TEXT NOT NULL
);

-- 6. SIRAH PLACES
CREATE TABLE IF NOT EXISTS sirah_places (
    place_id VARCHAR(64) PRIMARY KEY,
    canonical_name VARCHAR(255) NOT NULL,
    arabic_name VARCHAR(255),
    place_type VARCHAR(64) NOT NULL, -- 'CITY', 'MOUNTAIN', 'VALLEY', 'WELL', 'MOSQUE', 'BATTLEFIELD'
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    identification_certainty VARCHAR(64) NOT NULL DEFAULT 'ESTABLISHED',
    historical_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. SIRAH PEOPLE
CREATE TABLE IF NOT EXISTS sirah_people (
    person_id VARCHAR(64) PRIMARY KEY,
    canonical_name VARCHAR(255) NOT NULL,
    arabic_name VARCHAR(255),
    person_type VARCHAR(64) NOT NULL, -- 'PROPHET', 'COMPANION', 'FAMILY_MEMBER', 'TRIBE_LEADER', 'HISTORICAL_ACTOR'
    tribe_or_clan VARCHAR(128),
    role_in_sirah TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. SIRAH EVENTS
CREATE TABLE IF NOT EXISTS sirah_events (
    event_id VARCHAR(64) PRIMARY KEY,
    canonical_title VARCHAR(255) NOT NULL,
    arabic_title VARCHAR(255),
    event_type VARCHAR(64) NOT NULL, -- 'EXPEDITION', 'BATTLE', 'TREATY', 'MIGRATION', 'REVELATION', etc.
    period_id VARCHAR(64) NOT NULL REFERENCES sirah_periods(period_id),
    description_neutral TEXT NOT NULL,
    start_hijri_year INT,
    start_hijri_month INT,
    start_gregorian_year INT,
    date_precision VARCHAR(64) NOT NULL DEFAULT 'YEAR',
    chronology_status VARCHAR(64) NOT NULL DEFAULT 'ACCEPTED_STANDARD',
    chronology_notes TEXT,
    place_id VARCHAR(64) REFERENCES sirah_places(place_id),
    review_status VARCHAR(64) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. SIRAH EVENT EVIDENCE
CREATE TABLE IF NOT EXISTS sirah_event_evidence (
    evidence_id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    source_id VARCHAR(64) NOT NULL REFERENCES sirah_sources(source_id),
    passage_id VARCHAR(64) REFERENCES sirah_passages(passage_id),
    evidence_type VARCHAR(64) NOT NULL, -- 'QURAN_AYAH', 'HADITH_NARRATION', 'EARLY_SIRAH', 'LATER_SIRAH'
    reference VARCHAR(255) NOT NULL,
    directness VARCHAR(64) NOT NULL,
    confidence_state VARCHAR(64) NOT NULL DEFAULT 'SUPPORTED',
    hadith_grading VARCHAR(64),
    scholarly_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. SIRAH CHRONOLOGY & REPORT VARIANTS
CREATE TABLE IF NOT EXISTS sirah_chronology_variants (
    variant_id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    difference_type VARCHAR(64) NOT NULL, -- 'DATE', 'LOCATION', 'PARTICIPANT', 'SEQUENCE', 'NUMBER'
    difference_summary TEXT NOT NULL,
    report_a_source VARCHAR(255) NOT NULL,
    report_a_claim TEXT NOT NULL,
    report_b_source VARCHAR(255) NOT NULL,
    report_b_claim TEXT NOT NULL,
    scholarly_assessment TEXT NOT NULL,
    resolution_status VARCHAR(64) NOT NULL DEFAULT 'GENUINELY_DISPUTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. SIRAH SHAMA'IL CATEGORIES & REPORTS
CREATE TABLE IF NOT EXISTS sirah_shamail_categories (
    category_code VARCHAR(64) PRIMARY KEY,
    canonical_title VARCHAR(255) NOT NULL,
    arabic_title VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS sirah_shamail_reports (
    report_id VARCHAR(64) PRIMARY KEY,
    category_code VARCHAR(64) NOT NULL REFERENCES sirah_shamail_categories(category_code),
    primary_narrator VARCHAR(255) NOT NULL,
    primary_source_work VARCHAR(255) NOT NULL,
    hadith_number INT,
    arabic_matn TEXT NOT NULL,
    english_translation TEXT NOT NULL,
    urdu_translation TEXT,
    source_hadith_ref VARCHAR(255),
    hadith_grading VARCHAR(64) NOT NULL DEFAULT 'SAHIH',
    grading_authority VARCHAR(255) NOT NULL,
    theological_notes TEXT,
    practical_adab_lesson TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. SIRAH CLAIM LEDGER
CREATE TABLE IF NOT EXISTS sirah_claims (
    claim_id VARCHAR(64) PRIMARY KEY,
    claim_text TEXT NOT NULL,
    claim_class VARCHAR(64) NOT NULL, -- 'DIRECTLY_EVIDENCED', 'SUPPORTED_HISTORICAL_REPORT', etc.
    event_id VARCHAR(64) REFERENCES sirah_events(event_id),
    confidence_state VARCHAR(64) NOT NULL DEFAULT 'SUPPORTED',
    scholarly_status VARCHAR(64) NOT NULL DEFAULT 'ACCEPTED_CANON',
    review_status VARCHAR(64) NOT NULL DEFAULT 'PENDING',
    reviewer VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. SIRAH PRACTICAL AMAL MAPPINGS
CREATE TABLE IF NOT EXISTS sirah_amal_mappings (
    mapping_id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    derived_lesson TEXT NOT NULL,
    practice_title VARCHAR(255) NOT NULL,
    practice_category VARCHAR(64) NOT NULL, -- 'PROPHETIC_SUNNAH', 'SCHOLARLY_RECOMMENDATION', etc.
    classical_grounding TEXT NOT NULL,
    non_invented_obligation_disclaimer TEXT NOT NULL,
    actionable_step TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. SIRAH SCHOLAR REVIEWS & RELEASES
CREATE TABLE IF NOT EXISTS sirah_reviews (
    review_id VARCHAR(64) PRIMARY KEY,
    target_type VARCHAR(64) NOT NULL, -- 'SOURCE', 'EVENT', 'CLAIM', 'VARIANT'
    target_id VARCHAR(64) NOT NULL,
    scholar_id VARCHAR(64) NOT NULL,
    decision VARCHAR(64) NOT NULL, -- 'APPROVED', 'DISPUTED', 'CHANGES_REQUIRED', 'REJECTED'
    annotation_notes TEXT,
    signed_hash VARCHAR(128) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sirah_releases (
    release_id VARCHAR(64) PRIMARY KEY,
    release_version VARCHAR(32) NOT NULL,
    total_events INT NOT NULL,
    total_sources INT NOT NULL,
    total_evidence INT NOT NULL,
    scholar_signoffs_count INT NOT NULL,
    red_team_score VARCHAR(16) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. PROPHETIC LIFE GRAPH EDGES (Relational Graph representation)
CREATE TABLE IF NOT EXISTS sirah_graph_edges (
    edge_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_node_id VARCHAR(64) NOT NULL,
    to_node_id VARCHAR(64) NOT NULL,
    edge_type VARCHAR(64) NOT NULL,
    source_reference VARCHAR(255),
    confidence_state VARCHAR(64) DEFAULT 'SUPPORTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. SIRAH EVENT REPORTS (Source-specific narratives)
CREATE TABLE IF NOT EXISTS sirah_event_reports (
    report_id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    source_id VARCHAR(64) NOT NULL REFERENCES sirah_sources(source_id),
    passage_id VARCHAR(64) REFERENCES sirah_passages(passage_id),
    report_text TEXT NOT NULL,
    normalized_summary TEXT NOT NULL,
    date_if_reported VARCHAR(64),
    scholarly_assessment TEXT,
    review_status VARCHAR(64) NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. SIRAH EVENT PEOPLE (Participants & Roles)
CREATE TABLE IF NOT EXISTS sirah_event_people (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    person_id VARCHAR(64) NOT NULL REFERENCES sirah_people(person_id) ON DELETE CASCADE,
    role VARCHAR(128) NOT NULL DEFAULT 'PARTICIPANT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. SIRAH EVENT PLACES (Geographic Associations)
CREATE TABLE IF NOT EXISTS sirah_event_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    place_id VARCHAR(64) NOT NULL REFERENCES sirah_places(place_id) ON DELETE CASCADE,
    association_type VARCHAR(64) NOT NULL DEFAULT 'PRIMARY_LOCATION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. SIRAH CLAIM EVIDENCE (Claim-to-Evidence Junction)
CREATE TABLE IF NOT EXISTS sirah_claim_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id VARCHAR(64) NOT NULL REFERENCES sirah_claims(claim_id) ON DELETE CASCADE,
    evidence_id VARCHAR(64) NOT NULL REFERENCES sirah_event_evidence(evidence_id) ON DELETE CASCADE,
    relevance_weight DECIMAL(3, 2) DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. SIRAH QUOTES (Verbatim & Attributed Statements)
CREATE TABLE IF NOT EXISTS sirah_quotes (
    quote_id VARCHAR(64) PRIMARY KEY,
    quote_text TEXT NOT NULL,
    normalized_text TEXT NOT NULL,
    claimed_speaker VARCHAR(255) NOT NULL,
    claimed_source VARCHAR(255),
    verified_source_id VARCHAR(64) REFERENCES sirah_sources(source_id),
    verification_status VARCHAR(64) NOT NULL DEFAULT 'PENDING',
    citation_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. SIRAH SOURCE COMPARISONS (Cross-Source Differential Audits)
CREATE TABLE IF NOT EXISTS sirah_source_comparisons (
    comparison_id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    source_a_id VARCHAR(64) NOT NULL REFERENCES sirah_sources(source_id),
    source_b_id VARCHAR(64) NOT NULL REFERENCES sirah_sources(source_id),
    difference_type VARCHAR(64) NOT NULL,
    agreements JSONB NOT NULL DEFAULT '[]',
    differences JSONB NOT NULL DEFAULT '[]',
    scholarly_resolution_summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 22. SIRAH LESSONS (Epistemically Isolated Derived Reflections)
CREATE TABLE IF NOT EXISTS sirah_lessons (
    lesson_id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES sirah_events(event_id) ON DELETE CASCADE,
    lesson_text TEXT NOT NULL,
    epistemic_class VARCHAR(64) NOT NULL DEFAULT 'SCHOLARLY_INTERPRETATION',
    is_non_legal_contemplation BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 23. SIRAH PROVENANCE (Full Lineage Chain)
CREATE TABLE IF NOT EXISTS sirah_provenance (
    provenance_id VARCHAR(64) PRIMARY KEY,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    source_id VARCHAR(64) NOT NULL REFERENCES sirah_sources(source_id),
    edition_id VARCHAR(64) REFERENCES sirah_source_editions(edition_id),
    artifact_id VARCHAR(64) REFERENCES sirah_artifacts(artifact_id),
    passage_id VARCHAR(64) REFERENCES sirah_passages(passage_id),
    sha256_hash VARCHAR(64) NOT NULL,
    verified_by_scholar_id VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR FAST RETRIEVAL & GRAPH TRAVERSAL
CREATE INDEX IF NOT EXISTS idx_sirah_events_period ON sirah_events(period_id);
CREATE INDEX IF NOT EXISTS idx_sirah_evidence_event ON sirah_event_evidence(event_id);
CREATE INDEX IF NOT EXISTS idx_sirah_variants_event ON sirah_chronology_variants(event_id);
CREATE INDEX IF NOT EXISTS idx_sirah_shamail_cat ON sirah_shamail_reports(category_code);
CREATE INDEX IF NOT EXISTS idx_sirah_edges_from ON sirah_graph_edges(from_node_id);
CREATE INDEX IF NOT EXISTS idx_sirah_edges_to ON sirah_graph_edges(to_node_id);
CREATE INDEX IF NOT EXISTS idx_sirah_reports_event ON sirah_event_reports(event_id);
CREATE INDEX IF NOT EXISTS idx_sirah_event_people ON sirah_event_people(event_id, person_id);
CREATE INDEX IF NOT EXISTS idx_sirah_event_places ON sirah_event_places(event_id, place_id);
CREATE INDEX IF NOT EXISTS idx_sirah_claim_ev ON sirah_claim_evidence(claim_id, evidence_id);
CREATE INDEX IF NOT EXISTS idx_sirah_comparisons_evt ON sirah_source_comparisons(event_id);
CREATE INDEX IF NOT EXISTS idx_sirah_provenance_entity ON sirah_provenance(entity_type, entity_id);
