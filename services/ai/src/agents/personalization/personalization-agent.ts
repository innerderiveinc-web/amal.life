import { AgentDefinition } from '../../runtime/agent-registry.js';
import { AIIntent, AgentResult } from '@amal/types';

export interface PersonalizationInput {
  userId: string;
  explicitPreferences: Record<string, any>;
  observedPatterns?: Record<string, any>;
  inferredInsights?: Record<string, any>;
}

export interface ResolvedPersonalization {
  preferredTime: string;
  preferredDuration: number;
  sourceOfTruth: 'EXPLICIT_CHOICE' | 'CONFIRMED_PREFERENCE' | 'OBSERVED_PATTERN' | 'AI_INFERENCE';
}

export class PersonalizationAgent implements AgentDefinition<PersonalizationInput, ResolvedPersonalization> {
  name = 'PersonalizationAgent';
  version = '1.0.0';
  description = 'Resolves user logistical preferences prioritizing explicit user choices above all AI observations.';
  allowedIntents = [AIIntent.PERSONAL_DEEN_GUIDANCE, AIIntent.AMAL_REQUEST];
  requiredEvidence = false;
  allowedTools = ['get_user_goal'];
  requiredPermissions = ['READ_USER_PROFILE'];
  maxSteps = 2;
  maxLatencyMs = 3000;

  async execute(input: PersonalizationInput): Promise<AgentResult<ResolvedPersonalization>> {
    // Explicit choice always wins
    if (input.explicitPreferences?.preferredTime) {
      return {
        agentName: this.name,
        success: true,
        data: {
          preferredTime: input.explicitPreferences.preferredTime,
          preferredDuration: input.explicitPreferences.preferredDuration || 10,
          sourceOfTruth: 'EXPLICIT_CHOICE',
        },
      };
    }

    if (input.observedPatterns?.preferredTime) {
      return {
        agentName: this.name,
        success: true,
        data: {
          preferredTime: input.observedPatterns.preferredTime,
          preferredDuration: 10,
          sourceOfTruth: 'OBSERVED_PATTERN',
        },
      };
    }

    return {
      agentName: this.name,
      success: true,
      data: {
        preferredTime: 'after_fajr',
        preferredDuration: 5,
        sourceOfTruth: 'AI_INFERENCE',
      },
    };
  }
}
