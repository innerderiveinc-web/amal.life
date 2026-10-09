"use strict";
// ==============================================================================
// AMAL OS — LAYER 15: BILLING & BUSINESS PLATFORM CONTROLLER
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
class BillingController {
    service;
    constructor(service) {
        this.service = service;
    }
    getPlans() {
        return this.service.getPlans();
    }
    getUserSubscription(userId) {
        return this.service.getUserSubscription(userId);
    }
    checkEntitlement(userId, featureKey) {
        return {
            featureKey,
            allowed: this.service.can(userId, featureKey),
        };
    }
    createCheckout(userId, planCode) {
        return this.service.createCheckout(userId, planCode);
    }
    activateSubscription(userId, planCode) {
        return this.service.activateSubscription(userId, planCode);
    }
    cancelSubscription(userId, reason) {
        return this.service.cancelSubscription(userId, reason);
    }
    pauseSubscription(userId) {
        return this.service.pauseSubscription(userId);
    }
    bookScholarConsultation(body) {
        return this.service.bookScholarConsultation(body);
    }
    releaseScholarPayout(consultationId) {
        return this.service.releaseScholarPayout(consultationId);
    }
    registerInstitution(body) {
        return this.service.registerInstitution(body);
    }
    createInstitutionProgram(body) {
        return this.service.createInstitutionProgram(body);
    }
    getInstitutionDashboard(institutionId) {
        return this.service.getInstitutionDashboard(institutionId);
    }
    createReferral(userId) {
        return this.service.createReferralInvite(userId);
    }
    convertReferral(token, newUserId) {
        return this.service.convertReferral(token, newUserId);
    }
    getMetrics() {
        return this.service.getBusinessMetrics();
    }
}
exports.BillingController = BillingController;
//# sourceMappingURL=billing.controller.js.map