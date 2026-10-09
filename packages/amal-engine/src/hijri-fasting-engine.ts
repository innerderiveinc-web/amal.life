/**
 * AMAL OS — Islamic Hijri Calendar & Masnoon Fasting Engine
 * 
 * Accurately models the lunar calendar, sacred months (Al-Ashhur al-Hurum),
 * Masnoon fasting days, and prohibited fasting days with classical Fiqh adherence.
 */

export interface HijriDate {
  day: number;
  month: number; // 1 to 12
  year: number;
  monthNameArabic: string;
  monthNameEnglish: string;
  monthNameUrdu: string;
  dayOfWeekArabic: string;
  dayOfWeekEnglish: string;
  dayOfWeekUrdu: string;
  isSacredMonth: boolean; // Al-Ashhur al-Hurum
}

export type FastingCategory = 
  | 'OBLIGATORY'         // Ramadan
  | 'HIGHLY_RECOMMENDED' // Arafah, Ashura, Ayyam al-Bid
  | 'RECOMMENDED'        // Mondays, Thursdays, 6 of Shawwal, 1st 9 of Dhul Hijjah
  | 'PROHIBITED';        // Eid al-Fitr, Eid al-Adha, Days of Tashriq

export interface FastingDayEvaluation {
  isFastingDay: boolean;
  isProhibited: boolean;
  category?: FastingCategory;
  fastNameEnglish?: string;
  fastNameUrdu?: string;
  fastNameArabic?: string;
  virtueDescription?: string;
  hadithReference?: string;
}

export class HijriFastingEngine {
  public static readonly HIJRI_MONTHS = [
    { number: 1, arabic: 'المحرّم', english: 'Muharram', urdu: 'محرم الحرام', sacred: true },
    { number: 2, arabic: 'صفر', english: 'Safar', urdu: 'صفر المظفر', sacred: false },
    { number: 3, arabic: 'ربيع الأول', english: 'Rabi al-Awwal', urdu: 'ربيع الاول', sacred: false },
    { number: 4, arabic: 'ربيع الآخر', english: 'Rabi al-Thani', urdu: 'ربيع الثاني', sacred: false },
    { number: 5, arabic: 'جمادى الأولى', english: 'Jumada al-Ula', urdu: 'جمادی الاول', sacred: false },
    { number: 6, arabic: 'جمادى الآخرة', english: 'Jumada al-Akhirah', urdu: 'جمادی الثانی', sacred: false },
    { number: 7, arabic: 'رجب', english: 'Rajab', urdu: 'رجب المرجب', sacred: true },
    { number: 8, arabic: 'شعبان', english: 'Sha\'ban', urdu: 'شعبان المعظم', sacred: false },
    { number: 9, arabic: 'رمضان', english: 'Ramadan', urdu: 'رمضان المبارک', sacred: false },
    { number: 10, arabic: 'شوّال', english: 'Shawwal', urdu: 'شوال المکرم', sacred: false },
    { number: 11, arabic: 'ذو القعدة', english: 'Dhu al-Qa\'dah', urdu: 'ذی القعدہ', sacred: true },
    { number: 12, arabic: 'ذو الحجة', english: 'Dhu al-Hijjah', urdu: 'ذی الحجہ', sacred: true },
  ];

  public static readonly WEEKDAYS = [
    { english: 'Sunday', arabic: 'الأحد', urdu: 'اتوار' },
    { english: 'Monday', arabic: 'الإثنين', urdu: 'پیر' },
    { english: 'Tuesday', arabic: 'الثلاثاء', urdu: 'منگل' },
    { english: 'Wednesday', arabic: 'الأربعاء', urdu: 'بدھ' },
    { english: 'Thursday', arabic: 'الخميس', urdu: 'جمعرات' },
    { english: 'Friday', arabic: 'الجمعة', urdu: 'جمعہ' },
    { english: 'Saturday', arabic: 'السبت', urdu: 'ہفتہ' },
  ];

  /**
   * Converts Gregorian date to Hijri date with optional moon-sighting adjustment offset (-2 to +2 days)
   */
  public toHijri(gregorianDate: Date = new Date(), adjustmentDays: number = 0): HijriDate {
    const adjustedTime = new Date(gregorianDate.getTime() + adjustmentDays * 86400000);
    
    // Astronomical Kuwaiti Algorithm approximation
    let day = adjustedTime.getDate();
    let month = adjustedTime.getMonth();
    let year = adjustedTime.getFullYear();

    let m = month + 1;
    let y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    let a = Math.floor(y / 100);
    let b = 2 - a + Math.floor(a / 4);
    if (y < 1583) b = 0;
    if (y === 1582) {
      if (m > 10) b = -10;
      if (m === 10) {
        b = 0;
        if (day > 4) b = -10;
      }
    }

    let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4);
    }
    let bb = jd + b + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    let dd = Math.floor(365.25 * cc);
    let ee = Math.floor((bb - dd) / 30.6001);
    day = bb - dd - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;

    let epoch = jd - 1948440 + 10632;
    let n = Math.floor((epoch - 1) / 10631);
    epoch = epoch - 10631 * n + 354;
    let j = (Math.floor((10985 - epoch) / 5316)) * (Math.floor((50 * epoch) / 17719)) +
            (Math.floor(epoch / 5670)) * (Math.floor((43 * epoch) / 15238));
    epoch = epoch - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
            (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    
    let hijriMonth = Math.floor((24 * epoch) / 709);
    let hijriDay = epoch - Math.floor((709 * hijriMonth) / 24);
    let hijriYear = 30 * n + j - 30;

    hijriMonth += 1; // 1-indexed

    if (hijriMonth > 12) {
      hijriMonth = 12;
    }

    const monthInfo = HijriFastingEngine.HIJRI_MONTHS[hijriMonth - 1] ?? HijriFastingEngine.HIJRI_MONTHS[0]!;
    const weekdayIndex = adjustedTime.getDay();
    const weekdayInfo = HijriFastingEngine.WEEKDAYS[weekdayIndex] ?? HijriFastingEngine.WEEKDAYS[0]!;

    return {
      day: hijriDay,
      month: hijriMonth,
      year: hijriYear,
      monthNameArabic: monthInfo.arabic,
      monthNameEnglish: monthInfo.english,
      monthNameUrdu: monthInfo.urdu,
      dayOfWeekArabic: weekdayInfo.arabic,
      dayOfWeekEnglish: weekdayInfo.english,
      dayOfWeekUrdu: weekdayInfo.urdu,
      isSacredMonth: monthInfo.sacred,
    };
  }

  /**
   * Evaluates if a given date corresponds to a Masnoon fast or a prohibited day
   */
  public evaluateFasting(gregorianDate: Date = new Date(), moonAdjustment: number = 0): FastingDayEvaluation {
    const hijri = this.toHijri(gregorianDate, moonAdjustment);
    const dayOfWeek = gregorianDate.getDay(); // 0 = Sun, 1 = Mon, 4 = Thu

    // 1. Prohibited Fasting Days
    // Eid al-Fitr (1st Shawwal)
    if (hijri.month === 10 && hijri.day === 1) {
      return {
        isFastingDay: false,
        isProhibited: true,
        category: 'PROHIBITED',
        fastNameEnglish: 'Eid al-Fitr (Fasting Strictly Forbidden)',
        fastNameUrdu: 'عید الفطر (روزہ رکھنا حرام و ممنوع ہے)',
        fastNameArabic: 'يوم عيد الفطر (يحرم صومه)',
        virtueDescription: 'Fasting on both Eid days is forbidden by explicit Prophetic consensus.',
        hadithReference: 'Sahih al-Bukhari #1995, Sahih Muslim #1138',
      };
    }

    // Eid al-Adha (10th Dhu al-Hijjah) & Ayyam al-Tashriq (11th, 12th, 13th Dhu al-Hijjah)
    if (hijri.month === 12 && (hijri.day >= 10 && hijri.day <= 13)) {
      return {
        isFastingDay: false,
        isProhibited: true,
        category: 'PROHIBITED',
        fastNameEnglish: hijri.day === 10 ? 'Eid al-Adha' : 'Ayyam al-Tashriq (Fasting Strictly Forbidden)',
        fastNameUrdu: hijri.day === 10 ? 'عید الاضحیٰ' : 'ایامِ تشریق (روزہ رکھنا حرام و ممنوع ہے)',
        fastNameArabic: 'أيام التشريق وعيد الأضحى',
        virtueDescription: 'The Prophet ﷺ said: "The days of Tashriq are days of eating, drinking, and remembrance of Allah."',
        hadithReference: 'Sahih Muslim #1141',
      };
    }

    // 2. Obligatory: Ramadan
    if (hijri.month === 9) {
      return {
        isFastingDay: true,
        isProhibited: false,
        category: 'OBLIGATORY',
        fastNameEnglish: `Ramadan Fast (Day ${hijri.day})`,
        fastNameUrdu: `رمضان المبارک کا فرض روزہ (دن ${hijri.day})`,
        fastNameArabic: `صيام شهر رمضان المبارك (اليوم ${hijri.day})`,
        virtueDescription: 'Whoever fasts Ramadan out of faith and seeking reward, his previous sins will be forgiven.',
        hadithReference: 'Surah al-Baqarah 2:185, Sahih al-Bukhari #38',
      };
    }

    // 3. Day of Arafah (9th Dhu al-Hijjah)
    if (hijri.month === 12 && hijri.day === 9) {
      return {
        isFastingDay: true,
        isProhibited: false,
        category: 'HIGHLY_RECOMMENDED',
        fastNameEnglish: 'Day of Arafah (Yawm Arafah)',
        fastNameUrdu: 'یومِ عرفہ کا مبارک روزہ',
        fastNameArabic: 'صيام يوم عرفة',
        virtueDescription: 'The Prophet ﷺ was asked about fasting on the Day of Arafah; he said: "It expiates the sins of the past year and the coming year."',
        hadithReference: 'Sahih Muslim #1162',
      };
    }

    // 4. Ashura (9th, 10th, or 11th Muharram)
    if (hijri.month === 1 && (hijri.day === 9 || hijri.day === 10 || hijri.day === 11)) {
      return {
        isFastingDay: true,
        isProhibited: false,
        category: 'HIGHLY_RECOMMENDED',
        fastNameEnglish: hijri.day === 10 ? 'Day of Ashura (10th Muharram)' : `Ashura Companion Fast (${hijri.day}th Muharram)`,
        fastNameUrdu: hijri.day === 10 ? 'یومِ عاشوراء کا روزہ (۱۰ محرم)' : `عاشوراء کا مسنون ملحقہ روزہ (${hijri.day} محرم)`,
        fastNameArabic: 'صيام يوم عاشوراء وتاسوعاء',
        virtueDescription: 'The Prophet ﷺ said: "Fasting on the day of Ashura expiates the sins of the preceding year."',
        hadithReference: 'Sahih Muslim #1162',
      };
    }

    // 5. Ayyam al-Bid (White Days: 13th, 14th, 15th of any Hijri month)
    if (hijri.day === 13 || hijri.day === 14 || hijri.day === 15) {
      return {
        isFastingDay: true,
        isProhibited: false,
        category: 'HIGHLY_RECOMMENDED',
        fastNameEnglish: `Ayyam al-Bid (White Days - ${hijri.day}th ${hijri.monthNameEnglish})`,
        fastNameUrdu: `ایامِ بیض کا مسنون روزہ (${hijri.day}واں چاند)`,
        fastNameArabic: `صيام الأيام البيض (${hijri.day} ${hijri.monthNameArabic})`,
        virtueDescription: 'The Prophet ﷺ advised fasting three days of every lunar month, which is equivalent to fasting a lifetime.',
        hadithReference: 'Sahih al-Bukhari #1975, Sunan an-Nasa\'i #2418',
      };
    }

    // 6. First 9 Days of Dhu al-Hijjah
    if (hijri.month === 12 && hijri.day <= 9) {
      return {
        isFastingDay: true,
        isProhibited: false,
        category: 'RECOMMENDED',
        fastNameEnglish: `First Ten Days of Dhu al-Hijjah (Day ${hijri.day})`,
        fastNameUrdu: `عشرہ ذی الحجہ کا مسنون نفلی روزہ`,
        fastNameArabic: `صيام العشر الأوائل من ذي الحجة`,
        virtueDescription: 'There are no days in which righteous deeds are more beloved to Allah than these ten days.',
        hadithReference: 'Sahih al-Bukhari #969',
      };
    }

    // 7. Monday or Thursday Sunnah Fasting
    if (dayOfWeek === 1 || dayOfWeek === 4) {
      const dayName = dayOfWeek === 1 ? 'Monday (Al-Ithnayn)' : 'Thursday (Al-Khamis)';
      const dayNameUrdu = dayOfWeek === 1 ? 'پیر کا مسnoon روزہ' : 'جمعرات کا مسnoon روزہ';
      return {
        isFastingDay: true,
        isProhibited: false,
        category: 'RECOMMENDED',
        fastNameEnglish: `Sunnah of ${dayName}`,
        fastNameUrdu: dayNameUrdu,
        fastNameArabic: dayOfWeek === 1 ? 'صيام يوم الإثنين' : 'صيام يوم الخميس',
        virtueDescription: 'The Messenger of Allah ﷺ said: "Deeds are presented on Mondays and Thursdays, and I love that my deeds be presented while I am fasting."',
        hadithReference: 'Jami\' at-Tirmidhi #747 (Hasan)',
      };
    }

    return {
      isFastingDay: false,
      isProhibited: false,
    };
  }
}

export const hijriFastingEngine = new HijriFastingEngine();
