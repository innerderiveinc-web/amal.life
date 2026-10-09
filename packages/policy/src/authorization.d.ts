import { AccountMode } from '@amal/types';
export declare class AuthorizationService {
    /**
     * Asserts whether a user or family member can read a reflection.
     * Strictly enforces adult reflection isolation.
     */
    static canReadReflection(user: {
        id: string;
        role: string;
        accountMode?: AccountMode;
    }, reflection: {
        id: string;
        userId: string;
        isSharedWithFamily?: boolean;
    }): boolean;
    /**
     * Asserts whether an actor can manage family configuration.
     */
    static canManageFamily(user: {
        id: string;
        role: string;
    }, familyOwnerId: string): boolean;
    /**
     * Asserts whether a user can initiate scholar inquiry.
     * Gated for minor/child accounts.
     */
    static canEscalateToScholar(user: {
        id: string;
        role: string;
        accountMode?: AccountMode;
    }, parentalApproval?: boolean): boolean;
    /**
     * Asserts valid break-glass emergency administrative access.
     * Requires separate approver (Four-Eyes principle).
     */
    static canBreakGlass(admin: {
        id: string;
        role: string;
    }, justification: string, approverId: string): boolean;
}
//# sourceMappingURL=authorization.d.ts.map