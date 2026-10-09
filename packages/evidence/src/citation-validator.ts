import { CitationReference, EvidencePackItem } from '@amal/types';
import { db } from '@amal/database';

export class CitationValidator {
  public static validateCitation(reference: string): { valid: boolean; reference: string } {
    const foundPassage = Array.from(db.passages.values()).find(
      (p) => p.reference.toLowerCase().trim() === reference.toLowerCase().trim()
    );
    if (!foundPassage) return { valid: false, reference };
    const parentSource = db.sources.get(foundPassage.sourceId);
    return { valid: parentSource?.verificationStatus === 'APPROVED', reference };
  }

  /**
   * Validate that cited references actually exist in the approved database

   * and that claims have direct provenance.
   */
  public static async validateCitations(
    claimedReferences: string[],
    providedSources: EvidencePackItem[]
  ): Promise<{
    allVerified: boolean;
    auditLog: CitationReference[];
  }> {
    const auditLog: CitationReference[] = [];
    let allVerified = true;

    for (const ref of claimedReferences) {
      // Find matching passage in approved database
      let foundPassage = Array.from(db.passages.values()).find(
        (p) => p.reference.toLowerCase().trim() === ref.toLowerCase().trim()
      );

      if (!foundPassage) {
        // Also check if matches source reference in the provided evidence pack
        const packMatch = providedSources.find(
          (s) => s.reference.toLowerCase().trim() === ref.toLowerCase().trim()
        );
        if (packMatch) {
          foundPassage = db.passages.get(packMatch.passageId);
        }
      }

      if (foundPassage) {
        // Verify source status is APPROVED
        const parentSource = db.sources.get(foundPassage.sourceId);
        const isApproved = parentSource?.verificationStatus === 'APPROVED';

        auditLog.push({
          passageId: foundPassage.id,
          sourceReference: ref,
          quotedText: foundPassage.translatedText,
          verificationPassed: isApproved,
          notes: isApproved
            ? `Verified against ${parentSource?.title} (${parentSource?.authorityLevel})`
            : `Source status is ${parentSource?.verificationStatus}, not APPROVED`,
        });

        if (!isApproved) {
          allVerified = false;
        }
      } else {
        // Citation could not be found in verified database -> Fail
        auditLog.push({
          passageId: 'UNKNOWN',
          sourceReference: ref,
          verificationPassed: false,
          notes: 'Unverified or fabricated reference. Not found in approved knowledge base.',
        });
        allVerified = false;
      }
    }

    return {
      allVerified,
      auditLog,
    };
  }
}
