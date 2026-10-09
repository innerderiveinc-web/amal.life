/**
 * AMAL OS V3.0 — Platform Governance & Global Safe Mode Engine
 * Operational kill switches, emergency Safe Mode failover, and tamper-evident audit logging.
 */

import { GlobalSafeModeState, KillSwitchRecord, KillSwitchType } from '@amal/types';
import * as crypto from 'crypto';

export class PlatformGovernanceEngine {
  private killSwitches: Map<string, KillSwitchRecord> = new Map();
  private safeModeState: GlobalSafeModeState = {
    enabled: false,
    activeTier: 'STANDARD_PRODUCTION'
  };
  private auditChain: Array<{ index: number; prevHash: string; hash: string; event: string; timestamp: string }> = [];

  constructor() {
    this.appendAuditEntry('SYSTEM_BOOT', 'Platform Governance Engine initialized');
  }

  public activateKillSwitch(params: {
    targetId: string;
    switchType: KillSwitchType;
    reason: string;
    triggeredBy: string;
  }): KillSwitchRecord {
    const switchId = `ks_${params.switchType.toLowerCase()}_${params.targetId}`;
    const record: KillSwitchRecord = {
      switchId,
      targetId: params.targetId,
      switchType: params.switchType,
      isActive: true,
      reason: params.reason,
      triggeredBy: params.triggeredBy,
      triggeredAt: new Date().toISOString()
    };
    this.killSwitches.set(switchId, record);
    this.appendAuditEntry(
      'KILL_SWITCH_ACTIVATED',
      `Target: ${params.targetId} (${params.switchType}) - Reason: ${params.reason}`
    );
    return record;
  }

  public isKillSwitchActive(targetId: string, switchType: KillSwitchType): boolean {
    const switchId = `ks_${switchType.toLowerCase()}_${targetId}`;
    return this.killSwitches.get(switchId)?.isActive ?? false;
  }

  public enableGlobalSafeMode(reason: string, triggeredBy: string): GlobalSafeModeState {
    // Section 90: Global Safe Mode
    // Core deterministic AMAL remains available; AI, partners, external communication disabled
    this.safeModeState = {
      enabled: true,
      activeTier: 'CORE_DETERMINISTIC_ONLY',
      reason,
      activatedAt: new Date().toISOString()
    };
    this.appendAuditEntry('GLOBAL_SAFE_MODE_ENABLED', `Reason: ${reason} (by ${triggeredBy})`);
    return this.safeModeState;
  }

  public disableGlobalSafeMode(): GlobalSafeModeState {
    this.safeModeState = {
      enabled: false,
      activeTier: 'STANDARD_PRODUCTION'
    };
    this.appendAuditEntry('GLOBAL_SAFE_MODE_DISABLED', 'Restored to standard production operations');
    return this.safeModeState;
  }

  public getSafeModeState(): GlobalSafeModeState {
    return this.safeModeState;
  }

  public assertFeatureAvailabilityInCurrentMode(featureName: string): void {
    if (this.safeModeState.enabled && this.safeModeState.activeTier === 'CORE_DETERMINISTIC_ONLY') {
      const allowedInSafeMode = [
        'DETERMINISTIC_PRAYER_TIMES',
        'OFFLINE_QURAN_READING',
        'OFFLINE_HABIT_LOGGING',
        'LOCAL_REFLECTIONS'
      ];

      if (!allowedInSafeMode.includes(featureName)) {
        throw new Error(
          `GLOBAL_SAFE_MODE_ENGAGED: Feature "${featureName}" is suspended while AMAL OS operates in Core Deterministic Safe Mode.`
        );
      }
    }
  }

  private appendAuditEntry(event: string, details: string): void {
    const lastEntry = this.auditChain[this.auditChain.length - 1];
    const prevHash = lastEntry ? lastEntry.hash : '0'.repeat(64);
    const timestamp = new Date().toISOString();
    const payload = `${this.auditChain.length}:${prevHash}:${event}:${details}:${timestamp}`;
    const hash = crypto.createHash('sha256').update(payload).digest('hex');

    this.auditChain.push({
      index: this.auditChain.length,
      prevHash,
      hash,
      event,
      timestamp
    });
  }

  public getAuditChainLength(): number {
    return this.auditChain.length;
  }
}
