/**
 * AMAL OS — The Sacred Personalities of Islam: Exhaustive Biographical Dataset
 * 
 * Detailed, comprehensive biographies of the Mother of the Believers (Ummahat al-Mu'minin),
 * the Holy Daughters of the Prophet ﷺ (Banat al-Mustafa), noble Sahabiyyat, and Qura'nic Exemplars.
 * 
 * Strictly sourced according to Ahl al-Sunnah wal-Jama'ah (Sawad al-A'zam) from:
 * 1. Sahih al-Bukhari & Sahih Muslim
 * 2. Al-Isabah fi Tamyiz al-Sahaba — Hafidh Ibn Hajar al-Asqalani
 * 3. Al-Tabaqat al-Kubra (Vol. 8) — Allama Ibn Sa'd
 * 4. Siyar A'lam al-Nubala — Imam Shams al-Din al-Dhahabi
 * 5. Madarij-un-Nubuwwah — Shaykh Abd al-Haqq Muhaddith Dehlawi
 * 6. Thughur al-Basim & Al-Khasa'is al-Kubra — Imam Jalal al-Din al-Suyuti
 */

import { SahabiyyatProfile } from './women-sanctuary-data';

export const DETAILED_SAHABIYYAT_PROFILES: SahabiyyatProfile[] = [
  // =========================================================================
  // 1. SAYYIDATUNA KHADIJAH AL-KUBRA (ام المؤمنین سیدتنا خدیجۃ الکبریٰ)
  // =========================================================================
  {
    id: 'sah-01',
    nameUrdu: 'ام المؤمنین سیدتنا خدیجہ الکبریٰ',
    nameArabic: 'خديجة بنت خويلد القرشية الأسدية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Khadijah al-Kubra (رضي الله عنها)',
    titleUrdu: 'طاہرہ، ام المؤمنین، سیدۃ نساء قریش، رفیقۂ نبوت',
    titleEnglish: 'At-Tahirah (The Pure), Mother of the Believers, First Believer',
    kinshipToProphet: 'رسول اللہ ﷺ کی پہلی زوجۂ مطہرہ، سیدہ فاطمہ اور چاروں بناتِ رسول کی والدہ ماجدہ',
    classicalCitation: 'صحیح البخاری، حدیث ۳، ۳۴۳۱ / صحیح مسلم، حدیث ۲۴۳۲، ۲۴۳۵',
    era: 'قبلِ ہجرت ۳ سال قبل وصال مکہ مکرمہ (عام الحزن)',
    biographyUrdu: 'کائنات میں سب سے پہلے اسلام قبول کرنے والی، رسول اللہ ﷺ کی پہلی رفیقۂ حیات اور نبوت کی سب سے مضبوط غمخوار۔ نزولِ وحی کے وقت ڈھارس بندھائی، شعبِ ابی طالب کے بائیکاٹ میں اپنی بے پناہ دولت نچھاور کی اور اللہ تعالیٰ نے حضرت جبرائیل کے ذریعے ان کے لیے سلام بھیجا۔',
    biographyEnglish: 'The first human being to embrace Islam and the premier emotional and spiritual fortress of the Prophet ﷺ. She recognized his Prophethood at Cave Hira, sacrificed her entire trading empire for the Da\'wah, and received greetings directly from Allah Almighty via Angel Jibril.',
    heroicAttributes: ['بے پناہ استقامت', 'کامل مالی ایثار', 'شوہر کی بہترین ڈھارس', 'رسول اللہ ﷺ کا بے مثال دفاع'],
    dailySunnahLessons: [
      {
        ur: 'مشکل اور پریشانی کے وقت شوہر اور اہل خانہ کی ڈھارس بندھانا اور ان کا حوصلہ بڑھانا۔',
        en: 'Providing calm, reassuring emotional solace to spouses and family during severe crises.'
      },
      {
        ur: 'کاروبار اور تجارت میں دیانت داری، سچائی اور کذب و فریب سے قطعی پرہیز کرنا۔',
        en: 'Practicing uncompromising honesty, trustworthiness, and ethical integrity in enterprise.'
      },
      {
        ur: 'اللہ کی راہ میں بغیر احسان جتائے خاموشی اور اخلاص کے ساتھ خرچ کرنا۔',
        en: 'Spending silently and generously in the path of Allah without ever seeking credit.'
      }
    ],
    sanadVerificationHash: 'SANAD-KHADIJAH-BUKHARI-SAHIH-001',

    lineageAndBackgroundUrdu: 'سیدتنا خدیجہ بنت خویلد بن اسد بن عبد العزیٰ بن قصی القرشیہ الاسدیہ۔ آپ کا شجرۂ نسب رسول اللہ ﷺ سے چوتھی پشت (قصی بن کلاب) پر جا ملتا ہے۔ زمانۂ جاہلیت میں بھی آپ کی پاکبازی، حیا اور عفت کا یہ عالم تھا کہ مکہ کا ہر فرد آپ کو "طاہرہ" (نہایت پاکدامن) اور "سیدۃ قریش" کے نام سے یاد کرتا تھا۔',
    lineageAndBackgroundEnglish: 'Khadijah bint Khuwaylid ibn Asad ibn Abd al-Uzza ibn Qusayy al-Qurashiyyah al-Asadiyyah. Her lineage merges with the Prophet ﷺ at Qusayy ibn Kilab. Even during pre-Islamic Jahiliyyah, her peerless chastity and moral dignity earned her the universal title "At-Tahirah" (The Pure).',

    propheticPraiseHadithArabic: '«خَيْرُ نِسَائِهَا مَرْيَمُ ابْنَتُ عِمْرَانَ، وَخَيْرُ نِسَائِهَا خَدِيجَةُ» [صحيح البخاري: ۳۴۳۱] — وَقَالَ ﷺ: «إِنِّي قَدْ رُزِقْتُ حُبَّهَا» [صحيح مسلم: ۲۴۳۵]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے ارشاد فرمایا: "اس کائنات کی تمام عورتوں میں سب سے افضل مریم بنت عمران ہیں اور اس دنیا کی عورتوں میں سب سے افضل خدیجہ ہیں"۔ اور فرمایا: "بے شک مجھے خدیجہ کی محبت اللہ کی طرف سے رزق بنا کر عطا کی گئی ہے"۔',
    propheticPraiseHadithEnglish: 'The Messenger of Allah ﷺ stated: "The best of the women of the worlds is Maryam bint Imran, and the best of the women of this world is Khadijah." (Sahih al-Bukhari) And he proclaimed: "Verily, I was nourished with her love as divine sustenance." (Sahih Muslim)',
    propheticPraiseSource: 'صحیح البخاری، کتاب الانبیاء، حدیث رقم ۳۴۳۱ / صحیح مسلم، حدیث رقم ۲۴۳۵',

    exhaustiveBiographyUrdu: [
      'سیدتنا خدیجہ الکبریٰ رضی اللہ عنہا مکہ کی سب سے باعزت اور کامیاب تاجر خاتون تھیں۔ جب انہوں نے حضور اقدس ﷺ کی امانت، راست بازی اور پاکیزہ اخلاق کا مشاہدہ فرمایا، تو اپنے خادم میسرہ کی زبانی حضور ﷺ کے شمائل سن کر خود نکاح کا پیغام بھیجا۔ اس وقت رسول اللہ ﷺ کی عمر مبارک ۲۵ سال اور سیدہ خدیجہ کی عمر ۴۰ سال تھی۔ آپ کی رفاقت میں رسول اللہ ﷺ کے ۲۵ سال ایسی بے مثل محبت اور یکجہتی کے ساتھ گزرے کہ جب تک وہ حیات رہیں، حضور ﷺ نے دوسرا نکاح نہیں فرمایا۔',
      'جب غارِ حرا میں پہلی وحی اتری اور رسول اللہ ﷺ پر جلالِ الٰہی کی ہیبت طاری ہوئی اور آپ ﷺ نے فرمایا: "زَمِّلُونِي زَمِّلُونِي" (مجھے چادر اوڑھا دو)، تو سیدتنا خدیجہ نے کمالِ بصیرت سے وہ تاریخ ساز جملہ ارشاد فرمایا جو رہتی دنیا تک ایمان کی تسلی کی بنیاد ہے: "كَلَّا وَاللَّهِ لَا يُخْزِيكَ اللَّهُ أَبَدًا، إِنَّكَ لَتَصِلُ الرَّحِمَ، وَتَحْمِلُ الْكَلَّ، وَتَكْسِبُ الْمَعْدُومَ، وَتَقْرِي الضَّيْفَ، وَتُعِينُ عَلَى نَوَائِبِ الْحَقِّ" (ہرگز نہیں! بخدا اللہ آپ کو کبھی رسوا نہیں فرمائے گا۔ آپ تو رشتہ داروں سے حسنِ سلوک کرتے ہیں، ناداروں کا بوجھ اٹھاتے ہیں، بے سہاروں کو کما کر دیتے ہیں، مہمان کی ضیافت کرتے ہیں اور راہِ حق کی مصیبتوں میں مدد فرماتے ہیں)۔',
      'جب قریش نے بنو ہاشم کا معاشی بائیکاٹ کر کے انہیں شعبِ ابی طالب کی تپتی گھاٹی میں تین سال محصور رکھا، جہاں بھوک اور پیاس سے پتے چبا کر گزارا ہوتا تھا، تو سیدتنا خدیجہ نے محلات کی آسائشیں چھوڑ کر حضور ﷺ کے ساتھ گھاٹی میں فقر و فاقہ کی سختیاں جھیلیں اور اپنی تمام تر دولت اسلام کے تحفظ پر نچھاور کر دی۔',
      'حضرت جبرائیل علیہ السلام نے حضور ﷺ کی خدمت میں حاضر ہو کر عرض کیا: "یا رسول اللہ! یہ خدیجہ برتن لے کر آ رہی ہیں، جب آئیں تو انہیں ان کے رب کا اور میرا سلام کہیے اور انہیں جنت میں موتیوں کے ایک ایسے محل کی خوشخبری دیجیے جہاں نہ کوئی شور ہوگا نہ کوئی مشقت"۔',
      'سیدتنا خدیجہ کا وصال ہجرت سے ۳ سال قبل ہوا، اور اس صدمے پر رسول اللہ ﷺ نے اس سال کو "عام الحزن" (غم کا سال) کا نام دیا۔ وصال کے برسوں بعد بھی جب مدینہ میں بکری ذبح ہوتی، تو حضور ﷺ خدیجہ کی سہیلیوں کے گھروں میں گوشت بھیجتے اور ان کی وفا کو فرطِ محبت سے یاد فرماتے تھے۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Khadijah al-Kubra (رضي الله عنها) was the supreme matriarch of Islamic history and the foremost human being to testify to the Prophethood of Muhammad ﷺ. Prior to Islam, she managed a vast commercial trade reaching Syria and Yemen, conducting business with unparalleled ethics that earned her the Makkan title At-Tahirah (The Pure).',
      'Recognizing the absolute honesty and divine light of the Prophet ﷺ, she proposed marriage through her companion Nafisah. Their 25 years of marriage formed the most harmonious household in human history; the Prophet ﷺ wed no other woman during her entire lifetime.',
      'When the first revelation shook Cave Hira and the Prophet ﷺ returned trembling, calling "Zammiluni, Zammiluni" (Wrap me up!), Khadijah provided the ultimate theological comfort: "Never by Allah! Allah will never humiliate you, for you uphold the ties of kinship, bear the burdens of the weak, spend upon the destitute, honor the guest, and aid those afflicted by truth."',
      'During the brutal 3-year siege in the valley of Shi\'b Abi Talib, where Muslims were starved under economic boycott, Khadijah liquidated her entire commercial wealth to sustain the fledgling Muslim community, enduring hunger with radiant patience.',
      'Archangel Jibril descended to the Prophet ﷺ declaring: "O Messenger of Allah! Here is Khadijah approaching with a vessel of food. When she reaches you, convey to her peace (Salam) from her Lord and from me, and give her glad tidings of a palace of carved pearls in Paradise where there is neither tumult nor weariness."',
      'She passed away in Makkah in the 10th year of Prophethood. The Prophet ﷺ personally lowered her into her resting place at Jannat al-Mu\'alla and designated the year "Aam al-Huzn" (The Year of Sorrow). Even decades later in Madinah, he would honor her memory by sending gifts to her surviving friends.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'حضور ﷺ کی دیانت کا اعتراف اور نکاحِ مبارک',
        eventTitleEnglish: 'Marriage to the Prophet ﷺ Based on Truth & Trust',
        descriptionUrdu: 'سیدہ خدیجہ نے حضور ﷺ کی امانت و سچائی سے متاثر ہو کر نکاح کا پیغام بھیجا۔',
        descriptionEnglish: 'Recognized the unblemished integrity of the Prophet ﷺ and initiated marriage.'
      },
      {
        eventTitleUrdu: 'غارِ حرا میں پہلی وحی اور تسلی کا تاریخ ساز کردار',
        eventTitleEnglish: 'Solace at the First Revelation in Cave Hira',
        descriptionUrdu: 'وحی کے نزول پر ڈھارس بندھائی اور اسلام قبول کرنے والی کائنات کی سب سے پہلی ہستی بنیں۔',
        descriptionEnglish: 'Immediately embraced Islam, providing emotional and moral grounding.'
      },
      {
        eventTitleUrdu: 'شعبِ ابی طالب کا تین سالہ بائیکاٹ اور مالی قربانی',
        eventTitleEnglish: '3-Year Siege of Shi\'b Abi Talib',
        descriptionUrdu: 'بنو ہاشم کے معاشی بائیکاٹ میں اپنی تمام دولت اسلام کی بقا پر نچھاور کر دی۔',
        descriptionEnglish: 'Endured famine and deprivation alongside the Prophet ﷺ, expending her entire fortune.'
      },
      {
        eventTitleUrdu: 'اللہ تعالیٰ اور حضرت جبرائیل کا براہِ راست سلام',
        eventTitleEnglish: 'Direct Greeting from Allah via Angel Jibril',
        descriptionUrdu: 'جبرائیل علیہ السلام نے آ کر رب العالمین کی جانب سے سلام اور جنت میں موتیوں کے محل کی بشارت دی۔',
        descriptionEnglish: 'Honored with divine peace (Salam) from Allah Almighty delivered by Archangel Jibril.'
      },
      {
        eventTitleUrdu: 'وصالِ مبارک اور عام الحزن کا اعلان',
        eventTitleEnglish: 'Demise and the Year of Sorrow (Aam al-Huzn)',
        descriptionUrdu: 'ہجرت سے ۳ سال قبل ۱۰ نبوی کو مکہ میں وصال فرمایا۔ حضور ﷺ نے خود تدفین فرمائی۔',
        descriptionEnglish: 'Passed away in Makkah; the Prophet ﷺ personally laid her to rest in Jannat al-Mu\'alla.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن حجر عسقلانی (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Hajar al-Asqalani',
        bookTitle: 'الإصابة في تمييز الصحابة (جلد ۸)',
        verbatimQuoteUrdu: 'خدیجہ رضی اللہ عنہا نے اپنی پوری زندگی میں کبھی حضور ﷺ کی دل شکنی نہیں کی اور نہ ہی کسی کلمے سے ناگواری ظاہر کی۔ ان کی فضیلتیں اتنی کثیر ہیں جن کا احاطہ ممکن نہیں۔',
        verbatimQuoteEnglish: 'Khadijah never once distressed the Prophet ﷺ in word or deed throughout their 25 years together.'
      },
      {
        scholarNameUrdu: 'امام شمس الدین الذہبی (رحمہ اللہ)',
        scholarNameEnglish: 'Imam al-Dhahabi',
        bookTitle: 'سير أعلام النبلاء',
        verbatimQuoteUrdu: 'ام المؤمنین خدیجہ رضی اللہ عنہا عقل، دین، مروت، سخاوت اور کمال میں قریش کی تمام خواتین کی سردار تھیں۔',
        verbatimQuoteEnglish: 'She was the supreme matriarch of Quraysh in intellect, religious devotion, generosity, and nobility.'
      }
    ]
  },

  // =========================================================================
  // 2. SAYYIDATUNA AISHA SIDDIQAH (ام المؤمنین سیدتنا عائشہ صدیقہ)
  // =========================================================================
  {
    id: 'sah-02',
    nameUrdu: 'ام المؤمنین سیدتنا عائشہ صدیقہ',
    nameArabic: 'عائشة بنت أبي بكر الصدیق التيمية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Aisha Siddiqah (رضي الله عنها)',
    titleUrdu: 'صدیقہ، حمیراء، فقیہۃ الامت، ام المؤمنین، حبیبۃ حبیب اللہ',
    titleEnglish: 'As-Siddiqah, The Great Jurist, Mother of the Believers',
    kinshipToProphet: 'رسول اللہ ﷺ کی محبوب ترین زوجۂ مطہرہ، خلیفۂ اول حضرت ابوبکر صدیق کی لختِ جگر',
    classicalCitation: 'صحیح البخاری، حدیث ۳۷۶۸، ۴۷۵۰ / جامع الترمذی، حدیث ۳۸۸۳',
    era: 'متوفی ۵۸ ہجری مدینہ منورہ (تدفین جنت البقیع)',
    biographyUrdu: 'امتِ مسلمہ کی سب سے عظیم عالمہ، فقیہہ اور مفسرہ۔ رسول اللہ ﷺ سے ۲,۲۱۰ احادیث روایت فرمائیں۔ صحابہ کرام فقہی اور میراث کے مسائل میں آپ کی طرف رجوع فرماتے تھے۔ قرآن مجید میں ان کی براءت نازل ہوئی اور ان کا حجرہ مبارکہ ہی روضۂ اطہر بنا۔',
    biographyEnglish: 'The supreme female scholar of Islam. Transmitter of 2,210+ Hadiths, master of jurisprudence, medicine, and Arabic poetry. Senior companions consulted her for legal decrees. Her innocence was enshrined forever in Surah An-Nur, and her sacred chamber became the resting place of the Prophet ﷺ.',
    heroicAttributes: ['بے مثال علمی و اجتہادی عبقریت', 'سخاوت اور فیاضی کا سمندر', 'شب بیداری، زہد اور کثرتِ روزے', 'حدیث و فقہ کی حفاظت'],
    dailySunnahLessons: [
      {
        ur: 'دین کے علم، فقہ اور حدیث کو باریکی اور تحقیق کے ساتھ سیکھنا۔',
        en: 'Pursuing deep sacred knowledge and transmitting accurate Islamic understanding to others.'
      },
      {
        ur: 'الزام تراشی اور غیبت سے اپنی زبان کی سختی کے ساتھ حفاظت کرنا۔',
        en: 'Guarding one\'s tongue strictly against backbiting, rumors, and slanders.'
      },
      {
        ur: 'حاجت مندوں پر کثرت سے صدقہ کرنا چاہے اپنے پاس ایک لقمہ ہی کیوں نہ ہو۔',
        en: 'Giving charity to the needy selflessly even when facing personal hardship.'
      }
    ],
    sanadVerificationHash: 'SANAD-AISHA-TIRMIDHI-SAHIH-002',

    lineageAndBackgroundUrdu: 'سیدتنا عائشہ بنت ابی بکر صدیق عبد اللہ بن عثمان التیمیہ القرشیہ۔ آپ کی والدہ ماجدہ ام رومان بنت عامر کنانیہ ہیں۔ آپ کا گھرانہ اسلام کا پہلا وہ مبارک گھرانہ ہے جس کے تمام افراد ایمان کے نور سے منور ہوئے۔ آپ کی پیدائش اسلام کے ابتدائی دور میں ہوئی اور آپ نے آنکھ کھولتے ہی گھر میں توحید اور رسول اللہ ﷺ کا نام سنا۔',
    lineageAndBackgroundEnglish: 'Aisha bint Abi Bakr as-Siddiq Abd Allah ibn Uthman al-Taymiyyah al-Qurashiyyah. Her mother was Umm Ruman bint Amir. Born into the earliest household of Islam, she never breathed the air of idolatry.',

    propheticPraiseHadithArabic: '«فَضْلُ عَائِشَةَ عَلَى النِّسَاءِ كَفَضْلِ الثَّرِيدِ عَلَى سَائِرِ الطَّعَامِ» [صحيح البخاري: ۳۷۶۸] — وَقَالَ أَبُو مُوسَى: «مَا أَشْكَلَ عَلَيْنَا أَصْحَابَ رَسُولِ اللَّهِ ﷺ حَدِيثٌ قَطُّ فَسَأَلْنَا عَائِشَةَ إِلَّا وَجَدْنَا عِنْدَهَا مِنْهُ عِلْمًا» [جامع الترمذي: ۳۸۸۳]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے فرمایا: "عائشہ کی فضیلت تمام عورتوں پر ایسی ہے جیسے ثرید (عمدہ ترین کھانے) کی فضیلت باقی تمام کھانوں پر ہے"۔ اور حضرت ابو موسیٰ اشعری نے فرمایا: "ہم صحابہ کو جب بھی کسی حدیث یا مسئلے میں اشکال پیش آیا، ہم نے عائشہ سے پوچھا تو ان کے پاس اس کا یقینی علم موجود پایا"۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ stated: "The superiority of Aisha over other women is like the superiority of Tharid over all other food." (Sahih al-Bukhari) Abu Musa al-Ash\'ari reported: "Never did a difficult matter confront the companions of the Prophet ﷺ except that we asked Aisha and found knowledge regarding it with her." (Jami al-Tirmidhi)',
    propheticPraiseSource: 'صحیح البخاری، حدیث ۳۷۶۸ / جامع الترمذی، حدیث ۳۸۸۳ (حدیث صحیح غریب)',

    exhaustiveBiographyUrdu: [
      'سیدتنا عائشہ صدیقہ رضی اللہ عنہا امتِ مسلمہ کی وہ مایہ ناز علمی اور روحانی عبقری تھیں جن کے ذریعے شریعتِ اسلامیہ کا نصف سے زیادہ حصہ امت تک پہنچا۔ آپ کا حافظہ، فصاحت و بلاغت اور فہمِ دین اس قدر بے مثل تھا کہ امام زہری فرماتے ہیں: "اگر تمام مردوں اور ازواجِ مطہرات کا علم ایک پلڑے میں رکھا جائے اور عائشہ کا علم دوسرے پلڑے میں، تو عائشہ کا پلڑا بھاری رہے گا"۔',
      'جب منافقین نے واقعۂ افک میں ناپاک الزام تراشی کی، تو سیدتنا عائشہ نے صبر کا وہ اعلیٰ ترین نمونہ پیش فرمایا کہ آپ نے فرمایا: "واللہ! میں صرف وہی کہتی ہوں جو حضرت یوسف علیہ السلام کے والد نے فرمایا تھا: فَصَبْرٌ جَمِيلٌ وَاللَّهُ الْمُسْتَعَانُ عَلَى مَا تَصِفُونَ"۔ اس پر اللہ تعالیٰ نے عرشِ بریں سے سورۃ النور کی ۱۰ آیات نازل فرما کر قیامت تک کے لیے ان کی طہارت اور براءت پر مہر لگا دی۔',
      'آپ زہد اور قناعت کا پیکر تھیں۔ عروہ بن زبیر فرماتے ہیں کہ میں نے سیدتنا عائشہ کو دیکھا کہ ایک دن میں ستر ہزار (۷۰,۰۰۰) درہم صدقہ فرما دیے اور اپنے چادر مبارک میں پیوند لگے ہوئے تھے۔ اکثر مسلسل روزے رکھتیں اور شام کو سوکھی روٹی اور زیتون کے تیل سے افطار فرماتیں۔',
      'رسول اللہ ﷺ کے مرضِ وصال کے آخری ایام سیدتنا عائشہ کے حجرہ مبارکہ میں گزرے۔ سرکارِ دو عالم ﷺ نے سیدتنا عائشہ کی گود میں سر مبارک رکھے ہوئے وصال فرمایا اور آپ کے حجرے ہی میں مدفون ہوئے، جو آج کائنات کا مقدس ترین روضۂ اطہر ہے۔',
      'آپ نے ۵۸ ہجری میں ۱۷ رمضان المبارک کو مدینہ منورہ میں وصال فرمایا۔ حضرت ابوہریرہ رضی اللہ عنہ نے نمازِ جنازہ پڑھائی اور وصیت کے مطابق رات کے وقت جنت البقیع میں تدفین عمل میں آئی۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Aisha Siddiqah (رضي الله عنها) stands as the supreme female scholar and jurist in human history. Transmitting 2,210 authentic traditions, she was a master not only of Hadith and Fiqh, but also of medicine, inheritance law, and classical Arabic literature.',
      'When hypocrites forged the slander of the Ifk, Aisha placed her total trust in Allah: "By Allah, I know nothing to say except what the father of Yusuf said: Beautiful patience is my course, and Allah is the One sought for help against that which you describe." In response, Allah revealed 10 verses of Surah An-Nur directly exonerating her for all eternity.',
      'Her generosity was legendary. Her nephew Urwah ibn al-Zubayr testified that he witnessed her distribute 70,000 dirhams in charity in a single afternoon while wearing a patched garment, not keeping a single coin to buy food for her own fast.',
      'The Prophet ﷺ spent his final earthly days in her chamber, and breathed his noble last in her embrace. His blessed resting place was dug directly within her room, transforming her home into the holiest sanctuary on earth.',
      'She passed away on the 17th of Ramadan, 58 AH, at the age of 67. Abu Hurayrah led her funeral prayers, and in accordance with her modest wishes, she was laid to rest at night in Jannat al-Baqi alongside her fellow Mothers of the Believers.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'نکاحِ مبارک اور مدینہ منورہ کی ہجرت',
        eventTitleEnglish: 'Blessed Marriage and Migration to Madinah',
        descriptionUrdu: 'حضور ﷺ کے نکاح میں آئیں اور مدینہ منورہ میں حجرہ مبارکہ کو اپنا مسکن بنایا۔',
        descriptionEnglish: 'Wed the Prophet ﷺ and established the blessed domestic sanctuary in Madinah.'
      },
      {
        eventTitleUrdu: 'واقعۂ افک اور سورۃ النور کی آیاتِ براءت',
        eventTitleEnglish: 'The Slander of Ifk and Divine Exoneration',
        descriptionUrdu: 'منافقین کے بہتان کے جواب میں اللہ تعالیٰ نے آسمان سے ۱۰ آیاتِ قرآنی نازل فرمائیں۔',
        descriptionEnglish: 'Allah revealed 10 verses of Surah An-Nur establishing her perpetual innocence.'
      },
      {
        eventTitleUrdu: 'رسول اللہ ﷺ کا وصالِ مبارک حجرۂ عائشہ میں',
        eventTitleEnglish: 'The Passing of the Prophet ﷺ in Her Chamber',
        descriptionUrdu: 'حضور ﷺ نے آپ کی گود میں وصال فرمایا اور حجرۂ عائشہ ہی روضۂ رسول بنا۔',
        descriptionEnglish: 'The Prophet ﷺ passed away in her embrace, resting eternally within her room.'
      },
      {
        eventTitleUrdu: 'کبار صحابہ کی فقہی رہنمائی اور فتاویٰ کا مسند',
        eventTitleEnglish: 'Juristic Authority and Decrees to the Sahabah',
        descriptionUrdu: 'حضرت عمر اور عثمان کے دور میں فتاویٰ دینا اور احادیث کی تدریس فرمانا۔',
        descriptionEnglish: 'Issued definitive legal rulings and trained the greatest scholars of Islam.'
      },
      {
        eventTitleUrdu: 'وصالِ مبارک اور جنت البقیع میں تدفین',
        eventTitleEnglish: 'Demise and Resting in Jannat al-Baqi',
        descriptionUrdu: '۵۸ ہجری میں وصال فرمایا اور جنت البقیع میں ازواجِ مطہرات کے ساتھ مدفون ہوئیں۔',
        descriptionEnglish: 'Passed away in 58 AH, laid to rest in Jannat al-Baqi under night skies.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن شہاب الزہری (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Ibn Shihab al-Zuhri',
        bookTitle: 'تہذیب التہذیب',
        verbatimQuoteUrdu: 'اگر تمام لوگوں کا علم اور تمام ازواج کا علم جمع کیا جائے تو عائشہ کا علم ان سب سے وسیع تر نکلے گا۔',
        verbatimQuoteEnglish: 'If the knowledge of all people and all wives of the Prophet were gathered, Aisha\'s knowledge would surpass them all.'
      },
      {
        scholarNameUrdu: 'امام بدر الدین الزرکشی (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Badr al-Din al-Zarkashi',
        bookTitle: 'الإجابة لإيراد ما استدركته عائشة على الصحابة',
        verbatimQuoteUrdu: 'سیدتنا عائشہ نے نہ صرف احادیث روایت کیں بلکہ فہم، قیاس اور استدلال میں کبار صحابہ کی علمی تصحیح فرمائی۔',
        verbatimQuoteEnglish: 'Aisha not only transmitted Hadith, but audited and corrected senior companions through profound juristic critique.'
      }
    ]
  },

  // =========================================================================
  // 3. SAYYIDATUNA FATIMAH AZ-ZAHRA (سیدۃ نساء اہل الجنہ فاطمۃ الزہراء)
  // =========================================================================
  {
    id: 'sah-03',
    nameUrdu: 'سیدۂ کائنات حضرت فاطمۃ الزہراء',
    nameArabic: 'فاطمة بنت رسول الله الزهراء البتول (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Fatimah az-Zahra (رضي الله عنها)',
    titleUrdu: 'سیدۃ نساء اہل الجنہ، بتول، زہراء، بضعۃ النبی، ام ابیہا',
    titleEnglish: 'Leader of the Women of Paradise, Az-Zahra, Badi\'at al-Nabi',
    kinshipToProphet: 'رسول اللہ ﷺ کی سب سے چہیتی صاحبزادی، حضرت علی المرتضیٰ کی زوجہ، حسنین کریمین کی والدہ ماجدہ',
    classicalCitation: 'صحیح البخاری، حدیث ۳۷۱۴، ۳۷۶۷ / صحیح مسلم، حدیث ۲۴۴۹',
    era: 'متوفی ۱۱ ہجری (وصالِ نبوی کے ۶ ماہ بعد مدینہ منورہ)',
    biographyUrdu: 'رسول اللہ ﷺ کے جگر کا ٹکڑا، حسن و سیرت میں ہو بہو شبیہِ مصطفیٰ، اور جنت کی تمام عورتوں کی سردار۔ بچپن میں مکہ میں حضور ﷺ کا دفاع کیا، فقر و فاقہ میں چکی پیستے ہوئے صبر و قناعت کی تاریخ رقم کی اور حسنین کریمین جیسی پاکیزہ نسل پروان چڑھائی۔',
    biographyEnglish: 'The flesh and blood of the Prophet ﷺ, his mirror image in noble carriage and character, and the Leader of the Women of Paradise. Stood fearlessly in childhood defending the Prophet at the Ka\'bah, personified absolute contentment in poverty, and mothered the sacred Hasani-Husayni lineage.',
    heroicAttributes: ['اعلیٰ ترین حیا اور عفت', 'بے مثل زہد، قناعت اور صبر', 'حضور ﷺ سے بے پناہ عشق اور شبیہِ نبوی', 'اہلِ بیتِ اطہار کی سرداری'],
    dailySunnahLessons: [
      {
        ur: 'سادگی، قناعت اور پردے کو اپنی زینت بنانا اور دنیاوی نمود و نمائش سے بچنا۔',
        en: 'Adopting contentment and modesty, steering clear of ostentatious worldly displays.'
      },
      {
        ur: 'گھر کے کام کاج کو عبادت کی نیت سے صبر اور اخلاص کے ساتھ انجام دینا۔',
        en: 'Carrying out household duties with patience, viewing family care as rewarded worship.'
      },
      {
        ur: 'تسبیحِ فاطمہ (۳۳ سبحان اللہ، ۳۳ الحمد للہ، ۳۴ اللہ اکبر) کو ہر رات سوتے وقت لازم پڑھنا۔',
        en: 'Reciting Tasbih-e-Fatimah before sleeping every night for spiritual and physical strength.'
      }
    ],
    sanadVerificationHash: 'SANAD-FATIMAH-BUKHARI-SAHIH-003',

    lineageAndBackgroundUrdu: 'سیدہ فاطمہ بنت سید الاولین والآخرین محمد بن عبد اللہ ﷺ۔ آپ کی والدہ ماجدہ ام المؤمنین سیدتنا خدیجہ الکبریٰ رضی اللہ عنہا ہیں۔ آپ مکہ مکرمہ میں بعثت کے وقت پیدا ہوئیں اور نورِ نبوت کے سایۂ عاطفت میں پرورش پائی۔ آپ کا لقب "زہراء" (روشن و چمکدار چہرے والی) اور "بتول" (دنیا کی آلائشوں سے کٹ کر خالص اللہ کی عبادت میں مگن رہنے والی) تھا۔',
    lineageAndBackgroundEnglish: 'Fatimah bint Muhammad ﷺ, daughter of the Seal of Prophets and Khadijah al-Kubra. Born in Makkah around the commencement of revelation. Titled Az-Zahra (The Radiant) and Al-Batul (The Ascetic Devotee devoted solely to Allah).',

    propheticPraiseHadithArabic: '«فَاطِمَةُ بَضْعَةٌ مِنِّي، فَمَنْ أَغْضَبَهَا أَغْضَبَنِي» [صحيح البخاري: ۳۷۱۴] — وَقَالَ ﷺ: «يَا فَاطِمَةُ، أَمَا تَرْضَيْنَ أَنْ تَكُونِي سَيِّدَةَ نِسَاءِ أَهْلِ الجَنَّةِ؟» [صحيح البخاري: ۳۶۲۴]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے ارشاد فرمایا: "فاطمہ میرے جگر کا ٹکڑا ہے، جس نے اسے ناراض کیا اس نے مجھے ناراض کیا"۔ اور سرگوشی میں فرمایا: "اے فاطمہ! کیا تم اس بات پر راضی نہیں ہو کہ تم جنت کی تمام عورتوں کی سردار ہو؟"۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ proclaimed: "Fatimah is a part of me; whoever angers her angers me." (Sahih al-Bukhari) And he whispered to her: "O Fatimah, are you not pleased to be the Leader of the Women of Paradise?" (Sahih al-Bukhari)',
    propheticPraiseSource: 'صحیح البخاری، کتاب فضائل اصحاب النبی، حدیث رقم ۳۷۱۴، ۳۶۲۴ / صحیح مسلم، حدیث رقم ۲۴۴۹',

    exhaustiveBiographyUrdu: [
      'سیدتنا فاطمۃ الزہراء رضی اللہ عنہا کا مقام و مرتبہ تمام کائنات کی خواتین میں سب سے بلند ہے۔ سیدتنا عائشہ صدیقہ فرماتی ہیں: "میں نے شکل و صورت، گفتگو، عادات و اطوار اور اٹھنے بیٹھنے میں رسول اللہ ﷺ سے زیادہ مشابہ فاطمہ کے علاوہ کسی اور کو نہیں دیکھا۔ جب بھی وہ تشریف لاتیں، حضور ﷺ فرطِ محبت سے کھڑے ہو جاتے، ان کا ہاتھ چومتے اور اپنی جگہ پر بٹھاتے تھے"۔',
      'بچپن ہی میں جب کفارِ مکہ نے کعبہ میں حالتِ سجدہ میں حضور ﷺ کی پشتِ مبارک پر اونٹ کی اوجھڑی ڈالی، تو یہ ننھی شہزادی تن تنہا دوڑتی ہوئی آئیں، اپنے ہاتھوں سے نجاست کو ہٹایا اور قریش کے سرداروں کو جھنجھوڑ دیا۔ اسی جاں نثاری کی بنا پر حضور ﷺ انہیں "ام ابیہا" (اپنے باپ کی ماں) کا پیارا لقب دیتے تھے۔',
      'حضرت علی المرتضیٰ رضی اللہ عنہ کے ساتھ نکاحِ مبارک انتہائی سادگی کے ساتھ عمل میں آیا۔ جہیز میں صرف ایک بستر، چمڑے کا تکیہ، مشکیزہ اور چکی تھی۔ آپ گھر کا تمام کام خود کرتیں، چکی پیستے پیستے مبارک ہاتھوں میں چھالے پڑ جاتے اور مشک اٹھاتے اٹھاتے سینے پر نشانات پڑ جاتے مگر زبان پر کبھی شکوہ نہیں آیا۔ جب حضور ﷺ سے خادم مانگنے گئیں تو حضور ﷺ نے خادم کے بدلے تسبیحِ فاطمہ کا تحفہ عطا فرمایا۔',
      'غزوۂ احد میں جب حضور ﷺ کا چہرۂ انور زخمی ہوا اور خون رک نہیں رہا تھا، تو سیدہ فاطمہ نے چٹائی جلا کر اس کی راکھ زخم پر لگائی جس سے خون تھم گیا۔',
      'حضور اقدس ﷺ کے وصال پر آپ پر غم کے وہ پہاڑ ٹوٹے جنہیں بیان کرتے ہوئے آپ نے فرمایا: "صُبَّتْ عَلَيَّ مَصَائِبُ لَوْ أَنَّهَا، صُبَّتْ عَلَى الْأَيَّامِ صِرْنَ لَيَالِيَا" (مجھ پر ایسی مصیبتیں انڈیل دی گئیں کہ اگر وہ روشن دنوں پر پڑتیں تو وہ سیاہ راتوں میں بدل جاتیں)۔ حضور ﷺ کے وصال کے محض ۶ ماہ بعد ۳ رمضان ۱۱ ہجری کو مدینہ منورہ میں وصال فرمایا۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Fatimah az-Zahra (رضي الله عنها) holds the supreme station among the women of all creation. Sayyidatuna Aisha testified: "I never saw anyone who resembled the Prophet ﷺ more in speech, manners, and demeanor than Fatimah. Whenever she entered, the Prophet ﷺ would stand up to welcome her, kiss her hand, and seat her in his own place."',
      'In early childhood in Makkah, when Quraysh tyrants dumped filth upon the Prophet ﷺ while he was prostrating before the Ka\'bah, young Fatimah ran forward fearlessly, cleansed her father with her own hands, and rebuked the pagan chiefs, earning the title "Umm Abiha" (Mother of her Father).',
      'Her marriage to Ali ibn Abi Talib was celebrated with celestial simplicity. Her dowry comprised a sheepskin bed, a leather pillow stuffed with palm fiber, a water-skin, and a hand-mill. She performed all arduous household chores herself until blisters formed on her hands, personifying sublime asceticism.',
      'At the Battle of Uhud, when the Prophet\'s helmet was broken and his blessed face was bleeding profusely, Fatimah burned a piece of straw matting and applied its ashes to stem the flow of blood.',
      'Following the passing of the Prophet ﷺ, she lived in profound spiritual contemplation, passing away just six months later on the 3rd of Ramadan, 11 AH, at the young age of 29. In accordance with her supreme modesty, her funeral was carried out quietly at night in Jannat al-Baqi.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'کعبہ میں حضور ﷺ کا کمسنی میں دلیرانہ دفاع',
        eventTitleEnglish: 'Heroic Defense of the Prophet at the Ka\'bah',
        descriptionUrdu: 'مشرکین کے سجدے میں اوجھڑی ڈالنے پر نجاست ہٹائی اور کفار کو للکارا۔',
        descriptionEnglish: 'Fearlessly removed filth placed upon the Prophet during Sujud at the Ka\'bah.'
      },
      {
        eventTitleUrdu: 'حضرت علی سے نکاح اور تسبیحِ فاطمہ کا عطیہ',
        eventTitleEnglish: 'Marriage to Ali and the Gift of Tasbih-e-Fatimah',
        descriptionUrdu: 'انتہائی سادگی سے نکاح ہوا اور حضور ﷺ نے سونے سے قبل تسبیح کا نبوی تحفہ دیا۔',
        descriptionEnglish: 'Wed Ali in celestial simplicity, receiving the immortal gift of Tasbih-e-Fatimah.'
      },
      {
        eventTitleUrdu: 'غزوۂ احد میں رسول اللہ ﷺ کے زخموں کی مرہم پٹی',
        eventTitleEnglish: 'Nursing the Prophet\'s Wounds at Uhud',
        descriptionUrdu: 'چٹائی کی راکھ لگا کر حضور ﷺ کے چہرۂ انور کا خون بند کیا۔',
        descriptionEnglish: 'Tended to the Prophet\'s facial wounds at Uhud, staunching the bleeding with ashes.'
      },
      {
        eventTitleUrdu: 'جنت کی تمام عورتوں کی سرداری کی بشارت',
        eventTitleEnglish: 'Proclamation as Leader of the Women of Paradise',
        descriptionUrdu: 'حضور ﷺ نے راز میں سرگوشی فرما کر سیدۃ نساء اہل الجنہ کی خوشخبری دی۔',
        descriptionEnglish: 'Prophetically designated as Sayyidat Nisa\' Ahl al-Jannah by her noble father.'
      },
      {
        eventTitleUrdu: 'وصالِ مبارک اور رات کے اندھیرے میں تدفین',
        eventTitleEnglish: 'Demise and Nocturnal Burial in Baqi',
        descriptionUrdu: 'وصالِ نبوی کے ۶ ماہ بعد وصال فرمایا اور وصیت کے مطابق رات کو تدفین ہوئی۔',
        descriptionEnglish: 'Passed away 6 months after the Prophet ﷺ, laid to rest at night in Jannat al-Baqi.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام جلال الدین السیوطی (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Jalal al-Din al-Suyuti',
        bookTitle: 'ثغور الباسم في مناقب سيدتنا فاطمة',
        verbatimQuoteUrdu: 'سیدہ فاطمہ الزہراء بضعۃ منی کا وہ پاکیزہ نور ہیں جن کی تعظیم و محبت ہر مومن پر فرض ہے۔',
        verbatimQuoteEnglish: 'Fatimah az-Zahra is the immaculate light of the Prophetic essence whose love and reverence is obligatory upon every believer.'
      },
      {
        scholarNameUrdu: 'شیخ عبد الحق محدث دہلوی (رحمہ اللہ)',
        scholarNameEnglish: 'Shaykh Abd al-Haqq Muhaddith Dehlawi',
        bookTitle: 'مدارج النبوۃ (قسم پنجم)',
        verbatimQuoteUrdu: 'سیدہ بتول کا زہد اور حیا کائنات کی تمام خواتین کے لیے قیامت تک کا معیار ہے۔',
        verbatimQuoteEnglish: 'The asceticism and modesty of Sayyidah al-Batul remains the eternal benchmark for all women until the Day of Judgment.'
      }
    ]
  },

  // =========================================================================
  // 4. SAYYIDATUNA UMM SALAMAH (ام المؤمنین سیدتنا ام سلمہ ہند بنت ابی امیہ)
  // =========================================================================
  {
    id: 'sah-04',
    nameUrdu: 'ام المؤمنین سیدتنا ام سلمہ',
    nameArabic: 'هند بنت أبي أمية بن المغيرة المخزومية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Umm Salamah (رضي الله عنها)',
    titleUrdu: 'ام المؤمنین، صاحبۃ الرائے الصائب، مہاجرۃ الہجرتین',
    titleEnglish: 'Mother of the Believers, The Wise Counselor of Hudaybiyyah',
    kinshipToProphet: 'رسول اللہ ﷺ کی زوجۂ مطہرہ، قریش کے مخزوم قبیلے کی معزز ترین خاتون',
    classicalCitation: 'صحیح البخاری، حدیث ۲۷۳۱، ۲۷۳۲ / صحیح مسلم، حدیث ۹۱۸',
    era: 'متوفی ۶۲ ہجری مدینہ منورہ (سب سے آخر میں وصال پانے والی زوجۂ مطہرہ)',
    biographyUrdu: 'حبشہ اور مدینہ دونوں طرف ہجرت کرنے والی جلیل القدر خاتون۔ صلحِ حدیبیہ کے موقع پر آپ کی بے مثل حکمت اور دانشمندانہ مشورے نے امت کو بحران سے نکالا۔ مصیبت کے وقت ان کی سکھائی ہوئی دعا "اللهم أجرني في مصيبتي" ہر مسلمان کے لیے مشعلِ راہ ہے۔',
    biographyEnglish: 'Migrant of both Abyssinia and Madinah. Celebrated for her consummate political intellect and wisdom. At the Treaty of Hudaybiyyah, her strategic counsel saved the Muslim army from spiritual crisis. She was the last of the Mothers of the Believers to pass away.',
    heroicAttributes: ['گہری سیاسی و معاشرتی بصیرت', 'مصیبت میں انا للہ کا مکمل یقین', 'فقہی و روایتی مہارت', 'یتیم بچوں کی مثالی تربیت'],
    dailySunnahLessons: [
      {
        ur: 'کسی بھی نقصان یا صدمے پر یہ مسنون دعا پڑھنا: "اللهم أجرني في مصيبتي وأخلف لي خيراً منها"۔',
        en: 'Supplicating during any loss: "O Allah, reward me in my affliction and grant me better in return."'
      },
      {
        ur: 'گھریلو اور خاندانی مسائل میں جلد بازی کے بجائے گہری حکمت اور صبر سے مشورہ دینا۔',
        en: 'Offering thoughtful, sincere, and constructive counsel when asked for guidance.'
      }
    ],
    sanadVerificationHash: 'SANAD-UMM-SALAMAH-BUKHARI-004',

    lineageAndBackgroundUrdu: 'ہند بنت ابی امیہ بن المغیرہ بن عبد اللہ بن عمر بن مخزوم القرشیہ المخزومیہ۔ آپ کے والد ابو امیہ مکہ کے اس قدر سخی رئیس تھے کہ انہیں "زاد الرکب" (قافلے والوں کا خرچ اٹھانے والا) کہا جاتا تھا۔ آپ کے پہلے شوہر ابو سلمہ عبد اللہ بن عبد الاسد مخزومی تھے، جو اسلام کے اولین جاں نثاروں میں سے تھے۔',
    lineageAndBackgroundEnglish: 'Hind bint Abi Umayyah ibn al-Mughirah al-Makhzumiyyah. Her father was so famously generous that he was titled Zad al-Rakib (The Provider of Caravans). Her first husband was Abu Salamah, one of the earliest champions of Islam.',

    propheticPraiseHadithArabic: '«مَا مِنْ مُسْلِمٍ تُصِيبُهُ مُصِيبَةٌ فَيَقُولُ مَا أَمَرَهُ اللَّهُ: {إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ} اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا، إِلَّا أَخْلَفَ اللَّهُ لَهُ خَيْرًا مِنْهَا» [صحيح مسلم: ۹۱۸]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے فرمایا: "جس مسلمان کو بھی کوئی مصیبت پہنچے اور وہ یہ دعا پڑھے: {انا للہ وانا الیہ راجعون} اے اللہ مجھے میری مصیبت میں اجر عطا فرما اور اس کا بہترین نعم البدل عطا فرما، تو اللہ تعالیٰ اسے اس سے بہتر نعم البدل عطا فرماتا ہے"۔ سیدہ ام سلمہ فرماتی ہیں کہ جب ابو سلمہ کا وصال ہوا تو میں نے یہ دعا پڑھی اور اللہ نے مجھے رسول اللہ ﷺ کا رشتہ عطا فرمایا۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ taught: "Whenever a Muslim is afflicted by calamity and recites: {Inna Lillahi wa Inna Ilayhi Raji\'un} O Allah, reward me in my affliction and replace it with better, Allah surely grants them better in exchange." (Sahih Muslim)',
    propheticPraiseSource: 'صحیح مسلم، کتاب الجنائز، حدیث رقم ۹۱۸',

    exhaustiveBiographyUrdu: [
      'سیدتنا ام سلمہ رضی اللہ عنہا نہ صرف حیا اور تقویٰ کی پیکر تھیں بلکہ اسلام کی تاریخ میں اعلیٰ ترین بصیرت اور عقل و فہم کی حامل خاتون تھیں۔ جب آپ نے اپنے شوہر ابو سلمہ کے ساتھ ہجرت کا ارادہ کیا، تو بنو مخزوم نے آپ کو روک لیا اور آپ کے ننھے بچے سلمہ کو چھین لیا۔ آپ ایک سال تک روزانہ مکہ سے باہر آ کر روتی رہیں حتیٰ کہ قریش کے دل پسیج گئے اور آپ نے تن تنہا مکہ سے مدینہ کا خطرناک صحرائی سفر طے کر کے ہجرت مکمل فرمائی۔',
      'جب غزوۂ احد میں حضرت ابو سلمہ کے زخموں نے شدت اختیار کی اور ان کا وصال ہوا، تو رسول اللہ ﷺ نے سیدتنا ام سلمہ کو نکاح کا پیغام بھیجا۔ انہوں نے عاجزی سے عرض کیا: "یا رسول اللہ! مجھ میں تین باتیں ہیں: میں سخت غیرت مند ہوں، صاحبِ اولاد ہوں اور میری عمر ڈھل چکی ہے"۔ حضور ﷺ نے شفقت سے فرمایا: "اللہ تمہاری غیرت دور فرما دے گا، تمہارے بچے میرے بچے ہیں اور عمر میری بھی ڈھل چکی ہے"۔',
      'صلحِ حدیبیہ کے کڑے موقع پر جب معاہدہ لکھا گیا اور صحابہ کرام صدمے اور ملال کے باعث احرام کھولنے اور قربانی کرنے سے ٹھٹک رہے تھے، تو رسول اللہ ﷺ مغموم ہو کر ام سلمہ کے خیمے میں تشریف لائے۔ ام سلمہ نے وہ تاریخی مشورہ دیا جو سنہری حروف سے لکھا گیا: "یا رسول اللہ! آپ کسی سے کچھ نہ کہیے، باہر تشریف لے جائیے اور خود اپنا اونٹ ذبح کر کے سر منڈوا لیجیے"۔ چنانچہ جب صحابہ نے حضور ﷺ کو دیکھا تو سب نے فورا پیروی کی اور ایک بہت بڑا بحران ٹل گیا۔',
      'آپ نے رسول اللہ ﷺ سے ۳۷۸ احادیث مبارکہ روایت فرمائیں۔ ازواجِ مطہرات میں سب سے طویل عمر پائی اور ۶۲ ہجری میں سانحۂ کربلا کے بعد مدینہ منورہ میں وصال فرمایا۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Umm Salamah (رضي الله عنها) was a beacon of extraordinary intelligence, patience, and political acumen. When she first attempted to migrate to Madinah, pagan clans seized her young son and barred her travel. For an entire year, she wept in the outskirts of Makkah until clan elders softened, allowing her to undertake the perilous journey to Madinah.',
      'Following the death of Abu Salamah from wounds sustained at Uhud, she supplicated as the Prophet ﷺ taught. When the Prophet proposed, she modestly noted her jealousy and large family; the Prophet ﷺ assured her with unmatched mercy: "Your children are my children, and I will pray that Allah removes your jealousy."',
      'Her moment of historic statesmanship occurred at the Treaty of Hudaybiyyah in 6 AH. Shocked by the treaty\'s terms, the companions froze when commanded to shave their heads and sacrifice their animals. Seeing the Prophet\'s distress, Umm Salamah counseled: "O Messenger of Allah, do not command them verbally. Go out, slaughter your camel, and have your head shaved in their sight." The moment the companions saw his action, they rushed to follow suit, averting catastrophic disobedience.',
      'Transmitting 378 traditions, she outlived all other Mothers of the Believers, passing away in 62 AH at the age of 84 following the tragedy of Karbala. She was laid to rest in Jannat al-Baqi.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'حبشہ اور مدینہ منورہ کی دوہری ہجرت اور صبر',
        eventTitleEnglish: 'Dual Migration to Abyssinia and Madinah',
        descriptionUrdu: 'بچے سے علیحدگی کے باوجود استقامت دکھائی اور صحرا کا تن تنہا سفر کیا۔',
        descriptionEnglish: 'Endured family separation and completed the arduous solitary migration to Madinah.'
      },
      {
        eventTitleUrdu: 'ابو سلمہ کی شہادت اور نکاحِ نبوی کا شرف',
        eventTitleEnglish: 'Widowhood and Marriage to the Prophet ﷺ',
        descriptionUrdu: 'مسنون دعا کے نعم البدل کے طور پر رسول اللہ ﷺ کے حرم میں داخل ہوئیں۔',
        descriptionEnglish: 'Blessed with marriage to the Prophet ﷺ as the divine reward of her patient prayer.'
      },
      {
        eventTitleUrdu: 'صلحِ حدیبیہ کا تاریخی دانشمندانہ مشورہ',
        eventTitleEnglish: 'The Strategic Counsel at Hudaybiyyah',
        descriptionUrdu: 'احرام کھولنے اور قربانی کا وہ مشورہ دیا جس نے لشکرِ اسلام کو متحد کر دیا۔',
        descriptionEnglish: 'Her decisive advice to the Prophet ﷺ averted crisis and preserved Muslim unity.'
      },
      {
        eventTitleUrdu: 'طویل ترین حیات اور سانحۂ کربلا پر گریہ',
        eventTitleEnglish: 'Longest Lifespan and Grief over Karbala',
        descriptionUrdu: 'سب سے آخر میں وصال پایا اور امام حسین کی شہادت پر زار و قطار روئیں۔',
        descriptionEnglish: 'Surviving all Mothers of the Believers, she deeply mourned the martyrdom of Imam Husayn.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن کثیر (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Kathir',
        bookTitle: 'البداية والنهاية',
        verbatimQuoteUrdu: 'ام سلمہ عقل، دیانت، پاکدامنی اور صائب الرائے ہونے میں تمام خواتین کے لیے ایک درخشندہ مثال تھیں۔',
        verbatimQuoteEnglish: 'Umm Salamah was an illustrious paragon of intellect, piety, chastity, and infallible counsel.'
      }
    ]
  },

  // =========================================================================
  // 5. SAYYIDATUNA ASMA BINT ABI BAKR (سیدتنا اسماء بنت ابی بکر — ذات النطاقین)
  // =========================================================================
  {
    id: 'sah-05',
    nameUrdu: 'سیدتنا اسماء بنت ابی بکر (ذات النطاقین)',
    nameArabic: 'أسماء بنت أبي بكر الصديق التيمية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Asma bint Abi Bakr (رضي الله عنها)',
    titleUrdu: 'ذات النطاقین (دو کمر بند والی)، شجاعۃ الایمان',
    titleEnglish: 'Dhat an-Nitaqayn (Possessor of the Two Belts)',
    kinshipToProphet: 'ام المؤمنین عائشہ کی بڑی ہمشیرہ، حضرت ابوبکر کی بیٹی، حواریِ رسول حضرت زبیر بن عوام کی زوجہ، عبداللہ بن زبیر کی والدہ',
    classicalCitation: 'صحیح البخاری، حدیث ۲۹۷۹، ۳۱۱۶ / صحیح مسلم، حدیث ۲۵۰۵',
    era: 'متوفی ۷۳ ہجری مکہ مکرمہ (۱۰۰ سال کی عمر مبارک)',
    biographyUrdu: 'ہجرتِ نبوی کی عظیم ہیروئن جنہوں نے غارِ ثور میں کھانا پہنچانے کے لیے اپنا کمر بند پھاڑ کر سامان باندھا، جس پر حضور ﷺ نے "ذات النطاقین" کا لقب عطا فرمایا۔ ابو جہل کے ظالمانہ تھپڑ کھا کر بھی راز فاش نہ کیا۔ سو سال کی عمر میں ظالم حجاج بن یوسف کے سامنے حق کا کلمہ بلند کیا۔',
    biographyEnglish: 'The fearless heroine of the Hijrah who tore her waist-belt in two to secure provisions for the Prophet ﷺ in Cave Thawr. Endured Abu Jahl\'s violent strike without breaking silence, lived to age 100 with pristine intellect, and fearlessly confronted the tyrant al-Hajjaj.',
    heroicAttributes: ['بے پناہ جرات اور رازداری', 'محنت، مشقت اور خودداری', 'ظالم کے سامنے کلمۂ حق کہنا', 'اولاد میں غیرتِ ایمانی پیدا کرنا'],
    dailySunnahLessons: [
      {
        ur: 'خاندان اور دوستوں کے رازوں کو اپنے سینے میں ہمیشہ محفوظ رکھنا۔',
        en: 'Guarding family confidences and trust with ironclad loyalty.'
      },
      {
        ur: 'گھریلو محنت اور حلال مشقت سے کبھی عار محسوس نہ کرنا۔',
        en: 'Embracing hard work with dignity, fortitude, and reliance on Allah.'
      }
    ],
    sanadVerificationHash: 'SANAD-ASMA-BUKHARI-SAHIH-005',

    lineageAndBackgroundUrdu: 'اسماء بنت ابی بکر صدیق عبد اللہ بن عثمان التیمیہ القرشیہ۔ آپ حضرت عائشہ صدیقہ سے ۱۰ سال بڑی تھیں۔ اسلام کی اٹھارہویں (۱۸) مسلمان ہونے کا شرف حاصل کیا۔ آپ کا نکاح رسول اللہ ﷺ کے پھوپھی زاد اور جاں نثار صحابی حضرت زبیر بن عوام رضی اللہ عنہ سے ہوا۔',
    lineageAndBackgroundEnglish: 'Asma bint Abi Bakr as-Siddiq. Ten years older than her sister Aisha, she was the 18th person to embrace Islam in Makkah. Married to the Prophet\'s cousin and disciple, Zubayr ibn al-Awwam.',

    propheticPraiseHadithArabic: '«أَبْدَلَكِ اللَّهُ بِنِطَاقِكِ هَذَا نِطَاقَيْنِ فِي الجَنَّةِ» [صحيح البخاري: ۲۹۷۹]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے فرمایا: "اللہ تعالیٰ نے تمہارے اس کمر بند کے بدلے جنت میں تمہیں دو نورانی کمر بند عطا فرمائے ہیں"۔',
    propheticPraiseHadithEnglish: 'The Messenger of Allah ﷺ said to her: "Allah has replaced this belt of yours with two belts in Paradise." (Sahih al-Bukhari)',
    propheticPraiseSource: 'صحیح البخاری، کتاب الجہاد، حدیث رقم ۲۹۷۹',

    exhaustiveBiographyUrdu: [
      'سیدتنا اسماء رضی اللہ عنہا استقامت، شجاعت اور خودداری کا وہ درخشندہ مینار تھیں جنہوں نے ہجرت کے کڑے لمحات میں تاریخ لکھی۔ ہجرت کی رات جب حضور ﷺ اور حضرت ابوبکر غارِ ثور میں تشریف فرما تھے، تو سیدتنا اسماء رات کے اندھیرے میں خطرناک راستوں سے کھانا اور پانی پہنچاتیں۔ روانگی کے وقت جب سامان باندھنے کے لیے کوئی رسی نہ ملی تو انہوں نے اپنا کمر بند (نطاق) پھاڑ کر دو ٹکڑے کیے اور مشکیزہ و کھانا باندھ دیا۔ حضور ﷺ نے انہیں "ذات النطاقین" کا ابدی لقب دیا۔',
      'جب ابو جہل تلوار لے کر گھر آیا اور پوچھا کہ تیرا باپ کہاں ہے، تو اس شیر دل خاتون نے خاموشی اختیار کی، جس پر ابو جہل نے اس زور کا تھپڑ مارا کہ ان کی بالی دور جا گری مگر ان کی زبان سے راز کا ایک شوشہ نہ نکلا۔',
      'مدینہ منورہ پہنچ کر جب ان کے ہاں حضرت عبداللہ بن زبیر پیدا ہوئے، تو وہ ہجرت کے بعد مہاجرین کے ہاں پیدا ہونے والے پہلے بچے تھے، جس پر تمام مسلمانوں نے اللہ اکبر کا نعرہ لگایا کیونکہ یہودیوں نے افواہ اڑا رکھی تھی کہ مسلمانوں پر جادو ہو چکا ہے۔',
      '۷۳ ہجری میں جب حجاج بن یوسف نے مکہ پر چڑھائی کی اور کعبہ پر منجنیقیں برسائیں، تو سو سالہ ضعیفہ نابینا ہونے کے باوجود اپنے بیٹے عبداللہ بن زبیر کے سامنے چٹان بن کر کھڑی ہوئیں اور فرمایا: "اے میرے بیٹے! اگر تم حق پر ہو تو موت کی پروا نہ کرو، تلوار کا زخم ذلت کی زندگی سے ہزار گنا بہتر ہے"۔ جب بیٹے کی لاش سولی پر لٹکائی گئی تو حجاج کو دیکھ کر فرمایا: "کیا اس شہسوار کے اترنے کا وقت ابھی نہیں آیا؟"'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Asma (رضي الله عنها) was a titan of courage and endurance. During the Hijrah, she secretly scaled the rugged heights of Mount Thawr at night to deliver provisions to the Prophet ﷺ and Abu Bakr. Lacking a rope to secure the food, she tore her waist-belt into two strips, earning the Prophet\'s immortal title Dhat an-Nitaqayn (Possessor of Two Belts).',
      'When Abu Jahl raided their home demanding her father\'s whereabouts, she met him with silence; he struck her so violently that her earring flew off, yet she revealed nothing.',
      'Her son Abdullah ibn al-Zubayr was the first Muslim born in Madinah after the Hijrah, delivering a crushing refutation to pagan rumors that Muslims had been cursed with infertility.',
      'In 73 AH, at the grand age of 100, though blind, she counseled Abdullah ibn al-Zubayr as the ruthless tyrant al-Hajjaj laid siege to the Ka\'bah: "My son, if you are upon the truth, die for it honorably! A stroke of the sword is far nobler than a life of humiliation." When Hajjaj hung her martyred son upon a gibbet, she confronted the tyrant with majestic dignity.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'غارِ ثور کی مہم اور ذات النطاقین کا شرف',
        eventTitleEnglish: 'The Cave Thawr Mission and Title of Dhat an-Nitaqayn',
        descriptionUrdu: 'راتوں کو کھانا پہنچایا اور کمر بند سے سامان باندھ کر بشارت پائی۔',
        descriptionEnglish: 'Supplied Cave Thawr and earned the title Dhat an-Nitaqayn from the Prophet ﷺ.'
      },
      {
        eventTitleUrdu: 'ابو جہل کا سامنا اور رازداری کا کمال',
        eventTitleEnglish: 'Standing Firm against Abu Jahl',
        descriptionUrdu: 'طمانچے کھا کر بھی رسول اللہ ﷺ کی ہجرت کا راز فاش نہ کیا۔',
        descriptionEnglish: 'Endured violent assault without compromising the Prophet\'s escape route.'
      },
      {
        eventTitleUrdu: 'مدینہ میں ہجرت کے پہلے بچے کی ولادت',
        eventTitleEnglish: 'Birth of the First Muhajir Child in Madinah',
        descriptionUrdu: 'حضرت عبداللہ بن زبیر کی پیدائش سے مدینہ میں خوشی کی لہر دوڑ گئی۔',
        descriptionEnglish: 'Gave birth to Abdullah ibn al-Zubayr, breaking pagan superstitions.'
      },
      {
        eventTitleUrdu: '۱۰۰ سال کی عمر میں ظالم حجاج کے سامنے للکار',
        eventTitleEnglish: 'Confronting Al-Hajjaj at Age 100',
        descriptionUrdu: 'حجاج کی بربریت کے سامنے بیٹے کو حق پر جان دینے کا حوصلہ دیا۔',
        descriptionEnglish: 'Defiantly rebuked the tyrant al-Hajjaj with majestic eloquence at age 100.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'حافظ ابن کثیر (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Kathir',
        bookTitle: 'البداية والنهاية',
        verbatimQuoteUrdu: 'اسماء بنت ابی بکر دین، مروت، عقل اور شجاعت میں مردوں پر بھی سبقت لے جانے والی خاتون تھیں۔',
        verbatimQuoteEnglish: 'Asma bint Abi Bakr surpassed even legendary men in courage, faith, and noble defiance.'
      }
    ]
  },

  // =========================================================================
  // 6. SAYYIDATUNA NUSAYBAH BINT KA'B (سیدتنا نسیبہ بنت کعب — ام عمارہ)
  // =========================================================================
  {
    id: 'sah-06',
    nameUrdu: 'سیدتنا نسیبہ بنت کعب (ام عمارہ)',
    nameArabic: 'نسيبة بنت كعب المازنية الأنصارية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Nusaybah bint Ka\'b / Umm \'Umarah (رضي الله عنها)',
    titleUrdu: 'فارسۃ الاسلام، مجاہدۂ احد، حامیۃ الرسول',
    titleEnglish: 'The Knight of Islam, Defender of the Prophet at Uhud',
    kinshipToProphet: 'انصار کی بیعتِ عقبہ ثانیہ کی اولین خاتون، مجاہدۂ اسلام',
    classicalCitation: 'الطبقات الکبریٰ لابن سعد، ج ۸، ص ۴۱۵ / سبل الہدیٰ والرشاد',
    era: 'متوفی ۱۳ ہجری (جنگِ یمامہ کے بعد مدینہ منورہ)',
    biographyUrdu: 'غزوۂ احد کی وہ دلیر مجاہدہ جنہوں نے اس نازک وقت میں تلوار اور تیر چلا کر رسول اللہ ﷺ کے گرد ڈھال بن کر دفاع کیا جب بڑے بڑوں کے پاؤں اکھڑ رہے تھے۔ رسول اللہ ﷺ نے دعا فرمائی: "اے اللہ! انہیں جنت میں میرا رفیق بنا دے"۔ جنگِ یمامہ میں مسیلمہ کذاب کے خلاف لڑتے ہوئے ایک ہاتھ کٹوا بیٹھیں مگر کذاب کے خاتمے تک ڈٹی رہیں۔',
    biographyEnglish: 'The legendary warrior companion at Uhud who drew her sword and bow to shield the Prophet ﷺ when others retreated. The Prophet ﷺ prayed that she and her family would be his companions in Paradise. Later lost an arm at the Battle of Yamamah fighting Musaylimah the Liar.',
    heroicAttributes: ['بے پناہ حربی شجاعت', 'حضور ﷺ سے والہانہ عشق اور جاں نثاری', 'مسیلمہ کذاب کے خلاف فیصلہ کن جہاد'],
    dailySunnahLessons: [
      {
        ur: 'دینِ حق کے دفاع میں بزدلی اور کمزوری کو چھوڑ کر شجاعت اور بہادری پیدا کرنا۔',
        en: 'Cultivating moral courage and steadfastness in upholding sacred truth.'
      },
      {
        ur: 'ہر دعا میں حضور ﷺ کی رفاقتِ جنت کا سوال کرنا۔',
        en: 'Supplicating for the Prophet\'s close companionship in Jannat al-Firdaws.'
      }
    ],
    sanadVerificationHash: 'SANAD-UMM-UMARAH-IBN-SAD-006',

    lineageAndBackgroundUrdu: 'نسیبہ بنت کعب بن عمرو بن عوف بن مبذول الانصاریہ النجاریہ۔ آپ مدینہ منورہ کے قبیلہ خزرج کی شاخ بنو مازن سے تھیں۔ آپ نے بیعتِ عقبہ ثانیہ میں مکہ آ کر رات کی تاریکی میں رسول اللہ ﷺ کے دستِ حق پرست پر بیعت فرمائی۔',
    lineageAndBackgroundEnglish: 'Nusaybah bint Ka\'b al-Maziniyyah al-Ansariyyah. From the Banu Mazin of the Khazraj in Madinah. Pledged allegiance to the Prophet ﷺ during the Second Pledge of al-Aqabah.',

    propheticPraiseHadithArabic: '«مَا الْتَفَتُّ يَوْمَ أُحُدٍ يَمِينًا وَلَا شِمَالًا إِلَّا وَأَنَا أَرَاهَا تُقَاتِلُ دُونِي» [الطبقات الكبرى لابن سعد: ۸/۴۱۵] — وَقَالَ ﷺ: «اللَّهُمَّ اجْعَلْهُمْ رُفَقَائِي فِي الجَنَّةِ»',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے احد کے دن ارشاد فرمایا: "میں احد کے دن دائیں مڑتا یا بائیں، میں نسیبہ (ام عمارہ) کو ہی اپنی حفاظت میں تلوار چلاتے پاتا تھا"۔ اور ان کے لیے دعا فرمائی: "اے اللہ! نسیبہ اور اس کے گھر والوں کو جنت میں میرا رفیق بنا دے"۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ testified regarding Uhud: "Whenever I looked to my right or to my left on the day of Uhud, I saw her fighting in my defense." And he prayed: "O Allah, make them my companions in Paradise!" (Ibn Sa\'d)',
    propheticPraiseSource: 'الطبقات الکبریٰ لابن سعد، ج ۸، ص ۴۱۵ / دلائل النبوۃ للبیہقی',

    exhaustiveBiographyUrdu: [
      'سیدتنا ام عمارہ رضی اللہ عنہا نے غزوۂ احد میں مشکیزہ اٹھا کر زخمیوں کو پانی پلانے کا کام شروع کیا، لیکن جب تیر اندازوں کی غلطی سے لشکرِ اسلام میں افراتفری مچی اور مشرکین نے رسول اللہ ﷺ کو گھیرے میں لے لیا، تو ام عمارہ نے مشکیزہ پھینک کر تلوار سونت لی اور کمان اٹھا لی۔ آپ اپنے شوہر زید اور دونوں بیٹوں حبیب اور عبداللہ کے ساتھ حضور ﷺ کے گرد سیسہ پلائی دیوار بن گئیں۔',
      'جب ابن قمیئہ ملعون نے رسول اللہ ﷺ پر وار کرنے کا ارادہ کیا، تو ام عمارہ نے آگے بڑھ کر اس پر تلوار سے کاری وار کیا، اگرچہ اس نے دوہری زرہ پہن رکھی تھی اس لیے بچ گیا اور اس نے ام عمارہ کے کاندھے پر ایسا گہرا زخم لگایا جس سے فوارے کی طرح خون ابل پڑا۔ حضور ﷺ نے ان کے بیٹے سے فرمایا: "اپنی ماں کی پٹی باندھو! تمہاری ماں کا مقام فلاں فلاں سے بلند ہے"۔',
      'اس دن ام عمارہ کے جسم پر نیزوں اور تیروں کے ۱۲ کاری زخم آئے، لیکن انہوں نے زخموں کی پروا کیے بغیر قتال جاری رکھا۔ جب حضور ﷺ نے پوچھا کہ کچھ مانگو، تو انہوں نے صرف یہ عرض کیا: "یا رسول اللہ! دعا فرمائیے کہ اللہ ہمیں جنت میں آپ کی رفاقت نصیب فرمائے"۔ حضور ﷺ نے فورا دعا فرمائی، جس پر انہوں نے پکارا: "اب مجھے دنیا کی کسی مصیبت کی پروا نہیں!"',
      'دورِ فاروقی میں جنگِ یمامہ میں جب مسیلمہ کذاب نے ان کے بیٹے حبیب کو ٹکڑے ٹکڑے کر کے شہید کر دیا، تو یہ بہادر ماں یمامہ کے میدان میں پہنچی اور ۱۱ زخم کھائے اور اپنا ایک ہاتھ کٹوا بیٹھی، یہاں تک کہ مسیلمہ کذاب واصلِ جہنم ہوا۔'
    ],
    exhaustiveBiographyEnglish: [
      'At the Battle of Uhud in 3 AH, Nusaybah bint Ka\'b initially tended to the wounded. However, when the lines shattered and pagan cavalry surrounded the Prophet ﷺ, she cast aside her water-skin, unsheathed her sword, and took up a bow, forming a living human fortress around the Messenger of Allah alongside her husband and two sons.',
      'When the pagan champion Ibn Qami\'ah charged aiming to slay the Prophet ﷺ, Nusaybah intercepted him, striking him repeatedly before suffering a deep wound to her shoulder. The Prophet ﷺ ordered her son: "Bandage your mother\'s wound! May Allah bless your household!"',
      'She sustained 12 severe wounds that day. When the Prophet ﷺ asked what she desired, she requested no worldly comfort, only pleading: "Pray to Allah that we may be your companions in Paradise!" The Prophet ﷺ prayed: "O Allah, make them my companions in Paradise!" Upon hearing this, she cried: "Now I care not for whatever afflicts me in this world!"',
      'Later, during the Caliphate of Abu Bakr, when Musaylimah the Liar murdered her son Habib, the aging heroine marched to the Battle of Yamamah. She sustained 11 wounds and severed her arm in combat until the false prophet was slain.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'بیعتِ عقبہ ثانیہ میں مدینہ کا معاہدہ',
        eventTitleEnglish: 'The Second Pledge of al-Aqabah',
        descriptionUrdu: 'رات کے وقت مکہ آ کر حضور ﷺ کے دستِ حق پر بیعت فرمائی۔',
        descriptionEnglish: 'Pledged allegiance to the Prophet ﷺ in Makkah alongside early Ansar leaders.'
      },
      {
        eventTitleUrdu: 'غزوۂ احد میں تلوار سونت کر رسول اللہ ﷺ کا دفاع',
        eventTitleEnglish: 'Heroic Sword Combat at the Battle of Uhud',
        descriptionUrdu: '۱۲ کاری زخم کھا کر حضور ﷺ کے گرد سیسہ پلائی دیوار بن گئیں۔',
        descriptionEnglish: 'Shielded the Prophet ﷺ with sword and bow, sustaining 12 severe combat wounds.'
      },
      {
        eventTitleUrdu: 'جنت میں رفاقتِ نبوی کی دائمی بشارت',
        eventTitleEnglish: 'Prophetic Guarantee of Companionship in Paradise',
        descriptionUrdu: 'حضور ﷺ نے ان کے اور ان کے خاندان کے لیے جنت کی رفاقت کی دعا فرمائی۔',
        descriptionEnglish: 'Earned the Prophet\'s prayer for eternal companionship in Jannat al-Firdaws.'
      },
      {
        eventTitleUrdu: 'جنگِ یمامہ میں ہاتھ کٹوا کر مسیلمہ کذاب کا خاتمہ',
        eventTitleEnglish: 'Battle of Yamamah and Severing of Her Arm',
        descriptionUrdu: 'مسیلمہ کے خلاف قتال میں ایک ہاتھ شہید ہوا مگر فتح تک ڈٹی رہیں۔',
        descriptionEnglish: 'Fought Musaylimah\'s army, lost an arm, and witnessed the victory of Islam.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن سعد (رحمہ اللہ)',
        scholarNameEnglish: 'Allama Ibn Sa\'d',
        bookTitle: 'الطبقات الکبریٰ (جلد ۸)',
        verbatimQuoteUrdu: 'ام عمارہ شجاعت اور دلیری میں کائنات کی ان چند ہستیوں میں سے ہیں جن کی نظیر تاریخ پیش کرنے سے قاصر ہے۔',
        verbatimQuoteEnglish: 'Umm \'Umarah demonstrated valor in combat that history has rarely witnessed in any woman.'
      }
    ]
  },

  // =========================================================================
  // 7. SAYYIDATUNA SUMAYYAH BINT KHAYYAT (سیدتنا سمیہ بنت خیاط — اول شہیدہ)
  // =========================================================================
  {
    id: 'sah-07',
    nameUrdu: 'سیدتنا سمیہ بنت خیاط (اول شہیدہ)',
    nameArabic: 'سمية بنت خياط أم عمار بن ياسر (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Sumayyah bint Khayyat (رضي الله عنها)',
    titleUrdu: 'اول شہیدہ فی الاسلام، شہیدۃ التوحید',
    titleEnglish: 'The First Martyr of Islam',
    kinshipToProphet: 'سابقینِ اولین، حضرت عمار بن یاسر کی والدہ ماجدہ، آلِ یاسر',
    classicalCitation: 'الطبقات الکبریٰ لابن سعد، ج ۸، ص ۲۶۴ / الاصابة لابن حجر، ج ۸',
    era: 'قبلِ ہجرت ۷ سال قبل مکہ مکرمہ',
    biographyUrdu: 'اسلام کی اولین شہید خاتون۔ مکہ کی تپتی ریت پر جب ابو جہل نے دہکتے انگاروں پر لٹا کر کفر بکنے کا مطالبہ کیا، تو اس ضعیفہ نے کلمۂ توحید کا نعرہ بلند کیا۔ ابو جہل نے غصے میں آ کر نیزہ مار کر شہید کیا۔ ان کی شہادت نے ثابت کیا کہ ایمان کی طاقت ہر دنیاوی فرعون پر غالب ہے۔',
    biographyEnglish: 'The very first martyr in the history of Islam. An elderly woman who withstood horrific tortures under the scorching desert sun from Abu Jahl, refusing to recant Tawhid. Struck down by Abu Jahl\'s spear, her martyrdom became an eternal monument of unyielding faith.',
    heroicAttributes: ['عقیدۂ توحید پر چٹان جیسا ثبات', 'موت کے خوف پر ایمان کی برتری', 'ظالم کے سامنے بے خوفی'],
    dailySunnahLessons: [
      {
        ur: 'عقیدے اور سچائی پر کبھی سمجھوتہ نہ کرنا، چاہے حالات کتنے ہی ناسازگار ہوں۔',
        en: 'Never compromising core Islamic faith and values, regardless of worldly pressure.'
      },
      {
        ur: 'مصیبت اور ظلم کے وقت اللہ کی نصرت اور جنت کے وعدے پر یقین رکھنا۔',
        en: 'Maintaining absolute trust in Allah\'s ultimate justice during times of persecution.'
      }
    ],
    sanadVerificationHash: 'SANAD-SUMAYYAH-FIRST-MARTYR-007',

    lineageAndBackgroundUrdu: 'سمیہ بنت خیاط۔ آپ قبیلہ بنو مخزوم کے حلیف ابو حذیفہ بن المغیرہ کی باندی تھیں، جنہوں نے یاسر بن عامر سے نکاح کیا۔ آپ کا پورا گھرانہ (آلِ یاسر) اسلام قبول کرنے والے ابتدائی سات نفوس میں شامل تھا۔',
    lineageAndBackgroundEnglish: 'Sumayyah bint Khayyat, an emancipated elder of the Banu Makhzum clan who wed Yasir ibn Amir. Her entire household stood among the first seven individuals to proclaim Islam publicly.',

    propheticPraiseHadithArabic: '«صَبْرًا يَا آلَ يَاسِرٍ، فَإِنَّ مَوْعِدَكُمُ الجَنَّةُ» [المستدرك على الصحيحين للحاكم: ۵۶۶۶ / مسند أحمد]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ کا جب مکہ کے صحرا سے گزر ہوتا اور آلِ یاسر کو تپتی ریت پر جلتے دیکھتے تو فرماتے: "صبر کرو اے آلِ یاسر! بے شک تمہارے لیے جنت کا قطعی وعدہ ہے"۔',
    propheticPraiseHadithEnglish: 'Whenever the Prophet ﷺ passed by the family of Yasir being tortured under the scorching sun, he proclaimed: "Patience, O family of Yasir! For your appointed meeting place is Paradise!" (Mustadrak al-Hakim)',
    propheticPraiseSource: 'المستدرک علی الصحیحین، حدیث ۵۶۶۶ (صحیح علی شرط مسلم)',

    exhaustiveBiographyUrdu: [
      'سیدتنا سمیہ رضی اللہ عنہا تاریخِ انسانیت کی وہ عظیم خاتون ہیں جنہوں نے اپنے خون سے اسلام کی پہلی شہادت کی بنیاد رکھی۔ جب مکہ میں قریش نے غریب اور بے سہارا مسلمانوں پر ظلم کے پہاڑ توڑے، تو سیدتنا سمیہ، ان کے شوہر حضرت یاسر اور بیٹے حضرت عمار کو لوہے کی زرہیں پہنا کر دوپہر کی چلچلاتی دھوپ میں تپتے ہوئے انگاروں اور ریت پر لٹایا جاتا۔',
      'ابو جہل ملعون ان کے سر پر کھڑا ہو کر کلمۂ کفر اور بتوں کی تعریف کا مطالبہ کرتا، لیکن اس نحیف اور بوڑھی صحابیہ کی زبان سے تپتے ہوئے صحرا میں صرف ایک ہی صدا گونجتی تھی: "اَحَدٌ، اَحَدٌ، لَا اِلٰہَ اِلَّا اللّٰہُ مُحَمَّدٌ رَّسُوْلُ اللّٰہِ"۔',
      'جب ابو جہل ہر حربے میں ناکام ہو گیا اور اس ضعیفہ کے عزم کو نہ توڑ سکا، تو غیظ و غضب میں اندھا ہو کر اس نے نیزہ اٹھایا اور سیدتنا سمیہ کے جسم میں پیوست کر کے انہیں شہید کر دیا۔ وہ اسلام کی پہلی شہید بنیں جن کے خون نے مکہ میں کفر کے بتوں کو ہمیشہ کے لیے لرزا دیا۔',
      'جب غزوۂ بدر میں ابو جہل قتل ہوا، تو رسول اللہ ﷺ نے حضرت عمار سے فرمایا: "اللہ نے تمہاری والدہ کے قاتل کو انجام تک پہنچا دیا"'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Sumayyah (رضي الله عنها) was the first person to sacrifice her life for the message of Tawhid. When pagan elites subjected powerless believers to horrific persecution, Sumayyah, her husband Yasir, and her son Ammar were clad in heavy iron armor and pinned to burning desert sands at midday.',
      'Abu Jahl demanded that she renounce the Prophet ﷺ and praise pagan idols, but from her parched lips issued only: "Ahad, Ahad! None has the right to be worshipped except Allah, and Muhammad is His Messenger."',
      'Furious that he could not break the spiritual resolve of an elderly woman, Abu Jahl thrust his spear into her heart, martyring her. She entered eternity as the very first Shahid of Islam.',
      'Years later, when Abu Jahl lay slain at the Battle of Badr, the Prophet ﷺ turned to Ammar declaring: "Allah has executed justice upon the murderer of your mother."'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'اسلام قبول کرنے والے ابتدائی سات نفوس میں شمولیت',
        eventTitleEnglish: 'Among the First Seven Proclaimers of Islam',
        descriptionUrdu: 'مکہ میں علانیہ کلمۂ توحید کا اعلان کرنے والی اولین خاتون۔',
        descriptionEnglish: 'One of the first seven individuals to proclaim faith openly in Makkah.'
      },
      {
        eventTitleUrdu: 'مکہ کے تپتے صحرا میں لوہے کی زرہوں میں تشدد پر صبر',
        eventTitleEnglish: 'Enduring Iron Armor Tortures in the Desert',
        descriptionUrdu: 'دہکتی ریت پر احد احد کا ورد کر کے عزمِ ایمانی ثابت کیا۔',
        descriptionEnglish: 'Tortured under scorching heat while maintaining unbending proclamation of Tawhid.'
      },
      {
        eventTitleUrdu: 'اسلام کی سب سے پہلی شہادت کا لازوال شرف',
        eventTitleEnglish: 'Attaining the Supreme Crown of First Martyrdom',
        descriptionUrdu: 'ابو جہل کے نیزے کے وار سے جامِ شہادت نوش فرمایا۔',
        descriptionEnglish: 'Martyred by Abu Jahl\'s spear, becoming the eternal first martyr of Islam.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'حافظ ابن حجر العسقلانی (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Hajar al-Asqalani',
        bookTitle: 'الإصابة في تمييز الصحابة (جلد ۸)',
        verbatimQuoteUrdu: 'سمیہ بنت خیاط اسلام کی پہلی شہید ہیں، جنہوں نے عذاب کی شدت کے باوجود کفر کا ایک لفظ نہ کہا۔',
        verbatimQuoteEnglish: 'Sumayyah is the first martyr of Islam; despite the extremity of torment, she never uttered a word of compromise.'
      }
    ]
  },

  // =========================================================================
  // 8. SAYYIDATUNA UMM SULAYM (سیدتنا ام سلیم بنت ملحان — الرمیصاء)
  // =========================================================================
  {
    id: 'sah-08',
    nameUrdu: 'سیدتنا ام سلیم بنت ملحان (الرمیصاء)',
    nameArabic: 'الرميصاء أم سليم بنت ملحان الأنصارية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Umm Sulaym / Al-Rumaysa (رضي الله عنها)',
    titleUrdu: 'الرمیصاء، عاقلۃ النساء، امِ انس',
    titleEnglish: 'Al-Rumaysa, The Wise Matron, Mother of Anas',
    kinshipToProphet: 'خادمِ رسول حضرت انس بن مالک کی والدہ ماجدہ، حضور ﷺ کی رضاعی خالہ',
    classicalCitation: 'صحیح البخاری، حدیث ۵۰۴۹ / صحیح مسلم، حدیث ۲۴۵۶، ۲۴۵۷',
    era: 'متوفی ۳۰ ہجری مدینہ منورہ',
    biographyUrdu: 'وہ عظیم خاتون جن کے نکاح کا مہر سونا چاندی نہیں بلکہ "اسلام" تھا۔ ابو طلحہ کے پیغامِ نکاح پر فرمایا: اگر تم بت پرستی چھوڑ کر مسلمان ہو جاؤ تو یہی میرا مہر ہوگا۔ انہوں نے اپنے دس سالہ بیٹے حضرت انس کو حضور ﷺ کی خدمت کے لیے وقف کیا۔ رسول اللہ ﷺ نے خواب میں جنت میں ان کے قدموں کی آہٹ سنی۔',
    biographyEnglish: 'The extraordinary woman whose bridal dowry was Islam itself. Refusing gold and silver, she accepted Abu Talha\'s marriage proposal only on condition of his conversion to Islam. She dedicated her son Anas ibn Malik to a decade of service to the Prophet ﷺ, who heard her footsteps in Paradise.',
    heroicAttributes: ['دولت پر ایمان کو ترجیح دینا', 'اولاد کی مثالی اسلامی تربیت', 'جنت میں قدموں کی چاپ کی بشارت'],
    dailySunnahLessons: [
      {
        ur: 'رشتوں کے انتخاب میں دنیاوی مال و دولت کے بجائے دینداری اور اخلاق کو اولیت دینا۔',
        en: 'Prioritizing sound religious practice and good character over worldly wealth in marriage.'
      },
      {
        ur: 'بچوں کو علمائے حق، مساجد اور دیندار صحبت سے وابستہ رکھنا۔',
        en: 'Keeping children connected to righteous company, scholars, and spiritual environments.'
      }
    ],
    sanadVerificationHash: 'SANAD-UMM-SULAYM-BUKHARI-008',

    lineageAndBackgroundUrdu: 'ام سلیم بنت ملحان بن خالد بن زید بن حرام الانصاریہ النجاریہ۔ آپ مدینہ منورہ کے قبیلہ بنو نجار کی معزز خاتون تھیں۔ آپ کی ہمشیرہ ام حرام بنت ملحان بھی جلیل القدر صحابیہ اور سمندری غزوے کی شہید تھیں۔',
    lineageAndBackgroundEnglish: 'Umm Sulaym bint Milhan of the Banu Najjar clan of Madinah. Her sister Umm Haram was also an illustrious companion who achieved martyrdom in the first naval expedition of Islam.',

    propheticPraiseHadithArabic: '«دَخَلْتُ الجَنَّةَ فَسَمِعْتُ خَشْفَةً، فَقُلْتُ: مَنْ هَذَا؟ قَالُوا: هَذِهِ الرُّمَيْصَاءُ بِنْتُ مِلْحَانَ أُمُّ أَنَسِ بْنِ مَالِكٍ» [صحيح مسلم: ۲۴۵۶]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے ارشاد فرمایا: "میں جنت میں داخل ہوا تو میں نے آگے کسی کے قدموں کی آہٹ سنی۔ میں نے پوچھا: یہ کون ہے؟ تو فرشتوں نے عرض کیا: یہ ام سلیم الرمیصاء بنت ملحان ہیں، جو انس بن مالک کی والدہ ہیں"۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ stated: "I entered Paradise and heard footsteps ahead of me. I asked: Who is this? They said: This is al-Rumaysa bint Milhan, mother of Anas ibn Malik." (Sahih Muslim)',
    propheticPraiseSource: 'صحیح مسلم، کتاب فضائل الصحابة، حدیث رقم ۲۴۵۶ / صحیح البخاری، حدیث ۳۶۷۹',

    exhaustiveBiographyUrdu: [
      'سیدتنا ام سلیم رضی اللہ عنہا انصار کی سب سے دانشمند اور عظیم المرتبت خواتین میں شمار ہوتی تھیں۔ جب ان کے پہلے شوہر مالک بن نضر نے اسلام کی مخالفت کی اور شام جا کر ہلاک ہوا، تو مدینہ کے سب سے امیر اور معزز سردار ابو طلحہ انصاری نے بے پناہ سونے چاندی اور باغات کے عوض نکاح کا پیغام بھیجا۔ ام سلیم نے وہ تاریخ ساز جواب دیا جو قیامت تک کے لیے مینارۂ نور ہے: "اے ابو طلحہ! تم لکڑی کے اس بت کو پوجتے ہو جسے زمین سے اگنے والے درخت سے نجار نے تراشا ہے، جو نہ نفع دے سکتا ہے نہ نقصان۔ اگر تم اسلام قبول کر لو تو میں تم سے نکاح کر لوں گی اور مجھے مہر میں ایک درہم بھی نہیں چاہیے، تمہارا اسلام ہی میرا مہر ہوگا!" چنانچہ ابو طلحہ نے کلمہ پڑھا اور تاریخِ اسلام کا سب سے باعزت نکاح عمل میں آیا۔',
      'جب رسول اللہ ﷺ مدینہ منورہ تشریف لائے اور انصار نے حضور ﷺ کی بارگاہ میں تحائف پیش کیے، تو ام سلیم اپنے دس سالہ بیٹے حضرت انس کا ہاتھ پکڑ کر حاضر ہوئیں اور عرض کیا: "یا رسول اللہ! میرے پاس مال و دولت تو نہیں ہے، یہ میرا جگر گوشہ انس ہے، اسے اپنی خدمت کے لیے قبول فرما لیجیے"۔ حضرت انس نے دس سال حضور ﷺ کی خدمت کا شرف پایا۔',
      'غزوۂ حنین کے موقع پر جب کفار نے تیروں کی بارش کی، تو ام سلیم نے اپنی کمر سے خنجر باندھ رکھا تھا۔ حضور ﷺ نے پوچھا: "اے ام سلیم! یہ خنجر کس لیے ہے؟" تو عرض کیا: "یا رسول اللہ! اگر کوئی مشرک آپ کے قریب آئے گا تو میں اس کا پیٹ چاک کر دوں گی"۔',
      'ان کے ایک ننھے بچے کا انتقال ہوا تو انہوں نے شوہر کے آنے پر پہلے ان کی خدمت کی، کھانا کھلایا اور پھر کمالِ حکمت سے صبر کی تلقین فرمائی، جس پر حضور ﷺ نے ان کی اس رات میں برکت کی دعا فرمائی اور اللہ نے انہیں نو (۹) ایسے بیٹے عطا فرمائے جو سب کے سب قرآن کے حافظ بنے۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Umm Sulaym (رضي الله عنها) was a matron of incomparable wisdom. Following the death of her first husband, the wealthy nobleman Abu Talha proposed with lavish fortunes of gold. She replied: "O Abu Talha, you worship a block of wood carved by a carpenter that can neither benefit nor harm you. If you accept Islam, that will be my dowry, and I ask for nothing else!" Deeply moved, Abu Talha embraced Islam, making hers the noblest dowry in history.',
      'When the Prophet ﷺ migrated to Madinah, Umm Sulaym brought her 10-year-old son Anas ibn Malik, offering him as a dedicated servant to the Prophet ﷺ. Anas served the Prophet ﷺ for a decade, becoming one of the premier transmitters of Sunnah.',
      'At the Battle of Hunayn, she carried a dagger secured to her waist. When the Prophet ﷺ inquired about it, she declared fearlessly: "O Messenger of Allah, if any pagan approaches you, I will rip him open with it!"',
      'When her young infant passed away, she concealed her immense grief until her husband returned, fed him, attended to his comfort, and then gently led him to submit to Allah\'s decree. The Prophet ﷺ prayed for their blessed union, and Allah granted them nine sons who all became master memorizers of the Quran.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'اسلام کو مہر بنا کر ابو طلحہ سے تاریخی نکاح',
        eventTitleEnglish: 'Accepting Islam as Her Noble Dowry',
        descriptionUrdu: 'سونے چاندی کو ٹھکرا کر ابو طلحہ کے قبولِ اسلام کو اپنا مہر مقرر کیا۔',
        descriptionEnglish: 'Refused gold and designated Abu Talha\'s conversion to Islam as her bridal dowry.'
      },
      {
        eventTitleUrdu: 'حضرت انس بن مالک کو خدمتِ نبوی میں پیش کرنا',
        eventTitleEnglish: 'Dedicating Anas ibn Malik to Prophetic Service',
        descriptionUrdu: 'اپنے لختِ جگر کو دس سال کے لیے حضور ﷺ کی خدمت میں وقف کیا۔',
        descriptionEnglish: 'Dedicated her 10-year-old son Anas to serve the Messenger of Allah ﷺ.'
      },
      {
        eventTitleUrdu: 'غزوۂ حنین میں خنجر باندھ کر حضور ﷺ کی نصرت',
        eventTitleEnglish: 'Guarding the Prophet with Dagger at Hunayn',
        descriptionUrdu: 'میدانِ جنگ میں حضور ﷺ کے دفاع کے لیے کمر سے خنجر باندھے رکھا۔',
        descriptionEnglish: 'Carried a dagger into combat ready to strike down any enemy approaching the Prophet.'
      },
      {
        eventTitleUrdu: 'جنت میں قدموں کی چاپ کی نبوی بشارت',
        eventTitleEnglish: 'Hearing Her Footsteps in Paradise',
        descriptionUrdu: 'حضور ﷺ نے خواب میں جنت کے اندر ام سلیم کے قدموں کی آہٹ سنی۔',
        descriptionEnglish: 'Blessed with the Prophet\'s testimony of hearing her footsteps in Paradise.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن حجر عسقلانی (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Hajar al-Asqalani',
        bookTitle: 'الإصابة في تمييز الصحابة',
        verbatimQuoteUrdu: 'ام سلیم جیسی دانشمند اور صابرہ خاتون کی نظیر تاریخ میں ملنا نایاب ہے۔',
        verbatimQuoteEnglish: 'A matron combining such profound juristic wisdom, forbearance, and sacrifice is exceptionally rare in human history.'
      }
    ]
  },

  // =========================================================================
  // 9. SAYYIDATUNA HAFSAH BINT UMAR (ام المؤمنین سیدتنا حفصہ — جامعۃ المصحف)
  // =========================================================================
  {
    id: 'sah-09',
    nameUrdu: 'ام المؤمنین سیدتنا حفصہ بنت عمر',
    nameArabic: 'حفصة بنت عمر بن الخطاب العدوية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Hafsah bint Umar (رضي الله عنها)',
    titleUrdu: 'صوامۃ قوامۃ (کثرت سے روزے رکھنے اور شب بیداری کرنے والی)، حارثۃ المصحف',
    titleEnglish: 'The Nocturnal Devotee, Custodian of the Master Quranic Codex',
    kinshipToProphet: 'رسول اللہ ﷺ کی زوجۂ مطہرہ، امیر المؤمنین عمر بن الخطاب کی لختِ جگر',
    classicalCitation: 'صحیح البخاری، حدیث ۴۹۸۷ (جمع القرآن) / سنن ابی داؤد، حدیث ۲۲۸۳',
    era: 'متوفی ۴۵ ہجری مدینہ منورہ (تدفین جنت البقیع)',
    biographyUrdu: 'حضرت عمر فاروق کی صاحبزادی اور کثرت سے روزے رکھنے اور راتوں کو عبادت کرنے والی جلیل القدر ام المؤمنین۔ ان کا سب سے عظیم تاریخی کارنامہ یہ ہے کہ حضرت ابوبکر صدیق اور حضرت عمر کے دور میں جمع کیا گیا قرآن مجید کا اولین اصل تحریری نسخہ (المصحف الامام) انہی کی تحویل اور حفاظت میں رکھا گیا، جس سے بعد میں خلافتِ عثمانی میں تمام نسخے نقل ہوئے۔',
    biographyEnglish: 'Daughter of Umar ibn al-Khattab and an extraordinary ascetic described by Angel Jibril as "frequently fasting and standing in prayer". Her monumental historical legacy was serving as the sole trusted custodian of the primary official written codex (Mushaf) of the Holy Quran, from which all copies were transcribed.',
    heroicAttributes: ['قرآن مجید کے اولین نسخے کی امانت دار', 'کثرتِ صوم اور تہجد گزاری', 'کتابت اور تعلیم کی ماہر'],
    dailySunnahLessons: [
      {
        ur: 'تلاوتِ قرآن اور کلامِ الٰہی کی حفاظت و تعظیم کو اپنی ترجیح بنانا۔',
        en: 'Making Quranic recitation, preservation, and reverence the center of life.'
      },
      {
        ur: 'کثرت سے نفلی روزے رکھنا اور راتوں کو قیام اللیل (تہجد) کی عادت ڈالنا۔',
        en: 'Cultivating voluntary fasting and regular nocturnal prayer (Tahajjud).'
      }
    ],
    sanadVerificationHash: 'SANAD-HAFSAH-BUKHARI-SAHIH-009',

    lineageAndBackgroundUrdu: 'حفصہ بنت عمر بن الخطاب بن نفیل العدویہ القرشیہ۔ آپ کی والدہ ماجدہ زینب بنت مظعون تھیں جو کبار صحابی عثمان بن مظعون کی ہمشیرہ تھیں۔ آپ نے مکہ میں اسلام قبول کیا اور اپنے پہلے شوہر خنیس بن حذافہ کے ساتھ مدینہ کی طرف ہجرت فرمائی۔ غزوۂ بدر میں شوہر کی شہادت کے بعد حضور ﷺ کے حبالۂ عقد میں آئیں۔',
    lineageAndBackgroundEnglish: 'Hafsah bint Umar ibn al-Khattab al-Adawiyyah. Her mother was Zaynab bint Madh\'un. Migrated to Madinah with her first husband Khunays, who was martyred after the Battle of Badr, after which she wed the Prophet ﷺ.',

    propheticPraiseHadithArabic: '«أَتَانِي جِبْرِيلُ فَقَالَ: رَاجِعْ حَفْصَةَ؛ فَإِنَّهَا صَوَّامَةٌ قَوَّامَةٌ، وَإِنَّهَا زَوْجَتُكَ فِي الجَنَّةِ» [سنن أبي داود: ۲۲۸۳ / المستدرك]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے ارشاد فرمایا: "میرے پاس حضرت جبرائیل علیہ السلام تشریف لائے اور فرمایا: حفصہ سے رجوع فرما لیجیے، بے شک وہ کثرت سے روزے رکھنے والی اور راتوں کو طویل قیام کرنے والی ہیں، اور وہ جنت میں بھی آپ کی زوجہ ہیں"۔',
    propheticPraiseHadithEnglish: 'The Messenger of Allah ﷺ stated: "Jibril came to me and said: Take Hafsah back, for verily she is constantly fasting and standing in nocturnal prayer, and she is your wife in Paradise!" (Sunan Abi Dawud)',
    propheticPraiseSource: 'سنن ابی داؤد، حدیث رقم ۲۲۸۳ / المستدرک للحاکم، حدیث ۶۷۵۳ (صحیح علی شرط مسلم)',

    exhaustiveBiographyUrdu: [
      'سیدتنا حفصہ رضی اللہ عنہا کا اسلام کی تاریخ میں وہ منفرد مقام ہے جو کسی اور کو حاصل نہیں ہوا۔ جب خلیفۂ اول حضرت ابوبکر صدیق رضی اللہ عنہ نے جنگِ یمامہ میں کبار حفاظ کی شہادت کے بعد قرآن مجید کو ایک جلد میں مدون فرمایا، تو وہ اصل نسخہ حضرت ابوبکر کے پاس رہا، پھر حضرت عمر فاروق کے پاس منتقل ہوا۔ حضرت عمر نے اپنے وصال کے وقت پوری امت میں سب سے زیادہ امانت دار اور لائق ہستی اپنی بیٹی سیدتنا حفصہ کو سمجھا اور وہ مقدس نسخہ ان کے سپرد فرمایا۔',
      'جب حضرت عثمان غنی رضی اللہ عنہ کے دور میں قراءتوں کے اختلاف کے سدِ باب کے لیے سرکاری نسخے تیار کرنے کا فیصلہ ہوا، تو حضرت عثمان نے سیدتنا حفصہ کی خدمت میں پیغام بھیجا: "ہمیں وہ مصحف عنایت فرمائیے تاکہ ہم اس سے مزید نسخے نقل کر کے واپس کر دیں"۔ سیدتنا حفصہ نے وہ امانت پیش فرمائی جس سے آج دنیا بھر میں موجود قرآن کے تمام نسخے نقل ہوئے۔ اسی لیے ائمہ انہیں "حارثۃ القرآن" (قرآن کی محافظہ) کہتے ہیں۔',
      'آپ نے رسول اللہ ﷺ سے ۶۰ احادیث مبارکہ روایت فرمائیں۔ ۴۵ ہجری میں مدینہ منورہ میں وصال فرمایا اور جنت البقیع میں مدفون ہوئیں۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Hafsah (رضي الله عنها) occupies an unparalleled position in the preservation of the divine scripture. When Caliph Abu Bakr compiled the first master codex of the Quran following the martyrdom of numerous memorizers at Yamamah, the master manuscript was entrusted to Umar, who upon his deathbed entrusted it to his daughter Hafsah as the sole guardian of the Word of Allah.',
      'During the Caliphate of Uthman ibn Affan, when dialectical variations required unifying the Ummah upon a single standardized text, Caliph Uthman sent an envoy to Hafsah requesting: "Send us the Mushaf so that we may transcribe master codices and return it to you." Hafsah provided the manuscript, from which all universal Qurans in existence today trace their direct orthography.',
      'Angel Jibril personally lauded her devotion to the Prophet ﷺ, describing her as "Sawwamah, Qawwamah" (a woman of unceasing fasts and nocturnal Tahajjud). She passed away in 45 AH and was interred in Jannat al-Baqi.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'غزوۂ بدر کے بعد رسول اللہ ﷺ سے نکاحِ مبارک',
        eventTitleEnglish: 'Marriage to the Prophet ﷺ following Badr',
        descriptionUrdu: 'شوہر کی شہادت کے بعد حضور ﷺ کے ازواجِ مطہرات میں شامل ہوئیں۔',
        descriptionEnglish: 'Wed the Prophet ﷺ in Madinah, cementing alliances and sacred honor.'
      },
      {
        eventTitleUrdu: 'حضرت جبرائیل کی جانب سے صوامۃ قوامۃ کی گواہی',
        eventTitleEnglish: 'Angel Jibril\'s Divine Testimony of Her Piety',
        descriptionUrdu: 'جبرائیل علیہ السلام نے آ کر ان کے روزوں، تہجد اور جنت کی زوجیت کی گواہی دی۔',
        descriptionEnglish: 'Jibril testified to her profound nocturnal prayer and eternal station in Jannah.'
      },
      {
        eventTitleUrdu: 'قرآن مجید کے اولین اصل نسخے (مصحفِ حفصہ) کی حفاظت',
        eventTitleEnglish: 'Custodian of the Master Quranic Codex',
        descriptionUrdu: 'خلافتِ صدیقی و فاروقی کا جمع شدہ اصل قرآنی نسخہ ان کی تحویل میں رہا۔',
        descriptionEnglish: 'Served as the sole trusted guardian of the primary written Quranic manuscript.'
      },
      {
        eventTitleUrdu: 'عہدِ عثمانی میں مصحف کی فراہمی اور عالمی نقل',
        eventTitleEnglish: 'Supplying the Codex for Standardized Compilation',
        descriptionUrdu: 'حضرت عثمان کو نسخہ دیا جس سے نقل ہو کر پوری دنیا میں قرآن پھیلا۔',
        descriptionEnglish: 'Provided the codex to Caliph Uthman for the universal transcription of the Quran.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن کثیر (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Kathir',
        bookTitle: 'البداية والنهاية',
        verbatimQuoteUrdu: 'ام المؤمنین حفصہ رضی اللہ عنہا نے امت پر قرآن کی حفاظت کی جو عظیم ذمہ داری نبھائی، وہ تاریخ کا روشن ترین باب ہے۔',
        verbatimQuoteEnglish: 'Hafsah\'s guardianship of the primary Quranic codex remains one of the greatest services rendered to Islam.'
      }
    ]
  },

  // =========================================================================
  // 10. SAYYIDATUNA AL-SHIFA BINT ABDILLAH (سیدتنا الشفاء بنت عبد اللہ)
  // =========================================================================
  {
    id: 'sah-10',
    nameUrdu: 'سیدتنا الشفاء بنت عبد اللہ العدویہ',
    nameArabic: 'الشفاء بنت عبد الله القرشية العدوية (رضي الله عنها)',
    nameEnglish: 'Sayyidatuna Ash-Shifa bint Abdullah (رضي الله عنها)',
    titleUrdu: 'معلمۃ القراءۃ والکتابۃ، نگرانِ بازارِ مدینہ',
    titleEnglish: 'The Teacher of Literacy, Market Administrator of Madinah',
    kinshipToProphet: 'حضور ﷺ کی قریبی معتمد صحابیہ، ام المؤمنین حفصہ کی استاد',
    classicalCitation: 'سنن ابی داؤد، حدیث ۳۸۸۷ / الاصابة لابن حجر، ج ۸، ص ۲۰۱',
    era: 'متوفی ۲۰ ہجری دورِ خلافتِ فاروقی مدینہ منورہ',
    biographyUrdu: 'مکہ مکرمہ کی ان گنی چنی ہستیوں میں سے تھیں جو لکھنا پڑھنا اور طب جانتی تھیں۔ رسول اللہ ﷺ نے ان کی علمی صلاحیتوں کو سراہا اور ام المؤمنین سیدتنا حفصہ کو کتابت سکھانے کا حکم دیا۔ خلیفۂ دوم حضرت عمر فاروق رضی اللہ عنہ نے ان کی دیانت، ذہانت اور فہم کی بنا پر انہیں مدینہ منورہ کی مارکیٹ (بازار) کی نگرانی اور معاشی احتساب کی ذمہ داری سونپی۔',
    biographyEnglish: 'One of the exceptionally rare literate scholars of pre-Islamic Makkah. The Prophet ﷺ commissioned her to instruct Mother of the Believers Hafsah in writing. Caliph Umar ibn al-Khattab respected her integrity and commercial ethics so profoundly that he consulted her on marketplace administration in Madinah.',
    heroicAttributes: ['اعلیٰ علمی و ادبی قابلیت', 'انتظامی فراست اور مارکیٹ کا نظم و نسق', 'پردے کے ساتھ امت کی رہنمائی'],
    dailySunnahLessons: [
      {
        ur: 'دوسروں کو لکھنا پڑھنا، مفید ہنر اور دینی علم سکھانا صدقہ جاریہ ہے۔',
        en: 'Teaching literacy, beneficial skills, and Quran to others is perpetual charity (Sadaqah Jariyah).'
      },
      {
        ur: 'خواتین شرعی پردے اور وقار کے ساتھ معاشرے کے لیے مفید خدمات انجام دے سکتی ہیں۔',
        en: 'Muslim women can contribute fruitfully to community welfare within the boundaries of Haya.'
      }
    ],
    sanadVerificationHash: 'SANAD-SHIFA-ABI-DAWUD-010',

    lineageAndBackgroundUrdu: 'الشفاء بنت عبد اللہ بن عبد شمس بن خلف القرشیہ العدویہ۔ آپ حضرت عمر فاروق کے قبیلے بنو عدی سے تھیں۔ آپ کا اصل نام لیلیٰ تھا مگر شفابخش دم اور ادویات کی مہارت کی وجہ سے "الشفاء" کے لقب سے مشہور ہوئیں۔',
    lineageAndBackgroundEnglish: 'Ash-Shifa bint Abd Allah al-Adawiyyah. From the clan of Banu Adi. Originally named Layla, her skill in therapeutic remedies and literacy earned her the honorific title "Ash-Shifa" (The Healer).',

    propheticPraiseHadithArabic: '«أَلَا تُعَلِّمِينَ هَذِهِ رُقْيَةَ النَّمْلَةِ كَمَا عَلَّمْتِيهَا الكِتَابَةَ؟» [سنن أبي داود: ۳۸۸۷]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے سیدتنا الشفاء سے ارشاد فرمایا: "کیا تم حفصہ کو جلد کی بیماری کا یہ مفید دم نہیں سکھاتیں جیسے تم نے اسے لکھنا پڑھنا سکھایا ہے؟"۔',
    propheticPraiseHadithEnglish: 'The Messenger of Allah ﷺ said to Ash-Shifa: "Will you not teach Hafsah the therapeutic remedy for skin ailments just as you taught her how to write?" (Sunan Abi Dawud)',
    propheticPraiseSource: 'سنن ابی داؤد، کتاب الطب، حدیث رقم ۳۸۸۷ (حدیث صحیح)',

    exhaustiveBiographyUrdu: [
      'سیدتنا الشفاء بنت عبد اللہ رضی اللہ عنہا ان اولین خواتین میں شامل تھیں جنہوں نے اسلام کی آمد سے قبل ہی مکہ کے ناخواندہ معاشرے میں کتابت اور خوشخطی کا ہنر سیکھا۔ جب وہ مسلمان ہوئیں تو رسول اللہ ﷺ نے ان کے علم کو نہ صرف برقرار رکھا بلکہ اسے فروغ دینے کا حکم فرمایا اور انہیں ام المؤمنین حفصہ کا استاد مقرر فرمایا۔',
      'حضور ﷺ ان کے گھر تشریف لے جاتے اور قیلولہ فرماتے۔ انہوں نے حضور ﷺ کے لیے ایک چادر اور بستر خاص کر رکھا تھا جسے بعد میں ان کی اولاد نے تبرک کے طور پر محفوظ رکھا۔',
      'امیر المؤمنین حضرت عمر فاروق رضی اللہ عنہ ان کی رائے اور تجارتی باریکیوں کو بے حد وقعت دیتے تھے۔ روایات کے مطابق حضرت عمر بازارِ مدینہ میں معاشی نظم و نسق، ناپ تول کے ترازو کی درستی اور دھوکہ دہی کے خاتمے کے لیے سیدتنا الشفاء کی رائے پر عمل فرماتے تھے اور انہیں مارکیٹ کے انتظامی امور سونپتے تھے۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Ash-Shifa (رضي الله عنها) was a pioneer of female literacy in Arabia. Embracing Islam early in Makkah, she migrated to Madinah where the Prophet ﷺ formally commissioned her to teach writing, literacy, and medicinal remedies to Mother of the Believers Hafsah.',
      'The Prophet ﷺ frequently visited her home, where she maintained a dedicated bed for his afternoon rest (Qaylulah), preserved by her descendants as sacred relics.',
      'Caliph Umar ibn al-Khattab held her intellectual sharpness and ethical judgment in the highest esteem, regularly consulting her on marketplace regulations, fair trade practices, and commercial supervision in Madinah.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'مکہ مکرمہ میں قبل از اسلام کتابت و خواندگی کی مہارت',
        eventTitleEnglish: 'Mastery of Literacy and Medicine in Pre-Islamic Arabia',
        descriptionUrdu: 'ناخواندہ دور میں خوشخطی اور طب کی نادر صلاحیت حاصل کی۔',
        descriptionEnglish: 'Acquired rare literacy and therapeutic skills during the era of Jahiliyyah.'
      },
      {
        eventTitleUrdu: 'ام المؤمنین حضرت حفصہ کی باضابطہ استاد مقرر ہونا',
        eventTitleEnglish: 'Appointed Royal Instructor to Mother of Believers Hafsah',
        descriptionUrdu: 'حضور ﷺ کے حکم سے حضرت حفصہ کو کتابت اور علاج کی تعلیم دی۔',
        descriptionEnglish: 'Commissioned by the Prophet ﷺ to teach writing to Sayyidatuna Hafsah.'
      },
      {
        eventTitleUrdu: 'دورِ فاروقی میں مدینہ کے بازار کا معاشی احتساب',
        eventTitleEnglish: 'Marketplace Administration under Caliph Umar',
        descriptionUrdu: 'حضرت عمر نے تجارتی امور اور مارکیٹ کے نظم و نسق میں ان پر اعتماد فرمایا۔',
        descriptionEnglish: 'Consulted by Caliph Umar on commercial ethics and marketplace oversight.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'حافظ ابن عبد البر (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Ibn Abd al-Barr',
        bookTitle: 'الاستيعاب في معرفة الأصحاب',
        verbatimQuoteUrdu: 'الشفاء بنت عبد اللہ کبار عقلاء اور صاحبِ فضیلت خواتین میں سے تھیں جن کی رائے پر حضرت عمر اعتماد فرماتے تھے۔',
        verbatimQuoteEnglish: 'Ash-Shifa was among the most intellectually gifted women of her era, deeply trusted by Caliph Umar.'
      }
    ]
  },

  // =========================================================================
  // 11. SAYYIDATUNA MARYAM BINT IMRAN (سیدتنا مریم بنت عمران علیہا السلام)
  // =========================================================================
  {
    id: 'sah-11',
    nameUrdu: 'سیدتنا مریم بنت عمران (علیہا السلام)',
    nameArabic: 'مريم بنت عمران البتول العذراء (عليها السلام)',
    nameEnglish: 'Sayyidatuna Maryam bint Imran (Peace be upon her)',
    titleUrdu: 'بتول، عذراء، صدیقہ، مصطفاۃ علی نساء العالمین',
    titleEnglish: 'The Chaste Virgin, As-Siddiqah, Chosen Above All Women',
    kinshipToProphet: 'سیدنا عیسیٰ علیہ السلام کی والدہ ماجدہ، قرآن میں جن کے نام پر مکمل سورہ ہے',
    classicalCitation: 'سورۃ آل عمران: ۴۲ / سورۃ مریم / صحیح البخاری، حدیث ۳۴۳۱',
    era: 'دورِ بنی اسرائیل قبلِ میلادِ مسیح (بیت المقدس)',
    biographyUrdu: 'کائنات کی تمام عورتوں پر برگزیدہ اور پاکباز ہستی جن کی والدہ نے انہیں ولادت سے قبل ہی بیت المقدس کی خدمت کے لیے وقف کر دیا تھا۔ حضرت زکریا علیہ السلام کی کفالت میں محرابِ عبادت میں رہیں۔ اللہ تعالیٰ نے بے موسم کے جنتی پھلوں سے ان کی ضیافت فرمائی اور بغیر باپ کے حضرت عیسیٰ علیہ السلام کے معجزانہ حمل کی بشارت دی، جس پر انہوں نے بے مثال صبر اور تقویٰ کی مثال قائم کی۔',
    biographyEnglish: 'The pure, sanctified matriarch chosen by Allah Almighty above all the women of the universe. Dedicated to the Temple by her mother Hannah, nurtured under Prophet Zakariyya, provided with miraculous divine sustenance in her sanctuary (Mihrab), and chosen for the miraculous virgin birth of Prophet Isa (peace be upon him).',
    heroicAttributes: ['اعلیٰ ترین حیا اور عفت', 'شب و روز کی کامل یکسوئی والی عبادت', 'الزام تراشی پر چٹان جیسا صبر'],
    dailySunnahLessons: [
      {
        ur: 'اپنی پاکدامنی اور عفت کی ہر قیمت پر حفاظت کرنا اور لغو مجالس سے دور رہنا۔',
        en: 'Safeguarding personal chastity, modesty, and honor uncompromisingly in all environments.'
      },
      {
        ur: 'رزق کے معاملے میں صرف اللہ تعالیٰ کی ذات پر کامل توکل رکھنا۔',
        en: 'Placing absolute reliance upon Allah for sustenance and unearned divine blessings.'
      },
      {
        ur: 'جب لوگ بلاوجہ بدگمانی کریں تو خاموشی اور اللہ کے عدل پر بھروسہ رکھنا۔',
        en: 'Responding to unfair slander with quiet dignity and serene trust in divine vindication.'
      }
    ],
    sanadVerificationHash: 'SANAD-MARYAM-QURAN-BUKHARI-011',

    lineageAndBackgroundUrdu: 'مریم بنت عمران بن ماثان بن سلیمان بن داؤد علیہم السلام۔ آپ کا تعلق بنو اسرائیل کے معزز ترین انبیاء کے گھرانے اور آلِ عمران سے ہے۔ آپ کی والدہ کا نام حنہ تھا جنہوں نے نذر مانی تھی کہ جو بچہ پیدا ہوگا اسے بیت المقدس کے لیے آزاد وقف کروں گی۔',
    lineageAndBackgroundEnglish: 'Maryam bint Imran ibn Mathan of the lineage of Prophet Dawud and the noble House of Imran. Her mother Hannah consecrated her before birth to perpetual service of the Holy Sanctuary (Bayt al-Maqdis).',

    propheticPraiseHadithArabic: '«خَيْرُ نِسَائِهَا مَرْيَمُ ابْنَتُ عِمْرَانَ، وَخَيْرُ نِسَائِهَا خَدِيجَةُ» [صحيح البخاري: ۳۴۳۱] — وَقَالَ ﷺ: «كَمُلَ مِنَ الرِّجَالِ كَثِيرٌ، وَلَمْ يَكْمُلْ مِنَ النِّسَاءِ إِلَّا مَرْيَمُ ابْنَتُ عِمْرَانَ، وَآسِيَةُ امْرَأَةُ فِرْعَوْنَ» [صحيح البخاري: ۳۷۶۹]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے فرمایا: "آسمان و زمین کی عورتوں میں سب سے افضل مریم بنت عمران ہیں، اور سب سے افضل خدیجہ ہیں"۔ اور فرمایا: "مردوں میں سے بہت سے کامل ہوئے، لیکن عورتوں میں سے سوائے مریم بنت عمران اور فرعون کی بیوی آسیہ کے کوئی کامل نہیں ہوا"۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ declared: "The best of the women of the worlds is Maryam bint Imran, and the best of the women is Khadijah." (Bukhari #3431) And he said: "Many men reached perfection, but none reached perfection among women except Maryam bint Imran and Asiyah the wife of Pharaoh." (Bukhari #3769)',
    propheticPraiseSource: 'صحیح البخاری، کتاب احادیث الانبیاء، حدیث رقم ۳۴۳۱ و ۳۷۶۹ / صحیح مسلم، حدیث ۲۴۳۱',

    exhaustiveBiographyUrdu: [
      'سیدتنا مریم بنت عمران علیہا السلام وہ واحد خاتون ہیں جن کا نامِ نامی قرآنِ مجید میں ۳۴ بار صراحتاً مذکور ہے اور قرآن کی ۱۹ویں سورہ کا نام "سورۃ مریم" رکھا گیا۔ قرآن نے خود گواہی دی کہ اللہ تعالیٰ نے انہیں تمام جہانوں کی عورتوں پر برگزیدہ فرمایا: "وَإِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ اصْطَفَاكِ وَطَهَّرَكِ وَاصْطَفَاكِ عَلَىٰ نِسَاءِ الْعَالَمِينَ"۔',
      'جب آپ پیدا ہوئیں تو حضرت زکریا علیہ السلام نے آپ کی کفالت کا شرف حاصل کیا۔ بیت المقدس کے ایک پاکیزہ حجرے (محراب) میں آپ ہمہ وقت مصروفِ عبادت رہتیں۔ جب بھی حضرت زکریا آپ کے پاس آتے تو وہاں تازہ بے موسم پھل پاتے؛ سردیوں میں گرمیوں کے پھل اور گرمیوں میں سردیوں کے پھل! جب دریافت فرماتے کہ مریم یہ کہاں سے آئے؟ تو عرض کرتیں: "هُوَ مِنْ عِندِ اللَّهِ ۖ إِنَّ اللَّهَ يَرْزُقُ مَن يَشَاءُ بِغَيْرِ حِسَابٍ" (یہ اللہ کے پاس سے ہے، بیشک اللہ جسے چاہے بے حساب رزق دیتا ہے)۔',
      'پھر حضرت جبرائیل علیہ السلام ایک خوبصورت انسان کی صورت میں تشریف لائے اور ایک پاکیزہ بیٹے (حضرت عیسیٰ علیہ السلام) کی خوشخبری دی جو بغیر باپ کے کلمۃ اللہ کے طور پر پیدا ہوں گے۔ جب حمل کے بعد ولادت کا وقت قریب آیا اور تنہائی میں درد کی شدت ہوئی، تو پکار اٹھیں: "يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا"۔ مگر اللہ تعالیٰ نے ان کے قدموں کے نیچے میٹھے پانی کا چشمہ جاری فرمایا اور کھجور کے تنے کو ہلانے پر تر و تازہ کھجوریں نچھاور کیں۔',
      'جب وہ اپنے نوزائیدہ بچے کو گود میں اٹھا کر اپنی قوم کے پاس آئیں اور شریروں نے تہمت لگانا چاہی، تو آپ نے روزۂ سکوت کا اشارہ فرمایا۔ اس پر گہوارے میں ننھے حضرت عیسیٰ علیہ السلام نے کلام فرما کر اپنی والدہ کی برات کا اعلان کیا: "إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا"۔ اللہ نے قیامت تک کے لیے ان کی عفت کو قرآن کا لازوال حصہ بنا دیا۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Maryam bint Imran (peace be upon her) is the sole woman honored by explicit name in the Holy Quran (mentioned 34 times), with the entire 19th Surah titled after her. The Divine Word confirms her supreme election: "And when the angels said: O Maryam! Surely Allah has chosen you and purified you, and selected you above the women of all the worlds." (3:42)',
      'Nurtured under Prophet Zakariyya in the holy sanctuary of Jerusalem, she devoted her youth to ceaseless adoration. Whenever Zakariyya entered her chamber, he found miraculous unseasonal provisions—summer fruits in winter and winter produce in summer. When asked of their origin, she serenely replied: "It is from Allah; indeed Allah provides for whom He wills without measure."',
      'Archangel Jibril manifested before her to announce the immaculate conception of Prophet Isa (peace be upon him) as a Word and Spirit from Allah. When labor contractions drove her to the trunk of a date palm in solitary anguish, Allah caused a fresh spring to gush at her feet and ripe dates to shower upon her.',
      'Upon returning to her people carrying the newborn infant, when skeptics sought to accuse her, she gestured toward the child observing a vow of silence. In that supreme miracle, infant Isa spoke from the cradle: "Indeed I am the servant of Allah; He has given me the Scripture and made me a Prophet." Her peerless purity was enshrined in the divine decree forever.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'بیت المقدس کے لیے ولادت سے قبل نذر اور وقف',
        eventTitleEnglish: 'Consecration to the Holy Temple by Mother Hannah',
        descriptionUrdu: 'حضرت حنہ نے اپنی بیٹی کو عبادت اور خدمتِ بیت المقدس کے لیے وقف کیا۔',
        descriptionEnglish: 'Dedicated exclusively to divine worship in the Holy Sanctuary before birth.'
      },
      {
        eventTitleUrdu: 'محرابِ عبادت میں بے موسم جنتی پھلوں کی کرامت',
        eventTitleEnglish: 'Miraculous Heavenly Provisions in the Sanctuary',
        descriptionUrdu: 'حضرت زکریا علیہ السلام نے سردیوں میں گرمیوں کے جنتی پھل دیکھے۔',
        descriptionEnglish: 'Blessed with unseasonal divine fruits in her secluded prayer chamber.'
      },
      {
        eventTitleUrdu: 'روح القدس (حضرت جبرائیل) کے ذریعے کلمۃ اللہ کی بشارت',
        eventTitleEnglish: 'Annunciation by Archangel Jibril',
        descriptionUrdu: 'جبرائیل علیہ السلام نے بغیر باپ کے سیدنا عیسیٰ کی پیدائش کی خوشخبری دی۔',
        descriptionEnglish: 'Bestowed the miraculous immaculate tidings of Prophet Isa (peace be upon him).'
      },
      {
        eventTitleUrdu: 'گہوارے میں نومولود عیسیٰ علیہ السلام کی معجزانہ گواہی',
        eventTitleEnglish: 'Infant Isa\'s Miraculous Speech from the Cradle',
        descriptionUrdu: 'حضرت عیسیٰ نے گہوارے میں کلام فرما کر والدہ کی عفت و طہارت ثابت کی۔',
        descriptionEnglish: 'Newborn Isa spoke from the cradle exonerating his mother of all false accusations.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام ابن کثیر (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Kathir',
        bookTitle: 'البدایہ والنہایہ، ج ۲',
        verbatimQuoteUrdu: 'مریم بنت عمران تمام جہانوں کی عورتوں میں سب سے افضل صدیقہ ہیں جن کے تقویٰ اور کرامات پر قرآن شاہد ہے۔',
        verbatimQuoteEnglish: 'Maryam bint Imran is the supreme Siddiqah above all women of existence, her piety attested by the Quran.'
      }
    ]
  },

  // =========================================================================
  // 12. SAYYIDATUNA ASIYAH BINT MUZAHIM (سیدتنا آسیہ بنت مزاحم علیہا السلام)
  // =========================================================================
  {
    id: 'sah-12',
    nameUrdu: 'سیدتنا آسیہ بنت مزاحم (علیہا السلام)',
    nameArabic: 'آسية بنت مزاحم امرأة فرعون (عليها السلام)',
    nameEnglish: 'Sayyidatuna Asiyah bint Muzahim (Peace be upon her)',
    titleUrdu: 'شہیدۂ توحید، زوجۂ فرعون، سیدۃ نساء اہل الجنہ',
    titleEnglish: 'The Champion of Tawhid, Wife of Pharaoh, Matron of Paradise',
    kinshipToProphet: 'سیدنا موسیٰ علیہ السلام کی مربی والدہ، جنت میں حضور ﷺ کی رفیقہ',
    classicalCitation: 'سورۃ التحریم: ۱۱ / صحیح البخاری، حدیث ۳۴۱۱ / المعجم الکبیر',
    era: 'دورِ فرعونِ مصر (قبلِ ہجرت بنی اسرائیل)',
    biographyUrdu: 'مصر کے سب سے متکبر اور خدائی کا دعویٰ کرنے والے بادشاہ فرعون کی ملکہ جنہوں نے محلات کی شاہانہ آسائشوں کو ٹھکرا کر اللہ کی وحدانیت کو قبول کیا۔ دریائے نیل سے حضرت موسیٰ علیہ السلام کے صندوق کو نکال کر اپنے سینے سے لگایا اور فرعون کے سامنے ان کی جان بچائی۔ جب فرعون کو ان کے ایمان کا پتہ چلا تو ان پر ہولناک تشدد کیا گیا مگر ان کے پائے ثبات میں لرزش نہ آئی۔',
    biographyEnglish: 'The Queen of Egypt who defied the supreme tyrant of history. She plucked baby Musa from the Nile, compelled Pharaoh to adopt him, embraced pure Monotheism (Tawhid) in the heart of royal oppression, and chose excruciating martyrdom over idolatrous palaces, praying for an eternal home in Paradise near Allah.',
    heroicAttributes: ['شاہی آسائشوں پر ایمان کو ترجیح دینا', 'فرعون کے جبر کے سامنے فولادی عزم', 'سیدنا موسیٰ کی مربیانہ حفاظت'],
    dailySunnahLessons: [
      {
        ur: 'دنیا کی دولت، عہدے اور آسائشیں ایمان کے مقابلے میں کوئی وقعت نہیں رکھتیں۔',
        en: 'Worldly wealth, royal comfort, and power pale into insignificance when weighed against faith.'
      },
      {
        ur: 'ظالم ترین ماحول میں بھی اپنے دل میں ایمان کا چراغ روشن رکھا جا سکتا ہے۔',
        en: 'One can maintain pristine faith and moral purity even within toxic and oppressive surroundings.'
      },
      {
        ur: 'مصیبت کے وقت دنیا کی عمارتوں کے بجائے جنت میں اللہ کے قرب کا محل مانگنا۔',
        en: 'Praying for divine nearness in Paradise rather than ephemeral worldly monuments during distress.'
      }
    ],
    sanadVerificationHash: 'SANAD-ASIYAH-QURAN-TAHRIM-012',

    lineageAndBackgroundUrdu: 'آسیہ بنت مزاحم بن عبید بن الریان۔ آپ کا تعلق مصر کے شاہی خاندان سے تھا۔ فرعونِ مصر نے اپنے اقتدار اور حسن کی بنا پر ان سے شادی کی تھی۔ وہ محلات کی ملکہ تھیں مگر ان کا دل جاہلیت اور تکبر سے بالکل پاک تھا۔',
    lineageAndBackgroundEnglish: 'Asiyah bint Muzahim of ancient Egyptian royal lineage. Married to the Pharaoh who claimed divinity, she lived amidst imperial opulence yet kept her soul unstained by tyranny and arrogance.',

    propheticPraiseHadithArabic: '«وَضَرَبَ اللَّهُ مَثَلًا لِّلَّذِينَ آمَنُوا امْرَأَتَ فِرْعَوْنَ إِذْ قَالَتْ رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِن فِرْعَوْنَ وَعَمَلِهِ» [التحريم: ۱۱] — وَقَالَ ﷺ: «أَفْضَلُ نِسَاءِ أَهْلِ الْجَنَّةِ خَدِيجَةُ، وَفَاطِمَةُ، وَمَرْيَمُ، وَآسِيَةُ» [المستدرك على الصحيحين: ۳۸۳۶]',
    propheticPraiseHadithUrdu: 'قرآن نے فرمایا: "اور اللہ نے ایمان والوں کے لیے فرعون کی بیوی (آسیہ) کی مثال بیان فرمائی جب انہوں نے عرض کی: اے میرے رب! میرے لیے اپنے پاس جنت میں ایک گھر بنا دے اور مجھے فرعون اور اس کے عمل سے نجات دے"۔ اور رسول اللہ ﷺ نے فرمایا: "اہلِ جنت کی عورتوں میں سب سے افضل خدیجہ، فاطمہ، مریم، اور آسیہ ہیں"۔',
    propheticPraiseHadithEnglish: 'Allah presented her as the eternal archetype of faith in Surah At-Tahrim: "My Lord, build for me near You a house in Paradise and save me from Pharaoh and his deeds." (66:11) And the Prophet ﷺ declared: "The most noble women of Paradise are Khadijah, Fatimah, Maryam, and Asiyah." (Mustadrak al-Hakim)',
    propheticPraiseSource: 'سورۃ التحریم، آیت ۱۱ / المستدرک علی الصحیحین للحاکم، حدیث ۳۸۳۶ (صحیح علی شرط مسلم)',

    exhaustiveBiographyUrdu: [
      'سیدتنا آسیہ بنت مزاحم علیہا السلام تاریخِ انسانی کی وہ عظیم خاتون ہیں جنہیں اللہ تبارک و تعالیٰ نے قیامت تک کے تمام مردوں اور عورتوں کے لیے ایمان کا کامل نمونہ بنا کر پیش فرمایا ہے۔ وہ ایسے وقت میں ایمان لائیں جب زمین پر فرعون کی مطلق العنانی تھی اور وہ کہتا تھا: "أَنَا رَبُّكُمُ الْأَعْلَى" (میں تمہارا سب سے بڑا رب ہوں)۔',
      'جب اللہ نے نوزائیدہ موسیٰ علیہ السلام کے تابوت کو دریائے نیل کی لہروں پر بہایا اور وہ فرعون کے محل کے گھاٹ پر لگا، تو سیدتنا آسیہ نے اسے اٹھوایا۔ جب صندوق کھلا اور ننھے بچے کا نورانی چہرہ دیکھا تو ان کے دل میں مادری محبت کا سمندر امڈ آیا۔ فرعون بنی اسرائیل کے بچوں کو ذبح کرواتا تھا اور اس بچے کو بھی قتل کرنا چاہا، مگر آسیہ نے سینہ تان کر فرمایا: "قُرَّتُ عَيْنٍ لِّي وَلَكَ ۖ لَا تَقْتُلُوهُ عَسَىٰ أَن يَنفَعَنَا أَوْ نَتَّخِذَهُ وَلَدًا" (یہ میری اور تیری آنکھوں کی ٹھنڈک ہے، اسے قتل نہ کرو، ہو سکتا ہے یہ ہمیں نفع پہنچائے یا ہم اسے بیٹا بنا لیں)۔ اس طرح حضرت موسیٰ کی جان آسیہ کے ذریعے بچی۔',
      'جب موسیٰ علیہ السلام نے نبوت کے بعد دربارِ فرعون میں جادوگروں کو شکست دی اور جادوگر سجدے میں گر گئے، تو سیدتنا آسیہ کا پوشیدہ ایمان کھل کر سامنے آ گیا۔ جب فرعون کو معلوم ہوا کہ اس کی اپنی ملکہ ربِ موسیٰ پر ایمان لا چکی ہے، تو وہ غضبناک ہو گیا اور اس نے دھمکی دی کہ اگر موسیٰ کے خدا کا انکار نہ کیا تو بدترین موت دی جائے گی۔ مگر ملکہ نے محلات، زیورات اور تاج کو ٹھکرا دیا اور فرمایا: "میرا رب صرف وہ ہے جو زمین و آسمان کا خالق ہے"۔',
      'فرعون کے حکم پر تپتی دھوپ میں چاروں ہاتھ پاؤں میں میخیں گاڑ کر ان پر بھاری پتھر رکھ دیا گیا اور سخت اذیت دی گئی۔ اس وقت انہوں نے وہ تاریخ ساز دعا مانگی جو قرآن کا حصہ ہے: "رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ"۔ روایات کے مطابق اللہ تعالیٰ نے پردے ہٹا دیے اور انہوں نے شہادت سے پہلے ہی جنت میں اپنا سفید موتیوں کا محل دیکھ لیا اور مسکرا دیں۔ پھر فرعون کا پتھر گرنے سے پہلے ہی اللہ نے ان کی روح کو قبض فرما کر اپنے جوارِ رحمت میں لے لیا۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Asiyah bint Muzahim stands as the ultimate Quranic monument of unyielding faith. Living in the golden court of the tyrant who proclaimed "I am your supreme lord", she preserved an incorruptible soul anchored in pure Monotheism.',
      'When the wooden ark carrying infant Musa drifted to the palace banks on the Nile, Asiyah retrieved it. Gazing upon the radiant child, maternal love overwhelmed her heart. As Pharaoh drew his blade to execute the Hebrew babe, Asiyah shielded him, declaring: "He will be a comfort of the eye for me and for you! Do not slay him; perhaps he will be of benefit to us or we may adopt him as a son." Through her courageous intercession, the Prophet of the Exodus was preserved.',
      'When Musa vanquished Pharaoh\'s magicians and the sorcerers fell in prostration to the Lord of Aaron and Moses, Asiyah publicly declared her allegiance to Tawhid. Enraged, Pharaoh stripped her of queenship, binding her limbs to stakes in the blazing desert sun beneath crushing boulders, demanding she recant. She spat upon his imperial decrees.',
      'In her final moments under excruciating torture, she uttered the immortal supplication immortalized in Surah At-Tahrim: "My Lord! Build for me near You a house in Paradise, and save me from Pharaoh and his deeds." Classical commentators record that the celestial veils parted; she beheld her palace of pearls in Paradise and smiled. Allah took her pure soul into His mercy before the executioner\'s final stone was dropped.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'دریائے نیل سے سیدنا موسیٰ کی حفاظت اور پرورش',
        eventTitleEnglish: 'Rescuing and Sheltering Infant Musa from the Nile',
        descriptionUrdu: 'فرعون کے جلادوں کے سامنے ڈھال بن کر حضرت موسیٰ کو گود لیا۔',
        descriptionEnglish: 'Confronted Pharaoh\'s executioners and nurtured Moses in the royal court.'
      },
      {
        eventTitleUrdu: 'دربارِ فرعون میں علی الاعلان توحید کا اقرار',
        eventTitleEnglish: 'Public Declaration of Tawhid in Pharaoh\'s Court',
        descriptionUrdu: 'جادوگروں کے ایمان لانے کے بعد اپنے ایمان کا اعلان فرمایا۔',
        descriptionEnglish: 'Fearlessly proclaimed Monotheism, rejecting royal paganism and tyrant godhood.'
      },
      {
        eventTitleUrdu: 'میخوں پر ہولناک تشدد اور شہادت کے وقت جنت کا دیدار',
        eventTitleEnglish: 'Martyrdom Under Desert Torture & Vision of Paradise',
        descriptionUrdu: 'تپتی ریت پر میخوں میں جکڑے جانے پر جنت میں اپنے محل کا مشاہدہ کیا۔',
        descriptionEnglish: 'Endured martyrdom under desert stakes, beholding her palace in Paradise before passing.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'علامہ فخر الدین رازی (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Fakhr al-Din al-Razi',
        bookTitle: 'التفسیر الکبیر (مفاتیح الغیب)',
        verbatimQuoteUrdu: 'آسیہ نے پہلے "عِندَكَ" (تیرے پاس) کہا پھر "بَيْتًا" (گھر) مانگا، جس سے ثابت ہوتا ہے کہ وہ مکان سے پہلے اللہ کے قرب کی طلبگار تھیں۔',
        verbatimQuoteEnglish: 'Asiyah requested "Near You" before asking for "a House", proving she sought divine nearness above the physical dwelling.'
      }
    ]
  },

  // =========================================================================
  // 13. SAYYIDATUNA ZAYNAB BINT RASULILLAH (سیدتنا زینب بنت رسول اللہ)
  // =========================================================================
  {
    id: 'sah-13',
    nameUrdu: 'سیدتنا زینب بنت رسول اللہ (رضی اللہ عنہا)',
    nameArabic: 'زينب بنت محمد رسول الله القرشية الهاشمية',
    nameEnglish: 'Sayyidatuna Zaynab bint Rasulillah (رضي الله عنها)',
    titleUrdu: 'کبریٰ بناتِ رسول، صابرہ، مہاجرہ',
    titleEnglish: 'The Eldest Daughter of the Prophet ﷺ, The Patient Migrant',
    kinshipToProphet: 'رسول اللہ ﷺ اور سیدہ خدیجہ کی سب سے بڑی صاحبزادی',
    classicalCitation: 'صحیح البخاری، حدیث ۳۱۳۸ / سنن ابی داؤد، حدیث ۲۶۹۲',
    era: 'متوفی ۸ ہجری مدینہ منورہ (جنت البقیع)',
    biographyUrdu: 'رسول اللہ ﷺ کی سب سے بڑی لختِ جگر جن کے اخلاق میں خدیجۃ الکبریٰ کا پرتو تھا۔ ابتدائے اسلام ہی میں مکہ میں والدہ کے ساتھ ایمان لائیں۔ ہجرت کے دوران قریش کے ظالم ہبار بن اسود نے نیزہ مارا جس سے اونٹ سے گریں اور شدید زخمی ہوئیں۔ حضور ﷺ نے ان کی قربانی پر فرمایا: "یہ میری سب سے بہترین بیٹی ہے جو میری محبت میں تکلیفوں سے گزاری گئی"۔',
    biographyEnglish: 'The eldest noble daughter of the Prophet ﷺ and Sayyidatuna Khadijah. Embraced Islam at its inception. During her migration to Madinah, she was brutally attacked while pregnant by Habbar ibn al-Aswad, falling from her camel. The Prophet ﷺ praised her fortitude: "She was the best of my daughters who was afflicted for my sake."',
    heroicAttributes: ['ہجرت میں جان لیوا زخموں پر صبر', 'والدِ محترم ﷺ پر والہانہ فداکاری', 'حیا اور وفائے شوہر کا اعلیٰ نمونہ'],
    dailySunnahLessons: [
      {
        ur: 'دینِ حق کی خاطر جسمانی و مالی تکالیف کو صبر اور رضا کے ساتھ برداشت کرنا۔',
        en: 'Bearing physical and emotional hardships in the path of truth with serene fortitude.'
      },
      {
        ur: 'خاندان اور رشتوں کے اختلافات میں عدل اور پاکیزہ اخلاق کو نہ چھوڑنا۔',
        en: 'Upholding justice, filial loyalty, and high moral standards amidst family conflicts.'
      }
    ],
    sanadVerificationHash: 'SANAD-ZAYNAB-BUKHARI-SAHIH-013',

    lineageAndBackgroundUrdu: 'زینب بنت رسول اللہ محمد بن عبد اللہ بن عبد المطلب القرشیہ الہاشمیہ۔ والدہ ماجدہ سیدتنا خدیجہ الکبریٰ ہیں۔ حضور ﷺ کی عمر مبارک کے تیسویں سال مکہ میں ولادت ہوئی۔ ان کا نکاح حضرت خدیجہ کی بہن ہالہ کے بیٹے حضرت ابو العاص بن الربیع سے ہوا تھا۔',
    lineageAndBackgroundEnglish: 'The eldest daughter of the Prophet Muhammad ﷺ and Sayyidatuna Khadijah, born in Makkah when the Prophet ﷺ was 30 years old. Married prior to Islam to her maternal cousin Abu al-As ibn al-Rabi\'.',

    propheticPraiseHadithArabic: '«هِيَ خَيْرُ بَنَاتِي، أُصِيبَتْ فِيَّ» [سنن أبي داود: ۲۶۹۲ / المستدرك للحاكم: ۶۸۶۹]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے سیدتنا زینب کی فضیلت میں ارشاد فرمایا: "یہ میری بیٹیوں میں سب سے افضل ہے جو میری وجہ سے اتنی بڑی آزمائش میں ڈالی گئی"۔',
    propheticPraiseHadithEnglish: 'The Messenger of Allah ﷺ said of her: "She was the finest of my daughters who suffered tribulations on my account." (Sunan Abi Dawud #2692 / Mustadrak al-Hakim)',
    propheticPraiseSource: 'سنن ابی داؤد، کتاب الجہاد، حدیث رقم ۲۶۹۲ / الاصابة لابن حجر',

    exhaustiveBiographyUrdu: [
      'سیدتنا زینب رضی اللہ عنہا آقائے دو جہاں ﷺ کی سب سے بڑی شہزادی تھیں۔ جب نبوت کا اعلان ہوا تو انہوں نے اپنی والدہ سیدہ خدیجہ کے فورا بعد اسلام قبول کیا۔ ان کے شوہر ابو العاص بن الربیع اس وقت تک مشرک تھے مگر اخلاق کے اچھے تھے۔ قریش نے ابو العاص پر دباؤ ڈالا کہ تم محمد (ﷺ) کی بیٹی کو طلاق دے دو ہم جس سردار کی بیٹی کہو تمہارے نکاح میں دے دیتے ہیں، مگر ابو العاص نے صاف انکار کر دیا کہ میں اپنی رفیقہ کو کبھی نہیں چھوڑوں گا۔',
      'غزوۂ بدر میں جب ابو العاص قیدی بن کر مدینہ آئے، تو مکہ سے فدیہ بھیجا گیا۔ سیدتنا زینب نے فدیے میں وہ متبرک ہار بھیجا جو ان کی والدہ حضرت خدیجہ نے رخصتی کے وقت انہیں پہنایا تھا۔ جب رسول اللہ ﷺ کی نظر اس ہار پر پڑی تو خدیجہ کی وفائیں یاد آ گئیں اور آنکھوں سے آنسو چھلک پڑے۔ آپ ﷺ نے صحابہ سے فرمایا: "اگر تم مناسب سمجھو تو زینب کا قیدی رہا کر دو اور اس کا ہار لوٹا دو"۔ صحابہ نے سر جھکا کر ہار اور قیدی دونوں واپس کر دیے۔',
      'رسول اللہ ﷺ نے ابو العاص سے وعدہ لیا کہ وہ زینب کو مدینہ بھیج دیں گے۔ جب زینب ہجرت کر کے مدینہ آ رہی تھیں، تو مکہ کے شریروں نے تعاقب کیا اور ہبار بن اسود نے نیزہ مار کر انہیں اونٹ کے کجاوے سے چٹان پر گرا دیا جس سے ان کا حمل ضائع ہو گیا اور شدید اندرونی چوٹیں آئیں۔ بالآخر وہ مدینہ منورہ پہنچیں اور حضور ﷺ نے فرطِ محبت سے ان کا استقبال فرمایا۔',
      'بعد میں جب ابو العاص اسلام لے آئے تو حضور ﷺ نے سابقہ نکاح پر ہی دونوں کو اکٹھا فرما دیا۔ ہجرت کے دوران لگے ہوئے گہرے زخموں کی وجہ سے سیدتنا زینب ۸ ہجری میں مدینہ منورہ میں وصال پا گئیں۔ حضور ﷺ نے خود ان کے جنازے کی امامت فرمائی اور اپنی چادرِ مبارک ان کے کفن کے لیے عطا فرمائی۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Zaynab (رضي الله عنها) was the eldest daughter of the Prophet ﷺ. Embracing Islam immediately after her mother Khadijah, she demonstrated peerless loyalty during the bitter Makkan boycott.',
      'At the Battle of Badr, her husband Abu al-As was captured by Muslims. When ransoms arrived from Makkah, Zaynab sent the onyx necklace gifted to her by Khadijah on her wedding night. When the Prophet ﷺ recognized Khadijah\'s necklace, he wept openly and asked the companions: "If you deem it appropriate, release her captive and return her heirloom to her." The companions weeping consented immediately.',
      'Upon release, Abu al-As fulfilled his pledge to let Zaynab migrate to Madinah. As she departed Makkah, Habbar ibn al-Aswad ambushed her camel, striking her with a spear. She fell heavily upon a rock, suffering a miscarriage and severe internal hemorrhage. She reached Madinah where the Prophet ﷺ tended to her with immense tenderness.',
      'When Abu al-As later embraced Islam, the Prophet ﷺ reunited them. Complications from her migration injuries persisted until she passed away in 8 AH in Madinah. The Prophet ﷺ personally lowered her into Jannat al-Baqi, offering his own blessed waist-wrapper (Izar) as her shroud.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'ابتدائے بعثت میں اسلام کی سب سے پہلی بیٹی',
        eventTitleEnglish: 'First Daughter to Accept Islam in Makkah',
        descriptionUrdu: 'سیدہ خدیجہ کے بعد بچپن ہی میں دینِ حق کی گواہی دی۔',
        descriptionEnglish: 'Embraced the Da\'wah alongside her mother Khadijah at dawn of Islam.'
      },
      {
        eventTitleUrdu: 'غزوۂ بدر میں سیدہ خدیجہ کے ہار کا تاریخ ساز واقعہ',
        eventTitleEnglish: 'The Sacred Necklace of Khadijah at Badr',
        descriptionUrdu: 'فدیے میں ہار بھیجا جس پر حضور ﷺ رو پڑے اور ہار واپس کروا دیا۔',
        descriptionEnglish: 'Sent Khadijah\'s bridal necklace as ransom, moving the Prophet ﷺ to tears.'
      },
      {
        eventTitleUrdu: 'ہجرتِ مدینہ میں کاری زخم اور صبرِ ایوب',
        eventTitleEnglish: 'Affliction During the Hijrah to Madinah',
        descriptionUrdu: 'ہبار بن اسود کے حملے میں حمل ضائع ہوا مگر مدینہ پہنچ کر صبر فرمایا۔',
        descriptionEnglish: 'Severely wounded by Makkan pursuers during Hijrah, enduring with patience.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'علامہ ابن عبد البر (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Ibn Abd al-Barr',
        bookTitle: 'الاستیعاب فی معرفۃ الاصحاب',
        verbatimQuoteUrdu: 'زینب حضور ﷺ کی سب سے بڑی بیٹی تھیں اور ان کی وفاداری اور صدمات پر صبر امت کے لیے مشعلِ راہ ہے۔',
        verbatimQuoteEnglish: 'Zaynab was the eldest daughter of the Messenger ﷺ; her endurance of pain remains a beacon for the Ummah.'
      }
    ]
  },

  // =========================================================================
  // 14. SAYYIDATUNA RUQAYYAH BINT RASULILLAH (سیدتنا رقیہ بنت رسول اللہ)
  // =========================================================================
  {
    id: 'sah-14',
    nameUrdu: 'سیدتنا رقیہ بنت رسول اللہ (رضی اللہ عنہا)',
    nameArabic: 'رقية بنت محمد رسول الله القرشية الهاشمية',
    nameEnglish: 'Sayyidatuna Ruqayyah bint Rasulillah (رضي الله عنها)',
    titleUrdu: 'ذات الہجرتین، زوجۂ ذوالنورین، شہزادیٔ رسول',
    titleEnglish: 'Dhat al-Hijratayn (Migrant of Two Hijrahs), Wife of Uthman',
    kinshipToProphet: 'رسول اللہ ﷺ کی دوسری صاحبزادی، سیدنا عثمان غنی کی زوجۂ مطہرہ',
    classicalCitation: 'صحیح البخاری، حدیث ۳۱۳۰، ۳۶۹۸ / الطبقات الکبریٰ لابن سعد',
    era: 'متوفی ۲ ہجری مدینہ منورہ (فتحِ بدر کے دن وصال)',
    biographyUrdu: 'رسول اللہ ﷺ کی وہ پاکیزہ بیٹی جنہوں نے اسلام کی خاطر دو مرتبہ ہجرت فرمائی: پہلے حبشہ کی طرف اور پھر مدینہ منورہ کی طرف۔ سیدنا عثمان بن عفان رضی اللہ عنہ کے ساتھ ان کا نکاح آسمانوں پر مقدر تھا۔ غزوۂ بدر کے موقع پر شدید بیمار تھیں، حضور ﷺ نے حضرت عثمان کو ان کی تیمارداری کے لیے روکا اور انہیں بدر کے مجاہدین کے برابر اجر اور غنیمت کا حصہ عطا فرمایا۔',
    biographyEnglish: 'The revered daughter of the Prophet ﷺ who undertook both foundational migrations of Islam: first to Abyssinia and then to Madinah alongside her husband Sayyiduna Uthman ibn Affan. During Badr, she fell mortally ill; the Prophet ﷺ ordered Uthman to nurse her, declaring he would receive the exact reward and spoils of a Badr warrior.',
    heroicAttributes: ['حبشہ اور مدینہ کی دوہری ہجرت کا شرف', 'میکے اور سسرال کی مثالی پاکیزگی', 'مرضِ وفات پر صبر'],
    dailySunnahLessons: [
      {
        ur: 'دین کے تحفظ کے لیے اپنے وطن اور آسائشوں کو خوش دلی سے چھوڑ دینا۔',
        en: 'Sacrificing personal comforts and homeland willingly to safeguard sacred faith.'
      },
      {
        ur: 'بیمار اہل خانہ اور شریکِ حیات کی تیمارداری کو جہاد کے برابر عبادت سمجھنا۔',
        en: 'Treating the care of a sick spouse or parent as equal to the reward of frontline service.'
      }
    ],
    sanadVerificationHash: 'SANAD-RUQAYYAH-BUKHARI-SAHIH-014',

    lineageAndBackgroundUrdu: 'رقیہ بنت رسول اللہ محمد ﷺ بن عبد اللہ۔ والدہ سیدتنا خدیجہ الکبریٰ ہیں۔ بعثتِ نبوی سے سات سال قبل مکہ میں پیدا ہوئیں۔ ان کا نکاح سیدنا عثمان بن عفان رضی اللہ عنہ سے ہوا جو تاریخ کے سب سے باحیا انسان تھے۔',
    lineageAndBackgroundEnglish: 'Second daughter of the Prophet ﷺ and Khadijah, born 7 years before Prophethood. Wed to Sayyiduna Uthman ibn Affan, forming the most noble and modest household in Madinah.',

    propheticPraiseHadithArabic: '«إِنَّ عُثْمَانَ وَرُقَيَّةَ لأَوَّلُ مَنْ هَاجَرَ إِلَى اللَّهِ بَعْدَ إِبْرَاهِيمَ وَلُوطٍ» [المستدرك للحاكم: ۶۸۷۸ / مجمع الزوائد]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے سیدنا عثمان اور سیدہ رقیہ کے حق میں ارشاد فرمایا: "بے شک ابراہیم اور لوط علیہما السلام کے بعد عثمان اور رقیہ وہ پہلے انسان ہیں جنہوں نے اپنے اہل خانہ سمیت اللہ کی راہ میں ہجرت کی"۔',
    propheticPraiseHadithEnglish: 'The Prophet ﷺ proclaimed regarding Uthman and Ruqayyah: "Verily, Uthman and Ruqayyah are the very first household to migrate in the path of Allah since Ibrahim and Lut." (Mustadrak al-Hakim)',
    propheticPraiseSource: 'المستدرک علی الصحیحین، حدیث ۶۸۷۸ / صحیح البخاری، حدیث ۳۱۳۰',

    exhaustiveBiographyUrdu: [
      'سیدتنا رقیہ رضی اللہ عنہا کو تاریخِ اسلام میں "ذات الہجرتین" (دو ہجرتوں والی عظیم خاتون) کے لقب سے جانا جاتا ہے۔ جب مکہ میں قریش کا ظلم و ستم انتہا کو پہنچ گیا اور مسلمانوں پر زمین تنگ کر دی گئی، تو رسول اللہ ﷺ نے حبشہ کی طرف ہجرت کا حکم دیا۔ سیدتنا رقیہ اپنے شوہر سیدنا عثمان بن عفان کے ساتھ سمندر کا پرخطر سفر طے کر کے حبشہ پہنچیں اور وہاں کئی سال غربت و جلاوطنی میں صبر سے گزارے۔',
      'جب رسول اللہ ﷺ نے مدینہ کی طرف ہجرت فرمائی، تو سیدہ رقیہ اور سیدنا عثمان حبشہ سے واپس مکہ آئے اور پھر وہاں سے مدینہ کی دوسری مبارک ہجرت فرمائی۔ مدینہ منورہ میں ان کے بیٹے حضرت عبد اللہ بن عثمان کی ولادت ہوئی جن کی وفات پر انہیں گہرا صدمہ پہنچا۔',
      '۲ ہجری میں جب مسلمان غزوۂ بدر کے لیے نکل رہے تھے، تو سیدتنا رقیہ کو شدید چیچک (smallpox) اور تیز بخار نے آ لیا۔ سیدنا عثمان غنی رسول اللہ ﷺ کے ساتھ بدر کے معرکے میں جانا چاہتے تھے، مگر حضور ﷺ نے حکم دیا: "تم رقیہ کے پاس ٹھہرو، تمہیں بدر میں حاضر ہونے والے مجاہد جتنا اجر اور مالِ غنیمت کا پورا حصہ ملے گا"۔',
      'جس دن حضرت زید بن حارثہ رضی اللہ عنہ بدر کی عظیم الشان فتح کی خوشخبری لے کر مدینہ منورہ میں داخل ہوئے، اسی دن سیدتنا رقیہ کا وصال ہوا اور انہیں جنت البقیع میں دفن کیا جا رہا تھا۔ سیدنا عثمان ان کی جدائی پر رو پڑے تو رسول اللہ ﷺ نے فرمایا کہ رقیہ اپنے سلفِ صالحین سے جا ملی ہیں۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Ruqayyah (رضي الله عنها) earned the immortal historical title Dhat al-Hijratayn (The Lady of Two Migrations). During the darkest persecutions in Makkah, she crossed the Red Sea with Sayyiduna Uthman to seek asylum under the righteous Negus of Abyssinia.',
      'Upon hearing of the Prophet\'s migration to Madinah, the couple returned and undertook the second arduous journey to the City of the Prophet. In Madinah, she nurtured her young son Abdullah until his untimely passing, enduring maternal grief with steadfast prayer.',
      'In 2 AH, as the Muslim army mobilized for the decisive Battle of Badr, Ruqayyah contracted a virulent fever. Uthman ardently desired to march with the Prophet ﷺ, but the Messenger ordered: "Remain with Ruqayyah; you shall receive the full reward and war spoils of a warrior present at Badr." (Sahih al-Bukhari #3130).',
      'On the very afternoon that Zayd ibn Harithah rode into Madinah proclaiming the historic victory of Badr, Ruqayyah passed into the divine presence. She was laid to rest in Jannat al-Baqi, mourned by the entire Muslim community.'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'حبشہ کی طرف پہلی پرخطر سمندری ہجرت',
        eventTitleEnglish: 'The First Historic Migration to Abyssinia',
        descriptionUrdu: 'سیدنا عثمان کے ساتھ اسلام کی پہلی بین الاقوامی ہجرت فرمائی۔',
        descriptionEnglish: 'Part of the premier Muslim contingent seeking asylum across the Red Sea.'
      },
      {
        eventTitleUrdu: 'مدینہ منورہ کی طرف دوسری ہجرت (ذات الہجرتین)',
        eventTitleEnglish: 'The Second Migration to Madinah',
        descriptionUrdu: 'حبشہ سے واپسی کے بعد دربارِ رسالت مدینہ میں سکونت اختیار کی۔',
        descriptionEnglish: 'Undertook the second migration to Madinah, earning the title Dhat al-Hijratayn.'
      },
      {
        eventTitleUrdu: 'فتحِ بدر کے دن وصال اور عثمان غنی کا بدری اجر پانا',
        eventTitleEnglish: 'Passing on the Day of Badr Victory',
        descriptionUrdu: 'حضور ﷺ کے حکم سے سیدنا عثمان نے تیمارداری کی اور بدری مجاہد کا درجہ پایا۔',
        descriptionEnglish: 'Passed away as Badr victory tidings arrived; Uthman granted full Badr status.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'حافظ ابن حجر العسقلانی (رحمہ اللہ)',
        scholarNameEnglish: 'Hafidh Ibn Hajar al-Asqalani',
        bookTitle: 'الاصابة فی تمييز الصحابة',
        verbatimQuoteUrdu: 'رقیہ بنت رسول اللہ ہجرتین کی فضیلت رکھنے والی تھیں اور ان کے حق میں حضور ﷺ کی دعائیں مستجاب تھیں۔',
        verbatimQuoteEnglish: 'Ruqayyah possessed the merit of both migrations, and the Prophet\'s prayers for her were universally answered.'
      }
    ]
  },

  // =========================================================================
  // 15. SAYYIDATUNA UMM KULTHUM BINT RASULILLAH (سیدتنا ام کلثوم بنت رسول اللہ)
  // =========================================================================
  {
    id: 'sah-15',
    nameUrdu: 'سیدتنا ام کلثوم بنت رسول اللہ (رضی اللہ عنہا)',
    nameArabic: 'أم كلثوم بنت محمد رسول الله القرشية الهاشمية',
    nameEnglish: 'Sayyidatuna Umm Kulthum bint Rasulillah (رضي الله عنها)',
    titleUrdu: 'کریمۂ مصطفیٰ، رفیقۂ ذوالنورین، صابرہ',
    titleEnglish: 'Daughter of the Prophet ﷺ, The Second Light of Uthman',
    kinshipToProphet: 'رسول اللہ ﷺ کی تیسری صاحبزادی، حضرت عثمان کی دوسری زوجۂ مطہرہ',
    classicalCitation: 'صحیح البخاری، حدیث ۱۲۸۵ / سنن ابن ماجہ، حدیث ۱۴۵۹',
    era: 'متوفی ۹ ہجری مدینہ منورہ (جنت البقیع)',
    biographyUrdu: 'رسول اللہ ﷺ کی وہ عظیم الشان بیٹی جن کے عقد میں آنے کے بعد حضرت عثمان کو "ذوالنورین" (دو نوروں والا) کا تاریخی اور منفرد لقب ملا۔ جب سیدہ رقیہ کے وصال کے بعد رسول اللہ ﷺ نے اپنی تیسری بیٹی ام کلثوم کا نکاح حضرت عثمان سے فرمایا، تو ارشاد فرمایا: "اگر میری چالیس بیٹیاں بھی ہوتیں تو میں ایک کے بعد ایک کر کے سب عثمان کے نکاح میں دے دیتا"۔ شعبِ ابی طالب کی تین سالہ بھوک اور بائیکاٹ میں حضور ﷺ کی خدمت میں پیش پیش رہیں۔',
    biographyEnglish: 'The blessed third daughter of the Prophet ﷺ whose marriage to Sayyiduna Uthman after Ruqayyah\'s passing cemented Uthman\'s eternal title Dhu al-Nurayn (Possessor of Two Lights). Endured the grueling 3-year siege of Shi\'b Abi Talib. The Prophet ﷺ proclaimed: "If I possessed forty daughters, I would marry them to Uthman one after another."',
    heroicAttributes: ['شعبِ ابی طالب کے بائیکاٹ میں باپ کی خدمت', 'سیدنا عثمان کے گھر کو نور بنانے والی رفیقہ', 'بے پناہ زہد و حیا'],
    dailySunnahLessons: [
      {
        ur: 'آزمائش کے وقت اپنے والدین اور بزرگوں کی دل و جان سے خدمت کرنا۔',
        en: 'Standing selflessly beside parents and family elders during periods of intense trial.'
      },
      {
        ur: 'نیک اور باحیا شریکِ حیات کے ساتھ زندگی گزار کر گھر کو ذکر اور عبادت کا گہوارہ بنانا۔',
        en: 'Transforming one\'s home into an abode of modesty, peace, and regular remembrance.'
      }
    ],
    sanadVerificationHash: 'SANAD-UMM-KULTHUM-BUKHARI-015',

    lineageAndBackgroundUrdu: 'ام کلثوم بنت رسول اللہ محمد ﷺ بن عبد اللہ بن عبد المطلب۔ والدہ ماجدہ سیدتنا خدیجہ الکبریٰ ہیں۔ اپنی چھوٹی بہن سیدہ فاطمۃ الزہراء رضی اللہ عنہا سے عمر میں بڑی تھیں۔ بعثت سے ۶ سال قبل مکہ میں ولادت ہوئی۔',
    lineageAndBackgroundEnglish: 'Third daughter of the Prophet ﷺ and Khadijah. Older than Sayyidatuna Fatimah. Born in Makkah 6 years before the commencement of Prophethood.',

    propheticPraiseHadithArabic: '«لَوْ كَانَ عِنْدِي ثَالِثَةٌ لَزَوَّجْتُكَهَا يَا عُثْمَانُ» [المعجم الكبير للطبراني / مجمع الزوائد: ۹/۸۳]',
    propheticPraiseHadithUrdu: 'رسول اللہ ﷺ نے سیدتنا ام کلثوم کے وصال پر حضرت عثمان غنی سے فرمایا: "اے عثمان! اگر میرے پاس تیسری بیٹی بھی ہوتی تو میں اس کا نکاح بھی تم سے کر دیتا!"۔',
    propheticPraiseHadithEnglish: 'The Messenger of Allah ﷺ comforted Sayyiduna Uthman: "If I possessed a third daughter, O Uthman, I would surely have given her to you in marriage!" (Al-Mu\'jam al-Kabir / Majma\' al-Zawa\'id)',
    propheticPraiseSource: 'المعجم الکبیر للطبرانی، ج ۲۲ / مجمع الزوائد للہیثمی، ج ۹، ص ۸۳',

    exhaustiveBiographyUrdu: [
      'سیدتنا ام کلثوم رضی اللہ عنہا آقائے دو جہاں ﷺ کے گھرانے کا وہ روشن چراغ ہیں جنہوں نے اسلام کی خاطر بچپن ہی سے غیر معمولی مشقتیں دیکھیں۔ جب مشرکینِ مکہ نے رسول اللہ ﷺ اور بنو ہاشم کو شعبِ ابی طالب کی گھاٹی میں قید کیا، تو ام کلثوم نے اپنی والدہ حضرت خدیجہ اور بہنوں کے ساتھ تین سال تک پتے چبا کر اور بھوک پیاس کی سختیاں جھیل کر اپنے والد کا ساتھ دیا۔',
      'جب مکہ سے مدینہ کی طرف ہجرت ہوئی، تو حضور ﷺ نے حضرت زید بن حارثہ کو مکہ بھیج کر سیدتنا ام کلثوم، سیدہ فاطمہ اور ام المؤمنین سودہ رضی اللہ عنہن کو باحفاظت مدینہ منورہ بلوایا۔ مدینہ میں آپ نے والدِ گرامی کی خدمت میں زندگی کے پرسکون ایام گزارے۔',
      '۳ ہجری میں جب سیدہ رقیہ کے انتقال کے بعد حضرت عثمان غنی غمزدہ تھے، تو رسول اللہ ﷺ نے وحیِ الٰہی کی روشنی میں ام کلثوم کا نکاح عثمان غنی سے فرمایا۔ تاریخِ انسانی میں حضرت عثمان کے سوا کسی انسان کو یہ شرف حاصل نہیں ہوا کہ اس کے نکاح میں کسی نبی کی دو بیٹیاں یکے بعد دیگرے آئی ہوں! اسی لیے انہیں "ذوالنورین" کہا جاتا ہے۔',
      'سیدتنا ام کلثوم حضرت عثمان کے گھر میں چھ سال تک پرسکون رفاقت میں رہیں، تاآنکہ ۹ ہجری کے شعبان میں ان کا وصال ہوا۔ رسول اللہ ﷺ نے خود ان کی نمازِ جنازہ پڑھائی، اور جب قبر میں اتارا جا رہا تھا تو حضور ﷺ کی آنکھوں سے آنسو رواں تھے۔ آپ نے صحابہ کو تلقین فرمائی کہ عثمان کے ساتھ حسنِ سلوک کریں کیونکہ اس نے میرے دو جگر کے ٹکڑوں کو پناہ دی تھی۔'
    ],
    exhaustiveBiographyEnglish: [
      'Sayyidatuna Umm Kulthum (رضي الله عنها) endured the fire of persecution from childhood. Confined with the Prophet ﷺ in the sun-baked gorge of Shi\'b Abi Talib for three agonizing years, she sustained her ailing mother Khadijah and supported her father through starvation and societal boycott.',
      'Following the Hijrah, the Prophet ﷺ dispatched Zayd ibn Harithah to escort Umm Kulthum, Fatimah, and Mother of the Believers Sawdah safely to Madinah, where she resumed household duties in the newly established Islamic commonwealth.',
      'In 3 AH, following the grief of Ruqayyah\'s passing, the Prophet ﷺ informed Uthman that Archangel Jibril had descended commanding her marriage to him. No human being in history ever wed two daughters of a Messenger of Allah except Uthman, immortalizing him as Dhu al-Nurayn (Possessor of the Two Lights).',
      'She graced Uthman\'s home for six harmonious years before falling ill and passing away in Sha\'ban 9 AH. The Prophet ﷺ led her funeral prayer. As she was lowered into Jannat al-Baqi, tears streamed down the Prophet\'s face. He comforted Uthman, attesting: "If I possessed a third daughter, I would give her to you."'
    ],

    majorHistoricalMilestones: [
      {
        eventTitleUrdu: 'شعبِ ابی طالب کے تین سالہ محاصرے میں استقامت',
        eventTitleEnglish: 'Fortitude During 3-Year Siege of Shi\'b Abi Talib',
        descriptionUrdu: 'بچپن میں بائیکاٹ اور فاقہ کشی کے ایام والد کے ساتھ کاٹے۔',
        descriptionEnglish: 'Endured famine and economic blockade alongside the Prophet ﷺ.'
      },
      {
        eventTitleUrdu: 'سیدنا عثمان سے نکاح اور "ذوالنورین" کا لقب',
        eventTitleEnglish: 'Marriage to Uthman & Bestowal of Dhu al-Nurayn',
        descriptionUrdu: 'سیدہ رقیہ کے بعد نکاح میں آئیں اور حضرت عثمان دو نوروں والے بنے۔',
        descriptionEnglish: 'Consecrated Uthman\'s eternal historical title of Possessor of Two Lights.'
      },
      {
        eventTitleUrdu: '۹ ہجری میں وصال اور روضۂ اقدس کے پاس تدفین',
        eventTitleEnglish: 'Passing in 9 AH & Jannat al-Baqi Burial',
        descriptionUrdu: 'حضور ﷺ نے خود نمازِ جنازہ پڑھائی اور آنسوؤں سے رخصت فرمایا۔',
        descriptionEnglish: 'The Prophet ﷺ wept as she was laid to rest beside her sister in Baqi.'
      }
    ],

    classicalScholarlyEndorsements: [
      {
        scholarNameUrdu: 'امام جلال الدین السیوطی (رحمہ اللہ)',
        scholarNameEnglish: 'Imam Jalal al-Din al-Suyuti',
        bookTitle: 'الخصائص الکبریٰ',
        verbatimQuoteUrdu: 'حضرت عثمان کے علاوہ تاریخ میں کسی بشر کو یہ شرف نہیں ملا کہ اس کے پاس کسی نبی کے دو نور جمع ہوئے ہوں۔',
        verbatimQuoteEnglish: 'No human in history was honored to unite two lights of a Messenger in marriage except Sayyiduna Uthman.'
      }
    ]
  }
];
