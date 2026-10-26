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
  public static getMamool(
    currentHour: number = new Date().getHours(),
    slotOverride?: 'FAJR' | 'CHASHT' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA_NIGHT' | 'JUMUAH'
  ): DailyMamool {
    const isFriday = new Date().getDay() === 5;

    // Default prayer approximations for Karachi/Standard coordinate
    let slot = 'DAY';
    let nextPrayer = 'Dhuhr';
    let minsToNext = 75;

    if (slotOverride) {
      slot = slotOverride;
      if (slot === 'FAJR') { nextPrayer = 'Ishraq / Sunrise'; minsToNext = 45; }
      else if (slot === 'CHASHT') { nextPrayer = 'Dhuhr'; minsToNext = 110; }
      else if (slot === 'DHUHR') { nextPrayer = 'Asr'; minsToNext = 140; }
      else if (slot === 'ASR') { nextPrayer = 'Maghrib'; minsToNext = 52; }
      else if (slot === 'MAGHRIB') { nextPrayer = 'Isha'; minsToNext = 65; }
      else if (slot === 'ISHA_NIGHT') { nextPrayer = 'Fajr'; minsToNext = 380; }
      else if (slot === 'JUMUAH') { nextPrayer = 'Asr'; minsToNext = 120; }
    } else if (currentHour >= 4 && currentHour < 7) {
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

    if (slot === 'JUMUAH' || (isFriday && !slotOverride && (slot === 'CHASHT' || slot === 'DHUHR'))) {
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
          titleUrdu: 'جمعۃ المبارک پر قرآنی درود و سلام',
          titleEnglish: 'Quranic Injunction for Salawat on Friday',
          arabicText: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
          translationUrdu: 'بیشک اللہ اور اس کے فرشتے نبی پر درود بھیجتے ہیں۔ اے ایمان والو! تم بھی ان پر درود و سلام بھیجو۔',
          translationEnglish: 'Indeed, Allah and His angels confer blessings upon the Prophet. O you who have believed, ask [Allah to confer] blessing upon him and ask [Allah to grant him] peace.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/033056.mp3',
          source: 'Surah Al-Ahzab (33:56)',
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
          titleUrdu: 'صبح کی قرآنی دعائے مغفرت و والدین',
          titleEnglish: 'Quranic Morning Du\'a for Forgiveness & Parents',
          arabicText: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
          translationUrdu: 'اے ہمارے رب! مجھے اور میرے والدین کو اور تمام ایمان والوں کو بخش دے جس دن حساب قائم ہوگا۔',
          translationEnglish: 'Our Lord, forgive me and my parents and the believers the Day the account is established.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/014041.mp3',
          source: 'Surah Ibrahim (14:41)',
        },
      };
    }

    if (slot === 'CHASHT') {
      return {
        currentSlotNameUrdu: 'چاشت و اشراق کا مبارک وقت (صلاۃ الضحیٰ)',
        currentSlotNameEnglish: 'Mid-Morning Hours (Salat al-Duha / Chasht)',
        nextPrayerName: nextPrayer,
        minutesToNextPrayer: minsToNext,
        timeSlotFadilahUrdu: 'انسان کے ہر جوڑ پر صدقہ لازم ہے، اور چاشت کی دو رکعتیں تمام جوڑوں کی طرف سے صدقہ ادا کر دیتی ہیں (مسلم)۔',
        masnoonAmal: {
          titleUrdu: 'نمازِ چاشت (صلاۃ الضحیٰ — ۲ تا ۸ رکعت)',
          titleEnglish: 'Salat al-Duha (2 to 8 Rak\'ahs)',
          descriptionUrdu: 'سورج بلندی پر آنے پر ۲، ۴ یا ۸ رکعت چاشت ادا فرمائیں، یہ رزق میں برکت اور اللہ کی شکر گزاری کا عظیم ذریعہ ہے۔',
          descriptionEnglish: 'Pray 2 to 8 units of Duha prayer mid-morning as gratitude for the 360 joints of the human body.',
          primarySource: 'Sahih Muslim 720',
        },
        microAmalOfTheDay: {
          titleUrdu: 'رزق میں برکت و پاکیزگی کی دعا',
          titleEnglish: 'Du\'a for Halal Sustenance & Barakah',
          actionUrdu: 'دن کے کام کا آغاز کرتے ہوئے حلال کمائی اور حرام سے حفاظت کی مسنون دعا مانگیں۔',
          actionEnglish: 'Make intention for pure halal sustenance and seek refuge from illicit wealth.',
          estimatedMinutes: 1,
          hadithProof: 'Sunan Ibn Majah 925 (Sahih)',
        },
        featuredDua: {
          titleUrdu: 'علم و بصیرت کی قرآنی دعا (رب زدنی علما)',
          titleEnglish: 'Quranic Du\'a for Knowledge (Rabbi Zidni \'Ilma)',
          arabicText: 'رَّبِّ زِدْنِي عِلْمًا',
          translationUrdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
          translationEnglish: 'My Lord, increase me in knowledge.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/020114.mp3',
          source: 'Surah Ta-Ha (20:114)',
        },
      };
    }

    if (slot === 'DHUHR') {
      return {
        currentSlotNameUrdu: 'ظہر کا وقت (نمازِ ظہر اور سنتِ مؤکدہ)',
        currentSlotNameEnglish: 'Midday Hours (Dhuhr Prayer & Sunan)',
        nextPrayerName: nextPrayer,
        minutesToNextPrayer: minsToNext,
        timeSlotFadilahUrdu: 'زوال کے بعد آسمان کے دروازے کھولے جاتے ہیں، پس رسول اللہ ﷺ ظہر سے قبل ۴ سنتیں پڑھنا پسند فرماتے تھے (ترمذی)۔',
        masnoonAmal: {
          titleUrdu: 'ظہر کی سنتِ مؤکدہ (۴ قبل اور ۲ بعد)',
          titleEnglish: 'Sunan Mu\'akkadah of Dhuhr',
          descriptionUrdu: 'فرض سے قبل ۴ رکعت اور فرض کے بعد ۲ رکعت سنتِ مؤکدہ کا خصوصی اہتمام فرمائیں (سنن مؤکدہ جنت میں محل کی بشارت ہیں)۔',
          descriptionEnglish: 'Perform the 4 Sunnah units before Dhuhr and 2 after Dhuhr; these are emphasized Prophetic practices.',
          primarySource: 'Jami\' at-Tirmidhi 478 (Sahih)',
        },
        microAmalOfTheDay: {
          titleUrdu: 'مسجد میں اذان کا جواب اور درود و وسیلہ',
          titleEnglish: 'Answering the Adhan & Wasilah Supplication',
          actionUrdu: 'ظہر کی اذان کے بعد درود شریف اور مسنون دعائے وسیلہ پڑھیں، شفاعت واجب ہو جائے گی۔',
          actionEnglish: 'Respond to the Adhan and recite the Wasilah prayer for the Prophet\'s ﷺ intercession.',
          estimatedMinutes: 2,
          hadithProof: 'Sahih al-Bukhari 614',
        },
        featuredDua: {
          titleUrdu: 'دنیا و آخرت کی جامع بھلائی کی قرآنی دعا',
          titleEnglish: 'Du\'a for Goodness in This World & the Hereafter',
          arabicText: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
          translationUrdu: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔',
          translationEnglish: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/002201.mp3',
          source: 'Surah Al-Baqarah (2:201)',
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
          titleUrdu: 'شام کی جامع قرآنی حفاظت (آیۃ الکرسی)',
          titleEnglish: 'Evening Protection & Grandeur (Ayat al-Kursi)',
          arabicText: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
          translationUrdu: 'اللہ! اس کے سوا کوئی عبادت کے لائق نہیں، وہ خود زندہ اور سب کو قائم رکھنے والا ہے، اسے نہ اونگھ آتی ہے نہ نیند۔',
          translationEnglish: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/002255.mp3',
          source: 'Surah Al-Baqarah (2:255)',
        },
      };
    }

    if (slot === 'MAGHRIB') {
      return {
        currentSlotNameUrdu: 'مغرب کا وقت (غروبِ آفتاب و صلاۃ الاوابین)',
        currentSlotNameEnglish: 'Sunset Hours (Maghrib & Salat al-Awwabin)',
        nextPrayerName: nextPrayer,
        minutesToNextPrayer: minsToNext,
        timeSlotFadilahUrdu: 'مغرب کے بعد ۶ رکعات نفل (صلاۃ الاوابین) پڑھنے والے کے گناہ معاف کر دیے جاتے ہیں (ترمذی)۔',
        masnoonAmal: {
          titleUrdu: 'صلاۃ الاوابین (مغرب کے بعد ۶ رکعت)',
          titleEnglish: 'Salat al-Awwabin (Post-Maghrib 6 Rak\'ahs)',
          descriptionUrdu: 'مغرب کے فرض اور سنت کے بعد ۲، ۴ یا ۶ رکعت نفل ادا فرمائیں، یہ رجوع الی اللہ کی علامت ہے۔',
          descriptionEnglish: 'Perform 2 to 6 voluntary units after Maghrib prayer as spiritual rejuvenation of the repentant.',
          primarySource: 'Jami\' at-Tirmidhi 435 (Gharib/Hasan li Ghayrihi)',
        },
        microAmalOfTheDay: {
          titleUrdu: 'شام کے وقت برائیوں سے پناہ کی دعا',
          titleEnglish: 'Seeking Refuge from Evil at Nightfall',
          actionUrdu: '۳ مرتبہ "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ" پڑھیں، کوئی نقصان نہیں پہنچے گا۔',
          actionEnglish: 'Recite the prophetic refuge supplication 3 times for comprehensive physical and spiritual protection.',
          estimatedMinutes: 1,
          hadithProof: 'Sahih Muslim 2709',
        },
        featuredDua: {
          titleUrdu: 'غروبِ آفتاب پر شرور سے پناہ کی قرآنی دعا',
          titleEnglish: 'Supplication for Divine Refuge at Sunset (Surah al-Falaq)',
          arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ',
          translationUrdu: 'آپ فرمائیے کہ میں صبح کے رب کی پناہ مانگتا ہوں، اس کی تمام مخلوق کے شر سے۔',
          translationEnglish: 'Say, "I seek refuge in the Lord of daybreak from the evil of that which He created."',
          audioUrl: 'https://everyayah.com/data/Husary_128kbps/113001.mp3',
          source: 'Surah Al-Falaq (113:1-2)',
        },
      };
    }

    // Default Night / Isha Slot
    return {
      currentSlotNameUrdu: 'رات کا وقت (نمازِ عشاء، وتر، سورۃ الملک اور محاسبہ)',
      currentSlotNameEnglish: 'Night Hours (Isha, Witr, Surah al-Mulk & Rest)',
      nextPrayerName: nextPrayer,
      minutesToNextPrayer: minsToNext,
      timeSlotFadilahUrdu: 'سونے سے قبل سورۃ الملک پڑھنا عذابِ قبر سے ڈھال ہے۔',
      masnoonAmal: {
        titleUrdu: 'نمازِ وتر، سورۃ الملک کی تلاوت اور بستر کے اذکار',
        titleEnglish: 'Salat al-Witr, Surah al-Mulk & Bedtime Du\'a',
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
        titleUrdu: 'سوتے وقت حفاظت و ایمان کی قرآنی دعا',
        titleEnglish: 'Bedtime Faith & Deliverance (Last Verses of al-Baqarah)',
        arabicText: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ',
        translationUrdu: 'رسول اس پر ایمان لائے جو ان کے رب کی طرف سے ان پر نازل ہوا اور تمام مومنین بھی۔',
        translationEnglish: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers.',
        audioUrl: 'https://everyayah.com/data/Husary_128kbps/002285.mp3',
        source: 'Surah Al-Baqarah (2:285)',
      },
    };
  }
}
export const dailyMamoolEngine = new DailyMamoolEngine();
