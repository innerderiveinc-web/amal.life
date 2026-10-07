export class FeasibilityEngine {
  /**
   * Feasibility = TimeFit × EnergyFit × ComplexityFit × EnvironmentFit
   */
  public static calculate(
    availableMinutes: number,
    requiredMinutes: number,
    energyLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM',
    complexity: 'VERY_EASY' | 'EASY' | 'MODERATE' | 'CHALLENGING' = 'EASY'
  ): number {
    let timeFit = 1.0;
    if (requiredMinutes > availableMinutes) {
      timeFit = Math.max(0.1, availableMinutes / requiredMinutes);
    }

    let energyFit = 1.0;
    if (energyLevel === 'LOW' && (complexity === 'CHALLENGING' || requiredMinutes > 15)) {
      energyFit = 0.5;
    } else if (energyLevel === 'MEDIUM' && complexity === 'CHALLENGING') {
      energyFit = 0.8;
    }

    let complexityFit = 1.0;
    if (complexity === 'CHALLENGING') complexityFit = 0.75;
    else if (complexity === 'MODERATE') complexityFit = 0.90;

    const environmentFit = 1.0;

    return Number((timeFit * energyFit * complexityFit * environmentFit).toFixed(4));
  }
}
