import { Journey, JourneyState } from '@amal/types';
export interface CreateJourneyInput {
    userId: string;
    goalId: string;
    templateId: string;
    templateVersionId: string;
    title: string;
}
export interface JourneyRepository {
    create(input: CreateJourneyInput): Promise<Journey>;
    findById(userId: string, journeyId: string): Promise<Journey | null>;
    findActive(userId: string): Promise<Journey[]>;
    updateState(userId: string, journeyId: string, state: JourneyState): Promise<Journey>;
}
export declare class PostgresJourneyRepository implements JourneyRepository {
    create(input: CreateJourneyInput): Promise<Journey>;
    findById(userId: string, journeyId: string): Promise<Journey | null>;
    findActive(userId: string): Promise<Journey[]>;
    updateState(userId: string, journeyId: string, state: JourneyState): Promise<Journey>;
}
//# sourceMappingURL=journey.repository.d.ts.map