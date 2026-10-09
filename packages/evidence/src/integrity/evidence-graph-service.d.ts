import { EntityType, EvidenceEdgeType, EpistemicDomain } from '@amal/types';
export interface IntegrityGraphNode {
    id: string;
    entityType: EntityType;
    epistemicDomain: EpistemicDomain;
    label: string;
    reference?: string;
    metadata?: Record<string, any>;
    isVerified: boolean;
    version: number;
}
export interface IntegrityGraphEdge {
    id: string;
    fromNodeId: string;
    edgeType: EvidenceEdgeType;
    toNodeId: string;
    isVerified: boolean;
    notes?: string;
}
export declare class EvidenceGraphService {
    private static nodes;
    private static edges;
    static addNode(node: IntegrityGraphNode): void;
    static getNode(id: string): IntegrityGraphNode | undefined;
    static addEdge(edge: IntegrityGraphEdge): void;
    static getEdgesFrom(fromNodeId: string): IntegrityGraphEdge[];
    static getEdgesTo(toNodeId: string): IntegrityGraphEdge[];
    /**
     * Traverse lineage from an Amal or Concept back to primary revelation
     */
    static traceLineage(startNodeId: string, maxDepth?: number): IntegrityGraphNode[];
    /**
     * Query plurality: return all differing scholarly positions for an issue
     */
    static getPluralityPositions(issueId: string): IntegrityGraphNode[];
}
//# sourceMappingURL=evidence-graph-service.d.ts.map