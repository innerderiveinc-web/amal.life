export interface GraphTraversalPath {
    sourceNodeId: string;
    targetNodeId: string;
    relationship: string;
    depth: number;
}
export declare class KnowledgeGraphTraversalEngine {
    /**
     * Traverse graph edges across primary revelation, scholarly positions, and practical actions
     */
    static traverseLineage(passageId: string, maxDepth?: number): GraphTraversalPath[];
}
//# sourceMappingURL=index.d.ts.map