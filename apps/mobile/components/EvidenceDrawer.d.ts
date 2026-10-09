import React from 'react';
export interface EvidenceDrawerProps {
    visible: boolean;
    onClose: () => void;
    citation: {
        reference: string;
        authorityLevel: string;
        arabicText?: string;
        translation: string;
        grading?: string;
        scholarSignoffs?: string[];
        provenanceHash?: string;
    };
}
export declare const EvidenceDrawer: React.FC<EvidenceDrawerProps>;
//# sourceMappingURL=EvidenceDrawer.d.ts.map