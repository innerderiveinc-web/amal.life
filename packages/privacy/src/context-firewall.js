"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextFirewall = void 0;
class ContextFirewall {
    /**
     * Section 8 & 9: Context Priority & Minimization
     * Priority: Explicit > Confirmed > Active Journey > Recent Behavior > Derived > AI Inference.
     * Strips all reflections, family journals, and confidential notes.
     */
    static filterContext(candidates) {
        const priorityWeights = {
            EXPLICIT_CHOICE: 6,
            CONFIRMED_PREFERENCE: 5,
            ACTIVE_JOURNEY: 4,
            RECENT_BEHAVIOR: 3,
            DERIVED_INSIGHT: 2,
            AI_INFERENCE: 1,
        };
        return candidates
            .filter((c) => !c.isSensitive)
            .filter((c) => !c.key.toLowerCase().includes('reflection'))
            .filter((c) => !c.key.toLowerCase().includes('secret'))
            .filter((c) => !c.key.toLowerCase().includes('confidential'))
            .sort((a, b) => (priorityWeights[b.source] ?? 0) - (priorityWeights[a.source] ?? 0))
            .slice(0, 5); // Return only minimum necessary context items
    }
}
exports.ContextFirewall = ContextFirewall;
//# sourceMappingURL=context-firewall.js.map