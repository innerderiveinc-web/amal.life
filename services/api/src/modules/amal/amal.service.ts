import { AmalJourneyEngine } from '@amal/service-ai';
import { AmalRepository } from './amal.repository.js';

export class AmalService {
  public static createGoal(userId: string, body: any): any {
    return AmalJourneyEngine.createGoal(
      userId,
      body.title || 'Consistent Salah & Quran Habit',
      body.category || 'SALAH',
      body.intent || 'HABIT_FORMATION',
      body.desired_outcome || 'Sustainable daily connection',
      body.baseline || {
        currentFrequency: 'OCCASIONALLY',
        currentMinutes: 5,
        targetFrequency: 'DAILY',
        targetMinutes: 15,
        perceivedObstacles: ['Time constraint', 'Late bedtime'],
      },
      body.time_horizon || '14_DAYS'
    );
  }

  public static completeAmal(userId: string, amalId: string, actualMinutes: number, plannedMinutes: number, notes?: string): any {
    return AmalJourneyEngine.recordCompletion(userId, amalId, plannedMinutes, actualMinutes, notes);
  }
}
