/**
 * AMAL OS — V2.0: PERSONAL DEEN OPERATING SYSTEM DOMAIN TYPES
 * Multi-Domain Life Intelligence, Epistemic Labeling, Two-Graph Architecture,
 * Decision Support, Expert Escalation, and Specialized Modes.
 */

export type LifeDomain =
  | 'DEEN'
  | 'WORK'
  | 'STUDY'
  | 'FAMILY'
  | 'CHARACTER'
  | 'TIME'
  | 'KNOWLEDGE'
  | 'RAMADAN'
  | 'MARRIAGE_PREPARATION'
  | 'FINANCE'
  | 'TRAVEL'
  | 'HAJJ'
  | 'UMRAH'
  | 'COMMUNITY'
  | 'SERVICE'
  | 'PERSONAL_GROWTH';

export type EpistemicOrigin =
  | 'ISLAMIC_EVIDENCE'             // Nass Qat'i / Sahih Sunnah
  | 'SCHOLARLY_INTERPRETATION'     // Fiqh manual / Mu'tamad school position
  | 'GENERAL_PRACTICAL_GUIDANCE'   // Habit design / organizational method
  | 'BEHAVIORAL_SCIENCE'           // Cognitive / empirical habit psychology
  | 'USER_PREFERENCE'              // Seeker explicit choice
  | 'USER_CREATED_GOAL';           // Custom user target

export interface EpistemicallyLabeledItem {
  id: string;
  title: string;
  description: string;
  domain: LifeDomain;
  epistemicOrigin: EpistemicOrigin;
  authorityLevel: 'SACRED_CANONICAL' | 'SCHOLARLY_OPINION' | 'PRACTICAL_ADVISORY' | 'USER_AUTONOMOUS';
  evidenceCitation?: string;
  scholarAttribution?: string;
}

export interface LifeSituationClassification {
  situationId: string;
  userId: string;
  inputText: string;
  detectedDomains: LifeDomain[];
  primaryIntent: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRISIS';
  requiresIslamicEvidence: boolean;
  requiresExpertEscalation: boolean;
  suggestedExpertType?: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT' | 'COUNSELOR';
  decomposedSections: {
    islamicGuidance?: EpistemicallyLabeledItem[];
    practicalPlanning?: EpistemicallyLabeledItem[];
    recommendedAmals?: EpistemicallyLabeledItem[];
    timeScheduleProposal?: {
      slot: string;
      actionTitle: string;
      durationMinutes: number;
    }[];
  };
  createdAt: string;
}

export interface SmartTimeWindow {
  windowId: string;
  userId: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  windowType: 'AVAILABLE' | 'PREFERRED' | 'PROTECTED' | 'PRAYER_TIME' | 'QUIET_TIME' | 'FAMILY_TIME';
  scheduledAction?: {
    actionId: string;
    title: string;
    domain: LifeDomain;
  };
  prayerProximity?: string;
}

export interface LifeDecisionRecord {
  decisionId: string;
  userId: string;
  question: string;
  category: LifeDomain;
  options: {
    optionId: string;
    title: string;
    pros: string[];
    cons: string[];
    tradeOffs: string[];
    epistemicNotes?: string;
  }[];
  constraints: string[];
  relevantEvidence: EpistemicallyLabeledItem[];
  userChoice?: string;
  outcome?: string;
  reflection?: string;
  escalatedToExpert?: boolean;
  expertType?: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT';
  status: 'DRAFT' | 'DECIDED' | 'REVIEWED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface ExpertProfile {
  expertId: string;
  fullName: string;
  expertType: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT' | 'COUNSELOR';
  credentials: string[];
  accreditationBody: string;
  verified: boolean;
  activeCasesCount: number;
  jurisdictions?: string[];
}

export interface ExpertConsultationCase {
  caseId: string;
  userId: string;
  expertType: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT';
  domain: LifeDomain;
  question: string;
  anonymizedContext: Record<string, any>;
  assignedExpertId?: string;
  status: 'SUBMITTED' | 'TRIAGED' | 'IN_REVIEW' | 'RESPONDED' | 'CLOSED';
  expertResponse?: {
    responseId: string;
    expertId: string;
    findings: string;
    sourcesCited: string[];
    disclaimer: string;
    respondedAt: string;
  };
  createdAt: string;
}

export interface RamadanModeConfig {
  userId: string;
  active: boolean;
  hijriYear: number;
  taraweehTargetRakat: number;
  quranKhatmTarget: 'ONE_KHATM' | 'HALF_KHATM' | 'TWO_KHATM' | 'CUSTOM';
  dailyReadingMinutes: number;
  suhoorWakeupMinutesBeforeFajr: number;
  charityGoalCents: number;
  familyIftarCoordination: boolean;
  itikaafIntention: boolean;
}

export interface HajjUmrahModeConfig {
  userId: string;
  active: boolean;
  journeyType: 'HAJJ_TAMATTU' | 'HAJJ_QIRAN' | 'HAJJ_IFRAD' | 'UMRAH';
  departureDate: string;
  returnDate: string;
  completedChecklistIds: string[];
  emergencyContact: string;
  documentsVerified: boolean;
  dailyDuasPacingDay: number;
}

export interface TravelModeConfig {
  userId: string;
  active: boolean;
  originTimezone: string;
  destinationTimezone: string;
  qasrPrayerEligible: boolean;
  jamPrayerEligible: boolean;
  itinerarySummary: string;
  offlinePackDownloaded: boolean;
}

export interface PersonalLifeGraphNode {
  nodeId: string;
  userId: string;
  nodeType: 'GOAL' | 'JOURNEY' | 'ACTION' | 'OUTCOME' | 'PREFERENCE' | 'REFLECTION' | 'LESSON';
  domain: LifeDomain;
  title: string;
  metadata: Record<string, any>;
  connectedNodeIds: string[];
  createdAt: string;
}
