import { Injectable } from '@nestjs/common';
import { PostgresReflectionsRepository, CreateReflectionInput } from './reflections.repository.js';
import { OutboxService } from '../outbox/outbox.service.js';
import { Reflection } from '@amal/types';

@Injectable()
export class ReflectionsService {
  private repo = new PostgresReflectionsRepository();
  private outbox = new OutboxService();

  public async create(userId: string, input: Omit<CreateReflectionInput, 'userId'>): Promise<Reflection> {
    const reflection = await this.repo.create({ ...input, userId });

    // Publish anonymized friction event if friction is noted
    if (reflection.frictionDetected) {
      await this.outbox.recordEvent('reflection.friction_detected', reflection.id, {
        userId,
        journeyId: reflection.journeyId,
        hasFriction: true,
      });
    }

    return reflection;
  }

  public async findByUserId(userId: string): Promise<Reflection[]> {
    return this.repo.findByUserId(userId);
  }

  public async findById(userId: string, reflectionId: string): Promise<Reflection | null> {
    return this.repo.findById(userId, reflectionId);
  }
}
