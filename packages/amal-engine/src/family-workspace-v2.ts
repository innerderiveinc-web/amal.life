/**
 * AMAL OS V3.0 — Family OS Workspace Engine V2
 * Shared family goals, journeys, schedules, with zero domestic surveillance and absolute INV_03 reflection vault isolation.
 */

import { FamilyRoleV2, FamilyShareRecordV2 } from '@amal/types';

export class FamilyWorkspaceEngineV2 {
  private shares: Map<string, FamilyShareRecordV2> = new Map();

  public createShare(params: {
    familyTenantId: string;
    ownerId: string;
    resourceType: 'SHARED_GOAL' | 'SHARED_JOURNEY' | 'SCHEDULE' | 'PROJECT';
    resourceId: string;
    sharedWithUserId: string;
    permission: 'READ' | 'CONTRIBUTE';
    purpose: string;
    expiresAt?: string;
  }): FamilyShareRecordV2 {
    const shareId = `fshare_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const record: FamilyShareRecordV2 = {
      shareId,
      familyTenantId: params.familyTenantId,
      ownerId: params.ownerId,
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      sharedWithUserId: params.sharedWithUserId,
      permission: params.permission,
      purpose: params.purpose,
      createdAt: new Date().toISOString(),
      expiresAt: params.expiresAt
    };
    this.shares.set(shareId, record);
    return record;
  }

  public revokeShare(shareId: string, requestorUserId: string): boolean {
    const record = this.shares.get(shareId);
    if (!record) throw new Error(`SHARE_NOT_FOUND: Share record ${shareId} does not exist.`);
    if (record.ownerId !== requestorUserId) {
      throw new Error('PERMISSION_DENIED: Only the resource owner can revoke this family share.');
    }
    this.shares.delete(shareId);
    return true;
  }

  public assertFamilyResourceAccess(params: {
    requestorUserId: string;
    ownerUserId: string;
    resourceType: string;
    userRole: FamilyRoleV2;
  }): void {
    // Section 18 Non-Negotiable: Family != Surveillance
    // Never expose private reflection, private AI conversation, private memory, private scholar cases
    const prohibitedResources = [
      'REFLECTION_VAULT',
      'PRIVATE_AI_CONVERSATION',
      'PRIVATE_MEMORY',
      'PRIVATE_SCHOLAR_CASE',
      'INDIVIDUAL_PIETY_METRICS'
    ];

    if (prohibitedResources.includes(params.resourceType) && params.requestorUserId !== params.ownerUserId) {
      throw new Error(
        `POLICY DENIAL (INV_03): Family members cannot inspect private ${params.resourceType} belonging to user ${params.ownerUserId}. Family privacy is absolute.`
      );
    }
  }

  public getFamilyShares(familyTenantId: string, userId: string): FamilyShareRecordV2[] {
    return Array.from(this.shares.values()).filter(
      s => s.familyTenantId === familyTenantId && (s.ownerId === userId || s.sharedWithUserId === userId)
    );
  }
}
