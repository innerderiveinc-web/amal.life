/**
 * AMAL OS — FAMILY OS & CONTINUITY TYPES
 * Family Circles, Multi-Role Journeys, Child Safeguards, Privacy Firewalls
 */

export type FamilyRole =
  | 'OWNER'
  | 'ADULT_MEMBER'
  | 'TEEN'
  | 'CHILD'
  | 'SPOUSE'
  | 'PARENT'
  | 'SIBLING'
  | 'GUARDIAN'
  | 'MENTOR'
  | 'VIEWER'
  | 'SCHOLAR';

export type FamilyStructureType =
  | 'FAMILY'
  | 'HOUSEHOLD'
  | 'TRUSTED_CIRCLE'
  | 'LEARNING_CIRCLE'
  | 'MENTORSHIP_CIRCLE';

export type SharingLevel =
  | 'PRIVATE'
  | 'SELECTED_PEOPLE'
  | 'FAMILY'
  | 'HOUSEHOLD'
  | 'LEARNING_GROUP'
  | 'SCHOLAR'
  | 'PUBLIC';

export interface Family {
  id: string;
  name: string;
  structureType?: FamilyStructureType;
  inviteCode: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  userId: string;
  displayName: string;
  role: FamilyRole;
  joinedAt: string;
}

export interface FamilySharingPermission {
  id: string;
  sharedByUserId: string;
  sharedWithUserIdOrGroupId: string;
  sharingLevel: SharingLevel;
  resourceType: string;
  resourceId: string;
  permission: 'READ' | 'CONTRIBUTE';
  createdAt: string;
  expiresAt?: string;
  isRevocable: boolean;
}

export type ChildAgeBand =
  | 'UNDER_7'
  | '7_10'
  | '11_13'
  | '14_17'
  | '18_PLUS';

export interface ChildAccountProfile {
  userId: string;
  ageBand: ChildAgeBand;
  guardianUserId: string;
  guardianConsentGranted: boolean;
  contentPolicy: 'CHILD_SAFE_QURAN_CHARACTER_ONLY';
  aiPolicy: 'SAFE_GENTLE_NO_FIQH_NO_CRISIS';
  privacyPolicy: 'SHIELDED_NO_PUBLIC_PROFILE';
  prohibitedFeatures: string[];
}

export interface FamilyMemberAmalPlan {
  userId: string;
  displayName: string;
  role: FamilyRole;
  amalTitle: string; // e.g. Father: "Understand Tafsir", Mother: "Review translation", Child: "Memorize verses"
  estimatedMinutes: number;
  frequency: string;
  isCompletedToday: boolean;
}

export interface FamilySharedJourney {
  id: string;
  familyId: string;
  title: string; // e.g. "Learn Surah Al-Fatihah Together"
  goal: string;
  familyBaseline: string;
  totalDays: number;
  currentDay: number;
  aggregateCompletedActions: number;
  totalTargetActions: number;
  memberAmals: Record<string, FamilyMemberAmalPlan>;
  sharedActivityDescription: string;
  createdAt: string;
}

export interface FamilyActivity {
  id: string;
  familyJourneyId: string;
  dayNumber: number;
  title: string;
  familyPrompt: string;
  discussionQuestion: string;
  completedMemberUserIds: string[];
}

export interface FamilyTodayMemberStatus {
  userId: string;
  displayName: string;
  role: FamilyRole;
  participatedToday: boolean;
}

export interface FamilyTodayDashboardView {
  familyId: string;
  familyName: string;
  date: string;
  familyJourneyTitle: string;
  sharedActivityTitle: string;
  memberParticipation: FamilyTodayMemberStatus[];
  // Non-negotiable: ZERO religious ranking, ZERO faith scores, ZERO "who failed" indicators
}
