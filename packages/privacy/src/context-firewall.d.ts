export interface ContextCandidate {
    key: string;
    value: string;
    source: 'EXPLICIT_CHOICE' | 'CONFIRMED_PREFERENCE' | 'ACTIVE_JOURNEY' | 'RECENT_BEHAVIOR' | 'DERIVED_INSIGHT' | 'AI_INFERENCE';
    isSensitive: boolean;
}
export declare class ContextFirewall {
    /**
     * Section 8 & 9: Context Priority & Minimization
     * Priority: Explicit > Confirmed > Active Journey > Recent Behavior > Derived > AI Inference.
     * Strips all reflections, family journals, and confidential notes.
     */
    static filterContext(candidates: ContextCandidate[]): ContextCandidate[];
}
//# sourceMappingURL=context-firewall.d.ts.map