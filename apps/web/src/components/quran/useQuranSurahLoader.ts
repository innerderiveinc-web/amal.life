import { useState } from 'react';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../../lib/quran-surahs-data';
import { ALL_114_SURAHS } from '../../lib/quran-114-directory';

interface UseQuranSurahLoaderOptions {
  setSelectedSurahNumber: (num: number) => void;
  setFocusedAyahNumber: (num: number) => void;
  setPlayingAyahNumber: (num: number | null) => void;
  setMobileTab: (tab: 'READER' | 'DIRECTORY') => void;
}

export function useQuranSurahLoader({
  setSelectedSurahNumber,
  setFocusedAyahNumber,
  setPlayingAyahNumber,
  setMobileTab,
}: UseQuranSurahLoaderOptions) {
  // Surahs in-memory cache
  const [loadedSurahsCache, setLoadedSurahsCache] = useState<Record<number, QuranSurahData>>(() => {
    const initial: Record<number, QuranSurahData> = {};
    for (const s of QURAN_SURAHS_COLLECTION) {
      initial[s.surahNumber] = s;
    }
    return initial;
  });
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [surahFetchError, setSurahFetchError] = useState<string | null>(null);

  const handleSelectSurah = async (surahNum: number, targetAyahNumber?: number) => {
    setSelectedSurahNumber(surahNum);
    setFocusedAyahNumber(targetAyahNumber && targetAyahNumber >= 1 ? targetAyahNumber : 1);
    setSurahFetchError(null);
    setPlayingAyahNumber(null);
    setMobileTab('READER');

    const meta = ALL_114_SURAHS.find((s) => s.number === surahNum);
    if (
      loadedSurahsCache[surahNum] &&
      meta &&
      loadedSurahsCache[surahNum].verses.length >= meta.ayahsCount
    ) {
      return;
    }

    // Check offline local device cache first
    try {
      const offlineCached = localStorage.getItem(`amal_cached_surah_${surahNum}`);
      if (offlineCached) {
        const parsed = JSON.parse(offlineCached);
        if (parsed && Array.isArray(parsed.verses) && parsed.verses.length > 0) {
          setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: parsed }));
          return;
        }
      }
    } catch {}

    setIsLoadingSurah(true);
    try {
      // 1. Primary: Load instantaneously from local offline bundled dataset (100% offline, zero network)
      try {
        const localRes = await fetch(`/data/quran/surahs/${surahNum}.json`);
        if (localRes.ok) {
          const localData = await localRes.json();
          if (localData && Array.isArray(localData.verses) && localData.verses.length > 0) {
            const bundledSurah: QuranSurahData = {
              surahNumber: surahNum,
              nameArabic: meta?.nameArabic || localData.nameArabic,
              nameTransliterated: meta?.nameTransliterated || localData.nameTransliterated,
              nameUrdu: meta?.nameUrdu || localData.nameUrdu || '',
              nameEnglish: meta?.nameEnglish || localData.nameEnglish,
              revelationType: (meta?.revelationType || localData.revelationType) as any,
              ayahsCount: meta?.ayahsCount || localData.ayahsCount || localData.verses.length,
              verses: localData.verses,
            };
            setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: bundledSurah }));
            try {
              localStorage.setItem(`amal_cached_surah_${surahNum}`, JSON.stringify(bundledSurah));
            } catch {}
            setIsLoadingSurah(false);
            return;
          }
        }
      } catch (localErr) {
        console.info('Local static surah fetch bypassed, attempting network fallback:', localErr);
      }

      // 2. Secondary Network Fallback: Remote CDN if local static asset is unreachable
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ur.kanzuliman,en.sahih`
      );
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 3) {
        const uthmani = data.data[0];
        const urdu = data.data[1];
        const english = data.data[2];

        const verses = uthmani.ayahs.map((ayah: any, idx: number) => ({
          ayahNumber: ayah.numberInSurah,
          textArabic: ayah.text,
          textUrdu: urdu.ayahs[idx]?.text || '',
          textEnglish: english.ayahs[idx]?.text || '',
        }));

        const newSurah: QuranSurahData = {
          surahNumber: surahNum,
          nameArabic: meta?.nameArabic || uthmani.name,
          nameTransliterated: meta?.nameTransliterated || uthmani.englishName,
          nameUrdu: meta?.nameUrdu || '',
          nameEnglish: meta?.nameEnglish || uthmani.englishNameTranslation,
          revelationType: (meta?.revelationType ||
            (uthmani.revelationType === 'Meccan' ? 'MECCAN' : 'MEDINAN')) as any,
          ayahsCount: meta?.ayahsCount || uthmani.numberOfAyahs,
          verses,
        };

        setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: newSurah }));
        try {
          localStorage.setItem(`amal_cached_surah_${surahNum}`, JSON.stringify(newSurah));
        } catch {}
      }
    } catch (err: any) {
      console.warn('Surah online load failed, fallback:', err);
      setSurahFetchError('سورت لوڈ کرنے میں خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  return {
    loadedSurahsCache,
    isLoadingSurah,
    surahFetchError,
    handleSelectSurah,
  };
}
