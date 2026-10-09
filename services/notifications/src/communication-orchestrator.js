"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationOrchestrator = void 0;
const consent_engine_js_1 = require("./consent-engine.js");
const fatigue_engine_js_1 = require("./fatigue-engine.js");
const suppression_engine_js_1 = require("./suppression-engine.js");
const global_kill_switches_js_1 = require("./global-kill-switches.js");
const template_engine_js_1 = require("./template-engine.js");
const re_engagement_engine_js_1 = require("./re-engagement-engine.js");
const qsura_gateway_js_1 = require("./qsura-gateway.js");
class CommunicationOrchestrator {
    gateway;
    constructor(gateway) {
        this.gateway = gateway || new qsura_gateway_js_1.QsuraGateway();
    }
    getGateway() {
        return this.gateway;
    }
    /**
     * Main pipeline that decides:
     * WHAT -> WHY -> WHEN -> WHERE -> WHETHER TO SEND -> AUDIT TRAIL
     */
    async orchestrate(req) {
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
        if (global_kill_switches_js_1.GlobalKillSwitches.isChannelBlocked(requestedChannel)) {
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
        const consentResult = consent_engine_js_1.ConsentEngine.evaluateConsent(requestedChannel, req.purpose, req.userConsents);
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
        const fatigueResult = fatigue_engine_js_1.FatigueEngine.evaluateFatigue(req.fatigueMetrics, req.preferences);
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
        const suppressionResult = suppression_engine_js_1.SuppressionEngine.evaluate({
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
            isKillSwitchActive: global_kill_switches_js_1.GlobalKillSwitches.isChannelBlocked(requestedChannel),
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
            const template = template_engine_js_1.TemplateEngine.getTemplate(req.templateSlug);
            if (template) {
                const rendered = template_engine_js_1.TemplateEngine.render(template, req.variables || {});
                title = rendered.title;
                body = rendered.body;
            }
        }
        // Verify Zero-Guilt invariant
        const copyCheck = re_engagement_engine_js_1.ReengagementEngine.validateNonGuiltCopy(title + ' ' + body);
        if (!copyCheck.isClean) {
            throw new Error(`Zero-Guilt Violation in Notification Copy: ${copyCheck.violations.join(', ')}`);
        }
        const decision = {
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
exports.CommunicationOrchestrator = CommunicationOrchestrator;
//# sourceMappingURL=communication-orchestrator.js.map