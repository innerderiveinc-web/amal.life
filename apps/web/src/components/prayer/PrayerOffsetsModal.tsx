import React, { useEffect } from 'react';
import { PrayerTimeResult } from '@amal/amal-engine';
import { showAmalToast } from '../Toast';
import { useLanguage } from '../../context/LanguageContext';

interface PrayerOffsetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawPrayerTimes: PrayerTimeResult;
  prayerTimes: PrayerTimeResult;
  offsets: Record<string, number>;
  onUpdateOffset: (key: string, delta: number) => void;
  onResetOffsets: () => void;
}

export const PrayerOffsetsModal: React.FC<PrayerOffsetsModalProps> = ({
  isOpen,
  onClose,
  rawPrayerTimes,
  prayerTimes,
  offsets,
  onUpdateOffset,
  onResetOffsets,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          width: '100%',
          maxWidth: 480,
          padding: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>⚙️</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t(
                'Calibrate Prayer Minutes',
                'نماز کے اوقات میں احتیاطی منٹس کی ترتیب',
                'معايرة وضبط دقائق مواقيت الصلاة',
                'Prayer Minutes Calibrate Karein'
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close Calibration Modal"
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 16px', lineHeight: 1.5 }}>
          {t(
            'If your local mosque timetable has a 1-2 minute variance from astronomical calculation, adjust precautionary minutes here:',
            'اگر آپ کے محلے کی مسجد کے نقشے میں فلکیاتی حساب سے ۱ یا ۲ منٹ کا فرق ہو، تو آپ ہر نماز کے لیے احتیاطی منٹس بڑھا یا گھٹا سکتے ہیں:',
            'إذا كان جدول مسجدكم المحلي يختلف بدقيقة أو اثنتين عن الحساب الفلكي، فيمكنكم ضبط دقائق الاحتياط هنا:',
            'Agar aapki muqami masjid ke timetable mein 1-2 minute ka farq ho, to yahan se ahtiyati minutes adjust karein:'
          )}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            { key: 'fajr', en: 'Fajr', ur: 'فجر', ar: 'الفجر', roman: 'Fajr', raw: rawPrayerTimes.fajr, curr: prayerTimes.fajr },
            { key: 'dhuhr', en: 'Dhuhr', ur: 'ظہر', ar: 'الظهر', roman: 'Dhuhr', raw: rawPrayerTimes.dhuhr, curr: prayerTimes.dhuhr },
            { key: 'asr', en: 'Asr', ur: 'عصر', ar: 'العصر', roman: 'Asr', raw: rawPrayerTimes.asr, curr: prayerTimes.asr },
            { key: 'maghrib', en: 'Maghrib', ur: 'مغرب', ar: 'المغرب', roman: 'Maghrib', raw: rawPrayerTimes.maghrib, curr: prayerTimes.maghrib },
            { key: 'isha', en: 'Isha', ur: 'عشاء', ar: 'العشاء', roman: 'Isha', raw: rawPrayerTimes.isha, curr: prayerTimes.isha },
          ].map((p) => {
            const curOffset = offsets[p.key] || 0;
            return (
              <div
                key={p.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#1F2937' }}>
                    {t(p.en, p.ur, p.ar, p.roman)}
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>
                    {t('Base:', 'بنیادی:', 'الأصل:', 'Base:')} {p.raw} ➔ {t('Calibrated:', 'درست شدہ:', 'المعدل:', 'Adjusted:')}{' '}
                    <strong style={{ color: '#059669' }}>{p.curr}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => onUpdateOffset(p.key, -1)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                    aria-label={`Decrease offset for ${p.en}`}
                  >
                    -
                  </button>
                  <span
                    style={{
                      minWidth: 44,
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: 13,
                      color: curOffset !== 0 ? '#D97706' : '#374151',
                    }}
                  >
                    {curOffset > 0 ? `+${curOffset}m` : curOffset < 0 ? `${curOffset}m` : '0m'}
                  </span>
                  <button
                    onClick={() => onUpdateOffset(p.key, 1)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                    aria-label={`Increase offset for ${p.en}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={onResetOffsets}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#DC2626',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('Reset to Defaults', 'فلکیاتی معیار پر بحال کریں', 'إعادة ضبط للأصل الفلكي', 'Defaults par Reset Karein')}
          </button>

          <button
            onClick={() => {
              onClose();
              showAmalToast(
                t(
                  'Prayer times calibration saved successfully',
                  'نماز کے اوقات میں ترمیم محفوظ ہو گئی',
                  'تم حفظ تعديلات مواقيت الصلاة بنجاح',
                  'Namaz ke waqt ki calibration save ho gayi'
                ),
                'success'
              );
            }}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {t('Save & Apply', 'محفوظ اور لاگو کریں', 'حفظ وتطبيق', 'Save o Apply Karein')}
          </button>
        </div>
      </div>
    </div>
  );
};
