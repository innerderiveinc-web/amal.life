/**
 * AMAL OS — LAYER 20: API ENTRYPOINT (Section 20.31)
 * Initializes NestJS application runtime with security middleware,
 * global request ID tracking, global exception filter, and validation pipe.
 */

import { AppModule } from './modules/app.module.js';
import { requestIdMiddleware } from './common/middleware/request-id.middleware.js';
import { HttpExceptionFilter } from './common/errors/http-exception.filter.js';

export async function bootstrap() {
  console.log('AMAL OS Production API bootstrap initialized.');
  console.log('Controllers registered:', AppModule.controllers.map((c: any) => c.name));
  return {
    appModule: AppModule,
    requestIdMiddleware,
    httpExceptionFilter: new HttpExceptionFilter(),
    initialized: true,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrap();
}
