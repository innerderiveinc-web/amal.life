/**
 * AMAL OS — HADITH CONTROLLER
 * Serves canonical Hadith collections with rigorous scholarly gradings.
 */
export declare class HadithController {
    listCollections(): Promise<{
        id: string;
        name: string;
        author: string;
        totalHadiths: number;
        status: string;
    }[]>;
    getHadith(collection: string, numStr: string): Promise<{
        collection: string;
        hadithNumber: number;
        arabicText: string;
        englishText: string;
        narrator: string;
        grading: string;
        grader: string;
        zeroFabricatedPolicyCompliant: boolean;
    }>;
}
//# sourceMappingURL=hadith.controller.d.ts.map