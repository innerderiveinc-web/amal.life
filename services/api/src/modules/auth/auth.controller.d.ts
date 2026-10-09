/**
 * AMAL OS — LAYER 19: AUTH CONTROLLER (Section 24)
 * REST endpoints for authentication, token refresh, session revocation, and current user retrieval.
 */
export declare class AuthController {
    login(body: {
        email: string;
        password?: string;
    }): Promise<{
        success: boolean;
        data: {
            user: import("@amal/types").User;
            session: import("@amal/auth").Session;
        };
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        success: boolean;
        data: {
            session: import("@amal/auth").Session;
        };
    }>;
    logout(body: {
        sessionId: string;
    }): Promise<{
        success: boolean;
        data: {
            loggedOut: boolean;
        };
    }>;
    getMe(authHeader?: string): Promise<{
        success: boolean;
        data: {
            user: import("@amal/types").User;
        };
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map