// ==============================================================================
// AMAL OS — LAYER 15: BILLING & BUSINESS PLATFORM CONTROLLER
// ==============================================================================

import { BillingService } from './billing.service.js';

export class BillingController {
  constructor(private readonly service: BillingService) {}

  public getPlans() {
    return this.service.getPlans();
  }

  public getUserSubscription(userId: string) {
    return this.service.getUserSubscription(userId);
  }

  public checkEntitlement(userId: string, featureKey: string) {
    return {
      featureKey,
      allowed: this.service.can(userId, featureKey),
    };
  }

  public createCheckout(userId: string, planCode: string) {
    return this.service.createCheckout(userId, planCode);
  }

  public activateSubscription(userId: string, planCode: string) {
    return this.service.activateSubscription(userId, planCode);
  }

  public cancelSubscription(userId: string, reason?: string) {
    return this.service.cancelSubscription(userId, reason);
  }

  public pauseSubscription(userId: string) {
    return this.service.pauseSubscription(userId);
  }

  public bookScholarConsultation(body: any) {
    return this.service.bookScholarConsultation(body);
  }

  public releaseScholarPayout(consultationId: string) {
    return this.service.releaseScholarPayout(consultationId);
  }

  public registerInstitution(body: any) {
    return this.service.registerInstitution(body);
  }

  public createInstitutionProgram(body: any) {
    return this.service.createInstitutionProgram(body);
  }

  public getInstitutionDashboard(institutionId: string) {
    return this.service.getInstitutionDashboard(institutionId);
  }

  public createReferral(userId: string) {
    return this.service.createReferralInvite(userId);
  }

  public convertReferral(token: string, newUserId: string) {
    return this.service.convertReferral(token, newUserId);
  }

  public getMetrics() {
    return this.service.getBusinessMetrics();
  }
}
