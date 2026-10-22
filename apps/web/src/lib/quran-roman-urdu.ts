/**
 * AMAL OS — QURAN ROMAN URDU TRANSLITERATION & KANZ-UL-IMAN TARJUMA
 * 
 * Provides:
 * 1. Roman Arabic Transliteration (Pronunciation / Tajweed guide)
 * 2. Roman Urdu Kanz-ul-Iman Translation (Word-for-word orthodox rendering)
 * 
 * Sourced strictly from Kanz-ul-Iman (Ala Hazrat Imam Ahmad Raza Khan Barelvi)
 * rendered accurately in Roman script.
 */

export interface RomanAyahData {
  transliteration: string;
  tarjumaRomanUrdu: string;
}

export const VERIFIED_ROMAN_QURAN: Record<string, RomanAyahData> = {
  // =========================================================================
  // SURAH 1: AL-FATIHAH
  // =========================================================================
  '1:1': {
    transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
    tarjumaRomanUrdu: 'Allah ke naam se shuru jo bahut meharban rehmat wala.',
  },
  '1:2': {
    transliteration: "Al-ḥamdu lillāhi Rabbil-'ālamīn",
    tarjumaRomanUrdu: 'Sab khoobiyan Allah ko jo maalik saare jahaan walon ka.',
  },
  '1:3': {
    transliteration: 'Ar-Raḥmānir-Raḥīm',
    tarjumaRomanUrdu: 'Bahut meharban rehmat wala.',
  },
  '1:4': {
    transliteration: 'Māliki Yawmid-Dīn',
    tarjumaRomanUrdu: 'Roz-e-jaza ka maalik.',
  },
  '1:5': {
    transliteration: "Iyyāka na'budu wa iyyāka nasta'īn",
    tarjumaRomanUrdu: 'Hum tujhi ko poojen aur tujhi se madad chaahein.',
  },
  '1:6': {
    transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
    tarjumaRomanUrdu: 'Hum ko seedha raasta chala.',
  },
  '1:7': {
    transliteration: "Ṣirāṭalladhīna an'amta 'alayhim ghayril-maghḍūbi 'alayhim wa laḍ-ḍāllīn",
    tarjumaRomanUrdu: 'Raasta un ka jin par Tu ne ehsan kiya, na un ka jin par ghazab hua aur na behke huon ka.',
  },

  // =========================================================================
  // SURAH 2: AL-BAQARAH (KEY SELECTIONS & AYAT AL-KURSI)
  // =========================================================================
  '2:1': {
    transliteration: 'Alif-Lām-Mīm',
    tarjumaRomanUrdu: 'Alif-Lam-Meem (Haqeeqi maani Allah wa Rasool hi ko ma\'loom hain).',
  },
  '2:2': {
    transliteration: 'Dhālikal-kitābu lā rayba fīh, hudal-lil-muttaqīn',
    tarjumaRomanUrdu: 'Woh buland rutba kitaab (Quran) koi shak ki jagah nahi, is mein hidayat hai darr walon ko.',
  },
  '2:3': {
    transliteration: 'Alladhīna yu\'minūna bil-ghaybi wa yuqīmūnaṣ-ṣalāta wa mimmā razaqnāhum yunfiqūn',
    tarjumaRomanUrdu: 'Woh jo be-dekhe imaan laayein aur namaz qaim rakhein aur hamare diye hue mein se kharch karein.',
  },
  '2:255': {
    transliteration: 'Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm, lā ta\'khudhuhū sinatuw-wa lā nawm, lahū mā fis-samāwāti wa mā fil-arḍ, man dhalladhī yashfa\'u \'indahū illā bi-idhnih, ya\'lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay\'im-min \'ilmihī illā bi-mā shā\', wasi\'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya\'ūduhū ḥifẓuhumā, wa Huwal-\'Aliyyul-\'Aẓīm',
    tarjumaRomanUrdu: 'Allah hai jis ke siwa koi ma\'bood nahi, woh aap zinda auron ka qaaim rakhne wala. Na us ko oongh aaye na neend. Usi ka hai jo kuch aasmanon mein hai aur jo kuch zameen mein. Kaun hai jo us ke yahan sifarish kare be us ke hukm ke. Jaanta hai jo kuch un ke aage hai aur jo kuch un ke peeche, aur woh nahi paate us ke ilm mein se magar jitna woh chaahe. Us ki kursi samaye hue hai aasmanon aur zameen ko, aur us par bhari nahi un ki nigehbani, aur wahi hai buland badai wala.',
  },

  // =========================================================================
  // SURAH 103: AL-ASR
  // =========================================================================
  '103:1': {
    transliteration: "Wal-'aṣr",
    tarjumaRomanUrdu: 'Zamana-e-Mahboob ki qasam.',
  },
  '103:2': {
    transliteration: 'Innal-insāna lafī khusr',
    tarjumaRomanUrdu: 'Beshak aadmi zaroor nuqsan mein hai.',
  },
  '103:3': {
    transliteration: "Illalladhīna āmanū wa 'amiluṣ-ṣāliḥāti wa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr",
    tarjumaRomanUrdu: 'Magar jo imaan laaye aur achhe kaam kiye aur ek doosre ko haq ki taakeed ki aur ek doosre ko sabr ki wasiyyat ki.',
  },

  // =========================================================================
  // SURAH 107: AL-MA'UN
  // =========================================================================
  '107:1': {
    transliteration: "Ara'aytalladhī yukadhdhibu bid-dīn",
    tarjumaRomanUrdu: 'Bhala dekho to jo jaza ko jhutlata hai.',
  },
  '107:2': {
    transliteration: "Fadhālikalladhī yadu''ul-yatīm",
    tarjumaRomanUrdu: 'To yeh woh hai jo yateem ko dhakke deta hai.',
  },
  '107:3': {
    transliteration: "Wa lā yaḥuḍḍu 'alā ṭa'āmil-miskīn",
    tarjumaRomanUrdu: 'Aur miskeen ko khana dene ki raghbat nahi deta.',
  },
  '107:4': {
    transliteration: 'Fawaylul-lil-muṣallīn',
    tarjumaRomanUrdu: 'To un namaz padhne walon ki kharabi hai.',
  },
  '107:5': {
    transliteration: "Alladhīna hum 'an ṣalātihim sāhūn",
    tarjumaRomanUrdu: 'Jo apni namaz se bhoole baithe hain.',
  },
  '107:6': {
    transliteration: "Alladhīna hum yurā'ūn",
    tarjumaRomanUrdu: 'Woh jo dikhawa karte hain.',
  },
  '107:7': {
    transliteration: "Wa yamna'ūnal-mā'ūn",
    tarjumaRomanUrdu: 'Aur baratne ki cheez maange nahi dete.',
  },

  // =========================================================================
  // SURAH 112: AL-IKHLAS
  // =========================================================================
  '112:1': {
    transliteration: 'Qul Huwallāhu Aḥad',
    tarjumaRomanUrdu: 'Tum farmao woh Allah hai woh ek hai.',
  },
  '112:2': {
    transliteration: 'Allāhuṣ-Ṣamad',
    tarjumaRomanUrdu: 'Allah be-niyaz hai.',
  },
  '112:3': {
    transliteration: 'Lam yalid wa lam yūlad',
    tarjumaRomanUrdu: 'Na us ki koi aulaad aur na woh kisi se paida hua.',
  },
  '112:4': {
    transliteration: 'Wa lam yakul-lahū kufuwan aḥad',
    tarjumaRomanUrdu: 'Aur na koi us ke jod ka.',
  },

  // =========================================================================
  // SURAH 113: AL-FALAQ
  // =========================================================================
  '113:1': {
    transliteration: "Qul a'ūdhu bi-Rabbil-falaq",
    tarjumaRomanUrdu: 'Tum farmao main us ki panah leta hoon jo subah ka paida karne wala hai.',
  },
  '113:2': {
    transliteration: 'Min sharri mā khalaq',
    tarjumaRomanUrdu: 'Us ki sab makhlooq ki badi se.',
  },
  '113:3': {
    transliteration: 'Wa min sharri ghāsiqin idhā waqab',
    tarjumaRomanUrdu: 'Aur andheri daalne wale ke shar se jab woh doobey.',
  },
  '113:4': {
    transliteration: "Wa min sharrin-naffāthāti fīl-'uqad",
    tarjumaRomanUrdu: 'Aur un auraton ke shar se jo girahon mein phoonkti hain.',
  },
  '113:5': {
    transliteration: 'Wa min sharri ḥāsidin idhā ḥasad',
    tarjumaRomanUrdu: 'Aur hasad karne wale ke shar se jab woh hasad kare.',
  },

  // =========================================================================
  // SURAH 114: AN-NAAS
  // =========================================================================
  '114:1': {
    transliteration: "Qul a'ūdhu bi-Rabbin-nās",
    tarjumaRomanUrdu: 'Tum farmao main us ki panah mein aaya jo sab logon ka Rab.',
  },
  '114:2': {
    transliteration: 'Malikin-nās',
    tarjumaRomanUrdu: 'Sab logon ka badshah.',
  },
  '114:3': {
    transliteration: 'Ilāhin-nās',
    tarjumaRomanUrdu: 'Sab logon ka ma\'bood.',
  },
  '114:4': {
    transliteration: 'Min sharril-waswāsil-khannās',
    tarjumaRomanUrdu: 'Us ke shar se jo dil mein burey khatre daale aur peechey hatey.',
  },
  '114:5': {
    transliteration: 'Alladhī yuwaswisu fī ṣudūrin-nās',
    tarjumaRomanUrdu: 'Woh jo logon ke dilon mein waswase daalta hai.',
  },
  '114:6': {
    transliteration: 'Minal-jinnati wan-nās',
    tarjumaRomanUrdu: 'Jinn aur aadmi.',
  },
};

/**
 * Phonetic mapper from Uthmanic Arabic letters to readable Latin Transliteration
 */
const ARABIC_TO_ROMAN_MAP: Record<string, string> = {
  'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'ā', 'ء': "'", 'ئ': "'", 'ؤ': "'",
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'ḥ', 'خ': 'kh',
  'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
  'ص': 'ṣ', 'ض': 'ḍ', 'ط': 'ṭ', 'ظ': 'ẓ', 'ع': "'", 'غ': 'gh',
  'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'ة': 'h', 'و': 'w', 'ي': 'y', 'ى': 'ā',
  'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in',
  'ّ': '', 'ْ': '', 'ٰ': 'ā',
};

/**
 * Transliterates Arabic text into readable English/Roman phonetics
 */
export function transliterateArabicToRoman(text: string): string {
  if (!text) return '';
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ARABIC_TO_ROMAN_MAP[ch] !== undefined) {
      out += ARABIC_TO_ROMAN_MAP[ch];
    } else if (ch === ' ' || ch === '\n' || ch === '\t') {
      out += ' ';
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Common Urdu word mapping for Roman Urdu Kanz-ul-Iman
 */
const URDU_WORD_MAP: Record<string, string> = {
  'اللہ': 'Allah',
  'کے': 'ke',
  'نام': 'naam',
  'سے': 'se',
  'شروع': 'shuru',
  'جو': 'jo',
  'بہت': 'bahut',
  'مہربان': 'meharban',
  'رحمت': 'rehmat',
  'والا': 'wala',
  'والے': 'wale',
  'والی': 'wali',
  'سب': 'sab',
  'خوبیاں': 'khoobiyan',
  'کو': 'ko',
  'مالک': 'maalik',
  'سارے': 'saare',
  'جہان': 'jahaan',
  'والوں': 'walon',
  'کا': 'ka',
  'کی': 'ki',
  'ہے': 'hai',
  'ہیں': 'hain',
  'ہم': 'hum',
  'تجھی': 'tujhi',
  'پوجیں': 'poojen',
  'اور': 'aur',
  'مدد': 'madad',
  'چاہیں': 'chaahein',
  'سیدھا': 'seedha',
  'راستہ': 'raasta',
  'چلا': 'chala',
  'ان': 'un',
  'جن': 'jin',
  'پر': 'par',
  'تو': 'Tu',
  'نے': 'ne',
  'احسان': 'ehsan',
  'کیا': 'kiya',
  'نہ': 'na',
  'غضب': 'ghazab',
  'ہوا': 'hua',
  'بہکے': 'behke',
  'ہوؤں': 'huon',
  'روز': 'roz',
  'جزا': 'jaza',
  'تم': 'tum',
  'فرماؤ': 'farmao',
  'وہ': 'woh',
  'ایک': 'ek',
  'بے': 'be',
  'نیاز': 'niyaz',
  'نہین': 'nahi',
  'نہیں': 'nahi',
  'کوئی': 'koi',
  'اولاد': 'aulaad',
  'کیسی': 'kisi',
  'پیدا': 'paida',
  'جود': 'jod',
  'جیسا': 'jaisa',
  'زمانہ': 'zamana',
  'محبوب': 'mahboob',
  'قسم': 'qasam',
  'آدمی': 'aadmi',
  'ضرور': 'zaroor',
  'نقصان': 'nuqsan',
  'میں': 'mein',
  'مگر': 'magar',
  'ایمان': 'imaan',
  'لائے': 'laaye',
  'اچھے': 'achhe',
  'کام': 'kaam',
  'کیے': 'kiye',
  'ایک دوسرے': 'ek doosre',
  'حق': 'haq',
  'تاکید': 'taakeed',
  'صبر': 'sabr',
  'وصیت': 'wasiyyat',
  'دیکھو': 'dekho',
  'جھٹلاتا': 'jhutlata',
  'یتیم': 'yateem',
  'دھکے': 'dhakke',
  'دیتا': 'deta',
  'مسکین': 'miskeen',
  'کھانا': 'khana',
  'دینے': 'dene',
  'رغبت': 'raghbat',
  'نماز': 'namaz',
  'پڑھنے': 'padhne',
  'خرابی': 'kharabi',
  'اپنی': 'apni',
  'بھولے': 'bhoole',
  'بیٹھے': 'baithe',
  'دکھاوا': 'dikhawa',
  'کرتے': 'karte',
  'برتنے': 'baratne',
  'چیز': 'cheez',
  'مانگے': 'maange',
  'دیتے': 'dete',
};

/**
 * Converts Urdu Kanz-ul-Iman translation into clean Roman Urdu
 */
export function convertUrduToRomanUrdu(urduText: string): string {
  if (!urduText) return '';
  const words = urduText.split(/\s+/);
  const converted = words.map((w) => {
    // Strip trailing punctuation
    const cleanWord = w.replace(/[۔،؟!()\[\]]/g, '');
    if (URDU_WORD_MAP[cleanWord]) {
      return URDU_WORD_MAP[cleanWord];
    }
    return cleanWord;
  });
  return converted.join(' ') + '.';
}

/**
 * Get verified Roman Transliteration for an Ayah
 */
export function getAyahRomanTransliteration(
  surahNumber: number,
  ayahNumber: number,
  fallbackArabic?: string
): string {
  const key = `${surahNumber}:${ayahNumber}`;
  if (VERIFIED_ROMAN_QURAN[key]?.transliteration) {
    return VERIFIED_ROMAN_QURAN[key].transliteration;
  }
  if (fallbackArabic) {
    return transliterateArabicToRoman(fallbackArabic);
  }
  return '';
}

/**
 * Get verified Roman Urdu Tarjuma (Kanz-ul-Iman) for an Ayah
 */
export function getAyahRomanUrduTarjuma(
  surahNumber: number,
  ayahNumber: number,
  fallbackUrdu?: string
): string {
  const key = `${surahNumber}:${ayahNumber}`;
  if (VERIFIED_ROMAN_QURAN[key]?.tarjumaRomanUrdu) {
    return VERIFIED_ROMAN_QURAN[key].tarjumaRomanUrdu;
  }
  if (fallbackUrdu) {
    return convertUrduToRomanUrdu(fallbackUrdu);
  }
  return '';
}
