/**
 * AMAL OS — Universal Sunni Knowledge Publication & Verification Types
 * Covers the 35 Sections of the Master Specification:
 * Multi-Tradition Domains, Multi-Dimensional Verification Profiles, Four-Madhhab Lineages,
 * Disagreement Engine, User Deen Profiles, Presentation Modes, Source Cards, and Hard Blocks.
 */

import { Madhhab } from './user.js';
import { SunniSchool, EpistemicCategory } from './madhhab-neutrality.js';

export type KnowledgeDomain =
  | 'QURAN'
  | 'HADITH'
  | 'TAFSIR'
  | 'FIQH'
  | 'USUL_AL_FIQH'
  | 'AQEEDAH'
  | 'SEERAH'
  | 'SHAMAIL'
  | 'AKHLAQ'
  | 'ADAB'
  | 'TASAWWUF'
  | 'PRACTICAL_LIFE'
  | 'GENERAL_KNOWLEDGE';

export type KnowledgeAcquisitionWave =
  | 'WAVE_1_PRIMARY'
  | 'WAVE_2_FOUNDATIONAL_SCHOLARSHIP'
  | 'WAVE_3_FOUR_MADHHABS'
  | 'WAVE_4_SPIRITUAL_ETHICAL_TRADITIONS'
  | 'WAVE_5_CONTEMPORARY_SCHOLARSHIP'
  | 'WAVE_6_PRACTICAL_MUSLIM_LIFE'
  | 'WAVE_7_GENERAL_VERIFIED_KNOWLEDGE';

export type DisagreementType =
  | 'NO_MATERIAL_DISAGREEMENT'
  | 'MINOR_DIFFERENCE'
  | 'MEANINGFUL_FIQH_DIFFERENCE'
  | 'INTERPRETIVE_DIFFERENCE'
  | 'HADITH_GRADING_DIFFERENCE'
  | 'HISTORICAL_DIFFERENCE'
  | 'SCHOLARLY_CONTESTATION'
  | 'UNRESOLVED';

export type PublicationBadge =
  | 'SOURCE_IDENTITY_VERIFIED'
  | 'REFERENCE_VERIFIED'
  | 'SCHOLAR_REVIEWED'
  | 'LICENSE_VERIFIED'
  | 'PRODUCTION_PUBLISHED'
  | 'POSITION_SPECIFIC'
  | 'CONTESTED'
  | 'MULTIPLE_SCHOLARLY_VIEWS'
  | 'SCHOLAR_REQUIRED';

export interface SourceVerificationProfile {
  sourceIdentity: 'VERIFIED' | 'UNVERIFIED';
  provenanceStatus: 'TRACEABLE' | 'MISSING';
  primaryStatus: boolean; // Revelation or Primary Hadith collection
  scholarlyRecognition: 'ESTABLISHED_CONSENSUS' | 'ACCEPTED_CANON' | 'SPECIALIST_WORK' | 'UNDER_REVIEW';
  textIntegrity: 'BITWISE_VERIFIED' | 'ERRATA_FLAGGED' | 'COMPROMISED';
  referenceIntegrity: 'EXACT_VOLUME_PAGE' | 'APPROXIMATE' | 'UNVERIFIED';
  editionIntegrity: 'CRITICAL_EDITION' | 'STANDARD_PRINT' | 'UNKNOWN';
  translationIntegrity?: 'ACCREDITED_TRANSLATION' | 'UNVERIFIED_TRANSLATION';
  licenseStatus: 'PUBLIC_DOMAIN' | 'LICENSED' | 'FAIR_USE' | 'UNRESOLVED';
  editorialStatus: 'EDITED' | 'DRAFT' | 'REJECTED';
  scholarlyReviewStatus: 'TWO_SCHOLAR_APPROVED' | 'SINGLE_SCHOLAR' | 'PENDING';
  publicationStatus: 'PUBLISHED' | 'QUARANTINED' | 'RESEARCH_ONLY' | 'SUSPENDED';
}

export interface UniversalSourceClassification {
  sourceId: string;
  title: string;
  author: string;
  sourceDomain: KnowledgeDomain;
  sourceType: 'REVELATION' | 'CANONICAL_HADITH' | 'CLASSICAL_SCHOLARLY_WORK' | 'CONTEMPORARY_ACADEMIC' | 'GENERAL_PRACTICAL';
  historicalPeriod: 'PROPHETIC' | 'EARLY_SALAF' | 'CLASSICAL_ERA' | 'LATE_CLASSICAL' | 'CONTEMPORARY';
  language: string;
  madhhab?: SunniSchool;
  scholarlyTradition?: string; // e.g. Ash'ari, Maturidi, Athari, Ahl al-Hadith, Tazkiyah
  workType: 'TEXT' | 'COMMENTARY' | 'LEGAL_MANUAL' | 'USUL' | 'ENCYCLOPEDIA' | 'MONOGRAPH';
  epistemicStatus: EpistemicCategory;
  reviewClass: 'STANDARD' | 'HIGH_RISK' | 'CRITICAL';
  acquisitionWave: KnowledgeAcquisitionWave;
}

export interface SourceLineageNode {
  author: string;
  work: string;
  edition: string;
  commentary?: string;
  scholarlyPosition: string;
  issue: string;
  evidenceRefs: string[];
  practicalApplication: string;
}

export interface SourceToClaimRecord {
  claimId: string;
  statement: string;
  passageRef: string;
  workTitle: string;
  editionDetails: string;
  author: string;
  scholarlyCategory: KnowledgeDomain;
  madhhabOrTradition: string;
  referenceVolumePage: string;
  verificationHash: string;
  twoScholarReviewHash: string;
}

export interface UniversalScholarlyDisagreement {
  disagreementId: string;
  issue: string;
  disagreementType: DisagreementType;
  positions: Array<{
    madhhabOrTradition: string;
    scholar: string;
    positionSummary: string;
    primaryEvidence: string[];
    conditions: string[];
    classicalReferences: string[];
  }>;
  reasonForDifference: string; // e.g. "Interpretation of Quranic imperative vs linguistic custom"
  scope: 'UNIVERSAL_WORSHIP' | 'COMMERCIAL' | 'FAMILY' | 'PERSONAL_ETHICS';
  reviewStatus: 'GOVERNED_RATIFIED' | 'UNDER_REVIEW';
}

export interface UserDeenProfile {
  userId: string;
  madhhabPreference: Madhhab | 'GENERAL_SUNNI';
  scholarlyTraditionPreference?: string;
  preferredScholars: string[];
  preferredTafsir: string[];
  preferredQuranTranslation: string;
  preferredHadithResources: string[];
  preferredSpiritualLiterature: string[];
  preferredLanguage: string;
  preferredDepth: 'BEGINNER_SIMPLE' | 'PRACTICING' | 'ADVANCED_STUDENT';
  showMadhhabComparison: boolean;
  showDisagreement: boolean;
}

export interface SourceCard {
  sourceId: string;
  author: string;
  work: string;
  edition: string;
  domain?: KnowledgeDomain;
  acquisitionWave?: KnowledgeAcquisitionWave;
  language: string;
  madhhab?: string;
  scholarlyTradition?: string;
  historicalPeriod: string;
  publisher: string;
  reference: string;
  license: string;
  verificationProfile: SourceVerificationProfile;
  badges: PublicationBadge[];
  version: string;
  lastReviewDate: string;
  provenanceChain: string[];
}

export interface StructuredAnswerResponse {
  question: string;
  presentationMode: 'NEUTRAL_SUNNI_MODE' | 'USER_PREFERRED_MODE';
  directAnswer: string;
  yourPreferredView?: {
    schoolOrTradition: string;
    ruling: string;
    evidence: string[];
    references: string[];
  };
  evidenceSummary: string[];
  otherRecognizedViews: Array<{
    schoolOrTradition: string;
    ruling: string;
    summary: string;
    references: string[];
  }>;
  whyDifferenceExists?: string;
  practicalGuidance: string;
  scholarEscalationRequired: boolean;
  sourceCards: SourceCard[];
  epistemicAuditTrail: string;
}

export interface UniversalBenchmarkMetrics {
  totalEvaluatedItems: number;
  citationAccuracyRate: number; // e.g. 0.995 (99.5%)
  sourceIdentityAccuracyRate: number; // 1.0 (100%)
  positionAttributionAccuracyRate: number; // 1.0 (100%)
  madhhabAttributionAccuracyRate: number; // 1.0 (100%)
  unsupportedClaimRate: number; // 0.0 (0 tolerated)
  hallucinationRate: number; // 0.0 (0 tolerated)
  disagreementPreservationRate: number; // 1.0 (100%)
  scholarEscalationPrecision: number; // 0.98 (98%)
  passedHardBlocks: boolean;
}
