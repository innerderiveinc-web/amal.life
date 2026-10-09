/**
 * AMAL OS — V1.5: PATTERN DETECTOR
 * Detects timing tendencies, action-size feasibility, and recurring friction
 * without making invasive psychological diagnoses or spiritual rankings.
 */

import { PreferenceType, PreferenceSourceTier, FrictionSignalV2, UserInsightItem } from '@amal/types';
import { PreferenceLearner } from './preference-learner.js';

export interface ActionLogEntry {
  actionId: string;
  amalId: string;
  durationMinutes: number;
  timeSlot: 'MORNING' | 'AFTER_FAJR' | 'MIDDAY' | 'AFTER_ASR' | 'EVENING' | 'AFTER_MAGHRIB' | 'AFTER_ISHA' | 'NIGHT';
  status: 'COMPLETED' | 'PARTIAL' | 'SKIPPED';
  skipReason?: string;
  timestamp: string;
}

export class PatternDetector {
  /**
   * Evaluates completion logs to detect preferred timing windows.
   * Section 6: e.g. User completes 7 of 8 Amals after Isha -> Evening timing candidate.
   */
  public static detectTimingPattern(
    userId: string,
    history: ActionLogEntry[]
  ): {
    detected: boolean;
    preferredSlot?: string;
    confidence: number;
    insight?: UserInsightItem;
  } {
    if (history.length < 5) {
      return { detected: false, confidence: 0 };
    }

    const slotCompletions: Record<string, { total: number; completed: number }> = {};
    for (const h of history) {
      if (!slotCompletions[h.timeSlot]) {
        slotCompletions[h.timeSlot] = { total: 0, completed: 0 };
      }
      slotCompletions[h.timeSlot]!.total++;
      if (h.status === 'COMPLETED') {
        slotCompletions[h.timeSlot]!.completed++;
      }
    }

    let bestSlot = '';
    let maxRatio = 0;
    let bestCount = 0;

    for (const [slot, stat] of Object.entries(slotCompletions)) {
      if (stat.total >= 4) {
        const ratio = stat.completed / stat.total;
        if (ratio > maxRatio || (ratio === maxRatio && stat.completed > bestCount)) {
          maxRatio = ratio;
          bestSlot = slot;
          bestCount = stat.completed;
        }
      }
    }

    if (maxRatio >= 0.75 && bestSlot) {
      const tier: PreferenceSourceTier = bestCount >= 7 ? 'STRONG_BEHAVIORAL' : 'WEAK_BEHAVIORAL';
      const conf = PreferenceLearner.calculateConfidence(
        slotCompletions[bestSlot]!.total,
        bestCount,
        slotCompletions[bestSlot]!.total - bestCount,
        tier
      );

      const insight: UserInsightItem = {
        id: `ins_timing_${Date.now()}`,
        userId,
        observation: `You completed ${bestCount} of ${slotCompletions[bestSlot]!.total} recent actions during ${bestSlot.toLowerCase().replace('_', ' ')}.`,
        possibleInterpretation: `${bestSlot.replace('_', ' ')} timing appears to fit your natural daily flow well.`,
        confidence: conf,
        potentialNextStep: `Consider scheduling your primary Amal in the ${bestSlot.toLowerCase().replace('_', ' ')}.`,
        status: 'PROPOSED',
        createdAt: new Date().toISOString(),
      };

      return {
        detected: true,
        preferredSlot: bestSlot,
        confidence: conf,
        insight,
      };
    }

    return { detected: false, confidence: 0 };
  }

  /**
   * Detects action-size feasibility.
   * Section 16: e.g. 10-minute Amal frequently skipped, 3-minute Amal completed -> recommend smaller action.
   */
  public static detectActionSizeFeasibility(
    userId: string,
    history: ActionLogEntry[]
  ): {
    detected: boolean;
    recommendedMaxMinutes?: number;
    confidence: number;
    insight?: UserInsightItem;
  } {
    const longAmals = history.filter((h) => h.durationMinutes >= 10);
    const shortAmals = history.filter((h) => h.durationMinutes <= 5);

    if (longAmals.length >= 3 && shortAmals.length >= 3) {
      const longCompletionRate = longAmals.filter((h) => h.status === 'COMPLETED').length / longAmals.length;
      const shortCompletionRate = shortAmals.filter((h) => h.status === 'COMPLETED').length / shortAmals.length;

      if (longCompletionRate <= 0.35 && shortCompletionRate >= 0.8) {
        const conf = 0.82;
        const insight: UserInsightItem = {
          id: `ins_size_${Date.now()}`,
          userId,
          observation: `Shorter 3-5 minute actions had an 80%+ completion rate, while 10+ minute actions were frequently skipped.`,
          possibleInterpretation: `A lighter, more concise Amal size currently fits your daily schedule better.`,
          confidence: conf,
          potentialNextStep: `Simplify targets to 3-5 minutes to build uninterrupted habit consistency.`,
          status: 'PROPOSED',
          createdAt: new Date().toISOString(),
        };

        return {
          detected: true,
          recommendedMaxMinutes: 5,
          confidence: conf,
          insight,
        };
      }
    }

    return { detected: false, confidence: 0 };
  }

  /**
   * Detects multi-friction signals.
   * Section 22: TIME + COMPLEXITY + REMINDER_FATIGUE.
   */
  public static detectFrictionSignals(history: ActionLogEntry[]): FrictionSignalV2[] {
    const signals: FrictionSignalV2[] = [];
    const skips = history.filter((h) => h.status === 'SKIPPED');
    if (skips.length === 0) return signals;

    const timeSkips = skips.filter((s) => s.skipReason === 'NOT_ENOUGH_TIME' || s.skipReason === 'BUSY');
    if (timeSkips.length >= 2) {
      signals.push({
        frictionCode: 'TIME_SCARCITY',
        confidence: Math.min(0.9, 0.4 + timeSkips.length * 0.15),
        observedOccurrences: timeSkips.length,
        firstDetectedAt: timeSkips[0]?.timestamp || new Date().toISOString(),
        lastDetectedAt: timeSkips[timeSkips.length - 1]?.timestamp || new Date().toISOString(),
        reversible: true,
      });
    }

    const fatigueSkips = skips.filter((s) => s.skipReason === 'ANNOYED_BY_NOTIFICATIONS');
    if (fatigueSkips.length >= 1) {
      signals.push({
        frictionCode: 'REMINDER_FATIGUE',
        confidence: 0.75,
        observedOccurrences: fatigueSkips.length,
        firstDetectedAt: fatigueSkips[0]?.timestamp || new Date().toISOString(),
        lastDetectedAt: fatigueSkips[fatigueSkips.length - 1]?.timestamp || new Date().toISOString(),
        reversible: true,
      });
    }

    return signals;
  }
}
