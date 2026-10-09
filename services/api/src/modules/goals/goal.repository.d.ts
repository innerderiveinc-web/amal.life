import { Goal, GoalCategory, GoalIntent } from '@amal/types';
export interface CreateGoalInput {
    userId: string;
    title: string;
    category: GoalCategory;
    intent: GoalIntent;
    desiredOutcome?: string;
    priority?: number;
    startDate?: string;
    targetDate?: string;
}
export interface UpdateGoalInput {
    title?: string;
    desiredOutcome?: string;
    priority?: number;
    status?: string;
}
export interface GoalRepository {
    create(input: CreateGoalInput): Promise<Goal>;
    findById(userId: string, goalId: string): Promise<Goal | null>;
    findActive(userId: string): Promise<Goal[]>;
    update(userId: string, goalId: string, input: UpdateGoalInput): Promise<Goal>;
    archive(userId: string, goalId: string): Promise<void>;
}
export declare class PostgresGoalRepository implements GoalRepository {
    create(input: CreateGoalInput): Promise<Goal>;
    /**
     * Enforces user ownership strictly at the query level
     */
    findById(userId: string, goalId: string): Promise<Goal | null>;
    findActive(userId: string): Promise<Goal[]>;
    update(userId: string, goalId: string, input: UpdateGoalInput): Promise<Goal>;
    archive(userId: string, goalId: string): Promise<void>;
}
//# sourceMappingURL=goal.repository.d.ts.map