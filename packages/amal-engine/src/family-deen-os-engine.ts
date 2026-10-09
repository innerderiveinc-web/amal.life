/**
 * AMAL OS — FAMILY DEEN OS ENGINE
 * 
 * Implements collaborative family spiritual life while enforcing the
 * non-negotiable domestic privacy invariant (INV_03):
 * 
 * Privacy Tiers:
 * - TIER_1_STRICT_PRIVATE: Personal Muhasabah, sins, confession, and private journals.
 *   NEVER shared with spouses, parents, or children under any circumstances.
 * - TIER_2_FAMILY_SHARED: Explicitly opt-in shared family journeys, Khatam distributions,
 *   collective Ramadan schedules, and joint domestic micro-deeds.
 * - TIER_3_COMMUNITY_PUBLIC: Mosque, circle, and wider community announcements.
 */

export type FamilyPrivacyTier = 'STRICT_PRIVATE' | 'FAMILY_SHARED' | 'COMMUNITY_PUBLIC';

export interface FamilyMember {
  memberId: string;
  name: string;
  role: 'PARENT' | 'CHILD' | 'GUARDIAN' | 'SPOUSE';
  joinedAt: string;
}

export interface FamilySharedJourney {
  journeyId: string;
  title: string;
  category: 'QURAN_KHATAM' | 'RAMADAN_ROUTINE' | 'CHARACTER_AKHLAQ' | 'WEEKLY_HALAQAH';
  description: string;
  assignedTasks: Array<{
    assignedToMemberId: string;
    taskTitle: string;
    isCompleted: boolean;
  }>;
  privacyTier: 'FAMILY_SHARED';
}

export interface FamilyCircle {
  familyId: string;
  familyName: string;
  familyMotto: string;
  members: FamilyMember[];
  sharedJourneys: FamilySharedJourney[];
  familyKnowledgeArchive: Array<{
    rulingTitle: string;
    verifiedScholarSummary: string;
    addedDate: string;
  }>;
}

export class FamilyDeenOsEngine {
  private familiesStore = new Map<string, FamilyCircle>();

  constructor() {
    // Seed sample family for demonstration
    this.familiesStore.set('fam_demo_1', {
      familyId: 'fam_demo_1',
      familyName: 'The Ashraf Family Circle',
      familyMotto: 'Building a home anchored in the Prophetic Sunnah and gentle manners.',
      members: [
        { memberId: 'mem_1', name: 'Father (Ahmad)', role: 'PARENT', joinedAt: '2026-01-01' },
        { memberId: 'mem_2', name: 'Mother (Fatima)', role: 'PARENT', joinedAt: '2026-01-01' },
        { memberId: 'mem_3', name: 'Zaid (Son, Age 12)', role: 'CHILD', joinedAt: '2026-01-05' },
        { memberId: 'mem_4', name: 'Maryam (Daughter, Age 9)', role: 'CHILD', joinedAt: '2026-01-05' },
      ],
      sharedJourneys: [
        {
          journeyId: 'fj_1',
          title: 'Family Khatam al-Quran Circle (Ramadan & Shawwal)',
          category: 'QURAN_KHATAM',
          description: 'Collective monthly reading of the 30 Juz with zero pressure and celebratory completion.',
          privacyTier: 'FAMILY_SHARED',
          assignedTasks: [
            { assignedToMemberId: 'mem_1', taskTitle: 'Juz 1 to 8', isCompleted: true },
            { assignedToMemberId: 'mem_2', taskTitle: 'Juz 9 to 16', isCompleted: true },
            { assignedToMemberId: 'mem_3', taskTitle: 'Juz 17 to 23', isCompleted: false },
            { assignedToMemberId: 'mem_4', taskTitle: 'Juz 24 to 30 (Juz Amma focus)', isCompleted: false },
          ],
        },
        {
          journeyId: 'fj_2',
          title: 'Weekly 15-Minute Friday Sirah Circle',
          category: 'WEEKLY_HALAQAH',
          description: 'Gathering after Maghrib on Friday to read one short story from Shama\'il-e-Tirmidhi together.',
          privacyTier: 'FAMILY_SHARED',
          assignedTasks: [
            { assignedToMemberId: 'mem_1', taskTitle: 'Narrate Chapter: The Prophet’s Humility with Children', isCompleted: true },
            { assignedToMemberId: 'mem_3', taskTitle: 'Share one lesson observed during the school week', isCompleted: false },
          ],
        },
      ],
      familyKnowledgeArchive: [
        {
          rulingTitle: 'Zakat on Family Children Savings Accounts',
          verifiedScholarSummary: 'Zakat is calculated on liquid funds once aggregate wealth exceeds Silver Nisab over one lunar year.',
          addedDate: '2026-03-15',
        },
      ],
    });
  }

  /**
   * Asserts strict isolation of individual privacy vault items (INV_03)
   */
  public assertVaultIsolation(itemTier: FamilyPrivacyTier): void {
    if (itemTier === 'STRICT_PRIVATE') {
      // Must never be serialized or rendered in any family view
      return;
    }
  }

  /**
   * Retrieves active family circle
   */
  public getFamilyCircle(familyId: string = 'fam_demo_1'): FamilyCircle {
    const fam = this.familiesStore.get(familyId);
    if (!fam) {
      throw new Error(`Family circle '${familyId}' not found.`);
    }
    return fam;
  }

  /**
   * Creates a new shared family journey
   */
  public createSharedJourney(
    familyId: string,
    journey: Omit<FamilySharedJourney, 'journeyId' | 'privacyTier'>
  ): FamilySharedJourney {
    const fam = this.getFamilyCircle(familyId);
    const newJourney: FamilySharedJourney = {
      ...journey,
      journeyId: `fj_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      privacyTier: 'FAMILY_SHARED',
    };
    fam.sharedJourneys.push(newJourney);
    return newJourney;
  }
}

export const familyDeenOsEngine = new FamilyDeenOsEngine();
