import { AgentDefinition } from '../../runtime/agent-registry.js';
import { AIIntent, AgentResult, Journey, JourneyState } from '@amal/types';
import { JourneyStateMachine, JourneyAdaptationEngine } from '@amal/journey-engine';
import { db } from '@amal/database';

export interface JourneyAgentInput {
  userId: string;
  journeyId: string;
  consecutiveMisses?: number;
}

export interface JourneyAgentOutput {
  journey: Journey;
  adaptationProposed?: {
    action: string;
    newDurationMinutes: number;
    propheticReassurance: string;
  };
}

export class JourneyExecutionAgent implements AgentDefinition<JourneyAgentInput, JourneyAgentOutput> {
  name = 'JourneyExecutionAgent';
  version = '1.0.0';
  description = 'Coordinates progressive journey phases, friction detection, and non-punitive adaptations.';
  allowedIntents = [AIIntent.JOURNEY_REQUEST, AIIntent.PERSONAL_DEEN_GUIDANCE];
  requiredEvidence = false;
  allowedTools = ['get_active_journey', 'propose_adaptation'];
  requiredPermissions = ['READ_JOURNEY', 'WRITE_JOURNEY'];
  maxSteps = 4;
  maxLatencyMs = 5000;

  async execute(input: JourneyAgentInput): Promise<AgentResult<JourneyAgentOutput>> {
    let journey = db.journeys.get(input.journeyId);
    if (!journey) {
      journey = {
        id: input.journeyId,
        userId: input.userId,
        goalId: 'goal_default',
        templateId: 'tpl_fajr_recovery',
        title: '14-Day Fajr Recovery',
        state: JourneyState.ACTIVE,
        currentPhase: 1,
        startedAt: new Date().toISOString(),
        phases: [],
      };
      db.journeys.set(input.journeyId, journey);
    }

    let adaptationProposed: JourneyAgentOutput['adaptationProposed'];

    if ((input.consecutiveMisses || 0) >= 2) {
      const decision = JourneyAdaptationEngine.evaluateFriction({
        journeyId: journey.id,
        consecutiveMisses: input.consecutiveMisses || 2,
        currentDurationMinutes: 15,
        reportedFrictionReason: 'Fell asleep before evening routine',
      });

      if (decision.action === 'SIMPLIFY') {
        journey.state = JourneyStateMachine.transition(journey.state, JourneyState.ADAPTING);
        db.journeys.set(journey.id, journey);

        adaptationProposed = {
          action: 'SIMPLIFY',
          newDurationMinutes: decision.suggestedDurationMinutes,
          propheticReassurance: decision.propheticReassurance,
        };
      }
    }

    return {
      agentName: this.name,
      success: true,
      data: {
        journey,
        adaptationProposed,
      },
    };
  }
}
