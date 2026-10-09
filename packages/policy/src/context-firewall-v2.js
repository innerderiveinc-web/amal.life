"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextFirewallV2 = void 0;
class ContextFirewallV2 {
    /**
     * Filters and constructs a strictly bounded AIDataEnvelope.
     * Guarantees:
     * 1. No cross-user data leakage.
     * 2. Minimum necessary context per agent role.
     * 3. Redaction of sensitive fields without user consent.
     */
    static constructEnvelope(requestId, targetUserId, agentName, purpose, candidates, hasSensitiveConsent = false) {
        const allowedContextRefs = [];
        const redactedFields = [];
        const filteredContent = [];
        for (const item of candidates) {
            // 1. Cross-User Memory Firewall (Absolute zero tolerance)
            if (item.userId !== targetUserId) {
                continue;
            }
            // 2. Agent-Specific Context Isolation
            if (agentName === 'ReflectionAgent') {
                // Reflection agent may not see scholar correspondence or family notes
                if (item.type === 'SCHOLAR_CASE' || item.type === 'FAMILY_NOTE') {
                    redactedFields.push(`isolated_${item.type}_${item.id}`);
                    continue;
                }
            }
            else if (agentName === 'AmalPlanner') {
                // Amal planner only needs journey, amal events, and system capacity
                if (item.type === 'REFLECTION' || item.type === 'SCHOLAR_CASE') {
                    redactedFields.push(`isolated_${item.type}_${item.id}`);
                    continue;
                }
            }
            // 3. Sensitivity Classification & Redaction
            if ((item.dataClass === 'SENSITIVE' || item.dataClass === 'HIGHLY_SENSITIVE') &&
                !hasSensitiveConsent) {
                redactedFields.push(`sensitive_${item.id}`);
                continue;
            }
            allowedContextRefs.push(item.id);
            filteredContent.push({ id: item.id, content: item.content });
        }
        const envelope = {
            requestId,
            purpose,
            allowedDataClasses: hasSensitiveConsent
                ? ['PUBLIC', 'INTERNAL', 'PRIVATE', 'SENSITIVE']
                : ['PUBLIC', 'INTERNAL', 'PRIVATE'],
            contextRefs: allowedContextRefs,
            redactedFields,
            userConsentRefs: hasSensitiveConsent ? ['CONSENT_SENSITIVE_CONTEXT_GRANTED'] : [],
            safetyClass: 'SAFE_CONSTRAINED',
            expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15-minute ephemeral envelope
        };
        return { envelope, filteredContent };
    }
}
exports.ContextFirewallV2 = ContextFirewallV2;
//# sourceMappingURL=context-firewall-v2.js.map