/**
 * AMAL OS — KNOWLEDGE ACQUISITION PROGRAM
 * DOMAIN TYPES & SPECIFICATION CONTRACTS (Sections 0 - 125)
 * 
 * Defines the complete global knowledge supply chain:
 * - Governance Councils & 11 Specialized Teams (Sections 2, 3)
 * - 36-Category Canonical Knowledge Universe (Section 7)
 * - Global Priority Matrix & Auditable 12-Factor Priority Formula (Sections 4, 5, 6)
 * - Four-Madhhab & Spiritual Heritage Dedicated Acquisition Tracks (Sections 8 - 12)
 * - Repository Registry with Item-Level Rights Preservation & OpenITI Sandbox (Sections 14 - 17)
 * - Rights-First Component-Level Rights Matrix & Legal Proof (Sections 18 - 23)
 * - Publisher Partnerships & Donation Program (Sections 24 - 27)
 * - Controlled Batches, Pilot Architecture & 12/24-Month Roadmap (Sections 28 - 32)
 * - Three-Tier Corpus Architecture (Production Verified vs Research vs Candidate) (Section 33)
 * - Source Packet, Bibliographic Research & Multi-Edition Identity Resolution (Sections 37 - 42)
 * - Text Quality Program & Risk-Based Human QA (Sections 43, 44)
 * - South Asian & Regional Multilingual Heritage Initiatives (Sections 48 - 53)
 * - Scholar Network, Calibration, Review Rotation & Conflict of Interest (Sections 54 - 60)
 * - Knowledge Batches, 8-Gate Batch Release Checklist & Cadence (Sections 61 - 64)
 * - Acquisition Economics, Digitization & Disaster Recovery (Sections 65 - 73)
 * - Withdrawal System, Source Correction Queue & Poisoning Defenses (Sections 73 - 77)
 * - Acquisition Automation, Discovery Graph & Duplicate Detection Engine (Sections 78 - 81)
 * - Review Capacity Planning Formula & Corpus Backlog Throttle Rule (Sections 85 - 87)
 * - Maturity Levels 0-7, Representation Tests & Amal / Scholar Source Cards (Sections 88 - 98)
 * - Master Database Domains & Section 101 REST API Contracts (Sections 100, 101)
 * - Definition of Done & Final Knowledge Supply Chain Verification (Sections 121 - 125)
 */

import { SunniSchool } from './madhhab-neutrality.js';

// =========================================================================
// SECTION 2 & 3: GOVERNANCE COUNCIL & 11 SPECIALIZED TEAMS
// =========================================================================

export type CouncilSpecialization =
  | 'ISLAMIC_SCHOLARSHIP'
  | 'QURAN_STUDIES'
  | 'HADITH_STUDIES'
  | 'FIQH'
  | 'TAFSIR'
  | 'AQEEDAH'
  | 'TASAWWUF_TAZKIYAH'
  | 'ISLAMIC_HISTORY'
  | 'ARABIC_PHILOLOGY'
  | 'PERSIAN_LITERATURE'
  | 'URDU_LITERATURE'
  | 'SOUTH_ASIAN_ISLAMIC_STUDIES'
  | 'DIGITAL_HUMANITIES'
  | 'LIBRARY_SCIENCE'
  | 'COPYRIGHT_LICENSING'
  | 'DATA_ENGINEERING'
  | 'AI_SAFETY'
  | 'TRANSLATION_STUDIES';

export interface KnowledgeCouncilMember {
  member_id: string;
  name: string;
  specialization: CouncilSpecialization;
  institution: string;
  tenure_start: string;
  active: boolean;
}

export type AcquisitionTeamCode =
  | 'TEAM_A_ACQUISITION'
  | 'TEAM_B_RIGHTS_LICENSING'
  | 'TEAM_C_DIGITAL_PRESERVATION'
  | 'TEAM_D_TEXT_PROCESSING'
  | 'TEAM_E_BIBLIOGRAPHIC_RESEARCH'
  | 'TEAM_F_KNOWLEDGE_SPECIALISTS'
  | 'TEAM_G_SCHOLARLY_REVIEW'
  | 'TEAM_H_TRANSLATION'
  | 'TEAM_I_KNOWLEDGE_ENGINEERING'
  | 'TEAM_J_QA_BENCHMARKING'
  | 'TEAM_K_RELEASE_ENGINEERING';

export interface AcquisitionTeamDefinition {
  team_code: AcquisitionTeamCode;
  name: string;
  mandate: string;
  lead_officer: string;
  headcount: number;
}

// =========================================================================
// SECTION 7: CANONICAL 36-CATEGORY KNOWLEDGE UNIVERSE
// =========================================================================

export type Canonical36Category =
  | '01_QURAN'
  | '02_QURAN_TRANSLATIONS'
  | '03_TAFSIR'
  | '04_ULUM_AL_QURAN'
  | '05_HADITH'
  | '06_HADITH_COMMENTARY'
  | '07_HADITH_METHODOLOGY'
  | '08_FIQH'
  | '09_USUL_AL_FIQH'
  | '10_AQEEDAH_KALAM'
  | '11_SEERAH'
  | '12_SHAMAIL'
  | '13_ISLAMIC_HISTORY'
  | '14_ISLAMIC_BIOGRAPHY'
  | '15_AKHLAQ'
  | '16_ADAB'
  | '17_TAZKIYAH'
  | '18_TASAWWUF'
  | '19_MALFUZAT'
  | '20_MAKTUBAT'
  | '21_TAZKIRAH'
  | '22_SILSILA_RECORDS'
  | '23_DUA'
  | '24_ADHKAR'
  | '25_ISLAMIC_EDUCATION'
  | '26_FAMILY'
  | '27_MARRIAGE'
  | '28_PARENTING'
  | '29_ZAKAT'
  | '30_HAJJ_UMRAH'
  | '31_ISLAMIC_FINANCE'
  | '32_CONTEMPORARY_SCHOLARSHIP'
  | '33_ACADEMIC_ISLAMIC_STUDIES'
  | '34_MANUSCRIPTS'
  | '35_REFERENCE_WORKS'
  | '36_ENCYCLOPEDIC_WORKS';

// =========================================================================
// SECTION 4, 5 & 6: PRIORITY MATRIX, FORMULA & TIERS
// =========================================================================

export type ProgramPriorityTier =
  | 'P0_FOUNDATIONAL'
  | 'P1_CORE_SCHOLARLY'
  | 'P2_SPIRITUAL_HERITAGE'
  | 'P3_REGIONAL_HERITAGE'
  | 'P4_GLOBAL_HERITAGE'
  | 'P5_CONTEMPORARY_SCHOLARSHIP';

export interface Priority12DimensionScorecard {
  scholarly_importance: number; // 1 - 10
  historical_importance: number; // 1 - 10
  foundational_value: number; // 1 - 10
  user_need: number; // 1 - 10
  coverage_gap: number; // 1 - 10
  source_availability: number; // 1 - 10
  rights_feasibility: number; // 1 - 10
  text_quality_potential: number; // 1 - 10
  review_feasibility: number; // 1 - 10
  language_importance: number; // 1 - 10
  tradition_coverage: number; // 1 - 10
  edition_availability: number; // 1 - 10
  composite_priority_score: number; // auditable calculated formula product
}

// =========================================================================
// SECTION 8 & 9: FOUR-MADHHAB TRACKS & REPRESENTATION
// =========================================================================

export type MadhhabWorkLevel =
  | 'FOUNDATIONAL'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'COMMENTARY'
  | 'MUKHTASAR'
  | 'SHARH'
  | 'FATWA_COLLECTION'
  | 'CONTEMPORARY'
  | 'EDUCATIONAL';

export interface MadhhabAcquisitionTrackRecord {
  track_id: string;
  school: SunniSchool;
  work_level: MadhhabWorkLevel;
  work_title: string;
  author: string;
  priority_tier: ProgramPriorityTier;
  acquisition_status: 'DISCOVERED' | 'RIGHTS_CLEARED' | 'ACQUIRED' | 'VERIFIED' | 'PUBLISHED';
}

// =========================================================================
// SECTION 10, 11 & 12: TAZKIYAH, SILSILAS & BUZURGS
// =========================================================================

export type TazkiyahCorpusLane =
  | 'EARLY_ZUHD'
  | 'CLASSICAL_TAZKIYAH'
  | 'IHSAN'
  | 'AKHLAQ'
  | 'ADAB'
  | 'SULUK'
  | 'MAQAMAT_AHWAL'
  | 'MUHASABAH_MUJAHADAH'
  | 'MURAQABAH'
  | 'SPIRITUAL_MANUALS'
  | 'SUFI_BIOGRAPHIES'
  | 'MALFUZAT'
  | 'MAKTUBAT'
  | 'TAZKIRAH'
  | 'KARAMAT_REPORTS'
  | 'SPIRITUAL_POETRY'
  | 'SILSILA_LITERATURE';

export type HistoricalSilsilaCode =
  | 'CHISHTI'
  | 'QADRI'
  | 'NAQSHBANDI'
  | 'SUHRAWARDI'
  | 'SHADHILI'
  | 'RIFAI'
  | 'MEVLEVI'
  | 'KUBRAWI'
  | 'OTHER_HISTORICAL';

export interface SilsilaCorpusRecord {
  silsila_id: string;
  silsila_code: HistoricalSilsilaCode;
  lineage_name: string;
  primary_sources_count: number;
  documentation_status: 'HISTORICALLY_DOCUMENTED' | 'CONTEMPORARY_RECORD' | 'UNDER_STUDY';
  disclaimer_verified: boolean; // SILSILA INCLUDED ≠ AMAL ENDORSEMENT
}

// =========================================================================
// SECTION 14 - 17: REPOSITORY STRATEGY & OPENITI INTEGRATION
// =========================================================================

export type RepositoryTrustLevel = 'TIER_1_CANONICAL' | 'TIER_2_ACADEMIC' | 'TIER_3_COMMUNITY_OPEN';

export interface RepositoryRegistryRecord {
  repository_id: string;
  name: string;
  country: string;
  institution: string;
  collection: string;
  languages: string[];
  content_types: string[]; // PDF, MANUSCRIPT, TEI_XML, EPUB
  api_available: boolean;
  bulk_download_available: boolean;
  license_policy: string;
  item_rights_policy: string;
  citation_policy: string;
  commercial_use_policy: string;
  contact: string;
  acquisition_method: 'API' | 'BULK' | 'DIRECT_AGREEMENT' | 'MANUAL_DEPOSIT';
  trust_level: RepositoryTrustLevel;
  last_checked: string;
}

export interface OpenItiIntegrationRecord {
  openiti_id: string;
  release_version: string;
  source_collection: string;
  text_version: string;
  provenance: string;
  license_status: string;
  is_research_only: boolean; // INVARIANT: RESEARCH INPUT ONLY, NEVER AUTO PRODUCTION AUTHORITY
}

// =========================================================================
// SECTION 18 - 23: RIGHTS-FIRST ACQUISITION & MULTI-COMPONENT RIGHTS MATRIX
// =========================================================================

export type ProgramRightsCategory =
  | 'PUBLIC_DOMAIN_CONFIRMED'
  | 'OPEN_LICENSE_CONFIRMED'
  | 'LICENSED_FOR_AMAL'
  | 'PERMISSION_GRANTED'
  | 'LIMITED_REUSE'
  | 'RESEARCH_ONLY'
  | 'VIEW_ONLY'
  | 'METADATA_ONLY'
  | 'LICENSE_UNKNOWN'
  | 'RESTRICTED'
  | 'BLOCKED';

export interface ComponentRightsMatrix {
  underlying_work: ProgramRightsCategory;
  edition: ProgramRightsCategory;
  translation: ProgramRightsCategory;
  commentary: ProgramRightsCategory;
  annotations: ProgramRightsCategory;
  scan: ProgramRightsCategory;
  ocr: ProgramRightsCategory;
  metadata: ProgramRightsCategory;
  images: ProgramRightsCategory;
}

export interface LegalReviewTriggerFlags {
  author_recently_deceased: boolean;
  modern_translation: boolean;
  modern_critical_edition: boolean;
  modern_publisher_edition: boolean;
  copyright_uncertainty: boolean;
  unknown_editor: boolean;
  unknown_license: boolean;
  commercial_reuse_planned: boolean;
  full_text_distribution_requested: boolean;
  repository_restrictions_present: boolean;
  requires_legal_counsel_review: boolean;
}

export interface LicenseProofRecord {
  proof_id: string;
  candidate_id: string;
  license_document_hash?: string;
  permission_email_ref?: string;
  agreement_id?: string;
  repository_terms_version: string;
  rights_page_snapshot_url?: string;
  contact_person: string;
  permission_date: string;
  scope: string;
  territory: string;
  duration: string;
  revocation_terms: string;
  verified_by_legal_officer: string;
}

// =========================================================================
// SECTION 24 - 27: PARTNERSHIPS & SOURCE DONATION PROGRAM
// =========================================================================

export type PublisherAccessModel =
  | 'METADATA_ONLY'
  | 'SEARCH_SNIPPETS'
  | 'LICENSED_FULL_TEXT'
  | 'SUBSCRIBER_ACCESS'
  | 'INSTITUTIONAL_ACCESS'
  | 'REVIEW_ONLY';

export interface PublisherPartnershipRecord {
  partnership_id: string;
  publisher_name: string;
  agreement_signed_at: string;
  access_model: PublisherAccessModel;
  authorized_work_count: number;
  digital_preservation_opt_in: boolean;
  ai_citation_linkage_authorized: boolean;
}

export interface SourceDonationRecord {
  donation_id: string;
  donor_name: string;
  donor_entity_type: 'INDIVIDUAL' | 'FAMILY_ARCHIVE' | 'SEMINARY' | 'PRIVATE_LIBRARY';
  item_title: string;
  provenance_summary: string;
  agreement_id: string;
  status: 'DONATED_CANDIDATE' | 'IN_RIGHTS_AUDIT' | 'ACCEPTED_RESEARCH' | 'ACCEPTED_PRODUCTION' | 'REJECTED';
}

// =========================================================================
// SECTION 28 - 32: BATCH MANAGEMENT & ROADMAP
// =========================================================================

export interface AcquisitionBatchRecord {
  batch_id: string;
  theme: string;
  source_count: number;
  languages: string[];
  domains: Canonical36Category[];
  reviewers_assigned: string[];
  rights_status: 'PASS' | 'PENDING' | 'FAIL';
  processing_status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  benchmark_status: 'NOT_EVALUATED' | 'PASSED' | 'FAILED';
  release_status: 'STAGED' | 'RELEASE_READY' | 'PUBLISHED' | 'REJECTED';
  created_at: string;
}

export type RoadmapPhaseCode =
  | 'PHASE_1_FOUNDATION' // Months 1-2
  | 'PHASE_2_PILOT'      // Months 3-4 (100-250 works)
  | 'PHASE_3_CORE_EXPANSION' // Months 5-6 (500-1,000 works)
  | 'PHASE_4_MULTILINGUAL'   // Months 7-9
  | 'PHASE_5_HERITAGE';      // Months 10-12

export interface PilotSuccessCriteria {
  rights_accuracy_pct: number;      // target: 100%
  identity_accuracy_pct: number;    // target: 99.5%
  ocr_accuracy_pct: number;         // target: 98.0%
  citation_resolution_pct: number;  // target: 99.0%
  review_turnaround_days: number;   // target: < 14 days
  scholar_agreement_pct: number;    // target: > 90%
  passed_all_pilot_gates: boolean;
}

// =========================================================================
// SECTION 33 - 36: THREE-TIER CORPUS & QUEUE
// =========================================================================

export type ProgramCorpusTier =
  | 'TIER_A_PRODUCTION_VERIFIED'
  | 'TIER_B_SCHOLARLY_RESEARCH'
  | 'TIER_C_DISCOVERY_CANDIDATE';

export type CandidateProgramState =
  | 'DISCOVERED'
  | 'TRIAGED'
  | 'RIGHTS_CHECK'
  | 'ACQUISITION_PENDING'
  | 'ACQUIRED'
  | 'BLOCKED'
  | 'REJECTED';

export interface AcquisitionQueueItem {
  candidate_id: string;
  title: string;
  author: string;
  domain: Canonical36Category;
  language: string;
  tradition?: string;
  madhhab?: SunniSchool;
  estimated_period: string;
  priority_tier: ProgramPriorityTier;
  priority_score: Priority12DimensionScorecard;
  rights_status: ProgramRightsCategory;
  availability: 'DIGITAL_OPEN' | 'LICENSED_PARTNER' | 'MANUSCRIPT_PHYSICAL' | 'OUT_OF_PRINT';
  preferred_artifact: string;
  review_required: boolean;
  status: CandidateProgramState;
  created_at: string;
}

// =========================================================================
// SECTION 37 - 42: SOURCE PACKET, BIBLIOGRAPHIC RECORDS & MULTI-EDITION
// =========================================================================

export type EditionRole = 'PRIMARY_READING_EDITION' | 'COMPARISON_EDITION' | 'MANUSCRIPT_WITNESS';

export interface EditionMetadata {
  edition_id: string;
  edition_title: string;
  editor_name?: string;
  publisher: string;
  year_published?: number;
  city?: string;
  manuscript_basis?: string;
  critical_apparatus_present: boolean;
  edition_role: EditionRole;
  rights_state: ProgramRightsCategory;
}

export interface AuthorIdentityRecord {
  canonical_person_id: string;
  arabic_name: string;
  persian_name?: string;
  urdu_name?: string;
  transliterations: string[];
  kunyah?: string;
  laqab?: string;
  nisbah?: string;
  birth_hijri?: number;
  death_hijri?: number;
  primary_school?: SunniSchool;
  tradition?: string;
  regions: string[];
}

export interface CanonicalWorkRecord {
  canonical_work_id: string;
  canonical_title: string;
  alternate_titles: string[];
  canonical_author_id: string;
  primary_category: Canonical36Category;
  available_editions: EditionMetadata[];
}

export interface SourcePacket {
  source_packet_id: string;
  candidate_id: string;
  canonical_work: CanonicalWorkRecord;
  selected_edition: EditionMetadata;
  rights_matrix: ComponentRightsMatrix;
  license_proof?: LicenseProofRecord;
  artifact_sha256: string;
  storage_location: string;
  processing_plan: {
    requires_htr: boolean;
    ocr_language: string;
    script: string;
    allocated_team: AcquisitionTeamCode;
  };
  review_plan: {
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    assigned_scholars: string[];
    two_person_required: boolean;
  };
}

// =========================================================================
// SECTION 54 - 60: SCHOLAR NETWORK, CALIBRATION & WORKLOAD
// =========================================================================

export interface ScholarCalibrationTest {
  scholar_id: string;
  sample_set_id: string;
  source_classification_score: number; // 0 - 100
  attribution_classification_score: number;
  citation_accuracy_score: number;
  tradition_mapping_score: number;
  madhhab_mapping_score: number;
  translation_review_score: number;
  calibration_passed: boolean;
  calibrated_at: string;
}

export interface ScholarWorkloadRecord {
  scholar_id: string;
  specialty: CouncilSpecialization;
  assigned_items: number;
  completed_items: number;
  average_review_time_hours: number;
  correction_rate: number;
  second_review_rate: number;
  disagreement_rate: number;
  is_available: boolean;
}

export interface ConflictOfInterestDisclosure {
  disclosure_id: string;
  scholar_id: string;
  work_id: string;
  conflict_type: 'AUTHOR' | 'INSTITUTION' | 'PUBLISHER' | 'FINANCIAL' | 'PUBLIC_DISPUTE';
  notes: string;
  reassigned_to_scholar_id?: string;
}

// =========================================================================
// SECTION 65 - 73: COST ECONOMICS & WITHDRAWAL SYSTEM
// =========================================================================

export interface WorkEconomicsLedger {
  work_id: string;
  acquisition_cost_usd: number;
  license_cost_usd: number;
  scanning_cost_usd: number;
  ocr_cost_usd: number;
  editorial_cost_usd: number;
  scholar_review_cost_usd: number;
  translation_cost_usd: number;
  storage_cost_usd: number;
  total_acquisition_cost_usd: number;
  knowledge_value_units: number;
  roi_index: number; // KnowledgeValue / TotalCost
}

export interface WithdrawalRequestRecord {
  withdrawal_id: string;
  work_id: string;
  requestor: string;
  reason: 'RIGHTS_HOLDER_REVOCATION' | 'LEGAL_DISPUTE' | 'ACADEMIC_FRAUD' | 'SEVERE_CORRUPTION';
  distribution_suspended: boolean;
  audit_metadata_preserved: boolean;
  removed_from_production_index: boolean;
  completed_at: string;
}

export interface SourceCorrectionRecord {
  correction_id: string;
  work_id: string;
  passage_id?: string;
  source_of_correction: 'SCHOLAR' | 'PUBLISHER' | 'LIBRARY' | 'USER_SUBMISSION' | 'AUTOMATED_QA';
  previous_value: string;
  corrected_value: string;
  scholarly_justification: string;
  status: 'PENDING_AUDIT' | 'APPLIED' | 'REJECTED';
  applied_in_release_id?: string;
}

// =========================================================================
// SECTION 85 - 87: CAPACITY PLANNING & BACKLOG THROTTLING
// =========================================================================

export interface CapacityPlanningMetrics {
  current_review_capacity_works_per_month: number;
  quality_factor: number; // 0.8 - 1.0
  safe_acquisition_rate: number; // ReviewCapacity * QualityFactor
  unreviewed_backlog_count: number;
  backlog_threshold: number;
  is_acquisition_throttled: boolean;
}

// =========================================================================
// SECTION 94 - 98: SOURCE CARDS & USER TRANSPARENCY
// =========================================================================

export interface AmalPublicSourceCard {
  title: string;
  author: string;
  work_status: 'VERIFIED' | 'UNDER_REVIEW' | 'RESEARCH_ONLY';
  attribution_certainty: 'AUTHENTICATED' | 'ATTRIBUTED' | 'CONTESTED';
  edition_details: string;
  language: string;
  rights_summary: string;
  review_status: 'DOUBLE_SCHOLAR_CERTIFIED' | 'REVIEWED' | 'PENDING';
  knowledge_release: string;
  why_trust_this: string[];
  what_is_uncertain: string[];
}

export interface ScholarExtendedSourceCard extends AmalPublicSourceCard {
  manuscript_witnesses: string[];
  comparison_editions: string[];
  citation_count: number;
  claims_count: number;
  disputes_recorded: string[];
  ocr_confidence_score: number;
  reviewer_signatures: string[];
}
