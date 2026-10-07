export class BurdenGuard {
  /**
   * Calculates total active daily burden across goals & active journeys.
   * Caps active daily commitment at 30 minutes to safeguard against spiritual fatigue.
   */
  public static calculateBurden(actions: { durationMinutes: number }[]): {
    totalMinutes: number;
    burdenLevel: 'LIGHT' | 'BALANCED' | 'HEAVY';
    isOverloaded: boolean;
  } {
    const totalMinutes = actions.reduce((sum, a) => sum + a.durationMinutes, 0);

    let burdenLevel: 'LIGHT' | 'BALANCED' | 'HEAVY' = 'LIGHT';
    if (totalMinutes > 30) burdenLevel = 'HEAVY';
    else if (totalMinutes > 15) burdenLevel = 'BALANCED';

    return {
      totalMinutes,
      burdenLevel,
      isOverloaded: totalMinutes > 30,
    };
  }
}
