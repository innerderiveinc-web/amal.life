"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGraphTraversalEngine = void 0;
const database_1 = require("@amal/database");
class KnowledgeGraphTraversalEngine {
    /**
     * Traverse graph edges across primary revelation, scholarly positions, and practical actions
     */
    static traverseLineage(passageId, maxDepth = 3) {
        const visited = new Set();
        const paths = [];
        const queue = [{ nodeId: passageId, depth: 0 }];
        visited.add(passageId);
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.depth >= maxDepth)
                continue;
            for (const edge of database_1.db.edges.values()) {
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
exports.KnowledgeGraphTraversalEngine = KnowledgeGraphTraversalEngine;
//# sourceMappingURL=index.js.map