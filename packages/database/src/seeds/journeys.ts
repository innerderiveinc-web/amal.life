import { Journey, JourneyType } from '@amal/types';

export interface JourneyPhaseTemplate {
  sequence: number;
  title: string;
  objective: string;
  durationDays: number;
  minimumActionMinutes: number;
  targetActionMinutes: number;
}

export interface JourneyTemplate {
  journeyType: JourneyType;
  title: string;
  goal: string;
  description: string;
  durationDays: number;
  baselineDifficulty: 'VERY_EASY' | 'EASY' | 'MODERATE' | 'CHALLENGING';
  phases?: JourneyPhaseTemplate[];
  days: {
    dayNumber: number;
    title: string;
    learningPrompt: string;
    reflectionPrompt: string;
    actions: {
      title: string;
      description: string;
      estimatedMinutes: number;
      category: 'SALAH' | 'QURAN' | 'CHARACTER' | 'KNOWLEDGE' | 'FAMILY' | 'TIME_MANAGEMENT' | 'DHIKR' | 'SADAQAH';
      primaryEvidenceReference: string;
      difficulty: 'VERY_EASY' | 'EASY' | 'MODERATE' | 'CHALLENGING';
    }[];
  }[];
}

export const SEED_JOURNEY_TEMPLATES: JourneyTemplate[] = [
  // 1. FAJR RECOVERY (14 Days)
  {
    journeyType: 'FAJR_RECOVERY',
    title: '14-Day Fajr Recovery',
    goal: 'Wake up consistently for Fajr prayer by fixing evening habits, bedtime friction, and morning intention.',
    description: 'A gentle, progressive 14-day routine that focuses on evening wind-down, screen discipline, and prophetic sleep habits rather than forceful willpower alone.',
    durationDays: 14,
    baselineDifficulty: 'MODERATE',
    phases: [
      { sequence: 1, title: 'Evening Friction Removal', objective: 'Establish consistent bedtime and phone distance', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 15 },
      { sequence: 2, title: 'Awakening Anchors', objective: 'Untie sleep knots immediately upon alarm', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 15 },
      { sequence: 3, title: 'Sunnah Integration', objective: 'Incorporate Sunnah of Fajr and calm morning presence', durationDays: 4, minimumActionMinutes: 10, targetActionMinutes: 20 },
      { sequence: 4, title: 'Sustainable Maintenance', objective: 'Anchor lifelong routine and gentle recovery mechanics', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 15 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Resetting the Evening Anchor',
        learningPrompt: 'Fajr begins the night before. The Prophet (pbuh) disliked sleeping before Isha and engaging in idle conversation after it.',
        reflectionPrompt: 'What time did you put down your phone tonight? How did your sleep environment feel?',
        actions: [
          {
            title: 'Complete Isha on Time & Wind Down',
            description: 'Pray Isha, silence non-essential phone notifications 45 minutes before sleep.',
            estimatedMinutes: 15,
            category: 'SALAH',
            primaryEvidenceReference: 'Sahih al-Bukhari 568',
            difficulty: 'EASY',
          },
          {
            title: 'Place Alarm Across the Room',
            description: 'Set your morning alarm outside arm’s reach with a glass of water nearby.',
            estimatedMinutes: 5,
            category: 'TIME_MANAGEMENT',
            primaryEvidenceReference: 'Sahih Muslim 776',
            difficulty: 'VERY_EASY',
          },
        ],
      },
      {
        dayNumber: 2,
        title: 'The Prophetic Adhkar Before Sleep',
        learningPrompt: 'Reciting Ayat al-Kursi and Surah al-Ikhlas, al-Falaq, and an-Nas brings tranquility and angelic protection to your night.',
        reflectionPrompt: 'Did you feel calmer falling asleep after reciting the bedtime adhkar?',
        actions: [
          {
            title: 'Recite 3 Quls & Sleep on Right Side',
            description: 'Make wudu before bed, recite the protective Surahs, and state your sincere intention (Niyyah) for Fajr.',
            estimatedMinutes: 10,
            category: 'DHIKR',
            primaryEvidenceReference: 'Sahih al-Bukhari 5017',
            difficulty: 'EASY',
          },
        ],
      },
      {
        dayNumber: 3,
        title: 'The Immediate Stand',
        learningPrompt: 'When waking up, remembrance of Allah unties the first knot of sleep, wudu unties the second, and Salah unties the third.',
        reflectionPrompt: 'Did you experience hesitation when the alarm sounded, or did you rise immediately?',
        actions: [
          {
            title: 'Say Alhamdulillah and Wash Face Immediately',
            description: 'Say "Alhamdu lillahil-ladhi ahyana ba\'da ma amatana", sit up within 30 seconds, and make wudu.',
            estimatedMinutes: 10,
            category: 'SALAH',
            primaryEvidenceReference: 'Sahih al-Bukhari 1142',
            difficulty: 'MODERATE',
          },
        ],
      },
      {
        dayNumber: 4,
        title: 'Check-In & Adaptation',
        learningPrompt: 'Reviewing progress without guilt: every small adjustment builds permanent neurological habits.',
        reflectionPrompt: 'If you struggled any day this week, what was the primary obstacle: bedtime, tiredness, or phone use?',
        actions: [
          {
            title: '5-Minute Calm Muhasabah',
            description: 'Review your wake-up times and adjust your target sleep hour by 15 minutes earlier if tired.',
            estimatedMinutes: 5,
            category: 'TIME_MANAGEMENT',
            primaryEvidenceReference: 'Sahih al-Bukhari 6464',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 2. SALAH CONSISTENCY (21 Days)
  {
    journeyType: 'SALAH_CONSISTENCY',
    title: '21-Day Salah Consistency',
    goal: 'Establish steady, unhurried 5 daily prayers anchored to your actual daily routine.',
    description: 'Transform prayer from a stressful obligation into an anchoring sanctuary throughout your workday.',
    durationDays: 21,
    baselineDifficulty: 'EASY',
    phases: [
      { sequence: 1, title: 'Calendar Sanctuary', objective: 'Protect prayer intervals in workday', durationDays: 5, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 2, title: 'Presence & Khushu Base', objective: 'Slow down movements and contemplate recitation', durationDays: 7, minimumActionMinutes: 10, targetActionMinutes: 15 },
      { sequence: 3, title: 'Rawatib Addition', objective: 'Safely integrate confirmed Sunnah prayers', durationDays: 5, minimumActionMinutes: 10, targetActionMinutes: 20 },
      { sequence: 4, title: 'Lifelong Anchoring', objective: 'Prayer as emotional reset and sanctuary', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 15 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Anchoring Your Schedule Around Prayer',
        learningPrompt: 'The believers are those who guard their prayers at their appointed times.',
        reflectionPrompt: 'Which prayer in your day feels most rushed or vulnerable to disruption?',
        actions: [
          {
            title: 'Calendar Check: Block 10 Min for Dhuhr & Asr',
            description: 'Mark brief quiet pauses in your calendar for your midday prayers.',
            estimatedMinutes: 5,
            category: 'SALAH',
            primaryEvidenceReference: 'Quran 4:103',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 3. QURAN RESTART (14 Days)
  {
    journeyType: 'QURAN_RESTART',
    title: '14-Day Quran Restart',
    goal: 'Reconnect with the words of Allah without feeling overwhelmed or inadequate.',
    description: 'Small, deeply meaningful daily doses: 5 verses with translation and contemplation.',
    durationDays: 14,
    baselineDifficulty: 'VERY_EASY',
    phases: [
      { sequence: 1, title: 'Gentle Reconnection', objective: 'Read 5 verses daily without guilt or speed pressure', durationDays: 3, minimumActionMinutes: 3, targetActionMinutes: 5 },
      { sequence: 2, title: 'Tadabbur Contemplation', objective: 'Understand translation and connect to daily life', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 3, title: 'Recitation Practice', objective: 'Listen to master reciters and improve tajweed ease', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 4, title: 'Daily Flow', objective: 'Lock in an effortless daily Quran slot', durationDays: 3, minimumActionMinutes: 3, targetActionMinutes: 10 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Returning to Surah al-Fatihah with Fresh Eyes',
        learningPrompt: 'Surah al-Fatihah is a direct intimate conversation between the servant and the Lord of the Worlds.',
        reflectionPrompt: 'What meaning stood out to you when reading the translation today?',
        actions: [
          {
            title: 'Read Al-Fatihah with English Translation',
            description: 'Spend 7 quiet minutes reading Surah al-Fatihah with deep contemplation of each verse.',
            estimatedMinutes: 7,
            category: 'QURAN',
            primaryEvidenceReference: 'Sahih Muslim 395',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 4. DAILY QURAN HABIT (30 Days)
  {
    journeyType: 'DAILY_QURAN_HABIT',
    title: '30-Day Daily Quran Habit',
    goal: 'Build an unbreakable daily 10-minute Quran reading and contemplation habit.',
    description: 'Read measured portions daily, cultivating love, understanding, and peaceful consistency.',
    durationDays: 30,
    baselineDifficulty: 'EASY',
    phases: [
      { sequence: 1, title: 'Habit Anchor', objective: 'Set fixed reading time after morning or evening prayer', durationDays: 7, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 2, title: 'Depth & Translation', objective: 'Deep dive into meanings and context', durationDays: 8, minimumActionMinutes: 5, targetActionMinutes: 15 },
      { sequence: 3, title: 'Memorization Seeds', objective: 'Memorize short verses for Salah reflection', durationDays: 8, minimumActionMinutes: 10, targetActionMinutes: 20 },
      { sequence: 4, title: 'Perpetual Habit', objective: 'Sustained independent engagement', durationDays: 7, minimumActionMinutes: 5, targetActionMinutes: 15 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'The Power of 10 Minutes',
        learningPrompt: 'Consistency of small deeds is more beloved to Allah than occasional bursts followed by cessation.',
        reflectionPrompt: 'When is your quietest 10 minutes in the day: after Fajr, lunch, or before bed?',
        actions: [
          {
            title: 'Read 1 Page with Translation',
            description: 'Open to Surah al-Baqarah or Surah Maryam and read 1 page slowly.',
            estimatedMinutes: 10,
            category: 'QURAN',
            primaryEvidenceReference: 'Sahih al-Bukhari 6464',
            difficulty: 'EASY',
          },
        ],
      },
    ],
  },

  // 5. ANGER & PATIENCE (7 Days)
  {
    journeyType: 'ANGER_AND_PATIENCE',
    title: '7-Day Anger & Patience Journey',
    goal: 'Master prophetic emotional regulation, speech restraint, and internal calmness during irritation.',
    description: 'Learn physiological and spiritual reflexes when frustrated: posture shifts, wudu, and istiadha.',
    durationDays: 7,
    baselineDifficulty: 'EASY',
    phases: [
      { sequence: 1, title: 'Trigger Recognition', objective: 'Identify somatic signs of irritation early', durationDays: 2, minimumActionMinutes: 3, targetActionMinutes: 5 },
      { sequence: 2, title: 'Prophetic Pauses', objective: 'Practice 3-second pause and wudu reset', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 3, title: 'Speech Restraint', objective: 'Replace reactive complaints with calm silence or istighfar', durationDays: 2, minimumActionMinutes: 5, targetActionMinutes: 10 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'The Prophetic Pause',
        learningPrompt: 'The strong person is the one who controls himself when angry.',
        reflectionPrompt: 'What triggered frustration for you today, and did you remember to pause before reacting?',
        actions: [
          {
            title: 'Practice the 3-Second Pause & Isti\'adha',
            description: 'When feeling irritation, say "A\'udhu billahi minash-shaytanir-rajim" and delay your response by 3 seconds.',
            estimatedMinutes: 5,
            category: 'CHARACTER',
            primaryEvidenceReference: 'Sahih al-Bukhari 6116',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 6. TIME & DEEN (14 Days)
  {
    journeyType: 'TIME_AND_DEEN',
    title: '14-Day Time & Deen Alignment',
    goal: 'Reclaim your hours from digital distractions and align your productivity with barakah.',
    description: 'Conduct a gentle barakah audit, set smartphone boundaries, and build Salah-anchored focus blocks.',
    durationDays: 14,
    baselineDifficulty: 'MODERATE',
    phases: [
      { sequence: 1, title: 'Distraction Audit', objective: 'Identify digital leaks and energy drains', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 2, title: 'Barakah Windows', objective: 'Leverage early morning hours for prime tasks', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 15 },
      { sequence: 3, title: 'Prioritizing the Eternal', objective: 'Structure day around Salah milestones', durationDays: 4, minimumActionMinutes: 10, targetActionMinutes: 20 },
      { sequence: 4, title: 'Sustainable Balance', objective: 'Prevent burnout and keep intentional margins', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 15 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'The Barakah Audit',
        learningPrompt: 'Take advantage of five before five: your youth before old age, health before illness, wealth before poverty, free time before preoccupation, and life before death.',
        reflectionPrompt: 'Where did you notice unintentional time drain today?',
        actions: [
          {
            title: 'Audit Screen Time & Set 1 Limit',
            description: 'Check today’s screen time. Set a 30-minute limit on the most distracting non-work app.',
            estimatedMinutes: 10,
            category: 'TIME_MANAGEMENT',
            primaryEvidenceReference: 'Al-Hakim in Al-Mustadrak 7831',
            difficulty: 'EASY',
          },
        ],
      },
    ],
  },

  // 7. NEW MUSLIM FIRST 30 DAYS (30 Days)
  {
    journeyType: 'NEW_MUSLIM_FIRST_30_DAYS',
    title: 'New Muslim: First 30 Days',
    goal: 'A calm, supportive step-by-step introduction to living Islam without information overload.',
    description: 'Designed specifically for reverts: learn one clear concept at a time, celebrate your journey, and build confidence.',
    durationDays: 30,
    baselineDifficulty: 'VERY_EASY',
    phases: [
      { sequence: 1, title: 'Welcoming Sincerity', objective: 'Embrace ease and understand Allah’s gentle mercy', durationDays: 7, minimumActionMinutes: 3, targetActionMinutes: 5 },
      { sequence: 2, title: 'Foundations of Worship', objective: 'Learn basic wudu and fundamental prayer postures', durationDays: 8, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 3, title: 'Living the Values', objective: 'Food mindfulness, clean habits, and kindness', durationDays: 8, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 4, title: 'Community & Growth', objective: 'Connect with local support and continuous learning', durationDays: 7, minimumActionMinutes: 5, targetActionMinutes: 15 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Welcome: Allah Knows Your Heart',
        learningPrompt: 'Religion is ease and mercy. You do not need to learn everything on Day 1. Start with peaceful sincerity.',
        reflectionPrompt: 'How are you feeling as you begin this journey? Remember you are not alone.',
        actions: [
          {
            title: 'Learn the Meaning of Bismillah',
            description: 'Understand the phrase "Bismillah ar-Rahman ar-Rahim" and practice saying it before eating or starting tasks.',
            estimatedMinutes: 5,
            category: 'KNOWLEDGE',
            primaryEvidenceReference: 'Sahih al-Bukhari 39',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 8. RAMADAN PREPARATION (14 Days)
  {
    journeyType: 'RAMADAN_PREPARATION',
    title: '14-Day Ramadan Preparation',
    goal: 'Enter the blessed month with primed spiritual stamina, balanced routine, and clear intentions.',
    description: 'Condition your appetite, sleep, and Quran routine before the crescent appears.',
    durationDays: 14,
    baselineDifficulty: 'EASY',
    phases: [
      { sequence: 1, title: 'Intention & Conditioning', objective: 'Set Ramadan goals and fast voluntary days if able', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 2, title: 'Night Prayer Priming', objective: 'Practice 2 rakat of Qiyam al-Layl before sleep', durationDays: 4, minimumActionMinutes: 10, targetActionMinutes: 20 },
      { sequence: 3, title: 'Quran & Charity Momentum', objective: 'Establish daily juz/page pacing and give micro-sadaqah', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 15 },
      { sequence: 4, title: 'Entering the Crescent', objective: 'Welcome Ramadan with pure heart and clean schedule', durationDays: 3, minimumActionMinutes: 10, targetActionMinutes: 20 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Formulating Your Ramadan Niyyah',
        learningPrompt: 'Whoever fasts Ramadan out of faith and hope of reward, all their past sins are forgiven.',
        reflectionPrompt: 'What is your single most important hope for this coming Ramadan?',
        actions: [
          {
            title: 'Write Down 3 Primary Ramadan Intentions',
            description: 'Choose 1 worship goal, 1 character goal, and 1 relationship goal.',
            estimatedMinutes: 10,
            category: 'KNOWLEDGE',
            primaryEvidenceReference: 'Sahih al-Bukhari 38',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 9. DUA CONSISTENCY (14 Days)
  {
    journeyType: 'DUA_CONSISTENCY',
    title: '14-Day Dua Consistency',
    goal: 'Build an intimate, sustained daily supplication practice anchored to times of answer (Ijabah).',
    description: 'Learn prophetic etiquette of dua, connect with personal vulnerability, and pray consistently between Adhan and Iqamah.',
    durationDays: 14,
    baselineDifficulty: 'VERY_EASY',
    phases: [
      { sequence: 1, title: 'Adhan & Iqamah Anchors', objective: 'Seize prime supplication windows', durationDays: 3, minimumActionMinutes: 3, targetActionMinutes: 5 },
      { sequence: 2, title: 'Prophetic Praise Foundations', objective: 'Begin with Hamd and Salawat', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 3, title: 'Comprehensive Duas', objective: 'Memorize concise, comprehensive prophetic petitions', durationDays: 4, minimumActionMinutes: 5, targetActionMinutes: 10 },
      { sequence: 4, title: 'Certainty & Tawakkul', objective: 'Make dua with certitude and calm reliance', durationDays: 3, minimumActionMinutes: 5, targetActionMinutes: 15 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'The Dua Window Between Adhan & Iqamah',
        learningPrompt: 'The supplication made between the Adhan and the Iqamah is not rejected.',
        reflectionPrompt: 'Did you pause for 1 minute before starting prayer to make a personal dua?',
        actions: [
          {
            title: '1-Minute Personal Dua Before Salah',
            description: 'Before beginning your prayer, ask Allah for your greatest immediate need.',
            estimatedMinutes: 3,
            category: 'DHIKR',
            primaryEvidenceReference: 'Sunan Abi Dawud 521',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },

  // 10. DHIKR RESTART (7 Days)
  {
    journeyType: 'DHIKR_RESTART',
    title: '7-Day Dhikr Restart',
    goal: 'Re-energize your tongue and heart with simple, continuous remembrance throughout daily routines.',
    description: 'Effortless micro-remembrance habits during commutes, dishwashing, and quiet transitions.',
    durationDays: 7,
    baselineDifficulty: 'VERY_EASY',
    phases: [
      { sequence: 1, title: 'Morning & Evening Staples', objective: 'Say Subhanallah wa bihamdihi 100 times', durationDays: 2, minimumActionMinutes: 3, targetActionMinutes: 5 },
      { sequence: 2, title: 'Transition Adhkar', objective: 'Remembrance when leaving home or riding vehicle', durationDays: 3, minimumActionMinutes: 2, targetActionMinutes: 5 },
      { sequence: 3, title: 'Heart Presence', objective: 'Contemplating meanings of forgiveness and gratitude', durationDays: 2, minimumActionMinutes: 5, targetActionMinutes: 10 },
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Two Words Light on the Tongue',
        learningPrompt: 'Two words are light on the tongue, heavy on the balance, and beloved to the Most Merciful: Subhanallahi wa bihamdihi, Subhanallahil-Azim.',
        reflectionPrompt: 'When did you remember to recite this dhikr during your daily movements today?',
        actions: [
          {
            title: 'Recite Subhanallahi wa bihamdihi 33 Times',
            description: 'Recite during your morning commute or after Fajr prayer.',
            estimatedMinutes: 3,
            category: 'DHIKR',
            primaryEvidenceReference: 'Sahih al-Bukhari 6406',
            difficulty: 'VERY_EASY',
          },
        ],
      },
    ],
  },
];
