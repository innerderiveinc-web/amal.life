"use strict";
/**
 * AMAL OS — LAYER 19: SESSION SERVICE (Section 23)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = exports.SessionService = void 0;
class SessionService {
    sessions = new Map();
    tokenToSession = new Map();
    refreshToSession = new Map();
    createSession(userId) {
        const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const token = `token_${id}_${Math.random().toString(36).slice(2, 8)}`;
        const refreshToken = `ref_${id}_${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
        const session = {
            id,
            userId,
            token,
            refreshToken,
            expiresAt,
            revoked: false,
            createdAt: now.toISOString(),
        };
        this.sessions.set(id, session);
        this.tokenToSession.set(token, id);
        this.refreshToSession.set(refreshToken, id);
        return session;
    }
    getSessionByToken(token) {
        const id = this.tokenToSession.get(token);
        if (!id)
            return null;
        const session = this.sessions.get(id);
        if (!session || session.revoked)
            return null;
        return session;
    }
    refreshSession(refreshToken) {
        const id = this.refreshToSession.get(refreshToken);
        if (!id)
            throw new Error('Invalid refresh token.');
        const session = this.sessions.get(id);
        if (!session || session.revoked)
            throw new Error('Session is revoked or expired.');
        session.revoked = true;
        return this.createSession(session.userId);
    }
    revokeSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.revoked = true;
        }
    }
}
exports.SessionService = SessionService;
exports.sessionService = new SessionService();
//# sourceMappingURL=session.service.js.map