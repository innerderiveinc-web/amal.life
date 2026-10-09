/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Governed AI Tools Service: 14 Typed Read-Only Retrieval Tools
 *
 * Invariant:
 * The AI may not directly mutate the database or invent religious consensus.
 */

import { SirahShamailKnowledgeEngine } from '../sirah-shamail-engine.js';
import { SirahChronologyService } from './sirah-chronology.service.js';
import { SirahComparisonService } from './sirah-comparison.service.js';
import { PropheticLifePeriod, ShamailCategory } from '@amal/types';

export class SirahAiToolsService {
  private readonly engine: SirahShamailKnowledgeEngine;
  private readonly chronologyService: SirahChronologyService;
  private readonly comparisonService: SirahComparisonService;

  constructor(engine: SirahShamailKnowledgeEngine) {
    this.engine = engine;
    this.chronologyService = new SirahChronologyService();
    this.comparisonService = new SirahComparisonService();
  }

  // 1. search_sirah
  public searchSirah(params: { query: string; period?: PropheticLifePeriod }) {
    const events = this.engine.listEvents(params.period);
    const qLower = params.query.toLowerCase();
    const matched = events.filter(
      (e) =>
        e.canonical_title.toLowerCase().includes(qLower) ||
        e.description_neutral.toLowerCase().includes(qLower) ||
        e.arabic_title.includes(params.query)
    );
    return {
      count: matched.length,
      events: matched.map((e) => ({
        event_id: e.event_id,
        title: e.canonical_title,
        period: e.life_period,
        year: e.start_hijri_year ? `${e.start_hijri_year} AH` : `${e.start_gregorian_year} CE`,
      })),
    };
  }

  // 2. get_event
  public getEvent(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    return { event: evt };
  }

  // 3. get_event_evidence
  public getEventEvidence(params: { eventId: string }) {
    const evidence = this.engine.getEventEvidence(params.eventId);
    return { eventId: params.eventId, evidenceCount: evidence.length, evidence };
  }

  // 4. get_event_reports
  public getEventReports(params: { eventId: string }) {
    const variants = this.engine.getEventReportVariants(params.eventId);
    return { eventId: params.eventId, variantCount: variants.length, variants };
  }

  // 5. get_event_chronology
  public getEventChronology(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    const variants = this.engine.getEventReportVariants(params.eventId);
    const analysis = this.chronologyService.analyzeEventChronology(evt, variants);
    return { eventId: params.eventId, chronology: analysis };
  }

  // 6. get_event_people
  public getEventPeople(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    return { eventId: params.eventId, participants: evt.key_participants };
  }

  // 7. get_event_places
  public getEventPlaces(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    return {
      eventId: params.eventId,
      locationName: evt.location_name,
      certainty: evt.location_certainty,
      coordinates: evt.location_coordinates,
    };
  }

  // 8. get_shamail
  public getShamail(params: { category?: ShamailCategory }) {
    const reports = this.engine.listShamailReports(params.category);
    return { category: params.category || 'ALL', count: reports.length, reports };
  }

  // 9. compare_sirah_sources
  public compareSirahSources(params: { eventId: string }) {
    const variants = this.engine.getEventReportVariants(params.eventId);
    const report = this.comparisonService.generateComparisonReport(params.eventId, variants);
    return report;
  }

  // 10. get_quran_links
  public getQuranLinks(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    const quranEvidence = evt.evidence_items.filter((e) => e.evidence_type === 'QURAN_AYAH');
    return {
      eventId: params.eventId,
      verses: evt.quran_cross_references,
      passages: quranEvidence.map((q) => ({ reference: q.reference, arabic: q.passage_text_arabic, translation: q.passage_text_translation })),
    };
  }

  // 11. get_hadith_links
  public getHadithLinks(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    const hadithEvidence = evt.evidence_items.filter((e) => e.evidence_type === 'HADITH_NARRATION');
    return {
      eventId: params.eventId,
      narrations: evt.hadith_cross_references,
      evidence: hadithEvidence.map((h) => ({ reference: h.reference, grading: h.hadith_grading, text: h.passage_text_arabic })),
    };
  }

  // 12. get_scholar_assessment
  public getScholarAssessment(params: { eventId: string }) {
    const evt = this.engine.getEvent(params.eventId);
    if (!evt) return { error: `Event ${params.eventId} not found` };
    const variants = this.engine.getEventReportVariants(params.eventId);
    return {
      eventId: params.eventId,
      lessons: evt.lessons,
      relatedPractices: evt.related_amal_practices,
      variantAssessments: variants.map((v) => v.scholarly_assessment),
    };
  }

  // 13. get_knowledge_status
  public getKnowledgeStatus(params: { sourceId: string }) {
    const src = this.engine.getSource(params.sourceId);
    if (!src) return { error: `Source ${params.sourceId} not found` };
    return {
      sourceId: src.source_id,
      title: src.title_transliterated,
      tier: src.source_tier,
      lifecycle: src.lifecycle_state,
      rights: src.rights_status,
      scholarlyStatus: src.scholarly_status,
    };
  }

  // 14. request_scholar_review
  public requestScholarReview(params: { eventId: string; reason: string; userQuery: string }) {
    return {
      reviewTicketId: `REV-TICKET-${Date.now()}`,
      eventId: params.eventId,
      reason: params.reason,
      status: 'ESCALATED_TO_SCHOLAR_OS',
      escalationReason: 'Material scholarly disagreement or ambiguous chronology detected',
      timestamp: new Date().toISOString(),
    };
  }
}
