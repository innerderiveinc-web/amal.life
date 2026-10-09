import { PlatformHealthReport, SLODefinition, CanaryRolloutState, SyntheticRunResult, OutboxReconciliationResult } from '@amal/types';
export declare class PlatformService {
    private canaries;
    getAggregatedHealth(): PlatformHealthReport;
    getSLODefinitions(): SLODefinition[];
    advanceCanary(serviceId: string, versionTag: string): CanaryRolloutState;
    rollbackCanary(serviceId: string, reason: string): CanaryRolloutState;
    reconcileOutbox(): OutboxReconciliationResult;
    runSyntheticMonitoring(): SyntheticRunResult;
}
//# sourceMappingURL=platform.service.d.ts.map