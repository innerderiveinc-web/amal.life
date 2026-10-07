import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface IdempotencyRecord {
  response: any;
  timestamp: number;
}

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private static cache = new Map<string, IdempotencyRecord>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    // Only apply to mutating requests (POST, PUT, PATCH, DELETE)
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle();
    }

    const key = request.headers['idempotency-key'] as string;
    if (!key) {
      // In strict mode, throw BadRequestException; otherwise proceed
      return next.handle();
    }

    const userId = request.user?.id || 'anonymous';
    const compoundKey = `${userId}:${key}`;

    if (IdempotencyInterceptor.cache.has(compoundKey)) {
      const cached = IdempotencyInterceptor.cache.get(compoundKey)!;
      return of(cached.response);
    }

    return next.handle().pipe(
      tap((res) => {
        IdempotencyInterceptor.cache.set(compoundKey, {
          response: res,
          timestamp: Date.now(),
        });
      })
    );
  }

  public static clear(): void {
    this.cache.clear();
  }
}
