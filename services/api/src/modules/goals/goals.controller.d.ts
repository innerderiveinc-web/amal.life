import { GoalsService } from './goals.service.js';
import { AuthUser } from '../../common/guards/auth.guard.js';
import { GoalCategory, GoalIntent } from '@amal/types';
export interface CreateGoalDto {
    title: string;
    category: GoalCategory;
    intent: GoalIntent;
    desiredOutcome?: string;
    priority?: number;
}
export interface UpdateGoalDto {
    title?: string;
    desiredOutcome?: string;
    priority?: number;
    status?: string;
}
export declare class GoalsController {
    private readonly service;
    constructor(service: GoalsService);
    create(user: AuthUser, dto: CreateGoalDto): Promise<Goal>;
    list(user: AuthUser): Promise<any>;
    getById(user: AuthUser, id: string): Promise<any>;
    update(user: AuthUser, id: string, dto: UpdateGoalDto): Promise<Goal>;
    archive(user: AuthUser, id: string): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=goals.controller.d.ts.map