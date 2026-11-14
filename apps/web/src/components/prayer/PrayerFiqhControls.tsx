import React from 'react';
import { MadhhabAsr, CalculationMethod } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';

interface PrayerFiqhControlsProps {
  madhhab: MadhhabAsr;
  handleMadhhabChange: (m: MadhhabAsr) => void;
  method: CalculationMethod;
  handleMethodChange: (m: CalculationMethod) => void;
}

export function PrayerFiqhControls({
  madhhab,
  handleMadhhabChange,
  method,
  handleMethodChange,
}: PrayerFiqhControlsProps) {
  const { t } = useLanguage();
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        border: '1px solid #E5E7EB',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}
    >
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 700,
            color: '#374151',
            marginBottom: 6,
          }}
        >
          {t('ASR JURISPRUDENCE (MADHHAB)', 'فقہی مسلک برائے عصر', 'المذهب الفقهي لوقت العصر', 'Asr Maslak (Hanafi / Jumhur)')}
        </label>
        <select
          value={madhhab}
          onChange={(e) => handleMadhhabChange(e.target.value as MadhhabAsr)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            fontSize: 14,
            backgroundColor: '#F9FAFB',
          }}
        >
          <option value="HANAFI">{t('Hanafi (Mislayn — 2x Shadow Ratio)', 'حنفی — مثلین (عصر کا وقت)', 'الحنفي — مثلين', 'Hanafi (Mislayn — 2x Shadow Ratio)')}</option>
          <option value="STANDARD_JUMHUR">{t('Jumhur: Shafi\'i / Maliki / Hanbali (1x Shadow)', 'جمہور فقہاء (شافعی، مالکی، حنبلی) — مثلِ اول', 'الجمهور (شافعي، مالكي، حنبلي) — مثل أول', 'Jumhur: Shafi\'i / Maliki / Hanbali (1x Shadow)')}</option>
        </select>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
          {madhhab === 'HANAFI'
            ? t('💡 Hanafi Asr starts later, when the shadow of an object reaches twice its length (Mislayn).', '💡 حنفی مسلک میں عصر کا وقت تب شروع ہوتا ہے جب ہر چیز کا سایہ اصلی سائے کے علاوہ دو گنا (مثلین) ہو جائے۔', '💡 يبدأ وقت العصر عند الحنفية عندما يصبح ظل الشيء مثليه (المثلين).', '💡 Hanafi Asr baad me shuru hota hai jab kisi cheez ka saya dugna (2x) ho jaye.')
            : t('💡 Jumhur (Shafi\'i / Maliki / Hanbali) Asr starts earlier, when an object\'s shadow equals its length.', '💡 جمہور فقہاء کے نزدیک عصر کا وقت تب شروع ہوتا ہے جب ہر چیز کا سایہ اصلی سائے کے علاوہ ایک گنا (مثلِ اول) ہو جائے۔', '💡 يبدأ وقت العصر عند الجمهور عندما يصبح ظل الشيء مثله (المثل الأول).', '💡 Jumhur Asr pehle shuru hota hai jab saya cheez ke barabar (1x) ho jaye.')}
        </p>
      </div>

      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 700,
            color: '#374151',
            marginBottom: 6,
          }}
        >
          {t('CALCULATION METHOD', 'فلکیاتی طریقہ حساب', 'طريقة الحساب الفلكي', 'Calculation Method')}
        </label>
        <select
          value={method}
          onChange={(e) => handleMethodChange(e.target.value as CalculationMethod)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            fontSize: 14,
            backgroundColor: '#F9FAFB',
          }}
        >
          <option value="KARACHI">{t('Indian Subcontinent Standard (Fajr 18° / Isha 18°)', 'برصغیر پاک و ہند معیار (فجر 18° / عشاء 18°)', 'معيار شبه القارة الهندية', 'Subcontinent Standard (Fajr 18° / Isha 18°)')}</option>
          <option value="UMM_AL_QURA">{t('Umm al-Qura, Makkah (Fajr 18.5° / Isha 90 min)', 'ام القریٰ، مکہ مکرمہ', 'أم القرى، مكة المكرمة', 'Umm al-Qura, Makkah')}</option>
          <option value="MWL">{t('Muslim World League (Fajr 18° / Isha 17°)', 'رابطہ عالم اسلامی (مکہ مکرمہ)', 'رابطة العالم الإسلامي', 'Muslim World League (MWL)')}</option>
          <option value="EGYPTIAN">{t('Egyptian Survey Authority (Fajr 19.5° / Isha 17.5°)', 'مصری سروے اتھارٹی', 'الهيئة المصرية العامة للمساحة', 'Egyptian Survey Authority')}</option>
          <option value="ISNA">{t('ISNA — North America (Fajr 15° / Isha 15°)', 'اسنا (شمالی امریکہ)', 'إسنا (أمريكا الشمالية)', 'ISNA (North America)')}</option>
          <option value="TEHRAN">{t('Institute of Geophysics, Tehran (17.7° / 14°)', 'تہران جیو فزکس', 'جامعة طهران', 'Tehran Geophysics')}</option>
        </select>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
          {t('💡 Calibrates Fajr & Isha solar twilight angles based on your region\'s scholarly authority.', '💡 آپ کے خطے کی معتمد فلکیاتی و فقہی اتھارٹی کے مطابق فجر اور عشاء کی شفق کے درجات کا حساب۔', '💡 يضبط زوايا شفق الفجر والعشاء وفق الهيئة الفلكية المعتمدة في منطقتك.', '💡 Fajr aur Isha ke waqt ke liye subah aur shaam ke roshni ke darjon (twilight angles) ka hisab.')}
        </p>
      </div>
    </div>
  );
}
