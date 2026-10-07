export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION' | 'DELETED';

export type UserRole =
  | 'USER'
  | 'FAMILY_ADMIN'
  | 'SCHOLAR'
  | 'SCHOLAR_REVIEWER'
  | 'CONTENT_EDITOR'
  | 'CONTENT_REVIEWER'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type LifeStage =
  | 'STUDENT'
  | 'YOUNG_PROFESSIONAL'
  | 'PARENT'
  | 'MARRIED'
  | 'ENTREPRENEUR'
  | 'NEW_MUSLIM'
  | 'OTHER';

export interface UserProfile {
  userId: string;
  displayName: string;
  language: string;
  country: string;
  timezone: string;
  lifeStage?: LifeStage;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export type Madhhab = 'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI' | 'GENERAL';

export type PrayerCalculationMethod =
  | 'ISLAMIC_SOCIETY_OF_NORTH_AMERICA'
  | 'MUSLIM_WORLD_LEAGUE'
  | 'EGYPTIAN_GENERAL_AUTHORITY'
  | 'UMM_AL_QURA'
  | 'UNIVERSITY_OF_ISLAMIC_SCIENCES_KARACHI'
  | 'DUBAI'
  | 'CUSTOM';

export type ReminderStyle = 'CALM' | 'PRAYER_ONLY' | 'GENTLE_NUDGE' | 'SILENT';

export interface UserPreference {
  userId: string;
  madhhab: Madhhab;
  prayerCalculationMethod: PrayerCalculationMethod;
  reminderStyle: ReminderStyle;
  notificationPreferences: {
    salah: boolean;
    amal: boolean;
    reflection: boolean;
    journey: boolean;
    scholar: boolean;
    family: boolean;
  };
  contentPreferences: {
    preferredLanguage: string;
    showScholarlyDifferences: boolean;
    primaryGoals: string[];
  };
  privacyPreferences: {
    allowAiMemory: boolean;
    allowBehavioralContext: boolean;
    allowFamilyProgressShare: boolean;
    allowAnalytics: boolean;
  };
  updatedAt: string;
}

export type ConsentType =
  | 'TERMS_OF_SERVICE'
  | 'PRIVACY_POLICY'
  | 'AI_PERSONALIZATION'
  | 'BEHAVIORAL_INSIGHTS'
  | 'SCHOLAR_CASE_SHARING'
  | 'FAMILY_SYNC';

export interface UserConsent {
  id: string;
  userId: string;
  consentType: ConsentType;
  version: string;
  granted: boolean;
  grantedAt: string;
  revokedAt?: string | null;
}

export type ContextType =
  | 'EXPLICIT'     // User explicitly stated
  | 'BEHAVIORAL'   // Generated from product usage pattern
  | 'DERIVED';     // Inferred by system with confidence score

export interface UserContext {
  id: string;
  userId: string;
  contextType: ContextType;
  category: 'SLEEP' | 'WORK_SCHEDULE' | 'STRESS_LEVEL' | 'KNOWLEDGE_LEVEL' | 'COMMUTE' | 'ROUTINE';
  key: string;
  value: string;
  source: string;
  confidence: number; // 0.0 to 1.0 (Derived must always have < 1.0 and reversible)
  visibility: 'USER_ONLY' | 'SCHOLAR_ALLOWED' | 'SYSTEM_ONLY';
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type MemoryLevel =
  | 'SESSION'    // Ephemeral to active session
  | 'JOURNEY'    // Scoped to active journey
  | 'LONG_TERM'; // Persisted with explicit user consent

export interface UserMemory {
  id: string;
  userId: string;
  level: MemoryLevel;
  content: string;
  summary: string;
  relevanceTags: string[];
  userApproved: boolean;
  createdAt: string;
  expiresAt?: string | null;
}
