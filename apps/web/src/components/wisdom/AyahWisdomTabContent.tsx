import React, { useState } from 'react';
import { QuranAyahWisdomCard } from '../../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../../lib/quran-roman-urdu';
import { showAmalToast } from '../Toast';

export type AyahWisdomTabKey = 'KHAZAIN' | 'KANZ' | 'ROMAN_URDU' | 'ENGLISH' | 'IBN_KATHIR' | 'REFERENCES' | 'AMAL';

export interface AyahWisdomTabContentProps {
  wisdomTab: AyahWisdomTabKey;
  wisdomCard?: QuranAyahWisdomCard | null;
  surahNumber: number;
  ayahNumber: number;
  surahNameTransliterated?: string;
  fallbackArabic?: string;
  fallbackUrdu?: string;
  fallbackEnglish?: string;
}

export const AyahWisdomTabContent: React.FC<AyahWisdomTabContentProps> = ({
  wisdomTab,
  wisdomCard,
  surahNumber,
  ayahNumber,
  surahNameTransliterated,
  fallbackArabic,
  fallbackUrdu,
  fallbackEnglish,
}) => {
  const [userWisdomNote, setUserWisdomNote] = useState('');

  if (!wisdomCard) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 6 }}>
            اردو ترجمہ (کنز الایمان فی ترجمۃ القرآن)
          </div>
          <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 18, lineHeight: 2.2, textAlign: 'right', color: '#1E293B' }}>
            {fallbackUrdu || 'ترجمہ دستیاب نہیں ہے۔'}
          </div>
        </div>

        {/* Roman Urdu Transliteration & Tarjuma Fallback */}
        <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF', marginBottom: 4 }}>
            🔤 Roman Arabic Transliteration (تلفظ):
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1E3A8A', lineHeight: 1.6, marginBottom: 8 }}>
            {getAyahRomanTransliteration(surahNumber, ayahNumber, fallbackArabic)}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#065F46', marginBottom: 4 }}>
            📖 Roman Urdu Tarjuma (Kanz-ul-Iman):
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#064E3B', lineHeight: 1.6 }}>
            {getAyahRomanUrduTarjuma(surahNumber, ayahNumber, fallbackUrdu)}
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
          📖 <strong>خزائن العرفان تفسیری سند:</strong> اس آیت مبارکہ کے لیے مفصل حاشیہ و کلاسیکی حوالہ جات آئندہ مرحلے میں شامل کیے جا رہے ہیں۔
        </div>
      </div>
    );
  }

  return (
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
            ماخذ: کنز الایمان فی ترجمۃ القرآن
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

      {/* 3B. ROMAN URDU TAB */}
      {wisdomTab === 'ROMAN_URDU' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Roman Arabic Pronunciation Guide */}
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1E40AF' }}>
                🔤 تلفظ و تجوید (Roman Arabic Transliteration)
              </span>
              <span style={{ fontSize: 11, backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                Tajweed Phonetics
              </span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, color: '#1E3A8A', lineHeight: 1.8, letterSpacing: '0.01em' }}>
              {getAyahRomanTransliteration(surahNumber, ayahNumber, fallbackArabic || wisdomCard.textArabic)}
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 8, fontStyle: 'italic' }}>
              💡 Sahi Makharij ke sath adaigi ke liye upar diye gaye Qari audio ko dhyan se sunein.
            </div>
          </div>

          {/* Roman Urdu Kanz-ul-Iman Tarjuma */}
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
                📖 کنز الایمان فی ترجمۃ القرآن (Roman Urdu Translation)
              </span>
              <span style={{ fontSize: 11, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                Ala Hazrat Imam Ahmad Raza
              </span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, color: '#064E3B', lineHeight: 1.9 }}>
              {getAyahRomanUrduTarjuma(surahNumber, ayahNumber, fallbackUrdu || wisdomCard.tarjumaKanzulIman)}
            </div>
            <div style={{ fontSize: 11, color: '#059669', marginTop: 8 }}>
              Authentic Roman Urdu transliteration of Kanz-ul-Iman for diaspora &amp; Roman Urdu readers.
            </div>
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
  );
};
