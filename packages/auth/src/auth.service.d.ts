/**
 * AMAL OS — LAYER 19: AUTH SERVICE (Section 23)
 */
import { User, UserId } from '@amal/types';
import { AuthResult, Session } from './auth.types.js';
export declare class AuthService {
    authenticate(email: string, password?: string): Promise<AuthResult>;
    createSession(userId: UserId): Session;
    refreshSession(refreshToken: string): Session;
    revokeSession(sessionId: string): void;
    getCurrentUser(token: string): User | null;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map