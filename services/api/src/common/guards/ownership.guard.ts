import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { AuthUser } from './auth.guard.js';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: AuthUser = request.user;
    if (!user) {
      throw new ForbiddenException('User unauthenticated');
    }

    const resourceOwnerId = request.params?.userId || request.body?.userId;
    if (resourceOwnerId && resourceOwnerId !== user.id && !user.roles.includes('SUPER_ADMIN')) {
      throw new ForbiddenException('Forbidden: Resource ownership mismatch');
    }

    return true;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[] = ['USER']) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: AuthUser = request.user;
    if (!user) return false;

    if (user.roles.includes('SUPER_ADMIN')) return true;

    const hasRole = this.requiredRoles.some(role => user.roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(`Forbidden: Required roles [${this.requiredRoles.join(', ')}]`);
    }
    return true;
  }
}
