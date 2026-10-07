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

export function toUserId(id: string): UserId {
  return id as UserId;
}

export function toGoalId(id: string): GoalId {
  return id as GoalId;
}

export function toJourneyId(id: string): JourneyId {
  return id as JourneyId;
}

export function toAmalId(id: string): AmalId {
  return id as AmalId;
}

export function toReflectionId(id: string): ReflectionId {
  return id as ReflectionId;
}

export function toContextSignalId(id: string): ContextSignalId {
  return id as ContextSignalId;
}
