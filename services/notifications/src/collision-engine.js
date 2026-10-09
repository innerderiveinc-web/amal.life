"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionEngine = void 0;
class CollisionEngine {
    static PRIORITY_WEIGHTS = {
        P0: 100, // Emergency / Security
        P1: 80, // Scholar private response
        P2: 60, // Prayer window approaching
        P3: 40, // Daily core Amal reminder
        P4: 20, // Muhasabah reflection invite
        P5: 10, // Weekly summary
    };
    /**
     * Resolves temporal collisions within a given window (default: 30 minutes).
     * Prevents overwhelming the user with multiple alerts.
     */
    static resolveCollisions(candidates, windowMinutes = 30) {
        if (candidates.length <= 1) {
            return {
                approved: candidates,
                deferred: [],
                suppressed: [],
            };
        }
        // Sort by priority descending
        const sorted = [...candidates].sort((a, b) => {
            const weightA = this.PRIORITY_WEIGHTS[a.priority] || 0;
            const weightB = this.PRIORITY_WEIGHTS[b.priority] || 0;
            return weightB - weightA;
        });
        const highest = sorted[0];
        const windowMs = windowMinutes * 60 * 1000;
        const approved = [highest];
        const deferred = [];
        const suppressed = [];
        for (let i = 1; i < sorted.length; i++) {
            const current = sorted[i];
            const timeDiff = Math.abs(current.scheduledTime - highest.scheduledTime);
            if (timeDiff <= windowMs) {
                // Routine reminders (P3, P4, P5) colliding with higher priority notifications are suppressed or deferred
                if (current.priority === 'P3' || current.priority === 'P4' || current.priority === 'P5') {
                    suppressed.push(current);
                }
                else {
                    // P1 / P2 collisions are deferred past the window
                    deferred.push({
                        ...current,
                        scheduledTime: highest.scheduledTime + windowMs + 5 * 60 * 1000,
                    });
                }
            }
            else {
                approved.push(current);
            }
        }
        // Check if multiple routine notifications can be collapsed into a calm digest
        let combinedDigest;
        if (suppressed.length > 0 && highest.priority === 'P3') {
            combinedDigest = {
                channel: highest.channel,
                title: 'A Calm Focus for Your Day',
                body: `${highest.title} and ${suppressed.length} other gentle reminder(s) ready in AMAL.`,
            };
        }
        return {
            approved,
            deferred,
            suppressed,
            combinedDigest,
        };
    }
}
exports.CollisionEngine = CollisionEngine;
//# sourceMappingURL=collision-engine.js.map