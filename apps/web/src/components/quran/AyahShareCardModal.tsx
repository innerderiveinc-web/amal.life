import React, { useState, useRef, useEffect, useCallback } from 'react';
import { showAmalToast } from '../Toast';

export interface AyahShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  surahNameUrdu: string;
  ayahNumber: number;
  arabicText: string;
  urduTranslation: string;
  englishTranslation?: string;
}

export type CardAspect = 'POST' | 'STORY';
export type CardTheme = 'EMERALD_GOLD' | 'MIDNIGHT_VELVET' | 'PARCHMENT_CREAM';

interface ThemeConfig {
  bgGradient: [string, string];
  borderColor: string;
  accentGold: string;
  arabicColor: string;
  urduColor: string;
  englishColor: string;
  footerColor: string;
  dividerColor: string;
  isLight: boolean;
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  EMERALD_GOLD: {
    bgGradient: ['#064E3B', '#022C22'],
    borderColor: '#D97706',
    accentGold: '#F59E0B',
    arabicColor: '#FFFFFF',
    urduColor: '#FEF3C7',
    englishColor: '#A7F3D0',
    footerColor: 'rgba(255, 255, 255, 0.75)',
    dividerColor: 'rgba(245, 158, 11, 0.4)',
    isLight: false,
  },
  MIDNIGHT_VELVET: {
    bgGradient: ['#0F172A', '#020617'],
    borderColor: '#E2E8F0',
    accentGold: '#38BDF8',
    arabicColor: '#FFFFFF',
    urduColor: '#E2E8F0',
    englishColor: '#94A3B8',
    footerColor: 'rgba(255, 255, 255, 0.7)',
    dividerColor: 'rgba(56, 189, 248, 0.35)',
    isLight: false,
  },
  PARCHMENT_CREAM: {
    bgGradient: ['#FAF5EC', '#F4EDE0'],
    borderColor: '#065F46',
    accentGold: '#B45309',
    arabicColor: '#064E3B',
    urduColor: '#1E293B',
    englishColor: '#475569',
    footerColor: '#64748B',
    dividerColor: 'rgba(6, 95, 70, 0.25)',
    isLight: true,
  },
};

export const AyahShareCardModal: React.FC<AyahShareCardModalProps> = ({
  isOpen,
  onClose,
  surahNumber,
  surahNameArabic,
  surahNameEnglish,
  surahNameUrdu,
  ayahNumber,
  arabicText,
  urduTranslation,
  englishTranslation = '',
}) => {
  const [aspect, setAspect] = useState<CardAspect>('POST');
  const [theme, setTheme] = useState<CardTheme>('EMERALD_GOLD');
  const [includeEnglish, setIncludeEnglish] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Helper function to wrap text for canvas
  const wrapText = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      maxWidth: number
    ): string[] => {
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

  // Render the high-resolution canvas
  const renderCardToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions: 2x scale for ultra crisp text on Retina / mobile displays
    const width = 1080;
    const height = aspect === 'STORY' ? 1920 : 1080;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const t = THEMES[theme];

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, t.bgGradient[0]);
    bgGrad.addColorStop(1, t.bgGradient[1]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Sacred Background Pattern / Watermark
    ctx.save();
    ctx.strokeStyle = t.isLight ? 'rgba(6, 95, 70, 0.04)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let r = 100; r < Math.max(width, height); r += 140) {
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Double Outer Border with Decorative Margins
    const outerMargin = 40;
    const innerMargin = 52;
    ctx.strokeStyle = t.borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

    ctx.strokeStyle = t.dividerColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

    // 4. Corner Ornaments (Islamic 8-point stars / diamonds)
    const drawCornerOrnament = (cx: number, cy: number) => {
      ctx.save();
      ctx.fillStyle = t.accentGold;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = t.accentGold;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy);
      ctx.lineTo(cx + 14, cy);
      ctx.moveTo(cx, cy - 14);
      ctx.lineTo(cx, cy + 14);
      ctx.stroke();
      ctx.restore();
    };

    drawCornerOrnament(innerMargin, innerMargin);
    drawCornerOrnament(width - innerMargin, innerMargin);
    drawCornerOrnament(innerMargin, height - innerMargin);
    drawCornerOrnament(width - innerMargin, height - innerMargin);

    // 5. Header: Surah & Ayah Badge
    let cursorY = aspect === 'STORY' ? 160 : 120;

    // Header Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Bismillah Calligraphic Seal
    ctx.font = 'normal 24px "Amiri", "Traditional Arabic", serif';
    ctx.fillStyle = t.accentGold;
    ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', width / 2, cursorY);
    cursorY += 46;

    // Surah reference pill
    const refBadgeText = `سُورَةُ ${surahNameArabic} · ${surahNameEnglish} · آیت مبارکہ ${ayahNumber}`;
    ctx.font = 'bold 20px -apple-system, system-ui, sans-serif';
    ctx.fillStyle = t.accentGold;
    ctx.fillText(refBadgeText, width / 2, cursorY);
    cursorY += 34;

    // Decorative Underline
    ctx.strokeStyle = t.dividerColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, cursorY);
    ctx.lineTo(width / 2 + 120, cursorY);
    ctx.stroke();

    ctx.fillStyle = t.accentGold;
    ctx.font = 'bold 16px -apple-system, system-ui, sans-serif';
    ctx.fillText('✦ ۞ ✦', width / 2, cursorY);
    cursorY += (aspect === 'STORY' ? 80 : 50);

    // 6. Arabic Ayah Text
    const maxTextWidth = width - 180;
    // Dynamic font sizing based on length of Ayah
    const arabicWords = arabicText.split(' ').length;
    let arabicFontSize = 42;
    let arabicLineHeight = 84;
    if (arabicWords > 40) {
      arabicFontSize = 30;
      arabicLineHeight = 60;
    } else if (arabicWords > 25) {
      arabicFontSize = 35;
      arabicLineHeight = 70;
    }

    ctx.font = `500 ${arabicFontSize}px "Amiri", "Traditional Arabic", "Scheherazade New", serif`;
    ctx.fillStyle = t.arabicColor;
    ctx.direction = 'rtl';

    // Append verse end rosette to Arabic text
    const fullArabic = `${arabicText} ﴿${ayahNumber}﴾`;
    const arabicLines = wrapText(ctx, fullArabic, maxTextWidth);

    for (const line of arabicLines) {
      ctx.fillText(line, width / 2, cursorY);
      cursorY += arabicLineHeight;
    }

    cursorY += (aspect === 'STORY' ? 40 : 25);

    // 7. Middle Decorative Divider
    ctx.direction = 'ltr';
    ctx.strokeStyle = t.dividerColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 160, cursorY);
    ctx.lineTo(width / 2 + 160, cursorY);
    ctx.stroke();

    ctx.fillStyle = t.accentGold;
    ctx.font = 'bold 14px -apple-system, system-ui, sans-serif';
    ctx.fillText('۞', width / 2, cursorY);
    cursorY += 40;

    // 8. Urdu Translation: Verbatim Kanz-ul-Iman
    // Sub-heading
    ctx.font = 'bold 16px -apple-system, system-ui, sans-serif';
    ctx.fillStyle = t.accentGold;
    ctx.fillText('ترجمہ کنز الایمان فی ترجمۃ القرآن:', width / 2, cursorY);
    cursorY += 38;

    let urduFontSize = 26;
    let urduLineHeight = 54;
    if (urduTranslation.length > 200) {
      urduFontSize = 22;
      urduLineHeight = 44;
    }

    ctx.font = `normal ${urduFontSize}px "Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Amiri", serif`;
    ctx.fillStyle = t.urduColor;
    ctx.direction = 'rtl';

    const urduLines = wrapText(ctx, urduTranslation, maxTextWidth);
    for (const line of urduLines) {
      ctx.fillText(line, width / 2, cursorY);
      cursorY += urduLineHeight;
    }

    // 9. English Translation (if requested)
    if (includeEnglish && englishTranslation) {
      cursorY += (aspect === 'STORY' ? 40 : 25);
      ctx.direction = 'ltr';
      ctx.font = 'italic 18px Georgia, serif';
      ctx.fillStyle = t.englishColor;

      const engLines = wrapText(ctx, `"${englishTranslation}"`, maxTextWidth - 40);
      for (const line of engLines.slice(0, 4)) {
        ctx.fillText(line, width / 2, cursorY);
        cursorY += 30;
      }
    }

    // 10. Footer / Sovereign Watermark
    ctx.direction = 'ltr';
    const footerY = height - (outerMargin + 25);
    ctx.font = '600 16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = t.footerColor;
    ctx.fillText(`AMAL OS · amal.life · سُوْرَةُ ${surahNameArabic} (${surahNumber}:${ayahNumber})`, width / 2, footerY);

    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = t.isLight ? '#94A3B8' : 'rgba(255, 255, 255, 0.45)';
    ctx.fillText('صدقۂ جاریہ · Authentic Islamic Living OS', width / 2, footerY + 22);
  }, [aspect, theme, includeEnglish, surahNumber, surahNameArabic, surahNameEnglish, ayahNumber, arabicText, urduTranslation, englishTranslation, wrapText]);

  // Re-render canvas whenever settings change
  useEffect(() => {
    if (isOpen) {
      renderCardToCanvas();
    }
  }, [isOpen, renderCardToCanvas]);

  if (!isOpen) return null;

  // Handle Download PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `AMAL-Ayah-${surahNumber}-${ayahNumber}-${aspect.toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showAmalToast('Sacred Ayah Card downloaded successfully! (تصویر محفوظ ہو گئی)', 'success');
    } catch (err) {
      console.error(err);
      showAmalToast('Failed to export image.', 'warning');
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
          showAmalToast('Ayah Card copied to clipboard! Ready to paste into WhatsApp / Telegram.', 'success');
        } else {
          // Fallback to text copy
          await navigator.clipboard.writeText(`${arabicText}\n\n${urduTranslation}\n\n[Surah ${surahNameEnglish} ${surahNumber}:${ayahNumber} - AMAL OS]`);
          showAmalToast('Ayah text and citation copied to clipboard!', 'info');
        }
        setIsGenerating(false);
      }, 'image/png', 1.0);
    } catch (err) {
      console.error(err);
      // Fallback
      handleDownload();
    }
  };

  // Handle WhatsApp Share
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `📖 *${surahNameArabic} (${surahNameEnglish}) · آیت ${ayahNumber}*\n\n` +
      `*${arabicText}*\n\n` +
      `*ترجمہ کنز الایمان:*\n` +
      `${urduTranslation}\n\n` +
      (includeEnglish && englishTranslation ? `"${englishTranslation}"\n\n` : '') +
      `_مطالعہ فرمائیں: https://amal.life/quran?surah=${surahNumber}&ayah=${ayahNumber}_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Handle Copy Citation Text
  const handleCopyText = async () => {
    const text =
      `📖 ${surahNameArabic} (${surahNameEnglish}) · آیت ${ayahNumber}\n\n` +
      `${arabicText}\n\n` +
      `ترجمہ کنز الایمان:\n${urduTranslation}\n\n` +
      (includeEnglish && englishTranslation ? `English: "${englishTranslation}"\n\n` : '') +
      `AMAL OS (amal.life)`;
    await navigator.clipboard.writeText(text);
    showAmalToast('Ayah text and Kanz-ul-Iman translation copied!', 'success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
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
                Sacred Ayah Card Generator (مبارک قرآنی امیج کارڈ)
              </h2>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
                سورۃ {surahNameArabic} · آیت مبارکہ {ayahNumber} · کنز الایمان ترجمہ
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

        {/* Modal Content: Split View (Options on Left, Live Preview on Right) */}
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
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                2. SACRED THEME PRESET (مبارک رنگ و ہیئت):
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { id: 'EMERALD_GOLD', name: 'Emerald & Gold (زمردی و زریں)', desc: 'Royal prophetic green with fine gold calligraphy', preview: '#064E3B' },
                  { id: 'MIDNIGHT_VELVET', name: 'Midnight Velvet (شبینہ مخمل)', desc: 'Deep cosmic slate with celestial amber glow', preview: '#0F172A' },
                  { id: 'PARCHMENT_CREAM', name: 'Parchment & Emerald (قرطاسِ پاک)', desc: 'Warm manuscript parchment with deep green lettering', preview: '#FAF5EC' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id as CardTheme)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: theme === th.id ? '2px solid #064E3B' : '1px solid #E2E8F0',
                      backgroundColor: theme === th.id ? '#F0FDF4' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        backgroundColor: th.preview,
                        border: '1px solid rgba(0,0,0,0.15)',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{th.name}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{th.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle English */}
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
                <span>متن و کنز الایمان حوالہ کاپی کریں</span>
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
              Live High-Res Canvas Preview ({aspect === 'STORY' ? '1080×1920' : '1080×1080'})
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
              ✓ 100% Offline Client-Side Render • Verbatim Kanz-ul-Iman
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
