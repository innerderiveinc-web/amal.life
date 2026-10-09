/**
 * AMAL OS - Masnoon Tasbih & Zikr Counter Engine
 * 
 * Provides authentic Prophetic azkar presets, Hadith references,
 * haptic vibration thresholds (33, 100), and distraction-free counting.
 * 
 * Sources: Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami' at-Tirmidhi.
 */

export interface TasbihPreset {
  id: string;
  arabicText: string;
  transliteration: string;
  urduTranslation: string;
  englishTranslation: string;
  targetCount: number;
  fadilahUrdu: string;
  fadilahEnglish: string;
  hadithSource: string;
  category: 'POST_SALAH' | 'MORNING_EVENING' | 'REPENTANCE' | 'SALAWAT' | 'GENERAL';
}

export interface TasbihSessionState {
  presetId: string;
  currentCount: number;
  roundsCompleted: number;
  totalCountsInSession: number;
  isComplete: boolean;
}

export class MasnoonTasbihEngine {
  private static readonly PRESETS: TasbihPreset[] = [
    {
      id: 'subhanallah',
      arabicText: 'سُبْحَانَ اللَّهِ',
      transliteration: 'Subḥān Allāh',
      urduTranslation: 'اللہ ہر عیب اور نقص سے پاک ہے',
      englishTranslation: 'Glory be to Allah, free is He from all imperfections',
      targetCount: 33,
      fadilahUrdu: 'نماز کے بعد 33 مرتبہ پڑھنا سنتِ نبوی ﷺ ہے۔ میزان میں بھاری ترین کلمات میں سے ہے۔',
      fadilahEnglish: 'Sunnah after every obligatory prayer. Among the heaviest words on the scale.',
      hadithSource: 'Sahih Muslim 597',
      category: 'POST_SALAH',
    },
    {
      id: 'alhamdulillah',
      arabicText: 'الْحَمْدُ لِلَّهِ',
      transliteration: 'Al-ḥamdu lillāh',
      urduTranslation: 'تمام تعریفیں اور شکر صرف اللہ کے لیے ہیں',
      englishTranslation: 'All praise and gratitude belong exclusively to Allah',
      targetCount: 33,
      fadilahUrdu: 'الحمد للہ میزان کو نیکیوں سے بھر دیتا ہے۔',
      fadilahEnglish: 'Al-hamdu lillah fills the scale of good deeds.',
      hadithSource: 'Sahih Muslim 223',
      category: 'POST_SALAH',
    },
    {
      id: 'allahuakbar',
      arabicText: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      urduTranslation: 'اللہ سب سے بڑا ہے',
      englishTranslation: 'Allah is the Greatest beyond all comparison',
      targetCount: 34,
      fadilahUrdu: 'تسبیحِ فاطمہ کا اختتامی حصہ، جو انسان کو تھکن سے بے نیاز کر دیتا ہے۔',
      fadilahEnglish: 'Concluding part of Tasbih Fatimah, bestows inner strength and barakah.',
      hadithSource: 'Sahih al-Bukhari 3705',
      category: 'POST_SALAH',
    },
    {
      id: 'subhanallahi-wabihamdihi',
      arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      transliteration: 'Subḥān Allāhi wa bi-ḥamdih',
      urduTranslation: 'اللہ پاک ہے اپنی تعریفوں کے ساتھ',
      englishTranslation: 'Glory be to Allah and with His praise',
      targetCount: 100,
      fadilahUrdu: 'جو شخص دن میں 100 مرتبہ پڑھے، اس کے گناہ مٹا دیے جاتے ہیں اگرچہ سمندر کے جھاگ برابر ہوں۔',
      fadilahEnglish: 'Whoever says it 100 times daily will have their sins forgiven even if like sea foam.',
      hadithSource: 'Sahih al-Bukhari 6405',
      category: 'MORNING_EVENING',
    },
    {
      id: 'astaghfirullah',
      arabicText: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      transliteration: 'Astaghfirullāha wa atūbu ilayh',
      urduTranslation: 'میں اللہ سے مغفرت طلب کرتا ہوں اور اسی کی طرف رجوع کرتا ہوں',
      englishTranslation: 'I seek the forgiveness of Allah and repent sincerely unto Him',
      targetCount: 100,
      fadilahUrdu: 'رسول اللہ ﷺ نے فرمایا: قسم ہے اللہ کی، میں دن میں 70 سے 100 مرتبہ اللہ سے استغفار کرتا ہوں۔',
      fadilahEnglish: 'The Prophet ﷺ said: By Allah, I seek forgiveness from Allah more than 70 to 100 times a day.',
      hadithSource: 'Sahih al-Bukhari 6307, Muslim 2702',
      category: 'REPENTANCE',
    },
    {
      id: 'salawat-ibrahim',
      arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
      transliteration: 'Allāhumma ṣalli ‘alā Muḥammad wa ‘alā āli Muḥammad',
      urduTranslation: 'اے اللہ! رحمتیں نازل فرما محمد ﷺ پر اور ان کی آل پر',
      englishTranslation: 'O Allah, bestow peace and blessings upon Muhammad and upon his family',
      targetCount: 100,
      fadilahUrdu: 'جو مجھ پر ایک مرتبہ درود بھیجے، اللہ اس پر دس رحمتیں نازل فرماتا ہے اور دس درجات بلند فرماتا ہے۔',
      fadilahEnglish: 'Whoever sends blessings upon me once, Allah sends ten blessings upon him and elevates him ten ranks.',
      hadithSource: 'Sunan an-Nasa\'i 1297 (Sahih)',
      category: 'SALAWAT',
    },
    {
      id: 'lahawla',
      arabicText: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
      urduTranslation: 'گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف اللہ کی توفیق سے ہے',
      englishTranslation: 'There is no might nor power except by Allah',
      targetCount: 100,
      fadilahUrdu: 'یہ کلمہ جنت کے خزانوں میں سے ایک قیمتی خزانہ ہے۔',
      fadilahEnglish: 'This is one of the precious treasures of the gardens of Paradise.',
      hadithSource: 'Sahih al-Bukhari 6384',
      category: 'GENERAL',
    },
  ];

  /**
   * Retrieves all authentic masnoon presets
   */
  public static getAllPresets(): TasbihPreset[] {
    return this.PRESETS;
  }

  /**
   * Finds preset by ID
   */
  public static getPresetById(presetId: string): TasbihPreset | undefined {
    return this.PRESETS.find(p => p.id === presetId);
  }

  /**
   * Increments count and determines if threshold (33, 100) or cycle completed
   */
  public static increment(state: TasbihSessionState): {
    nextState: TasbihSessionState;
    hapticType: 'NONE' | 'TICK' | 'THRESHOLD_REACHED' | 'CYCLE_COMPLETE';
  } {
    const preset = this.getPresetById(state.presetId);
    const target = preset ? preset.targetCount : 33;
    const nextCount = state.currentCount + 1;
    const nextTotal = state.totalCountsInSession + 1;

    let hapticType: 'NONE' | 'TICK' | 'THRESHOLD_REACHED' | 'CYCLE_COMPLETE' = 'TICK';

    if (nextCount >= target) {
      hapticType = 'CYCLE_COMPLETE';
      return {
        nextState: {
          presetId: state.presetId,
          currentCount: 0,
          roundsCompleted: state.roundsCompleted + 1,
          totalCountsInSession: nextTotal,
          isComplete: true,
        },
        hapticType,
      };
    }

    if (nextCount === 33 || nextCount === 66 || nextCount === 99) {
      hapticType = 'THRESHOLD_REACHED';
    }

    return {
      nextState: {
        presetId: state.presetId,
        currentCount: nextCount,
        roundsCompleted: state.roundsCompleted,
        totalCountsInSession: nextTotal,
        isComplete: false,
      },
      hapticType,
    };
  }

  /**
   * Resets counter for a preset
   */
  public static reset(presetId: string): TasbihSessionState {
    return {
      presetId,
      currentCount: 0,
      roundsCompleted: 0,
      totalCountsInSession: 0,
      isComplete: false,
    };
  }
}
export const masnoonTasbihEngine = new MasnoonTasbihEngine();
