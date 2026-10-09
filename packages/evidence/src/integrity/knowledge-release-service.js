"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeReleaseService = void 0;
class KnowledgeReleaseService {
    static releases = new Map();
    static activeAlias = 'index_A';
    static createRelease(data) {
        const id = `rel_${Date.now()}`;
        const record = {
            id,
            releaseTag: data.releaseTag,
            sourceVersions: data.sourceVersions,
            evidenceChanges: data.evidenceChanges,
            graphChanges: data.graphChanges,
            reviewerIds: data.reviewerIds,
            approverId: data.approverId,
            status: 'CANDIDATE',
            activeSearchAlias: this.activeAlias,
            releaseNotes: data.releaseNotes || 'Candidate release',
            createdAt: new Date().toISOString(),
        };
        this.releases.set(id, record);
        return record;
    }
    static publishRelease(releaseId) {
        const rel = this.releases.get(releaseId);
        if (!rel)
            throw new Error(`Release not found: ${releaseId}`);
        // Flip blue-green search alias
        const nextAlias = this.activeAlias === 'index_A' ? 'index_B' : 'index_A';
        this.activeAlias = nextAlias;
        rel.status = 'PUBLISHED';
        rel.activeSearchAlias = nextAlias;
        rel.rollbackSnapshotTag = `snapshot_prior_to_${rel.releaseTag}`;
        return rel;
    }
    static rollbackRelease(releaseId) {
        const rel = this.releases.get(releaseId);
        if (!rel)
            throw new Error(`Release not found: ${releaseId}`);
        // Revert blue-green search alias
        const prevAlias = this.activeAlias === 'index_A' ? 'index_B' : 'index_A';
        this.activeAlias = prevAlias;
        rel.status = 'ROLLED_BACK';
        rel.activeSearchAlias = prevAlias;
        return rel;
    }
    static getActiveSearchAlias() {
        return this.activeAlias;
    }
    static getRelease(id) {
        return this.releases.get(id);
    }
    static getAllReleases() {
        return Array.from(this.releases.values());
    }
}
exports.KnowledgeReleaseService = KnowledgeReleaseService;
//# sourceMappingURL=knowledge-release-service.js.map