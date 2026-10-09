/**
 * AMAL OS — GLOBAL ISLAMIC HERITAGE & KNOWLEDGE ATLAS TYPES (Atlas v2)
 * Master Production Data Models for Globally Governed Knowledge Atlas,
 * 12 Epistemic Layers, 55-Category Taxonomy, 25+ Buzurg, Silsila Lineage Graph,
 * Ghuniyat al-Talibin, Spiritual Practices, Tazkiyah Concept Engine & AI Trust Layer (Sections 0 - 97).
 */

import type { SunniSchool } from './madhhab-neutrality.js';
import type {
  AmalWorkId,
  AmalEditionId,
  AmalArtifactId,
  AmalPassageId,
  AmalPersonId,
  AmalSilsilaId,
  AmalQuoteId,
  MasterAttributionStatus,
  MasterRightsCategory,
  MasterScholarReviewLevel
} from './universal-master-catalogue.js';

// =========================================================================
// SECTION 1: 12 CRITICAL EPISTEMIC LAYERS (Never Flatten!)
// =========================================================================

export type EpistemicLayer =
  | 'LAYER_1_QURAN'
  | 'LAYER_2_VERIFIED_PROPHETIC_SOURCES'
  | 'LAYER_3_ESTABLISHED_SCHOLARLY_KNOWLEDGE'
  | 'LAYER_4_FIQH_MADHHAB_POSITIONS'
  | 'LAYER_5_TAFSIR'
  | 'LAYER_6_AQEEDAH_THEOLOGICAL_SCHOLARSHIP'
  | 'LAYER_7_TAZKIYAH_IHSAN'
  | 'LAYER_8_TASAWWUF_SPIRITUAL_HERITAGE'
  | 'LAYER_9_BUZURG_AWLIYA_BIOGRAPHY'
  | 'LAYER_10_MALFUZAT_MAKTUBAT_TAZKIRAH'
  | 'LAYER_11_HISTORICAL_DEVOTIONAL_REPORTS'
  | 'LAYER_12_CONTEMPORARY_ACADEMIC_RESEARCH';

// =========================================================================
// SECTION 2: 55 GLOBAL KNOWLEDGE UNIVERSE DOMAINS
// =========================================================================

export type AtlasTaxonomyDomain =
  | '01_QURAN'
  | '02_QURAN_SCIENCES'
  | '03_QURAN_TRANSLATIONS'
  | '04_TAFSIR'
  | '05_HADITH'
  | '06_HADITH_SCIENCES'
  | '07_HADITH_COMMENTARIES'
  | '08_FIQH'
  | '09_USUL_AL_FIQH'
  | '10_QAWAID_FIQHIYYAH'
  | '11_FATWA_LITERATURE'
  | '12_FOUR_MADHHABS'
  | '13_AQEEDAH'
  | '14_KALAM'
  | '15_SEERAH'
  | '16_SHAMAIL'
  | '17_DALAI_L'
  | '18_ISLAMIC_HISTORY'
  | '19_ISLAMIC_BIOGRAPHY'
  | '20_AKHLAQ'
  | '21_ADAB'
  | '22_TAZKIYAH'
  | '23_IHSAN'
  | '24_TASAWWUF'
  | '25_SUFI_MANUALS'
  | '26_SPIRITUAL_PSYCHOLOGY'
  | '27_SPIRITUAL_PRACTICES'
  | '28_MALFUZAT'
  | '29_MAKTUBAT'
  | '30_TAZKIRAH'
  | '31_SPIRITUAL_BIOGRAPHY'
  | '32_SILSILA_RECORDS'
  | '33_WALI_BUZURG_REGISTRY'
  | '34_DUA'
  | '35_ADHKAR'
  | '36_ISLAMIC_EDUCATION'
  | '37_FAMILY'
  | '38_MARRIAGE'
  | '39_PARENTING'
  | '40_ZAKAT'
  | '41_HAJJ'
  | '42_UMRAH'
  | '43_ISLAMIC_FINANCE'
  | '44_WAQF'
  | '45_CONTEMPORARY_SCHOLARSHIP'
  | '46_FIQH_ACADEMIES'
  | '47_ACADEMIC_ISLAMIC_STUDIES'
  | '48_MANUSCRIPTS'
  | '49_CRITICAL_EDITIONS'
  | '50_REGIONAL_ISLAMIC_HERITAGE'
  | '51_ISLAMIC_POETRY'
  | '52_ISLAMIC_LITERATURE'
  | '53_ISLAMIC_ART_INTELLECTUAL'
  | '54_ISLAMIC_GEOGRAPHY_TRAVEL'
  | '55_SPECIALIZED_RESEARCH';

// =========================================================================
// SECTION 4: 16 GLOBAL REGIONAL LAYERS
// =========================================================================

export type AtlasRegionLayer =
  | 'SOUTH_ASIA'
  | 'ARAB_WORLD'
  | 'PERSIANATE_WORLD'
  | 'ANATOLIA_TURKEY'
  | 'CENTRAL_ASIA'
  | 'SOUTHEAST_ASIA'
  | 'EAST_AFRICA'
  | 'WEST_AFRICA'
  | 'NORTH_AFRICA'
  | 'EASTERN_EUROPE'
  | 'WESTERN_EUROPE'
  | 'BALKANS'
  | 'CENTRAL_EASTERN_EUROPE'
  | 'NORTH_AMERICA'
  | 'SOUTH_AMERICA'
  | 'OTHER_REGIONS';

// =========================================================================
// SECTION 5: 30+ GLOBAL LANGUAGES
// =========================================================================

export type AtlasLanguage =
  | 'ARABIC'
  | 'PERSIAN'
  | 'URDU'
  | 'HINDI'
  | 'ENGLISH'
  | 'TURKISH'
  | 'BENGALI'
  | 'GUJARATI'
  | 'MARATHI'
  | 'MALAYALAM'
  | 'TAMIL'
  | 'TELUGU'
  | 'KANNADA'
  | 'PUNJABI'
  | 'MALAY'
  | 'INDONESIAN'
  | 'FRENCH'
  | 'SPANISH'
  | 'GERMAN'
  | 'BOSNIAN'
  | 'SWAHILI'
  | 'PASHTO'
  | 'SINDHI'
  | 'KASHMIRI'
  | 'BALOCHI'
  | 'KAZAKH'
  | 'UZBEK'
  | 'TAJIK'
  | 'AZERBAIJANI'
  | 'OTHER_LANGUAGE';

// =========================================================================
// SECTION 8: EXTENDED PERMANENT AMAL IDS
// =========================================================================

export type AmalTranslationId = `AML-T-${string}`;
export type AmalPracticeId = `AML-PRAC-${string}`;
export type AmalIssueId = `AML-ISSUE-${string}`;

// =========================================================================
// SECTION 25: SILSILA RELATION TYPES (Lineage Graph Edges)
// =========================================================================

export type SilsilaTransmissionRelationType =
  | 'TEACHER_OF'
  | 'STUDENT_OF'
  | 'AUTHORIZED_BY'
  | 'SPIRITUAL_SUCCESSOR_OF'
  | 'KHILAFAT_RECEIVED'
  | 'COMPANION_OF'
  | 'BRANCH_FOUNDER'
  | 'TRADITIONALLY_LINKED'
  | 'ASSOCIATED_WITH';

export interface SilsilaLineageEdge {
  from_person_id: AmalPersonId;
  to_person_id: AmalPersonId;
  relation_type: SilsilaTransmissionRelationType;
  source_reference: string;
  passage_id?: AmalPassageId;
  date_or_context: string;
  certainty: 'CERTAIN_DOCUMENTED' | 'PROBABLE' | 'TRADITIONALLY_CLAIMED' | 'DISPUTED';
  review_status: 'REVIEWED' | 'PENDING';
}

// =========================================================================
// SECTION 9 & 10: MAJOR BUZURG REGISTRY
// =========================================================================

export interface AtlasBuzurgRecord {
  person_id: AmalPersonId;
  canonical_name: string;
  arabic_name: string;
  persian_name?: string;
  urdu_name?: string;
  other_names: string[];
  kunyah?: string;
  laqab?: string;
  nisbah?: string;
  birth_date?: string;
  death_date?: string;
  death_hijri?: number;
  date_precision: 'EXACT' | 'APPROXIMATE' | 'CENTURY_ESTIMATE' | 'UNKNOWN';
  birth_place?: string;
  death_place?: string;
  regions: AtlasRegionLayer[];
  languages: AtlasLanguage[];
  teachers: string[];
  students: string[];
  companions: string[];
  scholarly_fields: string[];
  madhhab?: SunniSchool;
  aqeedah_tradition?: string;
  spiritual_tradition: string;
  silsilas: string[];
  works_count: number;
  attributed_works_count: number;
  maktubat_count: number;
  malfuzat_count: number;
  biographical_sources: string[];
  historical_sources: string[];
  verification_status: 'VERIFIED_HISTORICAL_FIGURE' | 'DOCUMENTED_IN_SOURCES' | 'RESEARCH_CANDIDATE';
  figure_bio: string;
}

// =========================================================================
// SECTION 26: FIGURE KNOWLEDGE UNIVERSE
// =========================================================================

export interface FigureKnowledgeUniverse {
  figure: AtlasBuzurgRecord;
  authenticated_works: Array<{ work_id: AmalWorkId; title: string; domains: AtlasTaxonomyDomain[] }>;
  attributed_works: Array<{ work_id: AmalWorkId; title: string; attribution_status: MasterAttributionStatus }>;
  disputed_works: Array<{ work_id: AmalWorkId; title: string; dispute_summary: string }>;
  misattributed_works: Array<{ work_id: AmalWorkId; title: string; actual_author: string }>;
  malfuzat: Array<{ malfuz_id: string; title: string; recorder: string; sessions_recorded: number }>;
  maktubat: Array<{ letter_id: string; recipient: string; subject: string }>;
  biographies: Array<{ title: string; author: string; period: string }>;
  tazkirah_mentions: string[];
  commentaries: string[];
  verified_translations: Array<{ language: AtlasLanguage; edition_ref: string }>;
  academic_studies: string[];
}

// =========================================================================
// SECTION 34 - 35: KARAMAT, DREAM & KASHF REPORTS
// =========================================================================

export interface AtlasKaramatReport {
  report_id: string;
  figure_id: AmalPersonId;
  figure_name: string;
  event_description: string;
  source_work_id: AmalWorkId;
  source_title: string;
  reporting_author: string;
  historical_period: string;
  scholarly_assessment: string;
  historical_status: 'REPORTED' | 'TRADITIONALLY_RELATED' | 'HISTORICALLY_UNCERTAIN' | 'DISPUTED' | 'UNVERIFIED';
  mandated_disclaimer: string; // "This is reported in..."
}

export interface AtlasDreamKashfReport {
  report_id: string;
  report_type: 'DREAM_REPORT' | 'KASHF_REPORT' | 'SPIRITUAL_EXPERIENCE_REPORT';
  figure_id: AmalPersonId;
  experience_summary: string;
  source_work_id: AmalWorkId;
  context: string;
  interpretation_status: 'REPORTED_EXPERIENCE_NOT_DIVINE_LEGISLATION';
}

// =========================================================================
// SECTION 36 - 37: SPIRITUAL PRACTICE REGISTRY
// =========================================================================

export type AtlasSpiritualPracticeClassification =
  | 'QURANIC_PRACTICE'
  | 'PROPHETIC_PRACTICE'
  | 'SCHOLARLY_RECOMMENDATION'
  | 'SPIRITUAL_TRADITION_PRACTICE'
  | 'AUTHOR_RECOMMENDATION'
  | 'GENERAL_REFLECTION'
  | 'USER_CREATED';

export interface AtlasSpiritualPracticeRecord {
  practice_id: AmalPracticeId;
  name: string;
  description: string;
  source_work_id?: AmalWorkId;
  author_name: string;
  tradition: string;
  silsila?: string;
  classification: AtlasSpiritualPracticeClassification;
  conditions: string[];
  historical_context: string;
  non_equating_disclaimer: string;
  safety_warnings?: string[];
  scholarly_review_level: MasterScholarReviewLevel;
  status: 'APPROVED' | 'IN_REVIEW' | 'RESEARCH_ONLY';
}

// =========================================================================
// SECTION 38 - 39: TAZKIYAH CONCEPT ENGINE WITH HISTORICAL EVOLUTION
// =========================================================================

export type ClassicalTazkiyahConceptTerm =
  | 'NAFS'
  | 'QALB'
  | 'RUH'
  | 'IKHLAS'
  | 'SABR'
  | 'SHUKR'
  | 'TAWAKKUL'
  | 'TAWBAH'
  | 'ZUHD'
  | 'MUHASABAH'
  | 'MUJAHADAH'
  | 'MURAQABAH'
  | 'ADAB'
  | 'MAHABBAH'
  | 'KHUSHU'
  | 'YAQIN'
  | 'RIDHA'
  | 'SIDQ'
  | 'FANA'
  | 'BAQA'
  | 'MAQAM'
  | 'HAL'
  | 'SULUK';

export interface TazkiyahConceptHistoricalEvolution {
  term: ClassicalTazkiyahConceptTerm;
  arabic_term: string;
  classical_definition: string;
  quranic_basis: string[];
  prophetic_evidence: string[];
  early_ascetic_usage: string; // e.g. Hasan al-Basri / Muhasibi
  classical_tasawwuf_treatment: string; // e.g. Qushayri / Ghazali
  later_commentary_evolution: string; // e.g. Zarruq / Ibn Ajiba / Ahmad Raza Khan
  author_specific_nuances: Array<{ author: string; nuance: string; source_work: string }>;
}

// =========================================================================
// SECTION 48: QUOTE VERIFICATION PIPELINE RESULT
// =========================================================================

export type QuoteVerificationPipelineResult =
  | 'FOUND_IN_PRIMARY_SOURCE'
  | 'FOUND_WITH_VARIANT'
  | 'SECONDARY_SOURCE_ONLY'
  | 'TRADITIONAL_ATTRIBUTION'
  | 'DISPUTED'
  | 'MISATTRIBUTED'
  | 'UNVERIFIED';

export interface QuoteVerificationAudit {
  quote_id: AmalQuoteId;
  quote_text: string;
  attributed_figure: string;
  pipeline_result: QuoteVerificationPipelineResult;
  source_work?: { work_id: AmalWorkId; title: string; author: string };
  edition_ref?: string;
  passage_ref?: string;
  variant_notes?: string;
  scholar_certified: boolean;
}

// =========================================================================
// SECTION 65 - 66: SPIRITUAL AI AGENT RESPONSE CONTRACT
// =========================================================================

export interface SpiritualAIResponseContract {
  summary: string;
  source: {
    book_title: string;
    edition_details: string;
    passage_locator: string;
    epistemic_layer: EpistemicLayer;
  };
  attribution: {
    status: MasterAttributionStatus;
    details: string;
  };
  tradition: {
    historical_context: string;
    associated_silsila?: string;
  };
  related_evidence: {
    quran_ayahs?: string[];
    hadith_citations?: string[];
    independent_relevance_notes: string;
  };
  scholarly_context: {
    consensus_or_disagreement: string;
    school_differences?: string[];
  };
  practical_reflection: {
    labeled_as: 'PRACTICAL_REFLECTION_NON_LEGAL';
    reflection_text: string;
  };
  uncertainty: {
    what_amal_cannot_establish: string[];
  };
}

// =========================================================================
// SECTION 91: DEFINITION OF DONE FOR GHUNIYAT AL-TALIBIN
// =========================================================================

export interface GhuniyatAlTalibinStructuredResult {
  work_identity: {
    work_id: AmalWorkId;
    canonical_title: string;
    original_title: string;
    attributed_author: string;
    author_person_id: AmalPersonId;
  };
  epistemic_layers: EpistemicLayer[];
  historical_context: string;
  original_language: AtlasLanguage;
  primary_edition: {
    publisher: string;
    quality: string;
    rights: MasterRightsCategory;
  };
  verification_state: {
    identity_confirmed: boolean;
    attribution_state: MasterAttributionStatus;
    text_edition_verified: boolean;
    rights_cleared: boolean;
    scholar_review_status: string;
  };
  relevant_passages_summary: string[];
  cross_references: {
    quran_references_count: number;
    hadith_references_count: number;
    resolved_hadith_citations: string[];
  };
  tazkiyah_tasawwuf_classification: {
    domains: AtlasTaxonomyDomain[];
    tariqah_context: string;
  };
  related_buzurg: {
    person_id: AmalPersonId;
    name: string;
    role: string;
  };
  related_silsila: {
    silsila_id: AmalSilsilaId;
    name: string;
  };
  scholarly_disagreement_apparatus: {
    theological_and_fiqh_nuances: string[];
    differing_assessments: string[];
  };
}
