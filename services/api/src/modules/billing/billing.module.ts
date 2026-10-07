// ==============================================================================
// AMAL OS — LAYER 15: BILLING & BUSINESS PLATFORM MODULE
// ==============================================================================

import { BillingController } from './billing.controller.js';
import { BillingService } from './billing.service.js';

export class BillingModule {
  public static readonly controllers = [BillingController];
  public static readonly providers = [BillingService];
}
