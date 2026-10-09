import { AIIncident, IncidentCategory, IncidentSeverity, IncidentStatus } from '@amal/types';
export declare class IncidentResponseService {
    private static incidents;
    static reportIncident(category: IncidentCategory, severity: IncidentSeverity, summary: string, affectedRoutes?: string[]): AIIncident;
    static transitionStatus(id: string, newStatus: IncidentStatus): AIIncident;
    static listIncidents(): AIIncident[];
    static clear(): void;
}
//# sourceMappingURL=incident-response.d.ts.map