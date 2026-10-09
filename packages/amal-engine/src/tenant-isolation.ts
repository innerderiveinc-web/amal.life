/**
 * AMAL OS V3.0 — Tenant Isolation & Multi-Tenancy Engine
 * Governs strict partition between Individual, Family, Mosque, School, and Partner tenants.
 */

import { Tenant, TenantMember, TenantMemberRole, TenantType } from '@amal/types';

export class TenantIsolationManager {
  private tenants: Map<string, Tenant> = new Map();

  constructor() {
    this.seedDefaultTenants();
  }

  private seedDefaultTenants(): void {
    const defaultTenants: Tenant[] = [
      {
        tenantId: 'tnt_individual_demo',
        tenantType: 'INDIVIDUAL',
        name: 'Personal Deen Workspace',
        ownerId: 'usr_seeker_101',
        members: [{ userId: 'usr_seeker_101', role: 'OWNER', permissions: ['*'], joinedAt: new Date().toISOString() }],
        entitlements: ['CORE_DEEN', 'ADAPTIVE_HABITS', 'RETRIEVAL_TIER_1'],
        settings: {},
        auditEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        tenantId: 'tnt_family_demo',
        tenantType: 'FAMILY',
        name: 'The Al-Farooq Household',
        ownerId: 'usr_parent_head',
        members: [
          { userId: 'usr_parent_head', role: 'OWNER', permissions: ['family:admin', 'family:shared:read'], joinedAt: new Date().toISOString() },
          { userId: 'usr_spouse_adult', role: 'ADULT_MEMBER' as TenantMemberRole, permissions: ['family:shared:read'], joinedAt: new Date().toISOString() },
          { userId: 'usr_child_teen', role: 'STUDENT' as TenantMemberRole, permissions: ['family:shared:read'], joinedAt: new Date().toISOString() }
        ],
        entitlements: ['FAMILY_DASHBOARD', 'SHARED_GOALS'],
        settings: {},
        auditEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        tenantId: 'tnt_mosque_central',
        tenantType: 'MOSQUE',
        name: 'Central Community Mosque & Cultural Center',
        ownerId: 'usr_imam_director',
        members: [
          { userId: 'usr_imam_director', role: 'OWNER', permissions: ['*'], joinedAt: new Date().toISOString() },
          { userId: 'usr_scholar_mufti', role: 'SCHOLAR', permissions: ['scholar:case:resolve', 'programs:create'], joinedAt: new Date().toISOString() }
        ],
        entitlements: ['COMMUNITY_PROGRAMS', 'SCHOLAR_DESK_MULTI'],
        settings: {},
        auditEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        tenantId: 'tnt_school_andalus',
        tenantType: 'ISLAMIC_SCHOOL',
        name: 'Al-Andalus Academy',
        ownerId: 'usr_principal_andalus',
        members: [
          { userId: 'usr_principal_andalus', role: 'OWNER', permissions: ['*'], joinedAt: new Date().toISOString() },
          { userId: 'usr_teacher_quran', role: 'EDUCATOR', permissions: ['programs:manage'], joinedAt: new Date().toISOString() }
        ],
        entitlements: ['ACADEMY_CURRICULUM', 'AGGREGATE_ANALYTICS'],
        settings: {},
        auditEnabled: true,
        createdAt: new Date().toISOString()
      }
    ];

    for (const t of defaultTenants) {
      this.tenants.set(t.tenantId, t);
    }
  }

  public getTenant(tenantId: string): Tenant | undefined {
    return this.tenants.get(tenantId);
  }

  public registerTenant(
    tenantId: string,
    tenantType: TenantType,
    name: string,
    ownerId: string,
    entitlements: string[] = ['BASIC']
  ): Tenant {
    const tenant: Tenant = {
      tenantId,
      tenantType,
      name,
      ownerId,
      members: [
        {
          userId: ownerId,
          role: 'OWNER',
          permissions: ['*'],
          joinedAt: new Date().toISOString()
        }
      ],
      entitlements,
      settings: {},
      auditEnabled: true,
      createdAt: new Date().toISOString()
    };
    this.tenants.set(tenantId, tenant);
    return tenant;
  }

  public addMember(
    tenantId: string,
    requestorId: string,
    newMember: TenantMember
  ): Tenant {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) {
      throw new Error(`TENANT_NOT_FOUND: Tenant ${tenantId} does not exist.`);
    }

    // Must be OWNER or ADMIN to add members
    const requestor = tenant.members.find((m: TenantMember) => m.userId === requestorId);
    if (!requestor || (requestor.role !== 'OWNER' && requestor.role !== 'ADMIN')) {
      throw new Error(`TENANT_PERMISSION_DENIED: User ${requestorId} cannot add members to tenant ${tenantId}.`);
    }

    tenant.members.push(newMember);
    return tenant;
  }

  public assertTenantBoundary(requestorUserId: string, targetTenantId: string, operation: string): void {
    const tenant = this.tenants.get(targetTenantId);
    if (!tenant) {
      throw new Error(`TENANT_NOT_FOUND: Tenant ${targetTenantId} does not exist.`);
    }

    const isMember = tenant.members.some((m: TenantMember) => m.userId === requestorUserId);
    if (!isMember) {
      throw new Error(
        `TENANT_DATA_ISOLATION_VIOLATION: User ${requestorUserId} is not authorized to perform ${operation} in foreign tenant ${targetTenantId}.`
      );
    }
  }
}
