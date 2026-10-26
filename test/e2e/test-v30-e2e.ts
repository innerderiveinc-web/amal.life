/**
 * AMAL OS V3.0 — MASTER ECOSYSTEM PLATFORM VERIFICATION
 * End-to-End 14-Gate Integration Suite: Consumer, Scholar, Family, Institution, Knowledge, API, Partner & Governance.
 */

import { EcosystemService } from '../services/api/src/modules/ecosystem/ecosystem.service.js';
import { ApiRouter } from '../services/api/src/router.js';

async function runV30Verification(): Promise<void> {
  console.log('======================================================================');
  console.log('AMAL OS V3.0 — ECOSYSTEM PLATFORM MASTER VERIFICATION');
  console.log('======================================================================');
  console.log('• Non-Negotiable: Master Trust Invariant Across All Tenants');
  console.log('• Non-Negotiable: Two-Scholar Dual Jurist Rule & Plurality Modeling');
  console.log('• Non-Negotiable: Zero Domestic Surveillance & Reflection Vault Isolation');
  console.log('• Non-Negotiable: Global Knowledge Lock & Immutable Releases');
  console.log('• Non-Negotiable: Least-Privilege API Scopes & Zero Religious Ad Targeting');
  console.log('----------------------------------------------------------------------\n');

  const ecosystemService = new EcosystemService();
  const router = new ApiRouter();

  // ------------------------------------------------------------------
  // GATE 1: Multi-Tenancy Architecture & Boundary Isolation
  // ------------------------------------------------------------------
  console.log('[GATE 1] Validating Multi-Tenancy Architecture & Boundary Isolation...');
  const mosqueTenant = ecosystemService.getTenant('tnt_mosque_central');
  if (!mosqueTenant || mosqueTenant.tenantType !== 'MOSQUE') {
    throw new Error('Gate 1 Failed: Mosque tenant failed to load.');
  }

  // Verify cross-tenant access denial
  let crossTenantBlocked = false;
  try {
    ecosystemService.assertTenantAccess('usr_seeker_101', 'tnt_school_andalus', 'VIEW_STUDENT_ROSTER');
  } catch (err: any) {
    if (err.message.includes('TENANT_DATA_ISOLATION_VIOLATION')) {
      crossTenantBlocked = true;
    }
  }
  if (!crossTenantBlocked) {
    throw new Error('Gate 1 Failed: Foreign user was not blocked from school tenant!');
  }
  console.log('  ✓ Gate 1: Multi-tenant boundaries strictly partitioned (Individual, Family, Mosque, School).');

  // ------------------------------------------------------------------
  // GATE 2: Scholar OS V2 Triage, SLA & Two-Scholar Dual Jurist Rule (INV_07)
  // ------------------------------------------------------------------
  console.log('\n[GATE 2] Validating Scholar OS V2 Triage & Two-Scholar Dual Jurist Rule...');
  const newCase = ecosystemService.createScholarCase({
    userId: 'usr_seeker_101',
    tenantId: 'tnt_individual_demo',
    category: 'COMMERCIAL_LAW',
    urgency: 'ELEVATED',
    userQuestion: 'Is investing in high-growth tech ETFs permissible under modern AAOIFI standards?',
    evidenceRefIds: ['QURAN_2_275', 'BUKHARI_2083']
  });

  if (newCase.slaTargetHours !== 24) {
    throw new Error('Gate 2 Failed: SLA target hours miscalculated.');
  }

  // Attempt self-approval (must fail under INV_07)
  let selfConcurrenceBlocked = false;
  try {
    ecosystemService.respondWithTwoScholarRule({
      caseId: newCase.caseId,
      primaryScholarId: 'sch_mufti_tariq',
      secondaryScholarId: 'sch_mufti_tariq',
      responseContent: 'Investments compliant subject to debt screening.'
    });
  } catch (err: any) {
    if (err.message.includes('INV_07_VIOLATION')) {
      selfConcurrenceBlocked = true;
    }
  }
  if (!selfConcurrenceBlocked) {
    throw new Error('Gate 2 Failed: Single-scholar self-concurrence was not blocked!');
  }

  // Valid response with two distinct jurists
  const validResponse = ecosystemService.respondWithTwoScholarRule({
    caseId: newCase.caseId,
    primaryScholarId: 'sch_mufti_tariq',
    secondaryScholarId: 'sch_dr_maryam',
    responseContent: 'Permissible provided interest-bearing debt ratio is below 33% per AAOIFI Standard No. 21.'
  });
  if (validResponse.status !== 'RESPONDED') {
    throw new Error('Gate 2 Failed: Valid two-scholar response not accepted.');
  }
  console.log(`  ✓ Gate 2: Case ${newCase.caseId} resolved with Dual Jurist certification (INV_07).`);

  // ------------------------------------------------------------------
  // GATE 3: Scholarly Plurality & Disagreement System
  // ------------------------------------------------------------------
  console.log('\n[GATE 3] Validating Scholarly Plurality & Disagreement System...');
  const disagreement = ecosystemService.getDisagreementIssue('iss_zakat_retirement_401k');
  if (!disagreement || disagreement.positions.length < 2) {
    throw new Error('Gate 3 Failed: Scholarly plurality record missing.');
  }
  if (disagreement.consensusReached) {
    throw new Error('Gate 3 Failed: False consensus claimed on disputed contemporary Fiqh issue.');
  }
  console.log(`  ✓ Gate 3: Plurality preserved: "${disagreement.topic}" presents ${disagreement.positions.length} legitimate positions.`);

  // ------------------------------------------------------------------
  // GATE 4: Scholar Appeal Lifecycle
  // ------------------------------------------------------------------
  console.log('\n[GATE 4] Validating Scholar Appeal Flow...');
  const appeal = ecosystemService.appealScholarCase({
    caseId: newCase.caseId,
    userId: 'usr_seeker_101',
    reason: 'Seeker requests clarification from a Shafi\'i perspective.',
    newSecondaryScholarId: 'sch_dr_maryam'
  });
  if (appeal.status !== 'SUBMITTED') {
    throw new Error('Gate 4 Failed: Appeal submission failed.');
  }
  console.log(`  ✓ Gate 4: Case appeal registered (${appeal.appealId}) for secondary review without harassment.`);

  // ------------------------------------------------------------------
  // GATE 5: Scholar Knowledge Proposals Enter Governance Pipeline
  // ------------------------------------------------------------------
  console.log('\n[GATE 5] Validating Scholar Knowledge Proposal Governance Pipeline...');
  const proposal = ecosystemService.proposeKnowledgeContribution({
    scholarId: 'sch_mufti_tariq',
    proposalType: 'CORRECTION',
    content: { note: 'Refined modern translation for contractual terms in Al-Buyu' }
  });
  // Section 13: Scholar Submission != Automatically Published Knowledge
  if (proposal.governanceStatus !== 'IN_GOVERNANCE') {
    throw new Error('Gate 5 Failed: Proposal bypassed governance pipeline!');
  }
  console.log(`  ✓ Gate 5: Scholar proposal staged: status=${proposal.governanceStatus} (Never auto-published).`);

  // ------------------------------------------------------------------
  // GATE 6: Family OS V2 Governed Sharing & Invariant INV_03 Reflection Vault
  // ------------------------------------------------------------------
  console.log('\n[GATE 6] Validating Family OS V2 Sharing & Domestic Privacy (INV_03)...');
  const familyShare = ecosystemService.createFamilyShare({
    familyTenantId: 'tnt_family_demo',
    ownerId: 'usr_parent_head',
    resourceType: 'SHARED_GOAL',
    resourceId: 'goal_family_ramadan_khatm',
    sharedWithUserId: 'usr_spouse_adult',
    permission: 'READ',
    purpose: 'Shared household Ramadan Quran coordination'
  });
  if (!familyShare.shareId) throw new Error('Gate 6 Failed: Family share creation failed.');

  // Attempt to access adult reflection vault (INV_03 must block)
  let reflectionAccessBlocked = false;
  try {
    ecosystemService.assertFamilyBoundary({
      requestorUserId: 'usr_parent_head',
      ownerUserId: 'usr_spouse_adult',
      resourceType: 'REFLECTION_VAULT',
      userRole: 'OWNER'
    });
  } catch (err: any) {
    if (err.message.includes('POLICY DENIAL (INV_03)')) {
      reflectionAccessBlocked = true;
    }
  }
  if (!reflectionAccessBlocked) {
    throw new Error('Gate 6 Failed: INV_03 reflection vault violation allowed in family!');
  }
  console.log('  ✓ Gate 6: Shared family goals permitted; Adult Reflection Vault strictly isolated (INV_03).');

  // ------------------------------------------------------------------
  // GATE 7: Institution OS Programs & Content Classification
  // ------------------------------------------------------------------
  console.log('\n[GATE 7] Validating Institution OS Programs & Content Classification...');
  const newProgram = ecosystemService.createInstitutionProgram({
    institutionTenantId: 'tnt_mosque_central',
    title: 'Hajj Pilgrimage Preparation Workshop',
    domain: 'HAJJ',
    description: '4-week preparatory logistics and spiritual readiness seminar.'
  });
  // Section 23: Must be INSTITUTIONAL_CONTENT, never auto ISLAMIC_AUTHORITY
  if (newProgram.contentClassification !== 'INSTITUTIONAL_CONTENT') {
    throw new Error('Gate 7 Failed: Institutional content not classified properly.');
  }

  let authorityOverreachBlocked = false;
  try {
    ecosystemService.assertInstitutionPrivacy('ADMIN', 'PRIVATE_REFLECTION');
  } catch (err: any) {
    if (err.message.includes('INSTITUTION_PRIVACY_VIOLATION')) {
      authorityOverreachBlocked = true;
    }
  }
  if (!authorityOverreachBlocked) {
    throw new Error('Gate 7 Failed: Institution admin was not blocked from private reflections!');
  }
  console.log('  ✓ Gate 7: Institutional program created with INSTITUTIONAL_CONTENT tag & privacy bounds.');

  // ------------------------------------------------------------------
  // GATE 8: Institution Aggregate Analytics
  // ------------------------------------------------------------------
  console.log('\n[GATE 8] Validating Institution Aggregate Analytics...');
  ecosystemService.enrollInProgram(newProgram.programId, 'usr_seeker_101');
  ecosystemService.completeProgram(newProgram.programId, 'usr_seeker_101');
  const analytics = ecosystemService.getInstitutionAnalytics('tnt_mosque_central', newProgram.programId);
  if (analytics.enrolledCount !== 1 || analytics.completedCount !== 1 || !analytics.individualReligiousTrackingDisabled) {
    throw new Error('Gate 8 Failed: Aggregate analytics miscalculated or individual tracking enabled.');
  }
  console.log(`  ✓ Gate 8: Aggregate analytics: 100% completion rate, individual religious profiling disabled.`);

  // ------------------------------------------------------------------
  // GATE 9: Knowledge Platform V3 Source Registry & Merkle Releases
  // ------------------------------------------------------------------
  console.log('\n[GATE 9] Validating Knowledge Platform V3 Source Registry & Releases...');
  const activeRelease = ecosystemService.getActiveKnowledgeRelease();
  if (!activeRelease.immutableRootHash.startsWith('merkle:')) {
    throw new Error('Gate 9 Failed: Active release root hash is invalid.');
  }

  // Test rollback
  const rolledBack = ecosystemService.rollbackKnowledgeRelease('KNOWLEDGE_RELEASE_1', 'Rollback drill test');
  if (rolledBack.releaseId !== 'KNOWLEDGE_RELEASE_1') {
    throw new Error('Gate 9 Failed: Knowledge rollback failed.');
  }
  console.log(`  ✓ Gate 9: Active Knowledge Release: ${activeRelease.releaseId} (Root Hash: ${activeRelease.immutableRootHash.substring(0, 20)}...).`);

  // ------------------------------------------------------------------
  // GATE 10: Global Knowledge Lock
  // ------------------------------------------------------------------
  console.log('\n[GATE 10] Validating Global Knowledge Lock...');
  let popularityAlterationBlocked = false;
  try {
    ecosystemService.assertKnowledgeLock('USER_POPULARITY');
  } catch (err: any) {
    if (err.message.includes('GLOBAL_KNOWLEDGE_LOCK_VIOLATION')) {
      popularityAlterationBlocked = true;
    }
  }
  if (!popularityAlterationBlocked) {
    throw new Error('Gate 10 Failed: User popularity allowed to mutate Islamic canon!');
  }
  console.log('  ✓ [DEFENDED] Invariant Enforced: GLOBAL_KNOWLEDGE_LOCK_VIOLATION: Knowledge locked against user popularity or commercial pressure.');

  // ------------------------------------------------------------------
  // GATE 11: Ecosystem API Platform & Least-Privilege Scopes
  // ------------------------------------------------------------------
  console.log('\n[GATE 11] Validating Ecosystem API Scopes & Least-Privilege...');
  // Attempt to register wildcard scope
  let wildcardScopeBlocked = false;
  try {
    ecosystemService.registerApiClient({
      clientId: 'client_malicious_wide',
      partnerId: 'part_hajj_makkah_tours',
      appName: 'Data Scraper',
      scopes: ['everything:read' as any]
    });
  } catch (err: any) {
    if (err.message.includes('UNAUTHORIZED_WILDCARD_SCOPE')) {
      wildcardScopeBlocked = true;
    }
  }
  if (!wildcardScopeBlocked) {
    throw new Error('Gate 11 Failed: Wildcard scope everything:read was allowed!');
  }

  const token = ecosystemService.issueOAuthToken({
    clientId: 'client_makkah_portal_app',
    userId: 'usr_seeker_101',
    requestedScopes: ['journeys:read']
  });
  const granted = ecosystemService.assertApiScope(token.accessToken, 'journeys:read');
  if (!granted.userId) throw new Error('Gate 11 Failed: Scope validation failed.');
  console.log('  ✓ Gate 11: OAuth 2.x Token issued with least-privilege scopes; wildcard scopes blocked.');

  // ------------------------------------------------------------------
  // GATE 12: Cryptographic Webhooks & Replay Protection
  // ------------------------------------------------------------------
  console.log('\n[GATE 12] Validating Cryptographic Webhooks & Replay Protection...');
  const webhookSecret = 'sec_webhook_super_secret_test_key_123';
  ecosystemService.registerWebhook({
    subscriptionId: 'sub_journey_events',
    clientId: 'client_makkah_portal_app',
    targetUrl: 'https://partner.makkah.example/events',
    eventTypes: ['journey.completed'],
    secret: webhookSecret
  });

  const payload = JSON.stringify({ event: 'journey.completed', userId: 'usr_seeker_101' });
  const sig = ecosystemService.signWebhookPayload(payload, webhookSecret);
  const eventId = `evt_webhook_${Date.now()}`;

  // First consumption succeeds
  ecosystemService.verifyWebhookEvent({ eventId, payload, receivedSignature: sig, secret: webhookSecret });

  // Second consumption fails (replay attack)
  let replayBlocked = false;
  try {
    ecosystemService.verifyWebhookEvent({ eventId, payload, receivedSignature: sig, secret: webhookSecret });
  } catch (err: any) {
    if (err.message.includes('WEBHOOK_REPLAY_ATTACK')) {
      replayBlocked = true;
    }
  }
  if (!replayBlocked) {
    throw new Error('Gate 12 Failed: Webhook replay attack succeeded!');
  }
  console.log('  ✓ Gate 12: Webhook HMAC verified; Replay Attack detected and blocked.');

  // ------------------------------------------------------------------
  // GATE 13: Partner Governance & Prohibition of Selling Data / Ad Profiling
  // ------------------------------------------------------------------
  console.log('\n[GATE 13] Validating Partner Governance & Ethics Restrictions...');
  let adProfilingBlocked = false;
  try {
    ecosystemService.assertPartnerProhibitedActivity('BUILD_ADVERTISING_PROFILES');
  } catch (err: any) {
    if (err.message.includes('PARTNER_ETHICS_VIOLATION')) {
      adProfilingBlocked = true;
    }
  }
  if (!adProfilingBlocked) {
    throw new Error('Gate 13 Failed: Partner ad profiling was allowed!');
  }

  // Suspend partner
  ecosystemService.suspendPartner('part_hajj_makkah_tours', 'Routine compliance audit');
  let suspendedClientBlocked = false;
  try {
    ecosystemService.issueOAuthToken({
      clientId: 'client_makkah_portal_app',
      userId: 'usr_seeker_101',
      requestedScopes: ['journeys:read']
    });
  } catch (err: any) {
    if (err.message.includes('API_CLIENT_INACTIVE')) {
      suspendedClientBlocked = true;
    }
  }
  if (!suspendedClientBlocked) {
    throw new Error('Gate 13 Failed: Suspended partner client still issued tokens!');
  }
  console.log('  ✓ Gate 13: Prohibited ad profiling blocked; Partner suspension cascaded to client keys.');

  // ------------------------------------------------------------------
  // GATE 14: Platform Governance & Global Safe Mode
  // ------------------------------------------------------------------
  console.log('\n[GATE 14] Validating Platform Governance & Global Safe Mode...');
  const safeMode = ecosystemService.enableGlobalSafeMode('Simulated upstream cloud incident', 'admin_security_ops');
  if (!safeMode.enabled || safeMode.activeTier !== 'CORE_DETERMINISTIC_ONLY') {
    throw new Error('Gate 14 Failed: Global Safe Mode activation failed.');
  }

  // Attempt advanced feature in Safe Mode (must fail)
  let advancedFeatureBlocked = false;
  try {
    ecosystemService.createScholarCase({
      userId: 'usr_seeker_101',
      tenantId: 'tnt_individual_demo',
      category: 'GENERAL',
      userQuestion: 'Test query'
    });
  } catch (err: any) {
    if (err.message.includes('GLOBAL_SAFE_MODE_ENGAGED')) {
      advancedFeatureBlocked = true;
    }
  }
  if (!advancedFeatureBlocked) {
    throw new Error('Gate 14 Failed: Advanced feature allowed during Global Safe Mode!');
  }

  // Restore normal operations
  ecosystemService.disableGlobalSafeMode();
  console.log('  ✓ Gate 14: Global Safe Mode engaged and restored flawlessly.');

  console.log('\n======================================================================');
  console.log('★ AMAL OS V3.0 ECOSYSTEM PLATFORM RELEASE: ALL 14 GATES PASS (100%)');
  console.log('======================================================================\n');
}

runV30Verification().catch((err) => {
  console.error('\n❌ AMAL OS V3.0 VERIFICATION FAILED:', err);
  process.exit(1);
});
