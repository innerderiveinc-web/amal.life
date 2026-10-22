import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { UniversalSearchEngine } from '@amal/amal-engine';
import { WebFatwaFirewall, SafetyClassification } from '../lib/safety';
import { QURAN_WISDOM_COLLECTION, QuranAyahWisdomCard, getAyahAudioUrl, getAyahUrduAudioUrl } from '../lib/quran-wisdom-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';

export default function AskAmalPage() {
  const router = useRouter();
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

    const url = type === 'URDU'
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
        (lower.includes('patience') && (c.tadabburPrompt.theme === 'TAWAKKUL' || c.surahNumber === 103)) ||
        (lower.includes('sabr') && (c.tadabburPrompt.theme === 'TAWAKKUL' || c.surahNumber === 103)) ||
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
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Ask AMAL & Evidence Explorer</title>
      </Head>

      <Navigation />

      {/* Hidden Audio Element for Ask Page Recitations */}
      <audio
        ref={askAudioRef}
        onEnded={() => setActiveAudioKey(null)}
        style={{ display: 'none' }}
      />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
            علمی و تحقیقی تلاش · SCHOLARLY EVIDENCE EXPLORER
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            کتبِ معتبرہ سے تلاش و رہنمائی (Canonical Guidance & Evidence)
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>
            قرآن و سنت، احادیثِ مبارکہ اور فقہائے اربعہ کی مصدقہ کتب سے حوالہ جات دریافت کریں۔ امل کوئی مصنوعی یا خود ساختہ فتویٰ جاری نہیں کرتا، بلکہ صرف مستند کتب کے صحیح متون پیش کرتا ہے۔
          </p>
        </header>

        {/* Search Console */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          marginBottom: 24,
        }}>
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
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '2px solid #EF4444',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            color: '#991B1B',
            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>🤲</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#B91C1C' }}>
                  آپ تنہا نہیں ہیں — اللہ تعالیٰ کی رحمت ہر شے پر وسیع ہے
                </h3>
                <div style={{ fontSize: 13, color: '#7F1D1D', fontWeight: 600 }}>
                  Immediate Crisis & Emotional Safety Protocol (Class E Intercept)
                </div>
              </div>
            </div>

            {/* Sacred Ayah of Hope */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              border: '1px solid #FCA5A5',
              marginBottom: 16,
              textAlign: 'right',
              direction: 'rtl',
            }}>
              <div style={{ fontFamily: 'var(--font-arabic), serif', fontSize: 20, lineHeight: 2, color: '#1B4332', fontWeight: 700 }}>
                ﴿قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا﴾
              </div>
              <div style={{ fontSize: 13, color: '#4B5563', direction: 'ltr', textAlign: 'left', marginTop: 8 }}>
                "Say: O My servants who have transgressed against themselves, despair not of the mercy of Allah. Indeed, Allah forgives all sins." [Surah Az-Zumar: 53]
              </div>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 16px', color: '#7F1D1D' }}>
              Your life, your safety, and your heart are sacred trusts (Amanah). No machine can replace human care, compassionate counseling, and immediate professional support. Please reach out right now to caring people who are ready to listen:
            </p>

            {/* Helplines Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {safetyResult.crisisHelplines?.map((line, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#FFFFFF',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid #FECACA',
                }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#991B1B' }}>{line.name}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', margin: '2px 0 6px' }}>{line.region}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#1B4332' }}>{line.contact}</div>
                  <div style={{ fontSize: 11, color: '#4B5563', marginTop: 4 }}>{line.description}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: '#7F1D1D', fontWeight: 600 }}>
              ⚠️ If you are in immediate physical danger, please call your local emergency services (911 / 999 / 112) immediately.
            </div>
          </div>
        )}

        {/* CLASS D: SCHOLAR ESCALATION BANNER */}
        {safetyResult?.requiresScholarEscalation && !safetyResult.requiresCrisisIntervention && (
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            color: '#92400E',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#B45309' }}>
              Direct Scholarly Guidance Needed (اہلِ علم سے رجوع)
            </h3>
            <p style={{ fontSize: 14, margin: '0 0 16px', lineHeight: 1.6, color: '#78350F' }}>
              Personal legal matters, marital questions, divorce (talaq), solemn oaths, and binding contracts depend intimately upon your specific life context. In our sacred tradition, no automated machine or algorithm may issue a binding legal ruling (Fatwa). AMAL protects your Deen by preparing a confidential, structured case file for verified, living scholars to provide personalized counsel.
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('amal_pending_situation', query);
                }
                router.push('/decision-room');
              }}
              style={{
                backgroundColor: '#1B4332',
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Open Deen Decision Room & Prepare Scholar Case →
            </button>
          </div>
        )}

        {/* CLASS C: SCHOLARLY DISAGREEMENT / IKHTILAF BANNER */}
        {safetyResult?.safetyClass === 'CLASS_C_SCHOLARLY_DISAGREEMENT' && (
          <div style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            fontSize: 13,
            lineHeight: 1.5,
            color: '#1E40AF',
          }}>
            <strong>⚖️ Legitimate Scholarly Pluralism (اختلاف أئمة الفقه رحمة):</strong> This topic involves established legal divergence across the recognized Sunni schools (Hanafi, Maliki, Shafi'i, and Hanbali). AMAL presents classical citations transparently without forcing an artificial single ruling.
          </div>
        )}

        {/* MATCHED QURAN AYAH WISDOM CARDS (TIER 1 REVELATION & SCHOLARLY TAFSEER) */}
        {matchedWisdomCards.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>📖</span>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#064E3B' }}>
                  قرآنی رہنمائی و تفسیری حکمت (Quranic Ayah Wisdom &amp; Tafsir)
                </h2>
              </div>
              <Link
                href={`/quran?surah=${matchedWisdomCards[0]?.surahNumber || 1}`}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#059669',
                  textDecoration: 'none',
                }}
              >
                قرآن ریڈر پر جائیں →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {matchedWisdomCards.map((card) => {
                const arabicKey = `${card.surahNumber}:${card.ayahNumber}:ARABIC`;
                const urduKey = `${card.surahNumber}:${card.ayahNumber}:URDU`;
                const isPlayingArabic = activeAudioKey === arabicKey;
                const isPlayingUrdu = activeAudioKey === urduKey;

                return (
                  <div
                    key={`${card.surahNumber}:${card.ayahNumber}`}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      border: '2px solid #A7F3D0',
                      padding: 22,
                      boxShadow: '0 4px 14px rgba(6, 78, 59, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 10px',
                            borderRadius: 12,
                            backgroundColor: '#DCFCE7',
                            color: '#166534',
                          }}
                        >
                          TIER 1 REVELATION · کلامِ الٰہی
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: 12,
                            backgroundColor: '#FEF3C7',
                            color: '#92400E',
                          }}
                        >
                          کنز الایمان فی ترجمۃ القرآن
                        </span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>
                        سورۃ {card.surahNameUrdu} ({card.surahNameTransliterated}) · آیت {card.ayahNumber}
                      </span>
                    </div>

                    {/* Arabic Text */}
                    <div
                      dir="rtl"
                      style={{
                        fontFamily: 'var(--font-arabic), "Amiri", serif',
                        fontSize: 22,
                        lineHeight: 2.1,
                        color: '#064E3B',
                        padding: '12px 16px',
                        backgroundColor: '#F0FDF4',
                        borderRadius: 10,
                        border: '1px solid #BBF7D0',
                        marginBottom: 12,
                        textAlign: 'right',
                      }}
                    >
                      {card.textArabic}
                    </div>

                    {/* Urdu Translation Kanz-ul-Iman */}
                    <div
                      dir="rtl"
                      style={{
                        fontSize: 16,
                        lineHeight: 1.8,
                        color: '#1E293B',
                        fontWeight: 600,
                        marginBottom: 8,
                        textAlign: 'right',
                      }}
                    >
                      <strong>ترجمہ کنز الایمان:</strong> {card.tarjumaKanzulIman}
                    </div>

                    {/* English Translation */}
                    <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginBottom: 14 }}>
                      <em>"{card.tarjumaEnglish}"</em>
                    </div>

                    {/* Tafsir Khaza'in-ul-Irfan Excerpt */}
                    <div
                      dir="rtl"
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        backgroundColor: '#FFFBEB',
                        border: '1px solid #FDE68A',
                        marginBottom: 14,
                        textAlign: 'right',
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', marginBottom: 4 }}>
                        📖 خزائن العرفان (صدر الافاضل مولانا نعیم الدین مراد آبادی):
                      </div>
                      <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.7 }}>
                        {card.tafseerKhazainUlIrfan.excerptUrdu}
                      </div>
                    </div>

                    {/* Action & Audio Toolbar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(card, 'ARABIC')}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            backgroundColor: isPlayingArabic ? '#047857' : '#DCFCE7',
                            color: isPlayingArabic ? '#FFFFFF' : '#166534',
                            border: '1px solid #86EFAC',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>{isPlayingArabic ? '⏸' : '🎙️'}</span>
                          <span>عربی تلاوت</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePlayAudio(card, 'URDU')}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            backgroundColor: isPlayingUrdu ? '#B45309' : '#FEF3C7',
                            color: isPlayingUrdu ? '#FFFFFF' : '#92400E',
                            border: '1px solid #FDE68A',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>{isPlayingUrdu ? '⏸' : '🎧'}</span>
                          <span>اردو ترجمہ آڈیو</span>
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => setModalCard(card)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            backgroundColor: '#0F172A',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>✨</span>
                          <span>مکمل تدبر و نیت کارڈ</span>
                        </button>

                        <Link
                          href={`/quran?surah=${card.surahNumber}`}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            backgroundColor: '#F1F5F9',
                            color: '#334155',
                            border: '1px solid #CBD5E1',
                            fontSize: 12,
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>📖</span>
                          <span>سورت دیکھیں →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Evidence Results */}
        {results && (
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>
              Verified Canonical Evidence ({results.length} results)
            </h2>
            {results.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {results.map((item: any, idx: number) => (
                  <div key={idx} style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 20,
                    border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 6,
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        fontWeight: 700,
                      }}>
                        VERIFIED CITATION · {item.sourceType || 'CANONICAL CORPUS'}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>
                        Ref: {item.reference || 'Canonical'}
                      </span>
                    </div>

                    {item.arabicText && (
                      <div style={{
                        fontFamily: 'serif',
                        fontSize: 20,
                        direction: 'rtl',
                        lineHeight: 1.8,
                        color: '#1A202C',
                        marginBottom: 12,
                        padding: 12,
                        backgroundColor: '#F7FAFC',
                        borderRadius: 8,
                      }}>
                        {item.arabicText}
                      </div>
                    )}

                    <p style={{ fontSize: 15, lineHeight: 1.6, color: '#2D3748', margin: '0 0 12px' }}>
                      "{item.translatedText || item.translation || item.text}"
                    </p>

                    <div style={{ fontSize: 12, color: '#718096', borderTop: '1px solid #EDF2F7', paddingTop: 10 }}>
                      Authority Level: Tier 1/2 Primary · Provenance verified against Medina Mushaf / Kutub al-Sittah
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#777' }}>
                No direct canonical evidence found for this query in the verified corpus.
                AMAL prefers honest uncertainty over fabricated answers.
              </div>
            )}
          </section>
        )}

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
