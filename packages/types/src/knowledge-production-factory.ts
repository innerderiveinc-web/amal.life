/**
 * AMAL OS — KNOWLEDGE PRODUCTION FACTORY TYPES
 * Master Data Contracts for the Industrial-Grade End-to-End Islamic Knowledge System
 * Covering Sections 1 - 123 of the Master Specification.
 */

import type { SunniSchool } from './madhhab-neutrality.js';

// =========================================================================
// SECTION 3: SOURCE UNIVERSE
// =========================================================================
export type SourceUniverseCategory =
  | 'QURAN'
  | 'QURAN_TRANSLATION'
  | 'TAFSIR'
  | 'HADITH'
  | 'HADITH_COMMENTARY'
  | 'FIQH'
  | 'AQEEDAH'
  | 'SEERAH'
  | 'ISLAMIC_HISTORY'
  | 'AKHLAQ'
  | 'ADAB'
  | 'TAZKIYAH'
  | 'TASAWBUF'
  | 'MALFUZAT'
  | 'MAKTUBAT'
  | 'TAZKIRAH'
  | 'SPIRITUAL_BIOGRAPHY'
  | 'SILSILA_RECORD'
  | 'ISLAMIC_EDUCATION'
  | 'DUA'
  | 'ADHKAR'
  | 'CONTEMPORARY_SCHOLARSHIP'
  | 'FATWA_COLLECTION'
  | 'ACADEMIC_RESEARCH'
  | 'REFERENCE_WORK';

// =========================================================================
// SECTION 4: SOURCE ACQUISITION REGISTRY
// =========================================================================
export type AcquisitionMethod =
  | 'PUBLIC_DOMAIN'
  | 'LICENSED'
  | 'PUBLISHER_PERMISSION'
  | 'INSTITUTIONAL_ACCESS'
  | 'AUTHOR_PERMISSION'
  | 'USER_SUBMITTED'
  | 'ARCHIVAL_ACCESS'
  | 'RESEARCH_REFERENCE';

export interface AcquisitionRecord {
  acquisition_id: string;
  source_candidate_id: string;
  requested_by: string;
  acquisition_method: AcquisitionMethod;
  source_url?: string;
  repository: string;
  provider: string;
  acquisition_date: string;
  artifact_type: string; // PDF, SCAN, EPUB, XML, JSON, etc.
  license_status: LicenseState;
  permission_reference?: string;
  country_of_origin: string;
  checksum: string; // SHA-256
  status: 'PENDING' | 'ACQUIRED' | 'BLOCKED' | 'FAILED';
}

// =========================================================================
// SECTION 5: COPYRIGHT & LICENSE GATE
// =========================================================================
export type LicenseState =
  | 'PUBLIC_DOMAIN'
  | 'OPEN_LICENSE'
  | 'COMMERCIAL_LICENSE'
  | 'DIRECT_PERMISSION'
  | 'RESEARCH_ONLY'
  | 'LICENSE_UNKNOWN'
  | 'RESTRICTED';

export type UsageRightPermission =
  | 'FULL_TEXT_ALLOWED'
  | 'EXCERPT_ONLY'
  | 'METADATA_ONLY'
  | 'INTERNAL_REFERENCE';

export interface LicenseGateResult {
  license_status: LicenseState;
  allowed_usage: UsageRightPermission;
  is_approved_for_production: boolean;
  notes?: string;
}

// =========================================================================
// SECTION 6, 7 & 8: CANDIDATE QUEUE, PRIORITIZATION & ACQUISITION WAVES
// =========================================================================
export type CandidateQueueState =
  | 'NEW'
  | 'TRIAGED'
  | 'DUPLICATE'
  | 'ACQUISITION_APPROVED'
  | 'ACQUISITION_BLOCKED'
  | 'ACQUIRED'
  | 'REJECTED';

export type AcquisitionWaveType =
  | 'WAVE_A_FOUNDATIONAL'
  | 'WAVE_B_FOUR_MADHHABS'
  | 'WAVE_C_SPIRITUAL_HERITAGE'
  | 'WAVE_D_MULTILINGUAL'
  | 'WAVE_E_CONTEMPORARY';

export interface AcquisitionPriorityScore {
  scholarly_importance: number; // 1 - 10
  user_demand: number; // 1 - 10
  coverage_gap: number; // 1 - 10
  source_availability: number; // 1 - 10
  verification_feasibility: number; // 1 - 10
  legal_availability: number; // 1 - 10
  historical_importance: number; // 1 - 10
  composite_priority: number; // calculated product / normalized
}

export interface SourceCandidateQueueItem {
  candidate_id: string;
  title: string;
  author: string;
  source_type: SourceUniverseCategory;
  language: string;
  tradition?: string;
  historical_period: string;
  wave: AcquisitionWaveType;
  priority_score: AcquisitionPriorityScore;
  state: CandidateQueueState;
  created_at: string;
}

// =========================================================================
// SECTION 9, 10 & 11: ORIGINAL ARTIFACT PRESERVATION & CHAIN OF CUSTODY
// =========================================================================
export type ArtifactDerivativeType =
  | 'ORIGINAL'
  | 'PRESERVATION'
  | 'EXTRACTION'
  | 'OCR'
  | 'NORMALIZED'
  | 'STRUCTURED';

export interface ArtifactDerivative {
  derivative_id: string;
  derived_from_artifact_id: string;
  derivative_type: ArtifactDerivativeType;
  processor: string;
  processor_version: string;
  timestamp: string;
  configuration: Record<string, any>;
  checksum: string; // SHA-256
  storage_location: string;
  size_bytes: number;
}

export interface ArtifactChainOfCustody {
  original_artifact_id: string;
  sha256: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
  acquired_at: string;
  storage_location: string;
  derivatives: ArtifactDerivative[];
}

// =========================================================================
// SECTION 12, 13 & 14: DOCUMENT IDENTITY & AUTHORSHIP ATTRIBUTION
// =========================================================================
export interface DocumentIdentityRecord {
  identity_id: string;
  title: string;
  author: string;
  attributed_author?: string;
  editor?: string;
  publisher: string;
  edition: string;
  year?: number;
  year_hijri?: number;
  language: string;
  volume?: number;
  isbn?: string;
  catalogue_reference?: string;
  is_duplicate: boolean;
  duplicate_of_id?: string;
}

export type AuthorshipRelationshipType =
  | 'AUTHORED_BY'
  | 'ATTRIBUTED_TO'
  | 'EDITED_BY'
  | 'COMPILED_BY'
  | 'TRANSLATED_BY'
  | 'COMMENTED_BY'
  | 'REPORTED_BY';

export type FactoryAttributionStatus =
  | 'AUTHENTICATED'
  | 'STRONGLY_SUPPORTED'
  | 'PROBABLE'
  | 'TRADITIONALLY_ATTRIBUTED'
  | 'UNCERTAIN'
  | 'DISPUTED'
  | 'MISATTRIBUTED'
  | 'REJECTED'
  | 'UNKNOWN';

export interface AuthorshipAttributionRecord {
  record_id: string;
  work_title: string;
  person_name: string;
  person_id?: string;
  relationship: AuthorshipRelationshipType;
  status: FactoryAttributionStatus;
  scholarly_evidence: string;
  review_date: string;
}

// =========================================================================
// SECTION 15 - 18: OCR ENGINE, CONFIDENCE & PAGE-TEXT ALIGNMENT
// =========================================================================
export interface OcrAnomalyFlags {
  low_confidence: boolean;
  ambiguous_glyph: boolean;
  missing_character: boolean;
  diacritic_ambiguity: boolean;
  page_corruption: boolean;
  column_order_uncertainty: boolean;
  footnote_confusion: boolean;
  header_footer_contamination: boolean;
}

export interface PageTextAlignment {
  page_number: number;
  bounding_box?: { x: number; y: number; width: number; height: number };
  line_range: string; // e.g. "lines 1-34"
  source_artifact_id: string;
  image_reference_url?: string;
}

export interface OcrProcessingJob {
  job_id: string;
  artifact_id: string;
  language: string;
  detected_script: string;
  overall_confidence: number; // 0.0 - 1.0
  page_alignments: PageTextAlignment[];
  anomalies_detected: OcrAnomalyFlags;
  requires_human_qa: boolean;
  corrected_text?: string;
  version: number;
}

// =========================================================================
// SECTION 19 - 23: SAFE NORMALIZATION & STRUCTURE PARSER
// =========================================================================
export interface SafeNormalizationResult {
  original_text: string;
  normalized_text: string;
  unicode_form: 'NFC' | 'NFD';
  meaning_altered: boolean; // must be FALSE for safe normalization
  quranic_orthography_preserved: boolean;
}

export type DocumentNodeType =
  | 'TITLE'
  | 'CHAPTER'
  | 'SECTION'
  | 'SUBSECTION'
  | 'INTRODUCTION'
  | 'FOOTNOTE'
  | 'COMMENTARY'
  | 'QUOTE'
  | 'POEM'
  | 'LETTER'
  | 'MALFUZ'
  | 'REFERENCE'
  | 'APPENDIX'
  | 'INDEX';

export interface DocumentStructureNode {
  node_id: string;
  node_type: DocumentNodeType;
  title?: string;
  volume_number?: number;
  chapter_number?: number;
  parent_node_id?: string;
  page_start: number;
  page_end: number;
  content_passages: string[]; // passage IDs
}

export interface PassageSegment {
  passage_id: string; // permanent immutable UUID
  work_id: string;
  edition_id: string;
  volume_number: number;
  chapter_number?: number;
  section_number?: number;
  page_number: number;
  original_text: string;
  normalized_text: string;
  text_sha256: string;
  detected_quotation_types: string[];
}

// =========================================================================
// SECTION 24 - 28: REFERENCE EXTRACTION & CROSS-SOURCE CITATION ENGINE
// =========================================================================
export type CitationVerificationStatus =
  | 'EXACT_MATCH'
  | 'PARTIAL_MATCH'
  | 'PARAPHRASE'
  | 'REFERENTIAL_MATCH'
  | 'WRONG_REFERENCE'
  | 'UNRESOLVED';

export interface QuranReferenceResolution {
  surah: number;
  ayah_start: number;
  ayah_end?: number;
  canonical_surah_name: string;
  is_valid: boolean;
}

export interface HadithReferenceResolution {
  collection_name: string; // e.g. "Sahih al-Bukhari"
  book_number?: number;
  chapter_number?: number;
  hadith_number?: string;
  edition_identifier?: string;
  is_edition_specific: boolean;
  resolution_status: 'RESOLVED' | 'UNRESOLVED' | 'AMBIGUOUS';
}

export interface CrossSourceCitation {
  citation_id: string;
  citing_passage_id: string;
  cited_work_id: string;
  cited_edition_id?: string;
  cited_passage_id?: string;
  citation_raw_text: string;
  verification_status: CitationVerificationStatus;
  resolution_method: 'DETERMINISTIC_EXACT' | 'FUZZY_CONFIRMED' | 'SCHOLAR_MANUAL' | 'UNRESOLVED';
}

// =========================================================================
// SECTION 34 - 36: FOUR-MADHHAB CLASSIFICATION & ISSUE MATRIX
// =========================================================================
export interface SchoolPositionDetail {
  school: SunniSchool;
  position_statement: string;
  primary_evidence: string;
  conditions: string[];
  exceptions: string[];
  recognized_scholars: string[];
  source_passages: string[];
}

export interface FourMadhhabIssueMatrix {
  issue_id: string;
  issue_title: string;
  category: string;
  hanafi_position?: SchoolPositionDetail;
  maliki_position?: SchoolPositionDetail;
  shafii_position?: SchoolPositionDetail;
  hanbali_position?: SchoolPositionDetail;
  missing_schools: SunniSchool[];
  historical_context: string;
}

// =========================================================================
// SECTION 43 - 45: CLAIM EXTRACTION ENGINE & EVIDENCE CLASSIFICATION
// =========================================================================
export type FactoryClaimType =
  | 'THEOLOGICAL'
  | 'FIQH'
  | 'HISTORICAL'
  | 'BIOGRAPHICAL'
  | 'SPIRITUAL'
  | 'ETHICAL'
  | 'PRACTICAL'
  | 'MEDICAL'
  | 'SUPERNATURAL_REPORT'
  | 'DEVOTIONAL'
  | 'AUTHORIAL';

export type FactoryEvidenceClassification =
  | 'DIRECT'
  | 'STRONG_INFERENCE'
  | 'INTERPRETIVE'
  | 'CONTESTED'
  | 'UNSUPPORTED';

export interface ExtractedClaimItem {
  claim_id: string;
  claim_text: string;
  claim_type: FactoryClaimType;
  source_passage_id: string;
  author_id: string;
  work_id: string;
  edition_id: string;
  madhhab?: SunniSchool;
  tradition?: string;
  silsila?: string;
  support_level: FactoryEvidenceClassification;
  historical_status: string;
  scholarly_status: 'APPROVED' | 'CAVEATED' | 'DISPUTED' | 'PENDING';
  verification_status: 'VERIFIED' | 'UNVERIFIED';
  version: number;
}

// =========================================================================
// SECTION 46 - 48: TRANSLATION FACTORY & ALIGNMENT
// =========================================================================
export type TranslationVerificationState =
  | 'AI_DRAFT'
  | 'EDITOR_REVIEWED'
  | 'SCHOLAR_REVIEWED'
  | 'PUBLISHED';

export interface TranslationAlignmentRecord {
  alignment_id: string;
  original_passage_id: string;
  translated_text: string;
  target_language: string;
  translator_name: string;
  edition_id: string;
  alignment_status: 'ONE_TO_ONE' | 'MANY_TO_ONE' | 'PARAPHRASTIC_ALIGNED' | 'UNALIGNED';
  verification_state: TranslationVerificationState;
  license_state: LicenseState;
}

// =========================================================================
// SECTION 51 - 55: HUMAN REVIEW QUEUE, ROLES & DISPUTE ENGINE
// =========================================================================
export type RiskRoutingLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type ReviewSpecialistRole =
  | 'CONTENT_CURATOR'
  | 'TEXT_SPECIALIST'
  | 'EDITORIAL_REVIEWER'
  | 'ARABIC_PERSIAN_URDU_SPECIALIST'
  | 'TRANSLATION_REVIEWER'
  | 'HADITH_SPECIALIST'
  | 'FIQH_SCHOLAR'
  | 'TAFSIR_SCHOLAR'
  | 'TASAWWUF_SPECIALIST'
  | 'ISLAMIC_HISTORIAN'
  | 'SENIOR_SCHOLAR';

export type DisputeResolutionType =
  | 'CONSENSUS'
  | 'QUALIFIED_CONSENSUS'
  | 'RECOGNIZED_DISAGREEMENT'
  | 'INSUFFICIENT_EVIDENCE'
  | 'UNRESOLVED';

export interface DisputeRecord {
  dispute_id: string;
  issue: string;
  claim_id: string;
  position_a: string;
  position_b: string;
  supporting_evidence_a: string[];
  supporting_evidence_b: string[];
  reviewers: string[];
  resolution?: string;
  resolution_type: DisputeResolutionType;
  resolved_at?: string;
}

export interface ScholarReviewSignature {
  review_id: string;
  reviewer_id: string;
  role: ReviewSpecialistRole;
  scope: string;
  decision: 'APPROVED' | 'REJECTED' | 'CONDITIONAL_CAVEAT' | 'DISPUTED';
  comments: string;
  evidence_citations: string[];
  timestamp: string;
  knowledge_version: string;
}

// =========================================================================
// SECTION 56: KNOWLEDGE QUARANTINE
// =========================================================================
export type QuarantineTriggerReason =
  | 'UNKNOWN_ATTRIBUTION'
  | 'BROKEN_CITATION'
  | 'OCR_CORRUPTION'
  | 'LICENSE_ISSUE'
  | 'ENTITY_AMBIGUITY'
  | 'TRANSLATION_MISMATCH'
  | 'SCHOLARLY_DISPUTE'
  | 'SECURITY_CONCERN'
  | 'METADATA_CORRUPTION'
  | 'CITATION_POISONING';

export interface QuarantineRecord {
  quarantine_id: string;
  entity_type: 'SOURCE' | 'PASSAGE' | 'CLAIM' | 'TRANSLATION' | 'EDITION';
  entity_id: string;
  trigger_reason: QuarantineTriggerReason;
  quarantined_by: string;
  quarantined_at: string;
  notes: string;
  resolved: boolean;
}

// =========================================================================
// SECTION 65 - 68: WORKFLOW STATES & KNOWLEDGE RELEASE BUILDER
// =========================================================================
export type FactoryWorkflowState =
  | 'DISCOVERED'
  | 'ACQUISITION_PENDING'
  | 'ACQUIRED'
  | 'PRESERVED'
  | 'EXTRACTED'
  | 'OCR_COMPLETE'
  | 'NORMALIZED'
  | 'STRUCTURED'
  | 'ENRICHED'
  | 'EDITORIAL_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'DISPUTED'
  | 'APPROVED'
  | 'RELEASE_READY'
  | 'PUBLISHED'
  | 'SUSPENDED'
  | 'RETIRED'
  | 'QUARANTINED';

export interface ReleaseGateChecklist {
  license_gate: boolean;
  provenance_gate: boolean;
  structure_gate: boolean;
  reference_gate: boolean;
  review_gate: boolean;
  scholar_gate: boolean;
  safety_gate: boolean;
  benchmark_gate: boolean;
  security_gate: boolean;
  all_passed: boolean;
}

export interface FactoryKnowledgeReleaseRecord {
  release_id: string;
  version: string;
  created_by: string;
  approved_by: string[];
  sources_count: number;
  claims_count: number;
  passages_count: number;
  gate_checklist: ReleaseGateChecklist;
  benchmark_results: Record<string, number>;
  known_limitations: string[];
  release_notes: string;
  is_active_current: boolean;
  previous_release_id?: string;
  created_at: string;
  published_at?: string;
}

// =========================================================================
// SECTION 73: EVIDENCE PACK FOR AI ANSWERS
// =========================================================================
export interface FactoryEvidencePack {
  question: string;
  intent: string;
  claims: ExtractedClaimItem[];
  source_passages: PassageSegment[];
  citations: CrossSourceCitation[];
  authority_metadata: {
    work_title: string;
    author: string;
    edition: string;
    attribution_status: FactoryAttributionStatus;
  }[];
  madhhab_metadata: SunniSchool[];
  tradition_metadata: string[];
  translation_metadata: TranslationAlignmentRecord[];
  disagreements: DisputeRecord[];
  safety_metadata: { passed: boolean; warnings: string[] };
}

// =========================================================================
// SECTION 81: KNOWLEDGE QUALITY SCORECARD
// =========================================================================
export interface FactoryKnowledgeQualityScorecard {
  provenance_status: 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';
  artifact_integrity: 'HASH_VERIFIED' | 'TAMPERED' | 'MISSING';
  identity_quality: 'CONFIRMED' | 'AMBIGUOUS' | 'FAILED';
  attribution_status: FactoryAttributionStatus;
  text_quality: 'CLEAN' | 'ACCEPTABLE' | 'NEEDS_PROOFREADING' | 'CORRUPTED';
  reference_quality: 'FULLY_RESOLVED' | 'PARTIALLY_RESOLVED' | 'UNRESOLVED';
  translation_quality: 'CERTIFIED' | 'REVIEWED' | 'AI_DRAFT' | 'UNAVAILABLE';
  scholarly_review: 'DOUBLE_REVIEWED' | 'SINGLE_REVIEWED' | 'PENDING' | 'DISPUTED';
  license_status: LicenseState;
  publication_status: 'PRODUCTION_ELIGIBLE' | 'RESEARCH_ONLY' | 'QUARANTINED';
}

// =========================================================================
// SECTION 89 - 94: SECURITY & CORPUS ISOLATION
// =========================================================================
export type CorpusIsolationType = 'RESEARCH_CORPUS' | 'PRODUCTION_CORPUS';

export interface DocumentPromptInjectionScan {
  passed: boolean;
  malicious_payload_detected: boolean;
  suspicious_patterns_found: string[];
  sanitized: boolean;
}

// =========================================================================
// SECTION 120 & 121: DEFINITION OF DONE & FINAL TRUST CONTRACT
// =========================================================================
export interface KnowledgeFactoryAudit10QuestionResponse {
  where_did_it_come_from: string; // Source work
  which_version: string; // Edition
  which_passage: string; // Exact passage reference & locator
  who_is_it_attributed_to: string; // Author or speaker
  how_certain_is_attribution: FactoryAttributionStatus;
  what_tradition_or_madhhab: string;
  who_reviewed_it: string;
  which_release: string; // Knowledge release ID
  can_it_be_corrected: boolean;
  can_previous_version_be_recovered: boolean;
  is_chain_unbroken: boolean;
}
