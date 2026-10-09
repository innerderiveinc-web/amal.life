import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class OwnershipGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
export declare class RolesGuard implements CanActivate {
    private readonly requiredRoles;
    constructor(requiredRoles?: string[]);
    canActivate(context: ExecutionContext): boolean;
}
//# sourceMappingURL=ownership.guard.d.ts.map