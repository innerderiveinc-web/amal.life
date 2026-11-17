import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { showAmalToast } from '../Toast';
import { drawUniversalContentCard } from './universal-canvas-renderer';

export type ContentCategory =
  | 'QURAN'
  | 'HADITH'
  | 'SHAMAIL'
  | 'TASAWWUF'
  | 'FIQH'
  | 'DUA'
  | 'SAHABIYYAT';

export const DEFAULT_CATEGORY_LABELS: Record<ContentCategory, { urdu: string; english: string }> = {
  QURAN: { urdu: 'قرآنِ کریم و حکمت', english: 'The Holy Quran' },
  HADITH: { urdu: 'حدیثِ مصطفیٰ ﷺ', english: 'Prophetic Hadith' },
  SHAMAIL: { urdu: 'شمائلِ مصطفیٰ ﷺ', english: 'Shama\'il al-Mustafa' },
  TASAWWUF: { urdu: 'تزکیہ و تصوف', english: 'Tazkiyah & Spiritual Wisdom' },
  FIQH: { urdu: 'احکامِ فقہ و شریعت', english: 'Sacred Islamic Fiqh' },
  DUA: { urdu: 'ادعیہ و ماثورہ اذکار', english: 'Prophetic Prayers & Adhkar' },
  SAHABIYYAT: { urdu: 'اسوۂ صحابیات و صالحات', english: 'Noble Sahabiyyat & Sacred Sisters' },
};

export interface UniversalCardPayload {
  category: ContentCategory;
  categoryLabelUrdu?: string;
  categoryLabelEnglish?: string;
  titleArabic?: string;
  titleUrdu: string;
  titleEnglish?: string;
  arabicText?: string;
  primaryTextUrdu: string;
  secondaryTextEnglish?: string;
  sourceCitation: string;
  badgeContext?: string;
  tafseerInsightUrdu?: string;
}

export interface UniversalContentShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: UniversalCardPayload | null;
}

export type CardAspect = 'POST' | 'STORY' | 'WALLPAPER';
export type CardColorTheme = 'PRIMARY' | 'NIGHT_VELVET' | 'PARCHMENT' | 'AMOLED_GOLD';

const UniversalContentShareModalInner: React.FC<UniversalContentShareModalProps> = ({
  isOpen,
  onClose,
  payload,
}) => {
  const { t } = useLanguage();
  const [aspect, setAspect] = useState<CardAspect>('POST');
  const [themeMode, setThemeMode] = useState<CardColorTheme>('PRIMARY');
  const [includeEnglish, setIncludeEnglish] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render high-resolution canvas using external renderer
  const renderCardToCanvas = useCallback(() => {
    if (!payload || !canvasRef.current) return;
    const url = drawUniversalContentCard(canvasRef.current, payload, aspect, themeMode, includeEnglish);
    if (url) {
      setPreviewImgUrl(url);
    }
  }, [aspect, themeMode, includeEnglish, payload]);

  // Re-render when open or configuration changes & when fonts are loaded
  useEffect(() => {
    if (isOpen && payload) {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.then(() => {
          renderCardToCanvas();
        });
      }
      renderCardToCanvas();
      const t = setTimeout(() => renderCardToCanvas(), 180);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(t);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, payload, renderCardToCanvas, onClose]);

  if (!isOpen || !payload) return null;

  const resolvedUrdu = payload.categoryLabelUrdu || DEFAULT_CATEGORY_LABELS[payload.category]?.urdu || 'اسلامی حکمت';
  const resolvedEnglish = payload.categoryLabelEnglish || DEFAULT_CATEGORY_LABELS[payload.category]?.english || 'Sacred Islamic Wisdom';

  // Bulletproof Universal Download PNG (Works on iOS, Android, Desktop)
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    const cleanTitle = (payload.titleEnglish || payload.category).toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `AMAL-${payload.category.toLowerCase()}-${cleanTitle}-${aspect.toLowerCase()}.png`;

    try {
      // 1. Mobile Web Share API support (iOS/Android native share & save to photos)
      if (typeof navigator !== 'undefined' && navigator.canShare && canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], filename, { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  files: [file],
                  title: `${resolvedUrdu} · ${payload.titleUrdu}`,
                  text: `${payload.titleUrdu} — AMAL OS`,
                });
                showAmalToast(t('Sacred Card shared successfully!', 'کارڈ کامیابی سے شیئر کر دیا گیا!', 'تمت مشاركة البطاقة بنجاح!', 'Card share ho gaya!'), 'success');
                setIsGenerating(false);
                return;
              } catch (e: any) {
                if (e?.name === 'AbortError') {
                  setIsGenerating(false);
                  return;
                }
              }
            }
          }

          // 2. Blob URL download (works reliably on Chrome, Edge, Firefox, Android)
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = filename;
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(blobUrl);
            }, 150);
            showAmalToast(t('Sacred Card downloaded successfully!', 'کارڈ تصویر کامیابی سے محفوظ ہو گئی!', 'تم حفظ البطاقة بنجاح!', 'Card download ho gaya!'), 'success');
            setIsGenerating(false);
          } else {
            fallbackDataUrlDownload();
          }
        }, 'image/png', 1.0);
      } else {
        fallbackDataUrlDownload();
      }
    } catch (err) {
      console.error(err);
      fallbackDataUrlDownload();
    }
  };

  const fallbackDataUrlDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }
    const cleanTitle = (payload.titleEnglish || payload.category).toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `AMAL-${payload.category.toLowerCase()}-${cleanTitle}-${aspect.toLowerCase()}.png`;
    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 150);
      showAmalToast(t('Sacred Card downloaded!', 'کارڈ تصویر کامیابی سے محفوظ ہو گئی!', 'تم حفظ البطاقة بنجاح!', 'Sacred Card download ho gaya!'), 'success');
    } catch {
      showAmalToast(t('Please long-press the card image to save.', 'براہ کرم کارڈ پر لانگ پریس کر کے محفوظ فرمائیں۔', 'يرجى الضغط مطولاً على الصورة لحفظها.', 'Card par long-press kar ke save karein.'), 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Copy Image to Clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Blob generation failed');
        if (typeof navigator !== 'undefined' && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new window.ClipboardItem({ 'image/png': blob }),
          ]);
          showAmalToast(t('Card copied to clipboard! Ready to paste.', 'کارڈ کلپ بورڈ پر کاپی ہو گیا! پیسٹ کے لیے تیار ہے۔', 'تم نسخ البطاقة إلى الحافظة!', 'Card copy ho gaya!'), 'success');
        } else {
          // Fallback to text copy
          await navigator.clipboard.writeText(
            `${payload.titleUrdu}\n\n${payload.arabicText ? `${payload.arabicText}\n\n` : ''}${payload.primaryTextUrdu}\n\n[ماخذ: ${payload.sourceCitation} — AMAL OS (amal.life)]`
          );
          showAmalToast(t('Text and citation copied to clipboard!', 'متن اور حوالہ کلپ بورڈ پر کاپی ہو گیا!', 'تم نسخ النص والسند إلى الحافظة!', 'Matn aur sanad copy ho gayi!'), 'info');
        }
        setIsGenerating(false);
      }, 'image/png', 1.0);
    } catch {
      handleDownload();
    }
  };

  // Handle WhatsApp Share
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ *${resolvedUrdu} · ${payload.titleUrdu}*\n\n` +
      (payload.arabicText ? `*${payload.arabicText}*\n\n` : '') +
      `*مفہوم و ترجمہ:*\n${payload.primaryTextUrdu}\n\n` +
      (includeEnglish && payload.secondaryTextEnglish ? `"${payload.secondaryTextEnglish}"\n\n` : '') +
      (payload.tafseerInsightUrdu ? `💡 *تفسیری بصیرت:* ${payload.tafseerInsightUrdu}\n\n` : '') +
      `📖 *سند و ماخذ:* ${payload.sourceCitation}\n\n` +
      `_مطالعہ فرمائیں: https://amal.life_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Handle Copy Citation Text
  const handleCopyText = async () => {
    const text =
      `✨ ${resolvedUrdu} · ${payload.titleUrdu}\n\n` +
      (payload.arabicText ? `${payload.arabicText}\n\n` : '') +
      `${payload.primaryTextUrdu}\n\n` +
      (includeEnglish && payload.secondaryTextEnglish ? `English: "${payload.secondaryTextEnglish}"\n\n` : '') +
      (payload.tafseerInsightUrdu ? `تفسیری بصیرت: ${payload.tafseerInsightUrdu}\n\n` : '') +
      `سند و ماخذ: ${payload.sourceCitation}\n` +
      `AMAL OS (amal.life)`;
    await navigator.clipboard.writeText(text);
    showAmalToast(t('Content and citation copied to clipboard!', 'متن اور حوالہ کلپ بورڈ پر کاپی ہو گیا!', 'تم نسخ المحتوى والسند إلى الحافظة!', 'Matn aur hawala copy ho gaya!'), 'success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          maxWidth: 960,
          width: '100%',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>📸</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>
                Universal Sacred Content Card Studio
              </h2>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
                {resolvedUrdu} · {payload.titleUrdu} · سند: {payload.sourceCitation}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '50%',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content: Split View */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            overflowY: 'auto',
            padding: 24,
            gap: 24,
          }}
        >
          {/* Controls Column */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Format Selection */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 800, color: '#334155', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>
                1. FORMAT &amp; ASPECT RATIO (سائز و تناسب):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setAspect('POST')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: 10,
                    border: aspect === 'POST' ? '2px solid #064E3B' : '1px solid #CBD5E1',
                    backgroundColor: aspect === 'POST' ? '#ECFDF5' : '#F8FAFC',
                    color: aspect === 'POST' ? '#064E3B' : '#475569',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 18 }}>⏹️</span>
                  <span>{t('Square (1:1)', 'مربع (۱:۱)', 'منشور مربع', 'Square (1:1)')}</span>
                  <span style={{ fontSize: 10, opacity: 0.75 }}>{t('Feed & DP', 'پوسٹ و ڈی پی', 'تغذية', 'Post & DP')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspect('STORY')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: 10,
                    border: aspect === 'STORY' ? '2px solid #064E3B' : '1px solid #CBD5E1',
                    backgroundColor: aspect === 'STORY' ? '#ECFDF5' : '#F8FAFC',
                    color: aspect === 'STORY' ? '#064E3B' : '#475569',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 18 }}>📱</span>
                  <span>{t('Story (9:16)', 'اسٹوری (۹:۱۶)', 'قصة رأسية', 'Story (9:16)')}</span>
                  <span style={{ fontSize: 10, opacity: 0.75 }}>{t('WhatsApp Status', 'واٹس ایپ اسٹیٹس', 'واتساب', 'Status & Story')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspect('WALLPAPER')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: 10,
                    border: aspect === 'WALLPAPER' ? '2px solid #064E3B' : '1px solid #CBD5E1',
                    backgroundColor: aspect === 'WALLPAPER' ? '#ECFDF5' : '#F8FAFC',
                    color: aspect === 'WALLPAPER' ? '#064E3B' : '#475569',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 18 }}>🖼️</span>
                  <span>{t('Wallpaper (9:20)', 'وال پیپر (۹:۲۰)', 'خلفية الجوال', 'Wallpaper')}</span>
                  <span style={{ fontSize: 10, opacity: 0.75 }}>{t('Lock Screen HD', 'لاک اسکرین ایچ ڈی', 'قفل الشاشة', 'Lockscreen HD')}</span>
                </button>
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 800, color: '#334155', display: 'block', marginBottom: 8, letterSpacing: 0.5 }}>
                2. THEME PRESET (مبارک تھیم):
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { id: 'PRIMARY', name: 'Signature Sacred (اصلی مبارک رنگ)', desc: 'Category-specific canonical color harmony' },
                  { id: 'NIGHT_VELVET', name: 'Midnight Velvet (شبینہ مخمل)', desc: 'Deep cosmic slate with celestial highlights' },
                  { id: 'PARCHMENT', name: 'Antique Manuscript (قرطاسِ کہن)', desc: 'Warm scholarly parchment with dark ink' },
                  { id: 'AMOLED_GOLD', name: 'Pure AMOLED Gold (سیاہ و طلائی وال پیپر)', desc: 'Deep OLED black with luminous gold typography' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setThemeMode(th.id as CardColorTheme)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: themeMode === th.id ? '2px solid #064E3B' : '1px solid #E2E8F0',
                      backgroundColor: themeMode === th.id ? '#F0FDF4' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{th.name}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{th.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* English Toggle */}
            {payload.secondaryTextEnglish && (
              <div style={{ padding: '12px 14px', borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                    Include English Translation
                  </span>
                  <input
                    type="checkbox"
                    checked={includeEnglish}
                    onChange={(e) => setIncludeEnglish(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#064E3B', cursor: 'pointer' }}
                  />
                </label>
              </div>
            )}

            {/* Actions Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isGenerating}
                style={{
                  padding: '14px 20px',
                  borderRadius: 12,
                  backgroundColor: '#064E3B',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(6, 78, 59, 0.3)',
                }}
              >
                <span>📥</span>
                <span>{t('Download Image (PNG)', 'تصویر ڈاؤن لوڈ کریں', 'تحميل الصورة بصيغة PNG', 'Image Download Karein (PNG)')}</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <button
                  type="button"
                  onClick={handleCopyImage}
                  disabled={isGenerating}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    backgroundColor: '#F0FDF4',
                    color: '#065F46',
                    border: '1px solid #A7F3D0',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <span>📋</span>
                  <span>{t('Copy Image', 'تصویر کاپی کریں', 'نسخ الصورة', 'Image Copy Karein')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    backgroundColor: '#075E54',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <span>💬</span>
                  <span>{t('Share WhatsApp', 'واٹس ایپ شیئر', 'مشاركة واتساب', 'WhatsApp Share')}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyText}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  backgroundColor: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <span>🔗</span>
                <span>{t('Copy Text & Citation', 'متن و مکمل سند کاپی کریں', 'نسخ النص والسند كاملاً', 'Matn o Sanad Copy Karein')}</span>
              </button>
            </div>
          </div>

          {/* Live Preview Column */}
          <div
            style={{
              flex: '1 1 400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F1F5F9',
              borderRadius: 14,
              padding: 16,
              minHeight: 460,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Live High-Res Preview ({aspect === 'STORY' ? '1080×1920' : '1080×1080'})
            </div>

            <div
              style={{
                width: '100%',
                maxWidth: aspect === 'STORY' ? 260 : 380,
                aspectRatio: aspect === 'STORY' ? '9 / 16' : '1 / 1',
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.25)',
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0F172A',
              }}
            >
              {previewImgUrl ? (
                <img
                  src={previewImgUrl}
                  alt="Sacred Content Card Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              ) : null}
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: previewImgUrl ? 'none' : 'block',
                }}
              />
            </div>

            <div style={{ fontSize: 11, color: '#64748B', marginTop: 12, textAlign: 'center' }}>
              ✓ 100% Offline HD Card • موبائل پر کارڈ محفوظ کرنے کے لیے لانگ پریس کریں
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UniversalContentShareModal = memo(UniversalContentShareModalInner);
