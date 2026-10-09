/**
 * AMAL OS — COMMUNITY & UMMAH OS TYPES
 * Trusted Muslim Community, Learning, Service & Institution Layer
 */

export type CommunityOrganizationType =
  | 'MOSQUE'
  | 'MADRASAH'
  | 'ISLAMIC_SCHOOL'
  | 'UNIVERSITY'
  | 'SCHOLAR_ORGANIZATION'
  | 'CHARITY'
  | 'NONPROFIT'
  | 'COMMUNITY_CENTER'
  | 'LEARNING_CIRCLE'
  | 'YOUTH_PROGRAM'
  | 'WOMEN_PROGRAM'
  | 'FAMILY_PROGRAM'
  | 'HAJJ_UMRAH_SERVICE'
  | 'OTHER_APPROVED_ORGANIZATION';

export type OrganizationVerificationStatus =
  | 'DISCOVERED'
  | 'APPLICATION_SUBMITTED'
  | 'DOCUMENT_REVIEW'
  | 'IDENTITY_VERIFIED'
  | 'ORG_VERIFIED'
  | 'SCHOLAR_REVIEW_REQUIRED'
  | 'APPROVED'
  | 'SUSPENDED'
  | 'REJECTED'
  | 'ARCHIVED';

export type VerificationBadgeType =
  | 'IDENTITY_VERIFIED'
  | 'ORGANIZATION_VERIFIED'
  | 'SCHOLAR_VERIFIED'
  | 'SOURCE_VERIFIED'
  | 'PROGRAM_VERIFIED'
  | 'LOCATION_VERIFIED';

export type CommunityLocationPrecision =
  | 'LOCATION_OFF'
  | 'CITY_LEVEL'
  | 'NEIGHBORHOOD_LEVEL'
  | 'PRECISE_LOCATION';

export interface CommunityLocation {
  id: string;
  city: string;
  neighborhood?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isPhysicalAddressPublic: boolean;
}

export interface CommunityOrganization {
  id: string;
  name: string;
  type: CommunityOrganizationType;
  verificationStatus: OrganizationVerificationStatus;
  badges: VerificationBadgeType[];
  location: CommunityLocation;
  contactEmail: string;
  website?: string;
  languages: string[];
  scholarlyOrientation?: string;
  servicesOffered: string[];
  safetyPolicyAgreed: boolean;
  privacyPolicyAgreed: boolean;
  createdAt: string;
}

export interface MosqueProfile {
  orgId: string;
  jummahTimes: string[];
  womenFacilities: boolean;
  familyFacilities: boolean;
  wheelchairAccessible: boolean;
  parkingAvailable: boolean;
  childrenPrograms: boolean;
}

export type CommunityProgramType =
  | 'QURAN_CLASS'
  | 'TAFSIR'
  | 'HADITH'
  | 'FIQH'
  | 'SEERAH'
  | 'ARABIC'
  | 'CHILDREN'
  | 'YOUTH'
  | 'WOMEN'
  | 'FAMILY'
  | 'ELDERLY'
  | 'NEW_MUSLIMS'
  | 'COUNSELLING_REFERRAL'
  | 'COMMUNITY_SERVICE';

export interface CommunityProgram {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  type: CommunityProgramType;
  targetAgeBand: string;
  language: string;
  instructorName: string;
  isVerified: boolean;
  isOnline: boolean;
  locationId?: string;
  registrationRequired: boolean;
  costType: 'FREE' | 'DONATION' | 'FEE';
  createdAt: string;
}

export interface CommunityEvent {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  locationId?: string;
  programId?: string;
  registeredUserIds: string[];
  capacityLimit?: number;
  createdAt: string;
}

export type CommunityGroupType =
  | 'PRIVATE'
  | 'INVITE_ONLY'
  | 'VERIFIED_PROGRAM'
  | 'INSTITUTION_MANAGED'
  | 'SCHOLAR_LED'
  | 'FAMILY'
  | 'LEARNING_CIRCLE';

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  type: CommunityGroupType;
  creatorId: string;
  organizationId?: string;
  memberUserIds: string[];
  isAnonymousPostingProhibited: true; // Invariant: No anonymous flame posting
  createdAt: string;
}

export type ServiceOpportunityType =
  | 'FOOD_DISTRIBUTION'
  | 'EDUCATION'
  | 'ELDERLY_SUPPORT'
  | 'COMMUNITY_CLEANUP'
  | 'BLOOD_DONATION'
  | 'DISASTER_RELIEF'
  | 'ORPHAN_SUPPORT'
  | 'REFUGEE_ASSISTANCE'
  | 'MOSQUE_VOLUNTEERING'
  | 'SKILL_BASED_VOLUNTEERING';

export interface CommunityServiceOpportunity {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  type: ServiceOpportunityType;
  requiredTimeHours: number;
  requiredSkills: string[];
  familyFriendly: boolean;
  locationId?: string;
  isOnline: boolean;
  verifiedOrgOnly: boolean;
  volunteersSignedUp: string[];
  createdAt: string;
}

export type CommunityReportCategory =
  | 'HARASSMENT'
  | 'HATE'
  | 'SECTARIAN_ATTACK'
  | 'TAKFIR'
  | 'MISINFORMATION'
  | 'FRAUD'
  | 'SCAM'
  | 'EXPLOITATION'
  | 'CHILD_SAFETY'
  | 'SEXUAL_CONTENT'
  | 'EXTREMISM'
  | 'VIOLENCE'
  | 'PRIVACY_VIOLATION'
  | 'IMPERSONATION'
  | 'SPAM';

export interface CommunityReportRecord {
  id: string;
  reportingUserId: string;
  reportedEntityId: string;
  reportedEntityType: 'USER' | 'CONTENT' | 'ORGANIZATION' | 'SCHOLAR' | 'EVENT' | 'GROUP';
  category: CommunityReportCategory;
  details: string;
  isPrioritySafety: boolean;
  status: 'PENDING' | 'INVESTIGATING' | 'ACTIONED' | 'DISMISSED';
  createdAt: string;
}

export interface CommunityResource {
  id: string;
  title: string;
  organizationId: string;
  resourceType: 'ARTICLE' | 'BOOK' | 'AUDIO' | 'VIDEO' | 'COURSE';
  verifiedCitationIds?: string[];
  provenanceTag: 'COMMUNITY_CONTENT' | 'VERIFIED_KNOWLEDGE';
  license: string;
  language: string;
  url: string;
}

export interface CommunityDiscoveryQuery {
  locationPrecision?: CommunityLocationPrecision;
  city?: string;
  language?: string;
  topic?: string;
  ageGroup?: string;
  isOnlineOnly?: boolean;
  isFamilyFriendly?: boolean;
  scholarlyTraditionFilter?: string;
}

export interface CommunityVolunteerMatchingQuery {
  userId: string;
  availableHours: number;
  skills: string[];
  familyParticipation: boolean;
  locationCity?: string;
}
