-- ============================================================================
-- AMAL OS V1 — LAYER 8: PRODUCTION ISLAMIC KNOWLEDGE INFRASTRUCTURE (MIGRATION 005)
-- ============================================================================
-- Complete schema covering:
-- Knowledge Sources, Acquisitions, Versions (SHA-256 Content & File Hashes),
-- Quran (Canonical & Translations with Text Hash Immutability), Tafsir,
-- Hadith Collections, Books, Chapters, Entries & Gradings (Grading Metadata),
-- Fiqh Knowledge Graph (Madhhabs, Issues, Positions, Position Evidence),
-- Evidence Nodes & Edges, Evidence Claims & Claim Evidence,
-- Content Reviews (Two-Person Review Support), Content Disputes & Quarantine.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ----------------------------------------------------------------------------
-- 1. SOURCE REGISTRY & LICENSE GOVERNANCE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS knowledge_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(60) NOT NULL,
    canonical_title TEXT NOT NULL,
    author_name TEXT,
    publisher TEXT,
    language VARCHAR(20),
    original_language VARCHAR(20),
    source_url TEXT,
    edition TEXT,
    publication_year INTEGER,
    license_status VARCHAR(30) NOT NULL,
    authority_metadata JSONB,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 2. ACQUISITIONS & SHA-256 PROVENANCE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS source_acquisitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    acquisition_method VARCHAR(50),
    acquired_from TEXT,
    acquired_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    file_hash CHAR(64),
    content_hash CHAR(64),
    importer_version VARCHAR(50),
    raw_storage_key TEXT,
    status VARCHAR(30) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 3. SOURCE VERSIONING (Non-destructive, Immutable Knowledge History)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS knowledge_source_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    edition TEXT,
    content_hash CHAR(64) NOT NULL,
    parser_version VARCHAR(50),
    normalization_version VARCHAR(50),
    review_status VARCHAR(30) NOT NULL,
    supersedes_version_id UUID,
    approved_by UUID,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(source_id, version_number)
);

-- ----------------------------------------------------------------------------
-- 4. QURAN CANONICAL KNOWLEDGE MODEL (Immutability Guaranteed)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quran_surahs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number INTEGER UNIQUE NOT NULL,
    name_ar TEXT NOT NULL,
    name_transliteration TEXT,
    name_translation TEXT,
    revelation_type VARCHAR(30),
    ayah_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS quran_ayahs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    surah_id UUID NOT NULL REFERENCES quran_surahs(id) ON DELETE CASCADE,
    number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    text_hash CHAR(64) NOT NULL,
    UNIQUE(surah_id, number)
);

CREATE TABLE IF NOT EXISTS quran_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ayah_id UUID NOT NULL REFERENCES quran_ayahs(id) ON DELETE CASCADE,
    translator TEXT NOT NULL,
    publisher TEXT,
    language VARCHAR(20) NOT NULL,
    translated_text TEXT NOT NULL,
    license_status VARCHAR(30) NOT NULL,
    version VARCHAR(50),
    review_status VARCHAR(30) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 5. TAFSIR WORKS & PASSAGES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tafsir_works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    methodology TEXT,
    language VARCHAR(20),
    license_status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS tafsir_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_id UUID NOT NULL REFERENCES tafsir_works(id) ON DELETE CASCADE,
    ayah_id UUID REFERENCES quran_ayahs(id) ON DELETE CASCADE,
    reference TEXT,
    text TEXT NOT NULL,
    source_version_id UUID REFERENCES knowledge_source_versions(id) ON DELETE SET NULL,
    review_status VARCHAR(30) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 6. HADITH HIERARCHY & DETAILED GRADINGS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hadith_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    compiler TEXT,
    language VARCHAR(20),
    license_status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS hadith_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID NOT NULL REFERENCES hadith_collections(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sequence INTEGER
);

CREATE TABLE IF NOT EXISTS hadith_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES hadith_books(id) ON DELETE CASCADE,
    title TEXT,
    sequence INTEGER
);

CREATE TABLE IF NOT EXISTS hadith_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES hadith_chapters(id) ON DELETE SET NULL,
    reference TEXT NOT NULL,
    arabic_text TEXT,
    translated_text TEXT,
    metadata JSONB,
    review_status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS hadith_gradings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hadith_id UUID NOT NULL REFERENCES hadith_entries(id) ON DELETE CASCADE,
    grader TEXT,
    grading TEXT NOT NULL,
    methodology TEXT,
    reference TEXT,
    source_version_id UUID REFERENCES knowledge_source_versions(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 7. FIQH KNOWLEDGE GRAPH (Madhhabs, Issues, Positions, Position Evidence)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS madhhabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS scholarly_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    question TEXT NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS scholarly_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_id UUID NOT NULL REFERENCES scholarly_issues(id) ON DELETE CASCADE,
    madhhab_id UUID REFERENCES madhhabs(id) ON DELETE SET NULL,
    scholar_id UUID,
    position_text TEXT NOT NULL,
    conditions JSONB,
    exceptions JSONB,
    review_status VARCHAR(30) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 8. EVIDENCE GRAPH (Nodes, Edges, Position Evidence)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS evidence_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_type VARCHAR(60) NOT NULL,
    entity_id UUID,
    label TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evidence_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node_id UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    target_node_id UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    edge_type VARCHAR(60) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS position_evidence (
    position_id UUID NOT NULL REFERENCES scholarly_positions(id) ON DELETE CASCADE,
    evidence_node_id UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    evidence_role VARCHAR(50) NOT NULL,
    PRIMARY KEY(position_id, evidence_node_id)
);

-- ----------------------------------------------------------------------------
-- 9. CLAIM GRAPH (Claims & Claim Evidence)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS evidence_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_text TEXT NOT NULL,
    claim_type VARCHAR(50) NOT NULL,
    support_level VARCHAR(40) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claim_evidence (
    claim_id UUID NOT NULL REFERENCES evidence_claims(id) ON DELETE CASCADE,
    evidence_node_id UUID NOT NULL REFERENCES evidence_nodes(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    PRIMARY KEY(claim_id, evidence_node_id)
);

-- ----------------------------------------------------------------------------
-- 10. REVIEWS & DISPUTE SYSTEM (Two-Person Rule & Quarantine)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_version_id UUID REFERENCES knowledge_source_versions(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL,
    reviewer_role VARCHAR(40) NOT NULL,
    decision VARCHAR(30) NOT NULL,
    comments TEXT,
    policy_version VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL,
    dispute_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    raised_by UUID,
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    resolution TEXT,
    resolved_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ
);
