/**
 * AMAL OS — LAYER 19: USER OWNERSHIP & PRIVATE RESOURCE GUARDS (Sections 184-185)
 * Strict boundary assertions preventing cross-tenant and inter-family privacy leaks.
 */
export declare function assertOwner(actorId: string, resourceOwnerId: string): void;
export interface PrivateResourceAccessParams {
    actorId: string;
    resourceOwnerId: string;
    permission?: string;
    isFamilyHead?: boolean;
}
export declare function assertPrivateResourceAccess(params: PrivateResourceAccessParams): void;
//# sourceMappingURL=ownership.d.ts.map