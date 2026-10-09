"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseRegistry = void 0;
class LicenseRegistry {
    static licenses = new Map([
        [
            'OPEN_VERIFIED_ISLAMIC_HERITAGE',
            {
                id: 'OPEN_VERIFIED_ISLAMIC_HERITAGE',
                name: 'Public Domain Islamic Revelation & Heritage',
                status: 'APPROVED',
                commercialAllowed: true,
                attributionRequired: true,
                redistributionAllowed: true,
            },
        ],
        [
            'OPEN_ACADEMIC_VERIFIED',
            {
                id: 'OPEN_ACADEMIC_VERIFIED',
                name: 'Academic Open License for Normalized Hadith Corpora',
                status: 'APPROVED',
                commercialAllowed: true,
                attributionRequired: true,
                redistributionAllowed: true,
            },
        ],
        [
            'SCHOLARLY_HERITAGE',
            {
                id: 'SCHOLARLY_HERITAGE',
                name: 'Classical Scholarly Tafsir Heritage',
                status: 'APPROVED',
                commercialAllowed: true,
                attributionRequired: true,
                redistributionAllowed: true,
            },
        ],
        [
            'COMMERCIAL_PROPRIETARY',
            {
                id: 'COMMERCIAL_PROPRIETARY',
                name: 'Restricted Commercial Copyright',
                status: 'RESTRICTED',
                commercialAllowed: false,
                attributionRequired: true,
                redistributionAllowed: false,
            },
        ],
        [
            'UNKNOWN',
            {
                id: 'UNKNOWN',
                name: 'Unverified Unknown License',
                status: 'UNKNOWN',
                commercialAllowed: false,
                attributionRequired: false,
                redistributionAllowed: false,
                notes: 'Strictly prohibited from production ingestion.',
            },
        ],
    ]);
    static registerLicense(license) {
        this.licenses.set(license.id, license);
    }
    static getLicense(id) {
        return this.licenses.get(id);
    }
    /**
     * License Gate: Rejects UNKNOWN, EXPIRED, RESTRICTED, or unapproved licenses.
     */
    static verifyLicense(licenseId) {
        const lic = this.licenses.get(licenseId);
        if (!lic) {
            return { valid: false, reason: `LICENSE_NOT_REGISTERED: License ${licenseId} is not in the registry.` };
        }
        if (lic.status === 'UNKNOWN') {
            return { valid: false, reason: 'UNKNOWN_LICENSE: Content with unknown license cannot be published.' };
        }
        if (lic.status === 'EXPIRED') {
            return { valid: false, reason: 'EXPIRED_LICENSE: License rights have expired.' };
        }
        if (lic.status === 'RESTRICTED') {
            return { valid: false, reason: 'RESTRICTED_LICENSE: License does not grant production redistribution rights.' };
        }
        if (lic.status !== 'APPROVED' && lic.status !== 'PUBLIC_DOMAIN') {
            return { valid: false, reason: `UNAPPROVED_LICENSE_STATUS: License status is ${lic.status}.` };
        }
        return { valid: true };
    }
}
exports.LicenseRegistry = LicenseRegistry;
//# sourceMappingURL=license-registry.js.map