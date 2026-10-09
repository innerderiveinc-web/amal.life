/**
 * AMAL OS — Universal Knowledge & Scholarly Neutrality Domain Types
 * Defines the four Sunni legal schools (Hanafi, Maliki, Shafi'i, Hanbali),
 * epistemic classification boundaries, comparative Fiqh schemas, and user scholarly preferences.
 */

import { Madhhab } from './user.js';

export type SunniSchool = 'HANAFI' | 'MALIKI' | 'SHAFI_I' | 'HANBALI';

export type EpistemicCategory =
  | 'REVELATION'
  | 'PROPHETIC_REPORT'
  | 'SCHOLARLY_INTERPRETATION'
  | 'FIQH_POSITION'
  | 'SCHOLARLY_OPINION'
  | 'SPIRITUAL_ETHICAL_TRADITION'
  | 'HISTORICAL_INFORMATION'
  | 'ACADEMIC_RESEARCH'
  | 'BEHAVIORAL_SCIENCE'
  | 'GENERAL_PRACTICAL_GUIDANCE'
  | 'USER_PREFERENCE'
  | 'AI_INFERENCE';

export interface MadhhabFoundation {
  madhhab: Madhhab;
  eponym: string;
  foundationalWorks: string[];
  majorCommentaries: string[];
  canonicalLegalManuals: string[];
  usulPrinciples: string[];
}

export type IslamicRulingCategory =
  | 'FARD'
  | 'WAJIB'
  | 'SUNNAH'
  | 'MUSTAHABB'
  | 'MUBAH'
  | 'MAKRUH'
  | 'HARAM';

export interface SchoolPosition {
  madhhab: Madhhab;
  positionSummary: string;
  ruling: IslamicRulingCategory;
  primaryEvidenceRefs: string[];
  conditionsAndExceptions: string[];
  canonicalReferences: string[];
}

export interface ComparativeFiqhCase {
  caseId: string;
  topic: string;
  question: string;
  areasOfAgreement: string[];
  areasOfDisagreement: string[];
  schoolPositions: Record<Madhhab, SchoolPosition>;
  epistemicClassification: EpistemicCategory;
  neutralityAffirmation: string; // "AMAL presents all four Sunni schools with scholarly parity."
}

export interface PersonalScholarlyPreferences {
  userId: string;
  madhhabPreference: Madhhab | 'GENERAL_SUNNI';
  scholarlyTradition?: string;
  preferredScholars: string[];
  preferredTafsir: string[];
  preferredTranslation: string;
  preferredLanguage: string;
  preferredSpiritualLiterature: string[];
  levelOfDetail: 'BEGINNER_SIMPLE' | 'PRACTICING' | 'ADVANCED_STUDENT';
}

export interface RenderedFiqhResponse {
  topic: string;
  epistemicOrigin: EpistemicCategory;
  audienceLevel: 'BEGINNER_SIMPLE' | 'PRACTICING' | 'ADVANCED_STUDENT';
  practicalGuidance: string;
  primaryPosition?: SchoolPosition;
  comparativeBreakdown?: ComparativeFiqhCase;
  evidencePreserved: true; // Invariant: user preferences never modified evidence
}
