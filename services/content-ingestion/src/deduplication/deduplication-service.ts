import * as crypto from 'crypto';

export interface DeduplicationCheckResult {
  isDuplicate: boolean;
  hasConflict: boolean;
  conflictDetails?: string;
}

export class DeduplicationService {
  private static seenHashes = new Set<string>();
  private static referenceTextMap = new Map<string, string>();

  public static check(reference: string, normalizedText: string): DeduplicationCheckResult {
    const hash = crypto.createHash('sha256').update(normalizedText).digest('hex');

    if (this.seenHashes.has(hash)) {
      return { isDuplicate: true, hasConflict: false };
    }

    if (this.referenceTextMap.has(reference)) {
      const existingText = this.referenceTextMap.get(reference)!;
      if (existingText !== normalizedText) {
        return {
          isDuplicate: false,
          hasConflict: true,
          conflictDetails: `CONFLICT_DETECTED: Reference '${reference}' exists with conflicting text content.`,
        };
      }
    }

    this.seenHashes.add(hash);
    this.referenceTextMap.set(reference, normalizedText);

    return { isDuplicate: false, hasConflict: false };
  }
}
