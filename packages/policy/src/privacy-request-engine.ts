import {
  PrivacyRequest,
  PrivacyRequestType,
  PrivacyRequestStatus,
} from '@amal/types';

export interface DeletionDependencyPlan {
  cascadeTables: string[];
  anonymizeTables: string[];
  retainTables: string[];
}

export class PrivacyRequestEngine {
  private static requests: Map<string, PrivacyRequest> = new Map();

  /**
   * Generates a deletion dependency analysis graph per Section 66.
   */
  public static analyzeDeletionDependencies(userId: string): DeletionDependencyPlan {
    return {
      cascadeTables: [
        'reflections',
        'amal_completions',
        'user_journeys',
        'user_goals',
        'user_context',
        'device_registrations',
        'communication_consents',
      ],
      anonymizeTables: [
        'scholar_cases',
        'product_feedback',
        'aggregate_metrics',
      ],
      retainTables: [
        'tamper_evident_audit_log', // Required by legal and regulatory security hold
      ],
    };
  }

  public static createRequest(userId: string, type: PrivacyRequestType): PrivacyRequest {
    const id = `priv_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const depAnalysis = type === 'DELETE' ? this.analyzeDeletionDependencies(userId) : undefined;

    const req: PrivacyRequest = {
      id,
      userId,
      requestType: type,
      status: 'REQUESTED',
      scope: ['ALL_USER_DATA'],
      dependencyAnalysis: depAnalysis as any,
      createdAt: new Date().toISOString(),
    };

    this.requests.set(id, req);
    return req;
  }

  /**
   * Transitions request state through the 8-state machine:
   * REQUESTED -> IDENTITY_VERIFIED -> SCOPED -> APPROVED -> EXECUTING -> VERIFIED -> COMPLETED
   */
  public static advanceStatus(id: string, newStatus: PrivacyRequestStatus): PrivacyRequest {
    const req = this.requests.get(id);
    if (!req) {
      throw new Error(`Privacy request not found: ${id}`);
    }

    req.status = newStatus;
    if (newStatus === 'COMPLETED') {
      req.completedAt = new Date().toISOString();
    }

    return req;
  }

  public static getRequest(id: string): PrivacyRequest | undefined {
    return this.requests.get(id);
  }
}
