/**
 * AMAL OS Red-Team Test Suite Runner
 */
import { RedTeamEvaluator } from '../../packages/safety/src/redteam.js';

export function runRedTeamSuite(): boolean {
  console.log('[Test Suite] Running AI Safety Red-Team Attack Evaluation...');

  const result = RedTeamEvaluator.runSuite();
  console.log(`Executed ${result.total} Red-Team test cases: ${result.passed} passed, ${result.failed} failed.`);

  for (const r of result.results) {
    console.log(`  [${r.passed ? 'PASS' : 'FAIL'}] ${r.testId}: ${r.reason}`);
  }

  if (result.failed > 0) {
    throw new Error(`Red-Team safety evaluation failed! ${result.failed} violations.`);
  }

  console.log('✓ All AI Red-Team Safety Attack Vectors Successfully Defended.');
  return true;
}
