import {
  CommunicationChannel,
  CommunicationPurpose,
  CommunicationPriority,
  CommunicationPreferences,
  ChannelConsent,
  FatigueMetrics,
  CommunicationDecisionResult,
  SendMessageResponse,
} from '@amal/types';
import { ConsentEngine } from './consent-engine.js';
import { FatigueEngine } from './fatigue-engine.js';
import { SuppressionEngine } from './suppression-engine.js';
import { GlobalKillSwitches } from './global-kill-switches.js';
import { TemplateEngine } from './template-engine.js';
import { ReengagementEngine } from './re-engagement-engine.js';
import { QsuraGateway } from './qsura-gateway.js';

export interface OrchestrationRequest {
  userId: string;
  purpose: CommunicationPurpose;
  priority?: CommunicationPriority;
  targetChannel?: CommunicationChannel;
  templateSlug?: string;
  customTitle?: string;
  customBody?: string;
  variables?: Record<string, string>;
  userConsents: ChannelConsent[];
  preferences: CommunicationPreferences;
  fatigueMetrics: FatigueMetrics;
  lastActiveSessionMinutesAgo?: number;
  amalCompletedToday?: boolean;
  isDuplicate?: boolean;
  destination?: string;
  now?: Date;
}

export class CommunicationOrchestrator {
  private gateway: QsuraGateway;

  constructor(gateway?: QsuraGateway) {
    this.gateway = gateway || new QsuraGateway();
  }

  public getGateway(): QsuraGateway {
    return this.gateway;
  }

  /**
   * Main pipeline that decides:
   * WHAT -> WHY -> WHEN -> WHERE -> WHETHER TO SEND -> AUDIT TRAIL
   */
  public async orchestrate(req: OrchestrationRequest): Promise<{
    decision: CommunicationDecisionResult;
    dispatch?: SendMessageResponse;
  }> {
    const priority = req.priority || 'P3';
    let requestedChannel = req.targetChannel || 'PUSH';
    const now = req.now || new Date();

    const auditTrail = {
      consentChecked: false,
      fatigueScore: req.fatigueMetrics.fatigueScore,
      quietHoursActive: false,
      activeSessionDetected: false,
      amalAlreadyCompleted: false,
      collisionHandled: true,
    };

    // 1. Check Global Kill Switches
    if (GlobalKillSwitches.isChannelBlocked(requestedChannel)) {
      return {
        decision: {
          action: 'SUPPRESS',
          channel: requestedChannel,
          reason: 'KILL_SWITCH_ACTIVE',
          auditTrail,
        },
      };
    }

    // 2. Consent Check & Degradation
    auditTrail.consentChecked = true;
    const consentResult = ConsentEngine.evaluateConsent(
      requestedChannel,
      req.purpose,
      req.userConsents
    );

    if (!consentResult.allowed) {
      return {
        decision: {
          action: 'SUPPRESS',
          channel: requestedChannel,
          reason: 'NO_CONSENT',
          auditTrail,
        },
      };
    }

    // Adopt downgraded channel if applicable
    requestedChannel = consentResult.effectiveChannel;

    // 3. Evaluate Fatigue
    const fatigueResult = FatigueEngine.evaluateFatigue(
      req.fatigueMetrics,
      req.preferences
    );
    auditTrail.fatigueScore = fatigueResult.fatigueScore;

    if (fatigueResult.shouldSuppress && priority !== 'P0' && priority !== 'P1') {
      return {
        decision: {
          action: 'SUPPRESS',
          channel: requestedChannel,
          reason: 'NOTIFICATION_FATIGUE',
          auditTrail,
        },
      };
    }

    // 4. Suppression Engine Check
    const suppressionResult = SuppressionEngine.evaluate({
      userId: req.userId,
      purpose: req.purpose,
      priority,
      lastActiveSessionMinutesAgo: req.lastActiveSessionMinutesAgo,
      amalCompletedToday: req.amalCompletedToday,
      quietHoursPreferences: {
        enabled: req.preferences.quietHoursEnabled,
        start: req.preferences.quietHoursStart,
        end: req.preferences.quietHoursEnd,
        timezone: req.preferences.timezone,
      },
      now,
      isDuplicate: req.isDuplicate,
      isKillSwitchActive: GlobalKillSwitches.isChannelBlocked(requestedChannel),
      fatigueBreached: fatigueResult.shouldSuppress,
    });

    if (suppressionResult.shouldSuppress) {
      auditTrail.activeSessionDetected = suppressionResult.reasonCode === 'USER_ALREADY_ACTIVE';
      auditTrail.amalAlreadyCompleted = suppressionResult.reasonCode === 'COMPLETED_AMAL';
      auditTrail.quietHoursActive = suppressionResult.reasonCode === 'QUIET_HOURS';

      return {
        decision: {
          action: suppressionResult.canDefer ? 'DEFER' : 'SUPPRESS',
          channel: requestedChannel,
          reason: suppressionResult.reasonCode,
          scheduledAt: suppressionResult.deferredUntil,
          auditTrail,
        },
      };
    }

    // 5. Render Message Content safely
    let title = req.customTitle || '';
    let body = req.customBody || '';

    if (req.templateSlug) {
      const template = TemplateEngine.getTemplate(req.templateSlug);
      if (template) {
        const rendered = TemplateEngine.render(template, req.variables || {});
        title = rendered.title;
        body = rendered.body;
      }
    }

    // Verify Zero-Guilt invariant
    const copyCheck = ReengagementEngine.validateNonGuiltCopy(title + ' ' + body);
    if (!copyCheck.isClean) {
      throw new Error(`Zero-Guilt Violation in Notification Copy: ${copyCheck.violations.join(', ')}`);
    }

    const decision: CommunicationDecisionResult = {
      action: consentResult.degradedFrom ? 'DEGRADE_CHANNEL' : 'SEND',
      channel: requestedChannel,
      renderedTitle: title,
      renderedBody: body,
      auditTrail,
    };

    // 6. Dispatch message through provider gateway
    const dispatch = await this.gateway.send({
      idempotencyKey: `orch-${req.userId}-${Date.now()}`,
      userId: req.userId,
      channel: requestedChannel,
      title,
      body,
      destination: req.destination || 'device-token-default',
    });

    return { decision, dispatch };
  }
}
