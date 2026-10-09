/**
 * AMAL OS — LAYER 20: REQUEST ID MIDDLEWARE (Section 20.8)
 * Assigns or propagates x-request-id for end-to-end request tracing.
 */
import { Request, Response, NextFunction } from 'express';
export declare function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=request-id.middleware.d.ts.map