/**
 * AMAL OS V3.0 — Ecosystem API & Partner Governance Engine
 * Scoped OAuth 2.x, Webhook HMAC signatures, Developer Sandbox, and Partner Due Diligence.
 */

import {
  ApiClientRecord,
  ApiScope,
  OAuthTokenGrant,
  PartnerGovernanceRecord,
  WebhookSubscriptionRecord
} from '@amal/types';
import * as crypto from 'crypto';

export class EcosystemApiEngine {
  private clients: Map<string, ApiClientRecord> = new Map();
  private partners: Map<string, PartnerGovernanceRecord> = new Map();
  private tokens: Map<string, OAuthTokenGrant> = new Map();
  private webhooks: Map<string, WebhookSubscriptionRecord> = new Map();
  private processedWebhookEvents: Set<string> = new Set();

  constructor() {
    this.seedPartnersAndClients();
  }

  private seedPartnersAndClients(): void {
    const p1: PartnerGovernanceRecord = {
      partnerId: 'part_hajj_makkah_tours',
      name: 'Makkah Sacred Journeys Co.',
      dueDiligenceCompleted: true,
      prohibitedActivitiesAcknowledged: true,
      status: 'APPROVED',
      dataAccessScope: ['journeys:read', 'institution:programs:read'],
      contractRef: 'DPA-2026-MAK-091'
    };

    const c1: ApiClientRecord = {
      clientId: 'client_makkah_portal_app',
      partnerId: p1.partnerId,
      appName: 'Makkah Pilgrim Companion Integration',
      scopes: ['journeys:read', 'institution:programs:read'],
      rateLimitRpm: 120,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    this.partners.set(p1.partnerId, p1);
    this.clients.set(c1.clientId, c1);
  }

  public registerApiClient(params: {
    clientId: string;
    partnerId: string;
    appName: string;
    scopes: ApiScope[];
    rateLimitRpm?: number;
  }): ApiClientRecord {
    const partner = this.partners.get(params.partnerId);
    if (!partner || partner.status !== 'APPROVED') {
      throw new Error(`UNAPPROVED_PARTNER: Partner ${params.partnerId} must complete governance due diligence first.`);
    }

    // Section 44 Invariant: Never allow everything:read or unrestricted wildcards
    if ((params.scopes as string[]).includes('everything:read') || (params.scopes as string[]).includes('*')) {
      throw new Error('UNAUTHORIZED_WILDCARD_SCOPE: "everything:read" is forbidden in AMAL OS least-privilege API architecture.');
    }

    const client: ApiClientRecord = {
      clientId: params.clientId,
      partnerId: params.partnerId,
      appName: params.appName,
      scopes: params.scopes,
      rateLimitRpm: params.rateLimitRpm || 60,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    this.clients.set(params.clientId, client);
    return client;
  }

  public issueOAuthToken(params: {
    clientId: string;
    userId: string;
    requestedScopes: ApiScope[];
  }): OAuthTokenGrant {
    const client = this.clients.get(params.clientId);
    if (!client || client.status !== 'ACTIVE') {
      throw new Error(`API_CLIENT_INACTIVE: Client ${params.clientId} is suspended or not registered.`);
    }

    // Verify client has permission for requested scopes
    for (const scope of params.requestedScopes) {
      if (!client.scopes.includes(scope)) {
        throw new Error(`SCOPE_UNAUTHORIZED: Client ${params.clientId} is not authorized for scope "${scope}".`);
      }
    }

    const accessToken = `amal_sec_${crypto.randomBytes(24).toString('hex')}`;
    const token: OAuthTokenGrant = {
      accessToken,
      clientId: params.clientId,
      userId: params.userId,
      scopes: params.requestedScopes,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString()
    };
    this.tokens.set(accessToken, token);
    return token;
  }

  public assertApiScope(accessToken: string, requiredScope: ApiScope): OAuthTokenGrant {
    const token = this.tokens.get(accessToken);
    if (!token) throw new Error('UNAUTHORIZED: Invalid access token.');
    if (new Date(token.expiresAt).getTime() < Date.now()) {
      throw new Error('TOKEN_EXPIRED: OAuth access token expired.');
    }
    if (!token.scopes.includes(requiredScope)) {
      throw new Error(`SCOPE_FORBIDDEN: Token lacks required scope "${requiredScope}".`);
    }
    return token;
  }

  public registerWebhook(params: {
    subscriptionId: string;
    clientId: string;
    targetUrl: string;
    eventTypes: ('journey.started' | 'journey.completed' | 'amal.completed')[];
    secret: string;
  }): WebhookSubscriptionRecord {
    const client = this.clients.get(params.clientId);
    if (!client || client.status !== 'ACTIVE') {
      throw new Error(`CLIENT_INACTIVE: Client ${params.clientId} cannot register webhooks.`);
    }

    const secretHash = crypto.createHash('sha256').update(params.secret).digest('hex');
    const record: WebhookSubscriptionRecord = {
      subscriptionId: params.subscriptionId,
      clientId: params.clientId,
      targetUrl: params.targetUrl,
      eventTypes: params.eventTypes,
      secretHash,
      isActive: true
    };
    this.webhooks.set(params.subscriptionId, record);
    return record;
  }

  public signWebhookPayload(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  public verifyAndConsumeWebhookEvent(params: {
    eventId: string;
    payload: string;
    receivedSignature: string;
    secret: string;
  }): boolean {
    if (this.processedWebhookEvents.has(params.eventId)) {
      throw new Error(`WEBHOOK_REPLAY_ATTACK: Event ${params.eventId} has already been consumed.`);
    }

    const expectedSignature = this.signWebhookPayload(params.payload, params.secret);
    if (expectedSignature !== params.receivedSignature) {
      throw new Error('WEBHOOK_SIGNATURE_INVALID: Cryptographic HMAC signature verification failed.');
    }

    this.processedWebhookEvents.add(params.eventId);
    return true;
  }

  public suspendPartner(partnerId: string, reason: string): void {
    const partner = this.partners.get(partnerId);
    if (!partner) throw new Error(`PARTNER_NOT_FOUND: Partner ${partnerId} does not exist.`);
    partner.status = 'SUSPENDED';

    // Cascade suspend all partner clients
    for (const client of this.clients.values()) {
      if (client.partnerId === partnerId) {
        client.status = 'SUSPENDED';
      }
    }
  }

  public assertPartnerProhibitedActivity(action: string): void {
    // Section 51 & 102: Partners may NOT sell user religious data, build ad profiles, or target by religious vulnerability
    const prohibited = [
      'SELL_RELIGIOUS_DATA',
      'BUILD_ADVERTISING_PROFILES',
      'RELIGIOUS_PERSUASION_PROFILING',
      'RE_IDENTIFY_USERS'
    ];

    if (prohibited.includes(action)) {
      throw new Error(
        `PARTNER_ETHICS_VIOLATION: ${action} is strictly prohibited by AMAL OS Master Trust Invariants.`
      );
    }
  }

  public generateSandboxDataset(): Record<string, unknown> {
    // Section 49: Provide synthetic sandbox data; never leak real user religious data
    return {
      sandboxMode: true,
      syntheticUsers: [
        { userId: 'usr_sandbox_synthetic_01', pseudonym: 'SeekerAlpha', goals: ['Quran Consistency'] },
        { userId: 'usr_sandbox_synthetic_02', pseudonym: 'SeekerBeta', goals: ['Morning Adhkar'] }
      ],
      syntheticJourneys: [
        { journeyId: 'jny_sandbox_demo', title: 'Demo 7-Day Sunnah Routine', durationDays: 7 }
      ]
    };
  }
}
