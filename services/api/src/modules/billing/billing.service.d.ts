import { BillingPlan, UserSubscription, ScholarConsultation, Institution, InstitutionProgram, GrowthReferral, GrowthExperiment, RevenueLedgerEntry, BusinessMetricsSummary } from '@amal/types';
export declare class BillingService {
    private plans;
    private entitlements;
    private subscriptions;
    private invoices;
    private consultations;
    private institutions;
    private memberships;
    private programs;
    private referrals;
    private experiments;
    private ledgerEntries;
    private apiTenants;
    constructor();
    private seedDefaultPlansAndEntitlements;
    getPlans(): BillingPlan[];
    getPlanByCode(code: string): BillingPlan | undefined;
    getUserSubscription(userId: string): UserSubscription;
    /**
     * CANONICAL ENTITLEMENT CHECK
     * Evaluates feature permissions without scattered `if (plan === 'PLUS')` checks.
     * Basic religious features are NEVER paywalled!
     */
    can(userId: string, featureKey: string): boolean;
    createCheckout(userId: string, planCode: string): {
        checkoutUrl: string;
        sessionId: string;
    };
    activateSubscription(userId: string, planCode: string, providerSubId?: string): UserSubscription;
    cancelSubscription(userId: string, reason?: string): UserSubscription;
    pauseSubscription(userId: string): UserSubscription;
    bookScholarConsultation(data: {
        userId: string;
        scholarId: string;
        caseId?: string;
        consultationType: 'QUICK' | 'DETAILED' | 'WRITTEN' | 'FAMILY_GUIDANCE';
        feeCents: number;
        currency?: string;
    }): ScholarConsultation;
    releaseScholarPayout(consultationId: string): ScholarConsultation;
    registerInstitution(data: {
        name: string;
        slug: string;
        institutionType: 'MOSQUE' | 'ISLAMIC_SCHOOL' | 'UNIVERSITY' | 'COMMUNITY_ORG' | 'HAJJ_UMRAH';
        ownerUserId: string;
        maxSeats?: number;
    }): Institution;
    createInstitutionProgram(data: {
        institutionId: string;
        name: string;
        description?: string;
        journeyId?: string;
    }): InstitutionProgram;
    getInstitutionDashboard(institutionId: string): {
        institution?: Institution;
        membersCount: number;
        programsCount: number;
        aggregatedCompletionRate: number;
    };
    createReferralInvite(userId: string): GrowthReferral;
    convertReferral(token: string, newUserId: string): GrowthReferral;
    registerExperiment(data: {
        experimentKey: string;
        name: string;
        hypothesis: string;
        ethicalReviewPassed: boolean;
    }): GrowthExperiment;
    recordLedgerEntry(transactionType: 'SUBSCRIPTION' | 'SCHOLAR_FEE' | 'PLATFORM_FEE' | 'REFUND' | 'SCHOLAR_PAYOUT' | 'CREDIT', amountCents: number, currency: string, debitAccount: string, creditAccount: string, referenceId: string, metadata?: Record<string, any>): RevenueLedgerEntry;
    getBusinessMetrics(): BusinessMetricsSummary;
}
//# sourceMappingURL=billing.service.d.ts.map