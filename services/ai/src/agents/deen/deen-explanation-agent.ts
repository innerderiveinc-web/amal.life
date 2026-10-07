import { AgentDefinition } from '../../runtime/agent-registry.js';
import { AIIntent, AgentResult, EvidencePackItem, ScholarlyPosition } from '@amal/types';

export interface DeenAgentInput {
  message: string;
  evidence: EvidencePackItem[];
  scholarlyPositions?: ScholarlyPosition[];
  isPluralityMode?: boolean;
}

export interface DeenAgentOutput {
  revelationEvidence: string[];
  propheticGuidance: string[];
  scholarlyPositions: Array<{ madhhab: string; position: string }>;
  explanation: string;
}

export class DeenExplanationAgent implements AgentDefinition<DeenAgentInput, DeenAgentOutput> {
  name = 'DeenExplanationAgent';
  version = '1.0.0';
  description = 'Explains Quran and Hadith evidence objectively and details scholarly plurality without sectarian bias.';
  allowedIntents = [
    AIIntent.GENERAL_ISLAMIC_KNOWLEDGE,
    AIIntent.QURAN_LOOKUP,
    AIIntent.HADITH_LOOKUP,
    AIIntent.TAFSIR,
    AIIntent.SCHOLARLY_DISAGREEMENT,
    AIIntent.FIQH_GENERAL,
  ];
  requiredEvidence = true;
  allowedTools = ['search_evidence', 'get_scholarly_positions'];
  requiredPermissions = ['READ_EVIDENCE'];
  maxSteps = 3;
  maxLatencyMs = 5000;

  async execute(input: DeenAgentInput): Promise<AgentResult<DeenAgentOutput>> {
    const rev: string[] = [];
    const prop: string[] = [];

    for (const e of input.evidence) {
      if (e.sourceType === 'QURAN') {
        rev.push(`Surah ${e.reference}: "${e.text}"`);
      } else if (e.sourceType === 'HADITH') {
        prop.push(`${e.reference}: "${e.text}"`);
      }
    }

    const positions: Array<{ madhhab: string; position: string }> = [];
    if (input.scholarlyPositions && input.scholarlyPositions.length > 0) {
      for (const pos of input.scholarlyPositions) {
        positions.push({ madhhab: pos.madhhab, position: pos.position });
      }
    }

    let explanation = 'Islam emphasizes balance and consistency in worship. ';
    if (rev.length > 0) {
      explanation += `As stated in revelation: ${rev[0]}. `;
    }
    if (prop.length > 0) {
      explanation += `The Sunnah clarifies: ${prop[0]}. `;
    }

    return {
      agentName: this.name,
      success: true,
      data: {
        revelationEvidence: rev,
        propheticGuidance: prop,
        scholarlyPositions: positions,
        explanation,
      },
    };
  }
}
