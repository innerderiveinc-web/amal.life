export interface ActiveJourneyLoad {
    journeyId: string;
    title: string;
    requestedDailyMinutes: number;
}
export interface CollisionResolution {
    hasCollision: boolean;
    totalRequestedMinutes: number;
    availableMinutes: number;
    surplusMinutes: number;
    message?: string;
    proposedOptions?: Array<'KEEP' | 'MERGE' | 'SIMPLIFY' | 'RESCHEDULE' | 'PAUSE' | 'REDUCE'>;
}
export declare class JourneyCollisionEngine {
    static detectAndResolve(activeJourneys: ActiveJourneyLoad[], availableMinutes: number): CollisionResolution;
}
//# sourceMappingURL=collision-resolver.d.ts.map