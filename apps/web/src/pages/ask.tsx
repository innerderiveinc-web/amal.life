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
import { AskClassicalMutunMatchesSection } from '../components/ask/AskClassicalMutunMatchesSection';
import { findClassicalAuthorities, normalizeQuery, ClassicalAuthorityMatch } from '../lib/classical-rag-engine';
import { SacredAiDisclaimer } from '../components/common/SacredAiDisclaimer';

export default function AskAmalPage() {
  const { t, isUrdu } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [safetyResult, setSafetyResult] = useState<SafetyClassification | null>(null);
  const [matchedWisdomCards, setMatchedWisdomCards] = useState<QuranAyahWisdomCard[]>([]);
  const [classicalMatches, setClassicalMatches] = useState<ClassicalAuthorityMatch[]>([]);
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

  const executeSearchForQuery = async (rawQuery: string) => {
    const cleanQuery = rawQuery.trim();
    if (!cleanQuery) return;

    // Run Fatwa Safety Firewall classification
    const classification = WebFatwaFirewall.classify(cleanQuery);
    setSafetyResult(classification);

    // Class E: Life emergency or psychological crisis — Immediate Crisis Intercept
    if (classification.requiresCrisisIntervention) {
      setResults(null);
      setMatchedWisdomCards([]);
      setClassicalMatches([]);
      return;
    }

    // Class D: Personalized Fiqh / Talaq / Oaths — Scholar Escalation
    if (classification.requiresScholarEscalation) {
      setResults(null);
      setMatchedWisdomCards([]);
      setClassicalMatches([]);
      return;
    }

    // Match Classical Sunni Authorities (RAG)
    const classMatches = findClassicalAuthorities(cleanQuery, 4);
    setClassicalMatches(classMatches);

    // Semantic Matcher for Quran Wisdom Collection
    const normQuery = normalizeQuery(cleanQuery);
    const tokens = normQuery
      .split(' ')
      .filter((t) => t.length > 2)
      .map((t) => t.trim());

    // Semantic Theme Expansion Dictionary
    const themeSynonyms: Record<string, string[]> = {
      TAWAKKUL: ['sabr', 'patience', 'shukr', 'gratitude', 'trust', 'tawakkul', 'grief', 'sad', 'hardship', 'mushkil', 'pareshani', 'asani', 'ease', 'depression', 'stress', 'dua', 'help', 'madad'],
      SALAH: ['salah', 'namaz', 'prayer', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'qiyam', 'sajda', 'khushu', 'tahajjud', 'witr', 'rakat', 'azaan', 'adhan', 'masjid', 'wudu', 'taharah', 'paaki', 'ghusl'],
      IKHLAS: ['ikhlas', 'sincerity', 'pure', 'intention', 'niyyah', 'riya', 'shirk', 'tawbah', 'astaghfirullah', 'forgiveness', 'maghfirat', 'istighfar', 'tawheed', 'gunah', 'mafi'],
      AKHLAQ: ['akhlaq', 'manner', 'adab', 'character', 'kind', 'anger', 'ghussa', 'gheebat', 'backbiting', 'jhoot', 'lie', 'parents', 'walidain', 'maa', 'baap', 'brother', 'silat', 'rehm'],
      HUQUQ_UL_IBAD: ['rights', 'huquq', 'neighbor', 'humsaya', 'poor', 'miskeen', 'orphan', 'yateem', 'zakat', 'sadqa', 'charity', 'infaq', 'insaniyat', 'parents', 'walidain', 'khandan'],
      TIME_MANAGEMENT: ['time', 'waqt', 'asr', 'fajr', 'age', 'life', 'umr', 'hasrat', 'delay', 'qada', 'barakah', 'barkat']
    };

    const scoredCards = QURAN_WISDOM_COLLECTION.map((c) => {
      let score = 0;
      const normAr = normalizeQuery(c.textArabic);
      const normUr = normalizeQuery(c.tarjumaKanzulIman);
      const normEn = normalizeQuery(c.tarjumaEnglish);
      const normTafsir = normalizeQuery(c.tafseerKhazainUlIrfan.excerptUrdu);
      const normSurahEn = normalizeQuery(c.surahNameTransliterated);
      const normSurahUr = normalizeQuery(c.surahNameUrdu);
      const cardTheme = c.tadabburPrompt.theme;

      // 1. Direct whole query matching
      if (normUr.includes(normQuery) || normEn.includes(normQuery) || normAr.includes(normQuery)) score += 90;
      if (normTafsir.includes(normQuery)) score += 60;
      if (normSurahEn.includes(normQuery) || normSurahUr.includes(normQuery)) score += 80;

      // 2. Token level matching
      for (const tok of tokens) {
        if (normUr.includes(tok)) score += 25;
        if (normEn.includes(tok)) score += 20;
        if (normAr.includes(tok)) score += 35;
        if (normTafsir.includes(tok)) score += 15;
        if (normSurahEn.includes(tok) || normSurahUr.includes(tok)) score += 30;

        // Theme synonym boost
        for (const [themeKey, syns] of Object.entries(themeSynonyms)) {
          if (cardTheme === themeKey && syns.some((s) => s.includes(tok) || tok.includes(s))) {
            score += 30;
          }
        }
      }

      return { card: c, score };
    });

    const matches = scoredCards
      .filter((sc) => sc.score > 20)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((sc) => sc.card);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSearchForQuery(query);
  };

  const handleSelectSampleQuery = (sampleText: string) => {
    setQuery(sampleText);
    executeSearchForQuery(sampleText);
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
        <meta name="description" content="Classical Evidence Search and Scholarly Question Engine grounded in authentic Ahl al-Sunnah consensus." />
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
            {t('SCHOLARLY EVIDENCE EXPLORER', 'علمی و تحقیقی تلاش', 'استكشاف الأدلة العلمية المعتمدة', 'SCHOLARLY EVIDENCE EXPLORER')}
          </span>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              margin: '6px 0 0',
              color: AmalTheme.colors.text.primaryLight,
            }}
          >
            {t(
              'Canonical Guidance & Evidence Explorer',
              'کتبِ معتبرہ سے تلاش و رہنمائی',
              'البحث في أمهات الكتب المعتمدة',
              'Kutub-e-Motabara Se Rahnumayi o Shawahid'
            )}
          </h1>
          <p
            style={{
              color: AmalTheme.colors.text.secondaryLight,
              fontSize: 14,
              marginTop: 6,
              lineHeight: 1.6,
            }}
          >
            {t(
              'Search verified references from the Holy Quran, Prophetic Sunnah, and authoritative classical texts across the 4 Madhhabs. AMAL never fabricates rulings; it only surfaces authentic mutun with full sanad.',
              'قرآن و سنت، احادیثِ مبارکہ اور فقہائے اربعہ کی مصدقہ کتب سے حوالہ جات دریافت کریں۔ امل کوئی مصنوعی یا خود ساختہ فتویٰ جاری نہیں کرتا، بلکہ صرف مستند کتب کے صحیح متون پیش کرتا ہے۔',
              'ابحث في نصوص القرآن الكريم والسنة النبوية وأمهات كتب الفقه المعتمدة على المذاهب الأربعة.',
              'Quran o Sunnat, Ahadith-e-Mubarakah aur 4 Madhahib ki mustanad kutub se hawala jaat talash karein. AMAL fatwa nahi deta, sirf authentic mutoon pesh karta hai.'
            )}
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
              placeholder={t('e.g. Sabr and patience during difficult times, Fajr timing, gratitude...', 'مثلاً: صبر و شکر کی فضیلت، وقتِ فجر، حقوق العباد...', 'مثلاً: فضل الصبر والشكر، وقت صلاة الفجر...', 'Maslan: Sabr o shukr ki fazeelat, waqt-e-Fajr, huqooq-ul-ibad...')}
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
              {loading ? t('Searching...', 'تلاش جاری ہے...', 'جارٍ البحث...', 'Talash Jaari Hai...') : t('Explore Evidence', 'شواہد تلاش کریں', 'بحث الشواهد', 'Shawahid Talash Karein')}
            </button>
          </form>

          {/* Quick Curated Scholarly Inquiry Chips */}
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginRight: 4 }}>
              {t('Suggested Topics:', 'تجویز کردہ علمی موضوعات:', 'موضوعات مقترحة:', 'Tajweez Kardah Mozooat:')}
            </span>
            {[
              {
                en: 'Patience in Hardship (Sabr)',
                ur: 'صبر و شکر کی فضیلت',
                query: isUrdu ? 'صبر و شکر کی فضیلت' : 'Patience and Sabr during difficult times',
              },
              {
                en: 'Khushu in Salah',
                ur: 'نماز میں یکسوئی و خشوع',
                query: isUrdu ? 'نماز میں خشوع اور یکسوئی' : 'Khushu and focus in Salah prayer',
              },
              {
                en: 'Repentance & Istighfar',
                ur: 'توبہ و استغفار کی اہمیت',
                query: isUrdu ? 'توبہ اور استغفار کی فضیلت' : 'Repentance and Istighfar forgiveness',
              },
              {
                en: 'Rights of Parents',
                ur: 'والدین کے حقوق و اطاعت',
                query: isUrdu ? 'والدین کے حقوق اور حسن سلوک' : 'Rights of parents and honoring mother father',
              },
              {
                en: 'Halal Sustenance & Barakah',
                ur: 'حلال رزق اور برکت',
                query: isUrdu ? 'حلال رزق اور تجارت میں برکت' : 'Halal earnings sustenance and barakah',
              },
              {
                en: 'Wudu & Taharah Purity',
                ur: 'وضو و طہارت کے مسائل',
                query: isUrdu ? 'وضو اور طہارت کے بنیادی احکام' : 'Wudu purity and taharah rules',
              },
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSampleQuery(chip.query)}
                style={{
                  fontSize: 11.5,
                  padding: '4px 10px',
                  borderRadius: 16,
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F9FAFB',
                  color: '#374151',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                {isUrdu ? chip.ur : chip.en}
              </button>
            ))}
          </div>

          {/* Inline Compact AI Sacred Disclaimer Pill */}
          <SacredAiDisclaimer variant="compact" />
        </section>

        {/* Global Sacred AI Research & Epistemic Grounding Disclaimer Banner */}
        <SacredAiDisclaimer variant="banner" />

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

        {/* CLASSICAL SUNNI CANONICAL AUTHORITY MATCHES (RAG) */}
        <AskClassicalMutunMatchesSection matches={classicalMatches} isUrdu={isUrdu} />

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
