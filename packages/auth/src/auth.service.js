"use strict";
/**
 * AMAL OS — LAYER 19: AUTH SERVICE (Section 23)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const types_1 = require("@amal/types");
const identity_js_1 = require("./identity.js");
const session_service_js_1 = require("./session.service.js");
const database_1 = require("@amal/database");
class AuthService {
    async authenticate(email, password) {
        if (!email) {
            throw new types_1.AppError('VALIDATION_ERROR', 'Email is required.');
        }
        const user = await identity_js_1.identityProvider.verifyCredentials(email, password);
        if (!user) {
            throw new types_1.AppError('UNAUTHORIZED', 'Invalid credentials.');
        }
        const session = session_service_js_1.sessionService.createSession((0, types_1.toUserId)(user.id));
        return { user, session };
    }
    createSession(userId) {
        return session_service_js_1.sessionService.createSession(userId);
    }
    refreshSession(refreshToken) {
        return session_service_js_1.sessionService.refreshSession(refreshToken);
    }
    revokeSession(sessionId) {
        session_service_js_1.sessionService.revokeSession(sessionId);
    }
    getCurrentUser(token) {
        const session = session_service_js_1.sessionService.getSessionByToken(token);
        if (!session)
            return null;
        return database_1.db.users.get(session.userId) || null;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map