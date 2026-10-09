import { BillingService } from './billing.service.js';
export declare class BillingController {
    private readonly service;
    constructor(service: BillingService);
    getPlans(): import("@amal/types").BillingPlan[];
    getUserSubscription(userId: string): import("@amal/types").UserSubscription;
    checkEntitlement(userId: string, featureKey: string): {
        featureKey: string;
        allowed: boolean;
    };
    createCheckout(userId: string, planCode: string): {
        checkoutUrl: string;
        sessionId: string;
    };
    activateSubscription(userId: string, planCode: string): import("@amal/types").UserSubscription;
    cancelSubscription(userId: string, reason?: string): import("@amal/types").UserSubscription;
    pauseSubscription(userId: string): import("@amal/types").UserSubscription;
    bookScholarConsultation(body: any): import("@amal/types").ScholarConsultation;
    releaseScholarPayout(consultationId: string): import("@amal/types").ScholarConsultation;
    registerInstitution(body: any): import("@amal/types").Institution;
    createInstitutionProgram(body: any): import("@amal/types").InstitutionProgram;
    getInstitutionDashboard(institutionId: string): {
        institution?: import("@amal/types").Institution;
        membersCount: number;
        programsCount: number;
        aggregatedCompletionRate: number;
    };
    createReferral(userId: string): import("@amal/types").GrowthReferral;
    convertReferral(token: string, newUserId: string): import("@amal/types").GrowthReferral;
    getMetrics(): import("@amal/types").BusinessMetricsSummary;
}
//# sourceMappingURL=billing.controller.d.ts.map