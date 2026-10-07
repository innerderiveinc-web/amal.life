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

export class EvidenceGraphService {
  private static nodes: Map<string, IntegrityGraphNode> = new Map();
  private static edges: Map<string, IntegrityGraphEdge> = new Map();

  public static addNode(node: IntegrityGraphNode): void {
    // Invariant: Behavioral science must never be labeled as Islamic evidence
    if (
      node.epistemicDomain === 'BEHAVIORAL_SCIENCE' &&
      (node.entityType === 'QURAN' || node.entityType === 'HADITH' || node.entityType === 'TAFSIR')
    ) {
      throw new Error('EPISTEMIC_DOMAIN_MISMATCH: Behavioral science cannot be classified as Revelation.');
    }
    this.nodes.set(node.id, node);
  }

  public static getNode(id: string): IntegrityGraphNode | undefined {
    return this.nodes.get(id);
  }

  public static addEdge(edge: IntegrityGraphEdge): void {
    this.edges.set(edge.id, edge);
  }

  public static getEdgesFrom(fromNodeId: string): IntegrityGraphEdge[] {
    return Array.from(this.edges.values()).filter((e) => e.fromNodeId === fromNodeId);
  }

  public static getEdgesTo(toNodeId: string): IntegrityGraphEdge[] {
    return Array.from(this.edges.values()).filter((e) => e.toNodeId === toNodeId);
  }

  /**
   * Traverse lineage from an Amal or Concept back to primary revelation
   */
  public static traceLineage(startNodeId: string, maxDepth = 4): IntegrityGraphNode[] {
    const visited = new Set<string>();
    const chain: IntegrityGraphNode[] = [];

    const traverse = (currentId: string, depth: number) => {
      if (depth > maxDepth || visited.has(currentId)) return;
      visited.add(currentId);

      const node = this.nodes.get(currentId);
      if (node) {
        chain.push(node);
      }

      const outgoing = this.getEdgesFrom(currentId);
      for (const edge of outgoing) {
        if (edge.edgeType === 'SUPPORTS' || edge.edgeType === 'REFERENCES' || edge.edgeType === 'CAN_SUPPORT') {
          traverse(edge.toNodeId, depth + 1);
        }
      }
    };

    traverse(startNodeId, 0);
    return chain;
  }

  /**
   * Query plurality: return all differing scholarly positions for an issue
   */
  public static getPluralityPositions(issueId: string): IntegrityGraphNode[] {
    const outgoing = this.getEdgesFrom(issueId);
    const positionNodes: IntegrityGraphNode[] = [];

    for (const edge of outgoing) {
      if (edge.edgeType === 'CONTAINS' || edge.edgeType === 'DIFFERS_FROM' || edge.edgeType === 'CONTRASTS_WITH') {
        const target = this.nodes.get(edge.toNodeId);
        if (target && target.entityType === 'FIQH_RULING') {
          positionNodes.push(target);
        }
      }
    }

    return positionNodes;
  }
}
