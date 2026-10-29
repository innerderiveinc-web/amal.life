import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { showAmalToast } from '../Toast';

interface QadhaTrackerState {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  witr: number;
}

export function QadhaAndContemporaryFiqhTab() {
  const { isUrdu } = useLanguage();

  // 1. Calculator Inputs
  const [missedYears, setMissedYears] = useState<number>(2);
  const [missedMonths, setMissedMonths] = useState<number>(0);
  const [completedDays, setCompletedDays] = useState<number>(0);

  // 2. Individual Daily Counter State (Persistent via LocalStorage)
  const [completedCounts, setCompletedCounts] = useState<QadhaTrackerState>({
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
    witr: 0,
  });

  const [activeFaqAccordion, setActiveFaqAccordion] = useState<string | null>('faq-1');

  // Load saved tracker state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('amal_qadha_tracker');
        if (saved) {
          setCompletedCounts(JSON.parse(saved));
        }
        const savedYears = localStorage.getItem('amal_qadha_years');
        if (savedYears) setMissedYears(Number(savedYears));
        const savedMonths = localStorage.getItem('amal_qadha_months');
        if (savedMonths) setMissedMonths(Number(savedMonths));
      } catch (e) {
        console.error('Error loading qadha tracker', e);
      }
    }
  }, []);

  const saveTracker = (newCounts: QadhaTrackerState) => {
    setCompletedCounts(newCounts);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_qadha_tracker', JSON.stringify(newCounts));
    }
  };

  const handleUpdateYears = (y: number) => {
    setMissedYears(y);
    if (typeof window !== 'undefined') localStorage.setItem('amal_qadha_years', String(y));
  };

  const handleUpdateMonths = (m: number) => {
    setMissedMonths(m);
    if (typeof window !== 'undefined') localStorage.setItem('amal_qadha_months', String(m));
  };

  const incrementPrayer = (prayer: keyof QadhaTrackerState) => {
    const updated = { ...completedCounts, [prayer]: completedCounts[prayer] + 1 };
    saveTracker(updated);
    showAmalToast(isUrdu ? `ایک ${prayer} قضا نماز کا اندراج ہو گیا` : `Recorded 1 ${prayer} Qadha Salah`, 'success');
  };

  const decrementPrayer = (prayer: keyof QadhaTrackerState) => {
    if (completedCounts[prayer] <= 0) return;
    const updated = { ...completedCounts, [prayer]: completedCounts[prayer] - 1 };
    saveTracker(updated);
  };

  // Math Calculations
  const totalDaysOwed = Math.round(missedYears * 365 + missedMonths * 30.4);
  const totalPrayersPerType = totalDaysOwed;
  const totalAllPrayersOwed = totalDaysOwed * 6; // Fajr, Dhuhr, Asr, Maghrib, Isha, Witr
  const totalAllPrayersCompleted =
    completedCounts.fajr +
    completedCounts.dhuhr +
    completedCounts.asr +
    completedCounts.maghrib +
    completedCounts.isha +
    completedCounts.witr;

  const overallProgressPercentage = totalAllPrayersOwed > 0
    ? Math.min(100, Math.round((totalAllPrayersCompleted / totalAllPrayersOwed) * 100))
    : 0;

  const faqs = [
    {
      id: 'faq-1',
      titleUrdu: '۱. قضاء عمری کا شرعی حکم اور ادا کرنے کی ترتیب',
      titleEnglish: '1. Obligation of Qadha-e-Umri & System of Makeup Prayers',
      category: 'Salah',
      source: 'صحیح البخاری #1953 / فتاویٰ رضویہ ج ۸ / درِ مختار',
      urduContent: `رسول اللہ ﷺ کا فرمانِ واجب الاذعان ہے: «فَدَيْنُ اللَّهِ أَحَقُّ أَنْ يُقْضَى» (پس اللہ کا قرض سب سے زیادہ ادائیگی کا حقدار ہے - صحیح بخاری)۔ 
جس شخص کے ذمے کئی سالوں کی نمازیں قضا ہوں، اس پر توبہ کے ساتھ ساتھ ان تمام نمازوں کو زندگی میں جلد از جلد ادا کرنا فرض ہے۔
فقہ حنفی کے قواعد:
۱. نیت کا طریقہ: جب سالہا سال کی نمازیں ہوں تو یوں نیت کرے: "میں اپنی قضا شدہ نمازوں میں سے سب سے پہلی فجر (یا سب سے آخری فجر) کی نیت کرتا ہوں"۔
۲. نفلو پر قضا کو ترجیح: سوائے سننِ مؤکدہ (فجر کی دو سنتیں، ظہر کی چار، وغیرہ) اور تراویح کے، عام نفل نمازوں (جیسے صلوۃ التسبیح یا اشراق/چاشت کے زائد نفل) کے بدلے قضا نمازیں پڑھنا زیادہ افضل اور عند اللہ بری الذمہ کرنے والا ہے۔`,
      englishContent: `The Messenger of Allah ﷺ explicitly commanded: "The debt owed to Allah is most deserving of being fulfilled" (Sahih al-Bukhari #1953).
Whoever has accumulated years of missed obligatory prayers must make sincere Tawbah and systematically pray them until free of debt.
Key Hanafi Rules:
1. Formulation of Intention (Niyyah): Formulate intention as: "I intend to pray the first (or last) Fajr/Dhuhr/etc. that is due upon me."
2. Priority over Nawafil: Except for confirmed Sunnahs (Sunan Mu'akkadah) and Tarawih, expending time on Qadha prayers is far more legally meritorious than optional supererogatory prayers (Nawafil), as removing a mandatory liability precedes non-binding devotions.`,
    },
    {
      id: 'faq-2',
      titleUrdu: '۲. کثرتِ قضا والوں کے لیے فقہی تخفیف و آسانی (فتاویٰ رضویہ)',
      titleEnglish: '2. Classical Legal Concessions (Takhfif) for Large Backlogs',
      category: 'Facilitation',
      source: 'رد المحتار علی الدر المختار باب قضاء الفوائت / فتاویٰ رضویہ',
      urduContent: `امام احمد رضا خان اور فقہائے احناف نے ان حضرات کے لیے جن کے ذمہ ۲۰-۳۰ سال کی کثیر نمازیں ہوں، تیزی سے قضا ادا کرنے کے لیے چند شرعی رعایتیں ذکر فرمائی ہیں جن سے وقت ایک تہائی رہ جاتا ہے اور نماز صحیح ادا ہوتی ہے:
۱. رکوع اور سجود میں تین کے بجائے ایک بار "سبحان ربی العظیم" اور "سبحان ربی الاعلیٰ" کہہ کر اگلا رکن شروع کر سکتے ہیں۔
۲. فرض نمازوں کی تیسری اور چوتھی رکعت میں سورۂ فاتحہ کے بجائے تین بار "سبحان اللہ" کہہ کر رکوع میں جا سکتے ہیں۔
۳. آخری قعدہ میں التحیات کے بعد درودِ ابراہیم کے بجائے مختصر درود "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ" اور پھر فوراً سلام پھیر سکتے ہیں۔
۴. وتر کی تیسری رکعت میں دعائے قنوت کے بجائے ایک بار "رَبِّ اغْفِرْ لِي" کہہ کر رکوع کر سکتے ہیں۔
نوٹ: یہ رخصتیں صرف فرض قضا کے لیے ہیں، ادا نماز میں پوری سنتوں کا اہتمام لازم ہے۔`,
      englishContent: `To enable believers with decades of missed prayers to clear their debt without physical exhaustion or despair, classical Hanafi authorities (including Ibn Abidin in Radd al-Muhtar and Imam Ahmad Raza Khan in Fatawa Razawiyyah) detailed valid expediting concessions (Takhfif):
1. In Ruku & Sujood: Reciting "Subhana Rabbiyal Azim" and "Subhana Rabbiyal A'la" once instead of three times.
2. In 3rd & 4th Rak'ahs of Fard: Saying "SubhanAllah" three times instead of reciting Surah al-Fatihah (as reciting Fatihah in the final two units of Fard is Sunnah in Hanafi fiqh, not Fard).
3. In Final Qa'dah: After At-Tahiyyat, reciting the brief Salawat "Allahumma Salli ala Muhammadin wa Aalihi" and turning for Salam immediately without prolonged supplication.
4. In Witr: Saying "Rabbighfirli" once in place of the longer Dua al-Qunoot.
Important: These dispensations apply strictly to clearing massive Qadha backlogs, not daily current prayers.`,
    },
    {
      id: 'faq-3',
      titleUrdu: '۳. ہوائی جہاز، ٹرین اور سفر میں نماز کے فقہی احکام (نمازِ مسافر)',
      titleEnglish: '3. Prayer While Traveling: Airplanes, Trains & Transit (Salat al-Musafir)',
      category: 'Travel',
      source: 'الہدایہ کتاب الصلاۃ / فتاویٰ ہندیہ باب صلاۃ المسافر',
      urduContent: `سفرِ شرعی کی مسافت تقریباً ۷۷.۲ کلومیٹر (۴۸ شرعی میل) ہے جب کوئی شخص اپنے شہر کی آبادی سے باہر نکلے۔
۱. قصر کا حکم: فقہ حنفی میں مسافر کے لیے چار رکعت والے فرائض (ظہر، عصر، عشاء) کو دو رکعت پڑھنا واجب ہے، پوری پڑھنا مکروہِ تحریمی ہے۔ فجر، مغرب اور وتر میں قصر نہیں ہوتا۔
۲. ہوائی جہاز میں نماز:
- اگر کھڑے ہو کر قبلہ رخ نماز پڑھنا ممکن ہو تو کھڑے ہو کر قبلہ رخ نماز ادا کرنا فرض ہے (جہاز کی گیلری یا خالی جگہ پر)۔
- اگر کھڑے ہونا ممکن نہ ہو یا عملہ اجازت نہ دے، تو نشست پر بیٹھ کر اشارے سے نماز پڑھ لے، لیکن بحفاظت زمین پر اترنے کے بعد اس نماز کا اعادہ (دوبارہ پڑھنا) احتیاطاً لازم ہے کیونکہ زمین سے ملاپ اور قیام شرط ہے۔
۳. چلتی ٹرین میں نماز: چلتی ٹرین میں بھی قبلہ رخ ہو کر کھڑے ہو کر نماز پڑھنا لازم ہے، ٹرین مڑنے پر قبلہ کی طرف رخ پھیرتے رہیں۔`,
      englishContent: `The canonical travel threshold (Shar'i Safar) begins once a person travels beyond the outskirts of their city with an intended journey of 77.2 km (48 miles) or more:
1. Ruling of Qasr (Shortening): In the Hanafi school, shortening 4-unit Fard prayers (Dhuhr, Asr, Isha) to 2 units is Wajib (mandatory). Fajr (2), Maghrib (3), and Witr (3) are never shortened.
2. Prayer on Airplanes:
- If physical standing facing the Qiblah is possible (in the galley or open rear area), standing with full Ruku and Sujood is legally mandatory.
- If standing is impossible due to severe turbulence or airline crew prohibition, pray seated with head gestures (Ishaarah) to respect the prayer time, but repeat (I'adah) the prayer upon landing, as physical contact with the earth and standing (Qiyam) are core pillars.
3. On Moving Trains: One must pray standing facing the Qiblah; as the train rounds curves, gently adjust body orientation towards the Ka'bah.`,
    },
    {
      id: 'faq-4',
      titleUrdu: '۴. روزے کے معاصر طبی مسائل: انجکشن، ڈرپ، انسولین اور فدیہ',
      titleEnglish: '4. Fasting with Medical Conditions: Injections, IV Drips, Inhalers & Fidyah',
      category: 'Medical Fiqh',
      source: 'مجمع الفقہ الاسلامی الدولی / فتاویٰ امجدیہ / قرارات دار الافتاء',
      urduContent: `معاصر فقہی کونسلوں اور مقتدر علمائے اہل سنت کی اجتماعی تحقیق کے مطابق:
۱. گوشت یا رگ کا انجکشن (Intramuscular / Intravenous): انسولین، اینٹی بائیوٹک یا درد کا انجکشن لگانے سے روزہ نہیں ٹوٹتا، کیونکہ دوائی رگ یا پٹھے میں داخل ہوتی ہے، معدے یا دماغ کے قدرتی منفذ (حلق) سے داخل نہیں ہوتی۔
۲. طاقت کی گلوکوز ڈرپ: بلاوجہ محض بھوک مٹانے کے لیے گلوکوز چڑھوانا مکروہ ہے، البتہ شدید نقاہت کے علاج کے لیے ہو تو روزہ نہیں ٹوٹتا۔
۳. انہیلر (Asthma Inhaler): دمہ کے انہیلر سے دوا پھیپھڑوں اور سانس کی نالی کے ذریعے اندر جاتی ہے جس سے روزہ فاسد ہو جاتا ہے، اس دن کی بعد میں صرف قضا لازم ہوگی۔
۴. شوگر اور دائمی مریض: وہ بوڑھے یا شدید مریض جن کے مرض کے ٹھیک ہونے کی طبی امید نہ ہو، وہ روزے کے بدلے روزانہ ایک فدیہ (ایک صدقہ فطر = ۱.۹۲ کلو گندم یا اس کی نقدی قیمت) کسی غریب مستحق کو ادا کریں۔`,
      englishContent: `According to the consensus of contemporary Sunni legal assemblies and traditional Hanafi jurists:
1. Injections & Insulin: Subcutaneous, intramuscular, and intravenous injections (such as insulin for diabetes, pain relievers, or vaccines) DO NOT break the fast, because medicine enters muscles and bloodstream rather than direct stomach/brain cavities via natural orifices.
2. Glucose / Saline Drips: Administering nutritional IV drips merely to avoid hunger is disliked (Makruh); if taken for medical emergency or genuine weakness, the fast remains legally intact.
3. Asthma Inhalers: Because pressurized inhalers aerosolize liquid medication through the esophagus into the respiratory tract, they invalidate the fast according to the dominant opinion. The patient takes the medication when breathing is restricted and makes up the day later when possible.
4. Chronic Illness & Fidyah: Patients with terminal conditions, severe brittle diabetes, or frail elderly who cannot fast without endangering life pay Fidyah for each missed fast: the equivalent of one Sadaqat al-Fitr (~1.92 kg of wheat or its local cash value) to an eligible needy person.`,
    },
    {
      id: 'faq-5',
      titleUrdu: '۵. دفاتر، اسکولوں اور یونیورسٹیوں میں نماز اور ستر کا انتظام',
      titleEnglish: '5. Workplace & University Prayer Accommodations & Modesty',
      category: 'Daily Life',
      source: 'فقہ السیرۃ / حقوق العمال فی الاسلام / رہنمائے زندگی',
      urduContent: `دفتر یا تعلیمی ادارے میں نمازِ پنجگانہ کا اہتمام ایمان کی علامت ہے:
۱. قانونی حق: دنیا کے بیشتر ممالک اور لیبر قوانین میں ملازمین کو مختصر عبادت اور نماز کے لیے ۱۰-۱۵ منٹ کا وقفہ قانونی حق کے طور پر تسلیم کیا گیا ہے۔ انتظامیہ سے باقاعدہ احترام کے ساتھ خالی کانفرنس روم یا پرسکون کمرے کی اجازت لینا سنت ہے۔
۲. آسان وضو کا طریقہ: دفتر کے واش روم میں استنجا اور وضو کے لیے چھوٹی بوتل یا وائپس ساتھ رکھیں۔ اگر پہلے سے باوضو ہو کر چمڑے یا مخصوص واٹر پروف موزے (خفین) پہنے ہوں تو پاؤں دھونے کے بجائے ان پر مسح کرنا شرعاً جائز اور آسان ہے۔
۳. وقت کا انتظام: لنچ بریک کو ظہر کی نماز سے ہم آہنگ کریں، اور عصر کی ۴ رکعت فرض کے لیے ۵ منٹ نکالنا ہر مسلمان پر لازمی ہے۔ کسی بھی صورت میں نماز کو بغیر عذرِ شرعی قضا کرنا سخت حرام ہے۔`,
      englishContent: `Observing daily Salah in corporate, academic, and clinical environments is a hallmark of steadfast Islamic identity:
1. Legal Accommodations: Under labor laws and equal opportunity statutes in most jurisdictions, employees have the protected legal right to reasonable religious accommodation, including a 10-15 minute prayer break. Request access politely to a quiet conference room or wellness space.
2. Efficient Ablution: Carry a personal discreet water container. If one performs Wudu and dons certified waterproof socks or leather socks (Khuffayn) in the morning, one can simply wipe (Masah) over the top of the socks during subsequent office Wudus without removing footwear for 24 hours (72 hours for travelers).
3. Time Management: Synchronize lunch break with Dhuhr, and schedule a 5-minute break for Asr. Missing a prayer due to corporate meetings is strictly impermissible (Haram) when a brief recess could be taken.`,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. Header Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 26 }}>📿</span>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B4332', margin: 0 }}>
            {isUrdu ? 'قضاءِ عمری کا حسابی نظام اور معاصر فقہی مسائل' : 'Qadha-e-Umri Calculator & Contemporary Fiqh FAQs'}
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
          {isUrdu
            ? 'سالہا سال کی چھوٹ جانے والی نمازوں کا مکمل تخمینہ، فقہ حنفی کے مطابق آسان تخفیف کا طریقہ، اور جدید مسلم خاندانوں کے سلگتے مسائل (سفر، طبی عوارض، اور دفتری نماز) کے مستند حل۔'
            : 'Deterministic calculator for lifetime missed prayers with classical Hanafi expedited rules (Takhfif) and authoritative guidance for contemporary dilemmas.'}
        </p>
      </div>

      {/* 2. Interactive Lifetime Missed Prayers (Qadha-e-Umri) Engine */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
              {isUrdu ? 'قضاء عمری کیلکولیٹر (چھوٹی ہوئی نمازوں کا حساب)' : 'Lifetime Missed Salah (Qadha-e-Umri) Calculator'}
            </h3>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {isUrdu ? 'بلوغت کے بعد سے چھوٹی ہوئی نمازوں کی مدت درج کریں' : 'Enter years and months of unprayed Salah since puberty (Bulugh)'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#065F46', backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: 8 }}>
              {isUrdu ? `${totalDaysOwed} کل ایام (${totalAllPrayersOwed} نمازیں)` : `${totalDaysOwed} Total Days (${totalAllPrayersOwed} Prayers)`}
            </span>
          </div>
        </div>

        {/* Sliders / Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
          <div style={{ backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                {isUrdu ? 'چھوٹے ہوئے سال:' : 'Missed Years:'}
              </label>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#1B4332' }}>{missedYears} {isUrdu ? 'سال' : 'Years'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={missedYears}
              onChange={(e) => handleUpdateYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#1B4332' }}
            />
          </div>

          <div style={{ backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                {isUrdu ? 'اضافی مہینے:' : 'Additional Months:'}
              </label>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#1B4332' }}>{missedMonths} {isUrdu ? 'ماہ' : 'Months'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="11"
              value={missedMonths}
              onChange={(e) => handleUpdateMonths(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#1B4332' }}
            />
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
              {isUrdu ? 'مجموعی قضاء کی ادائیگی کا تناسب:' : 'Overall Debt Liquidation Progress:'}
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>
              {totalAllPrayersCompleted} / {totalAllPrayersOwed} ({overallProgressPercentage}%)
            </span>
          </div>
          <div style={{ width: '100%', height: 10, backgroundColor: '#DCFCE7', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                width: `${overallProgressPercentage}%`,
                height: '100%',
                backgroundColor: '#16A34A',
                borderRadius: 6,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Individual Daily Prayers Counter Grid */}
        <h4 style={{ fontSize: 14, fontWeight: 800, color: '#334155', margin: '0 0 12px 0' }}>
          {isUrdu ? 'روزانہ کی قضا نمازوں کا ٹریکر (۱ کلک پر اضافہ):' : '1-Tap Daily Qadha Completed Tracker:'}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {[
            { key: 'fajr' as const, nameUrdu: 'فجر (۲ فرض)', nameEn: 'Fajr (2 Fard)' },
            { key: 'dhuhr' as const, nameUrdu: 'ظہر (۴ فرض)', nameEn: 'Dhuhr (4 Fard)' },
            { key: 'asr' as const, nameUrdu: 'عصر (۴ فرض)', nameEn: 'Asr (4 Fard)' },
            { key: 'maghrib' as const, nameUrdu: 'مغرب (۳ فرض)', nameEn: 'Maghrib (3 Fard)' },
            { key: 'isha' as const, nameUrdu: 'عشاء (۴ فرض)', nameEn: 'Isha (4 Fard)' },
            { key: 'witr' as const, nameUrdu: 'وتر (۳ واجب)', nameEn: 'Witr (3 Wajib)' },
          ].map((item) => {
            const count = completedCounts[item.key];
            const remaining = Math.max(0, totalPrayersPerType - count);
            return (
              <div
                key={item.key}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  padding: 12,
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>
                  {isUrdu ? item.nameUrdu : item.nameEn}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#065F46', marginBottom: 2 }}>
                  {count}
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 8 }}>
                  {isUrdu ? `باقی: ${remaining}` : `Left: ${remaining}`}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                  <button
                    onClick={() => decrementPrayer(item.key)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      color: '#475569',
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementPrayer(item.key)}
                    style={{
                      width: 44,
                      height: 28,
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: '#1B4332',
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    +1
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Contemporary Fiqh FAQs Accordion */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>💡</span>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {isUrdu ? 'عصری فقہی سوال و جواب (معاصر فتاویٰ)' : 'Contemporary Practical Fiqh FAQs'}
            </h3>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {isUrdu ? 'جدید دور کے حقیقی معمولات پر مستند فقہ حنفی کی رہنمائی' : 'Vetted solutions for modern travel, medical treatments, and workplace devotion'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq) => {
            const isOpen = activeFaqAccordion === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  border: isOpen ? '1px solid #1B4332' : '1px solid #E2E8F0',
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => setActiveFaqAccordion(isOpen ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isOpen ? '#F0FDF4' : '#F8FAFC',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 6,
                        backgroundColor: isOpen ? '#1B4332' : '#E2E8F0',
                        color: isOpen ? '#FFFFFF' : '#475569',
                      }}
                    >
                      {faq.category}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                      {isUrdu ? faq.titleUrdu : faq.titleEnglish}
                    </span>
                  </div>

                  <span style={{ fontSize: 16, color: '#64748B' }}>{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                  <div style={{ padding: '18px 20px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#065F46',
                        backgroundColor: '#ECFDF5',
                        display: 'inline-block',
                        padding: '3px 8px',
                        borderRadius: 6,
                        marginBottom: 12,
                      }}
                    >
                      {isUrdu ? `مستند حوالہ: ${faq.source}` : `Scholarly Reference: ${faq.source}`}
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.8,
                        color: '#334155',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {isUrdu ? faq.urduContent : faq.englishContent}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
