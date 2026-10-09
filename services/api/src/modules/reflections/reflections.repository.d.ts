import { Reflection } from '@amal/types';
export interface CreateReflectionInput {
    userId: string;
    journeyId?: string;
    amalId?: string;
    reflectionType: 'DAILY_MUHASABAH' | 'JOURNEY_CHECK_IN' | 'PERSONAL_NOTE';
    wentWell: string;
    frictionDetected?: string;
    tomorrowIntention: string;
}
export declare class PostgresReflectionsRepository {
    create(input: CreateReflectionInput): Promise<Reflection>;
    /**
     * Enforces that reflections can ONLY be queried by their direct owner.
     * Admins and family members cannot bypass this.
     */
    findByUserId(userId: string): Promise<Reflection[]>;
    findById(userId: string, reflectionId: string): Promise<Reflection | null>;
}
//# sourceMappingURL=reflections.repository.d.ts.map