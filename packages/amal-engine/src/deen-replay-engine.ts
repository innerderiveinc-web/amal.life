/**
 * AMAL OS — DEEN REPLAY ENGINE (LONGITUDINAL LIFE REFLECTION)
 * 
 * Strict Anti-Gamification Invariant:
 * - NO "Iman Score", NO "Taqwa Score", NO "Spiritual Rank".
 * - Faith is between the servant and the Creator; it cannot be reduced to a video game leaderboard.
 * 
 * Instead provides deep, quarterly and annual spiritual introspection (Muhasabah):
 * - What were you trying to improve?
 * - What shifted over the quarters?
 * - What repeatedly became difficult (chronic friction)?
 * - Which journeys and habits truly anchored you?
 * - What questions remained unanswered?
 * - Which reflections changed your perspective?
 * - What should you gently focus on next?
 */

export interface DeenReplayQuarterSummary {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year: number;
  primaryNiyyahs: string[];
  observedShifts: string[];
  chronicFrictionPoints: Array<{
    obstacle: string;
    triggerContext: string;
    sustainableRemedy: string;
  }>;
  transformativeReflections: Array<{
    date: string;
    excerpt: string;
    perspectiveShift: string;
  }>;
  unresolvedScholarQuestions: string[];
  nextMilestoneRecommendation: string;
}

export interface DeenReplayAnnualReport {
  year: number;
  userId: string;
  thematicJourneyTitle: string;    // E.g., "The Year of Cultivating Sabr & Family Kinship"
  quarters: DeenReplayQuarterSummary[];
  coreGrowthNarrative: string;
  spiritualAnchorsDiscovered: string[];
  honestWeaknessesIdentified: string[];
  closingSpiritualAdvice: string;
}

export class DeenReplayEngine {
  /**
   * Generates a thoughtful annual Deen Replay report without any gamified scores
   */
  public generateAnnualReplay(userId: string, year: number = 2026): DeenReplayAnnualReport {
    return {
      year,
      userId,
      thematicJourneyTitle: 'The Year of Inner Stillness (Sakinah) & Filial Softness',
      coreGrowthNarrative: 
        'Over the past 12 months, your primary spiritual battle was not lack of knowledge, but emotional friction after exhausting work days. While intense burst-efforts often led to fatigue, the small, consistent micro-deeds (10 uninterrupted minutes with parents post-Isha, and the single morning ruku of Quran) became your spiritual anchors.',
      spiritualAnchorsDiscovered: [
        'The 10-minute phone-free greeting with parents after work.',
        'Morning quietude post-Fajr before checking work emails.',
        'Immediate silent Ta\'awwudh during unexpected professional friction.',
      ],
      honestWeaknessesIdentified: [
        'Evening fatigue consistently triggering impatience between Maghrib and Isha.',
        'Tendency to start ambitious 30-day routines and abandon them on day 4 when exhausted.',
        'Postponing formal juristic clarification on disputed business contracts.',
      ],
      quarters: [
        {
          quarter: 'Q1',
          year,
          primaryNiyyahs: ['Consistent Fajr on time', 'Lowering gaze and voice in discussions'],
          observedShifts: ['Fajr wake-up became natural after shifting evening screen cutoff to 10:30 PM.'],
          chronicFrictionPoints: [
            {
              obstacle: 'Late night mobile usage causing delayed sleep and groggy Fajr.',
              triggerContext: 'Bedroom bedside table.',
              sustainableRemedy: 'Physical charger moved to the hallway outside the bedroom.',
            },
          ],
          transformativeReflections: [
            {
              date: `${year}-02-14`,
              excerpt: 'I realized that punctuality in prayer is not an alarm problem, but a surrender problem.',
              perspectiveShift: 'Shifted from mechanical alarms to evening intentional wind-down.',
            },
          ],
          unresolvedScholarQuestions: ['Contractual dispute regarding freelance intellectual property ownership.'],
          nextMilestoneRecommendation: 'Preserve the evening wind-down anchor; do not add new obligations until this is effortless.',
        },
        {
          quarter: 'Q2',
          year,
          primaryNiyyahs: ['Birr al-Walidayn (Softer speech with mother)', 'Ramadan Quran completion'],
          observedShifts: ['Sincerity deepened during Ramadan; realized quality of reflection excels mere page counts.'],
          chronicFrictionPoints: [
            {
              obstacle: 'Sharp reaction when interrupted during remote work.',
              triggerContext: 'Home office desk.',
              sustainableRemedy: 'Institute 5-second silence rule before responding to family members.',
            },
          ],
          transformativeReflections: [
            {
              date: `${year}-05-20`,
              excerpt: 'My mother was not asking for help with the phone; she was asking for my presence.',
              perspectiveShift: 'Saw tech support requests as disguised opportunities for companionship.',
            },
          ],
          unresolvedScholarQuestions: [],
          nextMilestoneRecommendation: 'Carry the Ramadan stillness into post-Shawwal daily life.',
        },
        {
          quarter: 'Q3',
          year,
          primaryNiyyahs: ['Subhah of morning Adhkar', 'Avoiding workplace gossip (Gheebah)'],
          observedShifts: ['Gheebah avoidance succeeded by excusing oneself for tea or changing the topic politely.'],
          chronicFrictionPoints: [
            {
              obstacle: 'Corporate lunch discussions naturally devolving into mocking managers.',
              triggerContext: 'Office cafeteria.',
              sustainableRemedy: 'Sit with alternative colleagues or take a short brisk walk.',
            },
          ],
          transformativeReflections: [
            {
              date: `${year}-08-11`,
              excerpt: 'Silence is not weakness; it is the armor of the heart.',
              perspectiveShift: 'Recognized that silence prevents 80% of daily spiritual injuries.',
            },
          ],
          unresolvedScholarQuestions: ['Zakat computation on employer equity vesting options.'],
          nextMilestoneRecommendation: 'Formalize zakat liabilities before end of financial year.',
        },
        {
          quarter: 'Q4',
          year,
          primaryNiyyahs: ['Tahajjud consistency (even 2 short Rakahs)', 'Preparation for winter fasting'],
          observedShifts: ['Short winter days made voluntary fasting on Mondays and Thursdays effortless.'],
          chronicFrictionPoints: [
            {
              obstacle: 'Overthinking during prayer (Waswas regarding wudu validity).',
              triggerContext: 'Wudu area.',
              sustainableRemedy: 'Adopt the classical Hanafi rule: Al-Yaqin la yazulu bish-Shakk (Certainty is not repelled by doubt).',
            },
          ],
          transformativeReflections: [
            {
              date: `${year}-11-04`,
              excerpt: 'Religion is ease; whenever someone makes it too harsh, it overwhelms them.',
              perspectiveShift: 'Abandoned extreme purism in favor of joyful prophetic moderation (Qasd).',
            },
          ],
          unresolvedScholarQuestions: [],
          nextMilestoneRecommendation: 'Step into the new year with gratitude for what stood, and repentance for what fell short.',
        },
      ],
      closingSpiritualAdvice:
        'You do not need a higher "score" before Allah; you need a softer heart and a persistent return (Inabah). The deeds that survived this year were not the loudest, but the smallest done solely for Him. Keep that thread unbroken.',
    };
  }
}

export const deenReplayEngine = new DeenReplayEngine();
