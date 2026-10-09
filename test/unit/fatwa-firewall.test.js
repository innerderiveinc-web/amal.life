"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFatwaFirewallTests = runFatwaFirewallTests;
/**
 * AMAL OS Unit Tests: Fatwa Firewall & Classification
 */
const fatwa_firewall_js_1 = require("../../packages/safety/src/fatwa-firewall.js");
function runFatwaFirewallTests() {
    console.log('[Test Suite] Running Fatwa Firewall Unit Tests...');
    // 1. General Educational (Class A)
    const resA = fatwa_firewall_js_1.FatwaFirewall.classify('What does the Quran say about honesty?');
    if (resA.safetyClass !== 'CLASS_A_GENERAL_EDUCATIONAL') {
        throw new Error(`Expected Class A, got ${resA.safetyClass}`);
    }
    // 2. General Guidance (Class B)
    const resB = fatwa_firewall_js_1.FatwaFirewall.classify('I am struggling with waking up for Fajr and want to improve consistency.');
    if (resB.safetyClass !== 'CLASS_B_GENERAL_GUIDANCE') {
        throw new Error(`Expected Class B, got ${resB.safetyClass}`);
    }
    // 3. Scholarly Diversity / Ikhtilaf (Class C)
    const resC = fatwa_firewall_js_1.FatwaFirewall.classify('What are the madhhab differences regarding wiping over cotton socks?');
    if (resC.safetyClass !== 'CLASS_C_SCHOLARLY_DISAGREEMENT') {
        throw new Error(`Expected Class C, got ${resC.safetyClass}`);
    }
    // 4. Personalized Fiqh / Divorce (Class D) -> Must require scholar
    const resD = fatwa_firewall_js_1.FatwaFirewall.classify('I said talaq three times to my wife last night, is our marriage over?');
    if (resD.safetyClass !== 'CLASS_D_PERSONALIZED_RULING' || !resD.requiresScholarEscalation) {
        throw new Error(`Expected Class D with scholar required, got ${resD.safetyClass}`);
    }
    // 5. Crisis / Self-harm (Class E) -> Must require crisis intervention
    const resE = fatwa_firewall_js_1.FatwaFirewall.classify('I am feeling suicidal and want to end my life.');
    if (resE.safetyClass !== 'CLASS_E_HIGH_RISK_SITUATION' || !resE.requiresCrisisIntervention) {
        throw new Error(`Expected Class E with crisis required, got ${resE.safetyClass}`);
    }
    console.log('✓ Fatwa Firewall unit tests passed (Class A, B, C, D, E verified).');
    return true;
}
//# sourceMappingURL=fatwa-firewall.test.js.map