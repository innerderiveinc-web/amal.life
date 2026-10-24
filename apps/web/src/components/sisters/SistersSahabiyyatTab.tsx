import React from 'react';
import { SAHABIYYAT_PROFILES, SahabiyyatProfile } from '../../lib/women-sanctuary-data';

interface SistersSahabiyyatTabProps {
  isUrdu: boolean;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => void;
  onGenerateSahabiyyahCard: (sah: SahabiyyatProfile) => void;
}

export function SistersSahabiyyatTab({
  isUrdu,
  onOpenSanad,
  onGenerateSahabiyyahCard,
}: SistersSahabiyyatTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#064E3B',
            margin: '0 0 6px 0',
          }}
        >
          {isUrdu ? 'اسوۂ صحابیات و امہات المؤمنین رضی اللہ عنہن' : 'Noble Role Models: The Sahabiyyat'}
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
          {isUrdu
            ? 'تاریخِ اسلام کی ۱۰ درخشندہ خواتین جنہوں نے ایمان، علم، شجاعت اور خدمتِ خلق میں وہ نقوش چھوڑے جو رہتی دنیا تک ہر مسلمان عورت کے لیے مشعلِ راہ ہیں۔'
            : '10 towering female role models who exemplified faith, juristic intellect, bravery, and humanitarian service.'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 16,
        }}
      >
        {SAHABIYYAT_PROFILES.map((sah) => (
          <div
            key={sah.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 20,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    backgroundColor: '#FDF2F8',
                    color: '#9D174D',
                    padding: '3px 8px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {isUrdu ? sah.titleUrdu : sah.titleEnglish}
                </span>
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>{sah.era}</span>
              </div>

              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#064E3B',
                  margin: '4px 0',
                }}
              >
                {isUrdu ? sah.nameUrdu : sah.nameEnglish}
              </h3>
              <div
                style={{
                  fontSize: 12,
                  color: '#059669',
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {isUrdu ? sah.nameEnglish : sah.nameArabic}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#4B5563',
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {sah.kinshipToProphet}
              </div>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: '#374151',
                  marginBottom: 14,
                }}
              >
                {isUrdu ? sah.biographyUrdu : sah.biographyEnglish}
              </p>

              {/* 3 Practical Daily Sunnah Lessons */}
              <div
                style={{
                  backgroundColor: '#F9FAFB',
                  padding: 12,
                  borderRadius: 10,
                  border: '1px solid #F3F4F6',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#064E3B',
                    marginBottom: 6,
                  }}
                >
                  {isUrdu ? 'روزمرہ زندگی کے لیے ۳ سنہری اسباق:' : '3 Daily Life Sunnah Lessons:'}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingInlineStart: 18,
                    fontSize: 13,
                    color: '#1F2937',
                    lineHeight: 1.6,
                  }}
                >
                  {sah.dailySunnahLessons.map((lesson, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>
                      {isUrdu ? lesson.ur : lesson.en}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #F3F4F6',
                paddingTop: 10,
              }}
            >
              <span style={{ fontSize: 11, color: '#6B7280' }}>
                {sah.classicalCitation}
              </span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button
                  onClick={() => onGenerateSahabiyyahCard(sah)}
                  style={{
                    backgroundColor: '#FDF2F8',
                    color: '#9D174D',
                    border: '1px solid #FBCFE8',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span>🎨</span>
                  <span>{isUrdu ? 'حکمت کارڈ' : 'Wisdom Card'}</span>
                </button>

                <button
                  onClick={() =>
                    onOpenSanad(
                      sah.nameUrdu,
                      sah.titleUrdu,
                      sah.sanadVerificationHash,
                      sah.classicalCitation,
                      sah.biographyUrdu,
                      sah.biographyEnglish,
                      'صحیح بخاری، مسلم اور ابن سعد کی مستند اسناد سے تصدیق شدہ'
                    )
                  }
                  style={{
                    backgroundColor: '#ECFDF5',
                    color: '#064E3B',
                    border: '1px solid #A7F3D0',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ✓ {isUrdu ? 'مستند سند' : 'Sanad'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
