/**
 * AMAL OS — LAYER 15: TENANCY & DATA ISOLATION SERVICE (Sections 13 & 14)
 * Enforces multi-tenant data boundaries across Consumer, Family, Mosque, School, and Organization.
 * Guarantees zero cross-tenant data leakage.
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

export type TenantType = 'CONSUMER' | 'FAMILY' | 'MOSQUE' | 'SCHOOL' | 'ORGANIZATION';

export interface TenantRecord {
  tenantId: string;
  name: string;
  type: TenantType;
  ownerUserId: string;
  memberUserIds: Set<string>;
  createdAt: string;
}

@Injectable()
export class TenancyService {
  private tenants: Map<string, TenantRecord> = new Map();
  private userTenants: Map<string, Set<string>> = new Map(); // userId -> tenantIds

  constructor() {
    this.seedDefaultTenants();
  }

  private seedDefaultTenants() {
    this.createTenant('tnt_consumer_default', 'Global Consumer Tenant', 'CONSUMER', 'usr_sys_01');
    this.createTenant('tnt_mosque_central', 'Central Mosque Community', 'MOSQUE', 'usr_imam_01');
    this.createTenant('tnt_school_iqra', 'Iqra Islamic Academy', 'SCHOOL', 'usr_principal_01');
  }

  public createTenant(tenantId: string, name: string, type: TenantType, ownerUserId: string): TenantRecord {
    const record: TenantRecord = {
      tenantId,
      name,
      type,
      ownerUserId,
      memberUserIds: new Set([ownerUserId]),
      createdAt: new Date().toISOString(),
    };
    this.tenants.set(tenantId, record);

    const userSet = this.userTenants.get(ownerUserId) || new Set();
    userSet.add(tenantId);
    this.userTenants.set(ownerUserId, userSet);

    return record;
  }

  public addMember(tenantId: string, userId: string): void {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);

    tenant.memberUserIds.add(userId);
    const userSet = this.userTenants.get(userId) || new Set();
    userSet.add(tenantId);
    this.userTenants.set(userId, userSet);
  }

  /**
   * CANONICAL TENANT ISOLATION ASSERTION
   * Throws 403 Forbidden if actor attempts to access resources belonging to a foreign tenant.
   */
  public assertTenantAccess(actorUserId: string, targetTenantId: string, resourceDesc = 'resource'): void {
    const tenant = this.tenants.get(targetTenantId);
    if (!tenant) {
      throw new HttpException(`Tenant ${targetTenantId} not found`, HttpStatus.NOT_FOUND);
    }

    if (!tenant.memberUserIds.has(actorUserId) && tenant.ownerUserId !== actorUserId) {
      throw new HttpException(
        `TENANT_DATA_ISOLATION_VIOLATION: User ${actorUserId} is not authorized to access ${resourceDesc} in foreign tenant ${targetTenantId}.`,
        HttpStatus.FORBIDDEN
      );
    }
  }

  public getTenant(tenantId: string): TenantRecord | undefined {
    return this.tenants.get(tenantId);
  }
}
