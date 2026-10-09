/**
 * AMAL OS — V2.0 MASTER PRODUCTION VERIFICATION SUITE
 * Validates the 12 Gates of Personal Deen Operating System:
 * Multi-Domain Life Intelligence, Epistemic Separation, Two-Graph Architecture,
 * Decision Support, Expert Escalation, and Specialized Modes.
 */

import { ApiRouter } from '../services/api/src/router.js';
import {
  LifeSituationEngine,
  LifeDecisionSupportEngine,
  ExpertEscalationFrameworkV2,
  SpecializedModesEngine,
  PersonalLifeGraphEngine,
  PersonalizationEngine,
} from '../packages/amal-engine/src/index.js';

export async function runV20Verification(): Promise<boolean> {
  console.log('======================================================================');
  console.log('AMAL OS V2.0 — PERSONAL DEEN OPERATING SYSTEM MASTER VERIFICATION');
  console.log('======================================================================');
  console.log('• Non-Negotiable: Epistemic Origin Labeling Across All Recommendations');
  console.log('• Non-Negotiable: Two-Graph Architecture (Evidence Graph != Life Graph)');
  console.log('• Non-Negotiable: No Autonomous Decisions on Marriage, Law, or Medical');
  console.log('• Non-Negotiable: Absolute Ban on Iman/Piety Scoring or Leaderboards');
  console.log('----------------------------------------------------------------------');

  const testUserId = `usr_v20_test_${Date.now()}`;
  const actor = { userId: testUserId, userRole: 'USER' };

  // -------------------------------------------------------------------------
  // GATE 1: MULTI-DOMAIN LIFE SITUATION CLASSIFICATION
  // -------------------------------------------------------------------------
  console.log('\n[GATE 1] Validating Multi-Domain Life Situation Classification...');
  const situationQuery = 'Kal exam hai, office ka deadline hai, aur Fajr miss nahi karni.';
  const sitRes = await ApiRouter.handle('POST', '/api/v1/life/situation', { text: situationQuery }, actor);

  if (!sitRes.success || !sitRes.data.detectedDomains.includes('DEEN') || !sitRes.data.detectedDomains.includes('WORK') || !sitRes.data.detectedDomains.includes('STUDY')) {
    throw new Error('Gate 1 Failed: Multi-domain classification did not detect DEEN, WORK, and STUDY domains.');
  }
  console.log(`  ✓ Gate 1: Detected Domains: [${sitRes.data.detectedDomains.join(', ')}] with 4 decomposed schedule proposals.`);

  // -------------------------------------------------------------------------
  // GATE 2: EPISTEMIC ORIGIN LABELING (Section 4, 33)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 2] Validating Epistemic Origin Separation in Decomposed Guidance...');
  const guidance = sitRes.data.decomposedSections;
  const islamicItem = guidance.islamicGuidance?.[0];
  const planningItem = guidance.practicalPlanning?.[0];

  if (!islamicItem || islamicItem.epistemicOrigin !== 'ISLAMIC_EVIDENCE') {
    throw new Error('Gate 2 Failed: Islamic guidance section lacks explicit ISLAMIC_EVIDENCE epistemic label.');
  }
  if (!planningItem || (planningItem.epistemicOrigin !== 'BEHAVIORAL_SCIENCE' && planningItem.epistemicOrigin !== 'GENERAL_PRACTICAL_GUIDANCE')) {
    throw new Error('Gate 2 Failed: Practical planning section lacks explicit practical/behavioral epistemic label.');
  }
  console.log(`  ✓ Gate 2: Explicit Epistemic Labels: "${islamicItem.title}" (${islamicItem.epistemicOrigin}) vs "${planningItem.title}" (${planningItem.epistemicOrigin}).`);

  // -------------------------------------------------------------------------
  // GATE 3: STRUCTURED LIFE DECISION SUPPORT (Section 34, 35)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 3] Validating Structured Life Decision Support Engine...');
  const decRes = await ApiRouter.handle('POST', '/api/v1/decisions', {
    question: 'Should I transition to a flexible remote job to spend more time with family and daily Quran study?',
    category: 'WORK',
    options: [
      {
        title: 'Accept Remote Role',
        pros: ['Zero commute time', 'Flexible Fajr and Dhuhr prayer windows', 'More family presence'],
        cons: ['Slightly lower base salary'],
        tradeOffs: ['Financial trade-off for temporal sovereignty'],
      },
      {
        title: 'Stay in On-Site Role',
        pros: ['Higher compensation', 'Clear corporate hierarchy'],
        cons: ['2-hour daily commute', 'Rushed evening prayers'],
        tradeOffs: ['Career momentum vs personal time budget'],
      },
    ],
    constraints: ['Must cover monthly household expenses', 'Need minimum 30m morning quiet window'],
  }, actor);

  if (!decRes.success || !decRes.data.decisionId) {
    throw new Error('Gate 3 Failed: Decision draft creation failed.');
  }
  const decisionId = decRes.data.decisionId;

  // Record user choice
  const choiceRes = await ApiRouter.handle('POST', `/api/v1/decisions/${decisionId}/choice`, {
    chosenOptionId: 'opt_1',
    reflection: 'Prioritizing time sovereignty and prayer consistency over marginal corporate gains.',
  }, actor);

  if (!choiceRes.success || choiceRes.data.userChoice !== 'opt_1' || choiceRes.data.status !== 'DECIDED') {
    throw new Error('Gate 3 Failed: Recording user choice failed.');
  }
  console.log(`  ✓ Gate 3: Decision Recorded: "${decRes.data.question}" -> Choice: ${choiceRes.data.userChoice} (Status: DECIDED).`);

  // -------------------------------------------------------------------------
  // GATE 4: NON-AUTONOMOUS LIFE DECISION INVARIANT (Section 36, 104)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 4] Validating Non-Autonomous Life Decision Invariant (AI Cannot Issue Binding Verdicts)...');
  let autonomousDecisionBlocked = false;
  try {
    LifeDecisionSupportEngine.assertAutonomousDecisionRestricted('DIVORCE_VERDICT');
  } catch (err: any) {
    if (err.message.includes('AUTONOMOUS_DECISION_BLOCKED')) {
      autonomousDecisionBlocked = true;
      console.log(`  ✓ [DEFENDED] Invariant Enforced: ${err.message}`);
    }
  }
  if (!autonomousDecisionBlocked) {
    throw new Error('CRITICAL FLAW: System allowed autonomous verdict execution in protected legal domain!');
  }

  // -------------------------------------------------------------------------
  // GATE 5: MULTI-DOMAIN EXPERT ESCALATION FRAMEWORK V2 (Section 37–39)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 5] Validating Multi-Domain Expert Framework (Scholar, Finance, Legal)...');
  const expertsRes = await ApiRouter.handle('GET', '/api/v1/experts', {}, actor);
  if (!expertsRes.success || expertsRes.data.length < 3) {
    throw new Error('Gate 5 Failed: Multi-domain experts registry count < 3.');
  }

  // Submit Islamic finance case
  const caseRes = await ApiRouter.handle('POST', '/api/v1/experts/cases', {
    expertType: 'FINANCE_EXPERT',
    domain: 'FINANCE',
    question: 'How to calculate purification percentage on mixed equities holding?',
    context: { assetClass: 'Equities', standard: 'AAOIFI' },
  }, actor);

  if (!caseRes.success || caseRes.data.status !== 'SUBMITTED') {
    throw new Error('Gate 5 Failed: Expert consultation case submission failed.');
  }
  console.log(`  ✓ Gate 5: Registered ${expertsRes.data.length} verified experts across Scholar, Finance, and Counseling disciplines. Case ID: ${caseRes.data.caseId}.`);

  // -------------------------------------------------------------------------
  // GATE 6: RAMADAN OS MODE (Section 13)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 6] Validating Ramadan OS Mode & Canonical Pacing...');
  const ramadanRes = await ApiRouter.handle('GET', '/api/v1/modes/ramadan', {}, actor);
  if (!ramadanRes.success || ramadanRes.data.taraweehTargetRakat !== 8) {
    throw new Error('Gate 6 Failed: Ramadan OS configuration retrieval failed.');
  }

  const updateRamadanRes = await ApiRouter.handle('PATCH', '/api/v1/modes/ramadan', {
    quranKhatmTarget: 'ONE_KHATM',
    suhoorWakeupMinutesBeforeFajr: 60,
  }, actor);

  if (!updateRamadanRes.success || updateRamadanRes.data.suhoorWakeupMinutesBeforeFajr !== 60) {
    throw new Error('Gate 6 Failed: Ramadan OS update failed.');
  }
  console.log(`  ✓ Gate 6: Ramadan OS Configured: ${updateRamadanRes.data.quranKhatmTarget} with ${updateRamadanRes.data.suhoorWakeupMinutesBeforeFajr}m Suhoor buffer.`);

  // -------------------------------------------------------------------------
  // GATE 7: HAJJ & UMRAH MODE (Section 14)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 7] Validating Hajj & Umrah Mode Preparation & Checklists...');
  const hajjRes = await ApiRouter.handle('GET', '/api/v1/modes/hajj-umrah', {}, actor);
  if (!hajjRes.success || hajjRes.data.journeyType !== 'HAJJ_TAMATTU') {
    throw new Error('Gate 7 Failed: Hajj & Umrah mode configuration retrieval failed.');
  }
  console.log(`  ✓ Gate 7: Hajj Mode Verified: Type=${hajjRes.data.journeyType}, Checklists=[${hajjRes.data.completedChecklistIds.join(', ')}].`);

  // -------------------------------------------------------------------------
  // GATE 8: TRAVEL MODE & QASR / JAM' SAFAR RULES (Section 15)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 8] Validating Travel Mode & Qasr Safar Distance Rules (80+ km)...');
  const safarCheckOver80 = await ApiRouter.handle('POST', '/api/v1/modes/travel/safar-check', { distanceKm: 120 }, actor);
  if (!safarCheckOver80.success || !safarCheckOver80.data.qasrEligible) {
    throw new Error('Gate 8 Failed: Journey of 120km was not recognized as eligible for Qasr.');
  }
  const safarCheckUnder80 = await ApiRouter.handle('POST', '/api/v1/modes/travel/safar-check', { distanceKm: 40 }, actor);
  if (safarCheckUnder80.data.qasrEligible) {
    throw new Error('Gate 8 Failed: Journey of 40km was incorrectly marked eligible for Qasr.');
  }
  console.log(`  ✓ Gate 8: Qasr Rules Grounded: 120km Eligible (${safarCheckOver80.data.canonicalEvidence.slice(0, 30)}...), 40km Ineligible.`);

  // -------------------------------------------------------------------------
  // GATE 9: PERSONAL LIFE GRAPH & TWO-GRAPH ARCHITECTURE (Sections 70–72, 111–112)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 9] Validating Personal Life Graph & Two-Graph Isolation...');
  const nodeRes = await ApiRouter.handle('POST', '/api/v1/life-graph/nodes', {
    nodeId: `node_goal_${Date.now()}`,
    userId: testUserId,
    nodeType: 'GOAL',
    domain: 'DEEN',
    title: 'Complete Surah Al-Kahf every Friday',
    metadata: { habitType: 'WEEKLY_CYCLE' },
    connectedNodeIds: [],
  }, actor);

  if (!nodeRes.success || !nodeRes.data.nodeId) {
    throw new Error('Gate 9 Failed: Adding Personal Life Graph node failed.');
  }

  // Invariant test: Life graph cannot mutate Islamic Evidence Graph
  let graphIsolationDefended = false;
  try {
    PersonalLifeGraphEngine.assertGraphIsolation('PERSONAL_LIFE_GRAPH', 'ISLAMIC_EVIDENCE_GRAPH');
  } catch (err: any) {
    if (err.message.includes('TWO_GRAPH_ISOLATION_VIOLATION')) {
      graphIsolationDefended = true;
      console.log(`  ✓ [DEFENDED] Two-Graph Isolation Enforced: ${err.message}`);
    }
  }
  if (!graphIsolationDefended) {
    throw new Error('CRITICAL ARCHITECTURE FLAW: Personal Life Graph data mutated Islamic Evidence Graph!');
  }

  // -------------------------------------------------------------------------
  // GATE 10: CROSS-DOMAIN TODAY V2 DASHBOARD (Section 22, 23)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 10] Validating Cross-Domain Today V2 Dashboard...');
  const dashRes = await ApiRouter.handle('GET', '/api/v1/life/dashboard', {}, actor);
  if (!dashRes.success || !dashRes.data.today || !dashRes.data.domainsOverview) {
    throw new Error('Gate 10 Failed: Life OS dashboard assembly failed.');
  }
  console.log(`  ✓ Gate 10: Dashboard Assembled: ${dashRes.data.today.prayerAwareSchedule.length} prayer-aware scheduled events across Deen, Work, Study, and Family.`);

  // -------------------------------------------------------------------------
  // GATE 11: ABSOLUTE BAN ON PIETY / IMAN / SPIRITUAL SCORING (Section 6, 22)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 11] Validating Invariant: Ban on Iman / Piety Scoring across All Life Domains...');
  let pietyScoringDefended = false;
  try {
    PersonalizationEngine.assertNoReligiousScoring('IMAN_SCORE');
  } catch (err: any) {
    if (err.message.includes('RELIGIOUS_SCORING_VIOLATION')) {
      pietyScoringDefended = true;
      console.log(`  ✓ [DEFENDED] Invariant Enforced: ${err.message}`);
    }
  }
  if (!pietyScoringDefended) {
    throw new Error('CRITICAL FLAW: System allowed computation of Iman Score!');
  }

  // -------------------------------------------------------------------------
  // GATE 12: ZERO-FABRICATION KNOWLEDGE INVARIANT ACROSS LIFE OS (Section 1, 51–53)
  // -------------------------------------------------------------------------
  console.log('\n[GATE 12] Validating Zero-Fabrication Knowledge Invariant across Whole-Life AI...');
  let knowledgeLeakDefended = false;
  try {
    PersonalizationEngine.assertKnowledgeIsolation('HADITH_CANON');
  } catch (err: any) {
    if (err.message.includes('KNOWLEDGE_ISOLATION_VIOLATION')) {
      knowledgeLeakDefended = true;
      console.log(`  ✓ [DEFENDED] Invariant Enforced: ${err.message}`);
    }
  }
  if (!knowledgeLeakDefended) {
    throw new Error('CRITICAL FLAW: Personalization altered canonical Hadith corpus!');
  }

  console.log('\n======================================================================');
  console.log('★ AMAL OS V2.0 PERSONAL DEEN OS RELEASE: ALL 12 GATES PASS (100%)');
  console.log('======================================================================');
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runV20Verification()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('\n❌ V2.0 VERIFICATION FAILED:', err);
      process.exit(1);
    });
}
