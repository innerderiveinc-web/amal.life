"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GentleNotificationEngine = void 0;
__exportStar(require("./consent-engine.js"), exports);
__exportStar(require("./prayer-context-engine.js"), exports);
__exportStar(require("./fatigue-engine.js"), exports);
__exportStar(require("./collision-engine.js"), exports);
__exportStar(require("./suppression-engine.js"), exports);
__exportStar(require("./re-engagement-engine.js"), exports);
__exportStar(require("./template-engine.js"), exports);
__exportStar(require("./qsura-gateway.js"), exports);
__exportStar(require("./global-kill-switches.js"), exports);
__exportStar(require("./communication-orchestrator.js"), exports);
class GentleNotificationEngine {
    /**
     * Generates a respectful, non-shaming prayer reminder
     * Adheres strictly to Section 76: "Never 'You haven't prayed', Prefer 'Asr is approaching'."
     */
    static composePrayerReminder(prayerName, minutesUntil, style = 'CALM') {
        const formattedPrayer = prayerName.charAt(0) + prayerName.slice(1).toLowerCase();
        if (style === 'SILENT') {
            return { title: '', body: '' };
        }
        if (minutesUntil <= 0) {
            return {
                title: `${formattedPrayer} Time Has Arrived`,
                body: 'A quiet pause in your day to reconnect with your Creator.',
            };
        }
        return {
            title: `${formattedPrayer} is Approaching`,
            body: `In approximately ${minutesUntil} minutes. Prepare with ease and calm.`,
        };
    }
    /**
     * Generates an encouraging, non-guilt journey nudge
     * Adheres to: "Never 'You broke your streak', Prefer 'Ready to continue?'"
     */
    static composeJourneyNudge(journeyTitle, actionTitle) {
        return {
            title: 'Ready to continue?',
            body: `Today's small step in ${journeyTitle}: ${actionTitle}.`,
        };
    }
    /**
     * Generates a peaceful evening reflection invite
     */
    static composeMuhasabahReminder() {
        return {
            title: 'A Calm Moment of Reflection',
            body: 'Take 2 minutes for your daily Muhasabah: what went well and what felt meaningful today?',
        };
    }
}
exports.GentleNotificationEngine = GentleNotificationEngine;
//# sourceMappingURL=index.js.map