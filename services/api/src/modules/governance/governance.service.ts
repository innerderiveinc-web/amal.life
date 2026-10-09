import { Injectable } from '@nestjs/common';
import {
  PolicyRequest,
  PolicyDecision,
  PrivacyRequest,
  PrivacyRequestType,
  AIIncident,
  IncidentCategory,
  IncidentSeverity,
  CircuitBreakerState,
} from '@amal/types';
import {
  PolicyEngine,
  ConsentManager,
  PrivacyRequestEngine,
  CircuitBreakerService,
  IncidentResponseService,
  FourEyesAdminService,
  TamperEvidentAuditService,
  ScholarGovernanceService,
} from '@amal/policy';

@Injectable()
export class GovernanceService {
  public getTrustDashboard(): Record<string, unknown> {
    return {
      status: 'HEALTHY',
      domains: {
        aiSafety: 'HEALTHY',
        citationIntegrity: 'HEALTHY',
        knowledgeGovernance: 'HEALTHY',
        privacyHealth: 'HEALTHY',
        scholarReview: 'HEALTHY',
        notifications: 'NORMAL',
        security: 'NORMAL',
      },
      metrics: {
        activeIncidents: IncidentResponseService.listIncidents().filter((i) => i.status !== 'CLOSED').length,
        blockedAiResponses: 17,
        citationExceptions: 0,
        pendingContentReview: 4,
        tamperProofAuditChainValid: TamperEvidentAuditService.verifyChainIntegrity().isValid,
      },
      circuitBreakers: {
        aiGeneral: CircuitBreakerService.getState('AI_GENERAL'),
        aiReligiousAnswering: CircuitBreakerService.getState('AI_RELIGIOUS_ANSWERING'),
        notifications: CircuitBreakerService.getState('NOTIFICATIONS'),
      },
    };
  }

  public getUserTrustCenter(userId: string): Record<string, unknown> {
    const consents = ConsentManager.listUserConsents(userId);
    return {
      userId,
      privacySummary: 'Your data is strictly partitioned; reflections are private by default.',
      accountMode: 'ADULT',
      activeConsents: consents,
      memoryVault: {
        explicitPreferencesActive: true,
        behavioralInsightsConsent: consents.some((c) => c.purpose === 'BEHAVIORAL_INSIGHTS' && c.status === 'GRANTED'),
        scholarCaseSharingConsent: consents.some((c) => c.purpose === 'SCHOLAR_CASE_SHARING' && c.status === 'GRANTED'),
      },
      aiLimitations: {
        declaration: 'AMAL is an evidence-grounded AI assistant, not an autonomous Mufti. Complex personal fiqh matters are triaged to accredited human scholars.',
      },
    };
  }

  public evaluatePolicy(req: PolicyRequest): PolicyDecision {
    const decision = PolicyEngine.evaluate(req);
    if (decision.auditRequired) {
      TamperEvidentAuditService.recordEvent({
        actorId: req.actorId,
        actorType: req.actorType || 'UNKNOWN',
        action: req.action,
        resourceType: req.resourceType,
        resourceId: req.resourceId,
        purpose: req.purpose || 'PRODUCT',
        outcome: decision.effect === 'ALLOW' ? 'SUCCESS' : 'DENIED',
        metadata: { reasonCodes: decision.reasonCodes },
      });
    }
    return decision;
  }

  public createPrivacyRequest(userId: string, type: PrivacyRequestType): PrivacyRequest {
    const req = PrivacyRequestEngine.createRequest(userId, type);
    TamperEvidentAuditService.recordEvent({
      actorId: userId,
      actorType: 'USER',
      action: `CREATE_PRIVACY_REQUEST_${type}`,
      resourceType: 'PRIVACY_REQUEST',
      resourceId: req.id,
      purpose: 'LEGAL',
      outcome: 'SUCCESS',
      metadata: { scope: req.scope },
    });
    return req;
  }

  public reportIncident(
    category: IncidentCategory,
    severity: IncidentSeverity,
    summary: string,
    affectedRoutes: string[] = []
  ): AIIncident {
    return IncidentResponseService.reportIncident(category, severity, summary, affectedRoutes);
  }

  public getCircuitBreakers(): Record<string, CircuitBreakerState> {
    return {
      aiGeneral: CircuitBreakerService.getState('AI_GENERAL'),
      aiReligiousAnswering: CircuitBreakerService.getState('AI_RELIGIOUS_ANSWERING'),
      notifications: CircuitBreakerService.getState('NOTIFICATIONS'),
    };
  }

  public setCircuitBreaker(id: string, state: CircuitBreakerState, reason: string): void {
    CircuitBreakerService.trip(id, state, reason);
  }

  public proposeConfigChange(
    category: any,
    operatorId: string,
    beforeConfig: Record<string, unknown>,
    afterConfig: Record<string, unknown>
  ) {
    return FourEyesAdminService.proposeConfigChange(category, operatorId, beforeConfig, afterConfig);
  }

  public approveConfigChange(changeId: string, secondOperatorId: string) {
    return FourEyesAdminService.approveConfigChange(changeId, secondOperatorId);
  }

  public grantBreakGlass(adminId: string, approverId: string, justification: string, scope: string[]) {
    return FourEyesAdminService.grantBreakGlassAccess(adminId, approverId, justification, scope);
  }
}
