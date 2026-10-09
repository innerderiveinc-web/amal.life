/**
 * AMAL CONTENT INGESTION SERVICE — SIRAH & SHAMA'IL PIPELINE
 * Idempotent workers for source acquisition, artifacts, passages, entities & events.
 */

import * as crypto from 'crypto';
import {
  SirahSourceRecord,
  SirahEventRecord,
  SirahLifecycleState,
} from '@amal/types';

export interface SirahArtifactIngestJob {
  sourceId: string;
  editionId: string;
  storageUri: string;
  mimeType: string;
  fileBuffer?: Buffer;
}

export interface IngestedSirahPassage {
  passageId: string;
  sourceId: string;
  editionId: string;
  volumeNumber: number;
  pageNumber: number;
  originalText: string;
  normalizedText: string;
  detectedReferences: string[];
  detectedEntities: string[];
}

export class SirahContentIngestionPipeline {
  /**
   * Registers and hashes a raw manuscript or scan artifact.
   * Invariant: Original artifacts are immutable; derived artifacts must point back to original.
   */
  public registerArtifact(job: SirahArtifactIngestJob): {
    artifactId: string;
    sha256Hash: string;
    lifecycleState: SirahLifecycleState;
  } {
    const hash = crypto.createHash('sha256').update(job.storageUri).digest('hex');
    return {
      artifactId: `ART-SIRAH-${hash.substring(0, 12)}`,
      sha256Hash: hash,
      lifecycleState: 'INGESTED',
    };
  }

  /**
   * Segments raw text into normalized passages while preserving Arabic original.
   * Invariant: Never destroy original Arabic during normalization.
   */
  public processPassage(
    sourceId: string,
    editionId: string,
    pageNumber: number,
    originalArabicText: string
  ): IngestedSirahPassage {
    const normalized = originalArabicText
      .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel for normalization while preserving original
      .trim();

    return {
      passageId: `PAS-${sourceId}-${pageNumber}`,
      sourceId,
      editionId,
      volumeNumber: 1,
      pageNumber,
      originalText: originalArabicText,
      normalizedText: normalized,
      detectedReferences: [],
      detectedEntities: [],
    };
  }

  /**
   * Extracts historical event milestone candidates from structured passages.
   */
  public extractEventCandidate(
    title: string,
    passage: IngestedSirahPassage
  ): Partial<SirahEventRecord> {
    return {
      canonical_title: title,
      description_neutral: passage.normalizedText.slice(0, 300),
      review_status: 'DRAFT',
    };
  }
}
