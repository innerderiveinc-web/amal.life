/**
 * AMAL OS - Senior & Quran Reader Mode Engine
 * 
 * Provides accessibility and comfort controls:
 * 1. Font Size Multipliers (Normal, Large, Extra Large for Elders)
 * 2. Script Presets (Indo-Pak Nastaliq, Uthmani Madani, Standard Naskh)
 * 3. Color Comfort Profiles (Clean Day, Warm Eye-Care Sepia, OLED Night)
 */

export type FontSizeLevel = 'NORMAL' | 'LARGE' | 'EXTRA_LARGE';
export type ArabicScriptType = 'INDO_PAK' | 'UTHMANI' | 'STANDARD_NASKH';
export type VisualThemeMode = 'DAY' | 'SEPIA' | 'NIGHT';

export interface ReaderPreferences {
  fontSizeLevel: FontSizeLevel;
  scriptType: ArabicScriptType;
  themeMode: VisualThemeMode;
  lineHeightComfort: boolean;
}

export class ReaderModeEngine {
  private static readonly DEFAULT_PREFS: ReaderPreferences = {
    fontSizeLevel: 'NORMAL',
    scriptType: 'INDO_PAK',
    themeMode: 'DAY',
    lineHeightComfort: true,
  };

  /**
   * Returns CSS style attributes for text elements based on preferences
   */
  public static getResolvedStyles(prefs: ReaderPreferences = this.DEFAULT_PREFS): {
    fontSizeScale: number;
    fontFamilyArabic: string;
    backgroundColor: string;
    textColor: string;
    cardBackground: string;
    borderColor: string;
    lineHeight: number;
  } {
    let fontSizeScale = 1.0;
    if (prefs.fontSizeLevel === 'LARGE') fontSizeScale = 1.25;
    if (prefs.fontSizeLevel === 'EXTRA_LARGE') fontSizeScale = 1.5;

    let fontFamilyArabic = 'system-ui, -apple-system, sans-serif';
    if (prefs.scriptType === 'INDO_PAK') {
      fontFamilyArabic = "'Jameel Noori Nastaleeq', 'Urdu Typesetting', 'Nafees', serif";
    } else if (prefs.scriptType === 'UTHMANI') {
      fontFamilyArabic = "'KFGQPC Uthman Taha Naskh', 'Amiri', 'Traditional Arabic', serif";
    } else {
      fontFamilyArabic = "'Amiri', 'Noto Naskh Arabic', sans-serif";
    }

    let backgroundColor = '#F9FAFB';
    let textColor = '#1F2937';
    let cardBackground = '#FFFFFF';
    let borderColor = '#E5E7EB';

    if (prefs.themeMode === 'SEPIA') {
      backgroundColor = '#F4ECD8';
      textColor = '#3A2E1E';
      cardBackground = '#FCF8ED';
      borderColor = '#E2D5BA';
    } else if (prefs.themeMode === 'NIGHT') {
      backgroundColor = '#0F172A';
      textColor = '#F3F4F6';
      cardBackground = '#1E293B';
      borderColor = '#334155';
    }

    return {
      fontSizeScale,
      fontFamilyArabic,
      backgroundColor,
      textColor,
      cardBackground,
      borderColor,
      lineHeight: prefs.lineHeightComfort ? 1.85 : 1.5,
    };
  }

  public static getDefaultPreferences(): ReaderPreferences {
    return { ...this.DEFAULT_PREFS };
  }
}
export const readerModeEngine = new ReaderModeEngine();
