export type AuthorityLevel =
  | 'TIER_1_QURAN'             // Primary: Quranic text
  | 'TIER_2_AUTHENTIC_HADITH'  // Primary: Authentic/accepted Hadith sources with verified grading
  | 'TIER_3_CLASSICAL_TAFSIR'  // Secondary: Established classical Tafsir & scholarly consensus
  | 'TIER_4_CONTEMPORARY'      // Secondary: Recognized contemporary scholarship
  | 'TIER_5_EDITORIAL'         // Tertiary: Vetted educational editorial content
  | 'TIER_6_AI_SYNTHESIS';     // Generated synthesis (never primary evidence)

export type SourceType =
  | 'QURAN'
  | 'HADITH'
  | 'TAFSIR'
  | 'FIQH'
  | 'SEERAH'
  | 'SCHOLARLY_WORK'
  | 'EDITORIAL';

export type VerificationStatus =
  | 'INGESTED'
  | 'PARSED'
  | 'NORMALIZED'
  | 'SOURCE_VERIFIED'
  | 'EDITORIAL_REVIEW'
  | 'SCHOLAR_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export type HadithGrading = 'SAHIH' | 'HASAN' | 'DAIF' | 'MUTAWATIR' | 'NOT_APPLICABLE';

export interface IslamicSource {
  id: string;
  sourceType: SourceType;
  title: string;
  author: string;
  collection?: string | null;
  volume?: number | null;
  bookNumber?: number | null;
  chapterNumber?: number | null;
  hadithNumber?: number | null;
  language: string;
  publisher?: string | null;
  license: string;
  authorityLevel: AuthorityLevel;
  verificationStatus: VerificationStatus;
  version: string;
  provenance: {
    originUrl?: string;
    ingestedAt: string;
    verifiedBy?: string;
    reviewedByScholarId?: string;
    lastAuditedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SourcePassage {
  id: string;
  sourceId: string;
  reference: string; // e.g. "2:286" or "Sahih al-Bukhari 52"
  arabicText?: string | null;
  translatedText: string;
  language: string;
  grading?: HadithGrading;
  narratorChain?: string[] | null;
  contextSummary?: string | null;
  keywords: string[];
  embedding?: number[] | null;
  createdAt: string;
  updatedAt: string;
}

export type EvidenceEdgeType =
  | 'CONTAINS'
  | 'PART_OF'
  | 'EXPLAINS'
  | 'REFERENCES'
  | 'SUPPORTS'
  | 'QUALIFIES'
  | 'LIMITS'
  | 'CONTRASTS_WITH'
  | 'DIFFERS_FROM'
  | 'NARRATED_BY'
  | 'AUTHORED_BY'
  | 'BELONGS_TO'
  | 'APPLIES_TO'
  | 'RELATED_TO'
  | 'INFORMS'
  | 'CAN_SUPPORT'
  | 'RECOMMENDS'
  | 'LEADS_TO';

export type EntityType =
  | 'QURAN'
  | 'QURAN_SURAH'
  | 'QURAN_AYAH'
  | 'HADITH_COLLECTION'
  | 'HADITH_BOOK'
  | 'HADITH_CHAPTER'
  | 'HADITH_PASSAGE'
  | 'NARRATOR'
  | 'TAFSIR_ENTRY'
  | 'SCHOLAR'
  | 'MADHHAB'
  | 'SCHOLARLY_ISSUE'
  | 'FIQH_RULING'
  | 'ISLAMIC_CONCEPT'
  | 'CONCEPT'
  | 'TOPIC'
  | 'LIFE_SITUATION'
  | 'GUIDANCE_PATTERN'
  | 'AMAL_ACTION'
  | 'JOURNEY';

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  parentSlug?: string;
  createdAt: string;
}


export interface IslamicConcept {
  id: string;
  termArabic: string;
  termLatin: string;
  definition: string;
  category: string;
  createdAt: string;
}


export type AmalPracticeType =
  | 'QURANIC_PRACTICE'
  | 'PROPHETIC_PRACTICE'
  | 'SCHOLARLY_RECOMMENDATION'
  | 'EDUCATIONAL_PRACTICE'
  | 'BEHAVIORAL_EXERCISE'
  | 'USER_CREATED_GOAL';

export type ClaimSupportLevel =
  | 'DIRECT'
  | 'STRONG_INFERENCE'
  | 'INTERPRETIVE'
  | 'CONTESTED'
  | 'UNSUPPORTED';

export interface VerifiedClaim {
  id: string;
  text: string;
  claimType: 'RELIGIOUS' | 'PRACTICAL' | 'BEHAVIORAL';
  sourceIds: string[];
  supportLevel: ClaimSupportLevel;
  verificationStatus: VerificationStatus;
  reviewedByScholarId?: string;
  approvedAt?: string;
}

export interface AyahTranslationRecord {
  id: string;
  ayahId: string;
  translator: string;
  language: string;
  publisher: string;
  license: string;
  version: number;
  text: string;
  status: VerificationStatus;
}

export interface HadithGradingAssessment {
  hadithId: string;
  assessedBy: string;
  grading: HadithGrading;
  methodology: string;
  sourceReference: string;
  status: VerificationStatus;
}

export interface TafsirPassageRecord {
  id: string;
  ayahId: string;
  surahNumber?: number;
  ayahNumber?: number;
  tafsirWork?: string;
  work?: string;
  author: string;
  passage?: string;
  passageText?: string;
  language?: string;
  methodology: string;
  volume?: number;
  page?: number;
  licenseStatus?: string;
  reviewStatus?: string;
  status?: VerificationStatus;
}

export interface ScholarlyOpinionRecord {
  id: string;
  issueId: string;
  scholarId: string;
  madhhab: string;
  position: string;
  conditions: string[];
  evidenceIds: string[];
  status: VerificationStatus;
}

export interface LifeSituationRecord {
  id: string;
  situationKey?: string;
  name: string;
  category?: string;
  description: string;
  crossDomainDomain?: 'ISLAMIC_EVIDENCE' | 'LIFE_BEHAVIOR';
  relevantConcepts?: string[];
  relevantEvidenceIds?: string[];
  potentialAmalIds?: string[];
  behavioralNotes?: string;
}

export interface EvidenceEdge {
  id: string;
  fromEntityType?: EntityType;
  fromEntityId?: string;
  edgeType?: EvidenceEdgeType;
  toEntityType?: EntityType;
  toEntityId?: string;
  sourceNodeId?: string;
  targetNodeId?: string;
  relationship?: string;
  metadata?: Record<string, any>;
  confidence?: number;
  scholarlyNote?: string | null;
  isVerified?: boolean;
  createdAt: string;
}


export interface EvidencePackItem {
  passageId: string;
  sourceTitle: string;
  reference: string;
  authorityLevel: AuthorityLevel;
  arabicText?: string | null;
  translation: string;
  grading?: HadithGrading;
  relevanceScore: number;
  scholarlyContext?: string;
}

export interface EvidencePack {
  query: string;
  normalizedIntent: string;
  items: EvidencePackItem[];
  scholarlyDifferences: string[];
  allowedClaims: string[];
  prohibitedClaims: string[];
  requiresScholarEscalation: boolean;
}

