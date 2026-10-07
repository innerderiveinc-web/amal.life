import { Goal, GoalCategory, GoalIntent } from '@amal/types';
import { db } from '@amal/database';

export interface CreateGoalInput {
  userId: string;
  title: string;
  category: GoalCategory;
  intent: GoalIntent;
  desiredOutcome?: string;
  priority?: number;
  startDate?: string;
  targetDate?: string;
}

export interface UpdateGoalInput {
  title?: string;
  desiredOutcome?: string;
  priority?: number;
  status?: string;
}

export interface GoalRepository {
  create(input: CreateGoalInput): Promise<Goal>;
  findById(userId: string, goalId: string): Promise<Goal | null>;
  findActive(userId: string): Promise<Goal[]>;
  update(userId: string, goalId: string, input: UpdateGoalInput): Promise<Goal>;
  archive(userId: string, goalId: string): Promise<void>;
}

export class PostgresGoalRepository implements GoalRepository {
  public async create(input: CreateGoalInput): Promise<Goal> {
    const id = `goal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const goal: Goal = {
      id,
      userId: input.userId,
      title: input.title,
      category: input.category,
      intent: input.intent,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.goals.set(id, goal);
    return goal;
  }

  /**
   * Enforces user ownership strictly at the query level
   */
  public async findById(userId: string, goalId: string): Promise<Goal | null> {
    const goal = db.goals.get(goalId);
    if (!goal || goal.userId !== userId) {
      return null;
    }
    return goal;
  }

  public async findActive(userId: string): Promise<Goal[]> {
    return Array.from(db.goals.values()).filter(
      (g) => g.userId === userId && g.status === 'ACTIVE'
    );
  }

  public async update(userId: string, goalId: string, input: UpdateGoalInput): Promise<Goal> {
    const goal = await this.findById(userId, goalId);
    if (!goal) {
      throw new Error(`Goal ${goalId} not found or ownership mismatch`);
    }

    if (input.title) goal.title = input.title;
    if (input.status) goal.status = input.status;
    goal.updatedAt = new Date().toISOString();

    db.goals.set(goalId, goal);
    return goal;
  }

  public async archive(userId: string, goalId: string): Promise<void> {
    const goal = await this.findById(userId, goalId);
    if (goal) {
      goal.status = 'ARCHIVED';
      goal.updatedAt = new Date().toISOString();
      db.goals.set(goalId, goal);
    }
  }
}
