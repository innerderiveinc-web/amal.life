import { CommunicationChannel, MessagingProvider, SendMessageRequest, SendMessageResponse, DeliveryWebhookPayload } from '@amal/types';
export declare class QsuraGateway implements MessagingProvider {
    readonly name = "QSURA_CPAAS";
    readonly supportedChannels: CommunicationChannel[];
    private dispatchedMessages;
    private idempotencyRegistry;
    /**
     * Dispatches a message through QSURA CPaaS
     */
    send(req: SendMessageRequest): Promise<SendMessageResponse>;
    getStatus(providerMessageId: string): Promise<string>;
    /**
     * Processes an incoming delivery status webhook from QSURA
     */
    handleWebhook(payload: DeliveryWebhookPayload): Promise<{
        acknowledged: boolean;
    }>;
    getDispatchedMessages(): Array<SendMessageRequest & {
        status: string;
        sentAt: string;
    }>;
    clear(): void;
}
//# sourceMappingURL=qsura-gateway.d.ts.map