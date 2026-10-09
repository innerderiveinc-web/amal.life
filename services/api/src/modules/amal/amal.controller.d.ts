import { AmalService } from './amal.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export interface CompleteAmalDto {
    completionType?: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';
    durationMinutes?: number;
    notes?: string;
    feedback?: string;
}
export declare class AmalController {
    private readonly service;
    constructor(service: AmalService);
    getToday(user: AuthenticatedUser): Promise<import("@amal/types").Amal[]>;
    recommend(user: AuthenticatedUser, body: {
        goalId?: string;
        availableMinutes?: number;
    }): Promise<{
        date: string;
        primary: import("@amal/types").Amal;
        optional: import("@amal/types").Amal[];
        reasonCodes: string[];
    }>;
    start(user: AuthenticatedUser, id: string): Promise<{
        status: string;
        amalId: string;
        startedAt: string;
    }>;
    complete(user: AuthenticatedUser, id: string, dto: CompleteAmalDto, idempotencyKey?: string): Promise<import("./amal.repository.js").AmalCompletionRecord>;
    partial(user: AuthenticatedUser, id: string, dto: CompleteAmalDto, idempotencyKey?: string): Promise<import("./amal.repository.js").AmalCompletionRecord>;
    skip(user: AuthenticatedUser, id: string, dto: {
        reason?: string;
    }, idempotencyKey?: string): Promise<import("./amal.repository.js").AmalCompletionRecord>;
    snooze(user: AuthenticatedUser, id: string, dto: {
        snoozeMinutes?: number;
    }): Promise<{
        status: string;
        amalId: string;
        snoozedUntil: string;
    }>;
    feedback(user: AuthenticatedUser, id: string, dto: {
        rating: string;
        frictionType?: string;
    }): Promise<{
        recorded: boolean;
        amalId: string;
        rating: string;
        frictionType: string | undefined;
    }>;
}
//# sourceMappingURL=amal.controller.d.ts.map