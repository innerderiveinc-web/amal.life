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
        const sourceId = edge.sourceNodeId || edge.fromEntityId || '';
        const targetId = edge.targetNodeId || edge.toEntityId || '';
        if (sourceId === current.nodeId && targetId && !visited.has(targetId)) {
          visited.add(targetId);
          paths.push({
            sourceNodeId: sourceId,
            targetNodeId: targetId,
            relationship: edge.relationship || edge.edgeType || 'CONNECTED',
            depth: current.depth + 1,
          });
          queue.push({ nodeId: targetId, depth: current.depth + 1 });
        }
      }
    }

    return paths;
  }
}
