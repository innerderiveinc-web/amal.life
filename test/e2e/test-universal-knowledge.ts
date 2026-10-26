/**
 * AMAL OS — UNIVERSAL SUNNI KNOWLEDGE PUBLICATION & VERIFICATION TEST SUITE
 * 
 * Verifies all 8 Core Verification Gates:
 * Gate 1: Multi-Domain Knowledge Classifications & 7-Wave Corpus Seeding
 * Gate 2: Four-Madhhab Lineage Trees (Hanafi, Maliki, Shafi'i, Hanbali)
 * Gate 3: Multi-Dimensional Source Verification Profiles & Source Cards
 * Gate 4: Madhhab Attribution Invariants (Anti "Islam says" Overreach)
 * Gate 5: Preference Firewall (Preferences never mutate citations or consensus)
 * Gate 6: Hard Publication Invariant Blocks (Missing provenance/sign-off)
 * Gate 7: Multi-Mode Structured Answers (Neutral Sunni vs Preferred Mode)
 * Gate 8: Universal Knowledge Benchmark Metrics (0% Hallucination, 100% Integrity)
 */

import { EcosystemService } from '../services/api/src/modules/ecosystem/ecosystem.service.js';
import { ApiRouter } from '../services/api/src/router.js';
import type { UserDeenProfile, SourceVerificationProfile } from '@amal/types';

async function runUniversalKnowledgeVerification(): Promise<void> {
  console.log('======================================================================');
  console.log('AMAL OS — UNIVERSAL SUNNI KNOWLEDGE PUBLICATION & VERIFICATION SUITE');
  console.log('======================================================================');
  console.log('• Mandate: Universal Sunni Knowledge Architecture Across 4 Madhhabs');
  console.log('• Mandate: 7 Knowledge Waves & 12 Governed Knowledge Domains');
  console.log('• Mandate: Multi-Dimensional Verification Profile (No Flat Numerical Score)');
  console.log('• Mandate: Preference Firewall — Presentation Personalization Only');
  console.log('• Mandate: Dual-Scholar Signed Publication Ledger');
  console.log('----------------------------------------------------------------------\n');

  const ecosystemService = new EcosystemService();

  // ------------------------------------------------------------------
  // GATE 1: Multi-Domain Classifications & 7-Wave Corpus
  // ------------------------------------------------------------------
  console.log('[GATE 1] Validating Multi-Domain Classifications & 7-Wave Corpus Seeding...');
  const canonicalCardIds = [
    'SRC_QURAN_MADINAH_V3',
    'SRC_BUKHARI_TAHSIL_V3',
    'SRC_HANAFI_HIDAYAH',
    'SRC_MALIKI_KHALIL',
    'SRC_SHAFII_MINHAJ',
    'SRC_HANBALI_MUGHNI',
    'SRC_TASAWWUF_IHYA',
  ];

  for (const srcId of canonicalCardIds) {
    const card = ecosystemService.getUniversalSourceCard(srcId);
    if (!card || !card.sourceId) {
      throw new Error(`Gate 1 Failed: Missing canonical source card for ${srcId}`);
    }
    console.log(`  ✓ Seeded [${card.acquisitionWave}]: "${card.work}" by ${card.author}`);
  }

  // ------------------------------------------------------------------
  // GATE 2: Four-Madhhab Lineage Trees
  // ------------------------------------------------------------------
  console.log('\n[GATE 2] Validating Four-Madhhab Lineage Trees & Scholarly Positions...');
  const disagreement = ecosystemService.getUniversalDisagreement('dis_fatihah_behind_imam');
  if (!disagreement) {
    throw new Error(`Gate 2 Failed: Disagreement 'dis_fatihah_behind_imam' not found`);
  }

  const schools = ['HANAFI', 'MALIKI', 'SHAFI_I', 'HANBALI'] as const;
  for (const school of schools) {
    const schoolPos = disagreement.positions.find((p) => p.madhhabOrTradition === school);
    if (!schoolPos || !schoolPos.classicalReferences || schoolPos.classicalReferences.length === 0) {
      throw new Error(`Gate 2 Failed: Missing position or classical references for school ${school}`);
    }
    console.log(`  ✓ ${school} Lineage Verified: "${schoolPos.scholar}" -> ${schoolPos.classicalReferences[0]}`);
  }

  // ------------------------------------------------------------------
  // GATE 3: Source Verification Profiles & Transparent Source Cards
  // ------------------------------------------------------------------
  console.log('\n[GATE 3] Validating Multi-Dimensional Source Verification Profiles & Source Cards...');
  const bukhariCard = ecosystemService.getUniversalSourceCard('SRC_BUKHARI_TAHSIL_V3');
  if (bukhariCard.verificationProfile.scholarlyReviewStatus !== 'TWO_SCHOLAR_APPROVED') {
    throw new Error('Gate 3 Failed: Bukhari profile lacks two-scholar approved status');
  }
  if (!bukhariCard.badges.includes('SOURCE_IDENTITY_VERIFIED') || !bukhariCard.badges.includes('SCHOLAR_REVIEWED')) {
    throw new Error('Gate 3 Failed: Expected publication badges missing');
  }
  console.log(`  ✓ Source Card "${bukhariCard.work}" Verified:`);
  console.log(`    - Epistemic Identity: ${bukhariCard.verificationProfile.sourceIdentity}`);
  console.log(`    - Badges: [${bukhariCard.badges.join(', ')}]`);
  console.log(`    - Provenance Chain: ${bukhariCard.provenanceChain.length} verified verification links`);

  // ------------------------------------------------------------------
  // GATE 4: Madhhab Attribution Invariants (Anti "Islam says" Overreach)
  // ------------------------------------------------------------------
  console.log('\n[GATE 4] Validating Madhhab Attribution Invariant...');
  let overreachBlocked = false;
  try {
    ecosystemService.assertMadhhabAttribution({
      claim: 'Islam says follower recitation behind the imam is completely void.',
      attributedTo: 'Hanafi School',
      isConsensus: false,
    });
  } catch (err: any) {
    if (err.message.includes('UNAUTHORIZED_UNIVERSALIZATION_VIOLATION')) {
      overreachBlocked = true;
      console.log('  ✓ [DEFENDED] Invariant Enforced: ' + err.message);
    }
  }
  if (!overreachBlocked) {
    throw new Error('Gate 4 Failed: Attribution overreach was permitted without consensus!');
  }

  // ------------------------------------------------------------------
  // GATE 5: Preference Firewall
  // ------------------------------------------------------------------
  console.log('\n[GATE 5] Validating Preference Firewall (Suppression / Tampering Defended)...');
  const forbiddenActions = [
    'SUPPRESS_DISAGREEMENT',
    'MODIFY_CITATION',
    'RELABEL_HADITH_GRADING',
    'CONVERT_OPINION_TO_CONSENSUS',
  ] as const;

  for (const act of forbiddenActions) {
    let actionBlocked = false;
    try {
      ecosystemService.assertPreferenceFirewall({
        preferenceKey: 'user_madhhab_filter',
        action: act,
      });
    } catch (err: any) {
      if (err.message.includes('PREFERENCE_FIREWALL_BREACH')) {
        actionBlocked = true;
        console.log(`  ✓ [DEFENDED] ${act} blocked: ${err.message}`);
      }
    }
    if (!actionBlocked) {
      throw new Error(`Gate 5 Failed: Preference was allowed to execute ${act}!`);
    }
  }

  // ------------------------------------------------------------------
  // GATE 6: Hard Publication Invariant Blocks
  // ------------------------------------------------------------------
  console.log('\n[GATE 6] Validating Hard Publication Invariant Blocks...');
  let unverifiedPublicationBlocked = false;
  const invalidProfile: SourceVerificationProfile = {
    sourceId: 'SRC_UNVERIFIED_SCRAPING',
    sourceIdentity: 'UNCERTAIN', // Fails identity check
    provenanceStatus: 'UNTRACEABLE', // Fails provenance
    primaryStatus: false,
    scholarlyRecognition: 'UNDER_INVESTIGATION',
    textIntegrity: 'UNCHECKED', // Fails bitwise
    referenceIntegrity: 'UNKNOWN',
    editionIntegrity: 'POPULAR_COMMERCIAL_PRINT',
    licenseStatus: 'UNRESOLVED', // Fails license
    editorialStatus: 'RAW_UNCHECKED',
    scholarlyReviewStatus: 'REJECTED', // Fails 2-scholar review
    publicationStatus: 'DRAFT',
  };

  try {
    ecosystemService.assertPublicationGates(invalidProfile);
  } catch (err: any) {
    if (err.message.includes('HARD_BLOCK_VIOLATION')) {
      unverifiedPublicationBlocked = true;
      console.log('  ✓ [DEFENDED] Invariant Enforced: ' + err.message);
    }
  }
  if (!unverifiedPublicationBlocked) {
    throw new Error('Gate 6 Failed: Unverified text without provenance or sign-off was published!');
  }

  // ------------------------------------------------------------------
  // GATE 7: Multi-Mode Structured Answers via API Router
  // ------------------------------------------------------------------
  console.log('\n[GATE 7] Validating Multi-Mode Structured Answers via ApiRouter...');
  
  // 7a. Neutral Sunni Mode (Default)
  const neutralProfile: UserDeenProfile = {
    userId: 'usr_seeker_neutral',
    madhhabPreference: 'GENERAL_SUNNI',
    preferredScholars: [],
    preferredTafsir: [],
    preferredQuranTranslation: 'Sahih International',
    preferredHadithResources: [],
    preferredSpiritualLiterature: [],
    preferredLanguage: 'en',
    preferredDepth: 'PRACTICING',
    showMadhhabComparison: true,
    showDisagreement: true,
  };

  const neutralRes = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/universal/answer',
    { disagreementId: 'dis_fatihah_behind_imam', userProfile: neutralProfile },
    { userId: 'usr_seeker_neutral', userRole: 'USER' }
  );
  if (!neutralRes.success || neutralRes.data.presentationMode !== 'NEUTRAL_SUNNI_MODE') {
    throw new Error('Gate 7 Failed: Expected NEUTRAL_SUNNI_MODE for general Sunni seeker');
  }
  console.log(`  ✓ Neutral Sunni Mode Rendered: ${neutralRes.data.directAnswer.slice(0, 60)}...`);

  // 7b. Preferred Mode (Hanafi User)
  const hanafiProfile: UserDeenProfile = {
    userId: 'usr_student_hanafi',
    madhhabPreference: 'HANAFI',
    preferredScholars: ['Abu Hanifah', 'Al-Marghinani'],
    preferredTafsir: ['Tafsir al-Qurtubi'],
    preferredQuranTranslation: 'Sahih International',
    preferredHadithResources: ['Sahih al-Bukhari'],
    preferredSpiritualLiterature: ['Ihya Ulum al-Din'],
    preferredLanguage: 'en',
    preferredDepth: 'ADVANCED_STUDENT',
    showMadhhabComparison: true,
    showDisagreement: true,
  };

  const hanafiRes = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/universal/answer',
    { disagreementId: 'dis_fatihah_behind_imam', userProfile: hanafiProfile },
    { userId: 'usr_student_hanafi', userRole: 'USER' }
  );
  if (!hanafiRes.success || hanafiRes.data.presentationMode !== 'USER_PREFERRED_MODE') {
    throw new Error('Gate 7 Failed: Expected USER_PREFERRED_MODE for Hanafi user');
  }
  if (hanafiRes.data.yourPreferredView?.schoolOrTradition !== 'HANAFI') {
    throw new Error('Gate 7 Failed: Primary answer did not reflect user preferred school');
  }
  if (hanafiRes.data.otherRecognizedViews.length !== 3) {
    throw new Error('Gate 7 Failed: Other 3 Sunni schools not transparently preserved in preferred mode');
  }
  console.log(`  ✓ Preferred Mode Rendered: Primary (${hanafiRes.data.yourPreferredView.schoolOrTradition}) with 3 preserved schools.`);

  // 7c. Direct Source Card Route
  const cardRes = await ApiRouter.handle(
    'GET',
    '/api/v1/knowledge/universal/source-card/SRC_HANAFI_HIDAYAH',
    {},
    { userId: 'usr_tester', userRole: 'USER' }
  );
  if (!cardRes.success || cardRes.data.sourceId !== 'SRC_HANAFI_HIDAYAH') {
    throw new Error('Gate 7 Failed: Source card API route failed');
  }
  console.log(`  ✓ API Route GET /api/v1/knowledge/universal/source-card/:id responded successfully.`);

  // ------------------------------------------------------------------
  // GATE 8: Universal Knowledge Benchmark
  // ------------------------------------------------------------------
  console.log('\n[GATE 8] Validating Universal Knowledge Benchmark Metrics...');
  const benchRes = await ApiRouter.handle(
    'GET',
    '/api/v1/knowledge/universal/benchmark',
    {},
    { userId: 'usr_auditor', userRole: 'ADMIN' }
  );
  if (!benchRes.success) {
    throw new Error('Gate 8 Failed: Benchmark API failed');
  }
  const metrics = benchRes.data;
  console.log(`  ✓ Evaluated Items: ${metrics.totalEvaluatedItems}`);
  console.log(`  ✓ Hallucination Rate: ${metrics.hallucinationRate}% (Zero Tolerance Standard)`);
  console.log(`  ✓ Citation Accuracy: ${(metrics.citationAccuracyRate * 100).toFixed(1)}% (Exceeds 99.5% requirement)`);
  console.log(`  ✓ Disagreement Preservation: ${(metrics.disagreementPreservationRate * 100).toFixed(1)}%`);
  console.log(`  ✓ Madhhab Attribution Accuracy: ${(metrics.madhhabAttributionAccuracyRate * 100).toFixed(1)}%`);

  if (metrics.hallucinationRate !== 0) {
    throw new Error(`Gate 8 Failed: Non-zero hallucination rate: ${metrics.hallucinationRate}`);
  }
  if (metrics.citationAccuracyRate < 0.995) {
    throw new Error(`Gate 8 Failed: Citation accuracy below 99.5%: ${metrics.citationAccuracyRate}`);
  }
  if (metrics.madhhabAttributionAccuracyRate !== 1.0) {
    throw new Error(`Gate 8 Failed: Attribution accuracy below 100%: ${metrics.madhhabAttributionAccuracyRate}`);
  }

  console.log('\n======================================================================');
  console.log('✅ ALL 8 UNIVERSAL SUNNI KNOWLEDGE VERIFICATION GATES PASSED (100%)');
  console.log('======================================================================\n');
}

runUniversalKnowledgeVerification().catch((err) => {
  console.error('\n❌ UNIVERSAL KNOWLEDGE VERIFICATION FAILED:', err);
  process.exit(1);
});
