export interface AuthenticatedUser {
  id: string;
  role: 'USER' | 'SCHOLAR' | 'ADMIN' | 'FAMILY_OWNER';
  email: string;
}

export class AuthGuard {
  public static canActivate(token?: string): { authorized: boolean; user?: AuthenticatedUser; reason?: string } {
    if (!token || !token.startsWith('token_')) {
      return { authorized: false, reason: 'MISSING_OR_INVALID_BEARER_TOKEN' };
    }

    const userId = token.replace('token_', '');
    return {
      authorized: true,
      user: {
        id: userId,
        role: 'USER',
        email: `${userId}@example.com`,
      },
    };
  }
}

export class RbacGuard {
  public static checkPermission(
    userRole: string,
    requiredRole: 'USER' | 'SCHOLAR' | 'ADMIN'
  ): boolean {
    const hierarchy: Record<string, number> = {
      USER: 1,
      SCHOLAR: 2,
      ADMIN: 3,
    };

    return (hierarchy[userRole] || 0) >= (hierarchy[requiredRole] || 0);
  }
}
