"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceRegistry = void 0;
const crypto_1 = require("crypto");
class SourceRegistry {
    static sources = new Map();
    /**
     * Register a new canonical or candidate Islamic source
     */
    static registerSource(data) {
        const raw = data.rawArtifactContent || `${data.title}:${data.author}:${data.edition || '1'}`;
        const hash = (0, crypto_1.createHash)('sha256').update(raw).digest('hex');
        const defaultDimensions = {
            sourceType: data.sourceType,
            primaryStatus: data.sourceType === 'QURAN' || data.sourceType === 'HADITH' ? 'VERIFIED' : 'SECONDARY',
            provenanceStatus: 'VERIFIED',
            referenceStatus: 'VERIFIED',
            attributionStatus: 'VERIFIED',
            licenseStatus: 'APPROVED',
            editorialStatus: 'APPROVED',
            scholarReviewStatus: 'APPROVED',
            contextStatus: 'VERIFIED',
            publicationStatus: 'PUBLISHED',
            ...data.authorityDimensions,
        };
        const isFullyApproved = defaultDimensions.provenanceStatus === 'VERIFIED' &&
            defaultDimensions.referenceStatus === 'VERIFIED' &&
            defaultDimensions.licenseStatus === 'APPROVED' &&
            defaultDimensions.editorialStatus === 'APPROVED' &&
            defaultDimensions.scholarReviewStatus === 'APPROVED' &&
            defaultDimensions.publicationStatus === 'PUBLISHED';
        const source = {
            id: data.id,
            sourceType: data.sourceType,
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            edition: data.edition,
            publicationYear: data.publicationYear,
            digitalArtifactHash: `sha256_${hash}`,
            authorityDimensions: defaultDimensions,
            verificationLevel: isFullyApproved ? 'LEVEL_7_PRODUCTION_PUBLISHED' : 'LEVEL_2_SOURCE_IDENTIFIED',
            locked: isFullyApproved,
            version: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.sources.set(source.id, source);
        return source;
    }
    static getSource(id) {
        return this.sources.get(id);
    }
    static getAllSources() {
        return Array.from(this.sources.values());
    }
    /**
     * Check if a source meets production publication requirements
     */
    static isProductionEligible(sourceId) {
        const src = this.sources.get(sourceId);
        if (!src)
            return false;
        const d = src.authorityDimensions;
        return (d.publicationStatus === 'PUBLISHED' &&
            d.provenanceStatus === 'VERIFIED' &&
            d.referenceStatus === 'VERIFIED' &&
            d.licenseStatus === 'APPROVED' &&
            d.editorialStatus === 'APPROVED' &&
            d.scholarReviewStatus === 'APPROVED' &&
            src.verificationLevel === 'LEVEL_7_PRODUCTION_PUBLISHED');
    }
    /**
     * Invariant: Locked published sources cannot be modified without new version
     */
    static updateSource(id, updates) {
        const existing = this.sources.get(id);
        if (!existing)
            throw new Error(`Source not found: ${id}`);
        if (existing.locked) {
            throw new Error(`KNOWLEDGE_LOCK_VIOLATION: Source ${id} is locked and approved. Create a new version.`);
        }
        const updated = {
            ...existing,
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        this.sources.set(id, updated);
        return updated;
    }
    static clear() {
        this.sources.clear();
    }
}
exports.SourceRegistry = SourceRegistry;
//# sourceMappingURL=source-registry.js.map