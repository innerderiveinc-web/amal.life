import { Injectable } from '@nestjs/common';
import { PostgresJourneyRepository, CreateJourneyInput } from './journey.repository.js';
import { JourneyStateMachine } from '@amal/journey-engine';
import { Journey, JourneyState } from '@amal/types';

@Injectable()
export class JourneysService {
  private repo = new PostgresJourneyRepository();

  public async create(userId: string, input: Omit<CreateJourneyInput, 'userId'>): Promise<Journey> {
    return this.repo.create({ ...input, userId });
  }

  public async findById(userId: string, journeyId: string): Promise<Journey | null> {
    return this.repo.findById(userId, journeyId);
  }

  public async findActive(userId: string): Promise<Journey[]> {
    return this.repo.findActive(userId);
  }

  public async transition(userId: string, journeyId: string, targetState: JourneyState): Promise<Journey> {
    const journey = await this.repo.findById(userId, journeyId);
    if (!journey) {
      throw new Error(`Journey ${journeyId} not found or access denied`);
    }

    const nextState = JourneyStateMachine.transition(journey.state, targetState);
    return this.repo.updateState(userId, journeyId, nextState);
  }
}
