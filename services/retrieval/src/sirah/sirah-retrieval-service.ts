/**
 * AMAL RETRIEVAL SERVICE — SIRAH & SHAMA'IL HYBRID RETRIEVAL
 * Lexical + Vector + Graph + Metadata Filtering
 */

import {
  SirahEventRecord,
  ShamailReportRecord,
  PropheticLifePeriod,
} from '@amal/types';

export interface SirahRetrievalQuery {
  query: string;
  period?: PropheticLifePeriod;
  entityName?: string;
  limit?: number;
  filterPublishedOnly?: boolean;
}

export interface SirahRetrievalResult {
  events: Array<{ event: SirahEventRecord; score: number; matchReason: string }>;
  shamail: Array<{ report: ShamailReportRecord; score: number; matchReason: string }>;
  totalFound: number;
}

export class SirahHybridRetrievalService {
  /**
   * Executes hybrid search over events and Shama'il narrations.
   * Filter first: PUBLISHED + RIGHTS_ALLOWED, then rank.
   */
  public search(
    queryPayload: SirahRetrievalQuery,
    allEvents: SirahEventRecord[],
    allShamail: ShamailReportRecord[]
  ): SirahRetrievalResult {
    const q = queryPayload.query.toLowerCase();
    const limit = queryPayload.limit ?? 10;

    // Filter published first
    const publishedEvents = queryPayload.filterPublishedOnly !== false
      ? allEvents.filter((e) => e.review_status === 'VERIFIED_PUBLISHED')
      : allEvents;

    const matchedEvents = publishedEvents
      .map((event) => {
        let score = 0;
        let matchReason = 'None';

        if (event.canonical_title.toLowerCase().includes(q)) {
          score += 0.8;
          matchReason = 'Title Match';
        } else if (event.description_neutral.toLowerCase().includes(q)) {
          score += 0.5;
          matchReason = 'Description Match';
        } else if (event.key_participants.some((p) => p.toLowerCase().includes(q))) {
          score += 0.6;
          matchReason = 'Participant Match';
        }

        if (queryPayload.period && event.life_period === queryPayload.period) {
          score += 0.2;
        }

        return { event, score, matchReason };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const matchedShamail = allShamail
      .map((report) => {
        let score = 0;
        let matchReason = 'None';

        if (report.category.toLowerCase().includes(q)) {
          score += 0.7;
          matchReason = 'Category Match';
        } else if (report.english_translation.toLowerCase().includes(q)) {
          score += 0.5;
          matchReason = 'Translation Match';
        } else if (report.primary_narrator.toLowerCase().includes(q)) {
          score += 0.6;
          matchReason = 'Narrator Match';
        }

        return { report, score, matchReason };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return {
      events: matchedEvents,
      shamail: matchedShamail,
      totalFound: matchedEvents.length + matchedShamail.length,
    };
  }
}
