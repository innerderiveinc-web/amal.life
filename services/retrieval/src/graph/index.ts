import { SourcePassage, EvidenceEdge } from '@amal/types';
import { db } from '@amal/database';

export interface GraphTraversalPath {
  sourceNodeId: string;
  targetNodeId: string;
  relationship: string;
  depth: number;
}

export class KnowledgeGraphTraversalEngine {
  /**
   * Traverse graph edges across primary revelation, scholarly positions, and practical actions
   */
  public static traverseLineage(passageId: string, maxDepth: number = 3): GraphTraversalPath[] {
    const visited = new Set<string>();
    const paths: GraphTraversalPath[] = [];

    const queue: Array<{ nodeId: string; depth: number }> = [{ nodeId: passageId, depth: 0 }];
    visited.add(passageId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.depth >= maxDepth) continue;

      for (const edge of db.edges.values()) {
        if (edge.sourceNodeId === current.nodeId && !visited.has(edge.targetNodeId)) {
          visited.add(edge.targetNodeId);
          paths.push({
            sourceNodeId: edge.sourceNodeId,
            targetNodeId: edge.targetNodeId,
            relationship: edge.relationship,
            depth: current.depth + 1,
          });
          queue.push({ nodeId: edge.targetNodeId, depth: current.depth + 1 });
        }
      }
    }

    return paths;
  }
}
