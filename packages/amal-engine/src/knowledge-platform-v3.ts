/**
 * AMAL OS V3.0 — Knowledge Platform & Governance Engine V3
 * Source registry, licensing, immutable release hashes, rollback mechanism, and Global Knowledge Lock.
 */

import { EcosystemKnowledgeRelease, SourceRegistryV3 } from '@amal/types';

export class KnowledgePlatformEngineV3 {
  private sources: Map<string, SourceRegistryV3> = new Map();
  private releases: Map<string, EcosystemKnowledgeRelease> = new Map();
  private activeReleaseId: string = 'KNOWLEDGE_RELEASE_1';

  constructor() {
    this.seedSources();
    this.seedReleases();
  }

  private seedSources(): void {
    const s1: SourceRegistryV3 = {
      sourceId: 'SRC_QURAN_MADINAH',
      title: 'The Holy Qur\'an — King Fahd Complex Mushaf al-Madinah',
      author: 'Uthmanic Text Recension',
      edition: '1440 AH Edition',
      licenseType: 'OPEN_ISLAMIC_PUBLIC_DOMAIN',
      artifactHash: 'sha256:7b91d39c0f91b7a2d64a029c7d4289ea6b1f28b493198031d1ef5461234abcde',
      commercialPermission: true,
      reviewLineage: ['Imam Malik Lineage', 'KFC Verification Board 1440 AH']
    };

    const s2: SourceRegistryV3 = {
      sourceId: 'SRC_BUKHARI_DAR_TASSIL',
      title: 'Sahih al-Bukhari (Al-Jami\' al-Sahih)',
      author: 'Imam Muhammad ibn Ismail al-Bukhari',
      edition: 'Dar al-Ta\'sil Verified Critical Edition (8 Volumes)',
      licenseType: 'SCHOLARLY_LICENSED_DIGITAL',
      artifactHash: 'sha256:9c84e12d30bf654a108e4f1692cb4798623b320d58fa6c52a321946399fedcba',
      commercialPermission: true,
      reviewLineage: ['Al-Firabri Recension', 'Dar al-Ta\'sil Board 2019']
    };

    const s3: SourceRegistryV3 = {
      sourceId: 'SRC_MUSLIM_DAR_TASSIL',
      title: 'Sahih Muslim',
      author: 'Imam Muslim ibn al-Hajjaj al-Naysaburi',
      edition: 'Dar al-Ta\'sil Critical Edition (5 Volumes)',
      licenseType: 'SCHOLARLY_LICENSED_DIGITAL',
      artifactHash: 'sha256:6e18f21a48c90b63e5272a859c73ef3276801948d3902fbc4123891047abcdef',
      commercialPermission: true,
      reviewLineage: ['Ibn Mahran Recension', 'Dar al-Ta\'sil Board 2021']
    };

    this.sources.set(s1.sourceId, s1);
    this.sources.set(s2.sourceId, s2);
    this.sources.set(s3.sourceId, s3);
  }

  private seedReleases(): void {
    const r1: EcosystemKnowledgeRelease = {
      releaseId: 'KNOWLEDGE_RELEASE_1',
      version: '1.0.0',
      immutableRootHash: 'merkle:d987623a41b59074d28e4693a123f0987cba12480198642398571290384756ab',
      claimsCount: 1420,
      sourcesCount: 8,
      status: 'PUBLISHED',
      publishedAt: '2026-09-01T00:00:00.000Z'
    };

    const r2: EcosystemKnowledgeRelease = {
      releaseId: 'KNOWLEDGE_RELEASE_2',
      version: '2.0.0',
      immutableRootHash: 'merkle:f456123c890a1234b67890def123456789abcdef0123456789abcdef01234567',
      claimsCount: 3850,
      sourcesCount: 16,
      status: 'STAGED',
      publishedAt: '2026-10-08T00:00:00.000Z'
    };

    this.releases.set(r1.releaseId, r1);
    this.releases.set(r2.releaseId, r2);
  }

  public getActiveRelease(): EcosystemKnowledgeRelease {
    const rel = this.releases.get(this.activeReleaseId);
    if (!rel) throw new Error(`CRITICAL: Active release ${this.activeReleaseId} missing.`);
    return rel;
  }

  public promoteRelease(releaseId: string): EcosystemKnowledgeRelease {
    const rel = this.releases.get(releaseId);
    if (!rel) throw new Error(`RELEASE_NOT_FOUND: Knowledge release ${releaseId} does not exist.`);
    rel.status = 'PUBLISHED';
    this.activeReleaseId = releaseId;
    return rel;
  }

  public rollbackToPreviousRelease(targetReleaseId: string, reason: string): EcosystemKnowledgeRelease {
    const target = this.releases.get(targetReleaseId);
    if (!target) throw new Error(`ROLLBACK_TARGET_NOT_FOUND: Target release ${targetReleaseId} does not exist.`);

    const current = this.releases.get(this.activeReleaseId);
    if (current) {
      current.status = 'ROLLED_BACK';
    }

    target.status = 'PUBLISHED';
    this.activeReleaseId = targetReleaseId;
    return target;
  }

  public assertGlobalKnowledgeLock(triggerSource: string): void {
    // Section 32: Production corpus can NEVER be changed through user behavior, engagement, commercial pressure, partner request, or AI preference
    const prohibitedTriggers = [
      'USER_BEHAVIOR',
      'USER_POPULARITY',
      'COMMERCIAL_PRESSURE',
      'PARTNER_REQUEST',
      'INSTITUTION_REQUEST',
      'AI_PREFERENCE'
    ];

    if (prohibitedTriggers.includes(triggerSource)) {
      throw new Error(
        `GLOBAL_KNOWLEDGE_LOCK_VIOLATION: Production Islamic knowledge cannot be altered via ${triggerSource}. All modifications require Two-Scholar Governance Council ratification.`
      );
    }
  }

  public getSource(sourceId: string): SourceRegistryV3 | undefined {
    return this.sources.get(sourceId);
  }
}
