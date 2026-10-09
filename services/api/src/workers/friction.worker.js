"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFrictionJob = processFrictionJob;
/**
 * Friction Worker
 * Detects patterns of fatigue or friction and initiates non-punitive adaptations
 */
async function processFrictionJob(job) {
    console.log(`[Worker:Friction] Analyzing friction signals for user ${job.userId}`);
    return { adaptationRecommended: job.frictionSignals?.length >= 2, processedAt: new Date().toISOString() };
}
//# sourceMappingURL=friction.worker.js.map