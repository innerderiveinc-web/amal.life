/**
 * AMAL OS — Multilingual Corpus & Decoupled Preference Types
 * 
 * Mandates:
 * 1. Multilingual Architecture: India Language Pack + Global Language Pack
 * 2. Strict Epistemic Separation: Translation ≠ Tafsir
 * 3. Translation Authenticity Invariant: AI generation strictly blocked; "Verified translation unavailable" for gaps
 * 4. Decoupled User Preference: Language Preference separate from Scholarly/Madhhab Preference
 * 5. Full Four-Madhhab Parity with Ahl-e-Sunnat / Razvi Preferred Corpus Support
 */

import { SunniSchool } from './madhhab-neutrality.js';

export type IndiaLanguage =
  | 'ur' // Urdu
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'gu' // Gujarati
  | 'mr' // Marathi
  | 'ml' // Malayalam
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'kn' // Kannada
  | 'pa'; // Punjabi

export type GlobalLanguage =
  | 'ar' // Arabic (Original Sacred Source)
  | 'en' // English
  | 'fa' // Persian
  | 'tr' // Turkish
  | 'id' // Indonesian
  | 'ms' // Malay
  | 'fr' // French
  | 'es' // Spanish
  | 'de'; // German

export type SupportedLanguage = IndiaLanguage | GlobalLanguage | string;

export interface VerifiedTranslationRecord {
  translationId: string;
  language: SupportedLanguage;
  languagePack: 'INDIA_PACK' | 'GLOBAL_PACK';
  surahNumber: number;
  ayahNumber: number;
  textTranslation: string;
  translatorName: string;
  workTitle: string;
  scholarlyTradition?: string; // e.g. "Ahl-e-Sunnat / Razvi", "Classical Sunni", etc.
  edition: string;
  publisher: string;
  provenance: string;
  licenseRecordId: string;
  isVerified: boolean;
  isAiGenerated: false; // Invariant: AI translation is NEVER authoritative
}

export interface VerifiedTafsirRecord {
  tafsirId: string;
  language: SupportedLanguage;
  languagePack: 'INDIA_PACK' | 'GLOBAL_PACK';
  surahNumber: number;
  ayahNumber: number;
  tafsirText: string;
  authorName: string;
  workTitle: string;
  scholarlyTradition: string; // e.g. "Ahl-e-Sunnat / Razvi", "Classical Ash'ari / Shafi'i", "Maturidi / Hanafi"
  madhhab?: SunniSchool;
  edition: string;
  publisher: string;
  provenance: string;
  licenseRecordId: string;
  isVerified: boolean;
  isAiGenerated: false;
}

export interface QuranAyahMultilingualView {
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  translations: VerifiedTranslationRecord[];
  tafasir: VerifiedTafsirRecord[];
  availableLanguages: SupportedLanguage[];
}

export interface TranslationQueryResponse {
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  language: SupportedLanguage;
  isAvailable: boolean;
  translation?: VerifiedTranslationRecord;
  message?: string;
}

export interface TafsirQueryResponse {
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  language: SupportedLanguage;
  isAvailable: boolean;
  tafsir?: VerifiedTafsirRecord;
  message?: string;
}

export interface DecoupledUserPreferences {
  userId: string;
  interfaceLanguage: SupportedLanguage;
  contentLanguage: SupportedLanguage;
  preferredQuranTranslationId?: string;
  preferredQuranTranslator?: string; // e.g. "Imam Ahmad Raza Khan (Kanzul Iman)", "Saheeh International"
  preferredTafsirWork?: string; // e.g. "Khaza'in al-Irfan", "Tafsir Ibn Kathir", "Tafsir al-Jalalayn"
  madhhabPreference: SunniSchool | 'GENERAL_SUNNI';
  scholarlyTraditionPreference: 'AHL_E_SUNNAT_RAZVI' | 'CLASSICAL_TRADITIONAL' | 'GENERAL_SUNNI';
  spiritualLiteraturePreference: 'TASAWWUF' | 'GENERAL_ADAB';
  showComparativeFiqh: boolean;
  showDisagreements: boolean;
}

export interface MultilingualCorpusSummary {
  totalLanguagesSupported: number;
  indiaLanguages: SupportedLanguage[];
  globalLanguages: SupportedLanguage[];
  totalVerifiedTranslations: number;
  totalVerifiedTafasir: number;
  unverifiedTranslationsBlocked: number;
  razviPreferenceCorpusPresent: boolean;
}
