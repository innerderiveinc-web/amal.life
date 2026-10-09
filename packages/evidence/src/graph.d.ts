import { SourcePassage, EvidenceEdge, EvidencePack } from '@amal/types';
export interface GraphTraversalPath {
    depth: number;
    nodeId: string;
    nodeType: string;
    reference: string;
    title: string;
    translation: string;
    edgeType?: string;
}
export interface TraceableEvidenceChain {
    actionId: string;
    actionTitle: string;
    conceptName: string;
    conceptReference: string;
    evidenceSourceReference: string;
    evidenceText: string;
    authorityLevel: string;
    scholarlyJustification: string;
}
export declare class IslamicEvidenceGraph {
    /**
     * Hybrid search: find passages matching keywords or reference queries
     */
    static queryPassages(query: string, limit?: number): Promise<SourcePassage[]>;
    /**
     * Build structured Evidence Pack for the LLM
     */
    static buildEvidencePack(query: string, normalizedIntent: string): Promise<EvidencePack>;
    /**
     * Traverse graph from Life Situation to supporting Concepts and recommended Actions
     */
    static traversePathway(startEntityId: string, maxDepth?: number): Promise<GraphTraversalPath[]>;
    /**
     * Construct the complete traceable lineage: "Why did AMAL recommend this action?"
     */
    static buildEvidenceChain(actionId: string): Promise<TraceableEvidenceChain>;
    /**
     * Retrieve edges connected to an entity
     */
    static getRelatedEntities(passageId: string): Promise<EvidenceEdge[]>;
}
//# sourceMappingURL=graph.d.ts.map