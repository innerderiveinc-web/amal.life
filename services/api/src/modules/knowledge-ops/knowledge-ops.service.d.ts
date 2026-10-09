import { SourceRegistryRecord, QuranAyahRecord, QuranTranslationRecord, TafsirPassageRecord, HadithEntryRecord, HadithGradingRecord, ScholarlyIssueRecord, ScholarlyPositionRecord, IslamicConceptRecord, LifeSituationRecord, VerifiedScholarRecord, ScholarCaseRecordV2, KnowledgeClaimRecord, ContentDisputeRecord, KnowledgeReleaseRecord, KnowledgeHealthScorecard, DisputeSeverity, DisputeReason } from '@amal/types';
export declare class KnowledgeOpsService {
    private sources;
    private ayahs;
    private translations;
    private tafsirPassages;
    private hadiths;
    private gradings;
    private issues;
    private positions;
    private concepts;
    private situations;
    private scholars;
    private scholarCases;
    private claims;
    private disputes;
    private releases;
    private goldCases;
    private activeSearchAlias;
    constructor();
    private seedCanonicalData;
    getSources(): SourceRegistryRecord[];
    getSourceById(id: string): SourceRegistryRecord | undefined;
    acquireSource(data: Partial<SourceRegistryRecord>): SourceRegistryRecord;
    validateSource(id: string): {
        valid: boolean;
        errors: string[];
    };
    approveSource(id: string, approverRole: 'SCHOLAR' | 'EDITOR' | 'OPS'): SourceRegistryRecord;
    retireSource(id: string, reason: string): SourceRegistryRecord;
    getAyah(surah: number, ayah: number): {
        ayah?: QuranAyahRecord;
        translations: QuranTranslationRecord[];
        tafsir: TafsirPassageRecord[];
    };
    getHadith(collection: string, hadithNum: number): {
        hadith?: HadithEntryRecord;
        gradings: HadithGradingRecord[];
    };
    getIssueWithPlurality(issueId: string): {
        issue?: ScholarlyIssueRecord;
        positions: ScholarlyPositionRecord[];
    };
    getConcept(conceptKey: string): IslamicConceptRecord | undefined;
    getLifeSituation(situationKey: string): LifeSituationRecord | undefined;
    getScholars(): VerifiedScholarRecord[];
    getScholarById(id: string): VerifiedScholarRecord | undefined;
    routeCaseToScholar(category: string, urgency?: 'NORMAL' | 'HIGH'): VerifiedScholarRecord;
    createScholarCase(userId: string, question: string, category: string, context?: string, urgency?: 'NORMAL' | 'HIGH'): ScholarCaseRecordV2;
    getScholarCases(): ScholarCaseRecordV2[];
    getScholarCaseById(id: string): ScholarCaseRecordV2 | undefined;
    answerScholarCase(caseId: string, scholarId: string, answer: string, evidenceRefs: string[], uncertaintyCondition?: string): ScholarCaseRecordV2;
    peerReviewScholarCase(caseId: string, secondScholarId: string, approved: boolean, peerNotes?: string): ScholarCaseRecordV2;
    registerClaim(data: {
        claimText: string;
        claimType: 'DIRECT' | 'INFERENTIAL' | 'INTERPRETIVE' | 'CONTESTED';
        sourcePassageIds: string[];
        supportLevel: 'DIRECT' | 'STRONG_INFERENCE' | 'INTERPRETIVE' | 'CONTESTED' | 'UNSUPPORTED';
    }): KnowledgeClaimRecord;
    openDispute(data: {
        contentId: string;
        contentType: string;
        reason: DisputeReason;
        severity: DisputeSeverity;
        reporterId: string;
    }): ContentDisputeRecord;
    resolveDispute(disputeId: string, resolution: 'CORRECTED' | 'RETRACTED' | 'PRESERVED_PLURALITY' | 'DISMISSED', notes: string): ContentDisputeRecord;
    createRelease(releaseTag: string, approverId: string, notes?: string): KnowledgeReleaseRecord;
    publishRelease(releaseId: string): KnowledgeReleaseRecord;
    rollbackRelease(releaseId: string): KnowledgeReleaseRecord;
    getActiveSearchAlias(): 'index_A' | 'index_B';
    runBenchmarks(): {
        casesEvaluated: number;
        passedCases: number;
        citationAccuracy: number;
        fabricatedCitations: number;
        pluralityPreserved: boolean;
        zeroResultSafelyHandled: boolean;
    };
    getHealthScorecard(): KnowledgeHealthScorecard;
}
//# sourceMappingURL=knowledge-ops.service.d.ts.map