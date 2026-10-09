export interface IncidentFreezeRecord {
    incidentId: string;
    triggerType: 'FABRICATED_CITATION' | 'UNVERIFIED_CORPUS_LEAK' | 'GLYPH_MUTATION' | 'UNAUTHORIZED_FATWA';
    affectedPaths: string[];
    frozenAt: string;
    unfrozenAt?: string;
    isActive: boolean;
    resolutionSummary?: string;
}
export declare class StopTheLineController {
    private static activeFreezes;
    private static globalLineStopped;
    /**
     * Emergency Trigger: Stop the line and freeze knowledge path
     */
    static triggerStop(data: {
        triggerType: IncidentFreezeRecord['triggerType'];
        affectedPaths: string[];
        reason: string;
    }): IncidentFreezeRecord;
    /**
     * Resume line after thorough investigation and re-testing
     */
    static resolveAndResume(incidentId: string, resolutionSummary: string): boolean;
    static isLineStopped(): boolean;
    static getActiveFreezes(): IncidentFreezeRecord[];
}
//# sourceMappingURL=stop-the-line-controller.d.ts.map