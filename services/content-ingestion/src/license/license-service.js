"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseService = void 0;
class LicenseService {
    static isAuthoritativeAllowed(status) {
        return status === 'LICENSED' || status === 'PUBLIC_DOMAIN' || status === 'AUTHORIZED';
    }
    static verifyLicense(source) {
        if (!this.isAuthoritativeAllowed(source.licenseStatus)) {
            return {
                valid: false,
                reason: `LICENSE_REJECTED: License status '${source.licenseStatus}' is prohibited from entering authoritative production corpus.`,
            };
        }
        return { valid: true };
    }
}
exports.LicenseService = LicenseService;
//# sourceMappingURL=license-service.js.map