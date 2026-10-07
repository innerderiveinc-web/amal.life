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
