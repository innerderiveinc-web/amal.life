import { MASTER_CANONICAL_CORPUS, CanonicalEditionRecord } from '@amal/evidence';
import { CLASSICAL_BOOKS_CHAPTERS, ClassicalChapter } from '../data/classical-chapters-data';

export interface ClassicalAuthorityMatch {
  workId: string;
  bookTitleArabic: string;
  bookTitleTransliterated: string;
  authorName: string;
  authorDeathHijri: number;
  discipline: string;
  chapterIndex: number;
  chapter: ClassicalChapter;
  relevanceScore: number;
}

const STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'from', 'this', 'that', 'what', 'how', 'who', 'why',
  'are', 'was', 'not', 'you', 'your', 'about', 'can', 'does', 'did', 'had', 'have',
  'is', 'in', 'of', 'on', 'at', 'to', 'by', 'an', 'as', 'ki', 'ka', 'ke', 'ko', 'se',
  'mein', 'par', 'hai', 'hain', 'ho', 'aur', 'kya', 'kyun', 'kise'
]);

/**
 * Normalizes user queries across Arabic, Urdu, and English Latin transliteration diacritics.
 */
export function normalizeQuery(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    // Latin transliteration diacritics
    .replace(/[āáàâä]/g, 'a')
    .replace(/[īíìîï]/g, 'i')
    .replace(/[ūúùûü]/g, 'u')
    .replace(/[ḥ]/g, 'h')
    .replace(/[ṣ]/g, 's')
    .replace(/[ḍ]/g, 'd')
    .replace(/[ṭ]/g, 't')
    .replace(/[ẓ]/g, 'z')
    .replace(/['"`ʻʿʾ]/g, '')
    // Arabic / Urdu diacritics & Tatweel
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[يىئ]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ةهہۃ]/g, 'ہ')
    .replace(/[ؤ]/g, 'و')
    .replace(/[\s\-_]+/g, ' ')
    .trim();
}

/**
 * Classical Sunni Authority Matcher
 * Matches inquiries strictly against classical verified texts with zero synthetic text.
 */
export function findClassicalAuthorities(query: string, maxResults = 3): ClassicalAuthorityMatch[] {
  const normQuery = normalizeQuery(query);
  if (!normQuery || normQuery.length < 2) return [];

  const rawTokens = normQuery.split(' ');
  const queryTokens = rawTokens.filter((t) => t.length > 2 && !STOP_WORDS.has(t));
  if (queryTokens.length === 0 && rawTokens.length > 0) {
    queryTokens.push(...rawTokens);
  }

  const matches: ClassicalAuthorityMatch[] = [];

  const bookMetaMap = new Map<string, CanonicalEditionRecord>();
  for (const b of MASTER_CANONICAL_CORPUS) {
    bookMetaMap.set(b.work_id, b);
  }

  for (const [workId, book] of Object.entries(CLASSICAL_BOOKS_CHAPTERS)) {
    if (!book || !book.chapters) continue;
    const meta = bookMetaMap.get(workId);

    const normBookTitle = normalizeQuery(meta?.title_transliterated || '');
    const normBookAr = normalizeQuery(meta?.title_arabic || '');
    const normAuthor = normalizeQuery(meta?.author_name || '');

    book.chapters.forEach((chapter, chapterIdx) => {
      let score = 0;

      const normTitleAr = normalizeQuery(chapter.chapterTitleArabic);
      const normTitleUr = normalizeQuery(chapter.chapterTitleUrdu);
      const normTitleEn = normalizeQuery(chapter.chapterTitleEnglish);
      const normSynopsis = normalizeQuery(chapter.englishSynopsis);
      const normUrdu = normalizeQuery(chapter.urduTranslation);
      const normArabic = normalizeQuery(chapter.arabicMatn);

      // 1. Exact phrase matches (High Priority)
      if (normTitleEn.includes(normQuery) || normTitleUr.includes(normQuery) || normTitleAr.includes(normQuery)) {
        score += 80;
      }
      if (normSynopsis.includes(normQuery)) {
        score += 50;
      }
      if (normUrdu.includes(normQuery)) {
        score += 45;
      }
      if (normArabic.includes(normQuery)) {
        score += 60;
      }

      // 2. Meaningful token matches
      let matchedTokens = 0;
      for (const tok of queryTokens) {
        let tokHit = false;
        if (normTitleEn.includes(tok) || normTitleUr.includes(tok) || normTitleAr.includes(tok)) {
          score += 20;
          tokHit = true;
        }
        if (normSynopsis.includes(tok)) {
          score += 15;
          tokHit = true;
        }
        if (normUrdu.includes(tok)) {
          score += 12;
          tokHit = true;
        }
        if (normArabic.includes(tok)) {
          score += 18;
          tokHit = true;
        }
        if (tokHit) matchedTokens++;
      }

      // Reward multi-token coherence
      if (queryTokens.length > 1 && matchedTokens >= queryTokens.length) {
        score += 40;
      }

      // 3. Author / Book title relevance
      for (const tok of queryTokens) {
        if (normAuthor.includes(tok) || normBookTitle.includes(tok) || normBookAr.includes(tok)) {
          score += 25;
        }
      }

      if (score >= 25) {
        matches.push({
          workId,
          bookTitleArabic: meta?.title_arabic || book.verifiedExternalName,
          bookTitleTransliterated: meta?.title_transliterated || workId,
          authorName: meta?.author_name || 'Classical Sunni Scholar',
          authorDeathHijri: meta?.author_death_hijri || 0,
          discipline: meta?.discipline || 'CLASSICAL_ISLAMIC_SCIENCES',
          chapterIndex: chapterIdx,
          chapter,
          relevanceScore: score,
        });
      }
    });
  }

  // Sort descending by relevance score and deduplicate
  return matches
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxResults);
}
