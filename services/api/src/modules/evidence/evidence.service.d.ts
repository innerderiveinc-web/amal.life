export interface EvidenceChainResponse {
    claim: {
        id: string;
        text: string;
    };
    evidence: Array<{
        passageId: string;
        reference: string;
        supportType: string;
    }>;
    source: {
        id: string;
        title: string;
        version: string;
    };
    review: {
        status: string;
    };
    provenance: {
        license: string;
        reviewed: boolean;
    };
}
export declare class EvidenceService {
    search(query: string, maxResults?: number): Promise<{
        passageId: string;
        reference: string;
        sourceTitle: string;
        authorityLevel: import("@amal/types").AuthorityLevel;
        translatedText: string;
    }[]>;
    getById(id: string): Promise<{
        source: import("@amal/types").IslamicSource | undefined;
        id: string;
        sourceId: string;
        reference: string;
        arabicText?: string | null;
        translatedText: string;
        language: string;
        grading?: import("@amal/types").HadithGrading;
        narratorChain?: string[] | null;
        contextSummary?: string | null;
        keywords: string[];
        embedding?: number[] | null;
        createdAt: string;
        updatedAt: string;
    } | null>;
    getChain(id: string): Promise<EvidenceChainResponse | null>;
    getNode(id: string): Promise<any>;
    getNeighbors(id: string): Promise<{
        nodeId: string;
        edges: import("@amal/types").EvidenceEdge[];
    }>;
}
//# sourceMappingURL=evidence.service.d.ts.map