import React from 'react';
import { AmalTheme } from '@amal/ui';

interface SettingsFiqhTabProps {
  madhhab: 'HANAFI' | 'STANDARD_JUMHUR';
  setMadhhab: (m: 'HANAFI' | 'STANDARD_JUMHUR') => void;
  calcMethod: 'KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA';
  setCalcMethod: (m: 'KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA') => void;
  hijriOffset: number;
  setHijriOffset: (offset: number) => void;
  athanSound: string;
  setAthanSound: (sound: string) => void;
  offsets: {
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
  setOffsets: React.Dispatch<React.SetStateAction<{
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  }>>;
  handleSaveFiqh: () => void;
  t: (en: string, ur?: string, ar?: string, roman?: string) => string;
}

export function SettingsFiqhTab({
  madhhab,
  setMadhhab,
  calcMethod,
  setCalcMethod,
  hijriOffset,
  setHijriOffset,
  athanSound,
  setAthanSound,
  offsets,
  setOffsets,
  handleSaveFiqh,
  t,
}: SettingsFiqhTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        {t('Fiqh & Prayer Auqat Configuration', 'فقہی احکام و اوقات کی ترتیبات', 'إعدادات الفقه ومواقيت الصلاة', 'Fiqh & Namaz ke Auqat')}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        {t('Select your school of jurisprudence (Madhhab), calculation authority, and moon-sighting offset.', 'فقہی مسلک، فلکیاتی طریقہ اور رویت ہلال کا تعین فرمائیں۔', 'اختر المذهب الفقهي، طريقة الحساب الفلكي، وتعديل رؤية الهلال.', 'Fiqhi maslak, calculation method aur chand ki tareekh adjust karein.')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Madhhab */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('School of Fiqh (Asr Time Calculation)', 'فقہی مسلک (عصر کا وقت)', 'المذهب الفقهي (حساب وقت العصر)', 'School of Fiqh (Asr Waqt)')}
          </label>
          <select
            value={madhhab}
            onChange={(e) => setMadhhab(e.target.value as ('HANAFI' | 'STANDARD_JUMHUR'))}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="HANAFI">{t('Hanafi — Mithlayn (Shadow ratio 2:1 for Asr)', 'حنفی — مثلین (عصر کا وقت)', 'الحنفي — مثلين (وقت العصر)', 'Hanafi — Mithlayn (2x Shadow)')}</option>
            <option value="STANDARD_JUMHUR">{t('Shafi\'i / Maliki / Hanbali — Mithl Awwal (Shadow ratio 1:1)', 'جمہور فقہاء (شافعی، مالکی، حنبلی) — مثلِ اول', 'الجمهور (شافعي، مالكي، حنبلي) — مثل أول', 'Jumhur (Shafi\'i, Maliki, Hanbali) — Mithl Awwal (1x Shadow)')}</option>
          </select>
        </div>

        {/* Calculation Method */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Astronomical Calculation Method', 'فلکیاتی طریقہ حساب', 'طريقة الحساب الفلكي', 'Astronomical Calculation Method')}
          </label>
          <select
            value={calcMethod}
            onChange={(e) => setCalcMethod(e.target.value as ('KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA'))}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="KARACHI">University of Islamic Sciences, Karachi (18° Fajr / 18° Isha)</option>
            <option value="MWL">Muslim World League (MWL) (18° Fajr / 17° Isha)</option>
            <option value="UMM_AL_QURA">Umm al-Qura University, Makkah (18.5° Fajr / 90 min Isha)</option>
            <option value="EGYPTIAN">Egyptian General Authority of Survey (19.5° Fajr / 17.5° Isha)</option>
            <option value="ISNA">ISNA — North America (15° Fajr / 15° Isha)</option>
          </select>
        </div>

        {/* Hijri Moon Sight Offset */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Hijri Moon Sight Offset', 'رویت ہلال ایڈجسٹمنٹ (ہجری تاریخ)', 'تعديل رؤية الهلال (التقويم الهجري)', 'Chand Dekhne ka Offset (Hijri Tareekh)')}
          </label>
          <select
            value={hijriOffset}
            onChange={(e) => setHijriOffset(parseInt(e.target.value, 10))}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value={-2}>-2 Days (Moon sighted later)</option>
            <option value={-1}>-1 Day (Standard subcontinent offset)</option>
            <option value={0}>0 Days (Astronomical default / Umm al-Qura)</option>
            <option value={1}>+1 Day</option>
            <option value={2}>+2 Days</option>
          </select>
        </div>

        {/* Athan Voice */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Athan Audio Notification', 'آواز اذان (اطلاعات)', 'صوت الأذان والتنبيهات', 'Azan Audio Notification')}
          </label>
          <select
            value={athanSound}
            onChange={(e) => setAthanSound(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="makkah">{t('Masjid al-Haram (Makkah Mukarramah)', 'مسجد الحرام (مکہ مکرمہ)', 'المسجد الحرام (مكة المكرمة)', 'Masjid al-Haram (Makkah)')}</option>
            <option value="madinah">{t('Al-Masjid an-Nabawi (Madinah Munawwarah)', 'مسجد نبوی (مدینہ منورہ)', 'المسجد النبوي (المدينة المنورة)', 'Al-Masjid an-Nabawi (Madinah)')}</option>
            <option value="alaqsa">{t('Al-Masjid al-Aqsa (Al-Quds)', 'مسجد اقصیٰ (القدس شریف)', 'المسجد الأقصى (القدس)', 'Al-Masjid al-Aqsa (Al-Quds)')}</option>
            <option value="silent">{t('Silent Notification Only', 'صرف خاموش اطلاع', 'إشعار صامت فقط', 'Silent Notification Only')}</option>
          </select>
        </div>

        {/* Prayer Offsets Grid */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
            {t('Manual Minute Offsets per Prayer', 'نماز کے اوقات میں انفرادی منٹ ایڈجسٹمنٹ', 'تعديل الدقائق يدوياً لكل صلاة', 'Har Namaz me Minute Adjustments')}
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              maxWidth: 460,
            }}
          >
            {(['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => (
              <div key={p} style={{ backgroundColor: '#F9FAFB', padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{p}:</span>
                <input
                  type="number"
                  value={offsets[p]}
                  onChange={(e) => setOffsets({ ...offsets, [p]: parseInt(e.target.value, 10) || 0 })}
                  style={{
                    width: '100%',
                    marginTop: 4,
                    padding: '4px 6px',
                    borderRadius: 4,
                    border: '1px solid #D1D5DB',
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveFiqh}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 22px',
            backgroundColor: AmalTheme.colors.primary,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {t('Save Fiqh & Prayer Settings', 'فقہی ترتیبات محفوظ کریں', 'حفظ إعدادات الفقه ومواقيت الصلاة', 'Save Fiqh Settings')}
        </button>
      </div>
    </div>
  );
}
