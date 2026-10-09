/**
 * AMAL OS — LAYER 19: SESSION SERVICE (Section 23)
 */
import { Session } from './auth.types.js';
import { UserId } from '@amal/types';
export declare class SessionService {
    private readonly sessions;
    private readonly tokenToSession;
    private readonly refreshToSession;
    createSession(userId: UserId): Session;
    getSessionByToken(token: string): Session | null;
    refreshSession(refreshToken: string): Session;
    revokeSession(sessionId: string): void;
}
export declare const sessionService: SessionService;
//# sourceMappingURL=session.service.d.ts.map