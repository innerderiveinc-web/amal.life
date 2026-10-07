import { UserActivityState } from '@amal/types';

export class ReengagementEngine {
  /**
   * Evaluates user activity state based on days since last engagement.
   */
  public static categorizeActivity(daysSinceActive: number): UserActivityState {
    if (daysSinceActive < 3) return 'ACTIVE';
    if (daysSinceActive <= 7) return 'LOW_ACTIVITY';
    return 'DORMANT';
  }

  /**
   * Generates respectful, zero-guilt re-engagement messages.
   * Strictly enforces:
   * 1. No mention of streaks, broken habits, or religious guilt.
   * 2. No quotes from private reflections or journals.
   */
  public static generateReengagementMessage(
    state: UserActivityState,
    contextName: string = 'your journey'
  ): { title: string; body: string } {
    switch (state) {
      case 'DORMANT':
        return {
          title: 'AMAL is here whenever you are ready',
          body: 'No pressure, no expectations. A calm space awaits you whenever you wish to pause.',
        };

      case 'LOW_ACTIVITY':
        return {
          title: 'A gentle pause in your day',
          body: `Whenever you feel ready, take a quiet moment for ${contextName}. Small, consistent steps bring peace.`,
        };

      case 'RETURNING':
        return {
          title: 'Welcome back',
          body: 'We are honored to accompany your steps. Start afresh with ease and intention.',
        };

      case 'RESTARTED':
        return {
          title: 'A new intention, a fresh start',
          body: 'Every sincere beginning is blessed. Take today one calm step at a time.',
        };

      case 'ACTIVE':
      default:
        return {
          title: 'Ready for today?',
          body: `Take one meaningful step in ${contextName}.`,
        };
    }
  }

  /**
   * Asserts that a candidate copy string adheres to the Zero-Guilt invariant.
   * Throws or returns validation result if guilt/shame patterns are detected.
   */
  public static validateNonGuiltCopy(text: string): { isClean: boolean; violations: string[] } {
    const forbiddenPhrases = [
      /broke your streak/i,
      /you haven't prayed/i,
      /don't let your deen slip/i,
      /you missed/i,
      /streak is at risk/i,
      /falling behind/i,
      /disappointing/i,
      /losing barakah/i,
      /shame on you/i,
    ];

    const violations: string[] = [];
    for (const pattern of forbiddenPhrases) {
      if (pattern.test(text)) {
        violations.push(`Forbidden guilt pattern detected: ${pattern.source}`);
      }
    }

    return {
      isClean: violations.length === 0,
      violations,
    };
  }
}
