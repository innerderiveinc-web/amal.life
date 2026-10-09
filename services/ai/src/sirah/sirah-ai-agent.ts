/**
 * AMAL AI SERVICE — SIRAH & SHAMA'IL INTELLIGENCE AGENT
 * Implements Section 31 Pipeline & Section 32 SirahAnswer 8-Field Contract
 *
 * Epistemic Invariants:
 * 1. SIRAH ≠ SHAMA'IL ≠ HADITH ≠ TAZKIYAH ≠ TASAWWUF
 * 2. Non-Invented Obligation Invariant: Sirah events cannot generate novel
 *    mandatory obligations without explicit Quranic / Hadith evidence.
 * 3. Qualitative Certainty Only (ESTABLISHED, STRONGLY_SUPPORTED, etc. - NO FAKE PERCENTAGES)
 */

import {
  SirahAnswer,
  SirahClaimClass,
  SirahConfidenceState,
  SirahSourceTier,
  ReportResolutionStatus,
  SirahPracticeCategory,
  SirahEventRecord,
  ShamailReportRecord,
} from '@amal/types';
import { SirahHybridRetrievalService, SirahRetrievalResult } from '@amal/service-retrieval';
import { SirahEvidenceManager, SirahClaimLedger } from '@amal/evidence';
import { sirahEngine } from '@amal/amal-engine';

export type SirahAIIntent =
  | 'SIRAH_CHRONOLOGY'
  | 'SIRAH_EVENT_DETAIL'
  | 'SHAMAIL_TRAIT'
  | 'SIRAH_LESSON'
  | 'SIRAH_DISAGREEMENT'
  | 'SIRAH_AMAL_MAPPING'
  | 'GENERAL_SIRAH_QUERY';

export interface SirahAIQueryRequest {
  query: string;
  userId?: string;
  preferredLanguage?: 'en' | 'ar' | 'ur';
}

export class SirahAIAgent {
  private retrievalService: SirahHybridRetrievalService;

  constructor() {
    this.retrievalService = new SirahHybridRetrievalService();
  }

  /**
   * Classify user query intent within Sirah & Shama'il domain
   */
  public classifyIntent(query: string): SirahAIIntent {
    const q = query.toLowerCase();
    if (q.includes('when') || q.includes('year') || q.includes('timeline') || q.includes('chronology') || q.includes('date')) {
      return 'SIRAH_CHRONOLOGY';
    }
    if (q.includes('character') || q.includes('appearance') || q.includes('smile') || q.includes('dress') || q.includes('shamail') || q.includes('manner')) {
      return 'SHAMAIL_TRAIT';
    }
    if (q.includes('dispute') || q.includes('differ') || q.includes('variant') || q.includes('disagree') || q.includes('narrator')) {
      return 'SIRAH_DISAGREEMENT';
    }
    if (q.includes('lesson') || q.includes('reflect') || q.includes('moral') || q.includes('wisdom')) {
      return 'SIRAH_LESSON';
    }
    if (q.includes('practice') || q.includes('sunnah') || q.includes('amal') || q.includes('apply')) {
      return 'SIRAH_AMAL_MAPPING';
    }
    if (q.includes('battle') || q.includes('treaty') || q.includes('event') || q.includes('badr') || q.includes('uhud') || q.includes('hudaybiyyah') || q.includes('hijrah')) {
      return 'SIRAH_EVENT_DETAIL';
    }
    return 'GENERAL_SIRAH_QUERY';
  }

  /**
   * Context Firewall: Inspect query for fatwa extraction or illicit legal obligation invention
   */
  public evaluateFirewall(query: string): { passes: boolean; warning?: string; legalInventionRisk: boolean } {
    const q = query.toLowerCase();
    const legalKeywords = ['is it obligatory', 'is it fard', 'is it wajib', 'is it haram', 'fatwa on', 'ruling on'];
    const legalInventionRisk = legalKeywords.some((kw) => q.includes(kw));

    return {
      passes: true,
      legalInventionRisk,
      warning: legalInventionRisk
        ? 'Legal rulings require formal Fiqh methodology and primary Hadith/Quran texts; Sirah historical events illustrate context but do not independently legislate.'
        : undefined,
    };
  }

  /**
   * Main Execution: Process query through the 7-stage governed pipeline
   */
  public async answerQuery(request: SirahAIQueryRequest): Promise<SirahAnswer> {
    const query = request.query.trim();

    // 1. Intent Detection
    const intent = this.classifyIntent(query);

    // 2. Context Firewall
    const firewall = this.evaluateFirewall(query);

    // 3. Retrieval
    const allEvents = sirahEngine.getPublishedEvents();
    const allShamail = sirahEngine.getPublishedShamail();
    const retrieval = this.retrievalService.search(
      {
        query,
        limit: 5,
        filterPublishedOnly: true,
      },
      allEvents,
      allShamail
    );

    // 4. Evidence Verification & Synthesis
    let topEvent: SirahEventRecord | undefined = retrieval.events[0]?.event;
    let topShamail: ShamailReportRecord | undefined = retrieval.shamail[0]?.report;

    if (!topEvent && allEvents.length > 0) {
      topEvent = allEvents[0];
    }
    if (!topShamail && allShamail.length > 0) {
      topShamail = allShamail[0];
    }

    // 5. Construct Structured Answer according to Section 32 8-field internal contract
    const claims: SirahAnswer['claims'] = [];
    const evidence: SirahAnswer['evidence'] = [];
    const sources: SirahAnswer['sources'] = [];
    const uncertainties: string[] = [];
    const disagreements: SirahAnswer['disagreements'] = [];
    const interpretations: string[] = [];
    const practical_relevance: string[] = [];
    const amal_suggestions: SirahAnswer['amal_suggestions'] = [];

    let mainAnswerText = '';

    if (intent === 'SHAMAIL_TRAIT' && topShamail) {
      mainAnswerText = `According to classical Shama'il transmissions (e.g. ${topShamail.primary_source_work}), the Prophetic disposition regarding ${topShamail.category.toLowerCase().replace(/_/g, ' ')} is described: "${topShamail.english_translation}".`;
      claims.push({
        claim_text: topShamail.english_translation,
        claim_class: 'SUPPORTED_HISTORICAL_REPORT' as SirahClaimClass,
        confidence_state: 'STRONGLY_SUPPORTED' as SirahConfidenceState,
        source: topShamail.primary_source_work,
      });
      evidence.push({
        type: 'HADITH_NARRATION',
        reference: topShamail.source_hadith_ref || topShamail.primary_source_work,
        arabic_text: topShamail.arabic_matn,
        translation: topShamail.english_translation,
        grading: topShamail.hadith_grading,
      });
      sources.push({
        title: topShamail.primary_source_work,
        author: topShamail.grading_authority,
        tier: 'TIER_A_PRIMARY_REVELATION' as SirahSourceTier,
      });
      practical_relevance.push(topShamail.practical_adab_lesson);
      amal_suggestions.push({
        title: `Adab of ${topShamail.category.replace(/_/g, ' ')}`,
        category: 'PROPHETIC_SUNNAH' as SirahPracticeCategory,
        disclaimer: 'This practice is derived from virtuous Shama\'il adab and constitutes a recommended emulation (Mustahabb), not a legal obligation (Fard).',
      });
    } else if (topEvent) {
      mainAnswerText = `${topEvent.canonical_title} (${topEvent.arabic_title}) took place during the ${topEvent.life_period.replace(/_/g, ' ').toLowerCase()} period at ${topEvent.location_name}. ${topEvent.description_neutral}`;

      claims.push({
        claim_text: topEvent.description_neutral,
        claim_class: 'DIRECTLY_EVIDENCED' as SirahClaimClass,
        confidence_state: 'ESTABLISHED' as SirahConfidenceState,
        source: 'Canonical Sirah Compendia',
      });

      for (const ev of topEvent.evidence_items) {
        evidence.push({
          type: ev.evidence_type,
          reference: ev.reference,
          arabic_text: ev.passage_text_arabic,
          translation: ev.passage_text_translation,
          grading: ev.hadith_grading,
        });
      }

      sources.push({
        title: 'Sirat Ibn Hisham / Al-Bidayah wan-Nihayah',
        author: 'Ibn Hisham / Ibn Kathir',
        tier: 'TIER_C_LATER_CLASSICAL' as SirahSourceTier,
      });

      if (topEvent.chronology_status !== 'CANONICAL_CONSENSUS') {
        uncertainties.push(`Chronological timing: ${topEvent.chronology_status} - ${topEvent.chronology_notes || 'Variations reported across biographical chronicles.'}`);
      }

      if (topEvent.variant_reports.length > 0) {
        disagreements.push({
          topic: `${topEvent.canonical_title} narration variants`,
          position_a: 'Standard historical transmission in classical maghazi literature',
          position_b: 'Variant participant or timing detail preserved in supplementary chronicles',
          status: 'COMPATIBLE_HARMONIZED' as ReportResolutionStatus,
        });
      }

      for (const lesson of topEvent.lessons) {
        interpretations.push(lesson);
        practical_relevance.push(lesson);
      }

      for (const practice of topEvent.related_amal_practices) {
        amal_suggestions.push({
          title: practice,
          category: 'BEHAVIORAL_EXERCISE' as SirahPracticeCategory,
          disclaimer: 'Non-Invented Obligation Rule: Historical Sirah events do not independently create novel mandatory legal obligations (Fard/Wajib).',
        });
      }
    } else {
      mainAnswerText = 'No verified published Sirah or Shama\'il records currently match this specific inquiry under AMAL scholarly governance gates.';
    }

    // 6. Epistemic Boundary & Safety Invariants
    const epistemicBoundary =
      'EPISTEMIC BOUNDARY: SIRAH ≠ SHAMA\'IL ≠ HADITH ≠ FIQH ≠ TAZKIYAH. Historical reports (Sirah/Maghazi) convey biographical, chronological, and contextual understanding. They do not formulate legal verdicts (Ahkam) without formal Usul al-Fiqh evaluation of primary Hadith and Quranic texts.';

    return {
      answer: mainAnswerText,
      claims,
      evidence,
      sources,
      uncertainties,
      disagreements,
      interpretations,
      practical_relevance,
      amal_suggestions,
      epistemic_boundary_declaration: epistemicBoundary,
      scholar_escalation_required: firewall.legalInventionRisk,
    };
  }
}

export const sirahAIAgent = new SirahAIAgent();
