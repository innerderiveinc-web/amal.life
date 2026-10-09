"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGraphBuilder = void 0;
const database_1 = require("@amal/database");
class KnowledgeGraphBuilder {
    static addNode(node) {
        database_1.db.nodes.set(node.id, {
            id: node.id,
            nodeType: node.nodeType,
            label: node.label,
            metadata: node.metadata,
            createdAt: new Date().toISOString(),
        });
    }
    static addEdge(edge) {
        database_1.db.edges.set(edge.id, {
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
    static linkAyahToAmal(params) {
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
exports.KnowledgeGraphBuilder = KnowledgeGraphBuilder;
//# sourceMappingURL=graph-builder.js.map