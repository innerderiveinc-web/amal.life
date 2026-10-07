import {
  ModelRouterTier,
  ModelRoutingDecision,
  AmalIntentTaxonomy,
  SafetyPolicyObject,
} from '@amal/types';

export class ModelRouter {
  /**
   * Section 24 & 25: Model Routing Policy
   */
  public static route(
    intent: AmalIntentTaxonomy,
    safetyPolicy: SafetyPolicyObject,
    messageLength: number,
    requiresMultiSourceSynthesis = false
  ): ModelRoutingDecision {
    // 1. High-risk safety pipeline (Class E crisis or high-risk legal/medical)
    if (safetyPolicy.classification === 'E' || intent === 'CRISIS') {
      return {
        tier: 'SAFETY',
        provider: 'configured_safety_pipeline',
        model: 'amal-safety-v1',
        reasoningBudgetTokens: 1000,
        temperature: 0.0,
        timeoutMs: 3000,
      };
    }

    // 2. High reliability / scholar review escalation pipeline (Class D)
    if (safetyPolicy.classification === 'D' || intent === 'FIQH_PERSONALIZED' || intent === 'SCHOLAR_REQUEST') {
      return {
        tier: 'REASONING',
        provider: 'configured_reasoning_pipeline',
        model: 'gemini-1.5-pro',
        reasoningBudgetTokens: 4000,
        temperature: 0.1,
        timeoutMs: 12000,
      };
    }

    // 3. Complex multi-source synthesis or scholarly disagreement (Class C)
    if (
      intent === 'SCHOLARLY_DISAGREEMENT' ||
      safetyPolicy.classification === 'C' ||
      requiresMultiSourceSynthesis ||
      messageLength > 800
    ) {
      return {
        tier: 'REASONING',
        provider: 'configured_reasoning_pipeline',
        model: 'gemini-1.5-pro',
        reasoningBudgetTokens: 3000,
        temperature: 0.2,
        timeoutMs: 10000,
      };
    }

    // 4. General Islamic guidance, Amal recommendation, reflections (Class B)
    if (
      intent === 'GENERAL_ISLAMIC_KNOWLEDGE' ||
      intent === 'TAFSIR_EXPLANATION' ||
      intent === 'SALAH_GUIDANCE' ||
      intent === 'AMAL_REQUEST' ||
      intent === 'JOURNEY_REQUEST'
    ) {
      return {
        tier: 'GENERAL',
        provider: 'configured_general_pipeline',
        model: 'gemini-1.5-flash',
        reasoningBudgetTokens: 1500,
        temperature: 0.3,
        timeoutMs: 7000,
      };
    }

    // 5. Fast Model for simple lookups, dua/dhikr, formatting, intent classification
    return {
      tier: 'FAST',
      provider: 'configured_fast_pipeline',
      model: 'gemini-1.5-flash-8b',
      reasoningBudgetTokens: 500,
      temperature: 0.1,
      timeoutMs: 4000,
    };
  }

  /**
   * Section 27: Token & Cost Controller
   */
  public static evaluateBudget(
    inputTokens: number,
    tier: ModelRouterTier
  ): { allowed: boolean; estimatedCostUsd: number; compressedRequired: boolean } {
    let costPerMInput = 0.075; // Fast
    if (tier === 'GENERAL') costPerMInput = 0.35;
    if (tier === 'REASONING') costPerMInput = 3.50;
    if (tier === 'SAFETY') costPerMInput = 0.10;

    const estimatedCostUsd = Number(((inputTokens / 1_000_000) * costPerMInput).toFixed(6));
    const compressedRequired = inputTokens > 6000;
    const allowed = estimatedCostUsd <= 0.05;

    return {
      allowed,
      estimatedCostUsd,
      compressedRequired,
    };
  }
}
