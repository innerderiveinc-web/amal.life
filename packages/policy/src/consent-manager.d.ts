export interface StoredConsent {
    id: string;
    userId: string;
    purpose: string;
    scope: string;
    status: 'GRANTED' | 'DENIED' | 'REVOKED';
    policyVersion: string;
    interfaceVersion: string;
    proofHash: string;
    grantedAt?: string;
    revokedAt?: string;
}
export declare class ConsentManager {
    private static consents;
    static grantConsent(userId: string, purpose: string, scope?: string, policyVersion?: string): StoredConsent;
    static revokeConsent(userId: string, purpose: string): {
        consent: StoredConsent;
        cascadedActions: string[];
    };
    static isConsentGranted(userId: string, purpose: string): boolean;
    static listUserConsents(userId: string): StoredConsent[];
    static clear(): void;
}
//# sourceMappingURL=consent-manager.d.ts.map