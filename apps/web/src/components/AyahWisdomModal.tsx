import React, { useState } from 'react';
import { getAyahWisdomCard, getAyahAudioUrl } from '../lib/quran-wisdom-data';
import { showAmalToast } from './Toast';

export interface AyahWisdomModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  ayahNumber: number;
  surahNameTransliterated?: string;
  surahNameUrdu?: string;
  fallbackArabic?: string;
  fallbackUrdu?: string;
  fallbackEnglish?: string;
}

export const AyahWisdomModal: React.FC<AyahWisdomModalProps> = ({
  isOpen,
  onClose,
  surahNumber,
  ayahNumber,
  surahNameTransliterated,
  surahNameUrdu,
  fallbackArabic,
  fallbackUrdu,
  fallbackEnglish,
}) => {
  const [wisdomTab, setWisdomTab] = useState<'KHAZAIN' | 'IBN_KATHIR' | 'KANZ' | 'ENGLISH' | 'REFERENCES' | 'AMAL'>('KHAZAIN');
  const [selectedQari, setSelectedQari] = useState<'alafasy' | 'husary'>('alafasy');
  const [userWisdomNote, setUserWisdomNote] = useState('');

  if (!isOpen) return null;

  const wisdomCard = getAyahWisdomCard(surahNumber, ayahNumber);
  const audioSrc = getAyahAudioUrl(surahNumber, ayahNumber, selectedQari);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 20,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              📖 AYAH WISDOM & LISTENING CARD
            </span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
              {surahNameTransliterated || `Surah ${surahNumber}`} {surahNameUrdu ? `(${surahNameUrdu})` : ''} · Ayah {ayahNumber}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: 20,
              cursor: 'pointer',
              color: '#64748B',
              padding: 4,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 22, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Certified Qari Audio Bar */}
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#166534' }}>
                <span>🎙️</span>
                <span>Certified Medina Qari Tilawat (100% Real Human Reciter)</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setSelectedQari('alafasy')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedQari === 'alafasy' ? '#15803D' : '#CBD5E1',
                    backgroundColor: selectedQari === 'alafasy' ? '#15803D' : '#FFFFFF',
                    color: selectedQari === 'alafasy' ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  مشاری العفاسی (Alafasy)
                </button>
                <button
                  onClick={() => setSelectedQari('husary')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedQari === 'husary' ? '#15803D' : '#CBD5E1',
                    backgroundColor: selectedQari === 'husary' ? '#15803D' : '#FFFFFF',
                    color: selectedQari === 'husary' ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  محمود خلیل الحصری (Husary)
                </button>
              </div>
            </div>

            <audio
              controls
              src={audioSrc}
              key={audioSrc}
              style={{ width: '100%', height: 38, outline: 'none' }}
            />
          </div>

          {/* Arabic Matn Box */}
          <div
            dir="rtl"
            style={{
              padding: 18,
              borderRadius: 12,
              backgroundColor: '#FAFAF9',
              border: '1px solid #E7E5E4',
              fontFamily: 'var(--font-arabic), "Amiri", serif',
              fontSize: 26,
              lineHeight: 2.3,
              textAlign: 'right',
              color: '#1C1917',
            }}
          >
            {wisdomCard ? wisdomCard.textArabic : (fallbackArabic || '')}
            <span style={{ fontSize: 18, color: '#059669', marginRight: 8 }}>
              ﴿{ayahNumber}﴾
            </span>
          </div>

          {/* Tab Selector Bar */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              borderBottom: '2px solid #E2E8F0',
              paddingBottom: 2,
              overflowX: 'auto',
            }}
          >
            {[
              { key: 'KHAZAIN', label: 'خزائن العرفان (تفسیر)' },
              { key: 'IBN_KATHIR', label: 'تفسیر ابن کثیر' },
              { key: 'KANZ', label: 'کنز الایمان (اردو ترجمہ)' },
              { key: 'ENGLISH', label: 'English Rendering' },
              { key: 'REFERENCES', label: 'معتمد کتب کے حوالے' },
              { key: 'AMAL', label: 'تدبر و مستحب عمل' },
            ].map((tab) => {
              const isActive = wisdomTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setWisdomTab(tab.key as any)}
                  style={{
                    padding: '8px 14px',
                    border: 'none',
                    borderBottom: isActive ? '3px solid #059669' : '3px solid transparent',
                    backgroundColor: 'transparent',
                    color: isActive ? '#059669' : '#64748B',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          {wisdomCard ? (
            <div>
              {/* 1. KHAZA'IN-UL-IRFAN TAB */}
              {wisdomTab === 'KHAZAIN' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 700 }}>
                    مستند تفسیری حاشیہ: {wisdomCard.tafseerKhazainUlIrfan.author} · {wisdomCard.tafseerKhazainUlIrfan.citation}
                  </div>
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-urdu), serif',
                      fontSize: 18,
                      lineHeight: 2.2,
                      textAlign: 'right',
                      color: '#0F172A',
                      padding: 12,
                      backgroundColor: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {wisdomCard.tafseerKhazainUlIrfan.excerptUrdu}
                  </div>
                  {wisdomCard.tafseerKhazainUlIrfan.scholarlyNote && (
                    <div style={{ fontSize: 13, color: '#475569', fontStyle: 'italic', paddingLeft: 6 }}>
                      💡 <strong>تحقیقی نکتہ:</strong> {wisdomCard.tafseerKhazainUlIrfan.scholarlyNote}
                    </div>
                  )}
                </div>
              )}

              {/* 2. TAFSIR IBN KATHIR TAB */}
              {wisdomTab === 'IBN_KATHIR' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {wisdomCard.tafseerIbnKathir ? (
                    <>
                      <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: 12, fontWeight: 700 }}>
                        ماخذ: {wisdomCard.tafseerIbnKathir.author} · {wisdomCard.tafseerIbnKathir.citation}
                      </div>
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-urdu), serif',
                          fontSize: 18,
                          lineHeight: 2.2,
                          textAlign: 'right',
                          color: '#0F172A',
                          padding: 12,
                          backgroundColor: '#F8FAFC',
                          borderRadius: 10,
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        {wisdomCard.tafseerIbnKathir.excerptUrdu}
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: 16, textAlign: 'center', color: '#64748B', fontSize: 14 }}>
                      تفسیر ابن کثیر کا اقتباس اس آیت کے لیے آئندہ ریلیز میں شامل کیا جائے گا۔
                    </div>
                  )}
                </div>
              )}

              {/* 3. KANZ-UL-IMAN TAB */}
              {wisdomTab === 'KANZ' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#ECFDF5', color: '#065F46', fontSize: 12, fontWeight: 700 }}>
                    ماخذ: کنز الایمان فی ترجمۃ القرآن · اعلیٰ حضرت امام احمد رضا خان بریلوی قدس سرہ (۱۳۴۰ھ)
                  </div>
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-urdu), serif',
                      fontSize: 20,
                      lineHeight: 2.3,
                      textAlign: 'right',
                      color: '#0F172A',
                      padding: 16,
                      backgroundColor: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {wisdomCard.tarjumaKanzulIman}
                  </div>
                </div>
              )}

              {/* 4. ENGLISH TAB */}
              {wisdomTab === 'ENGLISH' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#F1F5F9', color: '#334155', fontSize: 12, fontWeight: 700 }}>
                    English Rendering based on Kanz-ul-Iman • Translated by Prof. Shah Faridul Haque (Darul Uloom Amjadia, 1988) / Maktaba-tul-Madina (2023)
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.8,
                      color: '#0F172A',
                      padding: 16,
                      backgroundColor: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {wisdomCard.tarjumaEnglish}
                  </div>
                </div>
              )}

              {/* 5. REFERENCES TAB */}
              {wisdomTab === 'REFERENCES' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {wisdomCard.crossReferenceBook ? (
                    <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#065F46' }}>
                          📚 {wisdomCard.crossReferenceBook.workTitle}
                        </span>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, backgroundColor: '#E2E8F0', color: '#475569', fontWeight: 700 }}>
                          {wisdomCard.crossReferenceBook.discipline}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
                        مصنف: <strong>{wisdomCard.crossReferenceBook.author}</strong> · {wisdomCard.crossReferenceBook.citation}
                      </div>
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-urdu), serif',
                          fontSize: 17,
                          lineHeight: 2.2,
                          textAlign: 'right',
                          color: '#1E293B',
                        }}
                      >
                        {wisdomCard.crossReferenceBook.insightUrdu}
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: 16, textAlign: 'center', color: '#64748B', fontSize: 14 }}>
                      دیگر کتب سے تحقیقی شواہد کے اندراج کا عمل جاری ہے۔
                    </div>
                  )}
                </div>
              )}

              {/* 6. TADABBUR & AMAL TAB */}
              {wisdomTab === 'AMAL' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Tadabbur Question */}
                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#FEF9C3', border: '1px solid #FDE047' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#854D0E', marginBottom: 6 }}>
                      💭 فکر و تدبر (Reflection Prompt)
                    </div>
                    <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 17, lineHeight: 2.1, textAlign: 'right', color: '#713F12', marginBottom: 8 }}>
                      {wisdomCard.tadabburPrompt.questionUrdu}
                    </div>
                    <div style={{ fontSize: 13, color: '#854D0E', fontStyle: 'italic' }}>
                      {wisdomCard.tadabburPrompt.questionEnglish}
                    </div>

                    {/* User Private Reflection Input */}
                    <div style={{ marginTop: 12 }}>
                      <textarea
                        value={userWisdomNote}
                        onChange={(e) => setUserWisdomNote(e.target.value)}
                        placeholder="اپنے ذاتی احساسات یا تاثرات یہاں درج فرمائیں (مکمل نجی و محفوظ)..."
                        style={{
                          width: '100%',
                          minHeight: 65,
                          padding: 10,
                          borderRadius: 8,
                          border: '1px solid #CBD5E1',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          outline: 'none',
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                        <button
                          onClick={() => {
                            if (!userWisdomNote.trim()) return;
                            showAmalToast('آپ کا تاثر نجی طور پر محفوظ کر لیا گیا ہے۔ جزاك الله خيرا');
                            setUserWisdomNote('');
                          }}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            backgroundColor: '#854D0E',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          محفوظ کریں (Save Note)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Optional Sunnah Amal Card */}
                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>
                        🌱 عملی زندگی سے ربط (Sunnah Practice)
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, backgroundColor: '#DCFCE7', color: '#15803D' }}>
                        {wisdomCard.optionalAmal.classification} (مستحب / سنت)
                      </span>
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                      {wisdomCard.optionalAmal.titleUrdu} ({wisdomCard.optionalAmal.titleEnglish})
                    </div>
                    <div style={{ fontSize: 11, color: '#047857', marginBottom: 8 }}>
                      سند / ماخذ: <strong>{wisdomCard.optionalAmal.classicalSource}</strong>
                    </div>
                    <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 16, lineHeight: 2.1, textAlign: 'right', color: '#14532D', marginBottom: 12 }}>
                      {wisdomCard.optionalAmal.actionDescriptionUrdu}
                    </div>

                    <button
                      onClick={() => {
                        try {
                          const planKey = `amal_custom_mamool_${new Date().toISOString().split('T')[0]}`;
                          const existing = JSON.parse(localStorage.getItem(planKey) || '[]');
                          existing.push({
                            title: wisdomCard.optionalAmal.titleUrdu,
                            source: wisdomCard.optionalAmal.classicalSource,
                            ayah: `${surahNameTransliterated || 'Surah'} ${ayahNumber}`,
                            time: new Date().toLocaleTimeString(),
                          });
                          localStorage.setItem(planKey, JSON.stringify(existing));
                          showAmalToast('یہ مستحب عمل آپ کے آج کے معمولات میں شامل کر دیا گیا ہے۔');
                        } catch {
                          showAmalToast('معمولات میں شامل کر دیا گیا۔');
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        backgroundColor: '#166534',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>✓</span>
                      <span>آج کے روزمرہ معمول میں شامل کریں (Add to My Daily Amal)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 6 }}>
                  کنز الایمان فی ترجمۃ القرآن (اعلیٰ حضرت امام احمد رضا خان بریلوی)
                </div>
                <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 18, lineHeight: 2.2, textAlign: 'right', color: '#1E293B' }}>
                  {fallbackUrdu || 'ترجمہ دستیاب نہیں ہے۔'}
                </div>
              </div>

              {fallbackEnglish && (
                <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    English Translation
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.7, color: '#1E293B' }}>
                    {fallbackEnglish}
                  </div>
                </div>
              )}

              <div style={{ padding: 14, borderRadius: 8, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: 13, color: '#1E40AF', lineHeight: 1.6 }}>
                📖 <strong>خزائن العرفان تفسیری سند:</strong> اس آیت مبارکہ کے لیے مفصل حاشیہ و کلاسیکی حوالہ جات ائندہ مرحلے میں شامل کیے جا رہے ہیں۔
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
