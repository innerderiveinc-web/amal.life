"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsentManager = void 0;
class ConsentManager {
    static consents = new Map(); // key: userId:purpose
    static grantConsent(userId, purpose, scope = 'DEFAULT', policyVersion = '1.0') {
        const key = `${userId}:${purpose}`;
        const timestamp = new Date().toISOString();
        const proofHash = `proof_${userId}_${purpose}_${Date.now()}`;
        const consent = {
            id: `cst_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            userId,
            purpose,
            scope,
            status: 'GRANTED',
            policyVersion,
            interfaceVersion: 'v1.0.0',
            proofHash,
            grantedAt: timestamp,
        };
        this.consents.set(key, consent);
        return consent;
    }
    static revokeConsent(userId, purpose) {
        const key = `${userId}:${purpose}`;
        const existing = this.consents.get(key) || {
            id: `cst_${Date.now()}`,
            userId,
            purpose,
            scope: 'DEFAULT',
            status: 'GRANTED',
            policyVersion: '1.0',
            interfaceVersion: 'v1.0.0',
            proofHash: 'retro_proof',
        };
        const updated = {
            ...existing,
            status: 'REVOKED',
            revokedAt: new Date().toISOString(),
        };
        this.consents.set(key, updated);
        // Cascaded withdrawals
        const cascadedActions = [
            `CANCEL_SCHEDULED_JOBS_FOR_${purpose}`,
            `STOP_DERIVED_LEARNING_FOR_${purpose}`,
            `PURGE_EPHEMERAL_INFERENCES_FOR_${purpose}`,
        ];
        return { consent: updated, cascadedActions };
    }
    static isConsentGranted(userId, purpose) {
        const key = `${userId}:${purpose}`;
        const record = this.consents.get(key);
        return !!record && record.status === 'GRANTED';
    }
    static listUserConsents(userId) {
        const userConsents = [];
        for (const [k, v] of this.consents.entries()) {
            if (k.startsWith(`${userId}:`)) {
                userConsents.push(v);
            }
        }
        return userConsents;
    }
    static clear() {
        this.consents.clear();
    }
}
exports.ConsentManager = ConsentManager;
//# sourceMappingURL=consent-manager.js.map