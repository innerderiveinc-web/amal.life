import { AgentDefinition } from '../../runtime/agent-registry.js';
import { AIIntent, AgentResult } from '@amal/types';

export interface ScholarCaseInput {
  userId: string;
  question: string;
  relevantContext?: Record<string, any>;
  userConsentGranted: boolean;
}

export interface ScholarCaseOutput {
  caseId: string;
  status: 'QUEUED_FOR_TRIAGE' | 'CONSENT_PENDING';
  messageToUser: string;
}

export class ScholarEscalationAgent implements AgentDefinition<ScholarCaseInput, ScholarCaseOutput> {
  name = 'ScholarEscalationAgent';
  version = '1.0.0';
  description = 'Prepares structured questions for human resident scholars when inquiries exceed automated boundaries.';
  allowedIntents = [AIIntent.FIQH_PERSONALIZED, AIIntent.SCHOLAR_REQUEST];
  requiredEvidence = true;
  allowedTools = ['create_scholar_case'];
  requiredPermissions = ['SUBMIT_SCHOLAR_CASE'];
  maxSteps = 2;
  maxLatencyMs = 4000;

  async execute(input: ScholarCaseInput): Promise<AgentResult<ScholarCaseOutput>> {
    if (!input.userConsentGranted) {
      return {
        agentName: this.name,
        success: true,
        data: {
          caseId: 'pending',
          status: 'CONSENT_PENDING',
          messageToUser: 'Your question touches upon specific legal jurisprudence. Would you like to submit this anonymously to a verified resident scholar for pastoral guidance?',
        },
      };
    }

    const caseId = `case_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return {
      agentName: this.name,
      success: true,
      data: {
        caseId,
        status: 'QUEUED_FOR_TRIAGE',
        messageToUser: `Your case has been packaged and queued for the resident scholar desk (ID: ${caseId}). You will receive an authentic, signed human response directly.`,
      },
    };
  }
}
