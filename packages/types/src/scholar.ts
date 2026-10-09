import { Madhhab } from './user.js';
import { EvidencePackItem } from './evidence.js';

export type ScholarVerificationStatus =
  | 'APPLIED'
  | 'CREDENTIALS_SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'VERIFIED'
  | 'PENDING'
  | 'SUSPENDED'
  | 'REVOKED'
  | 'REJECTED';

export type ContentDisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISPUTE_PRESERVED';

export interface ScholarProfile {
  id: string;
  userId: string;
  name?: string;
  fullName?: string;
  title?: string;
  institution?: string;
  institutions?: string[];
  credentials?: string[];
  fields?: string[];
  madhhab?: Madhhab | string;
  madhhabAffiliation?: string;
  specializations?: string[];
  verificationStatus: ScholarVerificationStatus;
  verifiedAt?: string;
  bio?: string;
  availableForCases?: boolean;
  activeCaseCount?: number;
}

export type CaseStatus =
  | 'PENDING_TRIAGE'
  | 'ASSIGNED'
  | 'UNDER_SCHOLAR_REVIEW'
  | 'ANSWERED'
  | 'CLOSED';

export type CaseUrgency = 'NORMAL' | 'HIGH';

export interface ScholarCase {
  id: string;
  userId: string;
  assignedScholarId?: string | null;
  userQuestion: string;
  sanitizedContext: string;
  detectedFiqhIssue: string;
  relevantSources: EvidencePackItem[];
  userConsentGranted: boolean;
  urgency: CaseUrgency;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ScholarCaseMessage {
  id: string;
  caseId: string;
  authorId: string;
  isScholar: boolean;
  messageText: string;
  citedPassageReferences?: string[];
  sentAt: string;
}
