import { DailyKnowledgeEngine } from '@amal/amal-engine';

/**
 * Daily Plan Worker
 * Generates and updates next daily plan for active user journeys with automated knowledge broadcast
 */
export async function processDailyPlanJob(job: { userId: string; date: string }) {
  const broadcast = DailyKnowledgeEngine.getBroadcast(job.date ? new Date(job.date) : new Date());
  console.log(`[Worker:DailyPlan] Automated Daily Knowledge broadcast compiled for user ${job.userId}:`);
  console.log(`   - Ayah of the Day: Surah ${broadcast.ayah.surahNameEnglish} (${broadcast.ayah.surahNumber}:${broadcast.ayah.ayahNumber})`);
  console.log(`   - Hadith: ${broadcast.hadith.sourceBook}`);
  console.log(`   - Dua: ${broadcast.dua.titleEnglish} (${broadcast.dua.sourceBook})`);
  console.log(`   - Hikmat: ${broadcast.hikmat.titleEnglish} (${broadcast.hikmat.sourceBook})`);

  return {
    success: true,
    processedAt: new Date().toISOString(),
    broadcast,
  };
}
