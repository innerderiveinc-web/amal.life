export type AmalCompletionType = 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';
export interface AmalCompletionInput {
    amalId: string;
    userId: string;
    plannedMinutes: number;
    actualSeconds: number;
    idempotencyKey: string;
}
export declare class AmalCompletionEngine {
    private static recordedKeys;
    static record(input: AmalCompletionInput): {
        completionType: AmalCompletionType;
        durationSeconds: number;
        recorded: boolean;
        duplicate: boolean;
    };
}
//# sourceMappingURL=completion.d.ts.map