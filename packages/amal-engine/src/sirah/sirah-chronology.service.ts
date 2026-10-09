/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Chronology Service: Normalized Dates, Calendars, Disputed Timelines & Ordering
 */

import {
  DatePrecision,
  SirahConfidenceState,
  SirahEventRecord,
  SirahReportVariantRecord,
} from '@amal/types';

export interface ChronologyCandidate {
  eventId: string;
  sourceId?: string;
  dateText?: string;
  hijriYear?: number;
  hijriMonth?: number;
  gregorianYear?: number;
  precision: DatePrecision;
  sequence?: number;
  confidence: SirahConfidenceState;
}

export interface ChronologyAnalysisResult {
  canonical?: ChronologyCandidate;
  alternatives: ChronologyCandidate[];
  isDisputed: boolean;
  scholarlyNotes?: string;
}

export class SirahChronologyService {
  /**
   * Analyzes the chronology of an event across its variants and classical consensus.
   * Invariant: Never force an exact date where sources preserve genuine historical disagreement.
   */
  public analyzeEventChronology(
    event: SirahEventRecord,
    variants: SirahReportVariantRecord[]
  ): ChronologyAnalysisResult {
    const canonical: ChronologyCandidate = {
      eventId: event.event_id,
      dateText: `${event.start_hijri_year ? event.start_hijri_year + ' AH' : ''} (${event.start_gregorian_year || ''} CE)`,
      hijriYear: event.start_hijri_year,
      hijriMonth: event.start_hijri_month,
      gregorianYear: event.start_gregorian_year,
      precision: event.date_precision,
      confidence: event.chronology_status === 'CANONICAL_CONSENSUS' ? 'ESTABLISHED' : 'SUPPORTED',
    };

    const dateVariants = variants.filter((v) => v.difference_type === 'DATE');
    const isDisputed = dateVariants.length > 0 || event.date_precision === 'DISPUTED';

    const alternatives: ChronologyCandidate[] = dateVariants.map((v) => ({
      eventId: event.event_id,
      dateText: v.report_b.claim,
      precision: 'DISPUTED',
      confidence: 'REPORTED',
    }));

    return {
      canonical,
      alternatives,
      isDisputed,
      scholarlyNotes: isDisputed && dateVariants[0] ? dateVariants[0].scholarly_assessment : event.chronology_notes,
    };
  }

  /**
   * Sorts events chronologically with awareness of fuzzy and disputed dates.
   */
  public sortEventsChronologically(events: SirahEventRecord[]): SirahEventRecord[] {
    return [...events].sort((a, b) => {
      const yearA = a.start_hijri_year ?? (a.start_gregorian_year ? a.start_gregorian_year - 622 : -100);
      const yearB = b.start_hijri_year ?? (b.start_gregorian_year ? b.start_gregorian_year - 622 : -100);

      if (yearA !== yearB) return yearA - yearB;
      const monthA = a.start_hijri_month ?? 0;
      const monthB = b.start_hijri_month ?? 0;
      return monthA - monthB;
    });
  }
}
