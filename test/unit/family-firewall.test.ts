/**
 * AMAL OS Unit Tests: Family Privacy Boundaries
 */
import { FamilyPrivacyFirewall } from '../../packages/safety/src/family-firewall.js';

export function runFamilyPrivacyTests(): boolean {
  console.log('[Test Suite] Running Family Privacy Unit Tests...');

  // 1. User can view own reflection
  const selfAccess = FamilyPrivacyFirewall.canAccessReflection('user-1', 'user-1', false, false);
  if (!selfAccess.allowed) {
    throw new Error('User must be allowed to view own reflection');
  }

  // 2. Adult family member CANNOT view another adult member's reflection
  const adultToAdult = FamilyPrivacyFirewall.canAccessReflection('father-id', 'mother-id', false, false);
  if (adultToAdult.allowed) {
    throw new Error('Adult reflections must never be exposed to other adults in family');
  }

  // 3. Sanitized progress view redacts private notes
  const sanitized = FamilyPrivacyFirewall.sanitizeFamilyProgressView([
    {
      userId: 'child-1',
      actionTitle: 'Read 5 verses',
      isCompleted: true,
      reflectionNotes: 'Private feelings that should not be shared',
    },
  ]);

  if ((sanitized.activitiesSummary[0] as any).reflectionNotes) {
    throw new Error('Private reflection notes leaked in family progress view!');
  }

  console.log('✓ Family Privacy Firewall unit tests passed (Zero leak across adult/child boundaries).');
  return true;
}
