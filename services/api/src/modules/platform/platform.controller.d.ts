import { PlatformService } from './platform.service.js';
export declare class PlatformController {
    private readonly platformService;
    constructor(platformService: PlatformService);
    getHealth(): import("@amal/types").PlatformHealthReport;
    getSLOs(): {
        success: boolean;
        data: import("@amal/types").SLODefinition[];
    };
    advanceCanary(body: {
        serviceId: string;
        versionTag: string;
    }): {
        success: boolean;
        data: import("@amal/types").CanaryRolloutState;
    };
    rollbackCanary(body: {
        serviceId: string;
        reason: string;
    }): {
        success: boolean;
        data: import("@amal/types").CanaryRolloutState;
    };
    reconcileOutbox(): {
        success: boolean;
        data: import("@amal/types").OutboxReconciliationResult;
    };
    runSynthetic(): {
        success: boolean;
        data: import("@amal/types").SyntheticRunResult;
    };
}
//# sourceMappingURL=platform.controller.d.ts.map