import { User, UserRole } from '@amal/types';
export declare class AccessControl {
    private static readonly ROLE_HIERARCHY;
    /**
     * Check if user role meets minimum required role level
     */
    static hasRole(user: User, requiredRole: UserRole): boolean;
    /**
     * Resource-level authorization: ensure users can only access their own sensitive data
     * unless they hold an administrative or assigned scholar permission.
     */
    static canAccessUserResource(actor: User, ownerUserId: string, resourceType: 'PROFILE' | 'REFLECTION' | 'MEMORY' | 'CONTEXT' | 'PRAYER'): boolean;
    /**
     * Scholar case access check: only assigned scholar or scholar reviewer
     */
    static canAccessScholarCase(actor: User, caseUserId: string, assignedScholarId?: string | null): boolean;
}
//# sourceMappingURL=rbac.d.ts.map