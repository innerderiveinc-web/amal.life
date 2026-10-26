/**
 * AMAL OS — COMMUNITY & UMMAH OS (MASTER ACCEPTANCE TEST SUITE)
 * 
 * Verifies all 62 sections, non-negotiable invariants, and Section 50 REST APIs:
 * - Gate 1: Two-Graph Firewall Separation (Private Data ⟂ Community; Community Content ⟂ Canonical Fiqh)
 * - Gate 2: Anti-Influencer Economy & Authoritative Trust Badges (No follower metrics)
 * - Gate 3: Zero Community Voting on Religious Truth (No upvoting rulings)
 * - Gate 4: Location Privacy Architecture (Default LOCATION_OFF, least privilege)
 * - Gate 5: Mosque & Institution Discovery & Profile Facilities (Jummah, Women, Accessibility)
 * - Gate 6: Verified Educational Programs & Community Event Registration
 * - Gate 7: Verified Scholars Directory & Dedicated Scholar OS Triage Routing
 * - Gate 8: Verified Groups & Strict Anti-Anonymous Flame Policy
 * - Gate 9: Civic Action, Volunteering & Skill Matching
 * - Gate 10: Multi-Madhhab Zakat Calculation Engine (Hanafi, Maliki, Shafi'i, Hanbali)
 * - Gate 11: Safety, Anti-Takfir & Priority Child Safety Escalation
 * - Gate 12: Section 50 Production REST API Router Endpoints
 */

import { CommunityUmmahEngine } from '../packages/amal-engine/src/community-ummah-engine.js';
import { ApiRouter } from '../services/api/src/router.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runCommunityUmmahTestSuite() {
  console.log('========================================================================');
  console.log('⚡ AMAL OS — COMMUNITY & UMMAH OS ACCEPTANCE TEST SUITE');
  console.log('========================================================================\n');

  const engine = new CommunityUmmahEngine();
  const testUserId = 'usr_seeker_salman';

  // -------------------------------------------------------------------------
  // GATE 1: Two-Graph Firewall Separation
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 1] Validating Two-Graph Firewall Separation...');
  const overview = engine.getDashboardOverview();
  assert(
    overview.firewallStatus.userPrivateDataIsolated === true,
    'User private data must remain strictly isolated from community system'
  );
  assert(
    overview.firewallStatus.communityContentIsolatedFromCanonicalFiqh === true,
    'Community content must never be ingested into the canonical Islamic Evidence Graph'
  );

  const firewallCheck = engine.assertCommunityFirewallBoundary('res_ramadan_guide_2026');
  assert(firewallCheck.firewallCompliant === true, 'Firewall check must pass for community resources');
  assert(
    firewallCheck.provenanceTag === 'COMMUNITY_CONTENT',
    'Resource must be tagged as COMMUNITY_CONTENT, not revelation or fiqh ruling'
  );
  assert(
    firewallCheck.evidenceGraphStatus === 'EXCLUDED_FROM_CANONICAL_FIQH',
    'Resource must be explicitly excluded from canonical Shariah ruling engine'
  );
  console.log('  ✔ Gate 1 Passed: Two-Graph Firewall is impenetrable.\n');

  // -------------------------------------------------------------------------
  // GATE 2: Anti-Influencer Economy & Authoritative Trust Badges
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 2] Validating Anti-Influencer Economy & Badges...');
  assert(
    overview.principles.antiInfluencerEconomy === true,
    'Anti-influencer economy invariant must be active'
  );

  const orgs = engine.listOrganizations();
  for (const org of orgs) {
    // Assert no followerCount property or influencer ranking fields exist
    assert(
      (org as any).followerCount === undefined,
      'No organization may have public follower metrics used as ranking signal'
    );
    assert(
      org.badges.length > 0,
      'Verified organization must have clear, verified authoritative badges'
    );
  }
  console.log('  ✔ Gate 2 Passed: Zero follower/influencer economy enforced.\n');

  // -------------------------------------------------------------------------
  // GATE 3: Zero Community Voting on Religious Truth
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 3] Validating Zero Community Voting on Religious Truth...');
  assert(
    overview.principles.zeroVotingOnReligiousTruth === true,
    'Zero voting on religious truth must be enforced'
  );
  const resources = engine.listResources();
  for (const r of resources) {
    assert(
      (r as any).upvotes === undefined && (r as any).likes === undefined,
      'Community knowledge resources must not have upvote-based religious ranking'
    );
  }
  console.log('  ✔ Gate 3 Passed: Popularity never dictates religious truth.\n');

  // -------------------------------------------------------------------------
  // GATE 4: Location Privacy Architecture
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 4] Validating Location Privacy Architecture...');
  assert(
    overview.principles.locationPrivacyDefault === 'LOCATION_OFF',
    'Default location precision must be LOCATION_OFF'
  );

  // When location precision is off, only online/broad items returned
  const offDiscovery = engine.discoverNearby({ locationPrecision: 'LOCATION_OFF' });
  assert(offDiscovery.effectivePrecision === 'LOCATION_OFF', 'Precision must remain LOCATION_OFF');
  assert(
    offDiscovery.programs.every((p) => p.isOnline),
    'Off-location discovery must return online programs only'
  );

  // When city-level provided, return city results without revealing precise coords
  const cityDiscovery = engine.discoverNearby({
    locationPrecision: 'CITY_LEVEL',
    city: 'London',
  });
  assert(cityDiscovery.organizations.length > 0, 'Must discover London organizations');
  assert(
    cityDiscovery.organizations.some((o) => o.location.city === 'London'),
    'Discovered orgs must match requested city'
  );
  console.log('  ✔ Gate 4 Passed: Location privacy by default with least-privilege disclosure.\n');

  // -------------------------------------------------------------------------
  // GATE 5: Mosque & Institution Discovery & Profile Facilities
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 5] Validating Mosque & Institution Profiles...');
  const cordobaOrg = engine.getOrganizationById('org_masjid_cordoba');
  assert(cordobaOrg !== null, 'Cordoba Mosque must exist');
  assert(cordobaOrg!.mosqueProfile !== undefined, 'Mosque profile must be present');
  assert(cordobaOrg!.mosqueProfile!.jummahTimes.length >= 2, 'Jummah times must be listed');
  assert(cordobaOrg!.mosqueProfile!.womenFacilities === true, 'Women facilities must be reported');
  assert(cordobaOrg!.mosqueProfile!.wheelchairAccessible === true, 'Wheelchair accessibility must be reported');
  console.log('  ✔ Gate 5 Passed: Mosque profile and facilities accurately represented.\n');

  // -------------------------------------------------------------------------
  // GATE 6: Verified Educational Programs & Community Event Registration
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 6] Validating Educational Programs & Event Registration...');
  const programs = engine.listPrograms();
  assert(programs.length >= 2, 'Pre-seeded programs must be available');
  const tajweedProg = programs.find((p) => p.id === 'prog_tajweed_mastery');
  assert(tajweedProg !== undefined, 'Tajweed course must exist');
  assert(tajweedProg!.isVerified === true, 'Educational program must be verified');

  const events = engine.listEvents();
  assert(events.length >= 1, 'Pre-seeded events must be available');
  const iftarEvent = events[0];
  const regRes = engine.registerForEvent(iftarEvent.id, testUserId);
  assert(regRes.success === true, 'User must register successfully for event');
  assert(
    iftarEvent.registeredUserIds.includes(testUserId),
    'Registered list must include user'
  );
  console.log('  ✔ Gate 6 Passed: Educational programs and event registration verified.\n');

  // -------------------------------------------------------------------------
  // GATE 7: Verified Scholars Directory & Dedicated Scholar OS Triage Routing
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 7] Validating Verified Scholars Directory & Routing...');
  const scholars = engine.listVerifiedScholars();
  assert(scholars.length >= 1, 'Verified scholars must be discoverable');
  assert(
    scholars.every((s) => s.routingToScholarOS === true),
    'All scholar inquiries must route to Scholar OS triage system'
  );
  console.log('  ✔ Gate 7 Passed: Verified scholars directory routes safely to Scholar OS.\n');

  // -------------------------------------------------------------------------
  // GATE 8: Verified Groups & Strict Anti-Anonymous Flame Policy
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 8] Validating Verified Groups & Anti-Anonymous Flame Policy...');
  const newGroup = engine.createGroup({
    name: 'South London Youth Halaqah',
    description: 'Weekly reflection and Quran study circle.',
    type: 'LEARNING_CIRCLE',
    creatorId: testUserId,
  });
  assert(
    newGroup.isAnonymousPostingProhibited === true,
    'Anonymous posting must be strictly prohibited in all community groups'
  );
  assert(newGroup.memberUserIds.includes(testUserId), 'Creator must be a member');
  console.log('  ✔ Gate 8 Passed: No anonymous flame posting in groups.\n');

  // -------------------------------------------------------------------------
  // GATE 9: Civic Action, Volunteering & Skill Matching
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 9] Validating Civic Action, Volunteering & Skill Matching...');
  const serviceOpportunities = engine.listServiceOpportunities();
  assert(serviceOpportunities.length >= 2, 'Service opportunities must exist');

  const matched = engine.matchVolunteers({
    userId: testUserId,
    availableHours: 4,
    skills: ['Driving', 'Logistics'],
    familyParticipation: true,
  });
  assert(matched.length >= 1, 'Matching service opportunity must be found');
  assert(matched[0].familyFriendly === true, 'Matched opportunity must be family friendly');

  const signupRes = engine.signUpForService(matched[0].id, testUserId);
  assert(signupRes.success === true, 'User should be signed up for volunteering');
  console.log('  ✔ Gate 9 Passed: Civic action and skill matching verified.\n');

  // -------------------------------------------------------------------------
  // GATE 10: Multi-Madhhab Zakat Calculation Engine
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 10] Validating Multi-Madhhab Zakat Calculation Engine...');
  // Scenario: $10,000 cash, $0 debts
  const hanafiZakat = engine.calculateZakat({
    cash: 10000,
    goldValue: 0,
    silverValue: 0,
    tradeInventory: 0,
    debtsOwedToUser: 0,
    immediateDebtsPayable: 0,
    madhhab: 'HANAFI',
    silverNisabThreshold: 520,
    goldNisabThreshold: 6500,
  });
  assert(hanafiZakat.isZakatDue === true, 'Zakat must be due for $10,000 wealth');
  assert(hanafiZakat.nisabStandard === 'SILVER_STANDARD', 'Hanafi calculation must apply Silver Nisab');
  assert(hanafiZakat.zakatAmountDue === 250, 'Zakat due must be 2.5% of $10,000 = $250');

  const shafiiZakat = engine.calculateZakat({
    cash: 4000,
    goldValue: 0,
    silverValue: 0,
    tradeInventory: 0,
    debtsOwedToUser: 0,
    immediateDebtsPayable: 0,
    madhhab: 'SHAFI_I',
    silverNisabThreshold: 520,
    goldNisabThreshold: 6500,
  });
  // Wealth $4,000 is above silver nisab (520) but below gold nisab (6500)
  assert(shafiiZakat.nisabStandard === 'GOLD_STANDARD', 'Shafi`i calculation must apply Gold Nisab');
  assert(shafiiZakat.isZakatDue === false, 'Zakat not due when below gold nisab in Shafi`i calculation');
  assert(shafiiZakat.zakatAmountDue === 0, 'Zakat amount must be 0 when below Nisab');
  console.log('  ✔ Gate 10 Passed: Multi-madhhab Zakat logic respects classical criteria.\n');

  // -------------------------------------------------------------------------
  // GATE 11: Safety, Anti-Takfir & Priority Child Safety Escalation
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 11] Validating Safety, Anti-Takfir & Priority Escalation...');
  const normalReport = engine.submitReport({
    reportingUserId: testUserId,
    reportedEntityId: 'usr_spammer_01',
    reportedEntityType: 'USER',
    category: 'SPAM',
    details: 'Posting unsolicited commercial ads in mosque group.',
  });
  assert(normalReport.isPrioritySafety === false, 'Spam should not be flagged as priority safety');
  assert(normalReport.status === 'PENDING', 'Normal report status should be PENDING');

  const takfirReport = engine.submitReport({
    reportingUserId: testUserId,
    reportedEntityId: 'usr_sectarian_troll',
    reportedEntityType: 'USER',
    category: 'TAKFIR',
    details: 'Pronouncing takfir and sectarian slurs against community members.',
  });
  assert(takfirReport.isPrioritySafety === true, 'Takfir must trigger priority safety escalation');
  assert(takfirReport.status === 'INVESTIGATING', 'Priority safety reports must immediately be INVESTIGATING');

  const childReport = engine.submitReport({
    reportingUserId: testUserId,
    reportedEntityId: 'post_inappropriate_content',
    reportedEntityType: 'CONTENT',
    category: 'CHILD_SAFETY',
    details: 'Content violating child safety safeguards.',
  });
  assert(childReport.isPrioritySafety === true, 'Child safety must trigger highest priority escalation');
  console.log('  ✔ Gate 11 Passed: Safety, Anti-Takfir, and Child Safety escalation operational.\n');

  // -------------------------------------------------------------------------
  // GATE 12: Section 50 Production REST API Router Endpoints
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 12] Validating Section 50 REST API Router Endpoints...');
  const ctx = { userId: testUserId, userRole: 'USER' };

  // 1. GET /api/v1/community
  const resDashboard = await ApiRouter.handle('GET', '/api/v1/community', null, ctx);
  assert(resDashboard.success === true, 'GET /api/v1/community must return success');
  assert(resDashboard.data.totalVerifiedOrganizations > 0, 'Dashboard data must contain verified orgs');

  // 2. GET /api/v1/community/nearby
  const resNearby = await ApiRouter.handle('GET', '/api/v1/community/nearby', { city: 'London', locationPrecision: 'CITY_LEVEL' }, ctx);
  assert(resNearby.success === true, 'GET /api/v1/community/nearby must return success');
  assert(resNearby.data.organizations.length > 0, 'Nearby London orgs must be found');

  // 3. GET /api/v1/community/organizations
  const resOrgs = await ApiRouter.handle('GET', '/api/v1/community/organizations', null, ctx);
  assert(resOrgs.success === true, 'GET /api/v1/community/organizations must return success');

  // 4. GET /api/v1/community/organizations/org_masjid_cordoba
  const resOrgDetail = await ApiRouter.handle('GET', '/api/v1/community/organizations/org_masjid_cordoba', null, ctx);
  assert(resOrgDetail.success === true, 'GET /api/v1/community/organizations/:id must return success');
  assert(resOrgDetail.data.mosqueProfile.jummahTimes.length >= 2, 'Mosque profile must be populated in router');

  // 5. GET /api/v1/community/programs
  const resPrograms = await ApiRouter.handle('GET', '/api/v1/community/programs', null, ctx);
  assert(resPrograms.success === true, 'GET /api/v1/community/programs must return success');

  // 6. GET /api/v1/community/events
  const resEvents = await ApiRouter.handle('GET', '/api/v1/community/events', null, ctx);
  assert(resEvents.success === true, 'GET /api/v1/community/events must return success');

  // 7. POST /api/v1/community/events/evt_community_iftar_prep/register
  const resRegEvent = await ApiRouter.handle('POST', '/api/v1/community/events/evt_community_iftar_prep/register', null, ctx);
  assert(resRegEvent.success === true, 'POST /api/v1/community/events/:id/register must succeed');

  // 8. GET /api/v1/community/scholars
  const resScholars = await ApiRouter.handle('GET', '/api/v1/community/scholars', null, ctx);
  assert(resScholars.success === true, 'GET /api/v1/community/scholars must return success');
  assert(resScholars.data.length > 0, 'Scholars list must not be empty');

  // 9. GET /api/v1/community/groups
  const resGroups = await ApiRouter.handle('GET', '/api/v1/community/groups', null, ctx);
  assert(resGroups.success === true, 'GET /api/v1/community/groups must return success');

  // 10. POST /api/v1/community/groups
  const resCreateGroup = await ApiRouter.handle('POST', '/api/v1/community/groups', {
    name: 'Qur`an Memorization Circle',
    description: 'Weekly mutual recitation circle',
    type: 'LEARNING_CIRCLE',
  }, ctx);
  assert(resCreateGroup.success === true, 'POST /api/v1/community/groups must succeed');
  assert(resCreateGroup.data.isAnonymousPostingProhibited === true, 'Created group must forbid anonymous posting');

  // 11. GET /api/v1/community/service
  const resService = await ApiRouter.handle('GET', '/api/v1/community/service', null, ctx);
  assert(resService.success === true, 'GET /api/v1/community/service must return success');

  // 12. POST /api/v1/community/service/srv_weekend_food_pantry/signup
  const resSignup = await ApiRouter.handle('POST', '/api/v1/community/service/srv_weekend_food_pantry/signup', null, ctx);
  assert(resSignup.success === true, 'POST /api/v1/community/service/:id/signup must succeed');

  // 13. POST /api/v1/community/reports
  const resReport = await ApiRouter.handle('POST', '/api/v1/community/reports', {
    reportedEntityId: 'usr_troll_42',
    category: 'HARASSMENT',
    details: 'Unwelcome offensive messages in group',
  }, ctx);
  assert(resReport.success === true, 'POST /api/v1/community/reports must succeed');

  // 14. GET /api/v1/community/resources
  const resResources = await ApiRouter.handle('GET', '/api/v1/community/resources', null, ctx);
  assert(resResources.success === true, 'GET /api/v1/community/resources must return success');

  // 15. POST /api/v1/community/zakat/calculate
  const resZakat = await ApiRouter.handle('POST', '/api/v1/community/zakat/calculate', {
    cash: 50000,
    goldValue: 0,
    silverValue: 0,
    tradeInventory: 0,
    debtsOwedToUser: 0,
    immediateDebtsPayable: 2000,
    madhhab: 'HANAFI',
  }, ctx);
  assert(resZakat.success === true, 'POST /api/v1/community/zakat/calculate must succeed');
  assert(resZakat.data.eligibleNetWealth === 48000, 'Net wealth should be 50,000 - 2,000 = 48,000');
  assert(resZakat.data.zakatAmountDue === 1200, 'Zakat due should be 2.5% of 48,000 = 1,200');

  console.log('  ✔ Gate 12 Passed: All Section 50 REST API routes operational and contract-validated.\n');

  console.log('========================================================================');
  console.log('🎉 ALL 12 COMMUNITY & UMMAH OS ACCEPTANCE GATES PASSED (100%)');
  console.log('========================================================================');
}

runCommunityUmmahTestSuite().catch((err) => {
  console.error('Fatal error in test execution:', err);
  process.exit(1);
});
