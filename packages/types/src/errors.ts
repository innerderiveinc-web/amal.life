export type ErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'POLICY_DENIED'
  | 'EVIDENCE_NOT_AVAILABLE'
  | 'SCHOLAR_REQUIRED'
  | 'SAFETY_BLOCKED'
  | 'DEPENDENCY_UNAVAILABLE';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly retryable = false
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AmalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthorizationError extends AmalError {}
export class PolicyBlockedError extends AmalError {}
export class EvidenceUnavailableError extends AmalError {}
export class CitationVerificationError extends AmalError {}
export class ScholarRequiredError extends AmalError {}
export class InvalidJourneyTransition extends AmalError {}
export class PrivacyViolationError extends AmalError {}
