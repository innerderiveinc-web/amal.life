export interface AuthenticatedUser {
    id: string;
    role: 'USER' | 'SCHOLAR' | 'ADMIN' | 'FAMILY_OWNER';
    email: string;
}
export declare class AuthGuard {
    static canActivate(token?: string): {
        authorized: boolean;
        user?: AuthenticatedUser;
        reason?: string;
    };
}
export declare class RbacGuard {
    static checkPermission(userRole: string, requiredRole: 'USER' | 'SCHOLAR' | 'ADMIN'): boolean;
}
//# sourceMappingURL=auth.guard.d.ts.map