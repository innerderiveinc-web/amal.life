/**
 * AMAL OS V3.0 — Ecosystem Platform Domain Types
 * Consumer OS + Scholar OS + Family OS + Institution OS + Knowledge Platform + API Ecosystem
 */

export type TenantType =
  | 'INDIVIDUAL'
  | 'FAMILY'
  | 'MOSQUE'
  | 'ISLAMIC_SCHOOL'
  | 'EDUCATIONAL_ORGANIZATION'
  | 'COMMUNITY_ORGANIZATION'
  | 'HAJJ_UMRAH_PROVIDER'
  | 'APPROVED_PARTNER';

export type TenantMemberRole =
  | 'OWNER'
  | 'ADMIN'
  | 'SCHOLAR'
  | 'EDUCATOR'
  | 'MEMBER'
  | 'STUDENT'
  | 'GUEST';

export interface TenantMember {
  userId: string;
  role: TenantMemberRole;
  permissions: string[];
  joinedAt: string;
}

export interface Tenant {
  tenantId: string;
  tenantType: TenantType;
  name: string;
  ownerId: string;
  members: TenantMember[];
  entitlements: string[];
  settings: Record<string, unknown>;
  auditEnabled: boolean;
  createdAt: string;
}

export type ScholarCaseStatus =
  | 'QUEUED'
  | 'TRIAGED'
  | 'ASSIGNED'
  | 'IN_REVIEW'
  | 'RESPONDED'
  | 'APPEALED'
  | 'CLOSED';

export interface ScholarProfileV2 {
  scholarId: string;
  name: string;
  credentials: string[];
  jurisprudentialScope: string[]; // e.g. ['Hanafi', 'Shafi\'i', 'General Fiqh']
  languages: string[];
  verified: boolean;
  twoPersonReviewCertified: boolean;
  ratingHiddenByPolicy: true; // Section 11: Popularity scores cannot define Islamic authority
}

export interface ScholarExpertiseGraph {
  scholarId: string;
  expertiseAreas: string[];
  approvedReviewPermissions: string[];
  languageCodes: string[];
  jurisprudentialScope: string[];
}

export interface ScholarCaseV2 {
  caseId: string;
  userId: string;
  tenantId: string;
  category: string;
  urgency: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
  status: ScholarCaseStatus;
  assignedScholarId?: string;
  secondaryScholarId?: string; // INV_07 Two-Scholar rule
  evidenceRefIds: string[];
  userQuestion: string;
  scholarResponse?: string;
  slaTargetHours: number;
  createdAt: string;
  firstReviewedAt?: string;
  respondedAt?: string;
  closedAt?: string;
}

export interface ScholarDisagreementPosition {
  scholarId: string;
  positionName: string;
  legalSchool: string;
  evidenceIds: string[];
  conditions: string[];
}

export interface ScholarDisagreementIssue {
  issueId: string;
  topic: string;
  positions: ScholarDisagreementPosition[];
  consensusReached: boolean;
  guidanceNote: string;
}

export interface ScholarAppealV2 {
  appealId: string;
  caseId: string;
  userId: string;
  reason: string;
  secondaryScholarId: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'RESOLVED';
  outcomeNote?: string;
  resolvedAt?: string;
}

export interface ScholarKnowledgeProposal {
  proposalId: string;
  scholarId: string;
  proposalType: 'SOURCE' | 'CLAIM' | 'INTERPRETATION' | 'CORRECTION';
  content: Record<string, unknown>;
  governanceStatus: 'PROPOSED' | 'IN_GOVERNANCE' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export type FamilyRoleV2 =
  | 'OWNER'
  | 'ADULT_MEMBER'
  | 'YOUNG_MEMBER'
  | 'CHILD_MEMBER'
  | 'CUSTOM_ROLE';

export interface FamilyShareRecordV2 {
  shareId: string;
  familyTenantId: string;
  ownerId: string;
  resourceType: 'SHARED_GOAL' | 'SHARED_JOURNEY' | 'SCHEDULE' | 'PROJECT';
  resourceId: string;
  sharedWithUserId: string;
  permission: 'READ' | 'CONTRIBUTE';
  purpose: string;
  createdAt: string;
  expiresAt?: string;
}

export interface EcosystemInstitutionProgram {
  programId: string;
  institutionTenantId: string;
  title: string;
  domain: string;
  description: string;
  contentClassification: 'INSTITUTIONAL_CONTENT'; // Section 23: Never automatic ISLAMIC_AUTHORITY
  enrolledUserIds: string[];
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
}

export interface InstitutionAggregateAnalytics {
  institutionTenantId: string;
  programId: string;
  enrolledCount: number;
  completedCount: number;
  aggregateCompletionRate: number;
  individualReligiousTrackingDisabled: true; // Section 25: Aggregate only
}

export interface SourceRegistryV3 {
  sourceId: string;
  title: string;
  author: string;
  edition: string;
  licenseType: string;
  artifactHash: string;
  commercialPermission: boolean;
  reviewLineage: string[];
  jurisdiction?: string;
}

export interface EcosystemKnowledgeRelease {
  releaseId: string; // e.g. 'KNOWLEDGE_RELEASE_1'
  version: string;
  immutableRootHash: string;
  claimsCount: number;
  sourcesCount: number;
  status: 'DRAFT' | 'STAGED' | 'PUBLISHED' | 'ROLLED_BACK';
  publishedAt: string;
}

export type ApiScope =
  | 'profile:read'
  | 'goals:read'
  | 'goals:write'
  | 'journeys:read'
  | 'journeys:write'
  | 'amal:read'
  | 'amal:write'
  | 'evidence:read'
  | 'scholar:case:create'
  | 'family:shared:read'
  | 'institution:programs:read';

export interface ApiClientRecord {
  clientId: string;
  partnerId: string;
  appName: string;
  scopes: ApiScope[];
  rateLimitRpm: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'REVOKED';
  createdAt: string;
}

export interface OAuthTokenGrant {
  accessToken: string;
  clientId: string;
  userId: string;
  scopes: ApiScope[];
  expiresAt: string;
}

export interface WebhookSubscriptionRecord {
  subscriptionId: string;
  clientId: string;
  targetUrl: string;
  eventTypes: ('journey.started' | 'journey.completed' | 'amal.completed')[];
  secretHash: string;
  isActive: boolean;
}

export interface PartnerGovernanceRecord {
  partnerId: string;
  name: string;
  dueDiligenceCompleted: boolean;
  prohibitedActivitiesAcknowledged: boolean; // No selling data, no ad profiling, no religious targeting
  status: 'APPROVED' | 'PROBATION' | 'SUSPENDED' | 'TERMINATED';
  dataAccessScope: string[];
  contractRef: string;
}

export type KillSwitchType =
  | 'API_CLIENT'
  | 'API_ENDPOINT'
  | 'KNOWLEDGE_SOURCE'
  | 'KNOWLEDGE_RELEASE'
  | 'PARTNER_INTEGRATION'
  | 'GLOBAL_SAFE_MODE';

export interface KillSwitchRecord {
  switchId: string;
  targetId: string;
  switchType: KillSwitchType;
  isActive: boolean;
  reason: string;
  triggeredBy: string;
  triggeredAt: string;
}

export interface GlobalSafeModeState {
  enabled: boolean;
  activeTier: 'CORE_DETERMINISTIC_ONLY' | 'STANDARD_PRODUCTION';
  reason?: string;
  activatedAt?: string;
}
