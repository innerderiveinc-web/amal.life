export interface ContextCandidate {
  key: string;
  value: string;
  source: 'EXPLICIT_CHOICE' | 'CONFIRMED_PREFERENCE' | 'ACTIVE_JOURNEY' | 'RECENT_BEHAVIOR' | 'DERIVED_INSIGHT' | 'AI_INFERENCE';
  isSensitive: boolean;
}

export class ContextFirewall {
  /**
   * Section 8 & 9: Context Priority & Minimization
   * Priority: Explicit > Confirmed > Active Journey > Recent Behavior > Derived > AI Inference.
   * Strips all reflections, family journals, and confidential notes.
   */
  public static filterContext(candidates: ContextCandidate[]): ContextCandidate[] {
    const priorityWeights: Record<string, number> = {
      EXPLICIT_CHOICE: 6,
      CONFIRMED_PREFERENCE: 5,
      ACTIVE_JOURNEY: 4,
      RECENT_BEHAVIOR: 3,
      DERIVED_INSIGHT: 2,
      AI_INFERENCE: 1,
    };

    return candidates
      .filter((c) => !c.isSensitive)
      .filter((c) => !c.key.toLowerCase().includes('reflection'))
      .filter((c) => !c.key.toLowerCase().includes('secret'))
      .filter((c) => !c.key.toLowerCase().includes('confidential'))
      .sort((a, b) => priorityWeights[b.source] - priorityWeights[a.source])
      .slice(0, 5); // Return only minimum necessary context items
  }
}
