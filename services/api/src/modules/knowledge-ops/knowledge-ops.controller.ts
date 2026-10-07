// ==============================================================================
// AMAL OS — LAYER 14: KNOWLEDGE OPERATIONS & SCHOLAR NETWORK CONTROLLER
// ==============================================================================

import { KnowledgeOpsService } from './knowledge-ops.service.js';

export class KnowledgeOpsController {
  constructor(private readonly service: KnowledgeOpsService) {}

  // Public Knowledge APIs
  public getSources() {
    return this.service.getSources();
  }

  public getSourceById(id: string) {
    return this.service.getSourceById(id);
  }

  public getAyah(surah: number, ayah: number) {
    return this.service.getAyah(surah, ayah);
  }

  public getHadith(collection: string, num: number) {
    return this.service.getHadith(collection, num);
  }

  public getIssue(issueId: string) {
    return this.service.getIssueWithPlurality(issueId);
  }

  public getConcept(conceptKey: string) {
    return this.service.getConcept(conceptKey);
  }

  public getLifeSituation(situationKey: string) {
    return this.service.getLifeSituation(situationKey);
  }

  public openDispute(body: any) {
    return this.service.openDispute(body);
  }

  public resolveDispute(disputeId: string, resolution: any, notes: string) {
    return this.service.resolveDispute(disputeId, resolution, notes);
  }

  // Scholar APIs
  public getScholars() {
    return this.service.getScholars();
  }

  public getScholarById(id: string) {
    return this.service.getScholarById(id);
  }

  public createScholarCase(body: any) {
    return this.service.createScholarCase(body.userId, body.question, body.category, body.context, body.urgency);
  }

  public getScholarCases() {
    return this.service.getScholarCases();
  }

  public getScholarCaseById(id: string) {
    return this.service.getScholarCaseById(id);
  }

  public answerScholarCase(caseId: string, body: any) {
    return this.service.answerScholarCase(caseId, body.scholarId, body.answer, body.evidenceRefs, body.uncertaintyCondition);
  }

  public peerReviewScholarCase(caseId: string, body: any) {
    return this.service.peerReviewScholarCase(caseId, body.secondScholarId, body.approved, body.peerNotes);
  }

  // Content Operations Internal APIs
  public acquireSource(body: any) {
    return this.service.acquireSource(body);
  }

  public validateSource(sourceId: string) {
    return this.service.validateSource(sourceId);
  }

  public approveSource(sourceId: string, approverRole: any) {
    return this.service.approveSource(sourceId, approverRole);
  }

  public createRelease(body: any) {
    return this.service.createRelease(body.releaseTag, body.approverId, body.notes);
  }

  public publishRelease(releaseId: string) {
    return this.service.publishRelease(releaseId);
  }

  public rollbackRelease(releaseId: string) {
    return this.service.rollbackRelease(releaseId);
  }

  public runBenchmarks() {
    return this.service.runBenchmarks();
  }

  public getHealth() {
    return this.service.getHealthScorecard();
  }
}
