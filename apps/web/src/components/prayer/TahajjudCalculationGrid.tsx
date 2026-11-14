import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface TahajjudCalculationData {
  isActive: boolean;
  isUpcoming: boolean;
  diffMinutes: number;
  formattedDiff: string;
  formattedDiffEn: string;
  nightDurationHours: string;
  qiyam12h: string;
  fajr12h: string;
  midnight12h: string;
  maghrib12h: string;
}

export interface TahajjudCalculationGridProps {
  calculation: TahajjudCalculationData;
}

export const TahajjudCalculationGrid: React.FC<TahajjudCalculationGridProps> = ({
  calculation,
}) => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 12,
        padding: 18,
        marginBottom: 16,
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Box 1: Sulus al-Akhir Window */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: '#94A3B8',
            fontWeight: 700,
            display: 'block',
            textTransform: 'uppercase',
          }}
        >
          {t('Optimal Tahajjud Window', 'تہجد کا افضل وقت', 'الوقت الأفضل لقيام الليل', 'Tahajjud ka Afzal Waqt')}
        </span>
        <div style={{ fontSize: 20, fontWeight: 900, color: '#FCD34D', marginTop: 4 }}>
          {calculation.qiyam12h} — {calculation.fajr12h}
        </div>
        <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 2 }}>
          {t('(Last third of night from sunset to dawn)', '(غروبِ آفتاب تا صبحِ صادق کے درمیان رات کا آخری تہائی حصہ)', '(الثلث الأخير من الليل من الغروب إلى الفجر)', '(Raat ka aakhri tehai hissa Maghrib se Fajr tak)')}
        </div>
      </div>

      {/* Box 2: Live Status Countdown */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: '#94A3B8',
            fontWeight: 700,
            display: 'block',
            textTransform: 'uppercase',
          }}
        >
          {calculation.isActive
            ? t('Window Ends In (Until Fajr)', 'وقت کا اختتام (فجر تک باقی)', 'ينتهي الوقت عند الفجر (المتبقي)', 'Waqt ka Ikhtitam (Fajr tak)')
            : t('Time Remaining to Start', 'وقت شروع ہونے میں باقی', 'الوقت المتبقي حتى البداية', 'Shuru hone me baqi')}
        </span>
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: calculation.isActive ? '#34D399' : '#38BDF8',
            marginTop: 4,
          }}
        >
          {calculation.formattedDiff}
        </div>
        <div style={{ fontSize: 11, color: '#A7F3D0', marginTop: 2 }}>
          {calculation.isActive
            ? t(`Remaining until Fajr dawn (${calculation.formattedDiffEn})`, `صبحِ صادق طلوع ہونے تک باقی وقت`, `المتبقي حتى أذان الفجر`, `Fajr taloo hone tak baqi`)
            : t(`Starts at ${calculation.qiyam12h} tonight`, `رات ${calculation.qiyam12h} پر شروع ہوگا`, `يبدأ الليلة عند الساعة ${calculation.qiyam12h}`, `Raat ${calculation.qiyam12h} par shuru hoga`)}
        </div>
      </div>

      {/* Box 3: Islamic Midnight (نصف اللیل) */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: '#94A3B8',
            fontWeight: 700,
            display: 'block',
            textTransform: 'uppercase',
          }}
        >
          {t('Islamic Midnight', 'شرعی نصف اللیل', 'منتصف الليل الشرعي', 'Shar\'i Nisf-ul-Lail')}
        </span>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#F1F5F9', marginTop: 4 }}>
          {calculation.midnight12h}
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
          {t(`Total night length: ${calculation.nightDurationHours} hours`, `رات کا کل دورانیہ: ${calculation.nightDurationHours} گھنٹے`, `طول الليل الإجمالي: ${calculation.nightDurationHours} ساعة`, `Raat ka kul doraniyah: ${calculation.nightDurationHours} ghante`)}
        </div>
      </div>
    </div>
  );
};
