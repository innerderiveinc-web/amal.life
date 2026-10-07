import { KnowledgeReleaseRecord } from '@amal/types';

export class KnowledgeReleaseService {
  private static releases: Map<string, KnowledgeReleaseRecord> = new Map();
  private static activeAlias: 'index_A' | 'index_B' = 'index_A';

  public static createRelease(data: {
    releaseTag: string;
    sourceVersions: string[];
    evidenceChanges: string[];
    graphChanges: string[];
    reviewerIds: string[];
    approverId: string;
    releaseNotes?: string;
  }): KnowledgeReleaseRecord {
    const id = `rel_${Date.now()}`;
    const record: KnowledgeReleaseRecord = {
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

  public static publishRelease(releaseId: string): KnowledgeReleaseRecord {
    const rel = this.releases.get(releaseId);
    if (!rel) throw new Error(`Release not found: ${releaseId}`);

    // Flip blue-green search alias
    const nextAlias = this.activeAlias === 'index_A' ? 'index_B' : 'index_A';
    this.activeAlias = nextAlias;

    rel.status = 'PUBLISHED';
    rel.activeSearchAlias = nextAlias;
    rel.rollbackSnapshotTag = `snapshot_prior_to_${rel.releaseTag}`;
    return rel;
  }

  public static rollbackRelease(releaseId: string): KnowledgeReleaseRecord {
    const rel = this.releases.get(releaseId);
    if (!rel) throw new Error(`Release not found: ${releaseId}`);

    // Revert blue-green search alias
    const prevAlias = this.activeAlias === 'index_A' ? 'index_B' : 'index_A';
    this.activeAlias = prevAlias;

    rel.status = 'ROLLED_BACK';
    rel.activeSearchAlias = prevAlias;
    return rel;
  }

  public static getActiveSearchAlias(): 'index_A' | 'index_B' {
    return this.activeAlias;
  }

  public static getRelease(id: string): KnowledgeReleaseRecord | undefined {
    return this.releases.get(id);
  }

  public static getAllReleases(): KnowledgeReleaseRecord[] {
    return Array.from(this.releases.values());
  }
}
