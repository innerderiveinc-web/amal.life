import React from 'react';

interface PrayerSpiritualPauseBannerProps {
  isSpiritualPause: boolean;
  isUrdu: boolean;
  toggleSpiritualPause: () => void;
}

export function PrayerSpiritualPauseBanner({
  isSpiritualPause,
  isUrdu,
  toggleSpiritualPause,
}: PrayerSpiritualPauseBannerProps) {
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
              {isUrdu ? 'ایامِ معافی متحرک ہے' : 'SPIRITUAL PAUSE ACTIVE'}
            </span>
            <span style={{ fontSize: 12, color: '#9D174D', fontWeight: 700 }}>
              {isUrdu ? 'بہارِ شریعت کے مطابق نمازیں معاف ہیں • اسٹریک محفوظ ہے' : 'Prayer Exemptions Active · Streaks Preserved With Zero Guilt'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
            {isUrdu
              ? 'نماز کے اوقات کو ذکر، استغفار، اور درود شریف کے پاکیزہ ورد میں بدل دیا گیا ہے۔ آپ کے تمام معمولات محفوظ ہیں۔'
              : 'Prayer alerts are gently silenced. Prayer windows are transformed into blessed Dhikr, Istighfar, and Salawat opportunities.'}
          </p>

          {/* Micro Dhikr Suggestions during pause */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #FECDD3', padding: '3px 10px', borderRadius: 12, fontSize: 11, color: '#9D174D', fontWeight: 600 }}>
              📿 {isUrdu ? '۱۰۰ مرتبہ استغفار' : '100x Astaghfirullah'}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #FECDD3', padding: '3px 10px', borderRadius: 12, fontSize: 11, color: '#9D174D', fontWeight: 600 }}>
              🌸 {isUrdu ? '۱۰۰ مرتبہ درودِ پاک' : '100x Salawat upon the Prophet ﷺ'}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', border: '1px solid #FECDD3', padding: '3px 10px', borderRadius: 12, fontSize: 11, color: '#9D174D', fontWeight: 600 }}>
              🎧 {isUrdu ? 'تلاوتِ قرآن سماعت فرمائیں' : 'Listen to Quran Audios'}
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
        {isUrdu ? 'طہارت کے بعد ختم کریں' : 'Resume Prayer Routine'}
      </button>
    </div>
  );
}
