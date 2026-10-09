/**
 * AMAL OS — LAYER 20: CREATE GOAL DTO (Section 20.17)
 */
import { GoalCategory, GoalIntent } from '@amal/types';
export declare class CreateGoalDto {
    title: string;
    category: GoalCategory;
    intent: GoalIntent;
    desiredOutcome?: string;
    timeHorizon?: string;
}
export declare class UpdateGoalDto {
    title?: string;
    desiredOutcome?: string;
    timeHorizon?: string;
    status?: string;
}
//# sourceMappingURL=create-goal.dto.d.ts.map