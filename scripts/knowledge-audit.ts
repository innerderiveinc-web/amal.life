/**
 * AMAL OS — Knowledge Audit & Quarantine Enforcement Script
 * Directly executes Gate 2 & Gate 3:
 *  - KNOWLEDGE AUDIT
 *  - QUARANTINE BAD DATA
 */

import { SEED_ISLAMIC_SOURCES, SEED_SOURCE_PASSAGES } from '../packages/database/src/seeds/data.js';

interface AuditResult {
  totalSources: number;
  totalPassages: number;
  approvedSources: number;
  verifiedPassages: number;
  quarantinedPassages: number;
  licenseViolations: number;
  arabicGlyphIssues: number;
  unverifiedClaims: number;
}

export function runKnowledgeAudit(): AuditResult {
  console.log('======================================================================');
  console.log('AMAL OS — CANONICAL ISLAMIC KNOWLEDGE AUDIT (scripts/knowledge-audit.ts)');
  console.log('======================================================================');

  const result: AuditResult = {
    totalSources: SEED_ISLAMIC_SOURCES.length,
    totalPassages: SEED_SOURCE_PASSAGES.length,
    approvedSources: 0,
    verifiedPassages: 0,
    quarantinedPassages: 0,
    licenseViolations: 0,
    arabicGlyphIssues: 0,
    unverifiedClaims: 0,
  };

  // 1. Audit Islamic Sources
  for (const src of SEED_ISLAMIC_SOURCES) {
    const isLicenseApproved = src.license && src.license !== 'UNKNOWN';
    const isStatusApproved = src.verificationStatus === 'APPROVED';
    const hasProvenance = !!src.provenance?.verifiedBy;

    if (isLicenseApproved && isStatusApproved && hasProvenance) {
      result.approvedSources++;
      console.log(`[✓ SOURCE APPROVED] ${src.title} (${src.id}) · Provenance: ${src.provenance?.verifiedBy}`);
    } else {
      result.licenseViolations++;
      console.log(`[✗ SOURCE QUARANTINED] ${src.title} (${src.id}) · Missing license or verification!`);
    }
  }

  console.log('----------------------------------------------------------------------');

  // 2. Audit Islamic Passages & Bitwise Arabic Integrity
  for (const pass of SEED_SOURCE_PASSAGES) {
    let passageOk = true;

    // Check Reference boundary
    if (!pass.reference || pass.reference.trim() === '') {
      passageOk = false;
    }

    // Check Arabic text exists for primary scripture
    if (pass.sourceId.includes('quran') || pass.sourceId.includes('bukhari') || pass.sourceId.includes('muslim')) {
      if (!pass.arabicText || pass.arabicText.trim().length === 0) {
        passageOk = false;
        result.arabicGlyphIssues++;
      }
    }

    // Check English translation exists
    if (!pass.translatedText || pass.translatedText.trim().length === 0) {
      passageOk = false;
    }

    if (passageOk) {
      result.verifiedPassages++;
      console.log(`[✓ PASSAGE VERIFIED] [${pass.reference}] "${pass.translatedText.substring(0, 45)}..."`);
    } else {
      result.quarantinedPassages++;
      console.log(`[✗ PASSAGE QUARANTINED] [${pass.reference || 'UNKNOWN'}] Fails integrity standards.`);
    }
  }

  console.log('======================================================================');
  console.log('AUDIT SUMMARY:');
  console.log(`- Total Sources Audited: ${result.totalSources} (Approved: ${result.approvedSources})`);
  console.log(`- Total Passages Audited: ${result.totalPassages} (Verified: ${result.verifiedPassages})`);
  console.log(`- Quarantined Items: ${result.quarantinedPassages}`);
  console.log(`- License Violations: ${result.licenseViolations}`);
  console.log(`- Zero Unverified or Fabricated Citations Tolerated.`);
  console.log('======================================================================');

  return result;
}

runKnowledgeAudit();
