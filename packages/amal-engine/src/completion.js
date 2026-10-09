"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmalCompletionEngine = void 0;
class AmalCompletionEngine {
    static recordedKeys = new Set();
    static record(input) {
        if (this.recordedKeys.has(input.idempotencyKey)) {
            return {
                completionType: 'FULL',
                durationSeconds: input.actualSeconds,
                recorded: true,
                duplicate: true,
            };
        }
        this.recordedKeys.add(input.idempotencyKey);
        const actualMinutes = Math.floor(input.actualSeconds / 60);
        let completionType = 'FULL';
        if (actualMinutes === 0) {
            completionType = 'SKIPPED';
        }
        else if (actualMinutes < 3) {
            completionType = 'MINIMUM';
        }
        else if (actualMinutes < input.plannedMinutes) {
            completionType = 'PARTIAL';
        }
        return {
            completionType,
            durationSeconds: input.actualSeconds,
            recorded: true,
            duplicate: false,
        };
    }
}
exports.AmalCompletionEngine = AmalCompletionEngine;
//# sourceMappingURL=completion.js.map