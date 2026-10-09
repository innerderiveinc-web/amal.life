/**
 * AMAL OS — LAYER 15: SECURE BILLING WEBHOOK & RECONCILIATION SERVICE (Sections 8, 9, 10, 60)
 * Enforces cryptographic webhook verification, replay protection, idempotency,
 * subscription lifecycle transitions, and automatic server-side entitlement sync.
 */

import { Injectable } from '@nestjs/common';
import { BillingService } from './billing.service.js';
import { BillingProvider, BillingWebhookEvent } from './providers/billing-provider.interface.js';
import { LocalTestProvider } from './providers/local-test.provider.js';
import { StripeProvider } from './providers/stripe.provider.js';

export interface ProcessWebhookResult {
  success: boolean;
  eventId?: string;
  actionTaken?: string;
  subscriptionStatus?: string;
  error?: string;
  alreadyProcessed?: boolean;
}

@Injectable()
export class BillingWebhookService {
  private providers: Map<string, BillingProvider> = new Map();
  private processedEventIds: Set<string> = new Set();
  private webhookSecrets: Map<string, string> = new Map();

  constructor(private readonly billingService: BillingService = new BillingService()) {
    // Register default providers
    const local = new LocalTestProvider();
    const stripe = new StripeProvider();

    this.providers.set(local.providerName, local);
    this.providers.set(stripe.providerName, stripe);

    // Default webhook secrets (configurable via env)
    this.webhookSecrets.set('LOCAL_TEST', process.env.TEST_WEBHOOK_SECRET || 'whsec_test_secret_key_123');
    this.webhookSecrets.set('STRIPE', process.env.STRIPE_WEBHOOK_SECRET || 'whsec_stripe_production_key_456');
  }

  public getProvider(providerName: string): BillingProvider | undefined {
    return this.providers.get(providerName);
  }

  /**
   * Main webhook ingestion pipeline:
   * 1. Signature & timestamp validation
   * 2. Idempotency & replay attack check
   * 3. Lifecycle status transition
   * 4. Entitlement reconciliation
   */
  public async handleWebhook(
    providerName: 'STRIPE' | 'RAZORPAY' | 'LOCAL_TEST',
    payload: string | any,
    signature: string,
    timestampHeader?: string
  ): Promise<ProcessWebhookResult> {
    const provider = this.providers.get(providerName);
    if (!provider) {
      return { success: false, error: `UNSUPPORTED_PROVIDER: ${providerName}` };
    }

    const secret = this.webhookSecrets.get(providerName) || 'whsec_default';
    const validation = await provider.validateWebhookSignature(payload, signature, secret, timestampHeader);

    if (!validation.valid || !validation.event) {
      return { success: false, error: validation.error || 'INVALID_SIGNATURE' };
    }

    const event = validation.event;

    // Idempotency & Replay Protection: Check if event ID has already been processed
    if (this.processedEventIds.has(event.id)) {
      return {
        success: true,
        eventId: event.id,
        alreadyProcessed: true,
        actionTaken: 'IDEMPOTENT_IGNORE',
      };
    }

    // Process event based on event type
    const result = await this.dispatchLifecycleTransition(event);

    // Record processed event ID
    this.processedEventIds.add(event.id);

    return {
      success: true,
      eventId: event.id,
      actionTaken: result.actionTaken,
      subscriptionStatus: result.subscriptionStatus,
    };
  }

  private async dispatchLifecycleTransition(event: BillingWebhookEvent): Promise<{
    actionTaken: string;
    subscriptionStatus: string;
  }> {
    const userId = event.data.userId || 'usr_sample_01';
    const planCode = event.data.planCode || 'PLUS_MONTHLY';

    switch (event.type) {
      // 1. Successful payment -> ACTIVE
      case 'invoice.payment_succeeded':
      case 'payment.succeeded':
      case 'subscription.activated': {
        const sub = this.billingService.activateSubscription(userId, planCode, event.data.subscriptionId);
        return { actionTaken: 'SUBSCRIPTION_ACTIVATED', subscriptionStatus: sub.status };
      }

      // 2. Payment failure -> GRACE_PERIOD (7 days before suspension)
      case 'invoice.payment_failed':
      case 'payment.failed': {
        const sub = this.billingService.getUserSubscription(userId);
        sub.status = 'GRACE_PERIOD';
        sub.updatedAt = new Date().toISOString();
        return { actionTaken: 'ENTERED_GRACE_PERIOD', subscriptionStatus: 'GRACE_PERIOD' };
      }

      // 3. Subscription cancellation -> CANCELLED
      case 'customer.subscription.deleted':
      case 'subscription.cancelled': {
        const sub = this.billingService.getUserSubscription(userId);
        sub.status = 'CANCELLED';
        sub.cancelAtPeriodEnd = true;
        sub.updatedAt = new Date().toISOString();
        return { actionTaken: 'SUBSCRIPTION_CANCELLED', subscriptionStatus: 'CANCELLED' };
      }

      // 4. Charge refunded -> REFUNDED
      case 'charge.refunded':
      case 'payment.refunded': {
        const sub = this.billingService.getUserSubscription(userId);
        sub.status = 'REFUNDED';
        sub.updatedAt = new Date().toISOString();
        return { actionTaken: 'PAYMENT_REFUNDED', subscriptionStatus: 'REFUNDED' };
      }

      // 5. Subscription paused -> PAUSED
      case 'customer.subscription.paused': {
        const sub = this.billingService.pauseSubscription(userId);
        return { actionTaken: 'SUBSCRIPTION_PAUSED', subscriptionStatus: sub.status };
      }

      default:
        return { actionTaken: 'EVENT_ACKNOWLEDGED', subscriptionStatus: 'ACTIVE' };
    }
  }
}
