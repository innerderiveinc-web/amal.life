import { AIIntent, AgentResult } from '@amal/types';

export interface AgentDefinition<I = any, O = any> {
  name: string;
  version: string;
  description: string;
  allowedIntents: AIIntent[];
  requiredEvidence: boolean;
  allowedTools: string[];
  requiredPermissions: string[];
  maxSteps: number;
  maxLatencyMs: number;
  execute(input: I): Promise<AgentResult<O>>;
}

export class AgentRegistry {
  private static agents = new Map<string, AgentDefinition>();

  public static register(agent: AgentDefinition): void {
    this.agents.set(agent.name, agent);
  }

  public static get(name: string): AgentDefinition | undefined {
    return this.agents.get(name);
  }

  public static getAll(): AgentDefinition[] {
    return Array.from(this.agents.values());
  }

  public static getByIntent(intent: AIIntent): AgentDefinition[] {
    return Array.from(this.agents.values()).filter(a => a.allowedIntents.includes(intent));
  }
}
