/**
 * AMAL OS — QURAN CONTROLLER
 * Serves canonical Medina Mushaf Arabic text and verified translations.
 */
export declare class QuranController {
    listSurahs(): Promise<{
        number: number;
        name: string;
        englishName: string;
        ayahsCount: number;
        revelationType: string;
    }[]>;
    getAyah(surah: string, ayah: string): Promise<{
        surah: number;
        ayah: number;
        arabicText: any;
        provenanceHash: any;
        translation: any;
        translator: any;
        immutableMakkahMedinaText: boolean;
    }>;
}
//# sourceMappingURL=quran.controller.d.ts.map