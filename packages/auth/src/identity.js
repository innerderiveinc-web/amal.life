"use strict";
/**
 * AMAL OS — LAYER 19: IDENTITY VERIFICATION (Section 23)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityProvider = exports.IdentityProvider = void 0;
const database_1 = require("@amal/database");
class IdentityProvider {
    async findByEmail(email) {
        for (const u of database_1.db.users.values()) {
            if (u.email?.toLowerCase() === email.toLowerCase()) {
                return u;
            }
        }
        return null;
    }
    async verifyCredentials(email, _password) {
        // In starter development/local mode, find or create demo user
        let user = await this.findByEmail(email);
        if (!user) {
            const now = new Date().toISOString();
            const userId = `usr_${Date.now()}`;
            user = {
                id: userId,
                email,
                role: 'USER',
                status: 'ACTIVE',
                createdAt: now,
                updatedAt: now,
            };
            database_1.db.users.set(userId, user);
        }
        return user;
    }
}
exports.IdentityProvider = IdentityProvider;
exports.identityProvider = new IdentityProvider();
//# sourceMappingURL=identity.js.map