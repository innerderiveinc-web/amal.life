import {
  SourceAuthorityDimensions,
  AuthorityLicenseStatus,
  VerificationLevel,
} from '@amal/types';
import { createHash } from 'crypto';

export interface RegisteredSource {
  id: string;
  sourceType: string;
  title: string;
  author: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  digitalArtifactHash: string;
  authorityDimensions: SourceAuthorityDimensions;
  verificationLevel: VerificationLevel;
  locked: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export class SourceRegistry {
  private static sources: Map<string, RegisteredSource> = new Map();

  /**
   * Register a new canonical or candidate Islamic source
   */
  public static registerSource(data: {
    id: string;
    sourceType: string;
    title: string;
    author: string;
    publisher?: string;
    edition?: string;
    publicationYear?: number;
    rawArtifactContent?: Buffer | string;
    authorityDimensions?: Partial<SourceAuthorityDimensions>;
  }): RegisteredSource {
    const hasArtifact = Boolean(data.rawArtifactContent);
    const raw = data.rawArtifactContent || `${data.title}:${data.author}:${data.edition || '1'}`;
    const hash = createHash('sha256').update(raw).digest('hex');

    const defaultDimensions: SourceAuthorityDimensions = {
      sourceType: data.sourceType,
      primaryStatus: data.sourceType === 'QURAN' || data.sourceType === 'HADITH' ? 'VERIFIED' : 'SECONDARY',
      provenanceStatus: hasArtifact ? 'VERIFIED' : 'SECONDARY',
      referenceStatus: 'VERIFIED',
      attributionStatus: 'VERIFIED',
      licenseStatus: 'APPROVED',
      editorialStatus: 'APPROVED',
      scholarReviewStatus: 'APPROVED',
      contextStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      ...data.authorityDimensions,
    };

    const isFullyApproved =
      defaultDimensions.provenanceStatus === 'VERIFIED' &&
      defaultDimensions.referenceStatus === 'VERIFIED' &&
      defaultDimensions.licenseStatus === 'APPROVED' &&
      defaultDimensions.editorialStatus === 'APPROVED' &&
      defaultDimensions.scholarReviewStatus === 'APPROVED' &&
      defaultDimensions.publicationStatus === 'PUBLISHED';

    const source: RegisteredSource = {
      id: data.id,
      sourceType: data.sourceType,
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      edition: data.edition,
      publicationYear: data.publicationYear,
      digitalArtifactHash: hasArtifact ? `sha256_${hash}` : `sha256_meta_${hash}`,
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

  public static getSource(id: string): RegisteredSource | undefined {
    return this.sources.get(id);
  }

  public static getAllSources(): RegisteredSource[] {
    return Array.from(this.sources.values());
  }

  /**
   * Check if a source meets production publication requirements
   */
  public static isProductionEligible(sourceId: string): boolean {
    const src = this.sources.get(sourceId);
    if (!src) return false;
    const d = src.authorityDimensions;
    return (
      d.publicationStatus === 'PUBLISHED' &&
      d.provenanceStatus === 'VERIFIED' &&
      d.referenceStatus === 'VERIFIED' &&
      d.licenseStatus === 'APPROVED' &&
      d.editorialStatus === 'APPROVED' &&
      d.scholarReviewStatus === 'APPROVED' &&
      src.verificationLevel === 'LEVEL_7_PRODUCTION_PUBLISHED'
    );
  }

  /**
   * Invariant: Locked published sources cannot be modified without new version
   */
  public static updateSource(id: string, updates: Partial<RegisteredSource>): RegisteredSource {
    const existing = this.sources.get(id);
    if (!existing) throw new Error(`Source not found: ${id}`);
    if (existing.locked) {
      throw new Error(`KNOWLEDGE_LOCK_VIOLATION: Source ${id} is locked and approved. Create a new version.`);
    }
    const updated: RegisteredSource = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.sources.set(id, updated);
    return updated;
  }

  public static clear(): void {
    this.sources.clear();
  }
}
