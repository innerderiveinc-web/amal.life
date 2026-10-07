export type LicenseStatus =
  | 'LICENSED'
  | 'PUBLIC_DOMAIN'
  | 'AUTHORIZED'
  | 'USER_PROVIDED'
  | 'RESTRICTED'
  | 'UNKNOWN'
  | 'EXPIRED'
  | 'REJECTED';

export class LicenseService {
  public static isAuthoritativeAllowed(status: LicenseStatus): boolean {
    return status === 'LICENSED' || status === 'PUBLIC_DOMAIN' || status === 'AUTHORIZED';
  }

  public static verifyLicense(source: { title: string; licenseStatus: LicenseStatus }): { valid: boolean; reason?: string } {
    if (!this.isAuthoritativeAllowed(source.licenseStatus)) {
      return {
        valid: false,
        reason: `LICENSE_REJECTED: License status '${source.licenseStatus}' is prohibited from entering authoritative production corpus.`,
      };
    }
    return { valid: true };
  }
}
