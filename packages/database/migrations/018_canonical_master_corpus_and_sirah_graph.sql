-- =========================================================================
-- AMAL OS — MIGRATION 018: MASTER CANONICAL CORPUS (76 WORKS) & SIRAH GRAPH
-- Epistemic Invariant: QURAN != HADITH != TAFSIR != FIQH != SIRAH != TAZKIYAH
-- 100% Traditional Ahl al-Sunnah wa al-Jama'ah (Sawad al-A'zam)
-- =========================================================================

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


-- =========================================================================
-- 26. CANONICAL MASTER CORPUS (76 REAL CLASSICAL WORKS)
-- =========================================================================
CREATE TABLE IF NOT EXISTS canonical_master_corpus (
    work_id VARCHAR(64) PRIMARY KEY,
    title_arabic VARCHAR(255) NOT NULL,
    title_transliterated VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_death_hijri INT NOT NULL DEFAULT 0,
    discipline VARCHAR(64) NOT NULL,
    edition_publisher VARCHAR(255) NOT NULL,
    publication_city VARCHAR(128) NOT NULL,
    critical_editor_muhaqqiq VARCHAR(255) NOT NULL,
    volume_count INT NOT NULL DEFAULT 1,
    rights_status VARCHAR(64) NOT NULL DEFAULT 'PUBLIC_DOMAIN_CONFIRMED',
    provenance_sha256 VARCHAR(64) NOT NULL,
    scholarly_authority_level VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED 76 CANONICAL MASTERWORKS
INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-QUR-001',
    'القرآن الكريم (مصحف المدينة النبوية)',
    'Al-Qur''an al-Karim (Mushaf al-Madinah)',
    'Kalam Allah (Revelation)',
    0,
    'QURAN',
    'Majma'' al-Malik Fahd li-Tiba''at al-Mushaf al-Sharif',
    'Madinah Munawwarah',
    'Lajnah Ilmiyyah bi-Riasat Ali al-Hudhayfi',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'f7c82775a860df3842778e2ede6b78e2c3804b6ea8b2cec94bcd3d37c3cabb8a',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-001',
    'الجامع المسند الصحيح المختصر (صحيح البخاري)',
    'Sahih al-Bukhari',
    'Imam Muhammad ibn Isma''il al-Bukhari',
    256,
    'HADITH',
    'Dar Tuq al-Najah (al-Nuskhah al-Sultaniyyah)',
    'Beirut',
    'Muhammad Zuhayr b. Nasir al-Nasir',
    9,
    'PUBLIC_DOMAIN_CONFIRMED',
    'f3e7c3478d1787458a4109dc9c67716e1bc7577dd5ed056e6ed3e55aee79d3f1',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-002',
    'المسند الصحيح المختصر بنقل العدل عن العدل (صحيح مسلم)',
    'Sahih Muslim',
    'Imam Muslim ibn al-Hajjaj al-Naysaburi',
    261,
    'HADITH',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Muhammad Fu''ad Abd al-Baqi',
    5,
    'PUBLIC_DOMAIN_CONFIRMED',
    '89e92e271bd0caca3da24da5fbc3e8524459800807a247971b83bb87f0e1a8d2',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-003',
    'سنن أبي داود',
    'Sunan Abi Dawud',
    'Imam Abu Dawud Sulayman ibn al-Ash''ath al-Sijistani',
    275,
    'HADITH',
    'Dar al-Risalah al-Alamiyyah',
    'Damascus / Beirut',
    'Shu''ayb al-Arna''ut & Muhammad Kamil Qarah Belli',
    7,
    'PUBLIC_DOMAIN_CONFIRMED',
    '4ef3e9d7949adbfcc3b065b19b2ec04d86f5d694be7fad078308fb32a0f61622',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-004',
    'الجامع الكبير (سنن الترمذي)',
    'Jami'' at-Tirmidhi',
    'Imam Muhammad ibn Isa at-Tirmidhi',
    279,
    'HADITH',
    'Dar al-Gharb al-Islami',
    'Beirut',
    'Dr. Bashshar Awwad Ma''ruf',
    6,
    'PUBLIC_DOMAIN_CONFIRMED',
    '7e96b13f3e496d37fb1843fa1d63e0057d234ead9eb99b62bbfceea983fe37a0',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-005',
    'المجتبى من السنن (سنن النسائي الصغرى)',
    'Sunan al-Nasa''i (Al-Mujtaba)',
    'Imam Ahmad ibn Shu''ayb al-Nasa''i',
    303,
    'HADITH',
    'Maktab al-Matbu''at al-Islamiyyah',
    'Aleppo / Beirut',
    'Shaykh Abd al-Fattah Abu Ghuddah',
    9,
    'PUBLIC_DOMAIN_CONFIRMED',
    'd3aff887bf7b327245f8992cdb129cdc32ad2e9cbc1fb6efa31097dc33f87e5b',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-006',
    'سنن ابن ماجه',
    'Sunan Ibn Majah',
    'Imam Muhammad ibn Yazid Ibn Majah al-Qazwini',
    273,
    'HADITH',
    'Dar al-Risalah al-Alamiyyah',
    'Damascus / Beirut',
    'Shu''ayb al-Arna''ut et al.',
    5,
    'PUBLIC_DOMAIN_CONFIRMED',
    '5770433904095b2e57f5faa8091d2486d134e00fe9b71bc9de58fc72e8c0ecbc',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-007',
    'الموطأ (رواية يحيى بن يحيى الليثي)',
    'Al-Muwatta (Riwayah Yahya al-Laythi)',
    'Imam Malik ibn Anas al-Asbahi',
    179,
    'HADITH',
    'Dar al-Gharb al-Islami',
    'Beirut',
    'Dr. Bashshar Awwad Ma''ruf',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    '4e390ff16823a8d62bdf80a7a9a2f2794c12f95e0233f3b3c8b4a5aacc11f5e6',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-008',
    'المسند',
    'Musnad Ahmad ibn Hanbal',
    'Imam Ahmad ibn Hanbal al-Shaybani',
    241,
    'HADITH',
    'Mu''assasah al-Risalah',
    'Beirut',
    'Shu''ayb al-Arna''ut et al.',
    50,
    'PUBLIC_DOMAIN_CONFIRMED',
    '6689a94dedeb36bcf48ca6fbefce074af8b68d39c1784309e35af64630a43d36',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-001',
    'جامع البيان عن تأويل آي القرآن (تفسير الطبري)',
    'Jami'' al-Bayan (Tafsir al-Tabari)',
    'Imam Muhammad ibn Jarir al-Tabari',
    310,
    'TAFSIR',
    'Dar Hijr',
    'Cairo',
    'Dr. Abd Allah ibn Abd al-Muhsin al-Turki',
    26,
    'PUBLIC_DOMAIN_CONFIRMED',
    'af09b47b16db8c2d0da25aee7c2771eb5a52fb2a0e029f8844b833cdbcde33a9',
    'TIER_B_EARLY_SIRAH'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-002',
    'تفسير القرآن العظيم (تفسير ابن كثير)',
    'Tafsir al-Qur''an al-Azim (Tafsir Ibn Kathir)',
    'Al-Hafiz Isma''il ibn Kathir al-Dimashqi',
    774,
    'TAFSIR',
    'Dar Taybah',
    'Riyadh',
    'Sami ibn Muhammad al-Salamah',
    8,
    'PUBLIC_DOMAIN_CONFIRMED',
    'f374b468a04259c96b4ff329ca899b43e14d4512237bcaccc1a3cb2bff98308e',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-003',
    'الجامع لأحكام القرآن (تفسير القرطبي)',
    'Al-Jami'' li-Ahkam al-Qur''an (Tafsir al-Qurtubi)',
    'Imam Abu Abd Allah Muhammad al-Qurtubi',
    671,
    'TAFSIR',
    'Mu''assasah al-Risalah',
    'Beirut',
    'Dr. Abd Allah ibn Abd al-Muhsin al-Turki',
    24,
    'PUBLIC_DOMAIN_CONFIRMED',
    '0ab18be4017a9618b2aacd06be4181845673589a3c095e14be4755ae2529822d',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-004',
    'أنوار التنزيل وأسرار التأويل (تفسير البيضاوي)',
    'Anwar al-Tanzil wa-Asrar al-Ta''wil (Tafsir al-Baydawi)',
    'Qadi Nasir al-Din Abd Allah al-Baydawi',
    685,
    'TAFSIR',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Muhammad Abd al-Rahman al-Mar''ashli',
    5,
    'PUBLIC_DOMAIN_CONFIRMED',
    'e9cd004ee170f1cd5e94caf1a9100d44618ad30b71e485d5708259255e4d5bf6',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HAN-001',
    'الهداية في شرح بداية المبتدي',
    'Al-Hidayah fi Sharh Bidayat al-Mubtadi',
    'Imam Ali ibn Abi Bakr al-Marghinani',
    593,
    'HANAFI_FIQH',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Talal Yusuf',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    'efe75ffe92b651af6120367df04987cb32d53bb7b398a2685279ffb75902fa49',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HAN-002',
    'مختصر القدوري',
    'Mukhtasar al-Quduri',
    'Imam Abu al-Husayn Ahmad al-Quduri',
    428,
    'HANAFI_FIQH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Kamil Muhammad Muhammad Uwaydah',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '1e16cf4ba750e61ad397a45631164091ee27d26581f41a69f2dbd0148cda819c',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HAN-003',
    'رد المحتار على الدر المختار (حاشية ابن عابدين)',
    'Radd al-Muhtar ala al-Durr al-Mukhtar (Hashiyat Ibn Abidin)',
    'Muhammad Amin Ibn Abidin al-Shami',
    1252,
    'HANAFI_FIQH',
    'Dar Alam al-Kutub',
    'Riyadh',
    'Adil Ahmad Abd al-Mawjud & Ali Muhammad Mu''awwad',
    12,
    'PUBLIC_DOMAIN_CONFIRMED',
    '485f4248013048d67c272f1d6f3606f504a0267fdc28e19c25af622c4d95be8b',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-MAL-001',
    'المدونة الكبرى',
    'Al-Mudawwanah al-Kubra',
    'Imam Sahnun Abd al-Salam ibn Sa''id al-Tanukhi',
    240,
    'MALIKI_FIQH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Zakariyya Umayrat',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    '990fc162ae1569b513546bf8623cfffd6e2811119d330d9269ed27bd2d66d73c',
    'TIER_B_EARLY_SIRAH'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-MAL-002',
    'الرسالة القيروانية',
    'Al-Risalah al-Qayrawaniyyah',
    'Abu Muhammad Abd Allah Ibn Abi Zayd al-Qayrawani',
    386,
    'MALIKI_FIQH',
    'Dar al-Gharb al-Islami',
    'Beirut',
    'Al-Hadi Hammu & Muhammad Abu al-Ajfan',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'a7ae888f91d08573421dcebeb4043ab77e0310775ac227b6c4fca331f8150fab',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-MAL-003',
    'مختصر خليل',
    'Mukhtasar Khalil',
    'Shaykh Khalil ibn Ishaq al-Jundi',
    776,
    'MALIKI_FIQH',
    'Dar al-Hadith',
    'Cairo',
    'Ahmad Jad',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '1d37924ec14228230cf510fe726131982599ea2ed1c0f35934d15de0c7ad8425',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-SHA-001',
    'الأم',
    'Kitab al-Umm',
    'Imam Muhammad ibn Idris al-Shafi''i',
    204,
    'SHAFII_FIQH',
    'Dar al-Wafa',
    'Mansoura / Cairo',
    'Dr. Rif''at Fawzi Abd al-Muttalib',
    11,
    'PUBLIC_DOMAIN_CONFIRMED',
    'bf4f20f1272d020f677254ae0c6a1b73a4a801cacd2ef58533a7c3be6314f51c',
    'TIER_B_EARLY_SIRAH'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-SHA-002',
    'منهاج الطالبين وعمدة المفتين',
    'Minhaj al-Talibin wa-Umdat al-Muftin',
    'Imam Yahya ibn Sharaf al-Nawawi',
    676,
    'SHAFII_FIQH',
    'Dar al-Minhaj',
    'Jeddah',
    'Ahmad b. Abd al-Aziz al-Haddad',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'd93ace2859bd290b43c43bd482f67c3d042628b0a3f4959aff1cb8c3e5126413',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HNB-001',
    'المغني في فقه الإمام أحمد',
    'Al-Mughni fi Fiqh al-Imam Ahmad',
    'Muwaffaq al-Din Ibn Qudamah al-Maqdisi',
    620,
    'HANBALI_FIQH',
    'Dar Alam al-Kutub',
    'Riyadh',
    'Dr. Abd Allah ibn Abd al-Muhsin al-Turki',
    15,
    'PUBLIC_DOMAIN_CONFIRMED',
    '11aaf0b995e3d63cb95f3ac7bce5c73931a04fc08f3c3a13ad821b6e37307c2c',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HNB-002',
    'زاد المستقنع في اختصار المقنع',
    'Zad al-Mustaqni'' fi Ikhtisar al-Muqni''',
    'Sharaf al-Din Musa al-Hajjawi',
    968,
    'HANBALI_FIQH',
    'Maktabat al-Rushd',
    'Riyadh',
    'Abd al-Rahman al-Askar',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'c9e6d7683219194ba720d3b22aa9ff2950e382ac0a5130c92b90bc1cc5e4c976',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SIR-001',
    'السيرة النبوية (سيرة ابن هشام)',
    'Al-Sirah al-Nabawiyyah (Sirat Ibn Hisham)',
    'Abu Muhammad Abd al-Malik Ibn Hisham',
    218,
    'SIRAH',
    'Dar al-Kitab al-Arabi',
    'Beirut',
    'Mustafa al-Saqqa, Ibrahim al-Ibyari, Abd al-Hafiz Shalabi',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    '9c7cd4ccaaea32e730b3ccbbaed97766d7326465a5c4dda8d39111bfa1cd8dcf',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SHM-001',
    'الشمائل المحمدية والخصائص المصطفوية',
    'Al-Shama''il al-Muhammadiyyah',
    'Imam Muhammad ibn Isa at-Tirmidhi',
    279,
    'SHAMAIL',
    'Dar al-Hadith al-Kattaniyyah',
    'Beirut',
    'Shaykh Muhammad Awwamah',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'bb13c5555979110780ba06e6a59bbd3a8e298d8a6fa0cffee1c946d8a87207d5',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SIR-002',
    'البداية والنهاية',
    'Al-Bidayah wan-Nihayah',
    'Al-Hafiz Isma''il ibn Kathir al-Dimashqi',
    774,
    'SIRAH',
    'Dar Hijr',
    'Cairo',
    'Dr. Abd Allah ibn Abd al-Muhsin al-Turki',
    21,
    'PUBLIC_DOMAIN_CONFIRMED',
    '9ecd7a3307883f8749ce1a823b1ed2ec8fffd07022f9bf4afa2bbddb5276fdee',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SIR-003',
    'الشفا بتعريف حقوق المصطفى',
    'Al-Shifa bi-Ta''rif Huquq al-Mustafa',
    'Qadi Iyad ibn Musa al-Yahsubi',
    544,
    'SHAMAIL',
    'Dar al-Fikr',
    'Beirut',
    'Ali Muhammad al-Bijawi',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    '9ed9291b039d10bd085d7fb229aa94c0f9ea69530b8dabb2ba50b2580e55c869',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-001',
    'إحياء علوم الدين',
    'Ihya ''Ulum al-Din',
    'Hujjat al-Islam Abu Hamid al-Ghazali',
    505,
    'TAZKIYAH',
    'Dar al-Minhaj',
    'Jeddah',
    'Markaz al-Buhuth wa-al-Dirasat bi-Dar al-Minhaj',
    10,
    'PUBLIC_DOMAIN_CONFIRMED',
    '1bb7f8390a6823c71256e0cb7c48f2ebdac44adade026015dae6e32ba62bcebb',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-002',
    'الغنية لطالبي طريق الحق عز وجل',
    'Al-Ghuniyah li-Talibi Tariq al-Haqq',
    'Shaykh Abd al-Qadir al-Jilani',
    561,
    'SPIRITUAL_HERITAGE',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Faraj Tawfiq al-Walid',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    'bbabd9e66d148d64d5ee1aecf75811ad06b692ea5ccb9ea6d5e521e811e827b7',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-003',
    'الرسالة القشيرية في علم التصوف',
    'Al-Risalah al-Qushayriyyah',
    'Imam Abu al-Qasim Abd al-Karim al-Qushayri',
    465,
    'SPIRITUAL_HERITAGE',
    'Dar al-Minhaj',
    'Jeddah',
    'Anas Muhammad Adnan al-Sharafi',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '159bdac334ed067838f41f7ec4e41c87b23112b0d794f957629c2a7349e5baae',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-004',
    'الحكم العطائية',
    'Al-Hikam al-Ata''iyyah',
    'Ibn Ata Allah al-Iskandari',
    709,
    'TAZKIYAH',
    'Dar al-Basa''ir',
    'Cairo',
    'Dr. Muhammad Sa''id Ramadan al-Buti',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '25af31bc0ffcba96133c263d4c6d16076c96622f3df79b209300bd37427f622f',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SHR-001',
    'فتح الباري بشرح صحيح البخاري',
    'Fath al-Bari Sharh Sahih al-Bukhari',
    'Al-Hafiz Ibn Hajar al-Asqalani',
    852,
    'HADITH',
    'Dar al-Ma''rifah',
    'Beirut',
    'Muhibb al-Din al-Khatib & Muhammad Fu''ad Abd al-Baqi',
    13,
    'PUBLIC_DOMAIN_CONFIRMED',
    '83caa96f0440565c4ceee9920593a6bc7bce3fe77af48bfee2cdb89f718501d5',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SHR-002',
    'المنهاج شرح صحيح مسلم بن الحجاج',
    'Al-Minhaj Sharh Sahih Muslim',
    'Imam Yahya ibn Sharaf al-Nawawi',
    676,
    'HADITH',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Khalil Meis',
    18,
    'PUBLIC_DOMAIN_CONFIRMED',
    'acb5a26e1ba2984573fd4de4c25c2eac9206774f270334d131ef13143b06858a',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SHR-003',
    'مرقاة المفاتيح شرح مشكاة المصابيح',
    'Mirqat al-Mafatih Sharh Mishkat al-Masabih',
    'Mulla Ali ibn Sultan Muhammad al-Qari',
    1014,
    'HADITH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Jamal Aytani',
    11,
    'PUBLIC_DOMAIN_CONFIRMED',
    '5268ff0e9328cd181af5b8817e854237316064196d74775137098ac551d903c5',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SHR-004',
    'شرح معاني الآثار',
    'Sharh Ma''ani al-Athar',
    'Imam Abu Ja''far Ahmad al-Tahawi',
    321,
    'HADITH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Muhammad Zuhri al-Najjar',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    '4e874690a132288a88c362c992d0bc154ae0f414557a5311b565917593c82b68',
    'TIER_B_EARLY_SIRAH'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-005',
    'تفسير الجلالين',
    'Tafsir al-Jalalayn',
    'Jalal al-Din al-Mahalli & Jalal al-Din al-Suyuti',
    911,
    'TAFSIR',
    'Dar Ibn Kathir',
    'Damascus / Beirut',
    'Fakhr al-Din Qabawah',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '7a1998ea11bf18cf0d4a600dbb5e3b1ae52d1d60d7da8ce4bb1e4604eb184d01',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-006',
    'معالم التنزيل في تفسير القرآن (تفسير البغوي)',
    'Ma''alim al-Tanzil (Tafsir al-Baghawi)',
    'Imam Abu Muhammad al-Husayn al-Baghawi',
    516,
    'TAFSIR',
    'Dar Taybah',
    'Riyadh',
    'Muhammad Abd Allah al-Nimr, Uthman Jum''ah Damiriyyah, Sulayman Muslim al-Harash',
    8,
    'PUBLIC_DOMAIN_CONFIRMED',
    'eebb8b3aee779650fdcc8a14a03ac04e75815788a5bd4a9b42184aea4bc23a3c',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-007',
    'مفاتيح الغيب (التفسير الكبير)',
    'Mafatih al-Ghayb (Al-Tafsir al-Kabir)',
    'Imam Fakhr al-Din al-Razi',
    606,
    'TAFSIR',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Lajnah min al-Ulama',
    32,
    'PUBLIC_DOMAIN_CONFIRMED',
    '3eefd014eba6665659ca2e64015d410251fa9534608e4d8d21a4193098c399e2',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAF-008',
    'روح المعاني في تفسير القرآن العظيم والسبع المثاني',
    'Ruh al-Ma''ani',
    'Allama Shihab al-Din Mahmud al-Alusi',
    1270,
    'TAFSIR',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Ali Abd al-Bari Atiyyah',
    30,
    'PUBLIC_DOMAIN_CONFIRMED',
    '21d36b900be42fc050bb3deacc64672b51b24d55971c9a04a873d43ca0b1f267',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HAN-004',
    'بدائع الصنائع في ترتيب الشرائع',
    'Bada''i al-Sana''i fi Tartib al-Shara''i',
    'Imam Ala al-Din Abu Bakr al-Kasani (Malik al-Ulama)',
    587,
    'HANAFI_FIQH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Ali Muhammad Mu''awwad & Adil Ahmad Abd al-Mawjud',
    10,
    'PUBLIC_DOMAIN_CONFIRMED',
    '06f78828bad09724d7787ebcd8a2b806032215c3424805764e1449a721431da6',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HAN-005',
    'البحر الرائق شرح كنز الدقائق',
    'Al-Bahr al-Ra''iq Sharh Kanz al-Daqaiq',
    'Zayn al-Din Ibn Nujaym al-Misri',
    970,
    'HANAFI_FIQH',
    'Dar al-Kitab al-Islami',
    'Cairo',
    'Zakariyya Umayrat',
    8,
    'PUBLIC_DOMAIN_CONFIRMED',
    'e8d670ad94e4f3e1490ef9a5f7ba18cc82abf4e83662858b5c46b9db151c6b9e',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-MAL-004',
    'بداية المجتهد ونهاية المقتصد',
    'Bidayat al-Mujtahid wa Nihayat al-Muqtasid',
    'Qadi Abu al-Walid Muhammad Ibn Rushd al-Qurtubi (al-Hafid)',
    595,
    'MALIKI_FIQH',
    'Dar al-Hadith',
    'Cairo',
    'Muhammad Subhi Hasan Hallaq',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    'd819fc303043070a4c101b9d4b5b1d6c017aaf913cb35b212987204fa1644209',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-MAL-005',
    'التمهيد لما في الموطأ من المعاني والأسانيد',
    'Al-Tamhid lima fi al-Muwatta',
    'Imam Abu Umar Yusuf Ibn Abd al-Barr al-Qurtubi',
    463,
    'MALIKI_FIQH',
    'Wizarat al-Awqaf wa-al-Shu''un al-Islamiyyah al-Maghribiyyah',
    'Rabat',
    'Mustafa b. Ahmad al-Alawi & Muhammad Abd al-Kabir al-Bakri',
    24,
    'PUBLIC_DOMAIN_CONFIRMED',
    '5d809ccb8fcd9a5bba97a45ff1f41a1c99effe2e2a3623292b0bba1e7d554d95',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-SHA-003',
    'المجموع شرح المهذب',
    'Al-Majmu'' Sharh al-Muhadhdhab',
    'Imam Yahya ibn Sharaf al-Nawawi',
    676,
    'SHAFII_FIQH',
    'Dar al-Fikr',
    'Beirut',
    'Muhammad Najib al-Muti''i',
    20,
    'PUBLIC_DOMAIN_CONFIRMED',
    '48df2e4976193f0172667be352838a2a075e78fff39253c5932d925d80b75d89',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-FIQ-HNB-003',
    'كشاف القناع عن متن الإقناع',
    'Kashshaf al-Qina'' ''an Matn al-Iqna''',
    'Mansur ibn Yunus al-Bahuti al-Hanbali',
    1051,
    'HANBALI_FIQH',
    'Dar Alam al-Kutub',
    'Riyadh',
    'Hilal Musaylihi Mustafa Hilal',
    6,
    'PUBLIC_DOMAIN_CONFIRMED',
    'cb7d49b2308a8f471f50ad2644a2c1187168bcb8748f19a8c880cfc2fa0c4ad7',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SIR-004',
    'الروض الأنف في شرح السيرة النبوية لابن هشام',
    'Al-Rawd al-Unuf fi Sharh al-Sirah',
    'Al-Imam Abu al-Qasim Abd al-Rahman al-Suhayli',
    581,
    'SIRAH',
    'Dar Ihya al-Turath al-Arabi',
    'Beirut',
    'Umar Abd al-Salam al-Tadmuri',
    7,
    'PUBLIC_DOMAIN_CONFIRMED',
    '4e0b4705c6e8aa9300a023d1f05c5a4202904ae9a3802b47bbf03fecc45d1581',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SIR-005',
    'دلائل النبوة ومعرفة أحوال صاحب الشريعة',
    'Dala''il al-Nubuwwah',
    'Imam Abu Bakr Ahmad ibn al-Husayn al-Bayhaqi',
    458,
    'SIRAH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Dr. Abd al-Mu''ti Qal''aji',
    7,
    'PUBLIC_DOMAIN_CONFIRMED',
    '919ce31fff53d7e4f3773cde9a7554492d6d2e9c91c9286f101d028394a49f89',
    'TIER_B_EARLY_SIRAH'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-SIR-006',
    'المواهب اللدنية بالمنح المحمدية',
    'Al-Mawahib al-Ladunniyyah',
    'Imam Ahmad ibn Muhammad al-Qastallani',
    923,
    'SHAMAIL',
    'Al-Maktabah al-Tawfiqiyyah',
    'Cairo',
    'Salih Ahmad al-Shami',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    '7f775bbc62853648fbc2f8c85438ee94952a39ecc1ba954dd87068e4c7a0b58d',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-005',
    'فتوح الغيب',
    'Futuh al-Ghayb',
    'Sayyiduna Shaykh Abd al-Qadir al-Jilani',
    561,
    'SPIRITUAL_HERITAGE',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Faraj Tawfiq al-Walid',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '704be99f5d0a6e9702aedc1790d88734c07692de6b67cf28f48c8ce1b4aa1457',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-006',
    'قوت القلوب في معاملة المحبوب ووصف طريق المريد إلى مقام التوحيد',
    'Qut al-Qulub',
    'Abu Talib Muhammad ibn Ali al-Makki',
    386,
    'TAZKIYAH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Mahmud Ibrahim Muhammad al-Radwani',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    '8dbc936febedd7f1b13e91282058951ed3aefe32f66d51602a0961f04bdbf3aa',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-007',
    'عوارف المعارف',
    'Awarif al-Ma''arif',
    'Shaykh Shahab al-Din Abu Hafs Umar al-Suhrawardi',
    632,
    'SPIRITUAL_HERITAGE',
    'Dar al-Kitab al-Arabi',
    'Beirut',
    'Abd al-Halim Mahmud & Mahmud b. al-Sharif',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'd1799586454a583fbd92c3e33abd85acf3caa0d6fcf28ff6261352c7befbb9af',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-008',
    'حلية الأولياء وطبقات الأصفياء',
    'Hilyat al-Awliya wa-Tabaqat al-Asfiya',
    'Al-Hafiz Abu Nu''aym Ahmad ibn Abd Allah al-Isfahani',
    430,
    'SPIRITUAL_HERITAGE',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Mustafa Abd al-Qadir Ata',
    10,
    'PUBLIC_DOMAIN_CONFIRMED',
    '48a7333de00ea5f524485b4681469e4670990d1d2ae8fee587a8d23dca4a6f9e',
    'TIER_B_EARLY_SIRAH'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-TAZ-009',
    'المثنوي المعنوي',
    'Masnavi Ma''navi',
    'Mawlana Jalal al-Din Muhammad al-Rumi',
    672,
    'SPIRITUAL_HERITAGE',
    'Dar al-Sharq al-Arabi',
    'Beirut',
    'Dr. Ibrahim al-Desouqi Shita',
    6,
    'PUBLIC_DOMAIN_CONFIRMED',
    'bb09c3eb77e1755fc587081b615d12d753f908083bff03b41fccd8bfe68150a8',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-MST-001',
    'مقدمة ابن الصلاح (معرفة أنواع علم الحديث)',
    'Muqaddimat Ibn al-Salah (Ma''rifat Anwa'' Ilm al-Hadith)',
    'Imam Abu Amr Uthman ibn al-Salah',
    643,
    'MUSTALAH_AL_HADITH',
    'Dar al-Fikr al-Mu''asir',
    'Damascus',
    'Dr. Nur al-Din Itr',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '470880db30180d3d85a679aa37c67f45d589ece27f671fd9fabb1080f1615c9c',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-MST-002',
    'نزهة النظر في توضيح نخبة الفكر في مصطلح أهل الأثر',
    'Nuzhat al-Nazar fi Tawdih Nukhbat al-Fikar',
    'Al-Hafiz Ibn Hajar al-Asqalani',
    852,
    'MUSTALAH_AL_HADITH',
    'Matba''at Safir / Dar Ibn Hazm',
    'Riyadh',
    'Dr. Nur al-Din Itr',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'c58daa183f288506c851ffcfbe320d323c3a5fa7b2a5cb14fcac817ef1e3a564',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-MST-003',
    'تدريب الراوي في شرح تقريب النواوي',
    'Tadrib al-Rawi fi Sharh Taqrib al-Nawawi',
    'Al-Hafiz Jalal al-Din al-Suyuti',
    911,
    'MUSTALAH_AL_HADITH',
    'Dar al-Asimah',
    'Riyadh',
    'Tariq ibn Awadullah & Muhammad Abd al-Hadi',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    '9b72208b47eabd39c3a0e6ff84ec11f7b039139e2d8320143fd2c3d94e0a05c5',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-USL-001',
    'الرسالة',
    'Al-Risalah',
    'Imam Muhammad ibn Idris al-Shafi''i',
    204,
    'USUL_AL_FIQH',
    'Maktabah al-Halabi',
    'Cairo',
    'Shaykh Ahmad Muhammad Shakir',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'ca01ba1c6777abeab747b3352365c08129c749c04f67b0cbc7b075a7651d52af',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-USL-002',
    'المستصفى من علم الأصول',
    'Al-Mustasfa min Ilm al-Usul',
    'Hujjat al-Islam Abu Hamid al-Ghazali',
    505,
    'USUL_AL_FIQH',
    'Mu''assasah al-Risalah',
    'Beirut',
    'Dr. Muhammad Sulayman al-Ashqar',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    'cc784565677e1380169510b07aec078f659813136da10c71884548bcc86796c5',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-USL-003',
    'البرهان في أصول الفقه',
    'Al-Burhan fi Usul al-Fiqh',
    'Imam al-Haramayn Abu al-Ma''ali al-Juwayni',
    478,
    'USUL_AL_FIQH',
    'Dar al-Wafa',
    'Cairo',
    'Dr. Abd al-Azim al-Dib',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    '49fdd3d835b636817b98bc6c7354f4f1c3a50ffe327bc19bc38d8a8ec567e9ba',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-USL-004',
    'الموافقات في أصول الشريعة',
    'Al-Muwafaqat fi Usul al-Shari''ah',
    'Imam Abu Ishaq Ibrahim al-Shatibi',
    790,
    'USUL_AL_FIQH',
    'Dar al-Kutub al-Ilmiyyah',
    'Cairo / Beirut',
    'Al-Shaykh Dr. Muhammad Abd Allah Draz',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    '887f14ecb150e48cbe6f20d4fef699b7c12e9c605375503294212485442e02b6',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-QWD-001',
    'الأشباه والنظائر على مذهب أبي حنيفة النعمان',
    'Al-Ashbah wa al-Naza''ir (Hanafi)',
    'Zayn al-Din ibn Ibrahim Ibn Nujaym al-Hanafi',
    970,
    'HANAFI_FIQH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Muhammad Muti'' al-Hafiz',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '411c38f8103071c0276ff9e758e00e2bac785d72035be3fdc1a96861399f210b',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-QWD-002',
    'الأشباه والنظائر في قواعد وفروع فقه الشافعية',
    'Al-Ashbah wa al-Naza''ir (Shafi''i)',
    'Jalal al-Din al-Suyuti',
    911,
    'SHAFII_FIQH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Muhammad Hasan Ismail',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '6be66576f9315f621103856e41228b5567e7fdf37d3e591094423ec247a0ebb2',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-QWD-003',
    'قواعد الأحكام في مصالح الأنام',
    'Qawa''id al-Ahkam fi Masalih al-Anam',
    'Al-Izz ibn Abd al-Salam (Sultan al-Ulama)',
    660,
    'USUL_AL_FIQH',
    'Dar al-Ma''arif',
    'Beirut',
    'Taha Abd al-Ra''uf Sa''d',
    2,
    'PUBLIC_DOMAIN_CONFIRMED',
    '0595c281ab7ed50d9deadf390bf8101997f1ff4ab056b60db8e1f81d7679e5e0',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-AQD-001',
    'العقيدة الطحاوية (بيان عقيدة أهل السنة والجماعة)',
    'Al-Aqidah al-Tahawiyyah',
    'Imam Abu Ja''far Ahmad ibn Muhammad al-Tahawi',
    321,
    'AQEEDAH',
    'Dar Ibn Hazm',
    'Beirut',
    'Dr. Abd al-Rahim al-Qashqari',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '3bf27cd392e807ffac8f2c4e5017a65c18ca2afa64beff8db6c592c4d9830dd3',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-AQD-002',
    'الفقه الأكبر',
    'Al-Fiqh al-Akbar',
    'Imam Abu Hanifah al-Nu''man ibn Thabit',
    150,
    'AQEEDAH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Marwan Muhammad al-Sha''ar',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    '3e88c6cb1d2d8e4be687c9b8c667459a8b31b2d6663d0bac0e191434b62d49b1',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-AQD-003',
    'الإبانة عن أصول الديانة',
    'Al-Ibanah an Usul al-Diyanah',
    'Imam Abu al-Hasan Ali ibn Isma''il al-Ash''ari',
    324,
    'AQEEDAH',
    'Dar al-Kitab al-Arabi',
    'Cairo',
    'Dr. Fawqiyyah Husayn Mahmud',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'fd66e9a2fe0f49dabb686042a7d4830c7f64eecea89b89e67619b093f983ff0d',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-AQD-004',
    'كتاب التوحيد',
    'Kitab al-Tawhid',
    'Imam Abu Mansur Muhammad ibn Muhammad al-Maturidi',
    333,
    'AQEEDAH',
    'Dar al-Sadir / Al-Maktabah al-Islamiyyah',
    'Beirut',
    'Dr. Fathalla Kholeif',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'c311ba2adc524ad0d9fb87ff3d1c232aa390514b7f71245ce8d1356669b96951',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-AQD-005',
    'جوهرة التوحيد',
    'Jawharat al-Tawhid',
    'Imam Burhan al-Din Ibrahim al-Laqani',
    1041,
    'AQEEDAH',
    'Dar al-Basa''ir',
    'Cairo',
    'Dr. Ali Jum''ah',
    1,
    'PUBLIC_DOMAIN_CONFIRMED',
    'f6bbe134c0c79647646a939c0ba179eefbeaa2b75f5941aa935b20d298ced281',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-008',
    'سنن الدارمي (المسند الجامع)',
    'Sunan al-Darimi',
    'Imam Abu Muhammad Abd Allah al-Darimi',
    255,
    'HADITH',
    'Dar al-Mughni',
    'Riyadh',
    'Husayn Salim Asad al-Darani',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    '8ac05213e289d8ede5355d34d190e78ac8ae8af313a8b67c590a0593198928c0',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-009',
    'السنن الكبرى',
    'Al-Sunan al-Kubra',
    'Al-Hafiz Abu Bakr Ahmad ibn al-Husayn al-Bayhaqi',
    458,
    'HADITH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Muhammad Abd al-Qadir Ata',
    10,
    'PUBLIC_DOMAIN_CONFIRMED',
    'a81a05aaa2585edd0e3c314eb8e44bff5d9be4b8dcec1831e4be71f9d172e255',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-010',
    'صحيح ابن خزيمة',
    'Sahih Ibn Khuzaymah',
    'Imam Muhammad ibn Ishaq ibn Khuzaymah',
    311,
    'HADITH',
    'Al-Maktab al-Islami',
    'Beirut',
    'Dr. Muhammad Mustafa al-A''zami',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    'd6d8a321ad83c89b6f42ed91ee84958176c2b89410e47c7e9e7d2c4aaca15b3f',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-011',
    'الإحسان في تقريب صحيح ابن حبان',
    'Sahih Ibn Hibban (Al-Ihsan)',
    'Imam Abu Hatim Muhammad ibn Hibban al-Busti',
    354,
    'HADITH',
    'Mu''assasah al-Risalah',
    'Beirut',
    'Shu''ayb al-Arna''ut',
    18,
    'PUBLIC_DOMAIN_CONFIRMED',
    '2f0a39bffa4f8c14640d894f12bdcc2f9d350ce246f045457e934b4c431d296d',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HAD-012',
    'المستدرك على الصحيحين',
    'Al-Mustadrak ala al-Sahihayn',
    'Al-Hakim Abu Abd Allah Muhammad al-Naysaburi',
    405,
    'HADITH',
    'Dar al-Kutub al-Ilmiyyah',
    'Beirut',
    'Mustafa Abd al-Qadir Ata',
    4,
    'PUBLIC_DOMAIN_CONFIRMED',
    'eb3d0c0d93f82a164f50225ffce13cae71cf01a0157021328170075513813892',
    'TIER_A_PRIMARY_REVELATION'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HIS-001',
    'البداية والنهاية',
    'Al-Bidayah wa al-Nihayah',
    'Al-Hafiz Imad al-Din Ismail Ibn Kathir',
    774,
    'ISLAMIC_HISTORY',
    'Dar Hajar / Dar Alam al-Kutub',
    'Cairo',
    'Dr. Abdullah ibn Abd al-Muhsin al-Turki',
    21,
    'PUBLIC_DOMAIN_CONFIRMED',
    '36678963f7faaa854d6939e48d8d0077bac339933a5ac5af24d7f227d6aa14d7',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HIS-002',
    'سير أعلام النبلاء',
    'Siyar A''lam al-Nubala',
    'Al-Hafiz Shams al-Din Muhammad al-Dhahabi',
    748,
    'ISLAMIC_HISTORY',
    'Mu''assasah al-Risalah',
    'Beirut',
    'Shu''ayb al-Arna''ut et al.',
    25,
    'PUBLIC_DOMAIN_CONFIRMED',
    'd3ea407c8befcbec5bd24499e2739d98f1a460b49a0d014477b98387e70e0ce8',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO canonical_master_corpus (
    work_id, title_arabic, title_transliterated, author_name, author_death_hijri,
    discipline, edition_publisher, publication_city, critical_editor_muhaqqiq,
    volume_count, rights_status, provenance_sha256, scholarly_authority_level
) VALUES (
    'CANON-HIS-003',
    'طبقات الشافعية الكبرى',
    'Tabaqat al-Shafi''iyyah al-Kubra',
    'Taj al-Din Abd al-Wahhab ibn Ali al-Subki',
    771,
    'ISLAMIC_HISTORY',
    'Dar Ihya al-Kutub al-Arabiyyah',
    'Cairo',
    'Dr. Mahmud Muhammad al-Tanahi & Dr. Abd al-Fattah al-Hilw',
    10,
    'PUBLIC_DOMAIN_CONFIRMED',
    '2f3309fb3c1d685fc8999cb0457a323d1f8de4e5c6ba23b9579ec2984b16c6c1',
    'TIER_C_LATER_CLASSICAL'
) ON CONFLICT (work_id) DO UPDATE SET
    title_arabic = EXCLUDED.title_arabic,
    title_transliterated = EXCLUDED.title_transliterated,
    author_name = EXCLUDED.author_name,
    author_death_hijri = EXCLUDED.author_death_hijri,
    discipline = EXCLUDED.discipline,
    edition_publisher = EXCLUDED.edition_publisher,
    publication_city = EXCLUDED.publication_city,
    critical_editor_muhaqqiq = EXCLUDED.critical_editor_muhaqqiq,
    volume_count = EXCLUDED.volume_count,
    provenance_sha256 = EXCLUDED.provenance_sha256,
    updated_at = CURRENT_TIMESTAMP;

