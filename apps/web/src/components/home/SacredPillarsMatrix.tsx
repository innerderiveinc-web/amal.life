import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export const SacredPillarsMatrix: React.FC = () => {
  const { isUrdu } = useLanguage();

  const pillars = [
    {
      id: 'ibadah',
      number: '1',
      icon: '🕋',
      titleUrdu: 'عبادات و معمولات',
      titleEnglish: 'Worship & Daily Rhythm',
      subtitleUrdu: 'اوقاتِ نماز، قبلہ، مسنون اذکار، تسبیح، ہجری تاریخ اور روزے',
      subtitleEnglish: 'Precise solar prayer times, Qibla azimuth, morning/evening adhkar & fasting.',
      color: '#065F46',
      bgLight: '#F0FDF4',
      borderLight: '#BBF7D0',
      badgeBg: '#DCFCE7',
      primaryLink: '/prayer',
      links: [
        { labelUrdu: 'اوقات و قبلہ', labelEn: 'Prayer & Qibla', href: '/prayer' },
        { labelUrdu: 'اذکارِ مسنون', labelEn: 'Daily Adhkar', href: '/adhkar' },
        { labelUrdu: 'تسبیح کاؤنٹر', labelEn: 'Tasbih', href: '/tasbih' },
        { labelUrdu: 'ہجری روزے', labelEn: 'Hijri Fasting', href: '/calendar' },
        { labelUrdu: 'حج و عمرہ', labelEn: 'Hajj Pilgrimage', href: '/hajj' },
      ],
    },
    {
      id: 'quran',
      number: '2',
      icon: '📖',
      titleUrdu: 'قرآن و علومِ سلف',
      titleEnglish: 'Al-Quran & Sacred Knowledge',
      subtitleUrdu: '۱۱۴ سورتیں، کنز الایمان، ۴ قراء آڈیو، تجوید و مخارج، اور ۱۰۶ معتبر کتب',
      subtitleEnglish: '114 Surahs with Kanz-ul-Iman, 4 master reciters, word-by-word tajweed & classical canon.',
      color: '#1E40AF',
      bgLight: '#EFF6FF',
      borderLight: '#BFDBFE',
      badgeBg: '#DBEAFE',
      primaryLink: '/quran',
      links: [
        { labelUrdu: 'قرآنِ کریم', labelEn: 'Read Quran', href: '/quran' },
        { labelUrdu: 'تجوید و مخارج', labelEn: 'Tajweed', href: '/quran?tab=tajweed' },
        { labelUrdu: 'حکمت کارڈز', labelEn: 'Wisdom Cards', href: '/wisdom' },
        { labelUrdu: 'کتب خانہ', labelEn: 'Classical Canon', href: '/library' },
        { labelUrdu: 'سیرت النبی ﷺ', labelEn: 'Living Sirah', href: '/sirah' },
        { labelUrdu: 'درس نوٹس', labelEn: 'Dars Vault', href: '/vault' },
      ],
    },
    {
      id: 'family',
      number: '3',
      icon: '🌸',
      titleUrdu: 'خاندان و گوشۂ نسواں',
      titleEnglish: 'Family & Sisters Sanctuary',
      subtitleUrdu: '۲۰ کتبِ نسواں، ۱۵ جلیل القدر صحابیات، احکامِ طہارت، اور خاندانی معمولات',
      subtitleEnglish: '20 classical women masterworks, 15 Sahabiyyat models, purity fiqh & family OS.',
      color: '#831843',
      bgLight: '#FFF1F2',
      borderLight: '#FECDD3',
      badgeBg: '#FCE7F3',
      primaryLink: '/sisters',
      links: [
        { labelUrdu: 'گوشۂ خواتین', labelEn: 'Sisters Sanctuary', href: '/sisters' },
        { labelUrdu: '۲۰ کتبِ نسواں', labelEn: '20 Books', href: '/sisters?tab=library' },
        { labelUrdu: '۱۵ صحابیات', labelEn: '15 Sahabiyyat', href: '/sisters?tab=sahabiyyat' },
        { labelUrdu: 'احکامِ طہارت', labelEn: 'Purity Fiqh', href: '/sisters?tab=fiqh' },
        { labelUrdu: 'ماؤں کی دعائیں', labelEn: 'Family Duas', href: '/sisters?tab=duas' },
        { labelUrdu: 'فیملی سرکل', labelEn: 'Family Circle', href: '/family' },
      ],
    },
    {
      id: 'ahkam',
      number: '4',
      icon: '⚖️',
      titleUrdu: 'احکام، میراث و سلوک',
      titleEnglish: 'Fiqh, Miras & Suluk Journeys',
      subtitleUrdu: 'زکوٰۃ و سونا، میراث کی شرعی تقسیم، قضائے عمری، اور ۱۴ روزہ دینی اسفار',
      subtitleEnglish: 'Gold jewelry zakat, Islamic inheritance shares, lifetime missed prayers & journeys.',
      color: '#92400E',
      bgLight: '#FEF3C7',
      borderLight: '#FDE68A',
      badgeBg: '#FEF9C3',
      primaryLink: '/calculator',
      links: [
        { labelUrdu: 'زکوٰۃ و سونا', labelEn: 'Zakat & Gold', href: '/calculator?tab=zakat' },
        { labelUrdu: 'میراث تقسیم (PDF)', labelEn: 'Miras Shares', href: '/calculator?tab=miras' },
        { labelUrdu: 'قضائے عمری', labelEn: 'Qadha Calculator', href: '/calculator?tab=qadha' },
        { labelUrdu: 'ڈیسیژن روم', labelEn: 'Decision Room', href: '/decision-room' },
        { labelUrdu: '۱۴ روزہ اسفار', labelEn: '14-Day Journeys', href: '/journeys' },
        { labelUrdu: 'دینی اہداف', labelEn: 'Niyyah Goals', href: '/goals' },
      ],
    },
  ];

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
            {isUrdu ? 'چار بنیادی دینی ستون' : 'THE 4 SACRED PILLARS'}
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>
            {isUrdu ? 'دینی و عملی شعبہ جات — مربوط نظامِ حیات' : 'Core Life Dimensions — Amal OS Gateways'}
          </h2>
        </div>
        <span style={{ fontSize: 13, color: '#64748B' }}>
          {isUrdu
            ? 'عبادت، علم و قرآن، خاندان و نسواں، اور مالی و باطنی احکام'
            : 'Worship, Quran & Heritage, Family & Sanctuary, Fiqh & Suluk'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {pillars.map((p) => (
          <div
            key={p.id}
            className="amal-card-hover"
            style={{
              padding: 18,
              borderRadius: 12,
              backgroundColor: p.bgLight,
              border: `1px solid ${p.borderLight}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
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
                  PILLAR {p.number}
                </span>
              </div>

              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: p.color }}>
                {isUrdu ? p.titleUrdu : p.titleEnglish}
              </h3>
              <p style={{ margin: '4px 0 12px', fontSize: 12, color: '#4B5563', lineHeight: 1.5 }}>
                {isUrdu ? p.subtitleUrdu : p.subtitleEnglish}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {p.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 6,
                      backgroundColor: '#FFFFFF',
                      color: p.color,
                      textDecoration: 'none',
                      fontWeight: 700,
                      border: `1px solid ${p.borderLight}`,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    {isUrdu ? link.labelUrdu : link.labelEn}
                  </Link>
                ))}
              </div>

              <Link
                href={p.primaryLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 12px',
                  borderRadius: 8,
                  backgroundColor: p.color,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  transition: 'opacity 0.15s ease',
                }}
              >
                <span>{isUrdu ? `${p.titleUrdu} میں جائیں` : `Open ${p.titleEnglish}`}</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
