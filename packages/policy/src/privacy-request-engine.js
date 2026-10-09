"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyRequestEngine = void 0;
class PrivacyRequestEngine {
    static requests = new Map();
    /**
     * Generates a deletion dependency analysis graph per Section 66.
     */
    static analyzeDeletionDependencies(userId) {
        return {
            cascadeTables: [
                'reflections',
                'amal_completions',
                'user_journeys',
                'user_goals',
                'user_context',
                'device_registrations',
                'communication_consents',
            ],
            anonymizeTables: [
                'scholar_cases',
                'product_feedback',
                'aggregate_metrics',
            ],
            retainTables: [
                'tamper_evident_audit_log', // Required by legal and regulatory security hold
            ],
        };
    }
    static createRequest(userId, type) {
        const id = `priv_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const depAnalysis = type === 'DELETE' ? this.analyzeDeletionDependencies(userId) : undefined;
        const req = {
            id,
            userId,
            requestType: type,
            status: 'REQUESTED',
            scope: ['ALL_USER_DATA'],
            dependencyAnalysis: depAnalysis,
            createdAt: new Date().toISOString(),
        };
        this.requests.set(id, req);
        return req;
    }
    /**
     * Transitions request state through the 8-state machine:
     * REQUESTED -> IDENTITY_VERIFIED -> SCOPED -> APPROVED -> EXECUTING -> VERIFIED -> COMPLETED
     */
    static advanceStatus(id, newStatus) {
        const req = this.requests.get(id);
        if (!req) {
            throw new Error(`Privacy request not found: ${id}`);
        }
        req.status = newStatus;
        if (newStatus === 'COMPLETED') {
            req.completedAt = new Date().toISOString();
        }
        return req;
    }
    static getRequest(id) {
        return this.requests.get(id);
    }
}
exports.PrivacyRequestEngine = PrivacyRequestEngine;
//# sourceMappingURL=privacy-request-engine.js.map