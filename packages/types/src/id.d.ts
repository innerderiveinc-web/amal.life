/**
 * AMAL OS — LAYER 19: BRANDED IDENTIFIER TYPES (Section 11)
 * Compile-time type branding preventing identifier confusion.
 */
export type UserId = string & {
    readonly __brand: "UserId";
};
export type GoalId = string & {
    readonly __brand: "GoalId";
};
export type JourneyId = string & {
    readonly __brand: "JourneyId";
};
export type AmalId = string & {
    readonly __brand: "AmalId";
};
export type ReflectionId = string & {
    readonly __brand: "ReflectionId";
};
export type ContextSignalId = string & {
    readonly __brand: "ContextSignalId";
};
export declare function toUserId(id: string): UserId;
export declare function toGoalId(id: string): GoalId;
export declare function toJourneyId(id: string): JourneyId;
export declare function toAmalId(id: string): AmalId;
export declare function toReflectionId(id: string): ReflectionId;
export declare function toContextSignalId(id: string): ContextSignalId;
//# sourceMappingURL=id.d.ts.map