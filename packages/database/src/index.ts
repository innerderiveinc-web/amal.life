import {
  User,
  UserProfile,
  UserPreference,
  UserConsent,
  UserContext,
  UserMemory,
  IslamicSource,
  SourcePassage,
  EvidenceEdge,
  Topic,
  IslamicConcept,
  Journey,
  AmalAction,
  Reflection,
  PrayerEvent,
  Family,
  FamilyMember,
  ScholarProfile,
  ScholarCase,
  ScholarCaseMessage,
  AuditLog,
} from '@amal/types';
import {
  SEED_ISLAMIC_SOURCES,
  SEED_SOURCE_PASSAGES,
  SEED_TOPICS,
  SEED_CONCEPTS,
  SEED_EVIDENCE_EDGES,
  SEED_SCHOLARS,
} from './seeds/data.js';
import { SEED_JOURNEY_TEMPLATES } from './seeds/journeys.js';

export class InMemoryAmalDatabase {
  users: Map<string, User> = new Map();
  credentials: Map<string, { passwordHash: string; salt?: string }> = new Map();
  profiles: Map<string, UserProfile> = new Map();
  preferences: Map<string, UserPreference> = new Map();
  consents: Map<string, UserConsent[]> = new Map();
  contexts: Map<string, UserContext[]> = new Map();
  memories: Map<string, UserMemory[]> = new Map();

  sources: Map<string, IslamicSource> = new Map();
  passages: Map<string, SourcePassage> = new Map();
  edges: Map<string, EvidenceEdge> = new Map();
  nodes: Map<string, any> = new Map();
  topics: Map<string, Topic> = new Map();
  concepts: Map<string, IslamicConcept> = new Map();

  journeys: Map<string, Journey> = new Map();
  goals: Map<string, any> = new Map();
  amals: Map<string, any> = new Map();
  reflections: Map<string, Reflection[]> = new Map();
  prayers: Map<string, PrayerEvent[]> = new Map();

  families: Map<string, Family> = new Map();
  familyMembers: Map<string, FamilyMember[]> = new Map();

  scholars: Map<string, ScholarProfile> = new Map();
  scholarCases: Map<string, ScholarCase> = new Map();
  caseMessages: Map<string, ScholarCaseMessage[]> = new Map();

  auditLogs: AuditLog[] = [];

  constructor() {
    this.seedDefaults();
  }

  seedDefaults() {
    // Seed verified sources
    for (const src of SEED_ISLAMIC_SOURCES) {
      this.sources.set(src.id, src);
    }
    for (const pass of SEED_SOURCE_PASSAGES) {
      this.passages.set(pass.id, pass);
    }
    for (const top of SEED_TOPICS) {
      this.topics.set(top.id, top);
    }
    for (const con of SEED_CONCEPTS) {
      this.concepts.set(con.id, con);
    }
    for (const edge of SEED_EVIDENCE_EDGES) {
      this.edges.set(edge.id, edge);
    }
    for (const scholar of SEED_SCHOLARS) {
      this.scholars.set(scholar.id, scholar);
    }

    // In production, never seed hardcoded default user records into client bundles
    const isTestOrLocal = typeof process !== 'undefined' && (process.env?.NODE_ENV === 'test' || process.env?.SEED_DEMO_USERS === 'true');
    if (isTestOrLocal) {
      const defaultUserId = 'usr_test_seed';
      this.users.set(defaultUserId, {
        id: defaultUserId,
        email: 'test.user@example.com',
        role: 'USER',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      this.profiles.set(defaultUserId, {
        userId: defaultUserId,
        displayName: 'Test Seeker',
        language: 'en',
        country: 'IN',
        timezone: 'Asia/Kolkata',
        lifeStage: 'YOUNG_PROFESSIONAL',
        bio: 'Test user for local verification harness.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      this.preferences.set(defaultUserId, {
        userId: defaultUserId,
        madhhab: 'GENERAL',
        prayerCalculationMethod: 'MUSLIM_WORLD_LEAGUE',
        reminderStyle: 'CALM',
        notificationPreferences: {
          salah: true,
          amal: true,
          reflection: true,
          journey: true,
          scholar: true,
          family: true,
        },
        contentPreferences: {
          preferredLanguage: 'en',
          showScholarlyDifferences: true,
          primaryGoals: ['Salah', 'Fajr Recovery', 'Quran Habit'],
        },
        privacyPreferences: {
          allowAiMemory: true,
          allowBehavioralContext: true,
          allowFamilyProgressShare: false,
          allowAnalytics: false,
        },
        updatedAt: new Date().toISOString(),
      });
    }
  }

  async recordAuditLog(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
    const entry: AuditLog = {
      ...log,
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.push(entry);
    return entry;
  }
}

export const db = new InMemoryAmalDatabase();
export * from './seeds/data.js';
export * from './seeds/journeys.js';
export * from './client.js';
export * from './repositories/index.js';
export * from './sirah/index.js';

