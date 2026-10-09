/**
 * AMAL OS — Layer 12 Trust Architecture & Governance Contracts
 * Definitive contracts for Policy Decision Point (PDP), Data Classification,
 * Consent Proofs, Context Firewalls, AI Safety Zones, Scholar Governance,
 * Tamper-Resistant Audit Logs, Incidents, and Circuit Breakers.
 */
export type DataClass = 'PUBLIC' | 'INTERNAL' | 'PRIVATE' | 'SENSITIVE' | 'HIGHLY_SENSITIVE';
export type DataPurpose = 'CORE_SERVICE' | 'PERSONALIZATION' | 'COMMUNICATION' | 'SAFETY' | 'SCHOLAR_REVIEW' | 'SECURITY' | 'ANALYTICS' | 'LEGAL';
export type AccountMode = 'ADULT' | 'YOUNG_USER' | 'CHILD';
export type TrustZone = 'ZONE_A_EVIDENCE' | 'ZONE_B_PRODUCT_RULES' | 'ZONE_C_USER_INPUT' | 'ZONE_D_EXTERNAL_UNTRUSTED' | 'ZONE_E_MODEL_OUTPUT';
export type PolicyActorType = 'USER' | 'SCHOLAR' | 'FAMILY_OWNER' | 'ADMIN' | 'SYSTEM' | 'CONTENT_EDITOR' | 'CONTENT_REVIEWER' | 'SCHOLAR_REVIEWER' | 'SECURITY_OPERATOR' | 'SUPPORT_OPERATOR';
export type PolicyEffect = 'ALLOW' | 'DENY' | 'REDACT' | 'ESCALATE';
export interface PolicyRequest {
    actorId: string;
    actorType?: PolicyActorType;
    action: string;
    resourceType: string;
    resourceId?: string;
    resourceOwnerId?: string;
    purpose?: DataPurpose | string;
    requestedDataClasses?: DataClass[];
    accountMode?: AccountMode;
    context?: Record<string, unknown>;
    environment?: Record<string, any>;
}
export interface PolicyDecision {
    effect: PolicyEffect;
    reasonCodes?: string[];
    reason?: string;
    obligations?: string[];
    redactedFields?: string[];
    auditRequired?: boolean;
    evaluatedAt?: string;
}
export interface AIDataEnvelope {
    requestId: string;
    purpose: DataPurpose | string;
    allowedDataClasses: DataClass[];
    contextRefs: string[];
    redactedFields: string[];
    userConsentRefs: string[];
    safetyClass: string;
    expiresAt: string;
}
export interface EvidenceSnapshot {
    id: string;
    snapshotHash: string;
    sourceVersions: Array<{
        sourceId: string;
        version: number;
    }>;
    passageIds: string[];
    claimIds: string[];
    reviewStates: Record<string, string>;
    retrievalTimestamp: string;
}
export interface AIDecisionRecord {
    requestId: string;
    userIdHash: string;
    intent: string;
    safetyClass: string;
    modelRoute: string;
    agentPath: string[];
    contextRefs: string[];
    evidenceSnapshotId?: string;
    citationAuditId?: string;
    decision: string;
    latencyMs: number;
    cost?: number;
    createdAt: string;
}
import type { ScholarVerificationStatus, ScholarProfile } from './scholar.js';
export type { ScholarVerificationStatus, ScholarProfile };
export type TrustScholarVerificationStatus = ScholarVerificationStatus;
export type TrustScholarProfile = ScholarProfile;
export type IncidentSeverity = 'SEV_0' | 'SEV_1' | 'SEV_2' | 'SEV_3' | 'SEV_4';
export type IncidentCategory = 'AI_HALLUCINATION' | 'CITATION_FAILURE' | 'PRIVACY_LEAK' | 'PROMPT_INJECTION' | 'UNSAFE_RESPONSE' | 'SCHOLAR_IMPERSONATION' | 'CONTENT_POISONING' | 'COMMUNICATION_SPAM' | 'AUTHORIZATION_BYPASS' | 'DATA_DELETION_FAILURE';
export type IncidentStatus = 'DETECTED' | 'TRIAGED' | 'CONTAINED' | 'INVESTIGATING' | 'REMEDIATED' | 'VALIDATED' | 'CLOSED';
export interface AIIncident {
    id: string;
    incidentNumber: string;
    severity: IncidentSeverity;
    category: IncidentCategory;
    status: IncidentStatus;
    summary: string;
    affectedRoutes: string[];
    containedAt?: string;
    resolvedAt?: string;
    createdAt: string;
}
export type CircuitBreakerState = 'NORMAL' | 'DEGRADED' | 'LIMITED' | 'OFF';
export type PrivacyRequestType = 'VIEW' | 'EXPORT' | 'CORRECT' | 'RESTRICT' | 'DELETE' | 'WITHDRAW_CONSENT';
export type PrivacyRequestStatus = 'REQUESTED' | 'IDENTITY_VERIFIED' | 'SCOPED' | 'APPROVED' | 'EXECUTING' | 'VERIFIED' | 'COMPLETED' | 'FAILED';
export interface PrivacyRequest {
    id: string;
    userId: string;
    requestType: PrivacyRequestType;
    status: PrivacyRequestStatus;
    scope: string[];
    dependencyAnalysis?: Record<string, string>;
    completedAt?: string;
    createdAt: string;
}
export interface TamperEvidentAuditEvent {
    sequenceNumber: number;
    previousEventHash: string;
    eventHash: string;
    actorId?: string;
    actorType: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    purpose: string;
    outcome: 'SUCCESS' | 'DENIED' | 'ERROR';
    metadata: Record<string, unknown>;
    createdAt: string;
}
//# sourceMappingURL=trust.d.ts.map