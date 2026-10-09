"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceGraphService = void 0;
class EvidenceGraphService {
    static nodes = new Map();
    static edges = new Map();
    static addNode(node) {
        // Invariant: Behavioral science must never be labeled as Islamic evidence
        if (node.epistemicDomain === 'BEHAVIORAL_SCIENCE' &&
            (node.entityType === 'QURAN' || node.entityType === 'HADITH' || node.entityType === 'TAFSIR' || node.entityType === 'QURAN_AYAH' || node.entityType === 'HADITH_PASSAGE')) {
            throw new Error('EPISTEMIC_DOMAIN_MISMATCH: Behavioral science cannot be classified as Revelation.');
        }
        this.nodes.set(node.id, node);
    }
    static getNode(id) {
        return this.nodes.get(id);
    }
    static addEdge(edge) {
        this.edges.set(edge.id, edge);
    }
    static getEdgesFrom(fromNodeId) {
        return Array.from(this.edges.values()).filter((e) => e.fromNodeId === fromNodeId);
    }
    static getEdgesTo(toNodeId) {
        return Array.from(this.edges.values()).filter((e) => e.toNodeId === toNodeId);
    }
    /**
     * Traverse lineage from an Amal or Concept back to primary revelation
     */
    static traceLineage(startNodeId, maxDepth = 4) {
        const visited = new Set();
        const chain = [];
        const traverse = (currentId, depth) => {
            if (depth > maxDepth || visited.has(currentId))
                return;
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
    static getPluralityPositions(issueId) {
        const outgoing = this.getEdgesFrom(issueId);
        const positionNodes = [];
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
exports.EvidenceGraphService = EvidenceGraphService;
//# sourceMappingURL=evidence-graph-service.js.map