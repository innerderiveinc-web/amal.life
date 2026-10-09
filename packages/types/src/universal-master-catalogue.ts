/**
 * AMAL OS — UNIVERSAL ISLAMIC KNOWLEDGE MASTER CATALOGUE TYPES
 * Master Production Data Models for 10,000+ Work Inventory, Priority Matrix,
 * Source Registry, Edition Tracking, Rights, Verification, Scholarly Review & Production Roadmap (Sections 0 - 129).
 */

import type { SunniSchool } from './madhhab-neutrality.js';

// =========================================================================
// SECTION 3: UNIVERSAL CATALOGUE ID PATTERNS
// =========================================================================

export type AmalWorkId = `AML-W-${string}`;
export type AmalEditionId = `AML-E-${string}`;
export type AmalArtifactId = `AML-A-${string}`;
export type AmalPassageId = `AML-P-${string}`;
export type AmalPersonId = `AML-PER-${string}`;
export type AmalSilsilaId = `AML-SIL-${string}`;
export type AmalClaimId = `AML-C-${string}`;
export type AmalQuoteId = `AML-Q-${string}`;
export type AmalManuscriptId = `AML-MS-${string}`;
export type AmalBatchId = `AML-B-${string}`;

// =========================================================================
// SECTION 6: ATTRIBUTION STATUS
// =========================================================================

export type MasterAttributionStatus =
  | 'AUTHENTICATED'
  | 'STRONGLY_SUPPORTED'
  | 'PROBABLE'
  | 'TRADITIONALLY_ATTRIBUTED'
  | 'UNCERTAIN'
  | 'DISPUTED'
  | 'MISATTRIBUTED'
  | 'REJECTED'
  | 'UNKNOWN';

// =========================================================================
// SECTION 7: WORK TYPE TAXONOMY (40+ Work Types)
// =========================================================================

export type MasterWorkType =
  | 'QURAN'
  | 'QURAN_TRANSLATION'
  | 'TAFSIR'
  | 'ULUM_AL_QURAN'
  | 'HADITH_COLLECTION'
  | 'HADITH_COMMENTARY'
  | 'HADITH_METHODOLOGY'
  | 'FIQH'
  | 'USUL_AL_FIQH'
  | 'FATWA_COLLECTION'
  | 'QAWAID_FIQHIYYAH'
  | 'AQEEDAH'
  | 'KALAM'
  | 'ISLAMIC_PHILOSOPHY'
  | 'SEERAH'
  | 'SHAMAIL'
  | 'ISLAMIC_HISTORY'
  | 'ISLAMIC_BIOGRAPHY'
  | 'AKHLAQ'
  | 'ADAB'
  | 'TAZKIYAH'
  | 'IHSAN'
  | 'TASAWWUF'
  | 'SPIRITUAL_MANUAL'
  | 'MALFUZAT'
  | 'MAKTUBAT'
  | 'TAZKIRAH'
  | 'SPIRITUAL_BIOGRAPHY'
  | 'SILSILA_RECORD'
  | 'DUA'
  | 'ADHKAR'
  | 'WORSHIP_GUIDANCE'
  | 'ISLAMIC_EDUCATION'
  | 'ISLAMIC_CHILDREN'
  | 'FAMILY'
  | 'MARRIAGE'
  | 'PARENTING'
  | 'ISLAMIC_FINANCE'
  | 'ZAKAT'
  | 'HAJJ'
  | 'UMRAH'
  | 'CONTEMPORARY_SCHOLARSHIP'
  | 'ACADEMIC_RESEARCH'
  | 'REFERENCE'
  | 'ENCYCLOPEDIA'
  | 'MANUSCRIPT';

// =========================================================================
// SECTION 8: 40 MAJOR KNOWLEDGE COLLECTIONS
// =========================================================================

export type MasterKnowledgeCollectionFamily =
  | '01_QURAN'
  | '02_QURAN_TRANSLATIONS'
  | '03_TAFSIR'
  | '04_ULUM_AL_QURAN'
  | '05_HADITH'
  | '06_HADITH_COMMENTARY'
  | '07_HADITH_METHODOLOGY'
  | '08_FIQH'
  | '09_USUL_AL_FIQH'
  | '10_ISLAMIC_LEGAL_PRINCIPLES'
  | '11_FATWA_LITERATURE'
  | '12_AQEEDAH'
  | '13_SEERAH'
  | '14_SHAMAIL'
  | '15_ISLAMIC_HISTORY'
  | '16_ISLAMIC_BIOGRAPHY'
  | '17_AKHLAQ'
  | '18_ADAB'
  | '19_TAZKIYAH'
  | '20_TASAWWUF'
  | '21_SUFI_MANUALS'
  | '22_MALFUZAT'
  | '23_MAKTUBAT'
  | '24_TAZKIRAH'
  | '25_SPIRITUAL_BIOGRAPHIES'
  | '26_SILSILA_LITERATURE'
  | '27_DUA'
  | '28_ADHKAR'
  | '29_ISLAMIC_EDUCATION'
  | '30_FAMILY'
  | '31_MARRIAGE'
  | '32_PARENTING'
  | '33_ZAKAT'
  | '34_HAJJ'
  | '35_UMRAH'
  | '36_ISLAMIC_FINANCE'
  | '37_CONTEMPORARY_SCHOLARSHIP'
  | '38_ACADEMIC_SCHOLARSHIP'
  | '39_MANUSCRIPTS'
  | '40_REFERENCE_WORKS';

// =========================================================================
// SECTION 10 - 16: PRIORITY LEVELS (P0 to P5)
// =========================================================================

export type MasterPriorityLevel =
  | 'P0_CRITICAL'
  | 'P1_FOUNDATIONAL'
  | 'P2_CORE'
  | 'P3_HIGH_VALUE'
  | 'P4_EXPANSION'
  | 'P5_RESEARCH';

// =========================================================================
// SECTION 41 - 42: LANGUAGES & SCRIPTS REGISTRY
// =========================================================================

export type MasterLanguageCode =
  | 'ARABIC'
  | 'PERSIAN'
  | 'URDU'
  | 'HINDI'
  | 'ENGLISH'
  | 'BENGALI'
  | 'GUJARATI'
  | 'MARATHI'
  | 'MALAYALAM'
  | 'TAMIL'
  | 'TELUGU'
  | 'KANNADA'
  | 'PUNJABI'
  | 'TURKISH'
  | 'INDONESIAN'
  | 'MALAY'
  | 'FRENCH'
  | 'SPANISH'
  | 'GERMAN';

export type MasterScriptCode =
  | 'ARABIC_NASKH'
  | 'URDU_NASTALIQ'
  | 'PERSIAN_SCRIPT'
  | 'DEVANAGARI'
  | 'LATIN'
  | 'OTTOMAN_SCRIPT'
  | 'BENGALI_SCRIPT'
  | 'REGIONAL_SCRIPT';

export type MasterLanguageCoverageState =
  | 'AVAILABLE'
  | 'LICENSE_PENDING'
  | 'TRANSLATION_PENDING'
  | 'REVIEW_PENDING'
  | 'VERIFIED'
  | 'NOT_AVAILABLE';

// =========================================================================
// SECTION 47 - 51: RIGHTS, AVAILABILITY, SCHOLAR REVIEW & RISK LEVELS
// =========================================================================

export type MasterRightsCategory =
  | 'PUBLIC_DOMAIN_CONFIRMED'
  | 'LICENSED'
  | 'PERMISSION_GRANTED'
  | 'LIMITED_USE'
  | 'RESEARCH_ONLY'
  | 'METADATA_ONLY'
  | 'LICENSE_UNKNOWN'
  | 'RESTRICTED'
  | 'BLOCKED';

export type MasterSourceAvailability =
  | 'PHYSICAL_ONLY'
  | 'DIGITAL_SCAN'
  | 'OCR_TEXT'
  | 'STRUCTURED_TEXT'
  | 'FULL_TEXT_LICENSED'
  | 'EXCERPT_ONLY'
  | 'METADATA_ONLY'
  | 'MANUSCRIPT_ONLY'
  | 'MULTIPLE_WITNESSES';

export type MasterScholarReviewLevel =
  | 'NONE'
  | 'EDITORIAL'
  | 'SPECIALIST'
  | 'ONE_SCHOLAR'
  | 'TWO_SCHOLARS'
  | 'MULTI_SCHOLAR'
  | 'INDEPENDENT_REVIEW';

export type MasterRiskClassification =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

// =========================================================================
// SECTION 55: MASTER CATALOGUE STATUS (17 Lifecycle States)
// =========================================================================

export type MasterCatalogueStatus =
  | 'DISCOVERED'
  | 'TRIAGED'
  | 'CANDIDATE'
  | 'ACQUISITION_PENDING'
  | 'RIGHTS_REVIEW'
  | 'ACQUIRED'
  | 'PROCESSING'
  | 'EDITORIAL_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'DISPUTED'
  | 'APPROVED'
  | 'RELEASE_READY'
  | 'PUBLISHED'
  | 'SUSPENDED'
  | 'RETIRED'
  | 'QUARANTINED'
  | 'REJECTED';

// =========================================================================
// SECTION 23: TAZKIYAH / TASAWWUF 26 SUB-CATEGORIES
// =========================================================================

export type TazkiyahMasterSubcategory =
  | 'EARLY_ZUHD'
  | 'CLASSICAL_TAZKIYAH'
  | 'IHSAN'
  | 'AKHLAQ'
  | 'ADAB'
  | 'NAFS'
  | 'QALB'
  | 'SULUK'
  | 'MAQAMAT'
  | 'AHWAL'
  | 'MUHASABAH'
  | 'MUJAHADAH'
  | 'MURAQABAH'
  | 'TAWAKKUL'
  | 'TAWBAH'
  | 'SABR'
  | 'SHUKR'
  | 'IKHLAS'
  | 'MAHABBAH'
  | 'SPIRITUAL_PSYCHOLOGY'
  | 'SPIRITUAL_MANUALS'
  | 'SUFI_BIOGRAPHY'
  | 'MALFUZAT'
  | 'MAKTUBAT'
  | 'TAZKIRAH'
  | 'SPIRITUAL_POETRY'
  | 'SILSILA_LITERATURE';

// =========================================================================
// SECTION 25: SILSILA CODES
// =========================================================================

export type MasterSilsilaCode =
  | 'CHISHTI'
  | 'QADRI'
  | 'NAQSHBANDI'
  | 'SUHRAWARDI'
  | 'SHADHILI'
  | 'RIFAI'
  | 'MEVLEVI'
  | 'KUBRAWI'
  | 'OTHER_HISTORICAL';

// =========================================================================
// SECTION 4: CANONICAL WORK RECORD
// =========================================================================

export interface CanonicalMasterWorkRecord {
  work_id: AmalWorkId;
  canonical_title: string;
  original_title: string;
  alternate_titles: string[];
  short_title: string;
  author_id: AmalPersonId;
  attributed_author_id?: AmalPersonId;
  work_type: MasterWorkType;
  domain: MasterKnowledgeCollectionFamily;
  historical_period: string;
  composition_date_start?: number; // AH or CE
  composition_date_end?: number;
  original_language: MasterLanguageCode;
  original_script: MasterScriptCode;
  regions: string[];
  madhhab?: SunniSchool;
  aqeedah_context?: string;
  spiritual_tradition?: string;
  silsila?: MasterSilsilaCode;
  subject_domains: string[];
  bibliographic_notes: string;
  attribution_status: MasterAttributionStatus;
  textual_status: 'PRISTINE' | 'GOOD' | 'CORRUPTED_READINGS' | 'FRAGMENTARY' | 'UNKNOWN';
  scholarly_status: 'CANONICAL' | 'STANDARD_REFERENCE' | 'SPECIALIST' | 'CONTESTED' | 'UNREVIEWED';
  rights_status: MasterRightsCategory;
  catalogue_status: MasterCatalogueStatus;
  priority: MasterPriorityLevel;
  inclusion_reason?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

// =========================================================================
// SECTION 5: CANONICAL AUTHOR RECORD
// =========================================================================

export interface CanonicalMasterAuthorRecord {
  author_id: AmalPersonId;
  canonical_name: string;
  arabic_name: string;
  persian_name?: string;
  urdu_name?: string;
  english_name?: string;
  transliteration_variants: string[];
  kunyah?: string;
  laqab?: string;
  nisbah?: string;
  birth_date?: string;
  death_date?: string;
  death_hijri?: number;
  date_precision: 'EXACT' | 'APPROXIMATE' | 'CENTURY_ESTIMATE' | 'UNKNOWN';
  places: string[];
  languages: MasterLanguageCode[];
  madhhab?: SunniSchool;
  scholarly_tradition?: string;
  spiritual_tradition?: string;
  associated_silsilas: MasterSilsilaCode[];
  biographical_sources: string[];
  identity_status: 'VERIFIED' | 'STRONGLY_SUPPORTED' | 'DISPUTED' | 'UNKNOWN';
}

// =========================================================================
// SECTION 44: EDITION RECORD
// =========================================================================

export interface MasterEditionRecord {
  edition_id: AmalEditionId;
  work_id: AmalWorkId;
  editor?: string;
  publisher: string;
  place?: string;
  year?: number;
  edition_number?: number;
  volume_count: number;
  isbn?: string;
  catalogue_reference?: string;
  manuscript_basis?: string;
  rights: MasterRightsCategory;
  artifact_id?: AmalArtifactId;
  quality_status: 'CRITICAL_EDITION' | 'STANDARD_PRINT' | 'LITHOGRAPH' | 'FAULTY' | 'UNEVALUATED';
  edition_role: 'PRIMARY_READING_EDITION' | 'COMPARISON_EDITION' | 'MANUSCRIPT_WITNESS';
}

// =========================================================================
// SECTION 45: MANUSCRIPT RECORD
// =========================================================================

export interface MasterManuscriptRecord {
  manuscript_id: AmalManuscriptId;
  work_id: AmalWorkId;
  repository: string;
  catalogue_number: string;
  location: string;
  language: MasterLanguageCode;
  script: MasterScriptCode;
  estimated_date?: string;
  completeness: 'COMPLETE' | 'INCOMPLETE_FOLIOS' | 'FRAGMENT' | 'UNKNOWN';
  digitization_status: 'HIGH_RES_DIGITIZED' | 'MICROFILM' | 'PHYSICAL_ONLY';
  rights: MasterRightsCategory;
  artifact_hash?: string;
}

// =========================================================================
// SECTION 46: ARTIFACT RECORD
// =========================================================================

export interface MasterArtifactRecord {
  artifact_id: AmalArtifactId;
  edition_id: AmalEditionId;
  artifact_type: 'PDF' | 'XML_TEI' | 'JSON' | 'EPUB' | 'HIGH_RES_TIFF' | 'RAW_TEXT';
  storage_location: string;
  source_repository: string;
  checksum: string; // SHA-256
  mime_type: string;
  file_size: number;
  acquisition_method: 'API' | 'BULK_DEPOSIT' | 'DIRECT_AGREEMENT' | 'MANUAL_DEPOSIT';
  rights: MasterRightsCategory;
  preservation_status: 'STORED_3_2_1' | 'PENDING_REPLICATION' | 'ARCHIVED';
}

// =========================================================================
// SECTION 24: SILSILA MASTER REGISTRY ENTRY
// =========================================================================

export interface MasterSilsilaRecord {
  silsila_id: AmalSilsilaId;
  canonical_name: string;
  arabic_name: string;
  alternate_names: string[];
  historical_period: string;
  geographic_regions: string[];
  foundational_figures: string[];
  major_figures: string[];
  branches: string[];
  source_records: string[];
  lineage_records: string[];
  scholarly_notes: string;
  verification_status: 'HISTORICALLY_DOCUMENTED' | 'CONTEMPORARY_RECORD' | 'UNDER_STUDY';
  disclaimer: string; // Invariant: Inclusion ≠ Universal Endorsement
}

// =========================================================================
// SECTION 26 & 32: SPIRITUAL FIGURE & KARAMAH REPORT
// =========================================================================

export interface MasterSpiritualFigureRecord {
  person_id: AmalPersonId;
  canonical_name: string;
  aliases: string[];
  period: string;
  region: string;
  teachers: string[];
  students: string[];
  associated_silsilas: MasterSilsilaCode[];
  works: AmalWorkId[];
  attributed_works: AmalWorkId[];
  maktubat_count: number;
  malfuzat_records: string[];
  biographies: string[];
  historical_sources: string[];
  attribution_notes: string;
  verification_status: 'VERIFIED' | 'DISPUTED' | 'UNKNOWN';
}

export interface MasterKaramahReportRecord {
  report_id: string;
  figure: string;
  event_description: string;
  source_work_id: AmalWorkId;
  reporting_author: string;
  date?: string;
  context: string;
  scholarly_assessment: string;
  historical_status: 'REPORTED' | 'TRADITIONALLY_RELATED' | 'HISTORICALLY_UNCERTAIN' | 'DISPUTED' | 'UNVERIFIED';
}

// =========================================================================
// SECTION 29 - 31: MALFUZAT & MAKTUBAT RECORDS
// =========================================================================

export interface MasterMalfuzatRecord {
  malfuz_id: string;
  collection_work_id: AmalWorkId;
  speaker: string;
  recorder: string;
  session_date?: string;
  recorded_saying: string;
  source_edition_id: AmalEditionId;
  passage_reference: string;
  attribution_status: MasterAttributionStatus;
}

export interface MasterMaktubatRecord {
  letter_id: string;
  collection_work_id: AmalWorkId;
  author: string;
  recipient: string;
  date?: string;
  manuscript_basis?: string;
  edition_id: AmalEditionId;
  attribution_status: MasterAttributionStatus;
  subject_summary: string;
}

// =========================================================================
// SECTION 64 - 66: QUOTE CATALOGUE
// =========================================================================

export interface MasterQuoteRecord {
  quote_id: AmalQuoteId;
  quote_text: string;
  normalized_text: string;
  speaker_id: AmalPersonId;
  source_work_id?: AmalWorkId;
  edition_id?: AmalEditionId;
  passage_id?: AmalPassageId;
  language: MasterLanguageCode;
  translation?: string;
  attribution_status: MasterAttributionStatus;
  verification_status:
    | 'VERIFIED_IN_SOURCE'
    | 'VARIANT_WORDING'
    | 'SECONDARY_SOURCE'
    | 'TRADITIONALLY_ATTRIBUTED'
    | 'DISPUTED'
    | 'MISATTRIBUTED'
    | 'UNVERIFIED';
  context: string;
}

// =========================================================================
// SECTION 52 - 54: PRIORITY SCORECARD & AUDITABLE FORMULA
// =========================================================================

export interface MasterPriorityScorecard {
  foundation_score: number; // 1-10
  scholarly_importance: number; // 1-10
  historical_importance: number; // 1-10
  user_demand: number; // 1-10
  coverage_gap: number; // 1-10
  rights_feasibility: number; // 1-10
  availability: number; // 1-10
  review_feasibility: number; // 1-10
  language_value: number; // 1-10
  regional_value: number; // 1-10
  tradition_value: number; // 1-10
  composite_score: number; // Configurable auditable formula result
  explanation: {
    foundation: 'HIGH' | 'MEDIUM' | 'LOW';
    coverage_gap: 'HIGH' | 'MEDIUM' | 'LOW';
    availability: 'HIGH' | 'MEDIUM' | 'LOW';
    rights: 'CONFIRMED' | 'PENDING' | 'BLOCKED';
    review_capacity: 'AVAILABLE' | 'CONSTRAINED';
    language_coverage: 'CRITICAL' | 'SECONDARY';
  };
}

// =========================================================================
// SECTION 56 - 57: BATCH MANAGEMENT
// =========================================================================

export interface MasterBatchRecord {
  batch_id: AmalBatchId;
  theme: string;
  priority: MasterPriorityLevel;
  work_count: number;
  languages: MasterLanguageCode[];
  domains: MasterKnowledgeCollectionFamily[];
  reviewers: string[];
  rights_status: 'PASS' | 'PENDING' | 'FAIL';
  processing_status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  benchmark_status: 'NOT_EVALUATED' | 'PASSED' | 'FAILED';
  release_status: 'STAGED' | 'RELEASE_READY' | 'PUBLISHED' | 'REJECTED';
  created_at: string;
}

// =========================================================================
// SECTION 58: CATALOGUE QUALITY STATES (No Single Percentage)
// =========================================================================

export interface MasterCatalogueQualityStates {
  metadata_confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  identity_confidence: 'VERIFIED' | 'ATTRIBUTED' | 'UNCERTAIN';
  attribution_status: MasterAttributionStatus;
  text_confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  reference_confidence: 'CANONICAL_RESOLVED' | 'PARTIAL' | 'UNRESOLVED';
  translation_status:
    | 'NO_TRANSLATION'
    | 'AI_DRAFT'
    | 'HUMAN_TRANSLATION'
    | 'EDITOR_REVIEW'
    | 'SCHOLAR_REVIEW'
    | 'PUBLISHED';
  scholar_review: MasterScholarReviewLevel;
  rights_status: MasterRightsCategory;
}

// =========================================================================
// SECTION 59 - 60: GAP ENGINE & RECOMMENDATIONS
// =========================================================================

export type SourceGapType =
  | 'MISSING_FOUNDATIONAL_WORK'
  | 'MISSING_EDITION'
  | 'MISSING_MANUSCRIPT'
  | 'MISSING_TRANSLATION'
  | 'MISSING_SCHOLARLY_REVIEW'
  | 'MISSING_ATTRIBUTION_EVIDENCE'
  | 'MISSING_MADHHAB_REPRESENTATION'
  | 'MISSING_TRADITION_REPRESENTATION'
  | 'MISSING_LANGUAGE'
  | 'MISSING_CITATION';

export interface SourceGapItem {
  gap_id: string;
  gap_type: SourceGapType;
  domain: MasterKnowledgeCollectionFamily;
  madhhab?: SunniSchool;
  language?: MasterLanguageCode;
  description: string;
  impact_priority: MasterPriorityLevel;
}

export interface AcquisitionRecommendationPack {
  next_10_works: AmalWorkId[];
  next_50_works: AmalWorkId[];
  next_batch: AmalBatchId;
  next_language_project: MasterLanguageCode;
  next_review_priority: AmalWorkId[];
  reasons: string[];
}

// =========================================================================
// SECTION 98 - 100: ACQUISITION MASTER SHEET & NEXT ACTION ENGINE
// =========================================================================

export interface WorkOwnershipRecord {
  work_id: AmalWorkId;
  acquisition_owner: string;
  rights_owner: string;
  metadata_owner: string;
  processing_owner: string;
  scholar_owner: string;
  translation_owner: string;
  release_owner: string;
}

export interface NextActionRecord {
  work_id: AmalWorkId;
  next_action: string;
  owner: string;
  deadline: string;
  dependency?: string;
}

// =========================================================================
// SECTION 102 - 103: DASHBOARDS & HEATMAPS
// =========================================================================

export interface MasterCatalogueDashboardMetrics {
  total_candidates: number;
  total_acquired: number;
  total_processing: number;
  total_in_review: number;
  total_approved: number;
  total_published: number;
  total_quarantined: number;
  total_rejected: number;
  by_domain: Record<string, number>;
  by_madhhab: Record<string, number>;
  by_silsila: Record<string, number>;
  by_language: Record<string, number>;
  by_priority: Record<string, number>;
  by_rights: Record<string, number>;
}

// =========================================================================
// SECTION 107: PUBLIC DISCOVERY BADGES
// =========================================================================

export type PublicDiscoveryBadge =
  | 'Source Verified'
  | 'Edition Identified'
  | 'Attribution Reviewed'
  | 'Scholar Reviewed'
  | 'Translation Reviewed'
  | 'Research Material'
  | 'Attribution Disputed'
  | 'Rights Restricted';

// =========================================================================
// SECTION 110 - 112: GOLDEN & RELEASE PACKET RECORDS
// =========================================================================

export interface GoldenCatalogueRecord {
  work_id: AmalWorkId;
  canonical_title: string;
  author_name: string;
  attribution_status: MasterAttributionStatus;
  primary_edition_title: string;
  artifact_sha256: string;
  rights_status: MasterRightsCategory;
  madhhab?: SunniSchool;
  silsila?: MasterSilsilaCode;
  scholar_review_level: MasterScholarReviewLevel;
  release_id: string;
  is_golden: true;
}

export interface ReleasePacket {
  release_id: string;
  work_id: AmalWorkId;
  source_identity_confirmed: boolean;
  edition_confirmed: boolean;
  artifact_confirmed: boolean;
  rights_confirmed: boolean;
  provenance_confirmed: boolean;
  passages_count: number;
  references_count: number;
  claims_count: number;
  classification_confirmed: boolean;
  translation_confirmed: boolean;
  reviews_confirmed: boolean;
  disputes_resolved: boolean;
  benchmark_passed: boolean;
}
