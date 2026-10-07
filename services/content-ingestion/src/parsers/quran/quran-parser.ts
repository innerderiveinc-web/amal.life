import { ReferenceValidator } from '../../validation/reference-validator.js';

export interface ParsedAyah {
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  sourceReference: string;
}

export class QuranParser {
  public static parseAyah(surah: number, ayah: number, arabicText: string): ParsedAyah {
    const ref = `${surah}:${ayah}`;
    const validation = ReferenceValidator.validateQuranReference(ref);
    if (!validation.valid) {
      throw new Error(`Quran parsing error: ${validation.reason}`);
    }
    return {
      surahNumber: surah,
      ayahNumber: ayah,
      arabicText: arabicText.trim(),
      sourceReference: ref,
    };
  }
}
