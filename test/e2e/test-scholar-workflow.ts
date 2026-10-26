/**
 * AMAL OS — Live Two-Scholar Workflow Verification Script
 * Validates the Class D Fatwa Triage Desk and Invariant INV_07 (Two-Scholar Dual Jurist Rule).
 */

import { ScholarsController } from '../services/api/src/modules/scholars/scholars.controller.js';
import { AuthenticatedUser } from '../services/api/src/common/auth/auth.types.js';

async function runScholarVerification() {
  console.log('======================================================================');
  console.log('AMAL OS — SCHOLAR PORTAL & TWO-PERSON JURISTIC TRIAGE LIVE TEST');
  console.log('======================================================================');

  const controller = new ScholarsController();
  const mockUser: AuthenticatedUser = {
    userId: 'usr_seeker_901',
    roles: ['USER'],
  };

  // 1. Check directory of verified scholars
  console.log('[STEP 1] Listing Certified Scholars Directory...');
  const scholars = await controller.listScholars();
  console.log(`  ✓ Found ${scholars.length} verified scholars: ${scholars.map(s => s.name).join(', ')}`);
  if (scholars.length < 2) throw new Error('Less than 2 certified scholars available.');

  // 2. Fetch pending cases in triage queue
  console.log('\n[STEP 2] Fetching Class D Juristic Triage Queue...');
  const cases = await controller.listCases();
  console.log(`  ✓ Total cases in queue: ${cases.length}`);
  const targetCase = cases[0];
  if (!targetCase) throw new Error('No cases found in triage queue.');
  console.log(`  ✓ Selected Target Case: [${targetCase.caseId}] (${targetCase.category})`);
  console.log(`    Question: "${targetCase.userQuestion}"`);

  // 3. Step 1 of Two-Person Rule: Primary Scholar drafts response
  console.log('\n[STEP 3] Primary Jurist (Dr. Tariq Al-Hashimi) Submits Determination...');
  const draftResult = await controller.submitDraftResponse(targetCase.caseId, {
    scholarId: 'sch_dr_tariq',
    responseText: 'In the Name of Allah. Words uttered under total clouding of intellect and involuntary severe anger (Ighlaq) do not effectuate divorce according to the authentic hadith in Sunan Abi Dawud (2193) and the verified Hanbali and Hanafi tahqiq.',
  });
  console.log(`  ✓ Primary response submitted. Status: ${draftResult.case.status}`);
  if (draftResult.case.status !== 'AWAITING_SECOND_SCHOLAR') {
    throw new Error('Case did not transition to AWAITING_SECOND_SCHOLAR.');
  }

  // 4. Test Invariant Enforcement: Self-Concurrence MUST be blocked
  console.log('\n[STEP 4] Testing Invariant INV_07 (Two-Scholar Rule Violation Intercept)...');
  let invariantProtected = false;
  try {
    await controller.submitSecondScholarSignoff(targetCase.caseId, {
      scholarId: 'sch_dr_tariq', // Same scholar attempting to self-concur!
      concurrenceNotes: 'I concur with my own verdict.',
    });
  } catch (err: any) {
    if (err.message && err.message.includes('Two-Scholar Rule')) {
      invariantProtected = true;
      console.log(`  ✓ [BLOCKED AS EXPECTED] ${err.message}`);
    } else {
      throw err;
    }
  }

  if (!invariantProtected) {
    throw new Error('CRITICAL FLAW: Single scholar was able to self-approve a Class D ruling!');
  }

  // 5. Step 2 of Two-Person Rule: Independent Secondary Scholar concurs
  console.log('\n[STEP 5] Secondary Jurist (Sheikha Amina Farooq) Reviews & Concurs...');
  const concurResult = await controller.submitSecondScholarSignoff(targetCase.caseId, {
    scholarId: 'sch_sheikh_amina',
    concurrenceNotes: 'Concurred. The condition of extreme distress eliminates conscious intent (Qasd), which is an essential pillar (Rukn) for legal pronouncements.',
  });

  console.log(`  ✓ Second Jurist Concurrence Complete!`);
  console.log(`  ✓ Status: ${concurResult.case.status}`);
  console.log(`  ✓ Two-Person Rule Satisfied: ${concurResult.case.twoPersonRuleSatisfied}`);
  console.log(`  ✓ Cryptographic Proof Hash: ${concurResult.case.proofHash}`);

  if (!concurResult.case.proofHash || !concurResult.case.twoPersonRuleSatisfied) {
    throw new Error('Two-person rule or proof hash missing from finalized case.');
  }

  // 6. Test Quarantine Signoff Workflow
  console.log('\n[STEP 6] Testing Knowledge Quarantine Review Desk...');
  const quarantined = await controller.listQuarantinedClaims();
  console.log(`  ✓ Quarantined claims in queue: ${quarantined.length}`);
  const targetClaim = quarantined[0];
  if (!targetClaim) throw new Error('No quarantined claim found.');

  const signoffResult = await controller.signoffClaim(targetClaim.claimId, {
    scholarId: 'sch_dr_tariq',
    decision: 'REJECT',
    notes: 'Contradicts verified contemporary juristic consensus of international councils.',
  });
  console.log(`  ✓ Claim [${targetClaim.claimId}] evaluated by Scholar: Status=${signoffResult.claim.status}`);

  console.log('\n======================================================================');
  console.log('★ SCHOLAR PORTAL & TWO-PERSON JURISTIC TRIAGE: 100% PASS');
  console.log('======================================================================');
}

runScholarVerification().catch((err) => {
  console.error('Scholar verification test failed:', err);
  process.exit(1);
});
