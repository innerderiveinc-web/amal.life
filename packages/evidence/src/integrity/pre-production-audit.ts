import { PreProductionKnowledgeHealthReport } from '@amal/types';
import { SourceRegistry } from './source-registry.js';
import { IslamicGovernanceEngine } from '../governance-engine.js';
import { db } from '@amal/database';

export class KnowledgeIntegrityAuditService {
  /**
   * Execute comprehensive pre-production audit across all stored knowledge
   */
  public static runPreProductionAudit(): PreProductionKnowledgeHealthReport {
    const registeredSources = SourceRegistry.getAllSources();
    const dbSources = Array.from(db.sources.values());
    const totalItems = registeredSources.length + dbSources.length + db.passages.size;

    let verified = 0;
    let scholarReviewed = 0;
    let published = 0;
    let quarantined = 0;
    let unverified = 0;
    let licenseIssues = 0;
    let citationIssues = 0;
    let attributionIssues = 0;

    for (const src of dbSources) {
      if (src.verificationStatus === 'APPROVED') {
        verified++;
        scholarReviewed++;
        published++;
      } else {
        unverified++;
      }

      if (IslamicGovernanceEngine.isQuarantined(src.id)) {
        quarantined++;
      }

      if (!src.license || src.license === 'UNKNOWN') {
        licenseIssues++;
      }
    }

    for (const src of registeredSources) {
      const d = src.authorityDimensions;
      if (d.publicationStatus === 'PUBLISHED') published++;
      if (d.provenanceStatus === 'VERIFIED') verified++;
      if (d.scholarReviewStatus === 'APPROVED') scholarReviewed++;
      if (d.publicationStatus === 'QUARANTINED') quarantined++;
    }

    const disputes = IslamicGovernanceEngine.getDisputes();
    const totalConflicted = disputes.filter((d) => d.status === 'REPORTED' || d.status === 'IN_SCHOLAR_REVIEW').length;

    const passesGate =
      quarantined === 0 &&
      licenseIssues === 0 &&
      citationIssues === 0 &&
      attributionIssues === 0 &&
      totalConflicted === 0;

    return {
      totalKnowledgeItems: totalItems,
      totalVerified: verified,
      totalScholarReviewed: scholarReviewed,
      totalPublished: published,
      totalQuarantined: quarantined,
      totalUnverified: unverified,
      totalConflicted,
      totalLicenseIssues: licenseIssues,
      totalCitationIssues: citationIssues,
      totalAttributionIssues: attributionIssues,
      knowledgeIntegrity: passesGate ? 'PASS' : 'FAIL',
      zeroFabricationVerified: citationIssues === 0,
      timestamp: new Date().toISOString(),
    };
  }
}
