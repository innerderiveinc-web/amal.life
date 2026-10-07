import { db } from '@amal/database';

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

export class KnowledgeGraphBuilder {
  public static addNode(node: GraphNode): void {
    db.nodes.set(node.id, {
      id: node.id,
      nodeType: node.nodeType,
      label: node.label,
      metadata: node.metadata,
      createdAt: new Date().toISOString(),
    });
  }

  public static addEdge(edge: GraphEdge): void {
    db.edges.set(edge.id, {
      id: edge.id,
      sourceNodeId: edge.sourceNodeId,
      targetNodeId: edge.targetNodeId,
      relationship: edge.edgeType,
      metadata: edge.metadata,
      createdAt: new Date().toISOString(),
    });
  }

  /**
   * Builds canonical graph link from revelation down to practical Amal
   */
  public static linkAyahToAmal(params: {
    ayahId: string;
    tafsirWorkId?: string;
    conceptId: string;
    amalId: string;
  }): void {
    // Ayah -> RELATED_TO -> Concept
    this.addEdge({
      id: `edge_ac_${Date.now()}`,
      sourceNodeId: params.ayahId,
      targetNodeId: params.conceptId,
      edgeType: 'RELATED_TO',
    });

    // Concept -> CAN_SUPPORT -> Amal
    this.addEdge({
      id: `edge_ca_${Date.now()}`,
      sourceNodeId: params.conceptId,
      targetNodeId: params.amalId,
      edgeType: 'CAN_SUPPORT',
    });
  }
}
