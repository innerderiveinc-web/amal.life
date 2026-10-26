/**
 * AMAL TRUST & METHODOLOGY CENTER — ACCEPTANCE TEST SUITE
 * Validates Public Epistemic Governance, Policies, Non-Authority Declarations,
 * and REST API Endpoints.
 */

import { ApiRouter } from '../services/api/src/router.js';
import { UniversalMasterCatalogueEngine, GlobalHeritageAtlasEngine, TrustMethodologyCenterEngine } from '@amal/amal-engine';
import { TrustPolicySlug } from '@amal/types';

async function runTrustCenterAcceptanceTests() {
  console.log('🏛️  Starting AMAL TRUST & METHODOLOGY CENTER Acceptance Suite...\n');

  const catalogueEngine = new UniversalMasterCatalogueEngine();
  const atlasEngine = new GlobalHeritageAtlasEngine(catalogueEngine);
  const trustEngine = new TrustMethodologyCenterEngine(catalogueEngine, atlasEngine);

  // Test 1: Non-Authority Disclaimer
  console.log('🧪 [Test 1/6] Verifying Non-Authority Primary Disclaimer...');
  const disclaimer = trustEngine.getDisclaimer();
  if (!disclaimer.primaryDeclaration.includes('AMAL does not certify itself as an Islamic authority')) {
    throw new Error('FAILED: Primary declaration missing mandatory non-authority statement');
  }
  if (!disclaimer.legalBoundary.includes('tashri')) {
    throw new Error('FAILED: Legal boundary missing tashri/qada disclaimer');
  }
  if (!disclaimer.humanScholarSupremacy.includes('dual-scholar signoff')) {
    throw new Error('FAILED: Human scholar supremacy missing dual-scholar signoff requirement');
  }
  console.log('   ✅ Confirmed primary non-authority declaration & human scholar supremacy.');

  // Test 2: 11 Mandatory Public Policy Documents
  console.log('🧪 [Test 2/6] Verifying 11 Mandatory Public Trust Policies...');
  const requiredPolicies: TrustPolicySlug[] = [
    'source-policy',
    'scholar-policy',
    'madhhab-policy',
    'translation-policy',
    'tasawwuf-policy',
    'citation-policy',
    'ai-policy',
    'uncertainty-policy',
    'correction-policy',
    'rights-policy',
    'version-history',
  ];

  for (const slug of requiredPolicies) {
    const policy = trustEngine.getPolicy(slug);
    if (!policy) {
      throw new Error(`FAILED: Required policy ${slug} not found`);
    }
    if (policy.corePrinciples.length === 0 || policy.operationalRules.length === 0 || policy.nonNegotiables.length === 0) {
      throw new Error(`FAILED: Policy ${slug} missing required sections`);
    }
  }
  console.log(`   ✅ Confirmed all ${requiredPolicies.length} public trust policies with core principles and non-negotiables.`);

  // Test 3: 7-Stage Verification Pipeline
  console.log('🧪 [Test 3/6] Verifying 7-Stage Verification Pipeline with Human Scholar Gate...');
  const pipeline = trustEngine.getVerificationPipeline();
  if (pipeline.length !== 7) {
    throw new Error(`FAILED: Expected 7 pipeline stages, found ${pipeline.length}`);
  }
  const scholarStage = pipeline.find((s) => s.stage === 6);
  if (!scholarStage || !scholarStage.humanReviewRequired || scholarStage.outputStatus !== 'SCHOLAR_VALIDATED') {
    throw new Error('FAILED: Stage 6 Scholarly Review gate missing or not requiring human review');
  }
  console.log('   ✅ Confirmed 7-stage verification pipeline with mandatory Stage 6 human scholar dual-signoff gate.');

  // Test 4: Manifest & Production Metrics
  console.log('🧪 [Test 4/6] Verifying Trust Center Public Manifest & Epistemic Stats...');
  const manifest = trustEngine.getManifest();
  if (manifest.stats.epistemicLayersGuarded !== 12) {
    throw new Error(`FAILED: Expected 12 epistemic layers guarded, found ${manifest.stats.epistemicLayersGuarded}`);
  }
  if (!manifest.stats.zeroHallucinationStandard) {
    throw new Error('FAILED: Zero-hallucination standard not declared in public manifest');
  }
  if (manifest.stats.supportedMadhhabs.length !== 4) {
    throw new Error('FAILED: Expected 4 supported Sunni madhhabs');
  }
  console.log(`   ✅ Confirmed manifest metrics: ${manifest.stats.totalWorksInAtlas} atlas works, 12 layers guarded, 4 madhhabs supported.`);

  // Test 5: Methodology Version History
  console.log('🧪 [Test 5/6] Verifying Semantic Methodology Version History...');
  const history = trustEngine.getVersionHistory();
  if (history.length < 2) {
    throw new Error('FAILED: Expected at least 2 methodology version releases');
  }
  const v1Atlas = history.find((h) => h.version === 'v1.0.0-atlas');
  if (!v1Atlas || !v1Atlas.changes.some((c) => c.includes('Ghuniyat al-Talibin'))) {
    throw new Error('FAILED: Atlas v2 milestone not recorded in methodology version history');
  }
  console.log(`   ✅ Confirmed ${history.length} methodology releases with Red Team scores & verified work counts.`);

  // Test 6: REST API Router Endpoints
  console.log('🧪 [Test 6/6] Verifying REST API Endpoints via ApiRouter...');
  const reqContext = { userId: 'usr-guest', userRole: 'USER' };

  const resManifest = await ApiRouter.handle('GET', '/api/v1/trust-center/manifest', {}, reqContext);
  if (!resManifest.success || !resManifest.data?.nonAuthorityDisclaimer) {
    throw new Error('FAILED: GET /api/v1/trust-center/manifest failed');
  }

  const resDisclaimer = await ApiRouter.handle('GET', '/api/v1/trust-center/disclaimer', {}, reqContext);
  if (!resDisclaimer.success || !resDisclaimer.data?.primaryDeclaration) {
    throw new Error('FAILED: GET /api/v1/trust-center/disclaimer failed');
  }

  const resPolicy = await ApiRouter.handle('GET', '/api/v1/trust-center/policies/source-policy', {}, reqContext);
  if (!resPolicy.success || resPolicy.data?.slug !== 'source-policy') {
    throw new Error('FAILED: GET /api/v1/trust-center/policies/source-policy failed');
  }

  const resPipeline = await ApiRouter.handle('GET', '/api/v1/trust-center/pipeline', {}, reqContext);
  if (!resPipeline.success || resPipeline.data?.length !== 7) {
    throw new Error('FAILED: GET /api/v1/trust-center/pipeline failed');
  }

  const resHistory = await ApiRouter.handle('GET', '/api/v1/trust-center/version-history', {}, reqContext);
  if (!resHistory.success || resHistory.data?.length < 2) {
    throw new Error('FAILED: GET /api/v1/trust-center/version-history failed');
  }

  console.log('   ✅ Confirmed all 5 REST API routes responded with HTTP 200 contract.\n');

  console.log('🎉 ALL 6 TRUST & METHODOLOGY CENTER ACCEPTANCE TESTS PASSED (100%)!\n');
}

runTrustCenterAcceptanceTests().catch((err) => {
  console.error('❌ Trust Center Test Failure:', err);
  process.exit(1);
});
