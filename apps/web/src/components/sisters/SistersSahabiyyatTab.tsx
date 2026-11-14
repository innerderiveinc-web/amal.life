import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SAHABIYYAT_PROFILES, SahabiyyatProfile } from '../../lib/women-sanctuary-data';
import { SistersSahabiyyahDetailModal } from './SistersSahabiyyahDetailModal';

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

type SahabiyyatCategory = 'all' | 'ummahat' | 'banat' | 'sahabiyyat' | 'quranic';

export function SistersSahabiyyatTab({
  isUrdu: propIsUrdu,
  onOpenSanad,
  onGenerateSahabiyyahCard,
}: SistersSahabiyyatTabProps) {
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();
  const isRtl = isUrdu || isArabic;
  const [selectedSahabiyyahForDetail, setSelectedSahabiyyahForDetail] = useState<SahabiyyatProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SahabiyyatCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categorize profiles deterministically
  const getProfileCategory = (sahId: string): SahabiyyatCategory => {
    if (['sah-01', 'sah-02', 'sah-04', 'sah-09'].includes(sahId)) return 'ummahat';
    if (['sah-03', 'sah-13', 'sah-14', 'sah-15'].includes(sahId)) return 'banat';
    if (['sah-05', 'sah-06', 'sah-07', 'sah-08', 'sah-10'].includes(sahId)) return 'sahabiyyat';
    if (['sah-11', 'sah-12'].includes(sahId)) return 'quranic';
    return 'sahabiyyat';
  };

  const filteredProfiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SAHABIYYAT_PROFILES.filter((sah) => {
      const cat = getProfileCategory(sah.id);
      if (selectedCategory !== 'all' && cat !== selectedCategory) return false;
      if (!q) return true;

      const normQ = q.replace(/[\u064B-\u065F\u0670]/g, '').trim();
      const inUrduName = (sah.nameUrdu || '').includes(normQ) || (sah.nameUrdu || '').includes(q);
      const inArName = (sah.nameArabic || '').includes(normQ) || (sah.nameArabic || '').includes(q);
      const inEnName = (sah.nameEnglish || '').toLowerCase().includes(q);
      const inTitle = (sah.titleUrdu || '').includes(normQ) || (sah.titleEnglish || '').toLowerCase().includes(q);
      const inBio = (sah.biographyUrdu || '').includes(normQ) || (sah.biographyEnglish || '').toLowerCase().includes(q);

      return inUrduName || inArName || inEnName || inTitle || inBio;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 1. Header Box & Category Filter */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#064E3B',
                margin: '0 0 6px 0',
              }}
            >
              {t(
                'Noble Role Models: The Sahabiyyat (Fazail & Biographies)',
                'اسوۂ صحابیات، امہات المؤمنین و بناتِ مصطفیٰ ﷺ (تفصیلی فضائل و مناقب)',
                'قدوة النساء: الصحابيات وأمهات المؤمنين (الفضائل والسير)',
                'Uswah-e-Sahabiyyat, Ummahat-ul-Momineen wa Banat-e-Rasool ﷺ'
              )}
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: '#4B5563', maxWidth: 880, lineHeight: 1.6 }}>
              {t(
                '15 towering female role models (Mothers of the Believers, all 4 Daughters of the Prophet ﷺ, noble Sahabiyyat, and Quranic paragons) with authentic Prophetic Hadiths in their praise, daily life Sunnah lessons, and classical scholarly citations.',
                'تاریخِ اسلام کی ۱۵ درخشندہ و برگزیدہ خواتین (امہات المؤمنین، بناتِ اربعہ، جلیل القدر صحابیات و قرآنی نمونے) جن کے تفصیلی فضائل، فرامینِ مصطفیٰ ﷺ، روزمرہ زندگی کے سنہری اسباق اور ائمۂ اہل سنت کے اقوال یہاں مدلل و مستند درج ہیں۔',
                '١٥ نموذجاً نسائياً رائداً في تاريخ الإسلام من أمهات المؤمنين وبنات النبي ﷺ والصحابيات الجليلات مع الأحاديث النبوية الصحيحة في مناقبهن.',
                'Tareekh-e-Islam ki 15 darakhshandah khawateen (Ummahat-ul-Momineen, Banat-e-Mustafa, Sahabiyyat) jinke fazail, Farameen-e-Mustafa ﷺ aur sunheri asbaaq yahan darj hain.'
              )}
            </p>
          </div>
        </div>

        {/* Category Filter Pills & Search */}
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { id: 'all', label: t('All 15 Figures', 'تمام ۱۵ برگزیدہ ہستیاں', 'جميع الشخصيات (١٥)', 'All 15 Personalities') },
              { id: 'ummahat', label: t('Mothers of Believers (4)', 'امہات المؤمنین (۴)', 'أمهات المؤمنين (٤)', 'Ummahat-ul-Momineen (4)') },
              { id: 'banat', label: t('Holy Daughters (4)', 'بناتِ مصطفیٰ ﷺ (۴)', 'بنات النبي ﷺ (٤)', 'Banat-e-Mustafa ﷺ (4)') },
              { id: 'sahabiyyat', label: t('Noble Sahabiyyat (5)', 'جلیل القدر صحابیات (۵)', 'الصحابيات الجليلات (٥)', 'Jaleel-ul-Qadr Sahabiyyat (5)') },
              { id: 'quranic', label: t('Qur\'anic Exemplars (2)', 'قرآنی برگزیدہ شخصیات (۲)', 'القدوات القرآنية (٢)', 'Qurani Paragons (2)') },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as SahabiyyatCategory)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: selectedCategory === cat.id ? 700 : 600,
                  border: selectedCategory === cat.id ? '1px solid #064E3B' : '1px solid #E5E7EB',
                  backgroundColor: selectedCategory === cat.id ? '#064E3B' : '#F9FAFB',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', minWidth: 240 }}>
            <span style={{ position: 'absolute', left: isRtl ? undefined : 10, right: isRtl ? 10 : undefined, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search by name: Khadijah, Fatimah...', 'نام سے تلاش کریں: خدیجہ، عائشہ، فاطمہ...', 'بحث بالاسم...', 'Naam se talash karein...')}
              style={{
                width: '100%',
                padding: isRtl ? '7px 32px 7px 12px' : '7px 12px 7px 32px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: 12.5,
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Grid of Sahabiyyat Cards with Prominent Fazail */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 18,
        }}
      >
        {filteredProfiles.map((sah) => (
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
              {/* Header Badges */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                  gap: 8,
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
                  {t(sah.titleEnglish, sah.titleUrdu, sah.titleUrdu, sah.titleEnglish)}
                </span>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{sah.era}</span>
              </div>

              {/* Name & Revered Title */}
              <h3
                style={{
                  fontSize: 21,
                  fontWeight: 800,
                  color: '#064E3B',
                  margin: '4px 0',
                }}
              >
                {isArabic ? sah.nameArabic : isUrdu ? sah.nameUrdu : sah.nameEnglish}
              </h3>
              {!isArabic && (
                <div
                  style={{
                    fontSize: 12.5,
                    color: '#059669',
                    fontWeight: 600,
                    marginBottom: 4,
                    direction: 'rtl',
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                >
                  {sah.nameArabic}
                </div>
              )}
              <div
                style={{
                  fontSize: 12,
                  color: '#4B5563',
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {isRtl ? sah.kinshipToProphet : (sah.kinshipToProphetEnglish || sah.kinshipToProphet)}
              </div>

              {/* Heroic Attributes Pills */}
              {sah.heroicAttributes && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                  {((isRtl ? sah.heroicAttributes : (sah.heroicAttributesEnglish || sah.heroicAttributes)) || []).map((attr, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: '#EFF6FF',
                        color: '#1D4ED8',
                        padding: '2px 8px',
                        borderRadius: 6,
                        border: '1px solid #DBEAFE',
                      }}
                    >
                      ✨ {attr}
                    </span>
                  ))}
                </div>
              )}

              {/* Concise Biography Overview */}
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: '#374151',
                  marginBottom: 14,
                  textAlign: isRtl ? 'right' : 'left',
                  direction: isRtl ? 'rtl' : 'ltr',
                }}
              >
                {(isUrdu || isArabic) ? sah.biographyUrdu : sah.biographyEnglish}
              </p>

              {/* PROMINENT FAZAIL: PROPHETIC HADITH BOX */}
              {sah.propheticPraiseHadithArabic && (
                <div
                  style={{
                    backgroundColor: '#FFFDF2',
                    border: '1px solid #FDE68A',
                    borderRadius: 10,
                    padding: '12px 14px',
                    marginBottom: 14,
                    boxShadow: '0 2px 6px rgba(217, 119, 6, 0.06)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 800,
                      color: '#B45309',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <span>👑</span>
                    <span>
                      {t(
                        'Prophetic Praise (Fazail & Manqabat):',
                        'فرمانِ رسول اللہ ﷺ میں فضیلت و شان:',
                        'المدائح النبوية والفضائل ﷺ:',
                        'Farman-e-Rasool ﷺ Mein Fazilat:'
                      )}
                    </span>
                  </div>

                  {/* Vocalized Sacred Arabic Matn */}
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
                      fontSize: 16,
                      color: '#1E293B',
                      lineHeight: 1.9,
                      marginBottom: 6,
                      textAlign: 'right',
                    }}
                  >
                    {sah.propheticPraiseHadithArabic}
                  </div>

                  {/* Accessible Translation */}
                  <div
                    style={{
                      fontSize: 13,
                      color: '#4B5563',
                      lineHeight: 1.6,
                      direction: isRtl ? 'rtl' : 'ltr',
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    <strong>{t('Tarjuma: ', 'ترجمہ: ', 'الترجمة: ', 'Tarjuma: ')}</strong>
                    {(isUrdu || isArabic) ? sah.propheticPraiseHadithUrdu : sah.propheticPraiseHadithEnglish}
                  </div>

                  {sah.propheticPraiseSource && (
                    <div
                      style={{
                        fontSize: 11,
                        color: '#92400E',
                        fontWeight: 700,
                        marginTop: 6,
                        textAlign: isRtl ? 'left' : 'right',
                      }}
                    >
                      {sah.propheticPraiseSource}
                    </div>
                  )}
                </div>
              )}

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
                  {t(
                    '3 Daily Life Sunnah Lessons:',
                    'روزمرہ زندگی کے لیے ۳ سنہری اسباق:',
                    '٣ دروس سنية للحياة اليومية:',
                    'Rozmarrah Zindagi ke liye 3 Sunheri Asbaaq:'
                  )}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingInlineStart: 18,
                    fontSize: 13,
                    color: '#1F2937',
                    lineHeight: 1.6,
                    direction: isRtl ? 'rtl' : 'ltr',
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                >
                  {sah.dailySunnahLessons.map((lesson, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>
                      {(isUrdu || isArabic) ? lesson.ur : lesson.en}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Primary Scholarly Biography Trigger */}
              <button
                onClick={() => setSelectedSahabiyyahForDetail(sah)}
                style={{
                  width: '100%',
                  backgroundColor: '#064E3B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 2px 6px rgba(6, 78, 59, 0.2)',
                  transition: 'background 0.2s',
                }}
              >
                <span>📖</span>
                <span>
                  {t(
                    'Read Exhaustive Scholarly Biography',
                    'مفصل سوانح و فضائل پڑھیں',
                    'قراءة السيرة المفصلة',
                    'Mufassal Sawanih wa Fazail Padhein'
                  )}
                </span>
              </button>
            </div>

            {/* Bottom Citation & Action Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #F3F4F6',
                paddingTop: 10,
                flexWrap: 'wrap',
                gap: 8,
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
                  <span>{t('Wisdom Card', 'حکمت کارڈ', 'بطاقة الحكمة', 'Hikmat Card')}</span>
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span>📜</span>
                  <span>{t('Sanad Certificate', 'سندِ تصدیق', 'شهادة السند', 'Sanad-e-Tasdeeq')}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSahabiyyahForDetail && (
        <SistersSahabiyyahDetailModal
          sah={selectedSahabiyyahForDetail}
          isUrdu={isUrdu}
          onClose={() => setSelectedSahabiyyahForDetail(null)}
          onOpenSanad={onOpenSanad}
          onGenerateCard={onGenerateSahabiyyahCard}
        />
      )}
    </div>
  );
}
