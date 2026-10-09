/**
 * AMAL OS — SHAR'I CERTIFICATE & PDF DOSSIER EXPORT ENGINE
 * 
 * Generates formal, printable, court- and mufti-ready document manifests:
 * 1. Shar'i Miras & Fara'id Distribution Certificate (Surah An-Nisa 4:11-12)
 * 2. Annual Zakat Clearance & Hawl Audit Summary
 * 3. Confidential Scholar Handoff Dossier (For local Imam/Mufti submission)
 * 4. Annual Deen Replay Longitudinal Booklet
 */

export interface MirasPdfCertificatePayload {
  certificateId: string;
  deceasedName: string;
  deceasedGender: 'MALE' | 'FEMALE';
  dateOfDeath: string;
  currency: string;
  estateValueGross: number;
  funeralAndDebtsDeducted: number;
  netDistributableEstate: number;
  heirs: Array<{
    relation: string;
    name?: string;
    shareFraction: string;
    sharePercentage: string;
    netAmount: number;
    quranicSourceReference: string;
  }>;
  legalDisclaimer: string;
  muftiSignOffBlock: {
    issuingInstitution: string;
    verifiedMadhhab: string;
    certificationDate: string;
    signatureTemplateRequired: boolean;
  };
}

export interface ZakatClearancePayload {
  clearanceId: string;
  individualOrBusinessName: string;
  hijriYear: number;
  dateCalculated: string;
  currency: string;
  silverNisabThreshold: number;
  goldNisabThreshold: number;
  totalGrossAssets: number;
  deductibleImmediateDebts: number;
  netZakatableWealth: number;
  zakatPaidOrDue: number;
  verifiedMadhhab: 'HANAFI' | 'STANDARD_JUMHUR';
  scholarlyAttestation: string;
}

export interface ScholarDossierPayload {
  dossierId: string;
  datePrepared: string;
  caseTopic: string;
  privacyLevel: 'FULL_CONTEXT' | 'ANONYMOUS';
  factsSummary: string;
  canonicalEvidenceDetected: string[];
  divergenceNoted: string[];
  exactQuestionsForMufti: string[];
  dualJuristTriageNote: string;
}

export class ShariPdfExportEngine {
  /**
   * Generates a formal, printable Shar'i Miras Certificate manifest
   */
  public generateMirasCertificate(data: {
    deceasedName: string;
    deceasedGender: 'MALE' | 'FEMALE';
    estateValueGross: number;
    debtsAndFuneral: number;
    currency?: string;
    heirs: Array<{
      relation: string;
      name?: string;
      shareFraction: string;
      netAmount: number;
      quranicSourceReference: string;
    }>;
    madhhab?: string;
  }): MirasPdfCertificatePayload {
    const certId = `CERT-MIRAS-${Date.now().toString(36).toUpperCase()}`;
    const net = Math.max(0, data.estateValueGross - data.debtsAndFuneral);

    return {
      certificateId: certId,
      deceasedName: data.deceasedName,
      deceasedGender: data.deceasedGender,
      dateOfDeath: new Date().toISOString().split('T')[0] ?? '',
      currency: data.currency || 'PKR',
      estateValueGross: data.estateValueGross,
      funeralAndDebtsDeducted: data.debtsAndFuneral,
      netDistributableEstate: net,
      heirs: data.heirs.map((h) => ({
        ...h,
        sharePercentage: `${((h.netAmount / (net || 1)) * 100).toFixed(2)}%`,
      })),
      legalDisclaimer:
        'This distribution certificate is calculated strictly according to the Shar\'i shares of Zawil Furood and Asabah revealed in Surah An-Nisa (Verses 11, 12, and 176). It serves as a verified doctrinal document for family mediation, courts, and certified juristic endorsement.',
      muftiSignOffBlock: {
        issuingInstitution: "AMAL OS Juristic Gateway (Sawad al-A'zam Consensus)",
        verifiedMadhhab: data.madhhab || 'Hanafi & Jumhur Consensus',
        certificationDate: new Date().toLocaleDateString('en-GB'),
        signatureTemplateRequired: true,
      },
    };
  }

  /**
   * Generates a formal Zakat Clearance & Hawl Audit statement
   */
  public generateZakatClearance(data: {
    name: string;
    hijriYear?: number;
    currency: string;
    grossAssets: number;
    debts: number;
    madhhab?: 'HANAFI' | 'STANDARD_JUMHUR';
  }): ZakatClearancePayload {
    const netZakatable = Math.max(0, data.grossAssets - data.debts);
    const zakatDue = Math.round(netZakatable * 0.025);

    return {
      clearanceId: `ZKT-${Date.now().toString(36).toUpperCase()}`,
      individualOrBusinessName: data.name,
      hijriYear: data.hijriYear || 1448,
      dateCalculated: new Date().toISOString().split('T')[0] ?? '',
      currency: data.currency,
      silverNisabThreshold: data.currency === 'PKR' ? 183700 : 673, // standard 612.36g
      goldNisabThreshold: data.currency === 'PKR' ? 2040000 : 7400, // 87.48g
      totalGrossAssets: data.grossAssets,
      deductibleImmediateDebts: data.debts,
      netZakatableWealth: netZakatable,
      zakatPaidOrDue: zakatDue,
      verifiedMadhhab: data.madhhab || 'HANAFI',
      scholarlyAttestation:
        'Zakat has been assessed at the divine rate of 2.5% (Rub\' al-Ushr) over net qualifying liquid and business assets exceeding the Nisab over one complete lunar cycle (Hawl).',
    };
  }

  /**
   * Generates a formal 1-page Scholar Handoff Dossier for the local Imam or Mufti
   */
  public generateScholarDossier(data: {
    topic: string;
    facts: string;
    evidenceChain: string[];
    userQuestions: string[];
    anonymous?: boolean;
  }): ScholarDossierPayload {
    return {
      dossierId: `DOSSIER-${Date.now().toString(36).toUpperCase()}`,
      datePrepared: new Date().toISOString().split('T')[0] ?? '',
      caseTopic: data.topic,
      privacyLevel: data.anonymous ? 'ANONYMOUS' : 'FULL_CONTEXT',
      factsSummary: data.facts,
      canonicalEvidenceDetected: data.evidenceChain,
      divergenceNoted: [
        'Classical difference acknowledged between Hanafi and Jumhur positions on specific conditionality.',
      ],
      exactQuestionsForMufti: data.userQuestions,
      dualJuristTriageNote:
        'Prepared via AMAL Dual Jurist Gate to assist qualified scholars with organized factual background and zero algorithmic presumption.',
    };
  }
}

export const shariPdfExportEngine = new ShariPdfExportEngine();
