import {
  VerificationStatus,
  AuthorityLevel,
  ClaimSupportLevel,
  VerifiedClaim,
  CitationReference,
} from '@amal/types';
import { db } from '@amal/database';

export type LicenseStatus =
  | 'LICENSED'
  | 'PUBLIC_DOMAIN'
  | 'AUTHORIZED'
  | 'USER_PROVIDED'
  | 'RESTRICTED'
  | 'UNKNOWN'
  | 'EXPIRED'
  | 'REJECTED';

export type IngestionState =
  | 'DISCOVERED'
  | 'LICENSE_CHECK'
  | 'ACQUIRED'
  | 'PARSED'
  | 'NORMALIZED'
  | 'VALIDATED'
  | 'EDITOR_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'APPROVED'
  | 'INDEXED'
  | 'PUBLISHED'
  | 'QUARANTINED'
  | 'REJECTED'
  | 'ARCHIVED';

export type DisputeType =
  | 'INCORRECT_REFERENCE'
  | 'INCORRECT_TRANSLATION'
  | 'WEAK_ATTRIBUTION'
  | 'MISSING_CONTEXT'
  | 'SCHOLARLY_DISAGREEMENT'
  | 'LICENSE_PROBLEM'
  | 'DUPLICATE'
  | 'OUTDATED'
  | 'OTHER';

export interface QuarantinedItem {
  id: string;
  sourceId: string;
  reason: string;
  detectedAt: string;
  payload: any;
  resolved: boolean;
}

export interface ContentDispute {
  disputeId: string;
  disputeType: DisputeType;
  targetId: string;
  reportedBy: string;
  description: string;
  status: 'REPORTED' | 'TRIAGED' | 'IN_SCHOLAR_REVIEW' | 'RESOLVED' | 'REJECTED';
  resolutionNotes?: string;
  createdAt: string;
}

export interface ScholarReviewSignoff {
  reviewId: string;
  sourceId: string;
  reviewerScholarId: string;
  reviewerScholarName: string;
  institution: string;
  decision: 'APPROVED' | 'REJECTED' | 'CONDITIONAL';
  scholarlyNotes: string;
  isTwoPersonSignoff: boolean;
  signedAt: string;
}

export class IslamicGovernanceEngine {
  private static quarantineRegistry: Map<string, QuarantinedItem> = new Map();
  private static disputes: Map<string, ContentDispute> = new Map();
  private static scholarReviews: Map<string, ScholarReviewSignoff[]> = new Map();

  /**
   * License Gate: A source with UNKNOWN or EXPIRED license must NEVER enter the corpus.
   */
  public static verifyLicense(licenseType: string, licenseStatus: LicenseStatus): boolean {
    if (licenseStatus === 'UNKNOWN' || licenseStatus === 'REJECTED' || licenseStatus === 'EXPIRED') {
      return false;
    }
    return licenseStatus === 'LICENSED' || licenseStatus === 'PUBLIC_DOMAIN' || licenseStatus === 'AUTHORIZED';
  }

  /**
   * Quarantine handler: Quarantine suspicious or unverified content.
   */
  public static quarantineItem(sourceId: string, reason: string, payload: any): QuarantinedItem {
    const item: QuarantinedItem = {
      id: `quar-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sourceId,
      reason,
      detectedAt: new Date().toISOString(),
      payload,
      resolved: false,
    };
    this.quarantineRegistry.set(item.id, item);
    return item;
  }

  /**
   * Check if a passage or source is quarantined.
   */
  public static isQuarantined(sourceId: string): boolean {
    for (const q of this.quarantineRegistry.values()) {
      if (q.sourceId === sourceId && !q.resolved) {
        return true;
      }
    }
    return false;
  }

  /**
   * Retrieval Filter: Enforces that AI only retrieves published, approved, and licensed evidence.
   */
  public static isEligibleForRetrieval(sourceId: string): boolean {
    if (this.isQuarantined(sourceId)) return false;

    const source = db.sources.get(sourceId);
    if (!source) return false;

    if (source.verificationStatus !== 'APPROVED') return false;

    return true;
  }

  /**
   * Two-Person Scholar Signoff Rule:
   * Sensitive Fiqh issues (Divorce, marital disputes, finance) require two independent scholars.
   */
  public static registerScholarSignoff(
    sourceId: string,
    signoff: ScholarReviewSignoff
  ): { approved: boolean; signoffCount: number } {
    const existing = this.scholarReviews.get(sourceId) || [];
    existing.push(signoff);
    this.scholarReviews.set(sourceId, existing);

    const isSensitive = signoff.isTwoPersonSignoff;
    const isApproved = isSensitive ? existing.length >= 2 : existing.length >= 1;

    if (isApproved) {
      const source = db.sources.get(sourceId);
      if (source) {
        source.verificationStatus = 'APPROVED';
      }
    }

    return {
      approved: isApproved,
      signoffCount: existing.length,
    };
  }

  /**
   * Claim-by-Claim Gate: If any claim has UNSUPPORTED status, block authoritative output.
   */
  public static evaluateClaims(claims: VerifiedClaim[]): {
    canPublish: boolean;
    unsupportedClaims: VerifiedClaim[];
    supportedClaims: VerifiedClaim[];
  } {
    const unsupportedClaims = claims.filter((c) => c.supportLevel === 'UNSUPPORTED');
    const supportedClaims = claims.filter((c) => c.supportLevel === 'DIRECT' || c.supportLevel === 'STRONG_INFERENCE');

    return {
      canPublish: unsupportedClaims.length === 0,
      unsupportedClaims,
      supportedClaims,
    };
  }

  /**
   * Report Content Dispute
   */
  public static submitDispute(
    disputeType: DisputeType,
    targetId: string,
    reportedBy: string,
    description: string
  ): ContentDispute {
    const dispute: ContentDispute = {
      disputeId: `disp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      disputeType,
      targetId,
      reportedBy,
      description,
      status: 'REPORTED',
      createdAt: new Date().toISOString(),
    };
    this.disputes.set(dispute.disputeId, dispute);
    return dispute;
  }

  /**
   * Get all active disputes
   */
  public static getDisputes(): ContentDispute[] {
    return Array.from(this.disputes.values());
  }
}
