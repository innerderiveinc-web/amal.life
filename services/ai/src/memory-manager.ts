import {
  L0SessionMemory,
  L1JourneyMemory,
  L2ConfirmedPersonalMemory,
  L3DerivedInsight,
  MemoryCandidate,
  MemoryConfirmationAction,
} from '@amal/types';

export class MemoryManager {
  private static l0Sessions: Map<string, L0SessionMemory> = new Map();
  private static l1Journeys: Map<string, L1JourneyMemory[]> = new Map();
  private static l2Confirmed: Map<string, L2ConfirmedPersonalMemory[]> = new Map();
  private static l3Insights: Map<string, L3DerivedInsight[]> = new Map();
  private static candidates: Map<string, MemoryCandidate[]> = new Map();

  /**
   * L0: Session Memory (Temporary reasoning context)
   */
  public static setSession(session: L0SessionMemory): void {
    this.l0Sessions.set(session.sessionId, session);
  }

  public static getSession(sessionId: string): L0SessionMemory | undefined {
    return this.l0Sessions.get(sessionId);
  }

  /**
   * L1: Journey Memory
   */
  public static recordJourneyMemory(memory: L1JourneyMemory): void {
    const list = this.l1Journeys.get(memory.userId) || [];
    const index = list.findIndex((j) => j.journeyId === memory.journeyId);
    if (index >= 0) {
      list[index] = memory;
    } else {
      list.push(memory);
    }
    this.l1Journeys.set(memory.userId, list);
  }

  public static getJourneyMemories(userId: string): L1JourneyMemory[] {
    return this.l1Journeys.get(userId) || [];
  }

  /**
   * L2: Confirmed Personal Memory (User confirmed)
   */
  public static addConfirmedMemory(memory: L2ConfirmedPersonalMemory): void {
    const list = this.l2Confirmed.get(memory.userId) || [];
    list.push(memory);
    this.l2Confirmed.set(memory.userId, list);
  }

  public static getConfirmedMemories(userId: string): L2ConfirmedPersonalMemory[] {
    return this.l2Confirmed.get(userId) || [];
  }

  /**
   * L3: Derived Insights (AI generated, NOT treated as facts)
   */
  public static recordDerivedInsight(insight: L3DerivedInsight): void {
    const list = this.l3Insights.get(insight.userId) || [];
    list.push(insight);
    this.l3Insights.set(insight.userId, list);
  }

  public static getDerivedInsights(userId: string): L3DerivedInsight[] {
    return this.l3Insights.get(userId) || [];
  }

  /**
   * Memory Write Policy: AI CANNOT directly mutate persistent memory.
   * Proposes candidate -> Policy validation -> User confirmation if required.
   */
  public static proposeCandidate(
    userId: string,
    type: 'PREFERENCE_CANDIDATE' | 'INSIGHT_CANDIDATE' | 'ROUTINE_CANDIDATE',
    statement: string,
    confidence: number,
    sourceEvents: string[]
  ): MemoryCandidate {
    // Policy rule: Confidence below 0.6 is rejected immediately
    if (confidence < 0.6) {
      throw new Error(`MEMORY_POLICY_VIOLATION: Inferred confidence (${confidence}) is below the 0.60 threshold.`);
    }

    const candidate: MemoryCandidate = {
      id: `cand-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId,
      type,
      statement,
      confidence,
      sourceEvents,
      requiresConfirmation: true,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    const userCandidates = this.candidates.get(userId) || [];
    userCandidates.push(candidate);
    this.candidates.set(userId, userCandidates);
    return candidate;
  }

  public static getPendingCandidates(userId: string): MemoryCandidate[] {
    return (this.candidates.get(userId) || []).filter((c) => c.status === 'PENDING');
  }

  public static processConfirmation(action: MemoryConfirmationAction): boolean {
    const userCandidates = this.candidates.get(action.userId) || [];
    const candidate = userCandidates.find((c) => c.id === action.candidateId);
    if (!candidate) return false;

    if (action.decision === 'CONFIRM') {
      candidate.status = 'CONFIRMED';
      // Promote to L2 Confirmed Personal Memory
      this.addConfirmedMemory({
        id: `mem-${Date.now()}`,
        userId: action.userId,
        key: candidate.type,
        value: candidate.statement,
        category: 'PREFERENCE',
        userConfirmed: true,
        confirmedAt: new Date().toISOString(),
        editable: true,
      });
    } else {
      candidate.status = 'REJECTED';
    }

    return true;
  }

  /**
   * Section 9 Context Selection Algorithm:
   * Selects minimum necessary context, stripping all private reflections, family data, and scholar notes.
   */
  public static selectMinimumContext(
    userId: string,
    requestSurface: string,
    focusTopic?: string
  ): { key: string; value: string; source: string; confidence: number }[] {
    const minimal: { key: string; value: string; source: string; confidence: number }[] = [];

    // Priority 1: L2 Confirmed Personal Preferences
    const confirmed = this.getConfirmedMemories(userId);
    for (const c of confirmed) {
      minimal.push({ key: c.key, value: c.value, source: 'CONFIRMED_PREFERENCE', confidence: 1.0 });
    }

    // Priority 2: Active L1 Journey Context (Goal and active day only)
    const journeys = this.getJourneyMemories(userId);
    if (journeys.length > 0) {
      const active = journeys[0];
      minimal.push({ key: 'active_goal', value: active.goalTitle, source: 'ACTIVE_JOURNEY', confidence: 1.0 });
      minimal.push({ key: 'journey_day', value: `Day ${active.currentDay}`, source: 'ACTIVE_JOURNEY', confidence: 1.0 });
    }

    // Grounded defaults if empty
    if (minimal.length === 0) {
      minimal.push({ key: 'available_window', value: '10_minutes', source: 'ONBOARDING', confidence: 1.0 });
      minimal.push({ key: 'preferred_focus', value: focusTopic || 'salah_and_quran', source: 'ONBOARDING', confidence: 0.9 });
    }

    return minimal;
  }

  /**
   * Delete a confirmed memory by ID (user right to be forgotten / personal memory control)
   */
  public static deleteConfirmedMemory(userId: string, memoryId: string): boolean {
    const list = this.l2Confirmed.get(userId) || [];
    const filtered = list.filter((m) => m.id !== memoryId);
    if (filtered.length !== list.length) {
      this.l2Confirmed.set(userId, filtered);
      return true;
    }
    return false;
  }

  /**
   * Update a confirmed memory value/statement
   */
  public static updateConfirmedMemory(
    userId: string,
    memoryId: string,
    newValue: string
  ): L2ConfirmedPersonalMemory | null {
    const list = this.l2Confirmed.get(userId) || [];
    const memory = list.find((m) => m.id === memoryId);
    if (memory) {
      memory.value = newValue;
      memory.confirmedAt = new Date().toISOString();
      return memory;
    }
    return null;
  }

  /**
   * Clear all memories for a user across all tiers
   */
  public static clearUserMemories(userId: string): void {
    this.l1Journeys.delete(userId);
    this.l2Confirmed.delete(userId);
    this.l3Insights.delete(userId);
    this.candidates.delete(userId);
  }
}

