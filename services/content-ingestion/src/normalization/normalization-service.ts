export class NormalizationService {
  /**
   * Performs standard Unicode NFC normalization, whitespace trimming, and reference formatting
   * without altering substantive Arabic text.
   */
  public static normalizeText(text: string): string {
    return text
      .normalize('NFC')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  public static normalizeReference(ref: string): string {
    return ref.trim().replace(/\s*:\s*/g, ':');
  }
}
