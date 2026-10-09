/**
 * AMAL OS — LAYER 19: AUDIT SERVICE (Sections 60-61, 149)
 * Unified tamper-evident audit logger with automated PII redaction.
 */
import { auditRepository } from '@amal/database';
import { redactSensitiveData } from './redaction.js';
export * from './redaction.js';
export class AuditService {
    async record(input) {
        const cleanMetadata = input.metadata ? redactSensitiveData(input.metadata) : {};
        return auditRepository.record({
            ...input,
            metadata: cleanMetadata,
        });
    }
    async findByResource(resourceType, resourceId) {
        return auditRepository.findByResource(resourceType, resourceId);
    }
}
export const audit = new AuditService();
//# sourceMappingURL=index.js.map