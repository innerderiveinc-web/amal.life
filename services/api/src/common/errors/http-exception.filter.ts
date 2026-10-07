/**
 * AMAL OS — LAYER 20: GLOBAL HTTP EXCEPTION FILTER (Section 20.30)
 * Sanitizes errors and enforces non-leaking error responses.
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AmalError } from './amal-error.js';
import { ErrorCode } from './error-codes.js';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const requestId = request.requestId || request.headers?.['x-request-id'] || `req_${Date.now()}`;

    if (exception instanceof AmalError) {
      return response.status(this.mapStatus(exception.code)).json({
        error: {
          code: exception.code,
          message: this.redactInternalDetails(exception.message),
          request_id: requestId,
        },
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res: any = exception.getResponse();
      const message = typeof res === 'object' && res.message ? res.message : exception.message;
      return response.status(status).json({
        error: {
          code: status === 401 ? ErrorCode.UNAUTHORIZED : status === 403 ? ErrorCode.FORBIDDEN : ErrorCode.VALIDATION_ERROR,
          message: this.redactInternalDetails(Array.isArray(message) ? message.join(', ') : String(message)),
          request_id: requestId,
        },
      });
    }

    // Never leak raw internal SQL, Redis, or stack trace errors
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'An unexpected internal error occurred.',
        request_id: requestId,
      },
    });
  }

  public redactInternalDetails(raw: string): string {
    // Redact SQL, Postgres, table names, prompt text, passwords, tokens
    return raw
      .replace(/select .* from/gi, '[REDACTED_QUERY]')
      .replace(/insert into/gi, '[REDACTED_QUERY]')
      .replace(/update .* set/gi, '[REDACTED_QUERY]')
      .replace(/bearer [a-zA-Z0-9_\-\.]+/gi, 'Bearer [REDACTED]')
      .replace(/password:?\s*\S+/gi, 'password: [REDACTED]');
  }

  private mapStatus(code: ErrorCode): number {
    switch (code) {
      case ErrorCode.UNAUTHORIZED:
        return 401;
      case ErrorCode.FORBIDDEN:
      case ErrorCode.POLICY_DENIED:
        return 403;
      case ErrorCode.NOT_FOUND:
        return 404;
      case ErrorCode.VALIDATION_ERROR:
        return 400;
      case ErrorCode.CONFLICT:
      case ErrorCode.IDEMPOTENCY_CONFLICT:
        return 409;
      case ErrorCode.RATE_LIMITED:
        return 429;
      default:
        return 500;
    }
  }
}
