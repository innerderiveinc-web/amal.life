import { TamperEvidentAuditService } from './tamper-evident-audit.js';

export interface ProposedChange {
  id: string;
  category: 'AI_SAFETY_THRESHOLD' | 'DATA_RETENTION_RULE' | 'CONTENT_PUBLICATION' | 'MODEL_ACTIVATION';
  proposedBy: string;
  approvedBy?: string;
  status: 'PENDING_SECOND_APPROVAL' | 'APPROVED' | 'REJECTED';
  beforeConfig: Record<string, unknown>;
  afterConfig: Record<string, unknown>;
  createdAt: string;
}

export interface BreakGlassSession {
  sessionId: string;
  adminId: string;
  approverId: string;
  justification: string;
  scope: string[];
  expiresAt: string;
  active: boolean;
}

export class FourEyesAdminService {
  private static proposals: Map<string, ProposedChange> = new Map();
  private static breakGlassSessions: Map<string, BreakGlassSession> = new Map();

  public static proposeConfigChange(
    category: ProposedChange['category'],
    operatorId: string,
    beforeConfig: Record<string, unknown>,
    afterConfig: Record<string, unknown>
  ): ProposedChange {
    const id = `chg_${Date.now()}`;
    const proposal: ProposedChange = {
      id,
      category,
      proposedBy: operatorId,
      status: 'PENDING_SECOND_APPROVAL',
      beforeConfig,
      afterConfig,
      createdAt: new Date().toISOString(),
    };

    this.proposals.set(id, proposal);
    return proposal;
  }

  public static approveConfigChange(
    changeId: string,
    secondOperatorId: string
  ): ProposedChange {
    const change = this.proposals.get(changeId);
    if (!change) {
      throw new Error(`Change proposal ${changeId} not found.`);
    }

    if (change.proposedBy === secondOperatorId) {
      throw new Error('Four-Eyes principle violation: Second approver must be distinct from author.');
    }

    change.status = 'APPROVED';
    change.approvedBy = secondOperatorId;

    TamperEvidentAuditService.recordEvent({
      actorId: secondOperatorId,
      actorType: 'ADMIN',
      action: 'APPROVE_FOUR_EYES_CONFIG_CHANGE',
      resourceType: change.category,
      resourceId: changeId,
      purpose: 'SECURITY',
      outcome: 'SUCCESS',
      metadata: { proposedBy: change.proposedBy },
    });

    return change;
  }

  public static grantBreakGlassAccess(
    adminId: string,
    approverId: string,
    justification: string,
    scope: string[],
    durationMinutes: number = 60
  ): BreakGlassSession {
    if (adminId === approverId) {
      throw new Error('Break-Glass violation: Requester cannot self-approve emergency access.');
    }

    const sessionId = `bg_${Date.now()}`;
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

    const session: BreakGlassSession = {
      sessionId,
      adminId,
      approverId,
      justification,
      scope,
      expiresAt,
      active: true,
    };

    this.breakGlassSessions.set(sessionId, session);

    TamperEvidentAuditService.recordEvent({
      actorId: adminId,
      actorType: 'ADMIN',
      action: 'ACTIVATE_BREAK_GLASS_SESSION',
      resourceType: 'SYSTEM_ADMINISTRATION',
      resourceId: sessionId,
      purpose: 'SECURITY',
      outcome: 'SUCCESS',
      metadata: { approverId, justification, scope, expiresAt },
    });

    return session;
  }

  public static isBreakGlassActive(sessionId: string): boolean {
    const s = this.breakGlassSessions.get(sessionId);
    if (!s || !s.active) return false;
    return new Date(s.expiresAt).getTime() > Date.now();
  }
}
