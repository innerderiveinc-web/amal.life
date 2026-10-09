import { KnowledgeReleaseRecord } from '@amal/types';
export declare class KnowledgeReleaseService {
    private static releases;
    private static activeAlias;
    static createRelease(data: {
        releaseTag: string;
        sourceVersions: string[];
        evidenceChanges: string[];
        graphChanges: string[];
        reviewerIds: string[];
        approverId: string;
        releaseNotes?: string;
    }): KnowledgeReleaseRecord;
    static publishRelease(releaseId: string): KnowledgeReleaseRecord;
    static rollbackRelease(releaseId: string): KnowledgeReleaseRecord;
    static getActiveSearchAlias(): 'index_A' | 'index_B';
    static getRelease(id: string): KnowledgeReleaseRecord | undefined;
    static getAllReleases(): KnowledgeReleaseRecord[];
}
//# sourceMappingURL=knowledge-release-service.d.ts.map