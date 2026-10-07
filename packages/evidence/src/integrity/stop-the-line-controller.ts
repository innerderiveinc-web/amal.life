// ==============================================================================
// AMAL OS — STOP THE LINE CONTROLLER (Control #21)
// Automated circuit breaker upon detecting any citation or integrity incident.
// ==============================================================================

import { KnowledgePolicyEngine } from './knowledge-policy-engine.js';

export interface IncidentFreezeRecord {
  incidentId: string;
  triggerType: 'FABRICATED_CITATION' | 'UNVERIFIED_CORPUS_LEAK' | 'GLYPH_MUTATION' | 'UNAUTHORIZED_FATWA';
  affectedPaths: string[];
  frozenAt: string;
  unfrozenAt?: string;
  isActive: boolean;
  resolutionSummary?: string;
}

export class StopTheLineController {
  private static activeFreezes: Map<string, IncidentFreezeRecord> = new Map();
  private static globalLineStopped: boolean = false;

  /**
   * Emergency Trigger: Stop the line and freeze knowledge path
   */
  public static triggerStop(data: {
    triggerType: IncidentFreezeRecord['triggerType'];
    affectedPaths: string[];
    reason: string;
  }): IncidentFreezeRecord {
    const incidentId = `halt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const freeze: IncidentFreezeRecord = {
      incidentId,
      triggerType: data.triggerType,
      affectedPaths: data.affectedPaths,
      frozenAt: new Date().toISOString(),
      isActive: true,
      resolutionSummary: data.reason,
    };

    this.activeFreezes.set(incidentId, freeze);
    this.globalLineStopped = true;

    // Immediately disable AI generation across the platform
    KnowledgePolicyEngine.setIslamicAiEnabled(false);

    return freeze;
  }

  /**
   * Resume line after thorough investigation and re-testing
   */
  public static resolveAndResume(incidentId: string, resolutionSummary: string): boolean {
    const freeze = this.activeFreezes.get(incidentId);
    if (!freeze) return false;

    freeze.isActive = false;
    freeze.unfrozenAt = new Date().toISOString();
    freeze.resolutionSummary = resolutionSummary;

    // Check if any other freezes are active
    const hasRemaining = Array.from(this.activeFreezes.values()).some((f) => f.isActive);
    if (!hasRemaining) {
      this.globalLineStopped = false;
      KnowledgePolicyEngine.setIslamicAiEnabled(true);
    }

    return true;
  }

  public static isLineStopped(): boolean {
    return this.globalLineStopped;
  }

  public static getActiveFreezes(): IncidentFreezeRecord[] {
    return Array.from(this.activeFreezes.values()).filter((f) => f.isActive);
  }
}
