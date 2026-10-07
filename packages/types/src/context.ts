/**
 * AMAL OS — LAYER 19: CONTEXT DOMAIN TYPES (Sections 34-36, 111)
 */

import { ContextSignalId, UserId } from './id.js';

export type ContextSignalStatus = 'ACTIVE' | 'PROPOSED' | 'REVOKED' | 'EXPIRED';

export type ContextSignalSource = 'USER_EXPLICIT' | 'AI_INFERENCE' | 'ACTIVITY_DERIVED';

export type ContextSensitivity = 'NORMAL' | 'SENSITIVE' | 'HIGHLY_SENSITIVE';

export interface ContextSignalRecord {
  id: ContextSignalId;
  userId: UserId;
  type: string;
  value: Record<string, any>;
  source: ContextSignalSource;
  confidence: number;
  sensitivity: ContextSensitivity;
  userVisible: boolean;
  userEditable: boolean;
  inferenceReason?: string;
  freshnessAt: string;
  expiresAt?: string;
  status: ContextSignalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ConfirmContextInput {
  signalId: ContextSignalId;
}

export interface RevokeContextInput {
  signalId: ContextSignalId;
  reason?: string;
}
