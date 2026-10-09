/**
 * AMAL OS V1 — LAYER 17: MASTER BLUEPRINT & SYSTEM REGISTRY TYPES
 * Monorepo Master Contracts & Executable Implementation Specifications
 */
import { CriticalityTier } from './platform';
import { DataClass, TrustZone } from './trust';
export type ComponentType = 'PACKAGE' | 'SERVICE' | 'APPLICATION' | 'INFRASTRUCTURE';
export type ComponentStatus = 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
export interface SystemComponent {
    id: string;
    name: string;
    componentType: ComponentType;
    repoPath: string;
    criticalityTier: CriticalityTier;
    status: ComponentStatus;
    version: string;
    leadSquad: string;
    dependencies: string[];
    metadata?: Record<string, any>;
}
export interface SystemCertification {
    id: string;
    layerNumber: number;
    layerName: string;
    testSuiteKey: string;
    totalChecks: number;
    passedChecks: number;
    passRate: number;
    isCertified: boolean;
    verifiedAt: string;
    verifier: string;
    certificationHash: string;
    auditNotes?: string;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface MasterRouteCatalogEntry {
    id: string;
    httpMethod: HttpMethod;
    routePath: string;
    moduleName: string;
    authRequired: boolean;
    requiredRole: string;
    dataClass: DataClass;
    trustZone: TrustZone;
    rateLimitPerMinute: number;
}
export type AgentOperationalStatus = 'OPERATIONAL' | 'DEGRADED' | 'DISABLED';
export interface MasterAgentCatalogEntry {
    agentId: string;
    agentName: string;
    agentRole: string;
    trustZone: TrustZone;
    inputContract: string;
    outputContract: string;
    isAutonomousAnsweringAllowed: boolean;
    maxTokenCeiling: number;
    status: AgentOperationalStatus;
}
export type InvariantCategory = 'THEOLOGICAL_SAFETY' | 'DATA_PRIVACY' | 'ETHICAL_GROWTH' | 'PSYCHOLOGICAL_SAFETY' | 'SYSTEM_RELIABILITY';
export interface SystemInvariant {
    invariantId: string;
    title: string;
    category: InvariantCategory;
    enforcementLayer: string;
    description: string;
    zeroTolerance: boolean;
    verificationCheck: string;
}
export interface MasterBlueprintTopology {
    components: SystemComponent[];
    certifications: SystemCertification[];
    routes: MasterRouteCatalogEntry[];
    agents: MasterAgentCatalogEntry[];
    invariants: SystemInvariant[];
    migrationsCount: number;
    overallCertified: boolean;
    generatedAt: string;
}
//# sourceMappingURL=master-blueprint.d.ts.map