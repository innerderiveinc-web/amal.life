/**
 * AMAL OS — Classical Chapters & Canonical Literature Interfaces
 *
 * Types for multi-chapter classical Arabic/Urdu datasets, local PDF records,
 * and verified scholarly repositories.
 */

export interface ClassicalChapter {
  chapterId: string;
  chapterTitleArabic: string;
  chapterTitleUrdu: string;
  chapterTitleEnglish: string;
  arabicMatn: string;
  urduTranslation: string;
  englishSynopsis: string;
  scholarlyNotes: string;
}

export interface ClassicalBookWithChapters {
  workId: string;
  chapters: ClassicalChapter[];
  verifiedExternalUrl: string;
  verifiedExternalName: string;
}

export interface LocalPdfRecord {
  workId: string;
  pdfUrl: string;
  pdfTitle: string;
  fileSizeBytes: string;
  language: string;
  descriptionUrdu: string;
}
