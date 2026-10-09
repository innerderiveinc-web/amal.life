// ==============================================================================
// AMAL OS — LAYER 15: BUSINESS, MONETIZATION & INSTITUTION TYPES
// ==============================================================================

export type PlanTier = 'FREE' | 'PLUS' | 'FAMILY' | 'INSTITUTION' | 'ENTERPRISE';

export type PlanInterval = 'MONTH' | 'YEAR' | 'LIFETIME' | 'CUSTOM';

export interface BillingPlan {
  id: string;
  planCode: string;
  name: string;
  description: string;
  tier: PlanTier;
  currency: string;
  priceCents: number;
  interval: PlanInterval;
  isActive: boolean;
  version: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BillingEntitlement {
  id: string;
  planId: string;
  featureKey: string;
  maxLimit?: number | null;
  period?: 'DAY' | 'MONTH' | 'YEAR';
  isUnlimited: boolean;
  status: 'ACTIVE' | 'DISABLED';
}

export type SubscriptionStatus =
  | 'TRIAL'
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'GRACE_PERIOD'
  | 'PAUSED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'REFUNDED';

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  trialEndsAt?: string | null;
  currentPeriodStartsAt: string;
  currentPeriodEndsAt: string;
  cancelAtPeriodEnd: boolean;
  pausedAt?: string | null;
  cancellationReason?: string | null;
  providerCustomerId?: string | null;
  providerSubscriptionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionInvoice {
  id: string;
  subscriptionId: string;
  userId: string;
  amountCents: number;
  taxAmountCents: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  invoicePdfUrl?: string;
  billingDate: string;
}

export type ConsultationType =
  | 'QUICK'
  | 'DETAILED'
  | 'WRITTEN'
  | 'FAMILY_GUIDANCE'
  | 'SPECIALIZED_SUBJECT';

export interface ScholarConsultation {
  id: string;
  userId: string;
  scholarId: string;
  caseId?: string;
  consultationType: ConsultationType;
  feeCents: number;
  currency: string;
  platformFeeCents: number;
  scholarPayoutCents: number;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  payoutStatus: 'PENDING' | 'READY' | 'PAID' | 'OUT_OF_ESCROW';
  createdAt: string;
  updatedAt: string;
}

export type InstitutionType =
  | 'MOSQUE'
  | 'ISLAMIC_SCHOOL'
  | 'UNIVERSITY'
  | 'COMMUNITY_ORG'
  | 'HAJJ_UMRAH'
  | 'EMPLOYEE_PROGRAM';

export interface Institution {
  id: string;
  name: string;
  slug: string;
  institutionType: InstitutionType;
  status: 'PILOT' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED';
  maxSeats: number;
  currentSeats: number;
  domainWhitelist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionMembership {
  id: string;
  institutionId: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'SCHOLAR' | 'INSTRUCTOR' | 'MEMBER';
  status: 'ACTIVE' | 'INVITED' | 'REMOVED';
  createdAt: string;
}

export interface InstitutionProgram {
  id: string;
  institutionId: string;
  name: string;
  description?: string;
  journeyId?: string;
  isPublic: boolean;
  memberCount: number;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
}

export interface GrowthReferral {
  id: string;
  referrerUserId: string;
  inviteToken: string;
  referredUserId?: string;
  rewardType: 'PLUS_DAYS' | 'SCHOLAR_CREDIT' | 'FAMILY_TRIAL';
  status: 'PENDING' | 'CONVERTED' | 'EXPIRED' | 'REVOKED';
  rewardGranted: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface GrowthExperiment {
  id: string;
  experimentKey: string;
  name: string;
  hypothesis: string;
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED' | 'CANCELLED';
  ethicalReviewPassed: boolean; // MUST be true - no guilt/fear/shame experiments permitted
  targetSampleSize: number;
  createdAt: string;
}

export type LedgerTransactionType =
  | 'SUBSCRIPTION'
  | 'SCHOLAR_FEE'
  | 'PLATFORM_FEE'
  | 'REFUND'
  | 'SCHOLAR_PAYOUT'
  | 'CREDIT';

export interface RevenueLedgerEntry {
  id: string;
  transactionType: LedgerTransactionType;
  amountCents: number;
  currency: string;
  debitAccount: string;
  creditAccount: string;
  referenceId: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ApiTenant {
  id: string;
  organizationId: string;
  tenantName: string;
  apiKeyHash: string;
  scopes: string[];
  rateLimitPerMinute: number;
  isActive: boolean;
  createdAt: string;
}

export interface BusinessMetricsSummary {
  mrrCents: number;
  arrCents: number;
  arpuCents: number;
  activeSubscribers: number;
  meaningfulAmalRate: number; // North Star: % of users completing daily intentional amal
  retentionD30: number;
  trustViolationsCount: number; // Hard guardrail: must remain 0
  scholarGmvCents: number;
  institutionCount: number;
}
