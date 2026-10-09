"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScholarReviewService = void 0;
class ScholarReviewService {
    static scholars = new Map([
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
    static reviews = new Map();
    static getScholar(id) {
        return this.scholars.get(id);
    }
    static getAllScholars() {
        return Array.from(this.scholars.values());
    }
    /**
     * Register a scholar signoff, enforcing the Two-Person Rule for sensitive content
     */
    static recordSignoff(sourceId, signoff) {
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
    static getSignoffs(sourceId) {
        return this.reviews.get(sourceId) || [];
    }
}
exports.ScholarReviewService = ScholarReviewService;
//# sourceMappingURL=scholar-review-service.js.map