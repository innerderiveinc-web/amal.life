import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) {
      throw new UnauthorizedException('Invalid Bearer token');
    }

    // In testing/dev, user ID can be parsed from token or mocked
    const user: AuthUser = {
      id: request.headers['x-user-id'] || token || 'usr_test_default',
      email: request.headers['x-user-email'] || 'user@amal.app',
      roles: (request.headers['x-user-roles']?.split(',') as string[]) || ['USER'],
    };

    request.user = user;
    return true;
  }
}
