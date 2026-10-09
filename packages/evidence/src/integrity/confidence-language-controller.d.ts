import { ClaimSupportLevel } from '@amal/types';
export type FramingMode = 'DIRECT_REVELATION' | 'SCHOLARLY_INTERPRETATION' | 'SCHOLARLY_PLURALITY' | 'GOVERNED_UNCERTAINTY' | 'SCHOLAR_ESCALATION';
export interface FramingPolicy {
    supportLevel: ClaimSupportLevel;
    authorizedLeadPhrase: string;
    forbiddenLeadPhrases: string[];
    maxConfidenceLabel: 'DEFINITIVE' | 'QUALIFIED_INTERPRETATION' | 'DIVERGENT' | 'UNVERIFIED';
}
export declare class ConfidenceLanguageController {
    private static readonly POLICIES;
    /**
     * Determine authorized framing based on evidence support level
     */
    static getFramingPolicy(supportLevel: ClaimSupportLevel, isContested?: boolean): FramingPolicy;
    /**
     * Validate that candidate output does not violate forbidden certainty framing
     */
    static validateFraming(text: string, supportLevel: ClaimSupportLevel): {
        valid: boolean;
        violations: string[];
    };
}
//# sourceMappingURL=confidence-language-controller.d.ts.map