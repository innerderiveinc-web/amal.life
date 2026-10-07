// ==============================================================================
// AMAL OS — MASTER KNOWLEDGE INTEGRITY, AUTHENTICITY & ZERO FABRICATION CONTRACTS
// ==============================================================================

export type VerificationLevel =
  | 'LEVEL_0_UNKNOWN'
  | 'LEVEL_1_CANDIDATE'
  | 'LEVEL_2_SOURCE_IDENTIFIED'
  | 'LEVEL_3_REFERENCE_VERIFIED'
  | 'LEVEL_4_PROVENANCE_ATTRIBUTION_VERIFIED'
  | 'LEVEL_5_EDITORIALLY_APPROVED'
  | 'LEVEL_6_SCHOLAR_REVIEWED'
  | 'LEVEL_7_PRODUCTION_PUBLISHED';

export type KnowledgeIngestionState =
  | 'DISCOVERED'
  | 'LICENSE_CHECK'
  | 'ACQUIRED'
  | 'PARSED'
  | 'NORMALIZED'
  | 'VALIDATED'
  | 'EDITOR_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'APPROVED'
  | 'INDEXED'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'QUARANTINED'
  | 'ARCHIVED';

export type AuthorityPrimaryStatus = 'VERIFIED' | 'SECONDARY' | 'UNVERIFIED';
export type AuthorityProvenanceStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';
export type AuthorityReferenceStatus = 'VERIFIED' | 'UNVERIFIED' | 'FAILED';
export type AuthorityAttributionStatus = 'VERIFIED' | 'UNVERIFIED' | 'DISPUTED';
export type AuthorityLicenseStatus = 'APPROVED' | 'PUBLIC_DOMAIN' | 'RESTRICTED' | 'UNKNOWN' | 'EXPIRED';
export type AuthorityEditorialStatus = 'APPROVED' | 'PENDING' | 'REJECTED';
export type AuthorityScholarReviewStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'NOT_REQUIRED';
export type AuthorityContextStatus = 'VERIFIED' | 'PENDING' | 'FLAGGED';
export type AuthorityPublicationStatus = 'PUBLISHED' | 'CANDIDATE' | 'QUARANTINED' | 'ARCHIVED';

export interface SourceAuthorityDimensions {
  sourceType: string;
  primaryStatus: AuthorityPrimaryStatus;
  provenanceStatus: AuthorityProvenanceStatus;
  referenceStatus: AuthorityReferenceStatus;
  attributionStatus: AuthorityAttributionStatus;
  licenseStatus: AuthorityLicenseStatus;
  editorialStatus: AuthorityEditorialStatus;
  scholarReviewStatus: AuthorityScholarReviewStatus;
  contextStatus: AuthorityContextStatus;
  publicationStatus: AuthorityPublicationStatus;
}

export type EpistemicDomain =
  | 'ISLAMIC_EVIDENCE'
  | 'SCHOLARLY_INTERPRETATION'
  | 'AMAL_RECOMMENDATION'
  | 'GENERAL_PRACTICAL_SUGGESTION'
  | 'BEHAVIORAL_SCIENCE'
  | 'PRODUCT_DESIGN'
  | 'USER_PREFERENCE';

export type KnowledgeConflictType =
  | 'SOURCE_CONFLICT'
  | 'SCHOLARLY_DISAGREEMENT'
  | 'REFERENCE_CONFLICT'
  | 'ATTRIBUTION_CONFLICT';

export type InsufficientEvidenceReason =
  | 'NO_VERIFIED_EVIDENCE'
  | 'UNCONFIRMED_ATTRIBUTION'
  | 'SCHOLARLY_DISAGREEMENT_NO_CONSENSUS'
  | 'MISSING_PROVENANCE'
  | 'QUARANTINED_SOURCE'
  | 'UNLICENSED_SOURCE'
  | 'UNSUPPORTED_CLAIM';

export interface InsufficientEvidenceFallback {
  reason: InsufficientEvidenceReason;
  approvedMessage: string;
  requiresScholarEscalation: boolean;
}

export interface KnowledgeVerificationMatrixItem {
  knowledgeId: string;
  knowledgeType: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_POSITION' | 'CONCEPT';
  source: string;
  work: string;
  edition: string;
  reference: string;
  artifactHash: string;
  license: string;
  attribution: string;
  context: string;
  editorReview: 'APPROVED' | 'PENDING' | 'REJECTED';
  scholarReview: 'APPROVED' | 'PENDING' | 'NOT_REQUIRED';
  approval: 'APPROVED' | 'REJECTED' | 'QUARANTINED';
  publication: 'PUBLISHED' | 'RESEARCH_ONLY' | 'QUARANTINED';
  knowledgeVersion: string;
  lastVerified: string;
  verificationNotes: string;
  verificationLevel: VerificationLevel;
}

export interface PreProductionKnowledgeHealthReport {
  totalKnowledgeItems: number;
  totalVerified: number;
  totalScholarReviewed: number;
  totalPublished: number;
  totalQuarantined: number;
  totalUnverified: number;
  totalConflicted: number;
  totalLicenseIssues: number;
  totalCitationIssues: number;
  totalAttributionIssues: number;
  knowledgeIntegrity: 'PASS' | 'FAIL';
  zeroFabricationVerified: boolean;
  timestamp: string;
}

export interface KnowledgeIncident {
  id: string;
  reportedAt: string;
  contentId: string;
  disputeType: KnowledgeConflictType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status:
    | 'REPORTED'
    | 'TRIAGED'
    | 'FROZEN'
    | 'INVESTIGATING'
    | 'SCOPED'
    | 'QUARANTINED'
    | 'ROLLED_BACK'
    | 'RE_INDEXED'
    | 'RE_TESTED'
    | 'CLOSED';
  freezeApplied: boolean;
  resolutionNotes?: string;
  postmortemUrl?: string;
}
