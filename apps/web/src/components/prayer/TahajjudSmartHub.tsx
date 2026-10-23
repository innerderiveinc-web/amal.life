import React, { useState, useEffect, useMemo } from 'react';
import { showAmalToast } from '../Toast';

export interface TahajjudSmartHubProps {
  maghribTime: string; // "HH:MM"
  fajrTime: string;    // "HH:MM"
  qiyamThirdTime: string; // "HH:MM"
  midnightTime: string;   // "HH:MM"
  cityName: string;
}

export const TahajjudSmartHub: React.FC<TahajjudSmartHubProps> = ({
  maghribTime,
  fajrTime,
  qiyamThirdTime,
  midnightTime,
  cityName,
}) => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [showGuide, setShowGuide] = useState(false);
  const [isPlayingAlarmTest, setIsPlayingAlarmTest] = useState(false);

  // Update clock every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Parse "HH:MM" into minutes from midnight
  const parseTimeToMinutes = (timeStr: string): number => {
    const parts = (timeStr || '00:00').split(':').map(Number);
    return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  };

  // Convert minutes from midnight to 12-hour AM/PM string
  const formatMinutesTo12Hour = (totalMinutes: number): string => {
    const norm = (totalMinutes % 1440 + 1440) % 1440;
    const hours24 = Math.floor(norm / 60);
    const mins = norm % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    return `${hours12}:${String(mins).padStart(2, '0')} ${period}`;
  };

  // Status & Countdown Calculation
  const calculation = useMemo(() => {
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const maghribMins = parseTimeToMinutes(maghribTime);
    const fajrMins = parseTimeToMinutes(fajrTime);
    const qiyamMins = parseTimeToMinutes(qiyamThirdTime);
    const midnightMins = parseTimeToMinutes(midnightTime);

    // Total night duration (Maghrib to next morning's Fajr)
    const nightDurationMins = (fajrMins + 1440 - maghribMins) % 1440;

    // Check if current time is inside Sulus al-Akhir
    // Sulus al-Akhir is from qiyamMins to fajrMins.
    // Because it crosses midnight:
    // If qiyamMins > fajrMins: it starts late night (e.g. 02:30 AM) and ends early morning (05:15 AM).
    let isActive = false;
    let isUpcoming = false;
    let diffMinutes = 0;

    if (qiyamMins < fajrMins) {
      // Both in same morning: e.g. Qiyam 02:30 AM, Fajr 05:15 AM
      if (currentMins >= qiyamMins && currentMins < fajrMins) {
        isActive = true;
        diffMinutes = fajrMins - currentMins;
      } else if (currentMins >= maghribMins || currentMins < qiyamMins) {
        isUpcoming = true;
        diffMinutes = currentMins >= maghribMins
          ? (qiyamMins + 1440 - currentMins)
          : (qiyamMins - currentMins);
      }
    } else {
      // Qiyam starts before midnight (rare, in high latitude winter)
      if (currentMins >= qiyamMins || currentMins < fajrMins) {
        isActive = true;
        diffMinutes = currentMins >= qiyamMins
          ? (fajrMins + 1440 - currentMins)
          : (fajrMins - currentMins);
      } else {
        isUpcoming = true;
        diffMinutes = (qiyamMins - currentMins + 1440) % 1440;
      }
    }

    const diffHours = Math.floor(diffMinutes / 60);
    const diffMinsRemainder = diffMinutes % 60;
    const formattedDiff = `${diffHours > 0 ? `${diffHours} گھنٹے ` : ''}${diffMinsRemainder} منٹ`;
    const formattedDiffEn = `${diffHours > 0 ? `${diffHours}h ` : ''}${diffMinsRemainder}m`;

    return {
      isActive,
      isUpcoming,
      diffMinutes,
      formattedDiff,
      formattedDiffEn,
      nightDurationHours: (nightDurationMins / 60).toFixed(1),
      qiyam12h: formatMinutesTo12Hour(qiyamMins),
      fajr12h: formatMinutesTo12Hour(fajrMins),
      midnight12h: formatMinutesTo12Hour(midnightMins),
      maghrib12h: formatMinutesTo12Hour(maghribMins),
    };
  }, [now, maghribTime, fajrTime, qiyamThirdTime, midnightTime]);

  // Gentle Tahajjud Alarm Tone Synth
  const playTahajjudChime = () => {
    if (typeof window === 'undefined') return;
    try {
      setIsPlayingAlarmTest(true);
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        // Play gentle rising pentatonic chime: D4 -> F#4 -> A4 -> D5
        const freqs = [293.66, 369.99, 440.0, 587.33];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.22);
          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.22);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.22 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.22 + 0.55);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.22);
          osc.stop(ctx.currentTime + idx * 0.22 + 0.55);
        });
        setTimeout(() => setIsPlayingAlarmTest(false), 1600);
      }
    } catch {
      setIsPlayingAlarmTest(false);
    }
  };

  // Download Calendar ICS Alarm for phone
  const handleDownloadICS = () => {
    const [qH, qM] = (qiyamThirdTime || '02:30').split(':').map(Number);
    const d = new Date();
    // Set for tonight / next occurrence
    if (now.getHours() > (qH ?? 2)) {
      d.setDate(d.getDate() + 1);
    }
    d.setHours(qH ?? 2, qM ?? 30, 0, 0);

    const pad = (n: number) => String(n).padStart(2, '0');
    const startStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const endStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours() + 1)}${pad(d.getMinutes())}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AMAL OS//Tahajjud Calculator//EN',
      'BEGIN:VEVENT',
      `SUMMARY:🌙 Tahajjud & Sulus al-Akhir (${cityName})`,
      `DESCRIPTION:Sacred Last Third of the Night has begun in ${cityName}. Hadith Qudsi: Allah descends to the lowest heaven offering forgiveness and answering prayers (Sahih al-Bukhari 1145).`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Tahajjud begins in 15 minutes. Prepare with gentle Sunnah wudu and miswak.',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tahajjud-${cityName.toLowerCase().replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAmalToast('Tahajjud alarm calendar event downloaded! Open to add to your mobile calendar.', 'success');
  };

  return (
    <div
      style={{
        marginTop: 24,
        background: calculation.isActive
          ? 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)'
          : 'linear-gradient(135deg, #0F172A 0%, #020617 100%)',
        borderRadius: 16,
        padding: '24px 28px',
        color: '#FFFFFF',
        boxShadow: calculation.isActive
          ? '0 10px 25px -5px rgba(16,185,129,0.3), 0 0 0 1px #34D399'
          : '0 4px 14px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Starry Glow Overlay */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          backgroundColor: calculation.isActive ? 'rgba(52, 211, 153, 0.15)' : 'rgba(56, 189, 248, 0.1)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header & Status Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 24 }}>🌙</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: 12,
                backgroundColor: calculation.isActive ? '#10B981' : '#334155',
                color: '#FFFFFF',
                letterSpacing: 0.5,
              }}
            >
              {calculation.isActive ? '✨ GOLDEN HOURS ACTIVE NOW' : 'TAHAJJUD & SULUS AL-AKHIR'}
            </span>
            <span style={{ fontSize: 12, opacity: 0.75 }}>
              • {cityName}
            </span>
          </div>

          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: calculation.isActive ? '#A7F3D0' : '#F8FAFC' }}>
            Sacred Last Third of the Night (ثلثِ آخر و صلوٰۃ التہجد)
          </h2>
        </div>

        {/* Action Buttons: Alarm Preview & Guide Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={playTahajjudChime}
            disabled={isPlayingAlarmTest}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FDE68A',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
            title="Play gentle morning wake-up chime"
          >
            <span>{isPlayingAlarmTest ? '🔊' : '🔔'}</span>
            <span>{isPlayingAlarmTest ? 'بج رہا ہے...' : 'چائم سنیں'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadICS}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              backgroundColor: calculation.isActive ? '#10B981' : '#059669',
              border: 'none',
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
            title="Download ICS reminder for mobile calendar"
          >
            <span>⏰</span>
            <span>الارم سیٹ کریں (ICS)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              backgroundColor: showGuide ? '#FEF3C7' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: showGuide ? '#92400E' : '#FFFFFF',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span>📖</span>
            <span>{showGuide ? 'طریقہ بند کریں ▲' : 'مسنون طریقہ ▼'}</span>
          </button>
        </div>
      </div>

      {/* Main Countdown & Window Grid */}
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
          <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
            تہجد کا افضل وقت (Last Third Window)
          </span>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#FCD34D', marginTop: 4 }}>
            {calculation.qiyam12h} — {calculation.fajr12h}
          </div>
          <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 2 }}>
            (غروبِ آفتاب تا صبحِ صادق کے رات کا آخری تہائی حصہ)
          </div>
        </div>

        {/* Box 2: Live Status Countdown */}
        <div>
          <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
            {calculation.isActive ? 'وقت کا اختتام (فجر تک باقی)' : 'وقت شروع ہونے میں باقی'}
          </span>
          <div style={{ fontSize: 22, fontWeight: 900, color: calculation.isActive ? '#34D399' : '#38BDF8', marginTop: 4 }}>
            {calculation.formattedDiff}
          </div>
          <div style={{ fontSize: 11, color: '#A7F3D0', marginTop: 2 }}>
            {calculation.isActive ? `فجر کے داخلے تک (${calculation.formattedDiffEn})` : `رات ${calculation.qiyam12h} پر شروع ہوگا`}
          </div>
        </div>

        {/* Box 3: Islamic Midnight (نصف اللیل) */}
        <div>
          <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
            شرعی نصف اللیل (Islamic Midnight)
          </span>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#F1F5F9', marginTop: 4 }}>
            {calculation.midnight12h}
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
            رات کا کل دورانیہ: {calculation.nightDurationHours} گھنٹے
          </div>
        </div>
      </div>

      {/* HADITH QUDSI ACCREDITATION */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          borderLeft: '4px solid #F59E0B',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        <div dir="rtl" style={{ fontFamily: 'var(--font-arabic), "Amiri", serif', fontSize: 17, color: '#FEF3C7', marginBottom: 6 }}>
          «يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ فَيَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ، مَنْ يَسْأَلُنِي فَأُعْطِيَهُ، مَنْ يَسْتَغْفِرُنِي فَأَغْفِرَ لَهُ»
        </div>
        <div dir="rtl" className="font-urdu" style={{ fontSize: 13, color: '#E2E8F0' }}>
          رسول اللہ ﷺ نے فرمایا: ہمارا پروردگار تبارک و تعالی ہر رات آسمانِ دنیا پر نزولِ اجلال فرماتا ہے جب رات کا آخری تہائی حصہ باقی رہ جاتا ہے، اور ارشاد فرماتا ہے: کون ہے جو مجھ سے دعا کرے تاکہ میں اس کی دعا قبول کروں؟ کون ہے جو مجھ سے مانگے تاکہ میں اسے عطا کروں؟ کون ہے جو مجھ سے مغفرت طلب کرے تاکہ میں اسے بخش دوں؟ (صحیح البخاری: 1145، صحیح مسلم: 758)
        </div>
      </div>

      {/* EXPANDABLE SUNNAH TAHAJJUD GUIDE */}
      {showGuide && (
        <div
          style={{
            marginTop: 18,
            padding: '18px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800, color: '#FDE68A' }}>
            مسنون صلوٰۃ التہجد کا طریقہ و سنن (بہارِ شریعت و کتبِ فقہ)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                1. بیداری و مسواک
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                چہرے سے نیند کے آثار زائل کریں، مسواک کے ساتھ مکمل طہارت و وضو فرمائیں اور رسول اللہ ﷺ کی یہ مسنون دعا پڑھیں:
                <em style={{ display: 'block', marginTop: 4, color: '#FEF3C7' }}>
                  «الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ»
                </em>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                2. تعدادِ رکعات
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                تہجد کی کم سے کم ۲ رکعتیں اور مسنون تعداد ۸ رکعتیں ہیں۔ دو دو رکعت کر کے نیت فرمائیں۔ ہر دو رکعت پر سلام پھیرنا مستحب ہے۔
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                3. قراءت و خشوع
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                رات کی خاموشی میں قرآن کریم کی آیات ترتیل اور تدبر کے ساتھ تلاوت فرمائیں۔ رکوع و سجود کو دراز رکھیں اور بارگاہِ الٰہی میں عاجزی اختیار کریں۔
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                4. وتر و سحر کا استغفار
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                اگر عشاء کے بعد وتر نہ پڑھے ہوں تو تہجد کے بعد ۳ رکعت وتر ادا فرمائیں۔ فجر کے داخلے سے قبل آخری لمحات میں سید الاستغفار اور توبہ و استغفار کثرت سے کریں۔
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
