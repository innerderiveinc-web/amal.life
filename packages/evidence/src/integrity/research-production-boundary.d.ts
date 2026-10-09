export interface ResearchMaterial {
    id: string;
    title: string;
    author: string;
    notes: string;
    candidateSources: string[];
    isApprovedForProduction: boolean;
    createdAt: string;
}
export declare class ResearchProductionBoundary {
    private static researchVault;
    static addResearchMaterial(material: {
        id: string;
        title: string;
        author: string;
        notes: string;
        candidateSources?: string[];
    }): ResearchMaterial;
    /**
     * Production Gate: Strict rejection of research items in production retrieval
     */
    static assertProductionSafe(itemId: string): void;
    /**
     * Export for authorized researchers, with mandatory watermark
     */
    static exportForResearchers(itemId: string): {
        header: string;
        material?: ResearchMaterial;
    };
    static isResearchItem(id: string): boolean;
}
//# sourceMappingURL=research-production-boundary.d.ts.map