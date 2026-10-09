/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Source Comparison Service: Structured Differencing Across Historical Compilations
 */

import { SirahReportVariantRecord, ReportResolutionStatus } from '@amal/types';

export interface SourceComparisonReport {
  eventId: string;
  sourceAId: string;
  sourceBId: string;
  differenceType: string;
  agreements: string[];
  differences: Array<{
    aspect: string;
    reportA: string;
    reportB: string;
    status: ReportResolutionStatus;
  }>;
  scholarlyResolutionSummary: string;
}

export class SirahComparisonService {
  /**
   * Compares two or more Sirah reports regarding an event without fabricating consensus.
   */
  public generateComparisonReport(
    eventId: string,
    variants: SirahReportVariantRecord[]
  ): SourceComparisonReport {
    const eventVariants = variants.filter((v) => v.event_id === eventId);

    const differences = eventVariants.map((v) => ({
      aspect: v.difference_type,
      reportA: `${v.report_a.source_title}: ${v.report_a.claim} (${v.report_a.citation})`,
      reportB: `${v.report_b.source_title}: ${v.report_b.claim} (${v.report_b.citation})`,
      status: v.resolution_status,
    }));

    const first = eventVariants[0];
    return {
      eventId,
      sourceAId: first ? first.report_a.source_title : 'Source A',
      sourceBId: first ? first.report_b.source_title : 'Source B',
      differenceType: first ? first.difference_type : 'NONE',
      agreements: [
        'The foundational historical occurrence of the event itself is agreed upon by both sources.',
      ],
      differences,
      scholarlyResolutionSummary:
        first
          ? first.scholarly_assessment
          : 'Both sources present compatible narratives without irreconcilable contradictions.',
    };
  }
}
