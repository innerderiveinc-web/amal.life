/**
 * AMAL OS — SCHOLARS CONTROLLER
 * Verified scholar directory and governed Class D case escalation.
 */
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export declare class ScholarsController {
    listScholars(): Promise<{
        id: string;
        name: string;
        title: string;
        specialties: string[];
        verificationStatus: string;
    }[]>;
    getScholar(id: string): Promise<{
        id: string;
        name: string;
        verificationStatus: string;
        credentials: string[];
        jurisdiction: string;
        languages: string[];
    }>;
    createCase(user: AuthenticatedUser, body: {
        question: string;
        category?: string;
        urgency?: string;
        context?: string;
    }): Promise<{
        caseId: string;
        userId: string;
        question: string;
        status: string;
        twoScholarRuleRequired: boolean;
        createdAt: string;
    }>;
    getCase(user: AuthenticatedUser, id: string): Promise<{
        caseId: string;
        userId: string;
        status: string;
        assignedScholars: string[];
        twoPersonRuleSatisfied: boolean;
        createdAt: string;
    }>;
}
//# sourceMappingURL=scholars.controller.d.ts.map