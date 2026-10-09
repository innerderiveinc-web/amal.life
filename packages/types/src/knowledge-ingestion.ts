/**
 * AMAL OS — KNOWLEDGE INGESTION & SCHOLARLY REVIEW ENGINE TYPES
 * 
 * Data models for the 25-stage knowledge transformation pipeline:
 * Raw Source -> Artifact -> Structured Text -> Passages -> Claims ->
 * References -> Scholarly Review -> Dual Jurist -> Dispute -> Release.
 */

import type { KnowledgeDomain } from './universal-knowledge.js';
import type { SunniSchool } from './madhhab-neutrality.js';
import type { ClaimSupportLevel } from './evidence.js';
import type { ReviewClassTier, VerifiedSourceStatus, SourceTier } from './source-catalogue.js';

export type IntakeMethod =
  | 'UPLOAD'
  | 'AUTHORIZED_IMPORT'
  | 'LICENSED_REPOSITORY'
  | 'PUBLISHER_FEED'
  | 'MANUAL_REGISTRATION'
  | 'API_IMPORT'
  | 'ARCHIVE_IMPORT';

export type IngestionStage =
  | 'DISCOVERY'
  | 'ACQUISITION'
  | 'PRESERVATION'
  | 'IDENTITY_VERIFICATION'
  | 'PROVENANCE_VERIFICATION'
  | 'LICENSE_VERIFICATION'
  | 'ARTIFACT_INTEGRITY'
  | 'TEXT_EXTRACTION'
  | 'OCR_QA'
  | 'STRUCTURAL_PARSING'
  | 'EDITION_MAPPING'
  | 'PASSAGE_SEGMENTATION'
  | 'CLAIM_EXTRACTION'
  | 'REFERENCE_LINKING'
  | 'SCHOLARLY_CLASSIFICATION'
  | 'MADHHAB_MAPPING'
  | 'EDITORIAL_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'DISPUTE_REVIEW'
  | 'PUBLICATION_CHECK'
  | 'RELEASE_CANDIDATE'
  | 'BENCHMARK'
  | 'RELEASE_VALIDATION'
  | 'PUBLISHED';

export interface IngestionJob {
  ingestionJobId: string;
  sourceId: string;
  artifactId: string;
  submittedBy: string;
  submittedAt: string;
  acquisitionMethod: IntakeMethod;
  declaredMetadata: Record<string, any>;
  currentStage: IngestionStage;
  stageHistory: Array<{ stage: IngestionStage; timestamp: string; status: 'SUCCESS' | 'FAILED' | 'SKIPPED'; details?: string }>;
  isComplete: boolean;
  isBlocked: boolean;
  blockReason?: string;
}

export interface OriginalArtifact {
  artifactId: string;
  sourceId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  storageLocation: string;
  acquisitionTimestamp: string;
  acquisitionMethod: IntakeMethod;
  licenseRecordId: string;
  isImmutable: boolean;
  version: number;
}

export type IdentityStatus = 'IDENTITY_PENDING' | 'IDENTITY_CONFIRMED' | 'IDENTITY_PARTIAL' | 'IDENTITY_FAILED';

export interface SourceIdentityCheck {
  sourceId: string;
  status: IdentityStatus;
  authorVerified: boolean;
  titleVerified: boolean;
  editionVerified: boolean;
  publisherVerified: boolean;
  yearVerified: boolean;
  isbnMatch?: boolean;
  crossCheckCatalogName?: string;
  checkedAt: string;
  failureReason?: string;
}

export interface ProvenanceChainRecord {
  sourceId: string;
  originRepository: string;
  acquiredFrom: string;
  publisher: string;
  edition: string;
  artifactSha256: string;
  acquisitionDate: string;
  traceabilityLinks: {
    claimId?: string;
    passageId?: string;
    pageLocator?: string;
    editionId?: string;
    workId?: string;
    authorId?: string;
  };
  isComplete: boolean;
  status: 'PROVENANCE_VERIFIED' | 'PROVENANCE_INCOMPLETE';
}

export type LicenseVerificationStatus =
  | 'LICENSE_VERIFIED'
  | 'LICENSE_RESTRICTED'
  | 'LICENSE_PENDING'
  | 'LICENSE_UNKNOWN'
  | 'LICENSE_FAILED';

export interface LicenseVerificationRecord {
  sourceId: string;
  licenseType: 'PUBLIC_DOMAIN' | 'DIRECT_LICENSED' | 'OPEN_DATA_CREATIVE_COMMONS' | 'ACADEMIC_FAIR_USE' | 'UNRESOLVED';
  status: LicenseVerificationStatus;
  rights: {
    storage: boolean;
    display: boolean;
    redistribution: boolean;
    commercialUse: boolean;
    aiProcessing: boolean;
    translationRights: boolean;
    derivativeRights: boolean;
  };
  attributionRequired: boolean;
  attributionStatement?: string;
  expiryDate?: string;
  jurisdiction: string;
  verifiedAt: string;
}

export interface ExtractedDocumentSection {
  sectionId: string;
  documentId: string;
  sectionType: 'AUTHOR_TEXT' | 'TRANSLATOR_TEXT' | 'EDITOR_NOTE' | 'PUBLISHER_NOTE' | 'FOOTNOTE' | 'HEADING';
  title?: string;
  volumeNumber?: number;
  chapterNumber?: number;
  pageStart: number;
  pageEnd: number;
  rawText: string;
  normalizedText: string;
  language: string;
  ocrConfidence?: number;
}

export interface DetectedQuotation {
  quotationId: string;
  quotationType: 'QUOTES_QURAN' | 'CITES_HADITH' | 'SCHOLAR_QUOTE' | 'POETRY' | 'HISTORICAL_REPORT';
  matchedText: string;
  targetCanonicalRef: string; // e.g. "Quran 2:255" or "Sahih al-Bukhari 1"
  confidence: number;
  isVerified: boolean;
  linkedEntityId?: string;
}

export interface KnowledgePassage {
  passageId: string;
  sourceId: string;
  workId: string;
  editionId: string;
  volumeNumber: number;
  chapterNumber?: number;
  pageNumber: number;
  paragraphIndex: number;
  textArabic?: string;
  textEnglish?: string;
  language: string;
  textHash: string;
  contextBefore?: string;
  contextAfter?: string;
  sectionType: 'AUTHOR_TEXT' | 'TRANSLATOR_TEXT' | 'EDITOR_NOTE' | 'FOOTNOTE';
  quotations: DetectedQuotation[];
}

export type KnowledgeClaimType =
  | 'QURANIC_CLAIM'
  | 'HADITH_CLAIM'
  | 'FIQH_CLAIM'
  | 'AQEEDAH_CLAIM'
  | 'TAFSIR_CLAIM'
  | 'HISTORICAL_CLAIM'
  | 'SCHOLAR_STATEMENT'
  | 'CONSENSUS_CLAIM'
  | 'SPIRITUAL_CLAIM'
  | 'PRACTICAL_RECOMMENDATION'
  | 'GENERAL_FACT';

export interface ExtractedKnowledgeClaim {
  claimId: string;
  passageId: string;
  sourceId: string;
  claimText: string;
  claimType: KnowledgeClaimType;
  subject: string;
  predicate: string;
  object: string;
  supportLevel: ClaimSupportLevel;
  scholarlyStatus: 'CONSENSUS' | 'RELIED_UPON_POSITION' | 'SECONDARY_VIEW' | 'ISOLATED_SHADHDH';
  isAiGeneratedDraft: boolean;
  humanVerified: boolean;
}

export type ReferenceVerificationStatus =
  | 'VERIFIED'
  | 'PARTIAL'
  | 'MISMATCH'
  | 'NOT_FOUND'
  | 'UNSUPPORTED';

export interface ReferenceVerificationCheck {
  referenceId: string;
  claimId?: string;
  rawReferenceText: string;
  targetCanonicalRef: string;
  status: ReferenceVerificationStatus;
  checks: {
    sourceExists: boolean;
    workExists: boolean;
    editionExists: boolean;
    locatorExists: boolean;
    passageExists: boolean;
    textMatch: boolean;
    citationTargetMatch: boolean;
    claimSupport: boolean;
  };
  verifiedBy: 'AUTOMATED_DETERMINISTIC_CHECK' | 'SCHOLAR_REVIEW';
  verifiedAt: string;
  rejectionReason?: string;
}

export type ScholarReviewDecision =
  | 'APPROVE'
  | 'REJECT'
  | 'REQUEST_CORRECTION'
  | 'MARK_CONTESTED'
  | 'ADD_CONTEXT'
  | 'ADD_REFERENCE'
  | 'CHANGE_CLASSIFICATION'
  | 'ESCALATE';

export interface ScholarReviewRecord {
  reviewId: string;
  scholarId: string;
  scholarQualifications: string[];
  specialization: KnowledgeDomain;
  sourceId: string;
  passageId: string;
  claimId?: string;
  decision: ScholarReviewDecision;
  rationale: string;
  checks: {
    referencesChecked: boolean;
    madhhabChecked: boolean;
    traditionChecked: boolean;
    contextChecked: boolean;
    disagreementChecked: boolean;
  };
  secondReviewRequired: boolean;
  secondScholarId?: string;
  secondScholarDecision?: ScholarReviewDecision;
  secondScholarRationale?: string;
  timestamp: string;
}

export type DisputeResolutionStatus =
  | 'OPEN'
  | 'UNDER_REVIEW'
  | 'MULTIPLE_VALID_POSITIONS'
  | 'RESOLVED'
  | 'UNRESOLVED'
  | 'ESCALATED';

export interface ScholarlyDispute {
  disputeId: string;
  issue: string;
  claimId: string;
  positionA: string;
  positionB: string;
  scholarA: string;
  scholarB: string;
  madhhabA?: SunniSchool;
  madhhabB?: SunniSchool;
  sourcesA: string[];
  sourcesB: string[];
  rationaleA: string;
  rationaleB: string;
  conditions: string[];
  status: DisputeResolutionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IngestionQualityScorecard {
  sourceId: string;
  identityScorecard: { passed: boolean; status: IdentityStatus };
  provenanceScorecard: { passed: boolean; isComplete: boolean };
  licenseScorecard: { passed: boolean; status: LicenseVerificationStatus };
  textIntegrityScorecard: { passed: boolean; bitwiseMatched: boolean };
  referenceScorecard: { passed: boolean; verifiedPercent: number };
  claimScorecard: { totalClaims: number; unsupportedClaims: number; passed: boolean };
  reviewScorecard: { singleScholarApproved: boolean; dualScholarApproved: boolean; passed: boolean };
  overallPublicationGatePassed: boolean;
  hardBlocksTriggered: string[];
}

export interface KnowledgeObject {
  knowledgeId: string;
  sourceId: string;
  workId: string;
  editionId: string;
  passageId: string;
  claimId: string;
  domain: KnowledgeDomain;
  madhhab?: SunniSchool;
  scholarlyTradition?: string;
  epistemicStatus: string;
  supportLevel: ClaimSupportLevel;
  referenceStatus: ReferenceVerificationStatus;
  scholarReviewStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  publicationStatus: VerifiedSourceStatus;
  knowledgeVersion: string;
  releaseId: string;
}

export interface EmergencyRevocationRecord {
  revocationId: string;
  targetType: 'SOURCE' | 'CLAIM' | 'PASSAGE' | 'TRANSLATION' | 'RELEASE';
  targetId: string;
  reason: string;
  revokedBy: string;
  revokedAt: string;
  affectedDependencies: string[];
  cacheInvalidated: boolean;
}
