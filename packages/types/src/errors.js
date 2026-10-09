"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyViolationError = exports.InvalidJourneyTransition = exports.ScholarRequiredError = exports.CitationVerificationError = exports.EvidenceUnavailableError = exports.PolicyBlockedError = exports.AuthorizationError = exports.AmalError = exports.AppError = void 0;
class AppError extends Error {
    code;
    retryable;
    constructor(code, message, retryable = false) {
        super(message);
        this.code = code;
        this.retryable = retryable;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
class AmalError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.AmalError = AmalError;
class AuthorizationError extends AmalError {
}
exports.AuthorizationError = AuthorizationError;
class PolicyBlockedError extends AmalError {
}
exports.PolicyBlockedError = PolicyBlockedError;
class EvidenceUnavailableError extends AmalError {
}
exports.EvidenceUnavailableError = EvidenceUnavailableError;
class CitationVerificationError extends AmalError {
}
exports.CitationVerificationError = CitationVerificationError;
class ScholarRequiredError extends AmalError {
}
exports.ScholarRequiredError = ScholarRequiredError;
class InvalidJourneyTransition extends AmalError {
}
exports.InvalidJourneyTransition = InvalidJourneyTransition;
class PrivacyViolationError extends AmalError {
}
exports.PrivacyViolationError = PrivacyViolationError;
//# sourceMappingURL=errors.js.map