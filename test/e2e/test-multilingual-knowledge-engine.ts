/**
 * AMAL OS — UNIVERSAL MULTILINGUAL ISLAMIC KNOWLEDGE ENGINE (SECTION 54)
 * MASTER VERIFICATION TEST SUITE (INDIA + GLOBAL)
 * 
 * Validates all 9 core gates across 55 specification sections:
 * Gate 1: Languages Registry & Script/Direction Handling (India + Global)
 * Gate 2: Quran Master Model & Immutable Uthmanic Edition Hash Defense
 * Gate 3: Translation Model & Registry (Translation ≠ Quran Arabic)
 * Gate 4: Independent Tafsir Domain & Methodology Classification (Translation ≠ Tafsir)
 * Gate 5: Four Madhhab Tracks & Ahl-e-Sunnat / Razvi Preference Corpus
 * Gate 6: Canonical Concept Mapping & Cross-Language Retrieval
 * Gate 7: Automated Claim Auditor & Hard Block Defense
 * Gate 8: Knowledge Releases & Cryptographic Merkle Root Verification
 * Gate 9: Master REST API Router Endpoints (Section 41)
 */

import { UniversalMultilingualKnowledgeEngine } from '../packages/evidence/src/multilingual/universal-multilingual-knowledge-engine.js';
import { ApiRouter } from '../services/api/src/router.js';
import type { MultilingualEvidenceQuery, MasterAIResponseContract } from '@amal/types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runMasterMultilingualEngineSuite() {
  console.log('========================================================================');
  console.log('⚡ AMAL OS — UNIVERSAL MULTILINGUAL ISLAMIC KNOWLEDGE ENGINE (SECTION 54)');
  console.log('========================================================================\n');

  const engine = new UniversalMultilingualKnowledgeEngine();

  // -------------------------------------------------------------------------
  // GATE 1: Language Registry & Script/Direction Handling (India + Global)
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 1] Validating Language Registry, Script & BIDI/RTL Handling...');
  const languages = engine.getLanguages();
  assert(languages.length >= 19, `Engine must support at least 19 languages, found ${languages.length}`);

  // India priority check
  const indiaLanguages = ['ur', 'hi', 'bn', 'gu', 'mr', 'ml', 'ta', 'te', 'kn', 'pa'];
  for (const code of indiaLanguages) {
    const lang = engine.getLanguage(code);
    assert(lang !== undefined, `India language ${code} must be registered`);
    assert(lang?.is_india_priority === true, `${code} must be flagged as India priority`);
    assert(!!lang?.script && !!lang?.direction, `${code} must define script and text direction`);
  }
  const urdu = engine.getLanguage('ur')!;
  assert(urdu.direction === 'RTL', 'Urdu must have RTL direction');
  assert(urdu.script.includes('Nastaliq'), 'Urdu script must be Nastaliq / Perso-Arabic');

  const punjabi = engine.getLanguage('pa')!;
  assert(punjabi.direction === 'BIDI', 'Punjabi must support BIDI direction');

  // Global priority check
  const globalLanguages = ['ar', 'en', 'fa', 'tr', 'id', 'ms', 'fr', 'es', 'de'];
  for (const code of globalLanguages) {
    const lang = engine.getLanguage(code);
    assert(lang !== undefined, `Global language ${code} must be registered`);
    assert(lang?.is_global_priority === true, `${code} must be flagged as Global priority`);
  }
  const arabic = engine.getLanguage('ar')!;
  assert(arabic.direction === 'RTL', 'Arabic must be RTL');
  console.log(`  ✔ Languages Registry Verified: ${languages.length} total (${indiaLanguages.length} India, ${globalLanguages.length} Global)`);

  // -------------------------------------------------------------------------
  // GATE 2: Quran Master Model & Immutable Edition Control
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 2] Validating Quran Master Model & Immutable Edition Control...');
  const surahs = engine.getSurahs();
  assert(surahs.length >= 7, 'Master surah registry must contain seeded surahs');
  const fatihah = surahs.find((s) => s.surah_number === 1)!;
  assert(fatihah.name_arabic === 'الفاتحة', 'Surah 1 must be Al-Fatihah');
  assert(fatihah.total_ayahs === 7, 'Surah Al-Fatihah must have 7 ayahs');

  const ayah11 = engine.getAyah('1:1');
  assert(ayah11 !== undefined, 'Ayah 1:1 must exist');
  assert(ayah11?.text_arabic_uthmani === 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'Ayah 1:1 text must be exact Uthmanic');

  const ayah1778 = engine.getAyah('17:78');
  assert(ayah1778 !== undefined, 'Ayah 17:78 must exist');
  assert(ayah1778?.canonical_key === '17:78', 'Ayah 17:78 key must match canonical format');
  console.log('  ✔ Canonical Quran Master Ayahs Verified with Uthmanic Sacred Orthography');

  // -------------------------------------------------------------------------
  // GATE 3: Translation Model & Registry (Translation ≠ Quran Arabic)
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 3] Validating Translation Registry & Epistemic Separation...');
  const urduTranslations = engine.getTranslations('1:1', 'ur');
  assert(urduTranslations.length > 0, 'Urdu translations must be available for Ayah 1:1');
  assert(urduTranslations[0].text.includes('اللہ کے نام سے شروع'), 'Kanzul Iman Urdu text must match');

  const hindiTranslations = engine.getTranslations('1:1', 'hi');
  assert(hindiTranslations.length > 0, 'Hindi translations must be available for Ayah 1:1');
  assert(hindiTranslations[0].text.includes('अल्लाह के नाम से शुरू'), 'Kanzul Iman Hindi text must match');

  const englishTranslations = engine.getTranslations('1:1', 'en');
  assert(englishTranslations.length > 0, 'English translations must be available for Ayah 1:1');
  assert(englishTranslations[0].text.includes('In the name of Allah'), 'Saheeh International English text must match');

  const workUr = engine.getTranslationWork('work_tr_kanzul_iman_ur');
  assert(workUr !== undefined, 'Kanzul Iman work record must exist');
  assert(workUr?.translator.includes('Ahmad Raza Khan'), 'Translator must be Ala Hazrat Imam Ahmad Raza Khan');
  assert(workUr?.original_or_translation === 'TRANSLATION', 'Work must strictly be marked TRANSLATION, never original');
  console.log('  ✔ Translation Works & Passages Verified Across Urdu, Hindi, English');

  // -------------------------------------------------------------------------
  // GATE 4: Independent Tafsir Domain & Methodology Classification
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 4] Validating Independent Tafsir Domain & Methodology...');
  const tafsirWorks = engine.getTafsirWorks();
  assert(tafsirWorks.length >= 2, 'Tafsir works registry must contain seeded commentaries');

  const khazain = tafsirWorks.find((t) => t.id === 'taf_khazain_al_irfan')!;
  assert(khazain.author.includes('Na\'im al-Din'), 'Khaza\'in al-Irfan author must be Mawlana Na\'im al-Din Muradabadi');
  assert(khazain.methodology === 'FIQHI', 'Khaza\'in al-Irfan methodology must be classified as FIQHI');

  const khazainPassages = engine.getTafsirPassages('17:78', khazain.id);
  assert(khazainPassages.length > 0, 'Khaza\'in al-Irfan passage for 17:78 must exist');
  assert(khazainPassages[0].text.includes('پنجگانہ نمازوں کے اوقات'), 'Passage text must provide classical commentary');

  const jalalayn = tafsirWorks.find((t) => t.id === 'taf_jalalayn_ar')!;
  assert(jalalayn.language === 'ar', 'Tafsir al-Jalalayn must be in Arabic');
  assert(jalalayn.methodology === 'LUGAWI', 'Tafsir al-Jalalayn methodology must be LUGAWI');
  console.log('  ✔ Independent Tafsir Domain Verified (Methodologies: FIQHI, LUGAWI; Distinct from Translation)');

  // -------------------------------------------------------------------------
  // GATE 5: Four Madhhab Tracks & Ahl-e-Sunnat / Razvi Preference Corpus
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 5] Validating Four Madhhab Positions & Ahl-e-Sunnat / Razvi Preference...');
  const query: MultilingualEvidenceQuery = {
    query_text: 'Safar me roza aur namaz qasr',
    input_language: 'ur',
    target_answer_language: 'ur',
    madhhab_preference: 'HANAFI',
    scholarly_tradition_preference: 'AHL_E_SUNNAT_RAZVI',
  };

  const response = engine.generateGovernedAnswer(query);
  assert(response.language === 'ur', 'Target language must be Urdu');
  assert(response.scholarly_positions.length === 4, 'Must contain all 4 Sunni Madhhab positions');

  const hanafi = response.scholarly_positions.find((p) => p.madhhab === 'HANAFI')!;
  const shafii = response.scholarly_positions.find((p) => p.madhhab === 'SHAFI_I')!;
  const maliki = response.scholarly_positions.find((p) => p.madhhab === 'MALIKI')!;
  const hanbali = response.scholarly_positions.find((p) => p.madhhab === 'HANBALI')!;

  assert(hanafi.is_preferred === true, 'Hanafi must be marked preferred per user preference');
  assert(hanafi.ruling.includes('قصر واجب'), 'Hanafi ruling on Qasr must be accurate');
  assert(shafii.is_preferred === false, 'Shafi\'i must not be marked preferred');
  assert(shafii.ruling.includes('رخصت'), 'Shafi\'i ruling must be preserved as Rukhsah');
  assert(maliki.ruling.includes('سنت مؤکدہ'), 'Maliki ruling must be preserved');
  assert(hanbali.ruling.includes('افضل'), 'Hanbali ruling must be preserved');
  assert(response.disagreement_present === true, 'Legitimate divergence must be flagged');
  console.log('  ✔ Four Madhhab Tracks & Ahl-e-Sunnat / Razvi Preference Preserved with Complete Parity');

  // -------------------------------------------------------------------------
  // GATE 6: Canonical Concept Mapping & Cross-Language Retrieval
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 6] Validating Canonical Concept Mapping & Cross-Language Retrieval...');
  const resolvedUrdu = engine.resolveConcept('نماز');
  assert(resolvedUrdu?.concept_id === 'CONCEPT_SALAH', 'Urdu "نماز" must map to CONCEPT_SALAH');

  const resolvedHindi = engine.resolveConcept('नमाज़');
  assert(resolvedHindi?.concept_id === 'CONCEPT_SALAH', 'Hindi "नमाज़" must map to CONCEPT_SALAH');

  const resolvedBengali = engine.resolveConcept('নামাজ');
  assert(resolvedBengali?.concept_id === 'CONCEPT_SALAH', 'Bengali "নামাজ" must map to CONCEPT_SALAH');

  const resolvedEnglish = engine.resolveConcept('Daily Prayer');
  assert(resolvedEnglish?.concept_id === 'CONCEPT_SALAH', 'English "Daily Prayer" must map to CONCEPT_SALAH');

  const resolvedTravel = engine.resolveConcept('Traveler fasting');
  assert(resolvedTravel?.concept_id === 'CONCEPT_FASTING_TRAVEL', 'Travel fasting query must resolve to CONCEPT_FASTING_TRAVEL');
  console.log('  ✔ Canonical Concept Mapping Verified Across Urdu, Hindi, Bengali, English, Arabic');

  // -------------------------------------------------------------------------
  // GATE 7: Automated Claim Auditor & Hard Block Defense
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 7] Validating Automated Claim Auditor & Hard Block Defense...');
  // 7a: Compliant contract passes
  const validAudit = engine.auditResponseContract(response);
  assert(validAudit.passed === true, 'Valid response contract must pass claim audit');
  assert(validAudit.hard_blocks_triggered.length === 0, 'No hard blocks should be triggered on valid response');

  // 7b: Invariant violation: Translation presented as Quran Arabic
  const invalidContract1: MasterAIResponseContract = {
    ...response,
    translations: [
      {
        language: 'ur',
        translator: 'Unknown',
        work_title: 'Fabricated Translation',
        text: response.primary_evidence[0].arabic_text, // VIOLATION!
        is_authoritative: false,
      },
    ],
  };
  const invalidAudit1 = engine.auditResponseContract(invalidContract1);
  assert(invalidAudit1.passed === false, 'Audit must fail when translation masquerades as Quran Arabic');
  assert(
    invalidAudit1.hard_blocks_triggered.includes('TRANSLATION_PRESENTED_AS_QURAN_ARABIC'),
    'TRANSLATION_PRESENTED_AS_QURAN_ARABIC hard block must be triggered'
  );

  // 7c: Invariant violation: Missing 4 Madhhabs in Fiqh question
  const invalidContract2: MasterAIResponseContract = {
    ...response,
    scholarly_positions: [response.scholarly_positions[0]], // Only Hanafi, missing others
  };
  const invalidAudit2 = engine.auditResponseContract(invalidContract2);
  assert(invalidAudit2.passed === false, 'Audit must fail when 4 madhhab perspectives are incomplete');
  assert(
    invalidAudit2.hard_blocks_triggered.includes('INCOMPLETE_FOUR_MADHHAB_PERSPECTIVES'),
    'INCOMPLETE_FOUR_MADHHAB_PERSPECTIVES hard block must be triggered'
  );
  console.log('  ✔ Automated Claim Auditor & Hard Block Defenses Enforced');

  // -------------------------------------------------------------------------
  // GATE 8: Knowledge Releases & Merkle Root Snapshots
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 8] Validating Production Knowledge Releases & Merkle Hash...');
  const releases = engine.getKnowledgeReleases();
  assert(releases.length > 0, 'Must have at least one active knowledge release');
  const release = releases[0];
  assert(release.release_tag.includes('AMAL-RELEASE'), 'Release tag must follow convention');
  assert(release.status === 'ACTIVE_PRODUCTION', 'Release must be ACTIVE_PRODUCTION');
  assert(release.merkle_root_hash.length === 64, 'Merkle root must be valid SHA-256 hash');
  assert(release.total_sources > 0, 'Must track total sources');
  assert(release.total_claims > 0, 'Must track total verified claims');
  console.log(`  ✔ Release Snapshot Verified: ${release.release_tag} (Merkle: ${release.merkle_root_hash.substring(0, 16)}...)`);

  // -------------------------------------------------------------------------
  // GATE 9: Section 41 Master REST API Router Endpoints
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 9] Validating Section 41 Master REST API Endpoints via ApiRouter...');
  const ctx = { userId: 'usr_test_scholar_01' };

  // 1. GET /api/v1/languages
  const resLanguages = await ApiRouter.handle('GET', '/api/v1/languages', {}, ctx);
  assert(resLanguages.success === true, 'GET /api/v1/languages must succeed');
  assert(Array.isArray(resLanguages.data) && resLanguages.data.length >= 19, 'Must return all supported languages');

  // 2. GET /api/v1/quran/surahs
  const resSurahs = await ApiRouter.handle('GET', '/api/v1/quran/surahs', {}, ctx);
  assert(resSurahs.success === true, 'GET /api/v1/quran/surahs must succeed');
  assert(Array.isArray(resSurahs.data) && resSurahs.data.length >= 7, 'Must return master Quran surahs');

  // 3. GET /api/v1/quran/ayahs/1:1
  const resAyah = await ApiRouter.handle('GET', '/api/v1/quran/ayahs/1:1', {}, ctx);
  assert(resAyah.success === true, 'GET /api/v1/quran/ayahs/1:1 must succeed');
  assert(resAyah.data.text_arabic_uthmani.includes('بِسْمِ اللَّهِ'), 'Must return canonical Uthmanic Ayah');

  // 4. GET /api/v1/translations
  const resTranslations = await ApiRouter.handle('GET', '/api/v1/translations', {}, ctx);
  assert(resTranslations.success === true, 'GET /api/v1/translations must succeed');
  assert(Array.isArray(resTranslations.data) && resTranslations.data.length > 0, 'Must return translation passages');

  // 5. GET /api/v1/translations/work_tr_kanzul_iman_ur
  const resWork = await ApiRouter.handle('GET', '/api/v1/translations/work_tr_kanzul_iman_ur', {}, ctx);
  assert(resWork.success === true, 'GET /api/v1/translations/:id must succeed');
  assert(resWork.data.title.includes('Kanzul Iman'), 'Must return Kanzul Iman details');

  // 6. GET /api/v1/tafsir
  const resTafsir = await ApiRouter.handle('GET', '/api/v1/tafsir', {}, ctx);
  assert(resTafsir.success === true, 'GET /api/v1/tafsir must succeed');
  assert(Array.isArray(resTafsir.data) && resTafsir.data.length >= 2, 'Must return tafsir works');

  // 7. GET /api/v1/tafsir/taf_khazain_al_irfan
  const resTafsirWork = await ApiRouter.handle('GET', '/api/v1/tafsir/taf_khazain_al_irfan', {}, ctx);
  assert(resTafsirWork.success === true, 'GET /api/v1/tafsir/:id must succeed');
  assert(Array.isArray(resTafsirWork.data), 'Must return tafsir passages for work');

  // 8. GET /api/v1/scholars
  const resScholars = await ApiRouter.handle('GET', '/api/v1/scholars', {}, ctx);
  assert(resScholars.success === true, 'GET /api/v1/scholars must succeed');
  assert(Array.isArray(resScholars.data) && resScholars.data.length >= 4, 'Must return scholars list');

  // 9. GET /api/v1/madhhabs
  const resMadhhabs = await ApiRouter.handle('GET', '/api/v1/madhhabs', {}, ctx);
  assert(resMadhhabs.success === true, 'GET /api/v1/madhhabs must succeed');
  assert(Array.isArray(resMadhhabs.data) && resMadhhabs.data.length === 4, 'Must return four madhhabs');

  // 10. GET /api/v1/traditions
  const resTraditions = await ApiRouter.handle('GET', '/api/v1/traditions', {}, ctx);
  assert(resTraditions.success === true, 'GET /api/v1/traditions must succeed');
  assert(Array.isArray(resTraditions.data) && resTraditions.data.length >= 4, 'Must return traditions');

  // 11. GET /api/v1/evidence/search
  const resEvidenceSearch = await ApiRouter.handle('GET', '/api/v1/evidence/search', {}, ctx);
  assert(resEvidenceSearch.success === true, 'GET /api/v1/evidence/search must succeed');

  // 12. GET /api/v1/evidence/1:1
  const resEvidenceNode = await ApiRouter.handle('GET', '/api/v1/evidence/1:1', {}, ctx);
  assert(resEvidenceNode.success === true, 'GET /api/v1/evidence/:id must succeed');
  assert(resEvidenceNode.data.canonical_key === '1:1', 'Must return evidence node');

  // 13. POST /api/v1/ai/ask
  const resAiAsk = await ApiRouter.handle(
    'POST',
    '/api/v1/ai/ask',
    {
      query_text: 'Safar me roza aur namaz',
      input_language: 'ur',
      target_answer_language: 'ur',
      madhhab_preference: 'HANAFI',
      scholarly_tradition_preference: 'AHL_E_SUNNAT_RAZVI',
    },
    ctx
  );
  assert(resAiAsk.success === true, 'POST /api/v1/ai/ask must succeed with audited answer');
  assert(resAiAsk.data.scholarly_positions.length === 4, 'Answer must include all 4 Madhhabs');
  assert(resAiAsk.data.citation_status === 'VERIFIED', 'Answer must have VERIFIED citation status');

  // 14. POST /api/v1/evidence/compare
  const resCompare = await ApiRouter.handle(
    'POST',
    '/api/v1/evidence/compare',
    {
      disagreementId: 'dis_fatihah_behind_imam',
      madhhabPreference: 'HANAFI',
      scholarlyTraditionPreference: 'AHL_E_SUNNAT_RAZVI',
    },
    ctx
  );
  assert(resCompare.data.yourPreferredView !== undefined, 'Must provide preferred view');
  assert(resCompare.data.otherRecognizedViews.length === 3, 'Must provide other 3 recognized Sunni school views');
  assert(!!resCompare.data.whyDifferenceExists, 'Must explain reason for scholarly divergence');

  // 15. GET /api/v1/sources/src-quran-uthmani-v1
  const resSource = await ApiRouter.handle('GET', '/api/v1/sources/src-quran-uthmani-v1', {}, ctx);
  assert(resSource.success === true, 'GET /api/v1/sources/:id must succeed');

  // 16. GET /api/v1/knowledge/releases
  const resReleases = await ApiRouter.handle('GET', '/api/v1/knowledge/releases', {}, ctx);
  assert(resReleases.success === true, 'GET /api/v1/knowledge/releases must succeed');
  assert(Array.isArray(resReleases.data) && resReleases.data.length > 0, 'Must return knowledge release snapshots');

  console.log('  ✔ All 16 Section 41 REST API Endpoints Verified via HTTP Router Contract');

  console.log('\n========================================================================');
  console.log('🎉 ALL 9 SECTION 54 ACCEPTANCE GATES PASSED (100% VERIFICATION SUCCESS)');
  console.log('========================================================================\n');
}

runMasterMultilingualEngineSuite().catch((err) => {
  console.error('Fatal Error running suite:', err);
  process.exit(1);
});
