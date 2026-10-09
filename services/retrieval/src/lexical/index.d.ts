import { SourcePassage } from '@amal/types';
export interface LexicalMatch {
    passageId: string;
    score: number;
    matchedTokens: string[];
}
export declare class LexicalSearchEngine {
    static search(query: string, passages?: SourcePassage[]): LexicalMatch[];
}
//# sourceMappingURL=index.d.ts.map