/**
 * AMAL OS V1 — LAYER 18: ACTUAL BUILD EXECUTION PACK CONTRACTS
 * File-level implementation manifests, sprint roadmaps, and Critical User Journeys (CUJs).
 */

export type ModulePriority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
export type ModuleImplementationStatus = 'READY' | 'IN_PROGRESS' | 'IMPLEMENTED' | 'VERIFIED';

export interface ExecutionModule {
  id: string;
  moduleCode: string;
  moduleName: string;
  packagePath: string;
  sprintNumber: number;
  priority: ModulePriority;
  status: ModuleImplementationStatus;
  fileCount: number;
  testCount: number;
  leadSquad: string;
  dependencies: string[];
}

export type CUJVerificationStatus = 'PENDING' | 'VERIFIED' | 'FAILED';

export interface CriticalUserJourney {
  cujId: string;
  title: string;
  category: string;
  sequenceSteps: string[];
  verificationStatus: CUJVerificationStatus;
  failureMode?: string;
  acceptanceCriteria: string;
}

export type ReleaseMilestone = 'V0.1' | 'V0.5' | 'V0.8' | 'V1.0' | 'POST_V1';

export interface SprintExecutionPlan {
  sprintNumber: number;
  sprintName: string;
  releaseMilestone: ReleaseMilestone;
  sprintGoal: string;
  targetModuleCodes: string[];
  qualityBudgetPercent: number;
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED';
}

export type FileManifestType =
  | 'TYPE'
  | 'CONFIG'
  | 'SCHEMA'
  | 'SERVICE'
  | 'CONTROLLER'
  | 'AGENT'
  | 'WORKER'
  | 'TEST'
  | 'DOC';

export interface FileImplementationManifestItem {
  id: string;
  moduleCode: string;
  filePath: string;
  fileType: FileManifestType;
  purpose: string;
  isCriticalBoundary: boolean;
}

export interface ExecutionPackReadinessReport {
  totalModules: number;
  p0ModulesCount: number;
  verifiedModulesCount: number;
  cujsCount: number;
  cujsVerifiedCount: number;
  overallReady: boolean;
  generatedAt: string;
}
