"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FourEyesAdminService = void 0;
const tamper_evident_audit_js_1 = require("./tamper-evident-audit.js");
class FourEyesAdminService {
    static proposals = new Map();
    static breakGlassSessions = new Map();
    static proposeConfigChange(category, operatorId, beforeConfig, afterConfig) {
        const id = `chg_${Date.now()}`;
        const proposal = {
            id,
            category,
            proposedBy: operatorId,
            status: 'PENDING_SECOND_APPROVAL',
            beforeConfig,
            afterConfig,
            createdAt: new Date().toISOString(),
        };
        this.proposals.set(id, proposal);
        return proposal;
    }
    static approveConfigChange(changeId, secondOperatorId) {
        const change = this.proposals.get(changeId);
        if (!change) {
            throw new Error(`Change proposal ${changeId} not found.`);
        }
        if (change.proposedBy === secondOperatorId) {
            throw new Error('Four-Eyes principle violation: Second approver must be distinct from author.');
        }
        change.status = 'APPROVED';
        change.approvedBy = secondOperatorId;
        tamper_evident_audit_js_1.TamperEvidentAuditService.recordEvent({
            actorId: secondOperatorId,
            actorType: 'ADMIN',
            action: 'APPROVE_FOUR_EYES_CONFIG_CHANGE',
            resourceType: change.category,
            resourceId: changeId,
            purpose: 'SECURITY',
            outcome: 'SUCCESS',
            metadata: { proposedBy: change.proposedBy },
        });
        return change;
    }
    static grantBreakGlassAccess(adminId, approverId, justification, scope, durationMinutes = 60) {
        if (adminId === approverId) {
            throw new Error('Break-Glass violation: Requester cannot self-approve emergency access.');
        }
        const sessionId = `bg_${Date.now()}`;
        const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();
        const session = {
            sessionId,
            adminId,
            approverId,
            justification,
            scope,
            expiresAt,
            active: true,
        };
        this.breakGlassSessions.set(sessionId, session);
        tamper_evident_audit_js_1.TamperEvidentAuditService.recordEvent({
            actorId: adminId,
            actorType: 'ADMIN',
            action: 'ACTIVATE_BREAK_GLASS_SESSION',
            resourceType: 'SYSTEM_ADMINISTRATION',
            resourceId: sessionId,
            purpose: 'SECURITY',
            outcome: 'SUCCESS',
            metadata: { approverId, justification, scope, expiresAt },
        });
        return session;
    }
    static isBreakGlassActive(sessionId) {
        const s = this.breakGlassSessions.get(sessionId);
        if (!s || !s.active)
            return false;
        return new Date(s.expiresAt).getTime() > Date.now();
    }
}
exports.FourEyesAdminService = FourEyesAdminService;
//# sourceMappingURL=four-eyes-admin.js.map