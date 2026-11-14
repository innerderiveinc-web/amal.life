import { useState, useEffect } from 'react';
import {
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getSurahKanzulImanAudioUrl,
} from '../../lib/quran-wisdom-data';
import { showAmalToast } from '../Toast';

export interface UseQuranOfflineAudioOptions {
  selectedSurahNumber: number;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
}

export function useQuranOfflineAudio({
  selectedSurahNumber,
  selectedQari,
}: UseQuranOfflineAudioOptions) {
  const [isSurahCachedOffline, setIsSurahCachedOffline] = useState<boolean>(false);
  const [isCachingSurah, setIsCachingSurah] = useState<boolean>(false);

  // Check if current Surah Kanz-ul-Iman / Tilawat audio is cached offline
  useEffect(() => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
      if (kanzulImanUrl) {
        caches
          .open('amal-quran-audio-v1')
          .then((cache) => {
            cache.match(kanzulImanUrl).then((res) => {
              setIsSurahCachedOffline(!!res);
            });
          })
          .catch(() => {});
      } else {
        setIsSurahCachedOffline(false);
      }
    }
  }, [selectedSurahNumber]);

  const handleCacheSurahOffline = async () => {
    if (typeof window === 'undefined' || !('caches' in window)) {
      const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
      showAmalToast(
        lang === 'ur'
          ? 'آپ کے براؤزر میں آف لائن کیشنگ دستیاب نہیں ہے۔'
          : lang === 'ar'
          ? 'التخزين دون اتصال غير مدعوم في هذا المتصفح.'
          : lang === 'ru'
          ? 'Browser me offline caching dastiyab nahi hai.'
          : 'Offline caching is not supported in this browser.',
        'warning'
      );
      return;
    }
    setIsCachingSurah(true);
    try {
      const cache = await caches.open('amal-quran-audio-v1');
      const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
      if (kanzulImanUrl) {
        await cache.add(kanzulImanUrl);
      }
      // Also cache first 3 verses of the selected Surah
      const p1 = cache.add(getAyahAudioUrl(selectedSurahNumber, 1, selectedQari)).catch(() => {});
      const p2 = cache.add(getAyahUrduAudioUrl(selectedSurahNumber, 1)).catch(() => {});
      await Promise.all([p1, p2]);

      setIsSurahCachedOffline(true);
      const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
      const successMsg = lang === 'ur'
        ? 'سورۃ مبارکہ کی آڈیو کامیابی سے آف لائن محفوظ کر لی گئی ہے!'
        : lang === 'ar'
        ? 'تم حفظ تلاوة السورة المباركة دون اتصال بنجاح!'
        : lang === 'ru'
        ? 'Surah mubarakah ki audio offline mehfooz kar li gayi hai!'
        : 'Surah recitation successfully cached offline!';
      showAmalToast(successMsg, 'success');
    } catch (e) {
      console.warn('Failed to cache surah audio:', e);
      const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
      const errorMsg = lang === 'ur'
        ? 'آف لائن محفوظ کرنے میں خرابی پیش آئی۔'
        : lang === 'ar'
        ? 'حدث خطأ أثناء الحفظ دون اتصال.'
        : lang === 'ru'
        ? 'Offline save karne me kharabi pesh aayi.'
        : 'Failed to cache audio offline.';
      showAmalToast(errorMsg, 'warning');
    } finally {
      setIsCachingSurah(false);
    }
  };

  const handleDownloadSurahAudio = () => {
    const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
    const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
    if (!kanzulImanUrl) {
      showAmalToast(
        lang === 'ur'
          ? 'اس سورت کا مکمل آڈیو لنک دستیاب نہیں ہے۔'
          : lang === 'ar'
          ? 'رابط الصوت لهذه السورة غير متاح حالياً.'
          : lang === 'ru'
          ? 'Is Surah ka audio link dastiyab nahi hai.'
          : 'Audio link for this Surah is not available.',
        'warning'
      );
      return;
    }
    try {
      const a = document.createElement('a');
      a.href = kanzulImanUrl;
      a.download = `Amal_Surah_${selectedSurahNumber}_KanzulIman.mp3`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showAmalToast(
        lang === 'ur'
          ? 'مکمل سورت کی آڈیو ڈاؤنلوڈ شروع ہو گئی ہے۔'
          : lang === 'ar'
          ? 'بدأ تنزيل التلاوة الكاملة للسورة.'
          : lang === 'ru'
          ? 'Mukammal Surah ki audio download shuru ho gayi.'
          : 'Surah audio download started.',
        'success'
      );
    } catch (e) {
      showAmalToast(
        lang === 'ur'
          ? 'ڈاؤنلوڈ میں خرابی پیش آئی۔'
          : lang === 'ar'
          ? 'حدث خطأ أثناء التنزيل.'
          : lang === 'ru'
          ? 'Download me kharabi pesh aayi.'
          : 'Failed to download audio.',
        'warning'
      );
    }
  };

  return {
    isSurahCachedOffline,
    isCachingSurah,
    handleCacheSurahOffline,
    handleDownloadSurahAudio,
  };
}
