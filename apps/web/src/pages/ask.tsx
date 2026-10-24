import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { UniversalSearchEngine } from '@amal/amal-engine';
import { WebFatwaFirewall, SafetyClassification } from '../lib/safety';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
} from '../lib/quran-wisdom-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { useLanguage } from '../context/LanguageContext';
import { AskCrisisBanner } from '../components/ask/AskCrisisBanner';
import { AskScholarEscalationBanner } from '../components/ask/AskScholarEscalationBanner';
import { AskWisdomMatchesSection } from '../components/ask/AskWisdomMatchesSection';
import { AskEvidenceResultsSection } from '../components/ask/AskEvidenceResultsSection';

export default function AskAmalPage() {
  const { t, isUrdu } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [safetyResult, setSafetyResult] = useState<SafetyClassification | null>(null);
  const [matchedWisdomCards, setMatchedWisdomCards] = useState<QuranAyahWisdomCard[]>([]);
  const [modalCard, setModalCard] = useState<QuranAyahWisdomCard | null>(null);
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);
  const askAudioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = (card: QuranAyahWisdomCard, type: 'ARABIC' | 'URDU') => {
    const key = `${card.surahNumber}:${card.ayahNumber}:${type}`;
    if (activeAudioKey === key) {
      if (askAudioRef.current) {
        askAudioRef.current.pause();
        askAudioRef.current.src = '';
      }
      setActiveAudioKey(null);
      return;
    }

    const url =
      type === 'URDU'
        ? getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber)
        : getAyahAudioUrl(card.surahNumber, card.ayahNumber, 'alafasy');

    if (askAudioRef.current) {
      askAudioRef.current.src = url;
      askAudioRef.current.play().catch((e) => console.warn('Audio play error:', e));
      setActiveAudioKey(key);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    // Run Fatwa Safety Firewall classification
    const classification = WebFatwaFirewall.classify(cleanQuery);
    setSafetyResult(classification);

    // Class E: Life emergency or psychological crisis — Immediate Crisis Intercept
    if (classification.requiresCrisisIntervention) {
      setResults(null);
      setMatchedWisdomCards([]);
      return;
    }

    // Class D: Personalized Fiqh / Talaq / Oaths — Scholar Escalation
    if (classification.requiresScholarEscalation) {
      setResults(null);
      setMatchedWisdomCards([]);
      return;
    }

    // Match Quran Wisdom Collection
    const lower = cleanQuery.toLowerCase();
    const matches = QURAN_WISDOM_COLLECTION.filter((c) => {
      return (
        c.tadabburPrompt.theme.toLowerCase().includes(lower) ||
        c.surahNameTransliterated.toLowerCase().includes(lower) ||
        c.surahNameUrdu.includes(cleanQuery) ||
        c.textArabic.includes(cleanQuery) ||
        c.tarjumaKanzulIman.includes(cleanQuery) ||
        c.tarjumaEnglish.toLowerCase().includes(lower) ||
        c.tafseerKhazainUlIrfan.excerptUrdu.includes(cleanQuery) ||
        (c.crossReferenceBook && c.crossReferenceBook.workTitle.includes(cleanQuery)) ||
        (lower.includes('duha') && c.surahNumber === 93) ||
        (lower.includes('fajr') && c.surahNumber === 89) ||
        (lower.includes('ala') && c.surahNumber === 87) ||
        (lower.includes('naba') && c.surahNumber === 78) ||
        (lower.includes('fatih') && c.surahNumber === 1) ||
        (lower.includes('asr') && c.surahNumber === 103) ||
        (lower.includes('maun') && c.surahNumber === 107) ||
        (lower.includes('ikhlas') && c.surahNumber === 112) ||
        (lower.includes('tawakkul') && c.tadabburPrompt.theme === 'TAWAKKUL') ||
        (lower.includes('patience') &&
          (c.tadabburPrompt.theme === 'TAWAKKUL' || c.surahNumber === 103)) ||
        (lower.includes('sabr') &&
          (c.tadabburPrompt.theme === 'TAWAKKUL' || c.surahNumber === 103)) ||
        (lower.includes('salah') && c.tadabburPrompt.theme === 'SALAH') ||
        (lower.includes('namaz') && c.tadabburPrompt.theme === 'SALAH') ||
        (lower.includes('prayer') && c.tadabburPrompt.theme === 'SALAH') ||
        (lower.includes('time') && c.tadabburPrompt.theme === 'TIME_MANAGEMENT') ||
        (lower.includes('waqt') && c.tadabburPrompt.theme === 'TIME_MANAGEMENT') ||
        (lower.includes('akhlaq') && c.tadabburPrompt.theme === 'AKHLAQ') ||
        (lower.includes('manner') && c.tadabburPrompt.theme === 'AKHLAQ') ||
        (lower.includes('ikhlas') && c.tadabburPrompt.theme === 'IKHLAS') ||
        (lower.includes('sincerity') && c.tadabburPrompt.theme === 'IKHLAS')
      );
    }).slice(0, 3);
    setMatchedWisdomCards(matches);

    setLoading(true);
    const res = await AmalApiClient.searchEvidence(cleanQuery);
    setLoading(false);

    if (res.success && res.data && (Array.isArray(res.data) ? res.data.length > 0 : true)) {
      setResults(Array.isArray(res.data) ? res.data : [res.data]);
    } else {
      // Local fallback using verified universal index
      const localMatches = UniversalSearchEngine.search(cleanQuery, 5);
      if (localMatches.length > 0) {
        setResults(
          localMatches.map((m) => ({
            sourceType: m.category,
            reference: m.titleEn,
            arabicText: m.titleUr,
            translatedText: m.snippetEn,
          }))
        );
      } else {
        setResults([]);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: AmalTheme.colors.surface.backgroundLight,
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Head>
        <title>AMAL OS — Ask AMAL &amp; Evidence Explorer</title>
      </Head>

      <Navigation />

      {/* Hidden Audio Element for Ask Page Recitations */}
      <audio
        ref={askAudioRef}
        onEnded={() => setActiveAudioKey(null)}
        onError={(e) => {
          console.warn('Ask audio error:', e);
          setActiveAudioKey(null);
        }}
        style={{ display: 'none' }}
      />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: AmalTheme.colors.primary,
              letterSpacing: 1,
            }}
          >
            علمی و تحقیقی تلاش · SCHOLARLY EVIDENCE EXPLORER
          </span>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              margin: '6px 0 0',
              color: AmalTheme.colors.text.primaryLight,
            }}
          >
            کتبِ معتبرہ سے تلاش و رہنمائی (Canonical Guidance &amp; Evidence)
          </h1>
          <p
            style={{
              color: AmalTheme.colors.text.secondaryLight,
              fontSize: 14,
              marginTop: 6,
              lineHeight: 1.6,
            }}
          >
            قرآن و سنت، احادیثِ مبارکہ اور فقہائے اربعہ کی مصدقہ کتب سے حوالہ جات دریافت کریں۔ امل کوئی مصنوعی یا خود ساختہ فتویٰ جاری نہیں کرتا، بلکہ صرف مستند کتب کے صحیح متون پیش کرتا ہے۔
          </p>
        </header>

        {/* Search Console */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            marginBottom: 24,
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Sabr and patience during difficult times, Fajr timing, gratitude..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #CCC',
                fontSize: 15,
              }}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              style={{
                backgroundColor: AmalTheme.colors.primary,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '0 24px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {loading ? 'Searching...' : 'Explore Evidence'}
            </button>
          </form>
        </section>

        {/* CLASS E: IMMEDIATE CRISIS INTERCEPT BANNER */}
        {safetyResult?.requiresCrisisIntervention && (
          <AskCrisisBanner safetyResult={safetyResult} />
        )}

        {/* CLASS D / CLASS C: SCHOLAR ESCALATION & PLURALISM BANNERS */}
        {safetyResult && (
          <AskScholarEscalationBanner
            safetyResult={safetyResult}
            query={query}
            t={t}
          />
        )}

        {/* MATCHED QURAN AYAH WISDOM CARDS */}
        <AskWisdomMatchesSection
          cards={matchedWisdomCards}
          activeAudioKey={activeAudioKey}
          onPlayAudio={handlePlayAudio}
          onOpenModal={setModalCard}
          isUrdu={isUrdu}
          t={t}
        />

        {/* VERIFIED CANONICAL EVIDENCE RESULTS */}
        <AskEvidenceResultsSection results={results} />

        {/* Ayah Wisdom Modal for deep reading on Ask page */}
        {modalCard && (
          <AyahWisdomModal
            isOpen={true}
            onClose={() => setModalCard(null)}
            surahNumber={modalCard.surahNumber}
            ayahNumber={modalCard.ayahNumber}
            surahNameTransliterated={modalCard.surahNameTransliterated}
            surahNameUrdu={modalCard.surahNameUrdu}
            fallbackArabic={modalCard.textArabic}
            fallbackUrdu={modalCard.tarjumaKanzulIman}
            fallbackEnglish={modalCard.tarjumaEnglish}
          />
        )}
      </main>
    </div>
  );
}
