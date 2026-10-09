"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchProductionBoundary = void 0;
class ResearchProductionBoundary {
    static researchVault = new Map();
    static addResearchMaterial(material) {
        const item = {
            id: material.id,
            title: material.title,
            author: material.author,
            notes: material.notes,
            candidateSources: material.candidateSources || [],
            isApprovedForProduction: false,
            createdAt: new Date().toISOString(),
        };
        this.researchVault.set(item.id, item);
        return item;
    }
    /**
     * Production Gate: Strict rejection of research items in production retrieval
     */
    static assertProductionSafe(itemId) {
        if (this.researchVault.has(itemId)) {
            const item = this.researchVault.get(itemId);
            if (!item?.isApprovedForProduction) {
                throw new Error(`RESEARCH_LEAKAGE_DETECTED: Material ${itemId} is unverified research material and cannot be queried in production.`);
            }
        }
    }
    /**
     * Export for authorized researchers, with mandatory watermark
     */
    static exportForResearchers(itemId) {
        const mat = this.researchVault.get(itemId);
        return {
            header: '⚠️ UNVERIFIED RESEARCH MATERIAL — NOT FOR NORMATIVE ISLAMIC GUIDANCE ⚠️',
            material: mat,
        };
    }
    static isResearchItem(id) {
        return this.researchVault.has(id);
    }
}
exports.ResearchProductionBoundary = ResearchProductionBoundary;
//# sourceMappingURL=research-production-boundary.js.map