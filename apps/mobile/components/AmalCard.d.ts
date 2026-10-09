import React from 'react';
import { WhyThisAmalExplanation } from '@amal/types';
export interface AmalCardProps {
    id: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    minimumText?: string;
    targetText?: string;
    whyExplanation?: WhyThisAmalExplanation;
    why?: string;
    evidenceReference: string;
    isPrimary?: boolean;
    onComplete?: (level: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED') => void;
    onViewEvidence?: () => void;
}
export declare const AmalCard: React.FC<AmalCardProps>;
//# sourceMappingURL=AmalCard.d.ts.map