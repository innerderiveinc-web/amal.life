/**
 * AMAL OS — LAYER 20: CORE AMAL ERROR (Section 20.5)
 */
import { ErrorCode } from './error-codes.js';
export declare class AmalError extends Error {
    readonly code: ErrorCode;
    readonly retryable: boolean;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: ErrorCode, message: string, retryable?: boolean, details?: Record<string, unknown> | undefined);
}
//# sourceMappingURL=amal-error.d.ts.map