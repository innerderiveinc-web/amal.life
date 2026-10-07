import { AiController } from './ai/ai.controller.js';
import { AmalController } from './amal/amal.controller.js';
import { GoalsController } from './goals/goals.controller.js';
import { JourneysController } from './journeys/journeys.controller.js';
import { ReflectionsController } from './reflections/reflections.controller.js';
import { HealthController } from './health/health.controller.js';
import { EvidenceController } from './evidence/evidence.controller.js';
import { TodayController } from './today/today.controller.js';
import { CommunicationsController } from './notifications/communications.controller.js';
import { GovernanceController } from './governance/governance.controller.js';
import { PlatformController } from './platform/platform.controller.js';
import { KnowledgeOpsController } from './knowledge-ops/knowledge-ops.controller.js';
import { BillingController } from './billing/billing.controller.js';
import { ExecutionController } from './execution/execution.controller.js';
import { BlueprintController } from './blueprint/blueprint.controller.js';

export class AppModule {
  public static readonly controllers = [
    HealthController,
    TodayController,
    AiController,
    AmalController,
    GoalsController,
    JourneysController,
    ReflectionsController,
    EvidenceController,
    CommunicationsController,
    GovernanceController,
    PlatformController,
    KnowledgeOpsController,
    BillingController,
    ExecutionController,
    BlueprintController,
  ];
}
