import { RedTeamTestCase } from '@amal/types';
export declare const RED_TEAM_TEST_CASES: RedTeamTestCase[];
export declare class RedTeamEvaluator {
    static runSuite(): {
        total: number;
        passed: number;
        failed: number;
        results: {
            testId: string;
            passed: boolean;
            reason: string;
        }[];
    };
}
//# sourceMappingURL=redteam.d.ts.map