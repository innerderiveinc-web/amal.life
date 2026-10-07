export type FrictionType =
  | 'FORGETTING'
  | 'TIME'
  | 'ENERGY'
  | 'LOCATION'
  | 'DEVICE'
  | 'COMPLEXITY'
  | 'LOW_MOTIVATION'
  | 'UNCLEAR_NEXT_STEP'
  | 'EMOTIONAL_RESISTANCE'
  | 'SCHEDULE_CONFLICT'
  | 'TOO_LONG'
  | 'TOO_DIFFICULT'
  | 'TOO_EARLY'
  | 'TOO_LATE'
  | 'ENVIRONMENT';

export interface FrictionAnalysis {
  type: FrictionType;
  confidence: number;
  adaptationRecommended: boolean;
  suggestedAction?: 'SIMPLIFY' | 'SHORTEN' | 'RESCHEDULE' | 'PAUSE' | 'ASK_USER';
  propheticMessage: string;
}

export class FrictionEngine {
  public static evaluateFrictionSignals(params: {
    consecutiveMisses: number;
    reflectionReason?: string;
    actionDurationMinutes?: number;
    scheduledTime?: string;
  }): FrictionAnalysis {
    let confidence = 0.10;
    if (params.consecutiveMisses === 2) confidence = 0.35;
    if (params.consecutiveMisses >= 3) confidence = 0.65;
    if (params.consecutiveMisses >= 3 && params.reflectionReason) confidence = 0.90;

    let type: FrictionType = 'TIME';
    if (params.reflectionReason?.toLowerCase().includes('tired') || params.reflectionReason?.toLowerCase().includes('sleep')) {
      type = 'ENERGY';
    } else if (params.reflectionReason?.toLowerCase().includes('forgot')) {
      type = 'FORGETTING';
    } else if (params.actionDurationMinutes && params.actionDurationMinutes > 15) {
      type = 'TOO_LONG';
    }

    const adaptationRecommended = confidence >= 0.60;
    let suggestedAction: FrictionAnalysis['suggestedAction'] = undefined;

    if (adaptationRecommended) {
      if (type === 'TOO_LONG' || type === 'TIME') {
        suggestedAction = 'SHORTEN';
      } else if (type === 'ENERGY') {
        suggestedAction = 'RESCHEDULE';
      } else {
        suggestedAction = 'SIMPLIFY';
      }
    }

    return {
      type,
      confidence,
      adaptationRecommended,
      suggestedAction,
      propheticMessage: 'Practice grows through gentleness. "Make things easy, and do not make them difficult." (Sahih al-Bukhari 69)',
    };
  }
}
