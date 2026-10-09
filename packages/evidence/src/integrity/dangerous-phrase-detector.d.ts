export interface DangerousPhraseMatch {
    phrase: string;
    category: 'DIVINE_ATTRIBUTION' | 'PROPHETIC_ATTRIBUTION' | 'CONSENSUS_CLAIM' | 'NORMATIVE_RULING';
    startIndex: number;
    isBackedByLedger: boolean;
    requiredAction: 'ALLOW' | 'BLOCK' | 'REQUIRE_QUALIFICATION';
    reason?: string;
}
export declare class DangerousPhraseDetector {
    private static readonly HIGH_STAKES_PATTERNS;
    /**
     * Scan text for dangerous phrases and enforce strict claim backing
     */
    static scan(text: string): {
        safe: boolean;
        matches: DangerousPhraseMatch[];
        blockedPhrases: string[];
        suggestedSanitization?: string;
    };
}
//# sourceMappingURL=dangerous-phrase-detector.d.ts.map