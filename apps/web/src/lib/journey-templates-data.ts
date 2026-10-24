/**
 * Journey Templates Data & Day-by-Day Micro-Actions
 *
 * Implements evidence-based, compassionate prophetic roadmaps for spiritual progression.
 * Each template contains day-by-day actions, authentic Hadith references, phase breakdowns,
 * and muhasabah prompts.
 */

export interface JourneyDayPlan {
  day: number;
  phase: number;
  phaseName: string;
  title: string;
  action: string;
  evidence: {
    text: string;
    reference: string;
  };
  reflectionPrompt: string;
}

export interface JourneyTemplateDetails {
  id: string;
  title: string;
  durationDays: number;
  phaseCount: number;
  phases: { phase: number; name: string; daysRange: string; focus: string }[];
  description: string;
  days: JourneyDayPlan[];
}

export const JOURNEY_TEMPLATES: Record<string, JourneyTemplateDetails> = {
  'tmpl-fajr-14d': {
    id: 'tmpl-fajr-14d',
    title: '14-Day Fajr Recovery',
    durationDays: 14,
    phaseCount: 3,
    phases: [
      { phase: 1, name: 'Foundation', daysRange: 'Days 1–4', focus: 'Sleep sanctuary, reducing friction, establishing sincere Niyyah' },
      { phase: 2, name: 'Anchoring', daysRange: 'Days 5–9', focus: 'Consistent circadian rhythm, untying morning knots, immediate Wudhu' },
      { phase: 3, name: 'Sustainability', daysRange: 'Days 10–14', focus: 'Post-Fajr remembrance, Jama’ah anchor, long-term steadfastness' },
    ],
    description: 'A compassionate, evidence-backed progression to establish consistent Fajr prayer without spiritual burnout or shame.',
    days: [
      {
        day: 1,
        phase: 1,
        phaseName: 'Foundation',
        title: 'Sincere Niyyah & Sleep Sanctuary',
        action: 'Turn off all social media screens 45 minutes before sleep. Make a clear, conscious intention (Niyyah) in your heart: "I intend to wake for Fajr solely for the pleasure of Allah."',
        evidence: {
          text: 'Actions are judged by intentions, and every person will get what they intended.',
          reference: 'Sahih al-Bukhari 1',
        },
        reflectionPrompt: 'What distraction in your evening routine usually delays your sleep, and how can you gently replace it?',
      },
      {
        day: 2,
        phase: 1,
        phaseName: 'Foundation',
        title: 'Physical Alarm Displacement',
        action: 'Place your phone or alarm clock across the room so that turning it off requires you to stand up out of bed. Never leave it within arm reach.',
        evidence: {
          text: 'During sleep, Satan ties three knots at the back of one’s head. When one wakes and remembers Allah, one knot is untied.',
          reference: 'Sahih al-Bukhari 1142',
        },
        reflectionPrompt: 'Notice the physical momentum: once your feet touch the floor, the battle is already half won.',
      },
      {
        day: 3,
        phase: 1,
        phaseName: 'Foundation',
        title: 'Immediate Wudhu & First Sunnah Dua',
        action: 'The moment your eyes open, recite: "Alhamdulillahilladhi ahyana ba’da ma amatana wa ilayhin-nushur" and proceed directly to wash your face with cool water.',
        evidence: {
          text: 'If he makes wudhu, the second knot is untied; if he prays, all knots are untied and he begins his morning energetic and cheerful.',
          reference: 'Sahih al-Bukhari 1142',
        },
        reflectionPrompt: 'How did refreshing your face and limbs change your morning mental clarity?',
      },
      {
        day: 4,
        phase: 1,
        phaseName: 'Foundation',
        title: 'Gentle Minimum: 2 Sunnah Rakat',
        action: 'Perform the two Sunnah rak’ahs before the Fajr obligatory prayer with unhurried recitation and calm pauses.',
        evidence: {
          text: 'The two rak’ahs before dawn are better than this world and everything in it.',
          reference: 'Sahih Muslim 725',
        },
        reflectionPrompt: 'Appreciate the immense dignity Allah has granted in just two light rak’ahs.',
      },
      {
        day: 5,
        phase: 2,
        phaseName: 'Anchoring',
        title: 'Prophetic Evening Routine (Post-Isha Discipline)',
        action: 'Conclude evening meals and work soon after Isha. Avoid lengthy conversations or midnight entertainment that steals sleep.',
        evidence: {
          text: 'The Messenger of Allah ﷺ disliked sleeping before Isha and engaging in conversation after it.',
          reference: 'Sahih al-Bukhari 568',
        },
        reflectionPrompt: 'How does sleeping 30 minutes earlier affect your morning alertness?',
      },
      {
        day: 6,
        phase: 2,
        phaseName: 'Anchoring',
        title: 'Wudhu Before Sleep & Right-Side Sunnah',
        action: 'Sleep in a state of Wudhu on your right side. Recite Ayat al-Kursi and the three Quls into your palms, wiping over your body.',
        evidence: {
          text: 'When you go to bed, perform ablution as you do for prayer, then lie down on your right side.',
          reference: 'Sahih al-Bukhari 247',
        },
        reflectionPrompt: 'Feel the peace of surrendering your soul to Allah before entering sleep.',
      },
      {
        day: 7,
        phase: 2,
        phaseName: 'Anchoring',
        title: 'Adhan Response & Du’a of Waseelah',
        action: 'Wake up with the Adhan. Repeat the words of the Mu’adhin with focus, then recite the Sunnah Du’a after the Adhan asking for al-Waseelah for the Prophet ﷺ.',
        evidence: {
          text: 'When you hear the caller, repeat what he says, then send blessings upon me.',
          reference: 'Sahih Muslim 384',
        },
        reflectionPrompt: 'Did responding to the call make you feel invited by the Creator?',
      },
      {
        day: 8,
        phase: 2,
        phaseName: 'Anchoring',
        title: 'Overcoming Friction: Zero Guilt Reset',
        action: 'If you ever wake up late or miss the congregation, pray immediately upon waking without self-blame, despair, or giving up the entire day.',
        evidence: {
          text: 'Whoever forgets a prayer or sleeps through it, its expiation is to pray it when he remembers.',
          reference: 'Sahih Muslim 684',
        },
        reflectionPrompt: 'Remember that repentance and immediate resumption are beloved to Allah; despair is the whisper of Shaytan.',
      },
      {
        day: 9,
        phase: 2,
        phaseName: 'Anchoring',
        title: 'Morning Post-Prayer Adhkar',
        action: 'Remain seated after your Fajr prayer for 5 minutes. Recite Astaghfirullah (3x), Ayat al-Kursi, and the morning protection Adhkar.',
        evidence: {
          text: 'Whoever reads Ayat al-Kursi after every obligatory prayer, nothing prevents him from entering Paradise except death.',
          reference: 'Sunan an-Nasa’i (as-Sunan al-Kubra 9848)',
        },
        reflectionPrompt: 'Notice the serenity of starting your day with Allah’s remembrance instead of morning anxiety.',
      },
      {
        day: 10,
        phase: 3,
        phaseName: 'Sustainability',
        title: 'Community & Household Anchor',
        action: 'If you are able, pray Fajr in congregation at the masjid; if at home, invite your spouse, sibling, or family member to pray together.',
        evidence: {
          text: 'Whoever prays the dawn prayer in congregation is under the protection and guarantee of Allah.',
          reference: 'Sahih Muslim 657',
        },
        reflectionPrompt: 'How does collective worship uplift your personal steadfastness?',
      },
      {
        day: 11,
        phase: 3,
        phaseName: 'Sustainability',
        title: 'Light Evening Nourishment',
        action: 'Practice moderation at dinner. Eat a lighter meal at least 2 to 3 hours before sleep to prevent heaviness and lethargy in the morning.',
        evidence: {
          text: 'A human fills no vessel worse than his stomach. A few bites to keep his back upright are sufficient.',
          reference: 'Jami` at-Tirmidhi 2380',
        },
        reflectionPrompt: 'Notice how your body feels lighter and waking is effortless when you avoid heavy late meals.',
      },
      {
        day: 12,
        phase: 3,
        phaseName: 'Sustainability',
        title: 'The Witnessed Recitation of Dawn',
        action: 'Recite at least 5 to 10 verses of the Noble Quran during or right after Fajr, pondering over their meanings.',
        evidence: {
          text: 'Establish prayer at the decline of the sun until the darkness of the night and recite the Quran at dawn. Indeed, the recitation of dawn is ever witnessed.',
          reference: 'Surah Al-Isra 17:78',
        },
        reflectionPrompt: 'The angels of night and day meet at dawn. How does this verse inspire your presence in prayer?',
      },
      {
        day: 13,
        phase: 3,
        phaseName: 'Sustainability',
        title: 'Support Network & Brotherhood',
        action: 'Agree with a friend, sibling, or companion to give each other a gentle Fajr wake-up call or check-in message.',
        evidence: {
          text: 'The believers are like a single structure, each part strengthening the other.',
          reference: 'Sahih al-Bukhari 481',
        },
        reflectionPrompt: 'Who in your circle can you uplift while they also keep you accountable?',
      },
      {
        day: 14,
        phase: 3,
        phaseName: 'Sustainability',
        title: 'Milestone Muhasabah & Du’a of Istiqamah',
        action: 'Complete your 14th day. Sit in gratitude, give charity (even a small amount), and make sincere Du’a for continuous lifelong steadfastness (Istiqamah).',
        evidence: {
          text: 'O Turner of the hearts, keep my heart firm upon Your religion (Ya Muqallib al-qulub, thabbit qalbi \'ala deenik).',
          reference: 'Jami` at-Tirmidhi 2140',
        },
        reflectionPrompt: 'Look back at Day 1 versus today. Celebrate the grace of Allah that allowed you to show up for 14 days.',
      },
    ],
  },

  'tmpl-salah-consistency': {
    id: 'tmpl-salah-consistency',
    title: 'Salah Consistency & Presence',
    durationDays: 21,
    phaseCount: 3,
    phases: [
      { phase: 1, name: 'Timeliness', daysRange: 'Days 1–7', focus: 'Praying on time and eliminating procrastination' },
      { phase: 2, name: 'Khushu (Presence)', daysRange: 'Days 8–14', focus: 'Understanding recitation and physical stillness' },
      { phase: 3, name: 'Retention', daysRange: 'Days 15–21', focus: 'Anchoring Sunan and protecting habits across busy days' },
    ],
    description: 'Anchor the five daily prayers into your daily schedule with gentle friction adaptation.',
    days: Array.from({ length: 21 }, (_, i) => {
      const day = i + 1;
      const phase = day <= 7 ? 1 : day <= 14 ? 2 : 3;
      const phaseName = phase === 1 ? 'Timeliness' : phase === 2 ? 'Khushu' : 'Retention';
      return {
        day,
        phase,
        phaseName,
        title: `Day ${day}: Salah Anchor Step ${day}`,
        action: day <= 7
          ? `Protect prayer times today. Stop what you are doing within 10 minutes of the Adhan for Day ${day}.`
          : day <= 14
          ? `Focus on Khushu today. Slow down your bowing (Ruku) and prostration (Sujud) by an extra 5 seconds.`
          : `Anchor Sunnah prayers and post-Salah remembrance to solidify consistency across your day.`,
        evidence: {
          text: 'The most beloved deed to Allah is the prayer offered at its proper time.',
          reference: 'Sahih al-Bukhari 527',
        },
        reflectionPrompt: `Reflect on how pausing for prayer refreshes your focus and relieves daily worldly pressure.`,
      };
    }),
  },

  'tmpl-quran-restart': {
    id: 'tmpl-quran-restart',
    title: 'Quran Daily Restart (1 Page / Day)',
    durationDays: 30,
    phaseCount: 2,
    phases: [
      { phase: 1, name: 'Recitation Rhythm', daysRange: 'Days 1–15', focus: 'Building an unbroken daily habit with 1 page per day' },
      { phase: 2, name: 'Contemplation (Tadabbur)', daysRange: 'Days 16–30', focus: 'Reflecting upon the message and applying one lesson daily' },
    ],
    description: 'Build an unbroken daily Quran relationship starting with just a single page each morning.',
    days: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const phase = day <= 15 ? 1 : 2;
      const phaseName = phase === 1 ? 'Recitation Rhythm' : 'Contemplation';
      return {
        day,
        phase,
        phaseName,
        title: `Day ${day}: Quran Connection Step`,
        action: `Recite one page of the Quran today with presence. Read the translation of at least one verse slowly.`,
        evidence: {
          text: 'The best among you are those who learn the Quran and teach it.',
          reference: 'Sahih al-Bukhari 5027',
        },
        reflectionPrompt: `What word or meaning from today’s page spoke directly to your current life situation?`,
      };
    }),
  },

  'tmpl-anger-patience': {
    id: 'tmpl-anger-patience',
    title: 'Anger Management & Prophetic Sabr',
    durationDays: 10,
    phaseCount: 2,
    phases: [
      { phase: 1, name: 'Trigger Awareness', daysRange: 'Days 1–5', focus: 'Recognizing physiological triggers and delaying reactive speech' },
      { phase: 2, name: 'Prophetic Remedies', daysRange: 'Days 6–10', focus: 'Physical posture changes, silence, and Wudhu during heat' },
    ],
    description: 'Practical prophetic behavioral exercises when confronting anger and frustration.',
    days: Array.from({ length: 10 }, (_, i) => {
      const day = i + 1;
      const phase = day <= 5 ? 1 : 2;
      const phaseName = phase === 1 ? 'Trigger Awareness' : 'Prophetic Remedies';
      return {
        day,
        phase,
        phaseName,
        title: `Day ${day}: Prophetic Sabr Exercise`,
        action: day <= 5
          ? `When feeling frustrated today, take a 5-second silence pause and seek refuge in Allah from Satan.`
          : `If anger arises today, change your posture immediately: sit down if standing, or make Wudhu with cold water.`,
        evidence: {
          text: 'The strong person is not the good wrestler, but the one who controls himself when angry.',
          reference: 'Sahih al-Bukhari 6114',
        },
        reflectionPrompt: `How did controlling your speech prevent a situation from escalating today?`,
      };
    }),
  },
};

export function getJourneyTemplateDetails(templateId: string): JourneyTemplateDetails | null {
  return JOURNEY_TEMPLATES[templateId] || null;
}
