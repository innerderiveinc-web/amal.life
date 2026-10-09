import { SafetyClassificationResult } from '@amal/types';
export declare class FatwaFirewall {
    private static readonly CRISIS_PATTERNS;
    private static readonly PERSONALIZED_FIQH_PATTERNS;
    private static readonly DISAGREEMENT_PATTERNS;
    private static readonly INJECTION_PATTERNS;
    /**
     * Classify user query into SafetyClass
     */
    static classify(query: string): SafetyClassificationResult;
}
//# sourceMappingURL=fatwa-firewall.d.ts.map