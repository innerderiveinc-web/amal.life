import { JourneysService } from './journeys.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export interface CreateJourneyDto {
    goalId: string;
    templateId: string;
    templateVersionId: string;
    title: string;
}
export declare class JourneysController {
    private readonly service;
    constructor(service: JourneysService);
    list(user: AuthenticatedUser): Promise<import("@amal/types").Journey[]>;
    create(user: AuthenticatedUser, dto: CreateJourneyDto): Promise<import("@amal/types").Journey>;
    getById(user: AuthenticatedUser, id: string): Promise<import("@amal/types").Journey | {
        error: string;
        status: number;
    }>;
    start(user: AuthenticatedUser, id: string): Promise<import("@amal/types").Journey>;
    pause(user: AuthenticatedUser, id: string): Promise<import("@amal/types").Journey>;
    resume(user: AuthenticatedUser, id: string): Promise<import("@amal/types").Journey>;
    complete(user: AuthenticatedUser, id: string): Promise<import("@amal/types").Journey>;
    listAdaptations(user: AuthenticatedUser, id: string): Promise<{
        id: string;
        journeyId: string;
        trigger: string;
        proposedPlan: {
            durationMinutes: number;
            timeSlot: string;
        };
        reasonCodes: string[];
        status: string;
    }[]>;
    previewAdaptation(user: AuthenticatedUser, id: string): Promise<{
        currentPlan: string;
        suggestedPlan: string;
        why: string;
        buttons: string[];
    }>;
    approveAdaptation(user: AuthenticatedUser, id: string): Promise<{
        applied: boolean;
        journeyId: string;
        newDurationMinutes: number;
        message: string;
    }>;
    rejectAdaptation(user: AuthenticatedUser, id: string): Promise<{
        applied: boolean;
        journeyId: string;
        message: string;
    }>;
}
//# sourceMappingURL=journeys.controller.d.ts.map