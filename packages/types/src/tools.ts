/**
 * AMAL OS V1 — MASTER TOOL REGISTRY (Sections 25 & 26)
 * Governed tools callable or proposable by AI agents.
 */

import { DataClass } from './trust';

export type ToolCategory = 'READ_ONLY' | 'PROPOSAL' | 'SIDE_EFFECT' | 'CRITICAL';

export interface ToolDefinition {
  name: string;
  description: string;
  category: ToolCategory;
  sideEffect: boolean;
  allowedAgents: string[];
  requiredScopes: string[];
  allowedDataClasses: DataClass[];
  requiresUserConfirmation: boolean;
  isDirectlyCallableByLLM: boolean;
}

export const MASTER_TOOL_REGISTRY: Record<string, ToolDefinition> = {
  // Read-only
  'evidence.search': {
    name: 'evidence.search',
    description: 'Search Islamic evidence graph across Quran, Hadith, Tafsir, and concepts',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['islamic-retrieval', 'evidence-verification', 'orchestrator'],
    requiredScopes: ['evidence:read'],
    allowedDataClasses: ['PUBLIC'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'evidence.get': {
    name: 'evidence.get',
    description: 'Fetch specific evidence node with full provenance chain',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['islamic-retrieval', 'evidence-verification', 'deen-explanation'],
    requiredScopes: ['evidence:read'],
    allowedDataClasses: ['PUBLIC'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'source.get': {
    name: 'source.get',
    description: 'Fetch canonical source metadata and review status',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['islamic-retrieval', 'citation-auditor'],
    requiredScopes: ['sources:read'],
    allowedDataClasses: ['PUBLIC'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'claim.get': {
    name: 'claim.get',
    description: 'Verify atomic Islamic claim and its linked textual proof',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['citation-auditor', 'evidence-verification'],
    requiredScopes: ['claims:read'],
    allowedDataClasses: ['PUBLIC'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'journey.get': {
    name: 'journey.get',
    description: 'Fetch user active journey state and current phase',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['journey', 'orchestrator', 'amal-planner'],
    requiredScopes: ['journeys:read'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'goal.get': {
    name: 'goal.get',
    description: 'Fetch user active goals and declared baseline',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['amal-planner', 'orchestrator'],
    requiredScopes: ['goals:read'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'context.select': {
    name: 'context.select',
    description: 'Fetch minimum necessary context within policy firewall',
    category: 'READ_ONLY',
    sideEffect: false,
    allowedAgents: ['context', 'personalization'],
    requiredScopes: ['context:read'],
    allowedDataClasses: ['PRIVATE', 'SENSITIVE'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },

  // Proposal Tools
  'amal.recommend': {
    name: 'amal.recommend',
    description: 'Propose ranked feasible Amals (1 Primary + 0-2 Optional)',
    category: 'PROPOSAL',
    sideEffect: false,
    allowedAgents: ['amal-planner'],
    requiredScopes: ['amal:propose'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: true,
  },
  'journey.propose': {
    name: 'journey.propose',
    description: 'Propose a structured spiritual habit journey to the user',
    category: 'PROPOSAL',
    sideEffect: false,
    allowedAgents: ['journey'],
    requiredScopes: ['journeys:propose'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: true,
  },
  'adaptation.propose': {
    name: 'adaptation.propose',
    description: 'Propose journey friction adaptation (pace reduction or alternative)',
    category: 'PROPOSAL',
    sideEffect: false,
    allowedAgents: ['journey', 'reflection'],
    requiredScopes: ['adaptation:propose'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: true,
  },
  'insight.propose': {
    name: 'insight.propose',
    description: 'Propose derived behavioral insight from evening reflection',
    category: 'PROPOSAL',
    sideEffect: false,
    allowedAgents: ['reflection', 'personalization'],
    requiredScopes: ['insights:propose'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: true,
  },

  // Side Effect Tools (Require Explicit Execution Pipeline)
  'journey.start': {
    name: 'journey.start',
    description: 'Instantiate and activate a journey for the user',
    category: 'SIDE_EFFECT',
    sideEffect: true,
    allowedAgents: ['journey'],
    requiredScopes: ['journeys:write'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
  'amal.complete': {
    name: 'amal.complete',
    description: 'Record user completion of an Amal action',
    category: 'SIDE_EFFECT',
    sideEffect: true,
    allowedAgents: ['amal-planner'],
    requiredScopes: ['amal:write'],
    allowedDataClasses: ['PRIVATE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
  'reflection.create': {
    name: 'reflection.create',
    description: 'Record private Muhasabah reflection journal entry',
    category: 'SIDE_EFFECT',
    sideEffect: true,
    allowedAgents: ['reflection'],
    requiredScopes: ['reflections:write'],
    allowedDataClasses: ['HIGHLY_SENSITIVE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
  'scholar.case.create': {
    name: 'scholar.case.create',
    description: 'Package structured inquiry for human jurist review',
    category: 'SIDE_EFFECT',
    sideEffect: true,
    allowedAgents: ['scholar-escalation'],
    requiredScopes: ['scholar:cases:write'],
    allowedDataClasses: ['SENSITIVE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
  'communication.schedule': {
    name: 'communication.schedule',
    description: 'Schedule a calm, fatigue-checked notification job',
    category: 'SIDE_EFFECT',
    sideEffect: true,
    allowedAgents: ['communication-intelligence'],
    requiredScopes: ['notifications:schedule'],
    allowedDataClasses: ['INTERNAL'],
    requiresUserConfirmation: false,
    isDirectlyCallableByLLM: false,
  },

  // Critical Tools (NEVER directly callable by an LLM)
  'privacy.delete': {
    name: 'privacy.delete',
    description: 'Permanently wipe specific memory or data vault records',
    category: 'CRITICAL',
    sideEffect: true,
    allowedAgents: [], // LLM CANNOT CALL THIS
    requiredScopes: ['privacy:delete'],
    allowedDataClasses: ['HIGHLY_SENSITIVE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
  'account.delete': {
    name: 'account.delete',
    description: 'GDPR right-to-be-forgotten full account erasure',
    category: 'CRITICAL',
    sideEffect: true,
    allowedAgents: [], // LLM CANNOT CALL THIS
    requiredScopes: ['account:delete'],
    allowedDataClasses: ['HIGHLY_SENSITIVE'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
  'permission.change': {
    name: 'permission.change',
    description: 'Modify user consent grants or family member access scopes',
    category: 'CRITICAL',
    sideEffect: true,
    allowedAgents: [], // LLM CANNOT CALL THIS
    requiredScopes: ['permissions:write'],
    allowedDataClasses: ['INTERNAL'],
    requiresUserConfirmation: true,
    isDirectlyCallableByLLM: false,
  },
};
