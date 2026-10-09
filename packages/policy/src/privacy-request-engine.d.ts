import { PrivacyRequest, PrivacyRequestType, PrivacyRequestStatus } from '@amal/types';
export interface DeletionDependencyPlan {
    cascadeTables: string[];
    anonymizeTables: string[];
    retainTables: string[];
}
export declare class PrivacyRequestEngine {
    private static requests;
    /**
     * Generates a deletion dependency analysis graph per Section 66.
     */
    static analyzeDeletionDependencies(userId: string): DeletionDependencyPlan;
    static createRequest(userId: string, type: PrivacyRequestType): PrivacyRequest;
    /**
     * Transitions request state through the 8-state machine:
     * REQUESTED -> IDENTITY_VERIFIED -> SCOPED -> APPROVED -> EXECUTING -> VERIFIED -> COMPLETED
     */
    static advanceStatus(id: string, newStatus: PrivacyRequestStatus): PrivacyRequest;
    static getRequest(id: string): PrivacyRequest | undefined;
}
//# sourceMappingURL=privacy-request-engine.d.ts.map