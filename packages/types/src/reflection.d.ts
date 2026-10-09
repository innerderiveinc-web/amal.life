export type ReflectionType = 'DAILY_MUHASABAH' | 'WEEKLY_INSIGHT' | 'JOURNEY_CHECKPOINT' | 'FREE_FORM';
export interface Reflection {
    id: string;
    userId: string;
    journeyId?: string | null;
    dayNumber?: number | null;
    reflectionType: ReflectionType;
    wentWell: string;
    feltDifficult?: string | null;
    tomorrowIntention?: string | null;
    gratitude?: string | null;
    privateToUser?: boolean;
    date?: string;
    content?: string;
    sentiment?: string;
    tags?: string[];
    isPrivate?: boolean;
    createdAt: string;
}
export interface PersonalInsight {
    id: string;
    userId: string;
    category: 'ROUTINE_OBSERVATION' | 'TIME_CORRELATION' | 'ENERGY_PATTERN';
    observation: string;
    supportingDataPoint: string;
    confidence: number;
    isSpiritualJudgment: false;
    createdAt: string;
}
//# sourceMappingURL=reflection.d.ts.map