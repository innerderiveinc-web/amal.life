"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeIncidentService = void 0;
const source_registry_js_1 = require("./source-registry.js");
class KnowledgeIncidentService {
    static incidents = new Map();
    /**
     * Report and triage a knowledge integrity incident
     */
    static reportIncident(data) {
        const id = `inc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const freezeRequired = data.severity === 'CRITICAL' || data.severity === 'HIGH';
        const incident = {
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
            const src = source_registry_js_1.SourceRegistry.getSource(data.contentId);
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
    static advanceIncident(incidentId, nextStatus, resolutionNotes, postmortemUrl) {
        const inc = this.incidents.get(incidentId);
        if (!inc)
            throw new Error(`Incident not found: ${incidentId}`);
        inc.status = nextStatus;
        if (resolutionNotes)
            inc.resolutionNotes = resolutionNotes;
        if (postmortemUrl)
            inc.postmortemUrl = postmortemUrl;
        if (nextStatus === 'CLOSED') {
            inc.freezeApplied = false;
            const src = source_registry_js_1.SourceRegistry.getSource(inc.contentId);
            if (src && inc.disputeType !== 'SOURCE_CONFLICT') {
                src.authorityDimensions.publicationStatus = 'PUBLISHED';
            }
        }
        return inc;
    }
    static getIncident(id) {
        return this.incidents.get(id);
    }
    static getAllIncidents() {
        return Array.from(this.incidents.values());
    }
}
exports.KnowledgeIncidentService = KnowledgeIncidentService;
//# sourceMappingURL=knowledge-incident-service.js.map