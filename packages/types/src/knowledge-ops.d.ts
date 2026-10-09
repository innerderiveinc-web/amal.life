export type OpsSourceType = 'QURAN' | 'HADITH' | 'TAFSIR' | 'FIQH' | 'AQEEDAH' | 'SEERAH' | 'SCHOLARLY_WORK' | 'EDUCATIONAL' | 'REFERENCE';
export type LicenseStatus = 'VERIFIED' | 'RESTRICTED' | 'UNKNOWN' | 'EXPIRED';
export type ProvenanceStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';
export type ReviewStatus = 'DRAFT' | 'TECHNICAL_VALIDATION' | 'EDITORIAL_REVIEW' | 'SCHOLAR_REVIEW' | 'APPROVED' | 'REJECTED';
export type PublicationStatus = 'DRAFT' | 'CANDIDATE' | 'PUBLISHED' | 'RETIRED' | 'QUARANTINED';
export interface SourceRegistryRecord {
    id: string;
    sourceId: string;
    title: string;
    author?: string;
    sourceType: OpsSourceType;
    originalLanguage?: string;
    publisher?: string;
    edition?: string;
    publicationYear?: number;
    licenseStatus: LicenseStatus;
    provenanceStatus: ProvenanceStatus;
    reviewStatus: ReviewStatus;
    publicationStatus: PublicationStatus;
    digitalArtifactHash: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}
export interface QuranAyahRecord {
    id: string;
    surahNumber: number;
    ayahNumber: number;
    arabicText: string;
    normalizedSearchText: string;
    canonicalVersion: string;
    contentHash: string;
    status: 'APPROVED' | 'REVIEW' | 'RETIRED';
}
export interface QuranTranslationRecord {
    id: string;
    ayahId: string;
    surahNumber: number;
    ayahNumber: number;
    translator: string;
    language: string;
    translationText: string;
    publisher?: string;
    edition?: string;
    licenseStatus: LicenseStatus;
    reviewStatus: ReviewStatus;
    contentHash: string;
}
export interface OpsTafsirPassageRecord {
    id: string;
    ayahId: string;
    surahNumber: number;
    ayahNumber: number;
    tafsirWork: string;
    author: string;
    methodology?: string;
    passageText: string;
    volume?: number;
    page?: number;
    section?: string;
    licenseStatus: LicenseStatus;
    reviewStatus: ReviewStatus;
}
export interface HadithEntryRecord {
    id: string;
    collection: string;
    bookNumber: number;
    chapterNumber: number;
    hadithNumber: number;
    arabicText: string;
    englishText?: string;
    chainNarration?: string;
    referenceStr: string;
    status: 'APPROVED' | 'REVIEW';
}
export interface HadithGradingRecord {
    id: string;
    hadithId: string;
    grader: string;
    methodology?: string;
    grade: string;
    reference: string;
    sourceId: string;
    notes?: string;
}
export interface ScholarlyIssueRecord {
    id: string;
    issueCode: string;
    title: string;
    domain: 'TAHARAH' | 'SALAH' | 'ZAKAH' | 'SAWM' | 'HAJJ' | 'FAMILY' | 'FINANCE' | 'CONTEMPORARY';
    question: string;
    status: 'APPROVED' | 'DISPUTED';
}
export interface ScholarlyPositionRecord {
    id: string;
    issueId: string;
    positionSummary: string;
    scholarIds: string[];
    madhhabIds?: string[];
    evidenceIds: string[];
    conditions?: string[];
    exceptions?: string[];
    isConsensus: boolean;
    status: 'APPROVED' | 'DISPUTED' | 'RETIRED';
}
export interface IslamicConceptRecord {
    id: string;
    conceptKey: string;
    name: string;
    arabicName: string;
    definition: string;
    quranReferences: string[];
    hadithReferences: string[];
    scholarlyExplanation?: string;
    commonMisunderstandings: string[];
    lifeApplications: string[];
    relatedConcepts: string[];
}
export interface OpsLifeSituationRecord {
    id: string;
    situationKey: string;
    name: string;
    description: string;
    relevantConcepts: string[];
    relevantEvidenceIds: string[];
    potentialAmalIds: string[];
    behavioralNotes?: string;
}
export interface ScholarSkillMatrix {
    fiqh: 'HIGH' | 'MEDIUM' | 'LOW';
    hadith: 'HIGH' | 'MEDIUM' | 'LOW';
    family: 'HIGH' | 'MEDIUM' | 'LOW';
    finance: 'HIGH' | 'MEDIUM' | 'LOW';
    arabic: 'HIGH' | 'MEDIUM' | 'LOW';
}
export interface VerifiedScholarRecord {
    id: string;
    userId: string;
    fullName: string;
    languages: string[];
    fields: string[];
    credentials: string[];
    jurisdiction?: string;
    madhhabAffiliation?: string;
    skillMatrix: ScholarSkillMatrix;
    verificationStatus: 'APPLICATION' | 'IDENTITY_VERIFIED' | 'CREDENTIALS_VERIFIED' | 'SAMPLE_REVIEWED' | 'APPROVED' | 'SUSPENDED';
    activeCasesCount: number;
    maxCapacity: number;
    availableForRouting: boolean;
}
export interface ScholarCaseRecordV2 {
    id: string;
    userId: string;
    assignedScholarId?: string | null;
    secondReviewerScholarId?: string | null;
    category: string;
    question: string;
    sanitizedContext?: string;
    status: 'UNASSIGNED' | 'ASSIGNED' | 'IN_REVIEW' | 'NEED_CLARIFICATION' | 'ANSWERED' | 'ESCALATED' | 'CLOSED';
    answer?: string;
    answerProvenance?: Record<string, any>;
    version: number;
    twoPersonRuleSatisfied: boolean;
    urgency: 'NORMAL' | 'HIGH';
    createdAt: string;
    updatedAt: string;
}
export type ClaimType = 'DIRECT' | 'INFERENTIAL' | 'INTERPRETIVE' | 'CONTESTED';
export type SupportLevel = 'DIRECT' | 'STRONG_INFERENCE' | 'INTERPRETIVE' | 'CONTESTED' | 'UNSUPPORTED';
export interface KnowledgeClaimRecord {
    id: string;
    claimText: string;
    claimType: ClaimType;
    sourcePassageIds: string[];
    supportLevel: SupportLevel;
    reviewStatus: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'REJECTED';
    conflictDetected: boolean;
    conflictingClaimId?: string;
}
export type DisputeReason = 'INCORRECT_CITATION' | 'TRANSLATION_ISSUE' | 'MISSING_CONTEXT' | 'WRONG_ATTRIBUTION' | 'SCHOLARLY_DISAGREEMENT' | 'LICENSE_ISSUE' | 'DUPLICATE' | 'FABRICATED_SOURCE';
export type DisputeSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DisputeStatus = 'OPEN' | 'FROZEN' | 'UNDER_REVIEW' | 'CORRECTED' | 'RETRACTED' | 'PRESERVED_PLURALITY' | 'DISMISSED';
export interface ContentDisputeRecord {
    id: string;
    contentId: string;
    contentType: string;
    reason: DisputeReason;
    severity: DisputeSeverity;
    reporterId: string;
    assignedReviewerId?: string;
    status: DisputeStatus;
    freezeApplied: boolean;
    resolutionNotes?: string;
    createdAt: string;
    updatedAt: string;
}
export interface KnowledgeReleaseRecord {
    id: string;
    releaseTag: string;
    sourceVersions: string[];
    evidenceChanges: string[];
    graphChanges: string[];
    benchmarkRunId?: string;
    reviewerIds: string[];
    approverId: string;
    status: 'CANDIDATE' | 'APPROVED' | 'CANARY' | 'PUBLISHED' | 'ROLLED_BACK';
    activeSearchAlias: 'index_A' | 'index_B';
    rollbackSnapshotTag?: string;
    releaseNotes?: string;
    createdAt: string;
}
export interface GoldBenchmarkCase {
    id: string;
    category: string;
    question: string;
    expectedEvidenceIds: string[];
    acceptableSourceIds: string[];
    scholarRequired: boolean;
    knownDisagreement?: string[];
    forbiddenClaims?: string[];
    language: string;
}
export interface KnowledgeHealthScorecard {
    coverageScore: number;
    provenanceIntegrity: number;
    referenceValidity: number;
    scholarReviewCompletion: number;
    licenseHealth: number;
    retrievalRecall: number;
    citationAccuracy: number;
    disputeHealth: number;
    translationCoverage: number;
    overallScore: number;
}
//# sourceMappingURL=knowledge-ops.d.ts.map