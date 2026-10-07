/**
 * AMAL OS V1 — MASTER DOMAIN EVENTS (Sections 42 & 43)
 * Authoritative taxonomy of all state mutation domain events.
 */

export interface DomainEvent<T = any> {
  id: string;
  type: DomainEventType;
  version: number;
  aggregateType: string;
  aggregateId: string;
  actorId?: string;
  occurredAt: string;
  correlationId?: string;
  payload: T;
}

export type DomainEventType =
  // Goals
  | 'goal.created'
  | 'goal.updated'
  // Context
  | 'context.created'
  | 'context.confirmed'
  | 'context.revoked'
  // Journeys
  | 'journey.started'
  | 'journey.paused'
  | 'journey.resumed'
  | 'journey.completed'
  // Amal
  | 'amal.recommended'
  | 'amal.started'
  | 'amal.completed'
  | 'amal.partial'
  | 'amal.skipped'
  | 'amal.snoozed'
  | 'amal.feedback'
  // Friction & Insights
  | 'friction.detected'
  | 'insight.generated'
  | 'insight.confirmed'
  | 'insight.rejected'
  // Journey Adaptation
  | 'journey.adaptation.proposed'
  | 'journey.adaptation.approved'
  | 'journey.adaptation.rejected'
  // AI Interactions
  | 'ai.question.asked'
  | 'ai.response.generated'
  | 'ai.blocked'
  | 'ai.escalated'
  // Citations & Scholars
  | 'citation.failed'
  | 'scholar.case.created'
  | 'scholar.response.received'
  // Communications
  | 'communication.scheduled'
  | 'communication.sent'
  | 'communication.failed';

export const REQUIRED_DOMAIN_EVENTS: readonly DomainEventType[] = [
  'goal.created',
  'goal.updated',
  'context.created',
  'context.confirmed',
  'context.revoked',
  'journey.started',
  'journey.paused',
  'journey.resumed',
  'journey.completed',
  'amal.recommended',
  'amal.started',
  'amal.completed',
  'amal.partial',
  'amal.skipped',
  'amal.snoozed',
  'amal.feedback',
  'friction.detected',
  'insight.generated',
  'insight.confirmed',
  'insight.rejected',
  'journey.adaptation.proposed',
  'journey.adaptation.approved',
  'journey.adaptation.rejected',
  'ai.question.asked',
  'ai.response.generated',
  'ai.blocked',
  'ai.escalated',
  'citation.failed',
  'scholar.case.created',
  'scholar.response.received',
  'communication.scheduled',
  'communication.sent',
  'communication.failed',
] as const;
