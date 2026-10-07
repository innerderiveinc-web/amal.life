/**
 * AMAL OS — LAYER 20: CORE AMAL ERROR (Section 20.5)
 */

import { ErrorCode } from './error-codes.js';

export class AmalError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly retryable = false,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AmalError';
  }
}
