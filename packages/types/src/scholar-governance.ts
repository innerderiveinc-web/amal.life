/**
 * AMAL OS — SCHOLAR OS + KNOWLEDGE GOVERNANCE PLATFORM TYPES
 * Institutional Trust Layer, Scholarly Authority, Case Routing & Knowledge Release Control
 */

// =========================================================================
// SECTION 3 & 4: SCHOLAR IDENTITY & GRANULAR EXPERTISE
// =========================================================================

export type ScholarVerificationState =
  | 'UNVERIFIED'
  | 'DOCUMENT_PENDING'
  | 'IDENTITY_VERIFIED'
  | 'CREDENTIALS_VERIFIED'
  | 'INSTITUTION_VERIFIED'
  | 'SCHOLAR_REVIEWED'
  | 'SUSPENDED'
  | 'REVOKED';

export type ScholarExpertiseDomain =
  | 'QURAN'
  | 'TAFSIR'
  | 'HADITH'
  | 'HADITH_METHODOLOGY'
  | 'HANAFI_FIQH'
  | 'MALIKI_FIQH'
  | 'SHAFII_FIQH'
  | 'HANBALI_FIQH'
  | 'AQEEDAH'
  | 'SEERAH'
  | 'TASAWWUF'
  | 'FAMILY'
  | 'MARRIAGE'
  | 'FINANCE'
  | 'ZAKAT'
  | 'HAJJ'
  | 'UMRAH'
  | 'RAMADAN'
  | 'YOUTH'
  | 'NEW_MUSLIMS'
  | 'ISLAMIC_EDUCATION'
  | 'CONTEMPORARY_ISSUES';

export interface ScholarCredentialRecord {
  id: string;
  degreeOrIjazah: string;
  institutionName: string;
  fieldOfStudy: string;
  yearGranted: number;
  issuingScholarOrDean?: string;
  verificationDocumentUrl?: string;
  isVerified: boolean;
}

export interface ScholarAffiliation {
  id: string;
  institutionName: string;
  role: string;
  country: string;
  verified: boolean;
}

export interface ScholarIdentity {
  scholar_id: string;
  display_name: string;
  legal_name_encrypted: string;
  languages: string[];
  expertise_domains: ScholarExpertiseDomain[];
  madhhab: 'HANAFI' | 'MALIKI' | 'SHAFII' | 'HANBALI' | 'COMPARATIVE_SUNNI';
  aqeedah_tradition: 'ASHARI' | 'MATURIDI' | 'ATHARI' | 'MAINSTREAM_SUNNI';
  spiritual_tradition?: string;
  regional_training: string[];
  institutions: string[];
  credentials: ScholarCredentialRecord[];
  years_of_experience: number;
  verification_status: ScholarVerificationState;
  availability: {
    acceptingCases: boolean;
    maxActiveCases: number;
    currentActiveCases: number;
    workingHoursTimezone: string;
  };
  consultation_enabled: boolean;
  knowledge_review_enabled: boolean;
  quality_metrics: {
    averageResponseTimeHours: number;
    caseCompletionRate: number;
    reviewAccuracyScore: number;
    citationQualityScore: number;
    correctionRate: number;
    appealRate: number;
  };
  created_at: string;
  updated_at: string;
}

// =========================================================================
// SECTION 5 & 6: SCHOLAR CASE ROUTING & CASE MANAGEMENT
// =========================================================================

export type ScholarCaseLifecycleStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'TRIAGED'
  | 'ROUTED'
  | 'ACCEPTED'
  | 'IN_REVIEW'
  | 'CLARIFICATION_REQUIRED'
  | 'ANSWER_DRAFTED'
  | 'SECOND_REVIEW'
  | 'APPROVED'
  | 'DELIVERED'
  | 'FOLLOW_UP'
  | 'CLOSED'
  | 'APPEALED'
  | 'ESCALATED';

export type ScholarCaseRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ScholarCaseRecord {
  case_id: string;
  user_id: string;
  question: string;
  sanitized_context: string; // Minimized context (Section 6)
  language: string;
  selected_madhhab: 'HANAFI' | 'MALIKI' | 'SHAFII' | 'HANBALI' | 'COMPARATIVE';
  selected_tradition?: string;
  risk_level: ScholarCaseRiskLevel;
  domain: ScholarExpertiseDomain;
  required_expertise: ScholarExpertiseDomain[];
  assigned_scholar_id?: string;
  secondary_scholar_id?: string; // Section 8: Multi-Scholar Review
  status: ScholarCaseLifecycleStatus;
  response?: ScholarResponseModel;
  multi_scholar_outcome?: MultiScholarReviewOutcome;
  appeal_reason?: string;
  escalation_reason?: string;
  created_at: string;
  updated_at: string;
}

// =========================================================================
// SECTION 7: SCHOLAR RESPONSE MODEL (Structured Sections)
// =========================================================================

export interface ScholarResponseModel {
  case_id: string;
  scholar_id: string;
  summary: string;
  direct_source_evidence: {
    source_id: string;
    passage_id: string;
    citation: string;
    text: string;
  }[];
  scholarly_interpretation: string;
  fiqh_position: string;
  conditions: string[];
  explanation: string;
  practical_guidance: string[];
  alternatives: string[];
  uncertainty: string;
  sources: {
    work_title: string;
    author: string;
    edition: string;
    volume?: number;
    page?: number;
    reference_id: string;
  }[];
  reviewed_at: string;
}

// =========================================================================
// SECTION 8 & 9: MULTI-SCHOLAR REVIEW & DISAGREEMENT ENGINE
// =========================================================================

export type MultiScholarReviewOutcome =
  | 'AGREEMENT'
  | 'QUALIFIED_AGREEMENT'
  | 'RECOGNIZED_DISAGREEMENT'
  | 'INSUFFICIENT_EVIDENCE'
  | 'ESCALATE';

export type DisagreementRelationshipType =
  | 'supported_by'
  | 'qualified_by'
  | 'restricted_by'
  | 'contrasted_with'
  | 'preferred_by';

export interface DisagreementPositionRecord {
  position_id: string;
  scholar_id: string;
  scholar_name: string;
  madhhab: 'HANAFI' | 'MALIKI' | 'SHAFII' | 'HANBALI';
  position_text: string;
  primary_evidence_refs: string[];
  conditions: string[];
  counter_evidence?: string[];
  historical_context: string;
  contemporary_application: string;
  relationship_type: DisagreementRelationshipType;
}

export interface DisagreementIssueRecord {
  issue_id: string;
  topic: string;
  canonical_question: string;
  positions: DisagreementPositionRecord[];
  is_recognized_ikhtilaf: boolean;
  guidance_for_seekers: string;
  created_at: string;
  updated_at: string;
}

// =========================================================================
// SECTION 13 & 14: SOURCE REGISTRY & IMMUTABLE SOURCE ARTIFACTS
// =========================================================================

export type SourceRegistryStatus =
  | 'DISCOVERED'
  | 'ACQUIRED'
  | 'PROVENANCE_PENDING'
  | 'LICENSE_PENDING'
  | 'EXTRACTION_PENDING'
  | 'EDITORIAL_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'SUSPENDED'
  | 'RETIRED'
  | 'QUARANTINED';

export interface SourceRegistryEntry {
  source_id: string;
  title: string;
  author: string;
  original_language: string;
  source_type: 'PRIMARY_REVELATION' | 'HADITH_COLLECTION' | 'TAFSIR' | 'FIQH_MANUAL' | 'USUL' | 'SEERAH' | 'TASAWWUF';
  tradition: string;
  madhhab?: 'HANAFI' | 'MALIKI' | 'SHAFII' | 'HANBALI';
  publication_year?: number;
  publisher: string;
  edition: string;
  isbn?: string;
  artifact_hash: string; // SHA-256 (Section 14)
  artifact_format: 'PDF' | 'SCAN' | 'EPUB' | 'XML' | 'TEXT';
  license: string;
  provenance_chain: string[];
  verification_status: SourceRegistryStatus;
  editorial_status: 'PENDING' | 'VERIFIED';
  scholarly_status: 'PENDING' | 'APPROVED' | 'DISPUTED';
  publication_status: 'UNPUBLISHED' | 'STAGED' | 'PUBLISHED';
  created_at: string;
  updated_at: string;
}

// =========================================================================
// SECTION 15, 16 & 17: TRANSLATION, TAFSIR & HADITH GOVERNANCE
// =========================================================================

export interface TranslationGovernanceRecord {
  translation_id: string;
  surah_number: number;
  ayah_number: number;
  language: string;
  translator_name: string;
  work_title: string;
  edition: string;
  publisher: string;
  license: string;
  translated_text: string;
  verification_status: 'VERIFIED' | 'UNVERIFIED' | 'REJECTED';
  is_machine_translation: boolean; // Must be false for authoritative publication
}

export interface TafsirGovernanceRecord {
  tafsir_id: string;
  surah_number: number;
  ayah_number: number;
  tafsir_work_title: string;
  author: string;
  methodology: string;
  edition: string;
  passage_text: string;
  scholarly_review_status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface HadithGovernanceRecord {
  hadith_id: string;
  collection_name: string;
  book_title: string;
  chapter_title: string;
  hadith_number: number;
  arabic_text: string;
  narration_chain: string[];
  grading: 'SAHIH' | 'HASAN' | 'DAIF' | 'MAWDU' | 'DISPUTED';
  grader_name: string;
  grading_methodology: string;
  reference_citation: string;
  scholarly_review_status: 'APPROVED' | 'PENDING';
}

// =========================================================================
// SECTION 18 & 19: CLAIM LEDGER & CLAIM AUDITOR
// =========================================================================

export type ScholarClaimSupportLevel =
  | 'DIRECT'
  | 'STRONG_INFERENCE'
  | 'INTERPRETIVE'
  | 'CONTESTED'
  | 'UNSUPPORTED';

export interface ScholarClaimLedgerRecord {
  claim_id: string;
  claim_text: string;
  claim_type: 'THEOLOGICAL' | 'JURIDICAL' | 'HISTORICAL' | 'SPIRITUAL' | 'PROCEDURAL';
  source_ids: string[];
  passage_ids: string[];
  support_level: ScholarClaimSupportLevel;
  verification_status: 'VERIFIED' | 'UNVERIFIED' | 'REJECTED';
  madhhab_scope?: 'HANAFI' | 'MALIKI' | 'SHAFII' | 'HANBALI' | 'UNIVERSAL';
  tradition_scope?: string;
  conditions: string[];
  review_status: 'APPROVED' | 'PENDING' | 'DISPUTED';
  reviewers: string[];
  version: number;
  created_at: string;
}

export interface ClaimAuditResult {
  passed: boolean;
  claims_extracted: number;
  verified_claims: number;
  unsupported_claims: number;
  hard_blocks_triggered: string[];
  audit_timestamp: string;
}

// =========================================================================
// SECTION 20 & 21: KNOWLEDGE RELEASE SYSTEM & BLUE/GREEN DEPLOYMENT
// =========================================================================

export type KnowledgeReleaseStatus =
  | 'DRAFT'
  | 'VALIDATION'
  | 'SCHOLAR_REVIEW'
  | 'BENCHMARK'
  | 'APPROVED'
  | 'STAGED'
  | 'PUBLISHED'
  | 'ROLLED_BACK';

export interface ScholarKnowledgeReleaseRecord {
  release_id: string;
  slot: 'CURRENT' | 'NEXT'; // Section 21 Blue/Green
  included_sources: string[];
  included_claims: string[];
  included_positions: string[];
  included_translations: string[];
  included_tafsir: string[];
  reviewer_signoffs: string[];
  benchmark_results: Record<string, number>;
  known_issues: string[];
  release_notes: string;
  index_version: string;
  publication_status: KnowledgeReleaseStatus;
  published_at?: string;
  rolled_back_at?: string;
}

// =========================================================================
// SECTION 22: KNOWLEDGE BENCHMARK METRICS
// =========================================================================

export interface KnowledgeBenchmarkMetrics {
  citation_precision: number;
  citation_recall: number;
  unsupported_claim_rate: number;
  madhhab_attribution_accuracy: number;
  source_attribution_accuracy: number;
  translation_accuracy: number;
  tafsir_separation_accuracy: number;
  disagreement_preservation: number;
  scholar_escalation_precision: number;
}

// =========================================================================
// SECTION 25 & 26: SCHOLAR CONTRIBUTIONS, APPEALS & VERSIONING
// =========================================================================

export interface ScholarContributionRecord {
  id: string;
  scholar_id: string;
  contribution_type: 'SOURCE_ANNOTATION' | 'EXPLANATION' | 'CORRECTION' | 'POSITION_MAPPING' | 'TERMINOLOGY';
  content: string;
  source_id?: string;
  version: number;
  review_status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  license: string;
  created_at: string;
}

export type ScholarAppealReason =
  | 'INCORRECT_CITATION'
  | 'WRONG_ATTRIBUTION'
  | 'MISSING_CONTEXT'
  | 'WRONG_TRANSLATION'
  | 'WRONG_MADHHAB'
  | 'OUTDATED_INFORMATION'
  | 'SCHOLARLY_DISPUTE'
  | 'SOURCE_PROBLEM';

export interface ScholarAppealRecord {
  id: string;
  case_or_claim_id: string;
  reporter_id: string;
  reason: ScholarAppealReason;
  evidence_provided: string;
  status: 'REPORTED' | 'TRIAGED' | 'UNDER_SCHOLAR_REVIEW' | 'DECIDED' | 'ACTIONED';
  decision_notes?: string;
  created_at: string;
}

export interface KnowledgeVersionRecord {
  version_id: string;
  entity_type: 'SOURCE' | 'CLAIM' | 'POSITION' | 'RELEASE';
  entity_id: string;
  previous_version: number;
  new_version: number;
  change_reason: string;
  changed_by: string;
  reviewed_by: string;
  effective_at: string;
  release_id: string;
}

// =========================================================================
// SECTION 36: GLOBAL EMERGENCY KILL SWITCHES
// =========================================================================

export interface ScholarEmergencyControls {
  AI_ANSWERING_DISABLED: boolean;
  ISLAMIC_AI_DISABLED: boolean;
  SCHOLAR_CASES_DISABLED: boolean;
  KNOWLEDGE_PUBLICATION_DISABLED: boolean;
  SOURCE_INGESTION_DISABLED: boolean;
  TRANSLATION_PUBLICATION_DISABLED: boolean;
  COMMUNITY_QUESTIONS_DISABLED: boolean;
}

// =========================================================================
// SECTION 40: DOMAIN EVENT MODEL
// =========================================================================

export type ScholarGovernanceEventType =
  | 'scholar.verified'
  | 'scholar.suspended'
  | 'case.created'
  | 'case.assigned'
  | 'case.accepted'
  | 'case.responded'
  | 'case.escalated'
  | 'case.appealed'
  | 'review.created'
  | 'review.completed'
  | 'source.approved'
  | 'source.quarantined'
  | 'claim.approved'
  | 'claim.rejected'
  | 'dispute.created'
  | 'dispute.resolved'
  | 'knowledge.release.created'
  | 'knowledge.release.approved'
  | 'knowledge.release.published'
  | 'knowledge.release.rolled_back';

export interface ScholarDomainEvent {
  event_id: string;
  event_type: ScholarGovernanceEventType;
  entity_id: string;
  actor_id: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

// =========================================================================
// SECTION 42: FINAL TRUST TEST (Traceable Provenance Chain)
// =========================================================================

export interface ProvenanceTraceNode {
  step: 'CLAIM' | 'PASSAGE' | 'WORK' | 'AUTHOR' | 'EDITION' | 'SOURCE_ARTIFACT' | 'PROVENANCE' | 'REVIEW' | 'SCHOLAR_VALIDATION' | 'KNOWLEDGE_RELEASE' | 'PRODUCTION';
  identifier: string;
  details: string;
  verified: boolean;
  hashOrSignature?: string;
}

export interface FinalTrustProvenanceChain {
  claim_id: string;
  claim_text: string;
  chain: ProvenanceTraceNode[];
  is_chain_unbroken: boolean;
  certified_by_scholar_id?: string;
  release_id?: string;
}
