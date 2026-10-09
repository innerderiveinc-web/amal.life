import { ReflectionsService } from './reflections.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export interface CreateReflectionDto {
    journeyId?: string;
    amalId?: string;
    reflectionType?: 'DAILY_MUHASABAH' | 'JOURNEY_CHECK_IN' | 'PERSONAL_NOTE';
    wentWell: string;
    frictionDetected?: string;
    tomorrowIntention: string;
}
export declare class ReflectionsController {
    private readonly service;
    constructor(service: ReflectionsService);
    list(user: AuthenticatedUser): Promise<import("@amal/types").Reflection[]>;
    create(user: AuthenticatedUser, dto: CreateReflectionDto): Promise<import("@amal/types").Reflection>;
    getById(user: AuthenticatedUser, id: string): Promise<import("@amal/types").Reflection | {
        error: string;
        status: number;
    }>;
    analyze(user: AuthenticatedUser, id: string): Promise<{
        error: string;
        status: number;
        patterns?: undefined;
        friction?: undefined;
        proposedInsight?: undefined;
    } | {
        patterns: string[];
        friction: any[];
        proposedInsight: {
            category: string;
            statement: string;
            confirmationRequired: boolean;
        };
        error?: undefined;
        status?: undefined;
    }>;
    confirmInsight(user: AuthenticatedUser, id: string, body: {
        confirmed: boolean;
        preferenceKey?: string;
    }): Promise<{
        confirmed: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=reflections.controller.d.ts.map