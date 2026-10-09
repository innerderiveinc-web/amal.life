import { AmalAIRequest, RuntimeState } from '@amal/types';
export declare class AiRuntimeEngine {
    static process(request: AmalAIRequest): Promise<{
        status: RuntimeState;
        intent: string;
        safetyClass: string;
        evidenceCount: number;
        claimsVerified: boolean;
        citationsVerified: boolean;
    }>;
}
//# sourceMappingURL=index.d.ts.map