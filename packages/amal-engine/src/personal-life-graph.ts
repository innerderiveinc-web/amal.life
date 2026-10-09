/**
 * AMAL OS — V2.0: PERSONAL LIFE GRAPH & TWO-GRAPH ARCHITECTURE
 * Sections 70–72, 111–112: Manages the user's personal journey graph
 * strictly isolated from the sacred Islamic Evidence Graph.
 */

import {
  PersonalLifeGraphNode,
  LifeDomain,
} from '@amal/types';

export class PersonalLifeGraphEngine {
  private static userGraphs = new Map<string, Map<string, PersonalLifeGraphNode>>();

  /**
   * INVARIANT GUARD: Two-Graph Isolation (Section 71, 72).
   * Personal life graphs can never mutate the canonical Islamic Evidence Graph.
   */
  public static assertGraphIsolation(sourceGraph: string, targetGraph: string): void {
    if (sourceGraph === 'PERSONAL_LIFE_GRAPH' && targetGraph === 'ISLAMIC_EVIDENCE_GRAPH') {
      throw new Error('TWO_GRAPH_ISOLATION_VIOLATION: Personal Life Graph data is strictly forbidden from mutating Islamic Evidence Graph.');
    }
  }

  public static addNode(
    userId: string,
    node: Omit<PersonalLifeGraphNode, 'createdAt'>
  ): PersonalLifeGraphNode {
    let graph = this.userGraphs.get(userId);
    if (!graph) {
      graph = new Map();
      this.userGraphs.set(userId, graph);
    }

    const fullNode: PersonalLifeGraphNode = {
      ...node,
      createdAt: new Date().toISOString(),
    };

    graph.set(node.nodeId, fullNode);
    return fullNode;
  }

  public static getNode(userId: string, nodeId: string): PersonalLifeGraphNode | undefined {
    return this.userGraphs.get(userId)?.get(nodeId);
  }

  public static getNodesByDomain(userId: string, domain: LifeDomain): PersonalLifeGraphNode[] {
    const graph = this.userGraphs.get(userId);
    if (!graph) return [];
    return Array.from(graph.values()).filter((n) => n.domain === domain);
  }

  public static linkNodes(userId: string, sourceNodeId: string, targetNodeId: string): boolean {
    const graph = this.userGraphs.get(userId);
    if (!graph) return false;

    const source = graph.get(sourceNodeId);
    const target = graph.get(targetNodeId);
    if (!source || !target) return false;

    if (!source.connectedNodeIds.includes(targetNodeId)) {
      source.connectedNodeIds.push(targetNodeId);
    }
    return true;
  }
}
