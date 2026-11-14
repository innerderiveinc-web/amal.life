import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface MosqueIqamahModalProps {
  isOpen: boolean;
  onClose: () => void;
  editMosqueName: string;
  setEditMosqueName: (name: string) => void;
  editIqamahOffsets: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
    jumuah: string;
  };
  setEditIqamahOffsets: React.Dispatch<
    React.SetStateAction<{
      fajr: number;
      dhuhr: number;
      asr: number;
      maghrib: number;
      isha: number;
      jumuah: string;
    }>
  >;
  onSaveMosque: () => void;
}

export const MosqueIqamahModal: React.FC<MosqueIqamahModalProps> = ({
  isOpen,
  onClose,
  editMosqueName,
  setEditMosqueName,
  editIqamahOffsets,
  setEditIqamahOffsets,
  onSaveMosque,
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
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 10006,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '92%',
          maxWidth: 540,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: 28,
          border: '1px solid #E2E8F0',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              🕌 {t('Configure Your Mohalla Mosque', 'مقامی محلہ مسجد کی ترتیبات', 'ضبط بيانات مسجد الحي والإقامة', 'Mohalla Masjid ki Tarteebat')}
            </h2>
            <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>
              {t(
                'Set your local mosque name and Jama\'ah (Iqamah) offsets',
                'اپنی مقامی مسجد کا نام اور جماعت (اقامت) کا وقت سیٹ کریں',
                'حدد اسم المسجد المحلي وفوارق أوقات الإقامة بعد الأذان',
                'Apni muqami masjid ka naam aur jama\'at (iqamah) ka waqt set karein'
              )}
            </p>
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
            aria-label="Close Mosque Settings Modal"
          >
            ✕
          </button>
        </div>

        {/* Mosque Name Input */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 6 }}>
            {t('Mosque Name:', 'مسجد کا نام:', 'اسم المسجد:', 'Masjid ka Naam:')}
          </label>
          <input
            type="text"
            value={editMosqueName}
            onChange={(e) => setEditMosqueName(e.target.value)}
            placeholder={t(
              'e.g. Markaz Jamia Masjid, Noor Masjid Mohalla 4...',
              'مثلاً جامع مسجد، نور مسجد، مدینہ مسجد...',
              'مثال: جامع المدينة، مسجد النور...',
              'e.g. Jamia Masjid, Noor Masjid...'
            )}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Iqamah Offsets */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 10 }}>
            {t(
              'Iqamah Delay After Adhan (Minutes):',
              'اذان کے بعد جماعت کا وقفہ (منٹ):',
              'فارق وقت الإقامة بعد الأذان (بالدقائق):',
              'Azan ke baad Jama\'at ka waqfa (Minutes):'
            )}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { key: 'fajr', en: 'Fajr Iqamah', ur: 'اقامتِ فجر', ar: 'إقامة الفجر', roman: 'Fajr Iqamah' },
              { key: 'dhuhr', en: 'Dhuhr Iqamah', ur: 'اقامتِ ظہر', ar: 'إقامة الظهر', roman: 'Dhuhr Iqamah' },
              { key: 'asr', en: 'Asr Iqamah', ur: 'اقامتِ عصر', ar: 'إقامة العصر', roman: 'Asr Iqamah' },
              { key: 'maghrib', en: 'Maghrib Iqamah', ur: 'اقامتِ مغرب', ar: 'إقامة المغرب', roman: 'Maghrib Iqamah' },
              { key: 'isha', en: 'Isha Iqamah', ur: 'اقامتِ عشاء', ar: 'إقامة العشاء', roman: 'Isha Iqamah' },
            ].map((item) => {
              const val = (editIqamahOffsets[item.key as keyof typeof editIqamahOffsets] as number) ?? 20;
              return (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: '#F9FAFB',
                    borderRadius: 8,
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                    {t(item.en, item.ur, item.ar, item.roman)}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditIqamahOffsets((prev) => ({
                          ...prev,
                          [item.key]: Math.max(1, ((prev[item.key as keyof typeof prev] as number) || 0) - 1),
                        }));
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        border: '1px solid #D1D5DB',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontWeight: 800,
                      }}
                      aria-label={`Decrease Iqamah delay for ${item.en}`}
                    >
                      -
                    </button>
                    <span style={{ minWidth: 60, textAlign: 'center', fontWeight: 800, color: '#047857', fontSize: 13 }}>
                      +{val} {t('min', 'منٹ', 'د', 'min')}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditIqamahOffsets((prev) => ({
                          ...prev,
                          [item.key]: Math.min(60, ((prev[item.key as keyof typeof prev] as number) || 0) + 1),
                        }));
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        border: '1px solid #D1D5DB',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontWeight: 800,
                      }}
                      aria-label={`Increase Iqamah delay for ${item.en}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Jumu'ah fixed time */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: '#ECFDF5',
                borderRadius: 8,
                border: '1px solid #A7F3D0',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>
                {t('Jumu\'ah Prayer Time:', 'جمعہ کی نماز کا وقت:', 'وقت صلاة الجمعة:', 'Jumu\'ah Namaz ka Waqt:')}
              </span>
              <input
                type="time"
                value={editIqamahOffsets.jumuah || '13:30'}
                onChange={(e) => setEditIqamahOffsets((prev) => ({ ...prev, jumuah: e.target.value }))}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: '1px solid #059669',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#065F46',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              backgroundColor: '#F3F4F6',
              color: '#4B5563',
              border: 'none',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {t('Cancel', 'منسوخ', 'إلغاء', 'Cancel')}
          </button>
          <button
            type="button"
            onClick={onSaveMosque}
            style={{
              padding: '10px 22px',
              borderRadius: 8,
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>✓</span>
            <span>
              {t('Save Mosque Settings', 'مسجد کی ترتیبات محفوظ کریں', 'حفظ بيانات المسجد', 'Masjid Settings Save Karein')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
