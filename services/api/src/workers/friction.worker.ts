/**
 * Friction Worker
 * Detects patterns of fatigue or friction and initiates non-punitive adaptations
 */
export async function processFrictionJob(job: { userId: string; journeyId?: string; frictionSignals: any[] }) {
  console.log(`[Worker:Friction] Analyzing friction signals for user ${job.userId}`);
  return { adaptationRecommended: job.frictionSignals?.length >= 2, processedAt: new Date().toISOString() };
}
