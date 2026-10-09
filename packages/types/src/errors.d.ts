export type ErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'CONFLICT' | 'RATE_LIMITED' | 'POLICY_DENIED' | 'EVIDENCE_NOT_AVAILABLE' | 'SCHOLAR_REQUIRED' | 'SAFETY_BLOCKED' | 'DEPENDENCY_UNAVAILABLE';
export declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly retryable: boolean;
    constructor(code: ErrorCode, message: string, retryable?: boolean);
}
export declare class AmalError extends Error {
    constructor(message: string);
}
export declare class AuthorizationError extends AmalError {
}
export declare class PolicyBlockedError extends AmalError {
}
export declare class EvidenceUnavailableError extends AmalError {
}
export declare class CitationVerificationError extends AmalError {
}
export declare class ScholarRequiredError extends AmalError {
}
export declare class InvalidJourneyTransition extends AmalError {
}
export declare class PrivacyViolationError extends AmalError {
}
//# sourceMappingURL=errors.d.ts.map