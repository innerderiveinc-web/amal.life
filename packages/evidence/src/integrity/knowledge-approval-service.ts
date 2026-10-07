import { VerificationLevel } from '@amal/types';
import { SourceRegistry } from './source-registry.js';
import { LicenseRegistry } from './license-registry.js';

export interface ApprovalEvaluationResult {
  eligibleForProduction: boolean;
  assignedLevel: VerificationLevel;
  reasons: string[];
}

export class KnowledgeApprovalService {
  /**
   * Determine verification level based on review milestones
   */
  public static evaluateApprovalLevel(data: {
    sourceIdentified: boolean;
    referenceVerified: boolean;
    provenanceAttributionVerified: boolean;
    licenseApproved: boolean;
    editorialApproved: boolean;
    scholarReviewed: boolean;
    isProductionPublished: boolean;
  }): VerificationLevel {
    if (
      data.sourceIdentified &&
      data.referenceVerified &&
      data.provenanceAttributionVerified &&
      data.licenseApproved &&
      data.editorialApproved &&
      data.scholarReviewed &&
      data.isProductionPublished
    ) {
      return 'LEVEL_7_PRODUCTION_PUBLISHED';
    }
    if (
      data.sourceIdentified &&
      data.referenceVerified &&
      data.provenanceAttributionVerified &&
      data.licenseApproved &&
      data.editorialApproved &&
      data.scholarReviewed
    ) {
      return 'LEVEL_6_SCHOLAR_REVIEWED';
    }
    if (
      data.sourceIdentified &&
      data.referenceVerified &&
      data.provenanceAttributionVerified &&
      data.licenseApproved &&
      data.editorialApproved
    ) {
      return 'LEVEL_5_EDITORIALLY_APPROVED';
    }
    if (data.sourceIdentified && data.referenceVerified && data.provenanceAttributionVerified && data.licenseApproved) {
      return 'LEVEL_4_PROVENANCE_ATTRIBUTION_VERIFIED';
    }
    if (data.sourceIdentified && data.referenceVerified) {
      return 'LEVEL_3_REFERENCE_VERIFIED';
    }
    if (data.sourceIdentified) {
      return 'LEVEL_2_SOURCE_IDENTIFIED';
    }
    return 'LEVEL_1_CANDIDATE';
  }

  /**
   * Enforce production eligibility gate
   */
  public static checkProductionEligibility(sourceId: string): ApprovalEvaluationResult {
    const source = SourceRegistry.getSource(sourceId);
    if (!source) {
      return {
        eligibleForProduction: false,
        assignedLevel: 'LEVEL_0_UNKNOWN',
        reasons: [`Source ${sourceId} does not exist in registry.`],
      };
    }

    const reasons: string[] = [];
    const d = source.authorityDimensions;

    if (d.provenanceStatus !== 'VERIFIED') reasons.push('Provenance is not verified.');
    if (d.referenceStatus !== 'VERIFIED') reasons.push('Reference is not verified.');
    if (d.licenseStatus !== 'APPROVED') reasons.push(`License status is ${d.licenseStatus}, not APPROVED.`);
    if (d.editorialStatus !== 'APPROVED') reasons.push('Editorial review is not approved.');
    if (d.scholarReviewStatus !== 'APPROVED') reasons.push('Scholar review is not approved.');
    if (d.publicationStatus !== 'PUBLISHED') reasons.push(`Publication status is ${d.publicationStatus}, not PUBLISHED.`);

    const isEligible = reasons.length === 0;

    return {
      eligibleForProduction: isEligible,
      assignedLevel: source.verificationLevel,
      reasons,
    };
  }
}
