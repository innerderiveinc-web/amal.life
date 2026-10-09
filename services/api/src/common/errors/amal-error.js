"use strict";
/**
 * AMAL OS — LAYER 20: CORE AMAL ERROR (Section 20.5)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmalError = void 0;
class AmalError extends Error {
    code;
    retryable;
    details;
    constructor(code, message, retryable = false, details) {
        super(message);
        this.code = code;
        this.retryable = retryable;
        this.details = details;
        this.name = 'AmalError';
    }
}
exports.AmalError = AmalError;
//# sourceMappingURL=amal-error.js.map