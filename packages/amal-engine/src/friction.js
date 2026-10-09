"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrictionEngine = void 0;
class FrictionEngine {
    static evaluateFrictionSignals(params) {
        let confidence = 0.10;
        if (params.consecutiveMisses === 2)
            confidence = 0.35;
        if (params.consecutiveMisses >= 3)
            confidence = 0.65;
        if (params.consecutiveMisses >= 3 && params.reflectionReason)
            confidence = 0.90;
        let type = 'TIME';
        if (params.reflectionReason?.toLowerCase().includes('tired') || params.reflectionReason?.toLowerCase().includes('sleep')) {
            type = 'ENERGY';
        }
        else if (params.reflectionReason?.toLowerCase().includes('forgot')) {
            type = 'FORGETTING';
        }
        else if (params.actionDurationMinutes && params.actionDurationMinutes > 15) {
            type = 'TOO_LONG';
        }
        const adaptationRecommended = confidence >= 0.60;
        let suggestedAction = undefined;
        if (adaptationRecommended) {
            if (type === 'TOO_LONG' || type === 'TIME') {
                suggestedAction = 'SHORTEN';
            }
            else if (type === 'ENERGY') {
                suggestedAction = 'RESCHEDULE';
            }
            else {
                suggestedAction = 'SIMPLIFY';
            }
        }
        return {
            type,
            confidence,
            adaptationRecommended,
            suggestedAction,
            propheticMessage: 'Practice grows through gentleness. "Make things easy, and do not make them difficult." (Sahih al-Bukhari 69)',
        };
    }
}
exports.FrictionEngine = FrictionEngine;
//# sourceMappingURL=friction.js.map