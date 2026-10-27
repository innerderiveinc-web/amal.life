import React, { useState, useMemo } from 'react';
import {
  WOMEN_CLASSICAL_CANON,
  SanctuaryBook,
  SanctuaryBookChapter,
} from '../../lib/women-sanctuary-data';
import { SistersChapterReaderView } from './SistersChapterReaderView';
import { SistersBookIndexView } from './SistersBookIndexView';
import { SistersBookCardGrid } from './SistersBookCardGrid';

export interface SistersLibraryTabProps {
  isUrdu: boolean;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => void;
  onGenerateChapterCard: (book: SanctuaryBook, chapter: SanctuaryBookChapter) => void;
}

export function SistersLibraryTab({
  isUrdu,
  onOpenSanad,
  onGenerateChapterCard,
}: SistersLibraryTabProps) {
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState<SanctuaryBook | null>(null);
  const [activeChapter, setActiveChapter] = useState<SanctuaryBookChapter | null>(null);

  // Filtered Books with cross-category & Arabic/Urdu normalized search
  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const normQ = q
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/[يىئ]/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[ةهہ]/g, 'ہ')
      .replace(/[ؤ]/g, 'و')
      .trim();

    return WOMEN_CLASSICAL_CANON.filter((book) => {
      if (q.length > 0) {
        const titleUrduNorm = (book.titleUrdu || '')
          .replace(/[\u064B-\u065F\u0670]/g, '')
          .replace(/[أإآٱ]/g, 'ا')
          .replace(/[يىئ]/g, 'ی')
          .replace(/ك/g, 'ک')
          .replace(/[ةهہ]/g, 'ہ');
        const descUrduNorm = (book.descriptionUrdu || '')
          .replace(/[\u064B-\u065F\u0670]/g, '')
          .replace(/[أإآٱ]/g, 'ا')
          .replace(/[يىئ]/g, 'ی')
          .replace(/ك/g, 'ک')
          .replace(/[ةهہ]/g, 'ہ');

        const matchesQuery =
          titleUrduNorm.includes(normQ) ||
          book.titleEnglish.toLowerCase().includes(q) ||
          book.titleUrdu.includes(searchQuery) ||
          book.authorUrdu.includes(searchQuery) ||
          book.authorEnglish.toLowerCase().includes(q) ||
          descUrduNorm.includes(normQ) ||
          book.descriptionEnglish.toLowerCase().includes(q) ||
          normQ.split(' ').every((tok) => titleUrduNorm.includes(tok) || book.titleEnglish.toLowerCase().includes(tok));

        if (!matchesQuery) return false;
      } else {
        const matchesCategory =
          selectedBookCategory === 'all' || book.category === selectedBookCategory;
        if (!matchesCategory) return false;
      }
      return true;
    });
  }, [selectedBookCategory, searchQuery]);

  return (
    <div>
      {/* 1. In-depth Chapter Reader View */}
      {readingBook && activeChapter ? (
        <SistersChapterReaderView
          isUrdu={isUrdu}
          readingBook={readingBook}
          activeChapter={activeChapter}
          onBackToBookIndex={() => setActiveChapter(null)}
          onGenerateChapterCard={onGenerateChapterCard}
          onOpenSanad={onOpenSanad}
        />
      ) : readingBook ? (
        /* 2. Selected Book Index & Chapters */
        <SistersBookIndexView
          isUrdu={isUrdu}
          readingBook={readingBook}
          onBackToAllBooks={() => setReadingBook(null)}
          onSelectChapter={(ch) => setActiveChapter(ch)}
          onOpenSanad={onOpenSanad}
        />
      ) : (
        /* 3. Main 20 Books Grid */
        <SistersBookCardGrid
          isUrdu={isUrdu}
          filteredBooks={filteredBooks}
          selectedBookCategory={selectedBookCategory}
          searchQuery={searchQuery}
          setSelectedBookCategory={setSelectedBookCategory}
          setSearchQuery={setSearchQuery}
          onSelectBook={(book) => {
            setReadingBook(book);
            if (book.coreChapters.length === 1 && book.coreChapters[0]) {
              setActiveChapter(book.coreChapters[0]);
            }
          }}
          onOpenSanad={onOpenSanad}
        />
      )}
    </div>
  );
}
