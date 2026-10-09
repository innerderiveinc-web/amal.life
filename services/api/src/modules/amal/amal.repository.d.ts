import { Amal, AmalType } from '@amal/types';
export interface CreateAmalInput {
    userId: string;
    journeyId?: string;
    templateId?: string;
    title: string;
    type: AmalType;
    durationMinutes: number;
}
export interface CompleteAmalInput {
    amalId: string;
    userId: string;
    completionType: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';
    durationMinutes?: number;
    notes?: string;
    idempotencyKey: string;
}
export interface AmalCompletionRecord {
    id: string;
    amalId: string;
    userId: string;
    completionType: string;
    durationMinutes?: number;
    notes?: string;
    completedAt: string;
    idempotencyKey: string;
}
export declare class PostgresAmalRepository {
    private static completions;
    create(input: CreateAmalInput): Promise<Amal>;
    findById(userId: string, amalId: string): Promise<Amal | null>;
    findToday(userId: string): Promise<Amal[]>;
    complete(input: CompleteAmalInput): Promise<AmalCompletionRecord>;
}
//# sourceMappingURL=amal.repository.d.ts.map