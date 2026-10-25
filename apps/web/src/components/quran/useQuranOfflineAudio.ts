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
      showAmalToast('آپ کے براؤزر میں آف لائن کیشنگ دستیاب نہیں ہے۔', 'warning');
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
      showAmalToast(
        'سورۃ مبارکہ کی آڈیو کامیابی سے آف لائن محفوظ کر لی گئی ہے! (Surah cached offline)',
        'success'
      );
    } catch (e) {
      console.warn('Failed to cache surah audio:', e);
      showAmalToast('آف لائن محفوظ کرنے میں خرابی پیش آئی۔', 'warning');
    } finally {
      setIsCachingSurah(false);
    }
  };

  const handleDownloadSurahAudio = () => {
    const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
    if (!kanzulImanUrl) {
      showAmalToast('اس سورت کا مکمل آڈیو لنک دستیاب نہیں ہے۔', 'warning');
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
      showAmalToast('مکمل سورت کی آڈیو ڈاؤنلوڈ شروع ہو گئی ہے۔', 'success');
    } catch (e) {
      showAmalToast('ڈاؤنلوڈ میں خرابی پیش آئی۔', 'warning');
    }
  };

  return {
    isSurahCachedOffline,
    isCachingSurah,
    handleCacheSurahOffline,
    handleDownloadSurahAudio,
  };
}
