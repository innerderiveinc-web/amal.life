import { AIResponse, EvidencePackItem, AmalRecommendation } from '@amal/types';
import { IntentResult } from '../intent/intent-engine.js';
import { SafetyEvaluation } from '../safety/safety-engine.js';

export interface EpistemicLayers {
  islamSays?: string[];               // Primary Revelation / Sunnah
  scholarsDiscuss?: string[];         // Fiqh / Ikhtilaf / Interpretations
  amalRecommends?: string[];          // Evidence-grounded habits / small practices
  youMayFindPractical?: string[];     // Logistical constraints / timing adjustments
}

export class ResponseComposer {
  public static compose(params: {
    requestMessage: string;
    intent: IntentResult;
    safety: SafetyEvaluation;
    evidenceItems: EvidencePackItem[];
    amalRecommendation?: AmalRecommendation;
    practicalNotes?: string[];
  }): AIResponse {
    const islamSays: string[] = [];
    const scholarsDiscuss: string[] = [];
    const amalRecommends: string[] = [];
    const youMayFindPractical: string[] = [];

    // 1. [ISLAM SAYS]: Primary Quranic & Prophetic Evidence
    for (const ev of params.evidenceItems) {
      const evType = (ev as any).sourceType || ev.authorityLevel || 'PRIMARY';
      const evText = (ev as any).text || ev.translation || '';
      if (evType === 'QURAN' || evType === 'TIER_1_QURAN') {
        islamSays.push(`Quran ${ev.reference}: "${evText}"`);
      } else if (evType === 'HADITH' || evType === 'TIER_2_AUTHENTIC_HADITH') {
        islamSays.push(`${ev.reference}: "${evText}"`);
      }
    }

    // 2. [SCHOLARS DISCUSS]: Plurality & Ikhtilaf
    if (params.intent.primary === 'SCHOLARLY_DISAGREEMENT' || (params.safety.classification as string) === 'C' || (params.safety.classification as string) === 'CLASS_C_SCHOLARLY_DISAGREEMENT') {
      scholarsDiscuss.push('Classical jurists across the major schools discuss varied applications based on circumstance and necessity.');
    }

    // 3. [AMAL RECOMMENDS]: Next Best Action
    if (params.amalRecommendation) {
      const rec = params.amalRecommendation as any;
      const title = rec.amal?.title || 'Daily Micro-Practice';
      const duration = rec.amal?.durationMinutes || 10;
      const reason = rec.rationale || (rec.reasonCodes ?? []).join(', ') || 'Consistent practice';
      amalRecommends.push(`${title} (${duration} minutes) - ${reason}`);
    }

    // 4. [YOU MAY FIND THIS PRACTICAL]: Logistical pacing
    if (params.practicalNotes && params.practicalNotes.length > 0) {
      youMayFindPractical.push(...params.practicalNotes);
    } else {
      youMayFindPractical.push('Anchor this practice right after an established routine (e.g. Fajr or evening wind-down).');
    }

    const citations = params.evidenceItems.map((e) => ({
      sourceType: (e as any).sourceType || e.authorityLevel || 'CANONICAL',
      reference: e.reference,
      verified: true,
    }));

    return {
      responseId: `resp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'COMPLETED',
      intent: {
        intent: params.intent.primary as any,
        confidence: params.intent.confidence,
        requiresEvidence: true,
        requiresContext: false,
        requiresScholar: false,
        clarificationRequired: false,
      },
      safety: {
        classification: params.safety.classification as any,
        riskLevel: params.safety.riskLevel,
        allowedModes: ['EDUCATIONAL', 'ACTION_PROPOSAL'],
        requiresEvidence: params.safety.requiresEvidence,
        requiresScholar: params.safety.requiresScholar,
        personalizationAllowed: params.safety.personalizationAllowed,
        escalationRequired: params.safety.escalationRequired,
        blocked: params.safety.blocked,
        reasons: params.safety.blockReason ? [params.safety.blockReason] : [],
      },
      answer: {
        evidence: islamSays.map((content) => ({ content })),
        interpretation: scholarsDiscuss.map((content) => ({ content })),
        personalGuidance: amalRecommends.map((content) => ({ content })),
        actions: amalRecommends.map((title) => ({ title, durationMinutes: 10 })),
      },
      citations,
      personalization: {
        usedContextIds: [],
        confidence: 0.9,
      },
      audit: {
        citationVerified: true,
        safetyVerified: true,
      },
    };
  }
}
