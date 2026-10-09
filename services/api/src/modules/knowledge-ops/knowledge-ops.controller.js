"use strict";
// ==============================================================================
// AMAL OS — LAYER 14: KNOWLEDGE OPERATIONS & SCHOLAR NETWORK CONTROLLER
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeOpsController = void 0;
class KnowledgeOpsController {
    service;
    constructor(service) {
        this.service = service;
    }
    // Public Knowledge APIs
    getSources() {
        return this.service.getSources();
    }
    getSourceById(id) {
        return this.service.getSourceById(id);
    }
    getAyah(surah, ayah) {
        return this.service.getAyah(surah, ayah);
    }
    getHadith(collection, num) {
        return this.service.getHadith(collection, num);
    }
    getIssue(issueId) {
        return this.service.getIssueWithPlurality(issueId);
    }
    getConcept(conceptKey) {
        return this.service.getConcept(conceptKey);
    }
    getLifeSituation(situationKey) {
        return this.service.getLifeSituation(situationKey);
    }
    openDispute(body) {
        return this.service.openDispute(body);
    }
    resolveDispute(disputeId, resolution, notes) {
        return this.service.resolveDispute(disputeId, resolution, notes);
    }
    // Scholar APIs
    getScholars() {
        return this.service.getScholars();
    }
    getScholarById(id) {
        return this.service.getScholarById(id);
    }
    createScholarCase(body) {
        return this.service.createScholarCase(body.userId, body.question, body.category, body.context, body.urgency);
    }
    getScholarCases() {
        return this.service.getScholarCases();
    }
    getScholarCaseById(id) {
        return this.service.getScholarCaseById(id);
    }
    answerScholarCase(caseId, body) {
        return this.service.answerScholarCase(caseId, body.scholarId, body.answer, body.evidenceRefs, body.uncertaintyCondition);
    }
    peerReviewScholarCase(caseId, body) {
        return this.service.peerReviewScholarCase(caseId, body.secondScholarId, body.approved, body.peerNotes);
    }
    // Content Operations Internal APIs
    acquireSource(body) {
        return this.service.acquireSource(body);
    }
    validateSource(sourceId) {
        return this.service.validateSource(sourceId);
    }
    approveSource(sourceId, approverRole) {
        return this.service.approveSource(sourceId, approverRole);
    }
    createRelease(body) {
        return this.service.createRelease(body.releaseTag, body.approverId, body.notes);
    }
    publishRelease(releaseId) {
        return this.service.publishRelease(releaseId);
    }
    rollbackRelease(releaseId) {
        return this.service.rollbackRelease(releaseId);
    }
    runBenchmarks() {
        return this.service.runBenchmarks();
    }
    getHealth() {
        return this.service.getHealthScorecard();
    }
}
exports.KnowledgeOpsController = KnowledgeOpsController;
//# sourceMappingURL=knowledge-ops.controller.js.map