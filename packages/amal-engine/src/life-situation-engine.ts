/**
 * AMAL OS — V2.0: LIFE SITUATION ENGINE & MULTI-DOMAIN CLASSIFIER
 * Sections 20, 31–33, 110: Decomposes complex whole-life situations into
 * epistemically separated domains (Islamic Evidence vs Practical Guidance vs Amal).
 */

import {
  LifeDomain,
  LifeSituationClassification,
  EpistemicallyLabeledItem,
} from '@amal/types';

export class LifeSituationEngine {
  /**
   * Classifies a multi-domain situation statement into constituent domains,
   * intents, risks, and provides epistemically labeled guidance.
   */
  public static classifySituation(
    userId: string,
    inputText: string
  ): LifeSituationClassification {
    const textLower = inputText.toLowerCase();
    const detectedDomains: LifeDomain[] = [];

    // Domain detection heuristics
    if (textLower.includes('fajr') || textLower.includes('namaz') || textLower.includes('prayer') || textLower.includes('deen') || textLower.includes('quran')) {
      detectedDomains.push('DEEN');
    }
    if (textLower.includes('kaam') || textLower.includes('office') || textLower.includes('work') || textLower.includes('boss') || textLower.includes('job') || textLower.includes('meeting')) {
      detectedDomains.push('WORK');
    }
    if (textLower.includes('exam') || textLower.includes('padhai') || textLower.includes('study') || textLower.includes('test') || textLower.includes('assignment')) {
      detectedDomains.push('STUDY');
    }
    if (textLower.includes('family') || textLower.includes('ghar') || textLower.includes('wife') || textLower.includes('husband') || textLower.includes('parent') || textLower.includes('child')) {
      detectedDomains.push('FAMILY');
    }
    if (textLower.includes('stress') || textLower.includes('time') || textLower.includes('manage') || textLower.includes('schedule') || textLower.includes('late')) {
      detectedDomains.push('TIME');
    }
    if (textLower.includes('paisa') || textLower.includes('finance') || textLower.includes('money') || textLower.includes('investment') || textLower.includes('debt') || textLower.includes('loan')) {
      detectedDomains.push('FINANCE');
    }
    if (textLower.includes('safar') || textLower.includes('travel') || textLower.includes('flight') || textLower.includes('trip')) {
      detectedDomains.push('TRAVEL');
    }
    if (textLower.includes('ramadan') || textLower.includes('roza') || textLower.includes('fasting')) {
      detectedDomains.push('RAMADAN');
    }
    if (textLower.includes('hajj') || textLower.includes('umrah')) {
      detectedDomains.push('HAJJ');
    }

    if (detectedDomains.length === 0) {
      detectedDomains.push('PERSONAL_GROWTH');
    }

    const requiresIslamicEvidence = detectedDomains.includes('DEEN') || detectedDomains.includes('RAMADAN') || detectedDomains.includes('HAJJ');
    const requiresExpertEscalation = textLower.includes('divorce') || textLower.includes('talaq') || textLower.includes('riba') || textLower.includes('inherit');

    let suggestedExpertType: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT' | 'COUNSELOR' | undefined;
    if (requiresExpertEscalation) {
      if (textLower.includes('talaq') || textLower.includes('divorce')) suggestedExpertType = 'SCHOLAR';
      else if (textLower.includes('riba') || textLower.includes('loan')) suggestedExpertType = 'FINANCE_EXPERT';
      else suggestedExpertType = 'LEGAL_EXPERT';
    }

    // Epistemically Labeled Decompositions (Section 4, 33)
    const islamicGuidance: EpistemicallyLabeledItem[] = [];
    const practicalPlanning: EpistemicallyLabeledItem[] = [];
    const recommendedAmals: EpistemicallyLabeledItem[] = [];

    if (requiresIslamicEvidence) {
      islamicGuidance.push({
        id: `ep_deen_${Date.now()}_1`,
        title: 'Preserving the Dawn Prayer (Fajr)',
        description: 'The two Sunnah rak’ahs before Fajr and the obligatory prayer are emphasized in authentic Sunnah as foundational to morning serenity.',
        domain: 'DEEN',
        epistemicOrigin: 'ISLAMIC_EVIDENCE',
        authorityLevel: 'SACRED_CANONICAL',
        evidenceCitation: 'Sahih Muslim 724',
      });
    }

    if (detectedDomains.includes('WORK') || detectedDomains.includes('STUDY')) {
      practicalPlanning.push({
        id: `ep_plan_${Date.now()}_1`,
        title: 'Structured 45-Minute Focus Block',
        description: 'Set a Pomodoro or uninterrupted focus block for high-priority study/work tasks before midday.',
        domain: detectedDomains.includes('STUDY') ? 'STUDY' : 'WORK',
        epistemicOrigin: 'BEHAVIORAL_SCIENCE',
        authorityLevel: 'PRACTICAL_ADVISORY',
      });
    }

    recommendedAmals.push({
      id: `ep_amal_${Date.now()}_1`,
      title: '5-Minute Post-Fajr Recitation & Du’a for Ease',
      description: 'Recite one page of Quran or make the morning prayer for clarity: "Rabbi zidni \'ilma".',
      domain: 'DEEN',
      epistemicOrigin: 'ISLAMIC_EVIDENCE',
      authorityLevel: 'SACRED_CANONICAL',
      evidenceCitation: 'Surah Taha 20:114',
    });

    const timeScheduleProposal = [
      { slot: '05:30 - 06:00', actionTitle: 'Fajr prayer & 5m Quran recitation', durationMinutes: 30 },
      { slot: '09:00 - 11:30', actionTitle: 'Focused work/study priority block', durationMinutes: 150 },
      { slot: '13:30 - 14:00', actionTitle: 'Dhuhr prayer & brief cognitive break', durationMinutes: 30 },
      { slot: '19:00 - 20:00', actionTitle: 'Family dinner & quiet time', durationMinutes: 60 },
    ];

    return {
      situationId: `sit_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userId,
      inputText,
      detectedDomains,
      primaryIntent: 'MULTI_DOMAIN_LIFE_PLANNING',
      riskLevel: requiresExpertEscalation ? 'HIGH' : 'LOW',
      requiresIslamicEvidence,
      requiresExpertEscalation,
      suggestedExpertType,
      decomposedSections: {
        islamicGuidance,
        practicalPlanning,
        recommendedAmals,
        timeScheduleProposal,
      },
      createdAt: new Date().toISOString(),
    };
  }
}
