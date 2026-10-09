/**
 * AMAL OS — LOCAL / TEST BILLING PROVIDER
 * Deterministic in-memory payment provider for local dev, automated testing, and CI/CD.
 */

import { createHmac } from 'node:crypto';
import {
  BillingProvider,
  CreateCustomerInput,
  CreateSubscriptionInput,
  BillingWebhookEvent,
  WebhookValidationResult,
} from './billing-provider.interface.js';

export class LocalTestProvider implements BillingProvider {
  public readonly providerName = 'LOCAL_TEST';
  private customers: Map<string, { customerId: string; email: string }> = new Map();
  private subscriptions: Map<string, { subscriptionId: string; status: string; planCode: string }> = new Map();

  public async createCustomer(input: CreateCustomerInput): Promise<{ customerId: string }> {
    const customerId = `cus_test_${input.userId}`;
    this.customers.set(customerId, { customerId, email: input.email });
    return { customerId };
  }

  public async createSubscription(input: CreateSubscriptionInput): Promise<{
    subscriptionId: string;
    checkoutUrl: string;
  }> {
    const subscriptionId = `sub_test_${Date.now()}_${input.userId}`;
    this.subscriptions.set(subscriptionId, {
      subscriptionId,
      status: 'ACTIVE',
      planCode: input.planCode,
    });
    return {
      subscriptionId,
      checkoutUrl: `https://test-checkout.amal.local/pay/${subscriptionId}`,
    };
  }

  public async cancelSubscription(subscriptionId: string): Promise<{ success: boolean; status: string }> {
    const sub = this.subscriptions.get(subscriptionId);
    if (sub) {
      sub.status = 'CANCELLED';
      return { success: true, status: 'CANCELLED' };
    }
    return { success: true, status: 'CANCELLED' };
  }

  public async refundPayment(invoiceId: string, _amountCents?: number): Promise<{ success: boolean; refundId: string }> {
    return {
      success: true,
      refundId: `re_test_${Date.now()}_${invoiceId}`,
    };
  }

  /**
   * Generates a valid test HMAC signature for simulating incoming provider webhooks
   */
  public generateTestSignature(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload).digest('hex');
  }

  public async validateWebhookSignature(
    payload: string | any,
    signature: string,
    secret: string,
    _timestampHeader?: string
  ): Promise<WebhookValidationResult> {
    const rawString = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const expected = createHmac('sha256', secret).update(rawString).digest('hex');

    if (signature !== expected) {
      return {
        valid: false,
        error: 'SIGNATURE_MISMATCH: Calculated HMAC does not match provided webhook signature.',
      };
    }

    try {
      const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
      const event: BillingWebhookEvent = {
        id: parsed.id || `evt_${Date.now()}`,
        type: parsed.type || 'payment.succeeded',
        provider: 'LOCAL_TEST',
        timestamp: parsed.timestamp || new Date().toISOString(),
        data: parsed.data || {},
        signature,
      };
      return { valid: true, event };
    } catch {
      return { valid: false, error: 'MALFORMED_WEBHOOK_PAYLOAD: JSON parse failed.' };
    }
  }
}
