import React from 'react';
export interface ScholarTriageModalProps {
    visible: boolean;
    onClose: () => void;
    caseCategory?: string;
    initialQuery?: string;
    onSubmitCase?: (details: {
        query: string;
        notes: string;
    }) => void;
}
export declare const ScholarTriageModal: React.FC<ScholarTriageModalProps>;
//# sourceMappingURL=ScholarTriageModal.d.ts.map