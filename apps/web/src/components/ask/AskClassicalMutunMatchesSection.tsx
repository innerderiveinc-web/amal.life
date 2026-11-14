import React from 'react';
import Link from 'next/link';
import { AmalTheme } from '@amal/ui';
import { ClassicalAuthorityMatch } from '../../lib/classical-rag-engine';
import { useLanguage } from '../../context/LanguageContext';
import { ProBadge } from '../common/ProBadge';

interface AskClassicalMutunMatchesSectionProps {
  matches: ClassicalAuthorityMatch[];
  isUrdu: boolean;
}

export function AskClassicalMutunMatchesSection({
  matches,
  isUrdu,
}: AskClassicalMutunMatchesSectionProps) {
  const { t } = useLanguage();
  if (!matches || matches.length === 0) return null;

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: '#B7791F',
              letterSpacing: 1,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>🏛️</span>
            <span>{t('CANONICAL SUNNI AUTHORITIES', 'نصوصِ کتبِ معتمدہ (اہلِ سنت)', 'نصوص الكتب المعتمدة عند أهل السنة', 'Canonical Sunni Mutun & Authorities')}</span>
            <ProBadge featureName="Canonical Sunni Authorities RAG" />
          </span>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              margin: '4px 0 0',
              color: AmalTheme.colors.text.primaryLight,
            }}
          >
            {t(
              'Direct Classical Scholarly Evidences',
              'کتبِ معتبرہ کے براہ راست دلائل و متون',
              'أدلة ونصوص أمهات الكتب المعتمدة',
              'Kutub-e-Motabara Ke Barah-e-Rast Dalael o Mutoon'
            )}
          </h2>
        </div>
        <span
          style={{
            fontSize: 12,
            padding: '4px 10px',
            backgroundColor: '#FEFCBF',
            color: '#744210',
            borderRadius: 12,
            fontWeight: 700,
            border: '1px solid #F6E05E',
          }}
        >
          {matches.length} {matches.length === 1 ? 'Authority Match' : 'Authority Matches'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {matches.map((item, idx) => (
          <article
            key={`${item.workId}-${item.chapterIndex}-${idx}`}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
            }}
          >
            {/* Header with Discipline and Authority details */}
            <div
              style={{
                backgroundColor: '#FAF5FF',
                padding: '14px 20px',
                borderBottom: '1px solid #E9D8FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#6B46C1',
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 2,
                  }}
                >
                  {item.discipline.replace(/_/g, ' ')} · {item.authorName} ({item.authorDeathHijri > 0 ? `${item.authorDeathHijri} AH` : 'Classical'})
                </span>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    margin: 0,
                    color: '#2D3748',
                  }}
                >
                  {item.bookTitleTransliterated}
                  {item.bookTitleArabic && (
                    <span
                      style={{
                        fontFamily: 'Amiri, Scheherazade New, serif',
                        fontSize: 16,
                        marginRight: 8,
                        marginLeft: 8,
                        color: '#4A5568',
                      }}
                    >
                      ({item.bookTitleArabic})
                    </span>
                  )}
                </h3>
              </div>

              <Link
                href={`/library?work=${item.workId}`}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  backgroundColor: '#6B46C1',
                  padding: '6px 14px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {t('Open in Library →', 'کتاب میں ملاحظہ فرمائیں ➔', 'عرض في المكتبة ➔', 'Library Mein Kholein ➔')}
              </Link>
            </div>

            {/* Content body */}
            <div style={{ padding: '20px 24px' }}>
              {/* Chapter Title */}
              <div style={{ marginBottom: 16 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#805AD5',
                    display: 'block',
                    marginBottom: 4,
                  }}
                >
                  {item.chapter.chapterTitleEnglish}
                </span>
                <span
                  style={{
                    fontFamily: 'Amiri, Scheherazade New, serif',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#4A5568',
                    display: 'block',
                    direction: 'rtl',
                    textAlign: 'right',
                  }}
                >
                  {item.chapter.chapterTitleUrdu}
                </span>
              </div>

              {/* Quick Plain-Language Summary for Youth & Beginners */}
              <div
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: 10,
                  padding: '12px 16px',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>💡</span>
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#166534',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    {t('Core Takeaway:', 'خلاصۂ مسئلہ:', 'الخلاصة الفقهية:', 'Ahem Nuktah (Khulasa):')}
                  </span>
                  <p style={{ margin: 0, fontSize: 13, color: '#1F2937', lineHeight: 1.5 }}>
                    {item.chapter.englishSynopsis || item.chapter.chapterTitleEnglish}
                  </p>
                </div>
              </div>

              {/* Classical Vocalized Arabic Matn */}
              <div
                style={{
                  backgroundColor: '#F7FAFC',
                  borderRadius: 12,
                  padding: '16px 20px',
                  borderRight: '4px solid #6B46C1',
                  marginBottom: 16,
                  direction: 'rtl',
                  textAlign: 'right',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#718096',
                    display: 'block',
                    marginBottom: 6,
                    direction: 'ltr',
                    textAlign: 'left',
                  }}
                >
                  {t('CANONICAL ARABIC MATN:', 'نَصُّ الْكِتَابِ (عربی متن):', 'نص المتن الأصلي:', 'CANONICAL ARABIC MATN:')}
                </span>
                <p
                  style={{
                    fontFamily: 'Amiri, Scheherazade New, serif',
                    fontSize: 18,
                    lineHeight: 1.9,
                    color: '#1A202C',
                    margin: 0,
                  }}
                >
                  {item.chapter.arabicMatn}
                </p>
              </div>

              {/* Urdu Translation */}
              <div
                style={{
                  backgroundColor: '#FFFDF5',
                  borderRadius: 12,
                  padding: '14px 18px',
                  border: '1px solid #FEFCBF',
                  marginBottom: 12,
                  direction: 'rtl',
                  textAlign: 'right',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#B7791F',
                    display: 'block',
                    marginBottom: 4,
                    direction: 'ltr',
                    textAlign: 'left',
                  }}
                >
                  {t('SCHOLARLY URDU TRANSLATION:', 'اردو ترجمہ و تحقیق:', 'الترجمة الأردية المعتمدة:', 'Scholarly Urdu Tarjuma:')}
                </span>
                <p
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, serif',
                    fontSize: 16,
                    lineHeight: 2.0,
                    color: '#2D3748',
                    margin: 0,
                  }}
                >
                  {item.chapter.urduTranslation}
                </p>
              </div>

              {/* English Synopsis & Classical Authority Notes */}
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#4A5568',
                  borderTop: '1px solid #EDF2F7',
                  paddingTop: 12,
                }}
              >
                <strong style={{ color: '#2D3748' }}>{t('Contextual Synopsis:', 'سیاقی خلاصہ:', 'الخلاصة السياقية:', 'Contextual Synopsis:')}</strong> {item.chapter.englishSynopsis}
                {item.chapter.scholarlyNotes && (
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#718096', fontStyle: 'italic' }}>
                    <strong>{t('Scholarly Provenance:', 'علمی سند و استناد:', 'الأصل والسند العلمي:', 'Scholarly Provenance:')}</strong> {item.chapter.scholarlyNotes}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
