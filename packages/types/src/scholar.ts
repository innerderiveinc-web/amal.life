import { Madhhab } from './user.js';
import { EvidencePackItem } from './evidence.js';

export type ScholarVerificationStatus =
  | 'APPLIED'
  | 'CREDENTIALS_SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export interface ScholarProfile {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  institution: string;
  madhhab: Madhhab;
  specializations: string[];
  verificationStatus: ScholarVerificationStatus;
  bio: string;
  availableForCases: boolean;
  activeCaseCount: number;
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
