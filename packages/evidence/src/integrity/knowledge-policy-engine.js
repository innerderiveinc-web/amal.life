"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgePolicyEngine = void 0;
const source_registry_js_1 = require("./source-registry.js");
const governance_engine_js_1 = require("../governance-engine.js");
class KnowledgePolicyEngine {
    // Feature flag default: false in new deployments until complete knowledge gate passes
    static islamicAiEnabled = false;
    static setIslamicAiEnabled(enabled) {
        this.islamicAiEnabled = enabled;
    }
    static isIslamicAiEnabled() {
        return this.islamicAiEnabled;
    }
    /**
     * Central policy evaluation for production retrieval
     * Enforces: APPROVED + PUBLISHED + PROVENANCE_VERIFIED + REFERENCE_VERIFIED + NOT_QUARANTINED
     */
    static evaluateRetrieval(sourceId) {
        // 1. Quarantine check
        if (governance_engine_js_1.IslamicGovernanceEngine.isQuarantined(sourceId)) {
            return {
                allowed: false,
                sourceId,
                reason: 'QUARANTINED: Source is in quarantine due to verification anomaly.',
            };
        }
        // 2. Source registry check
        const source = source_registry_js_1.SourceRegistry.getSource(sourceId);
        if (!source) {
            return {
                allowed: false,
                sourceId,
                reason: 'UNREGISTERED_SOURCE: Source does not exist in canonical registry.',
            };
        }
        const d = source.authorityDimensions;
        if (d.publicationStatus !== 'PUBLISHED') {
            return {
                allowed: false,
                sourceId,
                reason: `NOT_PUBLISHED: Publication status is ${d.publicationStatus}.`,
            };
        }
        if (d.provenanceStatus !== 'VERIFIED') {
            return {
                allowed: false,
                sourceId,
                reason: `UNVERIFIED_PROVENANCE: Provenance status is ${d.provenanceStatus}.`,
            };
        }
        if (d.referenceStatus !== 'VERIFIED') {
            return {
                allowed: false,
                sourceId,
                reason: `UNVERIFIED_REFERENCE: Reference status is ${d.referenceStatus}.`,
            };
        }
        if (d.licenseStatus !== 'APPROVED') {
            return {
                allowed: false,
                sourceId,
                reason: `UNAPPROVED_LICENSE: License status is ${d.licenseStatus}.`,
            };
        }
        if (d.editorialStatus !== 'APPROVED') {
            return {
                allowed: false,
                sourceId,
                reason: `EDITORIAL_PENDING: Editorial review status is ${d.editorialStatus}.`,
            };
        }
        if (d.scholarReviewStatus !== 'APPROVED') {
            return {
                allowed: false,
                sourceId,
                reason: `SCHOLAR_PENDING: Scholar review status is ${d.scholarReviewStatus}.`,
            };
        }
        return {
            allowed: true,
            sourceId,
        };
    }
    /**
     * Gate AI generation: If ISLAMIC_AI_ENABLED is false, block generation and enforce deterministic fallback
     */
    static canGenerateAiResponse() {
        if (!this.islamicAiEnabled) {
            return {
                canGenerate: false,
                fallbackMessage: 'Islamic AI generation is currently gated. Direct deterministic evidence is provided below.',
            };
        }
        return { canGenerate: true };
    }
}
exports.KnowledgePolicyEngine = KnowledgePolicyEngine;
//# sourceMappingURL=knowledge-policy-engine.js.map