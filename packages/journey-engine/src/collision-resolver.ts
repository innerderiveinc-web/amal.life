export interface ActiveJourneyLoad {
  journeyId: string;
  title: string;
  requestedDailyMinutes: number;
}

export interface CollisionResolution {
  hasCollision: boolean;
  totalRequestedMinutes: number;
  availableMinutes: number;
  surplusMinutes: number;
  message?: string;
  proposedOptions?: Array<'KEEP' | 'MERGE' | 'SIMPLIFY' | 'RESCHEDULE' | 'PAUSE' | 'REDUCE'>;
}

export class JourneyCollisionEngine {
  public static detectAndResolve(
    activeJourneys: ActiveJourneyLoad[],
    availableMinutes: number
  ): CollisionResolution {
    const totalRequested = activeJourneys.reduce((sum, j) => sum + j.requestedDailyMinutes, 0);

    if (totalRequested > availableMinutes) {
      const surplus = totalRequested - availableMinutes;
      return {
        hasCollision: true,
        totalRequestedMinutes: totalRequested,
        availableMinutes,
        surplusMinutes: surplus,
        message: `Your active journeys currently ask for ${totalRequested} minutes, which exceeds your planned capacity (${availableMinutes} mins). Would you like to simplify or adjust one?`,
        proposedOptions: ['SIMPLIFY', 'RESCHEDULE', 'PAUSE', 'KEEP'],
      };
    }

    return {
      hasCollision: false,
      totalRequestedMinutes: totalRequested,
      availableMinutes,
      surplusMinutes: 0,
    };
  }
}
