/**
 * AMAL OS — USERS CONTROLLER
 * Manages seeker profile, preferences, and locale settings.
 */
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export declare class UsersController {
    getProfile(user: AuthenticatedUser): Promise<{
        userId: string;
        email: string;
        profile: import("@amal/types").UserProfile | {
            displayName: string;
            language: string;
            timezone: string;
        };
    }>;
    updateProfile(user: AuthenticatedUser, body: any): Promise<any>;
    getPreferences(user: AuthenticatedUser): Promise<import("@amal/types").UserPreference | {
        userId: string;
        prayerCalculationMethod: "MWL";
        asrJuristicMethod: string;
        madhhab: "Hanafi";
        dailyTimeBudgetMinutes: number;
        notificationIntensity: string;
    }>;
    updatePreferences(user: AuthenticatedUser, body: any): Promise<any>;
}
//# sourceMappingURL=users.controller.d.ts.map