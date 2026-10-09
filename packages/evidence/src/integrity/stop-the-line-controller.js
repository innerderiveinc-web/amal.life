"use strict";
// ==============================================================================
// AMAL OS — STOP THE LINE CONTROLLER (Control #21)
// Automated circuit breaker upon detecting any citation or integrity incident.
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopTheLineController = void 0;
const knowledge_policy_engine_js_1 = require("./knowledge-policy-engine.js");
class StopTheLineController {
    static activeFreezes = new Map();
    static globalLineStopped = false;
    /**
     * Emergency Trigger: Stop the line and freeze knowledge path
     */
    static triggerStop(data) {
        const incidentId = `halt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const freeze = {
            incidentId,
            triggerType: data.triggerType,
            affectedPaths: data.affectedPaths,
            frozenAt: new Date().toISOString(),
            isActive: true,
            resolutionSummary: data.reason,
        };
        this.activeFreezes.set(incidentId, freeze);
        this.globalLineStopped = true;
        // Immediately disable AI generation across the platform
        knowledge_policy_engine_js_1.KnowledgePolicyEngine.setIslamicAiEnabled(false);
        return freeze;
    }
    /**
     * Resume line after thorough investigation and re-testing
     */
    static resolveAndResume(incidentId, resolutionSummary) {
        const freeze = this.activeFreezes.get(incidentId);
        if (!freeze)
            return false;
        freeze.isActive = false;
        freeze.unfrozenAt = new Date().toISOString();
        freeze.resolutionSummary = resolutionSummary;
        // Check if any other freezes are active
        const hasRemaining = Array.from(this.activeFreezes.values()).some((f) => f.isActive);
        if (!hasRemaining) {
            this.globalLineStopped = false;
            knowledge_policy_engine_js_1.KnowledgePolicyEngine.setIslamicAiEnabled(true);
        }
        return true;
    }
    static isLineStopped() {
        return this.globalLineStopped;
    }
    static getActiveFreezes() {
        return Array.from(this.activeFreezes.values()).filter((f) => f.isActive);
    }
}
exports.StopTheLineController = StopTheLineController;
//# sourceMappingURL=stop-the-line-controller.js.map