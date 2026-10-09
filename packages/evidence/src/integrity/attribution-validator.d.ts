export interface AttributionValidationResult {
    valid: boolean;
    attributedEntity?: string;
    isConsensusClaim: boolean;
    consensusVerified?: boolean;
    isDirectQuote: boolean;
    quoteVerified?: boolean;
    violations: string[];
}
export declare class AttributionValidator {
    private static readonly CONSENSUS_INDICATORS;
    /**
     * Validate claims and statements for attribution veracity and false consensus
     */
    static validateAttribution(text: string, verifiedPassages: {
        author?: string;
        work?: string;
        isConsensus?: boolean;
    }[]): AttributionValidationResult;
}
//# sourceMappingURL=attribution-validator.d.ts.map