export interface SavedBookmarkItem {
  id: string;
  category: 'DUA' | 'AYAH' | 'ADHKAR';
  titleUrdu: string;
  titleEnglish: string;
  arabicText: string;
  translationUrdu: string;
  translationEnglish: string;
  citation: string;
  audioUrl?: string;
  reciter?: string;
}

export const DEFAULT_BELOVED_BOOKMARKS: SavedBookmarkItem[] = [
  {
    id: 'bm-1',
    category: 'AYAH',
    titleUrdu: 'آیت الکرسی (عظیم ترین قرآنی آیت)',
    titleEnglish: 'Ayat al-Kursi (The Throne Verse)',
    arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...',
    translationUrdu: 'اللہ، جس کے سوا کوئی معبود نہیں، وہ ہمیشہ زندہ اور سب کا نگہبان ہے۔ اسے نہ اونگھ آتی ہے نہ نیند...',
    translationEnglish: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...',
    citation: 'سورة البقرة ۲:۲۵۵ · Sahih Muslim',
    audioUrl: 'https://everyayah.com/data/Husary_128kbps/002255.mp3',
    reciter: 'Shaykh Mahmoud Khalil Al-Husary',
  },
  {
    id: 'bm-2',
    category: 'DUA',
    titleUrdu: 'سید الاستغفار (استغفار کا سردار)',
    titleEnglish: 'Sayyid al-Istighfar (The Master Supplication for Forgiveness)',
    arabicText: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...',
    translationUrdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں...',
    translationEnglish: 'O Allah, You are my Lord; there is no god but You. You created me and I am Your servant...',
    citation: 'صحیح البخاری ۶۳۰۶ (من قالها موقنا بها فمات دخل الجنة)',
    audioUrl: 'https://everyayah.com/data/Husary_128kbps/071010.mp3',
    reciter: 'Masnoon Supplication',
  },
  {
    id: 'bm-3',
    category: 'DUA',
    titleUrdu: 'والدین کے لیے قرآنی دعا',
    titleEnglish: 'Supplication for Parents',
    arabicText: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    translationUrdu: 'اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں مجھے پالا۔',
    translationEnglish: 'My Lord, have mercy upon them as they brought me up when I was small.',
    citation: 'سورة الإسراء ۱۷:۲۴',
    audioUrl: 'https://everyayah.com/data/Husary_128kbps/017024.mp3',
    reciter: 'Shaykh Mahmoud Khalil Al-Husary',
  },
  {
    id: 'bm-4',
    category: 'DUA',
    titleUrdu: 'دنیا و آخرت کی بھلائی کی جامع دعا',
    titleEnglish: 'Rabbana Du\'a (Comprehensive Well-Being)',
    arabicText: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translationUrdu: 'اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی اور ہمیں آگ کے عذاب سے بچا۔',
    translationEnglish: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    citation: 'سورة البقرة ۲:۲۰۱ · متفق علیہ',
    audioUrl: 'https://everyayah.com/data/Husary_128kbps/002201.mp3',
    reciter: 'Shaykh Mahmoud Khalil Al-Husary',
  },
  {
    id: 'bm-5',
    category: 'ADHKAR',
    titleUrdu: 'سوتے وقت کی مسنون حفاظت کی دعا',
    titleEnglish: 'Supplication Before Sleep',
    arabicText: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    translationUrdu: 'اے میرے رب! تیرے نام کے ساتھ میں نے اپنا پہلو رکھا اور تیرے ہی نام سے اٹھاؤں گا۔ پس اگر تو میری جان روک لے تو اس پر رحم فرما...',
    translationEnglish: 'In Your name, my Lord, I lay down my side and in Your name I raise it...',
    citation: 'صحیح البخاری ۶۳۲۰ · صحیح مسلم ۲۷۱۴',
    audioUrl: 'https://everyayah.com/data/Husary_128kbps/067001.mp3',
    reciter: 'Masnoon Supplication',
  },
  {
    id: 'bm-6',
    category: 'ADHKAR',
    titleUrdu: 'درودِ پاک (صلوٰۃ علی النبی ﷺ)',
    titleEnglish: 'Friday Salawat upon the Prophet ﷺ',
    arabicText: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
    translationUrdu: 'بیشک اللہ اور اس کے فرشتے درود بھیجتے ہیں اس غیب بتانے والے (نبی) پر، اے ایمان والو ان پر درود اور خوب سلام بھیجو۔',
    translationEnglish: 'Indeed, Allah and His angels confer blessings upon the Prophet. O you who have believed, ask [Allah to confer] blessings upon him and ask [Allah to grant him] peace.',
    citation: 'سورة الأحزاب ۳۳:۵۶ (Kanz al-Iman Translation)',
    audioUrl: 'https://everyayah.com/data/Husary_128kbps/033056.mp3',
    reciter: 'Shaykh Mahmoud Khalil Al-Husary',
  },
];
