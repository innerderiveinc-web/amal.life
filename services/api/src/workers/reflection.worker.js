"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processReflectionJob = processReflectionJob;
/**
 * Reflection Worker
 * Processes reflection metadata and aggregates personal growth insights without exposing private text
 */
async function processReflectionJob(job) {
    console.log(`[Worker:Reflection] Processing private reflection ${job.reflectionId} metadata for user ${job.userId}`);
    return { indexed: true, processedAt: new Date().toISOString() };
}
//# sourceMappingURL=reflection.worker.js.map