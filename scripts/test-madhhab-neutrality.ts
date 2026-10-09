/**
 * AMAL OS — UNIVERSAL KNOWLEDGE & SCHOLARLY NEUTRALITY VERIFICATION SUITE
 * Verifies full Sunni Madhhab coverage, scholarly neutrality invariants,
 * evidence immutability, epistemic separation, and multi-tier presentation.
 */

import { EcosystemService } from '../services/api/src/modules/ecosystem/ecosystem.service.js';
import { ApiRouter } from '../services/api/src/router.js';

async function runMadhhabNeutralityVerification(): Promise<void> {
  console.log('======================================================================');
  console.log('AMAL OS — UNIVERSAL KNOWLEDGE & SCHOLARLY NEUTRALITY VERIFICATION');
  console.log('======================================================================');
  console.log('• Non-Negotiable: AMAL is not built for one madhhab.');
  console.log('• Non-Negotiable: Full Sunni Coverage (Hanafi, Maliki, Shafi\'i, Hanbali).');
  console.log('• Non-Negotiable: Zero Sectarian Ranking (No school universally superior).');
  console.log('• Non-Negotiable: Evidence Immutability (Preferences never alter truth).');
  console.log('• Non-Negotiable: Epistemic Separation Across All Classifications.');
  console.log('----------------------------------------------------------------------\n');

  const ecosystemService = new EcosystemService();

  // ------------------------------------------------------------------
  // TEST 1: Four Sunni Madhhab Foundation Verification
  // ------------------------------------------------------------------
  console.log('[TEST 1] Validating Four Sunni Madhhab Knowledge Architectures...');
  const foundations = ecosystemService.getAllMadhhabFoundations();
  if (foundations.length !== 4) {
    throw new Error(`Test 1 Failed: Expected 4 Sunni foundations, found ${foundations.length}`);
  }

  const schools = ['HANAFI', 'MALIKI', 'SHAFI_I', 'HANBALI'] as const;
  for (const s of schools) {
    const f = ecosystemService.getMadhhabFoundation(s);
    if (!f || f.foundationalWorks.length === 0 || f.canonicalLegalManuals.length === 0) {
      throw new Error(`Test 1 Failed: Incomplete foundation for school ${s}`);
    }
    console.log(`  ✓ ${s}: Eponym: ${f.eponym} | Manuals: ${f.canonicalLegalManuals.slice(0, 2).join(', ')}`);
  }

  // ------------------------------------------------------------------
  // TEST 2: Scholarly Neutrality Invariant (Anti-Sectarian Gate)
  // ------------------------------------------------------------------
  console.log('\n[TEST 2] Validating Scholarly Neutrality Invariant (No Universal Superiority)...');
  let rankingBlocked = false;
  try {
    ecosystemService.assertMadhhabNeutrality({
      favoredSchool: 'HANAFI',
      reason: 'This is the superior and only_correct madhhab for our application.'
    });
  } catch (err: any) {
    if (err.message.includes('SECTARIAN_RANKING_VIOLATION')) {
      rankingBlocked = true;
      console.log('  ✓ [DEFENDED] Invariant Enforced: ' + err.message);
    }
  }
  if (!rankingBlocked) {
    throw new Error('Test 2 Failed: Sectarian ranking of madhhabs was permitted!');
  }

  // ------------------------------------------------------------------
  // TEST 3: Evidence Immutability Invariant
  // ------------------------------------------------------------------
  console.log('\n[TEST 3] Validating Evidence Immutability Invariant (Preferences != Canon Mutation)...');
  let tamperingBlocked = false;
  try {
    ecosystemService.assertEvidenceImmutability({
      userPreferenceModified: 'Preferred Easy Translations',
      targetPayload: 'QURAN_TEXT'
    });
  } catch (err: any) {
    if (err.message.includes('EVIDENCE_TAMPERING_VIOLATION')) {
      tamperingBlocked = true;
      console.log('  ✓ [DEFENDED] Invariant Enforced: ' + err.message);
    }
  }
  if (!tamperingBlocked) {
    throw new Error('Test 3 Failed: User preference allowed to mutate Quranic text!');
  }

  // ------------------------------------------------------------------
  // TEST 4: Epistemic Separation Invariant
  // ------------------------------------------------------------------
  console.log('\n[TEST 4] Validating Epistemic Separation (AI Inference != Revelation)...');
  let conflationBlocked = false;
  try {
    ecosystemService.assertEpistemicSeparation({
      text: 'Allah commands you to work 45 minutes Pomodoro intervals without fail.',
      claimedCategory: 'AI_INFERENCE'
    });
  } catch (err: any) {
    if (err.message.includes('EPISTEMIC_CONFLATION_VIOLATION')) {
      conflationBlocked = true;
      console.log('  ✓ [DEFENDED] Invariant Enforced: ' + err.message);
    }
  }
  if (!conflationBlocked) {
    throw new Error('Test 4 Failed: AI inference allowed to simulate divine command!');
  }

  // ------------------------------------------------------------------
  // TEST 5: Comparative Fiqh Resolution & Plurality Parity
  // ------------------------------------------------------------------
  console.log('\n[TEST 5] Validating Comparative Fiqh Resolution & Plurality Parity...');
  const comparativeCase = ecosystemService.getComparativeFiqhCase('case_fiqh_touching_spouse_wudu');
  if (!comparativeCase) throw new Error('Test 5 Failed: Comparative case not found.');

  if (comparativeCase.areasOfAgreement.length === 0 || comparativeCase.areasOfDisagreement.length === 0) {
    throw new Error('Test 5 Failed: Agreement/Disagreement decomposition missing.');
  }

  for (const s of schools) {
    const pos = comparativeCase.schoolPositions[s];
    if (!pos || !pos.canonicalReferences || pos.canonicalReferences.length === 0) {
      throw new Error(`Test 5 Failed: Missing position details for ${s}`);
    }
    console.log(`  ✓ Position [${s}]: ${pos.positionSummary.substring(0, 60)}...`);
  }

  // ------------------------------------------------------------------
  // TEST 6: Multi-Tier Presentation (Beginner vs Practicing vs Student)
  // ------------------------------------------------------------------
  console.log('\n[TEST 6] Validating Multi-Tier Personalized Presentation...');
  
  // 6A: BEGINNER_SIMPLE (gentle, practical, non-sectarian)
  const beginnerResp = ecosystemService.renderFiqhGuidance('case_fiqh_touching_spouse_wudu', {
    userId: 'usr_new_muslim_01',
    madhhabPreference: 'GENERAL_SUNNI',
    preferredScholars: [],
    preferredTafsir: [],
    preferredTranslation: 'Clear Quran',
    preferredLanguage: 'en',
    preferredSpiritualLiterature: [],
    levelOfDetail: 'BEGINNER_SIMPLE'
  });
  if (beginnerResp.audienceLevel !== 'BEGINNER_SIMPLE' || !beginnerResp.evidencePreserved) {
    throw new Error('Test 6A Failed: Beginner response malformed.');
  }
  console.log('  ✓ Beginner Tier: ' + beginnerResp.practicalGuidance);

  // 6B: PRACTICING (Hanafi specific)
  const practicingResp = ecosystemService.renderFiqhGuidance('case_fiqh_touching_spouse_wudu', {
    userId: 'usr_practicing_hanafi',
    madhhabPreference: 'HANAFI',
    preferredScholars: ['Mufti Taqi Usmani'],
    preferredTafsir: ['Ma\'arif al-Qur\'an'],
    preferredTranslation: 'Sahih International',
    preferredLanguage: 'en',
    preferredSpiritualLiterature: [],
    levelOfDetail: 'PRACTICING'
  });
  if (practicingResp.audienceLevel !== 'PRACTICING' || !practicingResp.primaryPosition) {
    throw new Error('Test 6B Failed: Practicing response malformed.');
  }
  console.log('  ✓ Practicing Tier: ' + practicingResp.practicalGuidance);

  // 6C: ADVANCED_STUDENT (Shafi'i comparative breakdown)
  const advancedResp = ecosystemService.renderFiqhGuidance('case_fiqh_touching_spouse_wudu', {
    userId: 'usr_student_shafii',
    madhhabPreference: 'SHAFI_I',
    preferredScholars: ['Imam al-Nawawi'],
    preferredTafsir: ['Tafsir Ibn Kathir'],
    preferredTranslation: 'Arberry',
    preferredLanguage: 'en',
    preferredSpiritualLiterature: ['Ihya Ulum al-Din'],
    levelOfDetail: 'ADVANCED_STUDENT'
  });
  if (advancedResp.audienceLevel !== 'ADVANCED_STUDENT' || !advancedResp.comparativeBreakdown) {
    throw new Error('Test 6C Failed: Advanced student comparative breakdown missing.');
  }
  console.log('  ✓ Advanced Student Tier: Comparative case breakdown rendered with 4-school matrix.');

  // ------------------------------------------------------------------
  // TEST 7: REST API Router End-to-End Execution
  // ------------------------------------------------------------------
  console.log('\n[TEST 7] Validating REST API Router Endpoints...');
  const ctx = { userId: 'usr_test_neutrality', userRole: 'USER' };
  const res1 = await ApiRouter.handle('GET', '/api/v1/knowledge/madhhabs', {}, ctx);
  if (!res1.success || !Array.isArray(res1.data) || res1.data.length !== 4) {
    throw new Error('Test 7 Failed: /api/v1/knowledge/madhhabs did not return 4 foundations.');
  }

  const res2 = await ApiRouter.handle('GET', '/api/v1/knowledge/comparative-fiqh/case_fiqh_touching_spouse_wudu', {}, ctx);
  if (!res2.success || !res2.data.schoolPositions) {
    throw new Error('Test 7 Failed: /api/v1/knowledge/comparative-fiqh/:id did not return case.');
  }

  const res3 = await ApiRouter.handle('POST', '/api/v1/knowledge/fiqh-guidance', {
    caseId: 'case_fiqh_touching_spouse_wudu',
    madhhabPreference: 'MALIKI',
    levelOfDetail: 'PRACTICING'
  }, ctx);
  if (!res3.success || !res3.data.practicalGuidance) {
    throw new Error('Test 7 Failed: /api/v1/knowledge/fiqh-guidance did not return rendered guidance.');
  }
  console.log('  ✓ REST Router: /api/v1/knowledge/madhhabs, /comparative-fiqh, and /fiqh-guidance 100% verified.');

  console.log('\n======================================================================');
  console.log('★ UNIVERSAL KNOWLEDGE & SCHOLARLY NEUTRALITY: ALL 7 TESTS PASS (100%)');
  console.log('======================================================================\n');
}

runMadhhabNeutralityVerification().catch((err) => {
  console.error('\n❌ UNIVERSAL KNOWLEDGE & SCHOLARLY NEUTRALITY VERIFICATION FAILED:', err);
  process.exit(1);
});
