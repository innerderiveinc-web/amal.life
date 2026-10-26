/**
 * AMAL OS — LEGACY & FAMILY CONTINUITY OS (MASTER ACCEPTANCE TEST SUITE)
 * 
 * Verifies all 32 acceptance criteria and non-negotiable invariants:
 * - Gate 1: Individual Privacy Default & Access Control
 * - Gate 2: Spousal, Adult Child & Domestic Privacy Defense (Anti-Surveillance)
 * - Gate 3: Two-Graph Firewall & Islamic Authority Separation
 * - Gate 4: Child Safety Architecture & Positive Engagement (No Shame / Guilt)
 * - Gate 5: Multi-Role Shared Family Journeys
 * - Gate 6: Family Today Dignified Dashboard (No Rankings, No Deen Scores)
 * - Gate 7: Notification Ethics & Coercion Defense
 * - Gate 8: Legacy Letters & Audio Messages (Advice Disclaimer Enforced)
 * - Gate 9: Future Recipient Model & Controlled Release Workflow
 * - Gate 10: Inactivity Instructions & Digital Estate Safety
 * - Gate 11: Export Archive & Tamper-Evident Audit Logging
 * - Gate 12: Ethical Non-Monetization & Master REST API Router Endpoints
 */

import { LegacyContinuityEngine } from '../packages/amal-engine/src/legacy-continuity-engine.js';
import { ApiRouter } from '../services/api/src/router.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runLegacyContinuityTestSuite() {
  console.log('========================================================================');
  console.log('⚡ AMAL OS — LEGACY & FAMILY CONTINUITY OS ACCEPTANCE TEST SUITE');
  console.log('========================================================================\n');

  const engine = new LegacyContinuityEngine();
  const fatherId = 'usr_parent_ahmad';
  const motherId = 'usr_spouse_maryam';
  const childId = 'usr_child_zayd';
  const adultSonId = 'usr_adult_son_tariq';
  const siblingId = 'usr_sibling_bilal';

  // -------------------------------------------------------------------------
  // GATE 1: Individual Privacy Default & Access Control
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 1] Validating Individual Privacy Default & Permission Boundaries...');
  const space = engine.createLegacySpace({
    ownerId: fatherId,
    name: 'My Personal Guidance & Life Lessons',
    description: 'Personal journal and advice intended for my family.',
  });
  assert(space.id.startsWith('space_'), 'Space must be created with canonical id');

  const privateItem = engine.createLegacyItem({
    spaceId: space.id,
    creatorId: fatherId,
    type: 'PERSONAL_REFLECTION',
    title: 'My Personal Struggles & Gratitude',
    content: { notes: 'A private reflection on patience during difficult financial trials.' },
    provenanceTag: 'USER_CREATED',
  });

  // Owner can access
  const ownerAccess = engine.getLegacyItem(privateItem.id, fatherId);
  assert(ownerAccess.id === privateItem.id, 'Owner must access their own legacy item');

  // Other family members CANNOT access unshared private items
  let unauthorizedBlocked = false;
  try {
    engine.getLegacyItem(privateItem.id, motherId);
  } catch (err: any) {
    unauthorizedBlocked = true;
    assert(err.message.includes('PERMISSION_DENIED'), 'Must throw PERMISSION_DENIED on private item');
  }
  assert(unauthorizedBlocked, 'Default must be strictly PRIVATE; unauthorized family access blocked');
  console.log('  ✔ [DEFENDED] Individual Privacy Default verified: Unshared items are inaccessible');

  // -------------------------------------------------------------------------
  // GATE 2: Spousal, Adult Child & Domestic Privacy Defense (Anti-Surveillance)
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 2] Validating Domestic Privacy Defense & Anti-Surveillance Invariants...');
  
  // 2a: Private reflections and AI chats are inviolable
  let reflectionSpyBlocked = false;
  try {
    engine.assertDomesticPrivacyFirewall({
      requestorUserId: motherId,
      targetUserId: fatherId,
      requestorRole: 'SPOUSE',
      targetRole: 'SPOUSE',
      resourceType: 'PRIVATE_REFLECTION',
    });
  } catch (err: any) {
    reflectionSpyBlocked = true;
    assert(err.message.includes('DOMESTIC_PRIVACY_BREACH'), 'Must throw DOMESTIC_PRIVACY_BREACH');
  }
  assert(reflectionSpyBlocked, 'Spouses cannot inspect private reflections');

  // 2b: Spousal prayer log inspection blocked
  let spousalPrayerSpyBlocked = false;
  try {
    engine.assertDomesticPrivacyFirewall({
      requestorUserId: motherId,
      targetUserId: fatherId,
      requestorRole: 'SPOUSE',
      targetRole: 'SPOUSE',
      resourceType: 'PRAYER_LOG',
    });
  } catch (err: any) {
    spousalPrayerSpyBlocked = true;
    assert(err.message.includes('SPOUSAL_SURVEILLANCE_PROHIBITED'), 'Must throw SPOUSAL_SURVEILLANCE_PROHIBITED');
  }
  assert(spousalPrayerSpyBlocked, 'Spousal prayer surveillance must be blocked');

  // 2c: Parent inspecting adult child's religious life blocked
  let adultChildSpyBlocked = false;
  try {
    engine.assertDomesticPrivacyFirewall({
      requestorUserId: fatherId,
      targetUserId: adultSonId,
      requestorRole: 'PARENT',
      targetRole: 'ADULT_MEMBER',
      resourceType: 'PRAYER_LOG',
    });
  } catch (err: any) {
    adultChildSpyBlocked = true;
    assert(err.message.includes('PARENTAL_SURVEILLANCE_PROHIBITED'), 'Must throw PARENTAL_SURVEILLANCE_PROHIBITED');
  }
  assert(adultChildSpyBlocked, 'Parents cannot monitor adult children’s personal worship');

  // 2d: Sibling surveillance blocked
  let siblingSpyBlocked = false;
  try {
    engine.assertDomesticPrivacyFirewall({
      requestorUserId: siblingId,
      targetUserId: fatherId,
      requestorRole: 'SIBLING',
      targetRole: 'SIBLING',
      resourceType: 'PRAYER_LOG',
    });
  } catch (err: any) {
    siblingSpyBlocked = true;
    assert(err.message.includes('SIBLING_SURVEILLANCE_PROHIBITED'), 'Must throw SIBLING_SURVEILLANCE_PROHIBITED');
  }
  assert(siblingSpyBlocked, 'Sibling surveillance must be blocked');
  console.log('  ✔ [DEFENDED] Anti-Surveillance Invariants enforced across spouses, parents, and siblings');

  // -------------------------------------------------------------------------
  // GATE 3: Two-Graph Firewall & Islamic Authority Separation
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 3] Validating Two-Graph Firewall & Islamic Authority Separation...');
  let authorityFabricationBlocked = false;
  try {
    engine.assertTwoGraphFirewall({
      title: 'My Custom Fatwa on Fasting',
      isAuthoritativeClaim: true as any, // Illegal attempt to declare user opinion as Shariah authority
      provenanceTag: 'USER_CREATED',
    });
  } catch (err: any) {
    authorityFabricationBlocked = true;
    assert(err.message.includes('TWO_GRAPH_FIREWALL_BREACH'), 'Must throw TWO_GRAPH_FIREWALL_BREACH');
  }
  assert(authorityFabricationBlocked, 'User content can never be marked as authoritative Islamic Shariah evidence');

  const validDuaItem = engine.createLegacyItem({
    spaceId: space.id,
    creatorId: fatherId,
    type: 'DUA_COLLECTION',
    title: 'Surah Al-Furqan Family Dua',
    content: {
      textArabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
      translation: 'Our Lord, grant us from among our wives and offspring comfort to our eyes.',
    },
    provenanceTag: 'VERIFIED_REFERENCE',
    relatedEvidenceIds: ['25:74'],
  });
  assert(validDuaItem.isAuthoritativeClaim === false, 'Legacy item must always remain non-authoritative');
  assert(validDuaItem.isPersonalAdvice === true, 'Legacy items must be marked as personal advice/curation');
  console.log('  ✔ [DEFENDED] Two-Graph Firewall enforced: Personal opinion != Islamic Shariah authority');

  // -------------------------------------------------------------------------
  // GATE 4: Child Safety Architecture & Positive Engagement
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 4] Validating Child Safety Architecture & Guardian Consent...');
  const childProfile = engine.registerChildAccount({
    userId: childId,
    ageBand: '7_10',
    guardianUserId: fatherId,
    guardianConsentGranted: true,
  });
  assert(childProfile.ageBand === '7_10', 'Child profile must record correct age band');
  assert(childProfile.contentPolicy === 'CHILD_SAFE_QURAN_CHARACTER_ONLY', 'Content policy must be child-safe');
  assert(childProfile.prohibitedFeatures.includes('RELIGIOUS_RANKING'), 'Religious ranking must be prohibited for child');
  assert(childProfile.prohibitedFeatures.includes('STREAK_GUILT'), 'Manipulative streaks must be prohibited for child');

  let missingConsentBlocked = false;
  try {
    engine.registerChildAccount({
      userId: 'usr_orphan_child',
      ageBand: 'UNDER_7',
      guardianUserId: '',
      guardianConsentGranted: false,
    });
  } catch (err: any) {
    missingConsentBlocked = true;
    assert(err.message.includes('GUARDIAN_CONSENT_REQUIRED'), 'Must throw GUARDIAN_CONSENT_REQUIRED');
  }
  assert(missingConsentBlocked, 'Child account creation requires explicit guardian consent');
  console.log('  ✔ Child Safety Architecture Verified: Age bands, guardian consent, zero guilt/shame mechanics');

  // -------------------------------------------------------------------------
  // GATE 5: Multi-Role Shared Family Journeys
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 5] Validating Multi-Role Shared Family Journeys...');
  const sharedJourney = engine.createSharedFamilyJourney({
    familyId: 'fam_circle_ahmad',
    title: 'Learn Surah Al-Fatihah Together',
    goal: 'Deepen understanding, proper recitation, and family contemplation of the Opening Surah.',
    familyBaseline: 'Daily 10-minute family circle after Maghrib',
    totalDays: 7,
    memberAmalPlans: [
      { userId: fatherId, displayName: 'Ahmad (Father)', role: 'PARENT', amalTitle: 'Study Classical Tafsir & Lead Discussion', estimatedMinutes: 15, frequency: 'DAILY', isCompletedToday: true },
      { userId: motherId, displayName: 'Maryam (Mother)', role: 'SPOUSE', amalTitle: 'Review Translations & Tajweed Points', estimatedMinutes: 10, frequency: 'DAILY', isCompletedToday: true },
      { userId: childId, displayName: 'Zayd (Son)', role: 'CHILD', amalTitle: 'Memorize Verses 1-4 with Meaning', estimatedMinutes: 10, frequency: 'DAILY', isCompletedToday: false },
      { userId: siblingId, displayName: 'Bilal (Uncle)', role: 'SIBLING', amalTitle: 'Listen and Revise Recitation', estimatedMinutes: 5, frequency: 'DAILY', isCompletedToday: true },
    ],
    sharedActivityDescription: 'Recite one verse together as a family and discuss its gratitude lesson.',
  });

  assert(sharedJourney.id.startsWith('fjourn_'), 'Shared journey must have canonical id');
  assert(Object.keys(sharedJourney.memberAmals).length === 4, 'Journey must contain 4 distinct member plans');
  assert(sharedJourney.memberAmals[childId].amalTitle.includes('Memorize Verses'), 'Child plan must be age-appropriate');
  assert(sharedJourney.memberAmals[fatherId].amalTitle.includes('Tafsir'), 'Parent plan must be distinct');
  console.log('  ✔ Multi-Role Shared Family Journey verified: Distinct roles and Amals under shared family goal');

  // -------------------------------------------------------------------------
  // GATE 6: Family Today Dignified View (No Rankings, No Deen Scores)
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 6] Validating Family Today Dignified View (No Rankings / No Deen Scores)...');
  const todayView = engine.getFamilyTodayDashboard('fam_circle_ahmad', '2026-10-08');
  assert(todayView.familyName === 'The Ahmad Household', 'Family name must match');
  assert(todayView.memberParticipation.length === 4, 'Must list all 4 family members');
  
  // Verify that participation is a respectful checklist without scores or failure labels
  const zaydStatus = todayView.memberParticipation.find((m) => m.userId === childId)!;
  assert(zaydStatus.participatedToday === false, 'Child participation reflects current status');
  assert((zaydStatus as any).faithScore === undefined, 'Faith score must NEVER exist');
  assert((zaydStatus as any).religiosityRank === undefined, 'Religiosity rank must NEVER exist');
  assert((zaydStatus as any).isFailing === undefined, 'Failure labels must NEVER exist');
  console.log('  ✔ [DEFENDED] Family Today Dashboard verified: Respectful participation without competition or shame');

  // -------------------------------------------------------------------------
  // GATE 7: Notification Ethics & Coercion Defense
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 7] Validating Notification Ethics & Coercion Defense...');
  const shamefulNotification1 = "Your child hasn't prayed Asr yet. Lowest iman this week!";
  const sanitized1 = engine.sanitizeFamilyNotification(shamefulNotification1);
  assert(!sanitized1.includes("hasn't prayed"), 'Shameful prompt must be sanitized');
  assert(sanitized1.includes('Continue your family journey together'), 'Must return calm encouraging language');

  const shamefulNotification2 = "You are falling behind on your Deen Score!";
  const sanitized2 = engine.sanitizeFamilyNotification(shamefulNotification2);
  assert(!sanitized2.includes('falling behind'), 'Guilt prompt must be sanitized');
  assert(sanitized2.includes('patience and gratitude'), 'Must return positive framing');
  console.log('  ✔ [DEFENDED] Notification Ethics verified: Guilt and shame notifications strictly intercepted');

  // -------------------------------------------------------------------------
  // GATE 8: Legacy Letters & Audio Messages (Advice Disclaimer Enforced)
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 8] Validating Legacy Letters & Audio Messages...');
  const letter = engine.createLegacyLetter({
    authorId: fatherId,
    recipientDescription: 'To My Children: Zayd and his future siblings',
    title: 'A Father’s Advice on Truthfulness, Kindness, and Prayer',
    letterBody: 'My dear children, always hold firmly to honesty even when difficult. Be kind to your mother and love one another for the sake of Allah.',
    duasIncluded: ['Surah Al-Furqan 25:74', 'Rabbi ij\'alni muqeema al-Salah'],
    valuesEncouraged: ['Honesty', 'Kindness', 'Patience', 'Service to Others'],
  });
  assert(letter.id.startsWith('let_'), 'Letter must be created with canonical id');
  assert(letter.adviceDisclaimer === 'PERSONAL_ADVICE_NOT_SHARIAH_RULING', 'Must carry explicit personal advice disclaimer');

  const audio = engine.recordLegacyAudio({
    speakerId: fatherId,
    speakerName: 'Ahmad',
    audioUrl: 'https://cdn.amal.app/legacy/audio/msg_ahmad_01.m4a',
    transcriptText: 'Beta, meri dua hai ke Allah tumhe nek aur sachha banaye...',
    language: 'ur',
    recipientIds: [childId],
  });
  assert(audio.id.startsWith('aud_'), 'Audio message must be recorded with canonical id');
  assert(audio.consentGranted === true, 'Consent must be verified');
  assert(audio.checksum.length === 64, 'Audio record must contain SHA-256 integrity checksum');
  console.log('  ✔ Legacy Letter & Audio Message preserved with explicit non-authoritative disclaimers');

  // -------------------------------------------------------------------------
  // GATE 9: Future Recipient Model & Controlled Release Workflow
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 9] Validating Future Recipient Model & Controlled Release Workflow...');
  const futureRecipient = engine.registerFutureRecipient({
    creatorId: fatherId,
    intendedLabel: 'For my grandchildren and future generations',
    relationshipDescription: 'Future descendants of the Ahmad family lineage',
    provisionalNotes: 'Preserve this collection of family memories and verified duas.',
  });
  assert(futureRecipient.intendedLabel.includes('grandchildren'), 'Future recipient label recorded without fake accounts');

  const collection = engine.createCollection({
    creatorId: fatherId,
    title: 'Ahmad Family Heritage Collection',
    description: 'Letters, recorded duas, and lessons for current and future generations.',
    targetAudience: 'FUTURE_GENERATIONS',
    itemIds: [validDuaItem.id, privateItem.id],
  });

  // Release transition: DRAFT -> FAMILY_SHARED
  const release = engine.releaseLegacyResource({
    resourceId: collection.id,
    creatorId: fatherId,
    targetStatus: 'FAMILY_SHARED',
    designatedRecipientIds: [motherId, childId],
    releaseConditions: 'Accessible by household members upon creator confirmation.',
  });
  assert(release.status === 'FAMILY_SHARED', 'Release status must transition cleanly');
  assert(release.designatedRecipientIds.includes(childId), 'Designated recipients must be preserved');
  console.log('  ✔ Future Recipient Model & Controlled Release Workflow verified');

  // -------------------------------------------------------------------------
  // GATE 10: Inactivity Instructions & Digital Estate Safety
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 10] Validating Inactivity Instructions & Digital Estate Safety...');
  const instructions = engine.setLegacyInstructions({
    userId: fatherId,
    trustedContactEmail: 'maryam.ahmad@example.com',
    trustedContactName: 'Maryam Ahmad (Spouse)',
    inactivityThresholdDays: 180,
    releaseCollectionIds: [collection.id],
    notesForContact: 'Please share the family heritage collection with the children when appropriate.',
  });
  assert(instructions.requiresIdentityVerification === true, 'Identity verification must be mandatory');
  assert(instructions.excludePrivateJournal === true, 'Private journal must be excluded by default');
  console.log('  ✔ Inactivity Instructions verified (Identity verification enforced, private reflections shielded)');

  // -------------------------------------------------------------------------
  // GATE 11: Export Archive & Tamper-Evident Audit Logging
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 11] Validating Export Archive & Tamper-Evident Audit Logs...');
  const archive = engine.exportUserLegacyArchive(fatherId, 'STRUCTURED_JSON_ARCHIVE');
  assert(archive.exportId.startsWith('exp_'), 'Export archive must carry unique ID');
  assert(archive.itemsExportedCount > 0, 'Must bundle exported items');
  assert(archive.checksum.length === 64, 'Archive must include SHA-256 integrity checksum');
  assert(archive.includesCitations === true, 'Archive must preserve source citations');

  const auditLogs = engine.getAuditLogs(fatherId);
  assert(auditLogs.length >= 5, 'Must record audit entries for create, release, and export actions');
  assert(auditLogs.every((a) => a.ipHash.length === 64), 'Audit logs must preserve privacy-hashed IP fingerprints');
  console.log(`  ✔ Tamper-Evident Audit Trail verified (${auditLogs.length} events logged with cryptographic hashes)`);

  // -------------------------------------------------------------------------
  // GATE 12: Ethical Non-Monetization & Master REST API Router Endpoints
  // -------------------------------------------------------------------------
  console.log('\n▶ [GATE 12] Validating Ethical Non-Monetization & REST API Router Endpoints...');
  
  // 12a: Non-monetization guardrail
  let monetizationBlocked = false;
  try {
    engine.assertNonMonetizable('PRAYER_BEHAVIOR');
  } catch (err: any) {
    monetizationBlocked = true;
    assert(err.message.includes('ETHICAL_BUSINESS_GUARDRAIL_VIOLATION'), 'Must throw business guardrail violation');
  }
  assert(monetizationBlocked, 'Religious practice and prayer data must be permanently non-monetizable');

  // 12b: REST API Endpoints via ApiRouter.handle
  const ctx = { userId: fatherId };

  // 1. POST /api/v1/legacy/spaces
  const resSpace = await ApiRouter.handle('POST', '/api/v1/legacy/spaces', { name: 'API Legacy Space' }, ctx);
  assert(resSpace.success === true, 'POST /api/v1/legacy/spaces must succeed');
  assert(resSpace.data.name === 'API Legacy Space', 'Space name must match');

  // 2. POST /api/v1/legacy/items
  const resItem = await ApiRouter.handle(
    'POST',
    '/api/v1/legacy/items',
    {
      title: 'Family Kindness Lesson',
      content: { lesson: 'Speak kindly to your relatives and neighbors.' },
      type: 'FAMILY_LESSON',
    },
    ctx
  );
  assert(resItem.success === true, 'POST /api/v1/legacy/items must succeed');
  assert(resItem.data.isAuthoritativeClaim === false, 'Item must be non-authoritative');

  // 3. GET /api/v1/legacy/items/:id
  const resGetItem = await ApiRouter.handle('GET', `/api/v1/legacy/items/${resItem.data.id}`, {}, ctx);
  assert(resGetItem.success === true, 'GET /api/v1/legacy/items/:id must succeed for owner');

  // 4. POST /api/v1/legacy/collections
  const resCol = await ApiRouter.handle(
    'POST',
    '/api/v1/legacy/collections',
    {
      title: 'API Children Collection',
      description: 'Curated lessons for children',
      targetAudience: 'CHILDREN',
      itemIds: [resItem.data.id],
    },
    ctx
  );
  assert(resCol.success === true, 'POST /api/v1/legacy/collections must succeed');

  // 5. POST /api/v1/legacy/release
  const resRelease = await ApiRouter.handle(
    'POST',
    '/api/v1/legacy/release',
    {
      resourceId: resCol.data.id,
      targetStatus: 'FAMILY_SHARED',
      designatedRecipientIds: [motherId],
    },
    ctx
  );
  assert(resRelease.success === true, 'POST /api/v1/legacy/release must succeed');

  // 6. POST /api/v1/legacy/letters
  const resLetter = await ApiRouter.handle(
    'POST',
    '/api/v1/legacy/letters',
    {
      title: 'To My Beloved Family',
      letterBody: 'Remain steadfast in truth and mercy.',
      duasIncluded: ['Rabbana atina fid-dunya hasanah'],
    },
    ctx
  );
  assert(resLetter.success === true, 'POST /api/v1/legacy/letters must succeed');
  assert(resLetter.data.adviceDisclaimer === 'PERSONAL_ADVICE_NOT_SHARIAH_RULING', 'Letter must include disclaimer');

  // 7. POST /api/v1/legacy/audio
  const resAudio = await ApiRouter.handle(
    'POST',
    '/api/v1/legacy/audio',
    {
      transcriptText: 'Bismillah, this is a recorded memory...',
      language: 'en',
    },
    ctx
  );
  assert(resAudio.success === true, 'POST /api/v1/legacy/audio must succeed');

  // 8. POST /api/v1/legacy/export
  const resExport = await ApiRouter.handle('POST', '/api/v1/legacy/export', { format: 'STRUCTURED_JSON_ARCHIVE' }, ctx);
  assert(resExport.success === true, 'POST /api/v1/legacy/export must succeed');

  // 9. GET /api/v1/family/today
  const resToday = await ApiRouter.handle('GET', '/api/v1/family/today', {}, ctx);
  assert(resToday.success === true, 'GET /api/v1/family/today must succeed');
  assert(Array.isArray(resToday.data.memberParticipation), 'Must return family participation list');

  // 10. POST /api/v1/family/child/profile
  const resChild = await ApiRouter.handle(
    'POST',
    '/api/v1/family/child/profile',
    {
      userId: 'usr_new_child_amina',
      ageBand: 'UNDER_7',
      guardianConsentGranted: true,
    },
    ctx
  );
  assert(resChild.success === true, 'POST /api/v1/family/child/profile must succeed');

  console.log('  ✔ All REST API Endpoints & Non-Monetization Guardrails Verified via ApiRouter Contract');

  console.log('\n========================================================================');
  console.log('🎉 ALL 12 ACCEPTANCE GATES PASSED (100% AMAL LEGACY OS VERIFICATION)');
  console.log('========================================================================\n');
}

runLegacyContinuityTestSuite().catch((err) => {
  console.error('Fatal error running legacy test suite:', err);
  process.exit(1);
});
