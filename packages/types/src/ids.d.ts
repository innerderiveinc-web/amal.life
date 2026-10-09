/**
 * AMAL OS — LAYER 20: DOMAIN ID TYPES (Section 20.9)
 * Re-exports branded identifiers with generic Brand<T, B> helper.
 */
export type Brand<T, B extends string> = T & {
    readonly __brand: B;
};
export type UserId = Brand<string, 'UserId'>;
export type GoalId = Brand<string, 'GoalId'>;
export type JourneyId = Brand<string, 'JourneyId'>;
export type AmalId = Brand<string, 'AmalId'>;
export type ReflectionId = Brand<string, 'ReflectionId'>;
export type ContextSignalId = Brand<string, 'ContextSignalId'>;
export declare function toUserId(id: string): UserId;
export declare function toGoalId(id: string): GoalId;
export declare function toJourneyId(id: string): JourneyId;
export declare function toAmalId(id: string): AmalId;
export declare function toReflectionId(id: string): ReflectionId;
export declare function toContextSignalId(id: string): ContextSignalId;
//# sourceMappingURL=ids.d.ts.map