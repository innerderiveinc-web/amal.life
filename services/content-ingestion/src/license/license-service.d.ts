export type LicenseStatus = 'LICENSED' | 'PUBLIC_DOMAIN' | 'AUTHORIZED' | 'USER_PROVIDED' | 'RESTRICTED' | 'UNKNOWN' | 'EXPIRED' | 'REJECTED';
export declare class LicenseService {
    static isAuthoritativeAllowed(status: LicenseStatus): boolean;
    static verifyLicense(source: {
        title: string;
        licenseStatus: LicenseStatus;
    }): {
        valid: boolean;
        reason?: string;
    };
}
//# sourceMappingURL=license-service.d.ts.map