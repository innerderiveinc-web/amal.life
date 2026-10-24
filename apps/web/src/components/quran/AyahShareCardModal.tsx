import React from 'react';
import { UniversalContentShareModal } from '../cards/UniversalContentShareModal';

export interface AyahShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  surahNameUrdu: string;
  ayahNumber: number;
  arabicText: string;
  urduTranslation: string;
  englishTranslation?: string;
}

export const AyahShareCardModal: React.FC<AyahShareCardModalProps> = ({
  isOpen,
  onClose,
  surahNumber,
  surahNameArabic,
  surahNameEnglish,
  surahNameUrdu,
  ayahNumber,
  arabicText,
  urduTranslation,
  englishTranslation = '',
}) => {
  return (
    <UniversalContentShareModal
      isOpen={isOpen}
      onClose={onClose}
      payload={{
        category: 'QURAN',
        titleArabic: surahNameArabic,
        titleUrdu: `سورۃ ${surahNameUrdu || surahNumber}`,
        titleEnglish: surahNameEnglish,
        badgeContext: `آیت مبارکہ ${ayahNumber}`,
        arabicText,
        primaryTextUrdu: urduTranslation,
        secondaryTextEnglish: englishTranslation,
        sourceCitation: `سورۃ ${surahNameUrdu || surahNumber} (${surahNumber}:${ayahNumber}) · کنز الایمان فی ترجمۃ القرآن`,
      }}
    />
  );
};
