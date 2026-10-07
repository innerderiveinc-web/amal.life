import { AiController } from './ai/ai.controller.js';
import { AmalController } from './amal/amal.controller.js';

export class AppModule {
  public static readonly controllers = [AiController, AmalController];
}
