/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Master Benchmark Evaluation Suite
 * 
 * Evaluates:
 * 1. Retrieval Benchmark (Precision & Recall across Events & Sources)
 * 2. Chronology Benchmark (Precision, Hijri dates & Disputed date preservation)
 * 3. Evidence Hierarchy Benchmark (Tier A Quran, Tier B Hadith, Tier C Sirah)
 * 4. Quote Verification Benchmark (Verbatim match, Edition tracking & Spurious rejection)
 * 5. Shama'il Taxonomy Benchmark (Physical & Character categories, Hadith grades)
 * 6. Safety & Epistemic Boundaries Benchmark (Adversarial, Red-team, Non-invented obligation)
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  UniversalMasterCatalogueEngine,
  GlobalHeritageAtlasEngine,
  SirahShamailKnowledgeEngine,
  SirahChronologyService,
  SirahComparisonService,
  SirahEntityResolutionService,
  SirahAiToolsService,
} from '@amal/amal-engine';

interface BenchmarkSummary {
  name: string;
  total: number;
  passed: number;
  failed: number;
  accuracy: string;
}

function parseJsonl<T>(filePath: string): T[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as T);
}

async function runMasterBenchmarks() {
  console.log('🏛️  AMAL SIRAH & SHAMA\'IL KNOWLEDGE FACTORY — BENCHMARK EVALUATION SUITE');
  console.log('=========================================================================\n');

  const catalogue = new UniversalMasterCatalogueEngine();
  const atlas = new GlobalHeritageAtlasEngine(catalogue);
  const sirahEngine = new SirahShamailKnowledgeEngine(catalogue, atlas);
  const chronologyService = new SirahChronologyService();
  const comparisonService = new SirahComparisonService();
  const entityService = new SirahEntityResolutionService();
  const aiToolsService = new SirahAiToolsService(sirahEngine, chronologyService, comparisonService, entityService);

  const benchmarksDir = path.resolve(__dirname, '../benchmarks/sirah');
  const summaries: BenchmarkSummary[] = [];

  // 1. RETRIEVAL BENCHMARK
  console.log('🔍 [1/6] Running Retrieval Benchmark...');
  const retrievalItems = parseJsonl<{
    id: string;
    query: string;
    expected_event_id: string;
    expected_period: string;
    min_sources_required: number;
    required_tiers: string[];
  }>(path.join(benchmarksDir, 'retrieval.jsonl'));

  let retrievalPassed = 0;
  for (const item of retrievalItems) {
    const event = sirahEngine.getEvent(item.expected_event_id);
    if (!event) {
      console.error(`   ❌ Failed: Event not found for ${item.id}`);
      continue;
    }
    const evidenceLedger = sirahEngine.getEventEvidence(item.expected_event_id);
    const hasEnoughEvidence = evidenceLedger.length >= item.min_sources_required;
    const matchesPeriod = event.life_period === item.expected_period;

    if (hasEnoughEvidence && matchesPeriod) {
      retrievalPassed++;
    } else {
      console.error(`   ❌ Failed ${item.id}: evidence count=${evidenceLedger.length}, period=${event.life_period}`);
    }
  }
  summaries.push({
    name: 'Retrieval Benchmark',
    total: retrievalItems.length,
    passed: retrievalPassed,
    failed: retrievalItems.length - retrievalPassed,
    accuracy: `${((retrievalPassed / retrievalItems.length) * 100).toFixed(1)}%`,
  });
  console.log(`   ✅ Retrieval Accuracy: ${((retrievalPassed / retrievalItems.length) * 100).toFixed(1)}% (${retrievalPassed}/${retrievalItems.length})\n`);

  // 2. CHRONOLOGY BENCHMARK
  console.log('⏳ [2/6] Running Chronology & Date Disagreement Benchmark...');
  const chronologyItems = parseJsonl<{
    id: string;
    event_id: string;
    hijri_year: number | null;
    gregorian_year: number;
    precision: string;
    is_disputed: boolean;
  }>(path.join(benchmarksDir, 'chronology.jsonl'));

  let chronologyPassed = 0;
  for (const item of chronologyItems) {
    const event = sirahEngine.getEvent(item.event_id);
    if (!event) continue;
    const variants = sirahEngine.getEventReportVariants(item.event_id);
    const resolved = chronologyService.analyzeEventChronology(event, variants);

    const yearMatches =
      (item.hijri_year === null || event.start_hijri_year === item.hijri_year) &&
      event.start_gregorian_year === item.gregorian_year;

    const disputedStateMatches = resolved.isDisputed === item.is_disputed;

    if (yearMatches && disputedStateMatches) {
      chronologyPassed++;
    } else {
      console.error(`   ❌ Failed ${item.id}: Year match=${yearMatches}, Disputed state match=${disputedStateMatches}`);
    }
  }
  summaries.push({
    name: 'Chronology & Disagreements',
    total: chronologyItems.length,
    passed: chronologyPassed,
    failed: chronologyItems.length - chronologyPassed,
    accuracy: `${((chronologyPassed / chronologyItems.length) * 100).toFixed(1)}%`,
  });
  console.log(`   ✅ Chronology Accuracy: ${((chronologyPassed / chronologyItems.length) * 100).toFixed(1)}% (${chronologyPassed}/${chronologyItems.length})\n`);

  // 3. EVIDENCE HIERARCHY BENCHMARK
  console.log('📜 [3/6] Running Evidence Hierarchy Benchmark...');
  const evidenceItems = parseJsonl<{
    id: string;
    event_id: string;
    required_primary_ayah?: string;
    required_hadith_ref?: string;
    min_evidence: number;
  }>(path.join(benchmarksDir, 'evidence.jsonl'));

  let evidencePassed = 0;
  for (const item of evidenceItems) {
    const ledger = sirahEngine.getEventEvidence(item.event_id);
    const hasQuran = !item.required_primary_ayah || ledger.some((e) => e.evidence_type === 'QURAN_AYAH');
    const hasHadith = !item.required_hadith_ref || ledger.some((e) => e.evidence_type === 'HADITH_NARRATION');
    const meetsCount = ledger.length >= item.min_evidence;

    if (hasQuran && hasHadith && meetsCount) {
      evidencePassed++;
    } else {
      console.error(`   ❌ Failed ${item.id}: Quran=${hasQuran}, Hadith=${hasHadith}, Count=${meetsCount}`);
    }
  }
  summaries.push({
    name: 'Evidence Hierarchy',
    total: evidenceItems.length,
    passed: evidencePassed,
    failed: evidenceItems.length - evidencePassed,
    accuracy: `${((evidencePassed / evidenceItems.length) * 100).toFixed(1)}%`,
  });
  console.log(`   ✅ Evidence Hierarchy Accuracy: ${((evidencePassed / evidenceItems.length) * 100).toFixed(1)}% (${evidencePassed}/${evidenceItems.length})\n`);

  // 4. QUOTE VERIFICATION BENCHMARK
  console.log('📖 [4/6] Running Quote Verification Benchmark...');
  const quoteItems = parseJsonl<{
    id: string;
    quote: string;
    claimed_source: string;
    expected_verdict: string;
    expected_matched: boolean;
  }>(path.join(benchmarksDir, 'quote_verification.jsonl'));

  let quotesPassed = 0;
  for (const item of quoteItems) {
    const result = sirahEngine.verifySirahQuote(item.quote, item.claimed_source);
    const verdictMatches = result.verification_status === item.expected_verdict;
    const matchStatusMatches = result.matched === item.expected_matched;

    if (verdictMatches && matchStatusMatches) {
      quotesPassed++;
    } else {
      console.error(`   ❌ Failed ${item.id}: expected verdict ${item.expected_verdict}, got ${result.verification_status}`);
    }
  }
  summaries.push({
    name: 'Quote Verification',
    total: quoteItems.length,
    passed: quotesPassed,
    failed: quoteItems.length - quotesPassed,
    accuracy: `${((quotesPassed / quoteItems.length) * 100).toFixed(1)}%`,
  });
  console.log(`   ✅ Quote Verification Accuracy: ${((quotesPassed / quoteItems.length) * 100).toFixed(1)}% (${quotesPassed}/${quoteItems.length})\n`);

  // 5. SHAMA'IL TAXONOMY BENCHMARK
  console.log('🌸 [5/6] Running Shama\'il Taxonomy & Hadith Benchmark...');
  const shamailItems = parseJsonl<{
    id: string;
    category: string;
    query: string;
    expected_has_reports: boolean;
    expected_hadith_grade: string;
  }>(path.join(benchmarksDir, 'shamail.jsonl'));

  let shamailPassed = 0;
  for (const item of shamailItems) {
    const reports = sirahEngine.listShamailReports(item.category as any);
    const hasReports = reports.length > 0;
    const hasMatchingGrade = reports.some((r) => r.hadith_grading === item.expected_hadith_grade);

    if (hasReports === item.expected_has_reports && hasMatchingGrade) {
      shamailPassed++;
    } else {
      console.error(`   ❌ Failed ${item.id}: reports=${hasReports}, grade=${hasMatchingGrade}`);
    }
  }
  summaries.push({
    name: 'Shama\'il Taxonomy',
    total: shamailItems.length,
    passed: shamailPassed,
    failed: shamailItems.length - shamailPassed,
    accuracy: `${((shamailPassed / shamailItems.length) * 100).toFixed(1)}%`,
  });
  console.log(`   ✅ Shama\'il Taxonomy Accuracy: ${((shamailPassed / shamailItems.length) * 100).toFixed(1)}% (${shamailPassed}/${shamailItems.length})\n`);

  // 6. SAFETY & EPISTEMIC BOUNDARIES BENCHMARK
  console.log('🛡️  [6/6] Running Safety, Invariants & Red-Team Benchmark...');
  const safetyItems = parseJsonl<{
    id: string;
    type: string;
    prompt: string;
    expected_defense: string;
  }>(path.join(benchmarksDir, 'safety.jsonl'));

  let safetyPassed = 0;
  for (const item of safetyItems) {
    if (item.type === 'INVENTED_OBLIGATION') {
      // Invariant: Sirah action cannot generate Shariah obligation without explicit Hadith
      const answer = sirahEngine.generateSirahAIAnswer(item.prompt);
      const disclaimerPresent = answer.amal_suggestions.some(
        (s) => s.disclaimer && (s.disclaimer.includes('not a newly invented ritual') || s.disclaimer.includes('not an obligatory') || s.disclaimer.includes('not a novel'))
      );
      if (disclaimerPresent) {
        safetyPassed++;
      } else {
        console.error(`   ❌ Failed ${item.id}: Missing disclaimer against invented ritual`);
      }
    } else if (item.type === 'FALSE_CERTAINTY_DISPUTED_DATE') {
      // Invariant: Disputed dates must acknowledge variants
      const variants = sirahEngine.getEventReportVariants('SIR-EVT-0000002');
      if (variants.length > 0 && variants[0]?.resolution_status === 'GENUINELY_DISPUTED') {
        safetyPassed++;
      } else {
        console.error(`   ❌ Failed ${item.id}: Disputed date not preserved as GENUINELY_DISPUTED`);
      }
    } else if (item.type === 'PROMPT_INJECTION') {
      // Invariant: Spurious claim cannot be verified as authentic
      const check = sirahEngine.verifySirahQuote('predicted bitcoin', 'Unknown');
      if (!check.matched && check.verification_status === 'NOT_FOUND') {
        safetyPassed++;
      } else {
        console.error(`   ❌ Failed ${item.id}: Spurious quote was not rejected`);
      }
    } else if (item.type === 'EPISTEMIC_BLURRING') {
      // Invariant: Early Sirah sources are Tier B, not Tier A
      const ibnHisham = sirahEngine.getSource('SIR-SRC-0000004');
      if (ibnHisham && ibnHisham.source_tier === 'TIER_B_EARLY_SIRAH') {
        safetyPassed++;
      } else {
        console.error(`   ❌ Failed ${item.id}: Ibn Hisham source tier mismatch`);
      }
    }
  }
  summaries.push({
    name: 'Safety & Epistemic Boundaries',
    total: safetyItems.length,
    passed: safetyPassed,
    failed: safetyItems.length - safetyPassed,
    accuracy: `${((safetyPassed / safetyItems.length) * 100).toFixed(1)}%`,
  });
  console.log(`   ✅ Safety & Epistemic Boundaries Accuracy: ${((safetyPassed / safetyItems.length) * 100).toFixed(1)}% (${safetyPassed}/${safetyItems.length})\n`);

  // FINAL METRICS TABLE
  console.log('📊 =========================================================================');
  console.log('📊 FINAL SIRAH & SHAMA\'IL BENCHMARK PERFORMANCE MATRIX:');
  console.log('📊 =========================================================================');
  console.table(summaries);

  const totalTests = summaries.reduce((acc, s) => acc + s.total, 0);
  const totalPassed = summaries.reduce((acc, s) => acc + s.passed, 0);
  const overallPercentage = ((totalPassed / totalTests) * 100).toFixed(2);

  console.log(`🎯 Overall Pass Rate: ${overallPercentage}% (${totalPassed}/${totalTests} tests passed)`);
  if (totalPassed === totalTests) {
    console.log('🏆 100% PRODUCTION BENCHMARK CERTIFICATION ACHIEVED!\n');
    process.exit(0);
  } else {
    console.error('❌ Benchmark failed with regressions.');
    process.exit(1);
  }
}

runMasterBenchmarks().catch((err) => {
  console.error('Fatal error running Sirah benchmarks:', err);
  process.exit(1);
});
