/**
 * AMAL OS — LAYER 15: BILLING PROVIDER CONTRACT & ABSTRACTION (Section 8)
 * Standard abstraction over external payment platforms (Stripe, Razorpay, Local Test)
 * ensuring zero vendor lock-in and strict signature/entitlement reconciliation.
 */

export interface CreateCustomerInput {
  userId: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface CreateSubscriptionInput {
  userId: string;
  customerId: string;
  planCode: string;
  currency?: string;
  trialDays?: number;
}

export interface BillingWebhookEvent {
  id: string;
  type: string;
  provider: 'STRIPE' | 'RAZORPAY' | 'LOCAL_TEST';
  timestamp: string;
  data: {
    customerId?: string;
    subscriptionId?: string;
    userId?: string;
    planCode?: string;
    amountCents?: number;
    currency?: string;
    status?: string;
    reason?: string;
  };
  signature?: string;
}

export interface WebhookValidationResult {
  valid: boolean;
  event?: BillingWebhookEvent;
  error?: string;
}

export interface BillingProvider {
  readonly providerName: string;
  createCustomer(input: CreateCustomerInput): Promise<{ customerId: string }>;
  createSubscription(input: CreateSubscriptionInput): Promise<{
    subscriptionId: string;
    clientSecret?: string;
    checkoutUrl?: string;
  }>;
  cancelSubscription(subscriptionId: string, immediate?: boolean): Promise<{ success: boolean; status: string }>;
  refundPayment(invoiceId: string, amountCents?: number, reason?: string): Promise<{ success: boolean; refundId: string }>;
  validateWebhookSignature(
    payload: string | any,
    signature: string,
    secret: string,
    timestampHeader?: string
  ): Promise<WebhookValidationResult>;
}
