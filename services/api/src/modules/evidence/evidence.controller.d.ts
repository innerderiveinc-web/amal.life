import { EvidenceService } from './evidence.service.js';
export interface SearchEvidenceDto {
    query: string;
    maxResults?: number;
}
export declare class EvidenceController {
    private readonly service;
    constructor(service: EvidenceService);
    search(dto: SearchEvidenceDto): Promise<{
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
    } | {
        error: string;
        status: number;
    }>;
    getChain(id: string): Promise<import("./evidence.service.js").EvidenceChainResponse | {
        error: string;
        status: number;
    }>;
    getNode(id: string): Promise<any>;
    getNeighbors(id: string): Promise<{
        nodeId: string;
        edges: import("@amal/types").EvidenceEdge[];
    }>;
}
//# sourceMappingURL=evidence.controller.d.ts.map