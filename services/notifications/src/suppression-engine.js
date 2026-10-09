"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppressionEngine = void 0;
class SuppressionEngine {
    /**
     * Evaluates all core suppression rules. Returns whether the notification must be withheld.
     * Silence is a first-class product feature in AMAL OS.
     */
    static evaluate(context) {
        const now = context.now || new Date();
        // 1. Global Kill Switch Check
        if (context.isKillSwitchActive) {
            return {
                shouldSuppress: true,
                reasonCode: 'KILL_SWITCH_ACTIVE',
                detail: 'Global emergency circuit breaker active.',
            };
        }
        // 2. Exact Deduplication
        if (context.isDuplicate) {
            return {
                shouldSuppress: true,
                reasonCode: 'DEDUPLICATED',
                detail: 'Identical notification has already been scheduled or dispatched.',
            };
        }
        // 3. User Already Completed Amal
        if (context.purpose === 'AMAL_REMINDER' && context.amalCompletedToday) {
            return {
                shouldSuppress: true,
                reasonCode: 'COMPLETED_AMAL',
                detail: 'Target Amal has already been completed today. Reminder suppressed.',
            };
        }
        // 4. User Already Active in App (Active within last 5 minutes)
        if (context.lastActiveSessionMinutesAgo !== undefined &&
            context.lastActiveSessionMinutesAgo <= 5 &&
            context.priority !== 'P0') {
            return {
                shouldSuppress: true,
                reasonCode: 'USER_ALREADY_ACTIVE',
                detail: 'User is actively engaging in AMAL. External buzz suppressed to avoid disruption.',
            };
        }
        // 5. Quiet Hours Check
        if (context.quietHoursPreferences.enabled && context.priority !== 'P0') {
            const inQuietHours = this.isInQuietHours(now, context.quietHoursPreferences.start, context.quietHoursPreferences.end, context.quietHoursPreferences.timezone);
            if (inQuietHours) {
                return {
                    shouldSuppress: true,
                    reasonCode: 'QUIET_HOURS',
                    detail: 'Notification falls within user-specified quiet hours.',
                    canDefer: true,
                    deferredUntil: this.calculateQuietHoursEndTime(now, context.quietHoursPreferences.end, context.quietHoursPreferences.timezone),
                };
            }
        }
        // 6. Fatigue Threshold Breached
        if (context.fatigueBreached && context.priority !== 'P0' && context.priority !== 'P1') {
            return {
                shouldSuppress: true,
                reasonCode: 'NOTIFICATION_FATIGUE',
                detail: 'User has high dismissal rate or reached daily notification threshold.',
            };
        }
        return { shouldSuppress: false };
    }
    static isInQuietHours(now, startTimeStr, endTimeStr, timezone) {
        try {
            // Format current time in user's timezone
            const userTimeString = now.toLocaleTimeString('en-GB', {
                timeZone: timezone,
                hour12: false,
            }); // "HH:MM:SS"
            const toSeconds = (t) => {
                const [h, m, s] = t.split(':').map((x) => parseInt(x, 10) || 0);
                return h * 3600 + m * 60 + s;
            };
            const currentSec = toSeconds(userTimeString);
            const startSec = toSeconds(startTimeStr);
            const endSec = toSeconds(endTimeStr);
            if (startSec > endSec) {
                // Crosses midnight, e.g. 22:00 to 07:00
                return currentSec >= startSec || currentSec < endSec;
            }
            else {
                // Same day window, e.g. 13:00 to 15:00
                return currentSec >= startSec && currentSec < endSec;
            }
        }
        catch {
            // Fallback: UTC calculation
            const currentHours = now.getUTCHours();
            return currentHours >= 22 || currentHours < 7;
        }
    }
    static calculateQuietHoursEndTime(now, endTimeStr, timezone) {
        const [h, m] = endTimeStr.split(':').map((x) => parseInt(x, 10) || 0);
        const deferred = new Date(now);
        deferred.setUTCHours(h, m, 0, 0);
        if (deferred <= now) {
            deferred.setUTCDate(deferred.getUTCDate() + 1);
        }
        return deferred.toISOString();
    }
}
exports.SuppressionEngine = SuppressionEngine;
//# sourceMappingURL=suppression-engine.js.map