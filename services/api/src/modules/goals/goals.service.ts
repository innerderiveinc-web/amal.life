import { Injectable } from '@nestjs/common';
import { PostgresGoalRepository, CreateGoalInput, UpdateGoalInput } from './goal.repository.js';
import { Goal } from '@amal/types';

@Injectable()
export class GoalsService {
  private repo = new PostgresGoalRepository();

  public async create(userId: string, input: Omit<CreateGoalInput, 'userId'>): Promise<Goal> {
    return this.repo.create({ ...input, userId });
  }

  public async findById(userId: string, goalId: string): Promise<Goal | null> {
    return this.repo.findById(userId, goalId);
  }

  public async findActive(userId: string): Promise<Goal[]> {
    return this.repo.findActive(userId);
  }

  public async update(userId: string, goalId: string, input: UpdateGoalInput): Promise<Goal> {
    return this.repo.update(userId, goalId, input);
  }

  public async archive(userId: string, goalId: string): Promise<void> {
    return this.repo.archive(userId, goalId);
  }
}
