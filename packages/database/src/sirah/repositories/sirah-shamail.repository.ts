/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Shama'il Repository Interface & Implementation
 */

import { ShamailReportRecord, ShamailCategory } from '@amal/types';

export interface IShamailRepository {
  create(report: ShamailReportRecord): Promise<ShamailReportRecord>;
  getById(id: string): Promise<ShamailReportRecord | null>;
  listByCategory(category?: ShamailCategory): Promise<ShamailReportRecord[]>;
}

export class InMemoryShamailRepository implements IShamailRepository {
  private reports: Map<string, ShamailReportRecord> = new Map();

  constructor(initialReports?: ShamailReportRecord[]) {
    if (initialReports) {
      for (const r of initialReports) {
        this.reports.set(r.report_id, r);
      }
    }
  }

  public async create(report: ShamailReportRecord): Promise<ShamailReportRecord> {
    this.reports.set(report.report_id, report);
    return report;
  }

  public async getById(id: string): Promise<ShamailReportRecord | null> {
    return this.reports.get(id) || null;
  }

  public async listByCategory(category?: ShamailCategory): Promise<ShamailReportRecord[]> {
    let list = Array.from(this.reports.values());
    if (category) {
      list = list.filter((r) => r.category === category);
    }
    return list;
  }
}
