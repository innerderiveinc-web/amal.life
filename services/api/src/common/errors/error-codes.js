"use strict";
/**
 * AMAL OS — LAYER 20: ERROR CODES (Section 20.5)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["CONFLICT"] = "CONFLICT";
    ErrorCode["RATE_LIMITED"] = "RATE_LIMITED";
    ErrorCode["POLICY_DENIED"] = "POLICY_DENIED";
    ErrorCode["EVIDENCE_NOT_AVAILABLE"] = "EVIDENCE_NOT_AVAILABLE";
    ErrorCode["SCHOLAR_REQUIRED"] = "SCHOLAR_REQUIRED";
    ErrorCode["SAFETY_BLOCKED"] = "SAFETY_BLOCKED";
    ErrorCode["DEPENDENCY_UNAVAILABLE"] = "DEPENDENCY_UNAVAILABLE";
    ErrorCode["IDEMPOTENCY_CONFLICT"] = "IDEMPOTENCY_CONFLICT";
    ErrorCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=error-codes.js.map