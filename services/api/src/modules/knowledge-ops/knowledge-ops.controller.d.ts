import { KnowledgeOpsService } from './knowledge-ops.service.js';
export declare class KnowledgeOpsController {
    private readonly service;
    constructor(service: KnowledgeOpsService);
    getSources(): import("@amal/types").SourceRegistryRecord[];
    getSourceById(id: string): import("@amal/types").SourceRegistryRecord | undefined;
    getAyah(surah: number, ayah: number): {
        ayah?: import("@amal/types").QuranAyahRecord;
        translations: import("@amal/types").QuranTranslationRecord[];
        tafsir: import("@amal/types").TafsirPassageRecord[];
    };
    getHadith(collection: string, num: number): {
        hadith?: import("@amal/types").HadithEntryRecord;
        gradings: import("@amal/types").HadithGradingRecord[];
    };
    getIssue(issueId: string): {
        issue?: import("@amal/types").ScholarlyIssueRecord;
        positions: import("@amal/types").ScholarlyPositionRecord[];
    };
    getConcept(conceptKey: string): import("@amal/types").IslamicConceptRecord | undefined;
    getLifeSituation(situationKey: string): import("@amal/types").LifeSituationRecord | undefined;
    openDispute(body: any): import("@amal/types").ContentDisputeRecord;
    resolveDispute(disputeId: string, resolution: any, notes: string): import("@amal/types").ContentDisputeRecord;
    getScholars(): import("@amal/types").VerifiedScholarRecord[];
    getScholarById(id: string): import("@amal/types").VerifiedScholarRecord | undefined;
    createScholarCase(body: any): import("@amal/types").ScholarCaseRecordV2;
    getScholarCases(): import("@amal/types").ScholarCaseRecordV2[];
    getScholarCaseById(id: string): import("@amal/types").ScholarCaseRecordV2 | undefined;
    answerScholarCase(caseId: string, body: any): import("@amal/types").ScholarCaseRecordV2;
    peerReviewScholarCase(caseId: string, body: any): import("@amal/types").ScholarCaseRecordV2;
    acquireSource(body: any): import("@amal/types").SourceRegistryRecord;
    validateSource(sourceId: string): {
        valid: boolean;
        errors: string[];
    };
    approveSource(sourceId: string, approverRole: any): import("@amal/types").SourceRegistryRecord;
    createRelease(body: any): import("@amal/types").KnowledgeReleaseRecord;
    publishRelease(releaseId: string): import("@amal/types").KnowledgeReleaseRecord;
    rollbackRelease(releaseId: string): import("@amal/types").KnowledgeReleaseRecord;
    runBenchmarks(): {
        casesEvaluated: number;
        passedCases: number;
        citationAccuracy: number;
        fabricatedCitations: number;
        pluralityPreserved: boolean;
        zeroResultSafelyHandled: boolean;
    };
    getHealth(): import("@amal/types").KnowledgeHealthScorecard;
}
//# sourceMappingURL=knowledge-ops.controller.d.ts.map