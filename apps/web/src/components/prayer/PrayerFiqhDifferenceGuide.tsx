import React from 'react';

interface PrayerFiqhDifferenceGuideProps {
  t: (en: string, ur: string) => string;
}

export function PrayerFiqhDifferenceGuide({ t }: PrayerFiqhDifferenceGuideProps) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        border: '1px solid #E5E7EB',
        marginTop: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 22 }}>📖</span>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B4332', margin: 0 }}>
          {t('Why Prayer Timings Differ Across Calendars', 'نماز کے اوقات میں فرق کیوں ہوتا ہے؟')}
        </h3>
      </div>
      <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginBottom: 16 }}>
        {t(
          'If you notice a difference of a few minutes or Asr timing between this app and your local mosque timetable, it stems from four valid jurisprudential and astronomical factors:',
          'اگر آپ کو اپنی مسجد کے نقشۂ اوقات اور اس ایپ کے اوقات میں چند منٹ یا عصر کے وقت میں فرق محسوس ہو، تو اس کی بنیادی ۴ شرعی و فلکیاتی وجوہات درج ذیل ہیں:'
        )}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
            {t('1. Asr Start Time (Hanafi Mithlayn vs Jumhur)', '۱. عصر کا وقت (حنفی مثلین بمقابلہ جمہور مثلِ اول)')}
          </div>
          <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
            {t(
              'The majority of Sunni schools (Shafi\'i, Maliki, Hanbali) mark Asr when an object\'s shadow equals its length (ratio 1:1). In the Hanafi school (authoritative position of Imam Abu Hanifa), Asr begins when the shadow reaches twice its length (ratio 2:1), roughly 50 to 65 minutes later.',
              'جمہور ائمہ (شافعی، مالکی، حنبلی) کے نزدیک سائے کا ایک گنا ہونا عصر کا وقت ہے، جبکہ امامِ اعظم ابو حنیفہؒ کے معتمد قول پر سایہ دو گنا (مثلین) ہونے پر عصر شروع ہوتی ہے۔ اس لیے حنفی وقت جمہور سے تقریباً ۵۰ تا ۶۵ منٹ بعد ہوتا ہے۔'
            )}
          </p>
        </div>

        <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
            {t('2. Fajr & Isha Calculation Angles', '۲. فجر و عشاء کے زاویے (Calculation Angles)')}
          </div>
          <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
            {t(
              'Subcontinent authorities (Karachi, Deoband, Bareilly) recognize Subh Sadiq at 18 degrees below horizon. North America (ISNA) often utilizes 15 degrees, while Umm al-Qura fixes Isha 90 minutes after Maghrib.',
              'برصغیر (دیوبند، بریلی، کراچی) میں صبحِ صادق ۱۸ ڈگری پر تسلیم کی جاتی ہے۔ جبکہ مغربی ممالک میں بعض ادارے ۱۵ ڈگری (ISNA) اور سعودی عرب میں فجر ۱۸.۵ ڈگری اور عشاء مغرب کے ۹۰ منٹ بعد شمار کرتے ہیں۔'
            )}
          </p>
        </div>

        <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
            {t('3. Prayer Start Time vs Mosque Jama\'at Time', '۳. دخولِ وقت بمقابلہ جماعت کا وقت (Start vs Jama\'at)')}
          </div>
          <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
            {t(
              'AMAL OS shows the exact astronomical moment when a prayer enters (Dukhul-e-Waqt). Mosques set congregations at round community times (e.g. 1:30 PM or 5:15 PM) for congregation convenience.',
              'یہ ایپ فلکیاتی اعتبار سے وقت شروع ہونے (دخولِ وقت) کا دقیق منٹ بتاتی ہے، جبکہ مساجد میں اقامت/جماعت کا وقت عام سہولت کے لیے مخصوص گول اوقات (مثلاً ۱:۳۰ یا ۵:۱۵) پر طے کیا جاتا ہے۔'
            )}
          </p>
        </div>

        <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
            {t('4. Local Precautionary Buffers (Ihtiyat)', '۴. احتیاطی منٹس (Local Precautionary Buffers)')}
          </div>
          <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
            {t(
              'Scholars in many cities add 1-3 precautionary minutes to sunset or Fajr for horizon assurance. You can calibrate this easily using the "Calibrate / ± Minutes" button above.',
              'مختلف شہروں کے علماء افق اور بلندی کے لحاظ سے مغرب یا فجر میں ۱ تا ۳ احتیاطی منٹ شامل کرتے ہیں۔ اگر آپ کی مقامی مسجد میں ایسا ہو تو آپ اوپر دیے گئے بٹن "Calibrate / ± Minutes" سے آسانی سے منٹس سیٹ کر سکتے ہیں۔'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
