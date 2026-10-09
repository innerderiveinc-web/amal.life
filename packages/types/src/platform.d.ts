/**
 * AMAL OS — Layer 13 Production Platform, Cloud Infrastructure,
 * Reliability, SLOs, Observability, and Disaster Recovery Types.
 */
export type ServiceCriticality = 'TIER_0' | 'TIER_1' | 'TIER_2' | 'TIER_3';
export type CriticalityTier = ServiceCriticality;
export interface ServiceCatalogEntry {
    id: string;
    name: string;
    criticality: ServiceCriticality;
    ownerTeam: string;
    runbookUrl: string;
    healthEndpoint: string;
    status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
}
export interface SLODefinition {
    id: string;
    serviceId: string;
    sloName: string;
    targetPercentage: number;
    windowDays: number;
    currentBurnRate: number;
    errorBudgetRemaining: number;
    status: 'HEALTHY' | 'AT_RISK' | 'EXHAUSTED';
}
export type PlatformHealthStatus = 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
export interface PlatformHealthReport {
    overall: PlatformHealthStatus;
    timestamp: string;
    environment: string;
    dependencies: {
        api: PlatformHealthStatus;
        database: PlatformHealthStatus;
        redis: PlatformHealthStatus;
        queue: PlatformHealthStatus;
        evidence: PlatformHealthStatus;
        ai: PlatformHealthStatus;
        communications: PlatformHealthStatus;
    };
    circuitBreakersActive: number;
    sloBudgetStatus: 'NORMAL' | 'EXHAUSTED';
}
export type CanaryStatus = 'IN_PROGRESS' | 'PROMOTED' | 'ROLLED_BACK';
export interface CanaryRolloutState {
    id: string;
    serviceId: string;
    versionTag: string;
    trafficPercentage: number;
    status: CanaryStatus;
    errorRate: number;
    latencyP95Ms: number;
    rollbackReason?: string;
    promotedAt?: string;
    createdAt: string;
}
export interface SyntheticRunResult {
    id: string;
    suiteName: string;
    durationMs: number;
    status: 'PASS' | 'FAIL';
    errorMessage?: string;
    executedAt: string;
}
export interface OutboxReconciliationResult {
    scannedEvents: number;
    stuckEvents: number;
    recoveredEvents: number;
    dlqRoutedEvents: number;
    status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
}
export interface PlatformFeatureFlag {
    flagKey: string;
    enabled: boolean;
    rolloutPercentage: number;
    environment: string;
    authorizedBy: string;
    updatedAt: string;
}
//# sourceMappingURL=platform.d.ts.map