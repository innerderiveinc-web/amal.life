import { KnowledgeIncident, KnowledgeConflictType } from '@amal/types';
export declare class KnowledgeIncidentService {
    private static incidents;
    /**
     * Report and triage a knowledge integrity incident
     */
    static reportIncident(data: {
        contentId: string;
        disputeType: KnowledgeConflictType;
        severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
        notes?: string;
    }): KnowledgeIncident;
    /**
     * Advance incident state machine through investigation, correction, and closing
     */
    static advanceIncident(incidentId: string, nextStatus: KnowledgeIncident['status'], resolutionNotes?: string, postmortemUrl?: string): KnowledgeIncident;
    static getIncident(id: string): KnowledgeIncident | undefined;
    static getAllIncidents(): KnowledgeIncident[];
}
//# sourceMappingURL=knowledge-incident-service.d.ts.map