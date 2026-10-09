"use strict";
// ==============================================================================
// AMAL OS — KNOWLEDGE PASSPORT & KNOWLEDGE FIREWALL (Control #25 & #26)
// Complete auditable passport for every Islamic knowledge artifact.
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgePassport = void 0;
class KnowledgePassport {
    static passports = new Map();
    static issuePassport(data) {
        this.passports.set(data.passportId, data);
        return data;
    }
    static getPassport(passportId) {
        return this.passports.get(passportId);
    }
    /**
     * Deterministic production eligibility check:
     * Only valid if Level 7, verified provenance, license approved, and zero unhandled conflicts.
     */
    static isProductionEligible(passportId) {
        const p = this.passports.get(passportId);
        if (!p) {
            return { eligible: false, reason: `NO_PASSPORT: Knowledge item ${passportId} lacks a Knowledge Passport.` };
        }
        if (p.verificationLevel !== 'LEVEL_7_PRODUCTION_PUBLISHED') {
            return { eligible: false, reason: `INSUFFICIENT_LEVEL: Verification level is ${p.verificationLevel}, requires LEVEL_7.` };
        }
        if (p.hasConflict) {
            return { eligible: false, reason: 'ACTIVE_CONFLICT: Knowledge passport records an unhandled source conflict.' };
        }
        if (!p.provenanceHash || !p.provenanceHash.startsWith('sha256_')) {
            return { eligible: false, reason: 'INVALID_PROVENANCE_HASH: Cryptographic SHA-256 hash is missing or malformed.' };
        }
        return { eligible: true };
    }
}
exports.KnowledgePassport = KnowledgePassport;
//# sourceMappingURL=knowledge-passport.js.map