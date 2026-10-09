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
export declare const MASTER_TOOL_REGISTRY: Record<string, ToolDefinition>;
//# sourceMappingURL=tools.d.ts.map