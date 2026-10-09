export type ContextSource = 'USER_EXPLICIT' | 'USER_CONFIRMED' | 'BEHAVIOR' | 'REFLECTION' | 'SCHEDULE' | 'SYSTEM' | 'AI_INFERENCE';
export type ContextSensitivity = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
export interface ContextSignal {
    id: string;
    userId: string;
    type: string;
    value: any;
    source: ContextSource;
    confidence: number;
    sensitivity: ContextSensitivity;
    freshnessAt: Date;
    expiresAt?: Date;
    userVisible: boolean;
    userEditable: boolean;
    inferenceReason?: string;
    status: 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'SUPERSEDED';
}
export declare class PersonalContextGraph {
    private signals;
    addSignal(signal: ContextSignal): void;
    getSignalsForUser(userId: string): ContextSignal[];
    /**
     * Resolves conflicting signals applying the non-negotiable priority hierarchy:
     * Explicit User Choice (1.0) > Confirmed Preference (0.95) > Recent Feedback > Behavioral Pattern > AI Inference
     */
    resolvePreference(userId: string, contextType: string): ContextSignal | null;
    /**
     * Minimum Necessary Context selector for AI agents
     */
    selectContextForTask(userId: string, requestedTypes: string[], maxSensitivity?: ContextSensitivity): ContextSignal[];
}
//# sourceMappingURL=context-graph.d.ts.map