import { Journey, JourneyState } from '@amal/types';
import { db } from '@amal/database';

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

export class PostgresJourneyRepository implements JourneyRepository {
  public async create(input: CreateJourneyInput): Promise<Journey> {
    const id = `jrn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const journey: Journey = {
      id,
      userId: input.userId,
      goalId: input.goalId,
      templateId: input.templateId,
      title: input.title,
      state: JourneyState.STARTED,
      currentPhase: 1,
      startedAt: new Date().toISOString(),
      phases: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.journeys.set(id, journey);
    return journey;
  }

  public async findById(userId: string, journeyId: string): Promise<Journey | null> {
    const journey = db.journeys.get(journeyId);
    if (!journey || journey.userId !== userId) {
      return null;
    }
    return journey;
  }

  public async findActive(userId: string): Promise<Journey[]> {
    return Array.from(db.journeys.values()).filter(
      (j) => j.userId === userId && j.state !== JourneyState.ARCHIVED && j.state !== JourneyState.ABANDONED
    );
  }

  public async updateState(userId: string, journeyId: string, state: JourneyState): Promise<Journey> {
    const journey = await this.findById(userId, journeyId);
    if (!journey) {
      throw new Error(`Journey ${journeyId} not found or ownership mismatch`);
    }
    journey.state = state;
    if (state === JourneyState.COMPLETED) {
      journey.completedAt = new Date().toISOString();
    }
    db.journeys.set(journeyId, journey);
    return journey;
  }
}
