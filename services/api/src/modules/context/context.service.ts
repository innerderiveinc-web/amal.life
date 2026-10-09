/**
 * AMAL OS — LAYER 20: CONTEXT SERVICE (Section 20.24)
 * Manages user context signals, non-judgmental inference invariants,
 * confidence weighting, and privacy controls.
 */

import { Injectable } from '@nestjs/common';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

export type ContextSourceType = 'USER_CONFIRMED' | 'USER_EXPLICIT' | 'AI_INFERENCE' | 'ACTIVITY_DERIVED';

export interface LocalContextSignal {
  id: string;
  source: ContextSourceType;
  key: string;
  value: any;
  confidence: number;
  timestamp: string;
}

export interface UserContextSnapshot {
  userId: string;
  energyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeAvailableMinutes: number;
  environment: 'HOME' | 'TRANSIT' | 'WORK';
  prayerProximity: string;
  signals: LocalContextSignal[];
  updatedAt: string;
}

@Injectable()
export class ContextService {
  private static userContexts = new Map<string, UserContextSnapshot>();

  constructor(private readonly policy: PolicyEngine = new PolicyEngine()) {}

  public async getContext(actor: AuthenticatedUser): Promise<UserContextSnapshot> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'CONTEXT_READ',
      purpose: 'RECOMMENDATION',
    });

    const existing = ContextService.userContexts.get(actor.userId);
    if (existing) {
      return existing;
    }

    const defaultContext: UserContextSnapshot = {
      userId: actor.userId,
      energyLevel: 'MEDIUM',
      timeAvailableMinutes: 15,
      environment: 'HOME',
      prayerProximity: 'POST_FAJR',
      signals: [
        {
          id: `sig_default_${actor.userId}`,
          source: 'USER_CONFIRMED',
          key: 'preferred_routine',
          value: 'morning_quiet',
          confidence: 0.95,
          timestamp: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    ContextService.userContexts.set(actor.userId, defaultContext);
    return defaultContext;
  }

  public async updateContextSignal(
    actor: AuthenticatedUser,
    key: string,
    value: any,
    source: ContextSourceType = 'USER_CONFIRMED',
    confidence = 1.0,
  ): Promise<UserContextSnapshot> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'CONTEXT_UPDATE',
      purpose: 'RECOMMENDATION',
    });

    const current = await this.getContext(actor);
    const signal: LocalContextSignal = {
      id: `sig_${Date.now()}`,
      source,
      key,
      value,
      confidence,
      timestamp: new Date().toISOString(),
    };

    current.signals.push(signal);
    if (key === 'timeAvailableMinutes' && typeof value === 'number') {
      current.timeAvailableMinutes = value;
    }
    if (key === 'energyLevel') {
      current.energyLevel = value;
    }
    current.updatedAt = new Date().toISOString();
    ContextService.userContexts.set(actor.userId, current);
    return current;
  }

  public async deleteContextSignal(actor: AuthenticatedUser, signalId: string): Promise<UserContextSnapshot> {
    const current = await this.getContext(actor);
    current.signals = current.signals.filter((s) => s.id !== signalId);
    current.updatedAt = new Date().toISOString();
    ContextService.userContexts.set(actor.userId, current);
    return current;
  }
}
