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

export class ConsentManager {
  private static consents: Map<string, StoredConsent> = new Map(); // key: userId:purpose

  public static grantConsent(
    userId: string,
    purpose: string,
    scope: string = 'DEFAULT',
    policyVersion: string = '1.0'
  ): StoredConsent {
    const key = `${userId}:${purpose}`;
    const timestamp = new Date().toISOString();
    const proofHash = `proof_${userId}_${purpose}_${Date.now()}`;

    const consent: StoredConsent = {
      id: `cst_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId,
      purpose,
      scope,
      status: 'GRANTED',
      policyVersion,
      interfaceVersion: 'v1.0.0',
      proofHash,
      grantedAt: timestamp,
    };

    this.consents.set(key, consent);
    return consent;
  }

  public static revokeConsent(
    userId: string,
    purpose: string
  ): { consent: StoredConsent; cascadedActions: string[] } {
    const key = `${userId}:${purpose}`;
    const existing = this.consents.get(key) || {
      id: `cst_${Date.now()}`,
      userId,
      purpose,
      scope: 'DEFAULT',
      status: 'GRANTED' as const,
      policyVersion: '1.0',
      interfaceVersion: 'v1.0.0',
      proofHash: 'retro_proof',
    };

    const updated: StoredConsent = {
      ...existing,
      status: 'REVOKED',
      revokedAt: new Date().toISOString(),
    };

    this.consents.set(key, updated);

    // Cascaded withdrawals
    const cascadedActions: string[] = [
      `CANCEL_SCHEDULED_JOBS_FOR_${purpose}`,
      `STOP_DERIVED_LEARNING_FOR_${purpose}`,
      `PURGE_EPHEMERAL_INFERENCES_FOR_${purpose}`,
    ];

    return { consent: updated, cascadedActions };
  }

  public static isConsentGranted(userId: string, purpose: string): boolean {
    const key = `${userId}:${purpose}`;
    const record = this.consents.get(key);
    return !!record && record.status === 'GRANTED';
  }

  public static listUserConsents(userId: string): StoredConsent[] {
    const userConsents: StoredConsent[] = [];
    for (const [k, v] of this.consents.entries()) {
      if (k.startsWith(`${userId}:`)) {
        userConsents.push(v);
      }
    }
    return userConsents;
  }

  public static clear(): void {
    this.consents.clear();
  }
}
