"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAmalScoreTests = runAmalScoreTests;
/**
 * AMAL OS Unit Tests: Amal Scoring & Feasibility Algorithm
 */
const amal_planner_js_1 = require("../../services/ai/src/agents/amal-planner.js");
function runAmalScoreTests() {
    console.log('[Test Suite] Running Amal Scoring Unit Tests...');
    // Case 1: High evidence fit, high context, high feasibility
    const score1 = amal_planner_js_1.AmalPlanner.calculateAmalScore(1.0, 0.9, 0.95, 1.0, 1.0);
    if (score1.totalScore < 0.8) {
        throw new Error(`Expected high score, got ${score1.totalScore}`);
    }
    // Case 2: Zero safety drops score to zero immediately
    const score2 = amal_planner_js_1.AmalPlanner.calculateAmalScore(1.0, 1.0, 1.0, 1.0, 0.0);
    if (score2.totalScore !== 0) {
        throw new Error(`Expected 0 score when safety is 0, got ${score2.totalScore}`);
    }
    console.log('✓ Amal Scoring Algorithm unit tests passed.');
    return true;
}
//# sourceMappingURL=amal-score.test.js.map