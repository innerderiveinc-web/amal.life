"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentResponseService = void 0;
const circuit_breakers_js_1 = require("./circuit-breakers.js");
class IncidentResponseService {
    static incidents = new Map();
    static reportIncident(category, severity, summary, affectedRoutes = []) {
        const incNumber = `INC-${Date.now().toString().slice(-6)}`;
        const id = `inc_${Date.now()}`;
        const incident = {
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
                circuit_breakers_js_1.CircuitBreakerService.trip('AI_RELIGIOUS_ANSWERING', 'DEGRADED', `Auto-contained due to ${incNumber}: ${summary}`);
            }
            else if (category === 'PRIVACY_LEAK' || category === 'PROMPT_INJECTION') {
                circuit_breakers_js_1.CircuitBreakerService.trip('AI_GENERAL', 'OFF', `Auto-contained due to ${incNumber}: ${summary}`);
            }
        }
        this.incidents.set(id, incident);
        return incident;
    }
    static transitionStatus(id, newStatus) {
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
    static listIncidents() {
        return Array.from(this.incidents.values());
    }
    static clear() {
        this.incidents.clear();
    }
}
exports.IncidentResponseService = IncidentResponseService;
//# sourceMappingURL=incident-response.js.map