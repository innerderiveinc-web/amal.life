import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { showAmalToast } from '../Toast';

interface SunnahTask {
  id: string;
  timeSlot: 'MORNING' | 'DAY' | 'EVENING' | 'NIGHT';
  titleUrdu: string;
  titleEnglish: string;
  virtueUrdu: string;
  virtueEnglish: string;
  hadithRef: string;
  icon: string;
}

const SUNNAH_DAILY_TASKS: SunnahTask[] = [
  // Dawn & Morning
  {
    id: 'tahajjud_istighfar',
    timeSlot: 'MORNING',
    titleUrdu: 'تہجد اور استغفارِ سحر',
    titleEnglish: 'Tahajjud Prayer & Pre-Dawn Istighfar',
    virtueUrdu: 'رات کے آخری پہر رب تعالیٰ آسمانِ دنیا پر نزول فرماتا ہے اور دعائیں قبول ہوتی ہیں۔',
    virtueEnglish: 'Divine descent to the lowest heaven in the final third of the night; answered prayers.',
    hadithRef: 'صحیح البخاری: ۱۱۴۵',
    icon: '🌌',
  },
  {
    id: 'fajr_prayer',
    timeSlot: 'MORNING',
    titleUrdu: 'فجر کی ۲ سنتیں اور فرض نماز',
    titleEnglish: 'Fajr 2 Sunnahs & Fard Prayer',
    virtueUrdu: 'فجر کی دو سنتیں دنیا اور جو کچھ دنیا میں ہے اس سب سے بہتر ہیں۔',
    virtueEnglish: 'The 2 Sunnahs of Fajr are better than the entire world and all it contains.',
    hadithRef: 'صحیح مسلم: ۷۲۵',
    icon: '🌅',
  },
  {
    id: 'ishraq_prayer',
    timeSlot: 'MORNING',
    titleUrdu: 'طلوعِ آفتاب کے بعد صلوٰۃ الاشراق',
    titleEnglish: 'Ishraq Prayer Post-Sunrise',
    virtueUrdu: 'فجر کے بعد ذکر میں بیٹھ کر اشراق پڑھنے پر مکمل حج اور عمرہ کا ثواب ہے۔',
    virtueEnglish: 'Reward of a complete Hajj and Umrah for remembering Allah till sunrise and praying Ishraq.',
    hadithRef: 'جامع الترمذی: ۵۸۶',
    icon: '☀️',
  },
  {
    id: 'morning_adhkar_ayatur_kursi',
    timeSlot: 'MORNING',
    titleUrdu: 'صبح کے مسنون اذکار و آیۃ الکرسی',
    titleEnglish: 'Morning Sunnah Adhkar & Ayatul Kursi',
    virtueUrdu: 'دن بھر شیاطین، جادو، حسد اور حادثات سے اللہ تعالیٰ کی مکمل پناہ۔',
    virtueEnglish: 'Divine shield from demons, envy, accidents, and sudden harms until evening.',
    hadithRef: 'صحیح البخاری: ۲۳۱۱',
    icon: '🛡️',
  },

  // Day & Afternoon
  {
    id: 'chasht_duha',
    timeSlot: 'DAY',
    titleUrdu: 'چاشت کے نوافل (صلوٰۃ الضحیٰ - ۲ یا ۴ رکعت)',
    titleEnglish: 'Salat al-Duha (Chasht 2–4 Rakahs)',
    virtueUrdu: 'انسانی جسم کے تمام ۳۶۰ جوڑوں کے صدقے کے برابر ثواب ملتا ہے۔',
    virtueEnglish: 'Fulfills the daily charity (Sadaqah) owed on all 360 joints of the human body.',
    hadithRef: 'صحیح مسلم: ۷۲۰',
    icon: '✨',
  },
  {
    id: 'dhuhr_sunnahs',
    timeSlot: 'DAY',
    titleUrdu: 'ظہر سے قبل ۴ سنتیں اور بعد کی ۲ سنتیں',
    titleEnglish: 'Dhuhr 4 Sunnahs Before & 2 After',
    virtueUrdu: 'جو ظہر سے قبل ۴ رکعت پڑھے اس کے لیے آسمان کے دروازے کھولے جاتے ہیں۔',
    virtueEnglish: 'The gates of heaven open for the 4 Sunnah rakahs prior to Dhuhr.',
    hadithRef: 'جامع الترمذی: ۴۷۸',
    icon: '🕌',
  },
  {
    id: 'asr_sunnah',
    timeSlot: 'DAY',
    titleUrdu: 'عصر سے قبل ۴ سنتِ غیر مؤکدہ',
    titleEnglish: '4 Sunnah Rakahs Before Asr',
    virtueUrdu: 'رسول اللہ ﷺ نے فرمایا: اللہ اس پر رحم فرمائے جس نے عصر سے پہلے ۴ رکعت پڑھیں۔',
    virtueEnglish: 'The Prophet ﷺ prayed: "May Allah have mercy upon one who prays 4 rakahs before Asr."',
    hadithRef: 'جامع الترمذی: ۴۳۰',
    icon: '🌤️',
  },

  // Evening & Sunset
  {
    id: 'evening_adhkar_muawwidhat',
    timeSlot: 'EVENING',
    titleUrdu: 'شام کے مسنون اذکار و تینوں قل',
    titleEnglish: 'Evening Adhkar & 3 Protective Quls',
    virtueUrdu: 'مغرب کے وقت رات کے تمام فتنوں اور زہریلے جانوروں سے امان۔',
    virtueEnglish: 'Protection against venomous creatures, nightmare anxieties, and nocturnal harms.',
    hadithRef: 'صحیح مسلم: ۲۷۰۹',
    icon: '🌇',
  },
  {
    id: 'awwabin_prayer',
    timeSlot: 'EVENING',
    titleUrdu: 'مغرب کے بعد صلوٰۃ الاوابین (۶ رکعت)',
    titleEnglish: 'Salat al-Awwabin (6 Rakahs After Maghrib)',
    virtueUrdu: 'مغرب کے بعد ۶ رکعت پڑھنے والے کو ۱۲ سال کی عبادت کا ثواب ملتا ہے۔',
    virtueEnglish: 'Equivalent to 12 years of voluntary worship without speaking evil.',
    hadithRef: 'جامع الترمذی: ۴۳۵',
    icon: '🌸',
  },

  // Night & Sleep
  {
    id: 'surah_mulk_sleep',
    timeSlot: 'NIGHT',
    titleUrdu: 'سوتے وقت سورۃ الملک کی تلاوت',
    titleEnglish: 'Recitation of Surah Al-Mulk at Bedtime',
    virtueUrdu: '۳۰ آیات والی یہ سورت قبر کے عذاب سے قاری کی سفارش کر کے بخشوا دیتی ہے۔',
    virtueEnglish: 'Intercedes for the reader until forgiven, protecting against grave trials.',
    hadithRef: 'جامع الترمذی: ۲۸۹۱',
    icon: '📖',
  },
  {
    id: 'tasbih_fatimah',
    timeSlot: 'NIGHT',
    titleUrdu: 'تسبیحِ فاطمہ (۳۳ سبحان اللہ، ۳۳ الحمد للہ، ۳۴ اللہ اکبر)',
    titleEnglish: 'Tasbih-e-Fatimah (33-33-34)',
    virtueUrdu: 'دن بھر کی جسمانی تھکاوٹ دور ہوتی ہے اور خادم سے بہتر روحانی طاقت ملتی ہے۔',
    virtueEnglish: 'Bestows spiritual energy, relieves physical fatigue, and brings peaceful rest.',
    hadithRef: 'صحیح البخاری: ۳۷۰۵',
    icon: '📿',
  },
  {
    id: 'bedtime_sunnahs',
    timeSlot: 'NIGHT',
    titleUrdu: 'باوضو سونا، بستر جھاڑنا اور دائیں کروٹ لیٹنا',
    titleEnglish: 'Sleeping with Wudu, Dusting Bed & Lying on Right Side',
    virtueUrdu: 'باوضو سونے والے کے سرہانے فرشتہ رات بھر اس کے لیے بخشش کی دعا مانگتا رہتا ہے۔',
    virtueEnglish: 'An angel remains beside the one sleeping in Wudu, praying for their forgiveness.',
    hadithRef: 'صحیح ابن حبان: ۱۰۵۱',
    icon: '🌙',
  },
];

export const DailySunnahChecklistCard: React.FC = () => {
  const { isUrdu } = useLanguage();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<string>('ALL');
  const [isExpanded, setIsExpandedState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_sunnah_checklist_expanded');
      if (saved !== null) return saved === 'true';
    }
    return true; // Default open, remembers collapse state
  });

  const setIsExpanded = (val: boolean) => {
    setIsExpandedState(val);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('amal_sunnah_checklist_expanded', String(val));
      } catch (e) {
        console.warn('Failed to save checklist expanded state:', e);
      }
    }
  };

  const todayKey = useMemo(() => {
    const d = new Date();
    return `amal_sunnah_checklist_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(todayKey);
        if (saved) setCompletedTasks(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to load Sunnah checklist:', e);
      }
    }
  }, [todayKey]);

  const toggleTask = (taskId: string, title: string) => {
    const nextState = !completedTasks[taskId];
    const updated = { ...completedTasks, [taskId]: nextState };
    setCompletedTasks(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(todayKey, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save Sunnah checklist:', e);
      }
    }
    if (nextState) {
      showAmalToast(`ما شاء اللہ! سنت پر عمل مکمل ہوا: ${title}`, 'success');
    }
  };

  const filteredTasks = useMemo(() => {
    if (selectedSlotFilter === 'ALL') return SUNNAH_DAILY_TASKS;
    return SUNNAH_DAILY_TASKS.filter((t) => t.timeSlot === selectedSlotFilter);
  }, [selectedSlotFilter]);

  const totalCount = SUNNAH_DAILY_TASKS.length;
  const completedCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length;
  }, [completedTasks]);
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: '22px 24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
        marginBottom: 28,
      }}
    >
      {/* Header & Daily Progress */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          paddingBottom: isExpanded ? 14 : 0,
          borderBottom: isExpanded ? '1px solid #F1F5F9' : 'none',
          marginBottom: isExpanded ? 16 : 0,
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: 11,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 6,
              }}
            >
              🌿 {isUrdu ? 'روزمرہ مسنون معمولات' : 'DAILY SUNNAH LIFESTYLE'}
            </span>
            <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
              {isUrdu ? '۱۲ مسنون اعمال کی لائیو چیک لسٹ' : '12 Authentic Sunnah Actions Today'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
              {isUrdu ? 'اسوۂ رسول ﷺ کا عملی روزنامچہ' : 'Daily Prophetic Sunnah Checklist'}
            </h2>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: isExpanded ? '#475569' : '#059669',
                backgroundColor: isExpanded ? '#F1F5F9' : '#DCFCE7',
                padding: '2px 8px',
                borderRadius: 12,
              }}
            >
              {isExpanded ? (isUrdu ? 'کھلا ہے ▲' : 'Open ▲') : (isUrdu ? 'کھولیں ▼' : 'Tap to View ▼')}
            </span>
          </div>
        </div>

        {/* Progress Badge & Accordion Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: isUrdu ? 'left' : 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
              {completedCount} / {totalCount} {isUrdu ? 'سنتیں مکمل' : 'Done'} ({progressPercent}%)
            </div>
            <div
              style={{
                width: 130,
                height: 6,
                backgroundColor: '#E2E8F0',
                borderRadius: 3,
                marginTop: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#059669',
                  borderRadius: 3,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: isExpanded ? '#F1F5F9' : '#ECFDF5',
              color: isExpanded ? '#334155' : '#065F46',
              border: isExpanded ? '1px solid #CBD5E1' : '1px solid #A7F3D0',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>{isExpanded ? '▲' : '▼'}</span>
            <span>{isExpanded ? (isUrdu ? 'سمیٹیں' : 'Collapse') : (isUrdu ? 'دیکھیں' : 'Expand')}</span>
          </button>
        </div>
      </div>

      {/* Collapsed One-Line Teaser */}
      {!isExpanded && (
        <div
          onClick={() => setIsExpanded(true)}
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px dashed #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12.5,
            color: '#64748B',
            cursor: 'pointer',
          }}
        >
          <span>
            {isUrdu
              ? `صبح، دوپہر، شام اور رات کے مسنون معمولات پر عمل کریں (${completedCount} مکمل)`
              : `Tap to review and check off daily Sunnahs (${completedCount} of ${totalCount} completed)`}
          </span>
          <span style={{ color: '#059669', fontWeight: 700 }}>
            {isUrdu ? 'فہرست کھولیں ➔' : 'Expand Checklist ➔'}
          </span>
        </div>
      )}

      {/* Expanded Content View */}
      {isExpanded && (
        <>
          {/* Motivational Hadith */}
          <div
            style={{
              backgroundColor: '#FFFBEB',
              borderRadius: 10,
              padding: '10px 14px',
              border: '1px solid #FDE68A',
              marginBottom: 16,
              fontSize: 12.5,
              color: '#92400E',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>💎</span>
            <div>
              {isUrdu ? (
                <span>
                  <strong>فرمانِ رسول ﷺ: </strong>
                  &quot;جس نے میری سنت کو زندہ کیا اس نے مجھ سے محبت کی، اور جس نے مجھ سے محبت کی وہ جنت میں میرے ساتھ ہوگا&quot;۔ (جامع الترمذی)
                </span>
              ) : (
                <span>
                  <strong>Prophetic Promise: </strong>
                  &quot;Whoever revives my Sunnah loves me, and whoever loves me will be with me in Paradise.&quot; (Jami&apos; at-Tirmidhi)
                </span>
              )}
            </div>
          </div>

      {/* Filter & Slot Controls Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 14,
          flexWrap: 'wrap',
        }}
      >
            {/* Slot Dropdown Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#334155' }}>
                {isUrdu ? 'وقت کا فلٹر:' : 'Filter Slot:'}
              </span>
              <select
                value={selectedSlotFilter}
                onChange={(e) => setSelectedSlotFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="ALL">{isUrdu ? 'تمام ۱۲ معمولات (All 12)' : 'All 12 Sunnahs'}</option>
                <option value="MORNING">{isUrdu ? 'صبح و فجر (Dawn / Morning - 4)' : 'Dawn / Morning (4)'}</option>
                <option value="DAY">{isUrdu ? 'دوپہر و عصر (Day / Midday - 3)' : 'Day / Midday (3)'}</option>
                <option value="EVENING">{isUrdu ? 'مغرب و شام (Evening - 2)' : 'Evening (2)'}</option>
                <option value="NIGHT">{isUrdu ? 'عشاء و رات (Night / Sleep - 3)' : 'Night / Sleep (3)'}</option>
              </select>
            </div>

            {/* Quick Pills */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
              {[
                { key: 'ALL', labelUrdu: 'تمام', labelEn: 'All' },
                { key: 'MORNING', labelUrdu: 'صبح', labelEn: 'Morning' },
                { key: 'DAY', labelUrdu: 'دوپہر', labelEn: 'Day' },
                { key: 'EVENING', labelUrdu: 'شام', labelEn: 'Evening' },
                { key: 'NIGHT', labelUrdu: 'رات', labelEn: 'Night' },
              ].map((slot) => (
                <button
                  key={slot.key}
                  onClick={() => setSelectedSlotFilter(slot.key)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 16,
                    fontSize: 11.5,
                    fontWeight: 700,
                    border: selectedSlotFilter === slot.key ? '1px solid #065F46' : '1px solid #E2E8F0',
                    backgroundColor: selectedSlotFilter === slot.key ? '#065F46' : '#F8FAFC',
                    color: selectedSlotFilter === slot.key ? '#FFFFFF' : '#475569',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isUrdu ? slot.labelUrdu : slot.labelEn}
                </button>
              ))}
            </div>
          </div>

      {/* Checklist Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
        {filteredTasks.map((task) => {
          const isDone = !!completedTasks[task.id];
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id, isUrdu ? task.titleUrdu : task.titleEnglish)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                backgroundColor: isDone ? '#F0FDF4' : '#FAFAFA',
                border: isDone ? '1px solid #86EFAC' : '1px solid #E5E7EB',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Checkbox Icon */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  backgroundColor: isDone ? '#059669' : '#FFFFFF',
                  border: isDone ? '1px solid #059669' : '1px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 800,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {isDone ? '✓' : ''}
              </div>

              {/* Task Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isDone ? '#065F46' : '#1E293B',
                      textDecoration: isDone ? 'line-through' : 'none',
                    }}
                  >
                    {task.icon} {isUrdu ? task.titleUrdu : task.titleEnglish}
                  </span>
                  <span style={{ fontSize: 10, color: '#9CA3AF' }}>{task.hadithRef}</span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: isDone ? '#15803D' : '#64748B',
                    marginTop: 3,
                    lineHeight: 1.4,
                  }}
                >
                  {isUrdu ? task.virtueUrdu : task.virtueEnglish}
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}
    </div>
  );
};
