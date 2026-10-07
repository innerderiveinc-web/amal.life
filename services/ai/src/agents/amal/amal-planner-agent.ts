import { AgentDefinition } from '../../runtime/agent-registry.js';
import { AIIntent, AgentResult, Amal, AmalRecommendation } from '@amal/types';
import { AmalRankingEngine, FeasibilityEngine } from '@amal/amal-engine';
import { db } from '@amal/database';

export interface AmalPlannerInput {
  userId: string;
  goalCategory?: string;
  availableMinutes?: number;
  energyLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  recentCompletions?: number;
}

export interface AmalPlannerOutput {
  primaryAction: AmalRecommendation;
  optionalActions: AmalRecommendation[];
  rationale: string;
}

export class AmalPlannerAgent implements AgentDefinition<AmalPlannerInput, AmalPlannerOutput> {
  name = 'AmalPlannerAgent';
  version = '1.0.0';
  description = 'Plans sustainable, evidence-grounded daily actions (1 Primary, 0-2 Optional).';
  allowedIntents = [AIIntent.AMAL_REQUEST, AIIntent.PERSONAL_DEEN_GUIDANCE];
  requiredEvidence = true;
  allowedTools = ['recommend_amal', 'get_active_journey'];
  requiredPermissions = ['READ_USER_GOAL'];
  maxSteps = 4;
  maxLatencyMs = 6000;

  async execute(input: AmalPlannerInput): Promise<AgentResult<AmalPlannerOutput>> {
    const candidates = Array.from(db.amals.values()).filter(
      (a) => a.userId === input.userId || a.userId === 'system_seed'
    );

    const scored: Array<{ amal: Amal; score: number }> = [];

    for (const a of candidates) {
      // 7-factor ranking calculation
      const score = AmalRankingEngine.calculateScore({
        evidenceFit: 0.95,
        goalFit: input.goalCategory ? (a.category === input.goalCategory ? 1.0 : 0.6) : 0.8,
        contextFit: 0.9,
        feasibility: FeasibilityEngine.calculateFeasibility({
          timeRequired: a.durationMinutes,
          timeAvailable: input.availableMinutes || 15,
          energyRequired: 'LOW',
          userEnergy: input.energyLevel || 'MEDIUM',
          complexity: 'LOW',
          environmentMatch: true,
        }),
        preferenceFit: 0.9,
        continuity: (input.recentCompletions || 0) > 0 ? 0.9 : 0.7,
        safety: 1.0,
      });

      scored.push({ amal: a, score });
    }

    scored.sort((a, b) => b.score - a.score);

    const primaryAmal = scored[0]?.amal || {
      id: 'aml_default_quran_5m',
      userId: input.userId,
      title: '5-Minute Calm Quran Reading After Fajr',
      type: 'QURANIC_PRACTICE' as any,
      category: 'QURAN' as any,
      durationMinutes: 5,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const primaryRec: AmalRecommendation = {
      amal: primaryAmal,
      score: scored[0]?.score || 0.88,
      rationale: 'Calibrated to remove friction and establish sustainable daily practice.',
      feasibility: 'HIGH',
      cognitiveLoad: 'MINIMAL',
    };

    const optionalActions: AmalRecommendation[] = scored.slice(1, 3).map((item) => ({
      amal: item.amal,
      score: item.score,
      rationale: 'Optional complementary practice.',
      feasibility: 'HIGH',
      cognitiveLoad: 'LIGHT',
    }));

    return {
      agentName: this.name,
      success: true,
      data: {
        primaryAction: primaryRec,
        optionalActions,
        rationale: 'Maximum 1 Primary and up to 2 Optional actions to eliminate psychological fatigue.',
      },
    };
  }
}
