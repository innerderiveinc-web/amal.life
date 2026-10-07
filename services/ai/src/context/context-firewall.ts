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
   * Filters user profile and journey context down to Minimum Necessary Context
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
          key: `goal_${g.category}`,
          value: { title: g.title, status: g.status },
          provenance: 'EXPLICIT_CHOICE',
        });
      } else {
        filteredOutCount++;
      }
    }

    // Active journey context
    if (request.contextPolicy?.allowJourneyContext) {
      for (const j of userJourneys) {
        if (j.state === 'ACTIVE' || j.state === 'STARTED' || j.state === 'STRUGGLING') {
          selected.push({
            key: `active_journey_${j.id}`,
            value: { title: j.title, state: j.state, currentPhase: j.currentPhase },
            provenance: 'CONFIRMED_PREFERENCE',
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
