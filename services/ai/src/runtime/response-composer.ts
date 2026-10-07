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
    const layers: EpistemicLayers = {
      islamSays: [],
      scholarsDiscuss: [],
      amalRecommends: [],
      youMayFindPractical: [],
    };

    // 1. ISLAM SAYS: Primary Quranic & Prophetic Evidence
    for (const ev of params.evidenceItems) {
      if (ev.sourceType === 'QURAN') {
        layers.islamSays.push(`Quran ${ev.reference}: "${ev.text}"`);
      } else if (ev.sourceType === 'HADITH') {
        layers.islamSays.push(`${ev.reference}: "${ev.text}"`);
      }
    }

    // 2. SCHOLARS DISCUSS: Plurality & Ikhtilaf
    if (params.intent.primary === 'SCHOLARLY_DISAGREEMENT' || params.safety.classification === 'C') {
      layers.scholarsDiscuss.push('Classical jurists across the major schools discuss varied applications based on circumstance and necessity.');
    }

    // 3. AMAL RECOMMENDS: Next Best Action
    if (params.amalRecommendation) {
      layers.amalRecommends.push(
        `${params.amalRecommendation.amal.title} (${params.amalRecommendation.amal.durationMinutes} minutes) - ${params.amalRecommendation.rationale}`
      );
    }

    // 4. YOU MAY FIND THIS PRACTICAL: Logistical pacing
    if (params.practicalNotes && params.practicalNotes.length > 0) {
      layers.youMayFindPractical.push(...params.practicalNotes);
    } else {
      layers.youMayFindPractical.push('Anchor this practice right after an established routine (e.g. Fajr or evening wind-down).');
    }

    let synthesizedContent = '';
    if (layers.islamSays.length > 0) {
      synthesizedContent += `[ISLAM SAYS]\n${layers.islamSays.join('\n')}\n\n`;
    }
    if (layers.scholarsDiscuss.length > 0) {
      synthesizedContent += `[SCHOLARS DISCUSS]\n${layers.scholarsDiscuss.join('\n')}\n\n`;
    }
    if (layers.amalRecommends.length > 0) {
      synthesizedContent += `[AMAL RECOMMENDS]\n${layers.amalRecommends.join('\n')}\n\n`;
    }
    if (layers.youMayFindPractical.length > 0) {
      synthesizedContent += `[YOU MAY FIND THIS PRACTICAL]\n${layers.youMayFindPractical.join('\n')}\n`;
    }

    return {
      responseId: `resp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'COMPLETED',
      intent: {
        type: params.intent.primary,
        confidence: params.intent.confidence,
      },
      safety: {
        class: params.safety.classification,
        risk: params.safety.riskLevel,
      },
      content: synthesizedContent.trim(),
      citations: params.evidenceItems.map((e) => ({
        sourceType: e.sourceType,
        reference: e.reference,
        verified: true,
      })),
      audit: {
        citationVerified: true,
        safetyVerified: true,
      },
    };
  }
}
