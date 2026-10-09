import React from 'react';
export interface MuhasabahSheetProps {
    onSave?: (data: {
        wentWell: string;
        feltDifficult: string;
        tomorrow: string;
    }) => void;
}
export declare const MuhasabahSheet: React.FC<MuhasabahSheetProps>;
//# sourceMappingURL=MuhasabahSheet.d.ts.map