import React, { useState, useRef, useEffect, useCallback } from 'react';
import { showAmalToast } from '../Toast';

export type ContentCategory =
  | 'QURAN'
  | 'HADITH'
  | 'SHAMAIL'
  | 'TASAWWUF'
  | 'FIQH'
  | 'DUA';

export const DEFAULT_CATEGORY_LABELS: Record<ContentCategory, { urdu: string; english: string }> = {
  QURAN: { urdu: 'قرآنِ کریم و حکمت', english: 'The Holy Quran' },
  HADITH: { urdu: 'حدیثِ مصطفیٰ ﷺ', english: 'Prophetic Hadith' },
  SHAMAIL: { urdu: 'شمائلِ مصطفیٰ ﷺ', english: 'Shama\'il al-Mustafa' },
  TASAWWUF: { urdu: 'تزکیہ و تصوف', english: 'Tazkiyah & Spiritual Wisdom' },
  FIQH: { urdu: 'احکامِ فقہ و شریعت', english: 'Sacred Islamic Fiqh' },
  DUA: { urdu: 'ادعیہ و ماثورہ اذکار', english: 'Prophetic Prayers & Adhkar' },
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

export type CardAspect = 'POST' | 'STORY';
export type CardColorTheme = 'PRIMARY' | 'NIGHT_VELVET' | 'PARCHMENT';

interface ThemePreset {
  bgGradient: [string, string];
  borderColor: string;
  accentColor: string;
  textColor: string;
  secondaryTextColor: string;
  citationColor: string;
  badgeBg: string;
  badgeText: string;
  isLight: boolean;
}

// Category-specific aesthetic configurations
const CATEGORY_STYLES: Record<ContentCategory, { defaultTheme: ThemePreset; sealText: string }> = {
  SHAMAIL: {
    defaultTheme: {
      bgGradient: ['#064E3B', '#022C22'],
      borderColor: '#F43F5E',
      accentColor: '#F59E0B',
      textColor: '#FFFFFF',
      secondaryTextColor: '#FFE4E6',
      citationColor: '#FCD34D',
      badgeBg: 'rgba(244, 63, 94, 0.2)',
      badgeText: '#FECDD3',
      isLight: false,
    },
    sealText: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
  },
  HADITH: {
    defaultTheme: {
      bgGradient: ['#0F172A', '#1E3A8A'],
      borderColor: '#38BDF8',
      accentColor: '#F59E0B',
      textColor: '#FFFFFF',
      secondaryTextColor: '#E2E8F0',
      citationColor: '#FDE68A',
      badgeBg: 'rgba(56, 189, 248, 0.2)',
      badgeText: '#BAE6FD',
      isLight: false,
    },
    sealText: 'قَالَ رَسُولُ اللَّهِ ﷺ',
  },
  TASAWWUF: {
    defaultTheme: {
      bgGradient: ['#FAF5EC', '#EFE6D5'],
      borderColor: '#92400E',
      accentColor: '#B45309',
      textColor: '#1E293B',
      secondaryTextColor: '#475569',
      citationColor: '#92400E',
      badgeBg: 'rgba(180, 83, 9, 0.15)',
      badgeText: '#78350F',
      isLight: true,
    },
    sealText: 'حِكْمَةٌ وَتَزْكِيَةُ النَّفْسِ',
  },
  FIQH: {
    defaultTheme: {
      bgGradient: ['#064E3B', '#043428'],
      borderColor: '#34D399',
      accentColor: '#FCD34D',
      textColor: '#FFFFFF',
      secondaryTextColor: '#DCFCE7',
      citationColor: '#FDE68A',
      badgeBg: 'rgba(52, 211, 153, 0.2)',
      badgeText: '#A7F3D0',
      isLight: false,
    },
    sealText: 'أَحْكَامُ الشَّرِيعَةِ وَالْفِقْهِ',
  },
  DUA: {
    defaultTheme: {
      bgGradient: ['#0B132B', '#1C2541'],
      borderColor: '#10B981',
      accentColor: '#F59E0B',
      textColor: '#FFFFFF',
      secondaryTextColor: '#A7F3D0',
      citationColor: '#FDE68A',
      badgeBg: 'rgba(16, 185, 129, 0.2)',
      badgeText: '#6EE7B7',
      isLight: false,
    },
    sealText: 'دُعَاءٌ مَسْنُونٌ وَحِفَاظَةٌ',
  },
  QURAN: {
    defaultTheme: {
      bgGradient: ['#064E3B', '#022C22'],
      borderColor: '#D97706',
      accentColor: '#F59E0B',
      textColor: '#FFFFFF',
      secondaryTextColor: '#FEF3C7',
      citationColor: '#FDE68A',
      badgeBg: 'rgba(217, 119, 6, 0.2)',
      badgeText: '#FDE68A',
      isLight: false,
    },
    sealText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  },
};

export const UniversalContentShareModal: React.FC<UniversalContentShareModalProps> = ({
  isOpen,
  onClose,
  payload,
}) => {
  const [aspect, setAspect] = useState<CardAspect>('POST');
  const [themeMode, setThemeMode] = useState<CardColorTheme>('PRIMARY');
  const [includeEnglish, setIncludeEnglish] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Helper function to wrap text for canvas
  const wrapText = useCallback(
    (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i] || '';
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    },
    []
  );

  // Render high-resolution canvas
  const renderCardToCanvas = useCallback(() => {
    if (!payload) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1080;
    const height = aspect === 'STORY' ? 1920 : 1080;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const catStyle = CATEGORY_STYLES[payload.category] || CATEGORY_STYLES.HADITH;
    let t = catStyle.defaultTheme;

    // Apply alternate theme mode if selected
    if (themeMode === 'NIGHT_VELVET') {
      t = {
        bgGradient: ['#0F172A', '#020617'],
        borderColor: '#E2E8F0',
        accentColor: '#38BDF8',
        textColor: '#FFFFFF',
        secondaryTextColor: '#CBD5E1',
        citationColor: '#93C5FD',
        badgeBg: 'rgba(56, 189, 248, 0.2)',
        badgeText: '#BAE6FD',
        isLight: false,
      };
    } else if (themeMode === 'PARCHMENT') {
      t = {
        bgGradient: ['#FAF5EC', '#EFE6D5'],
        borderColor: '#064E3B',
        accentColor: '#B45309',
        textColor: '#1E293B',
        secondaryTextColor: '#475569',
        citationColor: '#064E3B',
        badgeBg: 'rgba(6, 78, 59, 0.12)',
        badgeText: '#064E3B',
        isLight: true,
      };
    }

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, t.bgGradient[0]);
    bgGrad.addColorStop(1, t.bgGradient[1]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Geometric / Circular Watermark
    ctx.save();
    ctx.strokeStyle = t.isLight ? 'rgba(6, 78, 59, 0.04)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let r = 120; r < Math.max(width, height); r += 160) {
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Double Outer Border
    const outerMargin = 40;
    const innerMargin = 52;
    ctx.strokeStyle = t.borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

    ctx.strokeStyle = t.isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

    // 4. Corner Ornaments (Islamic Stars)
    const drawCorner = (cx: number, cy: number) => {
      ctx.save();
      ctx.fillStyle = t.accentColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = t.accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy);
      ctx.lineTo(cx + 14, cy);
      ctx.moveTo(cx, cy - 14);
      ctx.lineTo(cx, cy + 14);
      ctx.stroke();
      ctx.restore();
    };

    drawCorner(innerMargin, innerMargin);
    drawCorner(width - innerMargin, innerMargin);
    drawCorner(innerMargin, height - innerMargin);
    drawCorner(width - innerMargin, height - innerMargin);

    // 5. Header: Category Seal & Title
    let cursorY = aspect === 'STORY' ? 170 : 130;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top Category Seal Calligraphy
    ctx.font = 'normal 26px "Amiri", "Traditional Arabic", serif';
    ctx.fillStyle = t.accentColor;
    ctx.fillText(catStyle.sealText, width / 2, cursorY);
    cursorY += 46;

    // Category & Context Badge
    const catUrdu = payload.categoryLabelUrdu || DEFAULT_CATEGORY_LABELS[payload.category]?.urdu || 'اسلامی حکمت';
    const catEnglish = payload.categoryLabelEnglish || DEFAULT_CATEGORY_LABELS[payload.category]?.english || 'Sacred Islamic Wisdom';

    const badgeText = payload.badgeContext
      ? `${catUrdu} · ${payload.badgeContext}`
      : `${catUrdu} · ${catEnglish}`;
    ctx.font = 'bold 20px -apple-system, system-ui, sans-serif';
    ctx.fillStyle = t.accentColor;
    ctx.fillText(badgeText, width / 2, cursorY);
    cursorY += 34;

    // Divider Line
    ctx.strokeStyle = t.isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 130, cursorY);
    ctx.lineTo(width / 2 + 130, cursorY);
    ctx.stroke();

    ctx.fillStyle = t.accentColor;
    ctx.font = 'bold 15px -apple-system, system-ui, sans-serif';
    ctx.fillText('✦ ۞ ✦', width / 2, cursorY);
    cursorY += aspect === 'STORY' ? 70 : 45;

    const maxTextWidth = width - 180;

    // 6. Arabic Text (if present)
    if (payload.arabicText) {
      const arabicWords = payload.arabicText.split(' ').length;
      let arabicFontSize = 38;
      let arabicLineHeight = 76;
      if (arabicWords > 30) {
        arabicFontSize = 28;
        arabicLineHeight = 58;
      } else if (arabicWords > 18) {
        arabicFontSize = 32;
        arabicLineHeight = 64;
      }

      ctx.font = `500 ${arabicFontSize}px "Amiri", "Traditional Arabic", "Scheherazade New", serif`;
      ctx.fillStyle = t.textColor;
      ctx.direction = 'rtl';

      const arabicLines = wrapText(ctx, payload.arabicText, maxTextWidth);
      for (const line of arabicLines) {
        ctx.fillText(line, width / 2, cursorY);
        cursorY += arabicLineHeight;
      }

      cursorY += aspect === 'STORY' ? 36 : 24;

      // Small central diamond
      ctx.direction = 'ltr';
      ctx.fillStyle = t.accentColor;
      ctx.font = 'bold 14px -apple-system, system-ui, sans-serif';
      ctx.fillText('۞', width / 2, cursorY);
      cursorY += 34;
    }

    // 7. Title Heading (Urdu)
    if (payload.titleUrdu) {
      ctx.font = 'bold 22px "Noto Nastaliq Urdu", -apple-system, sans-serif';
      ctx.fillStyle = t.accentColor;
      ctx.direction = 'rtl';
      ctx.fillText(payload.titleUrdu, width / 2, cursorY);
      cursorY += 46;
    }

    // 8. Primary Urdu Text (Verbatim Translation / Excerpt)
    let urduFontSize = 26;
    let urduLineHeight = 54;
    if (payload.primaryTextUrdu.length > 250) {
      urduFontSize = 21;
      urduLineHeight = 44;
    } else if (payload.primaryTextUrdu.length > 150) {
      urduFontSize = 23;
      urduLineHeight = 48;
    }

    ctx.font = `normal ${urduFontSize}px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Amiri", serif`;
    ctx.fillStyle = t.secondaryTextColor;
    ctx.direction = 'rtl';

    const urduLines = wrapText(ctx, payload.primaryTextUrdu, maxTextWidth);
    for (const line of urduLines) {
      ctx.fillText(line, width / 2, cursorY);
      cursorY += urduLineHeight;
    }

    // 9. Secondary English Text (if requested and present)
    if (includeEnglish && payload.secondaryTextEnglish) {
      cursorY += aspect === 'STORY' ? 36 : 24;
      ctx.direction = 'ltr';
      ctx.font = 'italic 18px Georgia, serif';
      ctx.fillStyle = t.isLight ? '#475569' : '#CBD5E1';

      const engLines = wrapText(ctx, `"${payload.secondaryTextEnglish}"`, maxTextWidth - 40);
      for (const line of engLines.slice(0, 4)) {
        ctx.fillText(line, width / 2, cursorY);
        cursorY += 30;
      }
    }

    // 10. Source Citation Pill
    cursorY += aspect === 'STORY' ? 40 : 25;
    ctx.direction = 'ltr';
    ctx.font = 'bold 16px -apple-system, system-ui, sans-serif';
    ctx.fillStyle = t.citationColor;
    ctx.fillText(`[ سند و ماخذ: ${payload.sourceCitation} ]`, width / 2, cursorY);

    // 11. Footer Watermark
    ctx.direction = 'ltr';
    const footerY = height - (outerMargin + 25);
    ctx.font = '600 16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = t.isLight ? '#64748B' : 'rgba(255, 255, 255, 0.75)';
    ctx.fillText(`AMAL OS · amal.life · ${catEnglish} Series`, width / 2, footerY);

    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = t.isLight ? '#94A3B8' : 'rgba(255, 255, 255, 0.45)';
    ctx.fillText('صدقۂ جاریہ · Authentic Islamic Living OS', width / 2, footerY + 22);
  }, [aspect, themeMode, includeEnglish, payload, wrapText]);

  // Re-render when open or configuration changes
  useEffect(() => {
    if (isOpen && payload) {
      renderCardToCanvas();
    }
  }, [isOpen, payload, renderCardToCanvas]);

  if (!isOpen || !payload) return null;

  const resolvedUrdu = payload.categoryLabelUrdu || DEFAULT_CATEGORY_LABELS[payload.category]?.urdu || 'اسلامی حکمت';
  const resolvedEnglish = payload.categoryLabelEnglish || DEFAULT_CATEGORY_LABELS[payload.category]?.english || 'Sacred Islamic Wisdom';

  // Handle Download PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const cleanTitle = (payload.titleEnglish || payload.category).toLowerCase().replace(/[^a-z0-9]/g, '-');
      link.download = `AMAL-${payload.category.toLowerCase()}-${cleanTitle}-${aspect.toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showAmalToast('Sacred Card downloaded successfully! (تصویر محفوظ ہو گئی)', 'success');
    } catch (err) {
      console.error(err);
      showAmalToast('Failed to export card image.', 'warning');
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
        if (typeof navigator !== 'undefined' && navigator.clipboard && (window as any).ClipboardItem) {
          await navigator.clipboard.write([
            new (window as any).ClipboardItem({ 'image/png': blob }),
          ]);
          showAmalToast('Card copied to clipboard! Ready to paste into WhatsApp / Telegram.', 'success');
        } else {
          // Fallback to text copy
          await navigator.clipboard.writeText(
            `${payload.titleUrdu}\n\n${payload.arabicText ? `${payload.arabicText}\n\n` : ''}${payload.primaryTextUrdu}\n\n[ماخذ: ${payload.sourceCitation} — AMAL OS (amal.life)]`
          );
          showAmalToast('Text and citation copied to clipboard!', 'info');
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
    showAmalToast('Content and citation copied to clipboard!', 'success');
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setAspect('POST')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: aspect === 'POST' ? '2px solid #064E3B' : '1px solid #CBD5E1',
                    backgroundColor: aspect === 'POST' ? '#ECFDF5' : '#F8FAFC',
                    color: aspect === 'POST' ? '#064E3B' : '#475569',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 18 }}>⏹️</span>
                  <span>Square Post (1:1)</span>
                  <span style={{ fontSize: 10, opacity: 0.75 }}>Instagram &amp; Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspect('STORY')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: aspect === 'STORY' ? '2px solid #064E3B' : '1px solid #CBD5E1',
                    backgroundColor: aspect === 'STORY' ? '#ECFDF5' : '#F8FAFC',
                    color: aspect === 'STORY' ? '#064E3B' : '#475569',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 18 }}>📱</span>
                  <span>Vertical Story (9:16)</span>
                  <span style={{ fontSize: 10, opacity: 0.75 }}>WhatsApp &amp; Stories</span>
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
                <span>تصویر ڈاؤن لوڈ کریں (Download PNG)</span>
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
                  <span>کاپی امیج</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    backgroundColor: '#25D366',
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
                  <span>واٹس ایپ شیئر</span>
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
                <span>متن و مکمل سند کاپی کریں</span>
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
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, textAlign: 'center' }}>
              ✓ 100% Offline Client-Side Render • Authentic Classical Citation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
