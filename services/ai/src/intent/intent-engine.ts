import { AIIntent, AIRequest } from '@amal/types';

export interface IntentResult {
  primary: AIIntent;
  secondary: AIIntent[];
  confidence: number;
  requiresEvidence: boolean;
  requiresContext: boolean;
  requiresScholar: boolean;
  clarificationRequired: boolean;
  actionPolicy: 'PROCEED' | 'PROCEED_CONSERVATIVE' | 'CLARIFICATION_PREFERRED' | 'CLARIFICATION_REQUIRED';
}

export class IntentEngine {
  public static async classify(request: AIRequest): Promise<IntentResult> {
    const text = request.message.toLowerCase();
    const secondary: AIIntent[] = [];
    let primary = AIIntent.GENERAL_ISLAMIC_KNOWLEDGE;
    let confidence = 0.95;

    // Multi-intent detection
    if (text.includes('miss') && (text.includes('fajr') || text.includes('salah') || text.includes('quran'))) {
      primary = AIIntent.PERSONAL_DEEN_GUIDANCE;
      if (text.includes('salah') || text.includes('fajr')) secondary.push(AIIntent.SALAH);
      if (text.includes('quran')) secondary.push(AIIntent.QURAN_LOOKUP);
      secondary.push(AIIntent.AMAL_REQUEST);
      secondary.push(AIIntent.LIFE_SITUATION);
    } else if (text.includes('quran') || text.includes('surah') || text.includes('ayah')) {
      primary = AIIntent.QURAN_LOOKUP;
      if (text.includes('tafsir') || text.includes('meaning')) secondary.push(AIIntent.TAFSIR);
    } else if (text.includes('hadith') || text.includes('bukhari') || text.includes('muslim')) {
      primary = AIIntent.HADITH_LOOKUP;
    } else if (text.includes('fatwa') || text.includes('halal') || text.includes('haram') || text.includes('ruling')) {
      primary = AIIntent.FIQH_PERSONALIZED;
      secondary.push(AIIntent.SCHOLAR_REQUEST);
    } else if (text.includes('difference') || text.includes('madhhab') || text.includes('ikhtilaf')) {
      primary = AIIntent.SCHOLARLY_DISAGREEMENT;
    } else if (text.includes('dua')) {
      primary = AIIntent.DUA;
    } else if (text.includes('dhikr')) {
      primary = AIIntent.DHIKR;
    } else if (text.includes('habit') || text.includes('routine') || text.includes('start') || text.includes('plan')) {
      primary = AIIntent.AMAL_REQUEST;
      secondary.push(AIIntent.JOURNEY_REQUEST);
    } else if (text.includes('reflect') || text.includes('muhasabah')) {
      primary = AIIntent.REFLECTION;
    }

    const requiresEvidence = [
      AIIntent.GENERAL_ISLAMIC_KNOWLEDGE,
      AIIntent.QURAN_LOOKUP,
      AIIntent.HADITH_LOOKUP,
      AIIntent.TAFSIR,
      AIIntent.DUA,
      AIIntent.DHIKR,
      AIIntent.SALAH,
      AIIntent.FIQH_GENERAL,
      AIIntent.FIQH_PERSONALIZED,
      AIIntent.SCHOLARLY_DISAGREEMENT,
      AIIntent.PERSONAL_DEEN_GUIDANCE,
    ].includes(primary);

    const requiresContext = [
      AIIntent.PERSONAL_DEEN_GUIDANCE,
      AIIntent.AMAL_REQUEST,
      AIIntent.JOURNEY_REQUEST,
      AIIntent.REFLECTION,
      AIIntent.FIQH_PERSONALIZED,
    ].includes(primary);

    const requiresScholar = primary === AIIntent.FIQH_PERSONALIZED || text.includes('divorce') || text.includes('talaq');

    let actionPolicy: IntentResult['actionPolicy'] = 'PROCEED';
    let clarificationRequired = false;

    if (confidence >= 0.90) {
      actionPolicy = 'PROCEED';
    } else if (confidence >= 0.70) {
      actionPolicy = 'PROCEED_CONSERVATIVE';
    } else if (confidence >= 0.50) {
      actionPolicy = 'CLARIFICATION_PREFERRED';
    } else {
      actionPolicy = 'CLARIFICATION_REQUIRED';
      clarificationRequired = true;
    }

    return {
      primary,
      secondary,
      confidence,
      requiresEvidence,
      requiresContext,
      requiresScholar,
      clarificationRequired,
      actionPolicy,
    };
  }
}
