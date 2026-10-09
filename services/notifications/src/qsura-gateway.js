"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QsuraGateway = void 0;
class QsuraGateway {
    name = 'QSURA_CPAAS';
    supportedChannels = [
        'IN_APP',
        'PUSH',
        'WHATSAPP',
        'EMAIL',
        'SMS',
        'VOICE',
    ];
    // In-memory ledger of sent dispatches for testing and auditing
    dispatchedMessages = new Map();
    idempotencyRegistry = new Set();
    /**
     * Dispatches a message through QSURA CPaaS
     */
    async send(req) {
        // Idempotency check
        if (this.idempotencyRegistry.has(req.idempotencyKey)) {
            return {
                success: true,
                provider: this.name,
                channel: req.channel,
                status: 'QUEUED',
                providerMessageId: `qsura-idemp-${req.idempotencyKey}`,
            };
        }
        this.idempotencyRegistry.add(req.idempotencyKey);
        const messageId = `qsura-msg-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        this.dispatchedMessages.set(messageId, {
            ...req,
            status: 'SENT',
            sentAt: new Date().toISOString(),
        });
        return {
            success: true,
            providerMessageId: messageId,
            provider: this.name,
            channel: req.channel,
            status: 'SENT',
        };
    }
    async getStatus(providerMessageId) {
        const record = this.dispatchedMessages.get(providerMessageId);
        return record ? record.status : 'UNKNOWN';
    }
    /**
     * Processes an incoming delivery status webhook from QSURA
     */
    async handleWebhook(payload) {
        const record = this.dispatchedMessages.get(payload.providerMessageId);
        if (record) {
            record.status = payload.status;
        }
        return { acknowledged: true };
    }
    getDispatchedMessages() {
        return Array.from(this.dispatchedMessages.values());
    }
    clear() {
        this.dispatchedMessages.clear();
        this.idempotencyRegistry.clear();
    }
}
exports.QsuraGateway = QsuraGateway;
//# sourceMappingURL=qsura-gateway.js.map