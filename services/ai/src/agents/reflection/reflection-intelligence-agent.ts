import { AgentDefinition } from '../../runtime/agent-registry.js';
import { AIIntent, AgentResult, Reflection } from '@amal/types';

export interface ReflectionAgentInput {
  reflection: Reflection;
}

export interface ReflectionAgentOutput {
  patterns: string[];
  frictionPoints: string[];
  possibleInsights: string[];
  reassurance: string;
}

export class ReflectionIntelligenceAgent implements AgentDefinition<ReflectionAgentInput, ReflectionAgentOutput> {
  name = 'ReflectionIntelligenceAgent';
  version = '1.0.0';
  description = 'Analyzes evening Muhasabah for logistical friction and constructive patterns with zero moral judgment.';
  allowedIntents = [AIIntent.REFLECTION];
  requiredEvidence = false;
  allowedTools = ['create_reflection'];
  requiredPermissions = ['READ_PRIVATE_REFLECTION'];
  maxSteps = 3;
  maxLatencyMs = 4000;

  async execute(input: ReflectionAgentInput): Promise<AgentResult<ReflectionAgentOutput>> {
    const patterns: string[] = [];
    const frictionPoints: string[] = [];
    const possibleInsights: string[] = [];

    if (input.reflection.wentWell) {
      patterns.push(`Constructive practice identified: "${input.reflection.wentWell}"`);
    }

    if (input.reflection.frictionDetected) {
      frictionPoints.push(`Friction observed: "${input.reflection.frictionDetected}"`);
      possibleInsights.push('Friction indicates a logistical boundary, not spiritual deficiency.');
    }

    return {
      agentName: this.name,
      success: true,
      data: {
        patterns,
        frictionPoints,
        possibleInsights,
        reassurance: 'Practice grows through small sustainable steps. "The most beloved deed to Allah is the most regular, even if small."',
      },
    };
  }
}
