import { AIRequest, ContextItem } from '@amal/types';
import { IntentResult } from '../intent/intent-engine.js';
import { SafetyEvaluation } from '../safety/safety-engine.js';
import { db } from '@amal/database';

export interface SelectedContext {
  level: 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';
  items: ContextItem[];
  filteredOutCount: number;
}

export class ContextFirewall {
  /**
   * Evaluates and minimizes user context based on ContextPolicy, Safety, and Intent
   */
  public static async select(
    request: AIRequest,
    intent: IntentResult,
    safety: SafetyEvaluation
  ): Promise<SelectedContext> {
    const selected: ContextItem[] = [];
    let filteredOutCount = 0;

    // L0: If personalization is disabled or forbidden by safety policy
    if (!request.contextPolicy?.allowPersonalization || !safety.personalizationAllowed) {
      return { level: 'L0', items: [], filteredOutCount: 0 };
    }

    // Evaluate candidate items for user
    const userGoals = Array.from(db.goals.values()).filter((g) => g.userId === request.userId);
    const userJourneys = Array.from(db.journeys.values()).filter((j) => j.userId === request.userId);

    // Goal relevance
    for (const g of userGoals) {
      const isRelevant =
        intent.primary.includes('QURAN') && g.category === 'QURAN' ||
        intent.primary.includes('SALAH') && g.category === 'SALAH' ||
        intent.primary === 'PERSONAL_DEEN_GUIDANCE';

      if (isRelevant) {
        selected.push({
          id: `ctx_goal_${g.id}`,
          type: 'EXPLICIT',
          key: `goal_${g.category}`,
          value: { title: g.title, status: g.status },
          confidence: 1.0,
          userConfirmed: true,
          sensitivity: 'NORMAL',
        });
      } else {
        filteredOutCount++;
      }
    }

    // Active journey context
    if (request.contextPolicy?.allowJourneyContext) {
      for (const j of userJourneys) {
        const jState = (j as any).state || j.status;
        if (jState === 'ACTIVE' || jState === 'STARTED' || jState === 'STRUGGLING') {
          selected.push({
            id: `ctx_jrn_${j.id}`,
            type: 'CONFIRMED',
            key: `active_journey_${j.id}`,
            value: { title: j.title, state: jState, currentPhase: (j as any).currentPhase ?? 1 },
            confidence: 0.95,
            userConfirmed: true,
            sensitivity: 'NORMAL',
          });
        }
      }
    }

    // STRICT NON-NEGOTIABLE BOUNDARY:
    // Adult private reflections and family conflicts NEVER pass to LLM context
    filteredOutCount += db.reflections.size;

    return {
      level: selected.length > 0 ? 'L3' : 'L1',
      items: selected,
      filteredOutCount,
    };
  }
}
