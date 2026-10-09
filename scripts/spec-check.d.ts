/**
 * AMAL OS V1 — AUTOMATED SPECIFICATION CHECKER (Section 161)
 * Validates system implementation against the Master Executable Build Specification.
 */
export interface SpecCheckResult {
    checkName: string;
    passed: boolean;
    details: string;
    errors?: string[];
}
export declare function runSpecCheck(baseDir?: string): SpecCheckResult[];
//# sourceMappingURL=spec-check.d.ts.map