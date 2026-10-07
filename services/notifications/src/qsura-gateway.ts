import {
  CommunicationChannel,
  MessagingProvider,
  SendMessageRequest,
  SendMessageResponse,
  DeliveryWebhookPayload,
} from '@amal/types';

export class QsuraGateway implements MessagingProvider {
  public readonly name = 'QSURA_CPAAS';
  public readonly supportedChannels: CommunicationChannel[] = [
    'IN_APP',
    'PUSH',
    'WHATSAPP',
    'EMAIL',
    'SMS',
    'VOICE',
  ];

  // In-memory ledger of sent dispatches for testing and auditing
  private dispatchedMessages: Map<string, SendMessageRequest & { status: string; sentAt: string }> = new Map();
  private idempotencyRegistry: Set<string> = new Set();

  /**
   * Dispatches a message through QSURA CPaaS
   */
  public async send(req: SendMessageRequest): Promise<SendMessageResponse> {
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

  public async getStatus(providerMessageId: string): Promise<string> {
    const record = this.dispatchedMessages.get(providerMessageId);
    return record ? record.status : 'UNKNOWN';
  }

  /**
   * Processes an incoming delivery status webhook from QSURA
   */
  public async handleWebhook(payload: DeliveryWebhookPayload): Promise<{ acknowledged: boolean }> {
    const record = this.dispatchedMessages.get(payload.providerMessageId);
    if (record) {
      record.status = payload.status;
    }
    return { acknowledged: true };
  }

  public getDispatchedMessages(): Array<SendMessageRequest & { status: string; sentAt: string }> {
    return Array.from(this.dispatchedMessages.values());
  }

  public clear(): void {
    this.dispatchedMessages.clear();
    this.idempotencyRegistry.clear();
  }
}
