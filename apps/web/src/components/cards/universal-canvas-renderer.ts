import { ContentCategory, DEFAULT_CATEGORY_LABELS, UniversalCardPayload, CardAspect, CardColorTheme } from './UniversalContentShareModal';

export interface ThemePreset {
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
export const CATEGORY_STYLES: Record<ContentCategory, { defaultTheme: ThemePreset; sealText: string }> = {
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
  SAHABIYYAT: {
    defaultTheme: {
      bgGradient: ['#831843', '#064E3B'],
      borderColor: '#F472B6',
      accentColor: '#F59E0B',
      textColor: '#FFFFFF',
      secondaryTextColor: '#FCE7F3',
      citationColor: '#FDE68A',
      badgeBg: 'rgba(244, 114, 182, 0.25)',
      badgeText: '#FBCFE8',
      isLight: false,
    },
    sealText: 'رَضِيَ اللَّهُ عَنْهُنَّ',
  },
};

export function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const words = String(text).split(/\s+/);
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
}

export function drawUniversalContentCard(
  canvas: HTMLCanvasElement,
  payload: UniversalCardPayload,
  aspect: CardAspect,
  themeMode: CardColorTheme,
  includeEnglish: boolean
): string | null {
  const width = 1080;
  const height = aspect === 'STORY' ? 1920 : 1080;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

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

    const arabicLines = wrapCanvasText(ctx, payload.arabicText, maxTextWidth);
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

  const urduLines = wrapCanvasText(ctx, payload.primaryTextUrdu, maxTextWidth);
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

    const engLines = wrapCanvasText(ctx, `"${payload.secondaryTextEnglish}"`, maxTextWidth - 40);
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

  try {
    return canvas.toDataURL('image/png', 0.95);
  } catch {
    return null;
  }
}
