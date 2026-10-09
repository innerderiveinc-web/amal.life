export interface RetrievalPolicyDecision {
    allowed: boolean;
    sourceId: string;
    reason?: string;
}
export declare class KnowledgePolicyEngine {
    private static islamicAiEnabled;
    static setIslamicAiEnabled(enabled: boolean): void;
    static isIslamicAiEnabled(): boolean;
    /**
     * Central policy evaluation for production retrieval
     * Enforces: APPROVED + PUBLISHED + PROVENANCE_VERIFIED + REFERENCE_VERIFIED + NOT_QUARANTINED
     */
    static evaluateRetrieval(sourceId: string): RetrievalPolicyDecision;
    /**
     * Gate AI generation: If ISLAMIC_AI_ENABLED is false, block generation and enforce deterministic fallback
     */
    static canGenerateAiResponse(): {
        canGenerate: boolean;
        fallbackMessage?: string;
    };
}
//# sourceMappingURL=knowledge-policy-engine.d.ts.map