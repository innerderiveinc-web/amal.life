import { SafetyClass } from './safety.js';
export interface AITrace {
    requestId: string;
    traceId: string;
    pseudonymUserId: string;
    intent: string;
    model: string;
    safetyClass: SafetyClass;
    retrievedSourceIds: string[];
    retrievalScores: number[];
    citationsVerified: boolean;
    citationCount: number;
    latencyMs: number;
    inputTokens: number;
    outputTokens: number;
    costUsd: number;
    finalStatus: 'SUCCESS' | 'SAFETY_REJECTED' | 'CITATION_FAILED' | 'ESCALATED_TO_SCHOLAR';
    createdAt: string;
}
export interface CitationAuditEvent {
    id: string;
    traceId: string;
    claimText: string;
    passageId: string;
    reference: string;
    supportedByPassage: boolean;
    auditPassed: boolean;
    attemptNumber: number;
    createdAt: string;
}
export interface SafetyAuditEvent {
    id: string;
    traceId: string;
    rawInputLength: number;
    classifiedSafetyClass: SafetyClass;
    triggers: string[];
    actionTaken: 'PROCEED' | 'WARN_USER' | 'SCHOLAR_ESCALATION' | 'CRISIS_INTERVENTION';
    createdAt: string;
}
export interface AuditLog {
    id: string;
    actorId: string;
    actorRole?: string;
    action: string;
    resourceType?: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
    createdAt?: string;
    timestamp?: string;
    resource?: string;
    details?: string;
    status?: string;
}
//# sourceMappingURL=observability.d.ts.map