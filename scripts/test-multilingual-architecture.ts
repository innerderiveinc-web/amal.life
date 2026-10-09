/**
 * AMAL OS — MULTILINGUAL ARCHITECTURE & DECOUPLED PREFERENCE VERIFICATION
 * 
 * Verifies all 6 foundational mandates:
 * 1. India Language Pack + Global Language Pack Coverage
 * 2. Strict Epistemic Separation: Translation ≠ Tafsir
 * 3. Translation Authenticity Invariant (AI Generation Blocked, "Verified translation unavailable" on gaps)
 * 4. User Preference Layer (Hanafi + Ahl-e-Sunnat / Razvi + Kanzul Iman + Khaza'in al-Irfan)
 * 5. Four-Madhhab Parity (Shafi'i, Maliki, Hanbali verified experiences with shared evidence graph)
 * 6. API Router Endpoints Verification via HTTP Contract
 */

import { MultilingualCorpusRegistry } from '../packages/evidence/src/multilingual/multilingual-corpus-registry.js';
import { ApiRouter } from '../services/api/src/router.js';
import type { DecoupledUserPreferences } from '@amal/types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runMultilingualTestSuite() {
  console.log('========================================================================');
  console.log('⚡ AMAL OS — MULTILINGUAL ARCHITECTURE & DECOUPLED PREFERENCES SUITE');
  console.log('========================================================================\n');

  // -------------------------------------------------------------------------
  // GATE 1: India Language Pack + Global Language Pack Coverage
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 1] Validating India Language Pack and Global Language Pack...');
  const summary = MultilingualCorpusRegistry.getCorpusSummary();

  const requiredIndia = ['ur', 'hi', 'bn', 'gu', 'mr', 'ml', 'ta', 'te', 'kn', 'pa'];
  for (const lang of requiredIndia) {
    assert(summary.indiaLanguages.includes(lang), `India language pack must include ${lang}`);
  }
  console.log(`  ✔ India Language Pack Verified (${summary.indiaLanguages.length} languages: ${summary.indiaLanguages.join(', ')})`);

  const requiredGlobal = ['ar', 'en', 'fa', 'tr', 'id', 'ms', 'fr', 'es', 'de'];
  for (const lang of requiredGlobal) {
    assert(summary.globalLanguages.includes(lang), `Global language pack must include ${lang}`);
  }
  console.log(`  ✔ Global Language Pack Verified (${summary.globalLanguages.length} languages: ${summary.globalLanguages.join(', ')})`);
  console.log(`  ✔ Total Verified Translations in Corpus: ${summary.totalVerifiedTranslations}`);
  console.log(`  ✔ Total Verified Tafasir in Corpus: ${summary.totalVerifiedTafasir}`);

  // -------------------------------------------------------------------------
  // GATE 2: Strict Epistemic Separation: Translation ≠ Tafsir
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 2] Validating Strict Epistemic Separation: Translation ≠ Tafsir...');
  const ayahView = MultilingualCorpusRegistry.getAyahMultilingualView(1, 1);
  assert(ayahView.textArabic === 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'Arabic text must be exact Uthmanic script');
  assert(ayahView.translations.length > 0, 'Ayah view must contain translations list');
  assert(ayahView.tafasir.length > 0, 'Ayah view must contain tafasir list');

  // Verify that translation records have translator attribution, NOT author commentary
  const urduTranslation = ayahView.translations.find((t) => t.language === 'ur');
  assert(urduTranslation !== undefined, 'Urdu translation must be present');
  assert(urduTranslation?.translatorName.includes('Ahmad Raza Khan'), 'Translator must be explicitly credited');
  assert(urduTranslation?.isAiGenerated === false, 'Translation must never be AI generated');

  // Verify that tafsir records have distinct classical commentary metadata
  const urduTafsir = ayahView.tafasir.find((tf) => tf.language === 'ur');
  assert(urduTafsir !== undefined, 'Urdu tafsir must be present');
  assert(urduTafsir?.workTitle.includes('Khaza\'in al-Irfan'), 'Tafsir must carry distinct work title');
  assert(urduTafsir?.authorName.includes('Na\'im al-Din'), 'Tafsir author must be distinct');
  assert(urduTafsir?.isAiGenerated === false, 'Tafsir must never be AI generated');

  console.log('  ✔ Translation and Tafsir strictly separated into independent epistemic objects');
  console.log(`    - Translation: "${urduTranslation?.workTitle}" by ${urduTranslation?.translatorName}`);
  console.log(`    - Tafsir: "${urduTafsir?.workTitle}" by ${urduTafsir?.authorName}`);

  // -------------------------------------------------------------------------
  // GATE 3: Translation Authenticity Invariant
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 3] Validating Translation Authenticity Invariants...');
  
  // 3a: AI translation block defense
  let aiTranslationBlocked = false;
  try {
    MultilingualCorpusRegistry.assertNoAiGeneratedTranslation({
      isAiGenerated: true,
      translatorName: 'AI Model GPT-4',
      provenance: 'Automated synthesis',
    });
  } catch (err: any) {
    aiTranslationBlocked = true;
    assert(err.message.includes('AI_GENERATED_TRANSLATION_PROHIBITED'), 'Must throw AI translation prohibited error');
  }
  assert(aiTranslationBlocked, 'AI-generated translation must be strictly blocked');
  console.log('  ✔ [DEFENDED] Invariant Enforced: AI_GENERATED_TRANSLATION_PROHIBITED');

  // 3b: Missing translator attribution defense
  let anonymousTranslationBlocked = false;
  try {
    MultilingualCorpusRegistry.assertNoAiGeneratedTranslation({
      isAiGenerated: false,
      translatorName: '',
      provenance: 'Unknown internet upload',
    });
  } catch (err: any) {
    anonymousTranslationBlocked = true;
    assert(err.message.includes('TRANSLATOR_ATTRIBUTION_REQUIRED'), 'Must require scholarly translator attribution');
  }
  assert(anonymousTranslationBlocked, 'Anonymous translation without attribution must be blocked');
  console.log('  ✔ [DEFENDED] Invariant Enforced: TRANSLATOR_ATTRIBUTION_REQUIRED');

  // 3c: "Verified translation unavailable" when language gap exists
  const unsupportedLanguageRes = MultilingualCorpusRegistry.getTranslation(1, 1, 'sw'); // Swahili (unseeded)
  assert(unsupportedLanguageRes.isAvailable === false, 'Must flag as unavailable');
  assert(unsupportedLanguageRes.message === 'Verified translation unavailable', 'Must return exact contract message');
  console.log('  ✔ Unseeded/Unverified language returns clean "Verified translation unavailable" (0 fabrication)');

  // -------------------------------------------------------------------------
  // GATE 4: User Preference Layer (Hanafi + Ahl-e-Sunnat / Razvi Corpus)
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 4] Validating User Preference Layer (Hanafi + Ahl-e-Sunnat / Razvi Corpus)...');
  const userRazviPreferences: DecoupledUserPreferences = {
    userId: 'user_bareilly_01',
    interfaceLanguage: 'ur',
    contentLanguage: 'ur',
    preferredQuranTranslator: 'Imam Ahmad Raza Khan (Kanzul Iman)',
    preferredTafsirWork: 'Khaza\'in al-Irfan',
    madhhabPreference: 'HANAFI',
    scholarlyTraditionPreference: 'AHL_E_SUNNAT_RAZVI',
    spiritualLiteraturePreference: 'TASAWWUF',
    showComparativeFiqh: true,
    showDisagreements: true,
  };

  const personalizedRazviVerse = MultilingualCorpusRegistry.resolvePersonalizedVerse(1, 1, userRazviPreferences);
  assert(personalizedRazviVerse.primaryTranslation !== null, 'Primary translation must be resolved');
  assert(personalizedRazviVerse.primaryTranslation?.workTitle.includes('Kanzul Iman'), 'Primary translation must be Kanzul Iman');
  assert(personalizedRazviVerse.primaryTranslation?.scholarlyTradition === 'Ahl-e-Sunnat / Razvi', 'Tradition must be Razvi');
  assert(personalizedRazviVerse.primaryTafsir !== null, 'Primary tafsir must be resolved');
  assert(personalizedRazviVerse.primaryTafsir?.workTitle.includes('Khaza\'in al-Irfan'), 'Primary tafsir must be Khaza\'in al-Irfan');
  console.log(`  ✔ Personalized Verse Resolved: Translation: ${personalizedRazviVerse.primaryTranslation?.workTitle}`);
  console.log(`  ✔ Primary Tafsir Resolved: ${personalizedRazviVerse.primaryTafsir?.workTitle}`);
  console.log(`  ✔ Text: "${personalizedRazviVerse.primaryTranslation?.textTranslation}"`);

  // -------------------------------------------------------------------------
  // GATE 5: Four-Madhhab Parity with Same Shared Evidence Base
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 5] Validating Four-Madhhab Parity & Decoupled Answers...');
  // 5a: Hanafi / Razvi user gets Hanafi primary answer, with other schools preserved
  const razviAnswer = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/universal/decoupled-answer',
    {
      disagreementId: 'dis_fatihah_behind_imam',
      preferences: userRazviPreferences,
    },
    { userId: userRazviPreferences.userId, userRole: 'USER' }
  );
  assert(razviAnswer.success === true, 'Decoupled answer API must succeed');
  assert(razviAnswer.data.yourPreferredView.schoolOrTradition === 'HANAFI', 'Must elevate Hanafi view');
  assert(razviAnswer.data.otherRecognizedViews.length === 3, 'Must retain Maliki, Shafi\'i, and Hanbali views');
  console.log('  ✔ Hanafi User Answer: Elevated Hanafi position with 3 preserved schools');

  // 5b: Shafi'i English user gets Shafi'i primary answer with the same underlying corpus
  const userShafiiPreferences: DecoupledUserPreferences = {
    userId: 'user_cairo_shafii_01',
    interfaceLanguage: 'en',
    contentLanguage: 'en',
    preferredQuranTranslator: 'Saheeh International',
    preferredTafsirWork: 'Tafsir Ibn Kathir',
    madhhabPreference: 'SHAFI_I',
    scholarlyTraditionPreference: 'CLASSICAL_TRADITIONAL',
    spiritualLiteraturePreference: 'GENERAL_ADAB',
    showComparativeFiqh: true,
    showDisagreements: true,
  };

  const shafiiAnswer = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/universal/decoupled-answer',
    {
      disagreementId: 'dis_fatihah_behind_imam',
      preferences: userShafiiPreferences,
    },
    { userId: userShafiiPreferences.userId, userRole: 'USER' }
  );
  assert(shafiiAnswer.success === true, 'Shafii answer API must succeed');
  assert(shafiiAnswer.data.yourPreferredView.schoolOrTradition === 'SHAFI_I', 'Must elevate Shafi\'i view');
  assert(shafiiAnswer.data.otherRecognizedViews.length === 3, 'Must retain Hanafi, Maliki, Hanbali views');
  console.log('  ✔ Shafi\'i User Answer: Elevated Shafi\'i position with 3 preserved schools');

  // -------------------------------------------------------------------------
  // GATE 6: API Router Endpoints Verification
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 6] Validating Multilingual API Router Endpoints...');
  const reqContext = { userId: 'user_tester', userRole: 'USER' };

  // 6a: GET /api/v1/knowledge/quran/ayah/1/1
  const ayahApiRes = await ApiRouter.handle('GET', '/api/v1/knowledge/quran/ayah/1/1', {}, reqContext);
  assert(ayahApiRes.success === true && ayahApiRes.data.surahNumber === 1, 'API /api/v1/knowledge/quran/ayah/1/1 must return ayah view');
  console.log(`  ✔ GET /api/v1/knowledge/quran/ayah/1/1 returned ${ayahApiRes.data.translations.length} translations & ${ayahApiRes.data.tafasir.length} tafasir`);

  // 6b: POST /api/v1/knowledge/quran/translation (Hindi query)
  const hindiTransRes = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/quran/translation',
    { surahNumber: 1, ayahNumber: 1, language: 'hi' },
    reqContext
  );
  assert(hindiTransRes.success === true && hindiTransRes.data.isAvailable === true, 'Hindi translation query must succeed');
  console.log(`  ✔ POST /api/v1/knowledge/quran/translation (hi) returned: "${hindiTransRes.data.translation.textTranslation}"`);

  // 6c: POST /api/v1/knowledge/quran/translation (Unverified language query -> Unavailable message)
  const unverifiedTransRes = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/quran/translation',
    { surahNumber: 1, ayahNumber: 1, language: 'zh' }, // Chinese unseeded
    reqContext
  );
  assert(unverifiedTransRes.success === true && unverifiedTransRes.data.isAvailable === false, 'Unverified language must return isAvailable: false');
  assert(unverifiedTransRes.data.message === 'Verified translation unavailable', 'Must return exact contract message');
  console.log('  ✔ POST /api/v1/knowledge/quran/translation (zh) correctly returned "Verified translation unavailable"');

  // 6d: POST /api/v1/knowledge/quran/personalized
  const personalizedApiRes = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/quran/personalized',
    { surahNumber: 1, ayahNumber: 1, preferences: userRazviPreferences },
    reqContext
  );
  assert(personalizedApiRes.success === true && personalizedApiRes.data.primaryTranslation !== null, 'Personalized verse API must succeed');
  console.log(`  ✔ POST /api/v1/knowledge/quran/personalized returned: "${personalizedApiRes.data.primaryTranslation.workTitle}"`);

  // 6e: GET /api/v1/knowledge/multilingual/summary
  const summaryApiRes = await ApiRouter.handle('GET', '/api/v1/knowledge/multilingual/summary', {}, reqContext);
  assert(summaryApiRes.success === true && summaryApiRes.data.razviPreferenceCorpusPresent === true, 'Summary API must succeed');
  console.log(`  ✔ GET /api/v1/knowledge/multilingual/summary returned ${summaryApiRes.data.totalLanguagesSupported} supported languages`);

  console.log('\n========================================================================');
  console.log('✅ ALL 6 MULTILINGUAL & DECOUPLED PREFERENCE GATES PASSED (100%)');
  console.log('========================================================================\n');
}

runMultilingualTestSuite().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
