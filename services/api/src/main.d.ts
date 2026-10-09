/**
 * AMAL OS — LAYER 20: API ENTRYPOINT (Section 20.31)
 * Initializes NestJS application runtime with security middleware,
 * global request ID tracking, global exception filter, and validation pipe.
 */
import { AppModule } from './modules/app.module.js';
import { requestIdMiddleware } from './common/middleware/request-id.middleware.js';
import { HttpExceptionFilter } from './common/errors/http-exception.filter.js';
export declare function bootstrap(): Promise<{
    appModule: typeof AppModule;
    requestIdMiddleware: typeof requestIdMiddleware;
    httpExceptionFilter: HttpExceptionFilter;
    initialized: boolean;
}>;
//# sourceMappingURL=main.d.ts.map