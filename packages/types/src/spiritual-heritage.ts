/**
 * AMAL OS — TAZKIYAH, TASAWWUF & SPIRITUAL HERITAGE TYPES
 * Dedicated Epistemic Domain for Islamic Spiritual Literature, Silsilas, Buzurgs, and Practices
 */

// =========================================================================
// SECTION 4: CLASSICAL SPIRITUAL LITERATURE TAXONOMY
// =========================================================================

export type SpiritualWorkType =
  | 'SPIRITUAL_MANUAL'
  | 'TAZKIYAH_WORK'
  | 'IHSAN_WORK'
  | 'AKHLAQ_WORK'
  | 'ADAB_WORK'
  | 'NAFS_WORK'
  | 'HEART_DISEASES_WORK'
  | 'SPIRITUAL_DISCIPLINE_WORK'
  | 'DHIKR_WORK'
  | 'DUA_WORK'
  | 'MUHASABAH_WORK'
  | 'MURAQABAH_WORK'
  | 'SULUK_WORK'
  | 'STATION_AND_STATE_WORK'
  | 'POETRY_AND_HIKAM';

export type AttributionStatus =
  | 'AUTHENTICATED_ATTRIBUTION'
  | 'STRONGLY_SUPPORTED'
  | 'TRADITIONALLY_ATTRIBUTED'
  | 'PROBABLE'
  | 'UNCERTAIN'
  | 'DISPUTED'
  | 'MISATTRIBUTED'
  | 'REJECTED'
  | 'UNKNOWN';

export type SpiritualVerificationBadge =
  | 'SOURCE_VERIFIED'
  | 'ATTRIBUTION_REVIEWED'
  | 'EDITION_VERIFIED'
  | 'TRANSLATION_REVIEWED'
  | 'SCHOLAR_REVIEWED'
  | 'HISTORICAL_ATTRIBUTION_UNCERTAIN'
  | 'DISPUTED_ATTRIBUTION'
  | 'RESEARCH_MATERIAL'
  | 'NOT_VERIFIED_FOR_PRODUCTION';

export interface SpiritualWork {
  work_id: string;
  canonical_title: string;
  original_title: string;
  alternative_titles: string[];
  author_id: string;
  attributed_author_id?: string;
  source_type: SpiritualWorkType;
  original_language: string;
  historical_period: string;
  tradition_context: string;
  silsila_context?: string;
  subject_domains: string[];
  first_known_date?: string;
  license_status: 'PUBLIC_DOMAIN' | 'LICENSED' | 'PERMISSION_REQUIRED' | 'LICENSE_UNKNOWN' | 'RESTRICTED';
  attribution_status: AttributionStatus;
  text_integrity_status: 'INTACT' | 'VARIANT_READINGS_NOTED' | 'FRAGMENTARY' | 'UNVERIFIED';
  scholarly_review_status: 'APPROVED' | 'APPROVED_WITH_CAVEAT' | 'PENDING' | 'DISPUTED' | 'REJECTED';
  publication_status: 'DISCOVERED' | 'ACQUIRED' | 'EDITORIAL_REVIEW' | 'SCHOLAR_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'QUARANTINED';
  created_at: string;
  updated_at: string;
}

export interface SpiritualEdition {
  edition_id: string;
  work_id: string;
  publisher: string;
  publication_year?: number;
  publication_year_ce?: number;
  editor_or_muhaqqiq: string;
  isbn?: string;
  language: string;
  artifact_hash: string; // SHA-256
  critical_apparatus_present: boolean;
  critical_edition?: boolean;
  notes?: string;
}

export interface ManuscriptWitness {
  manuscript_id: string;
  work_id: string;
  repository: string;
  catalogue_reference: string;
  language: string;
  script: string;
  estimated_date: string;
  location: string;
  artifact_hash?: string;
  condition: string;
  completeness: 'COMPLETE' | 'PARTIAL' | 'FRAGMENT';
  scholarly_notes: string;
}

export interface SpiritualPassage {
  passage_id: string;
  edition_id: string;
  work_id: string;
  chapter_name: string;
  page_number?: number;
  original_text: string;
  normalized_text: string;
  canonical_reference: string;
  text_sha256?: string;
}

// =========================================================================
// SECTION 5, 6, 7 & 8: MALFUZAT, MAKTUBAT, TAZKIRAH, KARAMAT
// =========================================================================

export interface MalfuzRecord {
  malfuz_id: string;
  reported_speaker_id?: string;
  master_person_id?: string;
  recorder_id?: string;
  compiler_name?: string;
  collection_title: string;
  original_language?: string;
  source_edition_id?: string;
  passage_text?: string;
  original_text?: string;
  gathering_date?: string;
  gathering_location?: string;
  assembly_theme?: string;
  date_or_period_if_known?: string;
  transmission_chain?: string[];
  attribution_status?: AttributionStatus;
  scholarly_assessment?: string;
  verification_status?: 'VERIFIED_AT_THIS_SOURCE' | 'STRONG_ATTRIBUTION' | 'TRADITIONALLY_ATTRIBUTED' | 'ATTRIBUTION_UNCERTAIN' | 'DISPUTED' | 'NOT_VERIFIABLE' | 'REJECTED_ATTRIBUTION' | 'SOURCE_VERIFIED';
}

export interface MaktubRecord {
  maktub_id: string;
  author_id?: string;
  author_person_id?: string;
  recipient_id?: string;
  recipient_name: string;
  recipient_role?: string;
  collection_title: string;
  letter_number: number;
  primary_theme?: string;
  passage_id?: string;
  historical_notes?: string;
  verification_status?: string;
  manuscript_witness_id?: string;
  edition_id?: string;
  date_context?: string;
  editorial_history?: string;
  letter_content?: string;
  attribution_status?: AttributionStatus;
}

export type TazkirahReportType =
  | 'HISTORICAL_EVENT'
  | 'REPORTED_TRADITION'
  | 'SPIRITUAL_NARRATIVE'
  | 'MIRACLE_REPORT'
  | 'AUTHORIAL_PRAISE'
  | 'UNVERIFIED_ANECDOTE';

export interface TazkirahReport {
  tazkirah_id: string;
  subject_figure_id: string;
  biographical_source_title: string;
  author_name: string;
  edition_id: string;
  report_type: TazkirahReportType;
  narrative_text: string;
  attribution_status: AttributionStatus;
  historical_evaluation: string;
}

export type KaramatReportType =
  | 'KARAMAH_REPORT'
  | 'MIRACLE_NARRATIVE'
  | 'SUPERNATURAL_REPORT'
  | 'DREAM_REPORT'
  | 'KASHF_REPORT'
  | 'SPIRITUAL_EXPERIENCE_REPORT';

export interface KaramatReport {
  karamah_id: string;
  figure_id?: string;
  figure_person_id?: string;
  source_work_title?: string;
  source_tazkirah_id?: string;
  passage_reference?: string;
  report_type?: KaramatReportType;
  narrative_text?: string;
  narrative_summary?: string;
  witness_quality?: string;
  scholarly_evaluations?: any[];
  epistemic_disclaimer: string; // e.g. "Reported in [source]; belongs to devotional hagiographical tradition without independent historical verification."
  scholarly_qualification?: string;
  certainty_level?: 'DEVOTIONAL_TRADITION_ONLY' | 'HISTORICALLY_UNVERIFIED' | 'STRONGLY_DISPUTED';
}

// =========================================================================
// SECTION 9: SPIRITUAL TERMINOLOGY & CONTROLLED ONTOLOGY
// =========================================================================

export interface ScripturalAnchor {
  source_type: 'QURAN' | 'HADITH';
  surah?: number;
  ayah?: number;
  hadith_collection?: string;
  hadith_number?: string;
  text_arabic?: string;
  reference_text: string;
}

export interface SpiritualConcept {
  concept_id: string;
  canonical_name?: string;
  arabic_term: string;
  ontology_type?: 'MAQAM' | 'HAL' | 'ADAB' | 'VIRTUE' | 'DISCIPLINE';
  transliterations: string[];
  language_variants: Record<string, string>; // { ur: 'صبر', hi: 'सब्र', en: 'Patience / Steadfastness' }
  definitions: {
    author_or_school: string;
    definition_text: string;
    source_reference: string;
  }[];
  scriptural_anchors?: ScripturalAnchor[];
  contrasting_conditions?: string[];
  historical_usage: string;
  scholarly_usage: string;
  source_passage_ids: string[];
  related_terms: string[];
  tradition_context: string;
  madhhab_context_if_relevant?: string;
  modern_interpretation: string;
  review_status: 'VERIFIED' | 'UNDER_REVIEW';
}

// =========================================================================
// SECTION 10, 11 & 12: BUZURG REGISTRY & PERSON IDENTITY RESOLUTION
// =========================================================================

export interface BuzurgFigure {
  person_id: string;
  primary_name: string;
  arabic_name: string;
  urdu_name: string;
  aliases: string[];
  kunyah?: string;
  laqab?: string;
  honorifics: string[];
  birth_year?: number;
  death_year?: number;
  date_precision: 'EXACT' | 'APPROXIMATE' | 'CENTURY_LEVEL' | 'UNKNOWN';
  birth_place?: string;
  death_place?: string;
  known_regions: string[];
  languages: string[];
  teachers: string[];
  students: string[];
  associated_silsilas: string[];
  associated_works: string[];
  biographical_sources: string[];
  verification_status: 'AUTHENTICATED' | 'TRADITIONALLY_RECOGNIZED' | 'HISTORICALLY_UNCERTAIN';
  scholarly_notes: string;
}

// =========================================================================
// SECTION 13, 14, 15 & 16: SILSILA REGISTRY & TRANSMISSION GRAPH
// =========================================================================

export interface SilsilaRecord {
  silsila_id: string;
  canonical_name: string;
  arabic_name: string;
  alternate_names: string[];
  tradition_description: string;
  historical_period: string;
  regions: string[];
  foundational_figures: string[];
  branches: string[];
  historical_sources: string[];
  verification_status: 'DOCUMENTED_HISTORICAL_LINEAGE' | 'TRADITIONALLY_TRANSMITTED' | 'DISPUTED_TRANSMISSION';
}

export type SilsilaRelationshipType =
  | 'TEACHER_OF'
  | 'SPIRITUAL_SUCCESSOR_OF'
  | 'AUTHORIZED_BY'
  | 'COMPANION_OF'
  | 'STUDENT_OF'
  | 'ASSOCIATED_WITH'
  | 'BRANCH_FOUNDER'
  | 'TRADITIONALLY_LINKED';

export interface SilsilaTransmissionEdge {
  transmission_id: string;
  silsila_id: string;
  from_person_id: string;
  to_person_id: string;
  relationship_type: SilsilaRelationshipType;
  source_id: string;
  passage_reference: string;
  date_context?: string;
  certainty: 'WELL_DOCUMENTED' | 'TRADITIONALLY_TRANSMITTED' | 'DISPUTED_LINK' | 'UNCERTAIN';
  scholarly_status: string;
}

// =========================================================================
// SECTION 24, 25 & 26: QUOTE VERIFICATION SYSTEM
// =========================================================================

export type QuoteVerificationOutcome =
  | 'VERIFIED_IN_SOURCE'
  | 'FOUND_WITH_VARIANT_WORDING'
  | 'ATTRIBUTED_WITHOUT_PRIMARY_SOURCE'
  | 'SECONDARY_SOURCE_ONLY'
  | 'DISPUTED'
  | 'MISATTRIBUTED'
  | 'UNVERIFIED';

export interface QuoteVerificationResult {
  quote_id: string;
  input_quote: string;
  canonical_text?: string;
  canonical_translation?: string;
  author_id?: string;
  author_name?: string;
  work_id?: string;
  work_title?: string;
  edition_id?: string;
  passage_reference?: string;
  context_surrounding?: {
    previous_passage?: string;
    matched_passage: string;
    following_passage?: string;
    chapter_title?: string;
  };
  outcome: QuoteVerificationOutcome;
  scholarly_notes: string;
  badges: SpiritualVerificationBadge[];
}

// =========================================================================
// SECTION 27, 28, 29 & 30: SPIRITUAL CLAIM LEDGER & AMAL FIREWALL
// =========================================================================

export type SpiritualClaimType =
  | 'THEOLOGICAL_EXPLANATION'
  | 'SPIRITUAL_GUIDANCE'
  | 'ETHICAL_GUIDANCE'
  | 'PRACTICAL_DISCIPLINE'
  | 'BIOGRAPHICAL_CLAIM'
  | 'HISTORICAL_CLAIM'
  | 'MIRACLE_REPORT'
  | 'DREAM_REPORT'
  | 'MALFUZ'
  | 'AUTHORIAL_INTERPRETATION'
  | 'METAPHOR'
  | 'POETIC_LANGUAGE';

export interface SpiritualHeritageClaim {
  claim_id: string;
  claim_text: string;
  source_passage_id: string;
  author_id: string;
  work_id: string;
  edition_id: string;
  tradition: string;
  silsila_id?: string;
  claim_type: SpiritualClaimType;
  support_level: 'DIRECT' | 'STRONG_INFERENCE' | 'INTERPRETIVE' | 'CONTESTED' | 'UNSUPPORTED';
  scholarly_status: 'APPROVED' | 'APPROVED_WITH_CAVEAT' | 'DISPUTED' | 'PENDING';
  publication_status: 'PUBLISHED' | 'RESEARCH_ONLY' | 'QUARANTINED';
  conditions: string[];
  attribution_status?: AttributionStatus;
  reviewer_ids?: string[];
  release_id?: string;
}

export type SpiritualPracticeClassification =
  | 'QURANIC_PRACTICE'
  | 'PROPHETIC_PRACTICE'
  | 'SCHOLARLY_RECOMMENDATION'
  | 'SPIRITUAL_TRADITION_PRACTICE'
  | 'AUTHOR_RECOMMENDATION'
  | 'GENERAL_REFLECTION'
  | 'USER_CREATED_PRACTICE';

export interface SpiritualPracticeRecord {
  practice_id: string;
  name: string;
  description: string;
  classification: SpiritualPracticeClassification;
  source_passages: string[];
  recommended_by: string;
  tradition: string;
  frequency: string;
  conditions: string[];
  safety_warnings: string[];
  safety_status: 'SAFE_FOR_GENERAL_PRACTICE' | 'REQUIRES_QUALIFIED_TEACHER' | 'RESTRICTED_HISTORICAL_ONLY';
  publication_status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

// =========================================================================
// SECTION 31, 32 & 33: SCHOLAR REVIEW MODEL & TWO-REVIEWER RULE
// =========================================================================

export type SpiritualReviewDecision =
  | 'APPROVE'
  | 'APPROVE_WITH_CAVEAT'
  | 'REQUEST_CORRECTION'
  | 'REQUEST_SECOND_REVIEW'
  | 'MARK_DISPUTED'
  | 'MARK_UNVERIFIED'
  | 'REJECT'
  | 'QUARANTINE';

export interface SpiritualScholarReviewRecord {
  review_id: string;
  target_id: string;
  target_type: 'WORK' | 'QUOTE' | 'CLAIM' | 'MALFUZ' | 'KARAMAH' | 'SILSILA';
  primary_reviewer_id: string;
  secondary_reviewer_id?: string;
  primary_decision: SpiritualReviewDecision;
  secondary_decision?: SpiritualReviewDecision;
  two_reviewer_outcome?: 'AGREEMENT' | 'QUALIFIED_AGREEMENT' | 'RECOGNIZED_DISAGREEMENT' | 'ESCALATE';
  annotated_caveats: string[];
  required_disclaimer?: string;
  status: 'PENDING' | 'COMPLETED' | 'ESCALATED';
  reviewed_at: string;
}

// =========================================================================
// SECTION 37 - 41: MULTILINGUAL ARCHITECTURE & ALIGNMENT
// =========================================================================

export interface SpiritualTranslationRecord {
  translation_id: string;
  work_id: string;
  passage_id: string;
  language: string;
  translator_name: string;
  translated_text: string;
  verification_status: 'AI_DRAFT' | 'EDITOR_REVIEWED' | 'SCHOLAR_REVIEWED' | 'PUBLISHED_VERIFIED_TRANSLATION';
  source_alignment: {
    original_work: string;
    original_edition: string;
    original_passage: string;
  };
}

// =========================================================================
// SECTION 46 - 50: AI SAFETY & GUARDRAILS
// =========================================================================

export interface SpiritualAiSafetyResult {
  passed: boolean;
  hard_blocks_triggered: string[];
  suggests_scholar_escalation: boolean;
  required_disclaimers: string[];
}

// =========================================================================
// SECTION 51, 52 & 99: THREE-GRAPH ARCHITECTURE & DEFINITION OF DONE
// =========================================================================

export interface ThreeGraphSeparationCheck {
  graph_1_evidence_graph_clean: boolean; // No unverified sufi texts masquerading as revelation
  graph_2_spiritual_heritage_isolated: boolean; // Dedicated domain with attribution metadata
  graph_3_personal_amal_firewalled: boolean; // No personal logs written into knowledge graph
}

export interface SpiritualHeritageAuditResponse {
  who_said_it: string;
  which_work: string;
  which_edition: string;
  which_passage: string;
  attribution_status: AttributionStatus;
  historical_context: string;
  which_silsila_or_tradition: string;
  what_translation_used: string;
  who_reviewed_it: string;
  which_knowledge_release: string;
  is_verified_unbroken: boolean;
}
