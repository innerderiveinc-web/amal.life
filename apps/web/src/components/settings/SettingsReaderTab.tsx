import React from 'react';
import { AmalTheme } from '@amal/ui';

interface SettingsReaderTabProps {
  arabicScript: 'indopak' | 'uthmani';
  setArabicScript: (script: 'indopak' | 'uthmani') => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  urduTranslation: string;
  setUrduTranslation: (trans: string) => void;
  englishTranslation: string;
  setEnglishTranslation: (trans: string) => void;
  showWordByWord: boolean;
  setShowWordByWord: (val: boolean) => void;
  handleSaveReader: () => void;
  t: (en: string, ur: string) => string;
}

export function SettingsReaderTab({
  arabicScript,
  setArabicScript,
  fontSize,
  setFontSize,
  urduTranslation,
  setUrduTranslation,
  englishTranslation,
  setEnglishTranslation,
  showWordByWord,
  setShowWordByWord,
  handleSaveReader,
  t,
}: SettingsReaderTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        Quran & Hadith Reader Codex
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        Customize the Arabic typography script, font scale, and canonical translations.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Arabic Calligraphy Script (رسم الخط)
          </label>
          <select
            value={arabicScript}
            onChange={(e) => setArabicScript(e.target.value as ('indopak' | 'uthmani'))}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="indopak">{t('Indo-Pak / Subcontinent Script (Nastaliq / Naskh)', 'رسم الخط برصغیر (نستعلیق / نسخ)')}</option>
            <option value="uthmani">{t('Madani Uthmani Script', 'المصحف المدني (رسم عثماني)')}</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Arabic Typography Scale ({fontSize}px)
          </label>
          <input
            type="range"
            min={18}
            max={40}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
            style={{ width: '100%', maxWidth: 420, accentColor: AmalTheme.colors.primary }}
          />
          <div
            style={{
              marginTop: 10,
              padding: 16,
              backgroundColor: '#F9FAFB',
              borderRadius: 8,
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              fontFamily: arabicScript === 'indopak' ? 'Al Qalam Quran Majeed, serif' : 'Amiri, serif',
              fontSize: fontSize,
              color: AmalTheme.colors.primary,
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Default Urdu Translation (اردو ترجمہ)
          </label>
          <select
            value={urduTranslation}
            onChange={(e) => setUrduTranslation(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="kanzul_iman">Kanzul Iman — Imam Ahmad Raza Khan</option>
            <option value="maarif_ul_quran">Ma'arif-ul-Quran — Mufti Muhammad Shafi</option>
            <option value="bayan_ul_quran">Bayan-ul-Quran — Dr. Israr Ahmad</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Default English Translation
          </label>
          <select
            value={englishTranslation}
            onChange={(e) => setEnglishTranslation(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="sahih_international">Sahih International</option>
            <option value="yusuf_ali">Abdullah Yusuf Ali</option>
            <option value="pickthall">Marmaduke Pickthall</option>
          </select>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
              🔤 Word-by-Word Interlinear Analysis
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>
              Show morphological root analysis and direct word-level translation in reader
            </div>
          </div>
          <input
            type="checkbox"
            checked={showWordByWord}
            onChange={(e) => setShowWordByWord(e.target.checked)}
            style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
          />
        </div>

        <button
          onClick={handleSaveReader}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 22px',
            backgroundColor: AmalTheme.colors.primary,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Save Reader Codex
        </button>
      </div>
    </div>
  );
}
