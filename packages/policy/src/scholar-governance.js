"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScholarGovernanceService = void 0;
class ScholarGovernanceService {
    static scholars = new Map([
        [
            'sch-001',
            {
                id: 'sch-001',
                userId: 'usr-scholar-ahmad',
                name: 'Dr. Ahmad Al-Qadi',
                credentials: ['PhD Islamic Jurisprudence, Al-Azhar University'],
                fields: ['Fiqh', 'Usul al-Fiqh', 'Family Guidance'],
                madhhabAffiliation: 'Shafi',
                verificationStatus: 'VERIFIED',
                verifiedAt: new Date().toISOString(),
            },
        ],
        [
            'sch-002',
            {
                id: 'sch-002',
                userId: 'usr-scholar-yasmin',
                name: 'Dr. Yasmin Tariq',
                credentials: ['MA Usul al-Deen, Islamic University of Madinah'],
                fields: ['Hadith Sciences', 'Women in Fiqh'],
                madhhabAffiliation: 'Hanafi',
                verificationStatus: 'VERIFIED',
                verifiedAt: new Date().toISOString(),
            },
        ],
    ]);
    static getScholar(scholarId) {
        return this.scholars.get(scholarId);
    }
    static isVerified(scholarId) {
        const s = this.scholars.get(scholarId);
        return !!s && s.verificationStatus === 'VERIFIED';
    }
    /**
     * Evaluates a Dual-Scholar Review for high-risk knowledge items.
     * Invariant: If qualified scholars disagree, plurality is preserved rather than forcing false consensus.
     */
    static evaluateDualReview(req) {
        if (req.primaryScholarId === req.secondaryScholarId) {
            throw new Error('Dual review violation: Primary and secondary reviewer must be two distinct accredited scholars.');
        }
        if (!this.isVerified(req.primaryScholarId) || !this.isVerified(req.secondaryScholarId)) {
            throw new Error('Both reviewers must possess VERIFIED accreditation status.');
        }
        if (req.primaryVerdict === 'APPROVE' && req.secondaryVerdict === 'APPROVE') {
            return {
                outcome: 'APPROVED',
                isPluralityPreserved: false,
                notes: 'Unanimous approval granted by dual accredited scholars.',
            };
        }
        if (req.primaryVerdict !== req.secondaryVerdict) {
            return {
                outcome: 'DISPUTE_PRESERVED',
                isPluralityPreserved: true,
                notes: req.pluralityNotes || 'Scholarly disagreement recorded as valid Ikhtilāf plurality.',
            };
        }
        return {
            outcome: 'REJECTED',
            isPluralityPreserved: false,
            notes: 'Unanimous rejection by dual accredited scholars.',
        };
    }
    /**
     * Progresses a content approval state through governed lifecycle stages.
     */
    static transitionContentState(currentState, action) {
        if (action === 'QUARANTINE')
            return 'QUARANTINED';
        switch (currentState) {
            case 'DRAFT':
                if (action === 'VALIDATE')
                    return 'TECHNICALLY_VALIDATED';
                break;
            case 'TECHNICALLY_VALIDATED':
                if (action === 'REVIEW_EDITOR')
                    return 'EDITOR_REVIEWED';
                break;
            case 'EDITOR_REVIEWED':
                if (action === 'REVIEW_SCHOLAR')
                    return 'SCHOLAR_REVIEWED';
                break;
            case 'SCHOLAR_REVIEWED':
                if (action === 'PUBLISH')
                    return 'APPROVED';
                break;
            case 'APPROVED':
                if (action === 'PUBLISH')
                    return 'PUBLISHED';
                break;
        }
        return currentState;
    }
}
exports.ScholarGovernanceService = ScholarGovernanceService;
//# sourceMappingURL=scholar-governance.js.map