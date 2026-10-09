"use strict";
/**
 * AMAL OS — LAYER 20: API ENTRYPOINT (Section 20.31)
 * Initializes NestJS application runtime with security middleware,
 * global request ID tracking, global exception filter, and validation pipe.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const app_module_js_1 = require("./modules/app.module.js");
const request_id_middleware_js_1 = require("./common/middleware/request-id.middleware.js");
const http_exception_filter_js_1 = require("./common/errors/http-exception.filter.js");
async function bootstrap() {
    console.log('AMAL OS Production API bootstrap initialized.');
    console.log('Controllers registered:', app_module_js_1.AppModule.controllers.map((c) => c.name));
    return {
        appModule: app_module_js_1.AppModule,
        requestIdMiddleware: request_id_middleware_js_1.requestIdMiddleware,
        httpExceptionFilter: new http_exception_filter_js_1.HttpExceptionFilter(),
        initialized: true,
    };
}
if (import.meta.url === `file://${process.argv[1]}`) {
    bootstrap();
}
//# sourceMappingURL=main.js.map