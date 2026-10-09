import { AuthorityLicenseStatus } from '@amal/types';
export interface RegisteredLicense {
    id: string;
    name: string;
    status: AuthorityLicenseStatus;
    commercialAllowed: boolean;
    attributionRequired: boolean;
    redistributionAllowed: boolean;
    notes?: string;
}
export declare class LicenseRegistry {
    private static licenses;
    static registerLicense(license: RegisteredLicense): void;
    static getLicense(id: string): RegisteredLicense | undefined;
    /**
     * License Gate: Rejects UNKNOWN, EXPIRED, RESTRICTED, or unapproved licenses.
     */
    static verifyLicense(licenseId: string): {
        valid: boolean;
        reason?: string;
    };
}
//# sourceMappingURL=license-registry.d.ts.map