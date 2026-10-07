// ==============================================================================
// AMAL OS — LAYER 16: EXECUTION & LAUNCH OPERATIONS MODULE
// ==============================================================================

import { ExecutionController } from './execution.controller.js';
import { ExecutionService } from './execution.service.js';

export class ExecutionModule {
  public static readonly controllers = [ExecutionController];
  public static readonly providers = [ExecutionService];
}
