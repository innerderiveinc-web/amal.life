/**
 * AMAL OS — LEGACY & FAMILY CONTINUITY OS
 * Domain Types: Legacy Spaces, Items, Collections, Releases, Instructions, Letters & Audit
 */

export type LegacyItemType =
  | 'QURAN_LEARNING'
  | 'DUA_COLLECTION'
  | 'DHIKR_COLLECTION'
  | 'ISLAMIC_BOOK'
  | 'SCHOLARLY_RESOURCE'
  | 'FAMILY_LESSON'
  | 'PERSONAL_REFLECTION'
  | 'LIFE_LESSON'
  | 'CHARACTER_LESSON'
  | 'FAMILY_TRADITION'
  | 'JOURNEY'
  | 'GOAL'
  | 'AMAL_COLLECTION'
  | 'AUDIO_MESSAGE'
  | 'VIDEO_MESSAGE'
  | 'LETTER'
  | 'RESOURCE'
  | 'RECOMMENDATION';

export type LegacyReleaseStatus =
  | 'DRAFT'
  | 'PRIVATE'
  | 'FAMILY_SHARED'
  | 'DESIGNATED_RECIPIENT'
  | 'RELEASED';

export type LegacyAudienceTarget =
  | 'CHILDREN'
  | 'PARENTS'
  | 'SPOUSE'
  | 'SIBLINGS'
  | 'FAMILY'
  | 'FUTURE_GENERATIONS'
  | 'CUSTOM';

export type LegacyProvenanceTag =
  | 'USER_CREATED'
  | 'USER_CURATED'
  | 'VERIFIED_REFERENCE';

export interface LegacySpaceRecord {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyItemRecord {
  id: string;
  spaceId: string;
  creatorId: string;
  type: LegacyItemType;
  title: string;
  content: Record<string, any>;
  mediaUrl?: string;
  audioDurationSeconds?: number;
  language: string;
  isPersonalAdvice: boolean;
  isAuthoritativeClaim: false; // Invariant: Personal legacy is never Islamic authority
  provenanceTag: LegacyProvenanceTag;
  relatedEvidenceIds?: string[];
  createdAt: string;
  updatedAt: string;
  checksum: string;
}

export interface LegacyCollectionRecord {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  targetAudience: LegacyAudienceTarget;
  itemIds: string[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyReleaseRecord {
  id: string;
  itemIdOrCollectionId: string;
  creatorId: string;
  status: LegacyReleaseStatus;
  releaseConditions?: string;
  designatedRecipientIds: string[];
  releasedAt?: string;
  releaseAuditId?: string;
}

export interface FutureRecipientRecord {
  id: string;
  creatorId: string;
  intendedLabel: string; // e.g. "My children and their children"
  relationshipDescription: string;
  provisionalNotes?: string;
  createdAt: string;
}

export interface LegacyInstructionsRecord {
  id: string;
  userId: string;
  trustedContactEmail: string;
  trustedContactName: string;
  inactivityThresholdDays: number;
  requiresIdentityVerification: true;
  releaseCollectionIds: string[];
  excludePrivateJournal: true; // Invariant: Private reflections are excluded by default
  notesForContact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyAudioMessageRecord {
  id: string;
  speakerId: string;
  speakerName: string;
  audioUrl: string;
  transcriptText: string;
  language: string;
  consentGranted: boolean;
  recipientIds: string[];
  createdAt: string;
  checksum: string;
}

export interface LegacyLetterRecord {
  id: string;
  authorId: string;
  recipientDescription: string;
  title: string;
  letterBody: string;
  duasIncluded: string[];
  valuesEncouraged: string[];
  adviceDisclaimer: 'PERSONAL_ADVICE_NOT_SHARIAH_RULING';
  createdAt: string;
}

export type LegacyAuditAction =
  | 'CREATED'
  | 'EDITED'
  | 'SHARED'
  | 'UNSHARED'
  | 'DOWNLOADED'
  | 'RELEASED'
  | 'REVOKED'
  | 'DELETED';

export interface LegacyAuditLogRecord {
  id: string;
  userId: string;
  action: LegacyAuditAction;
  resourceType: 'SPACE' | 'ITEM' | 'COLLECTION' | 'INSTRUCTION' | 'LETTER' | 'AUDIO';
  resourceId: string;
  timestamp: string;
  ipHash: string;
}

export interface ExportArchiveRecord {
  exportId: string;
  userId: string;
  format: 'PDF' | 'TEXT' | 'AUDIO' | 'STRUCTURED_JSON_ARCHIVE';
  itemsExportedCount: number;
  includesCitations: boolean;
  licenseAttributionPreserved: boolean;
  generatedAt: string;
  checksum: string;
}
