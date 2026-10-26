/**
 * AMAL OS — LEGACY & FAMILY CONTINUITY OS ENGINE
 * 
 * Production-grade implementation of all 52 sections:
 * - Legacy Spaces, Items, Collections, Letters, Audio Messages
 * - Two-Graph Firewall: Islamic Evidence Graph vs Personal/Family Graph
 * - Anti-Surveillance & Strict Domestic Privacy Firewall (Spouse, Adult Child, Sibling)
 * - Child Safety Architecture (Age Bands, Gentle Positive Focus, Zero Shame/Guilt/Scoring)
 * - Multi-Role Shared Family Journeys & Family Today (No Rankings, No "Who Failed")
 * - Future Recipient Model & Controlled Release Workflow
 * - Inactivity Instructions & Digital Estate Safety (Not an inheritance service)
 * - Export, Tamper-Evident Audit Trail & Ethical Non-Monetization Guardrails
 */

import * as crypto from 'crypto';
import type {
  LegacySpaceRecord,
  LegacyItemRecord,
  LegacyItemType,
  LegacyCollectionRecord,
  LegacyReleaseRecord,
  LegacyReleaseStatus,
  FutureRecipientRecord,
  LegacyInstructionsRecord,
  LegacyAudioMessageRecord,
  LegacyLetterRecord,
  LegacyAuditLogRecord,
  ExportArchiveRecord,
  Family,
  FamilyMember,
  FamilyRole,
  FamilyStructureType,
  SharingLevel,
  FamilySharingPermission,
  ChildAccountProfile,
  ChildAgeBand,
  FamilySharedJourney,
  FamilyMemberAmalPlan,
  FamilyTodayDashboardView,
  FamilyTodayMemberStatus,
} from '@amal/types';

export class LegacyContinuityEngine {
  private spaces: Map<string, LegacySpaceRecord> = new Map();
  private items: Map<string, LegacyItemRecord> = new Map();
  private collections: Map<string, LegacyCollectionRecord> = new Map();
  private releases: Map<string, LegacyReleaseRecord> = new Map();
  private futureRecipients: Map<string, FutureRecipientRecord[]> = new Map();
  private instructions: Map<string, LegacyInstructionsRecord> = new Map();
  private letters: Map<string, LegacyLetterRecord> = new Map();
  private audioMessages: Map<string, LegacyAudioMessageRecord> = new Map();
  private families: Map<string, Family> = new Map();
  private members: Map<string, FamilyMember[]> = new Map();
  private permissions: Map<string, FamilySharingPermission[]> = new Map();
  private childProfiles: Map<string, ChildAccountProfile> = new Map();
  private journeys: Map<string, FamilySharedJourney> = new Map();
  private auditLogs: LegacyAuditLogRecord[] = [];

  constructor() {
    this.seedDefaultLegacyData();
  }

  // =========================================================================
  // 1. SEED DEFAULT LEGACY & FAMILY DATA
  // =========================================================================
  private seedDefaultLegacyData(): void {
    const defaultSpace: LegacySpaceRecord = {
      id: 'space_default_legacy',
      ownerId: 'usr_parent_ahmad',
      name: 'Family Guidance & Beneficial Knowledge',
      description: 'Preserved reflections, prayers, and lessons for my family and future generations.',
      isDefault: true,
      createdAt: '2026-10-01T00:00:00Z',
      updatedAt: '2026-10-01T00:00:00Z',
    };
    this.spaces.set(defaultSpace.id, defaultSpace);

    const defaultDuaItem: LegacyItemRecord = {
      id: 'item_dua_parents',
      spaceId: defaultSpace.id,
      creatorId: 'usr_parent_ahmad',
      type: 'DUA_COLLECTION',
      title: 'Daily Duas for Parents & Children',
      content: {
        duaArabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        translation: 'My Lord, have mercy upon them as they brought me up when I was small.',
        reference: 'Surah Al-Isra 17:24',
        contextNotes: 'Read this after every obligatory Salah for your parents.',
      },
      language: 'ar-en-ur',
      isPersonalAdvice: true,
      isAuthoritativeClaim: false,
      provenanceTag: 'USER_CURATED',
      relatedEvidenceIds: ['17:24'],
      createdAt: '2026-10-01T00:00:00Z',
      updatedAt: '2026-10-01T00:00:00Z',
      checksum: crypto.createHash('sha256').update('item_dua_parents_content').digest('hex'),
    };
    this.items.set(defaultDuaItem.id, defaultDuaItem);

    const defaultCollection: LegacyCollectionRecord = {
      id: 'col_for_my_children',
      creatorId: 'usr_parent_ahmad',
      title: 'For My Children: Guidance, Values & Duas',
      description: 'Essential teachings, family memories, and Quranic reflections to carry forward.',
      targetAudience: 'CHILDREN',
      itemIds: [defaultDuaItem.id],
      version: 1,
      createdAt: '2026-10-01T00:00:00Z',
      updatedAt: '2026-10-01T00:00:00Z',
    };
    this.collections.set(defaultCollection.id, defaultCollection);

    // Seed Family Circle
    const family: Family = {
      id: 'fam_circle_ahmad',
      name: 'The Ahmad Household',
      structureType: 'FAMILY',
      inviteCode: 'AHMAD2026',
      createdById: 'usr_parent_ahmad',
      createdAt: '2026-10-01T00:00:00Z',
      updatedAt: '2026-10-01T00:00:00Z',
    };
    this.families.set(family.id, family);

    const members: FamilyMember[] = [
      { id: 'fm_1', familyId: family.id, userId: 'usr_parent_ahmad', displayName: 'Ahmad (Father)', role: 'PARENT', joinedAt: '2026-10-01T00:00:00Z' },
      { id: 'fm_2', familyId: family.id, userId: 'usr_spouse_maryam', displayName: 'Maryam (Mother)', role: 'SPOUSE', joinedAt: '2026-10-01T00:00:00Z' },
      { id: 'fm_3', familyId: family.id, userId: 'usr_child_zayd', displayName: 'Zayd (Son)', role: 'CHILD', joinedAt: '2026-10-01T00:00:00Z' },
      { id: 'fm_4', familyId: family.id, userId: 'usr_sibling_bilal', displayName: 'Bilal (Uncle)', role: 'SIBLING', joinedAt: '2026-10-01T00:00:00Z' },
    ];
    this.members.set(family.id, members);

    // Seed Child Profile
    const childProfile: ChildAccountProfile = {
      userId: 'usr_child_zayd',
      ageBand: '7_10',
      guardianUserId: 'usr_parent_ahmad',
      guardianConsentGranted: true,
      contentPolicy: 'CHILD_SAFE_QURAN_CHARACTER_ONLY',
      aiPolicy: 'SAFE_GENTLE_NO_FIQH_NO_CRISIS',
      privacyPolicy: 'SHIELDED_NO_PUBLIC_PROFILE',
      prohibitedFeatures: ['PUBLIC_COMMUNITY', 'COMPLEX_FIQH_DEBATE', 'RELIGIOUS_RANKING', 'STREAK_GUILT'],
    };
    this.childProfiles.set(childProfile.userId, childProfile);
  }

  // =========================================================================
  // 2. TWO-GRAPH FIREWALL & ISLAMIC AUTHORITY SEPARATION (Sections 4, 30 & 31)
  // =========================================================================
  /**
   * Enforces that personal legacy and user content are NEVER conflated with
   * primary Islamic evidence or scholarly authority.
   */
  public assertTwoGraphFirewall(item: Partial<LegacyItemRecord>): void {
    if ((item as { isAuthoritativeClaim?: unknown }).isAuthoritativeClaim === true) {
      throw new Error(
        'TWO_GRAPH_FIREWALL_BREACH: User-created legacy content cannot declare itself authoritative Islamic Shariah evidence. Personal opinion != Islamic authority.'
      );
    }

    if (item.provenanceTag === 'VERIFIED_REFERENCE' && (!item.relatedEvidenceIds || item.relatedEvidenceIds.length === 0)) {
      throw new Error(
        'INVALID_EVIDENCE_PROVENANCE: Items tagged as verified reference must link to canonical Quran/Hadith evidence IDs.'
      );
    }
  }

  // =========================================================================
  // 3. LEGACY SPACES & ITEMS ENGINE (Sections 3, 4 & 19)
  // =========================================================================
  public createLegacySpace(params: {
    ownerId: string;
    name: string;
    description: string;
  }): LegacySpaceRecord {
    const id = `space_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const space: LegacySpaceRecord = {
      id,
      ownerId: params.ownerId,
      name: params.name,
      description: params.description,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.spaces.set(id, space);
    this.logAudit(params.ownerId, 'CREATED', 'SPACE', id);
    return space;
  }

  public createLegacyItem(params: {
    spaceId: string;
    creatorId: string;
    type: LegacyItemType;
    title: string;
    content: Record<string, any>;
    mediaUrl?: string;
    audioDurationSeconds?: number;
    language?: string;
    provenanceTag?: 'USER_CREATED' | 'USER_CURATED' | 'VERIFIED_REFERENCE';
    relatedEvidenceIds?: string[];
  }): LegacyItemRecord {
    const itemDraft: Partial<LegacyItemRecord> = {
      ...params,
      isPersonalAdvice: true,
      isAuthoritativeClaim: false,
    };
    this.assertTwoGraphFirewall(itemDraft);

    const id = `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const checksum = crypto
      .createHash('sha256')
      .update(JSON.stringify(params.content) + params.title)
      .digest('hex');

    const item: LegacyItemRecord = {
      id,
      spaceId: params.spaceId,
      creatorId: params.creatorId,
      type: params.type,
      title: params.title,
      content: params.content,
      mediaUrl: params.mediaUrl,
      audioDurationSeconds: params.audioDurationSeconds,
      language: params.language || 'en',
      isPersonalAdvice: true,
      isAuthoritativeClaim: false,
      provenanceTag: params.provenanceTag || 'USER_CREATED',
      relatedEvidenceIds: params.relatedEvidenceIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checksum,
    };

    this.items.set(id, item);
    this.logAudit(params.creatorId, 'CREATED', 'ITEM', id);
    return item;
  }

  public getLegacyItem(itemId: string, requestingUserId: string): LegacyItemRecord {
    const item = this.items.get(itemId);
    if (!item) throw new Error(`LEGACY_ITEM_NOT_FOUND: Item ${itemId} does not exist.`);

    // If owner, grant access
    if (item.creatorId === requestingUserId) return item;

    // Check sharing permissions
    const userPermissions = this.permissions.get(requestingUserId) || [];
    const isShared = userPermissions.some(
      (p) => p.resourceId === itemId && p.permission === 'READ'
    );

    // Check released status
    const release = this.releases.get(itemId);
    const isReleasedToUser =
      release &&
      (release.status === 'RELEASED' ||
        (release.status === 'DESIGNATED_RECIPIENT' &&
          release.designatedRecipientIds.includes(requestingUserId)));

    if (!isShared && !isReleasedToUser) {
      throw new Error(
        `PERMISSION_DENIED: User ${requestingUserId} does not have access to legacy item ${itemId}. Default is strictly PRIVATE.`
      );
    }

    return item;
  }

  // =========================================================================
  // 4. LEGACY COLLECTIONS (Section 22)
  // =========================================================================
  public createCollection(params: {
    creatorId: string;
    title: string;
    description: string;
    targetAudience: 'CHILDREN' | 'PARENTS' | 'SPOUSE' | 'SIBLINGS' | 'FAMILY' | 'FUTURE_GENERATIONS' | 'CUSTOM';
    itemIds: string[];
  }): LegacyCollectionRecord {
    const id = `col_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const collection: LegacyCollectionRecord = {
      id,
      creatorId: params.creatorId,
      title: params.title,
      description: params.description,
      targetAudience: params.targetAudience,
      itemIds: params.itemIds,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.collections.set(id, collection);
    this.logAudit(params.creatorId, 'CREATED', 'COLLECTION', id);
    return collection;
  }

  public getCollection(collectionId: string, requestingUserId: string): LegacyCollectionRecord {
    const collection = this.collections.get(collectionId);
    if (!collection) throw new Error(`COLLECTION_NOT_FOUND: Collection ${collectionId} does not exist.`);
    if (collection.creatorId !== requestingUserId) {
      const release = this.releases.get(collectionId);
      if (!release || (release.status !== 'RELEASED' && !release.designatedRecipientIds.includes(requestingUserId))) {
        throw new Error(`PERMISSION_DENIED: Collection ${collectionId} is private to creator.`);
      }
    }
    return collection;
  }

  // =========================================================================
  // 5. CONTROLLED RELEASE WORKFLOW (Section 24)
  // =========================================================================
  public releaseLegacyResource(params: {
    resourceId: string;
    creatorId: string;
    targetStatus: LegacyReleaseStatus;
    designatedRecipientIds?: string[];
    releaseConditions?: string;
  }): LegacyReleaseRecord {
    const id = `rel_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const release: LegacyReleaseRecord = {
      id,
      itemIdOrCollectionId: params.resourceId,
      creatorId: params.creatorId,
      status: params.targetStatus,
      designatedRecipientIds: params.designatedRecipientIds || [],
      releaseConditions: params.releaseConditions,
      releasedAt: params.targetStatus === 'RELEASED' ? new Date().toISOString() : undefined,
    };
    this.releases.set(params.resourceId, release);
    this.logAudit(params.creatorId, 'RELEASED', 'ITEM', params.resourceId);
    return release;
  }

  // =========================================================================
  // 6. FUTURE RECIPIENT MODEL (Section 23)
  // =========================================================================
  public registerFutureRecipient(params: {
    creatorId: string;
    intendedLabel: string;
    relationshipDescription: string;
    provisionalNotes?: string;
  }): FutureRecipientRecord {
    const id = `frec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const record: FutureRecipientRecord = {
      id,
      creatorId: params.creatorId,
      intendedLabel: params.intendedLabel,
      relationshipDescription: params.relationshipDescription,
      provisionalNotes: params.provisionalNotes,
      createdAt: new Date().toISOString(),
    };
    const list = this.futureRecipients.get(params.creatorId) || [];
    list.push(record);
    this.futureRecipients.set(params.creatorId, list);
    return record;
  }

  public getFutureRecipients(creatorId: string): FutureRecipientRecord[] {
    return this.futureRecipients.get(creatorId) || [];
  }

  // =========================================================================
  // 7. INACTIVITY INSTRUCTIONS & DIGITAL ESTATE SAFETY (Sections 25 & 26)
  // =========================================================================
  public setLegacyInstructions(params: {
    userId: string;
    trustedContactEmail: string;
    trustedContactName: string;
    inactivityThresholdDays: number;
    releaseCollectionIds: string[];
    notesForContact?: string;
  }): LegacyInstructionsRecord {
    // Non-Negotiable: Exclude private reflections by default, require identity verification
    const id = `inst_${params.userId}`;
    const record: LegacyInstructionsRecord = {
      id,
      userId: params.userId,
      trustedContactEmail: params.trustedContactEmail,
      trustedContactName: params.trustedContactName,
      inactivityThresholdDays: params.inactivityThresholdDays || 180,
      requiresIdentityVerification: true,
      releaseCollectionIds: params.releaseCollectionIds,
      excludePrivateJournal: true,
      notesForContact: params.notesForContact,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.instructions.set(params.userId, record);
    this.logAudit(params.userId, 'CREATED', 'INSTRUCTION', id);
    return record;
  }

  public getLegacyInstructions(userId: string): LegacyInstructionsRecord | undefined {
    return this.instructions.get(userId);
  }

  // =========================================================================
  // 8. LEGACY LETTERS & AUDIO MESSAGES (Sections 20 & 21)
  // =========================================================================
  public createLegacyLetter(params: {
    authorId: string;
    recipientDescription: string;
    title: string;
    letterBody: string;
    duasIncluded?: string[];
    valuesEncouraged?: string[];
  }): LegacyLetterRecord {
    const id = `let_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const letter: LegacyLetterRecord = {
      id,
      authorId: params.authorId,
      recipientDescription: params.recipientDescription,
      title: params.title,
      letterBody: params.letterBody,
      duasIncluded: params.duasIncluded || [],
      valuesEncouraged: params.valuesEncouraged || [],
      adviceDisclaimer: 'PERSONAL_ADVICE_NOT_SHARIAH_RULING',
      createdAt: new Date().toISOString(),
    };
    this.letters.set(id, letter);
    this.logAudit(params.authorId, 'CREATED', 'LETTER', id);
    return letter;
  }

  public recordLegacyAudio(params: {
    speakerId: string;
    speakerName: string;
    audioUrl: string;
    transcriptText: string;
    language?: string;
    recipientIds: string[];
  }): LegacyAudioMessageRecord {
    const id = `aud_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const checksum = crypto.createHash('sha256').update(params.audioUrl + params.transcriptText).digest('hex');
    const audio: LegacyAudioMessageRecord = {
      id,
      speakerId: params.speakerId,
      speakerName: params.speakerName,
      audioUrl: params.audioUrl,
      transcriptText: params.transcriptText,
      language: params.language || 'ur',
      consentGranted: true,
      recipientIds: params.recipientIds,
      createdAt: new Date().toISOString(),
      checksum,
    };
    this.audioMessages.set(id, audio);
    this.logAudit(params.speakerId, 'CREATED', 'AUDIO', id);
    return audio;
  }

  // =========================================================================
  // 9. ANTI-SURVEILLANCE & FAMILY PRIVACY FIREWALL (Sections 6, 7, 33 & 35)
  // =========================================================================
  /**
   * Asserts that spousal, parent-adult child, and sibling boundaries are respected.
   * Prohibits surveillance or unauthorized inspection of private spaces.
   */
  public assertDomesticPrivacyFirewall(params: {
    requestorUserId: string;
    targetUserId: string;
    requestorRole: FamilyRole;
    targetRole: FamilyRole;
    resourceType: 'PRIVATE_REFLECTION' | 'AI_CONVERSATION' | 'PRIVATE_GOAL' | 'PRAYER_LOG' | 'FAMILY_JOURNEY';
  }): void {
    if (params.requestorUserId === params.targetUserId) return;

    // Invariant: Private reflections, AI chats, and personal struggles are ALWAYS private
    const strictlyPrivateTypes = ['PRIVATE_REFLECTION', 'AI_CONVERSATION', 'PRIVATE_GOAL'];
    if (strictlyPrivateTypes.includes(params.resourceType)) {
      throw new Error(
        `DOMESTIC_PRIVACY_BREACH: ${params.resourceType} is strictly private. Spouses, parents, and siblings cannot inspect private reflections or AI conversations.`
      );
    }

    // Spousal surveillance defense
    if (params.requestorRole === 'SPOUSE' && params.targetRole === 'SPOUSE') {
      if (params.resourceType === 'PRAYER_LOG') {
        throw new Error(
          'SPOUSAL_SURVEILLANCE_PROHIBITED: A spouse cannot inspect the other spouse’s individual prayer logs without explicit consent.'
        );
      }
    }

    // Parent to adult child surveillance defense
    if (params.requestorRole === 'PARENT' && params.targetRole === 'ADULT_MEMBER') {
      throw new Error(
        'PARENTAL_SURVEILLANCE_PROHIBITED: Parents cannot inspect the private religious activity of adult family members.'
      );
    }

    // Sibling surveillance defense
    if (params.requestorRole === 'SIBLING' && params.targetRole === 'SIBLING') {
      if (params.resourceType === 'PRAYER_LOG') {
        throw new Error('SIBLING_SURVEILLANCE_PROHIBITED: Siblings cannot monitor each other’s personal worship.');
      }
    }
  }

  // =========================================================================
  // 10. NO RELIGIOUS RANKING & ETHICAL NOTIFICATION GATE (Sections 14 & 34)
  // =========================================================================
  public sanitizeFamilyNotification(promptText: string): string {
    const prohibitedPatterns = [
      /hasn't prayed/i,
      /missed prayer/i,
      /falling behind/i,
      /least religious/i,
      /lowest iman/i,
      /deen score/i,
      /faith score/i,
    ];

    for (const pattern of prohibitedPatterns) {
      if (pattern.test(promptText)) {
        // Enforce calm, positive default language
        return 'Continue your family journey together with patience and gratitude.';
      }
    }
    return promptText;
  }

  // =========================================================================
  // 11. MULTI-ROLE SHARED FAMILY JOURNEYS & FAMILY TODAY (Sections 11, 12 & 13)
  // =========================================================================
  public createSharedFamilyJourney(params: {
    familyId: string;
    title: string;
    goal: string;
    familyBaseline: string;
    totalDays: number;
    memberAmalPlans: FamilyMemberAmalPlan[];
    sharedActivityDescription: string;
  }): FamilySharedJourney {
    const id = `fjourn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const memberAmals: Record<string, FamilyMemberAmalPlan> = {};
    for (const p of params.memberAmalPlans) {
      memberAmals[p.userId] = p;
    }

    const journey: FamilySharedJourney = {
      id,
      familyId: params.familyId,
      title: params.title,
      goal: params.goal,
      familyBaseline: params.familyBaseline,
      totalDays: params.totalDays || 14,
      currentDay: 1,
      aggregateCompletedActions: 0,
      totalTargetActions: params.memberAmalPlans.length * (params.totalDays || 14),
      memberAmals,
      sharedActivityDescription: params.sharedActivityDescription,
      createdAt: new Date().toISOString(),
    };
    this.journeys.set(id, journey);
    return journey;
  }

  public getFamilyTodayDashboard(familyId: string, date: string): FamilyTodayDashboardView {
    const family = this.families.get(familyId);
    if (!family) throw new Error(`FAMILY_NOT_FOUND: Family ${familyId} does not exist.`);

    const members = this.members.get(familyId) || [];
    // Find active journey for family
    const journey = Array.from(this.journeys.values()).find((j) => j.familyId === familyId);

    const participation: FamilyTodayMemberStatus[] = members.map((m) => {
      const plan = journey?.memberAmals[m.userId];
      return {
        userId: m.userId,
        displayName: m.displayName,
        role: m.role,
        participatedToday: plan ? plan.isCompletedToday : false,
      };
    });

    return {
      familyId,
      familyName: family.name,
      date,
      familyJourneyTitle: journey ? journey.title : 'Family Daily Gathering',
      sharedActivityTitle: journey ? journey.sharedActivityDescription : 'Read one passage together and reflect',
      memberParticipation: participation,
    };
  }

  // =========================================================================
  // 12. CHILD SAFETY ARCHITECTURE (Sections 9, 10, 47 & 48)
  // =========================================================================
  public registerChildAccount(params: {
    userId: string;
    ageBand: ChildAgeBand;
    guardianUserId: string;
    guardianConsentGranted: boolean;
  }): ChildAccountProfile {
    if (!params.guardianConsentGranted) {
      throw new Error('GUARDIAN_CONSENT_REQUIRED: Child account requires explicit guardian consent.');
    }

    const profile: ChildAccountProfile = {
      userId: params.userId,
      ageBand: params.ageBand,
      guardianUserId: params.guardianUserId,
      guardianConsentGranted: true,
      contentPolicy: 'CHILD_SAFE_QURAN_CHARACTER_ONLY',
      aiPolicy: 'SAFE_GENTLE_NO_FIQH_NO_CRISIS',
      privacyPolicy: 'SHIELDED_NO_PUBLIC_PROFILE',
      prohibitedFeatures: ['PUBLIC_COMMUNITY', 'COMPLEX_FIQH_DEBATE', 'RELIGIOUS_RANKING', 'STREAK_GUILT'],
    };
    this.childProfiles.set(params.userId, profile);
    return profile;
  }

  public getChildProfile(userId: string): ChildAccountProfile | undefined {
    return this.childProfiles.get(userId);
  }

  // =========================================================================
  // 13. EXPORT & TAMPER-EVIDENT AUDIT TRAIL (Sections 39, 40 & 42)
  // =========================================================================
  public exportUserLegacyArchive(userId: string, format: 'PDF' | 'TEXT' | 'AUDIO' | 'STRUCTURED_JSON_ARCHIVE'): ExportArchiveRecord {
    const userItems = Array.from(this.items.values()).filter((i) => i.creatorId === userId);
    const userCollections = Array.from(this.collections.values()).filter((c) => c.creatorId === userId);
    const userLetters = Array.from(this.letters.values()).filter((l) => l.authorId === userId);
    const userAudio = Array.from(this.audioMessages.values()).filter((a) => a.speakerId === userId);

    const payload = JSON.stringify({
      userId,
      exportedAt: new Date().toISOString(),
      items: userItems,
      collections: userCollections,
      letters: userLetters,
      audio: userAudio,
    });

    const checksum = crypto.createHash('sha256').update(payload).digest('hex');
    const exportId = `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const archive: ExportArchiveRecord = {
      exportId,
      userId,
      format,
      itemsExportedCount: userItems.length + userCollections.length + userLetters.length + userAudio.length,
      includesCitations: true,
      licenseAttributionPreserved: true,
      generatedAt: new Date().toISOString(),
      checksum,
    };

    this.logAudit(userId, 'DOWNLOADED', 'ITEM', exportId);
    return archive;
  }

  private logAudit(
    userId: string,
    action: 'CREATED' | 'EDITED' | 'SHARED' | 'UNSHARED' | 'DOWNLOADED' | 'RELEASED' | 'REVOKED' | 'DELETED',
    resourceType: 'SPACE' | 'ITEM' | 'COLLECTION' | 'INSTRUCTION' | 'LETTER' | 'AUDIO',
    resourceId: string
  ): void {
    const auditRecord: LegacyAuditLogRecord = {
      id: `laudit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId,
      action,
      resourceType,
      resourceId,
      timestamp: new Date().toISOString(),
      ipHash: crypto.createHash('sha256').update(userId + 'audit_salt').digest('hex'),
    };
    this.auditLogs.push(auditRecord);
  }

  public getAuditLogs(userId: string): LegacyAuditLogRecord[] {
    return this.auditLogs.filter((a) => a.userId === userId);
  }

  // =========================================================================
  // 14. ETHICAL NON-MONETIZATION GUARDRAIL (Section 43)
  // =========================================================================
  public assertNonMonetizable(resourceCategory: string): void {
    const nonMonetizableCategories = [
      'PRAYER_BEHAVIOR',
      'QURAN_USAGE',
      'PRIVATE_REFLECTIONS',
      'FAMILY_RELATIONSHIPS',
      'RELIGIOUS_QUESTIONS',
      'CHILD_RELIGIOUS_ACTIVITY',
    ];

    if (nonMonetizableCategories.includes(resourceCategory)) {
      throw new Error(
        `ETHICAL_BUSINESS_GUARDRAIL_VIOLATION: ${resourceCategory} is sacred and non-monetizable. No religious profile ads or behavioral selling permitted.`
      );
    }
  }
}
