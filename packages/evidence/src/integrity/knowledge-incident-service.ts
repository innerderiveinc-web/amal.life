import { KnowledgeIncident, KnowledgeConflictType } from '@amal/types';
import { SourceRegistry } from './source-registry.js';

export class KnowledgeIncidentService {
  private static incidents: Map<string, KnowledgeIncident> = new Map();

  /**
   * Report and triage a knowledge integrity incident
   */
  public static reportIncident(data: {
    contentId: string;
    disputeType: KnowledgeConflictType;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    notes?: string;
  }): KnowledgeIncident {
    const id = `inc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const freezeRequired = data.severity === 'CRITICAL' || data.severity === 'HIGH';

    const incident: KnowledgeIncident = {
      id,
      contentId: data.contentId,
      disputeType: data.disputeType,
      severity: data.severity,
      status: freezeRequired ? 'FROZEN' : 'TRIAGED',
      freezeApplied: freezeRequired,
      reportedAt: new Date().toISOString(),
      resolutionNotes: data.notes,
    };

    if (freezeRequired) {
      const src = SourceRegistry.getSource(data.contentId);
      if (src) {
        src.authorityDimensions.publicationStatus = 'QUARANTINED';
      }
    }

    this.incidents.set(id, incident);
    return incident;
  }

  /**
   * Advance incident state machine through investigation, correction, and closing
   */
  public static advanceIncident(
    incidentId: string,
    nextStatus: KnowledgeIncident['status'],
    resolutionNotes?: string,
    postmortemUrl?: string
  ): KnowledgeIncident {
    const inc = this.incidents.get(incidentId);
    if (!inc) throw new Error(`Incident not found: ${incidentId}`);

    inc.status = nextStatus;
    if (resolutionNotes) inc.resolutionNotes = resolutionNotes;
    if (postmortemUrl) inc.postmortemUrl = postmortemUrl;

    if (nextStatus === 'CLOSED') {
      inc.freezeApplied = false;
      const src = SourceRegistry.getSource(inc.contentId);
      if (src && inc.disputeType !== 'SOURCE_CONFLICT') {
        src.authorityDimensions.publicationStatus = 'PUBLISHED';
      }
    }

    return inc;
  }

  public static getIncident(id: string): KnowledgeIncident | undefined {
    return this.incidents.get(id);
  }

  public static getAllIncidents(): KnowledgeIncident[] {
    return Array.from(this.incidents.values());
  }
}
