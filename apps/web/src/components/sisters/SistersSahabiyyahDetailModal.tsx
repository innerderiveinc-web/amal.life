import React, { useState, useEffect } from 'react';
import { SahabiyyatProfile } from '../../lib/women-sanctuary-data';
import { saveBookmark, isBookmarked, recordReadingHistory } from '../../lib/bookmarks-store';
import { showAmalToast } from '../Toast';

interface SistersSahabiyyahDetailModalProps {
  sah: SahabiyyatProfile;
  isUrdu: boolean;
  onClose: () => void;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => void;
  onGenerateCard: (sah: SahabiyyatProfile) => void;
}

export function SistersSahabiyyahDetailModal({
  sah,
  isUrdu,
  onClose,
  onOpenSanad,
  onGenerateCard,
}: SistersSahabiyyahDetailModalProps) {
  const [activeSection, setActiveSection] = useState<'bio' | 'hadith' | 'milestones' | 'scholars' | 'lessons'>('bio');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (sah) {
      setIsSaved(isBookmarked(`sah_${sah.id}`));
      recordReadingHistory({
        id: `sah_${sah.id}`,
        titleUrdu: sah.nameUrdu,
        titleEnglish: sah.nameEnglish,
        categoryLabel: 'Sahabiyyat',
        routeUrl: '/sisters',
      });
    }
  }, [sah]);

  const handleToggleBookmark = () => {
    const saved = saveBookmark({
      id: `sah_${sah.id}`,
      category: 'sahabiyyat',
      titleArabic: sah.nameArabic,
      titleUrdu: sah.nameUrdu,
      titleEnglish: sah.nameEnglish,
      sourceOrAuthor: sah.titleUrdu,
      targetId: sah.id,
      excerpt: sah.biographyUrdu.slice(0, 80) + '...',
    });
    setIsSaved(saved);
    showAmalToast(
      saved
        ? (isUrdu ? 'سوانح محفوظ کر لی گئی (Bookmarked)' : 'Biography saved to bookmarks')
        : (isUrdu ? 'بک مارک ہٹا دیا گیا' : 'Bookmark removed'),
      saved ? 'success' : 'info'
    );
  };

  const paragraphsUrdu = sah.exhaustiveBiographyUrdu || [sah.biographyUrdu];
  const paragraphsEnglish = sah.exhaustiveBiographyEnglish || [sah.biographyEnglish];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 46, 22, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          width: '100%',
          maxWidth: 820,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          border: '1px solid #D1FAE5',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064E3B 0%, #047857 60%, #059669 100%)',
            color: '#FFFFFF',
            padding: '24px 28px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: isUrdu ? 18 : 'auto',
              right: isUrdu ? 'auto' : 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <button
              onClick={handleToggleBookmark}
              style={{
                background: isSaved ? '#FEF3C7' : 'rgba(255, 255, 255, 0.15)',
                color: isSaved ? '#92400E' : '#FFFFFF',
                border: isSaved ? '1px solid #FDE68A' : 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                transition: 'all 0.2s',
              }}
              title={isSaved ? 'Remove Bookmark' : 'Save for Later'}
            >
              <span>{isSaved ? '🔖' : '📑'}</span>
              <span>{isSaved ? (isUrdu ? 'محفوظ شدہ' : 'Saved') : (isUrdu ? 'بک مارک' : 'Bookmark')}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                color: '#FFFFFF',
                fontSize: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span
              style={{
                backgroundColor: 'rgba(251, 191, 36, 0.25)',
                color: '#FDE68A',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                padding: '3px 12px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              {isUrdu ? sah.titleUrdu : sah.titleEnglish}
            </span>
            <span style={{ fontSize: 13, color: '#A7F3D0' }}>{sah.era}</span>
          </div>

          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              margin: '0 0 4px 0',
              fontFamily: isUrdu ? "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" : 'inherit',
              lineHeight: 1.4,
            }}
          >
            {isUrdu ? sah.nameUrdu : sah.nameEnglish}
          </h2>

          <div style={{ fontSize: 14, color: '#D1FAE5', fontWeight: 600, direction: 'rtl' }}>
            {sah.nameArabic}
          </div>

          <div style={{ fontSize: 13, color: '#A7F3D0', marginTop: 6 }}>
            {sah.kinshipToProphet}
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            padding: '0 16px',
            overflowX: 'auto',
            gap: 4,
          }}
        >
          <button
            onClick={() => setActiveSection('bio')}
            style={{
              padding: '12px 16px',
              border: 'none',
              borderBottom: activeSection === 'bio' ? '3px solid #047857' : '3px solid transparent',
              backgroundColor: 'transparent',
              color: activeSection === 'bio' ? '#064E3B' : '#6B7280',
              fontWeight: activeSection === 'bio' ? 700 : 500,
              fontSize: 14,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            📖 {isUrdu ? 'مفصل سوانحِ حیات' : 'Detailed Biography'}
          </button>

          {sah.propheticPraiseHadithArabic && (
            <button
              onClick={() => setActiveSection('hadith')}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderBottom: activeSection === 'hadith' ? '3px solid #047857' : '3px solid transparent',
                backgroundColor: 'transparent',
                color: activeSection === 'hadith' ? '#064E3B' : '#6B7280',
                fontWeight: activeSection === 'hadith' ? 700 : 500,
                fontSize: 14,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              ✨ {isUrdu ? 'فرمانِ مصطفیٰ ﷺ' : 'Prophetic Praise'}
            </button>
          )}

          {sah.majorHistoricalMilestones && sah.majorHistoricalMilestones.length > 0 && (
            <button
              onClick={() => setActiveSection('milestones')}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderBottom: activeSection === 'milestones' ? '3px solid #047857' : '3px solid transparent',
                backgroundColor: 'transparent',
                color: activeSection === 'milestones' ? '#064E3B' : '#6B7280',
                fontWeight: activeSection === 'milestones' ? 700 : 500,
                fontSize: 14,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              🏛️ {isUrdu ? 'تاریخی سنگِ میل' : 'Historical Milestones'}
            </button>
          )}

          {sah.classicalScholarlyEndorsements && sah.classicalScholarlyEndorsements.length > 0 && (
            <button
              onClick={() => setActiveSection('scholars')}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderBottom: activeSection === 'scholars' ? '3px solid #047857' : '3px solid transparent',
                backgroundColor: 'transparent',
                color: activeSection === 'scholars' ? '#064E3B' : '#6B7280',
                fontWeight: activeSection === 'scholars' ? 700 : 500,
                fontSize: 14,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              📜 {isUrdu ? 'کبار ائمہ کی توثیق' : 'Scholarly Testimonies'}
            </button>
          )}

          <button
            onClick={() => setActiveSection('lessons')}
            style={{
              padding: '12px 16px',
              border: 'none',
              borderBottom: activeSection === 'lessons' ? '3px solid #047857' : '3px solid transparent',
              backgroundColor: 'transparent',
              color: activeSection === 'lessons' ? '#064E3B' : '#6B7280',
              fontWeight: activeSection === 'lessons' ? 700 : 500,
              fontSize: 14,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            💡 {isUrdu ? 'عملی اسباق' : 'Daily Sunnah Lessons'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            padding: '24px 28px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* SECTION: BIOGRAPHY */}
          {activeSection === 'bio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sah.lineageAndBackgroundUrdu && (
                <div
                  style={{
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: 12,
                    padding: '16px 20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#166534',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>🌿</span>
                    <span>{isUrdu ? 'مبارک نسب و خاندانی پس منظر' : 'Noble Lineage & Background'}</span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: '#1F2937',
                      textAlign: isUrdu ? 'right' : 'left',
                      direction: isUrdu ? 'rtl' : 'ltr',
                    }}
                  >
                    {isUrdu ? sah.lineageAndBackgroundUrdu : sah.lineageAndBackgroundEnglish}
                  </p>
                </div>
              )}

              <div>
                <h4
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#064E3B',
                    margin: '0 0 12px 0',
                    borderBottom: '2px solid #E5E7EB',
                    paddingBottom: 6,
                  }}
                >
                  {isUrdu ? 'سیرت و سوانح کی مفصل علمی تفصیلات' : 'Exhaustive Biographical Treatise'}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {(isUrdu ? paragraphsUrdu : paragraphsEnglish).map((paragraph, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: 15,
                        lineHeight: 1.9,
                        color: '#1F2937',
                        textAlign: isUrdu ? 'right' : 'left',
                        direction: isUrdu ? 'rtl' : 'ltr',
                        padding: '10px 14px',
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                        borderRadius: 8,
                        borderLeft: !isUrdu ? '3px solid #059669' : 'none',
                        borderRight: isUrdu ? '3px solid #059669' : 'none',
                      }}
                    >
                      {paragraph}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sourced from Classical Reference */}
              <div
                style={{
                  backgroundColor: '#F3F4F6',
                  borderRadius: 10,
                  padding: '10px 16px',
                  fontSize: 12,
                  color: '#4B5563',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  <strong>{isUrdu ? 'مستند مآخذ و حوالہ:' : 'Classical Reference:'}</strong> {sah.classicalCitation}
                </span>
                <span style={{ fontFamily: 'monospace', color: '#047857' }}>{sah.sanadVerificationHash}</span>
              </div>
            </div>
          )}

          {/* SECTION: PROPHETIC PRAISE */}
          {activeSection === 'hadith' && sah.propheticPraiseHadithArabic && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#B45309',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>👑</span>
                  <span>{isUrdu ? 'فرمانِ رسول اللہ ﷺ میں شان و منقبت' : 'Prophetic Hadith in Praise & Virtues'}</span>
                </div>

                <div
                  style={{
                    fontSize: 20,
                    lineHeight: 2.1,
                    color: '#1E293B',
                    fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade', serif",
                    direction: 'rtl',
                    textAlign: 'center',
                    padding: '16px 20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    border: '1px dashed #FCD34D',
                    marginBottom: 16,
                  }}
                >
                  {sah.propheticPraiseHadithArabic}
                </div>

                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: '#374151',
                    marginBottom: 10,
                    direction: isUrdu ? 'rtl' : 'ltr',
                    textAlign: isUrdu ? 'right' : 'left',
                  }}
                >
                  <strong>{isUrdu ? 'اردو ترجمہ:' : 'Urdu Meaning:'} </strong>
                  {sah.propheticPraiseHadithUrdu}
                </div>

                {sah.propheticPraiseHadithEnglish && (
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: '#4B5563',
                      borderTop: '1px solid #FEF3C7',
                      paddingTop: 10,
                    }}
                  >
                    <strong>English Translation: </strong>
                    {sah.propheticPraiseHadithEnglish}
                  </div>
                )}

                {sah.propheticPraiseSource && (
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 12,
                      color: '#92400E',
                      fontWeight: 700,
                      textAlign: 'right',
                    }}
                  >
                    {sah.propheticPraiseSource}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: MILESTONES */}
          {activeSection === 'milestones' && sah.majorHistoricalMilestones && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#064E3B',
                  margin: 0,
                }}
              >
                {isUrdu ? 'تاریخی کارنامے اور اہم سنگِ میل' : 'Historical Achievements & Milestones'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sah.majorHistoricalMilestones.map((ms, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      backgroundColor: '#FFFFFF',
                      padding: 16,
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#ECFDF5',
                        color: '#047857',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>

                    <div style={{ flex: 1, direction: isUrdu ? 'rtl' : 'ltr', textAlign: isUrdu ? 'right' : 'left' }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: '#064E3B',
                          marginBottom: 4,
                        }}
                      >
                        {isUrdu ? ms.eventTitleUrdu : ms.eventTitleEnglish}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7 }}>
                        {isUrdu ? ms.descriptionUrdu : ms.descriptionEnglish}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SCHOLARLY ENDORSEMENTS */}
          {activeSection === 'scholars' && sah.classicalScholarlyEndorsements && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#064E3B',
                  margin: 0,
                }}
              >
                {isUrdu ? 'کبار ائمہ و محدثین کے ارشادات و توثیق' : 'Classical Scholars & Muhaddithin Testimonies'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {sah.classicalScholarlyEndorsements.map((sc, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: 12,
                      padding: 18,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                        borderBottom: '1px solid #E2E8F0',
                        paddingBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#1E293B' }}>
                        {isUrdu ? sc.scholarNameUrdu : sc.scholarNameEnglish}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: '#047857',
                          backgroundColor: '#ECFDF5',
                          padding: '2px 8px',
                          borderRadius: 6,
                          fontWeight: 600,
                        }}
                      >
                        {sc.bookTitle}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.8,
                        color: '#334155',
                        fontStyle: 'italic',
                        direction: isUrdu ? 'rtl' : 'ltr',
                        textAlign: isUrdu ? 'right' : 'left',
                      }}
                    >
                      "{isUrdu ? sc.verbatimQuoteUrdu : sc.verbatimQuoteEnglish}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SUNNAH LESSONS */}
          {activeSection === 'lessons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h4
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#064E3B',
                  margin: 0,
                }}
              >
                {isUrdu ? 'روزمرہ زندگی کے عملی سنہری اسباق' : 'Daily Sunnah & Moral Lessons'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sah.dailySunnahLessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: 12,
                      padding: 16,
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>🌸</span>
                    <div style={{ flex: 1, direction: isUrdu ? 'rtl' : 'ltr', textAlign: isUrdu ? 'right' : 'left' }}>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#14532D', fontWeight: 600 }}>
                        {isUrdu ? lesson.ur : lesson.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {sah.heroicAttributes && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4B5563', marginBottom: 8 }}>
                    {isUrdu ? 'نمایاں ایمانی خصوصیات:' : 'Heroic Attributes:'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {sah.heroicAttributes.map((attr, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#E0E7FF',
                          color: '#3730A3',
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: 20,
                        }}
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            borderTop: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onGenerateCard(sah)}
              style={{
                backgroundColor: '#FDF2F8',
                color: '#9D174D',
                border: '1px solid #FBCFE8',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>🎨</span>
              <span>{isUrdu ? 'حکمت کارڈ بنائیں' : 'Generate Wisdom Card'}</span>
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
                  'صحیح بخاری، مسلم، الاصابہ اور ابن سعد کی مستند اسناد سے تصدیق شدہ'
                )
              }
              style={{
                backgroundColor: '#ECFDF5',
                color: '#064E3B',
                border: '1px solid #A7F3D0',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>✓</span>
              <span>{isUrdu ? 'مستند سند ملاحظہ کریں' : 'Verify Sanad'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: '#047857',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 20px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isUrdu ? 'مکمل پڑھ لیا (بند کریں)' : 'Done (Close)'}
          </button>
        </div>
      </div>
    </div>
  );
}