/**
 * AMAL OS — LAYER 20: GLOBAL HTTP EXCEPTION FILTER (Section 20.30)
 * Sanitizes errors and enforces non-leaking error responses.
 */
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any;
    redactInternalDetails(raw: string): string;
    private mapStatus;
}
//# sourceMappingURL=http-exception.filter.d.ts.map