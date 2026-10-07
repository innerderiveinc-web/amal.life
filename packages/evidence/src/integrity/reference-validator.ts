export interface ReferenceValidationResult {
  valid: boolean;
  normalizedReference?: string;
  sourceType?: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_WORK';
  surahNumber?: number;
  ayahNumber?: number;
  collection?: string;
  hadithNumber?: number;
  error?: string;
}

export class ReferenceValidator {
  // Canonical Surah Ayah counts (Surahs 1 to 114)
  private static readonly SURAH_AYAH_COUNTS: number[] = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
    123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
    60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
    28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
    5, 4, 5, 6
  ];

  private static readonly CANONICAL_HADITH_COLLECTIONS: { [key: string]: { maxHadith: number; canonicalName: string } } = {
    'sahih al-bukhari': { maxHadith: 7563, canonicalName: 'Sahih al-Bukhari' },
    'bukhari': { maxHadith: 7563, canonicalName: 'Sahih al-Bukhari' },
    'sahih muslim': { maxHadith: 7500, canonicalName: 'Sahih Muslim' },
    'muslim': { maxHadith: 7500, canonicalName: 'Sahih Muslim' },
    'sunan abi dawud': { maxHadith: 5274, canonicalName: 'Sunan Abi Dawud' },
    'abu dawud': { maxHadith: 5274, canonicalName: 'Sunan Abi Dawud' },
    'jami` at-tirmidhi': { maxHadith: 3956, canonicalName: 'Jami` at-Tirmidhi' },
    'tirmidhi': { maxHadith: 3956, canonicalName: 'Jami` at-Tirmidhi' },
    'sunan an-nasa\'i': { maxHadith: 5758, canonicalName: 'Sunan an-Nasa\'i' },
    'nasai': { maxHadith: 5758, canonicalName: 'Sunan an-Nasa\'i' },
    'sunan ibn majah': { maxHadith: 4341, canonicalName: 'Sunan Ibn Majah' },
    'ibn majah': { maxHadith: 4341, canonicalName: 'Sunan Ibn Majah' },
    'muwatta malik': { maxHadith: 1858, canonicalName: 'Muwatta Malik' },
    'musnad ahmad': { maxHadith: 27647, canonicalName: 'Musnad Ahmad' },
  };

  /**
   * Validate any canonical Islamic reference (Quran, Hadith, Tafsir)
   */
  public static validate(rawReference: string): ReferenceValidationResult {
    if (!rawReference || rawReference.trim().length === 0) {
      return { valid: false, error: 'EMPTY_REFERENCE: Reference string is empty.' };
    }

    const trimmed = rawReference.trim();

    // Check Quran patterns: "Quran 2:286", "Surah 2:286", "2:286", "Surah Al-Baqarah 286"
    const quranMatch = trimmed.match(/^(?:Quran|Qur'an|Surah|Sura)?\s*(\d{1,3})\s*[:\.]\s*(\d{1,3})$/i);
    if (quranMatch) {
      const surah = parseInt(quranMatch[1], 10);
      const ayah = parseInt(quranMatch[2], 10);
      return this.validateQuranReference(surah, ayah);
    }

    // Check Hadith patterns: "Sahih al-Bukhari 1", "Muslim 2564"
    const hadithMatch = trimmed.match(/^([A-Za-z`'\s-]+?)\s+(\d{1,5})$/);
    if (hadithMatch) {
      const collectionRaw = hadithMatch[1].trim().toLowerCase();
      const hadithNum = parseInt(hadithMatch[2], 10);
      return this.validateHadithReference(collectionRaw, hadithNum);
    }

    // Check Tafsir patterns: "Tafsir Ibn Kathir (2:286)"
    const tafsirMatch = trimmed.match(/^Tafsir\s+([A-Za-z\s]+)\s*\((?:Quran\s+)?(\d{1,3})\s*[:\.]\s*(\d{1,3})\)$/i);
    if (tafsirMatch) {
      const author = tafsirMatch[1].trim();
      const surah = parseInt(tafsirMatch[2], 10);
      const ayah = parseInt(tafsirMatch[3], 10);
      const qVal = this.validateQuranReference(surah, ayah);
      if (!qVal.valid) return qVal;
      return {
        valid: true,
        sourceType: 'TAFSIR',
        normalizedReference: `Tafsir ${author} (${surah}:${ayah})`,
        surahNumber: surah,
        ayahNumber: ayah,
      };
    }

    return {
      valid: false,
      error: `UNKNOWN_REFERENCE_FORMAT: "${rawReference}" does not match any recognized canonical Islamic citation format.`,
    };
  }

  public static validateQuranReference(surah: number, ayah: number): ReferenceValidationResult {
    if (surah < 1 || surah > 114) {
      return {
        valid: false,
        error: `INVALID_SURAH_NUMBER: Surah ${surah} is out of bounds (Quran contains Surahs 1 to 114).`,
      };
    }

    const maxAyahs = this.SURAH_AYAH_COUNTS[surah - 1];
    if (ayah < 1 || ayah > maxAyahs) {
      return {
        valid: false,
        error: `INVALID_AYAH_NUMBER: Surah ${surah} contains ${maxAyahs} ayahs. Ayah ${ayah} does not exist.`,
      };
    }

    return {
      valid: true,
      sourceType: 'QURAN',
      surahNumber: surah,
      ayahNumber: ayah,
      normalizedReference: `Quran ${surah}:${ayah}`,
    };
  }

  public static validateHadithReference(collectionQuery: string, hadithNumber: number): ReferenceValidationResult {
    const collKey = collectionQuery.toLowerCase().trim();
    const config = this.CANONICAL_HADITH_COLLECTIONS[collKey];

    if (!config) {
      return {
        valid: false,
        error: `UNRECOGNIZED_HADITH_COLLECTION: Collection "${collectionQuery}" is not in the canonical Hadith registry.`,
      };
    }

    if (hadithNumber <= 0 || hadithNumber > config.maxHadith) {
      return {
        valid: false,
        error: `INVALID_HADITH_NUMBER: Number ${hadithNumber} exceeds maximum verified range (1 to ${config.maxHadith}) for ${config.canonicalName}.`,
      };
    }

    return {
      valid: true,
      sourceType: 'HADITH',
      collection: config.canonicalName,
      hadithNumber,
      normalizedReference: `${config.canonicalName} ${hadithNumber}`,
    };
  }
}
