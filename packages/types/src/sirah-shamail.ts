/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY + PROPHETIC LIFE GRAPH
 * First-Class Knowledge Architecture Contracts, Types & Enums
 *
 * Epistemic Invariant:
 * QURAN ≠ HADITH ≠ TAFSIR ≠ FIQH ≠ AQEEDAH ≠ SIRAH ≠ SHAMAIL ≠ TAZKIYAH ≠ TASAWWUF
 * SIRAH ≠ SHAMA'IL ≠ TAZKIYAH ≠ TASAWWUF
 */

import { SunniSchool } from './madhhab-neutrality.js';
import { AmalWorkId, AmalPersonId, AmalEditionId, AmalArtifactId, AmalPassageId } from './universal-master-catalogue.js';

// =========================================================================
// SECTION 1: SOURCE TYPES & TAXONOMY
// =========================================================================

export type SirahSourceType =
  | 'SIRAH_CLASSICAL'
  | 'SIRAH_LATER'
  | 'SHAMAIL'
  | 'MAGHAZI'
  | 'DALAIL'
  | 'TABAQAT_RELATED'
  | 'HISTORICAL_CHRONICLE'
  | 'BIOGRAPHICAL_SOURCE'
  | 'HADITH_SOURCE'
  | 'QURAN_REFERENCE_SOURCE'
  | 'ACADEMIC_STUDY'
  | 'COMMENTARY'
  | 'TRANSLATION'
  | 'MANUSCRIPT';

export type SirahSourceTier =
  | 'TIER_A_PRIMARY_REVELATION' // Quran, Verified Hadith
  | 'TIER_B_EARLY_SIRAH'        // Ibn Ishaq, Musa b. Uqbah, Ma'mar, early Maghazi
  | 'TIER_C_LATER_CLASSICAL'    // Ibn Hisham, Ibn Sa'd, Tabari, Ibn Kathir, Shifa
  | 'TIER_D_MODERN_ACADEMIC'    // Critical editions, contemporary scholarly studies
  | 'TIER_E_POPULAR_EDUCATIONAL'; // Summaries, school texts

export type SirahLifecycleState =
  | 'CANDIDATE'
  | 'ACQUISITION_REVIEW'
  | 'RIGHTS_REVIEW'
  | 'INGESTED'
  | 'PARSED'
  | 'NORMALIZED'
  | 'STRUCTURED'
  | 'EVIDENCE_MAPPED'
  | 'EDITORIAL_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'BENCHMARKED'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'QUARANTINED'
  | 'BLOCKED'
  | 'WITHDRAWN'
  | 'SUPERSEDED';

export type SirahRightsStatus =
  | 'PUBLIC_DOMAIN_CONFIRMED'
  | 'OPEN_LICENSE'
  | 'LICENSED'
  | 'PERMISSION_GRANTED'
  | 'LIMITED_USE'
  | 'RESEARCH_ONLY'
  | 'METADATA_ONLY'
  | 'UNKNOWN'
  | 'RESTRICTED'
  | 'BLOCKED';

export interface SirahSourceRecord {
  source_id: string; // e.g. SIR-SRC-0000001
  work_id?: AmalWorkId;
  title_original: string;
  title_transliterated: string;
  title_normalized: string;
  author_name: string;
  author_death_hijri?: number;
  language: string;
  genre: 'SIRAH' | 'SHAMAIL' | 'MAGHAZI' | 'DALAIL' | 'TABAQAT';
  subgenre?: string;
  source_type: SirahSourceType;
  source_tier: SirahSourceTier;
  edition_title?: string;
  publisher?: string;
  editor?: string;
  volume_count?: number;
  manuscript_basis?: string;
  rights_status: SirahRightsStatus;
  lifecycle_state: SirahLifecycleState;
  scholarly_status: 'CANONICAL_REFERENCE' | 'STANDARD' | 'CRITICAL_EDITION' | 'SPECIALIST' | 'UNVERIFIED';
  created_at: string;
  updated_at: string;
  version: string;
}

// =========================================================================
// SECTION 2: PROPHETIC LIFE GRAPH NODES & EDGES
// =========================================================================

export type PropheticNodeType =
  | 'PROPHET'
  | 'LIFE_PERIOD'
  | 'LIFE_PHASE'
  | 'EVENT'
  | 'SUB_EVENT'
  | 'INCIDENT'
  | 'EXPEDITION'
  | 'BATTLE'
  | 'TREATY'
  | 'MIGRATION'
  | 'JOURNEY'
  | 'MEETING'
  | 'DELEGATION'
  | 'LETTER'
  | 'SERMON'
  | 'ADDRESS'
  | 'CONVERSION_EVENT'
  | 'PERSON'
  | 'COMPANION'
  | 'FAMILY_MEMBER'
  | 'TRIBE'
  | 'CLAN'
  | 'RULER'
  | 'HISTORICAL_ACTOR'
  | 'PLACE'
  | 'CITY'
  | 'REGION'
  | 'MOUNTAIN'
  | 'VALLEY'
  | 'WELL'
  | 'MOSQUE'
  | 'BATTLEFIELD'
  | 'ROUTE'
  | 'DATE'
  | 'QURAN_REFERENCE'
  | 'HADITH_REFERENCE'
  | 'SIRAH_PASSAGE'
  | 'SHAMAIL_PASSAGE'
  | 'CHARACTER_TRAIT'
  | 'LESSON'
  | 'AMAL_PRACTICE';

export type PropheticEdgeType =
  | 'LIVED_DURING'
  | 'OCCURRED_IN'
  | 'OCCURRED_ON'
  | 'PRECEDED'
  | 'FOLLOWED'
  | 'PART_OF'
  | 'SUB_EVENT_OF'
  | 'INVOLVED'
  | 'LED_BY'
  | 'PARTICIPATED_IN'
  | 'MET'
  | 'TRAVELED_TO'
  | 'TRAVELED_FROM'
  | 'LIVED_AT'
  | 'MARRIED'
  | 'RELATED_TO'
  | 'REFERRED_TO'
  | 'MENTIONED_IN'
  | 'REPORTED_IN'
  | 'NARRATED_IN'
  | 'SUPPORTED_BY'
  | 'QUALIFIED_BY'
  | 'CONTRADICTED_BY'
  | 'DIFFERS_FROM'
  | 'INTERPRETED_BY'
  | 'LOCATED_AT'
  | 'DATED_AS'
  | 'APPROXIMATED_AS'
  | 'CONNECTED_TO'
  | 'ILLUSTRATES'
  | 'MAY_INFORM'
  | 'MAY_SUPPORT';

export interface PropheticGraphNode {
  id: string;
  type: PropheticNodeType;
  label: string;
  arabic_label?: string;
  attributes: Record<string, unknown>;
}

export interface PropheticGraphEdge {
  from: string;
  to: string;
  type: PropheticEdgeType;
  metadata?: {
    source_id?: string;
    passage_id?: string;
    confidence_state?: SirahConfidenceState;
    scholarly_note?: string;
  };
}

// =========================================================================
// SECTION 3: EVENT & CHRONOLOGY MODELS
// =========================================================================

export type DatePrecision =
  | 'EXACT'
  | 'MONTH'
  | 'SEASON'
  | 'YEAR'
  | 'APPROXIMATE_YEAR'
  | 'PERIOD'
  | 'UNKNOWN'
  | 'DISPUTED';

export type SirahConfidenceState =
  | 'ESTABLISHED'        // Transmitted by tawatur or mutawatir hadith / clear Quran
  | 'STRONGLY_SUPPORTED' // Authentic Hadith with agreed-upon historical corroboration
  | 'SUPPORTED'          // Sound historical chains (sahih/hasan) or reliable early sirah consensus
  | 'REPORTED'           // Early sirah report (Ibn Ishaq, Waqidi, Ibn Sa'd) without independent hadith isnad
  | 'DISPUTED'           // Multiple classical sources record contradictory accounts
  | 'WEAKLY_SUPPORTED'   // Problematic transmission or known later interpolation
  | 'UNCERTAIN'          // Missing isnad or historical ambiguities
  | 'UNVERIFIED'         // Candidate record awaiting scholar peer review
  | 'REJECTED'           // Proven historical forgery or contradicted by Quran/Mutawatir
  | 'UNKNOWN';

export type PropheticLifePeriod =
  | 'PRE_PROPHETIC_EARLY_LIFE'  // Birth to Age 40 (570 - 610 CE)
  | 'MAKKAH_EARLY_DAWAH'        // Secret to Public call (Years 1-5 of Prophethood)
  | 'MAKKAH_PERSECUTION_BOYCOTT'// Years 5-10 of Prophethood (Habashah migrations, Shib Abi Talib)
  | 'MAKKAH_YEAR_OF_SORROW_ISRA'// Years 10-13 of Prophethood (Ta'if, Isra wal-Mi'raj, Aqabah)
  | 'THE_HIJRAH_MIGRATION'      // The Journey from Makkah to Yathrib
  | 'MADINAH_EARLY_COMMUNITY'   // 1-2 AH (Masjid, Brotherhood, Constitution of Madinah)
  | 'MADINAH_EXPEDITIONS_DEFENSE'// 2-5 AH (Badr, Uhud, Khandaq/Ahzab)
  | 'MADINAH_TREATY_EXPANSION'  // 6-8 AH (Hudaybiyyah, Khaybar, Letters to Kings, Mu'tah)
  | 'CONQUEST_AND_DELEGATIONS'  // 8-10 AH (Fath Makkah, Hunayn, Tabuk, Year of Delegations)
  | 'FAREWELL_PILGRIMAGE_AND_PASSING'; // 10-11 AH (Hajjat al-Wada, Passing, Ar-Rafiq al-A'la)

export interface SirahEventEvidenceItem {
  evidence_id: string;
  source_id: string;
  source_tier: SirahSourceTier;
  evidence_type: 'QURAN_AYAH' | 'HADITH_NARRATION' | 'EARLY_SIRAH' | 'LATER_SIRAH' | 'HISTORICAL_REPORT' | 'SCHOLARLY_COMMENTARY';
  reference: string; // e.g. "Surah Al-Ahzab 33:9-27" or "Sahih al-Bukhari #3998"
  passage_text_arabic?: string;
  passage_text_translation?: string;
  directness: 'DIRECT_HISTORICAL_RECORD' | 'INDIRECT_CORROBORATION' | 'CONTEXTUAL_BACKGROUND' | 'THEOLOGICAL_COMMENTARY';
  confidence_state: SirahConfidenceState;
  hadith_grading?: string; // e.g. "Sahih (Agreed Upon)", "Hasan"
  scholarly_note?: string;
}

export type SirahEventType =
  | 'REVELATION_CONTEXT'
  | 'DAWAH'
  | 'HIJRAH'
  | 'MEETING'
  | 'JOURNEY'
  | 'TREATY'
  | 'DELEGATION'
  | 'BATTLE'
  | 'EXPEDITION'
  | 'FAMILY_EVENT'
  | 'COMMUNITY_EVENT'
  | 'SERMON'
  | 'LETTER'
  | 'CONVERSION_EVENT'
  | 'OTHER'
  | 'REVELATION'
  | 'MIGRATION'
  | 'SOCIAL_EVENT'
  | 'PASSING'
  | 'GENERAL';

export interface SirahEventRecord {
  event_id: string; // e.g. SIR-EVT-0000001
  canonical_title: string;
  arabic_title: string;
  alternate_titles: string[];
  event_type: SirahEventType;
  life_period: PropheticLifePeriod;
  description_neutral: string;
  start_hijri_year?: number;
  start_hijri_month?: number;
  start_gregorian_year?: number;
  date_precision: DatePrecision;
  chronology_status: 'CANONICAL_CONSENSUS' | 'ACCEPTED_STANDARD' | 'DISPUTED_MONTH' | 'DISPUTED_YEAR' | 'UNCERTAIN';
  chronology_notes?: string;
  location_name: string;
  location_coordinates?: { lat: number; lng: number };
  location_certainty: 'ESTABLISHED' | 'TRADITIONALLY_IDENTIFIED' | 'PROBABLE' | 'DISPUTED' | 'UNKNOWN';
  key_participants: string[];
  evidence_items: SirahEventEvidenceItem[];
  variant_reports: string[]; // IDs of SirahReportVariantRecord
  quran_cross_references: string[]; // e.g. "33:9", "48:1"
  hadith_cross_references: string[];
  lessons: string[];
  related_shamail_traits: string[];
  related_amal_practices: string[];
  review_status: 'DRAFT' | 'SCHOLAR_REVIEW' | 'VERIFIED_PUBLISHED';
}

// =========================================================================
// SECTION 4: REPORT VARIATION ENGINE
// =========================================================================

export type ReportDifferenceType =
  | 'DATE'
  | 'LOCATION'
  | 'PARTICIPANT'
  | 'SEQUENCE'
  | 'NUMBER'
  | 'WORDING'
  | 'CAUSE'
  | 'OUTCOME'
  | 'IDENTITY'
  | 'ATTRIBUTION';

export type ReportResolutionStatus =
  | 'COMPATIBLE_HARMONIZED'     // Reports reconcile when read in context (Jam' bayna al-riwayat)
  | 'PARTIALLY_COMPATIBLE'      // Minor discrepancy in numbers/timing, core agreed
  | 'REQUIRES_CONTEXT'          // Differing eyewitness perspectives
  | 'GENUINELY_DISPUTED'        // Fundamental scholarly difference preserved without forced harmonization
  | 'UNRESOLVED'                // Insufficient historical evidence to resolve
  | 'WEAKER_REPORT_ISOLATED';   // One report is preferred (Tarjih) based on muhaddithin isnad rules

export interface SirahReportVariantRecord {
  variant_id: string; // e.g. SIR-VAR-0000001
  event_id: string;
  difference_type: ReportDifferenceType;
  difference_summary: string;
  report_a: {
    source_title: string;
    narrator_or_author: string;
    claim: string;
    citation: string;
  };
  report_b: {
    source_title: string;
    narrator_or_author: string;
    claim: string;
    citation: string;
  };
  scholarly_assessment: string;
  resolution_status: ReportResolutionStatus;
  compatibility_notes: string;
}

// =========================================================================
// SECTION 5: SHAMA'IL KNOWLEDGE MODEL
// =========================================================================

export type ShamailCategory =
  | 'APPEARANCE'
  | 'PHYSICAL_DESCRIPTION'
  | 'DRESS'
  | 'VOICE'
  | 'SPEECH'
  | 'MOVEMENT'
  | 'FOOD'
  | 'DRINK'
  | 'SLEEP'
  | 'WORSHIP'
  | 'MANNERS'
  | 'CHARACTER'
  | 'COMPASSION'
  | 'GENEROSITY'
  | 'HUMILITY'
  | 'COURAGE'
  | 'PATIENCE'
  | 'JUSTICE'
  | 'FAMILY_INTERACTION'
  | 'SOCIAL_INTERACTION'
  | 'DRESS_AND_CLOTHING'
  | 'BEARING_AND_GAIT'
  | 'SPEECH_AND_ELOQUENCE'
  | 'FOOD_AND_DRINK'
  | 'SLEEP_AND_REST'
  | 'WORSHIP_AND_NIGHT_DEVOTION'
  | 'PERSONAL_HYGIENE_AND_GROOMING'
  | 'INTERPERSONAL_WARMTH_AND_SMILE'
  | 'HUMILITY_AND_SIMPLICITY'
  | 'COURAGE_AND_STEADFASTNESS'
  | 'MERCY_AND_COMPASSION'
  | 'GENEROSITY_AND_DETACHMENT'
  | 'PATIENCE_AND_FORBEARANCE'
  | 'JUSTICE_AND_EQUITY'
  | 'FAMILY_AND_HOUSEHOLD_MANNERS';

export interface ShamailReportRecord {
  report_id: string; // e.g. SHM-RPT-0000001
  category: ShamailCategory;
  primary_narrator: string; // e.g. "Ali ibn Abi Talib", "Anas ibn Malik", "Hind ibn Abi Halah", "Umm Ma'bad"
  primary_source_work: string; // e.g. "Al-Shama'il al-Muhammadiyyah by Imam al-Tirmidhi"
  hadith_number_in_work?: number;
  arabic_matn: string;
  english_translation: string;
  urdu_translation?: string;
  source_hadith_ref?: string; // e.g. "Jami` at-Tirmidhi #3637"
  hadith_grading: 'SAHIH' | 'HASAN' | 'HASAN_SAHIH' | 'DAIF' | 'SCHOLARS_DISCUSS';
  grading_authority: string; // e.g. "Imam al-Tirmidhi", "Ibn Hajar al-Asqalani"
  theological_notes?: string;
  practical_adab_lesson: string;
  epistemic_classification: 'HADITH_REPORT_SHAMAIL';
}

// =========================================================================
// SECTION 6: CLAIM LEDGER & QUALITATIVE CERTAINTY
// =========================================================================

export type SirahClaimClass =
  | 'DIRECTLY_EVIDENCED'
  | 'SUPPORTED_HISTORICAL_REPORT'
  | 'SCHOLARLY_INTERPRETATION'
  | 'CHRONOLOGICAL_INFERENCE'
  | 'CROSS_SOURCE_SYNTHESIS'
  | 'UNRESOLVED'
  | 'DISPUTED'
  | 'UNKNOWN';

export interface SirahClaimRecord {
  claim_id: string; // e.g. SIR-CLM-0000001
  claim_text: string;
  claim_class: SirahClaimClass;
  event_ids: string[];
  source_ids: string[];
  citations: string[];
  confidence_state: SirahConfidenceState;
  scholarly_status: 'ACCEPTED_CANON' | 'DISCUSSED_BY_HISTORIANS' | 'REJECTED_BY_MUHADDITHIN' | 'UNREVIEWED';
  review_status: 'PENDING' | 'APPROVED' | 'DISPUTED';
  reviewer?: string;
  created_at: string;
  version: string;
}

// =========================================================================
// SECTION 7: PRACTICAL AMAL MAPPING GOVERNANCE
// =========================================================================

export type SirahPracticeCategory =
  | 'QURANIC_PRACTICE'
  | 'PROPHETIC_SUNNAH'
  | 'SCHOLARLY_RECOMMENDATION'
  | 'EDUCATIONAL_CONTEMPLATION'
  | 'BEHAVIORAL_EXERCISE'
  | 'USER_CREATED_REFLECTION';

export interface SirahAmalMappingRecord {
  mapping_id: string;
  event_id: string;
  derived_lesson: string;
  practice_title: string;
  practice_category: SirahPracticeCategory;
  classical_grounding: string;
  non_invented_obligation_disclaimer: string;
  actionable_step: string;
}

// =========================================================================
// SECTION 8: GOVERNED AI ANSWER INTERNAL CONTRACT
// =========================================================================

export interface SirahAIAnswerContract {
  answer: string;
  claims: Array<{
    claim_text: string;
    claim_class: SirahClaimClass;
    confidence_state: SirahConfidenceState;
    source: string;
  }>;
  evidence: Array<{
    type: string;
    reference: string;
    arabic_text?: string;
    translation?: string;
    grading?: string;
  }>;
  sources: Array<{
    title: string;
    author: string;
    tier: SirahSourceTier;
  }>;
  uncertainties: string[];
  disagreements: Array<{
    topic: string;
    position_a: string;
    position_b: string;
    status: ReportResolutionStatus;
  }>;
  interpretations: string[];
  practical_relevance: string[];
  amal_suggestions: Array<{
    title: string;
    category: SirahPracticeCategory;
    disclaimer: string;
  }>;
  epistemic_boundary_declaration: string;
  scholar_escalation_required: boolean;
}

export type SirahAnswer = SirahAIAnswerContract;

// =========================================================================
// SECTION 9: API RESPONSE PAYLOADS & EXPLORER DTOS
// =========================================================================

export interface PropheticLifeExplorerView {
  period: PropheticLifePeriod;
  title: string;
  approximate_years: string;
  summary: string;
  events: SirahEventRecord[];
  quranic_milestones: Array<{ surah: string; verses: string; context: string }>;
  shamail_focus: ShamailReportRecord[];
}

export interface SirahTimelineQueryResponse {
  total_events: number;
  period_breakdown: Record<PropheticLifePeriod, number>;
  events: SirahEventRecord[];
}

export interface SirahFeatureFlags {
  SIRAH_ENABLED: boolean;
  SIRAH_INGESTION_ENABLED: boolean;
  SIRAH_RETRIEVAL_ENABLED: boolean;
  SIRAH_AI_ENABLED: boolean;
  SIRAH_AMAL_MAPPING_ENABLED: boolean;
  SIRAH_TIMELINE_EXPLORER_ENABLED: boolean;
  SIRAH_SHAMAIL_EXPLORER_ENABLED: boolean;
  SIRAH_VARIANT_DIFF_ENABLED: boolean;
  SIRAH_SCHOLAR_WORKFLOW_ENABLED: boolean;
  SIRAH_AUDIT_LOGGING_STRICT: boolean;
}
