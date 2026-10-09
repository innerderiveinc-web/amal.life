import { VerifiedScholarRecord, ScholarReviewSignoff } from '@amal/types';

export class ScholarReviewService {
  private static scholars: Map<string, VerifiedScholarRecord> = new Map([
    [
      'sch_dr_tariq_al_hashimi',
      {
        id: 'sch_dr_tariq_al_hashimi',
        userId: 'usr_scholar_tariq',
        fullName: 'Dr. Tariq Al-Hashimi',
        languages: ['ar', 'en'],
        fields: ['FIQH', 'USUL_AL_FIQH', 'QURANIC_STUDIES'],
        credentials: ['PhD Islamic Jurisprudence, Al-Azhar University', 'Senior Fellow IIFA'],
        skillMatrix: { fiqh: 'HIGH', hadith: 'HIGH', family: 'HIGH', finance: 'HIGH', arabic: 'HIGH' },
        verificationStatus: 'APPROVED',
        activeCasesCount: 2,
        maxCapacity: 15,
        availableForRouting: true,
      },
    ],
    [
      'sch_sheikh_amina_farooq',
      {
        id: 'sch_sheikh_amina_farooq',
        userId: 'usr_scholar_amina',
        fullName: 'Ustadha Amina Farooq',
        languages: ['ar', 'en', 'ur'],
        fields: ['HADITH_SCIENCES', 'FAMILY_JURISPRUDENCE', 'SEERAH'],
        credentials: ['MA Hadith Sciences, University of Medina', 'Certified Alimiyyah Degree'],
        skillMatrix: { fiqh: 'HIGH', hadith: 'HIGH', family: 'HIGH', finance: 'MEDIUM', arabic: 'HIGH' },
        verificationStatus: 'APPROVED',
        activeCasesCount: 1,
        maxCapacity: 15,
        availableForRouting: true,
      },
    ],
  ]);

  private static reviews: Map<string, ScholarReviewSignoff[]> = new Map();

  public static getScholar(id: string): VerifiedScholarRecord | undefined {
    return this.scholars.get(id);
  }

  public static getAllScholars(): VerifiedScholarRecord[] {
    return Array.from(this.scholars.values());
  }

  /**
   * Register a scholar signoff, enforcing the Two-Person Rule for sensitive content
   */
  public static recordSignoff(
    sourceId: string,
    signoff: ScholarReviewSignoff
  ): {
    approved: boolean;
    signoffsCount: number;
    requiresSecondReviewer: boolean;
    error?: string;
  } {
    const scholar = this.scholars.get(signoff.reviewerScholarId);
    if (!scholar || scholar.verificationStatus !== 'APPROVED') {
      return {
        approved: false,
        signoffsCount: 0,
        requiresSecondReviewer: false,
        error: `INVALID_SCHOLAR: Scholar ${signoff.reviewerScholarId} is not verified or approved in the registry.`,
      };
    }

    const existing = this.reviews.get(sourceId) || [];
    // Prevent duplicate signoff by same scholar
    if (existing.some((r) => r.reviewerScholarId === signoff.reviewerScholarId)) {
      return {
        approved: existing.length >= (signoff.isTwoPersonSignoff ? 2 : 1),
        signoffsCount: existing.length,
        requiresSecondReviewer: Boolean(signoff.isTwoPersonSignoff && existing.length < 2),
        error: 'DUPLICATE_SIGNOFF: Scholar has already signed off on this item.',
      };
    }

    existing.push(signoff);
    this.reviews.set(sourceId, existing);

    const isSensitive = signoff.isTwoPersonSignoff;
    const isApproved = isSensitive ? existing.length >= 2 : existing.length >= 1;

    return {
      approved: isApproved,
      signoffsCount: existing.length,
      requiresSecondReviewer: Boolean(isSensitive && existing.length < 2),
    };
  }

  public static getSignoffs(sourceId: string): ScholarReviewSignoff[] {
    return this.reviews.get(sourceId) || [];
  }
}
