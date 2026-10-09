"use strict";
// ==============================================================================
// AMAL OS — LAYER 16: EXECUTION & LAUNCH OPERATIONS CONTROLLER
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionController = void 0;
class ExecutionController {
    service;
    constructor(service) {
        this.service = service;
    }
    getMilestones() {
        return this.service.getMilestones();
    }
    getMilestone(phaseCode) {
        return this.service.getMilestone(phaseCode);
    }
    updateMilestone(phaseCode, body) {
        return this.service.updateMilestoneStatus(phaseCode, body.status);
    }
    getActiveSprint() {
        return this.service.getActiveSprint();
    }
    createSprint(body) {
        return this.service.createSprint(body);
    }
    getLaunchGates() {
        return this.service.getLaunchGates();
    }
    evaluateGate(gateLevel, body) {
        return this.service.evaluateGate(gateLevel, body.passed, body.signoff);
    }
    getKillSwitches() {
        return this.service.getKillSwitches();
    }
    toggleKillSwitch(switchKey, body) {
        return this.service.toggleKillSwitch(switchKey, body.active, body.reason, body.actorId);
    }
    getBetaCohorts() {
        return this.service.getBetaCohorts();
    }
    recordFeedback(body) {
        return this.service.recordBetaFeedback(body);
    }
    logDecision(body) {
        return this.service.logProductDecision(body);
    }
    getDecisions() {
        return this.service.getDecisions();
    }
    getExecutionHealth() {
        return this.service.getExecutionHealth();
    }
}
exports.ExecutionController = ExecutionController;
//# sourceMappingURL=execution.controller.js.map