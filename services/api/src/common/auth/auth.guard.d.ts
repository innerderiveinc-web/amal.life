/**
 * AMAL OS — LAYER 20: AUTH GUARD (Section 20.10, 20.18)
 * Standard NestJS CanActivate guard extracting and verifying authenticated user context.
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
//# sourceMappingURL=auth.guard.d.ts.map