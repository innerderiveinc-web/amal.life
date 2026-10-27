import React, { useState } from 'react';
import { SanctuaryBook, SanctuaryBookChapter } from '../../lib/women-sanctuary-data';

export interface SistersBookIndexViewProps {
  isUrdu: boolean;
  readingBook: SanctuaryBook;
  onBackToAllBooks: () => void;
  onSelectChapter: (chapter: SanctuaryBookChapter) => void;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    era: string,
    descUrdu: string,
    descEnglish: string,
    consensusUrdu: string
  ) => void;
}

export const SistersBookIndexView: React.FC<SistersBookIndexViewProps> = ({
  isUrdu,
  readingBook,
  onBackToAllBooks,
  onSelectChapter,
  onOpenSanad,
}) => {
  const [activeTab, setActiveTab] = useState<'CHAPTERS' | 'FULL_PDF'>('CHAPTERS');

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Top Navigation & Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <button
          onClick={onBackToAllBooks}
          style={{
            backgroundColor: '#F3F4F6',
            border: 'none',
            padding: '6px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {isUrdu ? '← کتب خانے کی فہرست پر واپس' : '← Back to All Books'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: 8,
              padding: 3,
              gap: 4,
            }}
          >
            <button
              onClick={() => setActiveTab('CHAPTERS')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'CHAPTERS' ? '#064E3B' : 'transparent',
                color: activeTab === 'CHAPTERS' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              📜 {isUrdu ? 'منتخب ابواب' : 'Curated Chapters'}
            </button>
            <button
              onClick={() => setActiveTab('FULL_PDF')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'FULL_PDF' ? '#064E3B' : 'transparent',
                color: activeTab === 'FULL_PDF' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              📑 {isUrdu ? 'مکمل اصل کتاب (Full Book)' : 'Full Book Edition'}
            </button>
          </div>

          {(readingBook.pdfUrl || readingBook.onlineArchiveUrl) && (
            <a
              href={readingBook.pdfUrl || readingBook.onlineArchiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>↗</span>
              <span>{isUrdu ? 'نئی ونڈو میں مکمل نسخہ' : 'Open Full Edition'}</span>
            </a>
          )}

          <button
            onClick={() =>
              onOpenSanad(
                readingBook.titleUrdu,
                readingBook.authorUrdu,
                readingBook.verificationHash,
                readingBook.authorEra,
                readingBook.descriptionUrdu,
                readingBook.descriptionEnglish,
                readingBook.scholarlyConsensusUrdu
              )
            }
            style={{
              backgroundColor: '#ECFDF5',
              color: '#064E3B',
              border: '1px solid #A7F3D0',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ✓ {isUrdu ? 'تحقیق و سندِ کتاب' : 'Sanad Certificate'}
          </button>
        </div>
      </div>

      {/* Book Metadata Header */}
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#064E3B', margin: '4px 0' }}>
        {isUrdu ? readingBook.titleUrdu : readingBook.titleEnglish}
      </h2>
      <div style={{ fontSize: 14, color: '#047857', fontWeight: 600, marginBottom: 6 }}>
        {isUrdu ? readingBook.titleEnglish : readingBook.titleUrdu}
      </div>
      <div style={{ fontSize: 14, color: '#4B5563', marginBottom: 12 }}>
        <strong>{isUrdu ? readingBook.authorUrdu : readingBook.authorEnglish}</strong> • {readingBook.authorEra}
      </div>
      <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
        {isUrdu ? readingBook.descriptionUrdu : readingBook.descriptionEnglish}
      </p>

      {/* Scholarly Transparency Callout */}
      <div
        style={{
          backgroundColor: '#F0FDF4',
          borderRadius: 12,
          padding: '12px 16px',
          border: '1px solid #BBF7D0',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 20 }}>⚖️</span>
        <div style={{ fontSize: 12.5, color: '#166534', lineHeight: 1.5 }}>
          <strong>{isUrdu ? 'علمی و تحقیقی وضاحت:' : 'Scholarly Transparency Notice:'}</strong>{' '}
          {isUrdu
            ? 'اس سیکشن میں اہم فقہی و اخلاقی اسباق کے ساتھ ساتھ اصل مطبوعہ کتب کی مکمل پی ڈی ایف بھی شامل کی گئی ہے تاکہ علمائے کرام اور طالبات ورق بہ ورق مکمل مطالعہ فرما سکیں۔'
            : 'This sanctuary presents core juristic & ethical lessons alongside the unabridged original printed PDF scans for comprehensive scholarly verification.'}
        </div>
      </div>

      {/* VIEW CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'FULL_PDF' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {readingBook.pdfUrl ? (
            /* A) DIRECT LOCAL IN-APP PDF STREAMING VIEWER */
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  marginBottom: 10,
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A' }}>
                    {isUrdu ? readingBook.titleUrdu : readingBook.titleEnglish} — مکمل مطبوعہ نسخہ
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    مصنف: <strong>{isUrdu ? readingBook.authorUrdu : readingBook.authorEnglish}</strong> • مکمل غیر محذوف اصل کتاب
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={readingBook.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      backgroundColor: '#FFFFFF',
                      color: '#064E3B',
                      border: '1px solid #A7F3D0',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>↗</span>
                    <span>{isUrdu ? 'فل اسکرین نئی ونڈو' : 'Fullscreen'}</span>
                  </a>
                  <a
                    href={readingBook.pdfUrl}
                    download
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      backgroundColor: '#064E3B',
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>📥</span>
                    <span>{isUrdu ? 'ڈاؤن لوڈ PDF' : 'Download PDF'}</span>
                  </a>
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '750px',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  backgroundColor: '#525659',
                }}
              >
                <iframe
                  src={`${readingBook.pdfUrl}#toolbar=1&navpanes=1`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={readingBook.titleEnglish}
                />
              </div>

              <div style={{ textAlign: 'center', fontSize: 12, color: '#64748B', marginTop: 8 }}>
                💡 {isUrdu ? 'آپ اس ریڈر کے اندر ماؤس، کی بورڈ یا اسکرول بار سے تمام صفحات دیکھ سکتے ہیں، زوم کر سکتے ہیں اور تلاش کر سکتے ہیں۔' : 'Use mouse, keyboard arrows, or scroll to read all pages, zoom, or jump to any page.'}
              </div>
            </div>
          ) : readingBook.onlineArchiveUrl ? (
            /* B) VERIFIED WAQF DIGITAL ARCHIVE PORTAL (SHAMELA / MAKTABA-TUL-MADINA / ARCHIVE) */
            <div
              style={{
                padding: '24px',
                backgroundColor: '#F8FAFC',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#064E3B' }}>
                    🏛️ {isUrdu ? 'مستند وقف ڈیجیٹل نسخہ برائے علماء و محققین' : 'Verified Waqf Digital Archive Edition'}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2 }}>
                    ماخذ: <strong>{readingBook.onlineArchiveName || 'مکتبۃ المدینہ و الشاملہ ریسرچ ڈیسک'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={readingBook.onlineArchiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      backgroundColor: '#064E3B',
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>↗</span>
                    <span>{isUrdu ? 'مکمل اصل ایڈیشن کھولیں (نئی ونڈو)' : 'Open Complete Original Edition'}</span>
                  </a>
                </div>
              </div>

              {/* In-app embedded viewer for the verified online edition */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '750px',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <iframe
                  src={readingBook.onlineArchiveUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={readingBook.titleEnglish}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 10,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 12.5,
                  color: '#1E40AF',
                }}
              >
                <span>📜</span>
                <span>
                  <strong>{isUrdu ? 'تحقیقی ضمانت:' : 'Scholarly Verification:'}</strong>{' '}
                  {isUrdu
                    ? 'یہ نسخہ باضابطہ دارالافتاء و علمی مراکز سے مصدقہ اصل غیر محذوف ایڈیشن ہے۔ اگر آپ کے پاس اس کتاب کی اضافی پی ڈی ایف فائل موجود ہے تو آپ اسے بھی اپنے سسٹم میں براہِ راست لنک کر سکتے ہیں۔'
                    : 'This edition connects directly to the unabridged manuscript certified by orthodox Islamic academic libraries.'}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ padding: 20, textAlign: 'center', color: '#64748B' }}>
              {isUrdu ? 'مکمل نسخہ لوڈ ہو رہا ہے...' : 'Loading full edition...'}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#1F2937',
              borderBottom: '2px solid #E5E7EB',
              paddingBottom: 8,
              marginBottom: 16,
            }}
          >
            {isUrdu ? 'کتاب کے منتخب ابواب و مضامین' : 'Core Included Chapters'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {readingBook.coreChapters.map((ch) => (
              <div
                key={ch.chapterId}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: 16,
                  backgroundColor: '#F9FAFB',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => onSelectChapter(ch)}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#064E3B', marginBottom: 4 }}>
                    {ch.chapterNumber}. {isUrdu ? ch.titleUrdu : ch.titleEnglish}
                  </div>
                  <div style={{ fontSize: 12, color: '#059669', marginBottom: 4 }}>
                    {isUrdu ? ch.titleEnglish : ch.titleUrdu}
                  </div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>
                    {isUrdu ? ch.summaryUrdu : ch.summaryEnglish}
                  </div>
                </div>
                <button
                  style={{
                    backgroundColor: '#064E3B',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isUrdu ? 'مطالعہ کریں' : 'Read Chapter'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
