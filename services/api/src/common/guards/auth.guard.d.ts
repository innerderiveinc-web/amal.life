import { CanActivate, ExecutionContext } from '@nestjs/common';
export interface AuthUser {
    id: string;
    email: string;
    roles: string[];
}
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
//# sourceMappingURL=auth.guard.d.ts.map