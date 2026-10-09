"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TamperEvidentAuditService = void 0;
const crypto_1 = require("crypto");
class TamperEvidentAuditService {
    static events = [];
    static latestHash = 'GENESIS_HASH_AMAL_OS_V1_INIT';
    static recordEvent(payload) {
        const seq = this.events.length + 1;
        const prevHash = this.latestHash;
        const createdAt = new Date().toISOString();
        const dataToHash = `${seq}:${prevHash}:${payload.actorId || 'anon'}:${payload.action}:${payload.resourceType}:${payload.outcome}:${createdAt}`;
        const eventHash = (0, crypto_1.createHash)('sha256').update(dataToHash).digest('hex');
        const event = {
            sequenceNumber: seq,
            previousEventHash: prevHash,
            eventHash,
            actorId: payload.actorId,
            actorType: payload.actorType,
            action: payload.action,
            resourceType: payload.resourceType,
            resourceId: payload.resourceId,
            purpose: payload.purpose,
            outcome: payload.outcome,
            metadata: payload.metadata || {},
            createdAt,
        };
        this.events.push(event);
        this.latestHash = eventHash;
        return event;
    }
    /**
     * Validates the cryptographic integrity of the audit hash chain.
     */
    static verifyChainIntegrity() {
        let expectedPrevHash = 'GENESIS_HASH_AMAL_OS_V1_INIT';
        for (let i = 0; i < this.events.length; i++) {
            const e = this.events[i];
            if (!e)
                continue;
            if (e.previousEventHash !== expectedPrevHash) {
                return { isValid: false, brokenAtSequence: e.sequenceNumber };
            }
            const dataToHash = `${e.sequenceNumber}:${e.previousEventHash}:${e.actorId || 'anon'}:${e.action}:${e.resourceType}:${e.outcome}:${e.createdAt}`;
            const calculatedHash = (0, crypto_1.createHash)('sha256').update(dataToHash).digest('hex');
            if (e.eventHash !== calculatedHash) {
                return { isValid: false, brokenAtSequence: e.sequenceNumber };
            }
            expectedPrevHash = e.eventHash;
        }
        return { isValid: true };
    }
    static getEvents() {
        return [...this.events];
    }
    static clear() {
        this.events = [];
        this.latestHash = 'GENESIS_HASH_AMAL_OS_V1_INIT';
    }
}
exports.TamperEvidentAuditService = TamperEvidentAuditService;
//# sourceMappingURL=tamper-evident-audit.js.map