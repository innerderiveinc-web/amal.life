import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { showAmalToast } from './Toast';
import { useLanguage } from '../context/LanguageContext';

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

const DEFAULT_BELOVED_BOOKMARKS: SavedBookmarkItem[] = [
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

interface BookmarksQuickDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksQuickDrawer: React.FC<BookmarksQuickDrawerProps> = ({ isOpen, onClose }) => {
  const { t, isUrdu } = useLanguage();
  const [bookmarks, setBookmarks] = useState<SavedBookmarkItem[]>(DEFAULT_BELOVED_BOOKMARKS);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'DUA' | 'AYAH' | 'ADHKAR'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { playTrack } = useAudioPlayer();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('amal_saved_bookmarks');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBookmarks(parsed);
          }
        }
      } catch {
        // Fallback to default
      }
    }
  }, []);

  const handleCopyText = (text: string, title: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showAmalToast(`محفوظ متن کاپی ہوا: ${title}`);
    }
  };

  const handlePlayBookmark = (bm: SavedBookmarkItem) => {
    if (!bm.audioUrl) return;
    playTrack({
      id: bm.id,
      title: bm.titleUrdu,
      subtitle: bm.citation,
      audioUrl: bm.audioUrl,
      reciter: bm.reciter || 'Masnoon Recitation',
      arabicSnippet: bm.arabicText,
    });
  };

  const filteredBookmarks = bookmarks.filter((bm) => {
    const matchesCategory = activeCategory === 'ALL' || bm.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      bm.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.arabicText.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(5, 20, 15, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="drawer-slide-in"
        style={{
          width: '100%',
          maxWidth: 480,
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>⭐</span>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: -0.2 }}>
                {t('Saved Invocations & Duas', 'محفوظ معمولات و دعائیں')}
              </h3>
              <div style={{ fontSize: 12, color: '#A7F3D0', marginTop: 2 }}>
                {t('Classical Prophetic Duas & Adhkar', 'مسنون دعائیں اور قرآنی معمولات')}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>

        {/* Search & Category Pills */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search saved duas (e.g. Ayat al-Kursi, Istighfar)...', 'تلاش کریں (مثلاً: آیت الکرسی، استغفار، نیند)...')}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #CBD5E1',
              fontSize: 13,
              outline: 'none',
              marginBottom: 12,
              backgroundColor: '#FFFFFF',
            }}
          />

          <div style={{ display: 'flex', gap: 6 }}>
            {(['ALL', 'DUA', 'AYAH', 'ADHKAR'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  border: 'none',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeCategory === cat ? '#064E3B' : '#E2E8F0',
                  color: activeCategory === cat ? '#FFFFFF' : '#475569',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat === 'ALL'
                  ? t('All', 'سبھی')
                  : cat === 'DUA'
                  ? t('Duas', 'دعائیں')
                  : cat === 'AYAH'
                  ? t('Ayahs', 'آیات')
                  : t('Adhkar', 'اذکار')}
              </button>
            ))}
          </div>
        </div>

        {/* Bookmarks List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredBookmarks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📿</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t('No saved duas found', 'کوئی محفوظ دعا نہیں ملی')}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>{t('Change search filter or add a new bookmark', 'تلاش تبدیل کریں یا نئی دعا شامل کریں')}</div>
            </div>
          ) : (
            filteredBookmarks.map((bm) => (
              <div
                key={bm.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.4 }}>
                      {isUrdu ? bm.titleUrdu : bm.titleEnglish}
                    </h4>
                    <span style={{ fontSize: 11, color: '#64748B' }}>
                      {isUrdu ? bm.titleEnglish : (bm.titleUrdu || '')}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      padding: '2px 8px',
                      borderRadius: 12,
                      border: '1px solid #A7F3D0',
                    }}
                  >
                    {bm.category}
                  </span>
                </div>

                {/* Arabic Matn */}
                <div
                  className="font-arabic"
                  style={{
                    fontSize: 15,
                    color: '#064E3B',
                    backgroundColor: '#F8FAFC',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #E2E8F0',
                    lineHeight: 1.9,
                  }}
                >
                  {bm.arabicText}
                </div>

                {/* Urdu Translation */}
                <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.6 }}>
                  {bm.translationUrdu}
                </div>

                {/* Citation & Action Controls */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 4,
                    paddingTop: 8,
                    borderTop: '1px solid #F1F5F9',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>
                    {bm.citation}
                  </span>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => handleCopyText(`${bm.arabicText}\n\n${bm.translationUrdu}\n[${bm.citation}]`, bm.titleUrdu)}
                      style={{
                        background: '#F1F5F9',
                        border: 'none',
                        borderRadius: 6,
                        padding: '4px 8px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#475569',
                        cursor: 'pointer',
                      }}
                      title="کاپی کریں"
                    >
                      📋 کاپی
                    </button>

                    {bm.audioUrl && (
                      <button
                        onClick={() => handlePlayBookmark(bm)}
                        style={{
                          backgroundColor: '#064E3B',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: 6,
                          padding: '4px 10px',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <span>▶</span>
                        <span>سنیں</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            fontSize: 11,
            color: '#64748B',
            textAlign: 'center',
          }}
        >
          🔒 دعائیں آپ کے براؤزر کے لوکل سٹوریج میں محفوظ رہتی ہیں · Zero Cloud Upload
        </div>
      </div>
    </div>
  );
};
