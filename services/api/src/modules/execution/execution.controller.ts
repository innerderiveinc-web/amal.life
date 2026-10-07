// ==============================================================================
// AMAL OS — LAYER 16: EXECUTION & LAUNCH OPERATIONS CONTROLLER
// ==============================================================================

import { ExecutionService } from './execution.service.js';

export class ExecutionController {
  constructor(private readonly service: ExecutionService) {}

  public getMilestones() {
    return this.service.getMilestones();
  }

  public getMilestone(phaseCode: string) {
    return this.service.getMilestone(phaseCode);
  }

  public updateMilestone(phaseCode: string, body: any) {
    return this.service.updateMilestoneStatus(phaseCode, body.status);
  }

  public getActiveSprint() {
    return this.service.getActiveSprint();
  }

  public createSprint(body: any) {
    return this.service.createSprint(body);
  }

  public getLaunchGates() {
    return this.service.getLaunchGates();
  }

  public evaluateGate(gateLevel: string, body: any) {
    return this.service.evaluateGate(gateLevel, body.passed, body.signoff);
  }

  public getKillSwitches() {
    return this.service.getKillSwitches();
  }

  public toggleKillSwitch(switchKey: string, body: any) {
    return this.service.toggleKillSwitch(switchKey, body.active, body.reason, body.actorId);
  }

  public getBetaCohorts() {
    return this.service.getBetaCohorts();
  }

  public recordFeedback(body: any) {
    return this.service.recordBetaFeedback(body);
  }

  public logDecision(body: any) {
    return this.service.logProductDecision(body);
  }

  public getDecisions() {
    return this.service.getDecisions();
  }

  public getExecutionHealth() {
    return this.service.getExecutionHealth();
  }
}
