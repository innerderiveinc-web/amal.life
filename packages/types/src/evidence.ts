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
  | 'PART_OF'
  | 'EXPLAINS'
  | 'REFERENCES'
  | 'SUPPORTS'
  | 'CONTRADICTS'
  | 'QUALIFIES'
  | 'RELATED_TO'
  | 'NARRATED_BY'
  | 'AUTHORED_BY'
  | 'BELONGS_TO'
  | 'DIFFERS_FROM'
  | 'APPLIES_TO'
  | 'LEADS_TO'
  | 'RECOMMENDS';

export type EntityType =
  | 'QURAN_AYAH'
  | 'HADITH_PASSAGE'
  | 'TAFSIR_ENTRY'
  | 'FIQH_RULING'
  | 'TOPIC'
  | 'CONCEPT'
  | 'LIFE_SITUATION'
  | 'AMAL_ACTION'
  | 'JOURNEY';

export interface EvidenceEdge {
  id: string;
  fromEntityType: EntityType;
  fromEntityId: string;
  edgeType: EvidenceEdgeType;
  toEntityType: EntityType;
  toEntityId: string;
  confidence: number;
  scholarlyNote?: string | null;
  isVerified: boolean;
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
