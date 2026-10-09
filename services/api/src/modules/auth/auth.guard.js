"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacGuard = exports.AuthGuard = void 0;
class AuthGuard {
    static canActivate(token) {
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
exports.AuthGuard = AuthGuard;
class RbacGuard {
    static checkPermission(userRole, requiredRole) {
        const hierarchy = {
            USER: 1,
            SCHOLAR: 2,
            ADMIN: 3,
        };
        return (hierarchy[userRole] || 0) >= (hierarchy[requiredRole] || 0);
    }
}
exports.RbacGuard = RbacGuard;
//# sourceMappingURL=auth.guard.js.map