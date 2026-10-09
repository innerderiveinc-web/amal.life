"use strict";
/**
 * AMAL OS — LAYER 20: REQUEST ID MIDDLEWARE (Section 20.8)
 * Assigns or propagates x-request-id for end-to-end request tracing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
const crypto_1 = require("crypto");
function requestIdMiddleware(req, res, next) {
    const incomingId = (req.headers['x-request-id'] || req.headers['X-Request-Id']);
    const requestId = incomingId || `req_${(0, crypto_1.randomUUID)()}`;
    req.headers['x-request-id'] = requestId;
    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);
    next();
}
//# sourceMappingURL=request-id.middleware.js.map