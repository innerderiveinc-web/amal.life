/**
 * AMAL OS — FAMILY CONTROLLER
 * Manages family workspace, shared journeys, and strictly protects adult reflection isolation.
 */
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export declare class FamilyController {
    getFamily(user: AuthenticatedUser): Promise<{
        familyId: string;
        name: string;
        ownerId: string;
        members: {
            userId: string;
            displayName: string;
            role: string;
            accountMode: string;
        }[];
        privacyGuarantees: {
            adultReflectionIsolation: boolean;
            privateMuhasabahProtected: boolean;
            sharedOnlyWithConsent: boolean;
        };
    }>;
    inviteMember(user: AuthenticatedUser, body: {
        email: string;
        displayName: string;
        accountMode?: string;
    }): Promise<{
        invited: boolean;
        inviteToken: string;
        email: string;
        role: string;
        accountMode: string;
    }>;
    getSharedJourneys(user: AuthenticatedUser): Promise<{
        id: string;
        title: string;
        pace: string;
        participantsCount: number;
        activePhase: string;
    }[]>;
}
//# sourceMappingURL=family.controller.d.ts.map