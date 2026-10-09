/**
 * AMAL OS — MASTER SOURCE CATALOGUE & ACQUISITION TYPES
 * 
 * Formal data models for the AMAL Universal Islamic Knowledge Source Catalogue,
 * defining editions, provenance, hashes, licensing, OCR QA criteria,
 * 20 top-level collections, source tiers (Tier 0-5), 18-stage status lifecycle,
 * and tiered scholarly review requirements (Class A-D).
 */

import type { KnowledgeDomain, KnowledgeAcquisitionWave } from './universal-knowledge.js';
import type { SunniSchool } from './madhhab-neutrality.js';
import type { ClaimSupportLevel } from './evidence.js';

export type AmalTopLevelCollection =
  | '01_PRIMARY_REVELATION'
  | '02_PROPHETIC_SOURCES'
  | '03_TAFSIR_QURANIC_SCHOLARSHIP'
  | '04_AQEEDAH'
  | '05_FIQH'
  | '06_USUL_AL_FIQH'
  | '07_FOUR_MADHHABS'
  | '08_SEERAH_SHAMAIL'
  | '09_AKHLAQ_ADAB'
  | '10_TASAWWUF_TAZKIYAH'
  | '11_ISLAMIC_HISTORY_CIVILIZATION'
  | '12_DUA_DHIKR_WORSHIP'
  | '13_CONTEMPORARY_SCHOLARSHIP'
  | '14_MODERN_FIQH_ISSUES'
  | '15_MUSLIM_FAMILY_LIFE'
  | '16_MUSLIM_WORK_BUSINESS'
  | '17_EDUCATION_PARENTING'
  | '18_HAJJ_UMRAH_RAMADAN'
  | '19_COMMUNITY_SERVICE'
  | '20_GENERAL_VERIFIED_KNOWLEDGE';

export type SourceTier =
  | 'TIER_0_PRIMARY_FOUNDATIONAL'
  | 'TIER_1_MAJOR_AUTHORITATIVE'
  | 'TIER_2_RECOGNIZED_SECONDARY'
  | 'TIER_3_CONTEMPORARY_SCHOLARLY'
  | 'TIER_4_REFERENCE_EDUCATIONAL'
  | 'TIER_5_RESEARCH_DISCOVERY_ONLY';

export type ReviewClassTier =
  | 'CLASS_A_EDITORIAL'
  | 'CLASS_B_SCHOLAR'
  | 'CLASS_C_SPECIALIST'
  | 'CLASS_D_CRITICAL_DUAL';

export type AcquisitionFormat =
  | 'XML_TEI'
  | 'JSON_CANONICAL'
  | 'VERIFIED_TEXT_CLEAN'
  | 'OCR_PROOFREAD_PDF';

export type VerifiedSourceStatus =
  | 'DISCOVERED'
  | 'ACQUISITION_PENDING'
  | 'ACQUIRED'
  | 'IDENTITY_VERIFIED'
  | 'PROVENANCE_VERIFIED'
  | 'LICENSE_VERIFIED'
  | 'TEXT_VERIFIED'
  | 'REFERENCE_VERIFIED'
  | 'CLASSIFIED'
  | 'EDITOR_REVIEWED'
  | 'SCHOLAR_REVIEWED'
  | 'APPROVED'
  | 'RELEASE_CANDIDATE'
  | 'PUBLISHED'
  | 'REVIEW_REQUIRED'
  | 'SUSPENDED'
  | 'QUARANTINED'
  | 'RETIRED';

export type CatalogueItemStatus =
  | 'PLANNED'
  | 'ACQUIRED'
  | 'NORMALIZED'
  | 'INDEXED'
  | 'CLAIMS_EXTRACTED'
  | 'SCHOLAR_VERIFIED'
  | 'PUBLISHED';

export interface SourceEditionMetadata {
  workTitleArabic: string;
  workTitleEnglish: string;
  authorArabic: string;
  authorEnglish: string;
  authorDeathAH: number;
  historicalPeriod: 'PROPHETIC' | 'EARLY_SALAF' | 'CLASSICAL_ERA' | 'LATE_CLASSICAL' | 'CONTEMPORARY';
  targetEdition: string;
  criticalEditorTahqiq: string;
  publisher: string;
  publicationCity: string;
  publicationYearAH?: number;
  publicationYearCE?: number;
  totalVolumes: number;
  isnadIncluded: boolean;
  standardNumberingSystem?: string;
}

export interface SourceAcquisitionProtocol {
  officialRepository: string;
  repositoryIdOrUrl: string;
  artifactFormat: AcquisitionFormat;
  expectedSha256: string;
  licenseClassification: 'PUBLIC_DOMAIN' | 'ACADEMIC_FAIR_USE' | 'DIRECT_LICENSED' | 'OPEN_DATA_CREATIVE_COMMONS';
  storageBucketUri: string;
  fileSizeBytesEstimate?: number;
}

export interface SourceVerificationRequirements {
  requiresOcrQa: boolean;
  ocrTargetConfidencePercent: number; // e.g. 99.8
  requiresBitwiseTextAudit: boolean;
  diacriticPolicy: 'PRESERVE_ORIGINAL_EXPOSE_STRIPPED_INDEX';
  referenceValidationRules: string[];
  duplicateConflictResolution: 'EXACT_MATCH_PREFER_CRITICAL_EDITION' | 'FLAG_FOR_EDITORIAL_TRIAGE';
}

export interface SourceScholarlyGovernance {
  reviewTier: ReviewClassTier;
  primaryDiscipline: KnowledgeDomain;
  associatedSchool?: SunniSchool | 'GENERAL_SUNNI';
  scholarlyTradition?: string; // e.g. 'Ahl al-Sunnah', 'Ash'ari', 'Maturidi', 'Athari', 'Razvi / Barelvi'
  isConsensusBaseline: boolean;
  hasSubstantiveIkhtilaf: boolean;
  minimumReviewerQualifications: string[];
  dualJuristRequired: boolean;
  assignedSpecialistJurists?: string[];
}

export interface MasterSourceCatalogueEntry {
  catalogId: string;
  domain: KnowledgeDomain;
  topLevelCollection: AmalTopLevelCollection;
  sourceTier: SourceTier;
  acquisitionWave: KnowledgeAcquisitionWave;
  priorityRank: number; // 1 (Highest / Core Pilot) to 5
  editionMetadata: SourceEditionMetadata;
  acquisitionProtocol: SourceAcquisitionProtocol;
  verificationRequirements: SourceVerificationRequirements;
  scholarlyGovernance: SourceScholarlyGovernance;
  status: CatalogueItemStatus;
  verifiedStatus: VerifiedSourceStatus;
  notes: string;
}

export interface ClaimLedgerRecord {
  claimId: string;
  claimText: string;
  sourcePassage: string;
  sourceId: string;
  author: string;
  work: string;
  edition: string;
  madhhab?: string;
  tradition?: string;
  supportLevel: ClaimSupportLevel;
  scholarlyStatus: 'CONSENSUS' | 'ACCEPTED_POSITION' | 'SECONDARY_VIEW' | 'ISOLATED_SHADHDH';
  reviewStatus: 'VERIFIED_CO_SIGNED' | 'UNDER_REVIEW' | 'FLAGGED';
  referenceVolumePage: string;
}

export interface ScholarlyConflictRecord {
  conflictId: string;
  issue: string;
  positionA: string;
  positionB: string;
  evidenceA: string[];
  evidenceB: string[];
  scholarsA: string[];
  scholarsB: string[];
  madhhabA: string;
  madhhabB: string;
  reasonForDifference: string;
  conditions: string[];
  scope: 'UNIVERSAL_WORSHIP' | 'COMMERCIAL' | 'FAMILY' | 'PERSONAL_ETHICS';
  status: 'RATIFIED_DIVERGENCE' | 'UNDER_INVESTIGATION';
}

export interface KnowledgeDebtReport {
  unreviewedSources: number;
  unverifiedReferences: number;
  unresolvedConflicts: number;
  licenseUnknownCount: number;
  ocrPendingCount: number;
  scholarReviewPendingCount: number;
  translationReviewPendingCount: number;
  citationFailures: number;
}

export interface KnowledgeCoverageDashboard {
  quranCoveragePercent: number;
  hadithCoveragePercent: number;
  tafsirCoveragePercent: number;
  hanafiCoveragePercent: number;
  malikiCoveragePercent: number;
  shafiiCoveragePercent: number;
  hanbaliCoveragePercent: number;
  aqeedahCoveragePercent: number;
  seerahCoveragePercent: number;
  akhlaqCoveragePercent: number;
  tasawwufCoveragePercent: number;
  contemporaryCoveragePercent: number;
}

export interface MasterCatalogueSummary {
  totalSources: number;
  pilotCorpusCount: number;
  domainBreakdown: Partial<Record<KnowledgeDomain, number>>;
  topLevelCollectionBreakdown: Partial<Record<AmalTopLevelCollection, number>>;
  sourceTierBreakdown: Record<SourceTier, number>;
  schoolBreakdown: Record<string, number>;
  reviewTierBreakdown: Record<ReviewClassTier, number>;
  acquisitionStatusCounts: Record<CatalogueItemStatus, number>;
  verifiedStatusCounts: Record<VerifiedSourceStatus, number>;
}
