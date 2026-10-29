/**
 * AMAL OS — Global Sovereign Reading Bookmarks & History Engine
 * 
 * LocalStorage persistent bookmarks for:
 * 1. Classical Library Books & Chapters
 * 2. Holy Quran Surahs & Ayahs
 * 3. Sacred Sahabiyyat & Noble Women Biographies
 * 4. Fiqh Rulings & Masnoon Family Duas
 */

export interface BookmarkRecord {
  id: string;
  category: 'library' | 'quran' | 'sahabiyyat' | 'fiqh' | 'dua';
  titleArabic?: string;
  titleUrdu: string;
  titleEnglish: string;
  sourceOrAuthor: string;
  targetId: string; // workId, surahNumber, sahabiyyahId, rulingId, duaId
  secondaryIndex?: number; // chapterIndex or ayahNumber
  excerpt?: string;
  dateSaved: number;
}

const STORAGE_KEY = 'amal_saved_bookmarks';
const HISTORY_KEY = 'amal_reading_history';

export function getSavedBookmarks(): BookmarkRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse bookmarks', e);
    return [];
  }
}

export function saveBookmark(bookmark: Omit<BookmarkRecord, 'dateSaved'>): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getSavedBookmarks();
    const existingIndex = list.findIndex((b) => b.id === bookmark.id);
    if (existingIndex >= 0) {
      // Remove if already exists (toggle behavior)
      list.splice(existingIndex, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return false; // unbookmarked
    } else {
      list.unshift({ ...bookmark, dateSaved: Date.now() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true; // bookmarked
    }
  } catch (e) {
    console.error('Failed to toggle bookmark', e);
    return false;
  }
}

export function isBookmarked(bookmarkId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getSavedBookmarks();
    return list.some((b) => b.id === bookmarkId);
  } catch {
    return false;
  }
}

export function removeBookmark(bookmarkId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getSavedBookmarks().filter((b) => b.id !== bookmarkId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to remove bookmark', e);
  }
}

export interface ReadingHistoryItem {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  categoryLabel: string;
  routeUrl: string;
  timestamp: number;
}

export function recordReadingHistory(item: Omit<ReadingHistoryItem, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    let history: ReadingHistoryItem[] = raw ? JSON.parse(raw) : [];
    history = history.filter((h) => h.id !== item.id);
    history.unshift({ ...item, timestamp: Date.now() });
    if (history.length > 30) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to record reading history', e);
  }
}

export function getReadingHistory(): ReadingHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
