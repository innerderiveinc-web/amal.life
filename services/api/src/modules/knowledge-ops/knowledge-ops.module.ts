// ==============================================================================
// AMAL OS — LAYER 14: KNOWLEDGE OPERATIONS & SCHOLAR NETWORK MODULE
// ==============================================================================

import { KnowledgeOpsController } from './knowledge-ops.controller.js';
import { KnowledgeOpsService } from './knowledge-ops.service.js';

export class KnowledgeOpsModule {
  public static readonly controllers = [KnowledgeOpsController];
  public static readonly providers = [KnowledgeOpsService];
}
