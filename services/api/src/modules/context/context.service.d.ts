/**
 * AMAL OS — LAYER 20: CONTEXT SERVICE (Section 20.24)
 * Manages user context signals, non-judgmental inference invariants,
 * confidence weighting, and privacy controls.
 */
import { ContextSignal, ContextSource } from '@amal/types';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export interface UserContextSnapshot {
    userId: string;
    energyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    timeAvailableMinutes: number;
    environment: 'HOME' | 'TRANSIT' | 'WORK';
    prayerProximity: string;
    signals: ContextSignal[];
    updatedAt: string;
}
export declare class ContextService {
    private readonly policy;
    private static userContexts;
    constructor(policy?: PolicyEngine);
    getContext(actor: AuthenticatedUser): Promise<UserContextSnapshot>;
    updateContextSignal(actor: AuthenticatedUser, key: string, value: any, source?: ContextSource, confidence?: number): Promise<UserContextSnapshot>;
}
//# sourceMappingURL=context.service.d.ts.map