export interface DependencyStatus {
    status: 'UP' | 'DOWN';
    latencyMs: number;
}
export interface HealthResponse {
    status: 'OK' | 'DEGRADED';
    timestamp: string;
    uptimeSeconds: number;
    dependencies?: Record<string, DependencyStatus>;
}
export declare class HealthController {
    private startTime;
    getHealth(): HealthResponse;
    getLiveness(): {
        status: string;
    };
    getReadiness(): HealthResponse;
    getDependencies(): {
        PostgreSQL: {
            status: string;
            version: string;
        };
        Redis: {
            status: string;
            version: string;
        };
        ObjectStorage: {
            status: string;
            target: string;
        };
        Queue: {
            status: string;
            engine: string;
        };
        AIGateway: {
            status: string;
            engine: string;
        };
    };
}
//# sourceMappingURL=health.controller.d.ts.map