/**
 * AMAL OS - "Aaj Ka Mamool" (Daily 1-Tap Action Bar) Engine
 * 
 * Provides time-aware, zero-friction Islamic daily essentials:
 * 1. Next Prayer Countdown
 * 2. Waqt Ka Masnoon Amal (Time-specific Prophetic Practice)
 * 3. 1-Minute Micro-Amal (High spiritual return, zero friction)
 * 4. 1-Tap Masnoon Audio Du'a Snippet
 */

export interface DailyMamool {
  currentSlotNameUrdu: string;
  currentSlotNameEnglish: string;
  nextPrayerName: string;
  minutesToNextPrayer: number;
  timeSlotFadilahUrdu: string;
  masnoonAmal: {
    titleUrdu: string;
    titleEnglish: string;
    descriptionUrdu: string;
    descriptionEnglish: string;
    primarySource: string;
  };
  microAmalOfTheDay: {
    titleUrdu: string;
    titleEnglish: string;
    actionUrdu: string;
    actionEnglish: string;
    estimatedMinutes: number;
    hadithProof: string;
  };
  featuredDua: {
    titleUrdu: string;
    titleEnglish: string;
    arabicText: string;
    translationUrdu: string;
    translationEnglish: string;
    audioUrl: string;
    source: string;
  };
}

export class DailyMamoolEngine {
  /**
   * Generates Aaj Ka Mamool based on current hour and prayer schedule
   */
  public static getMamool(currentHour: number = new Date().getHours()): DailyMamool {
    const isFriday = new Date().getDay() === 5;

    // Default prayer approximations for Karachi/Standard coordinate
    let slot = 'DAY';
    let nextPrayer = 'Dhuhr';
    let minsToNext = 75;

    if (currentHour >= 4 && currentHour < 7) {
      slot = 'FAJR';
      nextPrayer = 'Ishraq / Sunrise';
      minsToNext = 45;
    } else if (currentHour >= 7 && currentHour < 12) {
      slot = 'CHASHT';
      nextPrayer = 'Dhuhr';
      minsToNext = 110;
    } else if (currentHour >= 12 && currentHour < 16) {
      slot = 'DHUHR';
      nextPrayer = 'Asr';
      minsToNext = 140;
    } else if (currentHour >= 16 && currentHour < 18) {
      slot = 'ASR';
      nextPrayer = 'Maghrib';
      minsToNext = 52;
    } else if (currentHour >= 18 && currentHour < 20) {
      slot = 'MAGHRIB';
      nextPrayer = 'Isha';
      minsToNext = 65;
    } else {
      slot = 'ISHA_NIGHT';
      nextPrayer = 'Fajr';
      minsToNext = 380;
    }

    if (isFriday && (slot === 'CHASHT' || slot === 'DHUHR')) {
      return {
        currentSlotNameUrdu: 'جمعۃ المبارک کا مبارک وقت',
        currentSlotNameEnglish: 'Blessed Hours of Jumu\'ah',
        nextPrayerName: 'Jumu\'ah Prayer',
        minutesToNextPrayer: minsToNext,
        timeSlotFadilahUrdu: 'جمعہ کا دن دنوں کا سردار ہے۔ اس دن سورۃ الکہف اور کثرت سے درود شریف پڑھنا باعثِ مغفرت و نور ہے۔',
        masnoonAmal: {
          titleUrdu: 'سورۃ الکہف کی تلاوت اور درود شریف',
          titleEnglish: 'Recitation of Surah al-Kahf and Salawat',
          descriptionUrdu: 'جو شخص جمعہ کے دن سورۃ الکہف پڑھتا ہے اس کے لیے اگلے جمعہ تک نور روشن رہتا ہے۔',
          descriptionEnglish: 'Whoever reads Surah al-Kahf on Friday will have light shining until the next Friday.',
          primarySource: 'Sunan al-Kubra an-Nasa\'i (Sahih), Sahih Muslim',
        },
        microAmalOfTheDay: {
          titleUrdu: 'جمعہ کا مسنون عمل (غسل، خوشبو اور قبل از وقت روانگی)',
          titleEnglish: 'Friday Sunnah Preparation',
          actionUrdu: 'جمعہ کے لیے غسل فرمائیں، صاف لباس اور خوشبو لگائیں اور خطبہ سے قبل مسجد پہنچنے کی نیت فرمائیں۔',
          actionEnglish: 'Perform Ghusl, wear clean clothes, apply fragrance, and aim to arrive before the Khutbah.',
          estimatedMinutes: 5,
          hadithProof: 'Sahih al-Bukhari 883',
        },
        featuredDua: {
          titleUrdu: 'جمعہ کے دن درودِ ابراہیمی',
          titleEnglish: 'Salawat on the Prophet ﷺ on Friday',
          arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
          translationUrdu: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے رحمت نازل فرمائی ابراہیم علیہ السلام پر اور ان کی آل پر۔',
          translationEnglish: 'O Allah, bestow peace upon Muhammad and upon his family as You bestowed peace upon Ibrahim and his family.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/033056.mp3',
          source: 'Sahih al-Bukhari 3370',
        },
      };
    }

    if (slot === 'FAJR') {
      return {
        currentSlotNameUrdu: 'صبح کے مسنون اوقات (فجر و اشراق)',
        currentSlotNameEnglish: 'Blessed Dawn Hours (Fajr & Ishraq)',
        nextPrayerName: nextPrayer,
        minutesToNextPrayer: minsToNext,
        timeSlotFadilahUrdu: 'صبح کی دو رکعتیں دنیا اور جو کچھ اس میں ہے اس سے بہتر ہیں (مسلم)۔',
        masnoonAmal: {
          titleUrdu: 'صبح کے مسنون اذکار و دعائیں',
          titleEnglish: 'Authentic Morning Adhkar',
          descriptionUrdu: 'آیۃ الکرسی، معوذتین اور سید الاستغفار کا اہتمام فرمائیں۔',
          descriptionEnglish: 'Recite Ayat al-Kursi, the 3 Quls, and Sayyid al-Istighfar for complete divine protection.',
          primarySource: 'Sahih al-Bukhari 6306',
        },
        microAmalOfTheDay: {
          titleUrdu: 'سید الاستغفار کی تلاوت (1 منٹ)',
          titleEnglish: 'Sayyid al-Istighfar Recitation (1 Min)',
          actionUrdu: 'دل کی گہرائی سے اللہ سے گناہوں کی معافی اور نعمتوں کا اعتراف فرمائیں۔',
          actionEnglish: 'Acknowledge Allah\'s blessings and repent with sincerity for past shortcomings.',
          estimatedMinutes: 1,
          hadithProof: 'Sahih al-Bukhari 6306 (Chief of prayers for forgiveness)',
        },
        featuredDua: {
          titleUrdu: 'صبح کی دعا (سید الاستغفار)',
          titleEnglish: 'Sayyid al-Istighfar (Chief of Forgiveness)',
          arabicText: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
          translationUrdu: 'اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں۔',
          translationEnglish: 'O Allah, You are my Lord; there is no deity worthy of worship except You. You created me and I am Your servant.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/071010.mp3',
          source: 'Sahih al-Bukhari 6306',
        },
      };
    }

    if (slot === 'ASR') {
      return {
        currentSlotNameUrdu: 'عصر تا مغرب (استغفار اور تسبیح کا وقت)',
        currentSlotNameEnglish: 'Asr to Sunset (Adhkar & Tasbih)',
        nextPrayerName: nextPrayer,
        minutesToNextPrayer: minsToNext,
        timeSlotFadilahUrdu: 'سورج غروب ہونے سے پہلے اپنے رب کی حمد و تسبیح بیان کیجیے (قرآن 50:39)۔',
        masnoonAmal: {
          titleUrdu: 'شام کے مسنون اذکار اور درود شریف',
          titleEnglish: 'Evening Adhkar & Istighfar',
          descriptionUrdu: 'شام کے وقت 100 مرتبہ سبحان اللہ وبحمدہ اور استغفار کی تسبیح فرمائیں۔',
          descriptionEnglish: 'Recite Subhan Allahi wa bihamdihi 100 times before sunset for peace of heart.',
          primarySource: 'Sahih Muslim 2692',
        },
        microAmalOfTheDay: {
          titleUrdu: 'والدین یا بہن بھائیوں کے لیے خاموش دعا',
          titleEnglish: 'Silent Du\'a for Parents & Kin',
          actionUrdu: 'کسی اپنے کے لیے ان کے جانے بغیر دل سے مغفرت اور عافیت کی دعا مانگیں۔',
          actionEnglish: 'Make a heartfelt silent du\'a for your parents or an estranged relative.',
          estimatedMinutes: 1,
          hadithProof: 'Sahih Muslim 2733 (Angels reply: And for you the same)',
        },
        featuredDua: {
          titleUrdu: 'شام کی دعا',
          titleEnglish: 'Evening Remembrance',
          arabicText: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
          translationUrdu: 'ہم نے شام کی اور شام کے وقت تمام بادشاہی اللہ کے لیے ہے، اور تمام تعریف اللہ کے لیے ہے۔',
          translationEnglish: 'We have entered the evening, and the kingdom belongs to Allah, and all praise is for Allah.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/002255.mp3',
          source: 'Sahih Muslim 2723',
        },
      };
    }

    // Default Night / Isha Slot
    return {
      currentSlotNameUrdu: 'رات کا وقت (سورۃ الملک اور محاسبہ)',
      currentSlotNameEnglish: 'Night Hours (Surah al-Mulk & Rest)',
      nextPrayerName: nextPrayer,
      minutesToNextPrayer: minsToNext,
      timeSlotFadilahUrdu: 'سونے سے قبل سورۃ الملک پڑھنا عذابِ قبر سے ڈھال ہے۔',
      masnoonAmal: {
        titleUrdu: 'سورۃ الملک کی تلاوت اور بستر کے اذکار',
        titleEnglish: 'Surah al-Mulk & Bedtime Du\'a',
        descriptionUrdu: 'رسول اللہ ﷺ سورۃ الملک اور السجدہ پڑھے بغیر آرام نہیں فرماتے تھے (ترمذی)۔',
        descriptionEnglish: 'The Prophet ﷺ would not sleep until he recited Surah al-Mulk and as-Sajdah.',
        primarySource: 'Jami\' at-Tirmidhi 2892 (Hasan)',
      },
      microAmalOfTheDay: {
        titleUrdu: 'سونے سے پہلے تمام مسلمانوں کو معاف کرنا',
        titleEnglish: 'Forgiving All Believers Before Sleep',
        actionUrdu: 'دل کو کینے سے پاک کر کے کہیں: "اے اللہ! جس نے مجھ پر ظلم کیا میں نے تیری رضا کے لیے معاف کیا۔"',
        actionEnglish: 'Clear your chest of malice: "O Allah, whoever wronged me, I forgive them solely for Your sake."',
        estimatedMinutes: 1,
        hadithProof: 'Musnad Ahmad 12697 (Habit of the man promised Jannah)',
      },
      featuredDua: {
        titleUrdu: 'سوتے وقت کی مسنون دعا',
        titleEnglish: 'Bedtime Supplication',
        arabicText: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا',
        translationUrdu: 'تیرے نام سے اے میرے رب میں نے اپنا پہلو رکھا اور تیرے ہی نام سے اٹھاؤں گا۔ پس اگر تو میری جان روک لے تو اس پر رحم فرما۔',
        translationEnglish: 'In Your name, my Lord, I lay down my side and in Your name I raise it up. If You take my soul, have mercy upon it.',
        audioUrl: 'https://everyayah.com/data/Husary_128kbps/067001.mp3',
        source: 'Sahih al-Bukhari 6320',
      },
    };
  }
}
export const dailyMamoolEngine = new DailyMamoolEngine();
