/**
 * AMAL OS — Universal Multilingual Islamic Knowledge Engine Types
 * 
 * Implements the 55-Section Master Build & Governance Specification:
 * - Epistemic Domains & Firewall
 * - First-Class Language Model & Priority Matrices (India + Global)
 * - Canonical Quran Master Model & Immutable Edition Control
 * - Translation Model & Non-Quranic Attribution Rules
 * - Independent Tafsir Model & Methodologies
 * - Four-Madhhab Legal Tracks & Ahl-e-Sunnat / Razvi Preferred Corpus
 * - Canonical Concept Mapping & Cross-Language Retrieval
 * - Strict AI Response Contract & Automated Claim Auditor
 * - Knowledge Releases & Release Manifest Snapshots
 */

import { SunniSchool } from './madhhab-neutrality.js';

export type UniversalEpistemicDomain =
  | 'ISLAMIC_PRIMARY_SOURCE'
  | 'ISLAMIC_SECONDARY_SOURCE'
  | 'TRANSLATION'
  | 'TAFSIR'
  | 'HADITH'
  | 'FIQH'
  | 'SCHOLARLY_POSITION'
  | 'SCHOLARLY_DISAGREEMENT'
  | 'SPIRITUAL_TRADITION'
  | 'GENERAL_KNOWLEDGE'
  | 'BEHAVIORAL_SCIENCE'
  | 'USER_PREFERENCE'
  | 'AI_INFERENCE'
  | 'USER_CREATED_CONTENT';

export type TextDirection = 'RTL' | 'LTR' | 'BIDI';

export interface LanguageRecord {
  id: string;
  code: string;
  iso_639_1: string;
  iso_639_3: string;
  name: string;
  native_name: string;
  script: string;
  direction: TextDirection;
  region: string;
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'DEPRECATED';
  is_india_priority: boolean;
  is_global_priority: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuranSurahMaster {
  surah_number: number;
  name_arabic: string;
  name_english: string;
  name_transliteration: string;
  revelation_type: 'MECCAN' | 'MEDINAN';
  total_ayahs: number;
  juz_start: number;
}

export interface QuranAyahMaster {
  canonical_key: string; // e.g. "1:1", "2:255"
  surah_number: number;
  ayah_number: number;
  global_ayah_number: number; // 1 to 6236
  text_arabic_uthmani: string;
  page_number: number;
  juz_number: number;
  sajdah: boolean;
}

export interface QuranEditionRecord {
  edition_id: string;
  edition_name: string;
  script_style: 'UTHMANI' | 'INDO_PAK' | 'STANDARDIZED_DIGITAL' | 'WORD_BY_WORD';
  text_standard: string;
  artifact_id: string;
  verification_status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  review_status: 'TWO_SCHOLAR_APPROVED' | 'EDITORIAL_APPROVED' | 'UNDER_REVIEW';
  version: string;
  hash: string;
  reviewer_ids: string[];
  approved_at: string;
}

export interface TranslationWorkRecord {
  id: string;
  title: string;
  language: string;
  translator: string;
  tradition_context: string; // e.g. "Ahl-e-Sunnat / Razvi", "Classical Sunni", "Academic"
  methodology: 'LITERAL' | 'MEANING_ORIENTED' | 'EXPLANATORY';
  publisher: string;
  publication_year: number;
  original_or_translation: 'TRANSLATION';
  status: 'APPROVED' | 'REVIEW_PENDING' | 'QUARANTINED';
}

export interface TranslationEditionRecord {
  id: string;
  work_id: string;
  edition: string;
  publisher: string;
  year: number;
  source_artifact_id: string;
  license_id: string;
  checksum: string;
  verification_status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  scholarly_review_status: 'APPROVED' | 'PENDING';
  publication_status: 'PUBLISHED' | 'RESEARCH_ONLY' | 'SUSPENDED';
}

export interface TranslationPassageRecord {
  id: string;
  edition_id: string;
  ayah_canonical_key: string;
  text: string;
  page_reference?: number;
  paragraph_reference?: number;
  alignment_confidence: number; // 1.0 = verified
  verification_status: 'VERIFIED' | 'UNVERIFIED';
}

export interface TafsirWorkRecord {
  id: string;
  title: string;
  author: string;
  language: string;
  school_or_tradition: string; // e.g. "Hanafi", "Ahl-e-Sunnat / Razvi", "Shafi'i", "Ash'ari"
  madhhab?: SunniSchool;
  methodology: 'ATHARI' | 'FIQHI' | 'KALAMI' | 'ISHARI_SUFI' | 'LUGAWI' | 'CONTEMPORARY';
  era: string;
  publisher: string;
  edition: string;
  license: string;
  source_artifact_id: string;
  verification_status: 'VERIFIED' | 'PENDING';
  scholarly_review_status: 'APPROVED' | 'PENDING';
}

export interface MasterTafsirPassageRecord {
  id: string;
  work_id: string;
  ayah_canonical_key: string;
  text: string;
  author_id: string;
  methodology: string;
  page_reference?: string;
  verification_status: 'VERIFIED' | 'PENDING';
}

export interface CanonicalConceptMapping {
  concept_id: string;
  canonical_name_arabic: string;
  canonical_name_english: string;
  language_variants: Record<string, string[]>; // e.g. { "ur": ["نماز", "صلوۃ"], "hi": ["नमाज़", "सलाह"] }
  aliases: string[];
  transliterations: string[];
  script_variants: string[];
  related_ayah_keys: string[];
  related_hadith_refs: string[];
}

export interface MasterAIResponseContract {
  language: string;
  intent: 'QURAN_EXPLANATION' | 'FIQH_QUESTION' | 'HADITH_INQUIRY' | 'PRACTICAL_GUIDANCE' | 'COMPARATIVE_FIQH';
  answer: string;
  primary_evidence: Array<{
    source_type: UniversalEpistemicDomain;
    canonical_ref: string;
    arabic_text?: string;
    verified_citation: string;
  }>;
  translations: Array<{
    language: string;
    translator: string;
    work_title: string;
    text: string;
    is_authoritative: boolean;
  }>;
  tafsir: Array<{
    language: string;
    author: string;
    work_title: string;
    tradition: string;
    commentary_summary: string;
  }>;
  scholarly_positions: Array<{
    madhhab: SunniSchool | string;
    scholar: string;
    ruling: string;
    evidence: string[];
    conditions: string[];
    is_preferred: boolean;
  }>;
  user_preference_applied: boolean;
  disagreement_present: boolean;
  confidence: 'VERIFIED' | 'PROVISIONAL' | 'SCHOLAR_REQUIRED';
  citation_status: 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';
  scholar_required: boolean;
  epistemic_audit_trail: string;
}

export interface ClaimAuditorResult {
  passed: boolean;
  total_claims: number;
  verified_claims: number;
  unsupported_claims: number;
  citations_valid: boolean;
  hadith_authentic: boolean;
  madhhab_accurate: boolean;
  hard_blocks_triggered: string[];
  audit_timestamp: string;
}

export interface MasterKnowledgeReleaseRecord {
  release_tag: string; // e.g. "AMAL-RELEASE-2026.10.01"
  published_at: string;
  quran_corpus_version: string;
  urdu_translations_version: string;
  hindi_translations_version: string;
  english_translations_version: string;
  tafsir_corpus_version: string;
  four_madhhab_corpus_version: string;
  merkle_root_hash: string;
  total_sources: number;
  total_passages: number;
  total_claims: number;
  status: 'ACTIVE_PRODUCTION' | 'SUPERSEDED' | 'REVOKED';
}

export interface MultilingualEvidenceQuery {
  query_text: string;
  input_language?: string;
  target_answer_language?: string;
  madhhab_preference?: SunniSchool | 'GENERAL_SUNNI';
  scholarly_tradition_preference?: string;
  preferred_translator?: string;
  preferred_tafsir?: string;
  enable_comparative_fiqh?: boolean;
}
