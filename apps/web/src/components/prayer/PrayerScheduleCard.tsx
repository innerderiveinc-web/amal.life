import React, { memo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { showAmalToast } from '../Toast';

interface PrayerItem {
  key: string;
  name: string;
  nameUrdu: string;
  nameArabic: string;
  time: string;
  icon: string;
}

interface PrayerScheduleCardProps {
  prayerList: PrayerItem[];
  prayerTimes: any;
  nextPrayer: any;
  makroohTimes: any;
  selectedCityName: string;
  isUrdu?: boolean;
  t?: (en: string, ur?: string, ar?: string, roman?: string) => string;
}

function PrayerScheduleCardInner({
  prayerList,
  prayerTimes,
  nextPrayer,
  makroohTimes,
  selectedCityName,
}: PrayerScheduleCardProps) {
  const { language, t } = useLanguage();

  // Precautionary Sehri Calculation
  const sehriCutoff = (() => {
    const parts = (prayerTimes.fajr || '05:00').split(':').map(Number);
    const h = parts[0] ?? 5;
    const m = parts[1] ?? 0;
    const total = h * 60 + m - 3; // 3-minute Ihtiyat buffer before Subh Sadiq
    const newH = Math.floor((total < 0 ? total + 1440 : total) / 60) % 24;
    const newM = (total < 0 ? total + 1440 : total) % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
  })();

  const handleShareSchedule = async () => {
    const text =
      `🕌 *اوقاتِ نماز برائے آج — ${selectedCityName}*\n` +
      `📅 تاریخ: ${prayerTimes.date || ''}\n` +
      `-----------------------------\n` +
      `🌅 فجر (Fajr): ${prayerTimes.fajr} (سحری ختم: ${sehriCutoff})\n` +
      `☀️ طلوعِ آفتاب (Sunrise): ${prayerTimes.sunrise}\n` +
      `☀️ ظہر (Dhuhr): ${prayerTimes.dhuhr}\n` +
      `⛅ عصر (Asr): ${prayerTimes.asr}\n` +
      `🌇 مغرب / افطار (Maghrib / Iftar): ${prayerTimes.maghrib}\n` +
      `🌌 عشاء (Isha): ${prayerTimes.isha}\n` +
      `🌙 تہجد / ثلثِ اخیر (Tahajjud): ${prayerTimes.tahajjud || prayerTimes.qiyamThird || '03:15'}\n` +
      `-----------------------------\n` +
      `⚠️ اوقاتِ مکروہہ (نماز ممنوع): طلوع (${makroohTimes?.sunrise?.start || ''}-${makroohTimes?.sunrise?.end || ''}), استواء (${makroohTimes?.zawal?.start || ''}-${makroohTimes?.zawal?.end || ''}), غروب (${makroohTimes?.sunset?.start || ''}-${makroohTimes?.sunset?.end || ''})\n\n` +
      `✨ حاصل کریں 100% اشتہارات سے پاک AMAL OS پر:\nhttps://amal.life/prayer`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `اوقاتِ نماز — ${selectedCityName}`,
          text,
        });
        showAmalToast(
          t('Prayer schedule shared successfully!', 'اوقاتِ نماز شیئر کر دیے گئے!', 'تمت مشاركة مواقيت الصلاة بنجاح!', 'Prayer schedule share ho gaya!'),
          'success'
        );
        return;
      } catch (e: any) {
        if (e?.name === 'AbortError') return;
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      showAmalToast(
        t('Schedule copied to clipboard! Opening WhatsApp...', 'اوقاتِ نماز کلپ بورڈ پر کاپی ہو گئے۔ واٹس ایپ کھل رہا ہے...', 'تم نسخ المواقيت!', 'Schedule copy ho gaya! WhatsApp open ho raha hai...'),
        'info'
      );
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', margin: 0 }}>
            {t('Daily Auqat-e-Namaz', 'اوقاتِ نماز برائے آج', 'مواقيت الصلاة اليومية', 'Daily Auqat-e-Namaz')} ({prayerTimes.date})
          </h2>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            📍 {selectedCityName}
          </span>
        </div>
        <button
          onClick={handleShareSchedule}
          type="button"
          aria-label="Share Today's Prayer Schedule to Family or WhatsApp"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 8,
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          title={t('Share today’s prayer times to WhatsApp or family group', 'آج کے اوقاتِ نماز واٹس ایپ یا فیملی گروپ میں شیئر کریں', 'مشاركة مواقيت الصلاة اليومية', 'Share schedule to WhatsApp')}
        >
          <span>📲</span>
          <span>{t('Share Schedule', 'شیئر اوقات', 'مشاركة المواقيت', 'Share Schedule')}</span>
        </button>
      </div>

      {/* Main 5 Prayers Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {prayerList.map((p) => {
          const isNext = nextPrayer && nextPrayer.name === p.name;
          return (
            <div
              key={p.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: isNext ? '#ECFDF5' : '#F9FAFB',
                border: isNext ? '1.5px solid #059669' : '1px solid #F3F4F6',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: isNext ? 800 : 600,
                        color: isNext ? '#065F46' : '#111827',
                      }}
                    >
                      {language === 'ar' ? p.nameArabic : language === 'ur' ? p.nameUrdu : p.name}
                    </span>
                    {isNext && (
                      <span
                        suppressHydrationWarning
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          backgroundColor: '#047857',
                          color: '#FFFFFF',
                          padding: '2px 8px',
                          borderRadius: 12,
                          letterSpacing: 0.3,
                        }}
                      >
                        {t('Next Prayer', 'اگلی نماز', 'الصلاة القادمة', 'Agli Namaz')} · {language === 'ur' || language === 'ar' ? (nextPrayer.formattedCountdownUrdu || nextPrayer.formattedCountdownEnglish) : nextPrayer.formattedCountdownEnglish}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                    {p.nameArabic} • {language === 'ur' ? p.name : (language === 'roman' ? p.name : p.nameUrdu)}
                  </div>
                </div>
              </div>
              <div
                suppressHydrationWarning
                style={{ fontSize: 18, fontWeight: 800, color: isNext ? '#065F46' : '#1B4332' }}
              >
                {p.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Night Prayers */}
      <div
        suppressHydrationWarning
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>{t('Islamic Midnight', 'نصف اللیل الشرعی', 'منتصف الليل الشرعي', 'Nisf-ul-Lail Shar\'i')}</span>
          <span suppressHydrationWarning style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>
            {prayerTimes.midnight}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>{t('Tahajjud (Last 1/3)', 'تہجد (آخری تہائی)', 'التهجد (الثلث الأخير)', 'Tahajjud (Aakhri Tihai)')}</span>
          <span suppressHydrationWarning style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>
            {prayerTimes.qiyamThird}
          </span>
        </div>
      </div>

      {/* FASTING & ROZA TIMINGS */}
      <div
        style={{
          marginTop: 16,
          padding: '12px 16px',
          borderRadius: 10,
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#065F46',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {t('🌙 Imsak / Sehri Cutoff (Precautionary)', '🌙 سحری کا احتیاطی وقت', '🌙 وقت الإمساك الاحتياطي', '🌙 Sehri Ka Ihtiyati Waqt')}
          </span>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#065F46', marginTop: 2 }}>
            {sehriCutoff}
            <span style={{ fontSize: 11, fontWeight: 500, color: '#047857', marginLeft: 6 }}>
              {t('(3m buffer before Fajr)', '(فجر سے ۳ منٹ قبل)', '(احتياط ٣ دقائق قبل الفجر)', '(Fajr se 3m qabal)')}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#92400E',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {t('🌅 Iftar / Sunset', '🌅 افطار کا وقت', '🌅 موعد الإفطار / الغروب', '🌅 Iftar Ka Waqt')}
          </span>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#92400E', marginTop: 2 }}>
            {prayerTimes.maghrib}
            <span style={{ fontSize: 11, fontWeight: 500, color: '#B45309', marginLeft: 6 }}>
              {t('(Maghrib entry)', '(دخولِ مغرب)', '(دخول وقت المغرب)', '(Dukhol-e-Maghrib)')}
            </span>
          </div>
        </div>
      </div>

      {/* Auqat-e-Makrooha (Prohibited Prayer Windows) */}
      <div
        style={{
          marginTop: 18,
          padding: '12px 14px',
          borderRadius: 10,
          backgroundColor: '#FEF2F2',
          border: '1px solid #FCA5A5',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>⚠️</span>
            <span style={{ fontWeight: 800, color: '#991B1B', fontSize: 13 }}>
              {t('Prohibited Prayer Times (Auqat-e-Makrooha)', 'مکروہ اوقات (نماز ممنوع ہے)', 'الأوقات المكروهة تحريماً للصلوات', 'Auqat-e-Makrooha')}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#DC2626', fontWeight: 700 }}>
            {t('Strict Prohibition', 'تحریمی', 'تحريمي', 'Tahreemi')}
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#7F1D1D', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('Sunrise to Ishraq Window:', 'طلوعِ آفتاب تا اشراق:', 'شروق الشمس إلى الإشراق:', 'Tulu-e-Aftab ta Ishraq:')}</span>
            <strong>{makroohTimes.sunrise.start} — {makroohTimes.sunrise.end}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('Solar Noon / Zawal Window:', 'نصف النہار / زوال:', 'استواء الشمس / الزوال:', 'Nisf-un-Nahar / Zawal:')}</span>
            <strong>{makroohTimes.zawal.start} — {makroohTimes.zawal.end}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('Sunset Window:', 'غروبِ آفتاب:', 'غروب الشمس:', 'Ghuroob-e-Aftab:')}</span>
            <strong>{makroohTimes.sunset.start} — {makroohTimes.sunset.end}</strong>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#B91C1C',
            marginTop: 8,
            fontStyle: 'italic',
            borderTop: '1px dashed #FECACA',
            paddingTop: 6,
          }}
        >
          {t(
            '* Voluntary, missed prayers (Qada), Sajdah Tilawat, and Janazah are strictly prohibited during these windows (Mukhtasar al-Quduri & Fatawa Razawiyya).',
            '* ان اوقات میں نفل، قضا، سجدۂ تلاوت اور نمازِ جنازہ پڑھنا مکروہِ تحریمی ہے (القدوری و فتاویٰ رضویہ)۔',
            '* يُكره تحريماً صلاة النفل والقضاء وسجدة التلاوة وصلاة الجنازة في هذه الأوقات (مختصر القدوري وفتاوى رضوية).',
            '* In auqat mein nafal, qadha, sajdah tilawat aur janazah parhna makrooh-e-tahreemi hai.'
          )}
        </div>
      </div>
    </div>
  );
}

/** Memoized — prayer list only changes when city or calculation method changes */
export const PrayerScheduleCard = memo(PrayerScheduleCardInner);
