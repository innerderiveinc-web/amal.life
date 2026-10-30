import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface PrayerSpiritualPauseBannerProps {
  isSpiritualPause: boolean;
  isUrdu?: boolean;
  toggleSpiritualPause: () => void;
}

export function PrayerSpiritualPauseBanner({
  isSpiritualPause,
  toggleSpiritualPause,
}: PrayerSpiritualPauseBannerProps) {
  const { t } = useLanguage();

  if (!isSpiritualPause) return null;

  return (
    <div
      style={{
        backgroundColor: '#FDF2F8',
        borderRadius: 14,
        padding: '18px 22px',
        border: '2px solid #F472B6',
        marginBottom: 20,
        boxShadow: '0 4px 14px rgba(157, 23, 77, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span style={{ fontSize: 28 }}>🌸</span>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                backgroundColor: '#9D174D',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 10,
              }}
            >
              {t(
                'SPIRITUAL PAUSE ACTIVE',
                'ایامِ معافی متحرک ہے',
                'وضع العذر الشرعي مفعّل',
                'Ayyam-e-Ma\'afi Active'
              )}
            </span>
            <span style={{ fontSize: 12, color: '#9D174D', fontWeight: 700 }}>
              {t(
                'Prayer Exemptions Active · Streaks Preserved With Zero Guilt',
                'بہارِ شریعت کے مطابق نمازیں معاف ہیں • اسٹریک محفوظ ہے',
                'رخصة الصلاة مفعّلة وفق الشريعة • الحفاظ على الاستمرارية',
                'Bahar-e-Shari\'at ke mutabiq namazein mu\'af hain • Streak mehfooz hai'
              )}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
            {t(
              'Prayer alerts are gently silenced. Prayer windows are transformed into blessed Dhikr, Istighfar, and Salawat opportunities.',
              'نماز کے اوقات کو ذکر، استغفار، اور درود شریف کے پاکیزہ ورد میں بدل دیا گیا ہے۔ آپ کے تمام معمولات محفوظ ہیں۔',
              'تم تحويل أوقات الصلاة إلى فرص مباركة للذكر والاستغفار والصلاة على النبي ﷺ. سجلاتك واستمراريتك محفوظة.',
              'Namaz ke auqat ko zikr, istighfar, aur Durood Sharif ke pakeeza wird mein badal diya gaya hai. Aapke tamam mamoolat mehfooz hain.'
            )}
          </p>

          {/* Micro Dhikr Suggestions during pause */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #FECDD3', padding: '3px 10px', borderRadius: 12, fontSize: 11, color: '#9D174D', fontWeight: 600 }}>
              📿 {t('100x Astaghfirullah', '۱۰۰ مرتبہ استغفار', '١٠٠ مرة استغفار', '100x Astaghfirullah')}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #FECDD3', padding: '3px 10px', borderRadius: 12, fontSize: 11, color: '#9D174D', fontWeight: 600 }}>
              🌸 {t('100x Salawat upon the Prophet ﷺ', '۱۰۰ مرتبہ درودِ پاک ﷺ', '١٠٠ مرة الصلاة على النبي ﷺ', '100x Durood Sharif ﷺ')}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #FECDD3', padding: '3px 10px', borderRadius: 12, fontSize: 11, color: '#9D174D', fontWeight: 600 }}>
              🎧 {t('Listen to Quran Audios', 'تلاوتِ قرآن سماعت فرمائیں', 'الاستماع لتلاوة القرآن الكريم', 'Tilawat-e-Quran Sama\'at Farmayein')}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={toggleSpiritualPause}
        style={{
          backgroundColor: '#9D174D',
          color: '#FFFFFF',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {t(
          'Resume Prayer Routine',
          'طہارت کے بعد ختم کریں',
          'إنهاء وضع العذر واستئناف الصلاة',
          'Taharat ke baad khatam karein'
        )}
      </button>
    </div>
  );
}
