export interface ArabicTextBaseline {
    reference: string;
    canonicalArabic: string;
    canonicalHash: string;
}
export declare class ArabicTextDiffChecker {
    private static baselines;
    /**
     * Verify candidate Arabic text against canonical baseline
     */
    static verifyArabicText(reference: string, candidateArabic: string): {
        matched: boolean;
        computedHash: string;
        expectedHash?: string;
        diffDetected: boolean;
        error?: string;
    };
    static registerBaseline(baseline: ArabicTextBaseline): void;
}
//# sourceMappingURL=arabic-diff-checker.d.ts.map