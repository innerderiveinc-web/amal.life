import { SourceRegistry } from './source-registry.js';
import { IslamicGovernanceEngine } from '../governance-engine.js';

export interface RetrievalPolicyDecision {
  allowed: boolean;
  sourceId: string;
  reason?: string;
}

export class KnowledgePolicyEngine {
  // Feature flag default: false in new deployments until complete knowledge gate passes
  private static islamicAiEnabled: boolean = false;

  public static setIslamicAiEnabled(enabled: boolean): void {
    this.islamicAiEnabled = enabled;
  }

  public static isIslamicAiEnabled(): boolean {
    return this.islamicAiEnabled;
  }

  /**
   * Central policy evaluation for production retrieval
   * Enforces: APPROVED + PUBLISHED + PROVENANCE_VERIFIED + REFERENCE_VERIFIED + NOT_QUARANTINED
   */
  public static evaluateRetrieval(sourceId: string): RetrievalPolicyDecision {
    // 1. Quarantine check
    if (IslamicGovernanceEngine.isQuarantined(sourceId)) {
      return {
        allowed: false,
        sourceId,
        reason: 'QUARANTINED: Source is in quarantine due to verification anomaly.',
      };
    }

    // 2. Source registry check
    const source = SourceRegistry.getSource(sourceId);
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
  public static canGenerateAiResponse(): { canGenerate: boolean; fallbackMessage?: string } {
    if (!this.islamicAiEnabled) {
      return {
        canGenerate: false,
        fallbackMessage:
          'Islamic AI generation is currently gated. Direct deterministic evidence is provided below.',
      };
    }
    return { canGenerate: true };
  }
}
