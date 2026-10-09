import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class IdempotencyInterceptor implements NestInterceptor {
    private static cache;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    static clear(): void;
}
//# sourceMappingURL=idempotency.interceptor.d.ts.map