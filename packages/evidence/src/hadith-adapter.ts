import { IslamicSource, SourcePassage, HadithGrading } from '@amal/types';

export interface IngestHadithInput {
  collection: string;
  bookNumber?: number;
  chapterNumber?: number;
  hadithNumber: number;
  reference: string;
  arabicText?: string;
  translatedText: string;
  grading: HadithGrading;
  narratorChain?: string[];
  license: string;
  sourceOriginUrl: string;
}

export class HadithGovernanceAdapter {
  /**
   * Validate hadith ingestion payload according to Amal governance criteria
   */
  public static validateHadithPayload(input: IngestHadithInput): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!input.collection || input.collection.trim() === '') {
      errors.push('Hadith collection name is required.');
    }

    if (!input.reference || input.reference.trim() === '') {
      errors.push('Canonical hadith reference string is required.');
    }

    if (!input.hadithNumber || input.hadithNumber <= 0) {
      errors.push('Valid hadith number is required.');
    }

    if (!input.translatedText || input.translatedText.trim().length < 5) {
      errors.push('Translated text must be provided and substantive.');
    }

    if (!input.grading) {
      errors.push('Hadith grading metadata (Sahih, Hasan, Da\'if, etc.) is mandatory.');
    }

    if (!input.license || input.license.trim() === '') {
      errors.push('Explicit license and data rights provenance is required. Do not ingest unlicensed content.');
    }

    if (!input.sourceOriginUrl || !input.sourceOriginUrl.startsWith('http')) {
      errors.push('Valid source provenance origin URL is mandatory.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
