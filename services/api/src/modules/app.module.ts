import { AiController } from './ai/ai.controller.js';
import { AmalController } from './amal/amal.controller.js';
import { GoalsController } from './goals/goals.controller.js';
import { JourneysController } from './journeys/journeys.controller.js';
import { ReflectionsController } from './reflections/reflections.controller.js';
import { HealthController } from './health/health.controller.js';

export class AppModule {
  public static readonly controllers = [
    HealthController,
    AiController,
    AmalController,
    GoalsController,
    JourneysController,
    ReflectionsController,
  ];
}
