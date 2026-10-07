import { ReferenceValidator } from '../../validation/reference-validator.js';

export interface ParsedHadith {
  collection: string;
  book: string;
  chapter?: string;
  reference: string;
  arabicText?: string;
  translation?: string;
  grading: string;
  metadata: Record<string, unknown>;
}

export class HadithParser {
  public static parseHadith(input: {
    collection: string;
    book: string;
    chapter?: string;
    reference: string;
    arabicText?: string;
    translation?: string;
    grading?: string;
    metadata?: Record<string, unknown>;
  }): ParsedHadith {
    const validation = ReferenceValidator.validateHadithReference(input.collection, input.reference);
    if (!validation.valid) {
      throw new Error(`Hadith parsing error: ${validation.reason}`);
    }
    return {
      collection: input.collection.trim(),
      book: input.book.trim(),
      chapter: input.chapter?.trim(),
      reference: input.reference.trim(),
      arabicText: input.arabicText?.trim(),
      translation: input.translation?.trim(),
      grading: input.grading || 'SAHIH',
      metadata: input.metadata || {},
    };
  }
}
