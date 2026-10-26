/**
 * AMAL OS Unit Tests: Scholar Governance & Two-Person Rule (INV_07)
 */
import { ScholarApiClient, ScholarCaseRecord, QuarantinedClaimRecord } from '../../apps/scholar/src/lib/api';

export async function runScholarGovernanceTests(): Promise<boolean> {
  console.log('[Test Suite] Running Scholar Governance & Invariant INV_07 Tests...');

  // 1. Fetch cases from Scholar API client
  const cases: ScholarCaseRecord[] = await ScholarApiClient.getCases();
  if (!cases || cases.length === 0) {
    throw new Error('Expected scholar cases in queue, found 0');
  }

  // 2. Invariant INV_07: Check Two-Person Rule validation
  for (const c of cases) {
    if (c.status === 'RESOLVED') {
      // Must have both primary determination AND concurrence
      if (!c.primaryDetermination) {
        throw new Error(`Resolved case ${c.caseId} missing primary determination`);
      }
      if (!c.concurrence || c.concurrence.decision !== 'CONCUR') {
        throw new Error(`Resolved case ${c.caseId} violated Two-Person Rule INV_07: missing concurrence`);
      }
      if (c.primaryDetermination.scholarId === c.concurrence.scholarId) {
        throw new Error(`Resolved case ${c.caseId} violated independence: same scholar concurred on own ruling`);
      }
    }
  }

  // 3. Draft primary response test
  const testCase = cases[0];
  const draftResult = await ScholarApiClient.submitDraftResponse(
    testCase.caseId,
    'sch_dr_tariq_al_hashimi',
    'Preliminary determination under Hanafi & Shafi madhhab consensus.'
  );
  if (!draftResult.success) {
    throw new Error(`Failed to draft primary response: ${draftResult.error}`);
  }

  // 4. Concurrence signoff test
  const concurResult = await ScholarApiClient.submitSecondScholarSignoff(
    testCase.caseId,
    'sch_sheikh_amina_farooq',
    'Verified and concurred with classical fiqh sources.'
  );
  if (!concurResult.success) {
    throw new Error(`Failed to submit concurrence signoff: ${concurResult.error}`);
  }

  // 5. Quarantine desk tests
  const quarantinedClaims: QuarantinedClaimRecord[] = await ScholarApiClient.getQuarantinedClaims();
  if (!quarantinedClaims || quarantinedClaims.length === 0) {
    throw new Error('Expected quarantined claims in queue, found 0');
  }

  const claimResult = await ScholarApiClient.signoffClaim(
    quarantinedClaims[0].claimId,
    'sch_dr_tariq_al_hashimi',
    'APPROVE',
    'Approved with explicit medical qualification.'
  );
  if (!claimResult.success) {
    throw new Error(`Failed to signoff quarantine claim: ${claimResult.error}`);
  }

  console.log('✓ Scholar Governance unit tests passed (INV_07 Two-Person Rule, Queue Triage, Quarantine Desk verified).');
  return true;
}

// Auto-run if executed directly via tsx
runScholarGovernanceTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
