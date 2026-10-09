export interface GraphNode {
    id: string;
    nodeType: string;
    label: string;
    metadata?: Record<string, any>;
}
export interface GraphEdge {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    edgeType: string;
    metadata?: Record<string, any>;
}
export declare class KnowledgeGraphBuilder {
    static addNode(node: GraphNode): void;
    static addEdge(edge: GraphEdge): void;
    /**
     * Builds canonical graph link from revelation down to practical Amal
     */
    static linkAyahToAmal(params: {
        ayahId: string;
        tafsirWorkId?: string;
        conceptId: string;
        amalId: string;
    }): void;
}
//# sourceMappingURL=graph-builder.d.ts.map