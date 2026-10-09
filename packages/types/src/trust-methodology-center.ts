/**
 * AMAL TRUST & METHODOLOGY CENTER — CONTRACTS & TYPES
 * Public Transparency, Verification Methodology, Scholarly Governance & Non-Authority Declarations
 */

export type TrustPolicySlug =
  | 'source-policy'
  | 'scholar-policy'
  | 'madhhab-policy'
  | 'translation-policy'
  | 'tasawwuf-policy'
  | 'citation-policy'
  | 'ai-policy'
  | 'uncertainty-policy'
  | 'correction-policy'
  | 'rights-policy'
  | 'version-history';

export interface TrustPolicyDocument {
  slug: TrustPolicySlug;
  title: string;
  summary: string;
  lastUpdated: string;
  version: string;
  corePrinciples: string[];
  operationalRules: string[];
  nonNegotiables: string[];
  publicExcerpt: string;
}

export interface VerificationPipelineStage {
  stage: number;
  code: string;
  name: string;
  description: string;
  prerequisites: string[];
  humanReviewRequired: boolean;
  outputStatus: string;
}

export interface NonAuthorityDisclaimer {
  primaryDeclaration: string;
  legalBoundary: string;
  theologicalBoundary: string;
  epistemicBoundary: string;
  humanScholarSupremacy: string;
  userAutonomousAccountability: string;
}

export interface MethodologyVersionRelease {
  version: string;
  releaseDate: string;
  title: string;
  summary: string;
  changes: string[];
  verifiedCorpusCount: number;
  scholarSignoffsCount: number;
  redTeamScore: string;
}

export interface TrustCenterManifest {
  centerName: string;
  tagline: string;
  nonAuthorityDisclaimer: NonAuthorityDisclaimer;
  policies: TrustPolicyDocument[];
  verificationPipeline: VerificationPipelineStage[];
  versionHistory: MethodologyVersionRelease[];
  stats: {
    totalWorksInAtlas: number;
    totalPublishedVerifiedWorks: number;
    activeScholarsInNetwork: number;
    supportedMadhhabs: string[];
    epistemicLayersGuarded: number;
    zeroHallucinationStandard: boolean;
  };
}
