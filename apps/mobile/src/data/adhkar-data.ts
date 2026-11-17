/**
 * AMAL OS — Morning & Evening Sunnah Adhkar Dataset
 * 
 * Sourced strictly from canonical Hadith collections and classical works:
 * - Sahih al-Bukhari & Sahih Muslim
 * - Sunan Abi Dawud, Jami' at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah
 * - Al-Hisn al-Hasin (Allama Muhammad Ibn al-Jazari)
 * - Bahar-e-Shariat (Sadr al-Shari'ah Allama Amjad Ali Azami)
 * 
 * Verbatim Kanz-ul-Iman translation applied for all Quranic Ayahs.
 */

export interface DhikrItem {
  id: string;
  category: 'MORNING' | 'EVENING' | 'BOTH';
  titleArabic: string;
  titleUrdu: string;
  titleEnglish: string;
  arabicText: string;
  transliteration: string;
  translationUrdu: string;
  translationEnglish: string;
  targetCount: number;
  sourceHadith: string;
  virtueUrdu: string;
  virtueEnglish: string;
}

export const SUNNAH_ADHKAR_LIST: DhikrItem[] = [
  {
    id: 'sayyidul-istighfar',
    category: 'BOTH',
    titleArabic: 'سَيِّدُ الاسْتِغْفَارِ',
    titleUrdu: 'سید الاستغفار (توبہ کی سب سے افضل دعا)',
    titleEnglish: 'The Master Supplication for Forgiveness (Sayyid al-Istighfar)',
    arabicText:
      'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عهدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration:
      'Allahumma Anta Rabbi la ilaha illa Ant, khalaqtani wa ana ‘abduk, wa ana ‘ala ‘ahdika wa wa‘dika mastata‘t, a‘udhu bika min sharri ma sana‘t, abu’u laka bi-ni‘matika ‘alayya wa abu’u bi-dhambi faghfir li fa-innahu la yaghfiru-dhunuba illa Ant.',
    translationUrdu:
      'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی استطاعت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں، اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اقرار کرتا ہوں، پس مجھے بخش دے کیونکہ تیرے سوا گناہوں کو کوئی نہیں بخش سکتا۔',
    translationEnglish:
      'O Allah, You are my Lord; none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I confess my sins, so forgive me, for none forgives sins except You.',
    targetCount: 1,
    sourceHadith: 'صحیح البخاری: 6306 (Sahih al-Bukhari: 6306)',
    virtueUrdu:
      'رسول اللہ ﷺ نے فرمایا: جس نے یقین کامل کے ساتھ دن کے وقت یہ دعا پڑھی اور شام ہونے سے پہلے وفات پا گیا تو وہ اہلِ جنت میں سے ہے، اور جس نے رات کے وقت پڑھی اور صبح ہونے سے پہلے وفات پا گیا تو وہ اہلِ جنت میں سے ہے۔',
    virtueEnglish:
      'The Prophet ﷺ said: Whoever recites this with firm conviction during the day and dies before evening will be among the people of Paradise; and whoever recites it at night and dies before morning will be among the people of Paradise.',
  },
  {
    id: 'bismillahilladhi-la-yadurru',
    category: 'BOTH',
    titleArabic: 'دُعَاءُ الْحِمَايَةِ مِنَ الشُّرُورِ',
    titleUrdu: 'ہر قسم کے ضرر و زہر سے حفاظت کی دعا',
    titleEnglish: 'Supplication for Divine Protection from All Harm',
    arabicText:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ العَلِيمُ',
    transliteration:
      'Bismillahil-ladhi la yadurru ma‘as-mihi shay’un fil-ardi wa la fis-sama’i wa huwas-Sami‘ul-‘Alim.',
    translationUrdu:
      'اللہ کے نام سے، جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی سب کچھ سننے والا، سب کچھ جاننے والا ہے۔',
    translationEnglish:
      'In the Name of Allah, with Whose Name nothing can cause harm in the earth or in the heavens, and He is the All-Hearing, the All-Knowing.',
    targetCount: 3,
    sourceHadith: 'جامع الترمذی: 3388، سنن ابی داود: 5088 (حسن صحیح)',
    virtueUrdu:
      'جو بندہ ہر صبح اور شام تین مرتبہ یہ کلمات کہے گا، اسے کوئی چیز نقصان نہیں پہنچا سکے گی (حصنِ حصین و بہارِ شریعت)۔',
    virtueEnglish:
      'The Prophet ﷺ stated that whoever recites this three times in the morning and three times in the evening, nothing will harm them.',
  },
  {
    id: 'raditu-billahi-rabba',
    category: 'BOTH',
    titleArabic: 'الرِّضَا بِاللَّهِ وَالإِسْلامِ وَالنَّبِيِّ ﷺ',
    titleUrdu: 'ایمان پر راضی رہنے اور رضائے الٰہی کی ضمانت',
    titleEnglish: 'Contentment with Allah, Islam, and the Beloved Prophet ﷺ',
    arabicText:
      'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    transliteration:
      'Raditu billahi Rabba, wa bil-Islami dina, wa bi-Muhammadin sallallahu ‘alayhi wa sallama Nabiyya.',
    translationUrdu:
      'میں راضی ہوا اللہ کے رب ہونے پر، اور اسلام کے دین ہونے پر، اور حضرت محمد ﷺ کے نبی ہونے پر۔',
    translationEnglish:
      'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.',
    targetCount: 3,
    sourceHadith: 'سنن ابی داود: 5072، جامع الترمذی: 3389 (حدیث حسن)',
    virtueUrdu:
      'رسول اللہ ﷺ نے ارشاد فرمایا: اللہ تعالیٰ کے ذمۂ کرم پر ہے کہ جو مسلمان صبح و شام ۳ بار یہ کہے، قیامت کے دن اللہ اسے ضرور راضی فرمائے گا۔',
    virtueEnglish:
      'The Prophet ﷺ said: Allah has taken it upon Himself to satisfy and please on the Day of Resurrection whoever recites this thrice morning and evening.',
  },
  {
    id: 'dua-al-afiyah',
    category: 'BOTH',
    titleArabic: 'سُؤَالُ الْعَفْوِ وَالْعَافِيَةِ',
    titleUrdu: 'دین، دنیا، جان و مال میں کامل عافیت و پردہ پوشی کی دعا',
    titleEnglish: 'Supplication for Comprehensive Well-Being (Afiyah) & Security',
    arabicText:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    transliteration:
      'Allahumma inni as’alukal-‘afwa wal-‘afiyata fid-dunya wal-akhirah. Allahumma inni as’alukal-‘afwa wal-‘afiyata fi dini wa dunyaya wa ahli wa mali. Allahummas-tur ‘awrati wa amin raw‘ati. Allahummah-fazni min bayni yadayya wa min khalfi wa ‘an yamini wa ‘an shimali wa min fawqi, wa a‘udhu bi-‘azamatika an ughtala min tahti.',
    translationUrdu:
      'اے اللہ! میں تجھ سے دنیا اور آخرت میں عفو اور عافیت کا طلبگار ہوں۔ اے اللہ! میں تجھ سے اپنے دین، میری دنیا، میرے اہل و عیال اور میرے مال میں عفو اور عافیت مانگتا ہوں۔ اے اللہ! میرے عیبوں پر پردہ ڈال دے اور میرے خوف کو امن میں بدل دے۔ اے اللہ! میرے آگے سے، میرے پیچھے سے، میرے دائیں سے، میرے بائیں سے اور میرے اوپر سے میری حفاظت فرما، اور میں تیری عظمت کی پناہ لیتا ہوں اس بات سے کہ اچانک اپنے نیچے سے ہلاک کر دیا جاؤں۔',
    translationEnglish:
      'O Allah, I ask You for pardon and well-being in this world and the Next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and regarding my family and my wealth. O Allah, veil my weaknesses and ease my fears. O Allah, protect me from in front of me and from behind me, from my right and from my left, and from above me; and I seek refuge in Your Greatness from being struck down from beneath me.',
    targetCount: 1,
    sourceHadith: 'سنن ابی داود: 5074، سنن ابن ماجہ: 3871 (صحیح)',
    virtueUrdu:
      'حضرت عبداللہ بن عمر رضی اللہ عنہما فرماتے ہیں کہ رسول اللہ ﷺ صبح اور شام کے وقت ان مبارک کلمات کو کبھی ترک نہیں فرماتے تھے (حصنِ حصین)۔',
    virtueEnglish:
      'Ibn Umar (may Allah be pleased with him) reported that the Prophet ﷺ never neglected reciting these supplications morning and evening.',
  },
  {
    id: 'morning-asbahna-wa-asbaha',
    category: 'MORNING',
    titleArabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',
    titleUrdu: 'صبح کی بیداری، حمدِ الٰہی اور یومِ نو کی خیر کی دعا',
    titleEnglish: 'Morning Inscription of Sovereignty and Seeking the Day’s Blessings',
    arabicText:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration:
      'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa ‘ala kulli shay’in Qadir. Rabbi as’aluka khayra ma fi hadhal-yawmi wa khayra ma ba‘dah, wa a‘udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba‘dah. Rabbi a‘udhu bika minal-kasali wa su’il-kibar, Rabbi a‘udhu bika min ‘adhabin fin-nari wa ‘adhabin fil-qabr.',
    translationUrdu:
      'ہم نے صبح کی اور تمام بادشاہی نے اللہ کے لیے صبح کی، اور تمام تعریفیں اللہ کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے، اور وہ ہر چیز پر قادر ہے۔ اے میرے رب! میں تجھ سے اس دن کی خیر مانگتا ہوں اور اس کے بعد کی خیر، اور میں تیری پناہ مانگتا ہوں اس دن کے شر سے اور اس کے بعد کے شر سے۔ اے میرے رب! میں سستی اور بڑھاپے کی برائی سے تیری پناہ لیتا ہوں، اور قبر و دوزخ کے عذاب سے تیری پناہ مانگتا ہوں۔',
    translationEnglish:
      'We have entered the morning and the entire kingdom belongs to Allah. Praise be to Allah; none has the right to be worshipped except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things. My Lord, I ask You for the good of this day and the good of what comes after it, and I seek refuge in You from the evil of this day and the evil of what comes after it. My Lord, I seek refuge in You from laziness and the hardships of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.',
    targetCount: 1,
    sourceHadith: 'صحیح مسلم: 2723 (Sahih Muslim: 2723)',
    virtueUrdu:
      'صبح سویرے سستی، وسوسوں اور برے انجام سے پناہ اور دن بھر خیر و برکت کی ضمانت۔',
    virtueEnglish:
      'Sunnah opening for every morning protecting from sloth, anxiety, and granting barakah throughout the day.',
  },
  {
    id: 'evening-amsayna-wa-amsal-mulk',
    category: 'EVENING',
    titleArabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
    titleUrdu: 'شام کے وقت بادشاہیِ الٰہی کا اقرار اور شب کی عافیت',
    titleEnglish: 'Evening Entry of Sovereignty and Seeking the Night’s Blessings',
    arabicText:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration:
      'Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa ‘ala kulli shay’in Qadir. Rabbi as’aluka khayra ma fi hadhihil-laylati wa khayra ma ba‘daha, wa a‘udhu bika min sharri ma fi hadhihil-laylati wa sharri ma ba‘daha. Rabbi a‘udhu bika minal-kasali wa su’il-kibar, Rabbi a‘udhu bika min ‘adhabin fin-nari wa ‘adhabin fil-qabr.',
    translationUrdu:
      'ہم نے شام کی اور تمام بادشاہی نے اللہ کے لیے شام کی، اور تمام تعریفیں اللہ کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے، اور وہ ہر چیز پر قادر ہے۔ اے میرے رب! میں تجھ سے اس رات کی خیر مانگتا ہوں اور اس کے بعد کی خیر، اور میں تیری پناہ مانگتا ہوں اس رات کے شر سے اور اس کے بعد کے شر سے۔ اے میرے رب! میں سستی اور بڑھاپے کی برائی سے تیری پناہ لیتا ہوں، اور دوزخ و قبر کے عذاب سے تیری پناہ مانگتا ہوں۔',
    translationEnglish:
      'We have entered the evening and the entire kingdom belongs to Allah. Praise be to Allah; none has the right to be worshipped except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things. My Lord, I ask You for the good of this night and the good of what comes after it, and I seek refuge in You from the evil of this night and the evil of what comes after it. My Lord, I seek refuge in You from laziness and the hardships of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.',
    targetCount: 1,
    sourceHadith: 'صحیح مسلم: 2723 (Sahih Muslim: 2723)',
    virtueUrdu:
      'شام کے وقت رات کے شرور و فتنوں سے مکمل تحفظ اور پرسکون نیند کی برکت۔',
    virtueEnglish:
      'Sunnah opening for evening granting tranquility, safety from night-time harms, and protection in sleep.',
  },
  {
    id: 'evening-audhu-bikalimatillah',
    category: 'EVENING',
    titleArabic: 'التَّعَوُّذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ',
    titleUrdu: 'شام کے وقت زہریلے کیڑے مکوڑوں اور مخلوق کے شر سے پناہ',
    titleEnglish: 'Refuge in the Perfect Words of Allah from the Evil of Creation',
    arabicText:
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration:
      'A‘udhu bi-kalimatil-lahit-tammati min sharri ma khalaq.',
    translationUrdu:
      'میں اللہ کے مکمل کلمات کے وسیلے سے اس کی تمام پیدا کردہ مخلوق کے شر سے پناہ مانگتا ہوں۔',
    translationEnglish:
      'I seek refuge in the Perfect Words of Allah from the evil of what He has created.',
    targetCount: 3,
    sourceHadith: 'صحیح مسلم: 2709 (Sahih Muslim: 2709)',
    virtueUrdu:
      'جو شخص شام کے وقت تین مرتبہ یہ کلمات کہہ لے، اس رات اسے بچھو یا کسی زہریلی چیز کا ڈنک نقصان نہیں پہنچا سکتا (بہارِ شریعت و مسلم شریف)۔',
    virtueEnglish:
      'Whoever recites this thrice in the evening will not be harmed by any poisonous sting or creature during that night.',
  },
  {
    id: 'subhanallahi-wa-bihamdihi-adada-khalqih',
    category: 'MORNING',
    titleArabic: 'تَسْبِيحٌ عَظِيمٌ يَعْدِلُ سَاعَاتِ الذِّكْرِ',
    titleUrdu: 'کثیر نیکیوں اور ساعاتِ عبادت کے برابر عظیم تسبیح',
    titleEnglish: 'Subhan-Allah with the Multiplier of Creation, Throne, and Ink',
    arabicText:
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    transliteration:
      'Subhan-Allahi wa bi-hamdih, ‘adada khalqih, wa rida nafsih, wa zinata ‘arshih, wa midada kalimatih.',
    translationUrdu:
      'اللہ پاک ہے اپنی حمد کے ساتھ، اس کی مخلوق کی تعداد کے برابر، اس کی اپنی رضا کے مطابق، اس کے عرش کے وزن کے برابر، اور اس کے کلمات کی سیاہی کے برابر۔',
    translationEnglish:
      'Glory is to Allah and praise is to Him, according to the number of His creation, according to His personal pleasure, according to the weight of His Throne, and according to the ink of His words.',
    targetCount: 3,
    sourceHadith: 'صحیح مسلم: 2726 (عن ام المؤمنین جویریہ رضی اللہ عنہا)',
    virtueUrdu:
      'ام المؤمنین حضرت جویریہ رضی اللہ عنہا صبح کی نماز کے بعد ذکر کر رہی تھیں، رسول اللہ ﷺ نے فرمایا: میں نے تمہارے بعد چار کلمات تین مرتبہ کہے ہیں، اگر ان کا وزن تمہارے پورے دن کے ذکر کے ساتھ کیا جائے تو یہی بھاری ہوں گے! (صحیح مسلم)۔',
    virtueEnglish:
      'The Prophet ﷺ said to Juwayriyyah (may Allah be pleased with her): I recited four phrases three times after leaving you; if they were weighed against all you recited today, they would outweigh it.',
  },
  {
    id: 'ayat-al-kursi',
    category: 'BOTH',
    titleArabic: 'آيَةُ الْكُرْسِيِّ (سُورَةُ الْبَقَرَةِ: 255)',
    titleUrdu: 'آیۃ الکرسی (شیطان سے حفاظت کا قلعہ)',
    titleEnglish: 'Ayat al-Kursi (The Throne Verse - Surah Al-Baqarah 2:255)',
    arabicText:
      'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration:
      'Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta’khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa‘u ‘indahu illa bi-idhnih. Ya‘lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay’in min ‘ilmihi illa bima sha’. Wasi‘a kursiyyuhus-samawati wal-ard, wa la ya’uduhu hifzuhuma, wa Huwal-‘Aliyyul-‘Azim.',
    translationUrdu:
      'اللہ ہے جس کے سوا کوئی معبود نہیں، وہ آپ زندہ اور اوروں کا قائم رکھنے والا، نہ اسے اونگھ آئے نہ نیند، اسی کا ہے جو کچھ آسمانوں میں ہے اور جو کچھ زمین میں۔ کون ہے جو اس کے یہاں سفارش کرے بے اس کے حکم کے۔ جانتا ہے جو کچھ ان کے آگے ہے اور جو کچھ ان کے پیچھے، اور وہ نہیں پاتے اس کے علم میں سے مگر جتنا وہ چاہے۔ اس کی کرسی میں سمائے ہوئے ہیں آسمان اور زمین، اور اسے بھاری نہیں ان کی نگہبانی، اور وہی ہے بلند بڑائی والا۔ (کنز الایمان)',
    translationEnglish:
      'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    targetCount: 1,
    sourceHadith: 'صحیح البخاری: 2311، المستدرک للحاکم (صحیح علی شرط مسلم)',
    virtueUrdu:
      'جو شخص صبح کے وقت پڑھے گا وہ شام تک جنات و شیاطین کے شر سے اللہ کی پناہ میں رہے گا، اور جو شام کے وقت پڑھے گا وہ صبح تک محفوظ رہے گا۔',
    virtueEnglish:
      'Whoever recites this when waking in the morning will be protected from jinns and evil until evening; and whoever recites it in the evening will be protected until morning.',
  },
  {
    id: 'muawwidhat',
    category: 'BOTH',
    titleArabic: 'الْمُعَوِّذَاتُ (الإِخْلاصُ وَالْفَلَقُ وَالنَّاسُ)',
    titleUrdu: 'تینوں قل مبارک (حسد، جادو اور ہر وسوسے کی حتمی شفا)',
    titleEnglish: 'The Three Surahs of Protection (Al-Ikhlas, Al-Falaq, An-Nas)',
    arabicText:
      'قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\n\n' +
      'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِن شَرِّ مَا خَلَقَ ۞ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۞ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\n\n' +
      'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَٰهِ النَّاسِ ۞ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَالنَّاسِ',
    transliteration:
      'Surah Al-Ikhlas, Surah Al-Falaq, Surah An-Nas (Recited 3 times each).',
    translationUrdu:
      'تم فرماؤ: وہ اللہ ہے ایک، اللہ بے نیاز ہے، نہ اس کی کوئی اولاد اور نہ وہ کسی سے پیدا ہوا، اور نہ کوئی اس کا ہمسر ہے۔\n' +
      'تم فرماؤ: میں صبح کے رب کی پناہ مانگتا ہوں، اس کی تمام مخلوق کے شر سے، اور اندھیری رات کے شر سے جب وہ چھا جائے، اور گرہوں میں پھونکنے والیوں کے شر سے، اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔\n' +
      'تم فرماؤ: میں سب انسانوں کے پروردگار کی پناہ میں آیا، سب انسانوں کے بادشاہ، سب انسانوں کے معبود کی، اس کے شر سے جو دل میں برے خطرے ڈالے اور دبک رہے، وہ جو لوگوں کے دلوں میں وسوسے ڈالتا ہے، جنوں اور انسانوں میں سے۔ (کنز الایمان)',
    translationEnglish:
      'Say, "He is Allah, [who is] One..." Say, "I seek refuge in the Lord of daybreak..." Say, "I seek refuge in the Lord of mankind..."',
    targetCount: 3,
    sourceHadith: 'سنن ابی داود: 5082، جامع الترمذی: 3575 (حسن صحیح)',
    virtueUrdu:
      'رسول اللہ ﷺ نے حضرت عبداللہ بن خبیب رضی اللہ عنہ سے فرمایا: تم صبح اور شام تین تین مرتبہ قُلْ هُوَ اللَّهُ أَحَدٌ اور دونوں مُعَوِّذَتَیْن پڑھ لیا کرو، یہ تمہیں ہر چیز سے کافی ہو جائیں گی! (حصنِ حصین)',
    virtueEnglish:
      'The Prophet ﷺ said: Recite Surah Al-Ikhlas and the Mu‘awwidhatayn thrice in the morning and thrice in the evening; they will suffice you against everything.',
  },
  {
    id: 'subhanallahi-wa-bihamdihi-100',
    category: 'BOTH',
    titleArabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (مِائَةَ مَرَّةٍ)',
    titleUrdu: 'سو (۱۰۰) مرتبہ تسبیح و تحمید (گناہوں کی بخشش)',
    titleEnglish: '100x Daily Tasbih of Subhan-Allahi wa bi-Hamdih',
    arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subhan-Allahi wa bi-hamdih.',
    translationUrdu: 'اللہ پاک ہے اپنی حمد اور تعریف کے ساتھ۔',
    translationEnglish: 'Glory is to Allah and praise is to Him.',
    targetCount: 100,
    sourceHadith: 'صحیح البخاری: 6405، صحیح مسلم: 2691',
    virtueUrdu:
      'رسول اللہ ﷺ نے فرمایا: جس نے دن میں ۱۰۰ بار "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ" کہا، اس کے گناہ مٹا دیے جاتے ہیں اگرچہ سمندر کے جھاگ کے برابر ہوں! اور قیامت کے دن اس سے افضل عمل کسی کا نہ ہو گا سوائے اس کے جس نے اس جتنا یا اس سے زیادہ پڑھا ہو۔',
    virtueEnglish:
      'The Prophet ﷺ said: Whoever says "Subhan-Allahi wa bi-hamdih" one hundred times in a day will have his sins forgiven even if they were like the foam of the sea.',
  },
  {
    id: 'durood-sharif-10',
    category: 'BOTH',
    titleArabic: 'الصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ ﷺ',
    titleUrdu: 'حضور نبی کریم ﷺ پر درود و سلام (شفاعت کی ضمانت)',
    titleEnglish: '10x Salawat upon the Beloved Prophet ﷺ (Guarantee of Intercession)',
    arabicText:
      'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ وَبَارِكْ وَسَلِّمْ',
    transliteration:
      'Allahumma salli ‘ala sayyidina Muhammadin wa ‘ala ali sayyidina Muhammadin wa barik wa sallim.',
    translationUrdu:
      'اے اللہ! ہمارے آقا و مولا حضرت محمد ﷺ پر اور ان کی آل پر رحمتیں، برکتیں اور سلام نازل فرما۔',
    translationEnglish:
      'O Allah, bestow peace, blessings, and mercy upon our Master Muhammad and upon the noble family of our Master Muhammad.',
    targetCount: 10,
    sourceHadith: 'المعجم الکبیر للطبرانی (حسن)، مشکاۃ المصابیح',
    virtueUrdu:
      'رسول اللہ ﷺ نے فرمایا: جس نے صبح کے وقت مجھ پر دس مرتبہ اور شام کے وقت مجھ پر دس مرتبہ درود بھیجا، قیامت کے دن اسے میری شفاعت حاصل ہو کر رہے گی۔ (فضائلِ درود شریف و بہارِ شریعت)',
    virtueEnglish:
      'The Prophet ﷺ said: Whoever sends blessings upon me ten times in the morning and ten times in the evening, my intercession will reach him on the Day of Resurrection.',
  },
];
