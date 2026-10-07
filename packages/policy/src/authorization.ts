import { AccountMode, PolicyDecision } from '@amal/types';
import { PolicyEngine } from './policy-engine.js';

export class AuthorizationService {
  /**
   * Asserts whether a user or family member can read a reflection.
   * Strictly enforces adult reflection isolation.
   */
  public static canReadReflection(
    user: { id: string; role: string; accountMode?: AccountMode },
    reflection: { id: string; userId: string; isSharedWithFamily?: boolean }
  ): boolean {
    const decision: PolicyDecision = PolicyEngine.evaluate({
      actorId: user.id,
      actorType: user.role === 'ADMIN' ? 'ADMIN' : user.id === reflection.userId ? 'USER' : 'FAMILY_OWNER',
      action: 'READ',
      resourceType: 'REFLECTION',
      resourceId: reflection.id,
      resourceOwnerId: reflection.userId,
      purpose: 'CORE_SERVICE',
      accountMode: user.accountMode || 'ADULT',
      context: {
        familyShared: reflection.isSharedWithFamily === true,
      },
    });

    return decision.effect === 'ALLOW';
  }

  /**
   * Asserts whether an actor can manage family configuration.
   */
  public static canManageFamily(
    user: { id: string; role: string },
    familyOwnerId: string
  ): boolean {
    return user.id === familyOwnerId || user.role === 'ADMIN';
  }

  /**
   * Asserts whether a user can initiate scholar inquiry.
   * Gated for minor/child accounts.
   */
  public static canEscalateToScholar(
    user: { id: string; role: string; accountMode?: AccountMode },
    parentalApproval: boolean = false
  ): boolean {
    if (user.accountMode === 'CHILD' && !parentalApproval) {
      return false;
    }
    return true;
  }

  /**
   * Asserts valid break-glass emergency administrative access.
   * Requires separate approver (Four-Eyes principle).
   */
  public static canBreakGlass(
    admin: { id: string; role: string },
    justification: string,
    approverId: string
  ): boolean {
    if (admin.role !== 'ADMIN' && admin.role !== 'SECURITY_OPERATOR') {
      return false;
    }
    if (!justification || justification.trim().length < 10) {
      return false;
    }
    // Strict requirement: admin cannot approve their own break-glass request
    if (admin.id === approverId) {
      return false;
    }
    return true;
  }
}
