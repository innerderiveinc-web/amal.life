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

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return WOMEN_CLASSICAL_CANON.filter((book) => {
      const matchesCategory =
        selectedBookCategory === 'all' || book.category === selectedBookCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !searchQuery ||
        book.titleUrdu.includes(searchQuery) ||
        book.titleEnglish.toLowerCase().includes(q) ||
        book.authorUrdu.includes(searchQuery) ||
        book.authorEnglish.toLowerCase().includes(q) ||
        book.descriptionUrdu.includes(searchQuery) ||
        book.descriptionEnglish.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
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
