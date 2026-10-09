"use strict";
/**
 * AMAL OS V1 — MASTER DOMAIN EVENTS (Sections 42 & 43)
 * Authoritative taxonomy of all state mutation domain events.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUIRED_DOMAIN_EVENTS = void 0;
exports.REQUIRED_DOMAIN_EVENTS = [
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
];
//# sourceMappingURL=events.js.map