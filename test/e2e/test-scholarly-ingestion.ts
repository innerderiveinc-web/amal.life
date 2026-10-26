/**
 * AMAL OS — KNOWLEDGE INGESTION & SCHOLARLY REVIEW ENGINE
 * End-to-End Verification & Hardening Test Suite
 * 
 * Verifies all 11 core quality gates:
 * Gate 1: Source Intake & Immutable SHA-256 Artifact Preservation
 * Gate 2: Source Identity & Full Provenance Chain Verification
 * Gate 3: Multi-Dimensional Rights & Licensing Verification
 * Gate 4: Context-Preserving Passage Segmentation & Quote Detection
 * Gate 5: Atomic Claim Extraction & Support Classification (Unsupported Blocked)
 * Gate 6: Deterministic Reference Locator Verification
 * Gate 7: Author != Reviewer Invariant Defense
 * Gate 8: High-Risk Fiqh Dual Jurist Review & Dispute Representation
 * Gate 9: Automatic Hard Blocks Scorecard Enforcement
 * Gate 10: Publication & Emergency Revocation Cascading Invalidation
 * Gate 11: Full Source Provenance Explorer Tree & API Router Verification
 */

import { ScholarlyIngestionEngine } from '../services/content-ingestion/src/scholarly-ingestion-engine.js';
import { ApiRouter } from '../services/api/src/router.js';
import type {
  ExtractedKnowledgeClaim,
  KnowledgePassage,
  ReferenceVerificationCheck,
  ScholarReviewRecord,
  ScholarlyDispute,
  KnowledgeObject
} from '@amal/types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runTestSuite() {
  console.log('========================================================================');
  console.log('⚡ AMAL OS — KNOWLEDGE INGESTION & SCHOLARLY REVIEW ENGINE TEST SUITE');
  console.log('========================================================================\n');

  const engine = new ScholarlyIngestionEngine();
  const sourceId = 'SRC_HIDAYAH_01';

  // -------------------------------------------------------------------------
  // GATE 1: Intake & Immutable SHA-256 Preservation
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 1] Testing Intake & Immutable Artifact Storage...');
  const sampleArtifactContent = Buffer.from('Al-Hidayah fi Sharh Bidayat al-Mubtadi by al-Marghinani. Book of Taharah.', 'utf-8');
  const { job, artifact } = engine.createIngestionJob({
    sourceId,
    fileName: 'al-hidayah-vol1.pdf',
    rawBytes: sampleArtifactContent,
    acquisitionMethod: 'DIGITAL_ORIGINAL',
    submittedBy: 'scholar_contributor_1',
    declaredMetadata: { title: 'Al-Hidayah', author: 'Al-Marghinani', year: 1197 },
    licenseRecordId: 'lic_hidayah_01',
  });

  assert(artifact.isImmutable === true, 'Artifact must be marked immutable');
  assert(artifact.sha256.length === 64, 'Artifact must have valid SHA-256 hash');
  assert(job.currentStage === 'ACQUISITION', 'Job stage must be initialized');
  console.log(`  ✔ Immutable Artifact Recorded: ${artifact.artifactId} (SHA-256: ${artifact.sha256.substring(0, 16)}...)`);

  // -------------------------------------------------------------------------
  // GATE 2: Source Identity & Provenance Chain
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 2] Testing Identity Check & Provenance Chain...');
  const identityCheck = engine.verifySourceIdentity(sourceId, {
    author: 'Burhan al-Din al-Marghinani',
    title: 'Al-Hidayah fi Sharh Bidayat al-Mubtadi',
    edition: 'Dar Ihya al-Turath al-Arabi, Beirut',
    publisher: 'Dar Ihya al-Turath al-Arabi',
    year: 1995,
    crossCheckCatalog: 'Dar al-Kutub National Registry',
  });
  assert(identityCheck.status === 'IDENTITY_CONFIRMED', 'Identity check must pass');

  const provenanceRecord = engine.registerProvenanceChain({
    sourceId,
    originRepository: 'Dar al-Kutub al-Ilmiyyah Archive',
    acquiredFrom: 'King Fahd National Library Repository',
    publisher: 'Dar Ihya al-Turath al-Arabi',
    edition: '1st Edition Verified',
    artifactSha256: artifact.sha256,
    links: {
      workId: sourceId,
      authorId: 'auth_marghinani',
      editionId: 'ed_1995_beirut',
    },
  });
  assert(provenanceRecord.isComplete === true, 'Provenance chain must be complete');
  assert(provenanceRecord.status === 'PROVENANCE_VERIFIED', 'Provenance status must be verified');
  console.log(`  ✔ Provenance Chain Complete: Status ${provenanceRecord.status}`);

  // -------------------------------------------------------------------------
  // GATE 3: Multi-Dimensional Rights & License Verification
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 3] Testing Multi-Dimensional Rights & Licensing...');
  const licenseRecord = engine.verifyLicense({
    sourceId,
    licenseType: 'PUBLIC_DOMAIN',
    rights: {
      storage: true,
      display: true,
      redistribution: true,
      commercialUse: true,
      aiProcessing: true,
      translationRights: true,
      derivativeRights: false,
    },
    jurisdiction: 'GLOBAL_ISLAMIC_HERITAGE',
  });
  assert(licenseRecord.status === 'LICENSE_VERIFIED', 'License verification must succeed');
  assert(licenseRecord.rights.aiProcessing === true, 'AI processing right must be explicitly verified');
  console.log(`  ✔ License Verified: Type ${licenseRecord.licenseType}, AI Processing: ${licenseRecord.rights.aiProcessing}`);

  // -------------------------------------------------------------------------
  // GATE 4: Context-Preserving Passage Segmentation
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 4] Testing Context-Preserving Passage Segmentation...');
  const passage: KnowledgePassage = {
    passageId: 'pas_hidayah_taharah_01',
    sourceId,
    workId: sourceId,
    editionId: 'ed_1995_beirut',
    volumeNumber: 1,
    chapterNumber: 1,
    pageNumber: 12,
    paragraphIndex: 3,
    textArabic: 'الوضوء فرض في الصلاة لقوله تعالى: يا أيها الذين آمنوا إذا قمتم إلى الصلاة فاغسلوا وجوهكم',
    textEnglish: 'Ablution (Wudu) is an obligation for prayer based on the divine statement: O you who have believed, when you rise to prayer, wash your faces.',
    language: 'ar',
    textHash: 'hash_ar_taharah_01',
    contextBefore: 'Kitab al-Taharah begins with water categories.',
    contextAfter: 'And the four pillars of Wudu are established by the explicit text of the verse.',
    sectionType: 'AUTHOR_TEXT',
    quotations: [
      {
        quotationId: 'q_5_6',
        quotationType: 'QUOTES_QURAN',
        matchedText: 'يا أيها الذين آمنوا إذا قمتم إلى الصلاة فاغسلوا وجوهكم',
        targetCanonicalRef: 'Quran 5:6',
        confidence: 1.0,
        isVerified: true,
      },
    ],
  };
  const registeredPassage = engine.segmentPassage(passage);
  assert(registeredPassage.quotations.length === 1, 'Quran quotation must be preserved');
  console.log(`  ✔ Passage Registered: Context and Quote links intact (${registeredPassage.quotations[0].targetCanonicalRef})`);

  // -------------------------------------------------------------------------
  // GATE 5: Atomic Claim Extraction & Support Classification
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 5] Testing Claim Extraction & Support Classification...');
  const validClaim: ExtractedKnowledgeClaim = {
    claimId: 'clm_wudu_fard',
    passageId: passage.passageId,
    sourceId,
    claimText: 'Washing the face is an obligatory pillar (Fard) of Wudu.',
    claimType: 'FIQH_CLAIM',
    subject: 'Washing the face',
    predicate: 'is a Fard pillar',
    object: 'Wudu',
    supportLevel: 'DIRECT',
    scholarlyStatus: 'CONSENSUS',
    isAiGeneratedDraft: false,
    humanVerified: true,
  };
  engine.extractClaim(validClaim);

  let unsupportedBlocked = false;
  try {
    const invalidClaim: ExtractedKnowledgeClaim = {
      claimId: 'clm_unsupported',
      passageId: passage.passageId,
      sourceId,
      claimText: 'Wudu requires milk instead of water.',
      claimType: 'FIQH_CLAIM',
      subject: 'Milk',
      predicate: 'is required for',
      object: 'Wudu',
      supportLevel: 'UNSUPPORTED',
      scholarlyStatus: 'ISOLATED_SHADHDH',
      isAiGeneratedDraft: true,
      humanVerified: false,
    };
    engine.extractClaim(invalidClaim);
  } catch (err: any) {
    unsupportedBlocked = true;
    assert(err.message.includes('UNSUPPORTED_CLAIM_BLOCKED'), 'Must throw unsupported claim block error');
  }
  assert(unsupportedBlocked, 'Unsupported claim extraction must be strictly blocked');
  console.log('  ✔ Claim Support Validated: DIRECT claim accepted, UNSUPPORTED claim blocked');

  // -------------------------------------------------------------------------
  // GATE 6: Deterministic Reference Verification
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 6] Testing Deterministic Reference Verification...');
  const refCheck: ReferenceVerificationCheck = {
    referenceId: 'ref_quran_5_6',
    claimId: validClaim.claimId,
    rawReferenceText: 'Surah al-Ma\'idah 5:6',
    targetCanonicalRef: 'Quran 5:6',
    status: 'VERIFIED',
    checks: {
      sourceExists: true,
      workExists: true,
      editionExists: true,
      locatorExists: true,
      passageExists: true,
      textMatch: true,
      citationTargetMatch: true,
      claimSupport: true,
    },
    verifiedBy: 'AUTOMATED_DETERMINISTIC_CHECK',
    verifiedAt: new Date().toISOString(),
  };
  const verifiedRef = engine.verifyReference(refCheck);
  assert(verifiedRef.status === 'VERIFIED', 'Reference check status must be VERIFIED');
  console.log(`  ✔ Deterministic Reference Check Passed: ${verifiedRef.targetCanonicalRef}`);

  // -------------------------------------------------------------------------
  // GATE 7: Author != Reviewer Invariant
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 7] Testing Author != Reviewer Invariant Defense...');
  let selfReviewBlocked = false;
  try {
    const selfReview: ScholarReviewRecord = {
      reviewId: 'rev_self_check',
      scholarId: 'scholar_contributor_1', // Same as submittedBy
      scholarQualifications: ['Senior Mufti'],
      specialization: '05_FIQH',
      sourceId,
      passageId: passage.passageId,
      claimId: validClaim.claimId,
      decision: 'APPROVE',
      rationale: 'I approve my own work.',
      checks: {
        referencesChecked: true,
        madhhabChecked: true,
        traditionChecked: true,
        contextChecked: true,
        disagreementChecked: true,
      },
      secondReviewRequired: false,
      timestamp: new Date().toISOString(),
    };
    engine.submitScholarReview(selfReview);
  } catch (err: any) {
    selfReviewBlocked = true;
    assert(err.message.includes('AUTHOR_CANNOT_REVIEW'), 'Must block author self-review');
  }
  assert(selfReviewBlocked, 'Author self-review must be blocked');
  console.log('  ✔ Author != Reviewer Invariant Defended: Self-approval rejected');

  // -------------------------------------------------------------------------
  // GATE 8: Dual Jurist Review & Scholarly Dispute Registration
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 8] Testing Dual Jurist Review & Scholarly Dispute...');
  const dualScholarReview: ScholarReviewRecord = {
    reviewId: 'rev_dual_jurist_01',
    scholarId: 'senior_jurist_alfred',
    scholarQualifications: ['PhD Islamic Jurisprudence', 'Ijazah in al-Hidayah'],
    specialization: '05_FIQH',
    sourceId,
    passageId: passage.passageId,
    claimId: validClaim.claimId,
    decision: 'APPROVE',
    rationale: 'Text thoroughly checked against classical manuscript editions.',
    checks: {
      referencesChecked: true,
      madhhabChecked: true,
      traditionChecked: true,
      contextChecked: true,
      disagreementChecked: true,
    },
    secondReviewRequired: true,
    secondScholarId: 'senior_jurist_khalil',
    secondScholarDecision: 'APPROVE',
    secondScholarRationale: 'Verified second independent review of Fiqh pillars.',
    timestamp: new Date().toISOString(),
  };
  const recordedReview = engine.submitScholarReview(dualScholarReview);
  assert(recordedReview.decision === 'APPROVE', 'Dual review must be approved');

  const dispute: ScholarlyDispute = {
    disputeId: 'dsp_wudu_head_wiping',
    issue: 'Extensive Area of Head Wiping in Wudu',
    claimId: validClaim.claimId,
    scholarA: 'Abu Hanifa & Hanafi Fuqaha',
    scholarB: 'Al-Shafi\'i & Shafi\'i Fuqaha',
    madhhabA: 'HANAFI',
    madhhabB: 'SHAFI_I',
    positionA: 'Wiping one-fourth of the head is the obligatory minimum (Fard).',
    positionB: 'Wiping even a single hair or part thereof satisfies the obligation.',
    sourcesA: [sourceId, 'Al-Hidayah Vol 1', 'Bada\'i al-Sana\'i'],
    sourcesB: ['Al-Umm', 'Al-Majmu\''],
    rationaleA: 'The letter Ba denotes adhesion (ilsaq) over a significant quarter.',
    rationaleB: 'The letter Ba indicates tab\'eed (partiality) without specific quarter condition.',
    conditions: ['Both positions are valid Sunni interpretations based on linguistic divergence.'],
    status: 'MULTIPLE_VALID_POSITIONS',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const registeredDispute = engine.registerDispute(dispute);
  assert(registeredDispute.status === 'MULTIPLE_VALID_POSITIONS', 'Dispute must preserve legitimate divergence');
  console.log('  ✔ Dual Jurist Review Approved & Dispute Preserved Without Suppression');

  // -------------------------------------------------------------------------
  // GATE 9: Automatic Hard Block Enforcement
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 9] Testing Scorecard & Hard Block Enforcement...');
  const scorecard = engine.evaluateQualityScorecard(sourceId);
  assert(scorecard.overallPublicationGatePassed === true, 'Scorecard must pass all verification gates');
  assert(scorecard.hardBlocksTriggered.length === 0, 'No hard blocks should be triggered on verified source');
  console.log('  ✔ Quality Scorecard Passed: 0 Hard Blocks Triggered');

  // -------------------------------------------------------------------------
  // GATE 10: Publication & Emergency Revocation
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 10] Testing Publication & Emergency Revocation...');
  const knowledgeObject: KnowledgeObject = {
    knowledgeId: 'kno_wudu_fard_01',
    sourceId,
    workId: sourceId,
    editionId: 'ed_1995_beirut',
    passageId: passage.passageId,
    claimId: validClaim.claimId,
    domain: '05_FIQH',
    schoolAttributions: ['HANAFI'],
    verifiedArabicText: passage.textArabic!,
    verifiedTranslation: passage.textEnglish!,
    citations: ['Quran 5:6'],
    publicationStatus: 'ACTIVE',
    publishedAt: new Date().toISOString(),
    approvedByScholars: ['senior_jurist_alfred', 'senior_jurist_khalil'],
    version: 1,
  };
  const published = engine.publishKnowledgeObject(knowledgeObject);
  assert(published.publicationStatus === 'ACTIVE', 'Knowledge object must be active');

  const revocation = engine.revokeKnowledge({
    targetType: 'CLAIM',
    targetId: validClaim.claimId,
    reason: 'Emergency audit test scenario',
    revokedBy: 'chief_governance_officer',
  });
  assert(revocation.cacheInvalidated === true, 'Revocation must trigger cache invalidation');
  assert(published.publicationStatus === 'SUSPENDED', 'Published knowledge must be marked SUSPENDED upon revocation');
  console.log('  ✔ Knowledge Published and Revocation Executed with Dependency Cascade');

  // -------------------------------------------------------------------------
  // GATE 11: Source Explorer Tree & API Router Endpoints
  // -------------------------------------------------------------------------
  console.log('▶ [GATE 11] Testing Source Provenance Explorer & API Router Endpoints...');
  const explorerTree = engine.getSourceExplorerTree(sourceId);
  assert(explorerTree.artifact !== undefined, 'Explorer tree must contain artifact');
  assert(explorerTree.provenance !== undefined, 'Explorer tree must contain provenance');
  assert(explorerTree.license !== undefined, 'Explorer tree must contain license');
  assert(explorerTree.passages.length >= 1, 'Explorer tree must contain passages');
  assert(explorerTree.claims.length >= 1, 'Explorer tree must contain claims');
  assert(explorerTree.disputes.length >= 1, 'Explorer tree must contain disputes');
  console.log('  ✔ Source Provenance Explorer Tree Verified (Full Graph Traversal Intact)');

  // Test API Router handle for Ingestion Endpoints
  const reqContext = { userId: 'jurist_auditor_01', userRole: 'SCHOLAR' };
  const apiIntakeRes = await ApiRouter.handle(
    'POST',
    '/api/v1/knowledge/ingestion',
    {
      sourceId: 'SRC_API_TEST_01',
      fileName: 'bahaar-e-shariat-vol1.pdf',
      rawText: 'Bahaar-e-Shariat Volume 1 on Salah rules.',
      acquisitionMethod: 'DIGITAL_ORIGINAL',
    },
    reqContext
  );
  assert(apiIntakeRes.success === true, 'API /api/v1/knowledge/ingestion must succeed');

  const apiJobsRes = await ApiRouter.handle('GET', '/api/v1/knowledge/ingestion/jobs', {}, reqContext);
  assert(apiJobsRes.success === true && Array.isArray(apiJobsRes.data), 'API /api/v1/knowledge/ingestion/jobs must return array');

  const apiExplorerRes = await ApiRouter.handle('GET', `/api/v1/knowledge/explorer/${sourceId}`, {}, reqContext);
  assert(apiExplorerRes.success === true && apiExplorerRes.data.sourceId === sourceId, 'API /api/v1/knowledge/explorer/:id must succeed');

  console.log('  ✔ API Router Endpoints Verified via HTTP Contract');

  console.log('\n========================================================================');
  console.log('✅ ALL 11 KNOWLEDGE INGESTION & SCHOLARLY REVIEW GATES PASSED (100%)');
  console.log('========================================================================\n');
}

runTestSuite().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
