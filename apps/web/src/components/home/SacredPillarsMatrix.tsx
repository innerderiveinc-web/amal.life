import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export const SacredPillarsMatrix: React.FC = () => {
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();

  const pillars = [
    {
      id: 'ibadah',
      number: '1',
      icon: '🕋',
      titleUrdu: 'عبادات و معمولات',
      titleEnglish: 'Worship & Daily Rhythm',
      titleArabic: 'العبادات والمعاملات اليومية',
      titleRoman: 'Ibadat wa Ma\'moolat',
      subtitleUrdu: 'اوقاتِ نماز، قبلہ، مسنون اذکار، تسبیح، ہجری تاریخ اور روزے',
      subtitleEnglish: 'Precise solar prayer times, Qibla azimuth, morning/evening adhkar & fasting.',
      subtitleArabic: 'مواقيت الصلاة الدقيقة، اتجاه القبلة، أذكار الصباح والمساء، المسبحة والصيام.',
      subtitleRoman: 'Auqat-e-namaz, qiblah, masnoon adhkar, tasbih, hijri calendar aur rozey.',
      color: '#065F46',
      bgLight: '#F0FDF4',
      borderLight: '#BBF7D0',
      badgeBg: '#DCFCE7',
      primaryLink: '/prayer',
      links: [
        { labelUrdu: 'اوقات و قبلہ', labelEn: 'Prayer & Qibla', labelAr: 'الصلاة والقبلة', labelRoman: 'Auqat wa Qiblah', href: '/prayer' },
        { labelUrdu: 'اذکارِ مسنون', labelEn: 'Daily Adhkar', labelAr: 'الأذكار المسنونة', labelRoman: 'Adhkar-e-Masnoon', href: '/adhkar' },
        { labelUrdu: 'تسبیح کاؤنٹر', labelEn: 'Tasbih', labelAr: 'المسبحة', labelRoman: 'Tasbih Counter', href: '/tasbih' },
        { labelUrdu: 'ہجری روزے', labelEn: 'Hijri Fasting', labelAr: 'التقويم والصيام', labelRoman: 'Hijri Rozey', href: '/calendar' },
        { labelUrdu: 'حج و عمرہ', labelEn: 'Hajj Pilgrimage', labelAr: 'الحج والعمرة', labelRoman: 'Hajj wa Umrah', href: '/hajj' },
      ],
    },
    {
      id: 'quran',
      number: '2',
      icon: '📖',
      titleUrdu: 'قرآن و علومِ سلف',
      titleEnglish: 'Al-Quran & Sacred Knowledge',
      titleArabic: 'القرآن الكريم وعلوم السلف',
      titleRoman: 'Quran wa Uloom-e-Salaf',
      subtitleUrdu: '۱۱۴ سورتیں، کنز الایمان، ۴ قراء آڈیو، تجوید و مخارج، اور ۱۰۶ معتبر کتب',
      subtitleEnglish: '114 Surahs with Kanz-ul-Iman, 4 master reciters, word-by-word tajweed & classical canon.',
      subtitleArabic: '١١٤ سورة مع كنز الإيمان، ٤ قراء معتمدين، أحكام التجويد، والمكتبة الجامعة.',
      subtitleRoman: '114 Suratein, Kanz-ul-Iman, 4 Qurra audio, tajweed wa makharij, aur 106 kutub.',
      color: '#1E40AF',
      bgLight: '#EFF6FF',
      borderLight: '#BFDBFE',
      badgeBg: '#DBEAFE',
      primaryLink: '/quran',
      links: [
        { labelUrdu: 'قرآنِ کریم', labelEn: 'Read Quran', labelAr: 'تلاوة القرآن', labelRoman: 'Quran Kareem', href: '/quran' },
        { labelUrdu: 'تجوید و مخارج', labelEn: 'Tajweed', labelAr: 'التجويد والمخارج', labelRoman: 'Tajweed wa Makharij', href: '/quran?tab=tajweed' },
        { labelUrdu: 'حکمت کارڈز', labelEn: 'Wisdom Cards', labelAr: 'بطاقات الحكمة', labelRoman: 'Hikmat Cards', href: '/wisdom' },
        { labelUrdu: 'کتب خانہ', labelEn: 'Classical Canon', labelAr: 'المكتبة المعتمدة', labelRoman: 'Kutub Khana', href: '/library' },
        { labelUrdu: 'سیرت النبی ﷺ', labelEn: 'Living Sirah', labelAr: 'السيرة النبوية', labelRoman: 'Sirat-un-Nabi ﷺ', href: '/sirah' },
        { labelUrdu: 'درس نوٹس', labelEn: 'Dars Vault', labelAr: 'خزانة الدروس', labelRoman: 'Dars Notes Vault', href: '/vault' },
      ],
    },
    {
      id: 'family',
      number: '3',
      icon: '🌸',
      titleUrdu: 'خاندان و گوشۂ نسواں',
      titleEnglish: 'Family & Sisters Sanctuary',
      titleArabic: 'الأسرة وواحة المرأة المسلمة',
      titleRoman: 'Khandan wa Gosha-e-Niswan',
      subtitleUrdu: '۲۰ کتبِ نسواں، ۱۵ جلیل القدر صحابیات، احکامِ طہارت، اور خاندانی معمولات',
      subtitleEnglish: '20 classical women masterworks, 15 Sahabiyyat models, purity fiqh & family OS.',
      subtitleArabic: '٢٠ كتاباً معتمداً، ١٥ صحابية جليلة، أحكام الطهارة والحيض، والتربية الأسرية.',
      subtitleRoman: '20 kutub-e-niswan, 15 jaleel-ul-qadr sahabiyyat, ahkam-e-taharah, aur family tarbiyat.',
      color: '#831843',
      bgLight: '#FFF1F2',
      borderLight: '#FECDD3',
      badgeBg: '#FCE7F3',
      primaryLink: '/sisters',
      links: [
        { labelUrdu: 'گوشۂ خواتین', labelEn: 'Sisters Sanctuary', labelAr: 'واحة المرأة', labelRoman: 'Gosha-e-Khawateen', href: '/sisters' },
        { labelUrdu: '۲۰ کتبِ نسواں', labelEn: '20 Books', labelAr: '٢٠ كتاباً', labelRoman: '20 Kutub-e-Niswan', href: '/sisters?tab=library' },
        { labelUrdu: '۱۵ صحابیات', labelEn: '15 Sahabiyyat', labelAr: '١٥ صحابية', labelRoman: '15 Sahabiyyat', href: '/sisters?tab=sahabiyyat' },
        { labelUrdu: 'احکامِ طہارت', labelEn: 'Purity Fiqh', labelAr: 'أحكام الطهارة', labelRoman: 'Ahkam-e-Taharah', href: '/sisters?tab=fiqh' },
        { labelUrdu: 'ماؤں کی دعائیں', labelEn: 'Family Duas', labelAr: 'أدعية الأمهات', labelRoman: 'Maaon ki Duayein', href: '/sisters?tab=duas' },
        { labelUrdu: 'فیملی سرکل', labelEn: 'Family Circle', labelAr: 'دائرة الأسرة', labelRoman: 'Family Circle', href: '/family' },
      ],
    },
    {
      id: 'ahkam',
      number: '4',
      icon: '⚖️',
      titleUrdu: 'احکام، میراث و سلوک',
      titleEnglish: 'Fiqh, Miras & Suluk Journeys',
      titleArabic: 'الأحكام والمواريث والرحلات الإيمانية',
      titleRoman: 'Ahkam, Miras wa Suluk',
      subtitleUrdu: 'زکوٰۃ و سونا، میراث کی شرعی تقسیم، قضائے عمری، اور ۱۴ روزہ دینی اسفار',
      subtitleEnglish: 'Gold jewelry zakat, Islamic inheritance shares, lifetime missed prayers & journeys.',
      subtitleArabic: 'حاسبة الزكاة والذهب، قسمة المواريث الشرعية، قضاء الفوائت، والرحلات الإيمانية.',
      subtitleRoman: 'Zakat wa sona, miras ki shar\'i taqseem, qadha-e-umri, aur 14-roza deeni asfar.',
      color: '#92400E',
      bgLight: '#FEF3C7',
      borderLight: '#FDE68A',
      badgeBg: '#FEF9C3',
      primaryLink: '/calculator',
      links: [
        { labelUrdu: 'زکوٰۃ و سونا', labelEn: 'Zakat & Gold', labelAr: 'الزكاة والذهب', labelRoman: 'Zakat wa Sona', href: '/calculator?tab=zakat' },
        { labelUrdu: 'شرعی تقسیمِ میراث', labelEn: 'Miras Shares', labelAr: 'قسمة المواريث', labelRoman: 'Shar\'i Taqseem-e-Miras', href: '/calculator?tab=miras' },
        { labelUrdu: 'قضائے عمری', labelEn: 'Qadha Calculator', labelAr: 'قضاء الفوائت', labelRoman: 'Qadha-e-Umri', href: '/calculator?tab=qadha' },
        { labelUrdu: 'ڈیسیژن روم', labelEn: 'Decision Room', labelAr: 'غرفة القرارات', labelRoman: 'Decision Room', href: '/decision-room' },
        { labelUrdu: '۱۴ روزہ اسفار', labelEn: '14-Day Journeys', labelAr: 'رحلات ١٤ يوماً', labelRoman: '14-Day Asfar', href: '/journeys' },
        { labelUrdu: 'دینی اہداف', labelEn: 'Niyyah Goals', labelAr: 'الأهداف والنيات', labelRoman: 'Deeni Ahdaf', href: '/goals' },
      ],
    },
  ];

  const getPillarTitle = (p: typeof pillars[0]) => {
    return t(p.titleEnglish, p.titleUrdu, p.titleArabic, p.titleRoman);
  };

  const getPillarSubtitle = (p: typeof pillars[0]) => {
    return t(p.subtitleEnglish, p.subtitleUrdu, p.subtitleArabic, p.subtitleRoman);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: '24px 22px',
        border: '1px solid #E2E8F0',
        marginBottom: 24,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#065F46',
              letterSpacing: 1.2,
              textTransform: 'uppercase',
            }}
          >
            {t('THE 4 SACRED PILLARS', 'چار بنیادی دینی ستون', 'الأركان الأربعة الأساسية', 'Chaar Bunyadi Deeni Sutoon')}
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>
            {t(
              'Core Life Dimensions — Amal OS Gateways',
              'دینی و عملی شعبہ جات — مربوط نظامِ حیات',
              'أبعاد الحياة الإيمانية — بوابات نظام أمل',
              'Deeni wa Amali Shobajat — Marboot Nizam-e-Hayat'
            )}
          </h2>
        </div>
        <span style={{ fontSize: 13, color: '#64748B' }}>
          {t(
            'Worship, Quran & Heritage, Family & Sanctuary, Fiqh & Suluk',
            'عبادت، علم و قرآن، خاندان و نسواں، اور مالی و باطنی احکام',
            'العبادة والقرآن والأسرة والمواريث والسلوك',
            'Ibadat, Ilm wa Quran, Khandan wa Niswan, Ahkam wa Suluk'
          )}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {pillars.map((p) => (
          <div
            key={p.id}
            className="amal-glass-card amal-pressable"
            style={{
              padding: 20,
              borderRadius: 18,
              backgroundColor: p.bgLight,
              border: `1.5px solid ${p.borderLight}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 26 }}>{p.icon}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    backgroundColor: p.badgeBg,
                    color: p.color,
                    padding: '2px 8px',
                    borderRadius: 10,
                    letterSpacing: 0.5,
                  }}
                >
                  {t(`PILLAR ${p.number}`, `ستون ${p.number}`, `الركن ${p.number}`, `Sutoon ${p.number}`)}
                </span>
              </div>

              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: p.color }}>
                {getPillarTitle(p)}
              </h3>
              <p style={{ margin: '4px 0 12px', fontSize: 12, color: '#4B5563', lineHeight: 1.5 }}>
                {getPillarSubtitle(p)}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {p.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="amal-glass-pill"
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 14,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: p.color,
                      textDecoration: 'none',
                      fontWeight: 700,
                      border: `1px solid ${p.borderLight}`,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                      transition: 'all 0.16s ease',
                    }}
                  >
                    {t(link.labelEn, link.labelUrdu, link.labelAr, link.labelRoman)}
                  </Link>
                ))}
              </div>

              <Link
                href={p.primaryLink}
                className="amal-pressable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 14px',
                  borderRadius: 10,
                  backgroundColor: p.color,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  boxShadow: `0 4px 14px ${p.color}33`,
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                }}
              >
                <span>
                  {t(
                    `Open ${p.titleEnglish}`,
                    `${p.titleUrdu} میں جائیں`,
                    `فتح ${p.titleArabic}`,
                    `${p.titleRoman} Kholein`
                  )}
                </span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
