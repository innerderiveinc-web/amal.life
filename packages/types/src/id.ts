/**
 * AMAL OS — LAYER 19: BRANDED IDENTIFIER TYPES (Section 11)
 * Compile-time type branding preventing identifier confusion.
 */

export type UserId = string & { readonly __brand: "UserId" };
export type GoalId = string & { readonly __brand: "GoalId" };
export type JourneyId = string & { readonly __brand: "JourneyId" };
export type AmalId = string & { readonly __brand: "AmalId" };
export type ReflectionId = string & { readonly __brand: "ReflectionId" };
export type ContextSignalId = string & { readonly __brand: "ContextSignalId" };

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
