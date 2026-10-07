import {
  AIIncident,
  IncidentCategory,
  IncidentSeverity,
  IncidentStatus,
} from '@amal/types';
import { CircuitBreakerService } from './circuit-breakers.js';

export class IncidentResponseService {
  private static incidents: Map<string, AIIncident> = new Map();

  public static reportIncident(
    category: IncidentCategory,
    severity: IncidentSeverity,
    summary: string,
    affectedRoutes: string[] = []
  ): AIIncident {
    const incNumber = `INC-${Date.now().toString().slice(-6)}`;
    const id = `inc_${Date.now()}`;

    const incident: AIIncident = {
      id,
      incidentNumber: incNumber,
      severity,
      category,
      status: 'DETECTED',
      summary,
      affectedRoutes,
      createdAt: new Date().toISOString(),
    };

    // Automated Containment for SEV-0 and SEV-1
    if (severity === 'SEV_0' || severity === 'SEV_1') {
      incident.status = 'CONTAINED';
      incident.containedAt = new Date().toISOString();

      if (category === 'CITATION_FAILURE' || category === 'AI_HALLUCINATION') {
        CircuitBreakerService.trip('AI_RELIGIOUS_ANSWERING', 'DEGRADED', `Auto-contained due to ${incNumber}: ${summary}`);
      } else if (category === 'PRIVACY_LEAK' || category === 'PROMPT_INJECTION') {
        CircuitBreakerService.trip('AI_GENERAL', 'OFF', `Auto-contained due to ${incNumber}: ${summary}`);
      }
    }

    this.incidents.set(id, incident);
    return incident;
  }

  public static transitionStatus(id: string, newStatus: IncidentStatus): AIIncident {
    const inc = this.incidents.get(id);
    if (!inc) {
      throw new Error(`Incident not found: ${id}`);
    }

    inc.status = newStatus;
    if (newStatus === 'CLOSED') {
      inc.resolvedAt = new Date().toISOString();
    }

    return inc;
  }

  public static listIncidents(): AIIncident[] {
    return Array.from(this.incidents.values());
  }

  public static clear(): void {
    this.incidents.clear();
  }
}
