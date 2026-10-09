/**
 * AMAL OS — ADMIN CONTROLLER
 * High-privilege system administration, invariants monitor, and content quarantine desk.
 */
export declare class AdminController {
    getStats(): Promise<{
        activeUsers: number;
        activeJourneys: number;
        completedAmalsToday: number;
        systemHealth: string;
        circuitBreakers: string;
        invariantsEnforced: number;
        zeroFabricationsEnforced: boolean;
        adultReflectionVaultActive: boolean;
    }>;
    getInvariants(): Promise<{
        id: string;
        name: string;
        status: string;
    }[]>;
    quarantineContent(body: {
        contentId: string;
        reason: string;
    }): Promise<{
        quarantined: boolean;
        contentId: string;
        reason: string;
        status: string;
        timestamp: string;
    }>;
}
//# sourceMappingURL=admin.controller.d.ts.map