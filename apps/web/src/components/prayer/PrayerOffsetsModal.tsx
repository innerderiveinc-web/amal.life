import React from 'react';
import { PrayerTimeResult } from '@amal/amal-engine';
import { showAmalToast } from '../Toast';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 16,
      }}
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
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>⚙️</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Calibrate Prayer Minutes (منٹس درست کریں)
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9CA3AF' }}
            aria-label="Close Calibration Modal"
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 16px', lineHeight: 1.5 }}>
          اگر آپ کے محلے کی مسجد کے نقشے میں فلکیاتی حساب سے ۱ یا ۲ منٹ کا فرق ہو، تو آپ ہر نماز کے لیے احتیاطی منٹس بڑھا یا گھٹا سکتے ہیں:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            { key: 'fajr', label: 'Fajr (نمازِ فجر)', raw: rawPrayerTimes.fajr, curr: prayerTimes.fajr },
            { key: 'dhuhr', label: 'Dhuhr (نمازِ ظہر)', raw: rawPrayerTimes.dhuhr, curr: prayerTimes.dhuhr },
            { key: 'asr', label: 'Asr (نمازِ عصر)', raw: rawPrayerTimes.asr, curr: prayerTimes.asr },
            { key: 'maghrib', label: 'Maghrib (نمازِ مغرب)', raw: rawPrayerTimes.maghrib, curr: prayerTimes.maghrib },
            { key: 'isha', label: 'Isha (نمازِ عشاء)', raw: rawPrayerTimes.isha, curr: prayerTimes.isha },
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
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#1F2937' }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>
                    Base: {p.raw} ➔ Calibrated: <strong style={{ color: '#059669' }}>{p.curr}</strong>
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
                    aria-label={`Decrease offset for ${p.label}`}
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
                    aria-label={`Increase offset for ${p.label}`}
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
            Reset to Astronomical Default
          </button>

          <button
            onClick={() => {
              onClose();
              showAmalToast('Prayer times calibration saved successfully', 'success');
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
            Save & Apply (محفوظ کریں)
          </button>
        </div>
      </div>
    </div>
  );
};
